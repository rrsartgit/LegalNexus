import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    // Get search params
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const role = searchParams.get("role")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const offset = (page - 1) * limit

    // Build query
    let query = supabaseAdmin.from("users").select("*").order("created_at", { ascending: false })

    // Apply filters
    if (role && role !== "all") {
      query = query.eq("role", role)
    }

    if (status === "active") {
      query = query.eq("is_active", true)
    } else if (status === "inactive") {
      query = query.eq("is_active", false)
    }

    if (search) {
      query = query.or(`email.ilike.%${search}%,full_name.ilike.%${search}%`)
    }

    // Get paginated results
    const { data: users, error, count } = await query.range(offset, offset + limit - 1)

    if (error) {
      console.error("Error fetching users:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    // Get stats
    const { data: statsData } = await supabaseAdmin.from("users").select("role, is_active, created_at")

    const stats = {
      total: statsData?.length || 0,
      active: statsData?.filter((u) => u.is_active).length || 0,
      clients: statsData?.filter((u) => u.role === "client").length || 0,
      lawyers: statsData?.filter((u) => u.role === "lawyer").length || 0,
      admins: statsData?.filter((u) => u.role === "admin").length || 0,
      operators: statsData?.filter((u) => u.role === "operator").length || 0,
      newThisMonth:
        statsData?.filter((u) => {
          const createdAt = new Date(u.created_at)
          const now = new Date()
          return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear()
        }).length || 0,
    }

    return NextResponse.json({
      users,
      stats,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    })
  } catch (error) {
    console.error("Error in users API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, role } = body

    // Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json({ error: "Email, password, and role are required" }, { status: 400 })
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Automatically confirm email for admin-created users
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    // Insert user into public.users table
    const { data: userData, error: dbError } = await supabaseAdmin
      .from("users")
      .insert({ id: authData.user?.id, email, role, is_active: true })
      .select()
      .single()

    if (dbError) {
      // If database insert fails, consider deleting the auth user to prevent inconsistencies
      await supabaseAdmin.auth.admin.deleteUser(authData.user?.id!)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json(userData, { status: 201 })
  } catch (error) {
    console.error("Error in create user API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

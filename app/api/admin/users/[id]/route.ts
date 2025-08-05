import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data: user, error } = await supabaseAdmin.from("users").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { email, role } = await req.json()

  const { data, error } = await supabaseAdmin.from("users").update({ email, role }).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // In a real application, you might want to soft delete or handle related data
  const { error } = await supabaseAdmin.from("users").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "User deleted successfully" })
}

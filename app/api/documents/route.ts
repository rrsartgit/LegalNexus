import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { createClient as createBrowserClient } from "@/lib/supabase/client"

export async function GET() {
  try {
    const svc = createServiceRoleClient()
    if (svc) {
      const { data, error } = await svc
        .from("legal_documents")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20)
      if (error) throw error
      return NextResponse.json({ documents: data })
    }

    const supabase = createBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ documents: [] })

    const { data, error } = await supabase
      .from("legal_documents")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
    if (error) throw error

    return NextResponse.json({ documents: data })
  } catch (e) {
    console.error("GET /api/documents error", e)
    return NextResponse.json({ documents: [] })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {

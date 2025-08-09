import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { createClient as createBrowserClient } from "@/lib/supabase/client"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    if (!["draft", "submitted", "in_review", "completed"].includes(status)) {
      return NextResponse.json({ error: "Nieprawidłowy status" }, { status: 400 })
    }
    const id = params.id

    // Prefer server client (operator/admin), else fall back to client user doc update
    const svc = createServiceRoleClient()
    if (svc) {
      const { data, error } = await svc.from("legal_documents").update({ status }).eq("id", id).select().single()
      if (error) throw error
      return NextResponse.json({ document: data })
    }

    const supabase = createBrowserClient()
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { data, error } = await supabase
      .from("legal_documents")
      .update({ status })
      .eq("id", id)
      .eq("user_id", session.user.id)
      .select()
      .single()
    if (error) throw error

    return NextResponse.json({ document: data })
  } catch (e) {
    console.error("PATCH /api/documents/[id]/status error", e)
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 })
  }
}

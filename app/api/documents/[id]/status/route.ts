import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json()
    if (!["draft", "submitted", "in_review", "completed"].includes(status)) {
      return NextResponse.json({ error: "Nieprawidłowy status" }, { status: 400 })
    }
    const svc = createServiceRoleClient()
    if (!svc) return NextResponse.json({ error: "Brak konfiguracji bazy" }, { status: 500 })
    const { data, error } = await svc.from("legal_documents").update({ status }).eq("id", params.id).select().single()
    if (error) throw error
    return NextResponse.json({ document: data })
  } catch (e) {
    console.error("PATCH status error", e)
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 })
  }
}

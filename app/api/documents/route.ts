import { NextResponse } from "next/server"
import { createServiceRoleClient } from "@/lib/supabase/server"
import { createClient } from "@/lib/supabase/client"

export async function GET() {
  // Serwerowy odczyt listy (ostatnie 20) — dla podglądu paneli
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
    // Fallback: próba po stronie przeglądarki (podgląd)
    const sb = createClient()
    if (!sb) return NextResponse.json({ documents: [] })
    const {
      data: { session },
    } = await sb.auth.getSession()
    if (!session) return NextResponse.json({ documents: [] })
    const { data } = await sb
      .from("legal_documents")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })
    return NextResponse.json({ documents: data })
  } catch (e) {
    console.error("GET /api/documents error", e)
    return NextResponse.json({ documents: [] })
  }
}

export async function POST(req: Request) {
  // Zapis szkicu pisma. W produkcji użyj createServerClient z cookies.
  try {
    const form = await req.formData()
    const title = String(form.get("title") || "")
    const content = String(form.get("content") || "")
    const type = String(form.get("type") || "inne")
    const recipient_name = String(form.get("recipientName") || "")
    const recipient_address = String(form.get("recipientAddress") || "")

    if (!title || !content) {
      return NextResponse.json({ error: "Brak wymaganych pól" }, { status: 400 })
    }

    const svc = createServiceRoleClient()
    if (!svc) {
      return NextResponse.json({ error: "Brak konfiguracji bazy" }, { status: 500 })
    }

    // W podglądzie nie mamy sesji — przypiszemy technicznego usera.
    const technicalUser = "00000000-0000-0000-0000-000000000000"

    const { data, error } = await svc
      .from("legal_documents")
      .insert({
        user_id: technicalUser,
        title,
        content,
        type,
        recipient_name,
        recipient_address,
        status: "draft",
      })
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ document: data })
  } catch (e) {
    console.error("POST /api/documents error", e)
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 })
  }
}

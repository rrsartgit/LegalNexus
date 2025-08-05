import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data: caseItem, error } = await supabaseAdmin.from("cases").select("*").eq("id", id).single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!caseItem) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  return NextResponse.json(caseItem)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const updates = await req.json()

  const { data, error } = await supabaseAdmin.from("cases").update(updates).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { error } = await supabaseAdmin.from("cases").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Case deleted successfully" })
}

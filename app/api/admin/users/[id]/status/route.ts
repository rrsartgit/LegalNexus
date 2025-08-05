import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { is_active } = await req.json()

  const { data, error } = await supabaseAdmin.from("users").update({ is_active }).eq("id", id).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET() {
  const { data: specializations, error } = await supabaseAdmin.from("specializations").select("*")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(specializations)
}

export async function POST(req: NextRequest) {
  const newSpecialization = await req.json()

  const { data, error } = await supabaseAdmin.from("specializations").insert(newSpecialization).select().single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

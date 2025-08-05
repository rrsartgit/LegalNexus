import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const { data: lawFirm, error } = await supabaseAdmin
    .from("law_firms")
    .select("*, specializations(id, name)") // Fetch related specializations
    .eq("id", id)
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!lawFirm) {
    return NextResponse.json({ error: "Law firm not found" }, { status: 404 })
  }

  // Map specialization data to a simpler array of IDs
  const lawFirmResponse = {
    ...lawFirm,
    specialization_ids: lawFirm.specializations.map((spec: { id: string }) => spec.id),
  }

  return NextResponse.json(lawFirmResponse)
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const { specialization_ids, ...updates } = await req.json()

  // Update law firm details
  const { data: lawFirmData, error: lawFirmError } = await supabaseAdmin
    .from("law_firms")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (lawFirmError) {
    return NextResponse.json({ error: lawFirmError.message }, { status: 500 })
  }

  // Update law_firm_specializations join table
  if (specialization_ids !== undefined) {
    // First, delete existing associations for this law firm
    const { error: deleteError } = await supabaseAdmin.from("law_firm_specializations").delete().eq("law_firm_id", id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    // Then, insert new associations
    const newAssociations = specialization_ids.map((spec_id: string) => ({
      law_firm_id: id,
      specialization_id: spec_id,
    }))

    if (newAssociations.length > 0) {
      const { error: insertError } = await supabaseAdmin.from("law_firm_specializations").insert(newAssociations)

      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 })
      }
    }
  }

  // Re-fetch the updated law firm with its specializations to return a consistent response
  const { data: updatedLawFirm, error: fetchError } = await supabaseAdmin
    .from("law_firms")
    .select("*, specializations(id, name)")
    .eq("id", id)
    .single()

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 })
  }

  const updatedLawFirmResponse = {
    ...updatedLawFirm,
    specialization_ids: updatedLawFirm.specializations.map((spec: { id: string }) => spec.id),
  }

  return NextResponse.json(updatedLawFirmResponse)
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  // Delete associations in law_firm_specializations first
  const { error: deleteAssociationsError } = await supabaseAdmin
    .from("law_firm_specializations")
    .delete()
    .eq("law_firm_id", id)

  if (deleteAssociationsError) {
    return NextResponse.json({ error: deleteAssociationsError.message }, { status: 500 })
  }

  // Then delete the law firm
  const { error } = await supabaseAdmin.from("law_firms").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Law firm deleted successfully" })
}

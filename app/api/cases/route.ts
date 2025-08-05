import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const {
      data: { session },
    } = await supabaseAdmin.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const clientNotes = formData.get("clientNotes") as string
    const files = formData.getAll("files") as File[]

    // Create case in database
    const { data: newCase, error: caseError } = await supabaseAdmin
      .from("cases")
      .insert([
        {
          name: title,
          client_id: session.user.id,
          status: "new",
          client_notes: clientNotes,
          description: description,
        },
      ])
      .select()
      .single()

    if (caseError) {
      console.error("Error creating case:", caseError)
      return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
    }

    // Upload files to Supabase Storage
    const uploadedDocuments = []
    for (const file of files) {
      if (file.size > 0) {
        const fileName = `${newCase.id}/${Date.now()}-${file.name}`
        const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
          .from("documents")
          .upload(fileName, file)

        if (uploadError) {
          console.error("Error uploading file:", uploadError)
          continue
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabaseAdmin.storage.from("documents").getPublicUrl(fileName)

        // Save document info to database
        const { data: document, error: docError } = await supabaseAdmin
          .from("documents")
          .insert([
            {
              case_id: newCase.id,
              name: file.name,
              type: file.type.includes("pdf") ? "pdf" : "image",
              url: publicUrl,
              size: file.size,
            },
          ])
          .select()
          .single()

        if (!docError) {
          uploadedDocuments.push(document)
        }
      }
    }

    // Update case with document count
    await supabaseAdmin.from("cases").update({ document_count: uploadedDocuments.length }).eq("id", newCase.id)

    return NextResponse.json(
      {
        success: true,
        case: newCase,
        documents: uploadedDocuments,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error in POST /api/cases:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data: cases, error } = await supabaseAdmin.from("cases").select("*")

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(cases)
  } catch (error) {
    console.error("Error in GET /api/cases:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

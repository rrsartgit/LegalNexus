import { streamLegalResponse } from "@/lib/gemini"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { question, language = "pl" } = await request.json()

    if (!question) {
      return new Response("Question is required", { status: 400 })
    }

    const result = streamLegalResponse({
      question,
      language,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in chat API:", error)
    return new Response("Internal server error", { status: 500 })
  }
}

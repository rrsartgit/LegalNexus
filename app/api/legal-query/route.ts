import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Provide legal advice or information based on the following query: ${query}`,
    })

    return NextResponse.json({ advice: text })
  } catch (error) {
    console.error("Error in legal query API:", error)
    return NextResponse.json({ error: "Failed to get legal advice" }, { status: 500 })
  }
}

import { retrieveTopK, buildSystemPrompt } from "@/lib/rag"
import { geminiModel } from "@/lib/ai/gemini-server"
import { streamText } from "ai"

// POST /api/chat
export async function POST(req: Request) {
  try {
    const { question, language } = await req.json()
    const q = typeof question === "string" && question.trim().length > 0 ? question.trim() : "Brak pytania."
    const lang: "pl" | "en" = language === "pl" || language === "en" ? language : /[ąćęłńóśźż]/i.test(q) ? "pl" : "en"

    const { context, sources } = retrieveTopK(q, 3)
    const system = buildSystemPrompt(lang, context)

    const result = await streamText({
      model: geminiModel,
      system,
      prompt: q,
      maxTokens: 800,
    })

    // AI SDK helper zwraca strumień odpowiedzi HTTP kompatybilny z fetch/event-stream. [^1]
    return result.toDataStreamResponse({
      headers: {
        "X-RAG-Sources": encodeURIComponent(JSON.stringify(sources)),
      },
    })
  } catch (err) {
    console.error("Chat API error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}

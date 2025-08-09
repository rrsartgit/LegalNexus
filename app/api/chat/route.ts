import { NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveContext } from "@/lib/rag"

// RAG chat endpoint using Gemini via the AI SDK.
// Uses GOOGLE_GENERATIVE_AI_API_KEY from env (no hardcoding). [^6]
export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Brak wiadomości" }, { status: 400 })
    }

    // Retrieve top-k context with embeddings + cosine similarity. [^4][^5]
    const { context, sources } = await retrieveContext(message)

    const system =
      "Jesteś asystentem prawnym. Odpowiadasz zwięźle i po polsku, bazując WYŁĄCZNIE na dostarczonym kontekście. " +
      "Jeśli kontekst nie wystarcza, powiedz czego brakuje. Dodaj krótką listę kroków praktycznych."

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system,
      prompt: `Kontekst:\n${context}\n\nPytanie użytkownika: ${message}\n\nOdpowiedź:`,
    })

    return NextResponse.json({ text, sources })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { retrieveContext } from "@/lib/rag"

// Wykorzystujemy AI SDK + Gemini, klucz pobierany z GOOGLE_GENERATIVE_AI_API_KEY [^6].
// RAG: embeddingi + cosine similarity i dołączenie kontekstu [^4][^5].
export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Brak wiadomości" }, { status: 400 })
    }

    const { context, sources } = await retrieveContext(message)

    const system =
      "Jesteś asystentem prawnym. Odpowiadasz zwięźle po polsku wyłącznie w oparciu o kontekst. " +
      "Jeśli kontekst jest niewystarczający, wskaż, czego brakuje, oraz zaproponuj praktyczne kroki."

    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system,
      prompt: `Kontekst:\n${context}\n\nPytanie: ${message}\n\nOdpowiedź:`,
    })

    return NextResponse.json({ text, sources })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: "Błąd serwera" }, { status: 500 })
  }
}

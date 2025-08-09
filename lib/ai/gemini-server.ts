import "server-only"
import { google } from "@ai-sdk/google"

// Korzysta z GOOGLE_GENERATIVE_AI_API_KEY dostępnego w środowisku.
// Nie ujawniamy klucza w kliencie. [^1]
export const geminiModel = google("gemini-2.0-flash-exp")

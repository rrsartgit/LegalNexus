import { readFileSync } from "node:fs"
import path from "node:path"
import { cosineSimilarity, embedMany } from "ai"
import { google } from "@ai-sdk/google"

type KBItem = { id: string; title: string; content: string }

let kbCache: KBItem[] | null = null
let embedsCache: number[][] | null = null

function loadKB(): KBItem[] {
  if (kbCache) return kbCache
  const file = path.join(process.cwd(), "data", "legal-knowledge.json")
  const raw = readFileSync(file, "utf8")
  kbCache = JSON.parse(raw)
  return kbCache!
}

export async function retrieveContext(question: string, topK = 4) {
  const kb = loadKB()
  const chunks = kb.map((k) => k.content)

  if (!embedsCache) {
    const { embeddings } = await embedMany({
      model: google.textEmbeddingModel("text-embedding-004"),
      values: chunks,
    })
    embedsCache = embeddings
  }

  const { embeddings: qEmb } = await embedMany({
    model: google.textEmbeddingModel("text-embedding-004"),
    values: [question],
  })
  const q = qEmb[0]

  const ranked = embedsCache!.map((e, i) => ({ idx: i, sim: cosineSimilarity(q, e) }))
  ranked.sort((a, b) => b.sim - a.sim)

  const selected = ranked.slice(0, topK).map((r) => kb[r.idx])
  const context = selected.map((s) => `Źródło: ${s.title}\n${s.content}`).join("\n\n")

  return {
    context,
    sources: selected.map((s) => ({ id: s.id, title: s.title })),
  }
}

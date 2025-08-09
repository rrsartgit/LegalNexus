import "server-only"

type KBEntry = {
  id: string
  title: string
  content: string
}

const KB: KBEntry[] = [
  {
    id: "kc-3531",
    title: "Kodeks Cywilny – art. 353¹ (swoboda umów)",
    content:
      "Strony mogą ułożyć stosunek prawny według swego uznania, byle jego treść lub cel nie sprzeciwiały się właściwości stosunku, ustawie ani zasadom współżycia społecznego.",
  },
  {
    id: "kc-117",
    title: "Kodeks Cywilny – art. 117 (przedawnienie)",
    content:
      "Roszczenia majątkowe przedawniają się co do zasady z upływem 6 lub 10 lat; roszczenia okresowe oraz związane z działalnością gospodarczą z upływem 3 lat.",
  },
  {
    id: "kp-30",
    title: "Kodeks Pracy – art. 30 (rozwiązanie umowy)",
    content:
      "Umowę o pracę można rozwiązać za wypowiedzeniem. Okres wypowiedzenia zależy od stażu pracy: 2 tygodnie, 1 miesiąc lub 3 miesiące.",
  },
  {
    id: "kpa-127",
    title: "KPA – art. 127 (odwołanie)",
    content:
      "Od decyzji wydanej w pierwszej instancji przysługuje odwołanie do organu wyższego stopnia w terminie 14 dni od doręczenia.",
  },
]

// proste podobieństwo bag-of-words
function score(query: string, text: string) {
  const q = query.toLowerCase().split(/\W+/).filter(Boolean)
  const t = text.toLowerCase()
  let hits = 0
  for (const w of q) if (t.includes(w)) hits++
  return hits / Math.max(1, q.length)
}

export function retrieveTopK(query: string, k = 3) {
  const ranked = KB.map((e) => ({ e, s: score(query, e.content + " " + e.title) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, k)
    .map((x) => x.e)

  const context = ranked.map((r, i) => `[#${i + 1}] ${r.title}\n${r.content}`).join("\n\n")
  const sources = ranked.map((r) => ({ id: r.id, title: r.title }))
  return { context, sources }
}

export function buildSystemPrompt(language: "pl" | "en", context: string) {
  if (language === "pl") {
    return [
      "Jesteś profesjonalnym asystentem prawnym AI dla polskiej kancelarii.",
      "Odpowiadaj po polsku, zwięźle i precyzyjnie.",
      "Korzystaj WYŁĄCZNIE z dostarczonego kontekstu. Jeśli brakuje informacji, powiedz czego brakuje.",
      "Dodaj krótką listę praktycznych kroków.",
      "Kontekst:",
      context || "(brak dopasowań)",
    ].join("\n\n")
  }
  return [
    "You are a professional legal AI assistant.",
    "Answer concisely and precisely in English.",
    "Use ONLY the provided context. If information is missing, say what is missing.",
    "Add a short list of actionable steps.",
    "Context:",
    context || "(no matches)",
  ].join("\n\n")
}

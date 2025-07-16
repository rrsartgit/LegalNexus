import { NextResponse } from "next/server"

// Mock specializations data
const mockSpecializations = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Prawo Gospodarcze",
    code: "COMMERCIAL",
    description: "Obsługa prawna przedsiębiorstw, umowy handlowe, fuzje i przejęcia",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Prawo Cywilne",
    code: "CIVIL",
    description: "Sprawy cywilne, rodzinne, spadkowe i nieruchomości",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Prawo Karne",
    code: "CRIMINAL",
    description: "Obrona w sprawach karnych, postępowania karne",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Prawo Pracy",
    code: "LABOR",
    description: "Stosunki pracy, spory pracownicze, BHP",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Prawo Administracyjne",
    code: "ADMINISTRATIVE",
    description: "Postępowania administracyjne, prawo budowlane, środowiskowe",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Prawo Podatkowe",
    code: "TAX",
    description: "Doradztwo podatkowe, optymalizacja podatkowa, spory z fiskusem",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    name: "Prawo Międzynarodowe",
    code: "INTERNATIONAL",
    description: "Prawo międzynarodowe prywatne, arbitraż międzynarodowy",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    name: "Prawo Własności Intelektualnej",
    code: "IP",
    description: "Patenty, znaki towarowe, prawa autorskie, ochrona danych",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    name: "Prawo Bankowe i Finansowe",
    code: "BANKING",
    description: "Prawo bankowe, instrumenty finansowe, compliance",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    name: "Prawo Ubezpieczeniowe",
    code: "INSURANCE",
    description: "Ubezpieczenia, likwidacja szkód, odszkodowania",
  },
]

export async function GET() {
  try {
    // Build JSON:API response
    const response = {
      data: mockSpecializations.map((specialization) => ({
        type: "specializations",
        id: specialization.id,
        attributes: {
          name: specialization.name,
          code: specialization.code,
          description: specialization.description,
        },
      })),
      meta: {
        total: mockSpecializations.length,
        timestamp: new Date().toISOString(),
      },
      links: {
        self: "/api/v1/specializations",
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Get specializations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST() {
  // For future implementation - creating new specializations
  return NextResponse.json({ error: "Method not implemented yet" }, { status: 501 })
}

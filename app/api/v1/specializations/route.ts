import { NextResponse } from "next/server"

const mockSpecializations = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Prawo Gospodarcze",
    code: "COMMERCIAL",
    description: "Obsługa prawna przedsiębiorstw, umowy handlowe, prawo spółek",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Prawo Cywilne",
    code: "CIVIL",
    description: "Sprawy cywilne, rodzinne, spadkowe",
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
    description: "Sprawy pracownicze, umowy o pracę, spory zbiorowe",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Prawo Administracyjne",
    code: "ADMINISTRATIVE",
    description: "Postępowania administracyjne, prawo budowlane",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Prawo Podatkowe",
    code: "TAX",
    description: "Doradztwo podatkowe, spory z organami podatkowymi",
  },
]

export async function GET() {
  try {
    const response = {
      data: mockSpecializations.map((spec) => ({
        type: "specializations",
        id: spec.id,
        attributes: spec,
      })),
      meta: {
        total: mockSpecializations.length,
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Get specializations error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

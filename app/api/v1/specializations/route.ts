import { type NextRequest, NextResponse } from "next/server"

// Mock data for specializations - replace with database query
const mockSpecializations = [
  {
    id: "550e8400-e29b-41d4-a716-446655440010",
    name: "Prawo Gospodarcze",
    code: "COMMERCIAL",
    description: "Obsługa prawna przedsiębiorstw, umowy handlowe, fuzje i przejęcia",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440011",
    name: "Prawo Cywilne",
    code: "CIVIL",
    description: "Sprawy cywilne, rodzinne, spadkowe, nieruchomości",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Prawo Karne",
    code: "CRIMINAL",
    description: "Obrona w sprawach karnych, postępowania karne",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440013",
    name: "Prawo Pracy",
    code: "LABOR",
    description: "Sprawy pracownicze, umowy o pracę, spory zbiorowe",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440014",
    name: "Prawo Administracyjne",
    code: "ADMINISTRATIVE",
    description: "Postępowania administracyjne, sądownictwo administracyjne",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440015",
    name: "Prawo Podatkowe",
    code: "TAX",
    description: "Doradztwo podatkowe, optymalizacja podatkowa, spory z fiskusem",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440016",
    name: "Prawo Międzynarodowe",
    code: "INTERNATIONAL",
    description: "Prawo międzynarodowe prywatne, transakcje międzynarodowe",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440017",
    name: "Prawo Własności Intelektualnej",
    code: "IP",
    description: "Patenty, znaki towarowe, prawa autorskie, ochrona IP",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440018",
    name: "Prawo Bankowe",
    code: "BANKING",
    description: "Prawo bankowe, finansowe, instrumenty finansowe",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440019",
    name: "Prawo Ubezpieczeniowe",
    code: "INSURANCE",
    description: "Prawo ubezpieczeniowe, roszczenia ubezpieczeniowe",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In production, replace with database query:
    // const supabase = createClient()
    // const { data: specializations, error } = await supabase
    //   .from('specializations')
    //   .select('*')
    //   .eq('is_active', true)
    //   .order('name')

    const response = {
      data: mockSpecializations.map((spec) => ({
        type: "specializations",
        id: spec.id,
        attributes: spec,
      })),
      meta: {
        total: mockSpecializations.length,
        timestamp: new Date().toISOString(),
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Specializations fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate admin permissions here
    // const user = await getCurrentUser(request)
    // if (!user || user.role !== 'admin') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { name, code, description } = body

    if (!name || !code) {
      return NextResponse.json({ error: "Name and code are required" }, { status: 400 })
    }

    // Check if specialization already exists
    const existing = mockSpecializations.find((spec) => spec.code === code)
    if (existing) {
      return NextResponse.json({ error: `Specialization with code ${code} already exists` }, { status: 409 })
    }

    const newSpecialization = {
      id: crypto.randomUUID(),
      name,
      code: code.toUpperCase(),
      description: description || "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    // In production, save to database:
    // const { data, error } = await supabase
    //   .from('specializations')
    //   .insert([newSpecialization])
    //   .select()
    //   .single()

    mockSpecializations.push(newSpecialization)

    const response = {
      data: {
        type: "specializations",
        id: newSpecialization.id,
        attributes: newSpecialization,
      },
      meta: {
        created_at: newSpecialization.created_at,
      },
    }

    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error("Create specialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

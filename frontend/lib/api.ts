export interface Kancelaria {
  id: number
  nazwa: string
  adres: string
  telefon: string
  email: string
  nip: string
  data_utworzenia: string
  status: "aktywna" | "nieaktywna"
}

export interface Klient {
  id: number
  imie: string
  nazwisko: string
  email: string
  telefon: string
  adres: string
  pesel?: string
  nip?: string
  typ: "osoba_fizyczna" | "osoba_prawna"
  data_utworzenia: string
}

export interface Sprawa {
  id: number
  tytul: string
  opis: string
  klient_id: number
  kancelaria_id: number
  status: "nowa" | "w_trakcie" | "zawieszona" | "zakonczona"
  data_utworzenia: string
  data_zakonczenia?: string
  wartosc?: number
}

export interface CreateKancelaria {
  nazwa: string
  adres: string
  telefon: string
  email: string
  nip: string
}

export interface CreateKlient {
  imie: string
  nazwisko: string
  email: string
  telefon: string
  adres: string
  pesel?: string
  nip?: string
  typ: "osoba_fizyczna" | "osoba_prawna"
}

export interface CreateSprawa {
  tytul: string
  opis: string
  klient_id: number
  kancelaria_id: number
  wartosc?: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  // Kancelarie endpoints
  async getKancelarie(): Promise<Kancelaria[]> {
    const response = await fetch(`${this.baseUrl}/kancelarie`)
    if (!response.ok) throw new Error("Failed to fetch kancelarie")
    return response.json()
  }

  async getKancelaria(id: number): Promise<Kancelaria> {
    const response = await fetch(`${this.baseUrl}/kancelarie/${id}`)
    if (!response.ok) throw new Error("Failed to fetch kancelaria")
    return response.json()
  }

  async createKancelaria(data: CreateKancelaria): Promise<Kancelaria> {
    const response = await fetch(`${this.baseUrl}/kancelarie`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create kancelaria")
    return response.json()
  }

  async updateKancelaria(id: number, data: Partial<CreateKancelaria>): Promise<Kancelaria> {
    const response = await fetch(`${this.baseUrl}/kancelarie/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update kancelaria")
    return response.json()
  }

  async deleteKancelaria(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/kancelarie/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete kancelaria")
  }

  // Klienci endpoints
  async getKlienci(): Promise<Klient[]> {
    const response = await fetch(`${this.baseUrl}/klienci`)
    if (!response.ok) throw new Error("Failed to fetch klienci")
    return response.json()
  }

  async getKlient(id: number): Promise<Klient> {
    const response = await fetch(`${this.baseUrl}/klienci/${id}`)
    if (!response.ok) throw new Error("Failed to fetch klient")
    return response.json()
  }

  async createKlient(data: CreateKlient): Promise<Klient> {
    const response = await fetch(`${this.baseUrl}/klienci`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create klient")
    return response.json()
  }

  async updateKlient(id: number, data: Partial<CreateKlient>): Promise<Klient> {
    const response = await fetch(`${this.baseUrl}/klienci/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update klient")
    return response.json()
  }

  async deleteKlient(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/klienci/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete klient")
  }

  // Sprawy endpoints
  async getSprawy(): Promise<Sprawa[]> {
    const response = await fetch(`${this.baseUrl}/sprawy`)
    if (!response.ok) throw new Error("Failed to fetch sprawy")
    return response.json()
  }

  async getSprawa(id: number): Promise<Sprawa> {
    const response = await fetch(`${this.baseUrl}/sprawy/${id}`)
    if (!response.ok) throw new Error("Failed to fetch sprawa")
    return response.json()
  }

  async createSprawa(data: CreateSprawa): Promise<Sprawa> {
    const response = await fetch(`${this.baseUrl}/sprawy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to create sprawa")
    return response.json()
  }

  async updateSprawa(id: number, data: Partial<CreateSprawa>): Promise<Sprawa> {
    const response = await fetch(`${this.baseUrl}/sprawy/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error("Failed to update sprawa")
    return response.json()
  }

  async deleteSprawa(id: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/sprawy/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete sprawa")
  }
}

export const apiClient = new ApiClient()

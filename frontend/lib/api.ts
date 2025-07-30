const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

export interface Kancelaria {
  id: number
  nazwa: string
  adres: string
  telefon: string
  email: string
  nip: string
  regon: string
  data_utworzenia: string
  aktywna: boolean
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
  data_utworzenia: string
  kancelaria_id: number
}

export interface Sprawa {
  id: number
  tytul: string
  opis: string
  status: "nowa" | "w_trakcie" | "zawieszona" | "zakonczona"
  data_utworzenia: string
  data_zakonczenia?: string
  klient_id: number
  kancelaria_id: number
}

export interface CreateKancelaria {
  nazwa: string
  adres: string
  telefon: string
  email: string
  nip: string
  regon: string
}

export interface CreateKlient {
  imie: string
  nazwisko: string
  email: string
  telefon: string
  adres: string
  pesel?: string
  nip?: string
  kancelaria_id: number
}

export interface CreateSprawa {
  tytul: string
  opis: string
  klient_id: number
  kancelaria_id: number
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Kancelarie endpoints
  async getKancelarie(): Promise<Kancelaria[]> {
    return this.request<Kancelaria[]>("/kancelarie")
  }

  async getKancelaria(id: number): Promise<Kancelaria> {
    return this.request<Kancelaria>(`/kancelarie/${id}`)
  }

  async createKancelaria(data: CreateKancelaria): Promise<Kancelaria> {
    return this.request<Kancelaria>("/kancelarie", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateKancelaria(id: number, data: Partial<CreateKancelaria>): Promise<Kancelaria> {
    return this.request<Kancelaria>(`/kancelarie/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteKancelaria(id: number): Promise<void> {
    return this.request<void>(`/kancelarie/${id}`, {
      method: "DELETE",
    })
  }

  // Klienci endpoints
  async getKlienci(): Promise<Klient[]> {
    return this.request<Klient[]>("/klienci")
  }

  async getKlient(id: number): Promise<Klient> {
    return this.request<Klient>(`/klienci/${id}`)
  }

  async createKlient(data: CreateKlient): Promise<Klient> {
    return this.request<Klient>("/klienci", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateKlient(id: number, data: Partial<CreateKlient>): Promise<Klient> {
    return this.request<Klient>(`/klienci/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteKlient(id: number): Promise<void> {
    return this.request<void>(`/klienci/${id}`, {
      method: "DELETE",
    })
  }

  // Sprawy endpoints
  async getSprawy(): Promise<Sprawa[]> {
    return this.request<Sprawa[]>("/sprawy")
  }

  async getSprawa(id: number): Promise<Sprawa> {
    return this.request<Sprawa>(`/sprawy/${id}`)
  }

  async createSprawa(data: CreateSprawa): Promise<Sprawa> {
    return this.request<Sprawa>("/sprawy", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateSprawa(id: number, data: Partial<CreateSprawa & { status: Sprawa["status"] }>): Promise<Sprawa> {
    return this.request<Sprawa>(`/sprawy/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async deleteSprawa(id: number): Promise<void> {
    return this.request<void>(`/sprawy/${id}`, {
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient()

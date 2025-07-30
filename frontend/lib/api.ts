const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

export interface Kancelaria {
  id?: number
  nazwa: string
  adres: string
  telefon: string
  email: string
  nip?: string
  regon?: string
  data_utworzenia?: string
}

export interface Klient {
  id?: number
  imie: string
  nazwisko: string
  email: string
  telefon: string
  adres: string
  pesel?: string
  data_urodzenia?: string
  kancelaria_id: number
}

export interface Sprawa {
  id?: number
  tytul: string
  opis: string
  status: "nowa" | "w_trakcie" | "zawieszona" | "zakonczona"
  data_utworzenia?: string
  data_zakonczenia?: string
  klient_id: number
  kancelaria_id: number
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
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

  async createKancelaria(data: Omit<Kancelaria, "id" | "data_utworzenia">): Promise<Kancelaria> {
    return this.request<Kancelaria>("/kancelarie", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateKancelaria(id: number, data: Partial<Kancelaria>): Promise<Kancelaria> {
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

  async createKlient(data: Omit<Klient, "id">): Promise<Klient> {
    return this.request<Klient>("/klienci", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateKlient(id: number, data: Partial<Klient>): Promise<Klient> {
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

  async createSprawa(data: Omit<Sprawa, "id" | "data_utworzenia">): Promise<Sprawa> {
    return this.request<Sprawa>("/sprawy", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateSprawa(id: number, data: Partial<Sprawa>): Promise<Sprawa> {
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

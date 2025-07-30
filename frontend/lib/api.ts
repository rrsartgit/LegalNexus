import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Types
export interface Kancelaria {
  id: number
  nazwa: string
  adres?: string
  telefon?: string
  email?: string
  nip?: string
  regon?: string
  opis?: string
  aktywna: boolean
  data_utworzenia: string
  data_aktualizacji?: string
}

export interface KancelariaCreate {
  nazwa: string
  adres?: string
  telefon?: string
  email?: string
  nip?: string
  regon?: string
  opis?: string
  aktywna?: boolean
}

export interface Klient {
  id: number
  imie: string
  nazwisko: string
  email?: string
  telefon?: string
  adres?: string
  pesel?: string
  nip?: string
  typ_klienta: string
  aktywny: boolean
  kancelaria_id: number
  data_utworzenia: string
  data_aktualizacji?: string
}

export interface KlientCreate {
  imie: string
  nazwisko: string
  email?: string
  telefon?: string
  adres?: string
  pesel?: string
  nip?: string
  typ_klienta?: string
  aktywny?: boolean
  kancelaria_id: number
}

export interface Sprawa {
  id: number
  numer_sprawy: string
  tytul: string
  opis?: string
  kategoria?: string
  status: string
  wartosc_sprawy?: number
  kancelaria_id: number
  klient_id: number
  data_rozpoczecia: string
  data_zakonczenia?: string
  data_utworzenia: string
  data_aktualizacji?: string
}

export interface SprawaCreate {
  numer_sprawy: string
  tytul: string
  opis?: string
  kategoria?: string
  status?: string
  wartosc_sprawy?: number
  kancelaria_id: number
  klient_id: number
}

// API functions
export const kancelariaApi = {
  getAll: () => api.get<Kancelaria[]>("/api/v1/kancelarie"),
  getById: (id: number) => api.get<Kancelaria>(`/api/v1/kancelarie/${id}`),
  create: (data: KancelariaCreate) => api.post<Kancelaria>("/api/v1/kancelarie", data),
  update: (id: number, data: Partial<KancelariaCreate>) => api.put<Kancelaria>(`/api/v1/kancelarie/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/kancelarie/${id}`),
}

export const klientApi = {
  getAll: () => api.get<Klient[]>("/api/v1/klienci"),
  getById: (id: number) => api.get<Klient>(`/api/v1/klienci/${id}`),
  create: (data: KlientCreate) => api.post<Klient>("/api/v1/klienci", data),
  update: (id: number, data: Partial<KlientCreate>) => api.put<Klient>(`/api/v1/klienci/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/klienci/${id}`),
}

export const sprawaApi = {
  getAll: () => api.get<Sprawa[]>("/api/v1/sprawy"),
  getById: (id: number) => api.get<Sprawa>(`/api/v1/sprawy/${id}`),
  create: (data: SprawaCreate) => api.post<Sprawa>("/api/v1/sprawy", data),
  update: (id: number, data: Partial<SprawaCreate>) => api.put<Sprawa>(`/api/v1/sprawy/${id}`, data),
  delete: (id: number) => api.delete(`/api/v1/sprawy/${id}`),
}

import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/logowanie"
    }
    return Promise.reject(error)
  },
)

// Types matching the FastAPI backend
export interface User {
  id: number
  email: string
  role: "CLIENT" | "OPERATOR" | "ADMIN"
  created_at: string
}

export interface Order {
  id: number
  user_id: number
  status: string
  document_type: string
  description: string
  created_at: string
  updated_at: string
}

export interface Document {
  id: number
  order_id: number
  file_name: string
  file_path: string
  uploaded_by: number
  created_at: string
}

export interface Analysis {
  id: number
  order_id: number
  preview_content?: string
  full_content: string
  created_at: string
}

export interface Payment {
  id: number
  order_id: number
  amount: number
  status: "PENDING" | "COMPLETED" | "FAILED"
  payment_gateway_charge_id?: string
  created_at: string
}

export interface LawFirm {
  id: number
  name: string
  address: string
  phone: string
  email: string
  specializations: string[]
  description: string
}

export interface Client {
  id: number
  email: string
  name?: string
  phone?: string
  // Add other client-specific fields
}

export interface Case {
  id: number
  client_id: number
  title: string
  description: string
  status: string
  created_at: string
  updated_at: string
}

export interface DashboardStatsResponse {
  total_users: number
  total_orders: number
  pending_orders: number
  completed_orders: number
  total_law_firms: number
}

export interface AdminUser {
  id: number
  email: string
  role: string
  is_active: boolean
  created_at: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
  user: {
    id: number
    email: string
    role: string
  }
}

export interface RegisterRequest {
  email: string
  password: string
}

export interface RegisterResponse {
  message: string
  user: {
    id: number
    email: string
    role: string
  }
}

export interface UserResponse {
  id: number
  email: string
  role: string
}

export interface CreateOrderRequest {
  document_type: string
  description: string
}

export interface CreateLawFirmRequest {
  name: string
  address: string
  phone: string
  email: string
  specializations: string[]
  description: string
}

export interface CreateCaseRequest {
  client_id: number
  title: string
  description: string
}

// Auth API
export const authApi = {
  login: (data: { email: string; password: string }) => apiClient.post("/api/v1/auth/login", data),
  register: (data: { email: string; password: string }) => apiClient.post("/api/v1/auth/register", data),
  getMe: () => apiClient.get("/api/v1/auth/me"),
}

// Orders API
export const ordersApi = {
  getAll: () => apiClient.get("/api/v1/orders"),
  create: (data: any) => apiClient.post("/api/v1/orders", data),
  getById: (id: string) => apiClient.get(`/api/v1/orders/${id}`),
  update: (id: string, data: any) => apiClient.put(`/api/v1/orders/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/orders/${id}`),
}

// Law Firms API
export const lawFirmsApi = {
  getAll: () => apiClient.get("/api/v1/law-firms"),
  create: (data: any) => apiClient.post("/api/v1/law-firms", data),
  getById: (id: string) => apiClient.get(`/api/v1/law-firms/${id}`),
  update: (id: string, data: any) => apiClient.put(`/api/v1/law-firms/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/law-firms/${id}`),
}

// Clients API
export const clientsApi = {
  getAll: () => apiClient.get("/api/v1/clients"),
  create: (data: any) => apiClient.post("/api/v1/clients", data),
  getById: (id: string) => apiClient.get(`/api/v1/clients/${id}`),
  update: (id: string, data: any) => apiClient.put(`/api/v1/clients/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/clients/${id}`),
}

// Cases API
export const casesApi = {
  getAll: () => apiClient.get("/api/v1/cases"),
  create: (data: any) => apiClient.post("/api/v1/cases", data),
  getById: (id: string) => apiClient.get(`/api/v1/cases/${id}`),
  update: (id: string, data: any) => apiClient.put(`/api/v1/cases/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/cases/${id}`),
}

// Dashboard API
export const dashboardApi = {
  getStats: () => apiClient.get("/api/v1/dashboard/stats"),
  getActivity: () => apiClient.get("/api/v1/dashboard/activity"), // Define a proper type for activity if available
}

// Admin Users API
export const adminUsersApi = {
  getAll: () => apiClient.get("/api/v1/admin/users"),
  create: (data: any) => apiClient.post("/api/v1/admin/users", data),
  getById: (id: string) => apiClient.get(`/api/v1/admin/users/${id}`),
  update: (id: string, data: any) => apiClient.put(`/api/v1/admin/users/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/admin/users/${id}`),
}

export default apiClient

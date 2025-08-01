import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000"

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear it and redirect to login
      localStorage.removeItem("token")
      // You might want to use Next.js router here, but for a simple interceptor,
      // direct window.location is often used or a global event emitter.
      // For Next.js client-side, you'd typically handle this in components
      // or use a custom hook that wraps axios calls.
      // For now, we'll just log and let the component handle the redirect.
      console.error("Unauthorized: Token expired or invalid. Redirecting to login.")
      // window.location.href = "/logowanie"; // This would force a full page reload
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

export const authApi = {
  login: (data: LoginRequest) => axiosInstance.post<LoginResponse>("/api/v1/auth/login", data),
  register: (data: RegisterRequest) => axiosInstance.post<RegisterResponse>("/api/v1/auth/register", data),
  getMe: () => axiosInstance.get<UserResponse>("/api/v1/auth/me"),
}

export const ordersApi = {
  getOrders: () => axiosInstance.get<Order[]>("/api/v1/orders/"),
  createOrder: (data: CreateOrderRequest) => axiosInstance.post<Order>("/api/v1/orders/", data),
  getOrderById: (orderId: number) => axiosInstance.get<Order>(`/api/v1/orders/${orderId}`),
  updateOrderStatus: (orderId: number, status: string) =>
    axiosInstance.put<Order>(`/api/v1/orders/${orderId}/status`, { status }),
}

export const lawFirmsApi = {
  getLawFirms: () => axiosInstance.get<LawFirm[]>("/api/v1/kancelarie/"),
  createLawFirm: (data: CreateLawFirmRequest) => axiosInstance.post<LawFirm>("/api/v1/kancelarie/", data),
  getLawFirmById: (firmId: number) => axiosInstance.get<LawFirm>(`/api/v1/kancelarie/${firmId}`),
  updateLawFirm: (firmId: number, data: Partial<LawFirm>) =>
    axiosInstance.put<LawFirm>(`/api/v1/kancelarie/${firmId}`, data),
  deleteLawFirm: (firmId: number) => axiosInstance.delete(`/api/v1/kancelarie/${firmId}`),
}

export const clientsApi = {
  getClients: () => axiosInstance.get<Client[]>("/api/v1/klienci/"),
  getClientById: (clientId: number) => axiosInstance.get<Client>(`/api/v1/klienci/${clientId}`),
  // Add create, update, delete if needed
}

export const casesApi = {
  getCases: () => axiosInstance.get<Case[]>("/api/v1/sprawy/"),
  createCase: (data: CreateCaseRequest) => axiosInstance.post<Case>("/api/v1/sprawy/", data),
  getCaseById: (caseId: number) => axiosInstance.get<Case>(`/api/v1/sprawy/${caseId}`),
  updateCaseStatus: (caseId: number, status: string) =>
    axiosInstance.put<Case>(`/api/v1/sprawy/${caseId}/status`, { status }),
}

export const dashboardApi = {
  getStats: () => axiosInstance.get<DashboardStatsResponse>("/api/v1/admin/dashboard/stats"),
  getActivity: () => axiosInstance.get<any[]>("/api/v1/admin/dashboard/activity"), // Define a proper type for activity if available
}

export const adminUsersApi = {
  getUsers: () => axiosInstance.get<AdminUser[]>("/api/v1/admin/users/"),
  getUserById: (userId: number) => axiosInstance.get<AdminUser>(`/api/v1/admin/users/${userId}`),
  updateUserStatus: (userId: number, isActive: boolean) =>
    axiosInstance.put(`/api/v1/admin/users/${userId}/status`, { is_active: isActive }),
  // Add other admin user management functions as needed
}

export default axiosInstance

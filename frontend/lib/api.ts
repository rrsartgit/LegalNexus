import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add Authorization header
api.interceptors.request.use(
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

// Response interceptor to handle token expiration or invalid tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    // If the error is 401 Unauthorized and it's not the login/refresh endpoint
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      // Here you might implement token refresh logic if your backend supports it
      // For now, we'll just clear the token and redirect to login
      localStorage.removeItem("token")
      // You might want to use a global event or a more robust state management
      // to trigger a redirect to the login page. For simplicity, we'll rely
      // on the AuthProvider to detect the token change.
      window.location.href = "/logowanie" // Redirect to login page
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
  client_id: number
  operator_id?: number
  title: string
  description?: string
  status: "NEW" | "IN_PROGRESS" | "AWAITING_CLIENT" | "AWAITING_PAYMENT" | "COMPLETED"
  created_at: string
  updated_at: string
  client?: User
  operator?: User
  documents?: Document[]
  analysis?: Analysis
  payment?: Payment
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

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  role?: "CLIENT" | "OPERATOR"
}

export interface CreateOrderRequest {
  title: string
  description?: string
}

export interface CreateAnalysisRequest {
  preview_content?: string
  full_content: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export const authApi = {
  login: (data: any) => api.post("/auth/login", data),
  register: (data: any) => api.post("/auth/register", data),
  getMe: () => api.get("/users/me"),
}

export const ordersApi = {
  createOrder: (data: { title: string; description: string }) => api.post("/orders/", data),
  uploadDocument: (orderId: number, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return api.post(`/orders/${orderId}/documents`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },
  getOrders: () => api.get("/orders/"),
  getOrderById: (orderId: number) => api.get(`/orders/${orderId}`),
  updateOrderStatus: (orderId: number, status: string) => api.patch(`/orders/${orderId}/status`, { status }),
  addAnalysis: (orderId: number, data: { preview_content: string; full_content: string }) =>
    api.post(`/orders/${orderId}/analysis`, data),
  getAnalysis: (orderId: number) => api.get(`/orders/${orderId}/analysis`),
  createPaymentIntent: (orderId: number, amount: number) =>
    api.post(`/payments/create-payment-intent`, { order_id: orderId, amount }),
  confirmPayment: (paymentId: string) => api.post(`/payments/${paymentId}/confirm`),
}

export const adminApi = {
  getUsers: () => api.get("/admin/users"),
  updateUserRole: (userId: number, role: string) => api.patch(`/admin/users/${userId}/role`, { role }),
  getDashboardStats: () => api.get("/admin/dashboard/stats"),
  getRecentActivity: () => api.get("/admin/dashboard/activity"),
}

export default api

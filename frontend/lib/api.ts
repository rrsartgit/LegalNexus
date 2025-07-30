const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1"

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

class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    // Load token from localStorage on initialization
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("access_token")
    }
  }

  setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token)
    }
  }

  clearToken() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  private async uploadRequest<T>(endpoint: string, formData: FormData): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const headers: HeadersInit = {}

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Authentication endpoints
  async login(data: LoginRequest): Promise<AuthResponse> {
    const formData = new FormData()
    formData.append("username", data.email)
    formData.append("password", data.password)

    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || "Login failed")
    }

    const result = await response.json()
    this.setToken(result.access_token)
    return result
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const result = await this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
    this.setToken(result.access_token)
    return result
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>("/auth/me")
  }

  // Orders endpoints
  async getOrders(): Promise<Order[]> {
    return this.request<Order[]>("/orders/")
  }

  async getOrder(id: number): Promise<Order> {
    return this.request<Order>(`/orders/${id}`)
  }

  async createOrder(data: CreateOrderRequest): Promise<Order> {
    return this.request<Order>("/orders/", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async updateOrderStatus(id: number, status: Order["status"]): Promise<Order> {
    return this.request<Order>(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    })
  }

  async assignOrder(id: number, operator_id: number): Promise<Order> {
    return this.request<Order>(`/orders/${id}/assign`, {
      method: "PUT",
      body: JSON.stringify({ operator_id }),
    })
  }

  // Documents endpoints
  async uploadDocument(orderId: number, file: File): Promise<Document> {
    const formData = new FormData()
    formData.append("file", file)
    return this.uploadRequest<Document>(`/documents/upload/${orderId}`, formData)
  }

  async getOrderDocuments(orderId: number): Promise<Document[]> {
    return this.request<Document[]>(`/documents/order/${orderId}`)
  }

  async downloadDocument(id: number): Promise<Blob> {
    const response = await fetch(`${this.baseUrl}/documents/download/${id}`, {
      headers: this.token ? { Authorization: `Bearer ${this.token}` } : {},
    })

    if (!response.ok) {
      throw new Error("Failed to download document")
    }

    return response.blob()
  }

  // Analysis endpoints
  async createAnalysis(orderId: number, data: CreateAnalysisRequest): Promise<Analysis> {
    return this.request<Analysis>(`/analyses/${orderId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getAnalysis(orderId: number): Promise<Analysis> {
    return this.request<Analysis>(`/analyses/${orderId}`)
  }

  // Payment endpoints
  async createPaymentIntent(orderId: number): Promise<{ client_secret: string }> {
    return this.request<{ client_secret: string }>(`/payments/create-intent/${orderId}`, {
      method: "POST",
    })
  }

  async confirmPayment(orderId: number, paymentIntentId: string): Promise<Payment> {
    return this.request<Payment>(`/payments/confirm/${orderId}`, {
      method: "POST",
      body: JSON.stringify({ payment_intent_id: paymentIntentId }),
    })
  }

  // Users endpoints (admin only)
  async getUsers(): Promise<User[]> {
    return this.request<User[]>("/users/")
  }

  async updateUserRole(id: number, role: User["role"]): Promise<User> {
    return this.request<User>(`/users/${id}/role`, {
      method: "PUT",
      body: JSON.stringify({ role }),
    })
  }

  // Dashboard stats
  async getDashboardStats(): Promise<{
    total_orders: number
    pending_orders: number
    completed_orders: number
    total_revenue: number
  }> {
    return this.request("/orders/dashboard/stats")
  }
}

export const apiClient = new ApiClient()

import type { User as AuthUser } from "@supabase/supabase-js"

export type UserRole = "admin" | "client" | "operator" | null

export interface User extends AuthUser {
  id: string
  email: string
  role: "client" | "admin" | "operator"
}

export interface LawFirm {
  id: number
  name: string
  address: string
  phone: string
  email: string
  specializations: string[]
  description: string
  rating: number
  reviews: number
}

export interface Specialization {
  id: string
  name: string
  description?: string
}

export interface Document {
  id: string
  caseId: string
  name: string
  type: "pdf" | "image" | "docx"
  url: string
  uploadedAt: Date
  size: number
}

export interface Analysis {
  id: string
  caseId: string
  content: string
  summary: string
  recommendations: string[]
  possibleDocuments: {
    id: string
    name: string
    description: string
    price: number
    estimatedTime: string
    category: string
  }[]
  price: number
  status: "pending" | "completed" | "rejected"
  previewContent: string
  createdAt: Date
}

export interface GeneratedDocument {
  id: string
  caseId: string
  name: string
  type: "pdf" | "docx"
  url: string
  generatedAt: Date
  price: number
}

export interface Case {
  id: number
  title: string
  description: string
  status: "open" | "in_progress" | "closed"
  client_id: string
  assigned_law_firm_id?: number
  documents: Document[]
  analysis?: Analysis
  generatedDocuments: GeneratedDocument[]
  clientNotes?: string
  operatorNotes?: string
  created_at: string
  updatedAt: string
}

export interface Subscription {
  id: string
  user_id: string
  plan_id: string
  status: "active" | "inactive" | "cancelled"
  start_date: string
  end_date: string
  price: number
  currency: string
  stripe_subscription_id?: string
}

export interface Payment {
  id: string
  user_id: string
  amount: number
  currency: string
  status: "pending" | "completed" | "failed"
  payment_method: string
  transaction_id: string
  created_at: string
}

export interface ActivityLog {
  id: string
  user_id: string
  action: string
  details: string
  created_at: string
}

export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  newCasesLastMonth: number
  completedCasesLastMonth: number
  revenueLastMonth: number
  pendingAnalysis: number
}

export interface UserManagementUser {
  id: string
  email: string
  name: string
  role: UserRole
  status: "active" | "inactive" | "suspended"
  created_at: string
  last_login_at: string
  cases_count: number
  subscription_status: "active" | "inactive" | "none"
}

export interface Order {
  id: number
  user_id: string
  service_type: string
  status: "pending" | "processing" | "completed" | "cancelled"
  created_at: string
  updated_at: string
}

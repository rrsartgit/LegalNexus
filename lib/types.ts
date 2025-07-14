export interface Document {
  id: string
  name: string
  type: "pdf" | "image"
  url: string
  uploadedAt: Date
  size: number
}

export interface Case {
  id: string
  name: string
  clientId: string
  status: "new" | "analyzing" | "analysis_ready" | "documents_ready" | "completed"
  documents: Document[]
  analysis?: Analysis
  generatedDocuments: GeneratedDocument[]
  clientNotes?: string
  operatorNotes?: string
  createdAt: Date
  updatedAt: Date
}

export interface Analysis {
  id: string
  caseId: string
  content: string
  summary: string
  recommendations: string[]
  possibleDocuments: DocumentOption[]
  price: number
  status: "pending" | "completed"
  previewContent?: string // First 1/3 of content for preview
  createdAt: Date
}

export interface DocumentOption {
  id: string
  name: string
  description: string
  price: number
  estimatedTime: string
  category: string
}

export interface GeneratedDocument {
  id: string
  caseId: string
  optionId: string
  name: string
  content: string
  instructions: string
  price: number
  status: "pending" | "completed" | "purchased"
  previewContent?: string // First 1/3 of content for preview
  createdAt: Date
}

export interface Payment {
  id: string
  caseId: string
  amount: number
  type: "analysis" | "document"
  status: "pending" | "completed" | "failed"
  method: "card" | "blik" | "transfer" | "google_pay"
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: Date
}

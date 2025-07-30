"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { apiClient, type User, type LoginRequest, type RegisterRequest } from "./api"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: LoginRequest) => Promise<void>
  register: (data: RegisterRequest) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isOperator: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("access_token")
        if (token) {
          const currentUser = await apiClient.getCurrentUser()
          setUser(currentUser)
        }
      } catch (error) {
        // Token is invalid, clear it
        localStorage.removeItem("access_token")
        apiClient.clearToken()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (data: LoginRequest) => {
    const response = await apiClient.login(data)
    setUser(response.user)
  }

  const register = async (data: RegisterRequest) => {
    const response = await apiClient.register(data)
    setUser(response.user)
  }

  const logout = () => {
    apiClient.clearToken()
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isOperator: user?.role === "OPERATOR" || user?.role === "ADMIN",
    isAdmin: user?.role === "ADMIN",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

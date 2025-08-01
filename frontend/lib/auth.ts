"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { authApi } from "./api"
import { useRouter } from "next/navigation"

interface User {
  id: number
  email: string
  role: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  signInWithEmail: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>
  signUpWithEmail: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const loadUserFromToken = useCallback(async () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const response = await authApi.getMe()
        setUser(response.data)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        localStorage.removeItem("token")
        setUser(null)
        setIsAuthenticated(false)
      }
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadUserFromToken()
  }, [loadUserFromToken])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password })
      const { access_token, user: userData } = response.data
      localStorage.setItem("token", access_token)
      setUser(userData)
      setIsAuthenticated(true)
      return { user: userData, error: null }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Nieprawidłowy email lub hasło."
      return { user: null, error: errorMessage }
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const response = await authApi.register({ email, password })
      const { user: userData } = response.data // Register might not return a token directly
      // After successful registration, you might want to automatically log them in
      // or redirect to login page. For now, we'll just return the user.
      return { user: userData, error: null }
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Błąd rejestracji."
      return { user: null, error: errorMessage }
    }
  }

  const signOut = async () => {
    localStorage.removeItem("token")
    setUser(null)
    setIsAuthenticated(false)
    router.push("/") // Redirect to home page
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, signInWithEmail, signUpWithEmail, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

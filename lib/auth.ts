"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface User {
  id: number
  email: string
  role: "admin" | "client" | "operator"
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

  const loadUserFromStorage = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error)
      localStorage.removeItem("user")
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadUserFromStorage()
  }, [loadUserFromStorage])

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Mock authentication - in real app, this would call your API
      const mockUser: User = {
        id: 1,
        email: email,
        role: email.includes("admin") ? "admin" : email.includes("operator") ? "operator" : "client",
      }

      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
      return { user: mockUser, error: null }
    } catch (error: any) {
      const errorMessage = "Nieprawidłowy email lub hasło."
      return { user: null, error: errorMessage }
    }
  }

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      // Mock registration - in real app, this would call your API
      const mockUser: User = {
        id: Date.now(),
        email: email,
        role: "client",
      }

      return { user: mockUser, error: null }
    } catch (error: any) {
      const errorMessage = "Błąd rejestracji."
      return { user: null, error: errorMessage }
    }
  }

  const signOut = async () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
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

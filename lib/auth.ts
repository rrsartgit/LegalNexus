"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "client" | "operator"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  role: string | null
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  role: null,
})

export function useAuth() {
  return useContext(AuthContext)
}

// Mock authentication functions
export function mockLogin(email: string, password: string) {
  // Mock user data
  const mockUser: User = {
    id: "1",
    name: "Jan Kowalski",
    email: email,
    role: "client",
  }

  localStorage.setItem("user", JSON.stringify(mockUser))
  window.location.reload()
}

export function mockLogout() {
  localStorage.removeItem("user")
  window.location.reload()
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

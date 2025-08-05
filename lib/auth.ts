"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  const fetchUser = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase.auth.getUser()
    if (data?.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
        role: (data.user.user_metadata?.role as "client" | "admin" | "operator") || "client",
      })
    } else {
      setUser(null)
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        fetchUser()
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [fetchUser, supabase])

  const login = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      console.error("Login error:", error.message)
      return { success: false, error: error.message }
    }
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
        role: (data.user.user_metadata?.role as "client" | "admin" | "operator") || "client",
      })
      // Redirect based on role after successful login
      if (data.user.user_metadata?.role === "admin") {
        router.push("/admin")
      } else if (data.user.user_metadata?.role === "operator") {
        router.push("/panel-operatora")
      } else {
        router.push("/panel-klienta")
      }
      return { success: true }
    }
    return { success: false, error: "Unknown login error" }
  }

  const register = async (email: string, password: string) => {
    setLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: "client", // Default role for new registrations
        },
      },
    })
    setLoading(false)
    if (error) {
      console.error("Registration error:", error.message)
      return { success: false, error: error.message }
    }
    if (data.user) {
      setUser({
        id: data.user.id,
        email: data.user.email || "",
        role: "client",
      })
      router.push("/panel-klienta") // Redirect new users to client panel
      return { success: true }
    }
    return { success: false, error: "Unknown registration error" }
  }

  const logout = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    setLoading(false)
    if (error) {
      console.error("Logout error:", error.message)
    } else {
      setUser(null)
      router.push("/")
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

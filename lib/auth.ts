"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import type { User } from "@/lib/types"
import { useState, useEffect, createContext, useContext, useCallback } from "react"

interface AuthContextType {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ user: User | null; error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser({
          id: user.id,
          email: user.email || "",
          role: (user.user_metadata?.role as string) || "client", // Default role
          avatar_url: user.user_metadata?.avatar_url as string | undefined,
        })
      }
      setLoading(false)
    }

    fetchUser()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          role: (session.user.user_metadata?.role as string) || "client",
          avatar_url: session.user.user_metadata?.avatar_url as string | undefined,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [supabase])

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setLoading(false)
        return { user: null, error }
      }
      if (data.user) {
        const fetchedUser: User = {
          id: data.user.id,
          email: data.user.email || "",
          role: (data.user.user_metadata?.role as string) || "client",
          avatar_url: data.user.user_metadata?.avatar_url as string | undefined,
        }
        setUser(fetchedUser)
        setLoading(false)
        return { user: fetchedUser, error: null }
      }
      setLoading(false)
      return { user: null, error: new Error("Sign in failed: No user data") }
    },
    [supabase],
  )

  const signUp = useCallback(
    async (email: string, password: string) => {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "client", // Default role for new sign-ups
          },
        },
      })
      if (error) {
        setLoading(false)
        return { user: null, error }
      }
      if (data.user) {
        const fetchedUser: User = {
          id: data.user.id,
          email: data.user.email || "",
          role: (data.user.user_metadata?.role as string) || "client",
          avatar_url: data.user.user_metadata?.avatar_url as string | undefined,
        }
        setUser(fetchedUser)
        setLoading(false)
        return { user: fetchedUser, error: null }
      }
      setLoading(false)
      return { user: null, error: new Error("Sign up failed: No user data") }
    },
    [supabase],
  )

  const signOut = useCallback(async () => {
    setLoading(true)
    const { error } = await supabase.auth.signOut()
    if (error) {
      setLoading(false)
      return { error }
    }
    setUser(null)
    setLoading(false)
    return { error: null }
  }, [supabase])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, signIn, signUp, signOut }}>
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

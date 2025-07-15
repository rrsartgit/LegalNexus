import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createClient } from "@/lib/supabase/client" // Import Supabase client

export interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: "client" | "operator" | "admin"
  createdAt: Date
  avatar?: string
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  // New: Supabase specific actions
  signInWithEmail: (email: string, password: string) => Promise<{ user: User | null; error: string | null }>
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ user: User | null; error: string | null }>
  signOut: () => Promise<{ error: string | null }>
  fetchUserSession: () => Promise<void>
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
      signInWithEmail: async (email, password) => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
          console.error("Login error:", error.message)
          return { user: null, error: error.message }
        }

        if (data.user) {
          const user: User = {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata?.name || data.user.email?.split("@")[0] || "Użytkownik",
            role: (data.user.user_metadata?.role as "client" | "operator" | "admin") || "client",
            createdAt: new Date(data.user.created_at),
            phone: data.user.phone || undefined,
            avatar: data.user.user_metadata?.avatar || undefined,
          }
          set({ user, isAuthenticated: true })
          return { user, error: null }
        }
        return { user: null, error: "Nieoczekiwany błąd logowania." }
      },
      signUpWithEmail: async (email, password, name) => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name, role: "client" }, // Default role for new sign-ups
          },
        })

        if (error) {
          console.error("Sign up error:", error.message)
          return { user: null, error: error.message }
        }

        if (data.user) {
          const user: User = {
            id: data.user.id,
            email: data.user.email || "",
            name: data.user.user_metadata?.name || name,
            role: (data.user.user_metadata?.role as "client" | "operator" | "admin") || "client",
            createdAt: new Date(data.user.created_at),
            phone: data.user.phone || undefined,
            avatar: data.user.user_metadata?.avatar || undefined,
          }
          set({ user, isAuthenticated: true })
          return { user, error: null }
        }
        return { user: null, error: "Nieoczekiwany błąd rejestracji." }
      },
      signOut: async () => {
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if (error) {
          console.error("Logout error:", error.message)
          return { error: error.message }
        }
        set({ user: null, isAuthenticated: false })
        return { error: null }
      },
      fetchUserSession: async () => {
        const supabase = createClient()
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error fetching session:", error.message)
          set({ user: null, isAuthenticated: false })
          return
        }

        if (session?.user) {
          const user: User = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || session.user.email?.split("@")[0] || "Użytkownik",
            role: (session.user.user_metadata?.role as "client" | "operator" | "admin") || "client",
            createdAt: new Date(session.user.created_at),
            phone: session.user.phone || undefined,
            avatar: session.user.user_metadata?.avatar || undefined,
          }
          set({ user, isAuthenticated: true })
        } else {
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: "auth-storage",
      // Only store user and isAuthenticated in local storage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      // Hydrate the store on load
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Fetch the latest session from Supabase on rehydration
          state.fetchUserSession()
        }
      },
    },
  ),
)

// Remove mockLogin as it's no longer needed with real auth
// export const mockLogin = (email: string, role: "client" | "operator" | "admin" = "client") => {
//   const user: User = {
//     id: Math.random().toString(36).substr(2, 9),
//     email,
//     name: email.split("@")[0],
//     role,
//     createdAt: new Date(),
//   }
//   useAuth.getState().login(user)
//   return user
// }

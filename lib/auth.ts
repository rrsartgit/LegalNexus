import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"

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

      /* ------------------------------------------------------------ */
      /* Local state helpers                                          */
      /* ------------------------------------------------------------ */
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => {
        const current = get().user
        if (current) set({ user: { ...current, ...updates } })
      },

      /* ------------------------------------------------------------ */
      /* Supabase helpers                                             */
      /* ------------------------------------------------------------ */
      signInWithEmail: async (email, password) => {
        if (!isSupabaseConfigured()) {
          return { user: null, error: "Logowanie chwilowo niedostępne (Supabase not configured)." }
        }

        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) return { user: null, error: error.message }

        const u = data.user
        if (!u) return { user: null, error: "Nieoczekiwany błąd logowania." }

        const user: User = {
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || u.email?.split("@")[0] || "Użytkownik",
          role: (u.user_metadata?.role as User["role"]) || "client",
          createdAt: new Date(u.created_at),
          phone: u.phone || undefined,
          avatar: u.user_metadata?.avatar || undefined,
        }
        set({ user, isAuthenticated: true })
        return { user, error: null }
      },

      signUpWithEmail: async (email, password, name) => {
        if (!isSupabaseConfigured()) {
          return { user: null, error: "Rejestracja chwilowo niedostępna (Supabase not configured)." }
        }

        const supabase = createClient()
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name, role: "client" } },
        })

        if (error) return { user: null, error: error.message }

        const u = data.user
        if (!u) return { user: null, error: "Nieoczekiwany błąd rejestracji." }

        const user: User = {
          id: u.id,
          email: u.email || "",
          name: u.user_metadata?.name || name,
          role: (u.user_metadata?.role as User["role"]) || "client",
          createdAt: new Date(u.created_at),
          phone: u.phone || undefined,
          avatar: u.user_metadata?.avatar || undefined,
        }
        set({ user, isAuthenticated: true })
        return { user, error: null }
      },

      signOut: async () => {
        if (!isSupabaseConfigured()) {
          set({ user: null, isAuthenticated: false })
          return { error: null }
        }
        const { error } = await createClient().auth.signOut()
        if (!error) set({ user: null, isAuthenticated: false })
        return { error: error?.message || null }
      },

      fetchUserSession: async () => {
        if (!isSupabaseConfigured()) {
          /* Silent no-op when Supabase isn’t configured. */
          return
        }
        const { data, error } = await createClient().auth.getSession()

        if (error || !data.session?.user) {
          set({ user: null, isAuthenticated: false })
          return
        }

        const u = data.session.user
        set({
          user: {
            id: u.id,
            email: u.email || "",
            name: u.user_metadata?.name || u.email?.split("@")[0] || "Użytkownik",
            role: (u.user_metadata?.role as User["role"]) || "client",
            createdAt: new Date(u.created_at),
            phone: u.phone || undefined,
            avatar: u.user_metadata?.avatar || undefined,
          },
          isAuthenticated: true,
        })
      },
    }),
    {
      name: "auth-storage",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
      onRehydrateStorage: () => (s) => s?.fetchUserSession(),
    },
  ),
)

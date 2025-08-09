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
  loading: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void

  signInWithEmail: (
    email: string,
    password: string,
  ) => Promise<{ user: User | null; error: string | null; mfa?: { factorId: string } | null }>
  signUpWithEmail: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{ user: User | null; error: string | null }>
  signInWithOAuth: (provider: "google" | "facebook") => Promise<boolean>
  signInWithOtpEmail: (email: string) => Promise<boolean>
  verifyOtpEmail: (email: string, token: string) => Promise<{ user: User | null; error: string | null } | null>
  signOut: () => Promise<{ error: string | null }>
  fetchUserSession: () => Promise<void>

  // 2FA (TOTP)
  enableTotp: () => Promise<{ uri: string; factorId: string } | null>
  verifyTotp: (factorId: string, code: string) => Promise<boolean>
  verifyMfaChallenge: (factorId: string, code: string) => Promise<boolean>
}

function determineRoleFromEmail(email: string): User["role"] {
  if (email.toLowerCase().includes("admin")) return "admin"
  if (email.toLowerCase().includes("operator")) return "operator"
  return "client"
}

function supabaseUserToLocal(user: any): User {
  const role = user.user_metadata?.role || determineRoleFromEmail(user.email || "")
  return {
    id: user.id,
    email: user.email ?? "",
    name: user.user_metadata?.name ?? user.email?.split("@")[0] ?? "Użytkownik",
    role,
    createdAt: new Date(user.created_at ?? Date.now()),
    phone: user.phone || undefined,
    avatar: user.user_metadata?.avatar || undefined,
  }
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: (user) => set({ user, isAuthenticated: true, loading: false }),
      logout: () => set({ user: null, isAuthenticated: false, loading: false }),
      updateUser: (updates) => {
        const current = get().user
        if (current) set({ user: { ...current, ...updates } })
      },

      signInWithEmail: async (email, password) => {
        set({ loading: true })

        if (!isSupabaseConfigured()) {
          const role = determineRoleFromEmail(email)
          const mockUser: User = {
            id: "mock-" + Math.random().toString(36).slice(2, 9),
            email,
            name: email.split("@")[0],
            role,
            createdAt: new Date(),
          }
          set({ user: mockUser, isAuthenticated: true, loading: false })
          return { user: mockUser, error: null, mfa: null }
        }

        try {
          const supabase = createClient()!
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })

          // If MFA is required, error will have code 'mfa_required'
          // and data may contain "mfa" info. We initiate a challenge.
          // See Supabase MFA docs.
          // @ts-ignore - supabase types may vary by version
          if (error?.status === 400 && (error.name === "AuthMFAError" || error.message?.includes("mfa"))) {
            // @ts-ignore
            const factorId = error?.cause?.mfa?.factors?.[0]?.id
            if (factorId) {
              // Initiate challenge
              // @ts-ignore
              const { data: chall } = await supabase.auth.mfa.challenge({ factorId })
              set({ loading: false })
              return { user: null, error: null, mfa: { factorId: chall?.id || factorId } }
            }
          }

          if (error) {
            set({ loading: false })
            return { user: null, error: error.message, mfa: null }
          }

          if (!data.user) {
            set({ loading: false })
            return { user: null, error: "Nieoczekiwany błąd logowania", mfa: null }
          }

          const user = supabaseUserToLocal(data.user)
          set({ user, isAuthenticated: true, loading: false })
          return { user, error: null, mfa: null }
        } catch (e) {
          set({ loading: false })
          return { user: null, error: "Błąd połączenia z serwerem", mfa: null }
        }
      },

      signUpWithEmail: async (email, password, name) => {
        set({ loading: true })

        if (!isSupabaseConfigured()) {
          const role = determineRoleFromEmail(email)
          const mockUser: User = {
            id: "mock-" + Math.random().toString(36).slice(2, 9),
            email,
            name,
            role,
            createdAt: new Date(),
          }
          set({ user: mockUser, isAuthenticated: true, loading: false })
          return { user: mockUser, error: null }
        }

        try {
          const supabase = createClient()!
          const role = determineRoleFromEmail(email)
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name, role } },
          })
          if (error) {
            set({ loading: false })
            return { user: null, error: error.message }
          }
          const user = data.user ? supabaseUserToLocal(data.user) : null
          set({ user, isAuthenticated: !!user, loading: false })
          return { user, error: null }
        } catch {
          set({ loading: false })
          return { user: null, error: "Błąd rejestracji" }
        }
      },

      signInWithOAuth: async (provider) => {
        if (!isSupabaseConfigured()) return false
        try {
          const supabase = createClient()!
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo: typeof window !== "undefined" ? window.location.origin + "/panel-klienta" : undefined,
            },
          })
          return !error
        } catch {
          return false
        }
      },

      signInWithOtpEmail: async (email) => {
        if (!isSupabaseConfigured()) {
          // Mock success
          return true
        }
        try {
          const supabase = createClient()!
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true },
          })
          return !error
        } catch {
          return false
        }
      },

      verifyOtpEmail: async (email, token) => {
        if (!isSupabaseConfigured()) {
          const mockUser: User = {
            id: "mock-" + Math.random().toString(36).slice(2, 9),
            email,
            name: email.split("@")[0],
            role: determineRoleFromEmail(email),
            createdAt: new Date(),
          }
          get().login(mockUser)
          return { user: mockUser, error: null }
        }
        try {
          const supabase = createClient()!
          const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" })
          if (error) return { user: null, error: error.message }
          const user = data.user ? supabaseUserToLocal(data.user) : null
          if (user) get().login(user)
          return { user, error: null }
        } catch {
          return null
        }
      },

      enableTotp: async () => {
        if (!isSupabaseConfigured()) return null
        try {
          const supabase = createClient()!
          // @ts-ignore
          const { data, error } = await supabase.auth.mfa.enroll({ factorType: "totp" })
          if (error) return null
          // data contains { id, type, totp: { qr_code, secret, uri } }
          return { uri: data.totp?.uri as string, factorId: data.id as string }
        } catch {
          return null
        }
      },

      verifyTotp: async (factorId, code) => {
        if (!isSupabaseConfigured()) return true
        try {
          const supabase = createClient()!
          // @ts-ignore
          const { error } = await supabase.auth.mfa.verify({ factorId, code })
          return !error
        } catch {
          return false
        }
      },

      verifyMfaChallenge: async (factorId, code) => {
        if (!isSupabaseConfigured()) return true
        try {
          const supabase = createClient()!
          // @ts-ignore
          const { error } = await supabase.auth.mfa.verify({ factorId, code })
          return !error
        } catch {
          return false
        }
      },

      signOut: async () => {
        set({ loading: true })
        if (!isSupabaseConfigured()) {
          set({ user: null, isAuthenticated: false, loading: false })
          return { error: null }
        }
        try {
          const supabase = createClient()!
          const { error } = await supabase.auth.signOut()
          set({ user: null, isAuthenticated: false, loading: false })
          return { error: error?.message || null }
        } catch {
          set({ user: null, isAuthenticated: false, loading: false })
          return { error: null }
        }
      },

      fetchUserSession: async () => {
        if (!isSupabaseConfigured()) return
        try {
          const supabase = createClient()!
          const { data } = await supabase.auth.getSession()
          const sUser = data.session?.user
          if (sUser) set({ user: supabaseUserToLocal(sUser), isAuthenticated: true })
          else set({ user: null, isAuthenticated: false })
        } catch {
          set({ user: null, isAuthenticated: false })
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }),
    },
  ),
)

// Dev helpers
export const mockLogin = (email: string, role: User["role"] = "client"): User => {
  const u: User = {
    id: Math.random().toString(36).slice(2, 9),
    email,
    name: email.split("@")[0],
    role,
    createdAt: new Date(),
  }
  useAuth.getState().login(u)
  return u
}
export const mockLogout = (): void => {
  useAuth.getState().logout()
}

if (typeof window !== "undefined") {
  useAuth.getState().fetchUserSession()
}

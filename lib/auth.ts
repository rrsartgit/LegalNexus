import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"

export interface User {
  id: string
  email: string
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

  // Auth flows
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
  verifyMfaChallenge: (factorId: string, code: string) => Promise<boolean>
  enableTotp: () => Promise<{ uri: string; factorId: string } | null>
  verifyTotp: (factorId: string, code: string) => Promise<boolean>
  signOut: () => Promise<{ error: string | null }>
  fetchUserSession: () => Promise<void>
}

function roleFromEmail(email: string): User["role"] {
  const e = email.toLowerCase()
  if (e.includes("admin")) return "admin"
  if (e.includes("operator")) return "operator"
  return "client"
}
function supabaseUserToLocal(u: any): User {
  return {
    id: u.id,
    email: u.email ?? "",
    name: u.user_metadata?.name ?? u.email?.split("@")[0] ?? "Użytkownik",
    role: u.user_metadata?.role ?? roleFromEmail(u.email ?? ""),
    createdAt: new Date(u.created_at ?? Date.now()),
    avatar: u.user_metadata?.avatar || undefined,
  }
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,

      login: (user) => set({ user, isAuthenticated: true, loading: false }),
      logout: () => set({ user: null, isAuthenticated: false }),
      updateUser: (updates) => {
        const u = get().user
        if (u) set({ user: { ...u, ...updates } })
      },

      signInWithEmail: async (email, password) => {
        set({ loading: true })
        if (!isSupabaseConfigured()) {
          const mock: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split("@")[0],
            role: roleFromEmail(email),
            createdAt: new Date(),
          }
          set({ user: mock, isAuthenticated: true, loading: false })
          return { user: mock, error: null, mfa: null }
        }
        try {
          const sb = createClient()!
          const { data, error } = await sb.auth.signInWithPassword({ email, password })
          // MFA (TOTP) may be required. For simplicity, assume standard flow unless your project enforces MFA at sign-in.
          if (error) {
            set({ loading: false })
            return { user: null, error: error.message, mfa: null }
          }
          const u = data.user ? supabaseUserToLocal(data.user) : null
          set({ user: u, isAuthenticated: !!u, loading: false })
          return { user: u, error: null, mfa: null }
        } catch {
          set({ loading: false })
          return { user: null, error: "Błąd logowania", mfa: null }
        }
      },

      signUpWithEmail: async (email, password, name) => {
        set({ loading: true })
        if (!isSupabaseConfigured()) {
          const mock: User = { id: crypto.randomUUID(), email, name, role: roleFromEmail(email), createdAt: new Date() }
          set({ user: mock, isAuthenticated: true, loading: false })
          return { user: mock, error: null }
        }
        try {
          const sb = createClient()!
          const { data, error } = await sb.auth.signUp({
            email,
            password,
            options: { data: { name, role: roleFromEmail(email) } },
          })
          if (error) {
            set({ loading: false })
            return { user: null, error: error.message }
          }
          const u = data.user ? supabaseUserToLocal(data.user) : null
          set({ user: u, isAuthenticated: !!u, loading: false })
          return { user: u, error: null }
        } catch {
          set({ loading: false })
          return { user: null, error: "Błąd rejestracji" }
        }
      },

      signInWithOAuth: async (provider) => {
        if (!isSupabaseConfigured()) return false
        try {
          const sb = createClient()!
          const { error } = await sb.auth.signInWithOAuth({
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
        if (!isSupabaseConfigured()) return true
        try {
          const sb = createClient()!
          const { error } = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true } })
          return !error
        } catch {
          return false
        }
      },

      verifyOtpEmail: async (email, token) => {
        if (!isSupabaseConfigured()) {
          const mock: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split("@")[0],
            role: roleFromEmail(email),
            createdAt: new Date(),
          }
          get().login(mock)
          return { user: mock, error: null }
        }
        try {
          const sb = createClient()!
          const { data, error } = await sb.auth.verifyOtp({ email, token, type: "email" })
          if (error) return { user: null, error: error.message }
          const u = data.user ? supabaseUserToLocal(data.user) : null
          if (u) get().login(u)
          return { user: u, error: null }
        } catch {
          return null
        }
      },

      // 2FA (TOTP)
      enableTotp: async () => {
        if (!isSupabaseConfigured()) return null
        try {
          const sb = createClient()!
          // @ts-ignore
          const { data, error } = await sb.auth.mfa.enroll({ factorType: "totp" })
          if (error) return null
          return { uri: data.totp?.uri as string, factorId: data.id as string }
        } catch {
          return null
        }
      },
      verifyTotp: async (factorId, code) => {
        if (!isSupabaseConfigured()) return true
        try {
          const sb = createClient()!
          // @ts-ignore
          const { error } = await sb.auth.mfa.verify({ factorId, code })
          return !error
        } catch {
          return false
        }
      },
      verifyMfaChallenge: async (factorId, code) => {
        if (!isSupabaseConfigured()) return true
        try {
          const sb = createClient()!
          // @ts-ignore
          const { error } = await sb.auth.mfa.verify({ factorId, code })
          return !error
        } catch {
          return false
        }
      },

      signOut: async () => {
        if (!isSupabaseConfigured()) {
          useAuth.setState({ user: null, isAuthenticated: false })
          return { error: null }
        }
        try {
          const sb = createClient()!
          const { error } = await sb.auth.signOut()
          useAuth.setState({ user: null, isAuthenticated: false })
          return { error: error?.message || null }
        } catch {
          useAuth.setState({ user: null, isAuthenticated: false })
          return { error: null }
        }
      },

      fetchUserSession: async () => {
        if (!isSupabaseConfigured()) return
        try {
          const sb = createClient()!
          const { data } = await sb.auth.getSession()
          const sUser = data.session?.user
          if (sUser) useAuth.setState({ user: supabaseUserToLocal(sUser), isAuthenticated: true })
        } catch {
          // ignore
        }
      },
    }),
    { name: "auth-storage", partialize: (s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }) },
  ),
)

export const useAuthState = useAuth

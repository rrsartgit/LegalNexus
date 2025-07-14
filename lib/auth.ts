import { create } from "zustand"
import { persist } from "zustand/middleware"

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
    }),
    {
      name: "auth-storage",
    },
  ),
)

export const mockLogin = (email: string, role: "client" | "operator" | "admin" = "client") => {
  const user: User = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name: email.split("@")[0],
    role,
    createdAt: new Date(),
  }
  useAuth.getState().login(user)
  return user
}

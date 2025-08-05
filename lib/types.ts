export interface User {
  id: string
  email: string
  role: "client" | "operator" | "admin"
  avatar_url?: string
}

export type AuthChangeEvent = "SIGNED_IN" | "SIGNED_OUT" | "TOKEN_REFRESHED" | "USER_UPDATED" | "PASSWORD_RECOVERY"

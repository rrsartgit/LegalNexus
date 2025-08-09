import { createClient as createSB, type SupabaseClient } from "@supabase/supabase-js"

let client: SupabaseClient | null = null

export function isSupabaseConfigured() {
  return !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
}

export function createClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createSB(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
      { auth: { persistSession: true, autoRefreshToken: true } },
    )
  }
  return client
}

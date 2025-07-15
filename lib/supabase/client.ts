import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Returns (and memoises) a Supabase browser client.
 * If the required env vars are absent, we throw only when this
 * function is called – not at module-evaluation time – so the build
 * still succeeds in preview environments that don’t inject them.
 */
let _client: SupabaseClient | null = null

export function createClient(): SupabaseClient {
  if (_client) return _client

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase env vars missing – set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  }

  _client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return _client
}

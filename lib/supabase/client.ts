import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

/* -------------------------------------------------------------------------- */
/* Browser-side singleton                                                      */
/* -------------------------------------------------------------------------- */

let _client: SupabaseClient | null = null

function buildClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  return createSupabaseClient(url, key)
}

function buildMockClient(): SupabaseClient {
  type AuthErr = { message: string }
  const err = (msg: string) => Promise.resolve({ data: null as never, error: { message: msg } as AuthErr })

  return {
    auth: {
      signInWithPassword: () => err("Supabase not configured"),
      signUp: () => err("Supabase not configured"),
      signOut: () => Promise.resolve({ error: { message: "Supabase not configured" } as AuthErr }),
      getSession: () =>
        Promise.resolve({
          data: { session: null },
          error: { message: "Supabase not configured" } as AuthErr,
        }),
    },
  } as unknown as SupabaseClient
}

export function createClient(): SupabaseClient {
  if (_client) return _client
  _client = isSupabaseConfigured() ? buildClient() : buildMockClient()
  return _client
}

/* Preferred singleton export */
export const supabase = createClient()

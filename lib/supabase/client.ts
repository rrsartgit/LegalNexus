import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * Singleton Supabase client for the browser.
 * Works with both v1 and v2 of `@supabase/supabase-js`.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast – these env vars MUST be defined at build time.
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.")
}

let _client: SupabaseClient | null = null

function getBrowserClient(): SupabaseClient {
  if (_client) return _client
  _client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return _client
}

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

// Preferred import:  import { supabase } from "@/lib/supabase/client"
export const supabase = getBrowserClient()

// Back-compat for earlier code:  const supabase = createClient()
export function createClient(): SupabaseClient {
  return getBrowserClient()
}

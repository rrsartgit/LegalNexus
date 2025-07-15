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

  // ------------------------------------------------------------------
  // Graceful fallback when env-vars are absent (local/preview builds)
  // ------------------------------------------------------------------
  if (!supabaseUrl || !supabaseAnonKey) {
    // eslint-disable-next-line no-console
    console.warn(
      "Supabase env vars missing – set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable auth. " +
        "Using mock Supabase client (all auth calls will reject).",
    )

    type AuthError = { message: string }
    const reject = (msg: string) => Promise.resolve({ data: null as never, error: { message: msg } as AuthError })

    _client = {
      auth: {
        signInWithPassword: () => reject("Supabase not configured"),
        signUp: () => reject("Supabase not configured"),
        signOut: () => Promise.resolve({ error: { message: "Supabase not configured" } as AuthError }),
        getSession: () =>
          Promise.resolve({
            data: { session: null },
            error: { message: "Supabase not configured" } as AuthError,
          }),
      },
    } as unknown as SupabaseClient

    return _client
  }

  // ------------------------------------------------------------------
  // Real client (production / properly-configured local env)
  // ------------------------------------------------------------------
  _client = createSupabaseClient(supabaseUrl, supabaseAnonKey)
  return _client
}

/* -------------------------------------------------------------------------- */
/* Exports                                                                    */
/* -------------------------------------------------------------------------- */

// Preferred import:  import { supabase } from "@/lib/supabase/client"
export const supabase = createClient()

// Back-compat for earlier code:  const supabase = createClient()

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== "your-supabase-url" &&
    supabaseAnonKey !== "your-supabase-anon-key"
  )
}

// Create Supabase client with singleton pattern for browser
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const createSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.",
    )
    return null
  }

  if (typeof window !== "undefined") {
    // Browser environment - use singleton
    if (!supabaseInstance) {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    }
    return supabaseInstance
  } else {
    // Server environment - create new instance
    return createClient(supabaseUrl, supabaseAnonKey)
  }
}

// Export default client
export { createSupabaseClient as createClient }

import { createClient as createSB } from "@supabase/supabase-js"

export function createServiceRoleClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return createSB(url, key, { auth: { persistSession: false } })
}

import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser/client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database service class
export class DatabaseService {
  private client = supabaseAdmin

  // Law Firms
  async createLawFirm(data: any) {
    const { data: result, error } = await this.client.rpc("create_law_firm_with_owner", {
      firm_data: data,
      owner_email: data.owner_email,
    })

    if (error) throw error
    return result
  }

  async getLawFirm(id: string) {
    const { data, error } = await this.client
      .from("law_firms")
      .select(
        `
        *,
        specializations:law_firm_specializations(
          specialization:specializations(*)
        ),
        lawyers(*)
      `,
      )
      .eq("id", id)
      .eq("is_active", true)
      .single()

    if (error) throw error
    return data
  }

  async searchLawFirms(params: {
    query?: string
    city?: string
    specializations?: string[]
    limit?: number
    offset?: number
  }) {
    const { data, error } = await this.client.rpc("search_law_firms", {
      search_query: params.query || null,
      search_city: params.city || null,
      search_specializations: params.specializations || null,
      limit_count: params.limit || 20,
      offset_count: params.offset || 0,
    })

    if (error) throw error
    return data
  }

  async updateLawFirm(id: string, updates: any) {
    const { data, error } = await this.client
      .from("law_firms")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteLawFirm(id: string) {
    const { error } = await this.client
      .from("law_firms")
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq("id", id)

    if (error) throw error
  }

  // Specializations
  async getSpecializations() {
    const { data, error } = await this.client.from("specializations").select("*").eq("is_active", true).order("name")

    if (error) throw error
    return data
  }

  async createSpecialization(data: { name: string; code: string; description?: string }) {
    const { data: result, error } = await this.client.from("specializations").insert([data]).select().single()

    if (error) throw error
    return result
  }

  // Users
  async createUser(data: {
    id: string
    email: string
    full_name?: string
    phone?: string
    role?: "client" | "lawyer" | "admin" | "operator"
  }) {
    const { data: result, error } = await this.client.from("users").insert([data]).select().single()

    if (error) throw error
    return result
  }

  async getUser(id: string) {
    const { data, error } = await this.client.from("users").select("*").eq("id", id).single()

    if (error) throw error
    return data
  }

  async updateUser(id: string, updates: any) {
    const { data, error } = await this.client
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Subscriptions
  async createSubscription(data: {
    law_firm_id: string
    plan_name: string
    price_monthly?: number
    price_yearly?: number
    stripe_customer_id?: string
  }) {
    const { data: result, error } = await this.client
      .from("subscriptions")
      .insert([
        {
          ...data,
          status: "trial",
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        },
      ])
      .select()
      .single()

    if (error) throw error
    return result
  }

  async updateSubscription(id: string, updates: any) {
    const { data, error } = await this.client
      .from("subscriptions")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Analytics
  async trackAPIUsage(data: {
    law_firm_id?: string
    endpoint: string
    method: string
    status_code: number
    response_time_ms: number
  }) {
    const { error } = await this.client.from("api_usage").insert([data])

    if (error) console.error("Failed to track API usage:", error)
  }

  async trackSearch(data: {
    query?: string
    city?: string
    specializations?: string[]
    results_count: number
    user_id?: string
    ip_address?: string
    user_agent?: string
  }) {
    const { error } = await this.client.from("search_analytics").insert([data])

    if (error) console.error("Failed to track search:", error)
  }

  // Admin functions
  async getAnalytics(params: { start_date?: string; end_date?: string; law_firm_id?: string }) {
    const query = this.client
      .from("api_usage")
      .select("endpoint, method, status_code, created_at, law_firm_id")
      .order("created_at", { ascending: false })

    if (params.start_date) {
      query.gte("created_at", params.start_date)
    }
    if (params.end_date) {
      query.lte("created_at", params.end_date)
    }
    if (params.law_firm_id) {
      query.eq("law_firm_id", params.law_firm_id)
    }

    const { data, error } = await query.limit(1000)

    if (error) throw error
    return data
  }

  async getSearchAnalytics(params: { start_date?: string; end_date?: string }) {
    const query = this.client
      .from("search_analytics")
      .select("query, city, specializations, results_count, created_at")
      .order("created_at", { ascending: false })

    if (params.start_date) {
      query.gte("created_at", params.start_date)
    }
    if (params.end_date) {
      query.lte("created_at", params.end_date)
    }

    const { data, error } = await query.limit(1000)

    if (error) throw error
    return data
  }
}

// Singleton instance
export const db = new DatabaseService()

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          role: "client" | "lawyer" | "admin" | "operator"
          avatar_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          role?: "client" | "lawyer" | "admin" | "operator"
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          role?: "client" | "lawyer" | "admin" | "operator"
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      law_firms: {
        Row: {
          id: string
          name: string
          tax_number: string
          krs_number: string | null
          description: string | null
          street: string
          city: string
          postal_code: string
          country: string
          phone: string | null
          email: string | null
          website: string | null
          founded_date: string | null
          business_hours: any | null
          owner_id: string | null
          is_active: boolean
          is_verified: boolean
          search_vector: unknown | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          tax_number: string
          krs_number?: string | null
          description?: string | null
          street: string
          city: string
          postal_code: string
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          founded_date?: string | null
          business_hours?: any | null
          owner_id?: string | null
          is_active?: boolean
          is_verified?: boolean
          search_vector?: unknown | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          tax_number?: string
          krs_number?: string | null
          description?: string | null
          street?: string
          city?: string
          postal_code?: string
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          founded_date?: string | null
          business_hours?: any | null
          owner_id?: string | null
          is_active?: boolean
          is_verified?: boolean
          search_vector?: unknown | null
          created_at?: string
          updated_at?: string
        }
      }
      specializations: {
        Row: {
          id: string
          name: string
          code: string
          description: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lawyers: {
        Row: {
          id: string
          law_firm_id: string
          user_id: string | null
          first_name: string
          last_name: string
          title: string | null
          email: string | null
          phone: string | null
          bar_number: string | null
          bio: string | null
          avatar_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          law_firm_id: string
          user_id?: string | null
          first_name: string
          last_name: string
          title?: string | null
          email?: string | null
          phone?: string | null
          bar_number?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          law_firm_id?: string
          user_id?: string | null
          first_name?: string
          last_name?: string
          title?: string | null
          email?: string | null
          phone?: string | null
          bar_number?: string | null
          bio?: string | null
          avatar_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      law_firm_specializations: {
        Row: {
          law_firm_id: string
          specialization_id: string
        }
        Insert: {
          law_firm_id: string
          specialization_id: string
        }
        Update: {
          law_firm_id?: string
          specialization_id?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          law_firm_id: string
          plan_name: string
          status: "trial" | "active" | "past_due" | "canceled" | "unpaid"
          price_monthly: number | null
          price_yearly: number | null
          current_period_start: string
          current_period_end: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          api_calls_limit: number
          api_calls_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          law_firm_id: string
          plan_name: string
          status?: "trial" | "active" | "past_due" | "canceled" | "unpaid"
          price_monthly?: number | null
          price_yearly?: number | null
          current_period_start: string
          current_period_end: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          api_calls_limit?: number
          api_calls_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          law_firm_id?: string
          plan_name?: string
          status?: "trial" | "active" | "past_due" | "canceled" | "unpaid"
          price_monthly?: number | null
          price_yearly?: number | null
          current_period_start?: string
          current_period_end?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          api_calls_limit?: number
          api_calls_used?: number
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          subscription_id: string
          amount: number
          currency: string
          status: "pending" | "succeeded" | "failed" | "canceled"
          stripe_payment_intent_id: string | null
          stripe_invoice_id: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          subscription_id: string
          amount: number
          currency?: string
          status?: "pending" | "succeeded" | "failed" | "canceled"
          stripe_payment_intent_id?: string | null
          stripe_invoice_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          subscription_id?: string
          amount?: number
          currency?: string
          status?: "pending" | "succeeded" | "failed" | "canceled"
          stripe_payment_intent_id?: string | null
          stripe_invoice_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
      api_usage: {
        Row: {
          id: string
          law_firm_id: string | null
          endpoint: string
          method: string
          status_code: number
          response_time_ms: number | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          law_firm_id?: string | null
          endpoint: string
          method: string
          status_code: number
          response_time_ms?: number | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          law_firm_id?: string | null
          endpoint?: string
          method?: string
          status_code?: number
          response_time_ms?: number | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
        }
      }
      search_analytics: {
        Row: {
          id: string
          query: string | null
          city: string | null
          specializations: string[] | null
          results_count: number
          user_id: string | null
          ip_address: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          query?: string | null
          city?: string | null
          specializations?: string[] | null
          results_count: number
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          query?: string | null
          city?: string | null
          specializations?: string[] | null
          results_count?: number
          user_id?: string | null
          ip_address?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      search_law_firms: {
        Args: {
          search_query?: string
          search_city?: string
          search_specializations?: string[]
          limit_count?: number
          offset_count?: number
        }
        Returns: {
          id: string
          name: string
          tax_number: string
          krs_number: string | null
          description: string | null
          street: string
          city: string
          postal_code: string
          country: string
          phone: string | null
          email: string | null
          website: string | null
          founded_date: string | null
          business_hours: any | null
          is_active: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
          specializations: any
          lawyers: any
          rank: number
        }[]
      }
      create_law_firm_with_owner: {
        Args: {
          firm_data: any
          owner_email: string
        }
        Returns: string
      }
    }
    Enums: {
      user_role: "client" | "lawyer" | "admin" | "operator"
      subscription_status: "trial" | "active" | "past_due" | "canceled" | "unpaid"
      payment_status: "pending" | "succeeded" | "failed" | "canceled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

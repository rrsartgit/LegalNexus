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
          founded_date: string | null
          description: string | null
          street: string
          city: string
          postal_code: string
          country: string
          phone: string | null
          email: string | null
          website: string | null
          business_hours: Json | null
          subscription_status: "trial" | "active" | "cancelled" | "expired"
          subscription_expires_at: string | null
          is_active: boolean
          is_verified: boolean
          created_at: string
          updated_at: string
          owner_id: string | null
        }
        Insert: {
          id?: string
          name: string
          tax_number: string
          krs_number?: string | null
          founded_date?: string | null
          description?: string | null
          street: string
          city: string
          postal_code: string
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          business_hours?: Json | null
          subscription_status?: "trial" | "active" | "cancelled" | "expired"
          subscription_expires_at?: string | null
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          owner_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          tax_number?: string
          krs_number?: string | null
          founded_date?: string | null
          description?: string | null
          street?: string
          city?: string
          postal_code?: string
          country?: string
          phone?: string | null
          email?: string | null
          website?: string | null
          business_hours?: Json | null
          subscription_status?: "trial" | "active" | "cancelled" | "expired"
          subscription_expires_at?: string | null
          is_active?: boolean
          is_verified?: boolean
          created_at?: string
          updated_at?: string
          owner_id?: string | null
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
          user_id: string | null
          law_firm_id: string | null
          first_name: string
          last_name: string
          title: string | null
          bar_number: string | null
          phone: string | null
          email: string | null
          years_of_experience: number | null
          education: string | null
          languages: string[] | null
          is_active: boolean
          is_partner: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          law_firm_id?: string | null
          first_name: string
          last_name: string
          title?: string | null
          bar_number?: string | null
          phone?: string | null
          email?: string | null
          years_of_experience?: number | null
          education?: string | null
          languages?: string[] | null
          is_active?: boolean
          is_partner?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          law_firm_id?: string | null
          first_name?: string
          last_name?: string
          title?: string | null
          bar_number?: string | null
          phone?: string | null
          email?: string | null
          years_of_experience?: number | null
          education?: string | null
          languages?: string[] | null
          is_active?: boolean
          is_partner?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          law_firm_id: string | null
          plan_name: string
          price_monthly: number | null
          price_yearly: number | null
          status: "trial" | "active" | "cancelled" | "expired"
          current_period_start: string | null
          current_period_end: string | null
          stripe_subscription_id: string | null
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          law_firm_id?: string | null
          plan_name: string
          price_monthly?: number | null
          price_yearly?: number | null
          status?: "trial" | "active" | "cancelled" | "expired"
          current_period_start?: string | null
          current_period_end?: string | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          law_firm_id?: string | null
          plan_name?: string
          price_monthly?: number | null
          price_yearly?: number | null
          status?: "trial" | "active" | "cancelled" | "expired"
          current_period_start?: string | null
          current_period_end?: string | null
          stripe_subscription_id?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          subscription_id: string | null
          amount: number
          currency: string
          status: "pending" | "completed" | "failed" | "refunded"
          stripe_payment_intent_id: string | null
          stripe_invoice_id: string | null
          description: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          subscription_id?: string | null
          amount: number
          currency?: string
          status?: "pending" | "completed" | "failed" | "refunded"

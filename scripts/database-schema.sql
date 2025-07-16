-- Legal Nexus Database Schema
-- PostgreSQL/Supabase Schema for Law Firm API

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret-here';

-- Create custom types
CREATE TYPE user_role AS ENUM ('client', 'lawyer', 'admin', 'operator');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'cancelled', 'expired');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role user_role DEFAULT 'client',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Specializations table
CREATE TABLE public.specializations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Law firms table
CREATE TABLE public.law_firms (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  tax_number TEXT UNIQUE NOT NULL,
  krs_number TEXT UNIQUE,
  founded_date DATE,
  description TEXT,
  
  -- Address (embedded)
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT DEFAULT 'PL',
  
  -- Contact information
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Business hours (JSON)
  business_hours JSONB,
  
  -- Subscription and billing
  subscription_status subscription_status DEFAULT 'trial',
  subscription_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Owner reference
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL
);

-- Lawyers table
CREATE TABLE public.lawyers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  title TEXT, -- dr, prof, adw., r.pr., etc.
  bar_number TEXT UNIQUE, -- Numer wpisu na listę adwokatów/radców
  
  -- Contact (can override firm contact)
  phone TEXT,
  email TEXT,
  
  -- Professional info
  years_of_experience INTEGER,
  education TEXT,
  languages TEXT[], -- Array of language codes
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_partner BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Law firm specializations (many-to-many)
CREATE TABLE public.law_firm_specializations (
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  specialization_id UUID REFERENCES public.specializations(id) ON DELETE CASCADE,
  PRIMARY KEY (law_firm_id, specialization_id)
);

-- Lawyer specializations (many-to-many)
CREATE TABLE public.lawyer_specializations (
  lawyer_id UUID REFERENCES public.lawyers(id) ON DELETE CASCADE,
  specialization_id UUID REFERENCES public.specializations(id) ON DELETE CASCADE,
  PRIMARY KEY (lawyer_id, specialization_id)
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  
  plan_name TEXT NOT NULL, -- 'basic', 'professional', 'enterprise'
  price_monthly DECIMAL(10,2),
  price_yearly DECIMAL(10,2),
  
  status subscription_status DEFAULT 'trial',
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  
  -- Stripe integration
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'PLN',
  status payment_status DEFAULT 'pending',
  
  -- Stripe integration
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT,
  
  -- Metadata
  description TEXT,
  metadata JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE public.api_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  law_firm_id UUID REFERENCES public.law_firms(id) ON DELETE CASCADE,
  
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER,
  response_time_ms INTEGER,
  
  -- Rate limiting
  requests_count INTEGER DEFAULT 1,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Index for efficient querying
  INDEX (law_firm_id, created_at),
  INDEX (endpoint, created_at)
);

-- Search analytics
CREATE TABLE public.search_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  query TEXT,
  city TEXT,
  specializations TEXT[],
  results_count INTEGER,
  
  -- User context (optional)
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  ip_address INET,
  user_agent TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default specializations
INSERT INTO public.specializations (name, code, description) VALUES
('Prawo Gospodarcze', 'COMMERCIAL', 'Obsługa prawna przedsiębiorstw, umowy handlowe, fuzje i przejęcia'),
('Prawo Cywilne', 'CIVIL', 'Sprawy cywilne, rodzinne, spadkowe, nieruchomości'),
('Prawo Karne', 'CRIMINAL', 'Obrona w sprawach karnych, postępowania karne'),
('Prawo Pracy', 'LABOR', 'Sprawy pracownicze, umowy o pracę, spory zbiorowe'),
('Prawo Administracyjne', 'ADMINISTRATIVE', 'Postępowania administracyjne, sądownictwo administracyjne'),
('Prawo Podatkowe', 'TAX', 'Doradztwo podatkowe, optymalizacja podatkowa, spory z fiskusem'),
('Prawo Międzynarodowe', 'INTERNATIONAL', 'Prawo międzynarodowe prywatne, transakcje międzynarodowe'),
('Prawo Własności Intelektualnej', 'IP', 'Patenty, znaki towarowe, prawa autorskie, ochrona IP'),
('Prawo Bankowe', 'BANKING', 'Prawo bankowe, finansowe, instrumenty finansowe'),
('Prawo Ubezpieczeniowe', 'INSURANCE', 'Prawo ubezpieczeniowe, roszczenia ubezpieczeniowe');

-- Create indexes for better performance
CREATE INDEX idx_law_firms_city ON public.law_firms(city);
CREATE INDEX idx_law_firms_active ON public.law_firms(is_active);
CREATE INDEX idx_law_firms_subscription ON public.law_firms(subscription_status);
CREATE INDEX idx_lawyers_firm ON public.lawyers(law_firm_id);
CREATE INDEX idx_lawyers_active ON public.lawyers(is_active);

-- Full-text search indexes
CREATE INDEX idx_law_firms_search ON public.law_firms USING gin(to_tsvector('polish', name || ' ' || COALESCE(description, '')));
CREATE INDEX idx_lawyers_search ON public.lawyers USING gin(to_tsvector('polish', first_name || ' ' || last_name));

-- Row Level Security (RLS) policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.law_firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Public read access to active law firms
CREATE POLICY "Public read access to active law firms" ON public.law_firms
  FOR SELECT USING (is_active = true);

-- Law firm owners can manage their firms
CREATE POLICY "Owners can manage their law firms" ON public.law_firms
  FOR ALL USING (auth.uid() = owner_id);

-- Admins can manage everything
CREATE POLICY "Admins can manage law firms" ON public.law_firms
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Public read access to active lawyers
CREATE POLICY "Public read access to active lawyers" ON public.lawyers
  FOR SELECT USING (is_active = true);

-- Lawyers can manage their own profiles
CREATE POLICY "Lawyers can manage own profiles" ON public.lawyers
  FOR ALL USING (auth.uid() = user_id);

-- Law firm owners can manage their lawyers
CREATE POLICY "Firm owners can manage lawyers" ON public.lawyers
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.law_firms 
      WHERE id = law_firm_id AND owner_id = auth.uid()
    )
  );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_law_firms_updated_at
  BEFORE UPDATE ON public.law_firms
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_lawyers_updated_at
  BEFORE UPDATE ON public.lawyers
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_specializations_updated_at
  BEFORE UPDATE ON public.specializations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to create a new law firm with owner
CREATE OR REPLACE FUNCTION public.create_law_firm_with_owner(
  firm_data JSONB,
  owner_email TEXT
)
RETURNS UUID AS $$
DECLARE
  owner_user_id UUID;
  new_firm_id UUID;
BEGIN
  -- Get or create user
  SELECT id INTO owner_user_id
  FROM public.users
  WHERE email = owner_email;
  
  IF owner_user_id IS NULL THEN
    RAISE EXCEPTION 'User with email % not found', owner_email;
  END IF;
  
  -- Create law firm
  INSERT INTO public.law_firms (
    name, tax_number, krs_number, description,
    street, city, postal_code, country,
    phone, email, website,
    owner_id
  )
  VALUES (
    firm_data->>'name',
    firm_data->>'tax_number',
    firm_data->>'krs_number',
    firm_data->>'description',
    firm_data->'address'->>'street',
    firm_data->'address'->>'city',
    firm_data->'address'->>'postal_code',
    COALESCE(firm_data->'address'->>'country', 'PL'),
    firm_data->'contact'->>'phone',
    firm_data->'contact'->>'email',
    firm_data->'contact'->>'website',
    owner_user_id
  )
  RETURNING id INTO new_firm_id;
  
  -- Create default subscription (trial)
  INSERT INTO public.subscriptions (
    law_firm_id,
    plan_name,
    status,
    current_period_start,
    current_period_end
  )
  VALUES (
    new_firm_id,
    'trial',
    'trial',
    NOW(),
    NOW() + INTERVAL '30 days'
  );
  
  RETURN new_firm_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function for advanced law firm search
CREATE OR REPLACE FUNCTION public.search_law_firms(
  search_query TEXT DEFAULT NULL,
  search_city TEXT DEFAULT NULL,
  search_specializations TEXT[] DEFAULT NULL,
  limit_count INTEGER DEFAULT 20,
  offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
  id UUID,
  name TEXT,
  tax_number TEXT,
  krs_number TEXT,
  description TEXT,
  street TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  specializations JSONB,
  lawyers JSONB,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    lf.id,
    lf.name,
    lf.tax_number,
    lf.krs_number,
    lf.description,
    lf.street,
    lf.city,
    lf.postal_code,
    lf.country,
    lf.phone,
    lf.email,
    lf.website,
    lf.created_at,
    lf.updated_at,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', s.id,
            'name', s.name,
            'code', s.code,
            'description', s.description
          )
        )
        FROM public.specializations s
        JOIN public.law_firm_specializations lfs ON s.id = lfs.specialization_id
        WHERE lfs.law_firm_id = lf.id AND s.is_active = true
      ),
      '[]'::jsonb
    ) as specializations,
    COALESCE(
      (
        SELECT jsonb_agg(
          jsonb_build_object(
            'id', l.id,
            'first_name', l.first_name,
            'last_name', l.last_name,
            'title', l.title,
            'email', l.email,
            'phone', l.phone,
            'bar_number', l.bar_number
          )
        )
        FROM public.lawyers l
        WHERE l.law_firm_id = lf.id AND l.is_active = true
      ),
      '[]'::jsonb
    ) as lawyers,
    CASE 
      WHEN search_query IS NOT NULL THEN
        ts_rank(
          to_tsvector('polish', lf.name || ' ' || COALESCE(lf.description, '')),
          plainto_tsquery('polish', search_query)
        )
      ELSE 0
    END as rank
  FROM public.law_firms lf
  WHERE lf.is_active = true
    AND (search_query IS NULL OR 
         to_tsvector('polish', lf.name || ' ' || COALESCE(lf.description, '')) @@ plainto_tsquery('polish', search_query))
    AND (search_city IS NULL OR lf.city ILIKE '%' || search_city || '%')
    AND (search_specializations IS NULL OR 
         EXISTS (
           SELECT 1 
           FROM public.law_firm_specializations lfs
           JOIN public.specializations s ON lfs.specialization_id = s.id
           WHERE lfs.law_firm_id = lf.id 
             AND s.code = ANY(search_specializations)
         ))
  ORDER BY 
    CASE WHEN search_query IS NOT NULL THEN rank END DESC,
    lf.name ASC
  LIMIT limit_count
  OFFSET offset_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT SELECT ON public.law_firms TO anon;
GRANT SELECT ON public.lawyers TO anon;
GRANT SELECT ON public.specializations TO anon;
GRANT EXECUTE ON FUNCTION public.search_law_firms TO anon, authenticated;

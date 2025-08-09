-- Create legal_documents table for storing user-generated legal documents
CREATE TABLE IF NOT EXISTS legal_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    recipient_name TEXT,
    recipient_address TEXT,
    content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'sent', 'completed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_legal_documents_user ON legal_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_legal_documents_status ON legal_documents(status);

-- Enable RLS (Row Level Security)
ALTER TABLE legal_documents ENABLE ROW LEVEL SECURITY;

-- Policies (user can see/modify own docs)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'legal_documents' AND policyname = 'Users select own legal documents'
  ) THEN
    CREATE POLICY "Users select own legal documents" ON legal_documents
      FOR SELECT USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'legal_documents' AND policyname = 'Users insert own legal documents'
  ) THEN
    CREATE POLICY "Users insert own legal documents" ON legal_documents
      FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'legal_documents' AND policyname = 'Users update own legal documents'
  ) THEN
    CREATE POLICY "Users update own legal documents" ON legal_documents
      FOR UPDATE USING (auth.uid() = user_id);
  END IF;
END $$;

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) DEFAULT 'Untitled Resume',
  public BOOLEAN DEFAULT false,
  template VARCHAR(50) DEFAULT 'classic',
  accent_color VARCHAR(50) DEFAULT '#3b82f6',
  professional_summary TEXT DEFAULT '',
  skills JSONB DEFAULT '[]'::jsonb,
  personal_info JSONB DEFAULT '{}'::jsonb,
  experience JSONB DEFAULT '[]'::jsonb,
  project JSONB DEFAULT '[]'::jsonb,
  education JSONB DEFAULT '[]'::jsonb,
  certification JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE resumes
  ADD COLUMN IF NOT EXISTS public BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS template VARCHAR(50) DEFAULT 'classic',
  ADD COLUMN IF NOT EXISTS accent_color VARCHAR(50) DEFAULT '#3b82f6',
  ADD COLUMN IF NOT EXISTS professional_summary TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS skills JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS personal_info JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS experience JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS project JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS education JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS certification JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

CREATE INDEX IF NOT EXISTS resumes_user_id_updated_at_idx
  ON resumes (user_id, updated_at DESC);

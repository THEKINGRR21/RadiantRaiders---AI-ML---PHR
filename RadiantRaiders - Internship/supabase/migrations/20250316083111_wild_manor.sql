/*
  # Initial Schema Setup for AI Internship Assistant

  1. New Tables
    - jobs
      - id (uuid, primary key)
      - title (text)
      - company (text)
      - location (text)
      - type (text)
      - stipend (text)
      - deadline (date)
      - description (text)
      - apply_url (text)
      - created_at (timestamp)
    
    - interview_questions
      - id (uuid, primary key)
      - question (text)
      - type (text)
      - category (text)
      - difficulty (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  type text NOT NULL CHECK (type IN ('remote', 'hybrid', 'onsite')),
  stipend text,
  deadline date,
  description text NOT NULL,
  apply_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to jobs"
  ON jobs
  FOR SELECT
  TO public
  USING (true);

-- Interview questions table
CREATE TABLE IF NOT EXISTS interview_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  type text NOT NULL CHECK (type IN ('hr', 'technical')),
  category text,
  difficulty text CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE interview_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to interview questions"
  ON interview_questions
  FOR SELECT
  TO public
  USING (true);
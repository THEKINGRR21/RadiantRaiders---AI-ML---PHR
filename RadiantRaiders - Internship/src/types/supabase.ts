export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      jobs: {
        Row: {
          id: string
          title: string
          company: string
          location: string
          type: 'remote' | 'hybrid' | 'onsite'
          stipend: string | null
          deadline: string | null
          description: string
          apply_url: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          company: string
          location: string
          type: 'remote' | 'hybrid' | 'onsite'
          stipend?: string | null
          deadline?: string | null
          description: string
          apply_url: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string
          location?: string
          type?: 'remote' | 'hybrid' | 'onsite'
          stipend?: string | null
          deadline?: string | null
          description?: string
          apply_url?: string
          created_at?: string
        }
      }
      interview_questions: {
        Row: {
          id: string
          question: string
          type: 'hr' | 'technical'
          category: string | null
          difficulty: 'easy' | 'medium' | 'hard' | null
          created_at: string
        }
        Insert: {
          id?: string
          question: string
          type: 'hr' | 'technical'
          category?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          created_at?: string
        }
        Update: {
          id?: string
          question?: string
          type?: 'hr' | 'technical'
          category?: string | null
          difficulty?: 'easy' | 'medium' | 'hard' | null
          created_at?: string
        }
      }
    }
  }
}
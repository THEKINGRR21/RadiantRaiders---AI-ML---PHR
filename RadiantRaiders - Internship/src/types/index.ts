export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'jobs' | 'resume' | 'interview' | 'general';
}

export interface ChatMessage extends Message {
  status?: 'sending' | 'sent' | 'error';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'remote' | 'hybrid' | 'onsite';
  stipend?: string;
  deadline?: string;
  description: string;
  applyUrl: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: 'hr' | 'technical';
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface Intent {
  name: string;
  confidence: number;
  entities: {
    [key: string]: string;
  };
}
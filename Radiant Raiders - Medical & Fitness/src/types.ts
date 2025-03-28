export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'carousel' | 'quick_replies' | 'workout_suggestions';
  options?: QuickReply[];
  carouselItems?: CarouselItem[];
  workoutSuggestions?: WorkoutSuggestion[];
}

export interface QuickReply {
  id: string;
  text: string;
  action: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  action: string;
}

export interface WorkoutSuggestion {
  muscleGroup: string;
  exercises: Exercise[];
  imageUrl: string;
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: number;
  description?: string;
}

export interface HealthMetrics {
  steps: number;
  calories: number;
  water: number;
  workouts: number;
  heartRate?: number;
  sleep?: number;
  streak?: number;
  badges?: string[];
}

export interface UserPreferences {
  darkMode: boolean;
  language: 'en' | 'hinglish';
  dietaryRestrictions: string[];
  fitnessGoals: string[];
  reminderSettings: {
    water: boolean;
    workout: boolean;
    medication: boolean;
  };
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface DietPlan {
  id: string;
  name: string;
  meals: Meal[];
  totalCalories: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface Meal {
  name: string;
  time: string;
  foods: Food[];
  totalCalories: number;
}

export interface Food {
  name: string;
  portion: string;
  calories: number;
  imageUrl?: string;
}
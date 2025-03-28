import { WorkoutSuggestion } from '../types';

export const workoutSuggestions: WorkoutSuggestion[] = [
  {
    muscleGroup: 'Chest',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: 12 },
      { name: 'Push-ups', sets: 3, reps: 15 },
      { name: 'Chest Fly', sets: 3, reps: 12 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    muscleGroup: 'Back',
    exercises: [
      { name: 'Pull-ups', sets: 3, reps: 10 },
      { name: 'Lat Pulldown', sets: 4, reps: 12 },
      { name: 'Deadlifts', sets: 4, reps: 10 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    muscleGroup: 'Legs',
    exercises: [
      { name: 'Squats', sets: 4, reps: 12 },
      { name: 'Lunges', sets: 3, reps: 15 },
      { name: 'Calf Raises', sets: 3, reps: 20 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    muscleGroup: 'Shoulders',
    exercises: [
      { name: 'Shoulder Press', sets: 4, reps: 12 },
      { name: 'Lateral Raises', sets: 3, reps: 15 },
      { name: 'Front Raises', sets: 3, reps: 12 }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];
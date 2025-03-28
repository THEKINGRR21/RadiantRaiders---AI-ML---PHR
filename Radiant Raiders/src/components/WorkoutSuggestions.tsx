import React from 'react';
import { motion } from 'framer-motion';
import { WorkoutSuggestion } from '../types';

interface WorkoutSuggestionsProps {
  suggestions: WorkoutSuggestion[];
  onSelect: (muscleGroup: string) => void;
}

export default function WorkoutSuggestions({ suggestions, onSelect }: WorkoutSuggestionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {suggestions.map((suggestion, index) => (
        <motion.div
          key={suggestion.muscleGroup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
          onClick={() => onSelect(suggestion.muscleGroup)}
        >
          <div className="relative h-48">
            <img
              src={suggestion.imageUrl}
              alt={suggestion.muscleGroup}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
              {suggestion.muscleGroup}
            </h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2">
              {suggestion.exercises.slice(0, 3).map((exercise) => (
                <li
                  key={exercise.name}
                  className="text-sm text-gray-700 dark:text-gray-300 flex items-center"
                >
                  <span className="mr-2">•</span>
                  {exercise.name}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
import React from 'react';
import { QuickReply } from '../types';
import { motion } from 'framer-motion';

interface QuickRepliesProps {
  options: QuickReply[];
  onSelect: (action: string) => void;
}

export default function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onSelect(option.action)}
          className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          {option.text}
        </motion.button>
      ))}
    </div>
  );
}
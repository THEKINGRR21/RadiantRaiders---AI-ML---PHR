import React from 'react';
import { CarouselItem } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselProps {
  items: CarouselItem[];
}

export default function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-48">
        <motion.img
          key={items[currentIndex].imageUrl}
          src={items[currentIndex].imageUrl}
          alt={items[currentIndex].title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/30 hover:bg-white/50 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {items[currentIndex].title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {items[currentIndex].description}
        </p>
        <button
          onClick={() => console.log('Action:', items[currentIndex].action)}
          className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Select
        </button>
      </div>
      
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
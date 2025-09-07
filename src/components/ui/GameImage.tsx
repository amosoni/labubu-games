'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface GameImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function GameImage({ src, alt, className = '', priority = false }: GameImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <motion.img
        src={hasError ? '/images/placeholder.jpg' : src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          imageRendering: 'crisp-edges',
        }}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
} 
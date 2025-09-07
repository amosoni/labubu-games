'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

interface MonsterIconProps {
  size?: number;
  animate?: boolean;
  variant?: 'happy' | 'wink' | 'love';
}

export default function MonsterIcon({ size = 48, animate = true, variant = 'happy' }: MonsterIconProps) {
  const iconVariants = {
    happy: <Sparkles size={size} className="text-primary" />,
    wink: <Star size={size} className="text-secondary" />,
    love: <Heart size={size} className="text-pink-500" fill="currentColor" />,
  };

  const animationProps = animate ? {
    animate: { rotate: [0, 5, -5, 0], y: [0, -2, 0] },
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  } : {};

  return (
    <motion.div
      className="inline-block"
      {...animationProps}
    >
      {iconVariants[variant]}
    </motion.div>
  );
}
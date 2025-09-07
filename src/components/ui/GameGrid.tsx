'use client';

import { motion } from 'framer-motion';
import GameCard from './GameCard';
import { IGame } from '@/lib/models/Game';

interface GameGridProps {
  games: (Partial<IGame> & { _id?: string })[];
  locale: string;
  featured?: boolean;
}

export default function GameGrid({ games, locale, featured = false }: GameGridProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {games.map((game, index) => (
        <motion.div key={game._id || index} variants={item}>
          <GameCard game={game} locale={locale} featured={featured && index < 3} />
        </motion.div>
      ))}
    </motion.div>
  );
}
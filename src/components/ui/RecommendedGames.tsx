'use client';

import { motion } from 'framer-motion';
import { Play, Star, Eye } from 'lucide-react';
import Link from 'next/link';
import { IGame } from '@/lib/models/Game';

interface RecommendedGamesProps {
  games: (Partial<IGame> & { _id?: string })[];
  locale: string;
  title: string;
  subtitle: string;
}

export default function RecommendedGames({ games, locale, title, subtitle }: RecommendedGamesProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={game._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Link href={`/${locale}/games/${game._id || 'sample'}`}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                  <div className="aspect-video relative">
                    <img
                      src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                      alt={game.title || ''}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-4"
                      >
                        <Play className="text-white" size={32} />
                      </motion.div>
                    </div>
                    {game.featured && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ⭐ Featured
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye size={16} />
                          <span>{game.popularity}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 capitalize">{game.category}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 
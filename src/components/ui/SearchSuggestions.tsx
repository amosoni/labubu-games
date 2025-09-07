'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, TrendingUp } from 'lucide-react';
import { sampleGames } from '@/lib/gameData';
import { IGame } from '@/lib/models/Game';

interface SearchSuggestionsProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (game: Partial<IGame>) => void;
}

export default function SearchSuggestions({ query, isOpen, onClose, onSelect }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Partial<IGame>[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = sampleGames.filter(game =>
        game.title?.toLowerCase().includes(query.toLowerCase()) ||
        game.description?.toLowerCase().includes(query.toLowerCase()) ||
        game.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (game: Partial<IGame>) => {
    onSelect(game);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-96 overflow-y-auto"
      >
        {query.length > 0 ? (
          <div>
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Search size={16} />
                <span>Search results for &ldquo;{query}&rdquo;</span>
              </div>
            </div>
            
            {suggestions.length > 0 ? (
              <div className="py-2">
                {suggestions.map((game, index) => (
                  <motion.div
                    key={game._id || index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(game)}
                    className="flex items-center gap-3 p-3 hover:bg-pink-50 cursor-pointer transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                        alt={game.title || ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{game.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">{game.description}</p>
                    </div>
                    <div className="text-sm text-gray-400">{game.popularity}%</div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Search size={48} className="mx-auto mb-3 text-gray-300" />
                <p>No games found for &ldquo;{query}&rdquo;</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="p-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <TrendingUp size={16} />
                <span>Popular searches</span>
              </div>
            </div>
            
            <div className="py-2">
              {['Labubu Merge', 'Hair Salon', 'Mukbang ASMR', 'Playground', 'Unpacking'].map((search, index) => (
                <motion.div
                  key={search}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelect({ title: search })}
                  className="flex items-center gap-3 p-3 hover:bg-pink-50 cursor-pointer transition-colors"
                >
                  <TrendingUp size={16} className="text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
} 
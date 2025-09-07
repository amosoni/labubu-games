'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Star, Eye, Trash2, Grid, List } from 'lucide-react';
import Link from 'next/link';
import { sampleGames } from '@/lib/gameData';

interface FavoritesPageProps {
  params: Promise<{ locale: string }>;
}

export default function FavoritesPage({ params }: FavoritesPageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [favorites, setFavorites] = useState(sampleGames.slice(0, 3)); // 模拟收藏的游戏
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const getLocale = async () => {
      try {
        const resolvedParams = await params;
        setLocale(resolvedParams.locale);
      } catch (error) {
        console.error('Error resolving params:', error);
        setLocale('en');
      }
    };
    getLocale();
  }, [params]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const removeFavorite = (gameId: string) => {
    setFavorites(prev => prev.filter(game => game.title !== gameId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Heart className="w-8 h-8 text-pink-500 mr-3" />
              Favorite Games
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex border border-pink-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {favorites.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {favorites.map((game, index) => (
                <motion.div
                  key={game.title || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <Link href={`/${locale}/play/${game.title?.toLowerCase().replace(/\s+/g, '-')}`}>
                    <div className={viewMode === 'list' ? 'flex w-full' : ''}>
                      <div className={`relative overflow-hidden ${
                        viewMode === 'list' ? 'w-32 h-24' : 'aspect-video'
                      }`}>
                        <img
                          src={game.thumbnailUrl || '/images/placeholder.jpg'}
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 rounded-full p-3 shadow-lg">
                            <Play className="w-6 h-6 text-pink-500" />
                          </div>
                        </div>
                      </div>
                      
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
                            
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="ml-1">4.8</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {game.popularity}K
                              </div>
                              <div className="px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full">
                                {game.category}
                              </div>
                            </div>
                          </div>
                          
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeFavorite(game.title || '');
                            }}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                            title="Remove from favorites"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorite games yet</h3>
              <p className="text-gray-500 mb-6">Start adding games to your favorites!</p>
              <Link
                href={`/${locale}/games`}
                className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors"
              >
                Browse Games
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
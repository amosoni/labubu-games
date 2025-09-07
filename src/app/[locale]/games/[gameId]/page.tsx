'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Play, Heart, Share2, Star, Eye, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { sampleGames } from '@/lib/gameData';
import { IGame } from '@/lib/models/Game';

interface GamePageProps {
  params: Promise<{ locale: string; gameId: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const [locale, setLocale] = useState('en');
  const [gameId, setGameId] = useState('');
  const [game, setGame] = useState<Partial<IGame> | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getParams = async () => {
      try {
        const resolvedParams = await params;
        setLocale(resolvedParams.locale);
        setGameId(resolvedParams.gameId);
      } catch (error) {
        console.error('Error resolving params:', error);
        setLocale('en');
      }
    };
    getParams();
  }, [params]);

  useEffect(() => {
    const loadGame = async () => {
      const foundGame = sampleGames.find(g => g._id === gameId || g.title?.toLowerCase().includes(gameId.toLowerCase()));
      setGame(foundGame || sampleGames[0]);
    };
    loadGame();
  }, [gameId]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const openGame = () => {
    if (game.embedUrl) {
      window.open(game.embedUrl, '_blank');
  }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
          <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-pink-500 mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
          Back to Games
          </Link>

        {/* Game Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                  alt={game.title || ''}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{game.title}</h1>
              <p className="text-gray-600 text-lg mb-6">{game.description}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Eye size={16} />
                  <span>{game.popularity}% popularity</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>5-10 min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>Single Player</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openGame}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg text-lg"
                >
                  <Play size={24} />
                  Play Game
                  <ExternalLink size={20} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-4 rounded-full transition-colors ${
                    isLiked ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-500 hover:bg-pink-100 hover:text-pink-500'
                  }`}
                >
                  <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-full transition-colors"
                >
                  <Share2 size={24} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About This Game</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Game Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium capitalize">{game.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Popularity:</span>
                  <span className="font-medium">{game.popularity}%</span>
          </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Play Time:</span>
                  <span className="font-medium">5-10 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Players:</span>
                  <span className="font-medium">Single Player</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating</h3>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} className="text-yellow-400 fill-current" />
                ))}
                <span className="text-gray-600 ml-2">4.8/5</span>
              </div>
              
              {game.tags && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

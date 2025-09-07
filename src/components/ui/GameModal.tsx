 'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Heart, Share2, Eye, Clock, Users, ExternalLink, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { IGame } from '@/lib/models/Game';

interface GameModalProps {
  game: Partial<IGame> & { _id?: string };
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

export default function GameModal({ game, isOpen, onClose }: GameModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [gameError, setGameError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePlayClick = () => {
    setIsLoading(true);
    setGameError(false);
    setIsPlaying(true);
    
    // 模拟加载时间
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleIframeError = () => {
    setGameError(true);
    setIsLoading(false);
  };

  const openInNewTab = () => {
    if (game.embedUrl) {
      window.open(game.embedUrl, '_blank');
    }
  };

  if (!isOpen || !game) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                  alt={game.title || ''}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h2>
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
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
              </div>
            </div>
          </div>

          {/* Game Content */}
          <div className="p-6">
            {isPlaying ? (
              <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading game...</p>
                    </div>
                  </div>
                )}
                
                {gameError ? (
                  <div className="text-center p-8">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Game Cannot Be Loaded</h3>
                    <p className="text-gray-600 mb-4">This game cannot be embedded. You can play it in a new tab instead.</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={openInNewTab}
                      className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg mx-auto"
                    >
                      <ExternalLink size={20} />
                      Play in New Tab
                    </motion.button>
                  </div>
                ) : (
                  <iframe
                    src={game.embedUrl}
                    className="w-full h-full rounded-xl"
                    allowFullScreen
                    onError={handleIframeError}
                    onLoad={() => setIsLoading(false)}
                  />
                )}
              </div>
            ) : (
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                <Image
                  src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                  alt={game.title || ''}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlayClick}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6 text-white hover:bg-white/30 transition-colors"
                  >
                    <Play size={48} fill="currentColor" />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
              {!gameError ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  <Play size={20} />
                  {isPlaying ? 'Stop Game' : 'Play Now'}
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openInNewTab}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg"
                >
                  <ExternalLink size={20} />
                  Play in New Tab
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`p-3 rounded-full transition-colors ${
                  isLiked ? 'bg-pink-100 text-pink-500' : 'bg-gray-100 text-gray-500 hover:bg-pink-100 hover:text-pink-500'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-500 rounded-full transition-colors"
              >
                <Share2 size={20} />
              </motion.button>
            </div>

            {/* Game Tags */}
            {game.tags && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {game.tags.map((tag, index) => (
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 
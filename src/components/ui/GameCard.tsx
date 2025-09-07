'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import Link from 'next/link';
import { IGame } from '@/lib/models/Game';
import Image from 'next/image';

interface GameCardProps {
  game: Partial<IGame> & { _id?: string };
  locale: string;
  featured?: boolean;
}

export default function GameCard({ game, locale, featured = false }: GameCardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [gameStatus, setGameStatus] = useState<'loading' | 'available' | 'error'>('loading');

  useEffect(() => {
    // 检查网络状态
    const checkOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    // 检查游戏可用性 - 简化检查逻辑
    const checkGameAvailability = async () => {
      try {
        // 检查URL是否有效
        if (game.embedUrl && game.embedUrl.startsWith('http')) {
          // 对于外部游戏，我们假设它们都是可用的
          // 实际的可用性检查会在用户点击时进行
          setGameStatus('available');
        } else {
          setGameStatus('error');
        }
      } catch {
        setGameStatus('error');
      }
    };

    checkGameAvailability();

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, [game.embedUrl]);

  const handleClick = (e: React.MouseEvent) => {
    // 允许所有游戏点击，实际可用性检查在游戏页面进行
    if (!isOnline) {
      e.preventDefault();
      alert('Please check your internet connection');
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative"
    >
      <Link 
        href={`/${locale}/play/${game.title?.toLowerCase().replace(/\s+/g, '-')}`}
        onClick={handleClick}
        className={`block ${gameStatus === 'error' ? 'pointer-events-none opacity-50' : ''}`}
      >
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
          {/* 游戏缩略图 - 使用高质量图片组件 */}
          <div className="relative aspect-square overflow-hidden">
        <Image
              src={game.thumbnailUrl || '/images/placeholder.jpg'}
              alt={game.title || 'Game'}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              quality={90} // 提高图片质量
              priority={false} // 前6张图片优先加载
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              onError={(e) => {
                e.currentTarget.src = '/images/placeholder.jpg';
              }}
            />
            
            {/* 状态指示器 */}
            <div className="absolute top-2 right-2 flex flex-col gap-1">
              {featured && (
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Featured
                </div>
              )}
              {!isOnline && (
                <div className="bg-red-500 text-white p-1 rounded-full">
                  <WifiOff className="w-3 h-3" />
                </div>
              )}
            </div>
            
            {/* 播放按钮 */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/90 rounded-full p-3 shadow-lg">
                <Play className="w-6 h-6 text-pink-500" />
              </div>
            </div>
          </div>
          
          {/* 游戏信息 */}
          <div className="p-3">
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
              {game.title}
            </h3>
            <p className="text-xs text-gray-500 line-clamp-2">
              {game.description}
            </p>
            
            {/* 状态信息 */}
            {gameStatus === 'error' && (
              <p className="text-xs text-red-500 mt-1">Game unavailable</p>
            )}
            {!isOnline && (
              <p className="text-xs text-red-500 mt-1">No internet connection</p>
            )}
            
            {/* 标签 */}
            <div className="flex flex-wrap gap-1 mt-2">
              {game.tags?.slice(0, 2).map((tag, tagIndex) => (
              <span
                  key={tagIndex}
                  className="px-2 py-1 bg-pink-100 text-pink-600 text-xs rounded-full"
              >
                  {tag}
              </span>
            ))}
            </div>
          </div>
        </div>
        </Link>
    </motion.div>
  );
}
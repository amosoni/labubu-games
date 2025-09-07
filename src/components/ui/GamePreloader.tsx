'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Wifi, WifiOff } from 'lucide-react';

interface GamePreloaderProps {
  gameUrl: string;
  onLoadComplete: () => void;
  onLoadError: () => void;
}

export default function GamePreloader({ gameUrl, onLoadComplete, onLoadError }: GamePreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    // 检查网络状态
    const checkOnline = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    // 模拟加载进度
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    // 预加载游戏资源
    const preloadGame = async () => {
      try {
        const response = await fetch(gameUrl, { method: 'HEAD' });
        if (response.ok) {
          setLoadTime(Date.now() - startTime);
          setTimeout(() => {
            setProgress(100);
            onLoadComplete();
          }, 500);
        } else {
          onLoadError();
        }
      } catch {
        onLoadError();
      }
    };

    preloadGame();

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, [gameUrl, onLoadComplete, onLoadError]);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        {/* 网络状态指示器 */}
        <div className="mb-6">
          {isOnline ? (
            <Wifi className="w-8 h-8 text-green-500 mx-auto" />
          ) : (
            <WifiOff className="w-8 h-8 text-red-500 mx-auto" />
          )}
        </div>

        {/* 加载动画 */}
        <div className="relative mb-6">
          <div className="w-24 h-24 border-4 border-pink-200 rounded-full"></div>
          <div 
            className="absolute top-0 left-0 w-24 h-24 border-4 border-pink-500 rounded-full border-t-transparent animate-spin"
            style={{ transform: `rotate(${progress * 3.6}deg)` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
          </div>
        </div>

        {/* 加载文本 */}
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Loading Game...</h3>
        <p className="text-gray-600 mb-6">Please wait while we prepare your game</p>

        {/* 进度条 */}
        <div className="w-80 bg-gray-200 rounded-full h-3 mb-4">
          <motion.div 
            className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>

        {/* 进度百分比 */}
        <p className="text-lg font-semibold text-gray-700 mb-2">{Math.round(progress)}%</p>
        
        {/* 加载时间 */}
        {loadTime > 0 && (
          <p className="text-sm text-gray-500">
            Loaded in {Math.round(loadTime / 1000)}s
          </p>
        )}

        {/* 网络状态提示 */}
        {!isOnline && (
          <p className="text-sm text-red-500 mt-2">
            No internet connection. Please check your network.
          </p>
        )}
      </motion.div>
    </div>
  );
} 
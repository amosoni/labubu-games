'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, RotateCcw, Share2, Heart, Star, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { IGame } from '@/lib/models/Game';
import CommentForm from '@/components/ui/CommentForm';
import CommentList from '@/components/ui/CommentList';
import { sampleGames } from '@/lib/gameData';

interface GamePageClientProps {
  game: Partial<IGame>;
  locale: string;
  gameId: string;
}

export default function GamePageClient({ game, locale, gameId }: GamePageClientProps) {
  const [mounted, setMounted] = useState(false);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // 简化useEffect，移除所有可能导致问题的操作
    const timer = setTimeout(() => {
      setIsGameLoading(false);
      setMounted(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  if (isGameLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading game...</p>
        </div>
      </div>
    );
  }

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    // 重新加载游戏iframe
    const iframe = document.getElementById('game-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleShare = () => {
    // 简化的分享功能
    try {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
      }).catch(() => {
        // 使用传统方法
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Link copied to clipboard!');
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/${locale}/games`}
                className="flex items-center space-x-2 text-gray-600 hover:text-pink-500 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Games</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Game Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Game Thumbnail/Player */}
              <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 relative">
                {game.embedUrl ? (
                  <iframe
                    id="game-iframe"
                    src={game.embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    title={game.title || 'Game'}
                    onLoad={() => setIsGameLoading(false)}
                  />
                ) : (
                  <div className="aspect-video bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <img
                      src={game.thumbnailUrl || '/images/Labubu-Merge.jpg'}
                      alt={game.title || ''}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <button
                        onClick={handlePlay}
                        className="w-16 h-16 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                      >
                        <Play size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Game Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{game.title}</h1>
                <p className="text-gray-600 mb-6">{game.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-pink-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-pink-600">4.8</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">88K</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">12.5K</div>
                    <div className="text-sm text-gray-600">Plays</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">892</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-6">
                  <button
                    onClick={handlePlay}
                    className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  
                  <button
                    onClick={handleMute}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    <span>{isMuted ? 'Unmute' : 'Mute'}</span>
                  </button>
                  
                  <button
                    onClick={handleRestart}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <RotateCcw size={20} />
                    <span>Restart</span>
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {game.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <MessageCircle className="mr-2" size={24} />
                  Comments
                </h2>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  {showComments ? 'Hide Comments' : 'Show Comments'}
                </button>
              </div>

              {showComments && (
                <div className="space-y-6">
                  <CommentForm gameId={gameId} />
                  <CommentList gameId={gameId} />
                </div>
              )}
            </div>

            {/* SEO Content Section - visible long-form content */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6 space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">About {game.title}</h2>
              <p className="text-gray-700 leading-7">
                Enjoy a relaxing ASMR experience with cute Labubu vibes. This browser game is optimized for fast loading,
                mobile-friendly controls and short play sessions. No download required – just press Play and start.
              </p>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Why players love it</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Adorable Labubu art style and smooth animations</li>
                  <li>One‑tap controls – perfect for casual play</li>
                  <li>Works on desktop and mobile browsers</li>
                  <li>Completely free to play</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How to play</h3>
                <ol className="list-decimal pl-6 text-gray-700 space-y-1">
                  <li>Click the Play button to load the game.</li>
                  <li>Use on‑screen prompts to interact with objects.</li>
                  <li>Turn sound on for the full ASMR experience.</li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">FAQ</h3>
                <details className="mb-2">
                  <summary className="cursor-pointer font-medium text-gray-800">Is the game free?</summary>
                  <p className="mt-2 text-gray-700">Yes, you can play directly in your browser for free.</p>
                </details>
                <details className="mb-2">
                  <summary className="cursor-pointer font-medium text-gray-800">Does it work on mobile?</summary>
                  <p className="mt-2 text-gray-700">Yes, the game is optimized for phones and tablets.</p>
                </details>
              </div>
            </div>

            {/* Related games with internal links */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Related Games</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleGames
                  .filter((g) => g.title !== game.title && (g.category === game.category || g.tags?.some(t => game.tags?.includes(t || ''))))
                  .slice(0, 4)
                  .map((g, idx) => {
                    const slug = (g.title || '').toLowerCase().replace(/\s+/g, '-');
                    return (
                      <Link
                        key={`${slug}-${idx}`}
                        href={`/${locale}/play/${slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg border hover:border-pink-400 transition-colors"
                      >
                        <img src={g.thumbnailUrl || '/images/Labubu-Merge.jpg'} alt={g.title || ''} className="w-14 h-14 rounded object-cover" />
                        <div>
                          <div className="font-medium text-gray-800">{g.title}</div>
                          <div className="text-sm text-gray-500 capitalize">{g.category}</div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Game Info</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Category</label>
                  <p className="text-gray-800 capitalize">{game.category}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Popularity</label>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${game.popularity || 0}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{game.popularity || 0}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
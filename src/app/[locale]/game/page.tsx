'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, MessageCircle, ThumbsUp, Send, User, Volume2, VolumeX, Fullscreen, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { sampleGames } from '@/lib/gameData';
import { IGame } from '@/lib/models/Game';

interface GamePageProps {
  params: Promise<{ locale: string }>;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  rating: number;
  createdAt: string;
  likes: number;
}

export default function GamePage({ params }: GamePageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [selectedGame, setSelectedGame] = useState(sampleGames[0]);
  const [isGameLoading, setIsGameLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState('');

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

  const loadComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?gameSlug=${selectedGame.title?.toLowerCase().replace(/\s+/g, '-')}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Failed to load comments:', error);
    }
  }, [selectedGame.title]);

  useEffect(() => {
    setMounted(true);
    loadComments();
  }, [loadComments]);

  const handleGameChange = (game: Partial<IGame>) => {
    setSelectedGame(game);
    setIsGameLoading(true);
    loadComments();
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newAuthor.trim()) return;

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameSlug: selectedGame.title?.toLowerCase().replace(/\s+/g, '-'),
          author: newAuthor,
          content: newComment,
          rating: newRating,
        }),
      });

      if (response.ok) {
        setNewComment('');
        setNewAuthor('');
        setNewRating(5);
        loadComments();
      }
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    try {
      const response = await fetch('/api/comments/manage', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentId, action: 'like' }),
      });

      if (response.ok) {
        loadComments();
      }
    } catch (error) {
      console.error('Failed to like comment:', error);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* 游戏头部 */}
      <div className="bg-white/80 backdrop-blur-md border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${locale}`}
              className="text-pink-500 hover:text-pink-600 font-semibold flex items-center"
            >
              ← Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-pink-500" />
              </button>
              <button className="p-2 hover:bg-pink-100 rounded-full transition-colors">
                <Share2 className="w-5 h-5 text-pink-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 游戏区域 */}
          <div className="lg:col-span-2">
            {/* 游戏选择器 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose Your Game</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sampleGames.map((game, index) => (
                  <button
                    key={game.title || index}
                    onClick={() => handleGameChange(game)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedGame.title === game.title
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    <img
                      src={game.thumbnailUrl || '/images/placeholder.jpg'}
                      alt={game.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-800 mb-1">{game.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{game.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 游戏信息 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-start space-x-4">
                <img
                  src={selectedGame.thumbnailUrl || '/images/placeholder.jpg'}
                  alt={selectedGame.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedGame.title}</h1>
                  <p className="text-gray-600 mb-4">{selectedGame.description}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 font-semibold">4.8</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <MessageCircle className="w-5 h-5 mr-1" />
                      <span>{comments.length} comments</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Heart className="w-5 h-5 mr-1" />
                      <span>{selectedGame.popularity}K likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 游戏iframe */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
              {/* 游戏控制栏 */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedGame.thumbnailUrl || '/images/placeholder.jpg'}
                    alt={selectedGame.title}
                    className="w-8 h-8 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{selectedGame.title}</h3>
                    <p className="text-sm opacity-90">Playing now</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  
                  <button
                    onClick={() => window.open(selectedGame.embedUrl, '_blank')}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Open in new tab"
                  >
                    <Fullscreen className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => window.location.reload()}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    title="Restart game"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 游戏iframe */}
              <div className="relative aspect-video bg-gray-100">
                {isGameLoading && (
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                      <p className="text-gray-600 font-medium">Loading game...</p>
                    </div>
                  </div>
                )}
                
                <iframe
                  src={selectedGame.embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  allow="autoplay; fullscreen; microphone; camera"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
                  title={selectedGame.title}
                  onLoad={() => setIsGameLoading(false)}
                />
              </div>
            </div>

            {/* 评论区域 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageCircle className="w-6 h-6 text-pink-500 mr-2" />
                Comments ({comments.length})
              </h2>

              {/* 添加评论表单 */}
              <form onSubmit={handleSubmitComment} className="mb-8 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:border-pink-400 focus:outline-none"
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={`w-6 h-6 ${
                            star <= newRating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          <Star className="w-full h-full fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <textarea
                  placeholder="Share your thoughts about this game..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-pink-400 focus:outline-none mb-4"
                  rows={3}
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Post Comment</span>
                </button>
              </form>

              {/* 评论列表 */}
              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{comment.createdAt}</span>
                          </div>
                          <p className="text-gray-700 mb-3">{comment.content}</p>
                          <div className="flex items-center space-x-4">
                            <button
                              onClick={() => handleLikeComment(comment.id)}
                              className="flex items-center space-x-1 text-gray-500 hover:text-pink-500 transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Game Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-semibold capitalize">{selectedGame.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Popularity</span>
                  <span className="font-semibold">{selectedGame.popularity}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    4.8
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selectedGame.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-pink-100 text-pink-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
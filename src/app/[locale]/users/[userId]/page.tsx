'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Heart, MessageCircle, Gamepad2, Calendar, Award, Target, Zap } from 'lucide-react';
import Link from 'next/link';
import { UserProfile, AvatarGenerator } from '@/lib/avatarService';
import AvatarDisplay from '@/components/ui/AvatarDisplay';

interface UserDetailPageProps {
  params: Promise<{ locale: string; userId: string }>;
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const getParams = async () => {
      try {
        const resolvedParams = await params;
        setLocale(resolvedParams.locale);
        
        // 从URL参数获取用户ID，生成用户数据
        const userId = resolvedParams.userId;
        const userData = AvatarGenerator.generateUserProfile(userId);
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };
    getParams();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">User not found</h1>
          <Link href={`/${locale}/users`} className="text-pink-500 hover:text-pink-600">
            ← Back to Users
          </Link>
        </div>
      </div>
    );
  }

  // 模拟游戏历史数据
  const gameHistory = [
    { id: 1, name: 'Labubu Dress Up', score: 1250, level: 15, lastPlayed: '2 hours ago', achievements: ['Fashion Master', 'Style Icon'] },
    { id: 2, name: 'Monster Adventure', score: 890, level: 12, lastPlayed: '1 day ago', achievements: ['Explorer', 'Treasure Hunter'] },
    { id: 3, name: 'Labubu Salon', score: 2100, level: 25, lastPlayed: '3 days ago', achievements: ['Hair Stylist', 'Beauty Expert'] },
    { id: 4, name: 'Cute Kitchen', score: 1560, level: 18, lastPlayed: '1 week ago', achievements: ['Master Chef', 'Food Critic'] },
  ];

  // 模拟成就数据
  const achievements = [
    { id: 1, name: 'First Steps', description: 'Played your first game', icon: '🎮', unlocked: true, date: '2024-01-15' },
    { id: 2, name: 'High Scorer', description: 'Achieved a score over 2000', icon: '🏆', unlocked: true, date: '2024-01-20' },
    { id: 3, name: 'Social Butterfly', description: 'Made 100 posts', icon: '💬', unlocked: true, date: '2024-01-25' },
    { id: 4, name: 'Community Helper', description: 'Helped 50 other players', icon: '🤝', unlocked: true, date: '2024-02-01' },
    { id: 5, name: 'Game Master', description: 'Completed all games', icon: '👑', unlocked: false, date: null },
    { id: 6, name: 'Legendary Player', description: 'Reached level 50', icon: '⭐', unlocked: false, date: null },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link 
              href={`/${locale}/users`}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* 用户信息卡片 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="text-center">
                <AvatarDisplay
                  user={user}
                  size="xl"
                  showStats={true}
                  showBadges={true}
                  interactive={false}
                />
                
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{user.displayName}</h2>
                  <p className="text-gray-500 mb-4">@{user.username}</p>
                  
                  {user.bio && (
                    <p className="text-gray-600 mb-6">{user.bio}</p>
                  )}
                  
                  <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </div>

                {/* 统计数据 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-pink-600">{user.stats.posts}</div>
                    <div className="text-sm text-gray-600">Posts</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{user.stats.likes}</div>
                    <div className="text-sm text-gray-600">Likes</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{user.stats.comments}</div>
                    <div className="text-sm text-gray-600">Comments</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{user.stats.gamesPlayed}</div>
                    <div className="text-sm text-gray-600">Games</div>
                  </div>
                </div>

                {/* 徽章 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Badges</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {user.badges.map((badge, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-sm font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 主要内容区域 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 游戏历史 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Gamepad2 className="w-6 h-6 mr-2 text-pink-500" />
                Game History
              </h3>
              
              <div className="space-y-4">
                {gameHistory.map((game) => (
                  <motion.div
                    key={game.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800">{game.name}</h4>
                      <span className="text-sm text-gray-500">{game.lastPlayed}</span>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
                        Score: {game.score.toLocaleString()}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-blue-500" />
                        Level: {game.level}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-1">
                      {game.achievements.map((achievement, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 成就系统 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-purple-500" />
                Achievements
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className={`font-semibold ${
                          achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h4>
                        <p className={`text-sm ${
                          achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.date && (
                          <p className="text-xs text-green-600 mt-1">
                            Unlocked: {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      {achievement.unlocked && (
                        <div className="text-green-500">
                          <Target className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 最近活动 */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-yellow-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">Played <span className="font-semibold">Labubu Salon</span></p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">Achieved <span className="font-semibold">High Scorer</span> badge</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-800">Posted in community</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

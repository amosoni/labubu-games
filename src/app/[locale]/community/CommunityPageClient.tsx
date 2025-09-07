'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Share2, ThumbsUp, User, Calendar, RefreshCw } from 'lucide-react';
import { UserProfile, AvatarGenerator } from '@/lib/avatarService';
import AvatarDisplay, { OnlineUsers } from '@/components/ui/AvatarDisplay';

interface CommunityPageClientProps {
  locale: string;
}

export default function CommunityPageClient({ locale }: CommunityPageClientProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  useEffect(() => {
    setMounted(true);
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      // 生成模拟用户数据
      const generatedUsers = AvatarGenerator.generateUsers(20);
      setUsers(generatedUsers);
      
      // 模拟在线用户（前5个用户）
      setOnlineUsers(generatedUsers.slice(0, 5));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    loadUsers();
  };

  const handleUserClick = (user: UserProfile) => {
    // 导航到用户详情页
    window.location.href = `/${locale}/users/${user.id}`;
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading community...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Community</h1>
          <p className="text-lg text-gray-600 mb-6">Connect with other Labubu game players!</p>
          
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <div className="text-sm text-gray-500">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'posts'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 py-2 px-4 rounded-md transition-colors ${
              activeTab === 'users'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Users
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'posts' ? (
              <div className="space-y-6">
                {/* Sample Posts */}
                {[1, 2, 3, 4, 5].map((post) => (
                  <motion.div
                    key={post}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: post * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">User {post}</h3>
                        <p className="text-sm text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">
                      Just completed the Labubu Merge game! It&apos;s so addictive and fun! 
                      The cute characters make it impossible to stop playing. 🎮✨
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        <span>12</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>3</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-pink-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => handleUserClick(user)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <AvatarDisplay user={user} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{user.displayName}</h3>
                        <p className="text-sm text-gray-500">Level {user.level} • {user.bio}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                            {user.badges.length} badges
                          </span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {user.stats.posts} posts
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Online Users */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Online Now
              </h3>
              <OnlineUsers users={onlineUsers} onUserClick={handleUserClick} />
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Users</span>
                  <span className="font-semibold text-pink-600">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts Today</span>
                  <span className="font-semibold text-blue-600">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Games Played</span>
                  <span className="font-semibold text-purple-600">5,678</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

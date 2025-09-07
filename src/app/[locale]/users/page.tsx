'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Trophy, Heart, MessageCircle, RefreshCw, Grid, List } from 'lucide-react';
import { UserProfile, AvatarGenerator } from '@/lib/avatarService';
import AvatarDisplay, { AvatarGrid } from '@/components/ui/AvatarDisplay';

interface UsersPageProps {
  params: Promise<{ locale: string }>;
}

export default function UsersPage({ params }: UsersPageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'level' | 'posts' | 'likes' | 'joinDate'>('level');
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

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await AvatarGenerator.fetchPublicAvatars(50);
      setUsers(userData);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = useCallback(() => {
    let filtered = [...users];

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.bio?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 排序
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'level':
          return b.level - a.level;
        case 'posts':
          return b.stats.posts - a.stats.posts;
        case 'likes':
          return b.stats.likes - a.stats.likes;
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        default:
          return 0;
      }
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, sortBy]);

  useEffect(() => {
    setMounted(true);
    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [filterUsers]);

  const handleUserClick = (user: UserProfile) => {
    // 跳转到用户详情页面
    window.location.href = `/${locale}/users/${user.id}`;
  };

  const refreshUsers = async () => {
    await loadUsers();
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* 页面头部 */}
      <div className="bg-white/80 backdrop-blur-md border-b border-pink-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4">
              👥 All Users
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Discover amazing Labubu players from around the world!
            </p>
            
            {/* 统计信息 */}
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-500">{users.length}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {users.filter(u => u.level >= 20).length}
                </div>
                <div className="text-sm text-gray-600">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {users.reduce((sum, u) => sum + u.stats.posts, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Posts</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 搜索和过滤栏 */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* 搜索框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users by name or username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
              />
            </div>

            {/* 排序选择 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'level' | 'posts' | 'likes' | 'joinDate')}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
            >
              <option value="level">Sort by Level</option>
              <option value="posts">Sort by Posts</option>
              <option value="likes">Sort by Likes</option>
              <option value="joinDate">Sort by Join Date</option>
            </select>

            {/* 视图模式切换 */}
            <div className="flex border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-3 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-3 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'bg-white text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>

            {/* 刷新按钮 */}
            <button
              onClick={refreshUsers}
              disabled={loading}
              className="flex items-center space-x-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 用户列表 */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <AvatarGrid
                users={filteredUsers}
                columns={4}
                showStats={true}
                showBadges={true}
                interactive={true}
                onUserClick={handleUserClick}
              />
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg p-6"
                  >
                    <div className="flex items-center justify-between">
                    <div onClick={() => handleUserClick(user)}>
                      <AvatarDisplay
                        user={user}
                        size="lg"
                        showStats={true}
                        showBadges={true}
                        interactive={true}
                        onClick={handleUserClick}
                      />
                    </div>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-4 h-4" />
                          <span>Lv.{user.level}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{user.stats.posts}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{user.stats.likes}</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          Joined {new Date(user.joinDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {/* 空状态 */}
        {!loading && filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No users found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

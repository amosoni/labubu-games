'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Crown, Star, Trophy, Heart, MessageCircle, Share2, Calendar, Award } from 'lucide-react';
import { UserProfile, AvatarGenerator, AvatarCache } from '@/lib/avatarService';

interface AvatarDisplayProps {
  user: UserProfile;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStats?: boolean;
  showBadges?: boolean;
  interactive?: boolean;
  onClick?: (user: UserProfile) => void;
}

function AvatarDisplay({ 
  user, 
  size = 'md', 
  showStats = false, 
  showBadges = false, 
  interactive = false,
  onClick 
}: AvatarDisplayProps) {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg'
  };

  useEffect(() => {
    setAvatarLoaded(false);
    setAvatarError(false);
    
    // 检查缓存
    if (AvatarCache.has(user.username)) {
      setCurrentAvatar(AvatarCache.get(user.username)!);
    } else {
      // 生成新头像
      const newAvatar = AvatarGenerator.generateConsistentAvatar(user.username);
      AvatarCache.set(user.username, newAvatar);
      setCurrentAvatar(newAvatar);
    }
  }, [user.username]);

  const handleAvatarError = () => {
    setAvatarError(true);
    // 生成备用头像
    const fallbackAvatar = AvatarGenerator.generateConsistentAvatar(user.username, {
      style: 'identicon',
      backgroundColor: 'ff6b6b'
    });
    setCurrentAvatar(fallbackAvatar);
  };

  const handleClick = () => {
    if (interactive && onClick) {
      onClick(user);
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 40) return 'text-purple-500';
    if (level >= 30) return 'text-blue-500';
    if (level >= 20) return 'text-green-500';
    if (level >= 10) return 'text-yellow-500';
    return 'text-gray-500';
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'first-post': return <MessageCircle className="w-3 h-3" />;
      case 'high-score': return <Trophy className="w-3 h-3" />;
      case 'community-helper': return <Heart className="w-3 h-3" />;
      case 'game-master': return <Crown className="w-3 h-3" />;
      case 'early-adopter': return <Star className="w-3 h-3" />;
      case 'top-contributor': return <Award className="w-3 h-3" />;
      default: return <Star className="w-3 h-3" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'first-post': return 'bg-blue-100 text-blue-600';
      case 'high-score': return 'bg-yellow-100 text-yellow-600';
      case 'community-helper': return 'bg-pink-100 text-pink-600';
      case 'game-master': return 'bg-purple-100 text-purple-600';
      case 'early-adopter': return 'bg-green-100 text-green-600';
      case 'top-contributor': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      className={`flex items-center space-x-3 ${interactive ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      whileHover={interactive ? { scale: 1.02 } : {}}
      whileTap={interactive ? { scale: 0.98 } : {}}
    >
      {/* 头像 */}
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
          <img
            src={currentAvatar}
            alt={user.displayName}
            className="w-full h-full object-cover"
            onLoad={() => setAvatarLoaded(true)}
            onError={handleAvatarError}
            style={{ display: avatarLoaded ? 'block' : 'none' }}
          />
          {!avatarLoaded && (
            <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 animate-pulse flex items-center justify-center">
              <User className="w-1/2 h-1/2 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* 在线状态指示器 */}
        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* 用户信息 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h3 className={`font-semibold text-gray-800 truncate ${textSizeClasses[size]}`}>
            {user.displayName}
          </h3>
          <span className={`text-xs ${getLevelColor(user.level)} font-medium`}>
            Lv.{user.level}
          </span>
        </div>
        
        <p className={`text-gray-500 truncate ${textSizeClasses[size]}`}>
          @{user.username}
        </p>

        {/* 徽章 */}
        {showBadges && user.badges.length > 0 && (
          <div className="flex items-center space-x-1 mt-1">
            {user.badges.slice(0, 3).map((badge, index) => (
              <div
                key={badge}
                className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 ${getBadgeColor(badge)}`}
              >
                {getBadgeIcon(badge)}
                <span className="hidden sm:inline">{badge.replace('-', ' ')}</span>
              </div>
            ))}
            {user.badges.length > 3 && (
              <div className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{user.badges.length - 3}
              </div>
            )}
          </div>
        )}

        {/* 统计信息 */}
        {showStats && (
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-3 h-3" />
              <span>{user.stats.posts}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{user.stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3" />
              <span>{user.stats.gamesPlayed}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// 头像网格组件
export interface AvatarGridProps {
  users: UserProfile[];
  columns?: number;
  showStats?: boolean;
  showBadges?: boolean;
  interactive?: boolean;
  onUserClick?: (user: UserProfile) => void;
}

function AvatarGrid({ 
  users, 
  columns = 4, 
  showStats = false, 
  showBadges = false, 
  interactive = false,
  onUserClick 
}: AvatarGridProps) {
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  };

  return (
    <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-4`}>
      {users.map((user, index) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <AvatarDisplay
            user={user}
            size="lg"
            showStats={showStats}
            showBadges={showBadges}
            interactive={interactive}
            onClick={onUserClick}
          />
        </motion.div>
      ))}
    </div>
  );
}

// 在线用户列表组件
export interface OnlineUsersProps {
  users: UserProfile[];
  maxDisplay?: number;
  showCount?: boolean;
  onUserClick?: (user: UserProfile) => void;
}

function OnlineUsers({ users, maxDisplay = 5, showCount = true, onUserClick }: OnlineUsersProps) {
  const displayUsers = users.slice(0, maxDisplay);
  const remainingCount = users.length - maxDisplay;

  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {displayUsers.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative cursor-pointer"
            onClick={() => onUserClick?.(user)}
          >
            <img
              src={user.avatar}
              alt={user.displayName}
              className="w-8 h-8 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform"
              title={user.displayName}
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </motion.div>
        ))}
      </div>
      
      {showCount && (
        <div className="text-sm text-gray-600">
          {users.length > 0 && (
            <span>
              {users.length} {users.length === 1 ? 'user' : 'users'} online
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default AvatarDisplay;
export { AvatarGrid, OnlineUsers };

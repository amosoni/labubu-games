'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Heart, User, Globe, Search, Bell, Settings, LogOut, Bookmark, History, HelpCircle } from 'lucide-react';
import MonsterIcon from '../ui/MonsterIcon';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  // 直接使用硬编码的文本，不再依赖next-intl
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 翻译映射
  const translations = {
    home: 'Home',
    games: 'Games',
    community: 'Community',
    users: 'Users',
    about: 'About',
    profile: 'Profile',
    favorites: 'Favorites',
    history: 'Game History',
    bookmarks: 'Bookmarks',
    settings: 'Settings',
    help: 'Help & Support',
    logout: 'Logout'
  };

  const navItems = [
    { key: 'home', href: `/${locale}`, icon: '🏠' },
    { key: 'games', href: `/${locale}/games`, icon: '🎮' },
    { key: 'community', href: `/${locale}/community`, icon: '👥' },
    { key: 'users', href: `/${locale}/users`, icon: '👤' },
    { key: 'about', href: `/${locale}/about`, icon: 'ℹ️' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const notifications = [
    { id: 1, title: 'New Game Added!', message: 'Labubu Adventure is now available', time: '2 hours ago', unread: true },
    { id: 2, title: 'Achievement Unlocked', message: 'You completed 10 games!', time: '1 day ago', unread: true },
    { id: 3, title: 'Community Update', message: 'New posts in the community', time: '3 days ago', unread: false },
  ];

  const favoriteGames = [
    { id: 1, title: 'Labubu Merge', thumbnail: '/images/Labubu-Merge.jpg' },
    { id: 2, title: 'Labubu Doll Mukbang ASMR', thumbnail: '/images/Labubu-Doll-Mukbang-Asmr.jpg' },
    { id: 3, title: 'Labubu Merge 1', thumbnail: '/images/Labubu-Merge-1.webp' },
  ];

  const userMenuItems = [
    { key: 'profile', href: `/${locale}/profile`, icon: User, label: 'Profile' },
    { key: 'favorites', href: `/${locale}/favorites`, icon: Heart, label: 'Favorites' },
    { key: 'history', href: `/${locale}/history`, icon: History, label: 'Game History' },
    { key: 'bookmarks', href: `/${locale}/bookmarks`, icon: Bookmark, label: 'Bookmarks' },
    { key: 'settings', href: `/${locale}/settings`, icon: Settings, label: 'Settings' },
    { key: 'help', href: `/${locale}/help`, icon: HelpCircle, label: 'Help & Support' },
    { key: 'logout', href: `/${locale}/logout`, icon: LogOut, label: 'Logout' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-pink-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - 点击回到首页 */}
          <Link 
            href={`/${locale}`}
            className="flex items-center space-x-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                <MonsterIcon size={24} variant="happy" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 group-hover:text-pink-500 transition-colors">
                  Labubu Games
                </span>
                <span className="text-xs text-gray-500 group-hover:text-pink-400 transition-colors">
                  Cute Monster Paradise
                </span>
              </div>
            </motion.div>
            </Link>

          {/* 桌面导航菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-500 transition-colors font-medium relative group"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{translations[item.key as keyof typeof translations]}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* 右侧功能按钮 */}
          <div className="flex items-center space-x-4">
            {/* 搜索按钮 */}
            <div className="relative">
              <button 
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* 搜索下拉框 */}
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-pink-200 py-2 z-50"
                >
                  <div className="px-4 py-2">
                    <input
                      type="text"
                      placeholder="Search games, users, or topics..."
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Recent searches</p>
                    <div className="mt-2 space-y-1">
                      <div className="px-2 py-1 hover:bg-pink-50 rounded cursor-pointer">Labubu Merge</div>
                      <div className="px-2 py-1 hover:bg-pink-50 rounded cursor-pointer">ASMR Games</div>
                      <div className="px-2 py-1 hover:bg-pink-50 rounded cursor-pointer">Puzzle Games</div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 通知按钮 */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </button>

              {/* 通知下拉框 */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-pink-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-pink-50 cursor-pointer ${notification.unread ? 'bg-pink-50' : ''}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-pink-500' : 'bg-gray-300'}`}></div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-800">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link 
                      href={`/${locale}/notifications`}
                      className="text-pink-500 text-sm font-medium hover:text-pink-600"
                    >
                      View all notifications
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 收藏按钮 */}
            <div className="relative">
              <button 
                onClick={() => setShowFavorites(!showFavorites)}
                className="p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>

              {/* 收藏下拉框 */}
              {showFavorites && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-pink-200 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">Favorite Games</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {favoriteGames.map((game) => (
                      <Link
                        key={game.id}
                        href={`/${locale}/play/${game.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center space-x-3 px-4 py-3 hover:bg-pink-50"
                      >
                        <img
                          src={game.thumbnail}
                          alt={game.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-800">{game.title}</h4>
                          <p className="text-xs text-gray-500">Click to play</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <Link 
                      href={`/${locale}/favorites`}
                      className="text-pink-500 text-sm font-medium hover:text-pink-600"
                    >
                      View all favorites
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            {/* 语言切换 */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-2 p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-medium">EN</span>
              </button>

              {/* 语言下拉菜单 */}
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-pink-200 py-2 z-50"
                >
                  {languages.map((lang) => (
                    <Link
                      key={lang.code}
                      href={`/${lang.code}`}
                      className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>

            {/* 用户按钮 */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
              >
                <User className="w-5 h-5" />
              </button>

              {/* 用户下拉菜单 */}
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-pink-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Guest User</h4>
                        <p className="text-sm text-gray-500">Not signed in</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-500 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* 移动端菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
      <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-pink-200 py-4"
      >
            <div className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 text-gray-700 hover:text-pink-500 transition-colors py-2"
            >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{translations[item.key as keyof typeof translations]}</span>
            </Link>
          ))}
        </div>
      </motion.div>
        )}
      </div>
    </nav>
  );
}
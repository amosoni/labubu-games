'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Heart, Star, Clock, Trophy, Edit3, Camera } from 'lucide-react';

interface ProfilePageProps {
  params: Promise<{ locale: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">个人资料</h1>
            <p className="text-blue-200">管理您的账户和偏好设置</p>
          </div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">Labubu 玩家</h2>
                <p className="text-blue-200 mb-4">游戏爱好者，自 2024 年开始</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-white font-bold">12</div>
                    <div className="text-blue-200 text-sm">获胜游戏</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-white font-bold">4.8</div>
                    <div className="text-blue-200 text-sm">评分</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Clock className="w-6 h-6 text-green-400 mx-auto mb-1" />
                    <div className="text-white font-bold">24h</div>
                    <div className="text-blue-200 text-sm">游戏时间</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3 text-center">
                    <Heart className="w-6 h-6 text-red-400 mx-auto mb-1" />
                    <div className="text-white font-bold">8</div>
                    <div className="text-blue-200 text-sm">收藏</div>
                  </div>
                </div>

                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2 mx-auto md:mx-0">
                  <Edit3 className="w-4 h-4" />
                  编辑资料
                </button>
              </div>
            </div>
          </motion.div>

          {/* Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              设置
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white">语言</span>
                <select className="bg-white/10 text-white border border-white/20 rounded px-3 py-1">
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white">通知</span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span className="text-white">自动保存进度</span>
                <input type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
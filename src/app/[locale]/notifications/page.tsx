'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Check, X } from 'lucide-react';

interface NotificationsPageProps {
  params: Promise<{ locale: string }>;
}

export default function NotificationsPage({ params }: NotificationsPageProps) {
  const [locale, setLocale] = useState('en');
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'game',
      title: 'New Game Added!',
      message: 'Labubu Adventure is now available to play',
      time: '2 hours ago',
      unread: true,
      icon: '🎮'
    },
    {
      id: 2,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You completed 10 games! Earned the "Game Master" badge',
      time: '1 day ago',
      unread: true,
      icon: '🏆'
    },
    {
      id: 3,
      type: 'community',
      title: 'Community Update',
      message: 'New posts in the community - check them out!',
      time: '3 days ago',
      unread: false,
      icon: '👥'
    },
    {
      id: 4,
      type: 'favorite',
      title: 'Game Updated',
      message: 'Labubu Merge has been updated with new features',
      time: '1 week ago',
      unread: false,
      icon: '❤️'
    }
  ]);

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

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <Bell className="w-8 h-8 text-pink-500 mr-3" />
              Notifications
            </h1>
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            >
              Mark All as Read
            </button>
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.unread 
                    ? 'bg-pink-50 border-pink-500' 
                    : 'bg-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{notification.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{notification.title}</h3>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {notification.unread && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-green-600 hover:bg-green-100 rounded"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded"
                      title="Delete"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {notifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">You&apos;re all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
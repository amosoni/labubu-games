'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Star } from 'lucide-react';

export default function GameStats() {
  const stats = [
    { icon: TrendingUp, label: 'Games Played', value: '1.2M+', color: 'from-pink-500 to-rose-500' },
    { icon: Users, label: 'Active Players', value: '50K+', color: 'from-purple-500 to-pink-500' },
    { icon: Clock, label: 'Play Time', value: '2.5M+', color: 'from-blue-500 to-cyan-500' },
    { icon: Star, label: 'Average Rating', value: '4.8/5', color: 'from-yellow-500 to-orange-500' },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Amazing Community</h2>
          <p className="text-gray-600 text-lg">Join thousands of players enjoying our cute monster games!</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-4`}>
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 
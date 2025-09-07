'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Gamepad2, Star, Shield, Sparkles } from 'lucide-react';
import MonsterIcon from '@/components/ui/MonsterIcon';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default function AboutPage({ params }: AboutPageProps) {
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
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-4 mb-8">
            <MonsterIcon size={64} variant="love" />
            <MonsterIcon size={48} variant="happy" />
            <MonsterIcon size={64} variant="wink" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About Labubu Game 💕
          </h1>
          <p className="text-xl text-white text-opacity-90 leading-relaxed">
            A magical world where cute monsters and amazing games come together!
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <Heart className="mx-auto mb-4 text-primary" size={48} fill="currentColor" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
            We believe every girl deserves a safe, fun, and creative space to play and express herself. 
            Labubu Game brings together the cutest games from around the web, creating a magical world 
            where imagination has no limits!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-primary bg-opacity-10 rounded-xl">
              <Shield className="mx-auto mb-3 text-primary" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">All games are carefully selected and safe for players of all ages.</p>
            </div>
            <div className="text-center p-6 bg-secondary bg-opacity-10 rounded-xl">
              <Sparkles className="mx-auto mb-3 text-secondary" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Always Fresh</h3>
              <p className="text-gray-600 text-sm">New games added weekly to keep the fun going!</p>
            </div>
            <div className="text-center p-6 bg-pink-100 rounded-xl">
              <Users className="mx-auto mb-3 text-pink-500" size={32} />
              <h3 className="font-semibold text-gray-800 mb-2">Community First</h3>
              <p className="text-gray-600 text-sm">Connect with other players and share your creations.</p>
            </div>
          </div>
        </motion.div>

        {/* What We Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="text-center mb-8">
            <Gamepad2 className="mx-auto mb-4 text-secondary" size={48} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🎮 Amazing Games</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Dress-up and Fashion Games</li>
                <li>• Makeup and Beauty Salon</li>
                <li>• Pet Care and Nurturing</li>
                <li>• Simulation and Management</li>
                <li>• Adventure and Puzzle Games</li>
                <li>• Monster Customization</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">✨ Special Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Blind Box Mode for Surprises</li>
                <li>• Community Screenshot Sharing</li>
                <li>• Voting for Cutest Designs</li>
                <li>• Multi-language Support</li>
                <li>• Mobile-Friendly Design</li>
                <li>• No Registration Required</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-cute rounded-xl shadow-lg p-8 mb-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Join Our Growing Community!</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-white text-opacity-90">Cute Games</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-white text-opacity-90">Happy Players</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">8</div>
              <div className="text-white text-opacity-90">Game Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-white text-opacity-90">Languages</div>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Star className="mx-auto mb-4 text-yellow-500" size={48} fill="currentColor" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          </div>
          
          <p className="text-gray-600 text-lg leading-relaxed text-center mb-6">
            Inspired by the adorable Labubu characters that took the world by storm in 2025, 
            we created Labubu Game as a tribute to all things cute and magical. Our team of 
            game enthusiasts and designers work tirelessly to curate the best games and create 
            an experience that sparks joy and creativity.
          </p>

          <div className="text-center">
            <p className="text-gray-500 italic">
              &ldquo;Every girl deserves a world where her imagination can run wild!&rdquo;
            </p>
            <p className="text-gray-400 mt-2">- The Labubu Game Team 💖</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
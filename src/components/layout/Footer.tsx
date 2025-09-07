'use client';

import Link from 'next/link';
import { Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import MonsterIcon from '../ui/MonsterIcon';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  // 直接使用硬编码的文本，不再依赖next-intl

  return (
    <footer className="bg-gradient-cute text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <MonsterIcon size={32} variant="love" />
              <span className="font-bold text-xl">Labubu Game</span>
            </div>
            <p className="text-white text-opacity-80 mb-4">
              Build your cute monster world and play the best games for girls! 
              A safe, fun environment for creative play.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-pink-200 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-200 transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-pink-200 transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}/games`} className="text-white text-opacity-80 hover:text-white transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/community`} className="text-white text-opacity-80 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-white text-opacity-80 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Popular Categories</h3>
            <ul className="space-y-2">
              <li className="text-white text-opacity-80">Dress-up</li>
              <li className="text-white text-opacity-80">Makeup</li>
              <li className="text-white text-opacity-80">Simulation</li>
              <li className="text-white text-opacity-80">Monster</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white border-opacity-20 mt-8 pt-8 text-center">
          <p className="text-white text-opacity-80">
            © 2025 Labubu Game. Made with <Heart size={16} className="inline mx-1" fill="currentColor" /> for girls who love cute games.
          </p>
        </div>
      </div>
    </footer>
  );
}
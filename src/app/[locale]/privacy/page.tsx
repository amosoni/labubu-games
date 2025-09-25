'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Database, Cookie, Mail, Phone, MapPin } from 'lucide-react';
import MonsterIcon from '@/components/ui/MonsterIcon';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export default function PrivacyPage({ params }: PrivacyPageProps) {
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
            <Shield className="text-pink-500" size={48} />
            <MonsterIcon size={64} variant="wink" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy Policy 🔒
          </h1>
          <p className="text-xl text-white text-opacity-90 leading-relaxed">
            Your privacy matters to us. Learn how we protect your information.
          </p>
          <p className="text-sm text-white text-opacity-70 mt-4">
            Last updated: January 15, 2025
          </p>
        </motion.div>

        {/* Privacy Policy Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Eye className="text-pink-500" size={24} />
              Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Labubu Game ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website labubugame.app.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Database className="text-pink-500" size={24} />
              Information We Collect
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Information You Provide</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Comments and feedback when you interact with our games</li>
                  <li>Contact information if you reach out to us</li>
                  <li>Game preferences and favorites you save</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Information We Collect Automatically</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, games played)</li>
                  <li>IP address and general location information</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>To provide and improve our gaming services</li>
              <li>To personalize your gaming experience</li>
              <li>To analyze website usage and optimize performance</li>
              <li>To communicate with you about updates and new games</li>
              <li>To ensure the security and safety of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Cookie className="text-pink-500" size={24} />
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use cookies and similar technologies to enhance your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how you use our site (Google Analytics)</li>
              <li><strong>Preference Cookies:</strong> Remember your game preferences and settings</li>
              <li><strong>Advertising Cookies:</strong> Used to display relevant ads (when AdSense is approved)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              You can control cookies through your browser settings, but disabling them may affect website functionality.
            </p>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use the following third-party services that may collect information:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Google Analytics:</strong> Website traffic analysis</li>
              <li><strong>Google AdSense:</strong> Advertising services (when approved)</li>
              <li><strong>Game Providers:</strong> Third-party game content</li>
              <li><strong>Vercel:</strong> Website hosting and performance</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is designed to be safe for children. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Opt-out of certain data processing</li>
              <li>Data portability</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-pink-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-pink-500" size={24} />
              Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-pink-500" />
                <span>Email: privacy@labubugame.app</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-pink-500" />
                <span>Website: labubugame.app</span>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

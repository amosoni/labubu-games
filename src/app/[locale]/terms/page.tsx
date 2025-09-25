'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Users, Gamepad2, Mail, MapPin } from 'lucide-react';
import MonsterIcon from '@/components/ui/MonsterIcon';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export default function TermsPage({ params }: TermsPageProps) {
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
            <FileText className="text-pink-500" size={48} />
            <MonsterIcon size={64} variant="wink" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Terms of Service 📋
          </h1>
          <p className="text-xl text-white text-opacity-90 leading-relaxed">
            Please read these terms carefully before using our service.
          </p>
          <p className="text-sm text-white text-opacity-70 mt-4">
            Last updated: January 15, 2025
          </p>
        </motion.div>

        {/* Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white bg-opacity-95 rounded-xl shadow-lg p-8 space-y-8"
        >
          {/* Agreement */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="text-pink-500" size={24} />
              Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using Labubu Game ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Service. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Gamepad2 className="text-pink-500" size={24} />
              Description of Service
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Labubu Game is a free online gaming platform that provides access to various browser-based games featuring cute monster characters. Our Service includes:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access to curated collection of Labubu-themed games</li>
              <li>Game recommendations and categorization</li>
              <li>Community features and user interactions</li>
              <li>Mobile-optimized gaming experience</li>
              <li>Multi-language support</li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="text-pink-500" size={24} />
              User Responsibilities
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When using our Service, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the Service only for lawful purposes</li>
              <li>Respect other users and maintain a friendly environment</li>
              <li>Not attempt to hack, disrupt, or damage the Service</li>
              <li>Not use automated systems to access the Service</li>
              <li>Not share inappropriate, offensive, or harmful content</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          {/* Prohibited Uses */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={24} />
              Prohibited Uses
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You may not use our Service:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
              <li>To upload or transmit viruses or any other type of malicious code</li>
              <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              <li>For any obscene or immoral purpose</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Intellectual Property Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Service and its original content, features, and functionality are and will remain the exclusive property of Labubu Game and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
            </p>
            <p className="text-gray-600 leading-relaxed">
              The games featured on our platform are owned by their respective creators and are used under appropriate licensing agreements. We respect intellectual property rights and expect our users to do the same.
            </p>
          </section>

          {/* User-Generated Content */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User-Generated Content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service. You retain any and all of your rights to any Content you submit, post or display on or through the Service.
            </p>
          </section>

          {/* Privacy Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices. By using our Service, you agree to the collection and use of information in accordance with our Privacy Policy.
            </p>
          </section>

          {/* Service Availability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Availability</h2>
            <p className="text-gray-600 leading-relaxed">
              We strive to provide continuous service availability, but we do not guarantee that the Service will be available at all times. The Service may be temporarily unavailable due to maintenance, updates, or technical issues. We reserve the right to modify or discontinue the Service at any time without notice.
            </p>
          </section>

          {/* Third-Party Links */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed">
              Our Service may contain links to third-party websites or services that are not owned or controlled by Labubu Game. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Labubu Game shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Disclaimer</h2>
            <p className="text-gray-600 leading-relaxed">
              The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, this Company excludes all representations, warranties, conditions and terms relating to our Service and the use of this Service. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, fraud, or any other liability that cannot be excluded or limited by applicable law.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
              In no event shall Labubu Game, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Termination</h2>
            <p className="text-gray-600 leading-relaxed">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will cease immediately.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          {/* Contact Information */}
          <section className="bg-pink-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="text-pink-500" size={24} />
              Contact Information
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-pink-500" />
                <span>Email: legal@labubugame.app</span>
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

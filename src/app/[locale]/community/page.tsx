import { UserProfile, AvatarGenerator } from '@/lib/avatarService';
import CommunityPageClient from './CommunityPageClient';

interface CommunityPageProps {
  params: Promise<{ locale: string }>;
}

export default async function CommunityPage({ params }: CommunityPageProps) {
  let locale = 'en';
  
  try {
    const resolvedParams = await params;
    locale = resolvedParams.locale;
  } catch (error) {
    console.error('Error resolving params:', error);
  }

  return <CommunityPageClient locale={locale} />;
}
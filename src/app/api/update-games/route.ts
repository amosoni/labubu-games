import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/database';
import Game from '@/lib/models/Game';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('Starting weekly game update...');

    await dbConnect();

    // Here you would normally run the scraper
    // For now, we'll just add some sample data and revalidate cache
    
    const newGamesCount = await updateGamesFromScraper();
    
    // Revalidate the games cache
    revalidatePath('/[locale]/games');
    revalidatePath('/[locale]');
    
    console.log(`Updated ${newGamesCount} games successfully`);

    return NextResponse.json({
      success: true,
      message: `Updated ${newGamesCount} games`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating games:', error);
    return NextResponse.json(
      { error: 'Failed to update games', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

async function updateGamesFromScraper(): Promise<number> {
  // This is where you would run the actual scraper
  // For demo purposes, we'll just add a sample game
  
  try {
    const sampleNewGame = {
      title: `New Cute Game ${Date.now()}`,
      description: 'A freshly discovered cute game for girls!',
      embedUrl: 'https://example.com/new-game',
      thumbnailUrl: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'dress-up',
      tags: ['new', 'cute', 'fashion'],
      language: 'en',
      featured: false,
      popularity: Math.floor(Math.random() * 50),
    };

    await Game.create(sampleNewGame);
    return 1;
  } catch (error) {
    console.error('Error creating sample game:', error);
    return 0;
  }
}

// Allow GET for testing
export async function GET() {
  return NextResponse.json({
    message: 'Game update endpoint is working',
    timestamp: new Date().toISOString(),
  });
}

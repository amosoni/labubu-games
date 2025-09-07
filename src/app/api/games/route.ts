import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Game from '@/lib/models/Game';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    const query: Record<string, string | boolean | { $search: string }> = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (page - 1) * limit;
    
    const games = await Game.find(query)
      .sort({ featured: -1, popularity: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Game.countDocuments(query);

    return NextResponse.json({
      games,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      }
    });
  } catch (error) {
    console.error('Error fetching games:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const gameData = await request.json();
    const game = new Game(gameData);
    await game.save();

    return NextResponse.json(game, { status: 201 });
  } catch (error) {
    console.error('Error creating game:', error);
    return NextResponse.json(
      { error: 'Failed to create game' },
      { status: 500 }
    );
  }
}
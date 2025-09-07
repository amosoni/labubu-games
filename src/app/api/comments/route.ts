import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/database';
import Comment from '@/lib/models/Comment';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const gameId = searchParams.get('gameId');
    
    if (!gameId) {
      return NextResponse.json({ error: 'Game ID is required' }, { status: 400 });
    }
    
    const comments = await Comment.find({ gameSlug: gameId })
      .sort({ createdAt: -1 })
      .limit(50);
    
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { gameId, authorName, rating, content } = body;
    
    if (!gameId || !authorName || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const comment = new Comment({
      gameSlug: gameId,
      author: authorName,
      rating: rating || 5,
      content,
    });
    
    await comment.save();
    
    return NextResponse.json({ message: 'Comment submitted successfully', comment });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}

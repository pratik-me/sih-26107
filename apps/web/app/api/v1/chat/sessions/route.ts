import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function GET() {
  try {
    const sessions = await standaloneAIService.getChatSessions();
    return NextResponse.json(sessions);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error fetching sessions' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message || body.topic || 'How to get BIS certification?';
    const result = await standaloneAIService.handleChatMessage({
      message,
      roleMode: 'INDUSTRY'
    });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error processing BIS service request' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await standaloneAIService.handleChatMessage({
      sessionId: body.sessionId,
      message: body.message,
      roleMode: body.roleMode,
      language: body.language,
      autoDetectLanguage: body.autoDetectLanguage,
      userId: body.userId
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('[API /chat/message] Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await standaloneAIService.recommendStandards(body);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error recommending standards' }, { status: 500 });
  }
}

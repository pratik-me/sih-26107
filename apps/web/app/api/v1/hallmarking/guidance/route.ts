import { NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function GET() {
  try {
    const guidance = await standaloneAIService.getHallmarkingGuidance();
    return NextResponse.json(guidance);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error fetching guidance' }, { status: 500 });
  }
}

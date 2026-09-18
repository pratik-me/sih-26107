import { NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function GET() {
  try {
    const schemes = await standaloneAIService.getCertificationSchemes();
    return NextResponse.json(schemes);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error fetching schemes' }, { status: 500 });
  }
}

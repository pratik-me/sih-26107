import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const std = await standaloneAIService.getStandardById(decodeURIComponent(id));
    if (!std) {
      return NextResponse.json({ message: `Standard ${id} not found` }, { status: 404 });
    }
    return NextResponse.json(std);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error fetching standard' }, { status: 500 });
  }
}

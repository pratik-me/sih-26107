import { NextRequest, NextResponse } from 'next/server';
import { standaloneAIService } from '@/lib/bis-ai-service';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await standaloneAIService.getChatSession(id);
    if (!session) {
      return NextResponse.json({ message: `Session ${id} not found` }, { status: 404 });
    }
    return NextResponse.json(session);
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error fetching session' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await standaloneAIService.deleteChatSession(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error deleting session' }, { status: 500 });
  }
}

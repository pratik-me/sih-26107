import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  ChatMessage,
  ChatSession,
  ConfidenceLevel,
  IndianLanguage,
  QueryIntent
} from '@bis/shared-types';
import { AiAgentService } from '../ai-agent/ai-agent.service';

@Injectable()
export class ChatService {
  private inMemorySessions: Map<string, ChatSession> = new Map();

  constructor(
    private prisma: PrismaService,
    private aiAgentService: AiAgentService
  ) {}

  async sendMessage(params: {
    sessionId?: string;
    message: string;
    roleMode?: string;
    language?: IndianLanguage;
    userId?: string;
  }): Promise<{ session: ChatSession; reply: ChatMessage }> {
    let session: ChatSession;

    if (params.sessionId && this.inMemorySessions.has(params.sessionId)) {
      session = this.inMemorySessions.get(params.sessionId)!;
    } else {
      const newId = params.sessionId || `session-${Date.now()}`;
      session = {
        id: newId,
        title: params.message.slice(0, 45) + (params.message.length > 45 ? '...' : ''),
        userId: params.userId,
        language: params.language || IndianLanguage.EN,
        roleMode: params.roleMode || 'INDUSTRY',
        messages: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.inMemorySessions.set(newId, session);
    }

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sessionId: session.id,
      role: 'user',
      content: params.message,
      originalLanguage: params.language,
      createdAt: new Date().toISOString()
    };
    session.messages.push(userMsg);

    // 2. Execute AI Agent
    const agentResult = await this.aiAgentService.runAgent(params.message, params.language);

    // 3. Formulate Assistant Message
    const assistantMsg: ChatMessage = {
      id: `msg-ast-${Date.now()}`,
      sessionId: session.id,
      role: 'assistant',
      content: agentResult.structuredAnswer,
      originalLanguage: params.language,
      intent: agentResult.intent,
      confidence: agentResult.evidence.length > 0 ? ConfidenceLevel.HIGH : ConfidenceLevel.LOW,
      citations: agentResult.citations,
      evidence: agentResult.evidence,
      suggestedFollowUps: agentResult.suggestedFollowUps,
      sourceFreshnessWarning: agentResult.evidence.some(e => e.isOutdated)
        ? 'One or more referenced Indian Standards have status OUTDATED or UNDER_REVIEW.'
        : undefined,
      createdAt: new Date().toISOString()
    };

    session.messages.push(assistantMsg);
    session.updatedAt = new Date().toISOString();
    this.inMemorySessions.set(session.id, session);

    return { session, reply: assistantMsg };
  }

  async getSessions(userId?: string): Promise<ChatSession[]> {
    const list = Array.from(this.inMemorySessions.values());
    if (userId) {
      return list.filter(s => s.userId === userId);
    }
    return list;
  }

  async getSessionById(id: string): Promise<ChatSession> {
    const session = this.inMemorySessions.get(id);
    if (!session) {
      throw new NotFoundException(`Chat session '${id}' not found`);
    }
    return session;
  }

  async deleteSession(id: string): Promise<void> {
    this.inMemorySessions.delete(id);
  }
}

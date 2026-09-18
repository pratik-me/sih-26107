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
import { RAGService } from '../rag/rag.service';
import { getLLMProvider } from '@bis/ai';
import { randomUUID } from 'crypto';
import { Observable } from 'rxjs';

@Injectable()
export class ChatService {
  private llmProvider = getLLMProvider();
  private inMemorySessions = new Map<string, ChatSession>();

  constructor(
    private prisma: PrismaService,
    private aiAgentService: AiAgentService,
    private ragService: RAGService
  ) {}

  async sendMessage(params: {
    sessionId?: string;
    message: string;
    roleMode?: string;
    language?: IndianLanguage;
    userId?: string;
  }): Promise<{ session: ChatSession; reply: ChatMessage }> {
    let dbSession;

    if (params.sessionId) {
      dbSession = await this.prisma.chatSession.findUnique({
        where: { id: params.sessionId },
        include: { messages: { orderBy: { createdAt: 'asc' } } }
      });

      // Existing session check: if session has an owner and a different user accesses it, restrict access.
      if (dbSession && dbSession.userId && params.userId && dbSession.userId !== params.userId) {
        throw new NotFoundException(
          `Chat session '${params.sessionId}' not found`
        );
      }
    }

    if (!dbSession) {
      const sessionId = params.sessionId || randomUUID();
      const title =
        params.message.slice(0, 45) +
        (params.message.length > 45 ? '...' : '');

      dbSession = await this.prisma.chatSession.create({
        data: {
          id: sessionId,
          title,
          userId: params.userId || null,
          language: params.language || IndianLanguage.EN,
          roleMode: params.roleMode || 'INDUSTRY'
        },
        include: { messages: true }
      });
    }

    // 1. Persist User Message
    await this.prisma.message.create({
      data: {
        id: randomUUID(),
        sessionId: dbSession.id,
        role: 'user',
        content: params.message,
        originalLanguage: params.language || IndianLanguage.EN
      }
    });

    // 2. Execute AI Agent Loop
    const agentResult = await this.aiAgentService.runAgent(
      params.message,
      params.language
    );

    // 3. Persist Assistant Message
    const assistantMsgRecord = await this.prisma.message.create({
      data: {
        id: randomUUID(),
        sessionId: dbSession.id,
        role: 'assistant',
        content: agentResult.structuredAnswer,
        originalLanguage: params.language || IndianLanguage.EN,
        intent: agentResult.intent,
        confidence:
          agentResult.evidence.length > 0
            ? ConfidenceLevel.HIGH
            : ConfidenceLevel.LOW,
        citations: agentResult.citations as any,
        evidence: agentResult.evidence as any,
        suggestedFollowUps: agentResult.suggestedFollowUps as any,
        sourceFreshnessWarning: agentResult.evidence.some(
          e => e.isOutdated
        )
          ? 'One or more referenced Indian Standards have status OUTDATED or UNDER_REVIEW.'
          : null
      }
    });

    // Touch session updatedAt
    await this.prisma.chatSession.update({
      where: { id: dbSession.id },
      data: { updatedAt: new Date() }
    });

    // Retrieve updated session.
    // The session has already been verified as belonging to this user.
    const fullSession = await this.getSessionById(
      dbSession.id,
      params.userId
    );

    const reply: ChatMessage = {
      id: assistantMsgRecord.id,
      sessionId: assistantMsgRecord.sessionId,
      role: 'assistant',
      content: assistantMsgRecord.content,
      originalLanguage: assistantMsgRecord.originalLanguage as any,
      intent: assistantMsgRecord.intent as any,
      confidence: assistantMsgRecord.confidence as any,
      citations: (assistantMsgRecord.citations as any) || [],
      evidence: (assistantMsgRecord.evidence as any) || [],
      suggestedFollowUps:
        (assistantMsgRecord.suggestedFollowUps as any) || [],
      sourceFreshnessWarning:
        assistantMsgRecord.sourceFreshnessWarning || undefined,
      createdAt: assistantMsgRecord.createdAt.toISOString()
    };

    return { session: fullSession, reply };
  }

  streamMessage(params: {
    message: string;
    language?: IndianLanguage;
  }): Observable<{ data: string }> {
    return new Observable(observer => {
      this.ragService.searchEvidence({ query: params.message, language: params.language }).then(ragRes => {
        const evidence = ragRes.results;
        this.llmProvider
          .streamText(
            params.message,
            evidence,
            chunk => {
              observer.next({ data: JSON.stringify({ chunk }) });
            }
          )
          .then(result => {
            observer.next({
              data: JSON.stringify({
                done: true,
                citations: result.citations,
                confidence: result.confidence,
                groundingStatus: result.groundingStatus
              })
            });
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
      }).catch(err => {
        observer.error(err);
      });
    });
  }

  async getSessions(userId?: string): Promise<ChatSession[]> {
    try {
      const records = await this.prisma.chatSession.findMany({
        where: userId ? { userId } : {},
        include: {
          messages: {
            orderBy: { createdAt: 'asc' }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });

      if (records && records.length > 0) {
        return records.map(s => this.mapDbSessionToDomain(s));
      }
    } catch {
      // ignore
    }

    return Array.from(this.inMemorySessions.values());
  }

  async getSessionById(
    id: string,
    userId?: string
  ): Promise<ChatSession> {
    const record = await this.prisma.chatSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!record || (record.userId && userId && record.userId !== userId)) {
      throw new NotFoundException(`Chat session '${id}' not found`);
    }

    return this.mapDbSessionToDomain(record);
  }

  async deleteSession(id: string): Promise<void> {
    try {
      await this.prisma.chatSession.delete({
        where: { id }
      });
    } catch {
      // ignore
    }
    this.inMemorySessions.delete(id);
  }

  private mapDbSessionToDomain(s: any): ChatSession {
    return {
      id: s.id,
      title: s.title,
      userId: s.userId || undefined,
      language: s.language as any,
      roleMode: s.roleMode,
      messages: (s.messages || []).map((m: any) => ({
        id: m.id,
        sessionId: m.sessionId,
        role: m.role as any,
        content: m.content,
        originalLanguage: m.originalLanguage,
        intent: m.intent,
        confidence: m.confidence,
        citations: m.citations,
        evidence: m.evidence,
        suggestedFollowUps: m.suggestedFollowUps,
        sourceFreshnessWarning: m.sourceFreshnessWarning || undefined,
        createdAt: m.createdAt ? (typeof m.createdAt === 'string' ? m.createdAt : m.createdAt.toISOString()) : new Date().toISOString()
      })),
      createdAt: s.createdAt ? (typeof s.createdAt === 'string' ? s.createdAt : s.createdAt.toISOString()) : new Date().toISOString(),
      updatedAt: s.updatedAt ? (typeof s.updatedAt === 'string' ? s.updatedAt : s.updatedAt.toISOString()) : new Date().toISOString()
    };
  }
}

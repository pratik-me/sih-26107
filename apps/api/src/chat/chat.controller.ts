import { Controller, Post, Body, Get, Param, Delete, Sse, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { IndianLanguage } from '@bis/shared-types';
import { Observable } from 'rxjs';

@ApiTags('Chat & AI Assistant')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Send a message to the BIS IntelliGuide AI Assistant and receive grounded responses with evidence' })
  async sendMessage(
    @Body()
    body: {
      sessionId?: string;
      message: string;
      roleMode?: string;
      language?: IndianLanguage;
      userId?: string;
    }
  ) {
    return this.chatService.sendMessage(body);
  }

  @Sse('stream')
  @ApiOperation({ summary: 'Server-Sent Events streaming chat endpoint for real-time token delivery' })
  streamMessage(
    @Query('message') message: string,
    @Query('language') language?: IndianLanguage
  ): Observable<{ data: string }> {
    return this.chatService.streamMessage({ message: message || '', language });
  }

  @Get('sessions')
  @ApiOperation({ summary: 'Get all active chat sessions' })
  async getSessions() {
    return this.chatService.getSessions();
  }

  @Get('sessions/:id')
  @ApiOperation({ summary: 'Get a specific chat session by ID' })
  async getSessionById(@Param('id') id: string) {
    return this.chatService.getSessionById(id);
  }

  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Delete a chat session' })
  async deleteSession(@Param('id') id: string) {
    return this.chatService.deleteSession(id);
  }
}

import { Controller, Post, Body, Get, Param, Delete, Sse, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { IndianLanguage } from '@bis/shared-types';
import { Observable } from 'rxjs';

import { JwtAuthGuard, OptionalJwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Chat & AI Assistant')
@ApiBearerAuth()
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(OptionalJwtAuthGuard)
  @Post('message')
  @ApiOperation({ summary: 'Send a message to the BIS Saarthi AI Assistant and receive grounded responses with evidence' })
  async sendMessage(
    @Body()
    body: {
      sessionId?: string;
      message: string;
      roleMode?: string;
      language?: IndianLanguage;
      userId?: string;
    },
    @CurrentUser() user?: UserProfile
  ) {
    return this.chatService.sendMessage({
      ...body,
      userId: user?.id || body.userId
    });
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Sse('stream')
  @ApiOperation({ summary: 'Server-Sent Events streaming chat endpoint for real-time token delivery' })
  streamMessage(
    @Query('message') message: string,
    @Query('language') language?: IndianLanguage
  ): Observable<{ data: string }> {
    return this.chatService.streamMessage({ message: message || '', language });
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  @ApiOperation({ summary: 'Get all active chat sessions' })
  async getSessions() {
    return this.chatService.getSessions();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sessions/:id')
  @ApiOperation({ summary: 'Get a specific chat session by ID' })
  async getSessionById(@Param('id') id: string) {
    return this.chatService.getSessionById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sessions/:id')
  @ApiOperation({ summary: 'Delete a chat session' })
  async deleteSession(@Param('id') id: string) {
    return this.chatService.deleteSession(id);
  }
}

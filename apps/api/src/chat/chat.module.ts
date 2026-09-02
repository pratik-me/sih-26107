import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AiAgentModule } from '../ai-agent/ai-agent.module';
import { PrismaService } from '../common/prisma.service';

@Module({
  imports: [AiAgentModule],
  controllers: [ChatController],
  providers: [ChatService, PrismaService],
  exports: [ChatService]
})
export class ChatModule {}

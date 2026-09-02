import { Module, forwardRef } from '@nestjs/common';
import { AiAgentService } from './ai-agent.service';
import { StandardsModule } from '../standards/standards.module';
import { TestingModule } from '../testing/testing.module';
import { LaboratoriesModule } from '../laboratories/laboratories.module';
import { HallmarkingModule } from '../hallmarking/hallmarking.module';
import { ConsumerModule } from '../consumer/consumer.module';
import { RAGModule } from '../rag/rag.module';

@Module({
  imports: [
    StandardsModule,
    TestingModule,
    LaboratoriesModule,
    HallmarkingModule,
    ConsumerModule,
    RAGModule
  ],
  providers: [AiAgentService],
  exports: [AiAgentService]
})
export class AiAgentModule {}

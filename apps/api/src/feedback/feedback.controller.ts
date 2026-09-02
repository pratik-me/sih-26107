import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { FeedbackType } from '@bis/shared-types';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Submit user feedback (Helpful / Not Helpful / Report Issue)' })
  async submitFeedback(@Body() body: { messageId: string; feedback: FeedbackType; notes?: string }) {
    return this.feedbackService.recordFeedback(body);
  }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ComplianceService } from './compliance.service';
import { type ProductProfileQuery } from '@bis/shared-types';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Compliance Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('compliance')
export class ComplianceController {
  constructor(private complianceService: ComplianceService) {}

  @Post('generate-report')
  @ApiOperation({
    summary:
      'Generate comprehensive downloadable BIS Compliance Report with citations'
  })
  async generateReport(@Body() profile: ProductProfileQuery) {
    return this.complianceService.generateReport(profile);
  }
}
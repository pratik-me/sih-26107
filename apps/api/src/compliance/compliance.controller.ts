import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ComplianceService } from './compliance.service';
import { ProductProfileQuery } from '@bis/shared-types';

@ApiTags('Compliance Reports')
@Controller('compliance')
export class ComplianceController {
  constructor(private complianceService: ComplianceService) {}

  @Post('generate-report')
  @ApiOperation({ summary: 'Generate comprehensive downloadable BIS Compliance Report with citations' })
  async generateReport(@Body() profile: ProductProfileQuery) {
    return this.complianceService.generateReport(profile);
  }
}

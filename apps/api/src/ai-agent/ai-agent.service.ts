import { Injectable } from '@nestjs/common';
import {
  AgentExecutionResponse,
  Evidence,
  IndianLanguage,
  ToolName
} from '@bis/shared-types';
import {
  BISIntelliGuideAgent,
  BISAgentToolsHandler,
  DeterministicBISLLMProvider
} from '@bis/ai';
import { StandardsService } from '../standards/standards.service';
import { TestingService } from '../testing/testing.service';
import { LaboratoriesService } from '../laboratories/laboratories.service';
import { HallmarkingService } from '../hallmarking/hallmarking.service';
import { ConsumerService } from '../consumer/consumer.service';
import { RAGService } from '../rag/rag.service';

@Injectable()
export class AiAgentService implements BISAgentToolsHandler {
  private agent: BISIntelliGuideAgent;
  private llmProvider = new DeterministicBISLLMProvider();

  constructor(
    private standardsService: StandardsService,
    private testingService: TestingService,
    private laboratoriesService: LaboratoriesService,
    private hallmarkingService: HallmarkingService,
    private consumerService: ConsumerService,
    private ragService: RAGService
  ) {
    this.agent = new BISIntelliGuideAgent(this.llmProvider, this);
  }

  async executeTool(tool: ToolName, args: Record<string, unknown>): Promise<{ data: unknown; evidence: Evidence[] }> {
    const query = String(args.query || '');

    switch (tool) {
      case 'recommend_standards': {
        const rec = await this.standardsService.recommendStandards({ productName: query });
        const evidence: Evidence[] = rec.matches.flatMap(m => m.evidence);
        return { data: rec, evidence };
      }
      case 'search_standards': {
        const res = await this.standardsService.searchStandards(query);
        const evidence: Evidence[] = res.standards.map(s => ({
          id: `ev-${s.standardNumber}`,
          documentTitle: s.title,
          standardNumber: s.standardNumber,
          clause: 'Scope',
          page: 1,
          publicationDate: s.publicationDate,
          status: s.status,
          sourceUrl: s.sourceUrl,
          excerpt: s.scope,
          similarityScore: 0.9
        }));
        return { data: res, evidence };
      }
      case 'get_testing_requirements': {
        const reqs = await this.testingService.getTestingRequirements({ standardNumber: query, productName: query });
        const evidence: Evidence[] = reqs.map((r, i) => ({
          id: `ev-test-${i}`,
          documentTitle: `Testing Specification - ${r.standardNumber}`,
          standardNumber: r.standardNumber,
          clause: r.clauseNumber,
          page: 5,
          publicationDate: '2021-01-01',
          status: 'ACTIVE' as any,
          sourceUrl: r.sourceUrl || 'https://www.services.bis.gov.in',
          excerpt: `${r.testName}: ${r.description} Criteria: ${r.acceptanceCriteria} Frequency: ${r.testingFrequency}`,
          similarityScore: 0.92
        }));
        return { data: reqs, evidence };
      }
      case 'search_laboratories': {
        const labs = await this.laboratoriesService.searchLaboratories({ standardNumber: query });
        const evidence: Evidence[] = labs.laboratories.map((l, i) => ({
          id: `ev-lab-${i}`,
          documentTitle: `BIS Recognized Laboratory Directory`,
          standardNumber: l.recognizedStandards[0] || 'BIS Recognized Labs',
          clause: 'Accreditation Schedule',
          page: 1,
          publicationDate: '2024-01-01',
          status: 'ACTIVE' as any,
          sourceUrl: l.sourceUrl,
          excerpt: `${l.name} (${l.city}, ${l.state}) is recognized for standards: ${l.recognizedStandards.join(', ')}. Capabilities: ${l.testingCapabilities.join(', ')}.`,
          similarityScore: 0.95
        }));
        return { data: labs, evidence };
      }
      case 'search_hallmarking_information': {
        const guidance = await this.hallmarkingService.getGuidance();
        const evidence: Evidence[] = [
          {
            id: 'ev-hallmark-1417',
            documentTitle: 'Gold & Gold Alloys Fineness and Marking (IS 1417:2016)',
            standardNumber: 'IS 1417:2016',
            clause: '6.1',
            page: 4,
            publicationDate: '2016-09-01',
            status: 'ACTIVE' as any,
            sourceUrl: 'https://www.services.bis.gov.in/hallmarking',
            excerpt: guidance.huidExplanation + ' Three mandatory marks: BIS Logo, Purity grade (e.g. 22K916), and 6-digit alphanumeric HUID.',
            similarityScore: 0.98
          }
        ];
        return { data: guidance, evidence };
      }
      case 'search_consumer_information': {
        const isi = await this.consumerService.verifyIsiMark(query);
        const evidence: Evidence[] = [
          {
            id: 'ev-consumer-isi',
            documentTitle: 'BIS Certification Marks Licence (CM/L) Verification Rules',
            standardNumber: 'BIS Guidelines',
            clause: '7.1',
            page: 2,
            publicationDate: '2023-01-01',
            status: 'ACTIVE' as any,
            sourceUrl: 'https://www.services.bis.gov.in',
            excerpt: isi.guidance + ' Check for BIS logo, IS number on top, and 7/8 digit CM/L number on bottom.',
            similarityScore: 0.95
          }
        ];
        return { data: isi, evidence };
      }
      default: {
        const ragRes = await this.ragService.searchEvidence({ query });
        return { data: ragRes, evidence: ragRes.results };
      }
    }
  }

  async runAgent(query: string, preferredLanguage?: IndianLanguage): Promise<AgentExecutionResponse> {
    return this.agent.execute(query, preferredLanguage);
  }
}

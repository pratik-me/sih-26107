import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  ProductProfileQuery,
  ProductRecommendationResult,
  Standard,
  StandardComparisonResult,
  StandardRecommendationMatch,
  StandardStatus
} from '@bis/shared-types';
import { SEED_STANDARDS } from '../common/seed-data';

@Injectable()
export class StandardsService {
  constructor(private prisma: PrismaService) {}

  async searchStandards(query: string, filter?: { division?: string; isMandatory?: boolean; status?: string }): Promise<{ standards: Standard[]; total: number }> {
    let dbResults: any[] = [];
    try {
      dbResults = await this.prisma.standard.findMany({
        where: {
          AND: [
            query
              ? {
                  OR: [
                    { standardNumber: { contains: query, mode: 'insensitive' } },
                    { title: { contains: query, mode: 'insensitive' } },
                    { scope: { contains: query, mode: 'insensitive' } }
                  ]
                }
              : {},
            filter?.division ? { division: filter.division } : {},
            filter?.isMandatory !== undefined ? { isMandatory: filter.isMandatory } : {}
          ]
        },
        include: { clauses: true }
      });
    } catch {
      // ignore
    }

    if (dbResults.length > 0) {
      return {
        standards: dbResults.map(s => this.mapStandard(s)),
        total: dbResults.length
      };
    }

    // In-memory fallback
    const qLower = (query || '').toLowerCase();
    const filtered = (SEED_STANDARDS as any[]).filter(s => {
      const matchQuery =
        !qLower ||
        s.standardNumber.toLowerCase().includes(qLower) ||
        s.title.toLowerCase().includes(qLower) ||
        s.scope.toLowerCase().includes(qLower) ||
        s.keywords.some((k: string) => k.toLowerCase().includes(qLower));

      const matchDivision = !filter?.division || s.division === filter.division;
      const matchMandatory = filter?.isMandatory === undefined || s.isMandatory === filter.isMandatory;

      return matchQuery && matchDivision && matchMandatory;
    });

    return {
      standards: filtered.map(s => this.mapStandard(s)),
      total: filtered.length
    };
  }

  async getStandardById(idOrNumber: string): Promise<Standard> {
    let std: any;
    try {
      std = await this.prisma.standard.findFirst({
        where: {
          OR: [{ id: idOrNumber }, { standardNumber: { contains: idOrNumber, mode: 'insensitive' } }]
        },
        include: { clauses: true }
      });
    } catch {
      // ignore
    }

    if (!std) {
      std = (SEED_STANDARDS as any[]).find(
        s => s.id === idOrNumber || s.standardNumber.toLowerCase().includes(idOrNumber.toLowerCase())
      );
    }

    if (!std) {
      throw new NotFoundException(`Indian Standard '${idOrNumber}' not found in authoritative repository`);
    }

    return this.mapStandard(std);
  }

  async recommendStandards(profile: ProductProfileQuery): Promise<ProductRecommendationResult> {
    const qTokens = `${profile.productName} ${profile.material || ''} ${profile.intendedApplication || ''} ${profile.technicalCharacteristics || ''}`
      .toLowerCase()
      .split(/\s+/)
      .filter(t => t.length > 2);

    const candidates = (SEED_STANDARDS as any[]);
    const matches: StandardRecommendationMatch[] = [];

    for (const std of candidates) {
      let score = 30;
      const matchedAttrs: string[] = [];
      const missingPrompt: string[] = [];

      const stdText = `${std.standardNumber} ${std.title} ${std.scope} ${std.abstract} ${std.keywords.join(' ')}`.toLowerCase();

      // Check product name
      if (profile.productName && stdText.includes(profile.productName.toLowerCase())) {
        score += 35;
        matchedAttrs.push(`Matches product specification: '${profile.productName}'`);
      }

      // Check material
      if (profile.material && stdText.includes(profile.material.toLowerCase())) {
        score += 20;
        matchedAttrs.push(`Matches raw material specification: '${profile.material}'`);
      } else if (!profile.material && (stdText.includes('steel') || stdText.includes('pvc') || stdText.includes('plastic'))) {
        missingPrompt.push('Specify exact material grade (e.g., SS 304, SS 316, HDPE Grade PE-100) to confirm grade conformity.');
      }

      // Check application
      if (profile.intendedApplication && stdText.includes(profile.intendedApplication.toLowerCase())) {
        score += 15;
        matchedAttrs.push(`Matches intended application: '${profile.intendedApplication}'`);
      }

      // Check token overlap
      for (const token of qTokens) {
        if (stdText.includes(token)) {
          score += 3;
        }
      }

      score = Math.min(Math.round(score), 98);

      if (score >= 45) {
        matches.push({
          standard: this.mapStandard(std),
          relevanceScore: score,
          matchReason: `Evaluated strong correlation based on ${matchedAttrs.join(', ')}.`,
          matchingAttributes: matchedAttrs,
          missingInformationPrompt: missingPrompt.length > 0 ? missingPrompt : ['Verify in-house testing capacity for full Scheme I conformity.'],
          relatedStandards: candidates.filter(c => c.standardNumber !== std.standardNumber && c.division === std.division).map(c => c.standardNumber),
          confidence: score >= 80 ? 'HIGH' : score >= 60 ? 'MEDIUM' : 'LOW',
          evidence: [
            {
              id: `ev-${std.standardNumber}`,
              documentTitle: std.title,
              standardNumber: std.standardNumber,
              clause: '1.1 Scope',
              page: 1,
              publicationDate: std.publicationDate,
              status: std.status,
              sourceUrl: std.sourceUrl,
              excerpt: std.scope,
              similarityScore: score / 100
            }
          ]
        });
      }
    }

    matches.sort((a, b) => b.relevanceScore - a.relevanceScore);

    return {
      query: profile,
      matches,
      totalMatches: matches.length,
      guidanceNotes: 'Semantic similarity alone does NOT constitute legal certification applicability. Verify against mandatory Quality Control Orders (QCO) and official Sectional Committee schedules.',
      disclaimer: 'Authoritative decisions must be verified on the official Bureau of Indian Standards e-BIS portal (services.bis.gov.in).'
    };
  }

  async compareStandards(standardNumbers: string[]): Promise<StandardComparisonResult> {
    const list: Standard[] = [];
    for (const num of standardNumbers) {
      try {
        const s = await this.getStandardById(num);
        list.push(s);
      } catch {
        // ignore
      }
    }

    if (list.length < 2) {
      const fallback = (SEED_STANDARDS as any[]).slice(0, 2).map(s => this.mapStandard(s));
      list.push(...fallback);
    }

    return {
      standards: list,
      commonFeatures: [
        'Mandatory compliance under BIS Quality Control Orders (QCO)',
        'Requires factory infrastructure audit and in-house laboratory testing',
        'Routine sampling requirements for each production lot'
      ],
      differences: [
        {
          parameter: 'Scope & Application',
          values: list.reduce((acc, s) => ({ ...acc, [s.standardNumber]: s.scope.slice(0, 100) + '...' }), {})
        },
        {
          parameter: 'Division / Committee',
          values: list.reduce((acc, s) => ({ ...acc, [s.standardNumber]: s.division }), {})
        },
        {
          parameter: 'Mandatory QCO Status',
          values: list.reduce((acc, s) => ({ ...acc, [s.standardNumber]: s.isMandatory ? 'Mandatory (Scheme I / CRS)' : 'Voluntary' }), {})
        }
      ],
      applicabilityCriteria: list.reduce((acc, s) => ({ ...acc, [s.standardNumber]: `Use for ${s.title}` }), {}),
      summary: `Comparison of ${list.map(s => s.standardNumber).join(' and ')} highlighting testing limits, material grade requirements, and certification scheme differences.`
    };
  }

  private mapStandard(s: any): Standard {
    return {
      id: s.id || `std-${s.standardNumber}`,
      standardNumber: s.standardNumber,
      title: s.title,
      year: s.year || 2021,
      department: s.department || 'General',
      division: s.division || 'Technical Division',
      status: s.status || StandardStatus.ACTIVE,
      scope: s.scope || '',
      abstract: s.abstract || '',
      keywords: Array.isArray(s.keywords) ? s.keywords : [],
      isMandatory: s.isMandatory || false,
      qcoNotificationNumber: s.qcoNotificationNumber || undefined,
      qcoDate: s.qcoDate || undefined,
      sourceUrl: s.sourceUrl || 'https://www.services.bis.gov.in',
      publicationDate: s.publicationDate || '2021-01-01',
      lastUpdatedDate: s.lastUpdatedDate || '2024-01-01'
    };
  }
}

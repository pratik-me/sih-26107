import { Evidence, QueryIntent, StandardStatus } from '@bis/shared-types';

export interface IRerankerProvider {
  name: string;
  rerank(query: string, intent: QueryIntent, candidates: Evidence[]): Promise<Evidence[]>;
}

export class HybridBISCrossReranker implements IRerankerProvider {
  name = 'hybrid-bis-cross-reranker';

  async rerank(query: string, intent: QueryIntent, candidates: Evidence[]): Promise<Evidence[]> {
    if (!candidates || candidates.length === 0) return [];

    const queryLower = query.toLowerCase();
    const standardMatches = query.match(/is\s*(\d{2,6})(?::\d{4})?/gi) || [];
    const normalizedStandardMatches = standardMatches.map(s => s.replace(/\s+/g, ' ').toUpperCase());

    const clauseMatches = query.match(/clause\s*([0-9.]+)/i);
    const targetClause = clauseMatches ? clauseMatches[1] : null;

    const scored = candidates.map(candidate => {
      let score = candidate.similarityScore * 100; // base score 0-100

      // 1. Exact Standard Match Boost (+40 points)
      const candStdUpper = candidate.standardNumber.toUpperCase();
      const hasExactStd = normalizedStandardMatches.some(std => candStdUpper.includes(std));
      if (hasExactStd) {
        score += 40;
      }

      // 2. Exact Clause Match Boost (+25 points)
      if (targetClause && candidate.clause && candidate.clause.includes(targetClause)) {
        score += 25;
      }

      // 3. Product / Keyword Overlap (+15 points)
      const excerptLower = candidate.excerpt.toLowerCase();
      const titleLower = candidate.documentTitle.toLowerCase();
      const queryTokens = queryLower.split(/\s+/).filter(t => t.length > 2);
      let matchCount = 0;
      for (const token of queryTokens) {
        if (excerptLower.includes(token) || titleLower.includes(token)) {
          matchCount++;
        }
      }
      score += Math.min(matchCount * 4, 20);

      // 4. Intent Specific Boost
      if (intent === QueryIntent.TESTING_REQUIREMENTS && (excerptLower.includes('test') || excerptLower.includes('sampling'))) {
        score += 15;
      }
      if (intent === QueryIntent.CERTIFICATION_GUIDANCE && (excerptLower.includes('scheme') || excerptLower.includes('licence') || excerptLower.includes('isi'))) {
        score += 15;
      }
      if (intent === QueryIntent.HALLMARKING_VERIFICATION && (candStdUpper.includes('1417') || candStdUpper.includes('2112') || excerptLower.includes('huid'))) {
        score += 30;
      }

      // 5. Freshness / Status Adjustments
      if (candidate.status === StandardStatus.OUTDATED) {
        score -= 20;
      } else if (candidate.status === StandardStatus.ACTIVE) {
        score += 5;
      }

      return {
        ...candidate,
        rerankScore: Math.round(score * 10) / 10
      };
    });

    // Sort descending by rerankScore
    scored.sort((a, b) => (b.rerankScore || 0) - (a.rerankScore || 0));
    return scored;
  }
}

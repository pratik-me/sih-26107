"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HybridBISCrossReranker = void 0;
const shared_types_1 = require("@bis/shared-types");
class HybridBISCrossReranker {
    name = 'hybrid-bis-cross-reranker';
    async rerank(query, intent, candidates) {
        if (!candidates || candidates.length === 0)
            return [];
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
            if (intent === shared_types_1.QueryIntent.TESTING_REQUIREMENTS && (excerptLower.includes('test') || excerptLower.includes('sampling'))) {
                score += 15;
            }
            if (intent === shared_types_1.QueryIntent.CERTIFICATION_GUIDANCE && (excerptLower.includes('scheme') || excerptLower.includes('licence') || excerptLower.includes('isi'))) {
                score += 15;
            }
            if (intent === shared_types_1.QueryIntent.HALLMARKING_VERIFICATION && (candStdUpper.includes('1417') || candStdUpper.includes('2112') || excerptLower.includes('huid'))) {
                score += 30;
            }
            // 5. Freshness / Status Adjustments
            if (candidate.status === shared_types_1.StandardStatus.OUTDATED) {
                score -= 20;
            }
            else if (candidate.status === shared_types_1.StandardStatus.ACTIVE) {
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
exports.HybridBISCrossReranker = HybridBISCrossReranker;
//# sourceMappingURL=reranker.provider.js.map
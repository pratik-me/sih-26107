import { QueryIntent } from './enums';
export interface RAGEvaluationBenchmarkItem {
    id: string;
    question: string;
    language: string;
    intent: QueryIntent;
    expectedStandardNumber: string;
    expectedClause?: string;
    expectedSourceSnippet: string;
    groundTruthAnswerSummary: string;
    category: string;
}
export interface RAGEvaluationResultMetrics {
    totalEvaluated: number;
    recallAt1: number;
    recallAt3: number;
    recallAt5: number;
    precisionAt1: number;
    precisionAt3: number;
    mrr: number;
    top1RecommendationAccuracy: number;
    top3RecommendationAccuracy: number;
    faithfulnessScore: number;
    contextRelevanceScore: number;
    answerRelevanceScore: number;
    citationCorrectnessRate: number;
    averageRetrievalLatencyMs: number;
    averageTotalLatencyMs: number;
    timestamp: string;
}
export interface QueryAnalyticsData {
    totalQueries: number;
    queriesByIntent: Record<string, number>;
    topSearchedStandards: Array<{
        standardNumber: string;
        count: number;
    }>;
    languageDistribution: Record<string, number>;
    averageRetrievalLatencyMs: number;
    averageResponseLatencyMs: number;
    lowConfidenceRate: number;
    citationAccuracyRate: number;
    userSatisfactionRate: number;
    userFeedbackStats: {
        helpful: number;
        notHelpful: number;
        reported: number;
    };
}
//# sourceMappingURL=evaluation.d.ts.map
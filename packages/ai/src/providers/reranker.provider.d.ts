import { Evidence, QueryIntent } from '@bis/shared-types';
export interface IRerankerProvider {
    name: string;
    rerank(query: string, intent: QueryIntent, candidates: Evidence[]): Promise<Evidence[]>;
}
export declare class HybridBISCrossReranker implements IRerankerProvider {
    name: string;
    rerank(query: string, intent: QueryIntent, candidates: Evidence[]): Promise<Evidence[]>;
}
//# sourceMappingURL=reranker.provider.d.ts.map
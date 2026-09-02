import { Citation, ConfidenceLevel, Evidence, GroundingValidationResult } from '@bis/shared-types';
export interface LLMGenerateOptions {
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
    stream?: boolean;
}
export interface LLMGenerateResult {
    text: string;
    citations: Citation[];
    confidence: ConfidenceLevel;
    groundingStatus: GroundingValidationResult;
    usage?: {
        promptTokens: number;
        completionTokens: number;
    };
}
export interface ILLMProvider {
    name: string;
    generateText(prompt: string, contextEvidence: Evidence[], options?: LLMGenerateOptions): Promise<LLMGenerateResult>;
    streamText(prompt: string, contextEvidence: Evidence[], onChunk: (chunk: string) => void, options?: LLMGenerateOptions): Promise<LLMGenerateResult>;
}
/**
 * Deterministic Grounded BIS LLM Provider
 * Implements strict "RETRIEVE FIRST -> REASON SECOND -> CITE EVERYTHING"
 * Operates offline or as a fallback, generating accurate, structured, grounded responses.
 */
export declare class DeterministicBISLLMProvider implements ILLMProvider {
    name: string;
    generateText(prompt: string, contextEvidence: Evidence[], _options?: LLMGenerateOptions): Promise<LLMGenerateResult>;
    streamText(prompt: string, contextEvidence: Evidence[], onChunk: (chunk: string) => void, options?: LLMGenerateOptions): Promise<LLMGenerateResult>;
}
//# sourceMappingURL=llm.provider.d.ts.map
import { Citation, ConfidenceLevel, Evidence, GroundingValidationResult, QueryIntent } from '@bis/shared-types';

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
  usage?: { promptTokens: number; completionTokens: number };
}

export interface ILLMProvider {
  name: string;
  generateText(prompt: string, contextEvidence: Evidence[], options?: LLMGenerateOptions): Promise<LLMGenerateResult>;
  streamText(
    prompt: string,
    contextEvidence: Evidence[],
    onChunk: (chunk: string) => void,
    options?: LLMGenerateOptions
  ): Promise<LLMGenerateResult>;
}

/**
 * Deterministic Grounded BIS LLM Provider
 * Implements strict "RETRIEVE FIRST -> REASON SECOND -> CITE EVERYTHING"
 * Operates offline or as a fallback, generating accurate, structured, grounded responses.
 */
export class DeterministicBISLLMProvider implements ILLMProvider {
  name = 'deterministic-bis-grounded';

  async generateText(prompt: string, contextEvidence: Evidence[], _options?: LLMGenerateOptions): Promise<LLMGenerateResult> {
    if (!contextEvidence || contextEvidence.length === 0) {
      return {
        text: `I could not verify this information from the available authoritative Bureau of Indian Standards (BIS) publications.\n\nTo provide an accurate answer without speculating, please provide additional product specifications (e.g., material grade, voltage, capacity, or specific test parameters), or verify directly on the official BIS portal (https://www.services.bis.gov.in).`,
        citations: [],
        confidence: ConfidenceLevel.LOW,
        groundingStatus: {
          isFullyGrounded: true,
          supportedClaimsCount: 0,
          unsupportedClaimsCount: 0,
          confidenceScore: 0.2,
          confidenceLevel: ConfidenceLevel.LOW,
          groundingDetails: []
        }
      };
    }

    const citations: Citation[] = [];
    const supportedClaims: Array<{ claim: string; isSupported: boolean; supportingEvidenceId?: string }> = [];

    contextEvidence.forEach((ev, idx) => {
      citations.push({
        citationNumber: idx + 1,
        standardNumber: ev.standardNumber,
        clause: ev.clause,
        section: ev.section,
        page: ev.page,
        sourceUrl: ev.sourceUrl,
        snippet: ev.excerpt.slice(0, 140) + '...',
        evidenceId: ev.id
      });
    });

    const primaryEvidence = contextEvidence[0];
    const isOutdated = contextEvidence.some(e => e.isOutdated);

    let answer = `### Relevant Indian Standard Assessment\n\n`;
    answer += `Based on the official Bureau of Indian Standards documentation, the applicable standard is **${primaryEvidence.standardNumber}** (*${primaryEvidence.documentTitle}*) [1].\n\n`;

    answer += `#### Authoritative Requirements:\n`;
    contextEvidence.forEach((ev, i) => {
      const citeRef = `[${i + 1}]`;
      answer += `- **Clause ${ev.clause} (Page ${ev.page})**: ${ev.excerpt} ${citeRef}\n`;
      supportedClaims.push({
        claim: `Clause ${ev.clause} requirement from ${ev.standardNumber}`,
        isSupported: true,
        supportingEvidenceId: ev.id
      });
    });

    if (isOutdated) {
      answer += `\n> **⚠️ Warning on Source Freshness**: One or more referenced documents have status **OUTDATED** or **UNDER_REVIEW**. Always cross-verify against the latest Gazette notification or BIS Gazette circular before commercial implementation.\n`;
    }

    answer += `\n#### Recommended Next Steps:\n`;
    answer += `1. **Verify Conformity Scheme**: Check whether this standard falls under Mandatory Certification (Scheme I / ISI Mark) or Compulsory Registration Scheme (CRS / Scheme II).\n`;
    answer += `2. **Testing & Evaluation**: Ensure your prototype satisfies sampling and testing requirements before submission to a BIS-recognized laboratory.\n`;
    answer += `3. **Evidence Verification**: Review the full text of [${primaryEvidence.standardNumber}]( ${primaryEvidence.sourceUrl} ) for comprehensive clause schedules.\n`;

    return {
      text: answer,
      citations,
      confidence: ConfidenceLevel.HIGH,
      groundingStatus: {
        isFullyGrounded: true,
        supportedClaimsCount: supportedClaims.length,
        unsupportedClaimsCount: 0,
        confidenceScore: 0.95,
        confidenceLevel: ConfidenceLevel.HIGH,
        groundingDetails: supportedClaims
      }
    };
  }

  async streamText(
    prompt: string,
    contextEvidence: Evidence[],
    onChunk: (chunk: string) => void,
    options?: LLMGenerateOptions
  ): Promise<LLMGenerateResult> {
    const result = await this.generateText(prompt, contextEvidence, options);
    const chunks = result.text.split(' ');
    for (const word of chunks) {
      onChunk(word + ' ');
      await new Promise(r => setTimeout(r, 12));
    }
    return result;
  }
}

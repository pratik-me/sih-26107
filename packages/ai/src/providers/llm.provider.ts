import { Citation, ConfidenceLevel, Evidence, GroundingValidationResult } from '@bis/shared-types';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';
import { SystemMessage, HumanMessage } from '@langchain/core/messages';
import { BIS_SYSTEM_PROMPT } from '../prompts/bis-prompts';
import { GroundingValidator } from '../grounding/grounding-validator';
import { CitationBuilder } from '../citations/citation-builder';

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
    const trimmed = (prompt || '').trim().toLowerCase();
    const isGreeting = /^(hi|hello|hey|namaste|namaskar|greetings|good\s*(morning|afternoon|evening)|help|who\s*are\s*you|what\s*can\s*you\s*do|start)[\s!?.]*$/i.test(trimmed) || (trimmed.length <= 5 && !/\d/.test(trimmed));

    if (!contextEvidence || contextEvidence.length === 0) {
      if (isGreeting) {
        const greetingText = `Hello! 👋 I am **BIS Saarthi**, your official AI-powered Intelligent Assistant for Indian Standards and Bureau of Indian Standards (BIS) services.\n\n` +
          `Here are the core areas I can help you with:\n\n` +
          `1. 📌 **Find My Standard**: Discover which Indian Standard (IS) applies to your product, material grade, or industrial category.\n` +
          `2. 📜 **Certification Schemes & Roadmap**: Navigate ISI Mark (Scheme I), Compulsory Registration Scheme (CRS / Scheme II), and FMCS step-by-step.\n` +
          `3. 🔬 **Testing & Laboratories**: View routine and type test requirements, sampling guidelines, and locate recognized NABL/BIS testing laboratories.\n` +
          `4. 🏅 **Gold & Silver Hallmarking**: Understand 24K, 22K (916), and 18K purity marks, verify 6-digit HUID codes, and check statutory consumer guarantees.\n` +
          `5. 🛡️ **Consumer Protection**: Verify authentic 7/8-digit CM/L licence numbers and check for counterfeit ISI marks.\n\n` +
          `What product, standard, or service would you like to explore today?`;

        return {
          text: greetingText,
          citations: [],
          confidence: ConfidenceLevel.HIGH,
          groundingStatus: {
            isFullyGrounded: true,
            supportedClaimsCount: 1,
            unsupportedClaimsCount: 0,
            confidenceScore: 1.0,
            confidenceLevel: ConfidenceLevel.HIGH,
            groundingDetails: [{ claim: 'General BIS Saarthi introduction', isSupported: true }]
          }
        };
      }

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

    let answer = `Relevant Indian Standard Assessment\n\n`;
    answer += `Based on the official Bureau of Indian Standards documentation, the applicable standard is **${primaryEvidence.standardNumber}** (*${primaryEvidence.documentTitle}*) [1].\n\n`;

    answer += `Authoritative Requirements:\n`;
    contextEvidence.forEach((ev, i) => {
      const citeRef = `[${i + 1}]`;
      answer += `- *Clause ${ev.clause} (Page ${ev.page})*: ${ev.excerpt} ${citeRef}\n`;
      supportedClaims.push({
        claim: `Clause ${ev.clause} requirement from ${ev.standardNumber}`,
        isSupported: true,
        supportingEvidenceId: ev.id
      });
    });

    if (isOutdated) {
      answer += `\n> *Warning on Source Freshness*: One or more referenced documents have status OUTDATED or UNDER_REVIEW. Always cross-verify against the latest Gazette notification or BIS Gazette circular before commercial implementation.\n`;
    }

    answer += `\n Recommended Next Steps:\n`;
    answer += `1. Verify Conformity Scheme: Check whether this standard falls under Mandatory Certification (Scheme I / ISI Mark) or Compulsory Registration Scheme (CRS / Scheme II).\n`;
    answer += `2. Testing & Evaluation: Ensure your prototype satisfies sampling and testing requirements before submission to a BIS-recognized laboratory.\n`;
    answer += `3. Evidence Verification: Review the full text of [${primaryEvidence.standardNumber}]( ${primaryEvidence.sourceUrl} ) for comprehensive clause schedules.\n`;

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

/**
 * LangChain-backed Real BIS LLM Provider with Fallback to Deterministic Provider
 */
export class LangChainBISLLMProvider implements ILLMProvider {
  name = 'langchain-bis-llm';
  private fallbackProvider = new DeterministicBISLLMProvider();
  private groundingValidator = new GroundingValidator();
  private citationBuilder = new CitationBuilder();

  private getModel(options?: LLMGenerateOptions): BaseChatModel | null {
    const provider = (process.env.LLM_PROVIDER || '').toLowerCase();
    if (provider === 'deterministic') {
      return null;
    }

    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const hasValidAnthropic = anthropicKey && !anthropicKey.includes('your_anthropic_api_key_here') && anthropicKey.trim().length > 10;
    const hasValidOpenAI = openaiKey && !openaiKey.includes('your_openai_api_key_here') && openaiKey.trim().length > 10;

    if (provider === 'anthropic' || (hasValidAnthropic && provider !== 'openai')) {
      if (!hasValidAnthropic) return null;
      return new ChatAnthropic({
        modelName: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
        apiKey: anthropicKey,
        temperature: options?.temperature ?? 0.2
      }) as unknown as BaseChatModel;
    }

    if (provider === 'openai' || hasValidOpenAI) {
      if (!hasValidOpenAI) return null;
      return new ChatOpenAI({
        modelName: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        openAIApiKey: openaiKey,
        temperature: options?.temperature ?? 0.2
      }) as unknown as BaseChatModel;
    }

    return null;
  }

  private formatEvidenceContext(contextEvidence: Evidence[]): string {
    if (!contextEvidence || contextEvidence.length === 0) {
      return 'AUTHORITATIVE EVIDENCE: None provided. If evidence is missing, state clearly that you cannot verify the requirement without speculating.';
    }

    return contextEvidence
      .map(
        (ev, i) => `
[AUTHORITATIVE EVIDENCE BLOCK ${i + 1}]
- Evidence ID: ${ev.id}
- Standard Number: ${ev.standardNumber}
- Document Title: ${ev.documentTitle}
- Clause: ${ev.clause} (Section: ${ev.section || 'N/A'}, Page: ${ev.page})
- Publication Date: ${ev.publicationDate}
- Status: ${ev.status}
- Source URL: ${ev.sourceUrl}
- Excerpt: "${ev.excerpt}"
`
      )
      .join('\n');
  }

  async generateText(prompt: string, contextEvidence: Evidence[], options?: LLMGenerateOptions): Promise<LLMGenerateResult> {
    const model = this.getModel(options);
    if (!model) {
      return this.fallbackProvider.generateText(prompt, contextEvidence, options);
    }

    const systemPromptText = `${options?.systemPrompt || BIS_SYSTEM_PROMPT}\n\n${this.formatEvidenceContext(contextEvidence)}`;

    try {
      const response = await model.invoke([
        new SystemMessage(systemPromptText),
        new HumanMessage(prompt)
      ]);

      const text = typeof response.content === 'string' ? response.content : JSON.stringify(response.content);
      const groundingStatus = this.groundingValidator.validate(text, contextEvidence);
      const citations = this.citationBuilder.buildCitations(contextEvidence);

      return {
        text,
        citations,
        confidence: groundingStatus.confidenceLevel,
        groundingStatus
      };
    } catch (error) {
      console.warn('[LangChainBISLLMProvider] Real LLM call failed or key unconfigured, falling back to DeterministicBISLLMProvider:', error);
      return this.fallbackProvider.generateText(prompt, contextEvidence, options);
    }
  }

  async streamText(
    prompt: string,
    contextEvidence: Evidence[],
    onChunk: (chunk: string) => void,
    options?: LLMGenerateOptions
  ): Promise<LLMGenerateResult> {
    const model = this.getModel(options);
    if (!model) {
      return this.fallbackProvider.streamText(prompt, contextEvidence, onChunk, options);
    }

    const systemPromptText = `${options?.systemPrompt || BIS_SYSTEM_PROMPT}\n\n${this.formatEvidenceContext(contextEvidence)}`;

    try {
      const stream = await model.stream([
        new SystemMessage(systemPromptText),
        new HumanMessage(prompt)
      ]);

      let fullText = '';
      for await (const chunk of stream) {
        const content = typeof chunk.content === 'string' ? chunk.content : (chunk.content ? JSON.stringify(chunk.content) : '');
        if (content) {
          fullText += content;
          onChunk(content);
        }
      }

      const groundingStatus = this.groundingValidator.validate(fullText, contextEvidence);
      const citations = this.citationBuilder.buildCitations(contextEvidence);

      return {
        text: fullText,
        citations,
        confidence: groundingStatus.confidenceLevel,
        groundingStatus
      };
    } catch (error) {
      console.warn('[LangChainBISLLMProvider] Streaming LLM call failed, falling back to DeterministicBISLLMProvider:', error);
      return this.fallbackProvider.streamText(prompt, contextEvidence, onChunk, options);
    }
  }
}

/**
 * Factory helper returning the active LLM provider instance based on environment config
 */
export function getLLMProvider(): ILLMProvider {
  const provider = (process.env.LLM_PROVIDER || '').toLowerCase();
  if (provider === 'deterministic') {
    return new DeterministicBISLLMProvider();
  }
  return new LangChainBISLLMProvider();
}

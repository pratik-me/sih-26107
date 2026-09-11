import { IndianLanguage } from '@bis/shared-types';
import { ChatAnthropic } from '@langchain/anthropic';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export interface ITranslationProvider {
  detectLanguage(text: string): Promise<IndianLanguage>;
  translateToEnglish(text: string, sourceLang: IndianLanguage): Promise<{ translatedText: string; preservedEntities: string[] }>;
  translateFromEnglish(text: string, targetLang: IndianLanguage, preservedEntities?: string[]): Promise<string>;
}

/**
 * Indic Language Engine supporting all 22 Eighth-Schedule Indian Languages + English + Hinglish.
 * 
 * SCRIPT RESOLUTION & CAPABILITIES NOTE:
 * - Script-Distinct Languages (Tamil, Telugu, Gujarati, Kannada, Malayalam, Odia, Punjabi, Urdu, Bengali, Manipuri, Santali)
 *   have first-class individual script regex detection.
 * - Devanagari Group Languages (Hindi, Marathi, Sanskrit, Nepali, Konkani, Dogri, Maithili, Bodo) map onto Devanagari
 *   script range (\\u0900-\\u097F) and leverage LLM-backed neural translation for dialect-specific nuance.
 * - Technical Identifiers (IS Standard Numbers, Clauses, HUID codes, CM/L numbers) are preserved across all translations.
 */
export class IndicLanguageEngine implements ITranslationProvider {
  // Script pattern definitions across Eighth-Schedule Indian Languages
  private scriptPatterns: Record<IndianLanguage, RegExp> = {
    [IndianLanguage.HI]: /[\u0900-\u097F]/, // Devanagari (Hindi)
    [IndianLanguage.BN]: /[\u0980-\u09FF]/, // Bengali / Assamese
    [IndianLanguage.AS]: /[\u0980-\u09FF]/,
    [IndianLanguage.TE]: /[\u0C00-\u0C7F]/, // Telugu
    [IndianLanguage.TA]: /[\u0B80-\u0BFF]/, // Tamil
    [IndianLanguage.MR]: /[\u0900-\u097F]/, // Marathi
    [IndianLanguage.UR]: /[\u0600-\u06FF]/, // Urdu / Arabic script
    [IndianLanguage.GU]: /[\u0A80-\u0AFF]/, // Gujarati
    [IndianLanguage.KN]: /[\u0C80-\u0CFF]/, // Kannada
    [IndianLanguage.ML]: /[\u0D00-\u0D7F]/, // Malayalam
    [IndianLanguage.OR]: /[\u0B00-\u0B7F]/, // Odia
    [IndianLanguage.PA]: /[\u0A00-\u0A7F]/, // Punjabi (Gurmukhi)
    [IndianLanguage.MAI]: /[\u0900-\u097F]/, // Maithili
    [IndianLanguage.SAN]: /[\u0900-\u097F]/, // Sanskrit
    [IndianLanguage.KAS]: /[\u0600-\u06FF]/, // Kashmiri
    [IndianLanguage.NEP]: /[\u0900-\u097F]/, // Nepali
    [IndianLanguage.KOK]: /[\u0900-\u097F]/, // Konkani
    [IndianLanguage.DOG]: /[\u0900-\u097F]/, // Dogri
    [IndianLanguage.MNI]: /[\uABC0-\uABFF]/, // Meitei Mayek
    [IndianLanguage.BOD]: /[\u0900-\u097F]/, // Bodo
    [IndianLanguage.SAT]: /[\u1C50-\u1C7F]/, // Ol Chiki (Santali)
    [IndianLanguage.SD]: /[\u0600-\u06FF]/,  // Sindhi
    [IndianLanguage.EN]: /^[a-zA-Z0-9\s.,!?:;'"()\-_/@#$%^&*+=]+$/,
    [IndianLanguage.HINGLISH]: /(karein|kaise|chahiye|batao|kya|hai|hoga|kare|samjhao|pramaanit)/i
  };

  private getModel() {
    const provider = (process.env.LLM_PROVIDER || '').toLowerCase();
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;

    const hasValidOpenRouter = openrouterKey && !openrouterKey.includes('your_openrouter_api_key_here') && openrouterKey.trim().length > 10;
    const hasValidAnthropic = anthropicKey && !anthropicKey.includes('your_anthropic_api_key_here') && anthropicKey.trim().length > 10;
    const hasValidOpenAI = openaiKey && !openaiKey.includes('your_openai_api_key_here') && openaiKey.trim().length > 10;

    if (provider === 'openrouter' || (hasValidOpenRouter && provider !== 'anthropic' && provider !== 'openai')) {
      if (!hasValidOpenRouter) return null;
      const siteUrl = process.env.OPENROUTER_SITE_URL || 'http://localhost:3000';
      const siteName = process.env.OPENROUTER_SITE_NAME || 'BIS Saarthi';

      return new ChatOpenAI({
        modelName: process.env.OPENROUTER_TRANSLATION_MODEL || process.env.OPENROUTER_MODEL || 'nvidia/nemotron-3-super-120b-a12b:free',
        apiKey: openrouterKey,
        configuration: {
          baseURL: process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1',
          defaultHeaders: {
            'HTTP-Referer': siteUrl,
            'X-Title': siteName
          }
        },
        temperature: 0.1
      });
    }

    if (provider === 'anthropic' || (hasValidAnthropic && provider !== 'openai')) {
      if (!hasValidAnthropic) return null;
      return new ChatAnthropic({
        modelName: process.env.ANTHROPIC_MODEL || 'claude-3-haiku-20240307',
        apiKey: anthropicKey,
        temperature: 0.1
      });
    }

    if (provider === 'openai' || hasValidOpenAI) {
      if (!hasValidOpenAI) return null;
      return new ChatOpenAI({
        modelName: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        openAIApiKey: openaiKey,
        temperature: 0.1
      });
    }

    return null;
  }

  async detectLanguage(text: string): Promise<IndianLanguage> {
    if (!text || text.trim() === '') return IndianLanguage.EN;

    // Check Hinglish patterns first if text is in Latin script
    if (/^[a-zA-Z0-9\s.,!?:;'"()\-_]+$/.test(text)) {
      if (this.scriptPatterns[IndianLanguage.HINGLISH].test(text)) {
        return IndianLanguage.HINGLISH;
      }
      return IndianLanguage.EN;
    }

    // Check specific non-Devanagari scripts first
    const specificScripts: IndianLanguage[] = [
      IndianLanguage.TE,
      IndianLanguage.TA,
      IndianLanguage.GU,
      IndianLanguage.KN,
      IndianLanguage.ML,
      IndianLanguage.OR,
      IndianLanguage.PA,
      IndianLanguage.UR,
      IndianLanguage.BN,
      IndianLanguage.MNI,
      IndianLanguage.SAT
    ];

    for (const lang of specificScripts) {
      if (this.scriptPatterns[lang].test(text)) {
        return lang;
      }
    }

    if (this.scriptPatterns[IndianLanguage.HI].test(text)) {
      return IndianLanguage.HI;
    }

    return IndianLanguage.EN;
  }

  async translateToEnglish(text: string, sourceLang: IndianLanguage): Promise<{ translatedText: string; preservedEntities: string[] }> {
    // 1. Extract and preserve technical entities
    const isPattern = /IS\s*\d+(?::\d{4})?/gi;
    const clausePattern = /Clause\s*[0-9.]+/gi;
    const huidPattern = /[A-Z0-9]{6}/g;
    const cmlPattern = /CM\/L[- ]?\d{7,8}/gi;

    const preserved: string[] = [];
    const isMatches = text.match(isPattern) || [];
    const clauseMatches = text.match(clausePattern) || [];
    const cmlMatches = text.match(cmlPattern) || [];

    preserved.push(...isMatches, ...clauseMatches, ...cmlMatches);

    if (sourceLang === IndianLanguage.EN) {
      return { translatedText: text, preservedEntities: preserved };
    }

    const model = this.getModel();
    if (model) {
      try {
        const sysMsg = new SystemMessage(
          `You are an expert translator specializing in Indian languages to English technical query translation for the Bureau of Indian Standards (BIS).\n` +
          `Translate the user text from ${sourceLang} to clear, professional English search query text.\n` +
          `CRITICAL: DO NOT translate standard numbers (e.g. IS 10500), Clause numbers, HUID codes, or CM/L numbers. Keep them exact. Return ONLY the translated English text.`
        );
        const res = await model.invoke([sysMsg, new HumanMessage(text)]);
        const translated = typeof res.content === 'string' ? res.content.trim() : String(res.content);
        return { translatedText: translated, preservedEntities: preserved };
      } catch (err) {
        console.warn('[IndicLanguageEngine] Neural translation to English failed, falling back to rule mapping:', err);
      }
    }

    // Fallback rule mapping for domain queries
    let translated = text;
    if (sourceLang === IndianLanguage.HI || sourceLang === IndianLanguage.HINGLISH) {
      translated = translated
        .replace(/kaise verify karein|kaise check karein|kaise janch karein|जांच कैसे करें|सत्यापित कैसे करें/gi, 'how to verify')
        .replace(/mujhe apne product ke liye|mujhe chahiye|मुझे चाहिए|के लिए प्रमाणन/gi, 'requirements for certification of')
        .replace(/kaunsa standard lagega|kaunsa standard lagta hai|कौन सा मानक लागू होगा/gi, 'which Indian standard applies to')
        .replace(/kahan test karwayein|testing kahan hogi|परीक्षण कहाँ करवाएं/gi, 'where to get tested recognized laboratory')
        .replace(/gold hallmark|sone ka hallmark|सोने का हॉलमार्क/gi, 'gold hallmarking HUID verification purity');
    }

    return {
      translatedText: translated,
      preservedEntities: preserved
    };
  }

  async translateFromEnglish(text: string, targetLang: IndianLanguage, _preservedEntities?: string[]): Promise<string> {
    if (targetLang === IndianLanguage.EN || !text || text.trim() === '') {
      return text;
    }

    const model = this.getModel();
    if (model) {
      try {
        const sysMsg = new SystemMessage(
          `You are an expert translator for Bureau of Indian Standards (BIS) technical compliance documentation.\n` +
          `Translate the following English response into ${targetLang}.\n` +
          `CRITICAL SAFETY RULES:\n` +
          `1. DO NOT translate Indian Standard numbers (e.g. IS 10500:2012, IS 1417).\n` +
          `2. DO NOT translate clause numbers (e.g. Clause 4.1, Clause 6.2) or HUID numbers.\n` +
          `3. Preserve markdown table structures, bullet lists, and URLs exactly as formatted.\n` +
          `Return ONLY the translated document.`
        );
        const res = await model.invoke([sysMsg, new HumanMessage(text)]);
        return typeof res.content === 'string' ? res.content.trim() : String(res.content);
      } catch (err) {
        console.warn(`[IndicLanguageEngine] Translation from English to ${targetLang} failed:`, err);
      }
    }

    return text;
  }
}

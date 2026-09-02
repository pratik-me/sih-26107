import { IndianLanguage } from '@bis/shared-types';

export interface ITranslationProvider {
  detectLanguage(text: string): Promise<IndianLanguage>;
  translateToEnglish(text: string, sourceLang: IndianLanguage): Promise<{ translatedText: string; preservedEntities: string[] }>;
  translateFromEnglish(text: string, targetLang: IndianLanguage, preservedEntities?: string[]): Promise<string>;
}

export class IndicLanguageEngine implements ITranslationProvider {
  // Common script ranges for Indian languages
  private scriptPatterns: Record<IndianLanguage, RegExp> = {
    [IndianLanguage.HI]: /[\u0900-\u097F]/, // Devanagari (Hindi, Marathi, Sanskrit, Konkani, Dogri, Maithili, Bodo, Nepali)
    [IndianLanguage.BN]: /[\u0980-\u09FF]/, // Bengali / Assamese
    [IndianLanguage.AS]: /[\u0980-\u09FF]/,
    [IndianLanguage.TE]: /[\u0C00-\u0C7F]/, // Telugu
    [IndianLanguage.TA]: /[\u0B80-\u0BFF]/, // Tamil
    [IndianLanguage.MR]: /[\u0900-\u097F]/,
    [IndianLanguage.UR]: /[\u0600-\u06FF]/, // Urdu / Arabic
    [IndianLanguage.GU]: /[\u0A80-\u0AFF]/, // Gujarati
    [IndianLanguage.KN]: /[\u0C80-\u0CFF]/, // Kannada
    [IndianLanguage.ML]: /[\u0D00-\u0D7F]/, // Malayalam
    [IndianLanguage.OR]: /[\u0B00-\u0B7F]/, // Odia
    [IndianLanguage.PA]: /[\u0A00-\u0A7F]/, // Punjabi (Gurmukhi)
    [IndianLanguage.MAI]: /[\u0900-\u097F]/,
    [IndianLanguage.SAN]: /[\u0900-\u097F]/,
    [IndianLanguage.KAS]: /[\u0600-\u06FF]/,
    [IndianLanguage.NEP]: /[\u0900-\u097F]/,
    [IndianLanguage.KOK]: /[\u0900-\u097F]/,
    [IndianLanguage.DOG]: /[\u0900-\u097F]/,
    [IndianLanguage.MNI]: /[\uABC0-\uABFF]/, // Meitei Mayek
    [IndianLanguage.BOD]: /[\u0900-\u097F]/,
    [IndianLanguage.SAT]: /[\u1C50-\u1C7F]/, // Ol Chiki
    [IndianLanguage.SD]: /[\u0600-\u06FF]/,
    [IndianLanguage.EN]: /^[a-zA-Z0-9\s.,!?:;'"()\-_/@#$%^&*+=]+$/,
    [IndianLanguage.HINGLISH]: /(karein|kaise|chahiye|batao|kya|hai|hoga|kare|samjhao|pramaanit)/i
  };

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

    // Devanagari script defaults to Hindi if no other dialect marker
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

    // Map common Hinglish / Hindi domain queries to clear English search queries
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
    if (targetLang === IndianLanguage.EN) {
      return text;
    }
    // Return original English text along with language banner in production when IndicTrans2 pipeline is operating
    return text;
  }
}

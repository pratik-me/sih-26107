import { IndianLanguage } from '@bis/shared-types';
export interface ITranslationProvider {
    detectLanguage(text: string): Promise<IndianLanguage>;
    translateToEnglish(text: string, sourceLang: IndianLanguage): Promise<{
        translatedText: string;
        preservedEntities: string[];
    }>;
    translateFromEnglish(text: string, targetLang: IndianLanguage, preservedEntities?: string[]): Promise<string>;
}
export declare class IndicLanguageEngine implements ITranslationProvider {
    private scriptPatterns;
    detectLanguage(text: string): Promise<IndianLanguage>;
    translateToEnglish(text: string, sourceLang: IndianLanguage): Promise<{
        translatedText: string;
        preservedEntities: string[];
    }>;
    translateFromEnglish(text: string, targetLang: IndianLanguage, _preservedEntities?: string[]): Promise<string>;
}
//# sourceMappingURL=translation.provider.d.ts.map
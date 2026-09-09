"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndicLanguageEngine = void 0;
const shared_types_1 = require("@bis/shared-types");
class IndicLanguageEngine {
    // Common script ranges for Indian languages
    scriptPatterns = {
        [shared_types_1.IndianLanguage.HI]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.BN]: /[\u0980-\u09FF]/,
        [shared_types_1.IndianLanguage.AS]: /[\u0980-\u09FF]/,
        [shared_types_1.IndianLanguage.TE]: /[\u0C00-\u0C7F]/,
        [shared_types_1.IndianLanguage.TA]: /[\u0B80-\u0BFF]/,
        [shared_types_1.IndianLanguage.MR]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.UR]: /[\u0600-\u06FF]/,
        [shared_types_1.IndianLanguage.GU]: /[\u0A80-\u0AFF]/,
        [shared_types_1.IndianLanguage.KN]: /[\u0C80-\u0CFF]/,
        [shared_types_1.IndianLanguage.ML]: /[\u0D00-\u0D7F]/,
        [shared_types_1.IndianLanguage.OR]: /[\u0B00-\u0B7F]/,
        [shared_types_1.IndianLanguage.PA]: /[\u0A00-\u0A7F]/,
        [shared_types_1.IndianLanguage.MAI]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.SAN]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.KAS]: /[\u0600-\u06FF]/,
        [shared_types_1.IndianLanguage.NEP]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.KOK]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.DOG]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.MNI]: /[\uABC0-\uABFF]/,
        [shared_types_1.IndianLanguage.BOD]: /[\u0900-\u097F]/,
        [shared_types_1.IndianLanguage.SAT]: /[\u1C50-\u1C7F]/,
        [shared_types_1.IndianLanguage.SD]: /[\u0600-\u06FF]/,
        [shared_types_1.IndianLanguage.EN]: /^[a-zA-Z0-9\s.,!?:;'"()\-_/@#$%^&*+=]+$/,
        [shared_types_1.IndianLanguage.HINGLISH]: /(karein|kaise|chahiye|batao|kya|hai|hoga|kare|samjhao)/i
    };
    async detectLanguage(text) {
        if (!text || text.trim() === '')
            return shared_types_1.IndianLanguage.EN;
        // Check Hinglish patterns first if text is in Latin script
        if (/^[a-zA-Z0-9\s.,!?:;'"()\-_]+$/.test(text)) {
            if (this.scriptPatterns[shared_types_1.IndianLanguage.HINGLISH].test(text)) {
                return shared_types_1.IndianLanguage.HINGLISH;
            }
            return shared_types_1.IndianLanguage.EN;
        }
        // Check specific non-Devanagari scripts first
        const specificScripts = [
            shared_types_1.IndianLanguage.TE,
            shared_types_1.IndianLanguage.TA,
            shared_types_1.IndianLanguage.GU,
            shared_types_1.IndianLanguage.KN,
            shared_types_1.IndianLanguage.ML,
            shared_types_1.IndianLanguage.OR,
            shared_types_1.IndianLanguage.PA,
            shared_types_1.IndianLanguage.UR,
            shared_types_1.IndianLanguage.BN,
            shared_types_1.IndianLanguage.MNI,
            shared_types_1.IndianLanguage.SAT
        ];
        for (const lang of specificScripts) {
            if (this.scriptPatterns[lang].test(text)) {
                return lang;
            }
        }
        if (this.scriptPatterns[shared_types_1.IndianLanguage.HI].test(text)) {
            return shared_types_1.IndianLanguage.HI;
        }
        return shared_types_1.IndianLanguage.EN;
    }
    async translateToEnglish(text, sourceLang) {
        const isPattern = /IS\s*\d+(?::\d{4})?/gi;
        const clausePattern = /Clause\s*[0-9.]+/gi;
        const huidPattern = /[A-Z0-9]{6}/g;
        const cmlPattern = /CM\/L[- ]?\d{7,8}/gi;
        const preserved = [];
        const isMatches = text.match(isPattern) || [];
        const clauseMatches = text.match(clausePattern) || [];
        const cmlMatches = text.match(cmlPattern) || [];
        preserved.push(...isMatches, ...clauseMatches, ...cmlMatches);
        if (sourceLang === shared_types_1.IndianLanguage.EN) {
            return { translatedText: text, preservedEntities: preserved };
        }
        let translated = text;
        if (sourceLang === shared_types_1.IndianLanguage.HI || sourceLang === shared_types_1.IndianLanguage.HINGLISH) {
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
    async translateFromEnglish(text, targetLang, _preservedEntities) {
        if (targetLang === shared_types_1.IndianLanguage.EN) {
            return text;
        }
        return text;
    }
}
exports.IndicLanguageEngine = IndicLanguageEngine;
//# sourceMappingURL=translation.provider.js.map
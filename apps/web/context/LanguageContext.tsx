"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { IndianLanguage } from "@bis/shared-types";
import { en, TranslationDictionary } from "../locales/en";
import { hi } from "../locales/hi";

const dictionaries: Partial<Record<IndianLanguage, TranslationDictionary>> = {
  [IndianLanguage.EN]: en,
  [IndianLanguage.HI]: hi,
  [IndianLanguage.HINGLISH]: hi,   // Hinglish -> Hindi
};

interface LanguageContextType {
  language: IndianLanguage;
  setLanguage: (lang: IndianLanguage) => void;
  dictionary: TranslationDictionary;
  t: (path: string, fallback?: string) => any;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: IndianLanguage.EN,
  setLanguage: () => { },
  dictionary: en,
  t: (path: string, fallback?: string) => fallback || path,
  isHindi: false,
});

const STORAGE_KEY = "bis_saarthi_preferred_lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<IndianLanguage>(IndianLanguage.EN);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as IndianLanguage;
      if (saved && (saved === IndianLanguage.EN || saved === IndianLanguage.HI || saved === IndianLanguage.HINGLISH)) {
        setLanguageState(saved);
      }
    } catch {
      // pass
    }
  }, []);

  const setLanguage = (newLang: IndianLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // pass
    }
  };

  const activeDictionary = dictionaries[language] || en;

  const t = (path: string, fallback?: string): any => {
    const keys = path.split(".");
    let current: any = activeDictionary;
    for (const key of keys) {
      if (current && typeof current === "object" && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary
        let fallbackVal: any = en;
        for (const fbKey of keys) {
          if (fallbackVal && typeof fallbackVal === "object" && fbKey in fallbackVal) {
            fallbackVal = fallbackVal[fbKey];
          } else {
            return fallback !== undefined ? fallback : path;
          }
        }
        return fallbackVal !== undefined ? fallbackVal : fallback !== undefined ? fallback : path;
      }
    }
    return current !== undefined ? current : fallback !== undefined ? fallback : path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dictionary: activeDictionary,
        t,
        isHindi: language === IndianLanguage.HI || language === IndianLanguage.HINGLISH,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useTranslation() {
  return useContext(LanguageContext);
}

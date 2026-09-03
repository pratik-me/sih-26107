import React from 'react';
import { IndianLanguage } from '@bis/shared-types';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface LanguageSelectorProps {
  selectedLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  className?: string;
}

export const INDIAN_LANGUAGES_LIST = [
  { code: IndianLanguage.EN, label: 'English' },
  { code: IndianLanguage.HI, label: 'हिन्दी (Hindi)' },
  { code: IndianLanguage.HINGLISH, label: 'Hinglish (Mix)' },
  { code: IndianLanguage.BN, label: 'বাংলা (Bengali)' },
  { code: IndianLanguage.TE, label: 'తెలుగు (Telugu)' },
  { code: IndianLanguage.MR, label: 'मराठी (Marathi)' },
  { code: IndianLanguage.TA, label: 'தமிழ் (Tamil)' },
  { code: IndianLanguage.UR, label: 'اردو (Urdu)' },
  { code: IndianLanguage.GU, label: 'ગુજરાતી (Gujarati)' },
  { code: IndianLanguage.KN, label: 'ಕನ್ನಡ (Kannada)' },
  { code: IndianLanguage.OR, label: 'ଓଡ଼ିଆ (Odia)' },
  { code: IndianLanguage.ML, label: 'മലയാളം (Malayalam)' },
  { code: IndianLanguage.PA, label: 'ਪੰਜਾਬੀ (Punjabi)' },
  { code: IndianLanguage.AS, label: 'অসমীয়া (Assamese)' },
  { code: IndianLanguage.MAI, label: 'मैथिली (Maithili)' },
  { code: IndianLanguage.SAN, label: 'संस्कृतम् (Sanskrit)' },
  { code: IndianLanguage.KAS, label: 'کٲشُر (Kashmiri)' },
  { code: IndianLanguage.NEP, label: 'नेपाली (Nepali)' },
  { code: IndianLanguage.KOK, label: 'कोंकणी (Konkani)' },
  { code: IndianLanguage.DOG, label: 'डोगरी (Dogri)' },
  { code: IndianLanguage.MNI, label: 'মৈতৈলোন্ (Manipuri)' },
  { code: IndianLanguage.BOD, label: 'बर’ (Bodo)' },
  { code: IndianLanguage.SAT, label: 'ᱥᱟᱱᱛᱟᱲᱤ (Santali)' },
  { code: IndianLanguage.SD, label: 'سنڌي (Sindhi)' }
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Globe className="w-4 h-4 text-slate-500" />
      <select
        value={selectedLanguage}
        onChange={e => onLanguageChange(e.target.value as IndianLanguage)}
        className="text-xs font-medium bg-transparent border-0 text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer py-1 pr-6"
        aria-label="Select preferred Indian language"
      >
        {INDIAN_LANGUAGES_LIST.map(lang => (
          <option key={lang.code} value={lang.code} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

import React from "react";
import { IndianLanguage } from "@bis/shared-types";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
interface LanguageSelectorProps {
  selectedLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  onDashboard?: boolean;
  className?: string;
}

export const INDIAN_LANGUAGES_LIST = [
  { code: IndianLanguage.EN, label: "English" },
  { code: IndianLanguage.HI, label: "हिन्दी (Hindi)" },
  { code: IndianLanguage.HINGLISH, label: "Hinglish (Mix)" },
  { code: IndianLanguage.BN, label: "বাংলা (Bengali)" },
  { code: IndianLanguage.TE, label: "తెలుగు (Telugu)" },
  { code: IndianLanguage.MR, label: "मराठी (Marathi)" },
  { code: IndianLanguage.TA, label: "தமிழ் (Tamil)" },
  { code: IndianLanguage.UR, label: "اردو (Urdu)" },
  { code: IndianLanguage.GU, label: "ગુજરાતી (Gujarati)" },
  { code: IndianLanguage.KN, label: "ಕನ್ನಡ (Kannada)" },
  { code: IndianLanguage.OR, label: "ଓଡ଼ିଆ (Odia)" },
  { code: IndianLanguage.ML, label: "മലയാളം (Malayalam)" },
  { code: IndianLanguage.PA, label: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: IndianLanguage.AS, label: "অসমীয়া (Assamese)" },
  { code: IndianLanguage.MAI, label: "मैथिली (Maithili)" },
  { code: IndianLanguage.SAN, label: "संस्कृतम् (Sanskrit)" },
  { code: IndianLanguage.KAS, label: "کٲشُر (Kashmiri)" },
  { code: IndianLanguage.NEP, label: "नेपाली (Nepali)" },
  { code: IndianLanguage.KOK, label: "कोंकणी (Konkani)" },
  { code: IndianLanguage.DOG, label: "डोगरी (Dogri)" },
  { code: IndianLanguage.MNI, label: "মৈতৈলোন্ (Manipuri)" },
  { code: IndianLanguage.BOD, label: "बर’ (Bodo)" },
  { code: IndianLanguage.SAT, label: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
  { code: IndianLanguage.SD, label: "سنڌي (Sindhi)" },
];

export const DASHBOARD_LANGUARGES_LIST = [
  { code: IndianLanguage.EN, label: "English" },
  { code: IndianLanguage.HI, label: "हिन्दी (Hindi)" },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  onDashboard,
  className = "",
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <Globe className="w-4 h-4 text-slate-500" />
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="h-8 text-xs font-medium border-0 bg-transparent shadow-none focus:ring-0 cursor-pointer">
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg"
        >
          {onDashboard
            ? DASHBOARD_LANGUARGES_LIST.map((lang) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  className="text-xs rounded-lg cursor-pointer my-0.5 focus:bg-slate-200 dark:focus:bg-slate-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus:outline-none"
                >
                  {lang.label}
                </SelectItem>
              ))
            : INDIAN_LANGUAGES_LIST.map((lang) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  className="text-xs rounded-lg cursor-pointer my-0.5 focus:bg-slate-200 dark:focus:bg-slate-800 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus:outline-none"
                >
                  {lang.label}
                </SelectItem>
              ))}
        </SelectContent>
      </Select>
    </div>
  );
};

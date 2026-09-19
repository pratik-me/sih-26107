import React from 'react';
import { PurityFineness } from '@bis/shared-types';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HallmarkingCardProps {
  purity: PurityFineness;
  className?: string;
}

export const HallmarkingCard: React.FC<HallmarkingCardProps> = ({ purity, className = '' }) => {
  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-[#10243A] border border-slate-200 dark:border-[#263B50] shadow-sm space-y-3 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-50 dark:bg-[#0B1A2B] text-amber-600 dark:text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
              {purity.karatDisplay} ({purity.finenessNumber} Fineness)
            </h3>
            <span className="text-xs text-slate-500 dark:text-[#7F91A5] font-mono">Standard: {purity.officialStandard}</span>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 dark:border dark:border-amber-800/50">
          {purity.metal}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-[#A8B6C7]">
        {purity.description}
      </p>

      <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0B1A2B] border border-slate-100 dark:border-[#263B50] space-y-1.5 text-xs">
        <h4 className="font-semibold text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-[#16A9D8]" /> Mandatory Hallmarks on Article:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          {purity.mandatoryMarkings.map((m, i) => (
            <div key={i} className="p-2 rounded bg-white dark:bg-[#153653] border border-slate-200 dark:border-[#263B50] text-center">
              <span className="text-[11px] font-bold text-indigo-600 dark:text-[#16A9D8] block">{m.name}</span>
              <span className="text-[10px] text-slate-500 dark:text-[#A8B6C7]">{m.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

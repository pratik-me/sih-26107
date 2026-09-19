import React from 'react';
import { StandardRecommendationMatch } from '@bis/shared-types';
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { SourceFreshnessBadge } from './SourceFreshnessBadge';

interface RecommendationCardProps {
  match: StandardRecommendationMatch;
  onSelect?: (match: StandardRecommendationMatch) => void;
  onViewTesting?: (standardNumber: string) => void;
  className?: string;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  match,
  onSelect,
  onViewTesting,
  className = ''
}) => {
  const { standard, relevanceScore, matchReason, matchingAttributes, missingInformationPrompt } = match;

  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-[#10243A] border border-slate-200 dark:border-[#263B50] shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-[#16A9D8] transition-all ${className}`}>
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-[#0B1A2B] dark:text-[#16A9D8] border border-indigo-200 dark:border-[#263B50]">
              {relevanceScore}% Match Score
            </span>
            <SourceFreshnessBadge status={standard.status} />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
            {standard.standardNumber} — {standard.title}
          </h3>
        </div>
      </div>

      {/* Match Reason */}
      <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-[#0B1A2B] border border-indigo-100 dark:border-[#263B50] text-xs text-slate-700 dark:text-[#A8B6C7]">
        <span className="font-semibold text-indigo-900 dark:text-[#F1F5F9]">Why this standard matches: </span>
        {matchReason}
      </div>

      {/* Matching Attributes & Missing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {matchingAttributes.length > 0 && (
          <div className="space-y-1.5 p-3 rounded-lg bg-slate-50 dark:bg-[#0B1A2B] border border-slate-100 dark:border-[#263B50]">
            <h4 className="font-semibold text-emerald-700 dark:text-[#22C55E] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#22C55E]" /> Matching Product Criteria:
            </h4>
            <ul className="space-y-1 text-slate-600 dark:text-[#A8B6C7]">
              {matchingAttributes.map((attr, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{attr}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {missingInformationPrompt.length > 0 && (
          <div className="space-y-1.5 p-3 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" /> Additional Details Needed:
            </h4>
            <ul className="space-y-1 text-slate-600 dark:text-[#A8B6C7]">
              {missingInformationPrompt.map((prompt, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-[#263B50]">
        <div className="flex items-center gap-2">
          {standard.isMandatory && (
            <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Mandatory Certification Required
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onViewTesting && (
            <button
              type="button"
              onClick={() => onViewTesting(standard.standardNumber)}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 dark:text-[#A8B6C7] bg-slate-100 dark:bg-[#0B1A2B] hover:bg-slate-200 dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9] dark:border dark:border-[#263B50] transition-colors"
            >
              Testing Clauses
            </button>
          )}
          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(match)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-indigo-600 dark:bg-[#1268B3] text-white hover:bg-indigo-700 dark:hover:bg-[#1583D1] shadow-sm transition-colors"
            >
              <span>View Compliance Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

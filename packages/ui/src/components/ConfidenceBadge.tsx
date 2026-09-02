import React from 'react';
import { ConfidenceLevel } from '@bis/shared-types';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  score?: number;
  className?: string;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({ level, score, className = '' }) => {
  if (level === ConfidenceLevel.HIGH) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60 ${className}`}
        title="High confidence: Fully supported by authoritative BIS Gazette and published standard clauses"
      >
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span>Authoritative Grounding</span>
        {score !== undefined && <span className="opacity-75 text-[10px]">({Math.round(score * 100)}%)</span>}
      </span>
    );
  }

  if (level === ConfidenceLevel.MEDIUM) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60 ${className}`}
        title="Medium confidence: Partially supported. Please verify specific product grades or parameters."
      >
        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>Qualified Evidence</span>
        {score !== undefined && <span className="opacity-75 text-[10px]">({Math.round(score * 100)}%)</span>}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60 ${className}`}
      title="Low confidence: Authoritative information could not be verified. Exercise caution."
    >
      <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
      <span>Unverified / Needs Data</span>
    </span>
  );
};

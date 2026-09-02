import React from 'react';
import { ComplianceRoadmapStep } from '@bis/shared-types';
import { CheckCircle2, Clock, CircleDot, FileCheck, ArrowRight, AlertTriangle } from 'lucide-react';

interface ComplianceStepProps {
  step: ComplianceRoadmapStep;
  isCurrent?: boolean;
  onSelect?: (step: ComplianceRoadmapStep) => void;
  className?: string;
}

export const ComplianceStep: React.FC<ComplianceStepProps> = ({
  step,
  isCurrent = false,
  onSelect,
  className = ''
}) => {
  const getStatusIcon = () => {
    switch (step.status) {
      case 'COMPLETED':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'IN_PROGRESS':
        return <CircleDot className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div
      onClick={() => onSelect && onSelect(step)}
      className={`relative p-5 rounded-xl border transition-all ${
        isCurrent
          ? 'bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-md ring-1 ring-indigo-500/20'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300'
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{getStatusIcon()}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Step {step.stepNumber}: {step.phaseName}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                Est. {step.estimatedTimeframe}
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {step.title}
            </h3>
          </div>
        </div>

        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {step.category}
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
        {step.description}
      </p>

      {/* Action items */}
      {step.actionItems && step.actionItems.length > 0 && (
        <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 text-xs">
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-indigo-600" /> Key Action Items:
          </h4>
          <ul className="space-y-1 text-slate-600 dark:text-slate-400">
            {step.actionItems.map((action, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-500 font-bold">•</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Required Documents */}
      {step.requiredDocuments && step.requiredDocuments.length > 0 && (
        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Required Docs:</span>
          {step.requiredDocuments.map((doc, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              {doc}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

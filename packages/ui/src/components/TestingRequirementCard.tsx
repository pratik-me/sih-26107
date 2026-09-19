import React from 'react';
import { TestingRequirement } from '@bis/shared-types';
import { FlaskConical, AlertCircle, CheckCircle2 } from 'lucide-react';

interface TestingRequirementCardProps {
  test: TestingRequirement;
  className?: string;
}

export const TestingRequirementCard: React.FC<TestingRequirementCardProps> = ({ test, className = '' }) => {
  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-[#10243A] border border-slate-200 dark:border-[#263B50] shadow-sm space-y-3.5 hover:border-indigo-300 dark:hover:border-[#16A9D8] transition-all ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-[#0B1A2B] text-indigo-600 dark:text-[#16A9D8] mt-0.5">
            <FlaskConical className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
              {test.testName}
            </h3>
            <span className="text-xs font-mono text-indigo-600 dark:text-[#16A9D8]">
              {test.standardNumber} — Clause {test.clauseNumber}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          {test.isMandatoryRoutineTest ? (
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-[#22C55E] dark:border-emerald-800">
              Mandatory Routine Test
            </span>
          ) : (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0B1A2B] text-slate-600 dark:text-[#A8B6C7] dark:border dark:border-[#263B50]">
              Type / Approval Test
            </span>
          )}
          {test.isDestructive && (
            <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">Destructive Testing</span>
          )}
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-[#A8B6C7] leading-relaxed">
        {test.description}
      </p>

      {/* Criteria & Sampling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0B1A2B] border border-slate-100 dark:border-[#263B50]">
          <span className="font-semibold text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5 mb-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#22C55E]" /> Acceptance Criteria:
          </span>
          <p className="text-slate-600 dark:text-[#A8B6C7]">{test.acceptanceCriteria}</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#0B1A2B] border border-slate-100 dark:border-[#263B50]">
          <span className="font-semibold text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-[#16A9D8]" /> Sampling & Frequency:
          </span>
          <p className="text-slate-600 dark:text-[#A8B6C7]">
            {test.samplingRequirements} ({test.testingFrequency})
          </p>
        </div>
      </div>

      {/* Required Equipment */}
      {test.requiredEquipment.length > 0 && (
        <div className="pt-2 border-t border-slate-100 dark:border-[#263B50] text-xs text-slate-500 dark:text-[#7F91A5]">
          <span className="font-semibold text-slate-700 dark:text-[#F1F5F9]">Key Test Equipment: </span>
          <span>{test.requiredEquipment.join(', ')}</span>
        </div>
      )}
    </div>
  );
};

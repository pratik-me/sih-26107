import React from 'react';
import { UserRole } from '@bis/shared-types';
import { Factory, ShoppingBag, GraduationCap, Shield } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: UserRole;
  onModeChange: (mode: UserRole) => void;
  className?: string;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange, className = '' }) => {
  const modes = [
    {
      id: UserRole.INDUSTRY,
      label: 'Industry / MSME',
      desc: 'Standards, Certification Schemes, Lab Testing, Compliance Roadmap',
      icon: Factory
    },
    {
      id: UserRole.CONSUMER,
      label: 'Consumer',
      desc: 'Verify ISI Mark, Gold Hallmark, HUID Check, Consumer Grievance',
      icon: ShoppingBag
    },
    {
      id: UserRole.STUDENT_RESEARCHER,
      label: 'Student / Researcher',
      desc: 'Technical Clauses, Standards Explorer, Comparative Analysis',
      icon: GraduationCap
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 ${className}`}>
      {modes.map(m => {
        const isSelected = currentMode === m.id;
        const Icon = m.icon;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => onModeChange(m.id)}
            className={`p-4 rounded-xl border text-left transition-all ${
              isSelected
                ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-sm ring-2 ring-indigo-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <span
                className={`p-1.5 rounded-lg ${
                  isSelected
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {m.label}
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {m.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
};

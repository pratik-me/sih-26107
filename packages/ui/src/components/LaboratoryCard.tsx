import React from 'react';
import { Laboratory } from '@bis/shared-types';
import { Building2, MapPin, Mail, Phone, CheckCircle2, ShieldAlert, ExternalLink } from 'lucide-react';

interface LaboratoryCardProps {
  laboratory: Laboratory;
  className?: string;
}

export const LaboratoryCard: React.FC<LaboratoryCardProps> = ({ laboratory, className = '' }) => {
  return (
    <div className={`p-5 rounded-xl bg-white dark:bg-[#10243A] border border-slate-200 dark:border-[#263B50] shadow-sm space-y-4 hover:border-indigo-300 dark:hover:border-[#16A9D8] transition-all ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-[#0B1A2B] text-indigo-600 dark:text-[#16A9D8] mt-0.5">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
              {laboratory.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-[#7F91A5]">
              Lab Code: <span className="font-mono font-semibold text-slate-700 dark:text-[#A8B6C7]">{laboratory.labCode}</span>
            </p>
          </div>
        </div>

        {laboratory.recognitionStatus === 'RECOGNIZED' ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-[#22C55E] dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#22C55E]" /> BIS Recognized
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> {laboratory.recognitionStatus}
          </span>
        )}
      </div>

      {/* Address & Contact */}
      <div className="space-y-1.5 text-xs text-slate-600 dark:text-[#A8B6C7]">
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F91A5] mt-0.5 shrink-0" />
          <span>{laboratory.address}, {laboratory.city}, {laboratory.state} - {laboratory.pincode}</span>
        </div>
        <div className="flex flex-wrap items-center gap-4 pt-1">
          {laboratory.contactEmail && (
            <div className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F91A5]" />
              <a href={`mailto:${laboratory.contactEmail}`} className="hover:text-indigo-600 dark:hover:text-[#16A9D8]">
                {laboratory.contactEmail}
              </a>
            </div>
          )}
          {laboratory.contactPhone && (
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-[#7F91A5]" />
              <a href={`tel:${laboratory.contactPhone}`} className="hover:text-indigo-600 dark:hover:text-[#16A9D8]">
                {laboratory.contactPhone}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Recognized Standards & Capabilities */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#263B50] text-xs">
        <div>
          <span className="font-semibold text-slate-700 dark:text-[#F1F5F9]">Recognized for Indian Standards: </span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {laboratory.recognizedStandards.map((std, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-[#0B1A2B] text-indigo-700 dark:text-[#16A9D8] dark:border dark:border-[#263B50] font-mono font-medium text-[11px]"
              >
                {std}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="font-semibold text-slate-700 dark:text-[#F1F5F9]">Testing Capabilities: </span>
          <div className="flex flex-wrap gap-1 mt-1">
            {laboratory.testingCapabilities.map((cap, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#0B1A2B] text-slate-600 dark:text-[#A8B6C7] dark:border dark:border-[#263B50] text-[11px]"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 dark:text-[#7F91A5] border-t border-slate-100 dark:border-[#263B50]">
        <span>Accreditation: {laboratory.accreditationBody} (Valid up to {laboratory.validUpTo})</span>
        <a
          href={laboratory.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-indigo-600 dark:text-[#16A9D8] hover:text-indigo-700 dark:hover:underline font-medium"
        >
          <span>Official RSL Scope</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};

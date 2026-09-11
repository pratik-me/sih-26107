'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CertificationScheme, ComplianceRoadmapStep } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { ComplianceStep, LoadingState } from '@bis/ui';
import {
  Award,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  ShieldCheck,
  ArrowRight,
  FileBarChart2
} from 'lucide-react';

function CertificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stdParam = searchParams.get('std') || 'IS 17526:2021';
  const productParam = searchParams.get('product') || 'Stainless Steel Vacuum Insulated Water Bottle';

  const [schemes, setSchemes] = useState<CertificationScheme[]>([]);
  const [selectedSchemeCode, setSelectedSchemeCode] = useState<string>('SCHEME-I');
  const [roadmapSteps, setRoadmapSteps] = useState<ComplianceRoadmapStep[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadSchemesAndRoadmap = async () => {
      setIsLoading(true);
      try {
        const schemeList = await apiClient.getCertificationSchemes();
        setSchemes(schemeList);

        const roadmapRes = await apiClient.getCertificationRoadmap(stdParam, productParam);
        setRoadmapSteps(roadmapRes.steps);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadSchemesAndRoadmap();
  }, [stdParam, productParam]);

  const activeScheme = schemes.find(s => s.code === selectedSchemeCode) || (schemes.length > 0 ? schemes[0] : null);

  const handleGenerateReport = () => {
    router.push(`/reports?product=${encodeURIComponent(productParam)}&std=${encodeURIComponent(stdParam)}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#03045E] via-[#023E8A] to-[#03045E] dark:from-slate-950 dark:via-[#03045E]/90 dark:to-slate-950 overflow-hidden text-white">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 dark:bg-white/10 text-[#CAF0F8] text-xs font-semibold border border-[#48CAE4]/30 backdrop-blur-md shadow-2xs">
              <Award className="w-3.5 h-3.5 text-[#48CAE4]" />
              <span>BIS Conformity Assessment Schemes</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Certification Schemes & Compliance Roadmap
            </h1>
            <p className="text-sm sm:text-base text-[#ADE8F4]/90 max-w-2xl leading-relaxed">
              Understand statutory conformity schemes, mandatory factory audits, laboratory sample testing, and step-by-step licence grant procedures.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateReport}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0096C7] via-[#00B4D8] to-[#48CAE4] hover:from-[#0077B6] hover:to-[#00B4D8] text-slate-950 hover:text-white shadow-lg shadow-[#03045E]/40 transition-all shrink-0 cursor-pointer"
          >
            <FileBarChart2 className="w-4 h-4" />
            <span>Generate Full Compliance Report</span>
          </button>
        </div>

        {/* Target Product Notice */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-md">
          <div>
            <span className="font-bold text-[#CAF0F8]">Active Product Roadmap: </span>
            <span className="font-black text-white">{productParam}</span>
            <span className="text-[#90E0EF] ml-2 font-mono font-bold">({stdParam})</span>
          </div>
          <button
            type="button"
            onClick={() => router.push('/standards/recommend')}
            className="text-[#48CAE4] font-bold hover:text-white hover:underline shrink-0 cursor-pointer flex items-center gap-1 transition-colors"
          >
            <span>Change Product Profile →</span>
          </button>
        </div>

        {/* Schemes Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {schemes.map(s => {
            const isSelected = selectedSchemeCode === s.code;
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => setSelectedSchemeCode(s.code)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-white/95 dark:bg-slate-900/95 border-[#48CAE4] shadow-lg ring-2 ring-[#48CAE4]/50'
                    : 'bg-white/90 dark:bg-slate-900/80 border-white/20 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900'
                }`}
              >
                <span className="text-[10px] font-mono font-bold text-[#0077B6] dark:text-[#48CAE4] block uppercase">
                  {s.code}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                  {s.name.split('—')[0]}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                  {s.applicability}
                </p>
              </button>
            );
          })}
        </div>

        {/* Roadmap Workflow */}
        {isLoading ? (
          <LoadingState
            message="Loading Certification Scheme Requirements..."
            submessage="Compiling documentation checklists and audit schedules..."
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Roadmap Steps (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Interactive Step-by-Step Certification Journey</span>
                <span className="text-xs font-medium text-[#ADE8F4]/80">({roadmapSteps.length} Phases)</span>
              </h2>

            <div className="space-y-4">
              {roadmapSteps.map((step, idx) => (
                <ComplianceStep
                  key={idx}
                  step={step}
                  isCurrent={idx === 1}
                />
              ))}
            </div>
          </div>

          {/* Right Scheme Details Drawer */}
          {activeScheme && (
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sticky top-24">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Scheme Details
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {activeScheme.name}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {activeScheme.description}
                </p>

                {/* Mandatory Documentation Checklist */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Statutory Documents Required:
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                    {activeScheme.requiredDocuments.map((doc, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fees & Validity */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">Fee Structure: </span>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">{activeScheme.feeStructureSummary}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Validity: </span>
                      <span className="text-slate-600 dark:text-slate-400">{activeScheme.validityPeriod}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Surveillance: </span>
                      <span className="text-slate-600 dark:text-slate-400">{activeScheme.surveillanceFrequency}</span>
                    </div>
                  </div>
                </div>

                {/* External Official Link */}
                <a
                  href={activeScheme.officialGuidelineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-900 shadow-sm transition-all"
                >
                  <span>Official Manakonline / CRS Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

export default function CertificationSchemesPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Certification Schemes...</div>}>
      <CertificationContent />
    </React.Suspense>
  );
}


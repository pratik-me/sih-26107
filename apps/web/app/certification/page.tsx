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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-300 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>BIS Conformity Assessment Schemes</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Certification Schemes & Compliance Roadmap
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
            Understand statutory conformity schemes, mandatory factory audits, laboratory sample testing, and step-by-step licence grant procedures.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerateReport}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all shrink-0"
        >
          <FileBarChart2 className="w-4 h-4" />
          <span>Generate Full Compliance Report</span>
        </button>
      </div>

      {/* Target Product Notice */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-200">Active Product Roadmap: </span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{productParam}</span>
          <span className="text-blue-700 dark:text-blue-300 ml-2 font-mono">({stdParam})</span>
        </div>
        <button
          type="button"
          onClick={() => router.push('/standards/recommend')}
          className="text-blue-700 dark:text-blue-400 font-semibold hover:underline shrink-0"
        >
          Change Product Profile →
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
                  ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-500 shadow-sm ring-2 ring-amber-500/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 block uppercase">
                {s.code}
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                {s.name.split('—')[0]}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                {s.applicability}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Roadmap Workflow */}
      {isLoading ? (
        <LoadingState
          message="Loading Certification Scheme Requirements..."
          submessage="Compiling documentation checklists and audit schedules..."
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Roadmap Steps (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>Interactive Step-by-Step Certification Journey</span>
              <span className="text-xs font-medium text-slate-500">({roadmapSteps.length} Phases)</span>
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

          {/* Right Scheme Details Drawer (4 cols) */}
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
  );
}

export default function CertificationSchemesPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Certification Schemes...</div>}>
      <CertificationContent />
    </React.Suspense>
  );
}


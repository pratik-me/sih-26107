'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TestingRequirement } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { TestingRequirementCard, LoadingState, EmptyState } from '@bis/ui';
import { FlaskConical, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from "@/lib/i18n";

function TestingRequirementsContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const stdParam = searchParams.get('std') || '';

  const [filterStd, setFilterStd] = useState(stdParam);
  const [filterName, setFilterName] = useState('');
  const [requirements, setRequirements] = useState<TestingRequirement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRequirements = async () => {
    setIsLoading(true);
    try {
      const data = await apiClient.getTestingRequirements({
        standardNumber: filterStd || undefined,
        testName: filterName || undefined
      });
      setRequirements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (stdParam) fetchRequirements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#F7FAFC] dark:bg-[#07111F] overflow-hidden text-[#0B1F3A] dark:text-[#EAF2F8]">
      {/* Subtle atmospheric hero glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[450px] pointer-events-none dark:hidden"
        style={{
          background: 'radial-gradient(circle at 50% 15%, #EAF6FC 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[450px] pointer-events-none hidden dark:block"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(22, 169, 216, 0.08) 0%, transparent 45%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#10243A] text-[#0057A8] dark:text-[#16A9D8] text-xs font-semibold border border-[#D8E3EE] dark:border-[#263B50] shadow-2xs">
            <FlaskConical className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
            <span>{t("testing.badge", "Statutory Testing Schedules")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] dark:text-[#EAF2F8] tracking-tight">
            {t("testing.title", "Indian Standards Testing Requirements")}
          </h1>
          <p className="text-sm sm:text-base text-[#52657A] dark:text-[#AFC1D2] max-w-2xl leading-relaxed">
            {t("testing.subtitle", "Inspect mandatory routine batch tests, acceptance criteria, sampling rules, and required testing equipment cited directly from Indian Standards.")}
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#10243A] p-5 rounded-2xl border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)] flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#7A8CA0] dark:text-[#7F91A5] absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={filterStd}
              onChange={e => setFilterStd(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  fetchRequirements();
                }
              }}
              placeholder={t("testing.filter_placeholder", "Filter by Standard Number (e.g. IS 17526, IS 10500, IS 1786)...")}
              className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D8E3EE] dark:border-[#263B50] bg-white dark:bg-[#0B1A2B] text-[#263B53] dark:text-[#EAF2F8] placeholder:text-[#7A8CA0] dark:placeholder:text-[#7A8CA0] focus:outline-none focus:border-[#0E9FCE] focus:ring-2 focus:ring-[#0E9FCE]/12"
            />
          </div>
          <button
            type="button"
            onClick={fetchRequirements}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white rounded-xl shadow-sm transition-all shrink-0 cursor-pointer"
          >
            {t("testing.btn_filter", "Filter Tests")}
          </button>
        </div>

      {/* Testing Cards Grid */}
      {isLoading ? (
        <LoadingState
          message={t("testing.loading_msg", "Retrieving Testing Clauses & Acceptance Parameters...")}
          submessage={t("testing.loading_sub", "Cross-referencing laboratory test methods and sampling frequencies...")}
        />
      ) : requirements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((test, idx) => (
            <TestingRequirementCard key={test.id || idx} test={test} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={t("testing.empty_title", "No Testing Requirements Found")}
          description={t("testing.empty_desc", "Try searching with a standard number like 'IS 17526', 'IS 10500', or 'IS 1786'.")}
          icon={FlaskConical}
          actionLabel={t("testing.btn_showall", "Show All Tests")}
          onAction={() => {
            setFilterStd('');
            setFilterName('');
          }}
        />
      )}
      </div>
    </div>
  );
}

export default function TestingRequirementsPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Testing Requirements...</div>}>
      <TestingRequirementsContent />
    </React.Suspense>
  );
}


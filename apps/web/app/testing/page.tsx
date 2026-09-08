'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TestingRequirement } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { TestingRequirementCard, LoadingState, EmptyState } from '@bis/ui';
import { FlaskConical, Search, Filter, ShieldCheck, CheckCircle2 } from 'lucide-react';

function TestingRequirementsContent() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Statutory Testing Schedules</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Indian Standards Testing Requirements
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Inspect mandatory routine batch tests, acceptance criteria, sampling rules, and required testing equipment cited directly from Indian Standards.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
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
            placeholder="Filter by Standard Number (e.g. IS 17526, IS 10500, IS 1786)..."
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <button
          type="button"
          onClick={fetchRequirements}
          className="w-full sm:w-auto px-5 py-2 text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-sm transition-all shrink-0"
        >
          Filter Tests
        </button>
      </div>

      {/* Testing Cards Grid */}
      {isLoading ? (
        <LoadingState
          message="Retrieving Testing Clauses & Acceptance Parameters..."
          submessage="Cross-referencing laboratory test methods and sampling frequencies..."
        />
      ) : requirements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((test, idx) => (
            <TestingRequirementCard key={test.id || idx} test={test} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Testing Requirements Found"
          description="Try searching with a standard number like 'IS 17526', 'IS 10500', or 'IS 1786'."
          icon={FlaskConical}
          actionLabel="Show All Tests"
          onAction={() => {
            setFilterStd('');
            setFilterName('');
          }}
        />
      )}
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


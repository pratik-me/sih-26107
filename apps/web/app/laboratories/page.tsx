'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Laboratory } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { LaboratoryCard, LoadingState, EmptyState } from '@bis/ui';
import { Building2, Search, MapPin, Filter, CheckCircle2 } from 'lucide-react';

function LaboratoriesFinderContent() {
  const searchParams = useSearchParams();
  const stdParam = searchParams.get('std') || '';

  const [filterStd, setFilterStd] = useState(stdParam);
  const [filterState, setFilterState] = useState('');
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const states = [
    'All States',
    'Maharashtra',
    'Delhi',
    'Uttar Pradesh',
    'Karnataka',
    'Haryana',
    'Tamil Nadu',
    'Gujarat'
  ];

  const fetchLaboratories = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.searchLaboratories({
        standardNumber: filterStd || undefined,
        state: filterState === 'All States' ? undefined : filterState
      });
      setLaboratories(res.laboratories);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLaboratories();
  }, [filterState]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLaboratories();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5" />
          <span>Accredited Testing Infrastructure</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Find a BIS Recognized Laboratory
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Search NABL (ISO/IEC 17025) accredited and BIS Recognized Testing Laboratories across Indian states and cities with valid testing scopes.
        </p>
      </div>

      {/* Search & State Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={filterStd}
              onChange={e => setFilterStd(e.target.value)}
              placeholder="Search by Indian Standard (e.g. IS 17526, IS 14543, IS 16046, IS 1786)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-sm transition-all"
          >
            Filter Labs
          </button>
        </form>

        {/* State Selection Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> State:
          </span>
          {states.map(st => {
            const isSel = (filterState === '' && st === 'All States') || filterState === st;
            return (
              <button
                key={st}
                type="button"
                onClick={() => setFilterState(st === 'All States' ? '' : st)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  isSel
                    ? 'bg-blue-700 text-white font-semibold'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Laboratories Grid */}
      {isLoading ? (
        <LoadingState
          message="Locating Recognized Testing Laboratories..."
          submessage="Matching accredited testing parameters and laboratory validity schedules..."
        />
      ) : laboratories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {laboratories.map((lab, idx) => (
            <LaboratoryCard key={lab.id || idx} laboratory={lab} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Laboratories Found"
          description="Try removing the standard filter or choosing 'All States' to view national reference laboratories."
          icon={Building2}
          actionLabel="View All Laboratories"
          onAction={() => {
            setFilterStd('');
            setFilterState('');
          }}
        />
      )}
    </div>
  );
}

export default function LaboratoriesFinderPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-xs text-slate-500">Loading Laboratories...</div>}>
      <LaboratoriesFinderContent />
    </React.Suspense>
  );
}


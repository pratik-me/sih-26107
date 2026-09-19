'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Laboratory } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { LaboratoryCard, LoadingState, EmptyState } from '@bis/ui';
import { Building2, Search, MapPin, Filter, CheckCircle2 } from 'lucide-react';
import { useTranslation } from "@/lib/i18n";

function LaboratoriesFinderContent() {
  const { t } = useTranslation();
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
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#CAF0F8]/40 to-[#90E0EF]/55 dark:from-[#07111F] dark:via-[#0A1A2E] dark:to-[#0F2942] overflow-hidden text-slate-900 dark:text-white">
      {/* Ambient Glowing Blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#90E0EF]/35 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-0 right-10 w-80 h-80 bg-[#ADE8F4]/45 dark:bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#CAF0F8]/55 dark:bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative z-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-white/10 text-[#0077B6] dark:text-[#CAF0F8] text-xs font-semibold border border-[#ADE8F4] dark:border-[#48CAE4]/30 backdrop-blur-md shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#48CAE4]" />
            <span>{t("labs.badge", "Accredited Testing Infrastructure")}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            {t("labs.title", "Find a BIS Recognized Laboratory")}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-[#ADE8F4]/90 max-w-2xl leading-relaxed">
            {t("labs.subtitle", "Search NABL (ISO/IEC 17025) accredited and BIS Recognized Testing Laboratories across Indian states and cities with valid testing scopes.")}
          </p>
        </div>

        {/* Search & State Filter */}
        <div className="bg-white/95 dark:bg-[#10243A] backdrop-blur-md p-5 rounded-2xl border border-[#ADE8F4] dark:border-[#263B50] shadow-md shadow-[#0077B6]/10 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-[#7F91A5] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={filterStd}
                onChange={e => setFilterStd(e.target.value)}
                placeholder={t("labs.search_placeholder", "Search by Indian Standard (e.g. IS 17526, IS 14543, IS 16046, IS 1786)...")}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-[#263B50] bg-white/50 dark:bg-[#0B1A2B] text-slate-900 dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#16A9D8] focus:border-[#023E8A]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] hover:from-[#0077B6] hover:to-[#023E8A] dark:from-[#1268B3] dark:to-[#1583D1] text-white rounded-xl shadow-md shadow-[#0077B6]/20 transition-all cursor-pointer"
            >
              {t("labs.btn_filter", "Filter Labs")}
            </button>
          </form>

          {/* State Selection Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-[#263B50] text-xs">
            <span className="font-semibold text-slate-500 dark:text-[#A8B6C7] mr-1 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#0077B6] dark:text-[#16A9D8]" /> {t("labs.filter_state", "State")}:
            </span>
            {states.map(st => {
              const isSel = (filterState === '' && st === 'All States') || filterState === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setFilterState(st === 'All States' ? '' : st)}
                  className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                    isSel
                      ? 'bg-gradient-to-r from-[#023E8A] to-[#0077B6] dark:from-[#1268B3] dark:to-[#1583D1] text-white font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-[#0B1A2B] text-slate-700 dark:text-[#A8B6C7] dark:border dark:border-[#263B50] hover:bg-[#CAF0F8]/80 hover:text-[#023E8A] dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]'
                  }`}
                >
                  {st === 'All States'
                    ? t("labs.filter_allstates", "All States")
                    : st === 'Maharashtra'
                    ? t("labs.state_maharashtra", "Maharashtra")
                    : st === 'Delhi'
                    ? t("labs.state_delhi", "Delhi")
                    : st === 'Uttar Pradesh'
                    ? t("labs.state_uttar_pradesh", "Uttar Pradesh")
                    : st === 'Karnataka'
                    ? t("labs.state_karnataka", "Karnataka")
                    : st === 'Haryana'
                    ? t("labs.state_haryana", "Haryana")
                    : st === 'Tamil Nadu'
                    ? t("labs.state_tamil_nadu", "Tamil Nadu")
                    : st === 'Gujarat'
                    ? t("labs.state_gujarat", "Gujarat")
                    : st}
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


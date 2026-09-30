'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Standard } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { StandardCard, LoadingState, EmptyState } from '@bis/ui';
import { Search, Filter, BookOpen, Award, CheckCircle } from 'lucide-react';
import { useTranslation } from "@/lib/i18n";

export default function StandardsCatalogPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [mandatoryOnly, setMandatoryOnly] = useState<boolean>(false);
  const [standards, setStandards] = useState<Standard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const divisions = [
    t('standards.filter_all', 'All Divisions'),
    t('standards.div_mech', 'Mechanical Engineering'),
    t('standards.div_civil', 'Civil Engineering'),
    t('standards.div_electro', 'Electrotechnical'),
    t('standards.div_met', 'Metallurgical Engineering'),
    t('standards.div_food', 'Food and Agriculture')
  ];

  const fetchStandards = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.searchStandards(query, {
        division: selectedDivision === t('standards.filter_all', 'All Divisions') ? undefined : selectedDivision,
        isMandatory: mandatoryOnly ? true : undefined
      });
      setStandards(res.standards);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStandards();
  }, [selectedDivision, mandatoryOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStandards();
  };

  const handleSelectStandard = (standard: Standard) => {
    router.push(`/certification?std=${encodeURIComponent(standard.standardNumber)}&product=${encodeURIComponent(standard.title)}`);
  };

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
            <BookOpen className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
            <span>{t('standards.badge', 'Bureau of Indian Standards Repository')}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] dark:text-[#EAF2F8] tracking-tight">
            {t('standards.title', 'Indian Standards Directory & Search')}
          </h1>
          <p className="text-sm sm:text-base text-[#52657A] dark:text-[#AFC1D2] max-w-2xl leading-relaxed">
            {t('standards.subtitle', 'Search authoritative Indian Standards (IS), explore technical scopes, mandatory Quality Control Orders (QCO), and testing clause schedules.')}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-[#10243A] p-5 rounded-2xl border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)] space-y-4">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A8CA0] dark:text-[#7F91A5] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={t('standards.search_placeholder', 'Search by IS number (e.g. IS 10500, IS 17526) or keyword (cement, cable, steel, bottle)...')}
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#D8E3EE] dark:border-[#263B50] bg-white dark:bg-[#0B1A2B] text-[#263B53] dark:text-[#EAF2F8] placeholder:text-[#7A8CA0] dark:placeholder:text-[#7A8CA0] focus:outline-none focus:border-[#0E9FCE] focus:ring-2 focus:ring-[#0E9FCE]/12"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white rounded-xl shadow-sm transition-all cursor-pointer"
            >
              {t('standards.search_btn', 'Search')}
            </button>
          </form>

          {/* Division Pills & Mandatory Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D8E3EE] dark:border-[#263B50] text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-semibold text-[#7A8CA0] dark:text-[#A8B6C7] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#0057A8] dark:text-[#16A9D8]" /> {t('standards.filter_division', 'Division:')}
              </span>
              {divisions.map(div => {
                const isSel = (selectedDivision === '' && div === t('standards.filter_all', 'All Divisions')) || selectedDivision === div;
                return (
                  <button
                    key={div}
                    type="button"
                    onClick={() => setSelectedDivision(div === t('standards.filter_all', 'All Divisions') ? '' : div)}
                    className={`px-3 py-1 rounded-full text-[11px] transition-all cursor-pointer ${
                      isSel
                        ? 'bg-[#EAF4FB] dark:bg-[#163B59] text-[#0057A8] dark:text-[#16A9D8] border border-[#B9DDED] dark:border-[#16A9D8] font-bold shadow-2xs'
                        : 'bg-white dark:bg-[#0B1A2B] text-[#52657A] dark:text-[#A8B6C7] border border-[#D8E3EE] dark:border-[#263B50] hover:bg-[#F1F7FC] hover:text-[#0057A8] hover:border-[#B9DDED] dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]'
                    }`}
                  >
                    {div}
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none font-semibold text-[#263B53] dark:text-[#F1F5F9]">
              <input
                type="checkbox"
                checked={mandatoryOnly}
                onChange={e => setMandatoryOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#0057A8] accent-[#0057A8] dark:accent-[#16A9D8] focus:ring-[#0057A8]"
              />
              <span>{t('standards.filter_mandatory', 'Mandatory QCO Only')}</span>
            </label>
          </div>
        </div>

        {/* Standards Grid */}
        {isLoading ? (
          <LoadingState
            message={t('standards.loading_msg', 'Retrieving Standards from BIS Repository...')}
            submessage={t('standards.loading_sub', 'Applying division filters and QCO regulatory scopes...')}
          />
        ) : standards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standards.map(std => (
              <StandardCard
                key={std.id || std.standardNumber}
                standard={std}
                onSelect={handleSelectStandard}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={t('standards.empty_title', 'No Indian Standards Found')}
            description={t('standards.empty_desc', 'Try broadening your search query or reset the division and mandatory QCO filters.')}
            icon={BookOpen}
            actionLabel={t('standards.empty_action', 'Reset Filters')}
            onAction={() => {
              setQuery('');
              setSelectedDivision('');
              setMandatoryOnly(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

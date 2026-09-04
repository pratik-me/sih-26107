'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Standard } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { StandardCard, LoadingState, EmptyState } from '@bis/ui';
import { Search, Filter, BookOpen, Award, CheckCircle } from 'lucide-react';

export default function StandardsCatalogPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState<string>('');
  const [mandatoryOnly, setMandatoryOnly] = useState<boolean>(false);
  const [standards, setStandards] = useState<Standard[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const divisions = [
    'All Divisions',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrotechnical',
    'Metallurgical Engineering',
    'Food and Agriculture'
  ];

  const fetchStandards = async () => {
    setIsLoading(true);
    try {
      const res = await apiClient.searchStandards(query, {
        division: selectedDivision === 'All Divisions' ? undefined : selectedDivision,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 text-xs font-semibold">
          <span>Bureau of Indian Standards Repository</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          Indian Standards Directory & Search
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
          Search authoritative Indian Standards (IS), explore technical scopes, mandatory Quality Control Orders (QCO), and testing clause schedules.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by IS number (e.g. IS 10500, IS 17526) or keyword (cement, cable, steel, bottle)..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl shadow-sm transition-all"
          >
            Search
          </button>
        </form>

        {/* Division Pills & Mandatory Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Division:
            </span>
            {divisions.map(div => {
              const isSel = (selectedDivision === '' && div === 'All Divisions') || selectedDivision === div;
              return (
                <button
                  key={div}
                  type="button"
                  onClick={() => setSelectedDivision(div === 'All Divisions' ? '' : div)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                    isSel
                      ? 'bg-blue-700 text-white font-semibold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {div}
                </button>
              );
            })}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none font-medium text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={mandatoryOnly}
              onChange={e => setMandatoryOnly(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Mandatory QCO Only</span>
          </label>
        </div>
      </div>

      {/* Standards Grid */}
      {isLoading ? (
        <LoadingState
          message="Retrieving Standards from BIS Repository..."
          submessage="Applying division filters and QCO regulatory scopes..."
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
          title="No Indian Standards Found"
          description="Try broadening your search query or reset the division and mandatory QCO filters."
          icon={BookOpen}
          actionLabel="Reset Filters"
          onAction={() => {
            setQuery('');
            setSelectedDivision('');
            setMandatoryOnly(false);
          }}
        />
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { HallmarkingGuidance, HuidValidationResult, HallmarkingCentre } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import { HallmarkingCard, LoadingState } from '@bis/ui';
import {
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ExternalLink,
  MapPin
} from 'lucide-react';

export default function HallmarkingAssistantPage() {
  const [guidance, setGuidance] = useState<HallmarkingGuidance | null>(null);
  const [inputHuid, setInputHuid] = useState('A1B2C3');
  const [huidResult, setHuidResult] = useState<HuidValidationResult | null>(null);
  const [centres, setCentres] = useState<HallmarkingCentre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const g = await apiClient.getHallmarkingGuidance();
        setGuidance(g);

        const v = await apiClient.validateHuid('A1B2C3');
        setHuidResult(v);

        const c = await apiClient.searchHallmarkingCentres();
        setCentres(c);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleValidateHuid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputHuid.trim()) return;
    try {
      const res = await apiClient.validateHuid(inputHuid);
      setHuidResult(res);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || !guidance) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <LoadingState
          message="Loading Hallmarking Standards & Fineness Schedules..."
          submessage="Retrieving IS 1417 (Gold) and IS 2112 (Silver) statutory markings..."
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-900 to-yellow-900 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-800 text-amber-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Precious Metals Purity Assurance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Gold & Silver Hallmarking Assistant
          </h1>
          <p className="text-xs text-amber-200 max-w-xl">
            Understand standard fineness grades, verify 6-digit alphanumeric HUID codes, locate Assaying & Hallmarking Centres, and know your statutory compensation rights.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-amber-800/60 border border-amber-700 text-xs text-amber-100 max-w-xs space-y-1">
          <div className="font-bold flex items-center justify-center gap-1">
            <ShieldCheck className='size-3.5 text-emerald-400' />
            <span>BIS Hallmarking Mandate</span>
          </div>
          <p className="text-[11px] text-amber-200 text-center">
            Mandatory hallmarking is operative across notified districts in India. Only 3 marks are permitted on gold jewellery.
          </p>
        </div>
      </div>

      {/* 3 Mandatory Marks Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span>The 3 Mandatory Marks on Gold Jewellery</span>
          <span className="text-xs font-medium text-slate-500">(Operative since July 2021)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guidance.threeMandatoryMarks.map(mark => (
            <div
              key={mark.markNumber}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 font-bold text-xs flex items-center justify-center">
                #{mark.markNumber}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{mark.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{mark.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HUID Verification Interactive Tool */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
            Consumer Verification Tool
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Verify 6-Digit Alphanumeric HUID Structure
          </h2>
          <p className="text-xs text-slate-500">
            Test and inspect any 6-digit laser-marked HUID code before buying jewellery.
          </p>
        </div>

        <form onSubmit={handleValidateHuid} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            maxLength={6}
            value={inputHuid}
            onChange={e => setInputHuid(e.target.value.toUpperCase())}
            placeholder="Enter 6-character HUID (e.g. A1B2C3)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-mono font-bold tracking-widest text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase"
          />
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
          >
            Validate Format
          </button>
        </form>

        {huidResult && (
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
            <div className="flex items-center gap-2">
              {huidResult.isValidFormat ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              )}
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {huidResult.explanation}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                  How to verify this on BIS Care App:
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {huidResult.howToVerifyOnBisCare.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                  Consumer Safety & Rights Tips:
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {huidResult.consumerSafetyTips.map((tip, idx) => (
                    <li key={idx}>• {tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Purity Fineness Grades Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidance.purityGrades.map((grade, idx) => (
            <HallmarkingCard key={idx} purity={grade} />
          ))}
        </div>
      </div>

      {/* Compensation Policy Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Scale className="w-4 h-4" />
            <span>Statutory 2X Compensation Policy</span>
          </div>
          <h3 className="text-lg font-bold">Consumer Protection Guarantee</h3>
          <p className="text-xs text-blue-200 max-w-2xl leading-relaxed">
            {guidance.compensationPolicy}
          </p>
        </div>
      </div>
    </div>
  );
}

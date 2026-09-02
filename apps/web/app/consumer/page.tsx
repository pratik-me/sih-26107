'use client';

import React, { useState } from 'react';
import { IsiVerificationResult, ConsumerComplaintGuidance } from '@bis/shared-types';
import { apiClient } from '@bis/api-client';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  ExternalLink,
  HelpCircle,
  FileWarning
} from 'lucide-react';

export default function ConsumerHubPage() {
  const [cmlInput, setCmlInput] = useState('1454301');
  const [verificationResult, setVerificationResult] = useState<IsiVerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmlInput.trim()) return;

    setIsLoading(true);
    try {
      const res = await apiClient.verifyIsiMark(cmlInput);
      setVerificationResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-900 to-red-950 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-800 text-rose-200 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Citizen & Consumer Protection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Consumer Safety & ISI Mark Verification Hub
          </h1>
          <p className="text-xs text-rose-200 max-w-xl">
            Verify genuine ISI Mark Certification Marks Licence (CM/L) numbers, detect counterfeit markings, and access official grievance channels.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-rose-800/60 border border-rose-700 text-xs text-rose-100 max-w-xs space-y-1">
          <div className="font-bold flex items-center gap-1">
            <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
            <span>Toll-Free Consumer Helpline</span>
          </div>
          <p className="text-base font-black text-white">1800-11-4000</p>
        </div>
      </div>

      {/* ISI Mark Verification Interactive Box */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-[11px] font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
            Licence Authentication
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
            Verify ISI Mark CM/L Number
          </h2>
          <p className="text-xs text-slate-500">
            Enter the 7 or 8-digit numeric licence code printed beneath the ISI triangular logo.
          </p>
        </div>

        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 max-w-xl">
          <input
            type="text"
            value={cmlInput}
            onChange={e => setCmlInput(e.target.value)}
            placeholder="Enter 7 or 8-digit CM/L Number (e.g. 1454301)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-mono font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-800 text-white shadow-sm transition-all"
          >
            Check Licence Structure
          </button>
        </form>

        {verificationResult && (
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {verificationResult.isValidFormat ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                )}
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {verificationResult.cmlNumber} — {verificationResult.validityStatus}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {verificationResult.guidance}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authenticity Verification Checklist:
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {verificationResult.authenticityChecklist.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <h4 className="font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <FileWarning className="w-3.5 h-3.5" /> Red Flag Fraud Indicators:
                </h4>
                <ul className="space-y-1 text-slate-600 dark:text-slate-400">
                  {verificationResult.fraudIndicators.map((fraud, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{fraud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={verificationResult.bisCareAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-rose-700 hover:text-rose-800"
              >
                <span>Download Official BIS Care Citizen App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Redressal Steps & Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>How to Lodge a Counterfeit Complaint</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            If you encounter a substandard product or fake ISI/Hallmark, you can submit an anonymous report directly to the BIS Enforcement Branch via the BIS Care App or e-BIS portal.
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2">
            <li>1. Capture clear photos of the product and packaging.</li>
            <li>2. Preserve retail cash memo / GST invoice.</li>
            <li>3. Submit complaint with retailer address on BIS Care App.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Key Mandatory Consumer Categories</span>
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Products that strictly require the ISI Mark before retail sale in India:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
            {['Packaged Drinking Water', 'TMT Steel Bars', 'Portland Cement', 'LPG Regulators & Cylinders', 'Infant Formula', 'Gold Jewellery (HUID)', 'Electric Immersion Heaters', 'Automobile Tyres'].map((cat, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

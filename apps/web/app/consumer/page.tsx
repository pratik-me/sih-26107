"use client";

import React, { useState } from "react";
import { IsiVerificationResult } from "@bis/shared-types";
import { apiClient } from "@bis/api-client";
import { useTranslation } from "@/lib/i18n";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  ExternalLink,
  HelpCircle,
  FileWarning,
} from "lucide-react";

export default function ConsumerHubPage() {
  const { t } = useTranslation();
  const [cmlInput, setCmlInput] = useState("1454301");
  const [verificationResult, setVerificationResult] =
    useState<IsiVerificationResult | null>(null);
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

  const categories = [
    t("consumer.cat_packaged_water", "Packaged Drinking Water"),
    t("consumer.cat_steel_tmt", "TMT Steel Bars"),
    t("consumer.cat_cement", "Portland Cement"),
    t("consumer.cat_lpg_cylinders", "LPG Regulators & Cylinders"),
    t("consumer.cat_infant_formula", "Infant Formula"),
    t("consumer.cat_gold", "Gold Jewellery (HUID)"),
    t("consumer.cat_immersion_heaters", "Electric Immersion Heaters"),
    t("consumer.cat_auto_tyres", "Automobile Tyres"),
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#CAF0F8]/40 to-[#90E0EF]/55 dark:from-[#07111F] dark:via-[#0A1A2E] dark:to-[#0F2942] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#90E0EF]/35 dark:bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#ADE8F4]/45 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#CAF0F8]/55 dark:bg-[#03045E]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 relative z-10">
        {/* Header Banner */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#CAF0F8]/40 to-white dark:from-[#03045E] dark:via-[#023E8A] dark:to-[#0077B6] text-slate-900 dark:text-white shadow-xl shadow-[#0077B6]/12 dark:shadow-[#03045E]/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden border border-[#0077B6]/25 dark:border-[#0077B6]/40">
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#00B4D8]/15 dark:bg-[#00B4D8]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#48CAE4]/15 dark:bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#CAF0F8] dark:bg-[#0077B6]/40 border border-[#ADE8F4] dark:border-[#48CAE4]/40 text-[#023E8A] dark:text-[#CAF0F8] text-xs font-semibold backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#48CAE4]" />
              <span>
                {t("consumer.badge", "Citizen & Consumer Protection")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              {t("consumer.title_prefix", "Consumer Safety &")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] dark:from-[#CAF0F8] dark:via-[#48CAE4] dark:to-[#00B4D8]">
                {t("consumer.title_highlight", "ISI Mark Verification Hub")}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#ADE8F4]/90 max-w-xl leading-relaxed">
              {t(
                "consumer.subtitle",
                "Verify genuine ISI Mark Certification Marks Licence (CM/L) numbers, detect counterfeit markings, and access official grievance channels.",
              )}
            </p>
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-white/80 dark:bg-[#03045E]/70 border border-[#ADE8F4] dark:border-[#0077B6]/50 text-xs text-slate-700 dark:text-[#CAF0F8] max-w-xs space-y-1.5 backdrop-blur-md shadow-sm dark:shadow-inner">
            <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
              <PhoneCall className="w-4 h-4 text-[#0077B6] dark:text-[#48CAE4]" />
              <span>
                {t("consumer.helpline_badge", "Toll-Free Consumer Helpline")}
              </span>
            </div>
            <p className="text-lg font-black text-[#023E8A] dark:text-white tracking-wide">
              {t("consumer.helpline_number", "1800-11-4000")}
            </p>
          </div>
        </div>

        {/* ISI Mark Verification Box */}
        <div className="p-6 rounded-2xl bg-white/95 dark:bg-[#10243A] backdrop-blur-md border border-[#ADE8F4] dark:border-[#263B50] shadow-md dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-5">
          <div className="border-b border-slate-100 dark:border-[#263B50] pb-3">
            <span className="text-[11px] font-bold text-[#0077B6] dark:text-[#16A9D8] uppercase tracking-wider">
              {t("consumer.verify_tag", "Licence Authentication")}
            </span>
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] mt-0.5">
              {t(
                "consumer.verify_title",
                "CM/L 7-Digit Format Validation",
              )}
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#A8B6C7]">
              {t(
                "consumer.verify_subtitle",
                "Every genuine ISI Mark carries a 7 or 8-digit CM/L license number directly beneath the ISI monogram.",
              )}
            </p>
          </div>

          <form
            onSubmit={handleVerify}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <input
              type="text"
              value={cmlInput}
              onChange={(e) => setCmlInput(e.target.value)}
              placeholder={t(
                "consumer.verify_placeholder",
                "Enter 7 or 8-digit CM/L Number (e.g. 1454301)",
              )}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-[#263B50] bg-white/50 dark:bg-[#0B1A2B] text-sm font-mono font-bold text-slate-900 dark:text-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#16A9D8]"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] hover:from-[#0077B6] hover:to-[#023E8A] dark:from-[#1268B3] dark:to-[#1583D1] text-white shadow-md shadow-[#0077B6]/25 transition-all cursor-pointer disabled:opacity-50"
            >
              {t("consumer.btn_check", "Check Licence Structure")}
            </button>
          </form>

          {verificationResult && (
            <div className="p-5 rounded-xl bg-[#CAF0F8]/30 dark:bg-[#0B1A2B] border border-[#ADE8F4] dark:border-[#263B50] space-y-4">
              <div className="flex items-center gap-2">
                {verificationResult.isValidFormat ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-[#22C55E]" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                )}
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9]">
                  {verificationResult.cmlNumber} —{" "}
                  {verificationResult.validityStatus}
                </h3>
              </div>

              <p className="text-xs text-slate-600 dark:text-[#A8B6C7] leading-relaxed">
                {verificationResult.guidance}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3.5 rounded-lg bg-white dark:bg-[#153653] border border-[#ADE8F4]/60 dark:border-[#263B50] space-y-1.5 shadow-2xs">
                  <h4 className="font-semibold text-emerald-700 dark:text-[#22C55E] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                    {t(
                      "consumer.checklist_auth",
                      "Authenticity Verification Checklist:",
                    )}
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-[#A8B6C7]">
                    {verificationResult.authenticityChecklist.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 dark:text-[#22C55E] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-white dark:bg-[#153653] border border-[#ADE8F4]/60 dark:border-[#263B50] space-y-1.5 shadow-2xs">
                  <h4 className="font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                    <FileWarning className="w-3.5 h-3.5" />{" "}
                    {t(
                      "consumer.checklist_fraud",
                      "Red Flag Fraud Indicators:",
                    )}
                  </h4>
                  <ul className="space-y-1 text-slate-600 dark:text-[#A8B6C7]">
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
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0077B6] dark:text-[#16A9D8] hover:underline"
                >
                  <span>
                    {t(
                      "consumer.link_biscare",
                      "Download Official BIS Care Citizen App",
                    )}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Redressal Steps & Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/95 dark:bg-[#10243A] backdrop-blur-md border border-[#ADE8F4] dark:border-[#263B50] shadow-md dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0077B6] dark:text-[#16A9D8]" />
              <span>
                {t(
                  "consumer.complaint_title",
                  "How to Lodge a Counterfeit Complaint",
                )}
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#A8B6C7] leading-relaxed">
              {t(
                "consumer.complaint_desc",
                "If you encounter a substandard product or fake ISI/Hallmark, you can submit an anonymous report directly to the BIS Enforcement Branch via the BIS Care App or e-BIS portal.",
              )}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-[#A8B6C7] pt-2">
              <li>
                {t(
                  "consumer.complaint_step1",
                  "1. Capture clear photos of the product and packaging.",
                )}
              </li>
              <li>
                {t(
                  "consumer.complaint_step2",
                  "2. Preserve retail cash memo / GST invoice.",
                )}
              </li>
              <li>
                {t(
                  "consumer.complaint_step3",
                  "3. Submit complaint with retailer address on BIS Care App.",
                )}
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-white/95 dark:bg-[#10243A] backdrop-blur-md border border-[#ADE8F4] dark:border-[#263B50] shadow-md dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#0096C7] dark:text-[#16A9D8]" />
              <span>
                {t(
                  "consumer.categories_title",
                  "Key Mandatory Consumer Categories",
                )}
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {t(
                "consumer.categories_desc",
                "Products that strictly require the ISI Mark before retail sale in India:",
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

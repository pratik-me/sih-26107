"use client";

import React, { useState, useEffect } from "react";
import {
  HallmarkingGuidance,
  HuidValidationResult,
  HallmarkingCentre,
} from "@bis/shared-types";
import { apiClient } from "@bis/api-client";
import { HallmarkingCard, LoadingState } from "@bis/ui";
import {
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertTriangle,
  Scale,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export default function HallmarkingAssistantPage() {
  const { t } = useTranslation();
  const [guidance, setGuidance] = useState<HallmarkingGuidance | null>(null);
  const [inputHuid, setInputHuid] = useState("A1B2C3");
  const [huidResult, setHuidResult] = useState<HuidValidationResult | null>(
    null,
  );
  const [centres, setCentres] = useState<HallmarkingCentre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const g = await apiClient.getHallmarkingGuidance();
        setGuidance(g);

        const v = await apiClient.validateHuid("A1B2C3");
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
          message={t(
            "hallmarking.loading_msg",
            "Loading Hallmarking Standards & Fineness Schedules...",
          )}
          submessage={t(
            "hallmarking.loading_sub",
            "Retrieving IS 1417 (Gold) and IS 2112 (Silver) statutory markings...",
          )}
        />
      </div>
    );
  }

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10 relative z-10">
        <div className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#10243A] text-[#0B1F3A] dark:text-[#EAF2F8] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden border border-[#D8E3EE] dark:border-[#263B50]">
          <div className="relative space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6FC] dark:bg-[#0B1A2B] border border-[#B9DDED] dark:border-[#263B50] text-[#0057A8] dark:text-[#16A9D8] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
              <span>
                {t("hallmarking.badge", "Precious Metals Purity Assurance")}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0B1F3A] dark:text-[#EAF2F8]">
              {t("hallmarking.title_prefix", "Gold & Silver")}{" "}
              <span className="text-[#0057A8] dark:text-[#16A9D8]">
                {t("hallmarking.title_highlight", "Hallmarking Assistant")}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#52657A] dark:text-[#AFC1D2] max-w-xl leading-relaxed">
              {t(
                "hallmarking.subtitle",
                "Understand standard fineness grades, verify 6-digit alphanumeric HUID codes, locate Assaying & Hallmarking Centres, and know your statutory compensation rights.",
              )}
            </p>
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-[#F0F8FD] dark:bg-[#0B1A2B] border border-[#B9DDED] dark:border-[#263B50] text-xs text-[#263B53] dark:text-[#AFC1D2] max-w-xs space-y-1.5 shadow-2xs">
            <div className="font-bold flex items-center justify-center gap-1.5 text-[#0B1F3A] dark:text-[#EAF2F8]">
              <ShieldCheck className="w-4 h-4 text-[#0057A8] dark:text-[#16A9D8]" />
              <span>
                {t("hallmarking.mandate_badge", "BIS Hallmarking Mandate")}
              </span>
            </div>
            <p className="text-[11px] text-[#52657A] dark:text-[#AFC1D2] text-center leading-relaxed">
              {t(
                "hallmarking.mandate_desc",
                "Mandatory hallmarking is operative across notified districts in India. Only 3 marks are permitted on gold jewellery.",
              )}
            </p>
          </div>
        </div>

        {/* 3 Mandatory Marks Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-[#EAF2F8] flex items-center gap-2">
            <span>
              {t(
                "hallmarking.3marks_title",
                "The 3 Mandatory Marks on Gold Jewellery",
              )}
            </span>
            <span className="text-xs font-medium text-[#7A8CA0] dark:text-[#A8B6C7]">
              {t("hallmarking.3marks_note", "(Operative since July 2021)")}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guidance.threeMandatoryMarks.map((mark) => (
              <div
                key={mark.markNumber}
                className="p-5 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-2 hover:border-[#B9DDED] dark:hover:border-[#16A9D8] transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAF6FC] dark:bg-[#0B1A2B] text-[#0057A8] dark:text-[#16A9D8] border border-[#B9DDED] dark:border-[#263B50] font-bold text-xs flex items-center justify-center">
                  #{mark.markNumber}
                </div>
                <h3 className="text-base font-bold text-[#0B1F3A] dark:text-[#EAF2F8]">
                  {t(`hallmarking.mark${mark.markNumber}_title`, mark.title)}
                </h3>
                <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed">
                  {t(`hallmarking.mark${mark.markNumber}_detail`, mark.detail)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HUID Verification Interactive Tool */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] space-y-5">
          <div className="border-b border-[#D8E3EE] dark:border-[#263B50] pb-3">
            <span className="text-[11px] font-bold text-[#0057A8] dark:text-[#16A9D8] uppercase tracking-wider">
              {t("hallmarking.verify_tag", "Consumer Verification Tool")}
            </span>
            <h2 className="text-xl font-bold text-[#0B1F3A] dark:text-[#EAF2F8] mt-0.5">
              {t(
                "hallmarking.verify_title",
                "Verify 6-Digit Alphanumeric HUID Structure",
              )}
            </h2>
            <p className="text-xs text-[#7A8CA0] dark:text-[#8299AD]">
              {t(
                "hallmarking.verify_subtitle",
                "Test and inspect any 6-digit laser-marked HUID code before buying jewellery.",
              )}
            </p>
          </div>

          <form
            onSubmit={handleValidateHuid}
            className="flex flex-col sm:flex-row gap-3 max-w-xl"
          >
            <input
              type="text"
              maxLength={6}
              value={inputHuid}
              onChange={(e) => setInputHuid(e.target.value.toUpperCase())}
              placeholder={t(
                "hallmarking.verify_placeholder",
                "Enter 6-character HUID (e.g. A1B2C3)",
              )}
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#D8E3EE] dark:border-[#263B50] bg-white dark:bg-[#0B1A2B] text-sm font-mono font-bold tracking-widest text-[#263B53] dark:text-[#EAF2F8] placeholder:text-[#7A8CA0] focus:outline-none focus:border-[#0E9FCE] focus:ring-2 focus:ring-[#0E9FCE]/12 uppercase"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm transition-all cursor-pointer"
            >
              {t("hallmarking.btn_validate", "Validate Format")}
            </button>
          </form>

          {huidResult && (
            <div
              className={`p-5 rounded-2xl border-2 shadow-lg transition-all duration-300 space-y-4 ${
                huidResult.isValidFormat
                  ? "bg-gradient-to-br from-white via-emerald-50/70 to-[#CAF0F8]/50 border-emerald-500/50 shadow-emerald-500/10 text-slate-900"
                  : "bg-gradient-to-br from-white via-rose-50/70 to-[#CAF0F8]/50 border-rose-500/50 shadow-rose-500/10 text-slate-900"
              } dark:bg-gradient-to-br dark:from-[#0B1A2B] dark:to-[#10243A] dark:border-[#263B50] dark:shadow-black/30`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`p-2 rounded-xl flex items-center justify-center shrink-0 ${
                    huidResult.isValidFormat
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/30"
                      : "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  }`}
                >
                  {huidResult.isValidFormat ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5" />
                  )}
                </span>
                <div>
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-0.5 ${
                      huidResult.isValidFormat
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    {huidResult.isValidFormat
                      ? t("hallmarking.format_valid", "Valid 6-Character HUID Format")
                      : t("hallmarking.format_invalid", "Invalid Format")}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-[#F1F5F9] leading-tight">
                    {huidResult.explanation}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#07111F]/70 border border-[#ADE8F4] dark:border-[#263B50] space-y-2 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0077B6] dark:bg-[#16A9D8]" />
                    {t(
                      "hallmarking.verify_howto",
                      "How to verify this on BIS Care App:",
                    )}
                  </h4>
                  <ul className="space-y-1.5 text-slate-700 dark:text-[#A8B6C7] leading-relaxed">
                    {huidResult.howToVerifyOnBisCare.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#0077B6] font-bold dark:text-[#16A9D8] shrink-0">
                          {idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/90 dark:bg-[#07111F]/70 border border-[#ADE8F4] dark:border-[#263B50] space-y-2 shadow-xs">
                  <h4 className="font-bold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {t(
                      "hallmarking.verify_safety",
                      "Consumer Safety & Rights Tips:",
                    )}
                  </h4>
                  <ul className="space-y-1.5 text-slate-700 dark:text-[#A8B6C7] leading-relaxed">
                    {huidResult.consumerSafetyTips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold dark:text-emerald-400 shrink-0">
                          •
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Purity Fineness Grades Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-[#F1F5F9]">
            {t(
              "hallmarking.grades_title",
              "Official Gold & Silver Fineness Grades (IS 1417 & IS 2112)",
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guidance.purityGrades.map((grade, idx) => (
              <HallmarkingCard key={idx} purity={grade} />
            ))}
          </div>
        </div>

        {/* Compensation Policy Banner */}
        <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] text-[#0B1F3A] dark:text-[#EAF2F8] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#0057A8] dark:text-[#16A9D8] font-bold text-sm">
              <Scale className="w-4 h-4 text-[#0057A8] dark:text-[#16A9D8]" />
              {t("hallmarking.comp_badge","Statutory 2X Compensation Policy")}
            </div>
            <h3 className="text-lg font-bold text-[#0B1F3A] dark:text-[#EAF2F8]">
              {t("hallmarking.comp_title","Consumer Protection Guarantee")}
            </h3>
            <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] max-w-2xl leading-relaxed">
              {guidance.compensationPolicy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

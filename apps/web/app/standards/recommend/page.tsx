"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ProductProfileQuery,
  ProductRecommendationResult,
} from "@bis/shared-types";
import { apiClient } from "@bis/api-client";
import { RecommendationCard, LoadingState, EmptyState } from "@bis/ui";
import {
  Compass,
  Sparkles,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { SampleFormData } from "@/lib/sample";

export default function FindMyStandardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProductProfileQuery>({
    productName: "",
    material: "",
    intendedApplication: "",
    industry: "",
    capacity: "",
    technicalCharacteristics: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ProductRecommendationResult | null>(
    null,
  );

  const runEvaluation = async (payload: ProductProfileQuery) => {
    if (!payload.productName.trim()) return;

    setIsLoading(true);
    try {
      const res = await apiClient.recommendStandards(payload);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await runEvaluation(formData);
  };

  const handleLoadSample = async () => {
    setFormData(SampleFormData);
    await runEvaluation(SampleFormData);
  };

  const handleClear = () => {
    setFormData({
      productName: "",
      material: "",
      intendedApplication: "",
      industry: "",
      capacity: "",
      technicalCharacteristics: "",
    });
    setResult(null);
  };

  const handleSelectMatch = (match: any) => {
    router.push(
      `/certification?std=${encodeURIComponent(match.standard.standardNumber)}&product=${encodeURIComponent(formData.productName)}`,
    );
  };

  const handleViewTesting = (stdNumber: string) => {
    router.push(`/testing?std=${encodeURIComponent(stdNumber)}`);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-[#CAF0F8]/40 to-[#ADE8F4]/30 dark:from-slate-950 dark:via-[#03045E]/20 dark:to-[#03045E]/40 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#90E0EF]/35 dark:bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#ADE8F4]/45 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#CAF0F8]/55 dark:bg-[#03045E]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8 relative z-10">
        {/* Header Banner */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#03045E] via-[#023E8A] to-[#0077B6] text-white shadow-xl shadow-[#03045E]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden border border-[#0077B6]/30">
          <div className="absolute -top-12 -right-12 w-80 h-80 bg-[#00B4D8]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-2 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0077B6]/40 border border-[#48CAE4]/40 text-[#CAF0F8] text-xs font-semibold backdrop-blur-sm">
              <Compass className="w-3.5 h-3.5 text-[#48CAE4]" />
              <span>AI Product Scope Profiler</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Find Applicable{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CAF0F8] via-[#48CAE4] to-[#00B4D8]">
                Indian Standard
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#ADE8F4]/90 max-w-xl leading-relaxed">
              Input your product specifications, raw materials, and intended
              application. Our semantic engine matches your product against
              published Indian Standards with exact matching criteria and missing
              attribute prompts.
            </p>
          </div>

          <div className="relative z-10 p-4 rounded-2xl bg-[#03045E]/70 border border-[#0077B6]/50 text-xs text-[#CAF0F8] max-w-xs space-y-1.5 backdrop-blur-md shadow-inner">
            <div className="font-bold flex items-center justify-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-[#48CAE4]" />
              <span>Anti-Speculation Standard</span>
            </div>
            <p className="text-[11px] text-[#ADE8F4]/90 text-center leading-relaxed">
              Semantic similarity is presented as <em>potentially applicable</em>.
              Always verify final grade classification against statutory QCOs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-5 bg-white/95 dark:bg-slate-900/90 backdrop-blur-md p-6 rounded-2xl border border-[#ADE8F4] dark:border-slate-800 shadow-md shadow-[#0077B6]/5 space-y-5">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Product Specification Form
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Provide as many details as possible for precise standard matching.
              </p>
            </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Product Name / Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.productName ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                placeholder="e.g. Stainless steel water bottle, PVC insulated cable, TMT bar"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Raw Material Composition
              </label>
              <input
                type="text"
                value={formData.material ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
                placeholder="e.g. SS 304, Aluminium alloy, High density polyethylene"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Intended Application / Usage
              </label>
              <input
                type="text"
                value={formData.intendedApplication ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    intendedApplication: e.target.value,
                  })
                }
                placeholder="e.g. Drinking water storage, building construction, underground cabling"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Industry / Domain Sector
              </label>
              <input
                type="text"
                value={formData.industry ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                placeholder="e.g. Metallurgical, Food & Agriculture, Civil, Electrical"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Capacity / Size
              </label>
              <input
                type="text"
                value={formData.capacity ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                placeholder="e.g. 750 ml / 1000 ml double wall, 1.1kV, 12mm"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Technical Specifications
              </label>
              <textarea
                rows={3}
                value={formData.technicalCharacteristics ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technicalCharacteristics: e.target.value,
                  })
                }
                placeholder="e.g. Voltage rating 1.1kV, double wall vacuum insulation, diameter 12mm Fe 500D"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#0077B6] focus:border-[#023E8A]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] hover:from-[#03045E] hover:to-[#023E8A] text-white shadow-md shadow-[#0077B6]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>Evaluate Applicable Standards</span>
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClear}
                disabled={isLoading}
                className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* Right Results */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Evaluated Indian Standards{" "}
              {result ? `(${result.totalMatches})` : ""}
            </h2>
            {result && (
              <span className="text-xs text-slate-500 font-medium">
                Grounded Assessment Completed
              </span>
            )}
          </div>

          {isLoading ? (
            <LoadingState
              message="Evaluating Product-to-Standard Scope..."
              submessage="Scanning Gazette notifications, sectional committee divisions, and material grade parameters..."
            />
          ) : result && result.matches.length > 0 ? (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>{result.guidanceNotes}</span>
              </div>

              {result.matches.map((match, idx) => (
                <RecommendationCard
                  key={idx}
                  match={match}
                  onSelect={handleSelectMatch}
                  onViewTesting={handleViewTesting}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Profile Evaluated Yet"
              description="Fill in the product specification attributes on the left and click 'Evaluate Applicable Standards' to generate matched Indian Standards with clause citations."
              icon={Compass}
              actionLabel="Run Sample Evaluation (SS Water Bottle)"
              onAction={handleLoadSample}
            />
          )}
        </div>
      </div>
    </div>
  </div>
);
}

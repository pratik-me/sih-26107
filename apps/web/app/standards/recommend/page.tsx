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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName.trim()) return;

    setIsLoading(true);
    try {
      const res = await apiClient.recommendStandards(formData);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Find Applicable Indian Standard
          </h1>
          <p className="text-xs text-blue-200 max-w-xl">
            Input your product specifications, raw materials, and intended
            application. Our semantic engine matches your product against
            published Indian Standards with exact matching criteria and missing
            attribute prompts.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-blue-800/60 border border-blue-700 text-xs text-blue-100 max-w-xs space-y-1">
          <div className="font-bold flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Anti-Speculation Standard</span>
          </div>
          <p className="text-[11px] text-blue-200 text-center">
            Semantic similarity is presented as <em>potentially applicable</em>.
            Always verify final grade classification against statutory QCOs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Product Specification Form
            </h2>
            <p className="text-xs text-slate-500">
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
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                placeholder="e.g. Stainless steel water bottle, PVC insulated cable, TMT bar"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Raw Material Composition
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
                placeholder="e.g. Austenitic SS 304, Copper conductor with PVC, Portland clinker"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Intended Application / Sector
              </label>
              <input
                type="text"
                value={formData.intendedApplication}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    intendedApplication: e.target.value,
                  })
                }
                placeholder="e.g. Potable water storage, domestic electrification, structural building"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Industry Division
              </label>
              <input
                type="text"
                value={formData.industry}
                onChange={(e) =>
                  setFormData({ ...formData, industry: e.target.value })
                }
                placeholder="e.g. Utensils, Civil Engineering, Electrotechnical, Food"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Technical Specifications & Capacity
              </label>
              <textarea
                rows={3}
                value={formData.technicalCharacteristics}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    technicalCharacteristics: e.target.value,
                  })
                }
                placeholder="e.g. Voltage rating 1.1kV, double wall vacuum insulation, diameter 12mm Fe 500D"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Evaluate Applicable Standards</span>
            </button>
          </form>
        </div>

        {/* Right Results (7 cols) */}
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
              onAction={handleSubmit as any}
            />
          )}
        </div>
      </div>
    </div>
  );
}

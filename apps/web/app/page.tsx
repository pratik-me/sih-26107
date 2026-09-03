"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@bis/shared-types";
import { AshokaMotif, ModeSelector } from "@bis/ui";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  FlaskConical,
  Building2,
  CheckCircle2,
  FileCheck2,
  Scale,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMode, setCurrentMode] = useState<UserRole>(UserRole.INDUSTRY);

  const suggestedPrompts = [
    "I manufacture stainless steel water bottles. Which standard applies?",
    "Do I need BIS certification for Lithium-ion power banks?",
    "What tests are required for TMT steel bars under IS 1786?",
    "How do I verify a 22K gold jewellery hallmark with 6-digit HUID?",
    "How can I check whether an ISI mark on bottled water is genuine?",
    "Explain IS 10500 Clause 4.2 TDS limits in simple language",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/chat?q=${encodeURIComponent(searchQuery.trim())}&role=${currentMode}`,
      );
    }
  };

  const handlePromptClick = (prompt: string) => {
    router.push(`/chat?q=${encodeURIComponent(prompt)}&role=${currentMode}`);
  };

  return (
    <div className="flex flex-col min-h-full bg-ashoka-pattern">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-4xl mx-auto">
          Your AI Assistant for{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 dark:from-blue-400 dark:to-indigo-300">
            Indian Standards & BIS Services
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Find the right standard. Understand certification schemes. Verify
          hallmarking and test clauses with evidence-backed, zero-hallucination
          AI.
        </p>

        {/* User Mode Selector */}
        <div className="mt-8 max-w-3xl mx-auto text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Select Your Profile Mode:
            </span>
          </div>
          <ModeSelector
            currentMode={currentMode}
            onModeChange={setCurrentMode}
          />
        </div>

        {/* Central Search Box */}
        <form onSubmit={handleSearchSubmit} className="mt-8 max-w-3xl mx-auto">
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:border-blue-500 focus-within:border-blue-600 transition-all p-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask about Indian Standards, certification, testing, hallmarking, or clauses..."
              className="w-full px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white shadow transition-all shrink-0"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Suggested Prompts */}
        <div className="mt-6 max-w-3xl mx-auto text-left">
          <span className="text-xs font-semibold text-slate-500 block mb-2">
            Suggested queries:
          </span>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptClick(prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 bg-white dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Comprehensive Bureau of Indian Standards Intelligence
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Structured modules for manufacturers, compliance officers,
              consumers, and research scholars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Link
              href="/standards/recommend"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-fit mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Find My Standard Workflow
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Step-by-step product profiler matching your product's material,
                intended application, and specifications to applicable Indian
                Standards with relevance metrics.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Start Profiler →
              </span>
            </Link>

            {/* Card 2 */}
            <Link
              href="/certification"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 w-fit mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Certification Schemes & Roadmap
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC),
                and FMCS. Understand timelines, documentation checklists, and
                factory audit rules.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Explore Schemes →
              </span>
            </Link>

            {/* Card 3 */}
            <Link
              href="/testing"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 w-fit mb-4">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Testing Requirements & Clauses
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Detailed acceptance criteria, sampling rules, testing
                frequencies, and required testing equipment directly cited from
                Indian Standards.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Inspect Test Schedules →
              </span>
            </Link>

            {/* Card 4 */}
            <Link
              href="/laboratories"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 w-fit mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                BIS Recognized Laboratories Finder
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Filter recognized NABL and BIS testing facilities by Indian
                Standard number, product category, test capability, state, and
                city.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Locate Accredited Lab →
              </span>
            </Link>

            {/* Card 5 */}
            <Link
              href="/hallmarking"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 w-fit mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Gold & Silver Hallmarking Assistant
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Understand 22K (916), 18K (750), and 14K (585) purity. Verify
                6-digit alphanumeric HUID codes and locate recognized Assaying &
                Hallmarking Centres.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Hallmarking Guidance →
              </span>
            </Link>

            {/* Card 6 */}
            <Link
              href="/consumer"
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div className="p-3 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 w-fit mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">
                Consumer Protection & ISI Check
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Verify genuine ISI Mark CM/L licence numbers, spot counterfeit
                marks with our visual checklist, and learn grievance redressal
                steps.
              </p>
              <span className="mt-4 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Consumer Hub →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* "How it Works" Architecture Pipeline */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            How BIS IntelliGuide Works
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Strict adherence to{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              "Retrieve First → Reason Second → Cite Everything"
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {[
            {
              step: "1",
              title: "Ask Query",
              desc: "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
              icon: Search,
            },
            {
              step: "2",
              title: "Retrieve",
              desc: "Hybrid BM25 + Vector semantic search across BIS repository.",
              icon: BookOpen,
            },
            {
              step: "3",
              title: "Verify",
              desc: "Cross-encoder reranking & source freshness verification.",
              icon: ShieldCheck,
            },
            {
              step: "4",
              title: "Explain",
              desc: "Clear plain-language guidance distinguished from statutory clauses.",
              icon: FileCheck2,
            },
            {
              step: "5",
              title: "Cite",
              desc: "Every claim traceable to standard number, clause, page, and link.",
              icon: Scale,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2 shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Grounding Guarantee Section */}
      <section className="py-12 bg-slate-900 text-white px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <ShieldCheck className="w-5 h-5" />
              <span>Zero Hallucination Operational Standard</span>
            </div>
            <h3 className="text-2xl font-bold">
              Trusted by MSMEs, Compliance Teams & Citizens
            </h3>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              BIS IntelliGuide never invents Indian Standard numbers, test
              clauses, or lab recognition statuses. If official evidence is not
              available in the database, the system will explicitly state that
              the requirement cannot be verified.
            </p>
          </div>
          <Link
            href="/chat"
            className="px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition-all shrink-0"
          >
            Launch AI Workspace →
          </Link>
        </div>
      </section>
    </div>
  );
}

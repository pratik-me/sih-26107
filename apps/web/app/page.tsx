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

  const modeData: Record<
    UserRole,
    {
      label: string;
      placeholder: string;
      accentBadge: string;
      prompts: string[];
    }
  > = {
    [UserRole.INDUSTRY]: {
      label: "Industry / MSME",
      placeholder: "Ask about product standards, Scheme I/CRS certification, lab testing, or clauses...",
      accentBadge: "text-[#023E8A] dark:text-[#90E0EF] bg-[#CAF0F8]/80 dark:bg-[#03045E]/60 border-[#ADE8F4] dark:border-[#023E8A]",
      prompts: [
        "I manufacture stainless steel water bottles. Which standard applies?",
        "Do I need BIS certification for Lithium-ion power banks?",
        "What tests are required for TMT steel bars under IS 1786?",
        "What is the factory audit and sample testing process for Scheme-I?",
        "FMCS guidelines for foreign manufacturers exporting to India",
        "Required lab testing equipment for IS 302 electrical appliances",
      ],
    },
    [UserRole.CONSUMER]: {
      label: "Consumer",
      placeholder: "Check gold hallmark HUID, verify ISI mark authenticity, consumer grievance...",
      accentBadge: "text-[#0077B6] dark:text-[#48CAE4] bg-[#ADE8F4]/60 dark:bg-[#023E8A]/50 border-[#90E0EF] dark:border-[#0077B6]",
      prompts: [
        "How do I verify a gold jewellery hallmark with 6-digit HUID?",
        "How can I check whether an ISI mark on packaged water is genuine?",
        "How to file a consumer grievance against defective ISI certified goods?",
        "Differenciate between BIS Hallmark and 916 purity mark.",
        "Is BIS registration mandatory for smart phones?",
        "How to verify R-number on electronics under CRS scheme?",
      ],
    },
    [UserRole.STUDENT_RESEARCHER]: {
      label: "Student / Researcher",
      placeholder: "Search standard clauses, comparative analysis, test formulas, or NBC codes...",
      accentBadge: "text-[#0096C7] dark:text-[#CAF0F8] bg-[#90E0EF]/50 dark:bg-[#0077B6]/40 border-[#48CAE4] dark:border-[#0096C7]",
      prompts: [
        "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
        "Comparative analysis between IS 456 standards and Eurocode 2",
        "What are the latest amendments to NBC 2016?",
        "Search technical clauses for tensile and elongation requirements in IS 2062",
        "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
        "Standard testing methods for cement compressive strength under IS 4031",
      ],
    },
    [UserRole.ADMIN]: {
      label: "Admin & Regulatory",
      placeholder: "Search standards, schemes, reports, or administrative guidelines...",
      accentBadge: "text-[#03045E] dark:text-[#ADE8F4] bg-[#CAF0F8]/50 dark:bg-slate-800 border-[#ADE8F4] dark:border-slate-700",
      prompts: [
        "What are the active Quality Control Orders (QCOs) in effect?",
        "Audit compliance checklist for BIS recognized testing laboratories",
        "Standards revision roadmap and committee review process",
      ],
    },
  };

  const currentModeConfig =
    modeData[currentMode] || modeData[UserRole.INDUSTRY];

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
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03045E] via-[#0077B6] to-[#00B4D8] dark:from-[#90E0EF] dark:via-[#48CAE4] dark:to-[#00B4D8]">
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
          <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-lg hover:border-[#0077B6] focus-within:border-[#023E8A] transition-all p-2">
            <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              suppressHydrationWarning
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={currentModeConfig.placeholder}
              className="w-full px-3 py-2 text-sm sm:text-base text-slate-900 dark:text-slate-100 bg-transparent focus:outline-none placeholder:text-slate-400 transition-all"
            />
            <button
              type="submit"
              suppressHydrationWarning
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] hover:from-[#03045E] hover:to-[#023E8A] text-white shadow-md shadow-[#0077B6]/25 transition-all shrink-0 cursor-pointer"
            >
              <span>Ask AI</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Suggested Prompts */}
        <div className="mt-6 max-w-3xl mx-auto text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              Suggested queries for:
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${currentModeConfig.accentBadge} transition-all duration-300`}
              >
                {currentModeConfig.label}
              </span>
            </span>
          </div>
          <div
            key={currentMode}
            className="flex flex-wrap gap-2 transition-all duration-300"
          >
            {currentModeConfig.prompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                suppressHydrationWarning
                onClick={() => handlePromptClick(prompt)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-[#00B4D8] text-slate-700 dark:text-slate-300 hover:text-[#0077B6] dark:hover:text-[#48CAE4] hover:bg-[#CAF0F8]/20 transition-all duration-200 text-left hover:-translate-y-0.5 hover:shadow-xs cursor-pointer"
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
            {[
              {
                href: "/standards/recommend",
                title: "Find My Standard Workflow",
                badge: "AI Profiler",
                tag: "Product Matching",
                desc: "Step-by-step product profiler matching your product's material, intended application, and specifications to applicable Indian Standards with relevance metrics.",
                action: "Start Profiler →",
                icon: Compass,
                iconBg: "bg-gradient-to-br from-[#03045E] to-[#023E8A]",
                ring: "ring-[#0077B6]/30",
                bar: "from-[#03045E] via-[#023E8A] to-[#0077B6]",
                dot: "bg-[#023E8A]",
                badgeStyle:
                  "border-[#023E8A]/30 bg-[#CAF0F8]/70 text-[#023E8A] dark:bg-[#03045E]/60 dark:text-[#90E0EF]",
              },
              {
                href: "/certification",
                title: "Certification Schemes & Roadmap",
                badge: "ISI & CRS",
                tag: "Audit & FMCS",
                desc: "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC), and FMCS. Understand timelines, documentation checklists, and factory audit rules.",
                action: "Explore Schemes →",
                icon: Award,
                iconBg: "bg-gradient-to-br from-[#023E8A] to-[#0077B6]",
                ring: "ring-[#0096C7]/30",
                bar: "from-[#023E8A] via-[#0077B6] to-[#0096C7]",
                dot: "bg-[#0077B6]",
                badgeStyle:
                  "border-[#0077B6]/30 bg-[#ADE8F4]/60 text-[#0077B6] dark:bg-[#023E8A]/60 dark:text-[#90E0EF]",
              },
              {
                href: "/testing",
                title: "Testing Requirements & Clauses",
                badge: "Clauses",
                tag: "Sampling Schedules",
                desc: "Detailed acceptance criteria, sampling rules, testing frequencies, and required testing equipment directly cited from Indian Standards.",
                action: "Inspect Test Schedules →",
                icon: FlaskConical,
                iconBg: "bg-gradient-to-br from-[#0077B6] to-[#0096C7]",
                ring: "ring-[#00B4D8]/30",
                bar: "from-[#0077B6] via-[#0096C7] to-[#00B4D8]",
                dot: "bg-[#0096C7]",
                badgeStyle:
                  "border-[#0096C7]/30 bg-[#90E0EF]/60 text-[#0077B6] dark:bg-[#0077B6]/50 dark:text-[#CAF0F8]",
              },
              {
                href: "/laboratories",
                title: "BIS Recognized Laboratories Finder",
                badge: "Lab Network",
                tag: "NABL & BIS Facilities",
                desc: "Filter recognized NABL and BIS testing facilities by Indian Standard number, product category, test capability, state, and city.",
                action: "Locate Accredited Lab →",
                icon: Building2,
                iconBg: "bg-gradient-to-br from-[#0096C7] to-[#00B4D8]",
                ring: "ring-[#48CAE4]/30",
                bar: "from-[#0096C7] via-[#00B4D8] to-[#48CAE4]",
                dot: "bg-[#00B4D8]",
                badgeStyle:
                  "border-[#00B4D8]/30 bg-[#CAF0F8]/70 text-[#0096C7] dark:bg-[#0096C7]/50 dark:text-[#ADE8F4]",
              },
              {
                href: "/hallmarking",
                title: "Gold & Silver Hallmarking Assistant",
                badge: "HUID Check",
                tag: "Purity & Assaying",
                desc: "Understand 22K (916), 18K (750), and 14K (585) purity. Verify 6-digit alphanumeric HUID codes and locate recognized Assaying & Hallmarking Centres.",
                action: "Hallmarking Guidance →",
                icon: Sparkles,
                iconBg: "bg-gradient-to-br from-[#00B4D8] to-[#48CAE4]",
                ring: "ring-[#90E0EF]/40",
                bar: "from-[#00B4D8] via-[#48CAE4] to-[#90E0EF]",
                dot: "bg-[#48CAE4]",
                badgeStyle:
                  "border-[#00B4D8]/40 bg-[#ADE8F4]/60 text-[#0077B6] dark:bg-[#00B4D8]/40 dark:text-white",
              },
              {
                href: "/consumer",
                title: "Consumer Protection & ISI Check",
                badge: "Verify & Report",
                tag: "Grievance Redressal",
                desc: "Verify genuine ISI Mark CM/L licence numbers, spot counterfeit marks with our visual checklist, and learn grievance redressal steps.",
                action: "Consumer Hub →",
                icon: ShieldCheck,
                iconBg: "bg-gradient-to-br from-[#03045E] to-[#0077B6]",
                ring: "ring-[#0077B6]/30",
                bar: "from-[#03045E] via-[#0077B6] to-[#00B4D8]",
                dot: "bg-[#0077B6]",
                badgeStyle:
                  "border-[#023E8A]/30 bg-[#CAF0F8]/70 text-[#023E8A] dark:bg-[#023E8A]/60 dark:text-[#90E0EF]",
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="group relative p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-900/90 shadow-sm hover:shadow-xl hover:shadow-[#023E8A]/12 hover:border-[#023E8A] dark:hover:border-[#0077B6] hover:bg-gradient-to-br hover:from-[#CAF0F8]/50 hover:via-white hover:to-[#ADE8F4]/30 dark:hover:from-[#03045E]/30 dark:hover:via-[#023E8A]/15 dark:hover:to-slate-900 hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Glowing Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />

                  <div>
                    {/* Top Row: Icon + Title + Status Pill Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`p-2.5 rounded-xl ${card.iconBg} text-white shadow-md shadow-[#023E8A]/20 ring-2 ${card.ring} group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#023E8A] dark:group-hover:text-[#48CAE4] transition-colors leading-snug">
                          {card.title}
                        </h3>
                      </div>
                      <span
                        className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs transition-all duration-300 shrink-0 ${card.badgeStyle} group-hover:scale-105`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 pl-0.5">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Divider: Category Tag + Action CTA */}
                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-400 flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${card.dot} transition-transform duration-300 group-hover:scale-125`}
                      />
                      {card.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#0077B6] dark:text-[#48CAE4] group-hover:text-[#023E8A] dark:group-hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-all duration-200">
                      {card.action}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* "How it Works" Architecture Pipeline */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
            How BIS Saarthi Works
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
              BIS Saarthi never invents Indian Standard numbers, test
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

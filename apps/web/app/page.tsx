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
import { useTranslation } from "@/lib/i18n";

export default function LandingPage() {
  const router = useRouter();
  const { t } = useTranslation();
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
      label: t("home.mode_industry", "Industry / MSME"),
      placeholder: t(
        "hero.search_placeholder",
        "Ask about product standards, Scheme I/CRS certification, lab testing, or clauses...",
      ),
      accentBadge:
        "text-[#023E8A] dark:text-[#90E0EF] bg-[#CAF0F8]/80 dark:bg-[#03045E]/60 border-[#ADE8F4] dark:border-[#023E8A]",
      prompts: [
        t(
          "prompts.industry.1",
          "I manufacture stainless steel water bottles. Which standard applies?",
        ),
        t(
          "prompts.industry.2",
          "Do I need BIS certification for Lithium-ion power banks?",
        ),
        t(
          "prompts.industry.3",
          "What tests are required for TMT steel bars under IS 1786?",
        ),
        t(
          "prompts.industry.4",
          "What is the factory audit and sample testing process for Scheme-I?",
        ),
        t(
          "prompts.industry.5",
          "FMCS guidelines for foreign manufacturers exporting to India",
        ),
        t(
          "prompts.industry.6",
          "Required lab testing equipment for IS 302 electrical appliances",
        ),
      ],
    },
    [UserRole.CONSUMER]: {
      label: t("home.mode_consumer", "Consumer"),
      placeholder: t(
        "home.mode_consumer_placeholder",
        "Check gold hallmark HUID, verify ISI mark authenticity, consumer grievance...",
      ),
      accentBadge:
        "text-[#0077B6] dark:text-[#48CAE4] bg-[#ADE8F4]/60 dark:bg-[#023E8A]/50 border-[#90E0EF] dark:border-[#0077B6]",
      prompts: [
        t(
          "prompts.consumer.1",
          "How do I verify a gold jewellery hallmark with 6-digit HUID?",
        ),
        t(
          "prompts.consumer.2",
          "How can I check whether an ISI mark on packaged water is genuine?",
        ),
        t(
          "prompts.consumer.3",
          "How to file a consumer grievance against defective ISI certified goods?",
        ),
        t(
          "prompts.consumer.4",
          "Difference between BIS Hallmark and 916 purity mark.",
        ),
        t(
          "prompts.consumer.5",
          "Is BIS registration mandatory for smart phones?",
        ),
        t(
          "prompts.consumer.6",
          "How to verify R-number on electronics under CRS scheme?",
        ),
      ],
    },
    [UserRole.STUDENT_RESEARCHER]: {
      label: t("home.mode_student", "Student / Researcher"),
      placeholder: t(
        "home.mode_student_placeholder",
        "Search standard clauses, comparative analysis, test formulas, or NBC codes...",
      ),
      accentBadge:
        "text-[#0096C7] dark:text-[#CAF0F8] bg-[#90E0EF]/50 dark:bg-[#0077B6]/40 border-[#48CAE4] dark:border-[#0096C7]",
      prompts: [
        t(
          "prompts.student.1",
          "Explain IS 10500 Clause 4.2 drinking water TDS & heavy metal limits",
        ),
        t(
          "prompts.student.2",
          "Comparative analysis between IS 456 standards and Eurocode 2",
        ),
        t("prompts.student.3", "What are the latest amendments to NBC 2016?"),
        t(
          "prompts.student.4",
          "Search technical clauses for tensile and elongation requirements in IS 2062",
        ),
        t(
          "prompts.student.5",
          "Evolution of energy efficiency and BEE star rating test protocols in IS 1391",
        ),
        t(
          "prompts.student.6",
          "Standard testing methods for cement compressive strength under IS 4031",
        ),
      ],
    },
    [UserRole.ADMIN]: {
      label: t("home.mode_admin", "Admin & Regulatory"),
      placeholder: t(
        "home.mode_admin_placeholder",
        "Search standards, schemes, reports, or administrative guidelines...",
      ),
      accentBadge:
        "text-[#03045E] dark:text-[#ADE8F4] bg-[#CAF0F8]/50 dark:bg-slate-800 border-[#ADE8F4] dark:border-slate-700",
      prompts: [
        t(
          "prompts.admin.1",
          "What are the active Quality Control Orders (QCOs) in effect?",
        ),
        t(
          "prompts.admin.2",
          "Audit compliance checklist for BIS recognized testing laboratories",
        ),
        t(
          "prompts.admin.3",
          "Standards revision roadmap and committee review process",
        ),
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
    } else {
      router.push(`/chat?role=${currentMode}`);
    }
  };

  const handlePromptClick = (prompt: string) => {
    router.push(`/chat?q=${encodeURIComponent(prompt)}&role=${currentMode}`);
  };

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section with White-to-Blue Gradient */}
      <section className="relative w-full bg-gradient-to-b from-white via-[#CAF0F8]/50 to-[#ADE8F4]/60 dark:from-slate-950 dark:via-[#03045E]/20 dark:to-[#03045E]/40 overflow-hidden">
        {/* Ambient Light Blue Glows concentrated towards bottom */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#90E0EF]/35 dark:bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#ADE8F4]/45 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#CAF0F8]/55 dark:bg-[#03045E]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-4xl mx-auto">
            {t(
              "hero.title",
              "Your AI Assistant for Indian Standards & BIS Services",
            )}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {t(
              "hero.subtitle",
              "Find the right standard. Understand certification schemes. Verify hallmarking and test clauses with evidence-backed, zero-hallucination AI.",
            )}
          </p>

          {/* User Mode Selector */}
          <div className="mt-8 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("hero.select_profile", "SELECT YOUR PROFILE MODE:")}
              </span>
            </div>
            <ModeSelector
              currentMode={currentMode}
              onModeChange={setCurrentMode}
            />
          </div>

          {/* Central Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-8 max-w-3xl mx-auto"
          >
            <div className="relative flex items-center bg-white/95 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl border-2 border-[#ADE8F4] dark:border-slate-700 shadow-xl shadow-[#0077B6]/10 hover:border-[#0077B6] focus-within:border-[#023E8A] transition-all p-2">
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
                <span>{t("hero.ask_ai_btn", "Ask AI")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Prompts */}
          <div className="mt-6 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                {t("hero.suggested_queries", "Suggested queries for:")}
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
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-800/80 backdrop-blur-xs border border-[#ADE8F4] dark:border-slate-700 hover:border-[#00B4D8] text-slate-700 dark:text-slate-300 hover:text-[#0077B6] dark:hover:text-[#48CAE4] hover:bg-[#CAF0F8]/40 transition-all duration-200 text-left hover:-translate-y-0.5 hover:shadow-xs cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="relative py-20 bg-gradient-to-b from-[#03045E] via-[#023E8A] to-[#03045E] border-y border-[#0077B6]/30 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Glowing Blobs / Backdrop Effects */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-0 right-10 w-80 h-80 bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          {/* Header Box with Badge and Animated Typography */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t(
                "home.features_title",
                "Comprehensive Bureau of Indian Standards Intelligence",
              )}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#ADE8F4]/90 max-w-2xl mx-auto leading-relaxed font-normal">
              {t(
                "home.features_subtitle",
                "Structured modules for manufacturers, compliance officers, consumers, and research scholars.",
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/standards/recommend",
                title: t(
                  "home.features_find_title",
                  "Find My Standard Workflow",
                ),
                badge: t("home.features_find_badge", "AI Profiler"),
                tag: t("home.features_find_tag", "Product Matching"),
                desc: t(
                  "home.features_find_desc",
                  "Step-by-step product profiler matching your product's material, intended application, and specifications to applicable Indian Standards with relevance metrics.",
                ),
                action: t("home.features_find_action", "Start Profiler →"),
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
                title: t(
                  "home.features_cert_title",
                  "Certification Schemes & Roadmap",
                ),
                badge: t("home.features_cert_badge", "ISI & CRS"),
                tag: t("home.features_cert_tag", "Audit & FMCS"),
                desc: t(
                  "home.features_cert_desc",
                  "Navigate Scheme I (ISI Mark), Scheme II (CRS), Scheme IV (CoC), and FMCS. Understand timelines, documentation checklists, and factory audit rules.",
                ),
                action: t("home.features_cert_action", "Explore Schemes →"),
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
                title: t(
                  "home.features_testing_title",
                  "Testing Requirements & Clauses",
                ),
                badge: t("home.features_testing_badge", "Clauses"),
                tag: t("home.features_testing_tag", "Sampling Schedules"),
                desc: t(
                  "home.features_testing_desc",
                  "Detailed acceptance criteria, sampling rules, testing frequencies, and required testing equipment directly cited from Indian Standards.",
                ),
                action: t(
                  "home.features_testing_action",
                  "Inspect Test Schedules →",
                ),
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
                title: t(
                  "home.features_labs_title",
                  "BIS Recognized Laboratories Finder",
                ),
                badge: t("home.features_labs_badge", "Lab Network"),
                tag: t("home.features_labs_tag", "NABL & BIS Facilities"),
                desc: t(
                  "home.features_labs_desc",
                  "Filter recognized NABL and BIS testing facilities by Indian Standard number, product category, test capability, state, and city.",
                ),
                action: t(
                  "home.features_labs_action",
                  "Locate Accredited Lab →",
                ),
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
                title: t(
                  "home.features_hallmark_title",
                  "Gold & Silver Hallmarking Assistant",
                ),
                badge: t("home.features_hallmark_badge", "HUID Check"),
                tag: t("home.features_hallmark_tag", "Purity & Assaying"),
                desc: t(
                  "home.features_hallmark_desc",
                  "Understand 22K (916), 18K (750), and 14K (585) purity. Verify 6-digit alphanumeric HUID codes and locate recognized Assaying & Hallmarking Centres.",
                ),
                action: t(
                  "home.features_hallmark_action",
                  "Hallmarking Guidance →",
                ),
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
                title: t(
                  "home.features_consumer_title",
                  "Consumer Protection & ISI Check",
                ),
                badge: t("home.features_consumer_badge", "Verify & Report"),
                tag: t("home.features_consumer_tag", "Grievance Redressal"),
                desc: t(
                  "home.features_consumer_desc",
                  "Verify genuine ISI Mark CM/L licence numbers, spot counterfeit marks with our visual checklist, and learn grievance redressal steps.",
                ),
                action: t("home.features_consumer_action", "Consumer Hub →"),
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
                  className="group relative p-5 sm:p-6 rounded-2xl border border-white/20 dark:border-slate-800/90 bg-white/95 dark:bg-slate-900/90 shadow-md hover:shadow-2xl hover:shadow-[#00B4D8]/20 hover:border-[#48CAE4] dark:hover:border-[#0077B6] hover:bg-gradient-to-br hover:from-white hover:via-[#CAF0F8]/30 hover:to-[#ADE8F4]/20 dark:hover:from-[#03045E]/40 dark:hover:via-[#023E8A]/20 dark:hover:to-slate-900 hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden flex flex-col justify-between cursor-pointer backdrop-blur-sm"
                >
                  {/* Top Glowing Accent Line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300`}
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
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0077B6] dark:group-hover:text-[#48CAE4] transition-colors leading-snug">
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
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
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

      {/* "How it Works" Architecture Pipeline with Light Blue Shade Backdrop */}
      <section className="relative py-20 bg-gradient-to-b from-[#CAF0F8]/50 via-[#ADE8F4]/25 to-[#CAF0F8]/40 dark:from-[#03045E]/30 dark:via-[#023E8A]/15 dark:to-[#03045E]/30 border-y border-[#ADE8F4] dark:border-slate-800 px-4 sm:px-6 w-full overflow-hidden">
        {/* Ambient Light Blue Glowing Blobs */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#90E0EF]/30 dark:bg-[#0077B6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#48CAE4]/20 dark:bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#03045E]/60 text-[#023E8A] dark:text-[#90E0EF] text-xs font-bold mb-3.5 border border-[#ADE8F4] dark:border-[#0077B6]/30 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#48CAE4]" />
              <span>
                {t("home.how_badge", "Architecture & Verification Pipeline")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t("home.how_title", "How BIS Saarthi Works")}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
              {t("home.how_subtitle_prefix", "Strict adherence to")}{" "}
              <span className="font-bold text-[#0077B6] dark:text-[#48CAE4]">
                {t(
                  "home.how_subtitle_bold",
                  '"Retrieve First → Reason Second → Cite Everything"',
                )}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: t("home.how_step1_title", "Ask Query"),
                desc: t(
                  "home.how_step1_desc",
                  "Query in English, Hindi, or any of 22 Scheduled Indian Languages.",
                ),
                icon: Search,
              },
              {
                step: "2",
                title: t("home.how_step2_title", "Retrieve"),
                desc: t(
                  "home.how_step2_desc",
                  "Hybrid BM25 + Vector semantic search across BIS repository.",
                ),
                icon: BookOpen,
              },
              {
                step: "3",
                title: t("home.how_step3_title", "Verify"),
                desc: t(
                  "home.how_step3_desc",
                  "Cross-encoder reranking & source freshness verification.",
                ),
                icon: ShieldCheck,
              },
              {
                step: "4",
                title: t("home.how_step4_title", "Explain"),
                desc: t(
                  "home.how_step4_desc",
                  "Clear plain-language guidance distinguished from statutory clauses.",
                ),
                icon: FileCheck2,
              },
              {
                step: "5",
                title: t("home.how_step5_title", "Cite"),
                desc: t(
                  "home.how_step5_desc",
                  "Every claim traceable to standard number, clause, page, and link.",
                ),
                icon: Scale,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="group p-5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-[#ADE8F4] dark:border-slate-800 text-center space-y-3 shadow-sm hover:shadow-xl hover:shadow-[#0077B6]/15 hover:border-[#00B4D8] dark:hover:border-[#0077B6] hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#023E8A] via-[#0077B6] to-[#0096C7] text-white font-black text-xs flex items-center justify-center mx-auto shadow-sm shadow-[#0077B6]/30 group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-[#0077B6] dark:group-hover:text-[#48CAE4] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Grounding Guarantee Section */}
      <section className="py-14 bg-gradient-to-r from-[#03045E] via-[#023E8A] to-[#0077B6] text-white px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#48CAE4] font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#90E0EF]" />
              <span className="tracking-wide">
                {t(
                  "home.trust_badge",
                  "Zero Hallucination Operational Standard",
                )}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t(
                "home.trust_title",
                "Trusted by MSMEs, Compliance Teams & Citizens",
              )}
            </h3>
            <p className="text-xs sm:text-sm text-[#CAF0F8]/90 max-w-xl leading-relaxed">
              {t(
                "home.trust_desc",
                "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses. If official evidence is not available in the database, the system will explicitly state that the requirement cannot be verified.",
              )}
            </p>
          </div>
          <Link
            href="/chat"
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#0096C7] via-[#00B4D8] to-[#48CAE4] hover:from-[#0077B6] hover:to-[#00B4D8] text-slate-950 hover:text-white shadow-lg shadow-[#03045E]/40 transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            {t("home.trust_action", "Launch AI Workspace →")}
          </Link>
        </div>
      </section>
    </div>
  );
}

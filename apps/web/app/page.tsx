"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@bis/shared-types";
import { ModeSelector } from "@bis/ui";
import { useLanguage } from "../context/LanguageContext";
import {
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Award,
  FlaskConical,
  Building2,
  FileCheck2,
  Scale,
  Compass,
} from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const { language, t, dictionary } = useLanguage();
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
      label: dictionary.modes.industry.label,
      placeholder: dictionary.modes.industry.placeholder,
      accentBadge:
        "text-[#023E8A] dark:text-[#90E0EF] bg-[#CAF0F8]/80 dark:bg-[#03045E]/60 border-[#ADE8F4] dark:border-[#023E8A]",
      prompts: dictionary.modes.industry.prompts,
    },
    [UserRole.CONSUMER]: {
      label: dictionary.modes.consumer.label,
      placeholder: dictionary.modes.consumer.placeholder,
      accentBadge:
        "text-[#0077B6] dark:text-[#48CAE4] bg-[#ADE8F4]/60 dark:bg-[#023E8A]/50 border-[#90E0EF] dark:border-[#0077B6]",
      prompts: dictionary.modes.consumer.prompts,
    },
    [UserRole.STUDENT_RESEARCHER]: {
      label: dictionary.modes.student.label,
      placeholder: dictionary.modes.student.placeholder,
      accentBadge:
        "text-[#0096C7] dark:text-[#CAF0F8] bg-[#90E0EF]/50 dark:bg-[#0077B6]/40 border-[#48CAE4] dark:border-[#0096C7]",
      prompts: dictionary.modes.student.prompts,
    },
    [UserRole.ADMIN]: {
      label: dictionary.modes.admin.label,
      placeholder: dictionary.modes.admin.placeholder,
      accentBadge:
        "text-[#03045E] dark:text-[#ADE8F4] bg-[#CAF0F8]/50 dark:bg-slate-800 border-[#ADE8F4] dark:border-slate-700",
      prompts: dictionary.modes.admin.prompts,
    },
  };

  const currentModeConfig =
    modeData[currentMode] || modeData[UserRole.INDUSTRY];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/chat?q=${encodeURIComponent(searchQuery.trim())}&role=${currentMode}&lang=${language}`,
      );
    }
  };

  const handlePromptClick = (prompt: string) => {
    router.push(`/chat?q=${encodeURIComponent(prompt)}&role=${currentMode}&lang=${language}`);
  };

  return (
    <div className="flex flex-col min-h-full">
      <section className="relative w-full bg-gradient-to-b from-white via-[#CAF0F8]/50 to-[#ADE8F4]/60 dark:from-slate-950 dark:via-[#03045E]/20 dark:to-[#03045E]/40 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[320px] bg-[#90E0EF]/35 dark:bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-[#ADE8F4]/45 dark:bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[#CAF0F8]/55 dark:bg-[#03045E]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight max-w-4xl mx-auto">
            {t("hero.headline", "Your AI Assistant for")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03045E] via-[#0077B6] to-[#00B4D8] dark:from-[#90E0EF] dark:via-[#48CAE4] dark:to-[#00B4D8]">
              {t("hero.headlineHighlight", "Indian Standards & BIS Services")}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            {t("hero.subheadline", "Find the right standard. Understand certification schemes. Verify hallmarking and test clauses with evidence-backed, zero-hallucination AI.")}
          </p>

          <div className="mt-8 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                {t("hero.selectProfileMode", "Select Your Profile Mode:")}
              </span>
            </div>
            <ModeSelector
              currentMode={currentMode}
              onModeChange={setCurrentMode}
            />
          </div>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="mt-8 max-w-3xl mx-auto">
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
                <span>{t("hero.askAiButton", "Ask AI")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Queries */}
          <div className="mt-6 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                {t("hero.suggestedQueriesFor", "Suggested queries for:")}
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${currentModeConfig.accentBadge} transition-all duration-300`}
                >
                  {currentModeConfig.label}
                </span>
              </span>
            </div>
            <div
              key={`${currentMode}-${language}`}
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
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00B4D8]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-0 right-10 w-80 h-80 bg-[#0077B6]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#48CAE4]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {t("features.sectionTitlePrefix", "Comprehensive")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CAF0F8] via-[#48CAE4] to-[#00B4D8] drop-shadow-sm">
                {t("features.sectionTitleHighlight", "Bureau of Indian Standards")}
              </span>{" "}
              {t("features.sectionTitleSuffix", "Intelligence")}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#ADE8F4]/90 max-w-2xl mx-auto leading-relaxed font-normal">
              {t("features.sectionSubtitle", "Structured modules for manufacturers, compliance officers, consumers, and research scholars.")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: "/standards/recommend",
                title: dictionary.features.cards.findStandard.title,
                badge: dictionary.features.cards.findStandard.badge,
                tag: dictionary.features.cards.findStandard.tag,
                desc: dictionary.features.cards.findStandard.desc,
                action: dictionary.features.cards.findStandard.action,
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
                title: dictionary.features.cards.certification.title,
                badge: dictionary.features.cards.certification.badge,
                tag: dictionary.features.cards.certification.tag,
                desc: dictionary.features.cards.certification.desc,
                action: dictionary.features.cards.certification.action,
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
                title: dictionary.features.cards.testing.title,
                badge: dictionary.features.cards.testing.badge,
                tag: dictionary.features.cards.testing.tag,
                desc: dictionary.features.cards.testing.desc,
                action: dictionary.features.cards.testing.action,
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
                title: dictionary.features.cards.labs.title,
                badge: dictionary.features.cards.labs.badge,
                tag: dictionary.features.cards.labs.tag,
                desc: dictionary.features.cards.labs.desc,
                action: dictionary.features.cards.labs.action,
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
                title: dictionary.features.cards.hallmarking.title,
                badge: dictionary.features.cards.hallmarking.badge,
                tag: dictionary.features.cards.hallmarking.tag,
                desc: dictionary.features.cards.hallmarking.desc,
                action: dictionary.features.cards.hallmarking.action,
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
                title: dictionary.features.cards.consumer.title,
                badge: dictionary.features.cards.consumer.badge,
                tag: dictionary.features.cards.consumer.tag,
                desc: dictionary.features.cards.consumer.desc,
                action: dictionary.features.cards.consumer.action,
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
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.bar} opacity-70 group-hover:opacity-100 group-hover:h-1.5 transition-all duration-300`}
                  />

                  <div>
                    {/* Top Row */}
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

                  {/* Bottom Divider */}
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

      {/* "How it Works" Pipeline */}
      <section className="relative py-20 bg-gradient-to-b from-[#CAF0F8]/50 via-[#ADE8F4]/25 to-[#CAF0F8]/40 dark:from-[#03045E]/30 dark:via-[#023E8A]/15 dark:to-[#03045E]/30 border-y border-[#ADE8F4] dark:border-slate-800 px-4 sm:px-6 w-full overflow-hidden">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#90E0EF]/30 dark:bg-[#0077B6]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#48CAE4]/20 dark:bg-[#00B4D8]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#03045E]/60 text-[#023E8A] dark:text-[#90E0EF] text-xs font-bold mb-3.5 border border-[#ADE8F4] dark:border-[#0077B6]/30 shadow-xs backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#48CAE4]" />
              <span>{t("pipeline.badge", "Architecture & Verification Pipeline")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              {t("pipeline.title", "How BIS Saarthi Works")}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
              {t("pipeline.subtitle", "Strict adherence to")}{" "}
              <span className="font-bold text-[#0077B6] dark:text-[#48CAE4]">
                "{t("pipeline.motto", "Retrieve First → Reason Second → Cite Everything")}"
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              {
                step: "1",
                title: dictionary.pipeline.steps.s1.title,
                desc: dictionary.pipeline.steps.s1.desc,
                icon: Search,
              },
              {
                step: "2",
                title: dictionary.pipeline.steps.s2.title,
                desc: dictionary.pipeline.steps.s2.desc,
                icon: BookOpen,
              },
              {
                step: "3",
                title: dictionary.pipeline.steps.s3.title,
                desc: dictionary.pipeline.steps.s3.desc,
                icon: ShieldCheck,
              },
              {
                step: "4",
                title: dictionary.pipeline.steps.s4.title,
                desc: dictionary.pipeline.steps.s4.desc,
                icon: FileCheck2,
              },
              {
                step: "5",
                title: dictionary.pipeline.steps.s5.title,
                desc: dictionary.pipeline.steps.s5.desc,
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
              <span className="tracking-wide">{t("trustBanner.tag", "Zero Hallucination Operational Standard")}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {t("trustBanner.title", "Trusted by MSMEs, Compliance Teams & Citizens")}
            </h3>
            <p className="text-xs sm:text-sm text-[#CAF0F8]/90 max-w-xl leading-relaxed">
              {t("trustBanner.desc", "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses. If official evidence is not available in the database, the system will explicitly state that the requirement cannot be verified.")}
            </p>
          </div>
          <Link
            href="/chat"
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#0096C7] via-[#00B4D8] to-[#48CAE4] hover:from-[#0077B6] hover:to-[#00B4D8] text-slate-950 hover:text-white shadow-lg shadow-[#03045E]/40 transition-all shrink-0 hover:scale-105 active:scale-95"
          >
            {t("trustBanner.cta", "Launch AI Workspace →")}
          </Link>
        </div>
      </section>
    </div>
  );
}


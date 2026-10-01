"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@bis/shared-types";
import { ModeSelector } from "@bis/ui";
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
        "text-white bg-gradient-to-r from-[#023E8A] to-[#0077B6] border border-[#023E8A]/50 shadow-xs shadow-[#023E8A]/20",
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
        "text-white bg-gradient-to-r from-[#0077B6] to-[#0096C7] border border-[#0077B6]/50 shadow-xs shadow-[#0077B6]/20",
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
        "text-white bg-gradient-to-r from-[#0096C7] to-[#023E8A] border border-[#0096C7]/50 shadow-xs shadow-[#0096C7]/20",
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
        "text-white bg-gradient-to-r from-[#023E8A] to-[#0077B6] border border-[#023E8A]/50 shadow-xs shadow-[#023E8A]/20",
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
    <div className="relative min-h-full w-full bg-[#F7FAFC] dark:bg-[#07111F] overflow-hidden">
      {/* Subtle atmospheric glow behind hero only */}
      <div
        className="absolute top-0 left-0 right-0 h-[520px] pointer-events-none -z-10 dark:hidden"
        style={{
          background: "radial-gradient(circle at 50% 15%, #EAF6FC 0%, transparent 38%)"
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[520px] pointer-events-none -z-10 hidden dark:block"
        style={{
          background: "radial-gradient(circle at 50% 15%, rgba(22, 169, 216, 0.08) 0%, transparent 38%)"
        }}
      />

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative pt-12 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full text-center">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1F3A] dark:text-[#EAF2F8] tracking-tight leading-tight max-w-4xl mx-auto">
            <span className="block sm:inline">
              {t("hero.title_prefix", "Your AI Assistant for")}{" "}
            </span>
            <span className="text-[#0057A8] dark:text-[#16A9D8]">
              {t("hero.title_highlight", "Indian Standards & BIS Services")}
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-[#52657A] dark:text-[#AFC1D2] max-w-2xl mx-auto leading-relaxed font-medium">
            {t(
              "hero.subtitle",
              "Find the right standard. Understand certification schemes. Verify hallmarking and test clauses with evidence-backed, zero-hallucination AI.",
            )}
          </p>

          {/* User Mode Selector */}
          <div className="mt-8 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#52657A] dark:text-[#AFC1D2] uppercase tracking-wider">
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
            <div className="relative flex items-center bg-[#FFFFFF] dark:bg-[#10243A] rounded-2xl border-[1.5px] border-[#8DD5EA] dark:border-[#263B50] shadow-[0_4px_16px_rgba(14,159,206,0.08)] dark:shadow-black/25 hover:border-[#0E9FCE] dark:hover:border-[#16A9D8] focus-within:border-[#0E9FCE] dark:focus-within:border-[#16A9D8] focus-within:ring-3 focus-within:ring-[#0E9FCE]/10 transition-all p-2">
              <Search className="w-5 h-5 text-[#7A9BB5] dark:text-[#A8B6C7] ml-3 shrink-0" />
              <input
                type="text"
                suppressHydrationWarning
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={currentModeConfig.placeholder}
                className="w-full px-3 py-2 text-sm sm:text-base text-[#263B53] dark:text-[#F1F5F9] bg-transparent outline-none placeholder:text-[#8AA0B5] dark:placeholder:text-[#7F91A5] transition-all"
              />
              <button
                type="submit"
                suppressHydrationWarning
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <span>{t("hero.ask_ai_btn", "Ask AI")}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Suggested Prompts */}
          <div className="mt-6 max-w-3xl mx-auto text-left">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-[#0B1F3A] dark:text-[#AFC1D2] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0E9FCE] dark:text-[#16A9D8] shrink-0" />
                <span>{t("hero.suggested_queries", "Suggested queries for:")}</span>
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#EAF4FB] text-[#0057A8] border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50] transition-all duration-200"
                >
                  {currentModeConfig.label}
                </span>
              </span>
            </div>
            <div
              key={currentMode}
              className="flex flex-wrap gap-2 transition-all duration-200"
            >
              {currentModeConfig.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => handlePromptClick(prompt)}
                  className="group text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] hover:border-[#B9DDED] dark:hover:border-[#16A9D8] text-[#263B53] dark:text-[#AFC1D2] hover:text-[#0057A8] dark:hover:text-[#FFFFFF] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47] shadow-[0_2px_8px_rgba(11,31,58,0.04)] hover:shadow-sm transition-all duration-150 text-left hover:-translate-y-0.5 cursor-pointer flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0057A8]/40 group-hover:bg-[#0057A8] dark:group-hover:bg-[#16A9D8] transition-colors shrink-0" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="relative py-16 px-4 sm:px-6 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Header Box with Badge and Typography */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1F3A] dark:text-white tracking-tight leading-tight">
              {t(
                "home.features_title",
                "Comprehensive Bureau of Indian Standards Intelligence",
              )}
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#52657A] dark:text-[#AFC1D2] max-w-2xl mx-auto leading-relaxed font-normal">
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
              },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <Link
                  key={idx}
                  href={card.href}
                  className="group relative p-5 sm:p-6 rounded-2xl border border-[#D8E3EE] dark:border-[#263B50] bg-[#FFFFFF] dark:bg-[#10243A] shadow-[0_4px_16px_rgba(11,31,58,0.06)] dark:shadow-black/25 hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] dark:hover:shadow-black/50 hover:border-[#B9DDED] dark:hover:border-[#16A9D8] hover:bg-[#F1F7FC]/50 dark:hover:bg-[#153653] hover:-translate-y-1 transition-all duration-200 ease-out overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  {/* Top Glowing Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 bg-[#0057A8] dark:bg-[#16A9D8] opacity-70 group-hover:opacity-100 transition-all duration-200"
                  />

                  <div>
                    {/* Top Row: Icon + Title + Status Pill Badge */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="p-2.5 rounded-xl bg-[#EAF6FC] dark:bg-[#153653] text-[#0057A8] dark:text-[#16A9D8] shadow-xs group-hover:scale-105 transition-all duration-200 shrink-0"
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#0B1F3A] dark:text-[#F1F5F9] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors leading-snug">
                          {card.title}
                        </h3>
                      </div>
                      <span
                        className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs transition-all duration-200 shrink-0 bg-[#F0F8FD] text-[#0057A8] border-[#B9DDED] dark:bg-[#153653] dark:text-[#16A9D8] dark:border-[#263B50]"
                      >
                        {card.badge}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed line-clamp-3 pl-0.5">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom Divider: Category Tag + Action CTA */}
                  <div className="mt-5 pt-3 border-t border-[#D8E3EE] dark:border-[#263B50] flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7A8CA0] dark:text-[#7F91A5] flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#0057A8] dark:bg-[#16A9D8] transition-transform duration-200 group-hover:scale-125"
                      />
                      {card.tag}
                    </span>
                    <span className="text-xs font-semibold text-[#0057A8] dark:text-[#16A9D8] group-hover:text-[#004783] dark:group-hover:text-[#FFFFFF] flex items-center gap-1 group-hover:translate-x-1 transition-all duration-150">
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
      <section className="relative py-16 px-4 sm:px-6 w-full overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#10243A] text-[#0057A8] dark:text-[#16A9D8] text-xs font-bold mb-3.5 border border-[#D8E3EE] dark:border-[#263B50] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0E9FCE] dark:text-[#16A9D8]" />
              <span>
                {t("home.how_badge", "Architecture & Verification Pipeline")}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B1F3A] dark:text-[#F1F5F9] tracking-tight">
              {t("home.how_title", "How BIS Saarthi Works")}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#52657A] dark:text-[#AFC1D2] font-medium">
              {t("home.how_subtitle_prefix", "Strict adherence to")}{" "}
              <span className="font-bold text-[#0057A8] dark:text-[#16A9D8]">
                &quot;Retrieve First → Reason Second → Cite Everything&quot;
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
              return (
                <div
                  key={item.step}
                  className="group p-5 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] text-center space-y-3 shadow-[0_4px_16px_rgba(11,31,58,0.06)] hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] hover:border-[#B9DDED] dark:hover:border-[#16A9D8] dark:hover:bg-[#153653] hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-full bg-[#0057A8] dark:bg-[#1268B3] text-white font-black text-xs flex items-center justify-center mx-auto shadow-xs group-hover:scale-105 transition-transform">
                    {item.step}
                  </div>
                  <h4 className="text-sm font-bold text-[#0B1F3A] dark:text-[#F1F5F9] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust & Grounding Guarantee Section */}
      <section className="py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="relative max-w-5xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_8px_24px_rgba(11,31,58,0.08)] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#0057A8] dark:text-[#16A9D8] font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#0077B6] dark:text-[#16A9D8]" />
              <span className="tracking-wide">
                {t(
                  "home.trust_badge",
                  "Zero Hallucination Operational Standard",
                )}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B1F3A] dark:text-[#F1F5F9] tracking-tight">
              {t(
                "home.trust_title",
                "Trusted by MSMEs, Compliance Teams & Citizens",
              )}
            </h3>
            <p className="text-xs sm:text-sm text-[#52657A] dark:text-[#AFC1D2] max-w-xl leading-relaxed">
              {t(
                "home.trust_desc",
                "BIS Saarthi never invents Indian Standard numbers, test clauses, or lab recognition statuses. If official evidence is not available in the database, the system will explicitly state that the requirement cannot be verified.",
              )}
            </p>
          </div>
          <Link
            href="/chat"
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm transition-all shrink-0 hover:scale-102 active:scale-98"
          >
            {t("home.trust_action", "Launch AI Workspace →")}
          </Link>
        </div>
      </section>
    </div>
  );
}

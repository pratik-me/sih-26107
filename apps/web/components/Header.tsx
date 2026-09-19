"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@bis/ui";
import { useTranslation } from "@/lib/i18n";
import {
  MessageSquare,
  Search,
  Award,
  FlaskConical,
  Building2,
  Sparkles,
  ShieldCheck,
  FileBarChart2,
  Menu,
  X,
  Compass,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const { t, language: selectedLanguage, setLanguage: setSelectedLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [standardsDropdownOpen, setStandardsDropdownOpen] = useState(false);
  const [mobileStandardsOpen, setMobileStandardsOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep the dropdown open while the cursor travels from the trigger
  // to the menu. A small close delay + a padding bridge (no margin gap)
  // prevents the flicker/accidental-close on mouseleave.
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openStandardsMenu = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
    setStandardsDropdownOpen(true);
  };

  const scheduleCloseStandardsMenu = (delay = 150) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    closeTimeout.current = setTimeout(() => {
      setStandardsDropdownOpen(false);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) clearTimeout(closeTimeout.current);
    };
  }, []);

  const isStandardsActive =
    pathname === "/standards" || pathname === "/standards/recommend";

  const otherNavLinks = [
    { href: "/certification", label: t("nav.certification", "Certification"), icon: Award },
    { href: "/testing", label: t("nav.testing", "Testing"), icon: FlaskConical },
    { href: "/laboratories", label: t("nav.labs", "Labs"), icon: Building2 },
    { href: "/hallmarking", label: t("nav.hallmark", "Hallmark"), icon: Sparkles },
    { href: "/consumer", label: t("nav.consumer", "Consumer"), icon: ShieldCheck },
    { href: "/reports", label: t("nav.reports", "Reports"), icon: FileBarChart2 },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#07111F]/85 backdrop-saturate-180 ${
        isScrolled
          ? "bg-white/80 dark:bg-[#07111F]/90 border-b border-slate-200/80 dark:border-[#263B50] shadow-sm shadow-[#0077B6]/5"
          : "bg-white/60 dark:bg-[#07111F]/75 border-b border-slate-200/40 dark:border-[#263B50]/60"
      }`}
    >
      {/* Main Nav Bar */}
      <div className="max-w-[1520px] mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group mr-1"
          >
            <div className="hidden sm:flex flex-col items-center gap-y-1">
              <div className="flex items-center gap-1">
                <div className="shrink-0">
                  <Image
                    src={"/BIS-LOGO.png"}
                    alt="BIS-LOGO"
                    height={34}
                    width={34}
                    priority
                  />
                </div>
                <span className="text-sm font-black tracking-tight text-slate-900 dark:text-[#F1F5F9] whitespace-nowrap">
                  BIS{" "}
                  <span className="text-[#0077B6] dark:text-[#16A9D8] font-extrabold">
                    Saarthi
                  </span>
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-[#7F91A5] font-medium leading-none whitespace-nowrap">
                {t("header.subtitle", "Indian Standards Intelligence")}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 flex-nowrap">
            {/* Standards Dropdown Heading */}
            <div
              className="relative"
              onMouseEnter={openStandardsMenu}
              onMouseLeave={() => scheduleCloseStandardsMenu()}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={standardsDropdownOpen}
                onClick={() => {
                  if (standardsDropdownOpen) {
                    if (closeTimeout.current) {
                      clearTimeout(closeTimeout.current);
                      closeTimeout.current = null;
                    }
                    setStandardsDropdownOpen(false);
                  } else {
                    openStandardsMenu();
                  }
                }}
                onFocus={openStandardsMenu}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setStandardsDropdownOpen(false);
                }}
                className={`group inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isStandardsActive
                    ? "bg-gradient-to-r from-[#CAF0F8] to-[#ADE8F4]/70 dark:from-[#10243A] dark:to-[#153653] text-[#023E8A] dark:text-[#16A9D8] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/50 shadow-xs"
                    : "text-slate-700 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#F1F5F9] hover:bg-[#CAF0F8] dark:hover:bg-[#153653]"
                }`}
              >
                <Search
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    isStandardsActive
                      ? "text-[#0077B6] dark:text-[#16A9D8]"
                      : "text-slate-500 dark:text-[#A8B6C7] group-hover:text-[#0077B6] dark:group-hover:text-[#16A9D8]"
                  }`}
                />
                <span>{t("nav.standards", "Standards")}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    standardsDropdownOpen
                      ? "rotate-180 text-[#0077B6] dark:text-[#16A9D8]"
                      : isStandardsActive
                      ? "text-[#0077B6] dark:text-[#16A9D8]"
                      : "text-slate-400 dark:text-[#7F91A5] group-hover:text-[#0077B6] dark:group-hover:text-[#16A9D8]"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {standardsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-2xl border border-[#ADE8F4] dark:border-[#263B50] bg-white/95 dark:bg-[#10243A] backdrop-blur-xl shadow-xl shadow-[#0077B6]/10 dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_8px_10px_-6px_rgba(0,0,0,0.4)] p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/standards/recommend"
                    onClick={() => setStandardsDropdownOpen(false)}
                    className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                      pathname === "/standards/recommend"
                        ? "bg-gradient-to-r from-[#CAF0F8] to-[#ADE8F4]/60 dark:from-[#153653] dark:to-[#153653] text-[#023E8A] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8] shadow-2xs"
                        : "text-slate-700 dark:text-[#F1F5F9] hover:bg-[#CAF0F8] dark:hover:bg-[#153653] hover:text-[#0077B6] dark:hover:text-[#F1F5F9]"
                    }`}
                  >
                    <span
                      className={`p-2 rounded-lg shrink-0 transition-all ${
                        pathname === "/standards/recommend"
                          ? "bg-white dark:bg-[#153653] text-[#0077B6] dark:text-[#16A9D8] shadow-xs"
                          : "bg-[#CAF0F8]/50 dark:bg-[#153653] text-[#0077B6] dark:text-[#16A9D8] group-hover:scale-110"
                      }`}
                    >
                      <Compass className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-snug text-slate-900 dark:text-[#F1F5F9] group-hover:text-[#0077B6] dark:group-hover:text-[#F1F5F9]">
                        {t("nav.find_standard", "Find Your Standards")}
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 ${
                          pathname === "/standards/recommend"
                            ? "text-[#023E8A]/80 dark:text-[#A8B6C7] font-normal"
                            : "text-slate-500 dark:text-[#A8B6C7] dark:group-hover:text-[#A8B6C7]"
                        }`}
                      >
                        {t("header.find_standard_desc", "AI product profiler matching your product to IS")}
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/standards"
                    onClick={() => setStandardsDropdownOpen(false)}
                    className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 mt-1 ${
                      pathname === "/standards"
                        ? "bg-gradient-to-r from-[#CAF0F8] to-[#ADE8F4]/60 dark:from-[#153653] dark:to-[#153653] text-[#023E8A] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8] shadow-2xs"
                        : "text-slate-700 dark:text-[#F1F5F9] hover:bg-[#CAF0F8] dark:hover:bg-[#153653] hover:text-[#0077B6] dark:hover:text-[#F1F5F9]"
                    }`}
                  >
                    <span
                      className={`p-2 rounded-lg shrink-0 transition-all ${
                        pathname === "/standards"
                          ? "bg-white dark:bg-[#153653] text-[#0077B6] dark:text-[#16A9D8] shadow-xs"
                          : "bg-[#CAF0F8]/50 dark:bg-[#153653] text-[#0077B6] dark:text-[#16A9D8] group-hover:scale-110"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-snug text-slate-900 dark:text-[#F1F5F9] group-hover:text-[#0077B6] dark:group-hover:text-[#F1F5F9]">
                        {t("nav.catalogue", "Standards Catalogue")}
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 ${
                          pathname === "/standards"
                            ? "text-[#023E8A]/80 dark:text-[#A8B6C7] font-normal"
                            : "text-slate-500 dark:text-[#A8B6C7] dark:group-hover:text-[#A8B6C7]"
                        }`}
                      >
                        {t("header.catalogue_desc", "Search and explore Indian Standards catalogue")}
                      </p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Remaining Nav Links */}
            {otherNavLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#CAF0F8] to-[#ADE8F4]/70 dark:from-[#10243A] dark:to-[#153653] text-[#023E8A] dark:text-[#16A9D8] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/50 shadow-xs"
                      : "text-slate-700 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#F1F5F9] hover:bg-[#CAF0F8] dark:hover:bg-[#153653]"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive
                        ? "text-[#0077B6] dark:text-[#16A9D8]"
                        : "text-slate-500 dark:text-[#A8B6C7] group-hover:text-[#0077B6] dark:group-hover:text-[#16A9D8]"
                    }`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ml-1">
            <LanguageSelector
              onDashboard={true}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />

            <ThemeToggle />

            {/* Action Button & Mobile Toggle */}
            <div className="flex items-center gap-2">
              <Link
                href="/chat"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-[#023E8A] to-[#0077B6] hover:from-[#0077B6] hover:to-[#023E8A] dark:from-[#1268B3] dark:to-[#1583D1] dark:hover:from-[#1583D1] dark:hover:to-[#16A9D8] text-white shadow-sm shadow-[#0077B6]/25 dark:shadow-[#1268B3]/25 transition-all whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("nav.ask_bis_ai", "Ask BIS AI")}</span>
                <span className="sm:hidden">{t("nav.ask_ai", "Ask AI")}</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-[#A8B6C7] hover:bg-slate-100 dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-[#263B50] bg-white dark:bg-[#10243A] px-4 pt-2 pb-4 space-y-1 shadow-lg dark:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5),0_8px_10px_-6px_rgba(0,0,0,0.4)]">
          {/* Mobile Standards Dropdown Accordion */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setMobileStandardsOpen(!mobileStandardsOpen)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isStandardsActive
                  ? "bg-[#CAF0F8]/80 text-[#023E8A] dark:bg-[#153653] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/50"
                  : "text-slate-700 dark:text-[#F1F5F9] hover:bg-[#CAF0F8] dark:hover:bg-[#153653]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#0077B6] dark:text-[#16A9D8]" />
                <span>{t("nav.standards", "Standards")}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileStandardsOpen ? "rotate-180 text-[#0077B6] dark:text-[#16A9D8]" : "text-slate-400 dark:text-[#A8B6C7]"
                }`}
              />
            </button>
            {mobileStandardsOpen && (
              <div className="pl-6 pt-1 pb-1 space-y-1">
                <Link
                  href="/standards/recommend"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    pathname === "/standards/recommend"
                      ? "bg-[#CAF0F8] text-[#023E8A] dark:bg-[#153653] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/50"
                      : "text-slate-600 dark:text-[#A8B6C7] hover:bg-[#CAF0F8] hover:text-[#0077B6] dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#16A9D8]" />
                  <span>{t("nav.find_standard", "Find Your Standards")}</span>
                </Link>
                <Link
                  href="/standards"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    pathname === "/standards"
                      ? "bg-[#CAF0F8] text-[#023E8A] dark:bg-[#153653] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/50"
                      : "text-slate-600 dark:text-[#A8B6C7] hover:bg-[#CAF0F8] hover:text-[#0077B6] dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]"
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-[#0077B6] dark:text-[#16A9D8]" />
                  <span>{t("nav.catalogue", "Standards Catalogue")}</span>
                </Link>
              </div>
            )}
          </div>

          {otherNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#CAF0F8]/80 text-[#023E8A] dark:bg-[#153653] dark:text-[#F1F5F9] font-bold border border-[#ADE8F4] dark:border-[#16A9D8]/40"
                    : "text-slate-700 dark:text-[#A8B6C7] hover:bg-[#CAF0F8] hover:text-[#0077B6] dark:hover:bg-[#153653] dark:hover:text-[#F1F5F9]"
                }`}
              >
                <Icon className="w-4 h-4 text-[#0077B6] dark:text-[#16A9D8]" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 pb-1 flex items-center justify-between border-t border-slate-200 dark:border-[#263B50]">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#A8B6C7]">
              {t("chat.language_label", "Language:")}
            </span>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={(lang) => {
                setSelectedLanguage(lang);
                setMobileMenuOpen(false);
              }}
            />
          </div>

          <div className="pt-2 pb-1 flex items-center justify-between border-t border-slate-200 dark:border-[#263B50]">
            <span className="text-xs font-semibold text-slate-500 dark:text-[#A8B6C7]">
              Theme:
            </span>
            <ThemeToggle showLabel={true} />
          </div>

          <div className="pt-2">
            <Link
              href="/chat"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-[#023E8A] to-[#0077B6] hover:from-[#0077B6] hover:to-[#023E8A] dark:from-[#1268B3] dark:to-[#1583D1] text-white shadow-sm shadow-[#0077B6]/25 dark:shadow-[#1268B3]/25"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t("nav.ask_bis_ai", "Ask BIS AI")}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

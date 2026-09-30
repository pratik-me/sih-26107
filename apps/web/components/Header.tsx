"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSelector } from "@bis/ui";
import { useTranslation } from "@/lib/i18n";
import {
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
  LayoutDashboard,
  LogIn,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";
import { isAuthenticated, clearAuthToken } from "@/lib/auth";

export function Header() {
  const pathname = usePathname();
  const { t, language: selectedLanguage, setLanguage: setSelectedLanguage } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [standardsDropdownOpen, setStandardsDropdownOpen] = useState(false);
  const [mobileStandardsOpen, setMobileStandardsOpen] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = () => {
    setIsLoggedIn(isAuthenticated());
  };

  const handleLogout = () => {
    clearAuthToken();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    checkAuth();

    window.addEventListener("storage", checkAuth);
    window.addEventListener("focus", checkAuth);
    window.addEventListener("auth-change", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("focus", checkAuth);
      window.removeEventListener("auth-change", checkAuth);
    };
  }, [pathname]);

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
      className={`sticky top-0 z-50 transition-colors duration-200 backdrop-blur-xl ${
        isScrolled
          ? "bg-white/95 dark:bg-[#07111F]/95 border-b border-[#E2EAF1] dark:border-[#263B50] shadow-sm shadow-[#0B1F3A]/5"
          : "bg-white/95 dark:bg-[#07111F]/95 border-b border-[#E2EAF1] dark:border-[#263B50]/60"
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
                <span className="text-sm font-black tracking-tight text-[#0B1F3A] dark:text-[#F1F5F9] whitespace-nowrap">
                  BIS{" "}
                  <span className="text-[#0057A8] dark:text-[#16A9D8] font-extrabold">
                    Saarthi
                  </span>
                </span>
              </div>
              <p className="text-[10px] text-[#52657A] dark:text-[#8299AD] font-medium leading-none whitespace-nowrap">
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
                className={`group inline-flex items-center gap-1 xl:gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isStandardsActive
                    ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50] shadow-2xs"
                    : "text-[#263B53] dark:text-[#AFC1D2] hover:text-[#0057A8] dark:hover:text-[#FFFFFF] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47]"
                }`}
              >
                <Search
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    isStandardsActive
                      ? "text-[#0057A8] dark:text-[#16A9D8]"
                      : "text-[#526B83] dark:text-[#AFC1D2] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8]"
                  }`}
                />
                <span>{t("nav.standards", "Standards")}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    standardsDropdownOpen
                      ? "rotate-180 text-[#0057A8] dark:text-[#16A9D8]"
                      : isStandardsActive
                      ? "text-[#0057A8] dark:text-[#16A9D8]"
                      : "text-[#526B83] dark:text-[#AFC1D2] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8]"
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {standardsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 rounded-xl border border-[#D8E3EE] dark:border-[#263B50] bg-[#FFFFFF] dark:bg-[#10243A] backdrop-blur-xl shadow-[0_12px_30px_rgba(11,31,58,0.12)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)] p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link
                    href="/standards/recommend"
                    onClick={() => setStandardsDropdownOpen(false)}
                    className={`group flex items-start gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                      pathname === "/standards/recommend"
                        ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50] shadow-2xs"
                        : "text-[#263B53] dark:text-[#EAF2F8] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47] hover:text-[#0057A8] dark:hover:text-[#FFFFFF]"
                    }`}
                  >
                    <span
                      className={`p-2 rounded-lg shrink-0 transition-all ${
                        pathname === "/standards/recommend"
                          ? "bg-white dark:bg-[#153653] text-[#0057A8] dark:text-[#16A9D8] shadow-xs"
                          : "bg-[#EAF6FC] dark:bg-[#153653] text-[#0057A8] dark:text-[#16A9D8] group-hover:scale-105"
                      }`}
                    >
                      <Compass className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-snug text-[#0B1F3A] dark:text-[#F1F5F9] group-hover:text-[#0057A8] dark:group-hover:text-[#FFFFFF]">
                        {t("nav.find_standard", "Find Your Standards")}
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 ${
                          pathname === "/standards/recommend"
                            ? "text-[#52657A] dark:text-[#AFC1D2] font-normal"
                            : "text-[#7A8CA0] dark:text-[#AFC1D2]"
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
                        ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50] shadow-2xs"
                        : "text-[#263B53] dark:text-[#EAF2F8] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47] hover:text-[#0057A8] dark:hover:text-[#FFFFFF]"
                    }`}
                  >
                    <span
                      className={`p-2 rounded-lg shrink-0 transition-all ${
                        pathname === "/standards"
                          ? "bg-white dark:bg-[#153653] text-[#0057A8] dark:text-[#16A9D8] shadow-xs"
                          : "bg-[#EAF6FC] dark:bg-[#153653] text-[#0057A8] dark:text-[#16A9D8] group-hover:scale-105"
                      }`}
                    >
                      <Search className="w-4 h-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-snug text-[#0B1F3A] dark:text-[#F1F5F9] group-hover:text-[#0057A8] dark:group-hover:text-[#FFFFFF]">
                        {t("nav.catalogue", "Standards Catalogue")}
                      </div>
                      <p
                        className={`text-[11px] leading-tight mt-0.5 ${
                          pathname === "/standards"
                            ? "text-[#52657A] dark:text-[#AFC1D2] font-normal"
                            : "text-[#7A8CA0] dark:text-[#AFC1D2]"
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
                  className={`group inline-flex items-center gap-1 xl:gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] xl:text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50] shadow-2xs"
                      : "text-[#263B53] dark:text-[#AFC1D2] hover:text-[#0057A8] dark:hover:text-[#FFFFFF] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47]"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive
                        ? "text-[#0057A8] dark:text-[#16A9D8]"
                        : "text-[#526B83] dark:text-[#AFC1D2] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8]"
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
            <div className="flex items-center gap-1.5 sm:gap-2">
              {isLoggedIn ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm transition-all whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>{t("nav.dashboard", "Dashboard")}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    title="Sign Out"
                    aria-label="Sign Out"
                    className="p-1.5 rounded-lg text-[#52657A] hover:text-[#C93636] dark:text-[#8299AD] dark:hover:text-[#EF4444] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm transition-all whitespace-nowrap"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t("nav.login", "Login")}</span>
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#263B53] dark:text-[#AFC1D2] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47] dark:hover:text-[#FFFFFF]"
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
        <div className="lg:hidden border-t border-[#E2EAF1] dark:border-[#263B50] bg-[#FFFFFF] dark:bg-[#10243A] px-4 pt-2 pb-4 space-y-1 shadow-[0_12px_30px_rgba(11,31,58,0.12)] dark:shadow-[0_12px_30px_rgba(0,0,0,0.30)]">
          {/* Mobile Standards Dropdown Accordion */}
          <div className="py-1">
            <button
              type="button"
              onClick={() => setMobileStandardsOpen(!mobileStandardsOpen)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isStandardsActive
                  ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50]"
                  : "text-[#263B53] dark:text-[#EAF2F8] hover:bg-[#F1F7FC] dark:hover:bg-[#172F47]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#0057A8] dark:text-[#16A9D8]" />
                <span>{t("nav.standards", "Standards")}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  mobileStandardsOpen ? "rotate-180 text-[#0057A8] dark:text-[#16A9D8]" : "text-[#526B83] dark:text-[#AFC1D2]"
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
                      ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50]"
                      : "text-[#52657A] dark:text-[#AFC1D2] hover:bg-[#F1F7FC] hover:text-[#0057A8] dark:hover:bg-[#172F47] dark:hover:text-[#FFFFFF]"
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
                  <span>{t("nav.find_standard", "Find Your Standards")}</span>
                </Link>
                <Link
                  href="/standards"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    pathname === "/standards"
                      ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50]"
                      : "text-[#52657A] dark:text-[#AFC1D2] hover:bg-[#F1F7FC] hover:text-[#0057A8] dark:hover:bg-[#172F47] dark:hover:text-[#FFFFFF]"
                  }`}
                >
                  <Search className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
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
                    ? "bg-[#EAF4FB] text-[#0057A8] font-bold border border-[#B9DDED] dark:bg-[#163B59] dark:text-[#16A9D8] dark:border-[#263B50]"
                    : "text-[#263B53] dark:text-[#AFC1D2] hover:bg-[#F1F7FC] hover:text-[#0057A8] dark:hover:bg-[#172F47] dark:hover:text-[#FFFFFF]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#0057A8] dark:text-[#16A9D8]" : "text-[#526B83] dark:text-[#AFC1D2]"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-3 pb-1 flex items-center justify-between border-t border-[#E2EAF1] dark:border-[#263B50]">
            <span className="text-xs font-semibold text-[#52657A] dark:text-[#AFC1D2]">
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

          <div className="pt-2 pb-1 flex items-center justify-between border-t border-[#E2EAF1] dark:border-[#263B50]">
            <span className="text-xs font-semibold text-[#52657A] dark:text-[#AFC1D2]">
              Theme:
            </span>
            <ThemeToggle showLabel={true} />
          </div>

          <div className="pt-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{t("nav.dashboard", "Dashboard")}</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-semibold text-[#C93636] dark:text-[#EF4444] bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-900/40 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg text-sm font-bold bg-[#0057A8] hover:bg-[#004783] dark:bg-[#1268B3] dark:hover:bg-[#1679C7] text-white shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>{t("nav.login", "Login")}</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

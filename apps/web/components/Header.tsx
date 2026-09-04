"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IndianLanguage, UserRole } from "@bis/shared-types";
import { AshokaMotif, LanguageSelector } from "@bis/ui";
import {
  MessageSquare,
  Search,
  Award,
  FlaskConical,
  Building2,
  Sparkles,
  ShieldCheck,
  FileBarChart2,
  BarChart3,
  Menu,
  X,
  Compass,
} from "lucide-react";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>(
    IndianLanguage.EN,
  );
  const [userRole, setUserRole] = useState<UserRole>(UserRole.INDUSTRY);

  const navLinks = [
    { href: "/chat", label: "AI Workspace", icon: MessageSquare },
    { href: "/standards/recommend", label: "Find My Standard", icon: Compass },
    { href: "/standards", label: "Standards", icon: Search },
    { href: "/certification", label: "Certification", icon: Award },
    { href: "/testing", label: "Testing", icon: FlaskConical },
    { href: "/laboratories", label: "Labs", icon: Building2 },
    { href: "/hallmarking", label: "Hallmarking", icon: Sparkles },
    { href: "/consumer", label: "Consumer Hub", icon: ShieldCheck },
    { href: "/reports", label: "Compliance Reports", icon: FileBarChart2 },
    { href: "/dashboard", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* <AshokaMotif
                size={36}
                className="text-blue-700 dark:text-blue-500 group-hover:rotate-45 transition-transform duration-500"
              /> */}
              <Image src={"/BIS-LOGO.png"} alt='BIS-LOGO' height={36} width={36} />
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-md font-black tracking-tight text-slate-900 dark:text-slate-100">
                  BIS{" "}
                  <span className="text-blue-700 dark:text-blue-400 font-extrabold">
                    IntelliGuide
                  </span>
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Indian Standards & Services Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-5">
            {navLinks.map((link, index) => {
              const isActive =
                pathname === link.href;
              const Icon = link.icon;
              return (
                <div key={index}>
                  <Link
                    href={link.href}
                    className={`group/link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover/link:max-w-[120px] opacity-0 group-hover/link:opacity-100 transition-all duration-500">
                      {link.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSelector
              onDashboard={true}
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
            />

            {/* Action Button & Mobile Toggle */}
            <div className="gap-2.5">
              <Link
                href="/chat"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white shadow-sm transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask BIS AI</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 text-blue-600" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

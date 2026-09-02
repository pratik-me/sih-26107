'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IndianLanguage, UserRole } from '@bis/shared-types';
import { AshokaMotif, LanguageSelector } from '@bis/ui';
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
  Compass
} from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<IndianLanguage>(IndianLanguage.EN);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.INDUSTRY);

  const navLinks = [
    { href: '/chat', label: 'AI Workspace', icon: MessageSquare },
    { href: '/standards/recommend', label: 'Find My Standard', icon: Compass },
    { href: '/standards', label: 'Standards', icon: Search },
    { href: '/certification', label: 'Certification', icon: Award },
    { href: '/testing', label: 'Testing', icon: FlaskConical },
    { href: '/laboratories', label: 'Labs', icon: Building2 },
    { href: '/hallmarking', label: 'Hallmarking', icon: Sparkles },
    { href: '/consumer', label: 'Consumer Hub', icon: ShieldCheck },
    { href: '/reports', label: 'Compliance Reports', icon: FileBarChart2 },
    { href: '/dashboard', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      {/* Top Gov Banner */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-wider uppercase text-[10px]">
              Government Decision-Support Platform
            </span>
            <span className="opacity-40">|</span>
            <span className="hidden sm:inline">Bureau of Indian Standards Knowledge Base</span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={setSelectedLanguage}
              className="text-white"
            />
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <AshokaMotif size={36} className="text-blue-700 dark:text-blue-500 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                  BIS <span className="text-blue-700 dark:text-blue-400 font-extrabold">IntelliGuide</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                  AI Gov
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-none">
                Indian Standards & Services Intelligence
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
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
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
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

"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Image src={"/BIS-LOGO.png"} alt='BIS-LOGO' height={24} width={24} />
              <span>{t("nav.title", "BIS Saarthi")}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t("footer.description", "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.")}
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t("footer.motto", "Retrieve First → Reason Second → Cite Everything")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("footer.bisPortals", "BIS Portals")}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  <span>{t("footer.eBisPortal", "e-BIS Portal")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  <span>{t("footer.manakonline", "Manakonline (Scheme I)")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  <span>{t("footer.crsPortal", "CRS Portal (Electronics)")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://nabl-india.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white inline-flex items-center gap-1"
                >
                  <span>{t("footer.nablDirectory", "NABL Directory")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("footer.coreModules", "Core Modules")}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/standards/recommend" className="hover:text-white">
                  {t("footer.findMyStandard", "Find My Standard")}
                </Link>
              </li>
              <li>
                <Link href="/certification" className="hover:text-white">
                  {t("footer.certificationSchemes", "Certification Schemes")}
                </Link>
              </li>
              <li>
                <Link href="/testing" className="hover:text-white">
                  {t("footer.testingRequirements", "Testing Requirements")}
                </Link>
              </li>
              <li>
                <Link href="/laboratories" className="hover:text-white">
                  {t("footer.recognizedLabs", "Recognized Labs Finder")}
                </Link>
              </li>
              <li>
                <Link href="/hallmarking" className="hover:text-white">
                  {t("footer.hallmarking", "Gold & Silver Hallmarking")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              {t("footer.legalNotice", "Legal & Quality Notice")}
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {t("footer.legalDisclaimer", "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.")}
            </p>
            <div className="pt-2">
              <Link href="/admin" className="text-[11px] text-blue-400 hover:underline">
                {t("footer.adminConsole", "Admin & Evaluation Console →")}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            {t("footer.copyright", `© ${new Date().getFullYear()} BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.`).replace("{year}", new Date().getFullYear().toString())}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/consumer" className="hover:text-slate-300">
              {t("footer.consumerGrievance", "Consumer Grievance")}
            </Link>
            <span>•</span>
            <Link href="/chat" className="hover:text-slate-300">
              {t("footer.aiSupport", "AI Decision Support")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

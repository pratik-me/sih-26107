"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-[#CAF0F8]/60 via-white to-white dark:from-[#050B14] dark:via-[#03070E] dark:to-[#02050A] text-slate-600 dark:text-[#A8B6C7] text-xs border-t border-[#0077B6]/25 dark:border-[#1E3A58] shadow-[0_-4px_20px_rgba(0,119,182,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-[#F1F5F9] font-bold text-sm">
              <Image
                src={"/BIS-LOGO.png"}
                alt="BIS-LOGO"
                height={24}
                width={24}
              />
              <span>BIS Saarthi</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#A8B6C7] leading-relaxed">
              {t(
                "footer.description",
                "AI-Powered Decision-Support Platform for Indian Standards, Certification Schemes, Laboratory Testing, and Hallmarking.",
              )}
            </p>
            <div className="flex items-center gap-1.5 text-[#0077B6] dark:text-[#16A9D8] font-medium text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>
                {t(
                  "footer.tagline",
                  "Retrieve First → Reason Second → Cite Everything",
                )}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F1F5F9]">
              {t("footer.portals_title", "BIS Portals")}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://www.services.bis.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t("footer.ebis", "e-BIS Portal")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.manakonline.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>
                    {t("footer.manakonline", "Manakonline (Scheme I)")}
                  </span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.crsbis.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t("footer.crs", "CRS Portal (Electronics)")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://nabl-india.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] inline-flex items-center gap-1 transition-colors"
                >
                  <span>{t("footer.nabl", "NABL Directory")}</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F1F5F9]">
              {t("footer.modules_title", "Core Modules")}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/standards/recommend" className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
                  {t("footer.find_standard", "Find My Standard")}
                </Link>
              </li>
              <li>
                <Link href="/certification" className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
                  {t("footer.certification", "Certification Schemes")}
                </Link>
              </li>
              <li>
                <Link href="/testing" className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
                  {t("footer.testing", "Testing Requirements")}
                </Link>
              </li>
              <li>
                <Link href="/laboratories" className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
                  {t("footer.labs", "Recognized Labs Finder")}
                </Link>
              </li>
              <li>
                <Link href="/hallmarking" className="text-slate-600 dark:text-[#A8B6C7] hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
                  {t("footer.hallmarking", "Gold & Silver Hallmarking")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F1F5F9]">
              {t("footer.legal_title", "Legal & Quality Notice")}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-[#7F91A5] leading-relaxed">
              {t(
                "footer.legal_text",
                "Information provided is grounded in published Indian Standards and Gazette notifications. Formal legal compliance requires certification grant through official BIS portals.",
              )}
            </p>
            <div className="pt-2">
              <Link
                href="/admin"
                className="text-[11px] text-[#0077B6] dark:text-[#16A9D8] font-semibold hover:underline"
              >
                {t("footer.admin_link", "Admin & Evaluation Console →")}
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-[#263B50] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 dark:text-[#7F91A5]">
          <div>
            © {new Date().getFullYear()}{" "}
            {t(
              "footer.copyright",
              "BIS Saarthi. Built for Indian Industry, MSMEs & Citizens.",
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/consumer" className="hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
              {t("footer.consumer_grievance", "Consumer Grievance")}
            </Link>
            <span>•</span>
            <Link href="/chat" className="hover:text-[#0077B6] dark:hover:text-[#16A9D8] transition-colors">
              {t("footer.ai_support", "AI Decision Support")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

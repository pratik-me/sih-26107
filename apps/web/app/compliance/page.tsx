'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Award, FlaskConical, FileBarChart2 } from 'lucide-react';

export default function CompliancePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6FC] text-[#0057A8] dark:bg-[#0B1A2B] dark:text-[#16A9D8] text-xs font-semibold border border-[#B9DDED] dark:border-[#263B50]">
          <Award className="w-3.5 h-3.5 text-[#0057A8] dark:text-[#16A9D8]" />
          <span>End-to-End Compliance Journey</span>
        </div>
        <h1 className="text-3xl font-black text-[#0B1F3A] dark:text-[#EAF2F8] tracking-tight">
          BIS Compliance Hub & Workflow
        </h1>
        <p className="text-sm text-[#52657A] dark:text-[#AFC1D2] max-w-2xl leading-relaxed">
          Complete end-to-end statutory certification workflow from standard discovery to laboratory testing and licence grant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          href="/standards/recommend"
          className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] hover:border-[#B9DDED] hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] dark:hover:border-[#16A9D8] transition-all space-y-3 group"
        >
          <div className="p-3 rounded-xl bg-[#EAF6FC] dark:bg-[#0B1A2B] text-[#0057A8] dark:text-[#16A9D8] w-fit">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-[#EAF2F8] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors">
            1. Find My Standard
          </h3>
          <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed">
            Match raw materials, application, and capacity to published Indian Standards.
          </p>
          <span className="text-xs font-semibold text-[#0057A8] dark:text-[#16A9D8] flex items-center gap-1 pt-2">
            Start Profiler →
          </span>
        </Link>

        <Link
          href="/certification"
          className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] hover:border-[#B9DDED] hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] dark:hover:border-[#16A9D8] transition-all space-y-3 group"
        >
          <div className="p-3 rounded-xl bg-[#FDF6E2] dark:bg-amber-950/40 text-[#C58A16] dark:text-amber-400 w-fit">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-[#EAF2F8] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors">
            2. Certification Schemes
          </h3>
          <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed">
            Determine whether Scheme I (ISI Mark) or Scheme II (CRS) applies.
          </p>
          <span className="text-xs font-semibold text-[#0057A8] dark:text-[#16A9D8] flex items-center gap-1 pt-2">
            View Roadmap →
          </span>
        </Link>

        <Link
          href="/testing"
          className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] hover:border-[#B9DDED] hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] dark:hover:border-[#16A9D8] transition-all space-y-3 group"
        >
          <div className="p-3 rounded-xl bg-[#EAF6FC] dark:bg-[#0B1A2B] text-[#0057A8] dark:text-[#16A9D8] w-fit">
            <FlaskConical className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-[#EAF2F8] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors">
            3. Testing Clauses
          </h3>
          <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed">
            Review routine test parameters, sampling frequencies, and equipment schedules.
          </p>
          <span className="text-xs font-semibold text-[#0057A8] dark:text-[#16A9D8] flex items-center gap-1 pt-2">
            Check Testing →
          </span>
        </Link>

        <Link
          href="/reports"
          className="p-6 rounded-2xl bg-white dark:bg-[#10243A] border border-[#D8E3EE] dark:border-[#263B50] shadow-[0_4px_16px_rgba(11,31,58,0.06)] hover:border-[#B9DDED] hover:shadow-[0_8px_24px_rgba(11,31,58,0.10)] dark:hover:border-[#16A9D8] transition-all space-y-3 group"
        >
          <div className="p-3 rounded-xl bg-[#EAF6FC] dark:bg-[#0B1A2B] text-[#0057A8] dark:text-[#16A9D8] w-fit">
            <FileBarChart2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#0B1F3A] dark:text-[#EAF2F8] group-hover:text-[#0057A8] dark:group-hover:text-[#16A9D8] transition-colors">
            4. Compliance Report
          </h3>
          <p className="text-xs text-[#52657A] dark:text-[#AFC1D2] leading-relaxed">
            Generate and export complete statutory assessment report in PDF / print format.
          </p>
          <span className="text-xs font-semibold text-[#0057A8] dark:text-[#16A9D8] flex items-center gap-1 pt-2">
            Generate Report →
          </span>
        </Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../components/Providers";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "BIS Saarthi — AI Assistant for Indian Standards & Services",
  description:
    "Evidence-backed AI decision-support platform for Indian Standards, BIS Certification, Testing Laboratories, and Hallmarking.",
  keywords:
    "BIS, Indian Standards, ISI Mark, Hallmarking, HUID, BIS Certification, Compulsory Registration Scheme, Lab Testing",
  icons: {
    icon: "/BIS-LOGO.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", GeistSans.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('bis_theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-[#07111F] dark:text-[#F1F5F9] antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

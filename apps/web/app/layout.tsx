import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import { Providers } from '../components/Providers';
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

// Split client components out of the root layout chunk so layout.tsx stays tiny.
const Header = dynamic(() => import('../components/Header').then((m) => m.Header), {
  ssr: true,
});
const Footer = dynamic(() => import('../components/Footer').then((m) => m.Footer), {
  ssr: true,
});

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BIS Saarthi — AI Assistant for Indian Standards & Services',
  description: 'Evidence-backed AI decision-support platform for Indian Standards, BIS Certification, Testing Laboratories, and Hallmarking.',
  keywords: 'BIS, Indian Standards, ISI Mark, Hallmarking, HUID, BIS Certification, Compulsory Registration Scheme, Lab Testing',
  icons: {
    icon: "/BIS-LOGO.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

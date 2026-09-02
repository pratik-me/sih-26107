import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '../components/Providers';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'BIS IntelliGuide — AI Assistant for Indian Standards & Services',
  description: 'Evidence-backed AI decision-support platform for Indian Standards, BIS Certification, Testing Laboratories, and Hallmarking.',
  keywords: 'BIS, Indian Standards, ISI Mark, Hallmarking, HUID, BIS Certification, Compulsory Registration Scheme, Lab Testing'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

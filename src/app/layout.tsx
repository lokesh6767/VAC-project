import type { Metadata } from 'next';
import '@/styles/globals.css';
import { LayoutShell } from '@/components/layout/LayoutShell';

export const metadata: Metadata = {
  title: 'AI Insight — AI Competitor Intelligence & Comparison Platform',
  description:
    'Comprehensive, verifiable competitive intelligence, reproducible rubric benchmarks, strategic SWOT, and report generation for ChatGPT, Gemini, Microsoft Copilot, and Claude.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}

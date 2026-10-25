'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, FileDown, RotateCcw, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const pathname = usePathname();
  const { resetToDefaultSeed } = useAppStore();

  // Convert pathname to readable breadcrumb segment
  const getBreadcrumbTitle = () => {
    if (pathname === '/') return 'Executive Intelligence Dashboard';
    if (pathname.startsWith('/competitors')) return 'Competitor Explorer & Profiles';
    if (pathname.startsWith('/compare')) return 'Dynamic Comparison Workspace';
    if (pathname.startsWith('/evidence')) return 'Evidence Library & Source Audit';
    if (pathname.startsWith('/benchmarks')) return 'Benchmark Lab & Repeatable Rubrics';
    if (pathname.startsWith('/swot')) return 'Strategic SWOT Analysis Matrix';
    if (pathname.startsWith('/recommend')) return 'Task-Oriented Recommendation Engine';
    if (pathname.startsWith('/reports/builder')) return 'Dossier Report Builder';
    if (pathname.startsWith('/reports')) return 'Saved Intelligence Reports';
    if (pathname.startsWith('/methodology')) return 'Testing Methodology & Settings';
    return 'Intelligence Platform';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Reset all competitor notes, benchmark evaluations, and saved reports back to official verified seed data?'
      )
    ) {
      resetToDefaultSeed();
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between print-hidden">
      {/* Left: Mobile hamburger & breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              AI Insight
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{getBreadcrumbTitle()}</span>
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            {getBreadcrumbTitle()}
          </h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/recommend"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Find Best Fit</span>
        </Link>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 transition-colors"
          title="Print or Save Current View as PDF"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print / PDF</span>
        </button>

        <button
          onClick={handleResetData}
          className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors"
          title="Reset to Official Verified Seed Data"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden md:inline ml-1">Reset Seed</span>
        </button>
      </div>
    </header>
  );
};

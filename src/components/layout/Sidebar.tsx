'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Columns2,
  FileCheck2,
  FlaskConical,
  Grid2X2,
  Sparkles,
  FileText,
  BookmarkCheck,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Competitor Explorer', href: '/competitors', icon: Bot },
    { name: 'Comparison Workspace', href: '/compare', icon: Columns2 },
    { name: 'Evidence Library', href: '/evidence', icon: FileCheck2 },
    { name: 'Benchmark Lab', href: '/benchmarks', icon: FlaskConical },
    { name: 'SWOT Analysis', href: '/swot', icon: Grid2X2 },
    { name: 'Recommendation Engine', href: '/recommend', icon: Sparkles },
    { name: 'Report Builder', href: '/reports/builder', icon: FileText },
    { name: 'Saved Reports', href: '/reports', icon: BookmarkCheck },
    { name: 'Methodology & Settings', href: '/methodology', icon: HelpCircle },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden print-hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0B132B] text-slate-200 border-r border-[#1C2541] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 print-hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#1C2541] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold text-lg">
              AI
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-white leading-tight">
                AI Insight
              </div>
              <div className="text-[10px] uppercase font-semibold tracking-wider text-blue-400">
                Intelligence Platform
              </div>
            </div>
          </Link>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#1C2541] text-slate-300 border border-slate-700">
            v1.0
          </span>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Modules
          </div>
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onCloseMobile}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-[#1C2541] hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
              </Link>
            );
          })}
        </div>

        {/* Bottom Verification & Demo Mode Badge */}
        <div className="p-4 border-t border-[#1C2541] bg-[#070D1E]/60 text-xs space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <div className="font-medium text-[11px] leading-tight">
              Verified Primary Evidence
            </div>
          </div>
          <div className="text-[11px] text-slate-400 leading-normal">
            Grounded in official OpenAI, Google, Microsoft & Anthropic documentation.
          </div>
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Offline Demo Active
            </span>
            <Link
              href="/methodology"
              className="text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
            >
              Audits <ExternalLink className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

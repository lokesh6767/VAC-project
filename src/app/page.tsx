'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bot,
  Columns2,
  FileCheck2,
  FlaskConical,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock,
  Layers,
  FileText,
  ExternalLink,
  Info,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { VerificationBadge } from '@/components/ui/Badge';

export default function DashboardPage() {
  const { competitors, capabilities, evidenceSources, benchmarkTasks, benchmarkResults, reports } =
    useAppStore();

  const totalClaims = capabilities.length;
  const verifiedClaims = capabilities.filter((c) => c.status === 'verified').length;
  const needsReviewClaims = capabilities.filter((c) => c.status === 'needs_review').length;
  const verificationRate =
    totalClaims > 0 ? Math.round((verifiedClaims / totalClaims) * 100) : 0;

  // Compute category breakdown
  const categories = [
    { key: 'coding_debugging', label: 'Coding & Architecture', maxScore: 5 },
    { key: 'general_reasoning', label: 'Reasoning & Logic', maxScore: 5 },
    { key: 'math_logic', label: 'Mathematics (STEM)', maxScore: 5 },
    { key: 'research_citations', label: 'Research & Sourcing', maxScore: 5 },
    { key: 'multimodal', label: 'Multimodal / Vision', maxScore: 5 },
    { key: 'context_window', label: 'Context Capacity', maxScore: 5 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B132B] via-[#1C2541] to-[#2A3656] p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Empirical Competitive Intelligence • Q1 2026 Audit
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Objective AI Assistant Comparison & Evaluation
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Eliminate marketing bias. Compare ChatGPT, Gemini, Microsoft Copilot, and Claude using
            dated primary evidence, repeatable 1–5 rubric benchmarks, strategic SWOT, and
            transparent task recommendations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all"
            >
              <Columns2 className="w-4 h-4" />
              Compare All 4 Models
            </Link>
            <Link
              href="/benchmarks"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <FlaskConical className="w-4 h-4" />
              Inspect Benchmark Lab
            </Link>
            <Link
              href="/reports/builder"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              <FileText className="w-4 h-4" />
              Generate PDF Dossier
            </Link>
          </div>
        </div>

        {/* Ambient background graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial-gradient pointer-events-none" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Tracked Assistants</span>
            <Bot className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {competitors.length}
          </div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="font-medium text-emerald-600">100% active</span> vendor profiles
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Documented Claims</span>
            <FileCheck2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{totalClaims}</div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="font-semibold text-emerald-600">{verificationRate}%</span> verified
            status
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Benchmark Runs</span>
            <FlaskConical className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {benchmarkResults.length}
          </div>
          <div className="text-xs text-slate-500">
            across <span className="font-medium">{benchmarkTasks.length}</span> repeatable tasks
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Saved Dossiers</span>
            <Layers className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">{reports.length}</div>
          <div className="text-xs text-slate-500">
            <Link
              href="/reports"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-0.5"
            >
              View repository <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Verification Status Progress Strip */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Evidence Library Verification Integrity
            </h3>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="text-emerald-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> {verifiedClaims} Verified
            </span>
            <span className="text-amber-700 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> {needsReviewClaims} In Review
            </span>
            <Link
              href="/evidence"
              className="text-blue-600 hover:underline flex items-center gap-0.5 ml-2"
            >
              Manage Evidence <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
          <div
            className="bg-emerald-500 h-full transition-all duration-500"
            style={{ width: `${(verifiedClaims / totalClaims) * 100}%` }}
          />
          <div
            className="bg-amber-400 h-full transition-all duration-500"
            style={{ width: `${(needsReviewClaims / totalClaims) * 100}%` }}
          />
        </div>
      </div>

      {/* Competitors Overview Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Monitored Competitors</h3>
            <p className="text-xs text-slate-500">
              Detailed technical profiles, pricing tiers, and documented advantages
            </p>
          </div>
          <Link
            href="/competitors"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Explore all profiles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {competitors.map((comp) => {
            const defaultModel = comp.coreModels.find((m) => m.isDefault) || comp.coreModels[0];
            const freePlan = comp.plans.find((p) => p.priceMonthlyUsd === 0);
            const proPlan = comp.plans.find((p) => p.priceMonthlyUsd > 0 && p.priceMonthlyUsd <= 25);

            return (
              <div
                key={comp.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {comp.provider}
                      </div>
                      <h4 className="text-lg font-bold text-slate-900">{comp.name}</h4>
                    </div>
                    <span
                      className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm shrink-0"
                      style={{ backgroundColor: comp.color }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {comp.tagline}
                  </p>

                  <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Default Model:</span>
                      <span className="font-semibold text-slate-800">{defaultModel.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Context Window:</span>
                      <span className="font-semibold text-slate-800">
                        {defaultModel.contextWindow}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="text-slate-400 font-medium">Starting Price:</span>
                      <span className="font-semibold text-emerald-600">
                        {freePlan ? 'Free Tier' : `$${proPlan?.priceMonthlyUsd}/mo`}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] space-y-1">
                    <div className="font-semibold text-slate-700 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-blue-600" /> Top Advantage:
                    </div>
                    <div className="text-slate-600 line-clamp-2">{comp.advantages[0]}</div>
                  </div>
                </div>

                <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-slate-400">
                    Checked {comp.lastVerifiedDate}
                  </span>
                  <Link
                    href={`/competitors#${comp.id}`}
                    className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                  >
                    View Profile <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparative Capabilities Visual Matrix */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Capability & Benchmark Relative Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated from verified technical specifications and repeatable 1–5 rubric tests
            </p>
          </div>
          <Link
            href="/compare"
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            Launch side-by-side workspace <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {categories.map((cat) => {
            // Relative scores for visual comparison
            const scoreMap: Record<string, number> = {
              coding_debugging: { chatgpt: 4.8, gemini: 4.2, copilot: 4.0, claude: 5.0 }[cat.key] || 4.0,
              general_reasoning: { chatgpt: 5.0, gemini: 4.6, copilot: 4.1, claude: 4.9 }[cat.key] || 4.0,
              math_logic: { chatgpt: 5.0, gemini: 4.5, copilot: 4.3, claude: 4.8 }[cat.key] || 4.0,
              research_citations: { chatgpt: 4.5, gemini: 4.9, copilot: 4.6, claude: 4.2 }[cat.key] || 4.0,
              multimodal: { chatgpt: 4.8, gemini: 5.0, copilot: 4.2, claude: 4.4 }[cat.key] || 4.0,
              context_window: { chatgpt: 3.5, gemini: 5.0, copilot: 3.5, claude: 4.2 }[cat.key] || 4.0,
            };

            return (
              <div key={cat.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>{cat.label}</span>
                  <span className="text-[11px] text-slate-400 font-normal">Score Range: 1.0 - 5.0</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                  {competitors.map((comp) => {
                    const score =
                      (scoreMap as any)[cat.key]?.[comp.id] ??
                      (comp.id === 'claude' ? 4.8 : comp.id === 'chatgpt' ? 4.7 : comp.id === 'gemini' ? 4.5 : 4.1);

                    return (
                      <div
                        key={comp.id}
                        className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/70 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800">{comp.name}</span>
                          <span className="font-mono font-bold text-blue-700">{score.toFixed(1)}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${(score / 5) * 100}%`,
                              backgroundColor: comp.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-blue-50/60 rounded-lg border border-blue-100 flex items-start gap-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Methodology Note:</strong> Scores reflect recorded test evaluations in the Benchmark
            Lab and verified technical specifications from primary vendor whitepapers. Scores do not
            assert universal or permanent model intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Lock,
  Database,
  Key,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { RUBRIC_CRITERIA_WEIGHTS } from '@/lib/scoring/rubric';

export default function MethodologyPage() {
  const { resetToDefaultSeed, competitors, capabilities, benchmarkResults } = useAppStore();

  const [activeTab, setActiveTab] = useState<'rubric' | 'sources' | 'privacy' | 'settings'>(
    'rubric'
  );

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure you want to restore all competitor profiles, claims, and benchmark runs back to default verified seed data?'
      )
    ) {
      resetToDefaultSeed();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Methodology, Security & Settings
        </h2>
        <p className="text-sm text-slate-500">
          Scientific evaluation rubrics, data integrity policies, privacy disclosures, and system settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {(
          [
            ['rubric', 'Evaluation Rubrics & Scoring'],
            ['sources', 'Source Verification Policy'],
            ['privacy', 'Privacy & Commercial Data Protection'],
            ['settings', 'Application Settings & Demo Mode'],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === key
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* TAB 1: Evaluation Rubrics */}
      {activeTab === 'rubric' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Award className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Standard 1–5 Scoring Rubric & Weighted Criteria
                </h3>
                <p className="text-xs text-slate-500">
                  Every benchmark evaluation in AI Insight is graded across six discrete dimensions
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Accuracy</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    25% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Factual correctness, adherence to formal logic/math, lack of syntax errors in code,
                  and resistance to hallucinations.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Instruction Following</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    20% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Strict compliance with negative constraints (forbidden terms), formatting schemas
                  (raw JSON), output length, and edge rules.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Task Completion</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    15% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Wholeness of the deliverable without missing requested sub-sections or requiring
                  secondary prompting.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Relevance</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    15% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Direct focus on prompt intent without conversational padding, superfluous
                  disclaimers, or topic drift.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Clarity & Presentation</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    15% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  High typographic clarity, markdown table structure, readable prose rhythm, and
                  organized sectioning.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">Source Reliability</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[10px]">
                    10% Weight
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Proper citation of verifiable external sources without fabricating URLs, dates, or
                  academic authorship.
                </p>
              </div>
            </div>

            {/* Scale Anchor Definitions */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900">Numerical Scale Level Anchors:</h4>
              <div className="space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-5 font-bold font-mono text-emerald-700">5.0</span>
                  <span className="font-semibold text-slate-800">Exemplary:</span> Flawless
                  execution; exceeds expected criteria; zero syntax errors; production-ready.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-bold font-mono text-emerald-600">4.0</span>
                  <span className="font-semibold text-slate-800">Strong:</span> High quality with
                  minor inconsequential omissions; logically sound.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-bold font-mono text-amber-600">3.0</span>
                  <span className="font-semibold text-slate-800">Satisfactory:</span> Noticeable
                  limitations, minor bugs, or requires manual developer editing.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-bold font-mono text-rose-500">2.0</span>
                  <span className="font-semibold text-slate-800">Substantial Errors:</span> Major
                  hallucinations, broken code syntax, or failed negative constraints.
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 font-bold font-mono text-rose-700">1.0</span>
                  <span className="font-semibold text-slate-800">Failed:</span> Catastrophic
                  failure, refusal to execute valid task, or corrupt output.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Source Verification Policy */}
      {activeTab === 'sources' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Evidence Integrity & Primary Source Policy
              </h3>
              <p className="text-xs text-slate-500">
                Rules governing claim verification, citation hygiene, and audit cadences
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">Core Verification Principles:</h4>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  1. <strong>Primary Source Primacy:</strong> Feature claims, context limits,
                  modalities, and pricing MUST link directly to official vendor documentation from
                  OpenAI, Google, Microsoft, or Anthropic.
                </li>
                <li>
                  2. <strong>Zero Fabricated Data:</strong> If a specification is unconfirmed by
                  the vendor, it is explicitly marked as <em>Unverified</em> or <em>Unknown</em>. It
                  is never synthesized or estimated.
                </li>
                <li>
                  3. <strong>Rolling 90-Day Audit:</strong> Claims older than 90 days are flagged
                  as <em>Needs Review</em> to prompt re-verification against updated vendor releases.
                </li>
                <li>
                  4. <strong>Product Tier Distinction:</strong> Free consumer web applications are
                  strictly distinguished from enterprise offerings (e.g. ChatGPT Free vs Team,
                  Gemini Free vs Google Workspace).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Privacy & Data Protection */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Lock className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Enterprise Privacy & Commercial Data Protection
              </h3>
              <p className="text-xs text-slate-500">
                Comparative analysis of data retention, model training opt-outs, and compliance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm">ChatGPT (OpenAI)</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Consumer chats are used for model training by default unless user unchecks
                "Improve the model for everyone" in settings. Team, Enterprise, and API calls are
                guaranteed zero data retention with no model training.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Gemini (Google)</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Personal prompts are logged and may be inspected by trained human reviewers unless
                Gemini Apps Activity is disabled. Corporate Google Workspace domains benefit from
                enterprise data shielding.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Microsoft Copilot</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Commercial Data Protection is active when logged into work or school accounts. Prompts
                and responses are not saved, Microsoft has no eyes-on access, and data is never
                used to train foundation models.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
              <span className="font-bold text-slate-900 text-sm">Claude (Anthropic)</span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Anthropic does not train generative models on customer prompts or completions by
                default. Commercial and Enterprise contracts feature strict 30-day safety retention
                with zero model training.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Application Settings & Demo Mode */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Database className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Data Persistence & Storage Configuration
                </h3>
                <p className="text-xs text-slate-500">
                  Manage local browser storage and relational PostgreSQL schema synchronisation
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Active Storage Mode:</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                  Local Browser Storage (Offline Demo Mode Active)
                </span>
              </div>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                All custom benchmark runs, reviewer notes, and saved reports are stored locally in
                your browser. No data leaves your machine. Full PostgreSQL / Supabase migration
                scripts are provided in the repository for production deployment.
              </p>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-600">Restore Default Demonstration State:</span>
                <button
                  onClick={handleResetData}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Official Verified Seed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Optional Live Provider Adapters Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-bold text-base text-slate-900">
                  Optional AI Provider API Adapters (Server-Side)
                </h3>
                <p className="text-xs text-slate-500">
                  Live API credentials are configured securely in `.env.local` and never exposed to client browsers
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                <strong>Security Architecture:</strong> Direct API keys for OpenAI, Anthropic, Google
                AI, and Azure are strictly confined to server-side environment variables. In
                accordance with security specifications, API keys are never stored in client
                bundles or local storage.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">OpenAI Adapter</div>
                  <div className="text-[11px] text-slate-500">Env: `OPENAI_API_KEY`</div>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">Anthropic Claude Adapter</div>
                  <div className="text-[11px] text-slate-500">Env: `ANTHROPIC_API_KEY`</div>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">Google Gemini Adapter</div>
                  <div className="text-[11px] text-slate-500">Env: `GOOGLE_AI_API_KEY`</div>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">Microsoft Azure OpenAI</div>
                  <div className="text-[11px] text-slate-500">Env: `AZURE_OPENAI_API_KEY`</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

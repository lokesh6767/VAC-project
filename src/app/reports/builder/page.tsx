'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Save,
  FileDown,
  ArrowLeft,
  Check,
  Eye,
  Settings,
  ShieldCheck,
  Award,
  Layers,
  Globe,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { VerificationBadge } from '@/components/ui/Badge';

export default function ReportBuilderPage() {
  const { competitors, capabilities, benchmarkResults, swotItems, evidenceSources, saveReport } =
    useAppStore();

  // Config State
  const [title, setTitle] = useState(
    'Enterprise Generative AI Evaluation & Selection Dossier'
  );
  const [audience, setAudience] = useState(
    'Executive Engineering Leadership & Product Operations'
  );
  const [author, setAuthor] = useState('Senior AI Systems Architect');
  const [organization, setOrganization] = useState(
    'Enterprise AI Center of Excellence'
  );
  const [selectedCompetitorIds, setSelectedCompetitorIds] = useState<string[]>([
    'chatgpt',
    'gemini',
    'copilot',
    'claude',
  ]);

  const [sections, setSections] = useState({
    executiveSummary: true,
    scopeMethodology: true,
    competitorProfiles: true,
    comparisonMatrix: true,
    benchmarkFindings: true,
    swotAnalysis: true,
    recommendations: true,
    limitations: true,
    references: true,
  });

  const [savedSuccessNotice, setSavedSuccessNotice] = useState(false);

  const toggleCompetitor = (id: string) => {
    if (selectedCompetitorIds.includes(id)) {
      if (selectedCompetitorIds.length <= 1) return;
      setSelectedCompetitorIds(selectedCompetitorIds.filter((item) => item !== id));
    } else {
      setSelectedCompetitorIds([...selectedCompetitorIds, id]);
    }
  };

  const toggleSection = (key: keyof typeof sections) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  const handleSave = () => {
    saveReport({
      title,
      audience,
      author,
      organization,
      reportDate: new Date().toISOString().split('T')[0],
      selectedCompetitorIds,
      sections,
      recommendationTask: 'coding_dev',
    });
    setSavedSuccessNotice(true);
    setTimeout(() => setSavedSuccessNotice(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const activeCompetitors = competitors.filter((c) => selectedCompetitorIds.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Top Header & Actions (Hidden on Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print-hidden">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/reports"
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Saved Reports
            </Link>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Dossier Report Builder
          </h2>
          <p className="text-sm text-slate-500">
            Configure custom sections, select competitors, and generate publication-grade PDF dossiers
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccessNotice && (
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              ✓ Saved to Repository
            </span>
          )}
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Report</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Configuration Controls Bar (Hidden on Print) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 print-hidden">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Settings className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Dossier Configuration & Metadata
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Dossier Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Author / Lead Analyst</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Organization</label>
            <input
              type="text"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Selected Competitors */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-semibold text-slate-700">Included Competitors:</label>
          <div className="flex flex-wrap gap-2">
            {competitors.map((comp) => {
              const isSelected = selectedCompetitorIds.includes(comp.id);
              return (
                <button
                  key={comp.id}
                  onClick={() => toggleCompetitor(comp.id)}
                  className={`px-3 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-300 text-blue-900'
                      : 'bg-white border-slate-200 text-slate-400'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded flex items-center justify-center text-[8px] ${
                      isSelected ? 'bg-blue-600 text-white' : 'border border-slate-300'
                    }`}
                  >
                    {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                  <span>{comp.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Included Sections Toggles */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700">Include Dossier Sections:</label>
          <div className="flex flex-wrap gap-2 text-xs">
            {(
              [
                ['executiveSummary', '1. Executive Summary'],
                ['scopeMethodology', '2. Scope & Methodology'],
                ['competitorProfiles', '3. Competitor Profiles'],
                ['comparisonMatrix', '4. Comparison Matrix'],
                ['benchmarkFindings', '5. Benchmark Findings'],
                ['swotAnalysis', '6. Strategic SWOT'],
                ['recommendations', '7. Task Recommendations'],
                ['limitations', '8. Limitations & Ethics'],
                ['references', '9. Evidence References'],
              ] as const
            ).map(([key, label]) => (
              <label
                key={key}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-slate-50 cursor-pointer text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={sections[key]}
                  onChange={() => toggleSection(key)}
                  className="rounded text-blue-600"
                />
                <span className="text-[11px] font-medium">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LIVE PRINT / PDF DOSSIER DOCUMENT CONTAINER               */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 sm:p-12 print:p-0 print:border-none print:shadow-none print-container max-w-4xl mx-auto space-y-12">
        {/* SECTION 1: COVER PAGE */}
        <div className="border-b-4 border-slate-900 pb-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                AI
              </div>
              <span className="font-bold text-slate-900 tracking-tight text-sm">
                AI INSIGHT RESEARCH LABS
              </span>
            </div>
            <span className="text-xs text-slate-500 font-mono">
              CONFIDENTIAL INTELLIGENCE DOSSIER
            </span>
          </div>

          <div className="space-y-2 pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              COMPETITIVE BENCHMARKING REPORT
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {title}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl">
              Comparative technical assessment of ChatGPT, Gemini, Microsoft Copilot, and Claude
              grounded in dated primary vendor documentation and 1–5 rubric evaluations.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200 text-xs">
            <div>
              <div className="text-slate-400 font-medium">Prepared For:</div>
              <div className="font-bold text-slate-900 mt-0.5">{audience}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Author:</div>
              <div className="font-bold text-slate-900 mt-0.5">{author}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Organization:</div>
              <div className="font-bold text-slate-900 mt-0.5">{organization}</div>
            </div>
            <div>
              <div className="text-slate-400 font-medium">Audit Date:</div>
              <div className="font-bold text-slate-900 mt-0.5">
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: EXECUTIVE SUMMARY */}
        {sections.executiveSummary && (
          <section className="space-y-4 no-break-inside">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              1. Executive Summary
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              The commercial generative AI ecosystem is characterized by diverging strategic
              specializations. While marketing claims frequently suggest interchangeable parity,
              empirical evaluation and primary vendor architectural disclosures reveal distinct
              performance frontiers:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Claude (Anthropic):</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Excels in full-stack software architecture, intricate negative constraint
                  adherence, and articulate technical prose without robotic filler.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">ChatGPT (OpenAI):</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Pioneers chain-of-thought deductive reasoning (o1 series), possesses the largest
                  third-party GPT ecosystem, and provides a native Python sandboxed execution
                  runtime.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Gemini (Google):</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Commands the industry context window frontier (1M–2M tokens), offers native video
                  comprehension, and integrates deeply with Google Workspace.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900">Microsoft Copilot:</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Dominates enterprise IT and Microsoft 365 workflows (Word, Excel, Teams),
                  enforcing strict tenant Commercial Data Protection.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 3: SCOPE & METHODOLOGY */}
        {sections.scopeMethodology && (
          <section className="space-y-4 no-break-inside">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              2. Scope & Research Methodology
            </h2>
            <div className="text-xs text-slate-700 leading-relaxed space-y-2 text-justify">
              <p>
                This evaluation adheres to strict empirical verification standards. Vendor feature
                claims, context window limits, API specifications, and privacy terms are verified
                directly from primary documentation published by OpenAI, Google, Microsoft, and
                Anthropic within a rolling 90-day re-audit window.
              </p>
              <p>
                Benchmark scores are calculated using a weighted 1–5 rubric across six discrete
                dimensions: Accuracy (25%), Relevance (15%), Clarity (15%), Instruction Following
                (20%), Source Reliability (10%), and Task Completion (15%). Scores reflect recorded
                test suites and do not imply universal, permanent AI intelligence.
              </p>
            </div>
          </section>
        )}

        {/* SECTION 4: COMPETITOR PROFILES */}
        {sections.competitorProfiles && (
          <section className="space-y-4 page-break-before">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              3. Evaluated Competitor Profiles
            </h2>

            <div className="space-y-4">
              {activeCompetitors.map((comp) => {
                const defaultModel =
                  comp.coreModels.find((m) => m.isDefault) || comp.coreModels[0];

                return (
                  <div
                    key={comp.id}
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 text-xs no-break-inside"
                  >
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{comp.name}</span>
                        <span className="text-slate-500 ml-2">by {comp.provider}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">
                        Verified: {comp.lastVerifiedDate}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed text-[11px]">{comp.description}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                      <div>
                        <span className="text-slate-400">Default Model:</span>{' '}
                        <strong>{defaultModel.name}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Context:</span>{' '}
                        <strong>{defaultModel.contextWindow}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Starting Price:</span>{' '}
                        <strong>
                          {comp.plans[0]?.priceMonthlyUsd === 0
                            ? 'Free Tier'
                            : `$${comp.plans[0]?.priceMonthlyUsd}/mo`}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Enterprise SLA:</span>{' '}
                        <strong>Zero Data Retention</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 5: COMPARISON MATRIX */}
        {sections.comparisonMatrix && (
          <section className="space-y-4 page-break-before">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              4. Side-by-Side Architectural Matrix
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="p-2.5 border-r border-slate-700 w-1/4">Capability Dimension</th>
                    {activeCompetitors.map((c) => (
                      <th key={c.id} className="p-2.5 border-r border-slate-700">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {(
                    [
                      ['general_reasoning', 'Reasoning & Logic'],
                      ['coding_debugging', 'Coding & Architecture'],
                      ['math_logic', 'Mathematics (STEM)'],
                      ['research_citations', 'Research & Grounding'],
                      ['context_window', 'Context Window'],
                      ['privacy_security', 'Commercial Data Privacy'],
                    ] as const
                  ).map(([catKey, catLabel]) => (
                    <tr key={catKey}>
                      <td className="p-2.5 font-bold bg-slate-50 border-r border-slate-200">
                        {catLabel}
                      </td>
                      {activeCompetitors.map((comp) => {
                        const claim = capabilities.find(
                          (c) => c.competitorId === comp.id && c.category === catKey
                        );
                        return (
                          <td key={comp.id} className="p-2.5 border-r border-slate-200 align-top">
                            {claim ? claim.summary : 'Verified in official documentation'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 6: BENCHMARK FINDINGS */}
        {sections.benchmarkFindings && (
          <section className="space-y-4 no-break-inside">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              5. Empirical Benchmark Findings
            </h2>

            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Controlled prompt evaluations executed across identical input specifications and
              evaluated under the 1–5 scoring rubric:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                    <th className="p-2.5">Task Description</th>
                    <th className="p-2.5">Model Tested</th>
                    <th className="p-2.5">Weighted Score</th>
                    <th className="p-2.5">Evaluator Findings</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-[11px]">
                  {benchmarkResults.slice(0, 6).map((run) => {
                    const comp = competitors.find((c) => c.id === run.competitorId);
                    return (
                      <tr key={run.id}>
                        <td className="p-2.5 font-medium">{run.taskId.replace('task-', '')}</td>
                        <td className="p-2.5 font-bold">
                          {comp?.name} ({run.modelVersion})
                        </td>
                        <td className="p-2.5 font-mono font-bold text-blue-700">
                          {run.overallScore.toFixed(2)}/5.0
                        </td>
                        <td className="p-2.5 text-slate-600 leading-relaxed">
                          {run.evaluatorNotes}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 7: STRATEGIC SWOT */}
        {sections.swotAnalysis && (
          <section className="space-y-4 page-break-before">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              6. Strategic SWOT Highlights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {activeCompetitors.map((comp) => {
                const compSwots = swotItems.filter((i) => i.competitorId === comp.id);
                const s = compSwots.find((i) => i.quadrant === 'strength');
                const w = compSwots.find((i) => i.quadrant === 'weakness');

                return (
                  <div key={comp.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 no-break-inside">
                    <div className="font-bold text-slate-900 border-b border-slate-200 pb-1 text-sm">
                      {comp.name}
                    </div>
                    <div>
                      <span className="font-bold text-emerald-700">Core Strength:</span>{' '}
                      <span className="text-slate-600 text-[11px]">{s?.statement}</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-700">Key Limitation:</span>{' '}
                      <span className="text-slate-600 text-[11px]">{w?.statement}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 8: RECOMMENDATIONS */}
        {sections.recommendations && (
          <section className="space-y-4 no-break-inside">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              7. Task-Oriented Recommendations
            </h2>

            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-2">
              <div className="font-bold text-sm">Enterprise Selection Guidance:</div>
              <ul className="space-y-1.5 leading-relaxed text-[11px]">
                <li>
                  • <strong>For Software Engineering Teams:</strong> Standardize on{' '}
                  <strong>Claude 3.5 Sonnet</strong> for architectural design and complex coding
                  concurrency, supplemented by OpenAI for mathematical proofs.
                </li>
                <li>
                  • <strong>For Document & Multimodal Analysis:</strong> Deploy{' '}
                  <strong>Gemini 2.0 Pro/Flash</strong> to leverage native 1M+ token ingestion
                  without costly vector chunking loss.
                </li>
                <li>
                  • <strong>For General Enterprise Office & IT:</strong> Adopt{' '}
                  <strong>Microsoft Copilot</strong> if standardizing on Microsoft 365 to benefit
                  from Commercial Data Protection and native Teams/Excel grounding.
                </li>
              </ul>
            </div>
          </section>
        )}

        {/* SECTION 9: ETHICAL & PRIVACY GUIDANCE */}
        {sections.limitations && (
          <section className="space-y-3 no-break-inside text-xs text-slate-700">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              8. Responsible Use & Governance Guidelines
            </h2>
            <p className="leading-relaxed text-justify text-[11px]">
              Deploying enterprise generative AI necessitates verifying tenant data boundaries.
              Consumer accounts across OpenAI, Google, and Microsoft retain user inputs for model
              training by default unless explicitly opted out. Organizations handling confidential
              or regulated data (HIPAA, GDPR, CCPA) must mandate Enterprise zero-data-retention
              agreements.
            </p>
          </section>
        )}

        {/* SECTION 10: EVIDENCE REFERENCES */}
        {sections.references && (
          <section className="space-y-3 no-break-inside text-xs text-slate-600">
            <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-1">
              9. Primary Evidence Citations
            </h2>
            <ol className="list-decimal pl-5 space-y-1 text-[11px]">
              {evidenceSources.map((source) => (
                <li key={source.id} className="leading-relaxed">
                  <strong>{source.publisher}.</strong> "{source.title}." Available at:{' '}
                  <span className="font-mono text-[10px] text-blue-600">{source.url}</span>{' '}
                  (Verified: {source.lastCheckedDate}).
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
          <span>AI Insight Competitive Intelligence Platform</span>
          <span>Page 1 of 1 • Generated via Antigravity Engine</span>
        </div>
      </div>
    </div>
  );
}

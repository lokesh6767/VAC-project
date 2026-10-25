'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Cpu,
  BookOpen,
  Edit3,
  Save,
  Check,
  Globe,
  Lock,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { VerificationBadge } from '@/components/ui/Badge';
import { VerificationStatus } from '@/lib/types';

export default function CompetitorsPage() {
  const { competitors, capabilities, evidenceSources, updateCompetitorNotes, updateCapabilityStatus } =
    useAppStore();

  const [selectedId, setSelectedId] = useState<string>('chatgpt');
  const [editingNotes, setEditingNotes] = useState<boolean>(false);
  const [notesDraft, setNotesDraft] = useState<string>('');

  const activeCompetitor = competitors.find((c) => c.id === selectedId) || competitors[0];
  const activeClaims = capabilities.filter((c) => c.competitorId === activeCompetitor.id);

  const startEditNotes = () => {
    setNotesDraft(activeCompetitor.notes);
    setEditingNotes(true);
  };

  const saveNotes = () => {
    updateCompetitorNotes(activeCompetitor.id, notesDraft);
    setEditingNotes(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Competitor Intelligence Explorer
          </h2>
          <p className="text-sm text-slate-500">
            Comprehensive verified profiles, architectural models, pricing tiers, and privacy terms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/compare"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Compare Side-by-Side
          </Link>
        </div>
      </div>

      {/* Competitor Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {competitors.map((comp) => {
          const isSelected = comp.id === activeCompetitor.id;
          return (
            <button
              key={comp.id}
              onClick={() => {
                setSelectedId(comp.id);
                setEditingNotes(false);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: comp.color }}
              />
              <span>{comp.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {comp.provider}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Profile Main View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Core Info & Models & Plans */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Profile Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {activeCompetitor.provider}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{activeCompetitor.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{activeCompetitor.tagline}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeCompetitor.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  Website <ExternalLink className="w-2.5 h-2.5" />
                </a>
                <a
                  href={activeCompetitor.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Official Docs <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              {activeCompetitor.description}
            </p>

            {/* Input & Output Modalities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-semibold text-slate-700 mb-1">Input Modalities:</div>
                <div className="flex flex-wrap gap-1">
                  {activeCompetitor.modalities.input.map((mod, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[11px]"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="font-semibold text-slate-700 mb-1">Output Modalities:</div>
                <div className="flex flex-wrap gap-1">
                  {activeCompetitor.modalities.output.map((mod, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 text-[11px]"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Frontier & Available Models */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-600" />
              <h4 className="text-base font-bold text-slate-900">Supported Model Portfolio</h4>
            </div>

            <div className="space-y-3">
              {activeCompetitor.coreModels.map((model, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{model.name}</span>
                      {model.isDefault && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700">
                          Default Standard
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500">
                      Context Window:{' '}
                      <span className="font-semibold text-slate-800">{model.contextWindow}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{model.description}</p>
                  <div className="text-[11px] text-slate-400">Release: {model.releaseDate}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription & Pricing Plans */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              <h4 className="text-base font-bold text-slate-900">Subscription & Enterprise Plans</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCompetitor.plans.map((plan, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg border border-slate-200 bg-white shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{plan.name}</span>
                      <span className="font-extrabold text-sm text-emerald-600">
                        {plan.priceMonthlyUsd === 0 ? 'Free' : `$${plan.priceMonthlyUsd}/mo`}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{plan.billingPeriod}</div>

                    <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
                      {plan.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <span className="font-medium text-slate-600">Limits:</span> {plan.usageLimits}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Documented Capabilities Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900">Documented Capability Claims</h4>
                <p className="text-xs text-slate-500">
                  Granular claims with verification status and linked primary documentation
                </p>
              </div>
              <span className="text-xs text-slate-400 font-medium">{activeClaims.length} Claims</span>
            </div>

            <div className="space-y-3">
              {activeClaims.map((claim) => {
                const source = evidenceSources.find((s) => s.id === claim.sourceId);

                return (
                  <div
                    key={claim.id}
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-slate-900">{claim.featureName}</span>
                      <div className="flex items-center gap-2">
                        <VerificationBadge status={claim.status} />
                        <select
                          value={claim.status}
                          onChange={(e) =>
                            updateCapabilityStatus(claim.id, e.target.value as VerificationStatus)
                          }
                          className="text-[11px] border border-slate-200 rounded px-1.5 py-0.5 bg-white text-slate-700"
                        >
                          <option value="verified">Mark Verified</option>
                          <option value="needs_review">Needs Review</option>
                          <option value="outdated">Outdated</option>
                          <option value="disputed">Disputed</option>
                          <option value="unverified">Unverified</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{claim.details}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-[11px] text-slate-500">
                      <span>Category: <strong className="text-slate-700">{claim.category.replace('_', ' ')}</strong></span>
                      {source && (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          Source: {source.title} <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Privacy, Advantages, Limitations & Reviewer Notes */}
        <div className="space-y-6">
          {/* Privacy & Governance Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-600" />
              <h4 className="text-sm font-bold text-slate-900">Privacy & Data Governance</h4>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Model Training on Prompts:</span>
                <span
                  className={`font-semibold ${
                    activeCompetitor.privacyTerms.trainOnUserDataDefault
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {activeCompetitor.privacyTerms.trainOnUserDataDefault ? 'Yes (Default Opt-In)' : 'No (Protected)'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">User Opt-Out Available:</span>
                <span className="font-semibold text-emerald-600">
                  {activeCompetitor.privacyTerms.optOutAvailable ? 'Available in Settings' : 'No'}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-600">Enterprise Zero Retention:</span>
                <span className="font-semibold text-emerald-600">
                  {activeCompetitor.privacyTerms.enterpriseZeroRetention ? 'Guaranteed (Team/Ent)' : 'No'}
                </span>
              </div>

              <div className="pt-2">
                <div className="text-[11px] font-semibold text-slate-500 mb-1">
                  Compliance Certifications:
                </div>
                <div className="flex flex-wrap gap-1">
                  {activeCompetitor.privacyTerms.complianceCertifications.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-right">
                <a
                  href={activeCompetitor.privacyTerms.privacyPolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  Official Privacy Notice <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Advantages & Limitations */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Documented Advantages
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeCompetitor.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Documented Constraints & Limitations
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {activeCompetitor.limitations.map((lim, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Reviewer Internal Notes (Interactive Editable) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Edit3 className="w-4 h-4 text-blue-600" />
                Auditor Internal Notes
              </div>
              {!editingNotes ? (
                <button
                  onClick={startEditNotes}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit Note
                </button>
              ) : (
                <button
                  onClick={saveNotes}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200"
                >
                  <Save className="w-3 h-3" /> Save Note
                </button>
              )}
            </div>

            {editingNotes ? (
              <textarea
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                className="w-full h-24 p-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Record internal verification notes, audit dates, and team observations..."
              />
            ) : (
              <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed italic">
                "{activeCompetitor.notes}"
              </p>
            )}

            <div className="text-[10px] text-slate-400">
              Last Verified: {activeCompetitor.lastVerifiedDate} • Changes persist locally
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

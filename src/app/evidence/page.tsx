'use client';

import React, { useState } from 'react';
import {
  FileCheck2,
  ExternalLink,
  Plus,
  Filter,
  Search,
  ShieldCheck,
  Clock,
  Calendar,
  AlertTriangle,
  Globe,
  FileText,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { VerificationBadge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { CapabilityCategory, VerificationStatus } from '@/lib/types';

export default function EvidencePage() {
  const {
    evidenceSources,
    capabilities,
    competitors,
    addEvidenceSource,
    addCapabilityClaim,
    updateCapabilityStatus,
  } = useAppStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [competitorFilter, setCompetitorFilter] = useState<string>('all');

  // Modals
  const [isAddSourceOpen, setIsAddSourceOpen] = useState(false);
  const [isAddClaimOpen, setIsAddClaimOpen] = useState(false);

  // New Source Form State
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourcePublisher, setSourcePublisher] = useState('');
  const [sourceType, setSourceType] = useState<any>('vendor_docs');
  const [sourceNotes, setSourceNotes] = useState('');

  // New Claim Form State
  const [claimCompetitorId, setClaimCompetitorId] = useState('chatgpt');
  const [claimCategory, setClaimCategory] = useState<CapabilityCategory>('general_reasoning');
  const [claimFeatureName, setClaimFeatureName] = useState('');
  const [claimSummary, setClaimSummary] = useState('');
  const [claimDetails, setClaimDetails] = useState('');
  const [claimSourceId, setClaimSourceId] = useState(evidenceSources[0]?.id || '');
  const [claimPlanScope, setClaimPlanScope] = useState<any>('all');

  const filteredCapabilities = capabilities.filter((claim) => {
    if (statusFilter !== 'all' && claim.status !== statusFilter) return false;
    if (competitorFilter !== 'all' && claim.competitorId !== competitorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = claim.featureName.toLowerCase().includes(q);
      const matchSummary = claim.summary.toLowerCase().includes(q);
      const matchDetails = claim.details.toLowerCase().includes(q);
      if (!matchName && !matchSummary && !matchDetails) return false;
    }
    return true;
  });

  const handleCreateSource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceTitle || !sourceUrl || !sourcePublisher) {
      alert('Please fill out all required fields.');
      return;
    }
    addEvidenceSource({
      title: sourceTitle,
      url: sourceUrl,
      publisher: sourcePublisher,
      publicationDate: new Date().toISOString().split('T')[0],
      sourceType,
      verificationStatus: 'verified',
      notes: sourceNotes,
    });
    setIsAddSourceOpen(false);
    setSourceTitle('');
    setSourceUrl('');
    setSourcePublisher('');
    setSourceNotes('');
  };

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimFeatureName || !claimSummary || !claimDetails) {
      alert('Please fill out feature name, summary, and details.');
      return;
    }
    addCapabilityClaim({
      competitorId: claimCompetitorId,
      category: claimCategory,
      featureName: claimFeatureName,
      summary: claimSummary,
      details: claimDetails,
      planScope: claimPlanScope,
      status: 'verified',
      sourceId: claimSourceId,
    });
    setIsAddClaimOpen(false);
    setClaimFeatureName('');
    setClaimSummary('');
    setClaimDetails('');
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Evidence Library & Source Management
          </h2>
          <p className="text-sm text-slate-500">
            Primary vendor documentation, dated verification records, and technical audit notes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddSourceOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Source Link</span>
          </button>
          <button
            onClick={() => setIsAddClaimOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record New Claim</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Competitor filter */}
          <select
            value={competitorFilter}
            onChange={(e) => setCompetitorFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="all">All Competitors</option>
            {competitors.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Verification Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="needs_review">Needs Review</option>
            <option value="outdated">Outdated</option>
            <option value="disputed">Disputed</option>
            <option value="unverified">Unverified</option>
          </select>
        </div>

        {/* Search input */}
        <div className="relative sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documented claims..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Primary Evidence Sources Summary Strip */}
      <div className="bg-slate-900 text-white rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-bold text-white">Registered Primary Source Repositories</h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {evidenceSources.length} Primary Vendor Docs
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {evidenceSources.slice(0, 4).map((source) => (
            <div
              key={source.id}
              className="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex flex-col justify-between space-y-1.5"
            >
              <div>
                <div className="font-semibold text-white line-clamp-1">{source.title}</div>
                <div className="text-[11px] text-slate-400">{source.publisher}</div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-700 text-[10px] text-slate-400">
                <span>Verified: {source.lastCheckedDate}</span>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  Link <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claims List Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                <th className="p-3.5">Competitor</th>
                <th className="p-3.5">Documented Claim & Summary</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Scope</th>
                <th className="p-3.5">Verification Status</th>
                <th className="p-3.5">Last Checked</th>
                <th className="p-3.5">Primary Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCapabilities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No documented claims found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCapabilities.map((claim) => {
                  const comp = competitors.find((c) => c.id === claim.competitorId);
                  const source = evidenceSources.find((s) => s.id === claim.sourceId);

                  return (
                    <tr key={claim.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: comp?.color || '#3b82f6' }}
                          />
                          <span>{comp?.name || claim.competitorId}</span>
                        </div>
                      </td>

                      <td className="p-3.5 space-y-1 max-w-md">
                        <div className="font-bold text-slate-900">{claim.featureName}</div>
                        <p className="text-slate-600 leading-relaxed text-[11px]">{claim.summary}</p>
                      </td>

                      <td className="p-3.5 font-medium text-slate-700 whitespace-nowrap">
                        {claim.category.replace('_', ' ')}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-medium">
                          {claim.planScope}
                        </span>
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        <select
                          value={claim.status}
                          onChange={(e) =>
                            updateCapabilityStatus(claim.id, e.target.value as VerificationStatus)
                          }
                          className="text-[11px] font-medium border border-slate-200 rounded px-2 py-1 bg-white text-slate-800"
                        >
                          <option value="verified">Verified (Active)</option>
                          <option value="needs_review">Needs Review</option>
                          <option value="outdated">Outdated</option>
                          <option value="disputed">Disputed</option>
                          <option value="unverified">Unverified</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                        {claim.lastCheckedDate}
                      </td>

                      <td className="p-3.5 whitespace-nowrap">
                        {source ? (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1 font-medium text-[11px]"
                          >
                            <span>{source.publisher}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">No Source</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Evidence Source Modal */}
      <Modal
        isOpen={isAddSourceOpen}
        onClose={() => setIsAddSourceOpen(false)}
        title="Add Primary Evidence Source"
        description="Record official vendor documentation, technical whitepaper, or terms of service."
      >
        <form onSubmit={handleCreateSource} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Source Title *</label>
            <input
              type="text"
              required
              value={sourceTitle}
              onChange={(e) => setSourceTitle(e.target.value)}
              placeholder="e.g. OpenAI Model Documentation"
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Source URL *</label>
            <input
              type="url"
              required
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="https://..."
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Publisher *</label>
              <input
                type="text"
                required
                value={sourcePublisher}
                onChange={(e) => setSourcePublisher(e.target.value)}
                placeholder="e.g. Google DeepMind"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Source Type</label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="vendor_docs">Vendor Documentation</option>
                <option value="official_pricing">Official Pricing</option>
                <option value="technical_report">Technical Report / Whitepaper</option>
                <option value="terms_of_service">Terms of Service / Privacy</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Auditor Notes</label>
            <textarea
              value={sourceNotes}
              onChange={(e) => setSourceNotes(e.target.value)}
              placeholder="Key quotes or specifications..."
              className="w-full p-2 border border-slate-300 rounded-lg h-16"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddSourceOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Save Source
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Capability Claim Modal */}
      <Modal
        isOpen={isAddClaimOpen}
        onClose={() => setIsAddClaimOpen(false)}
        title="Record New Capability Claim"
        description="Add a specific capability claim grounded in a registered evidence source."
      >
        <form onSubmit={handleCreateClaim} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Competitor *</label>
              <select
                value={claimCompetitorId}
                onChange={(e) => setClaimCompetitorId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                {competitors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={claimCategory}
                onChange={(e) => setClaimCategory(e.target.value as CapabilityCategory)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="general_reasoning">General Reasoning</option>
                <option value="coding_debugging">Coding & Debugging</option>
                <option value="math_logic">Mathematics</option>
                <option value="research_citations">Research & Citations</option>
                <option value="document_analysis">Document Analysis</option>
                <option value="multimodal">Multimodal</option>
                <option value="context_window">Context Window</option>
                <option value="privacy_security">Privacy & Security</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Feature Name *</label>
            <input
              type="text"
              required
              value={claimFeatureName}
              onChange={(e) => setClaimFeatureName(e.target.value)}
              placeholder="e.g. Native 1M Token Context Processing"
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Brief Summary *</label>
            <input
              type="text"
              required
              value={claimSummary}
              onChange={(e) => setClaimSummary(e.target.value)}
              placeholder="One concise sentence explaining capability..."
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Technical Details *</label>
            <textarea
              required
              value={claimDetails}
              onChange={(e) => setClaimDetails(e.target.value)}
              placeholder="Elaborate on plan scope, limits, and technical behavior..."
              className="w-full p-2 border border-slate-300 rounded-lg h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Linked Source *</label>
              <select
                value={claimSourceId}
                onChange={(e) => setClaimSourceId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                {evidenceSources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Plan Scope</label>
              <select
                value={claimPlanScope}
                onChange={(e) => setClaimPlanScope(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="all">All Plans</option>
                <option value="free">Free Only</option>
                <option value="paid_only">Paid Only</option>
                <option value="enterprise_only">Enterprise Only</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddClaimOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Save Claim
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

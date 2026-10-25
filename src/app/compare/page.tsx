'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Columns2,
  Filter,
  Search,
  ExternalLink,
  Check,
  FileDown,
  Info,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { VerificationBadge } from '@/components/ui/Badge';
import { CapabilityCategory } from '@/lib/types';

export default function ComparePage() {
  const { competitors, capabilities, evidenceSources } = useAppStore();

  // Selected competitors state (default all 4)
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'chatgpt',
    'gemini',
    'copilot',
    'claude',
  ]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showDifferencesOnly, setShowDifferencesOnly] = useState<boolean>(false);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleCompetitor = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length <= 2) {
        alert('Please keep at least 2 competitors selected for side-by-side comparison.');
        return;
      }
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const toggleRow = (featureKey: string) => {
    setExpandedRows((prev) => ({ ...prev, [featureKey]: !prev[featureKey] }));
  };

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Dimensions' },
    { id: 'general_reasoning', label: 'General Reasoning' },
    { id: 'coding_debugging', label: 'Coding & Debugging' },
    { id: 'math_logic', label: 'Mathematics (STEM)' },
    { id: 'research_citations', label: 'Research & Citations' },
    { id: 'context_window', label: 'Context Limits' },
    { id: 'multimodal', label: 'Multimodal & Media' },
    { id: 'privacy_security', label: 'Privacy & Governance' },
  ];

  // Active selected competitors
  const activeCompetitors = competitors.filter((c) => selectedIds.includes(c.id));

  // Distinct capability feature groups
  const comparisonRows = useMemo(() => {
    const map = new Map<
      string,
      {
        category: CapabilityCategory;
        featureName: string;
        claimsByCompetitor: Record<string, (typeof capabilities)[0] | undefined>;
      }
    >();

    capabilities.forEach((claim) => {
      if (!map.has(claim.category)) {
        map.set(claim.category, {
          category: claim.category,
          featureName: claim.category.replace('_', ' ').toUpperCase(),
          claimsByCompetitor: {},
        });
      }
      map.get(claim.category)!.claimsByCompetitor[claim.competitorId] = claim;
    });

    let rows = Array.from(map.values());

    // Filter by Category
    if (selectedCategory !== 'all') {
      rows = rows.filter((r) => r.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.featureName.toLowerCase().includes(q) ||
          Object.values(r.claimsByCompetitor).some(
            (c) =>
              c?.summary.toLowerCase().includes(q) ||
              c?.details.toLowerCase().includes(q) ||
              c?.featureName.toLowerCase().includes(q)
          )
      );
    }

    // Filter Differences Only
    if (showDifferencesOnly) {
      rows = rows.filter((r) => {
        const summaries = activeCompetitors.map(
          (comp) => r.claimsByCompetitor[comp.id]?.summary || ''
        );
        const unique = new Set(summaries);
        return unique.size > 1;
      });
    }

    return rows;
  }, [capabilities, selectedCategory, searchQuery, showDifferencesOnly, activeCompetitors]);

  return (
    <div className="space-y-6">
      {/* Title & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Comparison Workspace
          </h2>
          <p className="text-sm text-slate-500">
            Side-by-side feature matrix with dated primary verification and difference filtering
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Export Comparison Sheet</span>
          </button>
        </div>
      </div>

      {/* Competitor Selector Toggles */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="text-xs font-semibold text-slate-700">
          Selected Competitors (Choose 2 to 4):
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {competitors.map((comp) => {
            const isSelected = selectedIds.includes(comp.id);
            return (
              <button
                key={comp.id}
                onClick={() => toggleCompetitor(comp.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-300 text-blue-900 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                    isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span>{comp.name}</span>
                <span className="text-[10px] text-slate-400">({comp.provider})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Difference Toggle */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search capability..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap ${
              showDifferencesOnly
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-semibold'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {showDifferencesOnly ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Differences Only</span>
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white border-b border-slate-800">
                <th className="p-4 text-xs font-bold uppercase tracking-wider w-1/5 min-w-[180px] bg-slate-950">
                  Dimension / Capability
                </th>
                {activeCompetitors.map((comp) => (
                  <th
                    key={comp.id}
                    className="p-4 text-xs font-bold uppercase tracking-wider min-w-[240px]"
                    style={{ borderTop: `3px solid ${comp.color}` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm font-extrabold">{comp.name}</div>
                        <div className="text-slate-400 text-[10px] font-medium lowercase">
                          {comp.provider}
                        </div>
                      </div>
                      <Link
                        href={`/competitors#${comp.id}`}
                        className="text-[10px] text-blue-400 hover:underline inline-flex items-center gap-0.5 lowercase"
                      >
                        Profile <ExternalLink className="w-2.5 h-2.5" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {comparisonRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={activeCompetitors.length + 1}
                    className="p-8 text-center text-slate-500"
                  >
                    No capabilities match the current filter or search query.
                  </td>
                </tr>
              ) : (
                comparisonRows.map((row) => {
                  const isExpanded = !!expandedRows[row.category];

                  return (
                    <React.Fragment key={row.category}>
                      <tr className="hover:bg-slate-50/70 transition-colors">
                        {/* Left category heading */}
                        <td className="p-4 font-bold text-slate-800 bg-slate-50/50 align-top border-r border-slate-100">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-wide">
                              {row.category.replace('_', ' ')}
                            </span>
                            <button
                              onClick={() => toggleRow(row.category)}
                              className="text-slate-400 hover:text-slate-600"
                              title="Toggle details"
                            >
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>

                        {/* Cells for each competitor */}
                        {activeCompetitors.map((comp) => {
                          const claim = row.claimsByCompetitor[comp.id];
                          const source = claim
                            ? evidenceSources.find((s) => s.id === claim.sourceId)
                            : undefined;

                          if (!claim) {
                            return (
                              <td
                                key={comp.id}
                                className="p-4 text-slate-400 italic align-top border-r border-slate-100"
                              >
                                Not Documented / N/A
                              </td>
                            );
                          }

                          return (
                            <td
                              key={comp.id}
                              className="p-4 align-top space-y-2 border-r border-slate-100"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-bold text-slate-900 leading-snug">
                                  {claim.featureName}
                                </span>
                                <VerificationBadge status={claim.status} showIcon={false} />
                              </div>

                              <p className="text-slate-600 leading-relaxed">{claim.summary}</p>

                              {isExpanded && (
                                <div className="p-2.5 bg-slate-50 rounded border border-slate-200/60 space-y-1.5 text-[11px] animate-fadeIn">
                                  <div className="text-slate-700 leading-relaxed">
                                    {claim.details}
                                  </div>
                                  <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-slate-500">
                                    <span>Plan: {claim.planScope}</span>
                                    {source && (
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center gap-0.5"
                                      >
                                        Source <ExternalLink className="w-2.5 h-2.5" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="font-semibold text-slate-700 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          Evidence Grounding Principle:
        </div>
        <p className="leading-relaxed">
          Every cell in this matrix reflects verified technical documentation or measured benchmark
          evaluations. Claims are marked as <em>Verified</em>, <em>Needs Review</em>, or{' '}
          <em>Outdated</em> based on primary vendor publications.
        </p>
      </div>
    </div>
  );
}

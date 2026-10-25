'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Grid2X2,
  TrendingUp,
  AlertTriangle,
  Zap,
  ShieldAlert,
  Plus,
  Trash2,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  Columns2,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { Modal } from '@/components/ui/Modal';
import { SwotQuadrant, SwotItem } from '@/lib/types';

export default function SwotPage() {
  const { competitors, swotItems, evidenceSources, addSwotItem, deleteSwotItem } = useAppStore();

  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>('chatgpt');
  const [viewMode, setViewMode] = useState<'individual' | 'cross_compare'>('individual');

  // New SWOT Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCompetitorId, setNewCompetitorId] = useState('chatgpt');
  const [newQuadrant, setNewQuadrant] = useState<SwotQuadrant>('strength');
  const [newStatement, setNewStatement] = useState('');
  const [newRationale, setNewRationale] = useState('');
  const [newConfidence, setNewConfidence] = useState<'high' | 'medium' | 'low'>('high');
  const [newEvidenceSourceId, setNewEvidenceSourceId] = useState(evidenceSources[0]?.id || '');
  const [newIsVerified, setNewIsVerified] = useState(true);

  const activeCompetitor =
    competitors.find((c) => c.id === selectedCompetitorId) || competitors[0];
  const activeItems = swotItems.filter((item) => item.competitorId === activeCompetitor.id);

  const strengths = activeItems.filter((i) => i.quadrant === 'strength');
  const weaknesses = activeItems.filter((i) => i.quadrant === 'weakness');
  const opportunities = activeItems.filter((i) => i.quadrant === 'opportunity');
  const threats = activeItems.filter((i) => i.quadrant === 'threat');

  const handleCreateSwot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatement || !newRationale) {
      alert('Please provide a statement and rationale.');
      return;
    }
    addSwotItem({
      competitorId: newCompetitorId,
      quadrant: newQuadrant,
      statement: newStatement,
      rationale: newRationale,
      confidence: newConfidence,
      evidenceSourceId: newEvidenceSourceId,
      isVerifiedObservation: newIsVerified,
    });
    setIsAddOpen(false);
    setNewStatement('');
    setNewRationale('');
  };

  const renderQuadrantCard = (
    title: string,
    items: SwotItem[],
    quadrant: SwotQuadrant,
    icon: React.ReactNode,
    borderHeaderColor: string,
    bgBadge: string,
    textColor: string
  ) => (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden">
      <div>
        <div
          className={`p-4 border-b border-slate-100 flex items-center justify-between ${borderHeaderColor}`}
        >
          <div className="flex items-center gap-2">
            {icon}
            <h4 className="font-bold text-sm text-slate-900">{title}</h4>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${bgBadge} ${textColor}`}>
            {items.length} Points
          </span>
        </div>

        <div className="p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs italic">
              No items recorded in this quadrant.
            </div>
          ) : (
            items.map((item) => {
              const source = evidenceSources.find((s) => s.id === item.evidenceSourceId);

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-1.5 text-xs group relative"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 leading-snug">{item.statement}</span>
                    <button
                      onClick={() => deleteSwotItem(item.id)}
                      className="text-slate-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-slate-600 leading-relaxed text-[11px]">{item.rationale}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/50 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`px-1.5 py-0.2 rounded font-medium ${
                          item.confidence === 'high'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.confidence === 'medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {item.confidence.toUpperCase()} CONFIDENCE
                      </span>

                      <span className="text-slate-400">
                        {item.isVerifiedObservation ? 'Empirical Finding' : 'Strategic Hypothesis'}
                      </span>
                    </div>

                    {source && (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        Evidence <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="p-3 bg-slate-50/50 border-t border-slate-100 text-right">
        <button
          onClick={() => {
            setNewCompetitorId(activeCompetitor.id);
            setNewQuadrant(quadrant);
            setIsAddOpen(true);
          }}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add {title.slice(0, -1)}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Strategic SWOT Analysis
          </h2>
          <p className="text-sm text-slate-500">
            Internal architectural capabilities vs. external market and technological forces
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center p-0.5 rounded-lg border border-slate-200 bg-white text-xs">
            <button
              onClick={() => setViewMode('individual')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'individual' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Single Competitor
            </button>
            <button
              onClick={() => setViewMode('cross_compare')}
              className={`px-3 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'cross_compare' ? 'bg-slate-900 text-white' : 'text-slate-600'
              }`}
            >
              Cross-Competitor
            </button>
          </div>

          <button
            onClick={() => {
              setNewCompetitorId(activeCompetitor.id);
              setIsAddOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add SWOT Item</span>
          </button>
        </div>
      </div>

      {viewMode === 'individual' ? (
        <>
          {/* Competitor Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
            {competitors.map((comp) => {
              const isSelected = comp.id === activeCompetitor.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedCompetitorId(comp.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
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
                </button>
              );
            })}
          </div>

          {/* 4-Quadrant Matrix Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Strengths */}
            {renderQuadrantCard(
              'Strengths',
              strengths,
              'strength',
              <TrendingUp className="w-4 h-4 text-emerald-600" />,
              'border-emerald-100 bg-emerald-50/20',
              'bg-emerald-100',
              'text-emerald-800'
            )}

            {/* Weaknesses */}
            {renderQuadrantCard(
              'Weaknesses',
              weaknesses,
              'weakness',
              <AlertTriangle className="w-4 h-4 text-amber-600" />,
              'border-amber-100 bg-amber-50/20',
              'bg-amber-100',
              'text-amber-800'
            )}

            {/* Opportunities */}
            {renderQuadrantCard(
              'Opportunities',
              opportunities,
              'opportunity',
              <Zap className="w-4 h-4 text-blue-600" />,
              'border-blue-100 bg-blue-50/20',
              'bg-blue-100',
              'text-blue-800'
            )}

            {/* Threats */}
            {renderQuadrantCard(
              'Threats',
              threats,
              'threat',
              <ShieldAlert className="w-4 h-4 text-rose-600" />,
              'border-rose-100 bg-rose-50/20',
              'bg-rose-100',
              'text-rose-800'
            )}
          </div>
        </>
      ) : (
        /* Cross-Competitor Comparison Table View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-base">
              Cross-Competitor SWOT Synthesis
            </h3>
            <p className="text-xs text-slate-500">
              Comparative quadrant inspection side-by-side across all four AI assistants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {competitors.map((comp) => {
              const compItems = swotItems.filter((i) => i.competitorId === comp.id);
              const compStrengths = compItems.filter((i) => i.quadrant === 'strength');
              const compWeaknesses = compItems.filter((i) => i.quadrant === 'weakness');

              return (
                <div
                  key={comp.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4 text-xs"
                >
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: comp.color }}
                    />
                    <span className="font-bold text-slate-900 text-sm">{comp.name}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> Strengths
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {compStrengths.slice(0, 2).map((s) => (
                        <li key={s.id}>• {s.statement}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    <div className="font-bold text-amber-700 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Weaknesses
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {compWeaknesses.slice(0, 2).map((w) => (
                        <li key={w.id}>• {w.statement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add SWOT Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Record Strategic SWOT Observation"
        description="Add a strength, weakness, opportunity, or threat backed by primary evidence."
      >
        <form onSubmit={handleCreateSwot} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Competitor *</label>
              <select
                value={newCompetitorId}
                onChange={(e) => setNewCompetitorId(e.target.value)}
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
              <label className="block font-semibold text-slate-700 mb-1">Quadrant *</label>
              <select
                value={newQuadrant}
                onChange={(e) => setNewQuadrant(e.target.value as SwotQuadrant)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="strength">Strength (Internal Advantage)</option>
                <option value="weakness">Weakness (Internal Limitation)</option>
                <option value="opportunity">Opportunity (External Growth)</option>
                <option value="threat">Threat (External Risk/Pressure)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Concise Statement *</label>
            <input
              type="text"
              required
              value={newStatement}
              onChange={(e) => setNewStatement(e.target.value)}
              placeholder="e.g. Unrivaled 2M Token Native Context Window"
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Detailed Analytical Rationale *
            </label>
            <textarea
              required
              value={newRationale}
              onChange={(e) => setNewRationale(e.target.value)}
              placeholder="Provide evidence-based reasoning and industry context..."
              className="w-full p-2 border border-slate-300 rounded-lg h-24"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Confidence Level</label>
              <select
                value={newConfidence}
                onChange={(e) => setNewConfidence(e.target.value as any)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="high">High Confidence</option>
                <option value="medium">Medium Confidence</option>
                <option value="low">Low Confidence</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Evidence Source</label>
              <select
                value={newEvidenceSourceId}
                onChange={(e) => setNewEvidenceSourceId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                {evidenceSources.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isVerified"
              checked={newIsVerified}
              onChange={(e) => setNewIsVerified(e.target.checked)}
              className="rounded text-blue-600"
            />
            <label htmlFor="isVerified" className="text-slate-700 font-medium">
              Verified Observation (Uncheck if strategic forward hypothesis)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Save SWOT Item
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

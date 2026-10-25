'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookmarkCheck,
  Plus,
  FileDown,
  Copy,
  Trash2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';

export default function SavedReportsPage() {
  const { reports, duplicateReport, deleteReport, competitors } = useAppStore();

  const handleDuplicate = (id: string) => {
    duplicateReport(id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this saved report dossier?')) {
      deleteReport(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Saved Intelligence Reports
          </h2>
          <p className="text-sm text-slate-500">
            Archived intelligence dossiers, executive briefings, and customizable templates
          </p>
        </div>

        <Link
          href="/reports/builder"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Report Dossier</span>
        </Link>
      </div>

      {/* Reports Table or Empty State */}
      {reports.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-4 shadow-sm">
          <BookmarkCheck className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">No Saved Reports Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You have not saved any intelligence reports yet. Use the Report Builder to configure
              custom dossiers and export them to PDF.
            </p>
          </div>
          <Link
            href="/reports/builder"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Open Report Builder</span>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="p-4">Dossier Title & Scope</th>
                  <th className="p-4">Audience</th>
                  <th className="p-4">Competitors</th>
                  <th className="p-4">Created Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4 space-y-1 max-w-sm">
                      <Link
                        href="/reports/builder"
                        className="font-bold text-slate-900 hover:text-blue-600 text-sm block"
                      >
                        {report.title}
                      </Link>
                      <div className="text-[11px] text-slate-500">
                        By {report.author} • {report.organization || 'Research Labs'}
                      </div>
                    </td>

                    <td className="p-4 text-slate-700 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                        {report.audience}
                      </span>
                    </td>

                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {report.selectedCompetitorIds.map((cid) => {
                          const comp = competitors.find((c) => c.id === cid);
                          return (
                            <span
                              key={cid}
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: comp?.color || '#3b82f6' }}
                              title={comp?.name || cid}
                            />
                          );
                        })}
                      </div>
                    </td>

                    <td className="p-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {report.reportDate}
                    </td>

                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href="/reports/builder"
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                        >
                          Open & Edit
                        </Link>
                        <button
                          onClick={() => handleDuplicate(report.id)}
                          className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                          title="Duplicate Dossier"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600"
                          title="Delete Dossier"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Information strip */}
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
        <div className="font-semibold text-slate-700 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          Persistence & Export Security:
        </div>
        <p className="leading-relaxed">
          Saved reports persist in local browser storage without transmitting confidential prompts
          or API keys to external servers. High-fidelity PDF exports format automatically when
          printing or using standard browser Save-as-PDF.
        </p>
      </div>
    </div>
  );
}

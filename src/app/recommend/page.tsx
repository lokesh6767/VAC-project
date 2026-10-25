'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  Award,
  Layers,
  Shield,
  HelpCircle,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import {
  TASK_PROFILES,
  generateRecommendations,
} from '@/lib/scoring/recommender';
import { RecommendationPriority } from '@/lib/types';

export default function RecommendPage() {
  const { competitors, capabilities, benchmarkResults } = useAppStore();

  const [selectedTaskId, setSelectedTaskId] = useState<string>('coding_dev');

  const activeTask =
    TASK_PROFILES.find((t) => t.id === selectedTaskId) || TASK_PROFILES[0];

  // User weights initialized with task default
  const [weights, setWeights] = useState<RecommendationPriority>(
    activeTask.defaultWeights
  );

  const handleTaskChange = (taskId: string) => {
    setSelectedTaskId(taskId);
    const task = TASK_PROFILES.find((t) => t.id === taskId);
    if (task) {
      setWeights(task.defaultWeights);
    }
  };

  const handleResetWeights = () => {
    setWeights(activeTask.defaultWeights);
  };

  // Generate recommendations dynamically
  const recommendations = useMemo(() => {
    return generateRecommendations(
      selectedTaskId,
      weights,
      competitors,
      capabilities,
      benchmarkResults
    );
  }, [selectedTaskId, weights, competitors, capabilities, benchmarkResults]);

  const topMatch = recommendations[0];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Task-Oriented Recommendation Engine
        </h2>
        <p className="text-sm text-slate-500">
          Match your specific workflow with documented capabilities, benchmark results, and priority trade-offs
        </p>
      </div>

      {/* Task Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Step 1: Select Your Primary Target Workflow
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TASK_PROFILES.map((task) => {
            const isSelected = task.id === selectedTaskId;

            return (
              <div
                key={task.id}
                onClick={() => handleTaskChange(task.id)}
                className={`p-4 rounded-xl border text-xs cursor-pointer transition-all space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{task.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  )}
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                  {task.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Priority Sliders */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Step 2: Adjust Priority Weights (1 = Low Importance, 5 = Critical)
          </div>
          <button
            onClick={handleResetWeights}
            className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset to Task Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {(
            [
              ['accuracy', 'Accuracy & Precision'],
              ['cost', 'Cost & Free Tier'],
              ['easeOfUse', 'Ease of Use & Ergonomics'],
              ['privacy', 'Enterprise Privacy & Zero Retention'],
              ['integrations', 'Ecosystem & Tools'],
              ['speed', 'Latency & Fast Streaming'],
              ['fileSupport', 'Document & Multi-File Capacity'],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-700">{label}</span>
                <span className="font-bold text-blue-700 font-mono text-xs">
                  {weights[key]}/5
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={weights[key]}
                onChange={(e) =>
                  setWeights({ ...weights, [key]: parseInt(e.target.value, 10) })
                }
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Winner Showcase */}
      {topMatch && (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Award className="w-4 h-4 text-emerald-400" />
              Rank #1 Recommended Assistant ({topMatch.matchScore}% Match Fit)
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-white">
                  {topMatch.competitor.name}
                </h3>
                <div className="text-sm text-blue-200 mt-0.5">
                  by {topMatch.competitor.provider} • {topMatch.competitor.tagline}
                </div>
              </div>
              <Link
                href={`/competitors#${topMatch.competitor.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-white text-slate-900 hover:bg-blue-50 transition-colors self-start sm:self-auto shadow-md"
              >
                Inspect Profile <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed border-t border-white/10 pt-3">
              {topMatch.rationale}
            </p>

            {/* Decisive factors tags */}
            <div className="pt-1">
              <div className="text-xs font-semibold text-blue-200 mb-1.5">
                Primary Decisive Criteria:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {topMatch.decisiveFactors.map((factor, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-white/10 text-white text-xs border border-white/20 font-medium"
                  >
                    ✓ {factor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Ranked Table & Trade-Off Analysis */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h4 className="text-base font-bold text-slate-900">
            Comparative Rankings & Trade-Off Assessment
          </h4>
          <p className="text-xs text-slate-500">
            Transparent scoring breakdown based on task affinity, user weights, and documented limitations
          </p>
        </div>

        <div className="space-y-4">
          {recommendations.map((rec) => (
            <div
              key={rec.competitor.id}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                    #{rec.rank}
                  </span>
                  <div>
                    <h5 className="font-bold text-base text-slate-900">
                      {rec.competitor.name}
                    </h5>
                    <span className="text-xs text-slate-400">
                      {rec.competitor.provider}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-extrabold text-blue-700 font-mono">
                      {rec.matchScore}%
                    </div>
                    <div className="text-[10px] text-slate-400">Match Confidence</div>
                  </div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${rec.matchScore}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Advantages */}
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-1.5">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Key Strengths for
                    This Task
                  </div>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {rec.keyAdvantages.map((adv, i) => (
                      <li key={i}>• {adv}</li>
                    ))}
                  </ul>
                </div>

                {/* Remaining Limitations */}
                <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-100 space-y-1.5">
                  <div className="font-bold text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Remaining Constraints
                  </div>
                  <ul className="space-y-1 text-slate-600 text-[11px]">
                    {rec.criticalLimitations.map((lim, i) => (
                      <li key={i}>• {lim}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {rec.missingEvidenceNotice && (
                <div className="text-[11px] text-slate-400 italic">
                  * {rec.missingEvidenceNotice}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

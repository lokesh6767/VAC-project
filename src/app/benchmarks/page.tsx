'use client';

import React, { useState } from 'react';
import {
  FlaskConical,
  Plus,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Filter,
  Info,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useAppStore } from '@/lib/storage/store';
import { calculateWeightedRubricScore, RUBRIC_CRITERIA_WEIGHTS } from '@/lib/scoring/rubric';
import { Modal } from '@/components/ui/Modal';
import { BenchmarkCategory, RubricScores } from '@/lib/types';

export default function BenchmarksPage() {
  const {
    benchmarkTasks,
    benchmarkResults,
    competitors,
    addBenchmarkTask,
    addBenchmarkResult,
  } = useAppStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(benchmarkTasks[0]?.id || '');

  // Modals
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isNewEvalOpen, setIsNewEvalOpen] = useState(false);

  // New Task Form State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState<BenchmarkCategory>('coding_debugging');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPrompt, setTaskPrompt] = useState('');
  const [taskCriteriaInput, setTaskCriteriaInput] = useState('');

  // New Evaluation Form State
  const [evalCompetitorId, setEvalCompetitorId] = useState('claude');
  const [evalModelVersion, setEvalModelVersion] = useState('');
  const [evalOutputSample, setEvalOutputSample] = useState('');
  const [evalNotes, setEvalNotes] = useState('');
  const [scores, setScores] = useState<RubricScores>({
    accuracy: 5,
    relevance: 5,
    clarity: 5,
    instructionFollowing: 5,
    sourceReliability: 5,
    taskCompletion: 5,
  });

  const activeTask = benchmarkTasks.find((t) => t.id === selectedTaskId) || benchmarkTasks[0];
  const activeRuns = benchmarkResults.filter((r) => r.taskId === activeTask?.id);

  const filteredTasks =
    selectedCategory === 'all'
      ? benchmarkTasks
      : benchmarkTasks.filter((t) => t.category === selectedCategory);

  const liveCalculatedScore = calculateWeightedRubricScore(scores);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskPrompt) {
      alert('Task title and prompt are required.');
      return;
    }
    const criteria = taskCriteriaInput
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    addBenchmarkTask({
      title: taskTitle,
      category: taskCategory,
      description: taskDescription || 'Custom user-defined benchmark evaluation.',
      prompt: taskPrompt,
      promptVersion: '1.0.0',
      expectedCriteria: criteria.length > 0 ? criteria : ['Factual correctness and prompt adherence'],
      isCustom: true,
    });

    setIsNewTaskOpen(false);
    setTaskTitle('');
    setTaskPrompt('');
    setTaskDescription('');
    setTaskCriteriaInput('');
  };

  const handleCreateEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTask) return;

    addBenchmarkResult({
      taskId: activeTask.id,
      competitorId: evalCompetitorId,
      modelVersion: evalModelVersion || 'Production Default',
      testMethod: 'peer_review',
      outputSample: evalOutputSample,
      rubricScores: scores,
      overallScore: liveCalculatedScore,
      evaluatorNotes: evalNotes || 'Empirical rubric evaluation.',
      isVerified: true,
    });

    setIsNewEvalOpen(false);
    setEvalOutputSample('');
    setEvalNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Benchmark Lab & Rubric Testing
          </h2>
          <p className="text-sm text-slate-500">
            Repeatable evaluation tasks scored via weighted 1–5 empirical rubrics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewTaskOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Benchmark Task</span>
          </button>
          <button
            onClick={() => {
              setEvalModelVersion(
                competitors.find((c) => c.id === evalCompetitorId)?.coreModels[0]?.name || ''
              );
              setIsNewEvalOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Record Test Run</span>
          </button>
        </div>
      </div>

      {/* Task Selection Grid & Category Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Task Browser */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Benchmark Tasks ({filteredTasks.length})
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white text-slate-700"
            >
              <option value="all">All Categories</option>
              <option value="coding_debugging">Coding & Debugging</option>
              <option value="student_learning">Student Learning</option>
              <option value="math_logic">Math Logic</option>
              <option value="research_sourcing">Research & Sourcing</option>
              <option value="instruction_following">Instruction Following</option>
              <option value="document_analysis">Document Analysis</option>
            </select>
          </div>

          <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1">
            {filteredTasks.map((task) => {
              const isSelected = task.id === activeTask?.id;
              const runCount = benchmarkResults.filter((r) => r.taskId === task.id).length;

              return (
                <div
                  key={task.id}
                  onClick={() => setSelectedTaskId(task.id)}
                  className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-400 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 leading-snug">{task.title}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {runCount} runs
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-1 line-clamp-2">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100 mt-2">
                    <span className="capitalize">{task.category.replace('_', ' ')}</span>
                    {task.isCustom && (
                      <span className="text-indigo-600 font-medium">User Custom</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Columns: Active Task Details & Scored Runs */}
        <div className="lg:col-span-2 space-y-6">
          {activeTask ? (
            <>
              {/* Task Detail Card */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {activeTask.category.replace('_', ' ')} • Version {activeTask.promptVersion}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                      {activeTask.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">Created: {activeTask.createdAt}</span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">Official Test Prompt:</div>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {activeTask.prompt}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">Expected Evaluation Criteria:</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {activeTask.expectedCriteria.map((crit, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-1.5 p-2 rounded bg-slate-50 border border-slate-100"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{crit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Scored Benchmark Results */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900">
                    Recorded Competitor Evaluations ({activeRuns.length})
                  </h4>
                  <button
                    onClick={() => setIsNewEvalOpen(true)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    + Add Model Result
                  </button>
                </div>

                {activeRuns.length === 0 ? (
                  <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-3">
                    <FlaskConical className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="text-xs text-slate-600">
                      No competitor evaluation has been recorded yet for this benchmark task.
                    </p>
                    <button
                      onClick={() => setIsNewEvalOpen(true)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white"
                    >
                      Record First Run
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeRuns.map((run) => {
                      const comp = competitors.find((c) => c.id === run.competitorId);

                      return (
                        <div
                          key={run.id}
                          className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4"
                        >
                          {/* Competitor Header & Aggregate Score */}
                          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-3">
                              <span
                                className="w-3.5 h-3.5 rounded-full"
                                style={{ backgroundColor: comp?.color || '#3b82f6' }}
                              />
                              <div>
                                <h5 className="font-bold text-sm text-slate-900">
                                  {comp?.name || run.competitorId}
                                </h5>
                                <span className="text-[11px] text-slate-500 font-mono">
                                  {run.modelVersion}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-2xl font-extrabold text-blue-700 font-mono">
                                {run.overallScore.toFixed(2)}
                                <span className="text-xs font-normal text-slate-400"> / 5.0</span>
                              </div>
                              <div className="text-[10px] text-slate-400">Weighted Rubric Score</div>
                            </div>
                          </div>

                          {/* 6 Dimension Rubric Breakdown */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center text-xs">
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Accuracy
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.accuracy}/5
                              </div>
                            </div>
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Relevance
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.relevance}/5
                              </div>
                            </div>
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Clarity
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.clarity}/5
                              </div>
                            </div>
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Instruction
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.instructionFollowing}/5
                              </div>
                            </div>
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Sourcing
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.sourceReliability}/5
                              </div>
                            </div>
                            <div className="p-2 rounded bg-slate-50 border border-slate-100 space-y-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">
                                Completion
                              </span>
                              <div className="font-bold text-slate-800 text-sm">
                                {run.rubricScores.taskCompletion}/5
                              </div>
                            </div>
                          </div>

                          {/* Evaluator Notes */}
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-700 space-y-1">
                            <div className="font-semibold text-slate-800">Evaluator Findings:</div>
                            <p className="leading-relaxed">{run.evaluatorNotes}</p>
                          </div>

                          {/* Output Sample Preview */}
                          {run.outputSample && (
                            <details className="text-xs text-slate-500 group">
                              <summary className="cursor-pointer font-medium text-blue-600 hover:underline">
                                View recorded model output sample
                              </summary>
                              <div className="mt-2 p-3 bg-slate-900 text-slate-200 rounded-lg font-mono text-[11px] overflow-x-auto whitespace-pre-wrap max-h-40">
                                {run.outputSample}
                              </div>
                            </details>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : null}
          </div>
        </div>

      {/* Scientific Disclaimer */}
      <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-blue-600" />
          Reproducibility & Scientific Disclaimer
        </div>
        <p className="leading-relaxed">
          Scores reflect recorded performance on specific prompt versions and rubrics under
          controlled conditions. Benchmark results do not imply universal, permanent AI intelligence,
          nor do they guarantee identical outcomes on differing query formulations.
        </p>
      </div>

      {/* New Task Modal */}
      <Modal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        title="Create Repeatable Benchmark Task"
        description="Define a new prompt task and evaluation criteria to test across AI assistants."
      >
        <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Asynchronous Thread Pool Implementation"
              className="w-full p-2 border border-slate-300 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category *</label>
              <select
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value as BenchmarkCategory)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white"
              >
                <option value="coding_debugging">Coding & Debugging</option>
                <option value="student_learning">Student Learning</option>
                <option value="math_logic">Mathematics</option>
                <option value="research_sourcing">Research & Sourcing</option>
                <option value="instruction_following">Instruction Following</option>
                <option value="document_analysis">Document Analysis</option>
                <option value="summarization">Writing & Summarization</option>
                <option value="multimodal">Multimodal</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <input
                type="text"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="High-level goal of this test..."
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Test Prompt *</label>
            <textarea
              required
              value={taskPrompt}
              onChange={(e) => setTaskPrompt(e.target.value)}
              placeholder="The exact prompt to feed into each AI assistant..."
              className="w-full p-2 border border-slate-300 rounded-lg h-28 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Expected Criteria (One per line)
            </label>
            <textarea
              value={taskCriteriaInput}
              onChange={(e) => setTaskCriteriaInput(e.target.value)}
              placeholder="e.g. Valid syntax without errors&#10;Handles cancellation correctly"
              className="w-full p-2 border border-slate-300 rounded-lg h-20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewTaskOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Save Benchmark Task
            </button>
          </div>
        </form>
      </Modal>

      {/* New Evaluation Run Modal */}
      <Modal
        isOpen={isNewEvalOpen}
        onClose={() => setIsNewEvalOpen(false)}
        title="Record Benchmark Evaluation Run"
        description={`Evaluate an assistant response on task: "${activeTask?.title}"`}
      >
        <form onSubmit={handleCreateEvaluation} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Competitor *</label>
              <select
                value={evalCompetitorId}
                onChange={(e) => setEvalCompetitorId(e.target.value)}
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
              <label className="block font-semibold text-slate-700 mb-1">Model Version Tag</label>
              <input
                type="text"
                value={evalModelVersion}
                onChange={(e) => setEvalModelVersion(e.target.value)}
                placeholder="e.g. Claude 3.5 Sonnet / o3-mini"
                className="w-full p-2 border border-slate-300 rounded-lg"
              />
            </div>
          </div>

          {/* 1–5 Rubric Sliders with Live Weighted Aggregate */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs">
                Rubric Criteria Evaluation (1–5 Scale)
              </span>
              <div className="text-right">
                <span className="text-xs text-slate-500">Calculated Score: </span>
                <span className="text-base font-extrabold text-blue-700 font-mono">
                  {liveCalculatedScore.toFixed(2)}/5.0
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {(
                [
                  ['accuracy', 'Accuracy (Factuality, Freedom from bugs) - 25%'],
                  ['relevance', 'Relevance (Prompt responsiveness) - 15%'],
                  ['clarity', 'Clarity & Formatting - 15%'],
                  ['instructionFollowing', 'Instruction & Negative Constraint Adherence - 20%'],
                  ['sourceReliability', 'Source Reliability & Citation Integrity - 10%'],
                  ['taskCompletion', 'Wholeness of Delivered Solution - 15%'],
                ] as const
              ).map(([field, label]) => (
                <div key={field} className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-700 font-medium">{label}</span>
                    <span className="font-bold text-blue-700 font-mono text-xs">
                      {scores[field]}/5
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={scores[field]}
                    onChange={(e) =>
                      setScores({ ...scores, [field]: parseInt(e.target.value, 10) })
                    }
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Evaluator Notes</label>
            <textarea
              value={evalNotes}
              onChange={(e) => setEvalNotes(e.target.value)}
              placeholder="Explain why points were deducted or exemplary performance..."
              className="w-full p-2 border border-slate-300 rounded-lg h-16"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Output Text Sample</label>
            <textarea
              value={evalOutputSample}
              onChange={(e) => setEvalOutputSample(e.target.value)}
              placeholder="Paste generated response..."
              className="w-full p-2 border border-slate-300 rounded-lg h-20 font-mono text-xs"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsNewEvalOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold"
            >
              Record Evaluation
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

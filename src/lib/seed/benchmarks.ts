import { BenchmarkTask, BenchmarkResult } from '../types';

export const SEED_BENCHMARK_TASKS: BenchmarkTask[] = [
  {
    id: 'task-coding-async',
    title: 'TypeScript Async Concurrency & Race Condition Fix',
    category: 'coding_debugging',
    description: 'Provide an async queue processor that handles batching, cancellation, and retry with exponential backoff.',
    prompt:
      'Write a production-grade TypeScript class `AsyncBatchQueue<T>` that queues tasks, executes them in batches of size `batchSize`, retries failed tasks up to `maxRetries` with exponential backoff and jitter, and supports an `AbortSignal` for graceful cancellation. Do not use external libraries. Include unit test examples.',
    promptVersion: '1.2.0',
    expectedCriteria: [
      'Valid TypeScript syntax with strict typing',
      'Correct exponential backoff calculation with randomized jitter',
      'Proper AbortSignal listening and cleanup without memory leaks',
      'Graceful error handling and clear test cases',
    ],
    isCustom: false,
    createdAt: '2026-01-20',
  },
  {
    id: 'task-student-quantum',
    title: 'Quantum Tunneling: Pedagogical Concept Explanation',
    category: 'student_learning',
    description: 'Explain quantum mechanical tunneling to a first-year college physics student.',
    prompt:
      'Explain the phenomenon of quantum tunneling to an undergraduate student taking introductory modern physics. Structure your answer with: 1) Everyday intuitive analogy, 2) The classical mechanics barrier vs wave function probability density, 3) The Schrödinger equation context (qualitative), and 4) Two real-world technological applications (e.g. Scanning Tunneling Microscope and Flash memory). Keep the tone encouraging and rigorous.',
    promptVersion: '1.0.0',
    expectedCriteria: [
      'Analogy is physically faithful without creating gross misconceptions',
      'Clearly defines wave function decay inside a finite potential barrier',
      'Explains transmission coefficient qualitatively',
      'Accurate technological applications explained clearly',
    ],
    isCustom: false,
    createdAt: '2026-01-22',
  },
  {
    id: 'task-math-bayes',
    title: 'Multi-Step Bayesian Probability & False Positives',
    category: 'math_logic',
    description: 'Solve a multi-step conditional probability problem with rare disease screening.',
    prompt:
      'A rare medical condition has a prevalence of 0.1% (1 in 1000) in the general population. A diagnostic test has a sensitivity (true positive rate) of 99% and a specificity (true negative rate) of 98%. If a randomly selected patient tests positive: 1) What is the posterior probability that they actually have the condition? 2) If the patient takes a second, independent test from a different lab with the exact same characteristics and tests positive again, what is the revised probability? Show every calculation step explicitly with Bayes formula.',
    promptVersion: '1.1.0',
    expectedCriteria: [
      'Correct application of Bayes theorem: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|~D)P(~D)]',
      'Step 1 calculation yields approximately 4.72% (0.00099 / (0.00099 + 0.01998))',
      'Step 2 uses the 4.72% posterior as the new prior to yield approximately 71.1%',
      'Explains base-rate fallacy clearly',
    ],
    isCustom: false,
    createdAt: '2026-01-25',
  },
  {
    id: 'task-research-battery',
    title: 'Solid-State vs Lithium-Ion Battery Comparative Analysis',
    category: 'research_sourcing',
    description: 'Synthesize comparative engineering trade-offs with verifiable citations.',
    prompt:
      'Compare solid-state lithium-metal batteries with conventional liquid electrolyte lithium-ion batteries across four dimensions: 1) Gravimetric and volumetric energy density, 2) Thermal stability and safety margins (dendrite formation), 3) Cycle life at fast charging rates (4C+), and 4) Manufacturing and supply chain hurdles. State verified ranges and acknowledge where industry consensus is still pending.',
    promptVersion: '1.0.0',
    expectedCriteria: [
      'Accurate numerical ranges for gravimetric density (Wh/kg)',
      'Detailed chemical/mechanical mechanism of dendrite suppression',
      'Honest appraisal of manufacturing cost and interfacial impedance challenges',
      'Zero fabricated corporate announcements',
    ],
    isCustom: false,
    createdAt: '2026-02-01',
  },
  {
    id: 'task-instruction-json',
    title: 'Negative Constraint Adherence & JSON Extraction',
    category: 'instruction_following',
    description: 'Extract customer sentiment into strict JSON schema while obeying negative constraints.',
    prompt:
      'Analyze the following customer review: "The battery lasts only 4 hours, and the screen gets hot during calls, but the camera takes marvelous photos."\n\nOutput STRICT valid JSON only. Do not include markdown codeblocks (no ```json). Do not include any introductory or concluding text. The JSON schema must have exactly three keys: "positive_aspects" (array of strings), "negative_aspects" (array of strings), and "overall_sentiment" (string with values strictly: "positive", "neutral", "negative", or "mixed"). CONSTRAINT: Under no circumstances use the letter "z" or the word "device" anywhere in your output.',
    promptVersion: '2.0.0',
    expectedCriteria: [
      'Zero markdown wrappers (raw JSON only)',
      'Exact 3-key schema respected',
      'Negative constraint: Absolutely zero occurrences of letter "z"',
      'Negative constraint: Absolutely zero occurrences of word "device"',
    ],
    isCustom: false,
    createdAt: '2026-02-05',
  },
  {
    id: 'task-doc-contract',
    title: 'Commercial Master Services Agreement Clause Extraction',
    category: 'document_analysis',
    description: 'Extract indemnity, liability caps, and jurisdiction terms from contractual text.',
    prompt:
      'Review a standard enterprise MSA clause. Identify: 1) Aggregate liability cap (super-cap carve-outs), 2) Mutual indemnity triggers for third-party intellectual property infringement, 3) Governing law and dispute forum, and 4) Any unilateral modification rights. Highlight ambiguities that a commercial legal reviewer should flag.',
    promptVersion: '1.0.0',
    expectedCriteria: [
      'Accurately identifies limitation of liability multipliers',
      'Distinguishes direct damages from consequential/punitive carve-outs',
      'Flags IP defense vs settlement authorization nuances',
      'Identifies legal jurisdiction clauses',
    ],
    isCustom: false,
    createdAt: '2026-02-08',
  },
];

export const SEED_BENCHMARK_RESULTS: BenchmarkResult[] = [
  // --- Task 1: TypeScript Async Concurrency ---
  {
    id: 'res-t1-claude',
    taskId: 'task-coding-async',
    competitorId: 'claude',
    modelVersion: 'Claude 3.5 Sonnet',
    testDate: '2026-02-12',
    testMethod: 'peer_review',
    outputSample:
      '```typescript\nexport class AsyncBatchQueue<T> {\n  private queue: Array<() => Promise<T>> = [];\n  private running = false;\n  constructor(private batchSize: number, private maxRetries = 3) {}\n  // Implements jittered exponential backoff and AbortSignal abort listeners cleanly\n}\n```',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.85,
    evaluatorNotes:
      'Flawless TypeScript compilation. Fully implemented AbortSignal listener removal on completion to prevent memory leaks. Provided comprehensive Jest test suite.',
    isVerified: true,
  },
  {
    id: 'res-t1-chatgpt',
    taskId: 'task-coding-async',
    competitorId: 'chatgpt',
    modelVersion: 'GPT-4o / o3-mini',
    testDate: '2026-02-12',
    testMethod: 'peer_review',
    outputSample:
      '```typescript\nexport class AsyncBatchQueue<T> {\n  private batchSize: number;\n  // Implemented full Promise.allSettled concurrency\n}\n```',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.75,
    evaluatorNotes:
      'Highly rigorous implementation. Used jitter correctly. Slightly more verbose than Claude, but 100% syntactically correct and passed all edge tests.',
    isVerified: true,
  },
  {
    id: 'res-t1-gemini',
    taskId: 'task-coding-async',
    competitorId: 'gemini',
    modelVersion: 'Gemini 2.0 Flash',
    testDate: '2026-02-12',
    testMethod: 'peer_review',
    outputSample:
      '```typescript\nexport class AsyncBatchQueue<T> {\n  // Clean async iterator implementation with batch chunks\n}\n```',
    rubricScores: {
      accuracy: 4,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 4,
      sourceReliability: 4,
      taskCompletion: 4,
    },
    overallScore: 4.25,
    evaluatorNotes:
      'Functional code, but omitted unregistering the abort event listener, which can cause event listener leaks if many jobs are cancelled.',
    isVerified: true,
  },
  {
    id: 'res-t1-copilot',
    taskId: 'task-coding-async',
    competitorId: 'copilot',
    modelVersion: 'Microsoft Copilot (GPT-4o)',
    testDate: '2026-02-12',
    testMethod: 'peer_review',
    outputSample:
      '```typescript\nclass AsyncBatchQueue<T> {\n  // Standard queue loop implementation\n}\n```',
    rubricScores: {
      accuracy: 4,
      relevance: 4,
      clarity: 4,
      instructionFollowing: 4,
      sourceReliability: 4,
      taskCompletion: 4,
    },
    overallScore: 4.0,
    evaluatorNotes:
      'Correct baseline logic. Jitter calculation was simple uniform random rather than full decorrelated jitter.',
    isVerified: true,
  },

  // --- Task 2: Quantum Tunneling Explanation ---
  {
    id: 'res-t2-claude',
    taskId: 'task-student-quantum',
    competitorId: 'claude',
    modelVersion: 'Claude 3.5 Sonnet',
    testDate: '2026-02-14',
    testMethod: 'peer_review',
    outputSample:
      'Imagine rolling a tennis ball against a solid concrete wall. In everyday physics, unless you provide enough kinetic energy to leap over the wall, the ball will always bounce back...',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 5,
      taskCompletion: 5,
    },
    overallScore: 5.0,
    evaluatorNotes:
      'Exceptional pedagogical structure. Seamlessly transitioned from tennis ball analogy to wave equation exponential decay and STM electron tunneling without mathematical shortcuts.',
    isVerified: true,
  },
  {
    id: 'res-t2-gemini',
    taskId: 'task-student-quantum',
    competitorId: 'gemini',
    modelVersion: 'Gemini 2.0 Flash / Pro',
    testDate: '2026-02-14',
    testMethod: 'peer_review',
    outputSample:
      'Quantum tunneling is a fundamental wave-particle duality consequence where a subatomic particle crosses a potential energy barrier higher than its kinetic energy...',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 4,
      sourceReliability: 5,
      taskCompletion: 5,
    },
    overallScore: 4.85,
    evaluatorNotes:
      'Great scientific depth. Provided helpful ASCII diagram of the exponential probability decay inside the barrier.',
    isVerified: true,
  },
  {
    id: 'res-t2-chatgpt',
    taskId: 'task-student-quantum',
    competitorId: 'chatgpt',
    modelVersion: 'GPT-4o',
    testDate: '2026-02-14',
    testMethod: 'peer_review',
    outputSample:
      'In classical mechanics, conservation of energy prevents an object from reaching a region where potential energy exceeds total energy...',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.7,
    evaluatorNotes:
      'Clear, accurate, and answered all 4 required sections. Good real-world coverage of Flash memory floating-gate transistors.',
    isVerified: true,
  },
  {
    id: 'res-t2-copilot',
    taskId: 'task-student-quantum',
    competitorId: 'copilot',
    modelVersion: 'Microsoft Copilot',
    testDate: '2026-02-14',
    testMethod: 'peer_review',
    outputSample:
      'Quantum tunneling allows particles to pass through barriers that they classically shouldn’t be able to climb over...',
    rubricScores: {
      accuracy: 4,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 4,
      sourceReliability: 4,
      taskCompletion: 4,
    },
    overallScore: 4.2,
    evaluatorNotes:
      'Solid overview. The analogy used was a bit brief, but all requested technological examples were cited with references.',
    isVerified: true,
  },

  // --- Task 3: Bayesian Probability ---
  {
    id: 'res-t3-chatgpt',
    taskId: 'task-math-bayes',
    competitorId: 'chatgpt',
    modelVersion: 'o1 / o3-mini',
    testDate: '2026-02-16',
    testMethod: 'peer_review',
    outputSample:
      'Step 1: P(D)=0.001, P(+|D)=0.99, P(+|~D)=0.02. P(+)=(0.99)(0.001) + (0.02)(0.999) = 0.00099 + 0.01998 = 0.02097. P(D|+) = 0.00099 / 0.02097 ≈ 4.721%.\nStep 2: Using P(D)=0.04721 as new prior... P(D|+,+) = 71.05%.',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 5,
      taskCompletion: 5,
    },
    overallScore: 5.0,
    evaluatorNotes:
      'Exemplary deduction. o1 chain-of-thought double-checked the arithmetic, identified the exact decimal roundings, and explained the base-rate fallacy thoroughly.',
    isVerified: true,
  },
  {
    id: 'res-t3-claude',
    taskId: 'task-math-bayes',
    competitorId: 'claude',
    modelVersion: 'Claude 3.5 Sonnet',
    testDate: '2026-02-16',
    testMethod: 'peer_review',
    outputSample:
      'Let D be the event the patient has the disease, and + be a positive test result...\n1) P(D|+) ≈ 4.72%\n2) Second independent test gives revised posterior of approximately 71.1%.',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 5,
      taskCompletion: 5,
    },
    overallScore: 5.0,
    evaluatorNotes:
      'Flawless algebraic derivation and intuitive explanation of why the false-positive rate (2%) dominates the true positive rate on a rare 0.1% baseline.',
    isVerified: true,
  },
  {
    id: 'res-t3-gemini',
    taskId: 'task-math-bayes',
    competitorId: 'gemini',
    modelVersion: 'Gemini 2.0 Flash',
    testDate: '2026-02-16',
    testMethod: 'peer_review',
    outputSample:
      'Step 1: P(D|+) = (0.99 * 0.001) / ((0.99 * 0.001) + (0.02 * 0.999)) = 0.0472 (4.72%).\nStep 2: The second test yields 71.1%.',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.75,
    evaluatorNotes:
      'Accurate arithmetic and correct final percentages. Good breakdown of terms.',
    isVerified: true,
  },
  {
    id: 'res-t3-copilot',
    taskId: 'task-math-bayes',
    competitorId: 'copilot',
    modelVersion: 'Microsoft Copilot',
    testDate: '2026-02-16',
    testMethod: 'peer_review',
    outputSample:
      'Applying Bayes formula:\nP(D|+) = 0.00099 / (0.00099 + 0.01998) = 0.0472 or 4.72%...\nFor the second test, revised probability reaches ~71.1%.',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.7,
    evaluatorNotes:
      'Correct answers and formulas. Helpful step-by-step display.',
    isVerified: true,
  },

  // --- Task 5: Negative Constraint & JSON Adherence ---
  {
    id: 'res-t5-claude',
    taskId: 'task-instruction-json',
    competitorId: 'claude',
    modelVersion: 'Claude 3.5 Sonnet',
    testDate: '2026-02-18',
    testMethod: 'peer_review',
    outputSample:
      '{"positive_aspects":["The camera takes marvelous photos"],"negative_aspects":["The battery lasts only four hours","The screen heats up during calls"],"overall_sentiment":"mixed"}',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 5,
      taskCompletion: 5,
    },
    overallScore: 5.0,
    evaluatorNotes:
      '100% adherence. Zero markdown wrapper tokens emitted, exactly 3 keys, zero occurrences of the letter "z", and avoided the word "device" by rephrasing.',
    isVerified: true,
  },
  {
    id: 'res-t5-chatgpt',
    taskId: 'task-instruction-json',
    competitorId: 'chatgpt',
    modelVersion: 'GPT-4o',
    testDate: '2026-02-18',
    testMethod: 'peer_review',
    outputSample:
      '{"positive_aspects":["marvelous camera photos"],"negative_aspects":["short battery duration","screen heating during calls"],"overall_sentiment":"mixed"}',
    rubricScores: {
      accuracy: 5,
      relevance: 5,
      clarity: 5,
      instructionFollowing: 5,
      sourceReliability: 4,
      taskCompletion: 5,
    },
    overallScore: 4.85,
    evaluatorNotes:
      'Followed all negative constraints without adding markdown tags. Valid JSON parse.',
    isVerified: true,
  },
  {
    id: 'res-t5-gemini',
    taskId: 'task-instruction-json',
    competitorId: 'gemini',
    modelVersion: 'Gemini 2.0 Flash',
    testDate: '2026-02-18',
    testMethod: 'peer_review',
    outputSample:
      '```json\n{"positive_aspects":["camera takes marvelous photos"],"negative_aspects":["battery lasts only 4 hours","screen gets hot during calls"],"overall_sentiment":"mixed"}\n```',
    rubricScores: {
      accuracy: 4,
      relevance: 5,
      clarity: 4,
      instructionFollowing: 2,
      sourceReliability: 4,
      taskCompletion: 4,
    },
    overallScore: 3.55,
    evaluatorNotes:
      'Failed negative constraint: wrapped output in ```json markdown codeblock despite explicit instruction forbidding it. Content itself avoided "z" and "device".',
    isVerified: true,
  },
  {
    id: 'res-t5-copilot',
    taskId: 'task-instruction-json',
    competitorId: 'copilot',
    modelVersion: 'Microsoft Copilot',
    testDate: '2026-02-18',
    testMethod: 'peer_review',
    outputSample:
      'Here is your JSON:\n```json\n{"positive_aspects":["marvelous camera photos"],"negative_aspects":["battery lasts only 4 hours","screen gets hot during calls"],"overall_sentiment":"mixed"}\n```',
    rubricScores: {
      accuracy: 4,
      relevance: 4,
      clarity: 4,
      instructionFollowing: 2,
      sourceReliability: 4,
      taskCompletion: 3,
    },
    overallScore: 3.3,
    evaluatorNotes:
      'Failed instruction: included introductory conversational filler ("Here is your JSON:") and markdown backticks. Did respect negative word constraints.',
    isVerified: true,
  },
];

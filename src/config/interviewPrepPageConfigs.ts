/**
 * Configuration for Interview Prep topic pages.
 * Each config contains metadata and intro content for a single page.
 */

import {
  stdlibIntro,
  designPatternsIntro,
  generatorsIntro,
  greedyIntro,
  intervalsIntro,
  mathIntro,
  segmentTreeIntro
} from './interviewPrepIntros'

export interface InterviewPrepPageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro: string
  hasTabs?: boolean
  basePath?: string
}

export const interviewPrepPageConfigs: Record<string, InterviewPrepPageConfig> = {
  stdlib: {
    type: 'Python Standard Library',
    badge: 'py',
    color: 'var(--accent-stdlib)',
    description: 'Essential functools, itertools, and collections for interviews. @lru_cache is interview gold for DP memoization.',
    intro: stdlibIntro,
  },
  designPatterns: {
    type: 'Design Patterns',
    badge: 'LRU',
    color: 'var(--accent-design)',
    description: 'LRU/LFU Cache, Min Stack, Rate Limiter, and other frequently asked design problems.',
    intro: designPatternsIntro,
  },
  generators: {
    type: 'Generators & Iterators',
    badge: 'yield',
    color: 'var(--accent-generators)',
    description: 'Memory-efficient iteration with yield. Process huge files with constant memory. Build data pipelines.',
    intro: generatorsIntro,
  },
  greedy: {
    type: 'Greedy Algorithms',
    badge: 'grdy',
    color: 'var(--accent-greedy)',
    description: 'Make locally optimal choices hoping for global optimum. Works when greedy choice property + optimal substructure exist.',
    intro: greedyIntro,
    hasTabs: true,
    basePath: '/greedy',
  },
  intervals: {
    type: 'Intervals Pattern',
    badge: '[ ]',
    color: 'var(--accent-intervals)',
    description: 'Interval problems: merge, insert, schedule. Key techniques: sort by start/end, sweep line, event processing.',
    intro: intervalsIntro,
    hasTabs: true,
    basePath: '/intervals',
  },
  math: {
    type: 'Math Algorithms',
    badge: '\u2211',
    color: 'var(--accent-math)',
    description: 'GCD/LCM, primes, modular arithmetic, combinatorics. Foundation for many interview problems.',
    intro: mathIntro,
  },
  segmentTree: {
    type: 'Segment Tree / BIT',
    badge: 'tree',
    color: 'var(--accent-segment-tree)',
    description: 'O(log n) range queries + point updates. Segment Tree for sum/min/max, BIT (Fenwick) for simpler prefix sums.',
    intro: segmentTreeIntro,
  },
}

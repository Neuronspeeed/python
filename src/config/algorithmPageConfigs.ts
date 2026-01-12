/**
 * Configuration for Algorithm topic pages.
 * Each config contains metadata and intro content for a single page.
 */

import {
  sortingIntro,
  binarySearchIntro,
  twoPointersIntro,
  backtrackingIntro,
  dpIntro,
  graphIntro
} from './algorithmIntros'

export interface AlgorithmPageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro: string
  hasTabs?: boolean
  basePath?: string
  problemCategory?: string
}

export const algorithmPageConfigs: Record<string, AlgorithmPageConfig> = {
  sorting: {
    type: 'Sorting Algorithms',
    badge: 'sort',
    color: 'var(--accent-sorting)',
    description: "Master sorting algorithms. Know when to use each. Python's Timsort is usually best.",
    intro: sortingIntro,
    hasTabs: false,
  },
  binarySearch: {
    type: 'Binary Search',
    badge: 'log',
    color: 'var(--accent-binary-search)',
    description: 'O(log n) search in sorted data. Master the three variants: exact, left-most, right-most.',
    intro: binarySearchIntro,
    hasTabs: true,
    basePath: '/binary-search',
    problemCategory: 'binarySearch',
  },
  twoPointers: {
    type: 'Two Pointers & Sliding Window',
    badge: '2ptr',
    color: 'var(--accent-two-pointers)',
    description: 'Two pointers for O(n) solutions. Sliding window for subarray/substring problems.',
    intro: twoPointersIntro,
    hasTabs: true,
    basePath: '/two-pointers',
    problemCategory: 'twoPointers',
  },
  backtracking: {
    type: 'Backtracking',
    badge: 'bt',
    color: 'var(--accent-backtracking)',
    description: 'Explore all solutions by building incrementally. Essential for permutations, combinations, constraint satisfaction.',
    intro: backtrackingIntro,
    hasTabs: true,
    basePath: '/backtracking',
    problemCategory: 'backtracking',
  },
  dynamicProgramming: {
    type: 'Dynamic Programming',
    badge: 'dp',
    color: 'var(--accent-dp)',
    description: 'Solve complex problems by breaking into overlapping subproblems. Memoization vs tabulation.',
    intro: dpIntro,
    hasTabs: true,
    basePath: '/dynamic-programming',
    problemCategory: 'dynamicProgramming',
  },
  graph: {
    type: 'Graph Algorithms',
    badge: 'bfs',
    color: 'var(--accent-graph)',
    description: 'Graph traversal, shortest paths, and spanning trees. Master DFS, BFS, Dijkstra, and topological sort.',
    intro: graphIntro,
    hasTabs: true,
    basePath: '/graph',
    problemCategory: 'graphs',
  },
}

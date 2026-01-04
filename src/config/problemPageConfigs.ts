export interface ProblemPageConfig {
  dsName: string
  basePath: string
  categoryIds: string[]
  color: string
}

export const problemPageConfigs: Record<string, ProblemPageConfig> = {
  linkedList: {
    dsName: 'Linked List',
    basePath: '/linked-list',
    categoryIds: ['linkedList'],
    color: 'var(--accent-linked-list)',
  },
  stackQueue: {
    dsName: 'Stack & Queue',
    basePath: '/stack-queue',
    categoryIds: ['stack'],
    color: 'var(--accent-stack-queue)',
  },
  heap: {
    dsName: 'Heap / Priority Queue',
    basePath: '/heap',
    categoryIds: ['heap'],
    color: 'var(--accent-heap)',
  },
  trie: {
    dsName: 'Trie',
    basePath: '/trie',
    categoryIds: ['trie'],
    color: 'var(--accent-trie)',
  },
  matrix: {
    dsName: 'Matrix Operations',
    basePath: '/matrix',
    categoryIds: ['matrices'],
    color: 'var(--accent-matrix)',
  },
  arrays: {
    dsName: 'Arrays',
    basePath: '/arrays',
    categoryIds: ['slidingWindow', 'prefixSum'],
    color: 'var(--accent-arrays)',
  },
  binaryTree: {
    dsName: 'Binary Tree',
    basePath: '/binary-tree',
    categoryIds: ['dfs', 'bfs'],
    color: 'var(--accent-binary-tree)',
  },
  twoPointers: {
    dsName: 'Two Pointers',
    basePath: '/two-pointers',
    categoryIds: ['twoPointers'],
    color: 'var(--accent-two-pointers)',
  },
  binarySearch: {
    dsName: 'Binary Search',
    basePath: '/binary-search',
    categoryIds: ['binarySearch'],
    color: 'var(--accent-binary-search)',
  },
  backtracking: {
    dsName: 'Backtracking',
    basePath: '/backtracking',
    categoryIds: ['backtracking'],
    color: 'var(--accent-backtracking)',
  },
  dp: {
    dsName: 'Dynamic Programming',
    basePath: '/dynamic-programming',
    categoryIds: ['dynamicProgramming'],
    color: 'var(--accent-dp)',
  },
  greedy: {
    dsName: 'Greedy',
    basePath: '/greedy',
    categoryIds: ['greedy'],
    color: 'var(--accent-greedy)',
  },
  intervals: {
    dsName: 'Intervals',
    basePath: '/intervals',
    categoryIds: ['intervals'],
    color: 'var(--accent-intervals)',
  },
  graph: {
    dsName: 'Graph Algorithms',
    basePath: '/graph',
    categoryIds: ['graphs'],
    color: 'var(--accent-graph)',
  },
}

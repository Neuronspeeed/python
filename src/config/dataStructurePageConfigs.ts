/**
 * Configuration for Data Structure topic pages.
 * Each config contains metadata and intro content for a single page.
 */

import {
  arraysIntro,
  linkedListIntro,
  stackQueueIntro,
  binaryTreeIntro,
  heapIntro,
  trieIntro,
  unionFindIntro,
  matrixIntro,
  bitManipulationIntro
} from './dataStructureIntros'

export interface DataStructurePageConfig {
  type: string
  badge: string
  color: string
  description: string
  intro: string
  tip?: string
  hasTabs?: boolean
  basePath?: string
  problemCategories?: string[]
}

export const dataStructurePageConfigs: Record<string, DataStructurePageConfig> = {
  arrays: {
    type: 'Arrays',
    badge: 'arr',
    color: 'var(--accent-arrays)',
    description: 'Contiguous memory storage with O(1) access. Foundation of all data structures. Master indexing, slicing, and two-pointer techniques.',
    intro: arraysIntro,
    hasTabs: true,
    basePath: '/arrays',
    problemCategories: ['slidingWindow', 'prefixSum'],
  },
  linkedList: {
    type: 'Linked List',
    badge: 'list',
    color: 'var(--accent-linked-list)',
    description: 'Sequential nodes with pointer connections. Master fast/slow pointers for cycle detection and middle finding.',
    intro: linkedListIntro,
    hasTabs: true,
    basePath: '/linked-list',
    problemCategories: ['linkedList'],
  },
  stackQueue: {
    type: 'Stack & Queue',
    badge: 'stk',
    color: 'var(--accent-stack-queue)',
    description: 'LIFO stack for undo/matching/DFS. FIFO queue for BFS/scheduling. Monotonic stack for next greater element.',
    intro: stackQueueIntro,
    hasTabs: true,
    basePath: '/stack-queue',
    problemCategories: ['stack'],
  },
  binaryTree: {
    type: 'Binary Tree',
    badge: 'tree',
    color: 'var(--accent-binary-tree)',
    description: 'Hierarchical structure with at most 2 children per node. Master DFS (pre/in/post order) and BFS (level order).',
    intro: binaryTreeIntro,
    hasTabs: true,
    basePath: '/binary-tree',
    problemCategories: ['dfs', 'bfs'],
  },
  heap: {
    type: 'Heap / Priority Queue',
    badge: 'heap',
    color: 'var(--accent-heap)',
    description: 'Get min/max in O(1), insert/remove in O(log n). Essential for top-k problems and scheduling.',
    intro: heapIntro,
    hasTabs: true,
    basePath: '/heap',
    problemCategories: ['heap'],
  },
  trie: {
    type: 'Trie',
    badge: 'trie',
    color: 'var(--accent-trie)',
    description: 'Prefix tree for efficient string operations. O(L) insert/search where L is word length.',
    intro: trieIntro,
    hasTabs: true,
    basePath: '/trie',
    problemCategories: ['trie'],
  },
  unionFind: {
    type: 'Union Find',
    badge: 'uf',
    color: 'var(--accent-union-find)',
    description: 'Track disjoint sets efficiently. Near O(1) union and find with path compression and union by rank.',
    intro: unionFindIntro,
    hasTabs: false,
  },
  matrix: {
    type: 'Matrix Operations',
    badge: '[][]',
    color: 'var(--accent-matrix)',
    description: '2D array operations for grids, images, graphs. Master traversal patterns and transformations.',
    intro: matrixIntro,
    hasTabs: true,
    basePath: '/matrix',
    problemCategories: ['matrices'],
  },
  bitManipulation: {
    type: 'Bit Manipulation',
    badge: '&|^',
    color: 'var(--accent-bit-ops)',
    description: 'Extremely fast O(1) operations. Essential for flags, subsets, and optimization problems.',
    intro: bitManipulationIntro,
    hasTabs: false,
  },
}

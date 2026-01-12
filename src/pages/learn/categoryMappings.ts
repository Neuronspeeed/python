import type { LearnCategorySlug } from '../../data/learn/types'

// Map legacy category IDs to URL slugs
export const categoryIdToSlug: Record<string, LearnCategorySlug> = {
  twoPointers: 'two-pointers',
  slidingWindow: 'sliding-window',
  intervals: 'intervals',
  stack: 'stack',
  linkedList: 'linked-list',
  binarySearch: 'binary-search',
  heap: 'heap',
  dfs: 'dfs',
  bfs: 'bfs',
  backtracking: 'backtracking',
  graphs: 'graphs',
  dynamicProgramming: 'dynamic-programming',
  greedy: 'greedy',
  trie: 'trie',
  prefixSum: 'prefix-sum',
  matrices: 'matrices',
}

// Reverse mapping: slug to legacy ID
export const slugToCategoryId: Record<string, string> = Object.fromEntries(
  Object.entries(categoryIdToSlug).map(([id, slug]) => [slug, id])
)

// Category overview type
export interface CategoryOverview {
  description: string
  whyUseIt?: { title: string; explanation: string; keyPoint: string }
  whenToUse: string[]
  keyPatterns: { name: string; description: string; complexity: string }[]
  commonMistakes: string[]
}

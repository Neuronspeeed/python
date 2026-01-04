import type { CategoryInfo } from './types'
import { containerWithMostWater, twoSumSorted, moveZeroes, threeSum, validTriangleNumber, sortColors, trappingRainWater } from './twoPointers'
import { validParentheses, dailyTemperatures, minStack, decodeString, largestRectangle, longestValidParentheses } from './stackProblems'
import { searchRotatedArray, kokoEatingBananas, findPeakElement, splitArrayLargestSum } from './binarySearch'
import { maxSumSubarray, longestSubstring, minWindowSubstring, permutationInString, maxPointsFromCards, longestRepeatingCharReplacement, maxSumDistinctSubarrays } from './slidingWindow'
import { maxDepth, pathSum, validateBST, numIslands } from './dfs'
import { levelOrder, rightSideView, rottenOranges } from './bfs'
import { climbingStairs, coinChange, longestCommonSubsequence } from './dynamicProgramming'
import { reverseList, mergeTwoLists, hasCycle, removeNthFromEnd, reorderList, swapNodesInPairs } from './linkedList'
import { kthLargest, topKFrequent, mergeKLists, medianFinder } from './heap'
import { subsets, permutations, combinationSum, nQueens } from './backtracking'
import { mergeIntervals, insertInterval, meetingRooms, nonOverlappingIntervals, employeeFreeTime } from './intervals'
import { jumpGame, gasStation } from './greedy'
import { topologicalSort, cloneGraph } from './graphs'
import { implementTrie, wordSearch } from './trie'
import { rangeSum, subarraySum } from './prefixSum'
import { rotateImage, spiralOrder, setZeroes } from './matrices'

export * from './types'

export const categories: CategoryInfo[] = [
  {
    id: 'twoPointers',
    name: 'Two Pointers',
    color: 'var(--accent-two-pointers)',
    algorithms: [containerWithMostWater, twoSumSorted, moveZeroes, threeSum, validTriangleNumber, sortColors, trappingRainWater],
  },
  {
    id: 'binarySearch',
    name: 'Binary Search',
    color: 'var(--accent-binary-search)',
    algorithms: [searchRotatedArray, kokoEatingBananas, findPeakElement, splitArrayLargestSum],
  },
  {
    id: 'stack',
    name: 'Stack',
    color: 'var(--accent-stack)',
    algorithms: [validParentheses, dailyTemperatures, minStack, decodeString, largestRectangle, longestValidParentheses],
  },
  {
    id: 'slidingWindow',
    name: 'Sliding Window',
    color: 'var(--accent-sliding-window)',
    algorithms: [maxSumSubarray, longestSubstring, minWindowSubstring, permutationInString, maxPointsFromCards, longestRepeatingCharReplacement, maxSumDistinctSubarrays],
  },
  {
    id: 'linkedList',
    name: 'Linked List',
    color: 'var(--accent-linked-list)',
    algorithms: [reverseList, mergeTwoLists, hasCycle, removeNthFromEnd, reorderList, swapNodesInPairs],
  },
  {
    id: 'dfs',
    name: 'DFS (Depth-First Search)',
    color: 'var(--accent-dfs)',
    algorithms: [maxDepth, pathSum, validateBST, numIslands],
  },
  {
    id: 'bfs',
    name: 'BFS (Breadth-First Search)',
    color: 'var(--accent-bfs)',
    algorithms: [levelOrder, rightSideView, rottenOranges],
  },
  {
    id: 'heap',
    name: 'Heap / Priority Queue',
    color: 'var(--accent-heap)',
    algorithms: [kthLargest, topKFrequent, mergeKLists, medianFinder],
  },
  {
    id: 'backtracking',
    name: 'Backtracking',
    color: 'var(--accent-backtracking)',
    algorithms: [subsets, permutations, combinationSum, nQueens],
  },
  {
    id: 'dynamicProgramming',
    name: 'Dynamic Programming',
    color: 'var(--accent-dp)',
    algorithms: [climbingStairs, coinChange, longestCommonSubsequence],
  },
  {
    id: 'greedy',
    name: 'Greedy',
    color: 'var(--accent-greedy)',
    algorithms: [jumpGame, gasStation],
  },
  {
    id: 'intervals',
    name: 'Intervals',
    color: 'var(--accent-intervals)',
    algorithms: [mergeIntervals, insertInterval, meetingRooms, nonOverlappingIntervals, employeeFreeTime],
  },
  {
    id: 'graphs',
    name: 'Graphs',
    color: 'var(--accent-graphs)',
    algorithms: [topologicalSort, cloneGraph],
  },
  {
    id: 'trie',
    name: 'Trie',
    color: 'var(--accent-trie)',
    algorithms: [implementTrie, wordSearch],
  },
  {
    id: 'prefixSum',
    name: 'Prefix Sum',
    color: 'var(--accent-prefix-sum)',
    algorithms: [rangeSum, subarraySum],
  },
  {
    id: 'matrices',
    name: 'Matrices',
    color: 'var(--accent-matrix)',
    algorithms: [rotateImage, spiralOrder, setZeroes],
  },
]

export function getAlgorithmById(id: string) {
  for (const category of categories) {
    const algo = category.algorithms.find(a => a.id === id)
    if (algo) return algo
  }
  return null
}

export function getCategoryById(id: string) {
  return categories.find(c => c.id === id) || null
}

/**
 * Get total problem count for one or more category IDs
 * DRY: Single source of truth for problem counting
 */
export function getProblemCount(...categoryIds: string[]): number {
  return categoryIds.reduce((total, id) => {
    const category = categories.find(c => c.id === id)
    return total + (category?.algorithms?.length || 0)
  }, 0)
}

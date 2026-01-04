import { DSProblemsListPage } from './ds/DSProblemsListPage'
import { DSProblemPage } from './ds/DSProblemPage'
import { categories } from '../data/learn'
import { problemPageConfigs, type ProblemPageConfig } from '../config/problemPageConfigs'

function getProblems(categoryIds: string[]) {
  return categoryIds.flatMap(id => {
    const category = categories.find(c => c.id === id)
    return category?.algorithms || []
  })
}

function createListPage(config: ProblemPageConfig) {
  return function ListPage() {
    return (
      <DSProblemsListPage
        dsName={config.dsName}
        basePath={config.basePath}
        problems={getProblems(config.categoryIds)}
        color={config.color}
      />
    )
  }
}

function createProblemPage(config: ProblemPageConfig) {
  return function ProblemPage() {
    return (
      <DSProblemPage
        dsName={config.dsName}
        basePath={config.basePath}
        problems={getProblems(config.categoryIds)}
      />
    )
  }
}

// Linked List
export const LinkedListProblemsPage = createListPage(problemPageConfigs.linkedList)
export const LinkedListProblemPage = createProblemPage(problemPageConfigs.linkedList)

// Stack & Queue
export const StackQueueProblemsPage = createListPage(problemPageConfigs.stackQueue)
export const StackQueueProblemPage = createProblemPage(problemPageConfigs.stackQueue)

// Heap
export const HeapProblemsPage = createListPage(problemPageConfigs.heap)
export const HeapProblemPage = createProblemPage(problemPageConfigs.heap)

// Trie
export const TrieProblemsPage = createListPage(problemPageConfigs.trie)
export const TrieProblemPage = createProblemPage(problemPageConfigs.trie)

// Matrix
export const MatrixProblemsPage = createListPage(problemPageConfigs.matrix)
export const MatrixProblemPage = createProblemPage(problemPageConfigs.matrix)

// Arrays
export const ArraysProblemsPage = createListPage(problemPageConfigs.arrays)
export const ArraysProblemPage = createProblemPage(problemPageConfigs.arrays)

// Binary Tree
export const BinaryTreeProblemsPage = createListPage(problemPageConfigs.binaryTree)
export const BinaryTreeProblemPage = createProblemPage(problemPageConfigs.binaryTree)

// Two Pointers
export const TwoPointersProblemsPage = createListPage(problemPageConfigs.twoPointers)
export const TwoPointersProblemPage = createProblemPage(problemPageConfigs.twoPointers)

// Binary Search
export const BinarySearchProblemsPage = createListPage(problemPageConfigs.binarySearch)
export const BinarySearchProblemPage = createProblemPage(problemPageConfigs.binarySearch)

// Backtracking
export const BacktrackingProblemsPage = createListPage(problemPageConfigs.backtracking)
export const BacktrackingProblemPage = createProblemPage(problemPageConfigs.backtracking)

// Dynamic Programming
export const DPProblemsPage = createListPage(problemPageConfigs.dp)
export const DPProblemPage = createProblemPage(problemPageConfigs.dp)

// Greedy
export const GreedyProblemsPage = createListPage(problemPageConfigs.greedy)
export const GreedyProblemPage = createProblemPage(problemPageConfigs.greedy)

// Intervals
export const IntervalsProblemsPage = createListPage(problemPageConfigs.intervals)
export const IntervalsProblemPage = createProblemPage(problemPageConfigs.intervals)

// Graph
export const GraphProblemsPage = createListPage(problemPageConfigs.graph)
export const GraphProblemPage = createProblemPage(problemPageConfigs.graph)

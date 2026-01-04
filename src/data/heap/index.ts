import { heapBasicsMethods } from './heapBasics'
import { heapProblemsMethods } from './heapProblems'

// Combined Heap methods - maintains original order
export const heapMethods = [
  ...heapBasicsMethods,
  ...heapProblemsMethods,
]

// Re-export individual modules for granular imports
export { heapBasicsMethods } from './heapBasics'
export { heapProblemsMethods } from './heapProblems'

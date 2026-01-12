import { whyAndWhenMethods } from './whyAndWhen'
import { greedyBinarySearchMethods } from './greedyBinarySearch'
import { specialProblemsMethods } from './specialProblems'
import { pythonBisectMethods } from './pythonBisect'

// Combined Binary Search Problems methods - maintains original order
export const binarySearchProblemsMethods = [
  ...whyAndWhenMethods,
  ...greedyBinarySearchMethods,
  ...specialProblemsMethods,
  ...pythonBisectMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { greedyBinarySearchMethods } from './greedyBinarySearch'
export { specialProblemsMethods } from './specialProblems'
export { pythonBisectMethods } from './pythonBisect'

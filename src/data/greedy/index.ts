import { greedyBasicsMethods } from './greedyBasics'
import { greedyProblemsMethods } from './greedyProblems'

// Combined Greedy methods - maintains original order
export const greedyMethods = [
  ...greedyBasicsMethods,
  ...greedyProblemsMethods,
]

// Re-export individual modules for granular imports
export { greedyBasicsMethods } from './greedyBasics'
export { greedyProblemsMethods } from './greedyProblems'

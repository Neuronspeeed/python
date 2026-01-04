import { backtrackingBasicsMethods } from './backtrackingBasics'
import { backtrackingProblemsMethods } from './backtrackingProblems'

// Combined Backtracking methods - maintains original order
export const backtrackingMethods = [
  ...backtrackingBasicsMethods,
  ...backtrackingProblemsMethods,
]

// Re-export individual modules for granular imports
export { backtrackingBasicsMethods } from './backtrackingBasics'
export { backtrackingProblemsMethods } from './backtrackingProblems'

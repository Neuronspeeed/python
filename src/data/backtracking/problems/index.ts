import { whyAndWhenMethods } from './whyAndWhen'
import { classicProblemsMethods } from './classicProblems'

// Combined backtracking problems - maintains original order
export const backtrackingProblemsMethods = [
  ...whyAndWhenMethods,
  ...classicProblemsMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { classicProblemsMethods } from './classicProblems'

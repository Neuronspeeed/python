import { mathBasicsMethods } from './mathBasics'
import { mathProblemsMethods } from './mathProblems'

// Combined Math methods - basics first, then problems
export const mathMethods = [
  ...mathBasicsMethods,
  ...mathProblemsMethods,
]

// Re-export individual modules for granular imports
export { mathBasicsMethods } from './mathBasics'
export { mathProblemsMethods } from './mathProblems'

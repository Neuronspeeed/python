import { intervalBasicsMethods } from './intervalBasics'
import { intervalProblemsMethods } from './intervalProblems'

// Combined Intervals methods - maintains original order
export const intervalMethods = [
  ...intervalBasicsMethods,
  ...intervalProblemsMethods,
]

// Re-export individual modules for granular imports
export { intervalBasicsMethods } from './intervalBasics'
export { intervalProblemsMethods } from './intervalProblems'

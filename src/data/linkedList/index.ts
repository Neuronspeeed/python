import { linkedListBasicsMethods } from './linkedListBasics'
import { linkedListProblemsMethods } from './linkedListProblems'

// Combined Linked List methods - maintains original order
export const linkedListMethods = [
  ...linkedListBasicsMethods,
  ...linkedListProblemsMethods,
]

// Re-export individual modules for granular imports
export { linkedListBasicsMethods } from './linkedListBasics'
export { linkedListProblemsMethods } from './linkedListProblems'

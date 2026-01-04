import { trieBasicsMethods } from './trieBasics'
import { trieProblemsMethods } from './trieProblems'

// Combined Trie methods - maintains original order
export const trieMethods = [
  ...trieBasicsMethods,
  ...trieProblemsMethods,
]

// Re-export individual modules for granular imports
export { trieBasicsMethods } from './trieBasics'
export { trieProblemsMethods } from './trieProblems'

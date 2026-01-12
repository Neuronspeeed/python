import { insertionMethods } from './insertions'
import { deletionMethods } from './deletions'
import { searchMethods } from './search'
import { inPlaceOperationMethods } from './inPlaceOperations'
import { patternMethods } from './patterns'

// Combined array operations - maintains original order
export const arrayOperationsMethods = [
  ...insertionMethods,
  ...deletionMethods,
  ...searchMethods,
  ...inPlaceOperationMethods,
  ...patternMethods,
]

// Re-export individual modules for granular imports
export { insertionMethods } from './insertions'
export { deletionMethods } from './deletions'
export { searchMethods } from './search'
export { inPlaceOperationMethods } from './inPlaceOperations'
export { patternMethods } from './patterns'

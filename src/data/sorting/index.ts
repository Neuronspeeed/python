import { sortingBasicsMethods } from './sortingBasics'
import { sortingAdvancedMethods } from './sortingAdvanced'

// Combined Sorting methods - maintains original order
export const sortingMethods = [
  ...sortingBasicsMethods,
  ...sortingAdvancedMethods,
]

// Re-export individual modules for granular imports
export { sortingBasicsMethods } from './sortingBasics'
export { sortingAdvancedMethods } from './sortingAdvanced'

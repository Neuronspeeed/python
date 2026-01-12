import { whyWhenMethods } from './whyWhen'
import { nonComparisonSortsMethods } from './nonComparisonSorts'
import { pythonBuiltinMethods } from './pythonBuiltin'
import { specialSortingMethods } from './specialSorting'

// Combined advanced sorting methods - maintains original order
export const sortingAdvancedMethods = [
  ...whyWhenMethods,
  ...nonComparisonSortsMethods,
  ...pythonBuiltinMethods,
  ...specialSortingMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { nonComparisonSortsMethods } from './nonComparisonSorts'
export { pythonBuiltinMethods } from './pythonBuiltin'
export { specialSortingMethods } from './specialSorting'

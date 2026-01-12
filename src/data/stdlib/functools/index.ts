import { functoolsWhyWhenMethods } from './functoolsWhyWhen'
import { functoolsMemoizationMethods } from './functoolsMemoization'
import { functoolsReductionMethods } from './functoolsReduction'
import { functoolsPartialMethods } from './functoolsPartial'
import { functoolsSortingMethods } from './functoolsSorting'
import { functoolsWrappingMethods } from './functoolsWrapping'

export const stdlibFunctoolsMethods = [
  ...functoolsWhyWhenMethods,
  ...functoolsMemoizationMethods,
  ...functoolsReductionMethods,
  ...functoolsPartialMethods,
  ...functoolsSortingMethods,
  ...functoolsWrappingMethods,
]

// Re-export individual modules for granular imports
export { functoolsWhyWhenMethods } from './functoolsWhyWhen'
export { functoolsMemoizationMethods } from './functoolsMemoization'
export { functoolsReductionMethods } from './functoolsReduction'
export { functoolsPartialMethods } from './functoolsPartial'
export { functoolsSortingMethods } from './functoolsSorting'
export { functoolsWrappingMethods } from './functoolsWrapping'

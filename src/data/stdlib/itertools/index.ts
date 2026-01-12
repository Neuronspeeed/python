import { itertoolsWhyAndWhenMethods } from './whyAndWhen'
import { itertoolsCombinatoricsMethods } from './combinatorics'
import { itertoolsAccumulationMethods } from './accumulation'
import { itertoolsGroupingMethods } from './grouping'
import { itertoolsChainingMethods } from './chaining'
import { itertoolsSlicingMethods } from './slicing'
import { itertoolsInfiniteMethods } from './infinite'

// Combined itertools methods - maintains logical order
export const stdlibItertoolsMethods = [
  ...itertoolsWhyAndWhenMethods,
  ...itertoolsCombinatoricsMethods,
  ...itertoolsAccumulationMethods,
  ...itertoolsGroupingMethods,
  ...itertoolsChainingMethods,
  ...itertoolsSlicingMethods,
  ...itertoolsInfiniteMethods,
]

// Re-export individual modules for granular imports
export { itertoolsWhyAndWhenMethods } from './whyAndWhen'
export { itertoolsCombinatoricsMethods } from './combinatorics'
export { itertoolsAccumulationMethods } from './accumulation'
export { itertoolsGroupingMethods } from './grouping'
export { itertoolsChainingMethods } from './chaining'
export { itertoolsSlicingMethods } from './slicing'
export { itertoolsInfiniteMethods } from './infinite'

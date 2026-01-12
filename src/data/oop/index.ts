import { oopBasicsMethods } from './oopBasics'
import { oopInheritanceMethods } from './inheritance'
import { oopSOLIDMethods } from './oopSOLID'
import { oopDunderMethods } from './dunder'
import { oopDataStructuresMethods } from './oopDataStructures'
import { oopMetaprogrammingMethods } from './oopMetaprogramming'
import { oopEnumMethods } from './oopEnum'

// Combined OOP methods - maintains original order
export const oopMethods = [
  ...oopBasicsMethods,
  ...oopInheritanceMethods,
  ...oopSOLIDMethods,
  ...oopDunderMethods,
  ...oopDataStructuresMethods,
  ...oopMetaprogrammingMethods,
  ...oopEnumMethods,
]

// Re-export individual modules for granular imports
export { oopBasicsMethods } from './oopBasics'
export { oopInheritanceMethods } from './inheritance'
export { oopSOLIDMethods } from './oopSOLID'
export { oopDunderMethods } from './dunder'
export { oopDataStructuresMethods } from './oopDataStructures'
export { oopMetaprogrammingMethods } from './oopMetaprogramming'
export { oopEnumMethods } from './oopEnum'

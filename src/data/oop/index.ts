import { oopBasicsMethods } from './oopBasics'
import { oopInheritanceMethods } from './oopInheritance'
import { oopSOLIDMethods } from './oopSOLID'
import { oopDunderMethods } from './oopDunder'
import { oopDataStructuresMethods } from './oopDataStructures'
import { oopMetaprogrammingMethods } from './oopMetaprogramming'

// Combined OOP methods - maintains original order
export const oopMethods = [
  ...oopBasicsMethods,
  ...oopInheritanceMethods,
  ...oopSOLIDMethods,
  ...oopDunderMethods,
  ...oopDataStructuresMethods,
  ...oopMetaprogrammingMethods,
]

// Re-export individual modules for granular imports
export { oopBasicsMethods } from './oopBasics'
export { oopInheritanceMethods } from './oopInheritance'
export { oopSOLIDMethods } from './oopSOLID'
export { oopDunderMethods } from './oopDunder'
export { oopDataStructuresMethods } from './oopDataStructures'
export { oopMetaprogrammingMethods } from './oopMetaprogramming'

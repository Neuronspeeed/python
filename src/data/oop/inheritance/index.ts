import { whyAndWhenMethods } from './whyAndWhen'
import { inheritanceMethods } from './inheritance'
import { propertiesMethods } from './properties'
import { classStaticMethods } from './classStaticMethods'
import { namespaceInternalsMethods } from './namespaceInternals'
import { specializationPatternsMethods } from './specializationPatterns'

// Combined inheritance methods - maintains original order
export const oopInheritanceMethods = [
  ...whyAndWhenMethods,
  ...inheritanceMethods,
  ...propertiesMethods,
  ...classStaticMethods,
  ...namespaceInternalsMethods,
  ...specializationPatternsMethods,
]

// Re-export individual modules for granular imports
export { whyAndWhenMethods } from './whyAndWhen'
export { inheritanceMethods } from './inheritance'
export { propertiesMethods } from './properties'
export { classStaticMethods } from './classStaticMethods'
export { namespaceInternalsMethods } from './namespaceInternals'
export { specializationPatternsMethods } from './specializationPatterns'

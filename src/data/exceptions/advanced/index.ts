import { contextManagersMethods } from './contextManagers'
import { whyAndWhenMethods } from './whyAndWhen'
import { nestingAndIdiomsMethods } from './nestingAndIdioms'
import { warningsAndInfoMethods } from './warningsAndInfo'

// Combined Advanced Exceptions methods - maintains original order
export const exceptionsAdvancedMethods = [
  ...contextManagersMethods,
  ...whyAndWhenMethods,
  ...nestingAndIdiomsMethods,
  ...warningsAndInfoMethods,
]

// Re-export individual modules for granular imports
export { contextManagersMethods } from './contextManagers'
export { whyAndWhenMethods } from './whyAndWhen'
export { nestingAndIdiomsMethods } from './nestingAndIdioms'
export { warningsAndInfoMethods } from './warningsAndInfo'

import { generatorBasicsMethods } from './generatorBasics'
import { generatorCoroutinesMethods } from './generatorCoroutines'
import { generatorAdvancedMethods } from './generatorAdvanced'

// Combined Generator methods - basics first, then coroutines, then advanced
export const generatorMethods = [
  ...generatorBasicsMethods,
  ...generatorCoroutinesMethods,
  ...generatorAdvancedMethods,
]

// Re-export individual modules for granular imports
export { generatorBasicsMethods } from './generatorBasics'
export { generatorCoroutinesMethods } from './generatorCoroutines'
export { generatorAdvancedMethods } from './generatorAdvanced'

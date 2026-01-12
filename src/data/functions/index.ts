import { functionsBasicsMethods } from './basics'
import { functionsDecoratorsMethods } from './functionsDecorators'
import { functionsClosureMethods } from './functionsClosure'

// Combined Functions methods - maintains original order
export const functionsMethods = [
  ...functionsBasicsMethods,
  ...functionsDecoratorsMethods,
  ...functionsClosureMethods,
]

// Re-export individual modules for granular imports
export { functionsBasicsMethods } from './basics'
export { functionsDecoratorsMethods } from './functionsDecorators'
export { functionsClosureMethods } from './functionsClosure'

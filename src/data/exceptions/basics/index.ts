import { whyWhenMethods } from './whyWhen'
import { basicHandlingMethods } from './basicHandling'
import { raisingExceptionsMethods } from './raisingExceptions'
import { customExceptionsMethods } from './customExceptions'
import { builtinExceptionsMethods } from './builtinExceptions'

// Combined Exceptions Basics methods - maintains original order
export const exceptionsBasicsMethods = [
  ...whyWhenMethods,
  ...basicHandlingMethods,
  ...raisingExceptionsMethods,
  ...customExceptionsMethods,
  ...builtinExceptionsMethods,
]

// Re-export individual modules for granular imports
export { whyWhenMethods } from './whyWhen'
export { basicHandlingMethods } from './basicHandling'
export { raisingExceptionsMethods } from './raisingExceptions'
export { customExceptionsMethods } from './customExceptions'
export { builtinExceptionsMethods } from './builtinExceptions'

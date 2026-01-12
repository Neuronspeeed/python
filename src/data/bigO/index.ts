import { bigOBasicsMethods } from './bigOBasics'
import { bigOPatternsMethods } from './patterns'

// Combined Big O methods - maintains original order
export const bigOMethods = [
  ...bigOBasicsMethods,
  ...bigOPatternsMethods,
]

// Re-export individual modules for granular imports
export { bigOBasicsMethods } from './bigOBasics'
export { bigOPatternsMethods } from './patterns'

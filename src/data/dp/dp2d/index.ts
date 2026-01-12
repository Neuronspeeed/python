import { dp2dWhyWhenMethods } from './dp2dWhyWhen'
import { dp2dGridMethods } from './dp2dGrid'
import { dp2dIntervalMethods } from './dp2dInterval'
import { dp2dStringMethods } from './dp2dString'

// Combined 2D DP methods - maintains original order
export const dp2DMethods = [
  ...dp2dWhyWhenMethods,
  ...dp2dGridMethods,
  ...dp2dIntervalMethods,
  ...dp2dStringMethods,
]

// Re-export individual modules for granular imports
export { dp2dWhyWhenMethods } from './dp2dWhyWhen'
export { dp2dGridMethods } from './dp2dGrid'
export { dp2dIntervalMethods } from './dp2dInterval'
export { dp2dStringMethods } from './dp2dString'

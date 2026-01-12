import { dpFundamentalsMethods } from './dpFundamentals'
import { dp2DMethods } from './dp2d'
import { dpKnapsackMethods } from './dpKnapsack'

// Combined DP methods - order matches section indices:
// 0-1: Why & When, 2-7: 1D DP, 8-11: 2D DP, 12-13: Kadane & Subarray,
// 14-16: Knapsack, 17-18: Interval DP, 19-20: String DP
export const dpMethods = [
  ...dpFundamentalsMethods,          // indices 0-7: Why & When + 1D DP
  ...dp2DMethods.slice(0, 4),        // indices 8-11: 2D DP
  ...dpKnapsackMethods.slice(0, 2),  // indices 12-13: Kadane & Subarray
  ...dpKnapsackMethods.slice(2),     // indices 14-16: Knapsack
  ...dp2DMethods.slice(4, 6),        // indices 17-18: Interval DP
  ...dp2DMethods.slice(6),           // indices 19-20: String DP
]

// Re-export individual modules for granular imports
export { dpFundamentalsMethods } from './dpFundamentals'
export { dp2DMethods } from './dp2d'
export { dpKnapsackMethods } from './dpKnapsack'

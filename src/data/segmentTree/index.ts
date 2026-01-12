import { segmentTreeBasicsMethods } from './segmentTreeBasics'
import { segmentTreeAdvancedMethods } from './advanced'

// Combined Segment Tree methods - basics first, then advanced
export const segmentTreeMethods = [
  ...segmentTreeBasicsMethods,
  ...segmentTreeAdvancedMethods,
]

// Re-export individual modules for granular imports
export { segmentTreeBasicsMethods } from './segmentTreeBasics'
export { segmentTreeAdvancedMethods } from './advanced'

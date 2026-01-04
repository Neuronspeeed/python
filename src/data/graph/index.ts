import { graphTraversalMethods } from './graphTraversal'
import { graphPathsMSTMethods } from './graphPathsMST'
import { graphCyclesMethods } from './graphCycles'

// Combined Graph methods - maintains original order
export const graphMethods = [
  ...graphTraversalMethods,
  ...graphPathsMSTMethods,
  ...graphCyclesMethods,
]

// Re-export individual modules for granular imports
export { graphTraversalMethods } from './graphTraversal'
export { graphPathsMSTMethods } from './graphPathsMST'
export { graphCyclesMethods } from './graphCycles'

import { binaryTreeTraversalMethods } from './binaryTreeTraversal'
import { binaryTreeProblemsMethods } from './binaryTreeProblems'

// Combined Binary Tree methods - maintains original order
export const binaryTreeMethods = [
  ...binaryTreeTraversalMethods,
  ...binaryTreeProblemsMethods,
]

// Re-export individual modules for granular imports
export { binaryTreeTraversalMethods } from './binaryTreeTraversal'
export { binaryTreeProblemsMethods } from './binaryTreeProblems'

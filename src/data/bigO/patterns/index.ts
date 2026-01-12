import { thresholdsMethods } from './thresholds'
import { tradeoffsMethods } from './tradeoffs'
import { cheatsheetMethods } from './cheatsheet'
import { sortingAlgorithmsMethods } from './sortingAlgorithms'
import { graphAlgorithmsMethods } from './graphAlgorithms'
import { recognizePatternsMethods } from './recognizePatterns'

// Combined Big O patterns methods - maintains original order
export const bigOPatternsMethods = [
  ...thresholdsMethods,
  ...tradeoffsMethods,
  ...cheatsheetMethods,
  ...sortingAlgorithmsMethods,
  ...graphAlgorithmsMethods,
  ...recognizePatternsMethods,
]

// Re-export individual modules for granular imports
export { thresholdsMethods } from './thresholds'
export { tradeoffsMethods } from './tradeoffs'
export { cheatsheetMethods } from './cheatsheet'
export { sortingAlgorithmsMethods } from './sortingAlgorithms'
export { graphAlgorithmsMethods } from './graphAlgorithms'
export { recognizePatternsMethods } from './recognizePatterns'

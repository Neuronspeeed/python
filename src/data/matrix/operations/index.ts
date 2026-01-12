import { spiralDiagonalMethods } from './spiralDiagonal'
import { searchMethods } from './search'
import { setGameOfLifeMethods } from './setGameOfLife'
import { islandsMethods } from './islands'

// Combined matrix operations - maintains original order
export const matrixOperationsMethods = [
  ...spiralDiagonalMethods,
  ...searchMethods,
  ...setGameOfLifeMethods,
  ...islandsMethods,
]

// Re-export individual modules for granular imports
export { spiralDiagonalMethods } from './spiralDiagonal'
export { searchMethods } from './search'
export { setGameOfLifeMethods } from './setGameOfLife'
export { islandsMethods } from './islands'

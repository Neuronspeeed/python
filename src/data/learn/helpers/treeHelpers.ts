import type { TreeElement, TreeNode, ElementStyle } from '../types'

/**
 * Create a tree visualization element from an array representation
 */
export function createTreeElement(
  values: (number | string | null)[],
  highlights?: { index: number; style: ElementStyle }[]
): TreeElement {
  const nodes: (TreeNode | null)[] = values.map(val => 
    val === null ? null : { value: val }
  )
  
  return {
    type: 'tree',
    id: 'tree',
    nodes,
    highlights,
  }
}

/**
 * Create a tree element with styled nodes (for showing traversal state)
 */
export function createStyledTreeElement(
  values: (number | string | null)[],
  nodeStyles: Map<number, ElementStyle>,
  highlights?: { index: number; style: ElementStyle }[]
): TreeElement {
  const nodes: (TreeNode | null)[] = values.map((val, idx) => {
    if (val === null) return null
    const style = nodeStyles.get(idx)
    return style ? { value: val, style } : { value: val }
  })
  
  return {
    type: 'tree',
    id: 'tree',
    nodes,
    highlights,
  }
}

/**
 * Get the tree node index for a position in BFS traversal
 * Level 0 has 1 node (index 0)
 * Level 1 has 2 nodes (indices 1-2)
 * Level 2 has 4 nodes (indices 3-6)
 */
export function getTreeNodeIndex(level: number, posInLevel: number): number {
  return Math.pow(2, level) - 1 + posInLevel
}

/**
 * Get left child index in array representation
 */
export function getLeftChildIndex(parentIndex: number): number {
  return 2 * parentIndex + 1
}

/**
 * Get right child index in array representation
 */
export function getRightChildIndex(parentIndex: number): number {
  return 2 * parentIndex + 2
}

/**
 * Get parent index in array representation
 */
export function getParentIndex(childIndex: number): number {
  return Math.floor((childIndex - 1) / 2)
}

/**
 * Check if a node exists and has a value in the tree array
 */
export function hasNode(values: (number | string | null)[], index: number): boolean {
  return index < values.length && values[index] !== null
}

/**
 * Get level of a node in the tree (0-indexed)
 */
export function getNodeLevel(index: number): number {
  return Math.floor(Math.log2(index + 1))
}

/**
 * Create highlight for multiple indices with the same style
 */
export function createHighlights(
  indices: number[],
  style: ElementStyle
): { index: number; style: ElementStyle }[] {
  return indices.map(index => ({ index, style }))
}

/**
 * Merge multiple highlight arrays, later ones override earlier for same index
 */
export function mergeHighlights(
  ...highlightArrays: ({ index: number; style: ElementStyle }[] | undefined)[]
): { index: number; style: ElementStyle }[] {
  const map = new Map<number, ElementStyle>()
  
  for (const highlights of highlightArrays) {
    if (highlights) {
      for (const h of highlights) {
        map.set(h.index, h.style)
      }
    }
  }
  
  return Array.from(map.entries()).map(([index, style]) => ({ index, style }))
}

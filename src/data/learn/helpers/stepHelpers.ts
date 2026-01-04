import type { 
  ArrayElement, 
  PointerElement, 
  AlgorithmStep, 
  ElementStyle,
  VisualizationElement 
} from '../types'

interface ArrayPointer {
  index: number
  label: string
  color: string
}

interface ArrayHighlight {
  index: number
  style: ElementStyle
}

/**
 * Create an array visualization element with optional pointers and highlights
 */
export function createArrayElement(
  id: string,
  values: (number | string)[],
  options?: {
    pointers?: ArrayPointer[]
    highlights?: ArrayHighlight[]
  }
): ArrayElement {
  return {
    type: 'array',
    id,
    values,
    ...(options?.pointers && { pointers: options.pointers }),
    ...(options?.highlights && { highlights: options.highlights }),
  }
}

/**
 * Create a pointer element with bounds checking
 * Returns null if index is out of bounds
 */
export function createPointer(
  id: string,
  index: number,
  label: string,
  color: string,
  maxIndex: number
): PointerElement | null {
  if (index < 0 || index >= maxIndex) {
    return null
  }
  return { type: 'pointer', id, index, label, color }
}

/**
 * Create multiple pointers, filtering out any that are out of bounds
 */
export function createPointers(
  pointers: { id: string; index: number; label: string; color: string }[],
  maxIndex: number
): PointerElement[] {
  return pointers
    .map(p => createPointer(p.id, p.index, p.label, p.color, maxIndex))
    .filter((p): p is PointerElement => p !== null)
}

/**
 * Create a completion step with standard structure
 */
export function createCompletionStep(
  lineNumber: number,
  description: string,
  elements: VisualizationElement[],
  result: unknown
): AlgorithmStep {
  return {
    lineNumber,
    description,
    elements,
    variables: { result },
    isComplete: true,
  }
}

/**
 * Create highlights for a range of indices
 */
export function createRangeHighlights(
  start: number,
  end: number,
  style: ElementStyle
): ArrayHighlight[] {
  const highlights: ArrayHighlight[] = []
  for (let i = start; i <= end; i++) {
    highlights.push({ index: i, style })
  }
  return highlights
}

/**
 * Create highlight for a single index (if within bounds)
 */
export function createHighlight(
  index: number,
  style: ElementStyle,
  maxIndex?: number
): ArrayHighlight | null {
  if (maxIndex !== undefined && (index < 0 || index >= maxIndex)) {
    return null
  }
  return { index, style }
}

/**
 * Filter out null highlights and return valid array
 */
export function filterValidHighlights(
  highlights: (ArrayHighlight | null)[]
): ArrayHighlight[] {
  return highlights.filter((h): h is ArrayHighlight => h !== null)
}

/**
 * Standard colors for visualization elements
 */
export const COLORS = {
  LEFT: '#16A34A',    // Green
  RIGHT: '#3B82F6',   // Blue
  MID: '#D97757',     // Orange/coral
  SLOW: '#16A34A',    // Green
  FAST: '#EF4444',    // Red
  WRITE: '#16A34A',   // Green
  READ: '#3B82F6',    // Blue
  CURRENT: '#D97757', // Orange
  PREV: '#8B5CF6',    // Purple
  NEXT: '#F59E0B',    // Amber
} as const

/**
 * Validate that all pointer indices in a step are within bounds
 */
export function validateStepPointers(
  step: AlgorithmStep,
  arrayLength: number
): boolean {
  for (const element of step.elements) {
    if (element.type === 'pointer') {
      if (element.index < 0 || element.index >= arrayLength) {
        return false
      }
    }
    if (element.type === 'array' && element.pointers) {
      for (const pointer of element.pointers) {
        if (pointer.index < 0 || pointer.index >= arrayLength) {
          return false
        }
      }
    }
  }
  return true
}

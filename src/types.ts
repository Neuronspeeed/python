/**
 * Standard complexity values for algorithm analysis
 */
export type ComplexityValue =
  | 'O(1)'
  | 'O(log n)'
  | 'O(n)'
  | 'O(n log n)'
  | 'O(n²)'
  | 'O(n³)'
  | 'O(2^n)'
  | 'O(n!)'
  | 'O(k)'
  | 'O(m+n)'
  | 'O(m*n)'
  | 'O(n) avg'
  | 'O(n) time'
  | 'O(varies)'
  | 'Concept'
  | 'Reference'

export interface Method {
  signature: string
  description: string
  /**
   * Time/space complexity notation.
   * Use ComplexityValue for common cases, or custom string for special cases.
   */
  complexity: ComplexityValue | string
  example: string
  section?: string
}

export interface Section {
  title: string
  start: number
  end: number
}

/**
 * Computes section boundaries from methods with section markers.
 * Eliminates fragile magic number indices.
 * 
 * @example
 * const methods = [
 *   { section: 'Basics', signature: 'foo', ... },
 *   { section: 'Basics', signature: 'bar', ... },
 *   { section: 'Advanced', signature: 'baz', ... },
 * ]
 * computeSections(methods) // [{ title: 'Basics', start: 0, end: 2 }, { title: 'Advanced', start: 2, end: 3 }]
 */
export function computeSections(methods: Method[]): Section[] {
  const sections: Section[] = []
  let currentSection: string | null = null
  let startIdx = 0

  methods.forEach((method, idx) => {
    const sectionName = method.section || 'General'
    
    if (sectionName !== currentSection) {
      if (currentSection !== null) {
        sections.push({ title: currentSection, start: startIdx, end: idx })
      }
      currentSection = sectionName
      startIdx = idx
    }
  })

  // Push final section
  if (currentSection !== null) {
    sections.push({ title: currentSection, start: startIdx, end: methods.length })
  }

  return sections
}

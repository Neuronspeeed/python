// Algorithm Learning Hub - Type Definitions

export type VisualizationType = 'array' | 'linkedList' | 'tree' | 'stack' | 'graph' | 'matrix'
export type Difficulty = 'Easy' | 'Medium' | 'Hard'

// URL-friendly category slugs for routing
export type LearnCategorySlug =
  | 'two-pointers'
  | 'sliding-window'
  | 'intervals'
  | 'stack'
  | 'linked-list'
  | 'binary-search'
  | 'heap'
  | 'dfs'
  | 'bfs'
  | 'backtracking'
  | 'graphs'
  | 'dynamic-programming'
  | 'greedy'
  | 'trie'
  | 'prefix-sum'
  | 'matrices'

// Legacy category type (for backward compatibility)
export type Category = 'twoPointers' | 'slidingWindow' | 'binarySearch' | 'stack' | 'linkedList' | 'dfs' | 'bfs' | 'heap' | 'backtracking' | 'graphs' | 'dynamicProgramming' | 'greedy' | 'trie' | 'prefixSum' | 'matrices' | 'intervals'

export type ElementStyle = 'default' | 'active' | 'comparing' | 'found' | 'visited' | 'swapped' | 'inactive'

export interface PointerElement {
  type: 'pointer'
  id: string
  index: number
  label: string
  color: string
}

export interface ArrayElement {
  type: 'array'
  id: string
  values: (number | string)[]
  highlights?: { index: number; style: ElementStyle }[]
  styles?: ElementStyle[]
  pointers?: { index: number; label: string; color: string }[]
  showBars?: boolean
}

export interface BracketElement {
  type: 'bracket'
  id: string
  left: number
  right: number
  label?: string
  value?: number | string
}

export interface StackElement {
  type: 'stack'
  id: string
  items: (string | number)[]
  highlights?: { index: number; style: ElementStyle }[]
}

export interface LinkedListNode {
  value: number | string
  style?: ElementStyle
}

export interface LinkedListElement {
  type: 'linkedList'
  id: string
  nodes: LinkedListNode[]
  pointers?: { index: number; label: string; color: string }[]
}

export interface MatrixElement {
  type: 'matrix'
  id: string
  rows: number
  cols: number
  values: (number | string)[]
  highlights?: { row: number; col: number; style: ElementStyle }[]
}

export interface TreeNode {
  value: number | string | null
  style?: ElementStyle
  label?: string  // e.g., "depth=2"
}

export interface TreeElement {
  type: 'tree'
  id: string
  nodes: (TreeNode | null)[]  // Level-order array representation
  highlights?: { index: number; style: ElementStyle }[]
}

export type VisualizationElement =
  | PointerElement
  | ArrayElement
  | BracketElement
  | StackElement
  | LinkedListElement
  | MatrixElement
  | TreeElement

export interface AlgorithmStep {
  lineNumber: number
  description: string
  elements: VisualizationElement[]
  variables?: Record<string, unknown>
  isComplete?: boolean
}

export interface AlgorithmInput {
  name: string
  type: 'array' | 'number' | 'string'
  default: number[] | number | string
  label: string
  placeholder?: string
}

// Example for algorithm problems
export interface AlgorithmExample {
  input: string
  output: string
  explanation?: string
}

// ADHD-friendly step
export interface AlgorithmStep2 {
  title: string
  description: string
  code?: string
}

// Educational content sections
export interface AlgorithmEducation {
  understanding?: string // "Understanding the Problem" section
  whyPatternWorks?: string // "Why Does This Pattern Work?" section
  explanation?: string // Post-visualization explanation
  keyInsights?: string[] // Key takeaways as bullet points
  // ADHD-friendly fields
  tldr?: string // One-line summary
  steps?: AlgorithmStep2[] // Visual numbered steps
  remember?: string[] // Quick reference bullet points
}

export interface AlgorithmDefinition {
  id: string
  name: string
  category: Category
  difficulty: Difficulty
  leetcodeId?: number
  description: string
  timeComplexity: string
  spaceComplexity: string
  code: string
  inputs: AlgorithmInput[]
  visualizationType: VisualizationType
  generateSteps: (input: Record<string, unknown>) => AlgorithmStep[]
  // New educational fields
  examples?: AlgorithmExample[]
  education?: AlgorithmEducation
}

// Legacy CategoryInfo (for backward compatibility with existing code)
export interface CategoryInfo {
  id: Category
  name: string
  color: string
  algorithms: AlgorithmDefinition[]
}

// Category overview for educational content
export interface CategoryOverview {
  slug: LearnCategorySlug
  name: string
  description: string
  color: string
  icon: string
  whenToUse: string[]
  keyPatterns: {
    name: string
    description: string
    timeComplexity: string
  }[]
  commonMistakes: string[]
  relatedCategories: LearnCategorySlug[]
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

// Extended category info with overview and slug-based routing
export interface LearnCategory {
  slug: LearnCategorySlug
  name: string
  color: string
  overview: CategoryOverview
  algorithms: AlgorithmDefinition[]
}

// Navigation item for sidebar
export interface LearnNavItem {
  slug: LearnCategorySlug
  name: string
  color: string
  algorithmCount: number
  algorithms: {
    id: string
    name: string
    difficulty: Difficulty
  }[]
}

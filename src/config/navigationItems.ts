import { ROUTES, type RoutePath } from './routes'

export interface NavItem {
  path: RoutePath
  label: string
  badge: string
  color: string
}

// PYTHON CORE - Fundamentals + basic syntax
export const pythonCoreItems: NavItem[] = [
  { path: ROUTES.FUNDAMENTALS, label: 'Fundamentals', badge: 'py', color: 'var(--accent-functions)' },
  { path: ROUTES.STATEMENTS, label: 'Statements', badge: '=', color: 'var(--accent-none)' },
  { path: ROUTES.CONDITIONALS, label: 'Conditionals', badge: 'if', color: 'var(--accent-none)' },
  { path: ROUTES.MATCH, label: 'Match', badge: 'match', color: 'var(--accent-none)' },
  { path: ROUTES.LOOPS, label: 'Loops', badge: 'for', color: 'var(--accent-none)' },
]

// DATA TYPES - All built-in types
export const dataTypeItems: NavItem[] = [
  { path: ROUTES.STRING, label: 'String', badge: 'str', color: 'var(--accent-str)' },
  { path: ROUTES.INT, label: 'Integer', badge: 'int', color: 'var(--accent-int)' },
  { path: ROUTES.FLOAT, label: 'Float', badge: 'float', color: 'var(--accent-float)' },
  { path: ROUTES.BOOL, label: 'Boolean', badge: 'bool', color: 'var(--accent-bool)' },
  { path: ROUTES.LIST, label: 'List', badge: 'list', color: 'var(--accent-list)' },
  { path: ROUTES.TUPLE, label: 'Tuple', badge: 'tuple', color: 'var(--accent-tuple)' },
  { path: ROUTES.DICT, label: 'Dictionary', badge: 'dict', color: 'var(--accent-dict)' },
  { path: ROUTES.SET, label: 'Set', badge: 'set', color: 'var(--accent-set)' },
]

// FUNCTIONS & OOP - Abstraction mechanisms
export const functionsOopItems: NavItem[] = [
  { path: ROUTES.FUNCTIONS, label: 'Functions', badge: 'def', color: 'var(--accent-functions)' },
  { path: ROUTES.OOP, label: 'OOP', badge: 'class', color: 'var(--accent-oop)' },
]

// MODULES & ERRORS - Program structure
export const modulesErrorsItems: NavItem[] = [
  { path: ROUTES.MODULES, label: 'Modules', badge: 'import', color: 'var(--accent-concurrency)' },
  { path: ROUTES.EXCEPTIONS, label: 'Exceptions', badge: 'try', color: 'var(--accent-exceptions)' },
]

// TOOLING - Dev tools
export const toolingItems: NavItem[] = [
  { path: ROUTES.DOCUMENTATION, label: 'Documentation', badge: 'doc', color: 'var(--accent-logging)' },
  { path: ROUTES.LOGGING, label: 'Logging', badge: 'log', color: 'var(--accent-logging)' },
  { path: ROUTES.CONCURRENCY, label: 'Concurrency', badge: 'async', color: 'var(--accent-concurrency)' },
  { path: ROUTES.FILEIO, label: 'File I/O', badge: 'file', color: 'var(--accent-fileio)' },
]

export const algorithmItems: NavItem[] = [
  { path: ROUTES.BIG_O, label: 'Big O', badge: 'O(n)', color: 'var(--accent-bigo)' },
  { path: ROUTES.SORTING, label: 'Sorting', badge: 'sort', color: 'var(--accent-sorting)' },
  { path: ROUTES.BINARY_SEARCH, label: 'Binary Search', badge: 'log', color: 'var(--accent-binary-search)' },
  { path: ROUTES.TWO_POINTERS, label: 'Two Pointers', badge: '2ptr', color: 'var(--accent-two-pointers)' },
  { path: ROUTES.BACKTRACKING, label: 'Backtracking', badge: 'bt', color: 'var(--accent-backtracking)' },
  { path: ROUTES.DYNAMIC_PROGRAMMING, label: 'Dynamic Prog', badge: 'dp', color: 'var(--accent-dp)' },
  { path: ROUTES.GRAPH, label: 'Graph Algos', badge: 'bfs', color: 'var(--accent-graph)' },
  { path: ROUTES.GREEDY, label: 'Greedy', badge: 'grdy', color: 'var(--accent-greedy)' },
  { path: ROUTES.INTERVALS, label: 'Intervals', badge: '[ ]', color: 'var(--accent-intervals)' },
  { path: ROUTES.SEGMENT_TREE, label: 'Segment Tree', badge: 'tree', color: 'var(--accent-segment-tree)' },
  { path: ROUTES.MATH, label: 'Math', badge: '∑', color: 'var(--accent-math)' },
]

export const dataStructureItems: NavItem[] = [
  { path: ROUTES.ARRAYS, label: 'Arrays', badge: 'arr', color: 'var(--accent-arrays)' },
  { path: ROUTES.LINKED_LIST, label: 'Linked List', badge: 'list', color: 'var(--accent-linked-list)' },
  { path: ROUTES.STACK_QUEUE, label: 'Stack & Queue', badge: 'stk', color: 'var(--accent-stack-queue)' },
  { path: ROUTES.BINARY_TREE, label: 'Binary Tree', badge: 'tree', color: 'var(--accent-binary-tree)' },
  { path: ROUTES.HEAP, label: 'Heap', badge: 'heap', color: 'var(--accent-heap)' },
  { path: ROUTES.TRIE, label: 'Trie', badge: 'trie', color: 'var(--accent-trie)' },
  { path: ROUTES.UNION_FIND, label: 'Union Find', badge: 'uf', color: 'var(--accent-union-find)' },
  { path: ROUTES.MATRIX, label: 'Matrix', badge: '[][]', color: 'var(--accent-matrix)' },
  { path: ROUTES.BIT_MANIPULATION, label: 'Bit Ops', badge: '&|^', color: 'var(--accent-bit-ops)' },
]

export const interviewPrepItems: NavItem[] = [
  { path: ROUTES.STDLIB, label: 'Stdlib', badge: 'py', color: 'var(--accent-stdlib)' },
  { path: ROUTES.DESIGN_PATTERNS, label: 'Design', badge: 'LRU', color: 'var(--accent-design)' },
  { path: ROUTES.GENERATORS, label: 'Generators', badge: 'yield', color: 'var(--accent-generators)' },
]

export const allNavItems: NavItem[] = [
  ...pythonCoreItems,
  ...dataTypeItems,
  ...functionsOopItems,
  ...modulesErrorsItems,
  ...toolingItems,
  ...algorithmItems,
  ...dataStructureItems,
  ...interviewPrepItems,
]

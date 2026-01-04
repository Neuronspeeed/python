export const ROUTES = {
  HOME: '/',
  // DS Problem Routes
  LINKED_LIST_PROBLEMS: '/linked-list/problems',
  LINKED_LIST_PROBLEM: '/linked-list/problems/:problemId',
  STACK_QUEUE_PROBLEMS: '/stack-queue/problems',
  STACK_QUEUE_PROBLEM: '/stack-queue/problems/:problemId',
  HEAP_PROBLEMS: '/heap/problems',
  HEAP_PROBLEM: '/heap/problems/:problemId',
  TRIE_PROBLEMS: '/trie/problems',
  TRIE_PROBLEM: '/trie/problems/:problemId',
  MATRIX_PROBLEMS: '/matrix/problems',
  MATRIX_PROBLEM: '/matrix/problems/:problemId',
  // Algorithm Problem Routes
  ARRAYS_PROBLEMS: '/arrays/problems',
  ARRAYS_PROBLEM: '/arrays/problems/:problemId',
  BINARY_TREE_PROBLEMS: '/binary-tree/problems',
  BINARY_TREE_PROBLEM: '/binary-tree/problems/:problemId',
  TWO_POINTERS_PROBLEMS: '/two-pointers/problems',
  TWO_POINTERS_PROBLEM: '/two-pointers/problems/:problemId',
  BINARY_SEARCH_PROBLEMS: '/binary-search/problems',
  BINARY_SEARCH_PROBLEM: '/binary-search/problems/:problemId',
  BACKTRACKING_PROBLEMS: '/backtracking/problems',
  BACKTRACKING_PROBLEM: '/backtracking/problems/:problemId',
  DP_PROBLEMS: '/dynamic-programming/problems',
  DP_PROBLEM: '/dynamic-programming/problems/:problemId',
  GREEDY_PROBLEMS: '/greedy/problems',
  GREEDY_PROBLEM: '/greedy/problems/:problemId',
  INTERVALS_PROBLEMS: '/intervals/problems',
  INTERVALS_PROBLEM: '/intervals/problems/:problemId',
  GRAPH_PROBLEMS: '/graph/problems',
  GRAPH_PROBLEM: '/graph/problems/:problemId',
  // Fundamentals
  FUNDAMENTALS: '/fundamentals',
  // Data Types
  STRING: '/str',
  INT: '/int',
  FLOAT: '/float',
  BOOL: '/bool',
  LIST: '/list',
  TUPLE: '/tuple',
  DICT: '/dict',
  SET: '/set',
  // Control Flow
  STATEMENTS: '/statements',
  CONDITIONALS: '/conditionals',
  LOOPS: '/loops',
  FUNCTIONS: '/functions',
  OOP: '/oop',
  // Advanced
  DOCUMENTATION: '/documentation',
  MODULES: '/modules',
  EXCEPTIONS: '/exceptions',
  LOGGING: '/logging',
  CONCURRENCY: '/concurrency',
  FILEIO: '/fileio',
  // Algorithms
  BIG_O: '/big-o',
  SORTING: '/sorting',
  BINARY_SEARCH: '/binary-search',
  TWO_POINTERS: '/two-pointers',
  BACKTRACKING: '/backtracking',
  DYNAMIC_PROGRAMMING: '/dynamic-programming',
  GRAPH: '/graph',
  // Data Structures
  ARRAYS: '/arrays',
  LINKED_LIST: '/linked-list',
  STACK_QUEUE: '/stack-queue',
  BINARY_TREE: '/binary-tree',
  HEAP: '/heap',
  TRIE: '/trie',
  UNION_FIND: '/union-find',
  MATRIX: '/matrix',
  BIT_MANIPULATION: '/bit-manipulation',
  // Interview Prep
  GREEDY: '/greedy',
  INTERVALS: '/intervals',
  STDLIB: '/stdlib',
  DESIGN_PATTERNS: '/design-patterns',
  MATH: '/math',
  GENERATORS: '/generators',
  SEGMENT_TREE: '/segment-tree',
} as const

export type RoutePath = typeof ROUTES[keyof typeof ROUTES]

export function buildLearnUrl(category: string, algorithm?: string): string {
  if (algorithm) {
    return `/learn/${category}/${algorithm}`
  }
  return `/learn/${category}`
}

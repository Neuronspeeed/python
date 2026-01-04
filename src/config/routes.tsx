import { lazy, type ComponentType, type LazyExoticComponent } from 'react'
import { ROUTES, type RoutePath } from './routePaths'

// eslint-disable-next-line react-refresh/only-export-components
export { ROUTES, type RoutePath, buildLearnUrl } from './routePaths'

export interface RouteConfig {
  path: RoutePath | string
  component: LazyExoticComponent<ComponentType>
}

// Page module imports - grouped by file for efficient bundling
const pages = {
  home: () => import('../pages/HomePage'),
  dataTypes: () => import('../pages/DataTypePages'),
  controlFlow: () => import('../pages/ControlFlowPages'),
  advanced: () => import('../pages/AdvancedPages'),
  algorithms: () => import('../pages/AlgorithmPages'),
  bigO: () => import('../pages/BigOPage'),
  dataStructures: () => import('../pages/DataStructurePages'),
  dsProblems: () => import('../pages/DSProblemsPages'),
  interviewPrep: () => import('../pages/InterviewPrepPages'),
}

// Helper to create lazy component from module
const lazyLoad = <T extends Record<string, ComponentType>>(
  loader: () => Promise<T>,
  name: keyof T
) => lazy(() => loader().then(m => ({ default: m[name] as ComponentType })))

// Home
const HomePage = lazyLoad(pages.home, 'HomePage')

// Data Types
const StringPage = lazyLoad(pages.dataTypes, 'StringPage')
const IntPage = lazyLoad(pages.dataTypes, 'IntPage')
const FloatPage = lazyLoad(pages.dataTypes, 'FloatPage')
const BoolPage = lazyLoad(pages.dataTypes, 'BoolPage')
const ListPage = lazyLoad(pages.dataTypes, 'ListPage')
const TuplePage = lazyLoad(pages.dataTypes, 'TuplePage')
const DictPage = lazyLoad(pages.dataTypes, 'DictPage')
const SetPage = lazyLoad(pages.dataTypes, 'SetPage')

// Control Flow
const FundamentalsPage = lazyLoad(pages.controlFlow, 'FundamentalsPage')
const StatementsPage = lazyLoad(pages.controlFlow, 'StatementsPage')
const ConditionalsPage = lazyLoad(pages.controlFlow, 'ConditionalsPage')
const LoopsPage = lazyLoad(pages.controlFlow, 'LoopsPage')
const FunctionsPage = lazyLoad(pages.controlFlow, 'FunctionsPage')
const OOPPage = lazyLoad(pages.controlFlow, 'OOPPage')

// Advanced
const DocumentationPage = lazyLoad(pages.advanced, 'DocumentationPage')
const ModulesPage = lazyLoad(pages.advanced, 'ModulesPage')
const ExceptionsPage = lazyLoad(pages.advanced, 'ExceptionsPage')
const LoggingPage = lazyLoad(pages.advanced, 'LoggingPage')
const ConcurrencyPage = lazyLoad(pages.advanced, 'ConcurrencyPage')

// Algorithms
const BigOPage = lazyLoad(pages.bigO, 'BigOPage')
const SortingPage = lazyLoad(pages.algorithms, 'SortingPage')
const BinarySearchPage = lazyLoad(pages.algorithms, 'BinarySearchPage')
const TwoPointersPage = lazyLoad(pages.algorithms, 'TwoPointersPage')
const BacktrackingPage = lazyLoad(pages.algorithms, 'BacktrackingPage')
const DynamicProgrammingPage = lazyLoad(pages.algorithms, 'DynamicProgrammingPage')
const GraphPage = lazyLoad(pages.algorithms, 'GraphPage')

// Data Structures
const ArraysPage = lazyLoad(pages.dataStructures, 'ArraysPage')
const LinkedListPage = lazyLoad(pages.dataStructures, 'LinkedListPage')
const StackQueuePage = lazyLoad(pages.dataStructures, 'StackQueuePage')
const BinaryTreePage = lazyLoad(pages.dataStructures, 'BinaryTreePage')
const HeapPage = lazyLoad(pages.dataStructures, 'HeapPage')
const TriePage = lazyLoad(pages.dataStructures, 'TriePage')
const UnionFindPage = lazyLoad(pages.dataStructures, 'UnionFindPage')
const MatrixPage = lazyLoad(pages.dataStructures, 'MatrixPage')
const BitManipulationPage = lazyLoad(pages.dataStructures, 'BitManipulationPage')

// DS Problem Pages
const LinkedListProblemsPage = lazyLoad(pages.dsProblems, 'LinkedListProblemsPage')
const LinkedListProblemPage = lazyLoad(pages.dsProblems, 'LinkedListProblemPage')
const StackQueueProblemsPage = lazyLoad(pages.dsProblems, 'StackQueueProblemsPage')
const StackQueueProblemPage = lazyLoad(pages.dsProblems, 'StackQueueProblemPage')
const HeapProblemsPage = lazyLoad(pages.dsProblems, 'HeapProblemsPage')
const HeapProblemPage = lazyLoad(pages.dsProblems, 'HeapProblemPage')
const TrieProblemsPage = lazyLoad(pages.dsProblems, 'TrieProblemsPage')
const TrieProblemPage = lazyLoad(pages.dsProblems, 'TrieProblemPage')
const MatrixProblemsPage = lazyLoad(pages.dsProblems, 'MatrixProblemsPage')
const MatrixProblemPage = lazyLoad(pages.dsProblems, 'MatrixProblemPage')
const ArraysProblemsPage = lazyLoad(pages.dsProblems, 'ArraysProblemsPage')
const ArraysProblemPage = lazyLoad(pages.dsProblems, 'ArraysProblemPage')
const BinaryTreeProblemsPage = lazyLoad(pages.dsProblems, 'BinaryTreeProblemsPage')
const BinaryTreeProblemPage = lazyLoad(pages.dsProblems, 'BinaryTreeProblemPage')
const TwoPointersProblemsPage = lazyLoad(pages.dsProblems, 'TwoPointersProblemsPage')
const TwoPointersProblemPage = lazyLoad(pages.dsProblems, 'TwoPointersProblemPage')
const BinarySearchProblemsPage = lazyLoad(pages.dsProblems, 'BinarySearchProblemsPage')
const BinarySearchProblemPage = lazyLoad(pages.dsProblems, 'BinarySearchProblemPage')
const BacktrackingProblemsPage = lazyLoad(pages.dsProblems, 'BacktrackingProblemsPage')
const BacktrackingProblemPage = lazyLoad(pages.dsProblems, 'BacktrackingProblemPage')
const DPProblemsPage = lazyLoad(pages.dsProblems, 'DPProblemsPage')
const DPProblemPage = lazyLoad(pages.dsProblems, 'DPProblemPage')
const GreedyProblemsPage = lazyLoad(pages.dsProblems, 'GreedyProblemsPage')
const GreedyProblemPage = lazyLoad(pages.dsProblems, 'GreedyProblemPage')
const IntervalsProblemsPage = lazyLoad(pages.dsProblems, 'IntervalsProblemsPage')
const IntervalsProblemPage = lazyLoad(pages.dsProblems, 'IntervalsProblemPage')
const GraphProblemsPage = lazyLoad(pages.dsProblems, 'GraphProblemsPage')
const GraphProblemPage = lazyLoad(pages.dsProblems, 'GraphProblemPage')

// Interview Prep
const GreedyPage = lazyLoad(pages.interviewPrep, 'GreedyPage')
const IntervalsPage = lazyLoad(pages.interviewPrep, 'IntervalsPage')
const StdlibPage = lazyLoad(pages.interviewPrep, 'StdlibPage')
const DesignPatternsPage = lazyLoad(pages.interviewPrep, 'DesignPatternsPage')
const MathPage = lazyLoad(pages.interviewPrep, 'MathPage')
const GeneratorsPage = lazyLoad(pages.interviewPrep, 'GeneratorsPage')
const SegmentTreePage = lazyLoad(pages.interviewPrep, 'SegmentTreePage')

// eslint-disable-next-line react-refresh/only-export-components
export const routeConfigs: RouteConfig[] = [
  { path: ROUTES.HOME, component: HomePage },
  // Data Types
  { path: ROUTES.STRING, component: StringPage },
  { path: ROUTES.INT, component: IntPage },
  { path: ROUTES.FLOAT, component: FloatPage },
  { path: ROUTES.BOOL, component: BoolPage },
  { path: ROUTES.LIST, component: ListPage },
  { path: ROUTES.TUPLE, component: TuplePage },
  { path: ROUTES.DICT, component: DictPage },
  { path: ROUTES.SET, component: SetPage },
  // Control Flow
  { path: ROUTES.FUNDAMENTALS, component: FundamentalsPage },
  { path: ROUTES.STATEMENTS, component: StatementsPage },
  { path: ROUTES.CONDITIONALS, component: ConditionalsPage },
  { path: ROUTES.LOOPS, component: LoopsPage },
  { path: ROUTES.FUNCTIONS, component: FunctionsPage },
  { path: ROUTES.OOP, component: OOPPage },
  // Advanced
  { path: ROUTES.DOCUMENTATION, component: DocumentationPage },
  { path: ROUTES.MODULES, component: ModulesPage },
  { path: ROUTES.EXCEPTIONS, component: ExceptionsPage },
  { path: ROUTES.LOGGING, component: LoggingPage },
  { path: ROUTES.CONCURRENCY, component: ConcurrencyPage },
  // Algorithms
  { path: ROUTES.BIG_O, component: BigOPage },
  { path: ROUTES.SORTING, component: SortingPage },
  { path: ROUTES.BINARY_SEARCH, component: BinarySearchPage },
  { path: ROUTES.TWO_POINTERS, component: TwoPointersPage },
  { path: ROUTES.BACKTRACKING, component: BacktrackingPage },
  { path: ROUTES.DYNAMIC_PROGRAMMING, component: DynamicProgrammingPage },
  { path: ROUTES.GRAPH, component: GraphPage },
  // DS Problems (specific routes before general DS routes)
  { path: ROUTES.LINKED_LIST_PROBLEM, component: LinkedListProblemPage },
  { path: ROUTES.LINKED_LIST_PROBLEMS, component: LinkedListProblemsPage },
  { path: ROUTES.STACK_QUEUE_PROBLEM, component: StackQueueProblemPage },
  { path: ROUTES.STACK_QUEUE_PROBLEMS, component: StackQueueProblemsPage },
  { path: ROUTES.HEAP_PROBLEM, component: HeapProblemPage },
  { path: ROUTES.HEAP_PROBLEMS, component: HeapProblemsPage },
  { path: ROUTES.TRIE_PROBLEM, component: TrieProblemPage },
  { path: ROUTES.TRIE_PROBLEMS, component: TrieProblemsPage },
  { path: ROUTES.MATRIX_PROBLEM, component: MatrixProblemPage },
  { path: ROUTES.MATRIX_PROBLEMS, component: MatrixProblemsPage },
  // Algorithm Problem Routes
  { path: ROUTES.ARRAYS_PROBLEM, component: ArraysProblemPage },
  { path: ROUTES.ARRAYS_PROBLEMS, component: ArraysProblemsPage },
  { path: ROUTES.BINARY_TREE_PROBLEM, component: BinaryTreeProblemPage },
  { path: ROUTES.BINARY_TREE_PROBLEMS, component: BinaryTreeProblemsPage },
  { path: ROUTES.TWO_POINTERS_PROBLEM, component: TwoPointersProblemPage },
  { path: ROUTES.TWO_POINTERS_PROBLEMS, component: TwoPointersProblemsPage },
  { path: ROUTES.BINARY_SEARCH_PROBLEM, component: BinarySearchProblemPage },
  { path: ROUTES.BINARY_SEARCH_PROBLEMS, component: BinarySearchProblemsPage },
  { path: ROUTES.BACKTRACKING_PROBLEM, component: BacktrackingProblemPage },
  { path: ROUTES.BACKTRACKING_PROBLEMS, component: BacktrackingProblemsPage },
  { path: ROUTES.DP_PROBLEM, component: DPProblemPage },
  { path: ROUTES.DP_PROBLEMS, component: DPProblemsPage },
  { path: ROUTES.GREEDY_PROBLEM, component: GreedyProblemPage },
  { path: ROUTES.GREEDY_PROBLEMS, component: GreedyProblemsPage },
  { path: ROUTES.INTERVALS_PROBLEM, component: IntervalsProblemPage },
  { path: ROUTES.INTERVALS_PROBLEMS, component: IntervalsProblemsPage },
  { path: ROUTES.GRAPH_PROBLEM, component: GraphProblemPage },
  { path: ROUTES.GRAPH_PROBLEMS, component: GraphProblemsPage },
  // Data Structures
  { path: ROUTES.ARRAYS, component: ArraysPage },
  { path: ROUTES.LINKED_LIST, component: LinkedListPage },
  { path: ROUTES.STACK_QUEUE, component: StackQueuePage },
  { path: ROUTES.BINARY_TREE, component: BinaryTreePage },
  { path: ROUTES.HEAP, component: HeapPage },
  { path: ROUTES.TRIE, component: TriePage },
  { path: ROUTES.UNION_FIND, component: UnionFindPage },
  { path: ROUTES.MATRIX, component: MatrixPage },
  { path: ROUTES.BIT_MANIPULATION, component: BitManipulationPage },
  // Interview Prep
  { path: ROUTES.GREEDY, component: GreedyPage },
  { path: ROUTES.INTERVALS, component: IntervalsPage },
  { path: ROUTES.STDLIB, component: StdlibPage },
  { path: ROUTES.DESIGN_PATTERNS, component: DesignPatternsPage },
  { path: ROUTES.MATH, component: MathPage },
  { path: ROUTES.GENERATORS, component: GeneratorsPage },
  { path: ROUTES.SEGMENT_TREE, component: SegmentTreePage },
]

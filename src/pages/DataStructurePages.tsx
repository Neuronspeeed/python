import { TypePage } from '../components/TypePage'
import { arrayMethods } from '../data/arrays'
import { linkedListMethods } from '../data/linkedList'
import { stackQueueMethods } from '../data/stackQueue'
import { binaryTreeMethods } from '../data/binaryTree'
import { heapMethods } from '../data/heap'
import { trieMethods } from '../data/trie'
import { unionFindMethods } from '../data/unionFind'
import { matrixMethods } from '../data/matrix'
import { bitManipulationMethods } from '../data/bitManipulation'
import { DSCategoryTabs } from '../components/DSCategoryTabs'
import { getProblemCount } from '../data/learn'

export function ArraysPage() {
  return (
    <TypePage
      type="Arrays" badge="arr" color="var(--accent-arrays)"
      description="Contiguous memory storage with O(1) access. Foundation of all data structures. Master indexing, slicing, and two-pointer techniques."
      tip={`Range sum queries? Prefix sum array
Max subarray sum? Kadane's algorithm
Last element? arr[-1]`}
      methods={arrayMethods}
      tabs={<DSCategoryTabs basePath="/arrays" problemCount={getProblemCount('slidingWindow', 'prefixSum')} />}
    />
  )
}

export function LinkedListPage() {
  return (
    <TypePage
      type="Linked List" badge="list" color="var(--accent-linked-list)"
      description="Sequential nodes with pointer connections. Master fast/slow pointers for cycle detection and middle finding."
      tip={`Edge cases? Use dummy head
Cycle or middle? Fast/slow pointers
Reverse? prev, curr swap while iterating`}
      methods={linkedListMethods}
      tabs={<DSCategoryTabs basePath="/linked-list" problemCount={getProblemCount('linkedList')} />}
    />
  )
}

export function StackQueuePage() {
  return (
    <TypePage
      type="Stack & Queue" badge="stk" color="var(--accent-stack-queue)"
      description="LIFO stack for undo/matching/DFS. FIFO queue for BFS/scheduling. Monotonic stack for next greater element."
      tip={`Matching brackets? Stack
"Next greater element"? Monotonic stack
Level-order traversal? Queue (BFS)`}
      methods={stackQueueMethods}
      tabs={<DSCategoryTabs basePath="/stack-queue" problemCount={getProblemCount('stack')} />}
    />
  )
}

export function BinaryTreePage() {
  return (
    <TypePage
      type="Binary Tree" badge="tree" color="var(--accent-binary-tree)"
      description="Hierarchical structure with at most 2 children per node. Master DFS (pre/in/post order) and BFS (level order)."
      tip={`BST to sorted array? Inorder traversal
Level by level? BFS with queue
Base case? if not node: return`}
      methods={binaryTreeMethods}
      tabs={<DSCategoryTabs basePath="/binary-tree" problemCount={getProblemCount('dfs', 'bfs')} />}
    />
  )
}

export function HeapPage() {
  return (
    <TypePage
      type="Heap / Priority Queue" badge="heap" color="var(--accent-heap)"
      description="Get min/max in O(1), insert/remove in O(log n). Essential for top-k problems and scheduling."
      tip={`Top K elements? Heap of size K
Need max-heap? Negate values (-val)
Merge K sorted lists? Min-heap`}
      methods={heapMethods}
      tabs={<DSCategoryTabs basePath="/heap" problemCount={getProblemCount('heap')} />}
    />
  )
}

export function TriePage() {
  return (
    <TypePage
      type="Trie" badge="trie" color="var(--accent-trie)"
      description="Prefix tree for efficient string operations. O(L) insert/search where L is word length."
      tip={`Prefix search/autocomplete? Trie
Word Search II? Trie + DFS
Node structure? {children: {}, is_word}`}
      methods={trieMethods}
      tabs={<DSCategoryTabs basePath="/trie" problemCount={getProblemCount('trie')} />}
    />
  )
}

export function UnionFindPage() {
  return (
    <TypePage
      type="Union Find" badge="uf" color="var(--accent-union-find)"
      description="Track disjoint sets efficiently. Near O(1) union and find with path compression and union by rank."
      tip={`"Are X and Y connected?" Union-Find
Count components? Unique parents
Cycle in undirected graph? Union-Find`}
      methods={unionFindMethods}
    />
  )
}

export function MatrixPage() {
  return (
    <TypePage
      type="Matrix Operations" badge="[][]" color="var(--accent-matrix)"
      description="2D array operations for grids, images, graphs. Master traversal patterns and transformations."
      tip={`Grid traversal? directions = [(0,1),(1,0),(0,-1),(-1,0)]
Rotate 90°? Transpose then reverse rows
Flood fill? DFS/BFS from start cell`}
      methods={matrixMethods}
      tabs={<DSCategoryTabs basePath="/matrix" problemCount={getProblemCount('matrices')} />}
    />
  )
}

export function BitManipulationPage() {
  return (
    <TypePage
      type="Bit Manipulation" badge="&|^" color="var(--accent-bit-ops)"
      description="Extremely fast O(1) operations. Essential for flags, subsets, and optimization problems."
      tip={`Find single number? XOR all (a^a=0)
Power of 2? n & (n-1) == 0
Generate subsets? Loop 0 to 2^n`}
      methods={bitManipulationMethods}
    />
  )
}

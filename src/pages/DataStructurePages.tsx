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

const arraysIntro = `Arrays are contiguous blocks of memory that provide O(1) random access to elements by index. They're the foundation of nearly all data structures—strings, stacks, queues, heaps, and hash tables all build on arrays. The key insight: trading off insertion/deletion cost (O(n) for shifts) for blazing fast access and iteration (cache-friendly).

PYTHON LISTS ARE DYNAMIC ARRAYS: Unlike traditional fixed-size arrays, Python lists automatically resize when needed. When capacity is exceeded, Python allocates a new array (typically 1.5-2x larger), copies elements, and frees the old array. This makes append() O(1) amortized—most appends are instant, occasional ones trigger resize. Understanding this explains why building a list with repeated append() is O(n) total, not O(n²).

ARRAY VS LINKED LIST: This is the fundamental data structure trade-off. Arrays: O(1) access by index, O(n) insert/delete (must shift elements). Linked Lists: O(n) access (must traverse), O(1) insert/delete at known position (just pointer changes). Cache locality also matters—arrays store elements contiguously, so iterating is fast. Linked lists scatter nodes in memory, causing cache misses. Choose arrays when: you need random access, iteration is common, size is predictable. Choose linked lists when: frequent insertions/deletions at arbitrary positions, size varies wildly.

WHEN TO SORT FIRST: A sorted array unlocks powerful algorithms. Binary search becomes possible (O(log n) vs O(n)). Two pointers pattern works for many problems (find pairs summing to target). Greedy algorithms often require sorting (interval scheduling). Detecting duplicates becomes trivial (just check consecutive elements). Trade-off: sorting costs O(n log n), so only sort if it simplifies the problem enough. For one-time searches, O(n) scan might be better than O(n log n) sort + O(log n) search.

PREFIX SUM PATTERN: For range sum queries on static arrays, preprocessing with prefix sums converts O(n) queries to O(1). Build prefix[i] = sum of arr[0..i-1], then sum(arr[left:right]) = prefix[right] - prefix[left]. This pattern extends to 2D arrays for rectangle sum queries. Essential for problems with many range queries—preprocessing once (O(n)) enables unlimited O(1) queries.

SLIDING WINDOW PATTERN: For subarray problems with size constraint, the sliding window maintains a fixed or variable-sized range while iterating. Instead of recalculating from scratch (O(n) per position), slide the window by removing left element and adding right element (O(1) per position). Reduces O(n²) to O(n). Variants: fixed window size, variable window with condition, two pointers for sorted arrays.`

const linkedListIntro = `Linked lists are sequences of nodes connected by pointers, where each node contains data and a reference to the next node. Unlike arrays with contiguous memory, linked list nodes scatter throughout memory. The key insight: O(1) insertion/deletion at known positions (just update pointers) vs arrays' O(n) shifts—but you pay with O(n) access time and poor cache performance.

SINGLY VS DOUBLY LINKED: Singly linked lists have one pointer (next), making them memory-efficient but one-directional. Doubly linked lists add a prev pointer, enabling bidirectional traversal and O(1) deletion when you have a node reference (no need to find predecessor). Python's collections.deque uses a doubly linked list for O(1) operations at both ends. Most interview problems use singly linked lists to test pointer manipulation skills.

FAST/SLOW POINTER PATTERN: Two pointers moving at different speeds solve many linked list problems. For finding the middle: slow moves 1 step, fast moves 2 steps—when fast reaches end, slow is at middle. For cycle detection: if there's a cycle, fast will eventually lap slow and they'll meet (Floyd's algorithm). For finding nth from end: start fast with n-step lead, then move both until fast reaches end.

DUMMY HEAD TECHNIQUE: Many linked list operations become simpler with a dummy node before the real head. This eliminates special cases for operations at the head (insertion, deletion). Instead of checking "if this is the head", just treat all nodes uniformly. Common pattern: \`dummy = ListNode(0, head)\`, do operations, return \`dummy.next\` as new head.

WHEN LINKED LIST BEATS ARRAY: Use linked lists when: implementing queue/deque (O(1) at both ends), frequent insertions/deletions in the middle (if you maintain references), implementing LRU cache (doubly linked list + hash map), unknown or wildly varying size. Don't use linked lists when: you need random access, iteration dominates (cache misses hurt), memory overhead matters (each node has pointer overhead).

EDGE CASES TO ALWAYS CONSIDER: Empty list (head is None), single node, operations at head/tail, cycles (if possible), modifying list while traversing. The dummy head technique handles most head-related edge cases automatically.`

const stackQueueIntro = `Stacks and queues are abstract data types that restrict access to elements, enforcing specific ordering. Stack is LIFO (Last In, First Out)—like a stack of plates. Queue is FIFO (First In, First Out)—like a line at a store. The key insight: restrictions enable elegant solutions to problems involving matching, ordering, and traversal.

STACK IMPLEMENTATION: Python lists work perfectly as stacks. \`append()\` pushes (O(1)), \`pop()\` pops (O(1)), \`[-1]\` peeks at top (O(1)). These operations are fast because they work at the end of the array, requiring no shifts. Stacks power recursion (call stack), DFS traversal, expression evaluation, and undo mechanisms.

QUEUE IMPLEMENTATION: NEVER use Python lists as queues! \`list.pop(0)\` is O(n) because it shifts all remaining elements. Always use \`collections.deque\`—it's a doubly linked list with O(1) operations at both ends. \`append()\` enqueues right, \`popleft()\` dequeues left, \`[0]\` peeks front.

MONOTONIC STACK PATTERN: A stack that maintains elements in increasing or decreasing order. When a new element violates the order, pop until order is restored, then push. This pattern solves "next greater element" problems in O(n). Example: for each element, find the next larger element to the right. Monotonic decreasing stack: pop smaller elements when you see a larger one—the larger one is the "next greater" for all popped elements.

STACK FOR DFS, QUEUE FOR BFS: Stack (or recursion, which uses call stack) gives depth-first traversal—go deep before backtracking. Queue gives breadth-first traversal—process level by level. Stack for: finding paths (backtracking), topological sort, maze solving. Queue for: shortest path (unweighted), level-order tree traversal, finding closest node.

WHEN TO USE STACK VS QUEUE: Stack when order needs to be reversed (last processed first), when you're backtracking, when matching pairs. Queue when processing in order received, when level-by-level traversal matters, when fairness/FIFO scheduling needed.`

const binaryTreeIntro = `Binary trees are hierarchical data structures where each node has at most two children (left and right). The key insight: recursion is natural for trees—most tree operations follow the pattern "process node, recurse left, recurse right". Trees enable O(log n) operations when balanced (BST), but degrade to O(n) when unbalanced.

TREE TERMINOLOGY: Root is the top node with no parent. Leaf nodes have no children. Height is the longest path from a node to a leaf. Depth is the distance from root to a node. A complete binary tree has all levels filled except possibly the last, which fills left-to-right. A full binary tree has every node with 0 or 2 children (no node has exactly 1 child).

TRAVERSAL ORDERS: The order you visit nodes defines the traversal. Preorder (root, left, right): use for copying tree, serialization. Inorder (left, root, right): BST gives sorted order—this is THE way to get sorted elements from BST. Postorder (left, right, root): use when children must be processed before parent (deletion, calculating size/height). Level-order (BFS): process level by level using queue—use for shortest path, printing by level.

DFS VS BFS: DFS (depth-first search) uses recursion or stack, going deep before backtracking. BFS (breadth-first search) uses queue, processing level by level. DFS for: finding paths, checking subtree properties, using less memory (recursion stack vs explicit queue). BFS for: shortest path in unweighted tree, level-order processing, finding closest node to root.

BINARY SEARCH TREE (BST): A binary tree where left.val < node.val < right.val for all nodes. This property enables O(log n) search, insert, delete when balanced. Inorder traversal of BST gives sorted order. BST operations degrade to O(n) on unbalanced trees (essentially a linked list). Self-balancing BSTs (AVL, Red-Black) maintain O(log n) by rebalancing on operations.

COMMON PATTERNS: Path sum (DFS tracking current sum), lowest common ancestor (recursive: if p and q in different subtrees, current node is LCA), diameter (longest path—recurse to get height of each subtree), validate BST (track valid range as you recurse), tree to linked list (morris traversal for O(1) space).`

const heapIntro = `A heap is a complete binary tree that maintains the heap property: in a min-heap, parent ≤ children (root is minimum); in a max-heap, parent ≥ children (root is maximum). The key insight: get min/max in O(1), insert/remove in O(log n)—perfect for priority queues and "top-k" problems.

WHY HEAPS ARE FAST: The complete binary tree structure means height is always O(log n) for n elements. Operations move elements up (bubble up on insert) or down (bubble down on delete) the tree, taking at most O(log n) steps. Building a heap from an array is O(n), not O(n log n)—this enables heapsort and efficient initialization. Python's heapq implements min-heap only—use negative values for max-heap behavior.

TOP-K PATTERN: To find K largest elements, use a min-heap of size K. As you process elements, if new element > heap[0], pop smallest and push new element. The heap maintains the K largest seen so far. For K smallest, use max-heap. This avoids full sorting (O(n log n))—heap solution is O(n log k).

HEAP VS SORTED ARRAY: Both give O(1) peek at min/max. Heap: O(log n) insert, O(log n) delete min. Sorted array: O(n) insert (must maintain sort), O(1) delete min (if allowed to modify). Use heap for dynamic data with frequent insertions. Use sorted array for static data or when you need binary search (heaps don't support efficient search).

MERGE K SORTED LISTS: Classic heap problem. Put first element from each list in min-heap (with list index). Pop smallest, add to result, push next element from same list. The heap always contains the K "candidates" for next smallest element. Time: O(N log K) where N is total elements, K is number of lists.

RUNNING MEDIAN: Maintain two heaps—max-heap for lower half of numbers, min-heap for upper half. Keep sizes balanced (differ by at most 1). Median is either top of larger heap, or average of both tops. Each insert is O(log n), getting median is O(1). This beats sorting each time (O(n log n) per query).`

const trieIntro = `A trie (prefix tree) is a tree where each node represents a character, and paths from root spell out strings. The key insight: O(L) search/insert where L is word length, independent of how many words are stored. Perfect for prefix operations—autocomplete, spell check, word games.

STRUCTURE: Each node has a dictionary/map of children (character → child node) and a boolean marking if it's the end of a word. The path from root to a node represents a prefix, and all descendants share that prefix. This structure makes prefix search trivial—just follow the path. Operations are O(L) where L is word/prefix length.

TRIE VS HASH TABLE: Hash table gives O(L) insert/search but can't do prefix operations. Finding all words with prefix P: Trie is O(P + results), hash table is O(N*L) checking every word. Autocomplete with trie: walk to prefix in O(P), then DFS to collect all words in that subtree. Tries use more memory (each node has character map) but enable operations hash tables can't do efficiently.

WORD SEARCH II PATTERN: Given a grid and a dictionary, find all dictionary words in the grid. Naive: for each word, DFS grid (slow). Trie approach: build trie from dictionary, DFS grid while walking trie simultaneously. When path in grid doesn't match any prefix in trie, backtrack (pruning). This converts checking N words into one DFS guided by the trie.

SPACE COMPLEXITY: Worst case is O(N * L * alphabet_size) for N words of length L with alphabet_size characters. In practice, shared prefixes reduce this significantly. For lowercase English (26 chars), each node could have 26 child pointers, making tries memory-heavy. Compressed tries (radix trees) reduce nodes by merging chains.`

const unionFindIntro = `Union-Find (Disjoint Set Union) tracks which elements belong to which disjoint set, supporting near-constant-time union and find operations. The key insight: represent each set as a tree where elements point to parents, eventually reaching a root—the set representative.

OPERATIONS: Find(x) returns the root/representative of x's set by following parent pointers. Union(x, y) merges the sets containing x and y by making one root point to the other. Connected(x, y) checks if find(x) == find(y). Without optimizations, these are O(n) worst case (linear chain). With optimizations (path compression + union by rank), they're O(α(n)) ≈ O(1) amortized, where α is the inverse Ackermann function (< 5 for all practical n).

PATH COMPRESSION: When finding root of x, make all nodes on path point directly to root. This flattens the tree, making future finds faster. Implementation: in find(), after recursively finding root, set \`parent[x] = find(parent[x])\`. This single line converts O(n) worst case to O(α(n)) amortized.

UNION BY RANK: When merging trees, attach shorter tree to taller tree (rank is upper bound on height). This prevents trees from becoming linear chains. Combined with path compression, this achieves O(α(n)) complexity—essentially constant time for practical purposes.

CYCLE DETECTION: For undirected graphs, union-find detects cycles efficiently. Process edges one by one. For edge (u, v): if find(u) == find(v), they're already connected—adding this edge creates a cycle. Otherwise, union(u, v). This is the basis of Kruskal's MST algorithm.

WHEN TO USE UNION-FIND: Dynamic connectivity (are x and y connected? add connection), connected components count (count unique roots), cycle detection in undirected graphs, Kruskal's MST, equivalence classes. Don't use when: you need actual paths between nodes (use DFS/BFS), directed graphs (union-find is for undirected), you need to disconnect elements (union-find doesn't support "split").`

const matrixIntro = `Matrices (2D arrays) represent grids, images, game boards, and graph adjacency relationships. The key insight: many matrix problems have elegant traversal patterns—mastering directions arrays, boundary checks, and transformation techniques solves most matrix challenges.

BASIC ACCESS AND TRAVERSAL: Access element at row i, column j with \`matrix[i][j]\`. Python uses row-major order (iterate rows first). Always check bounds: \`0 <= i < rows and 0 <= j < cols\`. Common mistake: mixing up rows and columns—remember \`matrix[row][col]\`, height is rows, width is cols. Use directions array for 4-directional traversal (up, down, left, right) or 8-directional (includes diagonals).

MATRIX TRANSFORMATIONS: Rotate 90° clockwise: transpose (swap \`matrix[i][j]\` with \`matrix[j][i]\`), then reverse each row. Rotate 90° counter-clockwise: reverse each row, then transpose. Transpose: swap across main diagonal. Spiral traversal: use four pointers (top, bottom, left, right), move in spiral, shrinking boundaries.

ISLAND PROBLEMS: Given a grid of 1s (land) and 0s (water), count islands (connected components of 1s). Pattern: iterate through grid, when you find a 1, increment count and DFS/BFS to mark all connected 1s as visited (change to 0 or use visited set). Each DFS marks one complete island.

FLOOD FILL: Starting from a cell, change all connected cells of the same color. Same DFS/BFS pattern as island problems. Applications: paint bucket tool, region coloring, connected component analysis.

MATRIX AS GRAPH: An adjacency matrix represents graphs: \`matrix[i][j]\` = edge weight from i to j (or 1 if edge exists, 0 if not). Space: O(V²). Good for dense graphs or when you need O(1) edge lookup. For sparse graphs, adjacency list is better (O(V + E) space).`

const bitManipulationIntro = `Bit manipulation operates on individual bits using bitwise operators. The key insight: computers natively work with bits—bit operations are extremely fast (O(1)) and enable elegant solutions to subset generation, single element finding, and flag management.

BIT BASICS: Integers are stored as binary: 13 = 1101 = 1×8 + 1×4 + 0×2 + 1×1. Bits are numbered from right (0) to left. Bit i has value 2^i. Most operations work on corresponding bits independently. Key operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).

XOR PROPERTIES: The magic of XOR is that \`a ^ a = 0\` and \`a ^ 0 = a\`. This means XOR-ing a number with itself cancels it out. Consequence: XOR-ing all elements where duplicates cancel leaves only the unique element. XOR is commutative and associative, so order doesn't matter. This enables finding the single non-duplicate in O(n) time, O(1) space.

POWER OF TWO: A number is a power of 2 if it has exactly one bit set: 8 = 1000, 16 = 10000. Trick: powers of 2 satisfy \`n & (n-1) == 0\`. Why? n-1 flips all bits from the rightmost 1 to the right, so ANDing cancels out. Example: 8 = 1000, 7 = 0111, 8 & 7 = 0000.

SUBSET GENERATION: To generate all subsets of n elements, iterate mask from 0 to 2^n - 1. Each bit i in mask represents whether to include element i. For n=3: 000 (empty), 001 (element 0), 010 (element 1), ..., 111 (all elements). This maps integers to subsets naturally.

COUNTING SET BITS: How many 1 bits in a number? Brian Kernighan's algorithm: \`n & (n-1)\` clears the rightmost set bit. Repeat until n becomes 0, counting iterations. Example: 13 = 1101 → 1100 → 1000 → 0000 (3 iterations = 3 set bits). Python shortcut: \`bin(n).count('1')\`.

WHEN TO USE BIT MANIPULATION: Flags and permissions (pack multiple booleans into one int), subset enumeration, finding unique elements (XOR tricks), optimization problems requiring checking all combinations, space optimization (BitSet for large boolean arrays), cryptography and hashing. Don't use when: readability matters more than micro-optimization, logic is clearer with regular boolean operations.`

export function ArraysPage() {
  return (
    <TypePage
      type="Arrays" badge="arr" color="var(--accent-arrays)"
      description="Contiguous memory storage with O(1) access. Foundation of all data structures. Master indexing, slicing, and two-pointer techniques."
      intro={arraysIntro}
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
      intro={linkedListIntro}
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
      intro={stackQueueIntro}
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
      intro={binaryTreeIntro}
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
      intro={heapIntro}
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
      intro={trieIntro}
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
      intro={unionFindIntro}
      methods={unionFindMethods}
    />
  )
}

export function MatrixPage() {
  return (
    <TypePage
      type="Matrix Operations" badge="[][]" color="var(--accent-matrix)"
      description="2D array operations for grids, images, graphs. Master traversal patterns and transformations."
      intro={matrixIntro}
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
      intro={bitManipulationIntro}
      methods={bitManipulationMethods}
    />
  )
}

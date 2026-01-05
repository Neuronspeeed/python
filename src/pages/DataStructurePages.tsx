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

\`\`\`python
# Dynamic array behavior
arr = []
for i in range(10):
    arr.append(i)  # O(1) amortized - occasional resize, but total is O(n)

# Access is always O(1)
value = arr[5]  # Direct index calculation: base_address + (index * element_size)

# Insertion in middle is O(n)
arr.insert(3, 99)  # Shifts arr[3:] one position right

# Sorting unlocks powerful patterns
arr.sort()  # O(n log n) - enables binary search O(log n), two pointers O(n)
\`\`\`

WHEN TO SORT FIRST: A sorted array unlocks powerful algorithms. Binary search becomes possible (O(log n) vs O(n)). Two pointers pattern works for many problems (find pairs summing to target). Greedy algorithms often require sorting (interval scheduling). Detecting duplicates becomes trivial (just check consecutive elements). Trade-off: sorting costs O(n log n), so only sort if it simplifies the problem enough. For one-time searches, O(n) scan might be better than O(n log n) sort + O(log n) search.

PREFIX SUM PATTERN: For range sum queries on static arrays, preprocessing with prefix sums converts O(n) queries to O(1). Build prefix[i] = sum of arr[0..i-1], then sum(arr[left:right]) = prefix[right] - prefix[left]. This pattern extends to 2D arrays for rectangle sum queries. Essential for problems with many range queries—preprocessing once (O(n)) enables unlimited O(1) queries.

SLIDING WINDOW PATTERN: For subarray problems with size constraint, the sliding window maintains a fixed or variable-sized range while iterating. Instead of recalculating from scratch (O(n) per position), slide the window by removing left element and adding right element (O(1) per position). Reduces O(n²) to O(n). Variants: fixed window size, variable window with condition, two pointers for sorted arrays.`

const linkedListIntro = `Linked lists are sequences of nodes connected by pointers, where each node contains data and a reference to the next node. Unlike arrays with contiguous memory, linked list nodes scatter throughout memory. The key insight: O(1) insertion/deletion at known positions (just update pointers) vs arrays' O(n) shifts—but you pay with O(n) access time and poor cache performance.

SINGLY VS DOUBLY LINKED: Singly linked lists have one pointer (next), making them memory-efficient but one-directional. Doubly linked lists add a prev pointer, enabling bidirectional traversal and O(1) deletion when you have a node reference (no need to find predecessor). Python's collections.deque uses a doubly linked list for O(1) operations at both ends. Most interview problems use singly linked lists to test pointer manipulation skills.

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Traversal - O(n)
curr = head
while curr:
    process(curr.val)
    curr = curr.next

# Reverse - classic three-pointer technique
prev, curr = None, head
while curr:
    next_temp = curr.next  # Save next
    curr.next = prev       # Reverse pointer
    prev = curr            # Move prev forward
    curr = next_temp       # Move curr forward
# prev is new head
\`\`\`

FAST/SLOW POINTER PATTERN: Two pointers moving at different speeds solve many linked list problems. For finding the middle: slow moves 1 step, fast moves 2 steps—when fast reaches end, slow is at middle. For cycle detection: if there's a cycle, fast will eventually lap slow and they'll meet (Floyd's algorithm). For finding nth from end: start fast with n-step lead, then move both until fast reaches end.

DUMMY HEAD TECHNIQUE: Many linked list operations become simpler with a dummy node before the real head. This eliminates special cases for operations at the head (insertion, deletion). Instead of checking "if this is the head", just treat all nodes uniformly. Common pattern: \`dummy = ListNode(0, head)\`, do operations, return \`dummy.next\` as new head.

WHEN LINKED LIST BEATS ARRAY: Use linked lists when: implementing queue/deque (O(1) at both ends), frequent insertions/deletions in the middle (if you maintain references), implementing LRU cache (doubly linked list + hash map), unknown or wildly varying size. Don't use linked lists when: you need random access, iteration dominates (cache misses hurt), memory overhead matters (each node has pointer overhead).

EDGE CASES TO ALWAYS CONSIDER: Empty list (head is None), single node, operations at head/tail, cycles (if possible), modifying list while traversing. The dummy head technique handles most head-related edge cases automatically.`

const stackQueueIntro = `Stacks and queues are abstract data types that restrict access to elements, enforcing specific ordering. Stack is LIFO (Last In, First Out)—like a stack of plates. Queue is FIFO (First In, First Out)—like a line at a store. The key insight: restrictions enable elegant solutions to problems involving matching, ordering, and traversal.

STACK IMPLEMENTATION: Python lists work perfectly as stacks. \`append()\` pushes (O(1)), \`pop()\` pops (O(1)), \`[-1]\` peeks at top (O(1)). These operations are fast because they work at the end of the array, requiring no shifts. Stacks power recursion (call stack), DFS traversal, expression evaluation, and undo mechanisms.

\`\`\`python
# Stack using list
stack = []
stack.append(1)   # Push
stack.append(2)
top = stack[-1]   # Peek: 2
val = stack.pop() # Pop: 2

# Matching brackets
def valid_parentheses(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}
    for char in s:
        if char in pairs:           # Opening bracket
            stack.append(char)
        else:                       # Closing bracket
            if not stack or pairs[stack.pop()] != char:
                return False
    return not stack  # Should be empty
\`\`\`

QUEUE IMPLEMENTATION: NEVER use Python lists as queues! \`list.pop(0)\` is O(n) because it shifts all remaining elements. Always use \`collections.deque\`—it's a doubly linked list with O(1) operations at both ends. \`append()\` enqueues right, \`popleft()\` dequeues left, \`[0]\` peeks front.

\`\`\`python
from collections import deque

# Queue using deque
queue = deque()
queue.append(1)      # Enqueue right
queue.append(2)
first = queue[0]     # Peek front: 1
val = queue.popleft()# Dequeue left: 1

# BFS traversal
def bfs(root):
    if not root: return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return result
\`\`\`

MONOTONIC STACK PATTERN: A stack that maintains elements in increasing or decreasing order. When a new element violates the order, pop until order is restored, then push. This pattern solves "next greater element" problems in O(n). Example: for each element, find the next larger element to the right. Monotonic decreasing stack: pop smaller elements when you see a larger one—the larger one is the "next greater" for all popped elements.

STACK FOR DFS, QUEUE FOR BFS: Stack (or recursion, which uses call stack) gives depth-first traversal—go deep before backtracking. Queue gives breadth-first traversal—process level by level. Stack for: finding paths (backtracking), topological sort, maze solving. Queue for: shortest path (unweighted), level-order tree traversal, finding closest node.

WHEN TO USE STACK VS QUEUE: Stack when order needs to be reversed (last processed first), when you're backtracking, when matching pairs. Queue when processing in order received, when level-by-level traversal matters, when fairness/FIFO scheduling needed.`

const binaryTreeIntro = `Binary trees are hierarchical data structures where each node has at most two children (left and right). The key insight: recursion is natural for trees—most tree operations follow the pattern "process node, recurse left, recurse right". Trees enable O(log n) operations when balanced (BST), but degrade to O(n) when unbalanced.

TREE TERMINOLOGY: Root is the top node with no parent. Leaf nodes have no children. Height is the longest path from a node to a leaf. Depth is the distance from root to a node. A complete binary tree has all levels filled except possibly the last, which fills left-to-right. A full binary tree has every node with 0 or 2 children (no node has exactly 1 child).

\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Recursive patterns - the foundation of tree algorithms
def height(node):
    if not node: return 0
    return 1 + max(height(node.left), height(node.right))

def is_balanced(node):
    if not node: return True
    left_h = height(node.left)
    right_h = height(node.right)
    if abs(left_h - right_h) > 1: return False
    return is_balanced(node.left) and is_balanced(node.right)
\`\`\`

TRAVERSAL ORDERS: The order you visit nodes defines the traversal. Preorder (root, left, right): use for copying tree, serialization. Inorder (left, root, right): BST gives sorted order—this is THE way to get sorted elements from BST. Postorder (left, right, root): use when children must be processed before parent (deletion, calculating size/height). Level-order (BFS): process level by level using queue—use for shortest path, printing by level.

DFS VS BFS: DFS (depth-first search) uses recursion or stack, going deep before backtracking. BFS (breadth-first search) uses queue, processing level by level. DFS for: finding paths, checking subtree properties, using less memory (recursion stack vs explicit queue). BFS for: shortest path in unweighted tree, level-order processing, finding closest node to root.

BINARY SEARCH TREE (BST): A binary tree where left.val < node.val < right.val for all nodes. This property enables O(log n) search, insert, delete when balanced. Inorder traversal of BST gives sorted order. BST operations degrade to O(n) on unbalanced trees (essentially a linked list). Self-balancing BSTs (AVL, Red-Black) maintain O(log n) by rebalancing on operations.

COMMON PATTERNS: Path sum (DFS tracking current sum), lowest common ancestor (recursive: if p and q in different subtrees, current node is LCA), diameter (longest path—recurse to get height of each subtree), validate BST (track valid range as you recurse), tree to linked list (morris traversal for O(1) space).`

const heapIntro = `A heap is a complete binary tree that maintains the heap property: in a min-heap, parent ≤ children (root is minimum); in a max-heap, parent ≥ children (root is maximum). The key insight: get min/max in O(1), insert/remove in O(log n)—perfect for priority queues and "top-k" problems.

WHY HEAPS ARE FAST: The complete binary tree structure means height is always O(log n) for n elements. Operations move elements up (bubble up on insert) or down (bubble down on delete) the tree, taking at most O(log n) steps. Building a heap from an array is O(n), not O(n log n)—this enables heapsort and efficient initialization.

\`\`\`python
import heapq

# Python heapq is MIN-HEAP only
heap = []
heapq.heappush(heap, 3)   # O(log n) insert
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)

min_val = heap[0]          # O(1) peek at min
min_val = heapq.heappop(heap)  # O(log n) remove min

# Build heap from array - O(n)
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)

# MAX-HEAP trick: negate values
max_heap = []
heapq.heappush(max_heap, -3)
heapq.heappush(max_heap, -1)
max_val = -heapq.heappop(max_heap)  # Get max by negating result
\`\`\`

TOP-K PATTERN: To find K largest elements, use a min-heap of size K. As you process elements, if new element > heap[0], pop smallest and push new element. The heap maintains the K largest seen so far. For K smallest, use max-heap. This avoids full sorting (O(n log n))—heap solution is O(n log k).

HEAP VS SORTED ARRAY: Both give O(1) peek at min/max. Heap: O(log n) insert, O(log n) delete min. Sorted array: O(n) insert (must maintain sort), O(1) delete min (if allowed to modify). Use heap for dynamic data with frequent insertions. Use sorted array for static data or when you need binary search (heaps don't support efficient search).

MERGE K SORTED LISTS: Classic heap problem. Put first element from each list in min-heap (with list index). Pop smallest, add to result, push next element from same list. The heap always contains the K "candidates" for next smallest element. Time: O(N log K) where N is total elements, K is number of lists.

RUNNING MEDIAN: Maintain two heaps—max-heap for lower half of numbers, min-heap for upper half. Keep sizes balanced (differ by at most 1). Median is either top of larger heap, or average of both tops. Each insert is O(log n), getting median is O(1). This beats sorting each time (O(n log n) per query).`

const trieIntro = `A trie (prefix tree) is a tree where each node represents a character, and paths from root spell out strings. The key insight: O(L) search/insert where L is word length, independent of how many words are stored. Perfect for prefix operations—autocomplete, spell check, word games.

STRUCTURE: Each node has a dictionary/map of children (character → child node) and a boolean marking if it's the end of a word. The path from root to a node represents a prefix, and all descendants share that prefix. This structure makes prefix search trivial—just follow the path.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):  # O(L) where L = len(word)
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_word = True

    def search(self, word):  # O(L)
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_word

    def starts_with(self, prefix):  # O(P) where P = len(prefix)
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True  # Don't check is_word - just path existence
\`\`\`

TRIE VS HASH TABLE: Hash table gives O(L) insert/search but can't do prefix operations. Finding all words with prefix P: Trie is O(P + results), hash table is O(N*L) checking every word. Autocomplete with trie: walk to prefix in O(P), then DFS to collect all words in that subtree. Tries use more memory (each node has character map) but enable operations hash tables can't do efficiently.

WORD SEARCH II PATTERN: Given a grid and a dictionary, find all dictionary words in the grid. Naive: for each word, DFS grid (slow). Trie approach: build trie from dictionary, DFS grid while walking trie simultaneously. When path in grid doesn't match any prefix in trie, backtrack (pruning). This converts checking N words into one DFS guided by the trie.

SPACE COMPLEXITY: Worst case is O(N * L * alphabet_size) for N words of length L with alphabet_size characters. In practice, shared prefixes reduce this significantly. For lowercase English (26 chars), each node could have 26 child pointers, making tries memory-heavy. Compressed tries (radix trees) reduce nodes by merging chains.`

const unionFindIntro = `Union-Find (Disjoint Set Union) tracks which elements belong to which disjoint set, supporting near-constant-time union and find operations. The key insight: represent each set as a tree where elements point to parents, eventually reaching a root—the set representative.

OPERATIONS: Find(x) returns the root/representative of x's set by following parent pointers. Union(x, y) merges the sets containing x and y by making one root point to the other. Connected(x, y) checks if find(x) == find(y). Without optimizations, these are O(n) worst case (linear chain). With optimizations, they're O(α(n)) ≈ O(1) amortized, where α is the inverse Ackermann function (< 5 for all practical n).

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each element is its own parent initially
        self.rank = [0] * n           # Tree height (for union by rank)

    def find(self, x):  # O(α(n)) with path compression
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):  # O(α(n)) with union by rank
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False  # Already in same set

        # Union by rank: attach smaller tree to larger
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)
\`\`\`

PATH COMPRESSION: When finding root of x, make all nodes on path point directly to root. This flattens the tree, making future finds faster. Implementation: in find(), after recursively finding root, set \`parent[x] = find(parent[x])\`. This single line converts O(n) worst case to O(α(n)) amortized.

UNION BY RANK: When merging trees, attach shorter tree to taller tree (rank is upper bound on height). This prevents trees from becoming linear chains. Combined with path compression, this achieves O(α(n)) complexity—essentially constant time for practical purposes.

CYCLE DETECTION: For undirected graphs, union-find detects cycles efficiently. Process edges one by one. For edge (u, v): if find(u) == find(v), they're already connected—adding this edge creates a cycle. Otherwise, union(u, v). This is the basis of Kruskal's MST algorithm.

WHEN TO USE UNION-FIND: Dynamic connectivity (are x and y connected? add connection), connected components count (count unique roots), cycle detection in undirected graphs, Kruskal's MST, equivalence classes. Don't use when: you need actual paths between nodes (use DFS/BFS), directed graphs (union-find is for undirected), you need to disconnect elements (union-find doesn't support "split").`

const matrixIntro = `Matrices (2D arrays) represent grids, images, game boards, and graph adjacency relationships. The key insight: many matrix problems have elegant traversal patterns—mastering directions arrays, boundary checks, and transformation techniques solves most matrix challenges.

BASIC ACCESS AND TRAVERSAL: Access element at row i, column j with \`matrix[i][j]\`. Python uses row-major order (iterate rows first). Always check bounds: \`0 <= i < rows and 0 <= j < cols\`. Common mistake: mixing up rows and columns—remember \`matrix[row][col]\`, height is rows, width is cols.

\`\`\`python
# Create matrix
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

rows, cols = len(matrix), len(matrix[0])

# 4-directional traversal (up, down, left, right)
directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
# Or explicitly: right, left, down, up

def get_neighbors(r, c):
    neighbors = []
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    return neighbors

# 8-directional traversal (includes diagonals)
directions_8 = [(-1,-1), (-1,0), (-1,1),
                (0,-1),          (0,1),
                (1,-1),  (1,0),  (1,1)]
\`\`\`

MATRIX TRANSFORMATIONS: Rotate 90° clockwise: transpose (swap \`matrix[i][j]\` with \`matrix[j][i]\`), then reverse each row. Rotate 90° counter-clockwise: reverse each row, then transpose. Transpose: swap across main diagonal. Spiral traversal: use four pointers (top, bottom, left, right), move in spiral, shrinking boundaries.

ISLAND PROBLEMS: Given a grid of 1s (land) and 0s (water), count islands (connected components of 1s). Pattern: iterate through grid, when you find a 1, increment count and DFS/BFS to mark all connected 1s as visited (change to 0 or use visited set). Each DFS marks one complete island.

\`\`\`python
def num_islands(grid):
    if not grid: return 0
    count, rows, cols = 0, len(grid), len(grid[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited
        for dr, dc in [(0,1), (0,-1), (1,0), (-1,0)]:
            dfs(r + dr, c + dc)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count
\`\`\`

FLOOD FILL: Starting from a cell, change all connected cells of the same color. Same DFS/BFS pattern as island problems. Applications: paint bucket tool, region coloring, connected component analysis.

MATRIX AS GRAPH: An adjacency matrix represents graphs: \`matrix[i][j]\` = edge weight from i to j (or 1 if edge exists, 0 if not). Space: O(V²). Good for dense graphs or when you need O(1) edge lookup. For sparse graphs, adjacency list is better (O(V + E) space).`

const bitManipulationIntro = `Bit manipulation operates on individual bits using bitwise operators. The key insight: computers natively work with bits—bit operations are extremely fast (O(1)) and enable elegant solutions to subset generation, single element finding, and flag management.

BIT BASICS: Integers are stored as binary: 13 = 1101 = 1×8 + 1×4 + 0×2 + 1×1. Bits are numbered from right (0) to left. Bit i has value 2^i. Most operations work on corresponding bits independently.

\`\`\`python
# Bitwise operators
a & b   # AND: both bits must be 1
a | b   # OR: either bit can be 1
a ^ b   # XOR: bits must differ (1 if different, 0 if same)
~a      # NOT: flip all bits
a << n  # Left shift: multiply by 2^n
a >> n  # Right shift: divide by 2^n (floor division)

# Check if bit i is set
def is_bit_set(n, i):
    return n & (1 << i) != 0

# Set bit i
def set_bit(n, i):
    return n | (1 << i)

# Clear bit i
def clear_bit(n, i):
    return n & ~(1 << i)

# Toggle bit i
def toggle_bit(n, i):
    return n ^ (1 << i)
\`\`\`

XOR PROPERTIES: The magic of XOR is that \`a ^ a = 0\` and \`a ^ 0 = a\`. This means XOR-ing a number with itself cancels it out. Consequence: XOR-ing all elements where duplicates cancel leaves only the unique element. XOR is commutative and associative, so order doesn't matter. This enables finding the single non-duplicate in O(n) time, O(1) space.

POWER OF TWO: A number is a power of 2 if it has exactly one bit set: 8 = 1000, 16 = 10000. Trick: powers of 2 satisfy \`n & (n-1) == 0\`. Why? n-1 flips all bits from the rightmost 1 to the right, so ANDing cancels out. Example: 8 = 1000, 7 = 0111, 8 & 7 = 0000.

SUBSET GENERATION: To generate all subsets of n elements, iterate mask from 0 to 2^n - 1. Each bit i in mask represents whether to include element i. For n=3: 000 (empty), 001 (element 0), 010 (element 1), ..., 111 (all elements). This maps integers to subsets naturally.

\`\`\`python
def subsets(nums):
    n = len(nums)
    result = []
    for mask in range(2**n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):  # Check if bit i is set
                subset.append(nums[i])
        result.append(subset)
    return result
\`\`\`

COUNTING SET BITS: How many 1 bits in a number? Brian Kernighan's algorithm: \`n & (n-1)\` clears the rightmost set bit. Repeat until n becomes 0, counting iterations. Example: 13 = 1101 → 1100 → 1000 → 0000 (3 iterations = 3 set bits). Python shortcut: \`bin(n).count('1')\`.

WHEN TO USE BIT MANIPULATION: Flags and permissions (pack multiple booleans into one int), subset enumeration, finding unique elements (XOR tricks), optimization problems requiring checking all combinations, space optimization (BitSet for large boolean arrays), cryptography and hashing. Don't use when: readability matters more than micro-optimization, logic is clearer with regular boolean operations.`

export function ArraysPage() {
  return (
    <TypePage
      type="Arrays" badge="arr" color="var(--accent-arrays)"
      description="Contiguous memory storage with O(1) access. Foundation of all data structures. Master indexing, slicing, and two-pointer techniques."
      intro={arraysIntro}
      tip={`O(1) random access needed? Array/list - cache-friendly, simple indexing
Frequent insertions at middle/start? Linked list O(1) vs array O(n) shift
Sort first? Unlocks two pointers O(n), binary search O(log n), greedy patterns
Range sum [i,j] queries? Prefix sum: precompute prefix[i] = sum(arr[0:i]), then sum = prefix[j+1] - prefix[i]
Max subarray sum? Kadane's algorithm - track current_max and global_max in one pass`}
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
      tip={`Cycle detection or find middle? Fast/slow pointers - fast moves 2x, slow moves 1x, meet in cycle
Edge cases (operations at head)? Dummy node: dummy = ListNode(0, head) - simplifies insertion/deletion
Reverse linked list? Three pointers: prev=None, curr=head, next=curr.next, swap until curr is None
Merge sorted lists? Two pointers comparing values, build new list or modify in-place
Nth from end? Two pointers with n-step gap, or reverse and take nth from start`}
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
      tip={`Matching brackets/parentheses? Stack - push opening, pop for closing, check if matches
"Next greater/smaller element"? Monotonic stack - maintain increasing/decreasing order, pop when broken
Level-order traversal or shortest path? Queue (BFS) - use collections.deque, NOT list (popleft is O(1))
DFS traversal? Stack - or just use recursion (call stack)
Valid expression evaluation? Stack for operators/operands - handles precedence and parentheses`}
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
      tip={`BST to sorted array? Inorder traversal (left-root-right) gives ascending order
Level-by-level processing? BFS with queue - append children, process by level
Path sum or subtree check? DFS recursion - base case: if not node: return
Preorder (root-left-right)? Tree serialization, copying structure
Postorder (left-right-root)? Delete tree, calculate size/height from children first`}
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
      tip={`Top K largest elements? Min-heap of size K - if new element > heap[0], pop and push (keeps K largest)
Top K smallest elements? Max-heap of size K - if new element < heap[0], pop and push
Need max-heap in Python? heapq is min-heap only - negate values: push(-val), pop and negate result
Merge K sorted lists? Min-heap with (value, list_index, element_index) - always pop smallest
Running median? Two heaps - max-heap for lower half, min-heap for upper half, balance sizes`}
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
      tip={`Autocomplete or prefix search? Trie - O(P) to find all words with prefix P, vs O(N*L) with list
Word Search II (find multiple words in grid)? Trie + DFS - build trie from words, DFS grid with trie pruning
Trie node structure? class TrieNode: children = {}, is_word = False - each edge is a character
Insert word? Follow/create path for each char, mark is_word=True at end
Search vs startsWith? Search checks is_word, startsWith just checks if path exists`}
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
      tip={`Connected components in graph? Union-Find with parent array - find(x) returns root, union(x,y) merges sets
"Are X and Y connected?" find(x) == find(y) - same root means same component
Detect cycle in undirected graph? If union(u,v) and find(u)==find(v), adding edge creates cycle
Path compression? In find(), set parent[x] = find(parent[x]) - flattens tree to O(α(n)) ≈ O(1)
Count components? Track count, decrement on successful union, or count unique find(i) values`}
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
      tip={`4-directional grid traversal? directions = [(0,1),(1,0),(0,-1),(-1,0)] - check bounds: 0≤r<rows, 0≤c<cols
Rotate 90° clockwise? Transpose (swap matrix[i][j] with matrix[j][i]), then reverse each row
Spiral order traversal? Four pointers: top, bottom, left, right - move inward after each direction
Island problems (connected 1s)? DFS/BFS - mark visited, count components
Flood fill or region painting? DFS/BFS from start cell - change color and recurse to neighbors`}
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
      tip={`Find single non-duplicate number? XOR all elements - duplicates cancel (a^a=0), leaves single
Check/set/clear bit i? Check: n & (1<<i), Set: n | (1<<i), Clear: n & ~(1<<i), Toggle: n ^ (1<<i)
Check power of 2? n > 0 and n & (n-1) == 0 - power of 2 has exactly one bit set
Count set bits? bin(n).count('1') or loop: while n: count += n&1; n >>= 1
Generate all subsets? Loop mask from 0 to 2^n-1, each bit represents include/exclude element i`}
      methods={bitManipulationMethods}
    />
  )
}

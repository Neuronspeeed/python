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

const arraysIntro = `Use Arrays When...
You need O(1) random access by index. Arrays excel when iteration and lookup dominate—cache locality makes them blazing fast. Python lists are dynamic arrays that resize automatically (1.5-2x when capacity exceeded), making \`append()\` O(1) amortized. Choose arrays when size is predictable or grows slowly.

\`\`\`python
# WHEN ARRAYS SHINE
nums = [1, 2, 3, 4, 5]
value = nums[2]           # O(1) - Direct memory access
for num in nums:          # Cache-friendly iteration
    process(num)

# Building with append() is O(n) total, not O(n²)
result = []
for i in range(n):
    result.append(i)      # O(1) amortized per append

# WHEN TO AVOID
# AVOID: Frequent insertions in middle (O(n) shifts)
nums.insert(0, 99)        # Shifts entire array
# BETTER: Use deque for O(1) insertions at both ends
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(99)         # O(1) - No shifts
\`\`\`python
---
Master These Patterns
Three essential array patterns solve 80% of problems. **Sliding Window** for subarray problems (max sum, longest substring). **Two Pointers** for palindrome/pair finding in sorted arrays. **Prefix Sum** for range queries on static arrays. Each reduces O(n²) brute force to O(n) with clever traversal.

\`\`\`python
# SLIDING WINDOW - Max sum subarray of size k
def max_sum_window(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum = window_sum - arr[i-k] + arr[i]  # Slide: remove left, add right
        max_sum = max(max_sum, window_sum)
    return max_sum  # O(n) vs O(n*k) brute force

# TWO POINTERS - Pair sum in sorted array
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current = arr[left] + arr[right]
        if current == target:
            return [left, right]
        elif current < target:
            left += 1       # Need larger sum
        else:
            right -= 1      # Need smaller sum
    return []  # O(n) vs O(n²) nested loops

# PREFIX SUM - Range sum queries
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix  # O(n) preprocessing

# Query sum(arr[left:right]) in O(1)
prefix = build_prefix([1, 2, 3, 4, 5])
range_sum = prefix[4] - prefix[1]  # sum([2, 3, 4]) = 9
\`\`\`python
---
Arrays vs Linked Lists: The Fundamental Trade-off
Arrays give O(1) access but O(n) insertion/deletion (must shift elements). Linked Lists give O(1) insertion/deletion at known position but O(n) access (must traverse). Cache locality matters too—arrays are contiguous (fast iteration), linked lists scatter nodes (cache misses). The decision: does your workload need random access or frequent middle insertions?

\`\`\`python
# ARRAY: Fast access, slow middle insertion
arr = [1, 2, 3, 4, 5]
value = arr[2]            # O(1) - Direct index calculation
arr.insert(2, 99)         # O(n) - Must shift arr[2:] right

# LINKED LIST: Slow access, fast middle insertion
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Access requires traversal
node = head
for _ in range(index):    # O(n) - Must walk the chain
    node = node.next

# Insertion at known position is just pointer update
new_node.next = node.next  # O(1) - No shifts needed
node.next = new_node

# DECISION MATRIX
# Choose ARRAYS when:
#   • Random access needed (indexing, binary search)
#   • Iteration dominates (cache locality wins)
#   • Size is predictable or slowly growing

# Choose LINKED LISTS when:
#   • Frequent middle insertions/deletions (if you maintain references)
#   • Implementing queue/deque (O(1) at both ends with doubly linked)
#   • Size varies wildly or unknown upfront
\`\`\`python
`

const linkedListIntro = `When Linked Lists Beat Arrays
O(1) insertion/deletion at known positions (just pointer updates) vs arrays O(n) shifts. Use when implementing queue/deque, LRU cache (doubly linked list + hash map), or frequent middle insertions. Trade-off: O(n) access time and poor cache performance (nodes scattered in memory). Arrays win for random access and iteration.

\`\`\`python
# LINKED LIST STRUCTURE
class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# O(1) INSERTION at known position (just pointer update)
new_node.next = node.next
node.next = new_node
# vs ARRAY O(n): arr.insert(i, val) - must shift elements

# O(n) ACCESS (must traverse)
node = head
for _ in range(index):
    node = node.next
# vs ARRAY O(1): arr[index] - direct memory calculation

# WHEN TO USE:
# • Queue/Deque - O(1) at both ends with doubly linked
# • LRU Cache - doubly linked list + hash map
# • Frequent middle insertions if you maintain node references
# • Unknown/wildly varying size

# WHEN TO AVOID:
# • Random access needed - arrays win O(1) vs O(n)
# • Iteration dominates - cache misses hurt performance
# • Memory overhead matters - each node has pointer overhead
\`\`\`python
---
Master These Patterns: Fast/Slow Pointers and Dummy Head
Two pointers moving at different speeds solve cycle detection, finding middle, nth from end. Dummy head eliminates special cases for head operations. These two techniques solve most linked list interview problems.

\`\`\`python
# FAST/SLOW POINTER: Find middle
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next      # Move 1 step
        fast = fast.next.next # Move 2 steps
    return slow  # When fast reaches end, slow is at middle

# FAST/SLOW POINTER: Cycle detection (Floyd's algorithm)
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:  # Fast caught up - cycle exists
            return True
    return False

# FAST/SLOW POINTER: Find nth from end
def nth_from_end(head, n):
    fast = slow = head
    # Give fast n-step lead
    for _ in range(n):
        fast = fast.next
    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    return slow  # Slow is now n steps from end

# DUMMY HEAD: Simplifies head operations
def remove_elements(head, val):
    dummy = Node(0, head)  # Dummy before head
    prev = dummy
    curr = head
    while curr:
        if curr.val == val:
            prev.next = curr.next  # Remove node
        else:
            prev = curr
        curr = curr.next
    return dummy.next  # New head (might have changed)
# No special case for removing head - treated like any node
\`\`\`python
---
Singly vs Doubly Linked Lists
Singly linked has one pointer (next) - memory efficient, one-directional. Doubly linked adds prev pointer - bidirectional traversal, O(1) deletion with node reference (no need to find predecessor). Python collections.deque uses doubly linked for O(1) operations at both ends.

\`\`\`python
# SINGLY LINKED LIST
class SinglyNode:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

# Deletion requires finding predecessor - O(n)
def delete_node_singly(head, target):
    if head.val == target:
        return head.next
    prev = head
    while prev.next and prev.next.val != target:
        prev = prev.next
    if prev.next:
        prev.next = prev.next.next
    return head

# DOUBLY LINKED LIST
class DoublyNode:
    def __init__(self, val, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

# Deletion with node reference - O(1)
def delete_node_doubly(node):
    if node.prev:
        node.prev.next = node.next
    if node.next:
        node.next.prev = node.prev
# No traversal needed - direct pointer updates

# PYTHON DEQUE: Doubly linked list
from collections import deque
dq = deque([1, 2, 3])
dq.appendleft(0)  # O(1) - add to front
dq.append(4)      # O(1) - add to back
dq.popleft()      # O(1) - remove from front
dq.pop()          # O(1) - remove from back

# WHEN TO USE EACH:
# Singly: Memory efficient, forward-only traversal sufficient
# Doubly: Need backward traversal, O(1) deletion at arbitrary positions
\`\`\``

const stackQueueIntro = `Stack vs Queue: LIFO vs FIFO
Stack is LIFO (Last In First Out) - Python list works perfectly. Queue is FIFO (First In First Out) - NEVER use list, always use \`collections.deque\`. Stack for DFS/backtracking/undo. Queue for BFS/level-order/scheduling.

\`\`\`python
# STACK: Use Python list (O(1) at end)
stack = []
stack.append(1)    # Push - O(1)
stack.append(2)
top = stack[-1]    # Peek - O(1)
val = stack.pop()  # Pop - O(1)

# QUEUE: Use deque (NOT list!)
from collections import deque
queue = deque()
queue.append(1)    # Enqueue right - O(1)
queue.append(2)
front = queue[0]   # Peek - O(1)
val = queue.popleft()  # Dequeue left - O(1)

# NEVER DO THIS:
# queue = []
# queue.pop(0)  # O(n)! Shifts all elements

# STACK for DFS (depth-first)
def dfs(node):
    stack = [node]
    while stack:
        curr = stack.pop()
        for child in curr.children:
            stack.append(child)  # Go deep first

# QUEUE for BFS (breadth-first)
def bfs(node):
    queue = deque([node])
    while queue:
        curr = queue.popleft()
        for child in curr.children:
            queue.append(child)  # Process level by level
\`\`\`python
---
Monotonic Stack Pattern
Stack maintaining elements in sorted order. When new element violates order, pop until restored. Solves "next greater element" in O(n). Classic interview pattern.

\`\`\`python
# NEXT GREATER ELEMENT to the right
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # Monotonic decreasing stack (indices)

    for i, num in enumerate(nums):
        # Pop smaller elements - num is their "next greater"
        while stack and nums[stack[-1]] < num:
            idx = stack.pop()
            result[idx] = num
        stack.append(i)

    return result
# [4,2,6,3] → [6,6,-1,-1]
# O(n) - each element pushed/popped once

# MONOTONIC STACK VARIANTS:
# • Increasing stack: pop larger elements
# • Decreasing stack: pop smaller elements
# • Next smaller: use increasing stack
# • Previous greater: iterate right-to-left

# TEMPERATURE PROBLEM: Days until warmer
def daily_temps(temps):
    result = [0] * len(temps)
    stack = []

    for i, temp in enumerate(temps):
        while stack and temps[stack[-1]] < temp:
            prev_i = stack.pop()
            result[prev_i] = i - prev_i  # Days to wait
        stack.append(i)

    return result
\`\`\`python
---
Stack for Matching and Undo
Stacks natural for matching pairs (parentheses), reversing order, and undo operations. LIFO property makes last-added element first-processed.

\`\`\`python
# VALID PARENTHESES
def is_valid(s):
    stack = []
    pairs = {'(': ')', '[': ']', '{': '}'}

    for char in s:
        if char in pairs:
            stack.append(char)  # Opening bracket
        elif not stack or pairs[stack.pop()] != char:
            return False  # No match or wrong closing

    return len(stack) == 0  # All matched

# UNDO SYSTEM
class Editor:
    def __init__(self):
        self.text = ""
        self.undo_stack = []

    def append(self, char):
        self.undo_stack.append(self.text)  # Save state
        self.text += char

    def undo(self):
        if self.undo_stack:
            self.text = self.undo_stack.pop()  # Restore

# REVERSE STRING with stack
def reverse(s):
    stack = list(s)
    result = []
    while stack:
        result.append(stack.pop())  # LIFO reverses
    return ''.join(result)
# Or just: s[::-1]
\`\`\``

const binaryTreeIntro = `Use Binary Trees When...
You need hierarchical organization with O(log n) operations when balanced. Binary Search Trees (BST) give O(log n) search, insert, delete with the property left.val < node.val < right.val. Recursion is natural for trees—most operations follow "process node, recurse left, recurse right". Choose BST when you need sorted data with dynamic insertions, or regular trees for hierarchical modeling.

\`\`\`python
# BST OPERATIONS - O(log n) when balanced
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def search_bst(root, target):
    if not root or root.val == target:
        return root
    if target < root.val:
        return search_bst(root.left, target)
    return search_bst(root.right, target)

# DEGENERATE CASE - O(n) when unbalanced
# Tree: 1 -> 2 -> 3 -> 4 (essentially linked list)
# Balanced: AVL, Red-Black trees maintain O(log n)
\`\`\`python
---
Master Tree Traversals
The traversal order determines what you can accomplish. Preorder (root, left, right) for copying or serialization. Inorder (left, root, right) gives sorted order in BST—this is THE way to extract sorted elements. Postorder (left, right, root) when children must process before parent (deletion, calculating height). Level-order (BFS) for shortest path or level-by-level processing.

\`\`\`python
# INORDER - Sorted output for BST
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# LEVEL-ORDER - BFS with queue
from collections import deque

def level_order(root):
    if not root:
        return []
    result, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        result.append(node.val)
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return result

# POSTORDER - Process children first (calculate height)
def height(root):
    if not root:
        return 0
    return 1 + max(height(root.left), height(root.right))
\`\`\`python
---
DFS vs BFS Trade-offs
DFS (recursion or stack) goes deep before backtracking—use for finding paths, checking subtree properties, less memory (recursion stack < explicit queue). BFS (queue) processes level by level—use for shortest path in unweighted trees, level-order operations, finding nodes closest to root.

\`\`\`python
# DFS - Find path to target (memory efficient)
def find_path(root, target, path=[]):
    if not root:
        return False
    path.append(root.val)
    if root.val == target:
        return True
    if find_path(root.left, target, path) or find_path(root.right, target, path):
        return True
    path.pop()
    return False

# BFS - Shortest path to target (level by level)
def shortest_path_bfs(root, target):
    if not root:
        return -1
    queue = deque([(root, 0)])
    while queue:
        node, depth = queue.popleft()
        if node.val == target:
            return depth
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))
    return -1
\`\`\``

const heapIntro = `Use Heaps When...
You need O(1) access to min/max with O(log n) insert/delete—perfect for priority queues and top-k problems. Min-heap keeps smallest at root (parent ≤ children), max-heap keeps largest at root (parent ≥ children). The complete binary tree structure guarantees O(log n) height. Choose heaps when you need dynamic min/max tracking without full sorting.

\`\`\`python
import heapq

# MIN-HEAP - Python's heapq default
heap = [5, 2, 8, 1, 9]
heapq.heapify(heap)       # O(n) - not O(n log n)!
print(heap[0])            # O(1) - peek min: 1
heapq.heappush(heap, 3)   # O(log n) - insert
heapq.heappop(heap)       # O(log n) - remove min

# MAX-HEAP - Use negative values
max_heap = [-x for x in [5, 2, 8, 1, 9]]
heapq.heapify(max_heap)
print(-max_heap[0])       # O(1) - peek max: 9
heapq.heappush(max_heap, -10)
largest = -heapq.heappop(max_heap)
\`\`\`python
---
Top-K Pattern
To find K largest elements, use min-heap of size K. Process elements: if new element > heap[0], pop smallest and push new. The heap maintains K largest seen. For K smallest, use max-heap. This avoids full sort—O(n log k) vs O(n log n).

\`\`\`python
def k_largest(nums, k):
    # Min-heap of size k keeps k largest
    heap = nums[:k]
    heapq.heapify(heap)     # O(k)

    for num in nums[k:]:    # O((n-k) log k)
        if num > heap[0]:   # Bigger than smallest in heap
            heapq.heapreplace(heap, num)  # Pop & push in one

    return heap  # k largest elements

# EXAMPLE: Find 3 largest in [3, 1, 5, 12, 2, 11]
# After heapify: [1, 3, 5]
# Process 12: 12 > 1, replace: [3, 5, 12]
# Process 2:  2 < 3, skip
# Process 11: 11 > 3, replace: [5, 11, 12]
# Result: [5, 11, 12] in O(n log k)
\`\`\`python
---
Heap vs Sorted Array
Both give O(1) min/max peek. Heap: O(log n) insert, O(log n) delete. Sorted array: O(n) insert (maintain sort), O(1) delete if mutable. Use heap for dynamic data with frequent insertions. Use sorted array for static data or when you need binary search (heaps don't support efficient search).

\`\`\`python
# HEAP - Dynamic priority queue
import heapq
pq = []
heapq.heappush(pq, (priority, task))  # O(log n) insert
next_task = heapq.heappop(pq)         # O(log n) remove
# Can't search efficiently - O(n) to find element

# SORTED ARRAY - Static with search
import bisect
arr = [1, 3, 5, 7, 9]
bisect.insort(arr, 4)   # O(n) - shift elements
min_val = arr[0]        # O(1) - peek min
idx = bisect.bisect_left(arr, 5)  # O(log n) - binary search

# RUNNING MEDIAN - Two heaps trick
max_heap = []  # Lower half (negated for max)
min_heap = []  # Upper half

def add_num(num):
    heapq.heappush(max_heap, -num)
    heapq.heappush(min_heap, -heapq.heappop(max_heap))
    if len(min_heap) > len(max_heap):
        heapq.heappush(max_heap, -heapq.heappop(min_heap))

def get_median():
    if len(max_heap) > len(min_heap):
        return -max_heap[0]
    return (-max_heap[0] + min_heap[0]) / 2.0
\`\`\``

const trieIntro = `Use Tries When...
You need prefix-based operations that hash tables can't handle efficiently. Trie gives O(L) insert/search where L is word length, independent of dictionary size. Perfect for autocomplete (find all words with prefix P in O(P + results)), spell checking, and word games. Choose tries when prefix operations matter more than memory—each node stores character map.

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}     # char -> TrieNode
        self.is_end = False    # Marks word ending

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):    # O(L)
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):    # O(L)
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
\`\`\`python
---
Trie vs Hash Table
Hash table gives O(L) search but can't do prefix operations. Finding all words with prefix P: Trie is O(P + results) by walking to prefix then DFS, hash table is O(N*L) checking every word. Autocomplete with trie walks to prefix in O(P), then collects subtree. Tries use more memory but enable operations impossible with hash tables.

\`\`\`python
# AUTOCOMPLETE - Trie shines
def autocomplete(trie, prefix):
    node = trie.root
    # Walk to prefix - O(P)
    for char in prefix:
        if char not in node.children:
            return []
        node = node.children[char]

    # Collect all words in subtree - O(results)
    results = []
    def dfs(node, path):
        if node.is_end:
            results.append(prefix + path)
        for char, child in node.children.items():
            dfs(child, path + char)

    dfs(node, "")
    return results

# HASH TABLE - Can't do prefix efficiently
word_set = {"apple", "app", "apricot", "banana"}
# To find all starting with "ap": O(N) check every word
prefix_matches = [w for w in word_set if w.startswith("ap")]
\`\`\`python
---
Word Search II Pattern
Given grid and dictionary, find all dictionary words in grid. Naive: for each word, DFS grid—O(W * 4^L) for W words. Trie approach: build trie from dictionary, DFS grid while walking trie simultaneously. When grid path doesn't match any trie prefix, prune immediately. Converts checking N words into one DFS guided by trie—O(M*N * 4^L) for M×N grid.

\`\`\`python
def find_words(board, words):
    # Build trie from dictionary
    trie = Trie()
    for word in words:
        trie.insert(word)

    result = set()
    rows, cols = len(board), len(board[0])

    def dfs(r, c, node, path):
        char = board[r][c]
        if char not in node.children:
            return  # Prune: no word has this prefix

        node = node.children[char]
        path += char
        if node.is_end:
            result.add(path)

        # Mark visited
        board[r][c] = '#'
        for dr, dc in [(0,1), (1,0), (0,-1), (-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != '#':
                dfs(nr, nc, node, path)
        board[r][c] = char  # Restore

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, trie.root, "")

    return list(result)
\`\`\``

const unionFindIntro = `Use Union-Find When...
You need dynamic connectivity queries—are x and y connected? With path compression and union by rank, find and union operations run in O(α(n)) ≈ O(1) amortized, where α is inverse Ackermann function (< 5 for practical n). Perfect for connected components, cycle detection in undirected graphs, and Kruskal's MST. Each set is represented as a tree with root as representative.

\`\`\`python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))  # Each node is own parent
        self.rank = [0] * n           # Height upper bound

    def find(self, x):
        # Path compression: make all nodes point to root
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False  # Already connected

        # Union by rank: attach shorter to taller
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
\`\`\`python
---
Path Compression and Union by Rank
Path compression flattens trees by making all nodes on path point directly to root during find(). Union by rank attaches shorter tree to taller tree, preventing linear chains. These two optimizations together achieve O(α(n)) ≈ O(1)—without them, operations degrade to O(n) on linear chains.

\`\`\`python
# WITHOUT OPTIMIZATIONS - O(n) worst case
class NaiveUnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        while self.parent[x] != x:
            x = self.parent[x]  # Walk to root
        return x  # O(n) on linear chain: 0->1->2->3->4

    def union(self, x, y):
        self.parent[self.find(x)] = self.find(y)
        # Can create long chains!

# WITH OPTIMIZATIONS - O(α(n)) ≈ O(1)
# Path compression: self.parent[x] = self.find(self.parent[x])
# Union by rank: attach shorter to taller

# EXAMPLE: After path compression
# Before: 0->1->2->3->4->root
# After find(0): 0->root, 1->root, 2->root, 3->root, 4->root
# Tree flattened! Future finds are O(1)
\`\`\`python
---
Cycle Detection with Union-Find
For undirected graphs, process edges one by one. For edge (u, v): if find(u) == find(v), they're already connected—adding edge creates cycle. Otherwise, union(u, v). This is basis of Kruskal's MST (process edges by weight, skip cycles).

\`\`\`python
def has_cycle(n, edges):
    uf = UnionFind(n)
    for u, v in edges:
        if uf.connected(u, v):
            return True  # Cycle detected!
        uf.union(u, v)
    return False

# EXAMPLE: edges = [(0,1), (1,2), (2,0)]
# Process (0,1): union(0,1) - OK
# Process (1,2): union(1,2) - OK
# Process (2,0): find(2)==find(0)? YES! - Cycle detected

# KRUSKAL'S MST - Sort edges by weight, use union-find
def kruskal_mst(n, edges):
    edges.sort(key=lambda e: e[2])  # Sort by weight
    uf = UnionFind(n)
    mst, total_cost = [], 0

    for u, v, weight in edges:
        if uf.union(u, v):  # If not cycle
            mst.append((u, v, weight))
            total_cost += weight
            if len(mst) == n - 1:  # MST complete
                break

    return mst, total_cost
\`\`\``

const matrixIntro = `Use Matrices When...
You need 2D grid representation for grids, images, game boards, or graph adjacency. Access element at row i, column j with matrix[i][j] in O(1). Master directions arrays for traversal, boundary checks (0 <= i < rows and 0 <= j < cols), and transformations. Common mistake: mixing rows and columns—remember matrix[row][col], height is rows, width is cols.

\`\`\`python
# BASIC TRAVERSAL - 4 directions
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

rows, cols = len(matrix), len(matrix[0])
directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]  # right, down, left, up

def neighbors(r, c):
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            yield matrix[nr][nc]

# 8 DIRECTIONS - Include diagonals
directions_8 = [(0,1), (1,0), (0,-1), (-1,0),  # cardinal
                (1,1), (1,-1), (-1,1), (-1,-1)]  # diagonal

# ROTATION - 90° clockwise
def rotate_clockwise(matrix):
    # Transpose then reverse rows
    n = len(matrix)
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
\`\`\`python
---
Island Problems Pattern
Given grid of 1s (land) and 0s (water), count islands (connected components). Pattern: iterate grid, when you find 1, increment count and DFS/BFS to mark all connected 1s as visited. Each DFS marks one complete island. Also applies to flood fill (change all connected cells of same color).

\`\`\`python
def num_islands(grid):
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # Mark visited
        # Explore 4 directions
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)  # Mark entire island

    return count

# FLOOD FILL - Same pattern
def flood_fill(image, sr, sc, new_color):
    old_color = image[sr][sc]
    if old_color == new_color:
        return image

    def dfs(r, c):
        if (r < 0 or r >= len(image) or c < 0 or c >= len(image[0]) or
            image[r][c] != old_color):
            return
        image[r][c] = new_color
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    dfs(sr, sc)
    return image
\`\`\`python
---
Matrix as Graph
Adjacency matrix represents graphs: matrix[i][j] = edge weight from i to j (or 1 if exists, 0 if not). Space O(V²)—good for dense graphs or O(1) edge lookup. For sparse graphs, adjacency list is better (O(V + E) space). Matrix enables simple graph algorithms.

\`\`\`python
# ADJACENCY MATRIX - Dense graph
n = 4  # 4 vertices
graph = [[0] * n for _ in range(n)]
graph[0][1] = 1  # Edge from 0 to 1
graph[1][2] = 1
graph[2][3] = 1
graph[3][0] = 1

# Check edge exists - O(1)
has_edge = graph[0][1] == 1

# Get all neighbors - O(V)
neighbors = [j for j in range(n) if graph[i][j] > 0]

# ADJACENCY LIST - Sparse graph (better)
graph_list = {
    0: [1],
    1: [2],
    2: [3],
    3: [0]
}
# Space: O(V + E) vs O(V²) for matrix
# Get neighbors - O(1) access to list

# SPIRAL TRAVERSAL - Four pointers
def spiral_order(matrix):
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        # Left
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        # Up
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result
\`\`\``

const bitManipulationIntro = `Use Bit Manipulation When...
You need O(1) operations on individual bits for subset generation, finding unique elements, or flag management. Computers natively work with bits—bit operations are extremely fast. Key operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). Choose bit manipulation for space optimization (pack booleans) or elegant solutions to specific problems.

\`\`\`python
# BIT BASICS
# 13 = 1101 = 8 + 4 + 0 + 1
# Bit 0 (rightmost) has value 2^0 = 1
# Bit 1 has value 2^1 = 2
# Bit 2 has value 2^2 = 4
# Bit 3 has value 2^3 = 8

# Check if bit i is set
def is_bit_set(n, i):
    return (n & (1 << i)) != 0

# Set bit i
def set_bit(n, i):
    return n | (1 << i)

# Clear bit i
def clear_bit(n, i):
    return n & ~(1 << i)

# Toggle bit i
def toggle_bit(n, i):
    return n ^ (1 << i)

# EXAMPLE: n = 5 = 101
print(is_bit_set(5, 0))   # True  (rightmost bit is 1)
print(is_bit_set(5, 1))   # False (middle bit is 0)
print(set_bit(5, 1))      # 7 = 111
print(clear_bit(5, 2))    # 1 = 001
\`\`\`python
---
XOR Magic and Subset Generation
XOR properties: a ^ a = 0 and a ^ 0 = a. XOR-ing duplicates cancels them, leaving unique element—O(n) time, O(1) space. For subsets, iterate mask from 0 to 2^n - 1. Each bit i in mask represents whether to include element i. This maps integers to subsets naturally.

\`\`\`python
# FIND SINGLE NON-DUPLICATE - XOR trick
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num  # Duplicates cancel out
    return result

# [4, 1, 2, 1, 2] -> 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4

# SUBSET GENERATION - Bit masks
def subsets(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):  # Check if bit i is set
                subset.append(nums[i])
        result.append(subset)
    return result

# nums = [1, 2, 3]
# mask = 0 (000) -> []
# mask = 1 (001) -> [1]
# mask = 2 (010) -> [2]
# mask = 3 (011) -> [1, 2]
# mask = 4 (100) -> [3]
# mask = 5 (101) -> [1, 3]
# mask = 6 (110) -> [2, 3]
# mask = 7 (111) -> [1, 2, 3]
\`\`\`python
---
Power of Two and Bit Counting
Power of 2 has exactly one bit set: 8 = 1000. Trick: n & (n-1) == 0 for powers of 2. Why? n-1 flips all bits from rightmost 1 to right, so AND cancels. For counting set bits, n & (n-1) clears rightmost set bit—repeat until n becomes 0.

\`\`\`python
# POWER OF TWO CHECK
def is_power_of_two(n):
    return n > 0 and (n & (n-1)) == 0

# Examples:
# 8 = 1000, 7 = 0111, 8 & 7 = 0000 -> True
# 6 = 0110, 5 = 0101, 6 & 5 = 0100 -> False

# COUNT SET BITS - Brian Kernighan's algorithm
def count_bits(n):
    count = 0
    while n:
        n &= n - 1  # Clear rightmost set bit
        count += 1
    return count

# 13 = 1101
# 13 & 12 = 1101 & 1100 = 1100 (count=1)
# 12 & 11 = 1100 & 1011 = 1000 (count=2)
# 8 & 7   = 1000 & 0111 = 0000 (count=3)
# Result: 3 set bits

# Python shortcut
count = bin(13).count('1')  # 3

# FLAGS - Pack multiple booleans
READ = 1 << 0   # 001
WRITE = 1 << 1  # 010
EXEC = 1 << 2   # 100

permissions = READ | WRITE  # 011
has_read = (permissions & READ) != 0      # True
has_exec = (permissions & EXEC) != 0      # False
permissions |= EXEC  # Add execute: 111
permissions &= ~WRITE  # Remove write: 101
\`\`\``

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

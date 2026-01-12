import{c as e,r as t,t as n}from"./index-CXFf_70w.js";import{n as r}from"./learn-Cv_zenSA.js";const i={arrays:{type:`Arrays`,badge:`arr`,color:`var(--accent-arrays)`,description:`Contiguous memory storage with O(1) access. Foundation of all data structures. Master indexing, slicing, and two-pointer techniques.`,intro:`Use Arrays When...
You need O(1) random access by index. Arrays excel when iteration and lookup dominate—cache locality makes them blazing fast. Python lists are dynamic arrays that resize automatically (1.5-2x when capacity exceeded), making \`append()\` O(1) amortized. Choose arrays when size is predictable or grows slowly.

\`\`\`python
# WHEN ARRAYS SHINE
nums = [1, 2, 3, 4, 5]
value = nums[2]           # O(1) - Direct memory access
for num in nums:          # Cache-friendly iteration
    process(num)

# Building with append() is O(n) total, not O(n^2)
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
\`\`\`
---
Master These Patterns
Three essential array patterns solve 80% of problems. **Sliding Window** for subarray problems (max sum, longest substring). **Two Pointers** for palindrome/pair finding in sorted arrays. **Prefix Sum** for range queries on static arrays. Each reduces O(n^2) brute force to O(n) with clever traversal.

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
    return []  # O(n) vs O(n^2) nested loops

# PREFIX SUM - Range sum queries
def build_prefix(arr):
    prefix = [0]
    for num in arr:
        prefix.append(prefix[-1] + num)
    return prefix  # O(n) preprocessing

# Query sum(arr[left:right]) in O(1)
prefix = build_prefix([1, 2, 3, 4, 5])
range_sum = prefix[4] - prefix[1]  # sum([2, 3, 4]) = 9
\`\`\`
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
#   - Random access needed (indexing, binary search)
#   - Iteration dominates (cache locality wins)
#   - Size is predictable or slowly growing

# Choose LINKED LISTS when:
#   - Frequent middle insertions/deletions (if you maintain references)
#   - Implementing queue/deque (O(1) at both ends with doubly linked)
#   - Size varies wildly or unknown upfront
\`\`\``,hasTabs:!0,basePath:`/arrays`,problemCategories:[`slidingWindow`,`prefixSum`]},linkedList:{type:`Linked List`,badge:`list`,color:`var(--accent-linked-list)`,description:`Sequential nodes with pointer connections. Master fast/slow pointers for cycle detection and middle finding.`,intro:`When Linked Lists Beat Arrays
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
# - Queue/Deque - O(1) at both ends with doubly linked
# - LRU Cache - doubly linked list + hash map
# - Frequent middle insertions if you maintain node references
# - Unknown/wildly varying size

# WHEN TO AVOID:
# - Random access needed - arrays win O(1) vs O(n)
# - Iteration dominates - cache misses hurt performance
# - Memory overhead matters - each node has pointer overhead
\`\`\`
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
\`\`\`
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
\`\`\``,hasTabs:!0,basePath:`/linked-list`,problemCategories:[`linkedList`]},stackQueue:{type:`Stack & Queue`,badge:`stk`,color:`var(--accent-stack-queue)`,description:`LIFO stack for undo/matching/DFS. FIFO queue for BFS/scheduling. Monotonic stack for next greater element.`,intro:`Stack vs Queue: LIFO vs FIFO
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
\`\`\`
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
# [4,2,6,3] -> [6,6,-1,-1]
# O(n) - each element pushed/popped once

# MONOTONIC STACK VARIANTS:
# - Increasing stack: pop larger elements
# - Decreasing stack: pop smaller elements
# - Next smaller: use increasing stack
# - Previous greater: iterate right-to-left

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
\`\`\`
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
\`\`\``,hasTabs:!0,basePath:`/stack-queue`,problemCategories:[`stack`]},binaryTree:{type:`Binary Tree`,badge:`tree`,color:`var(--accent-binary-tree)`,description:`Hierarchical structure with at most 2 children per node. Master DFS (pre/in/post order) and BFS (level order).`,intro:`Use Binary Trees When...
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
\`\`\`
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
\`\`\`
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
\`\`\``,hasTabs:!0,basePath:`/binary-tree`,problemCategories:[`dfs`,`bfs`]},heap:{type:`Heap / Priority Queue`,badge:`heap`,color:`var(--accent-heap)`,description:`Get min/max in O(1), insert/remove in O(log n). Essential for top-k problems and scheduling.`,intro:`Use Heaps When...
You need O(1) access to min/max with O(log n) insert/delete—perfect for priority queues and top-k problems. Min-heap keeps smallest at root (parent <= children), max-heap keeps largest at root (parent >= children). The complete binary tree structure guarantees O(log n) height. Choose heaps when you need dynamic min/max tracking without full sorting.

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
\`\`\`
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
\`\`\`
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
\`\`\``,hasTabs:!0,basePath:`/heap`,problemCategories:[`heap`]},trie:{type:`Trie`,badge:`trie`,color:`var(--accent-trie)`,description:`Prefix tree for efficient string operations. O(L) insert/search where L is word length.`,intro:`Use Tries When...
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
\`\`\`
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
\`\`\`
---
Word Search II Pattern
Given grid and dictionary, find all dictionary words in grid. Naive: for each word, DFS grid—O(W * 4^L) for W words. Trie approach: build trie from dictionary, DFS grid while walking trie simultaneously. When grid path doesn't match any trie prefix, prune immediately. Converts checking N words into one DFS guided by trie—O(M*N * 4^L) for MxN grid.

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
\`\`\``,hasTabs:!0,basePath:`/trie`,problemCategories:[`trie`]},unionFind:{type:`Union Find`,badge:`uf`,color:`var(--accent-union-find)`,description:`Track disjoint sets efficiently. Near O(1) union and find with path compression and union by rank.`,intro:`Use Union-Find When...
You need dynamic connectivity queries—are x and y connected? With path compression and union by rank, find and union operations run in O(a(n)) ~ O(1) amortized, where a is inverse Ackermann function (< 5 for practical n). Perfect for connected components, cycle detection in undirected graphs, and Kruskal's MST. Each set is represented as a tree with root as representative.

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
\`\`\`
---
Path Compression and Union by Rank
Path compression flattens trees by making all nodes on path point directly to root during find(). Union by rank attaches shorter tree to taller tree, preventing linear chains. These two optimizations together achieve O(a(n)) ~ O(1)—without them, operations degrade to O(n) on linear chains.

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

# WITH OPTIMIZATIONS - O(a(n)) ~ O(1)
# Path compression: self.parent[x] = self.find(self.parent[x])
# Union by rank: attach shorter to taller

# EXAMPLE: After path compression
# Before: 0->1->2->3->4->root
# After find(0): 0->root, 1->root, 2->root, 3->root, 4->root
# Tree flattened! Future finds are O(1)
\`\`\`
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
\`\`\``,hasTabs:!1},matrix:{type:`Matrix Operations`,badge:`[][]`,color:`var(--accent-matrix)`,description:`2D array operations for grids, images, graphs. Master traversal patterns and transformations.`,intro:`Use Matrices When...
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

# ROTATION - 90 clockwise
def rotate_clockwise(matrix):
    # Transpose then reverse rows
    n = len(matrix)
    for i in range(n):
        for j in range(i+1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()
\`\`\`
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
\`\`\`
---
Matrix as Graph
Adjacency matrix represents graphs: matrix[i][j] = edge weight from i to j (or 1 if exists, 0 if not). Space O(V^2)—good for dense graphs or O(1) edge lookup. For sparse graphs, adjacency list is better (O(V + E) space). Matrix enables simple graph algorithms.

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
# Space: O(V + E) vs O(V^2) for matrix
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
\`\`\``,hasTabs:!0,basePath:`/matrix`,problemCategories:[`matrices`]},bitManipulation:{type:`Bit Manipulation`,badge:`&|^`,color:`var(--accent-bit-ops)`,description:`Extremely fast O(1) operations. Essential for flags, subsets, and optimization problems.`,intro:`Use Bit Manipulation When...
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
\`\`\`
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
\`\`\`
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
\`\`\``,hasTabs:!1}},a=[{signature:`Why use Arrays?`,description:`Contiguous memory = O(1) random access. Foundation of all data structures. Use when: need index access, iteration, or building other structures.`,complexity:`Concept`,section:`Why & When`,example:`# ARRAY = Contiguous block of memory
# Foundation of: strings, stacks, queues, heaps, hash tables

# USE CASES:
# - Random access by index needed
# - Fixed/predictable size
# - Cache locality matters (iteration speed)
# - Building blocks for other structures
# - Dynamic programming tables
# - Frequency counting

# PYTHON LISTS:
# Dynamic arrays (grow automatically)
arr = [1, 2, 3]
arr.append(4)      # O(1) amortized
arr[2]             # O(1) access
arr.pop()          # O(1) remove last
arr.insert(0, 5)   # O(n) shift all elements

# OPERATIONS:
# Access:     O(1)
# Append:     O(1) amortized
# Insert:     O(n) at arbitrary position
# Delete:     O(n) at arbitrary position
# Search:     O(n) unsorted, O(log n) sorted`},{signature:`Arrays vs Linked Lists`,description:`Arrays: O(1) access, O(n) insert. Linked Lists: O(n) access, O(1) insert at known position. Choose based on operation frequency.`,complexity:`Concept`,section:`Why & When`,example:`# ARRAYS vs LINKED LISTS
#
# Operation           Array       Linked List
# ──────────────────────────────────────────────
# Access by index     O(1)        O(n)
# Insert at start     O(n)        O(1)
# Insert at end       O(1)*       O(1)**
# Insert at middle    O(n)        O(1)***
# Delete at position  O(n)        O(1)***
# Search value        O(n)        O(n)
# Cache locality      Excellent   Poor
# Memory overhead     Low         High (pointers)
#
# * Amortized for dynamic array
# ** If maintaining tail pointer
# *** If you have reference to node

# USE ARRAYS WHEN:
# - Need random access by index
# - Iteration is primary operation
# - Size is relatively stable
# - Cache performance matters
# - Memory overhead matters

# Example: Dynamic programming
dp = [0] * n  # Need O(1) access to dp[i]

# Example: Sliding window
for i in range(len(arr) - k + 1):
    window_sum = sum(arr[i:i+k])  # Index access needed

# USE LINKED LISTS WHEN:
# - Frequent insertions/deletions at start
# - Don't need random access
# - Unknown or highly variable size
# - Implementing stacks/queues`},{signature:`When to sort arrays?`,description:`Sorting unlocks O(log n) search, two pointers, greedy algorithms. Spend O(n log n) to enable faster operations.`,complexity:`Concept`,section:`Why & When`,example:`# SORTING TRANSFORMS PROBLEMS:

# BEFORE SORTING:
# "Find pair that sums to target" → O(n²) nested loops

# AFTER SORTING:
# "Find pair that sums to target" → O(n) two pointers
arr.sort()  # O(n log n)
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] + arr[right] == target:
        return True
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1

# SORTING ENABLES:
# 1. Binary search - O(log n) instead of O(n)
# 2. Two pointers - many O(n²) → O(n)
# 3. Greedy algorithms - interval scheduling
# 4. Detect duplicates - just check consecutive
# 5. Find kth element - sort then index

# WHEN NOT TO SORT:
# - Need to preserve original order
# - Relative positions matter
# - Array changes frequently (dynamic)
# - Extra O(n log n) time unacceptable

# SMART SORTING:
# Sort by custom key for complex problems
intervals.sort(key=lambda x: x[1])  # Sort by end time
people.sort(key=lambda x: (-x[0], x[1]))  # Height desc, k asc`},{signature:`Arrays vs Strings: Key Difference`,description:`Arrays are mutable (fast end ops). Strings are immutable (every change copies all characters). See Big O page for full comparison table.`,complexity:`Reference`,section:`Overview`,example:`# ARRAYS: Mutable - O(1) for end operations
arr = [1, 2, 3]
arr.append(4)      # Just fills next slot = O(1)
arr.pop()          # Removes last = O(1)

# STRINGS: Immutable - O(n) for any change
s = "hello"
s += "!"           # Creates NEW string "hello!" = O(n)
# Must copy all n characters to new memory

# Rule of thumb:
# - Need to modify? Use list, then ''.join()
# - Read-only? String is fine`},{signature:`What is an Array?`,description:`A collection of elements stored at contiguous memory locations. Each element accessed directly using an index, making arrays highly efficient for random access.`,complexity:`Concept`,section:`Fundamentals`,example:`# Using Python lists (dynamic arrays)
my_list = [10, 20, 30, 40, 50]

# Using the array module (fixed-type arrays)
import array
my_array = array.array('i', [10, 20, 30, 40, 50])  # 'i' = signed integers

# Using NumPy arrays (most common for numerical work)
import numpy as np
np_array = np.array([10, 20, 30, 40, 50])

# KEY CHARACTERISTICS:
# - Fixed or Dynamic Size: Python lists are dynamic
# - Indexed Access: Zero-based indices (0, 1, 2, ...)
# - Homogeneous Elements: Traditional arrays store same-type
# - O(1) Access Time: Direct access to any element by index`},{signature:`Accessing Elements`,description:`Elements accessed using their index (position). Python uses zero-based indexing. Supports positive indices, negative indices, and slicing.`,complexity:`O(1)`,section:`Fundamentals`,example:`arr = [10, 20, 30, 40, 50]

# Access by positive index (from start)
arr[0]   # 10 (first element)
arr[2]   # 30 (third element)
arr[4]   # 50 (fifth element)

# Access by negative index (from end)
arr[-1]  # 50 (last element)
arr[-2]  # 40 (second to last)

# Slicing - access multiple elements
arr[1:4]   # [20, 30, 40] (index 1 to 3)
arr[:3]    # [10, 20, 30] (first 3 elements)
arr[2:]    # [30, 40, 50] (from index 2 to end)
arr[::2]   # [10, 30, 50] (every 2nd element)

# Iterating with index
for i, element in enumerate(arr):
    print(f"Index {i}: {element}")

# TIME COMPLEXITY:
# Access by index: O(1)
# Search for value: O(n)
# Slicing: O(k) where k is slice size`},{signature:`Capacity vs Length`,description:`Length = number of elements stored. Capacity = total space allocated. Python lists manage capacity automatically, growing when needed.`,complexity:`Concept`,section:`Fundamentals`,example:`import sys

# Python lists manage capacity automatically
arr = []
print(f"Length: {len(arr)}")  # 0

# Watch how memory allocation grows
for i in range(20):
    arr.append(i)
    # sys.getsizeof shows allocated bytes (reflects capacity)
    print(f"Length: {len(arr):2d}, Size: {sys.getsizeof(arr)}")

# Output shows jumps in memory (capacity increases):
# Length:  1, Size: 88
# Length:  5, Size: 120  <- capacity doubled
# Length:  9, Size: 184  <- capacity grew again

# SIMULATING FIXED-CAPACITY ARRAY:
class FixedArray:
    def __init__(self, capacity):
        self.capacity = capacity
        self.length = 0
        self.data = [None] * capacity

    def append(self, value):
        if self.length >= self.capacity:
            raise Exception("Array is full!")
        self.data[self.length] = value
        self.length += 1

    def get(self, index):
        if index < 0 or index >= self.length:
            raise IndexError("Index out of bounds")
        return self.data[index]

arr = FixedArray(5)
arr.append(10)
arr.append(20)
# Length: 2, Capacity: 5`}],o=[{signature:`Insert at End — append()`,description:`Add element to end of array. Amortized O(1) due to dynamic resizing.`,complexity:`O(1)`,section:`Insertions`,example:`arr = [1, 2, 3]
arr.append(4)
print(arr)  # [1, 2, 3, 4]

# Multiple appends in loop
arr = []
for i in range(5):
    arr.append(i)  # Each append is O(1)
print(arr)  # [0, 1, 2, 3, 4]
# NOTE: Each append is O(1), but n appends = O(n) total`},{signature:`Insert at Beginning — insert(0, x)`,description:`Add element at start. O(n) because all elements must shift right.`,complexity:`O(n)`,section:`Insertions`,example:`arr = [1, 2, 3]
arr.insert(0, 0)
print(arr)  # [0, 1, 2, 3]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3]
# Insert 0 at index 0:
#         [_, 1, 2, 3]  <- shift all right
#         [0, 1, 2, 3]  <- insert

# For frequent head insertions, use collections.deque
from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)  # O(1)!`},{signature:`Insert at Index — insert(i, x)`,description:`Insert element at specific position. O(n) worst case.`,complexity:`O(n)`,section:`Insertions`,example:`arr = [1, 2, 4, 5]
arr.insert(2, 3)  # insert 3 at index 2
print(arr)  # [1, 2, 3, 4, 5]

# Insert multiple using slicing
arr = [1, 2, 5, 6]
arr[2:2] = [3, 4]  # insert at index 2
print(arr)  # [1, 2, 3, 4, 5, 6]

# extend() - add multiple at end only
arr = [1, 2]
arr.extend([3, 4, 5])
print(arr)  # [1, 2, 3, 4, 5]

# SUMMARY:
# End (append)    O(1)
# Beginning       O(n)
# Middle          O(n)`}],s=[{signature:`Delete from End — pop()`,description:`Remove and return last element. O(1) operation.`,complexity:`O(1)`,section:`Deletions`,example:`arr = [1, 2, 3, 4]
last = arr.pop()
print(last)  # 4
print(arr)   # [1, 2, 3]

# Pop in loop (safe - removing from end)
arr = [1, 2, 3, 4, 5]
while arr:
    print(arr.pop())  # Each pop is O(1)
# Output: 5, 4, 3, 2, 1
# NOTE: Each pop is O(1), but n pops = O(n) total`},{signature:`Delete from Beginning — pop(0)`,description:`Remove first element. O(n) because all elements shift left.`,complexity:`O(n)`,section:`Deletions`,example:`arr = [1, 2, 3, 4]
first = arr.pop(0)
print(first)  # 1
print(arr)    # [2, 3, 4]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3, 4]
# Remove index 0:
#         [2, 3, 4, _]  <- shift all left
#         [2, 3, 4]

# For O(1) head removal, use deque
from collections import deque
d = deque([1, 2, 3, 4])
d.popleft()  # O(1)!`},{signature:`Delete by Value — remove(x)`,description:`Remove FIRST occurrence of value. O(n) to find and shift.`,complexity:`O(n)`,section:`Deletions`,example:`arr = [1, 2, 3, 2, 4]
arr.remove(2)  # removes FIRST 2 only
print(arr)  # [1, 3, 2, 4]

# Remove ALL occurrences
arr = [1, 2, 3, 2, 4, 2]

# Method 1: List comprehension (creates new list)
arr = [x for x in arr if x != 2]
print(arr)  # [1, 3, 4]

# Method 2: While loop (in-place but O(n²))
arr = [1, 2, 3, 2, 4, 2]
while 2 in arr:
    arr.remove(2)
print(arr)  # [1, 3, 4]`},{signature:`Delete with del & clear()`,description:`del removes by index/slice. clear() empties the array.`,complexity:`O(n)`,section:`Deletions`,example:`arr = [1, 2, 3, 4, 5]

# Delete single index
del arr[2]
print(arr)  # [1, 2, 4, 5]

# Delete slice
del arr[1:3]
print(arr)  # [1, 5]

# Clear entire array
arr = [1, 2, 3]
arr.clear()
print(arr)  # []

# SUMMARY:
# End (pop())       O(1)
# Beginning         O(n)
# By index          O(n)
# By value          O(n)`}],c=[{signature:`Linear Search`,description:`Check each element sequentially. Works on unsorted arrays.`,complexity:`O(n)`,section:`Search`,example:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [10, 20, 30, 40, 50]
linear_search(arr, 30)  # 2
linear_search(arr, 99)  # -1

# Built-in methods
arr = [10, 20, 30, 40, 50]

# Check existence
30 in arr      # True
99 in arr      # False

# Find index (raises ValueError if not found)
arr.index(30)  # 2

# Safe index search
def safe_index(arr, target):
    try:
        return arr.index(target)
    except ValueError:
        return -1`},{signature:`Binary Search`,description:`Divide and conquer on SORTED array. O(log n) - much faster!`,complexity:`O(log n)`,section:`Search`,example:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

arr = [10, 20, 30, 40, 50]
binary_search(arr, 30)  # 2
binary_search(arr, 25)  # -1

# WALKTHROUGH: target = 40
# Step 1: left=0, right=4, mid=2
#         arr[2]=30 < 40 -> search right, left=3
# Step 2: left=3, right=4, mid=3
#         arr[3]=40 == 40 -> Found! Return 3`},{signature:`bisect Module`,description:`Python built-in for binary search operations on sorted arrays.`,complexity:`O(log n)`,section:`Search`,example:`import bisect

arr = [10, 20, 30, 40, 50]

# Find insertion point (leftmost)
bisect.bisect_left(arr, 30)   # 2
bisect.bisect_left(arr, 25)   # 2 (where 25 would go)

# Find insertion point (rightmost)
bisect.bisect_right(arr, 30)  # 3

# Check if value exists
def binary_search_bisect(arr, target):
    pos = bisect.bisect_left(arr, target)
    if pos < len(arr) and arr[pos] == target:
        return pos
    return -1

# Insert while maintaining sort
bisect.insort(arr, 25)
print(arr)  # [10, 20, 25, 30, 40, 50]`},{signature:`Min, Max & Count`,description:`Find extremes and count occurrences. All O(n).`,complexity:`O(n)`,section:`Search`,example:`arr = [30, 10, 50, 20, 40]

# Find min/max
min(arr)  # 10
max(arr)  # 50

# With index
arr.index(min(arr))  # 1
arr.index(max(arr))  # 2

# Count occurrences
arr = [1, 2, 2, 3, 2, 4]
arr.count(2)  # 3

# SUMMARY:
# Linear search    O(n)
# Binary search    O(log n) - sorted only!
# in operator      O(n)
# min() / max()    O(n)
# count()          O(n)`}],l=[{signature:`Reverse In-Place`,description:`Reverse array without extra space using two pointers.`,complexity:`O(n)`,section:`In-Place Operations`,example:`# Method 1: Built-in
arr = [1, 2, 3, 4, 5]
arr.reverse()
print(arr)  # [5, 4, 3, 2, 1]

# Method 2: Two pointers (manual)
def reverse_in_place(arr):
    left, right = 0, len(arr) - 1

    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

arr = [1, 2, 3, 4, 5]
reverse_in_place(arr)
print(arr)  # [5, 4, 3, 2, 1]

# Note: arr[::-1] creates NEW array (not in-place)`},{signature:`Remove Duplicates (LC #26)`,description:`Remove duplicates from sorted array in-place. Return new length.`,complexity:`O(n)`,section:`In-Place Operations`,example:`def remove_duplicates(nums):
    if len(nums) == 0:
        return 0

    write = 1  # position for next unique

    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1

    return write

nums = [1, 1, 2, 2, 3, 4, 4]
length = remove_duplicates(nums)
print(nums[:length])  # [1, 2, 3, 4]

# PATTERN: Read-Write Pointers
# read scans every element
# write marks where to place next valid element`},{signature:`Remove Element (LC #27)`,description:`Remove all occurrences of value in-place.`,complexity:`O(n)`,section:`In-Place Operations`,example:`def remove_element(nums, val):
    write = 0

    for read in range(len(nums)):
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1

    return write

nums = [3, 2, 2, 3]
length = remove_element(nums, 3)
print(nums[:length])  # [2, 2]

nums = [0, 1, 2, 2, 3, 0, 4, 2]
length = remove_element(nums, 2)
print(nums[:length])  # [0, 1, 3, 0, 4]`},{signature:`Move Zeroes (LC #283)`,description:`Move all zeros to end while maintaining order of non-zeros.`,complexity:`O(n)`,section:`In-Place Operations`,example:`def move_zeroes(nums):
    write = 0

    # Move all non-zeros to front
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1

    # Fill remaining with zeros
    while write < len(nums):
        nums[write] = 0
        write += 1

nums = [0, 1, 0, 3, 12]
move_zeroes(nums)
print(nums)  # [1, 3, 12, 0, 0]

# Alternative: Swap approach
def move_zeroes_swap(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1`},{signature:`Rotate Array (LC #189)`,description:`Rotate array right by k steps using reverse trick.`,complexity:`O(n)`,section:`In-Place Operations`,example:`def rotate(nums, k):
    n = len(nums)
    k = k % n  # handle k > n

    def reverse(left, right):
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1

    reverse(0, n - 1)    # Reverse all
    reverse(0, k - 1)    # Reverse first k
    reverse(k, n - 1)    # Reverse rest

nums = [1, 2, 3, 4, 5, 6, 7]
rotate(nums, 3)
print(nums)  # [5, 6, 7, 1, 2, 3, 4]

# HOW IT WORKS (k=3):
# Original:     [1, 2, 3, 4, 5, 6, 7]
# Reverse all:  [7, 6, 5, 4, 3, 2, 1]
# Reverse 0:2:  [5, 6, 7, 4, 3, 2, 1]
# Reverse 3:6:  [5, 6, 7, 1, 2, 3, 4]`}],u=[{signature:`Two Pointer Pattern`,description:`Use two pointers from opposite ends moving inward.`,complexity:`O(n)`,section:`Patterns`,example:`# TEMPLATE:
left = 0
right = len(arr) - 1

while left < right:
    # Compare arr[left] and arr[right]
    # Move pointers based on condition
    pass

# USE FOR:
# - Reverse array
# - Two sum (sorted)
# - Palindrome check
# - Container with most water
# - Sorted squares

# Example: Check palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`},{signature:`Read-Write Pointer Pattern`,description:`Read pointer scans, write pointer marks valid positions.`,complexity:`O(n)`,section:`Patterns`,example:`# TEMPLATE:
write = 0

for read in range(len(arr)):
    if condition(arr[read]):
        arr[write] = arr[read]
        write += 1

# USE FOR:
# - Remove duplicates
# - Remove element
# - Move zeroes
# - Filter in-place

# Example: Keep only positive numbers
def keep_positive(arr):
    write = 0
    for read in range(len(arr)):
        if arr[read] > 0:
            arr[write] = arr[read]
            write += 1
    return arr[:write]

keep_positive([-1, 2, -3, 4, 5])  # [2, 4, 5]`},{signature:`Sliding Window Pattern`,description:`Maintain a window that expands right and shrinks from left.`,complexity:`O(n)`,section:`Patterns`,example:`# TEMPLATE:
left = 0
for right in range(len(arr)):
    # Expand window by including arr[right]

    while window_invalid:
        # Shrink window from left
        left += 1

# USE FOR:
# - Max consecutive ones
# - Subarray sum equals k
# - Longest substring without repeating
# - Minimum window substring

# Example: Max sum subarray of size k
def max_sum_k(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for right in range(k, len(arr)):
        window_sum += arr[right] - arr[right - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

max_sum_k([1, 4, 2, 10, 2, 3, 1, 0, 20], 4)  # 24`}],d=[...o,...s,...c,...l,...u],f=[{signature:`Max Consecutive Ones`,description:`Given a binary array, return the maximum number of consecutive 1s. Track current and max count, reset on 0.`,complexity:`O(n)`,section:`Problems`,example:`# Problem: [1, 1, 0, 1, 1, 1] -> 3
#          [1, 0, 1, 1, 0, 1] -> 2

def find_max_consecutive_ones(nums):
    """
    Time: O(n), Space: O(1)
    """
    max_count = 0
    current_count = 0

    for num in nums:
        if num == 1:
            current_count += 1
            max_count = max(max_count, current_count)
        else:
            current_count = 0

    return max_count

# Test cases
find_max_consecutive_ones([1, 1, 0, 1, 1, 1])  # 3
find_max_consecutive_ones([1, 0, 1, 1, 0, 1])  # 2
find_max_consecutive_ones([0, 0, 0])           # 0
find_max_consecutive_ones([1, 1, 1, 1])        # 4

# ONE-LINER (clever but less efficient):
def max_ones_v2(nums):
    return max(len(g) for g in ''.join(map(str, nums)).split('0'))`},{signature:`Even Number of Digits`,description:`Count how many integers in array have an even number of digits. Use string conversion or logarithm.`,complexity:`O(n)`,section:`Problems`,example:`# Problem: [12, 345, 2, 6, 7896] -> 2
# (12 has 2 digits, 7896 has 4 digits)

def find_numbers_with_even_digits(nums):
    """
    Time: O(n * d) where d is average digit count
    Space: O(1)
    """
    count = 0

    for num in nums:
        digit_count = len(str(abs(num)))  # abs() handles negatives
        if digit_count % 2 == 0:
            count += 1

    return count

# Test cases
find_numbers_with_even_digits([12, 345, 2, 6, 7896])  # 2
find_numbers_with_even_digits([555, 901, 482, 1771]) # 1

# MATHEMATICAL APPROACH (without string conversion):
import math

def count_digits(num):
    if num == 0:
        return 1
    return math.floor(math.log10(abs(num))) + 1

def even_digits_v2(nums):
    return sum(1 for num in nums if count_digits(num) % 2 == 0)

# ONE-LINER:
def even_digits_v3(nums):
    return sum(len(str(abs(n))) % 2 == 0 for n in nums)`},{signature:`Squares of Sorted Array`,description:`Given sorted array, return squares in sorted order. Two-pointer from ends beats naive sort O(n log n) -> O(n).`,complexity:`O(n)`,section:`Problems`,example:`# Problem: [-4, -1, 0, 3, 10] -> [0, 1, 9, 16, 100]
#          [-7, -3, 2, 3, 11] -> [4, 9, 9, 49, 121]

# APPROACH 1: Square + Sort (O(n log n))
def sorted_squares_basic(nums):
    squared = [num ** 2 for num in nums]
    squared.sort()
    return squared

# APPROACH 2: Two Pointers (O(n)) - OPTIMAL
def sorted_squares_optimal(nums):
    """
    Key insight: largest squares at ends (most negative or positive)
    Fill result array from the end
    """
    n = len(nums)
    result = [0] * n  # Pre-allocate result array

    left = 0
    right = n - 1
    position = n - 1  # Fill from the end

    while left <= right:
        left_square = nums[left] ** 2
        right_square = nums[right] ** 2

        if left_square > right_square:
            result[position] = left_square
            left += 1
        else:
            result[position] = right_square
            right -= 1

        position -= 1

    return result

# VISUAL WALKTHROUGH:
# Input: [-4, -1, 0, 3, 10]
#
# left=0 (-4), right=4 (10): 16 vs 100 -> result[4]=100
# left=0 (-4), right=3 (3):  16 vs 9   -> result[3]=16
# left=1 (-1), right=3 (3):  1  vs 9   -> result[2]=9
# left=1 (-1), right=2 (0):  1  vs 0   -> result[1]=1
# left=2 (0),  right=2 (0):  0  vs 0   -> result[0]=0
#
# Result: [0, 1, 9, 16, 100]`}],p=[...a,...d,...f],m=[{signature:`Why use Linked List?`,description:`O(1) insertion/deletion at known positions. No contiguous memory needed. Use when frequent insertions matter more than random access.`,complexity:`Concept`,section:`Why & When`,example:`# LINKED LIST vs ARRAY
#
# Operation          Array    Linked List
# ───────────────────────────────────────
# Access by index    O(1)     O(n)
# Insert at start    O(n)     O(1)
# Insert at end      O(1)*    O(1)**
# Insert at middle   O(n)     O(1)***
# Delete            O(n)      O(1)***
# Search            O(n)      O(n)
#
# * Amortized for dynamic array
# ** If we maintain tail pointer
# *** If we have reference to node

# USE LINKED LIST WHEN:
# - Frequent insertions/deletions
# - Don't need random access
# - Unknown size, frequent resizing
# - Implementing stacks/queues

# USE ARRAY WHEN:
# - Need random access
# - Cache locality matters
# - Size is relatively fixed`},{signature:`ListNode Structure`,description:`Basic building block: value + next pointer. For doubly linked: add prev pointer.`,complexity:`Concept`,section:`Why & When`,example:`# SINGLY LINKED LIST NODE
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# DOUBLY LINKED LIST NODE
class DoublyListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

# Creating a linked list: 1 -> 2 -> 3
head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)

# Traversal
curr = head
while curr:
    print(curr.val)
    curr = curr.next`},{signature:`Fast and Slow Pointer`,description:`Two pointers at different speeds. Detect cycles, find middle, find nth from end.`,complexity:`O(n)`,section:`Node Structure`,example:`# TEMPLATE: Fast moves 2x, Slow moves 1x
def fn(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps
        # Do logic

    return slow  # Often returns slow (middle)

# WHY IT WORKS:
# - When fast reaches end, slow is at middle
# - If there's a cycle, they will meet
# - Distance relationship gives useful positions`},{signature:`Find Middle of Linked List`,description:`Slow pointer ends up at middle when fast reaches end.`,complexity:`O(n)`,section:`Node Structure`,example:`def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # Middle node

# For even length: returns second middle
# 1 -> 2 -> 3 -> 4 -> 5  returns 3
# 1 -> 2 -> 3 -> 4      returns 3

# For first middle in even length:
def find_first_middle(head):
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    return slow`},{signature:`Detect Cycle`,description:`If fast and slow meet, there is a cycle. Floyd's cycle detection.`,complexity:`O(n)`,section:`Basic Operations`,example:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# Find cycle START (where cycle begins)
def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            # Found cycle, now find start
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow  # Cycle start node
    return None

# WHY THIS WORKS (Math):
# When they meet in cycle:
# slow traveled: x + y
# fast traveled: x + y + n*c (n cycles)
# fast = 2 * slow -> x + y + nc = 2(x + y)
# -> x = nc - y = (n-1)c + (c-y)
# So distance from head to cycle start (x)
# equals distance from meeting point to start`},{signature:`Find Nth Node from End`,description:`Two pointers with n gap. When fast reaches end, slow is at target.`,complexity:`O(n)`,section:`Basic Operations`,example:`def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    slow = fast = dummy

    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next

    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next

    # slow is now at (n+1)th from end
    # so slow.next is nth from end
    slow.next = slow.next.next
    return dummy.next

# Get nth from end (without removal)
def get_nth_from_end(head, n):
    slow = fast = head
    for _ in range(n):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    return slow`},{signature:`Reverse Linked List`,description:`Core operation. Iterative: O(1) space. Recursive: O(n) space for call stack.`,complexity:`O(n)`,section:`Basic Operations`,example:`# ITERATIVE (Preferred - O(1) space)
def reverse_list(head):
    prev = None
    curr = head

    while curr:
        next_temp = curr.next  # Save next
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward

    return prev  # New head

# RECURSIVE (O(n) space for call stack)
def reverse_list_recursive(head):
    if not head or not head.next:
        return head

    new_head = reverse_list_recursive(head.next)
    head.next.next = head  # Reverse pointer
    head.next = None       # Prevent cycle

    return new_head

# Visualization:
# 1 -> 2 -> 3 -> None
# Step 1: prev=None, curr=1
# Step 2: prev=1, curr=2, list: None <- 1  2 -> 3
# Step 3: prev=2, curr=3, list: None <- 1 <- 2  3
# Step 4: prev=3, curr=None
# Result: None <- 1 <- 2 <- 3`},{signature:`Reverse Linked List II (Partial)`,description:`Reverse only portion from position left to right.`,complexity:`O(n)`,section:`Fast & Slow Pointers`,example:`def reverse_between(head, left, right):
    if not head or left == right:
        return head

    dummy = ListNode(0, head)
    prev = dummy

    # Move to node before left
    for _ in range(left - 1):
        prev = prev.next

    # Start reversing
    curr = prev.next
    for _ in range(right - left):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node

    return dummy.next

# Example: 1 -> 2 -> 3 -> 4 -> 5, left=2, right=4
# Result:  1 -> 4 -> 3 -> 2 -> 5`},{signature:`Reverse in K-Groups`,description:`Reverse every k nodes. If remaining < k, keep as is.`,complexity:`O(n)`,section:`Fast & Slow Pointers`,example:`def reverse_k_group(head, k):
    # Count total nodes
    count = 0
    curr = head
    while curr:
        count += 1
        curr = curr.next

    dummy = ListNode(0, head)
    prev_group = dummy

    while count >= k:
        curr = prev_group.next
        next_node = curr.next

        # Reverse k nodes
        for _ in range(k - 1):
            curr.next = next_node.next
            next_node.next = prev_group.next
            prev_group.next = next_node
            next_node = curr.next

        prev_group = curr
        count -= k

    return dummy.next

# Example: 1->2->3->4->5, k=2
# Result:  2->1->4->3->5`}],h=[{signature:`Merge Two Sorted Lists`,description:`Classic merge using dummy head. Essential for merge sort on lists.`,complexity:`O(n+m)`,section:`Fast & Slow Pointers`,example:`def merge_two_lists(l1, l2):
    dummy = ListNode()
    tail = dummy

    while l1 and l2:
        if l1.val <= l2.val:
            tail.next = l1
            l1 = l1.next
        else:
            tail.next = l2
            l2 = l2.next
        tail = tail.next

    # Attach remaining nodes
    tail.next = l1 or l2

    return dummy.next

# DUMMY HEAD PATTERN:
# - Avoids special cases for empty head
# - Clean code for building new list
# - Return dummy.next at end`},{signature:`Add Two Numbers`,description:`Numbers stored as linked lists (reverse order). Add digit by digit with carry.`,complexity:`O(max(n,m))`,section:`Fast & Slow Pointers`,example:`def add_two_numbers(l1, l2):
    dummy = ListNode()
    curr = dummy
    carry = 0

    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0

        total = val1 + val2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next

        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None

    return dummy.next

# Example: 342 + 465 = 807
# l1: 2 -> 4 -> 3  (342 reversed)
# l2: 5 -> 6 -> 4  (465 reversed)
# Result: 7 -> 0 -> 8  (807 reversed)`},{signature:`Remove Duplicates from Sorted List`,description:`Keep only distinct values. Compare adjacent nodes.`,complexity:`O(n)`,section:`Reverse Patterns`,example:`# Keep one of each value
def delete_duplicates(head):
    curr = head
    while curr and curr.next:
        if curr.val == curr.next.val:
            curr.next = curr.next.next
        else:
            curr = curr.next
    return head

# Remove ALL duplicates (keep only unique)
def delete_all_duplicates(head):
    dummy = ListNode(0, head)
    prev = dummy

    while head:
        if head.next and head.val == head.next.val:
            # Skip all duplicates
            while head.next and head.val == head.next.val:
                head = head.next
            prev.next = head.next
        else:
            prev = prev.next
        head = head.next

    return dummy.next`},{signature:`Palindrome Linked List`,description:`Find middle, reverse second half, compare both halves.`,complexity:`O(n) time, O(1) space`,section:`Reverse Patterns`,example:`def is_palindrome(head):
    if not head or not head.next:
        return True

    # Find middle
    slow = fast = head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next

    # Reverse second half
    second = reverse(slow.next)
    slow.next = None  # Cut the list

    # Compare both halves
    first = head
    while second:
        if first.val != second.val:
            return False
        first = first.next
        second = second.next

    return True

def reverse(head):
    prev = None
    while head:
        next_temp = head.next
        head.next = prev
        prev = head
        head = next_temp
    return prev`},{signature:`Intersection of Two Lists`,description:`Find node where two lists converge. Use length difference or two-pointer trick.`,complexity:`O(n+m)`,section:`Reverse Patterns`,example:`def get_intersection_node(headA, headB):
    if not headA or not headB:
        return None

    pA, pB = headA, headB

    # When pA reaches end, redirect to headB
    # When pB reaches end, redirect to headA
    # They will meet at intersection or both be None
    while pA != pB:
        pA = pA.next if pA else headB
        pB = pB.next if pB else headA

    return pA

# WHY THIS WORKS:
# If lists have lengths a and b:
# pA travels: a + c + (b - c) = a + b
# pB travels: b + c + (a - c) = a + b
# They travel same distance, meeting at intersection
# (c = shared part, if no intersection both end at None)`},{signature:`Copy List with Random Pointer`,description:`Deep copy list where nodes have random pointers. Use hash map or interleaving.`,complexity:`O(n)`,section:`Merge & Sort`,example:`# Using Hash Map (simple)
def copy_random_list(head):
    if not head:
        return None

    # Map old nodes to new nodes
    old_to_new = {}
    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next

    # Set next and random pointers
    curr = head
    while curr:
        if curr.next:
            old_to_new[curr].next = old_to_new[curr.next]
        if curr.random:
            old_to_new[curr].random = old_to_new[curr.random]
        curr = curr.next

    return old_to_new[head]

# O(1) space: Interleave original and copy
# 1. Create copy nodes interleaved
# 2. Set random pointers using interleaved structure
# 3. Separate the two lists`}],g=[...m,...h],_=[{signature:`Why use Stack?`,description:`LIFO (Last In First Out). Use for: undo operations, expression parsing, DFS, backtracking, matching brackets.`,complexity:`Concept`,section:`Why & When`,example:`# STACK = LIFO (Last In, First Out)
# Think: stack of plates - take from top

# USE CASES:
# - Undo/Redo operations
# - Browser back button
# - Expression evaluation (postfix, infix)
# - Matching parentheses/brackets
# - DFS traversal
# - Backtracking algorithms
# - Function call stack

# PYTHON: Use list as stack
stack = []
stack.append(1)   # Push - O(1)
stack.append(2)
stack.pop()       # Pop - O(1) returns 2
stack[-1]         # Peek top - O(1)
len(stack)        # Size - O(1)
not stack         # Is empty? - O(1)`},{signature:`Why use Queue?`,description:`FIFO (First In First Out). Use for: BFS, task scheduling, buffering, level-order traversal.`,complexity:`Concept`,section:`Why & When`,example:`# QUEUE = FIFO (First In, First Out)
# Think: line at a store - first in line served first

# USE CASES:
# - BFS traversal
# - Task scheduling
# - Print queue
# - Message queues
# - Level-order tree traversal
# - Buffering (streaming)

# PYTHON: Use collections.deque (NOT list!)
from collections import deque

queue = deque()
queue.append(1)     # Enqueue right - O(1)
queue.append(2)
queue.popleft()     # Dequeue left - O(1) returns 1
queue[0]            # Peek front - O(1)

# WHY NOT list?
# list.pop(0) is O(n) - shifts all elements
# deque.popleft() is O(1)`},{signature:`Stack Operations`,description:`push(), pop(), peek(), isEmpty(). All O(1) using Python list.`,complexity:`O(1)`,section:`Stack Operations`,example:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        self.items.append(item)

    def pop(self):
        if not self.is_empty():
            return self.items.pop()
        raise IndexError("pop from empty stack")

    def peek(self):
        if not self.is_empty():
            return self.items[-1]
        raise IndexError("peek from empty stack")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# Usage
stack = Stack()
stack.push(1)
stack.push(2)
print(stack.peek())  # 2
print(stack.pop())   # 2
print(stack.pop())   # 1`},{signature:`Valid Parentheses`,description:`Classic stack problem. Push opening, pop and match closing brackets.`,complexity:`O(n)`,section:`Stack Operations`,example:`def is_valid(s):
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            # Closing bracket
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            # Opening bracket
            stack.append(char)

    return len(stack) == 0

# Examples:
# "()"     -> True
# "()[]{}" -> True
# "(]"     -> False
# "([)]"   -> False
# "{[]}"   -> True`},{signature:`Min Stack`,description:`Stack that supports getMin() in O(1). Store (value, current_min) pairs.`,complexity:`O(1) all operations`,section:`Stack Operations`,example:`class MinStack:
    def __init__(self):
        self.stack = []  # (value, min_so_far)

    def push(self, val):
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]

# Alternative: Two stacks
# One for values, one for minimums`},{signature:`Monotonic Stack Pattern`,description:`Stack that maintains increasing or decreasing order. Find next greater/smaller element in O(n).`,complexity:`O(n)`,section:`Monotonic Stack`,example:`# MONOTONIC INCREASING STACK
# Elements increase from bottom to top
# Use for: Next Smaller Element

def monotonic_increasing(arr):
    stack = []
    for i, num in enumerate(arr):
        while stack and arr[stack[-1]] > num:
            # stack[-1] is greater than current
            # Process popped element
            idx = stack.pop()
            # Current element is next smaller for idx
        stack.append(i)
    return stack

# MONOTONIC DECREASING STACK
# Elements decrease from bottom to top
# Use for: Next Greater Element

def monotonic_decreasing(arr):
    stack = []
    for i, num in enumerate(arr):
        while stack and arr[stack[-1]] < num:
            # stack[-1] is smaller than current
            # Process popped element
            idx = stack.pop()
            # Current element is next greater for idx
        stack.append(i)
    return stack`},{signature:`Next Greater Element`,description:`For each element, find next greater element to its right.`,complexity:`O(n)`,section:`Monotonic Stack`,example:`def next_greater_element(nums):
    n = len(nums)
    result = [-1] * n
    stack = []  # Monotonic decreasing (indices)

    for i in range(n):
        while stack and nums[stack[-1]] < nums[i]:
            idx = stack.pop()
            result[idx] = nums[i]
        stack.append(i)

    return result

# Example: [2, 1, 2, 4, 3]
# Output:  [4, 2, 4, -1, -1]
#
# For 2: next greater is 4
# For 1: next greater is 2
# For 2: next greater is 4
# For 4: no next greater -> -1
# For 3: no next greater -> -1

# Circular array version
def next_greater_circular(nums):
    n = len(nums)
    result = [-1] * n
    stack = []

    for i in range(2 * n):
        while stack and nums[stack[-1]] < nums[i % n]:
            result[stack.pop()] = nums[i % n]
        if i < n:
            stack.append(i)

    return result`},{signature:`Daily Temperatures`,description:`Find how many days until warmer temperature. Classic monotonic stack.`,complexity:`O(n)`,section:`Monotonic Stack`,example:`def daily_temperatures(temperatures):
    n = len(temperatures)
    result = [0] * n
    stack = []  # Indices of temperatures waiting for warmer

    for i in range(n):
        while stack and temperatures[stack[-1]] < temperatures[i]:
            prev_idx = stack.pop()
            result[prev_idx] = i - prev_idx
        stack.append(i)

    return result

# Example: [73, 74, 75, 71, 69, 72, 76, 73]
# Output:  [1,  1,  4,  2,  1,  1,  0,  0]
#
# Day 0 (73): 1 day until 74
# Day 1 (74): 1 day until 75
# Day 2 (75): 4 days until 76
# ...`},{signature:`Largest Rectangle in Histogram`,description:`Find largest rectangular area. Use monotonic increasing stack.`,complexity:`O(n)`,section:`Monotonic Stack`,example:`def largest_rectangle_area(heights):
    stack = []  # Indices
    max_area = 0
    heights.append(0)  # Sentinel to flush stack

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            # Width extends from after previous bar to current
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop()  # Remove sentinel
    return max_area

# Example: heights = [2, 1, 5, 6, 2, 3]
# Largest rectangle has area 10 (heights 5,6 with width 2)

# The stack maintains increasing heights
# When we find smaller height, we calculate areas
# for all bars that can't extend further right`},{signature:`Trapping Rain Water`,description:`Calculate water trapped between bars. Use monotonic stack or two pointers.`,complexity:`O(n)`,section:`Monotonic Stack`,example:`# Monotonic Stack Solution
def trap(height):
    stack = []  # Indices
    water = 0

    for i, h in enumerate(height):
        while stack and height[stack[-1]] < h:
            bottom = stack.pop()
            if not stack:
                break
            left = stack[-1]
            width = i - left - 1
            bounded_height = min(h, height[left]) - height[bottom]
            water += width * bounded_height
        stack.append(i)

    return water

# Two Pointer Solution (simpler)
def trap_two_pointer(height):
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0

    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                water += right_max - height[right]
            right -= 1

    return water`}],v=[{signature:`Queue with Deque`,description:`Use collections.deque for O(1) operations on both ends.`,complexity:`O(1)`,section:`Queue Operations`,example:`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, item):
        self.items.append(item)

    def dequeue(self):
        if not self.is_empty():
            return self.items.popleft()
        raise IndexError("dequeue from empty queue")

    def front(self):
        if not self.is_empty():
            return self.items[0]
        raise IndexError("front from empty queue")

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

# DEQUE OPERATIONS (all O(1))
dq = deque()
dq.append(x)      # Add to right
dq.appendleft(x)  # Add to left
dq.pop()          # Remove from right
dq.popleft()      # Remove from left
dq[0]             # Peek left
dq[-1]            # Peek right`},{signature:`Implement Queue using Stacks`,description:`Use two stacks. Push to one, pop by transferring to other.`,complexity:`O(1) amortized`,section:`Queue Operations`,example:`class MyQueue:
    def __init__(self):
        self.s1 = []  # For push
        self.s2 = []  # For pop

    def push(self, x):
        self.s1.append(x)

    def pop(self):
        self.peek()
        return self.s2.pop()

    def peek(self):
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
        return self.s2[-1]

    def empty(self):
        return not self.s1 and not self.s2

# Amortized O(1) because each element is
# pushed and popped at most twice total`},{signature:`Implement Stack using Queues`,description:`Use one or two queues. Rotate elements to simulate LIFO.`,complexity:`O(n) push or pop`,section:`Queue Operations`,example:`from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        # Rotate to make x the front
        for _ in range(len(self.q) - 1):
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return len(self.q) == 0

# After push(1), push(2), push(3):
# Queue state: [3, 2, 1]
# pop() returns 3 (LIFO behavior)`},{signature:`Circular Queue`,description:`Fixed size queue using array with head/tail pointers.`,complexity:`O(1)`,section:`Queue Operations`,example:`class MyCircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0
        self.tail = 0
        self.size = 0
        self.capacity = k

    def enQueue(self, value):
        if self.isFull():
            return False
        self.data[self.tail] = value
        self.tail = (self.tail + 1) % self.capacity
        self.size += 1
        return True

    def deQueue(self):
        if self.isEmpty():
            return False
        self.head = (self.head + 1) % self.capacity
        self.size -= 1
        return True

    def Front(self):
        return -1 if self.isEmpty() else self.data[self.head]

    def Rear(self):
        return -1 if self.isEmpty() else self.data[(self.tail - 1) % self.capacity]

    def isEmpty(self):
        return self.size == 0

    def isFull(self):
        return self.size == self.capacity`},{signature:`Sliding Window Maximum`,description:`Find max in each window of size k. Use monotonic decreasing deque.`,complexity:`O(n)`,section:`Monotonic Queue`,example:`from collections import deque

def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Indices of potential maximums

    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] <= i - k:
            dq.popleft()

        # Remove smaller elements (they can't be max)
        while dq and nums[dq[-1]] < num:
            dq.pop()

        dq.append(i)

        # Window is complete
        if i >= k - 1:
            result.append(nums[dq[0]])

    return result

# Example: nums = [1,3,-1,-3,5,3,6,7], k = 3
# Windows:
# [1,3,-1] max=3
# [3,-1,-3] max=3
# [-1,-3,5] max=5
# [-3,5,3] max=5
# [5,3,6] max=6
# [3,6,7] max=7
# Output: [3,3,5,5,6,7]`},{signature:`Evaluate Reverse Polish Notation`,description:`Postfix expression evaluation. Push numbers, pop and compute on operators.`,complexity:`O(n)`,section:`Expression Evaluation`,example:`def eval_rpn(tokens):
    stack = []

    for token in tokens:
        if token in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:  # Division truncates toward zero
                stack.append(int(a / b))
        else:
            stack.append(int(token))

    return stack[0]

# Example: ["2","1","+","3","*"]
# = ((2 + 1) * 3) = 9
#
# ["4","13","5","/","+"]
# = (4 + (13 / 5)) = 4 + 2 = 6`},{signature:`Basic Calculator`,description:`Evaluate expression with +, -, parentheses. Use stack for nested expressions.`,complexity:`O(n)`,section:`Expression Evaluation`,example:`def calculate(s):
    stack = []
    num = 0
    sign = 1
    result = 0

    for char in s:
        if char.isdigit():
            num = num * 10 + int(char)
        elif char in "+-":
            result += sign * num
            num = 0
            sign = 1 if char == '+' else -1
        elif char == '(':
            # Save current result and sign
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':
            result += sign * num
            num = 0
            result *= stack.pop()  # Sign before (
            result += stack.pop()  # Result before (

    result += sign * num
    return result

# Example: "(1+(4+5+2)-3)+(6+8)"
# = (1 + 11 - 3) + 14 = 9 + 14 = 23`},{signature:`Decode String`,description:`Decode k[encoded_string] patterns. Use stack for nested brackets.`,complexity:`O(n)`,section:`Expression Evaluation`,example:`def decode_string(s):
    stack = []
    curr_num = 0
    curr_str = ""

    for char in s:
        if char.isdigit():
            curr_num = curr_num * 10 + int(char)
        elif char == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif char == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += char

    return curr_str

# Examples:
# "3[a]2[bc]" -> "aaabcbc"
# "3[a2[c]]"  -> "accaccacc"
# "2[abc]3[cd]ef" -> "abcabccdcdcdef"`}],y=[..._,...v],b=[{section:`Why & When`,signature:`Why use Binary Tree?`,description:`Hierarchical data structure. BST gives O(log n) operations. Use for: sorted data, hierarchies, expression trees.`,complexity:`Concept`,example:`# BINARY TREE = Node with at most 2 children
#        1        <- Root
#       / \\
#      2   3      <- Children
#     / \\
#    4   5        <- Leaves

# USE CASES:
# - Binary Search Tree (sorted data)
# - Expression parsing
# - File system representation
# - DOM tree
# - Decision trees (ML)
# - Heaps (priority queue)

# Node structure
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# TERMINOLOGY:
# - Root: top node (no parent)
# - Leaf: node with no children
# - Height: longest path from node to leaf
# - Depth: distance from root to node
# - Level: all nodes at same depth`},{section:`Why & When`,signature:`Tree Traversal Orders`,description:`Preorder (root-left-right), Inorder (left-root-right), Postorder (left-right-root), Level order (BFS).`,complexity:`O(n)`,example:`#        1
#       / \\
#      2   3
#     / \\
#    4   5

# PREORDER:  1, 2, 4, 5, 3  (Root first)
# INORDER:   4, 2, 5, 1, 3  (Left, Root, Right)
# POSTORDER: 4, 5, 2, 3, 1  (Root last)
# LEVEL:     1, 2, 3, 4, 5  (Top to bottom)

# WHEN TO USE:
# - Preorder: Copy tree, serialize
# - Inorder: BST gives sorted order
# - Postorder: Delete tree, calculate size
# - Level order: Print by level, shortest path`},{section:`DFS Recursive`,signature:`DFS Recursive Template`,description:`Process node, recurse left, recurse right. Simple and elegant. O(h) space for call stack.`,complexity:`O(n) time, O(h) space`,example:`def dfs(node):
    if not node:
        return

    # PREORDER: process here
    print(node.val)

    dfs(node.left)

    # INORDER: process here
    # print(node.val)

    dfs(node.right)

    # POSTORDER: process here
    # print(node.val)

# Return value pattern
def dfs_with_return(node):
    if not node:
        return 0  # Base case

    left = dfs_with_return(node.left)
    right = dfs_with_return(node.right)

    # Combine results
    return 1 + max(left, right)  # Example: height`},{section:`DFS Recursive`,signature:`Preorder Traversal`,description:`Visit root before children. Use for: copying tree, prefix expression.`,complexity:`O(n)`,example:`# Recursive
def preorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)  # Process root
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result

# Iterative (with stack)
def preorder_iterative(root):
    if not root:
        return []
    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push right first so left is processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result`},{section:`DFS Recursive`,signature:`Inorder Traversal`,description:`Visit left, root, right. BST inorder gives sorted sequence.`,complexity:`O(n)`,example:`# Recursive
def inorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)  # Process root
        dfs(node.right)
    dfs(root)
    return result

# Iterative (with stack)
def inorder_iterative(root):
    result = []
    stack = []
    curr = root

    while curr or stack:
        # Go all the way left
        while curr:
            stack.append(curr)
            curr = curr.left

        # Process node
        curr = stack.pop()
        result.append(curr.val)

        # Move to right subtree
        curr = curr.right

    return result`},{section:`DFS Recursive`,signature:`Postorder Traversal`,description:`Visit children before root. Use for: deleting tree, postfix expression.`,complexity:`O(n)`,example:`# Recursive
def postorder_recursive(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)  # Process root
    dfs(root)
    return result

# Iterative (modified preorder + reverse)
def postorder_iterative(root):
    if not root:
        return []
    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push left first (opposite of preorder)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    return result[::-1]  # Reverse`},{section:`DFS Iterative`,signature:`DFS Iterative Template`,description:`Use explicit stack instead of recursion. Better for deep trees (no stack overflow).`,complexity:`O(n) time, O(h) space`,example:`def dfs_iterative(root):
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Add children to stack
        # Right first if you want left processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result

# With state tracking
def dfs_with_state(root):
    if not root:
        return 0

    stack = [(root, False)]
    result = 0

    while stack:
        node, visited = stack.pop()

        if visited:
            # Process after children (postorder)
            result += node.val
        else:
            # Add children and mark as visited
            stack.append((node, True))
            if node.right:
                stack.append((node.right, False))
            if node.left:
                stack.append((node.left, False))

    return result`},{section:`BFS Level Order`,signature:`BFS Level Order Template`,description:`Process level by level using queue. Find shortest path, level-wise operations.`,complexity:`O(n) time, O(w) space`,example:`from collections import deque

def bfs(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        level = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result

# Example output for tree:
#        3
#       / \\
#      9  20
#         / \\
#        15  7
# [[3], [9, 20], [15, 7]]`},{section:`BFS Level Order`,signature:`Level Order Traversal`,description:`Classic BFS. Returns list of lists, one per level.`,complexity:`O(n)`,example:`from collections import deque

def level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)

    return result

# Zigzag level order
def zigzag_level_order(root):
    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level = deque()
        for _ in range(len(queue)):
            node = queue.popleft()
            if left_to_right:
                level.append(node.val)
            else:
                level.appendleft(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(list(level))
        left_to_right = not left_to_right

    return result`},{section:`BFS Level Order`,signature:`Maximum Depth`,description:`DFS returns max depth. BFS counts levels.`,complexity:`O(n)`,example:`# DFS Recursive
def max_depth_dfs(root):
    if not root:
        return 0
    return 1 + max(max_depth_dfs(root.left),
                   max_depth_dfs(root.right))

# BFS
def max_depth_bfs(root):
    if not root:
        return 0

    from collections import deque
    queue = deque([root])
    depth = 0

    while queue:
        depth += 1
        for _ in range(len(queue)):
            node = queue.popleft()
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

    return depth

# Minimum depth (first leaf)
def min_depth(root):
    if not root:
        return 0
    from collections import deque
    queue = deque([(root, 1)])
    while queue:
        node, depth = queue.popleft()
        if not node.left and not node.right:
            return depth  # First leaf found
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))`}],x=[{section:`Common Problems`,signature:`Same Tree`,description:`Check if two trees are identical.`,complexity:`O(n)`,example:`def is_same_tree(p, q):
    if not p and not q:
        return True
    if not p or not q:
        return False
    return (p.val == q.val and
            is_same_tree(p.left, q.left) and
            is_same_tree(p.right, q.right))

# Iterative with stack
def is_same_tree_iter(p, q):
    stack = [(p, q)]
    while stack:
        n1, n2 = stack.pop()
        if not n1 and not n2:
            continue
        if not n1 or not n2:
            return False
        if n1.val != n2.val:
            return False
        stack.append((n1.left, n2.left))
        stack.append((n1.right, n2.right))
    return True`},{section:`Common Problems`,signature:`Symmetric Tree`,description:`Check if tree is mirror of itself.`,complexity:`O(n)`,example:`def is_symmetric(root):
    def is_mirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2:
            return False
        return (t1.val == t2.val and
                is_mirror(t1.left, t2.right) and
                is_mirror(t1.right, t2.left))

    return is_mirror(root, root)

# Iterative with queue
def is_symmetric_iter(root):
    from collections import deque
    queue = deque([(root, root)])
    while queue:
        t1, t2 = queue.popleft()
        if not t1 and not t2:
            continue
        if not t1 or not t2:
            return False
        if t1.val != t2.val:
            return False
        queue.append((t1.left, t2.right))
        queue.append((t1.right, t2.left))
    return True`},{section:`Common Problems`,signature:`Invert Binary Tree`,description:`Swap left and right children recursively.`,complexity:`O(n)`,example:`def invert_tree(root):
    if not root:
        return None

    # Swap children
    root.left, root.right = root.right, root.left

    # Recurse
    invert_tree(root.left)
    invert_tree(root.right)

    return root

# Iterative BFS
def invert_tree_bfs(root):
    if not root:
        return None
    from collections import deque
    queue = deque([root])
    while queue:
        node = queue.popleft()
        node.left, node.right = node.right, node.left
        if node.left:
            queue.append(node.left)
        if node.right:
            queue.append(node.right)
    return root`},{section:`Common Problems`,signature:`Path Sum`,description:`Check if path from root to leaf sums to target.`,complexity:`O(n)`,example:`def has_path_sum(root, target_sum):
    if not root:
        return False

    # Is leaf with correct sum?
    if not root.left and not root.right:
        return root.val == target_sum

    # Check children with remaining sum
    remaining = target_sum - root.val
    return (has_path_sum(root.left, remaining) or
            has_path_sum(root.right, remaining))

# All paths that sum to target
def path_sum_all(root, target_sum):
    result = []

    def dfs(node, path, remaining):
        if not node:
            return
        path.append(node.val)
        if not node.left and not node.right and remaining == node.val:
            result.append(path[:])
        dfs(node.left, path, remaining - node.val)
        dfs(node.right, path, remaining - node.val)
        path.pop()

    dfs(root, [], target_sum)
    return result`},{section:`Common Problems`,signature:`Lowest Common Ancestor`,description:`Find deepest node that is ancestor of both p and q.`,complexity:`O(n)`,example:`def lowest_common_ancestor(root, p, q):
    if not root:
        return None

    # Found one of the nodes
    if root == p or root == q:
        return root

    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)

    # Both found in different subtrees -> root is LCA
    if left and right:
        return root

    # Both found in same subtree
    return left if left else right

# For BST (use values to guide search)
def lca_bst(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root`},{section:`Common Problems`,signature:`Validate BST`,description:`Check if tree is valid Binary Search Tree. Track valid range.`,complexity:`O(n)`,example:`def is_valid_bst(root):
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

# Inorder traversal (should be sorted)
def is_valid_bst_inorder(root):
    prev = float('-inf')
    stack = []
    curr = root

    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        if curr.val <= prev:
            return False
        prev = curr.val
        curr = curr.right

    return True`},{section:`Common Problems`,signature:`Serialize and Deserialize`,description:`Convert tree to string and back. Use preorder with null markers.`,complexity:`O(n)`,example:`class Codec:
    def serialize(self, root):
        result = []

        def preorder(node):
            if not node:
                result.append("N")
                return
            result.append(str(node.val))
            preorder(node.left)
            preorder(node.right)

        preorder(root)
        return ",".join(result)

    def deserialize(self, data):
        values = data.split(",")
        self.idx = 0

        def build():
            if values[self.idx] == "N":
                self.idx += 1
                return None
            node = TreeNode(int(values[self.idx]))
            self.idx += 1
            node.left = build()
            node.right = build()
            return node

        return build()

# Example: "1,2,N,N,3,4,N,N,5,N,N"`},{section:`Common Problems`,signature:`Diameter of Binary Tree`,description:`Longest path between any two nodes. May not pass through root.`,complexity:`O(n)`,example:`def diameter_of_binary_tree(root):
    diameter = 0

    def height(node):
        nonlocal diameter
        if not node:
            return 0

        left = height(node.left)
        right = height(node.right)

        # Diameter through this node
        diameter = max(diameter, left + right)

        return 1 + max(left, right)

    height(root)
    return diameter

# The diameter is the number of EDGES
# If you want number of nodes: diameter + 1`}],S=[...b,...x],C=[{signature:`Why use Heap?`,description:`Get min/max in O(1), insert/delete in O(log n). Use for: priority queues, top-k problems, median finding.`,complexity:`Concept`,section:`Why & When`,example:`# HEAP = Complete binary tree with heap property
# Min-heap: parent <= children (root is minimum)
# Max-heap: parent >= children (root is maximum)

# USE CASES:
# - Priority Queue (tasks by priority)
# - Find K largest/smallest elements
# - Merge K sorted lists
# - Running median
# - Dijkstra's algorithm
# - Huffman coding

# PYTHON: heapq module (MIN-HEAP only)
import heapq

# For MAX-HEAP: negate values
# Push -x, pop and negate result

# OPERATIONS:
# heappush    O(log n)  Add element
# heappop     O(log n)  Remove and return min
# heap[0]     O(1)      Peek min (don't pop)
# heapify     O(n)      Convert list to heap`},{signature:`Heap vs Sorted Array`,description:`Heap: O(log n) insert, O(1) peek. Sorted array: O(n) insert, O(1) peek. Use heap for dynamic data.`,complexity:`Concept`,section:`Why & When`,example:`# HEAP vs SORTED ARRAY
#
# Operation      Heap         Sorted Array
# ──────────────────────────────────────────
# Insert        O(log n)      O(n)
# Get min/max   O(1)          O(1)
# Delete min    O(log n)      O(1) or O(n)
# Search        O(n)          O(log n)
# Build         O(n)          O(n log n)

# USE HEAP WHEN:
# - Frequent insertions
# - Only need min/max (not search)
# - Streaming data (online algorithm)

# USE SORTED ARRAY WHEN:
# - Data is static
# - Need binary search
# - Need kth element quickly`},{signature:`heapq Operations`,description:`Python heapq module. Min-heap operations on a regular list.`,complexity:`O(log n)`,section:`Basic Operations`,example:`import heapq

# Create heap from list - O(n)
nums = [3, 1, 4, 1, 5, 9, 2, 6]
heapq.heapify(nums)  # Modifies in place
print(nums)  # [1, 1, 2, 3, 5, 9, 4, 6] (heap order)

# Push - O(log n)
heapq.heappush(nums, 0)

# Pop minimum - O(log n)
smallest = heapq.heappop(nums)

# Peek minimum - O(1)
smallest = nums[0]  # Don't use heappop

# Push and pop in one operation - O(log n)
result = heapq.heappushpop(nums, 7)  # Push 7, pop min

# Pop and push in one operation - O(log n)
result = heapq.heapreplace(nums, 7)  # Pop min, push 7

# n largest/smallest - O(n log k)
heapq.nlargest(3, nums)
heapq.nsmallest(3, nums)`},{signature:`Max Heap in Python`,description:`Python only has min-heap. Negate values for max-heap behavior.`,complexity:`O(log n)`,section:`Basic Operations`,example:`import heapq

# MAX HEAP: Negate values
class MaxHeap:
    def __init__(self):
        self.heap = []

    def push(self, val):
        heapq.heappush(self.heap, -val)

    def pop(self):
        return -heapq.heappop(self.heap)

    def peek(self):
        return -self.heap[0]

    def __len__(self):
        return len(self.heap)

# Usage
max_heap = MaxHeap()
max_heap.push(3)
max_heap.push(1)
max_heap.push(4)
print(max_heap.pop())  # 4 (largest)
print(max_heap.pop())  # 3
print(max_heap.pop())  # 1

# Or inline:
heap = []
heapq.heappush(heap, -5)  # Push 5
heapq.heappush(heap, -3)  # Push 3
largest = -heapq.heappop(heap)  # 5`},{signature:`Heap with Custom Objects`,description:`Use tuples for priority. First element is the key for comparison.`,complexity:`O(log n)`,section:`Basic Operations`,example:`import heapq

# Tuple-based priority
heap = []
heapq.heappush(heap, (2, "task B"))
heapq.heappush(heap, (1, "task A"))
heapq.heappush(heap, (3, "task C"))

while heap:
    priority, task = heapq.heappop(heap)
    print(priority, task)
# Output: 1 task A, 2 task B, 3 task C

# For objects, wrap in tuple
class Task:
    def __init__(self, name, priority):
        self.name = name
        self.priority = priority

tasks = [Task("A", 2), Task("B", 1), Task("C", 3)]
heap = [(t.priority, i, t) for i, t in enumerate(tasks)]
heapq.heapify(heap)

# Counter breaks ties (when priorities are equal)
import itertools
counter = itertools.count()
heap = []
heapq.heappush(heap, (priority, next(counter), task))`}],w=[{signature:`Find Top K Elements`,description:`Use min-heap of size k. Push all, pop when size > k. Final heap has k largest.`,complexity:`O(n log k)`,section:`Top K Problems`,example:`import heapq

def find_k_largest(nums, k):
    # Min-heap of size k
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # Remove smallest
    return sorted(heap, reverse=True)  # k largest

# Alternative: heapq.nlargest
def find_k_largest_simple(nums, k):
    return heapq.nlargest(k, nums)

# K smallest: use max-heap (negate) or nsmallest
def find_k_smallest(nums, k):
    return heapq.nsmallest(k, nums)

# Example:
nums = [3, 1, 4, 1, 5, 9, 2, 6, 5]
print(find_k_largest(nums, 3))  # [9, 6, 5]`},{signature:`Kth Largest Element`,description:`Min-heap of size k. After processing all, top of heap is kth largest.`,complexity:`O(n log k)`,section:`Top K Problems`,example:`import heapq

def find_kth_largest(nums, k):
    # Maintain min-heap of k largest elements
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)

    return heap[0]  # kth largest is the smallest in heap

# Alternative: QuickSelect O(n) average
# But heap is simpler and O(n log k) is often good enough

# Example:
nums = [3, 2, 1, 5, 6, 4]
print(find_kth_largest(nums, 2))  # 5

# Kth smallest: same logic
def find_kth_smallest(nums, k):
    # Max-heap of k smallest (negate values)
    heap = []
    for num in nums:
        heapq.heappush(heap, -num)
        if len(heap) > k:
            heapq.heappop(heap)
    return -heap[0]`},{signature:`Top K Frequent Elements`,description:`Count frequencies, then find k most frequent using heap.`,complexity:`O(n log k)`,section:`Top K Problems`,example:`import heapq
from collections import Counter

def top_k_frequent(nums, k):
    # Count frequencies - O(n)
    counts = Counter(nums)

    # Use min-heap of size k - O(n log k)
    heap = []
    for num, freq in counts.items():
        heapq.heappush(heap, (freq, num))
        if len(heap) > k:
            heapq.heappop(heap)

    return [num for freq, num in heap]

# Using nlargest
def top_k_frequent_simple(nums, k):
    counts = Counter(nums)
    return heapq.nlargest(k, counts.keys(), key=counts.get)

# Bucket sort approach - O(n)
def top_k_frequent_bucket(nums, k):
    counts = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]

    for num, freq in counts.items():
        buckets[freq].append(num)

    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
    return result`},{signature:`Merge K Sorted Lists`,description:`Use heap to always pick the smallest head among k lists.`,complexity:`O(n log k)`,section:`Merge K Sorted`,example:`import heapq

def merge_k_lists(lists):
    # Heap: (value, list_index, node_index)
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))

    result = []
    while heap:
        val, list_idx, node_idx = heapq.heappop(heap)
        result.append(val)

        # Push next element from same list
        if node_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][node_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, node_idx + 1))

    return result

# For linked lists
def merge_k_linked_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))

    dummy = ListNode()
    curr = dummy

    while heap:
        val, idx, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, idx, node.next))

    return dummy.next`},{signature:`Find Median from Stream`,description:`Use two heaps: max-heap for lower half, min-heap for upper half.`,complexity:`O(log n) add, O(1) median`,section:`Two Heaps`,example:`import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max-heap (negated) for smaller half
        self.large = []  # Min-heap for larger half

    def addNum(self, num):
        # Add to small (max-heap)
        heapq.heappush(self.small, -num)

        # Ensure small's max <= large's min
        if self.large and -self.small[0] > self.large[0]:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes (small can have at most 1 more)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small):
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self):
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2

# Usage
mf = MedianFinder()
mf.addNum(1)
mf.addNum(2)
print(mf.findMedian())  # 1.5
mf.addNum(3)
print(mf.findMedian())  # 2`},{signature:`Sliding Window Median`,description:`Two heaps with lazy removal. Track elements to remove.`,complexity:`O(n log n)`,section:`Two Heaps`,example:`import heapq
from collections import defaultdict

def median_sliding_window(nums, k):
    small = []  # Max-heap (negated)
    large = []  # Min-heap
    removed = defaultdict(int)  # Lazy removal
    result = []

    def balance():
        # Move from small to large if needed
        while small and large and -small[0] > large[0]:
            heapq.heappush(large, -heapq.heappop(small))
        # Balance sizes
        while len(small) > len(large) + 1:
            heapq.heappush(large, -heapq.heappop(small))
        while len(large) > len(small):
            heapq.heappush(small, -heapq.heappop(large))

    def clean(heap, is_max):
        while heap:
            val = -heap[0] if is_max else heap[0]
            if removed[val] > 0:
                heapq.heappop(heap)
                removed[val] -= 1
            else:
                break

    def get_median():
        if k % 2 == 1:
            return -small[0]
        return (-small[0] + large[0]) / 2

    for i, num in enumerate(nums):
        heapq.heappush(small, -num)
        balance()
        clean(small, True)
        clean(large, False)

        if i >= k:
            removed[nums[i - k]] += 1
            clean(small, True)
            clean(large, False)
            balance()

        if i >= k - 1:
            result.append(get_median())

    return result`},{signature:`Task Scheduler`,description:`Schedule tasks with cooldown. Use max-heap for most frequent tasks.`,complexity:`O(n)`,section:`Other Problems`,example:`import heapq
from collections import Counter

def least_interval(tasks, n):
    counts = Counter(tasks)
    heap = [-c for c in counts.values()]  # Max-heap
    heapq.heapify(heap)

    time = 0
    while heap:
        temp = []
        for _ in range(n + 1):  # One cycle
            if heap:
                count = heapq.heappop(heap)
                if count + 1 < 0:  # More of this task left
                    temp.append(count + 1)
            time += 1

            if not heap and not temp:
                break

        for c in temp:
            heapq.heappush(heap, c)

    return time

# Example: tasks = ["A","A","A","B","B","B"], n = 2
# Output: 8
# Sequence: A -> B -> idle -> A -> B -> idle -> A -> B`},{signature:`Reorganize String`,description:`Arrange string so no two adjacent chars are same. Use max-heap.`,complexity:`O(n log k)`,section:`Other Problems`,example:`import heapq
from collections import Counter

def reorganize_string(s):
    counts = Counter(s)

    # Check if possible
    max_count = max(counts.values())
    if max_count > (len(s) + 1) // 2:
        return ""

    # Max-heap
    heap = [(-c, ch) for ch, c in counts.items()]
    heapq.heapify(heap)

    result = []
    prev_count, prev_char = 0, ''

    while heap:
        count, char = heapq.heappop(heap)
        result.append(char)

        # Push back previous char if count remains
        if prev_count < 0:
            heapq.heappush(heap, (prev_count, prev_char))

        prev_count = count + 1  # Used one
        prev_char = char

    return ''.join(result)

# Example: "aab" -> "aba"
# Example: "aaab" -> "" (impossible)`},{signature:`Meeting Rooms II`,description:`Find minimum meeting rooms needed. Use min-heap for end times.`,complexity:`O(n log n)`,section:`Other Problems`,example:`import heapq

def min_meeting_rooms(intervals):
    if not intervals:
        return 0

    # Sort by start time
    intervals.sort(key=lambda x: x[0])

    # Min-heap of end times
    heap = []

    for start, end in intervals:
        # If earliest ending meeting is done, reuse room
        if heap and heap[0] <= start:
            heapq.heappop(heap)

        # Allocate room (add end time)
        heapq.heappush(heap, end)

    return len(heap)  # Number of rooms in use

# Example: [[0,30],[5,10],[15,20]]
# Output: 2
# Room 1: [0,30]
# Room 2: [5,10], [15,20]`}],T=[...C,...w],E=[{section:`Why & When`,signature:`Why use Trie?`,description:`Prefix tree for efficient string operations. O(L) search/insert where L = word length. Use for: autocomplete, spell check, word games.`,complexity:`Concept`,example:`# TRIE = Prefix Tree
# Tree where each node represents a character
# Path from root = prefix of words

#           root
#          /    \\
#         a      b
#        /      / \\
#       p      a   e
#      / \\     |   |
#     p   t   t   e*
#    /         |
#   l          *
#   |
#   e*

# Words: apple, apt, bat, bee
# * = end of word marker

# USE CASES:
# - Autocomplete / Type-ahead
# - Spell checker
# - IP routing (longest prefix match)
# - Word games (Boggle, Scrabble)
# - Search engines
# - Storing dictionaries

# COMPLEXITY:
# Insert: O(L) where L = word length
# Search: O(L)
# Prefix search: O(P) where P = prefix length
# Space: O(N * L * alphabet_size) worst case`},{section:`Why & When`,signature:`Trie vs Hash Table`,description:`Trie for prefix operations, hash for exact match. Different trade-offs.`,complexity:`Concept`,example:`# TRIE vs HASH TABLE

# Operation           Trie          HashMap
# ────────────────────────────────────────────
# Insert             O(L)          O(L) avg
# Search exact       O(L)          O(L) avg
# Search prefix      O(P)          O(N*L)
# Autocomplete       O(P+K)        O(N*L)
# Space              O(N*L*26)     O(N*L)
# Sorted iteration   Yes           No

# USE TRIE WHEN:
# - Need prefix matching
# - Autocomplete features
# - Many common prefixes (saves space)
# - Need sorted traversal

# USE HASH TABLE WHEN:
# - Only exact matching
# - Random access by key
# - Space is critical
# - Simple implementation needed

# COMMON TRIE OPTIMIZATIONS:
# - Compressed trie (radix tree): merge single-child nodes
# - Array vs HashMap for children
# - Use bit manipulation for alphabet`},{section:`Basic Implementation`,signature:`Trie Node Structure`,description:`Each node has children map and end-of-word flag.`,complexity:`O(1)`,example:`class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end = False

# Alternative: Array-based (faster but more memory)
class TrieNodeArray:
    def __init__(self):
        self.children = [None] * 26  # a-z only
        self.is_end = False

    def get_child(self, char):
        return self.children[ord(char) - ord('a')]

    def set_child(self, char, node):
        self.children[ord(char) - ord('a')] = node

# With additional data
class TrieNodeWithCount:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0       # Words passing through
        self.word_count = 0  # Words ending here`},{section:`Basic Implementation`,signature:`Basic Trie Operations`,description:`Insert, search, and startsWith. Core trie operations.`,complexity:`O(L)`,example:`class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        node = self._traverse(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._traverse(prefix) is not None

    def _traverse(self, s):
        node = self.root
        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

# Usage
trie = Trie()
trie.insert("apple")
trie.insert("app")
print(trie.search("apple"))    # True
print(trie.search("app"))      # True
print(trie.search("ap"))       # False
print(trie.startsWith("ap"))   # True`},{section:`Basic Implementation`,signature:`Delete from Trie`,description:`Remove word while keeping shared prefixes.`,complexity:`O(L)`,example:`class Trie:
    def __init__(self):
        self.root = TrieNode()

    def delete(self, word):
        self._delete(self.root, word, 0)

    def _delete(self, node, word, index):
        if index == len(word):
            if not node.is_end:
                return False  # Word doesn't exist
            node.is_end = False
            return len(node.children) == 0  # Can delete if no children

        char = word[index]
        if char not in node.children:
            return False

        child = node.children[char]
        should_delete = self._delete(child, word, index + 1)

        if should_delete:
            del node.children[char]
            return len(node.children) == 0 and not node.is_end

        return False

# Example:
# Trie has: ["apple", "app"]
# delete("apple") -> "app" remains
# delete("app") -> trie empty if no other words`}],D=[{section:`Advanced Operations`,signature:`Autocomplete`,description:`Find all words with given prefix. DFS from prefix node.`,complexity:`O(P + N)`,example:`class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def autocomplete(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return []
            node = node.children[char]

        # DFS to find all words from this node
        result = []
        self._dfs(node, prefix, result)
        return result

    def _dfs(self, node, prefix, result):
        if node.is_end:
            result.append(prefix)
        for char, child in node.children.items():
            self._dfs(child, prefix + char, result)

# Usage
trie = Trie()
for word in ["apple", "application", "apply", "apt", "bat"]:
    trie.insert(word)

print(trie.autocomplete("app"))
# Output: ["apple", "application", "apply"]

# Top K autocomplete (with frequency)
# Store frequency in node, use heap for top K`},{section:`Advanced Operations`,signature:`Count Words with Prefix`,description:`Count words starting with prefix. Store count in nodes.`,complexity:`O(P)`,example:`class TrieWithCount:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.count = getattr(node, 'count', 0) + 1
        node.is_end = True

    def count_prefix(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.count

    def count_exact(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return 0
            node = node.children[char]
        return 1 if node.is_end else 0

# Usage
trie = TrieWithCount()
trie.insert("apple")
trie.insert("application")
trie.insert("apply")

print(trie.count_prefix("app"))  # 3
print(trie.count_prefix("appl")) # 2`},{section:`Advanced Operations`,signature:`Longest Common Prefix`,description:`Find longest prefix common to all words.`,complexity:`O(S)`,example:`def longest_common_prefix(words):
    if not words:
        return ""

    # Build trie
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    # Traverse until branch or end
    prefix = []
    node = root
    while len(node.children) == 1 and not node.is_end:
        char = next(iter(node.children))
        prefix.append(char)
        node = node.children[char]

    return ''.join(prefix)

# Alternative: horizontal scanning
def longest_common_prefix_scan(words):
    if not words:
        return ""

    prefix = words[0]
    for word in words[1:]:
        while not word.startswith(prefix):
            prefix = prefix[:-1]
            if not prefix:
                return ""
    return prefix

# Example: ["flower", "flow", "flight"]
# Output: "fl"`},{section:`Problems`,signature:`Word Search II (Boggle)`,description:`Find all words from dictionary in a board. Trie + DFS.`,complexity:`O(M*N*4^L)`,example:`def find_words(board, words):
    # Build trie from words
    root = TrieNode()
    for word in words:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.word = word  # Store word at end

    m, n = len(board), len(board[0])
    result = set()

    def dfs(i, j, node):
        char = board[i][j]
        if char not in node.children:
            return

        child = node.children[char]
        if hasattr(child, 'word'):
            result.add(child.word)
            del child.word  # Avoid duplicates

        # Mark as visited
        board[i][j] = '#'

        # Explore neighbors
        for di, dj in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ni, nj = i + di, j + dj
            if 0 <= ni < m and 0 <= nj < n and board[ni][nj] != '#':
                dfs(ni, nj, child)

        # Restore
        board[i][j] = char

        # Prune empty branches
        if not child.children:
            del node.children[char]

    for i in range(m):
        for j in range(n):
            dfs(i, j, root)

    return list(result)

# Example:
# board = [["o","a","a","n"],
#          ["e","t","a","e"],
#          ["i","h","k","r"],
#          ["i","f","l","v"]]
# words = ["oath","pea","eat","rain"]
# Output: ["oath","eat"]`},{section:`Problems`,signature:`Add and Search Word`,description:`Support wildcard search (.) in trie.`,complexity:`O(26^M) worst`,example:`class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word):
        return self._search(word, 0, self.root)

    def _search(self, word, index, node):
        if index == len(word):
            return node.is_end

        char = word[index]

        if char == '.':
            # Try all children
            for child in node.children.values():
                if self._search(word, index + 1, child):
                    return True
            return False
        else:
            if char not in node.children:
                return False
            return self._search(word, index + 1, node.children[char])

# Usage
wd = WordDictionary()
wd.addWord("bad")
wd.addWord("dad")
wd.addWord("mad")

print(wd.search("pad"))  # False
print(wd.search("bad"))  # True
print(wd.search(".ad"))  # True
print(wd.search("b.."))  # True`},{section:`Problems`,signature:`Replace Words (Root Dictionary)`,description:`Replace words with their shortest root prefix.`,complexity:`O(S)`,example:`def replace_words(dictionary, sentence):
    # Build trie from dictionary
    root = TrieNode()
    for word in dictionary:
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def find_root(word):
        node = root
        for i, char in enumerate(word):
            if char not in node.children:
                return word  # No root found
            node = node.children[char]
            if node.is_end:
                return word[:i+1]  # Return shortest root
        return word

    words = sentence.split()
    return ' '.join(find_root(word) for word in words)

# Example:
# dictionary = ["cat", "bat", "rat"]
# sentence = "the cattle was rattled by the battery"
# Output: "the cat was rat by the bat"

# Example:
# dictionary = ["a", "b", "c"]
# sentence = "aadsfasf absbs bbab cadsfabd"
# Output: "a]'a b c"`},{section:`Problems`,signature:`Map Sum Pairs`,description:`Sum values of all keys with given prefix.`,complexity:`O(P + K)`,example:`class MapSum:
    def __init__(self):
        self.root = TrieNode()
        self.map = {}  # Store previous values

    def insert(self, key, val):
        # Calculate delta if key exists
        delta = val - self.map.get(key, 0)
        self.map[key] = val

        # Update all prefix sums
        node = self.root
        node.sum = getattr(node, 'sum', 0) + delta
        for char in key:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.sum = getattr(node, 'sum', 0) + delta

    def sum_prefix(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.sum

# Usage
ms = MapSum()
ms.insert("apple", 3)
print(ms.sum_prefix("ap"))  # 3
ms.insert("app", 2)
print(ms.sum_prefix("ap"))  # 5
ms.insert("apple", 5)       # Update apple
print(ms.sum_prefix("ap"))  # 7 (5 + 2)`},{section:`Problems`,signature:`Palindrome Pairs`,description:`Find all pairs where concatenation is palindrome.`,complexity:`O(N * L²)`,example:`def palindrome_pairs(words):
    def is_palindrome(s):
        return s == s[::-1]

    # Build trie of reversed words
    root = TrieNode()
    for i, word in enumerate(words):
        node = root
        for char in reversed(word):
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.index = i

    result = []

    for i, word in enumerate(words):
        node = root
        for j, char in enumerate(word):
            # Check if remaining suffix is palindrome
            if hasattr(node, 'index') and node.index != i:
                if is_palindrome(word[j:]):
                    result.append([i, node.index])

            if char not in node.children:
                break
            node = node.children[char]
        else:
            # Finished traversing word, find remaining palindrome suffixes
            def dfs(node, path):
                if hasattr(node, 'index') and node.index != i:
                    if is_palindrome(path):
                        result.append([i, node.index])
                for c, child in node.children.items():
                    dfs(child, path + c)

            dfs(node, '')

    return result

# Example: ["abcd", "dcba", "lls", "s", "sssll"]
# Output: [[0,1], [1,0], [3,2], [2,4]]
# "abcd" + "dcba" = "abcddcba"
# "lls" + "s" = "llss" (not palindrome)
# "s" + "lls" = "slls" (palindrome)`}],O=[...E,...D],k=[{signature:`Why use Union Find?`,description:`Track disjoint sets efficiently. Near O(1) union and find with optimizations. Use for: connected components, cycle detection, Kruskal MST.`,complexity:`Concept`,section:`Why & When`,example:`# UNION FIND (Disjoint Set Union / DSU)
# Track which elements belong to which group

# USE CASES:
# - Connected components in graph
# - Cycle detection in undirected graph
# - Kruskal's MST algorithm
# - Friend circles / social networks
# - Image processing (connected pixels)
# - Percolation problems

# OPERATIONS:
# - find(x): Find representative of x's set
# - union(x, y): Merge sets containing x and y
# - connected(x, y): Check if x and y in same set

# COMPLEXITY:
# Without optimization: O(n) per operation
# With path compression: O(log n) amortized
# With both optimizations: O(α(n)) ≈ O(1) amortized
# α(n) = inverse Ackermann function, < 5 for practical n

# OPTIMIZATIONS:
# 1. Path Compression: flatten tree during find
# 2. Union by Rank/Size: attach smaller tree to larger`},{signature:`Union Find vs DFS/BFS`,description:`Union Find for dynamic connectivity. DFS/BFS for static graphs.`,complexity:`Concept`,section:`Why & When`,example:`# WHEN TO USE UNION FIND:
# - Many union/find operations
# - Need to track connected components over time
# - Don't need to traverse paths, just connectivity
# - Undirected graph problems

# WHEN TO USE DFS/BFS:
# - Need actual path between nodes
# - One-time connectivity check
# - Directed graphs
# - Need to explore neighbors

# EXAMPLES:
# Union Find:
# - "Are cities A and B connected after adding road?"
# - "How many connected components after each edge?"
# - "Is there a cycle if we add this edge?"

# DFS/BFS:
# - "What's the shortest path from A to B?"
# - "List all nodes reachable from A"
# - "Find all paths from A to B"`},{signature:`Basic Union Find`,description:`Simple implementation without optimizations. O(n) per operation.`,complexity:`O(n)`,section:`Basic Implementation`,example:`class UnionFindBasic:
    def __init__(self, n):
        # Each element is its own parent initially
        self.parent = list(range(n))

    def find(self, x):
        # Follow parent pointers until root
        while self.parent[x] != x:
            x = self.parent[x]
        return x

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# Problem: Trees can become very tall (like linked list)
# find() can take O(n) in worst case

# Example:
# union(0, 1), union(1, 2), union(2, 3)
# Tree: 3 <- 2 <- 1 <- 0
# find(0) needs to traverse all nodes`},{signature:`Path Compression`,description:`Flatten tree during find. Points all nodes directly to root.`,complexity:`O(log n) amortized`,section:`Basic Implementation`,example:`class UnionFindPathCompression:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, x):
        if self.parent[x] != x:
            # Recursively find root AND update parent
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            self.parent[root_x] = root_y

# Iterative path compression
def find_iterative(self, x):
    root = x
    while self.parent[root] != root:
        root = self.parent[root]

    # Second pass: point all nodes to root
    while self.parent[x] != root:
        next_x = self.parent[x]
        self.parent[x] = root
        x = next_x

    return root

# Before: 3 <- 2 <- 1 <- 0
# After find(0): all point to 3
#     3
#    /|\\
#   0 1 2`},{signature:`Union by Rank`,description:`Attach smaller tree under larger. Keeps trees balanced.`,complexity:`O(log n)`,section:`Basic Implementation`,example:`class UnionFindByRank:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n  # Height of tree

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False  # Already connected

        # Attach smaller tree under larger
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1

        return True

# Rank is upper bound on height
# With path compression, actual height may be less`},{signature:`Union by Size`,description:`Attach smaller set under larger. Track component sizes.`,complexity:`O(α(n)) ≈ O(1)`,section:`Basic Implementation`,example:`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n  # Number of components

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)

        if root_x == root_y:
            return False

        # Attach smaller to larger
        if self.size[root_x] < self.size[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x
        self.size[root_x] += self.size[root_y]
        self.count -= 1

        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

    def get_size(self, x):
        return self.size[self.find(x)]

    def get_count(self):
        return self.count

# Usage
uf = UnionFind(5)
uf.union(0, 1)
uf.union(2, 3)
print(uf.get_count())      # 3 components
print(uf.get_size(0))      # 2
print(uf.connected(0, 1))  # True
print(uf.connected(0, 2))  # False`}],A=[{signature:`Number of Connected Components`,description:`Count connected components in undirected graph.`,complexity:`O(n + e * α(n))`,section:`Problems`,example:`def count_components(n, edges):
    uf = UnionFind(n)

    for u, v in edges:
        uf.union(u, v)

    return uf.get_count()

# Alternative: count unique roots
def count_components_v2(n, edges):
    parent = list(range(n))

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v

    # Count unique roots
    return len(set(find(i) for i in range(n)))

# Example:
# n = 5, edges = [[0,1], [1,2], [3,4]]
# Components: {0,1,2}, {3,4}
# Output: 2`},{signature:`Graph Valid Tree`,description:`Check if edges form a valid tree. No cycles, fully connected.`,complexity:`O(n + e * α(n))`,section:`Problems`,example:`def valid_tree(n, edges):
    # Tree has exactly n-1 edges and no cycles
    if len(edges) != n - 1:
        return False

    uf = UnionFind(n)

    for u, v in edges:
        # If already connected, adding edge creates cycle
        if not uf.union(u, v):
            return False

    # Check if all connected (single component)
    return uf.get_count() == 1

# Alternative: DFS approach
def valid_tree_dfs(n, edges):
    if len(edges) != n - 1:
        return False

    # Build adjacency list
    adj = [[] for _ in range(n)]
    for u, v in edges:
        adj[u].append(v)
        adj[v].append(u)

    # DFS from node 0
    visited = set()

    def dfs(node, parent):
        visited.add(node)
        for neighbor in adj[node]:
            if neighbor == parent:
                continue
            if neighbor in visited:
                return False  # Cycle found
            if not dfs(neighbor, node):
                return False
        return True

    return dfs(0, -1) and len(visited) == n`},{signature:`Redundant Connection`,description:`Find edge that creates a cycle.`,complexity:`O(n * α(n))`,section:`Problems`,example:`def find_redundant_connection(edges):
    n = len(edges)
    uf = UnionFind(n + 1)  # 1-indexed

    for u, v in edges:
        if not uf.union(u, v):
            return [u, v]  # This edge creates cycle

    return []

# Example: [[1,2], [1,3], [2,3]]
# After [1,2]: {1,2}, {3}
# After [1,3]: {1,2,3}
# [2,3] would create cycle -> return [2,3]

# For directed graph (Redundant Connection II)
# More complex: need to handle two cases
# 1. Node has two parents
# 2. Cycle exists`},{signature:`Number of Islands II`,description:`Count islands after each land addition. Dynamic connectivity.`,complexity:`O(k * α(mn))`,section:`Problems`,example:`def num_islands_ii(m, n, positions):
    uf = {}
    result = []
    count = 0
    directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    def find(x):
        if uf[x] != x:
            uf[x] = find(uf[x])
        return uf[x]

    def union(x, y):
        nonlocal count
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            uf[root_x] = root_y
            count -= 1

    for r, c in positions:
        if (r, c) in uf:
            result.append(count)
            continue

        uf[(r, c)] = (r, c)
        count += 1

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (nr, nc) in uf:
                union((r, c), (nr, nc))

        result.append(count)

    return result

# Example:
# m = 3, n = 3
# positions = [[0,0], [0,1], [1,2], [2,1]]
# Output: [1, 1, 2, 3]`},{signature:`Accounts Merge`,description:`Merge accounts with common emails.`,complexity:`O(n * α(n))`,section:`Problems`,example:`def accounts_merge(accounts):
    from collections import defaultdict

    # Map email to first account index that has it
    email_to_id = {}
    # Map email to account name
    email_to_name = {}

    uf = UnionFind(len(accounts))

    for i, account in enumerate(accounts):
        name = account[0]
        for email in account[1:]:
            email_to_name[email] = name
            if email in email_to_id:
                uf.union(i, email_to_id[email])
            email_to_id[email] = i

    # Group emails by root account
    root_to_emails = defaultdict(list)
    for email, idx in email_to_id.items():
        root = uf.find(idx)
        root_to_emails[root].append(email)

    # Build result
    result = []
    for root, emails in root_to_emails.items():
        name = email_to_name[emails[0]]
        result.append([name] + sorted(emails))

    return result

# Example:
# accounts = [["John", "j1@mail.com", "j2@mail.com"],
#             ["John", "j3@mail.com"],
#             ["John", "j1@mail.com", "j4@mail.com"]]
# Output: [["John", "j1@mail.com", "j2@mail.com", "j4@mail.com"],
#          ["John", "j3@mail.com"]]`},{signature:`Longest Consecutive Sequence`,description:`Find longest consecutive sequence using Union Find.`,complexity:`O(n * α(n))`,section:`Problems`,example:`def longest_consecutive_uf(nums):
    if not nums:
        return 0

    num_to_idx = {num: i for i, num in enumerate(nums)}
    uf = UnionFind(len(nums))

    for num in nums:
        if num + 1 in num_to_idx:
            uf.union(num_to_idx[num], num_to_idx[num + 1])

    return max(uf.get_size(i) for i in range(len(nums)))

# Set-based approach (simpler, also O(n))
def longest_consecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # Only start from sequence beginning
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)

    return longest

# Example: [100, 4, 200, 1, 3, 2]
# Sequence: 1, 2, 3, 4 -> length 4`},{signature:`Evaluate Division`,description:`Given equations a/b=k, answer queries. Union Find with weights.`,complexity:`O((n+q) * α(n))`,section:`Problems`,example:`def calc_equation(equations, values, queries):
    # Weighted Union Find
    # weight[x] = x / parent[x]
    parent = {}
    weight = {}

    def find(x):
        if x not in parent:
            parent[x] = x
            weight[x] = 1.0
            return x

        if parent[x] != x:
            root = find(parent[x])
            weight[x] *= weight[parent[x]]
            parent[x] = root

        return parent[x]

    def union(x, y, val):
        root_x, root_y = find(x), find(y)
        if root_x != root_y:
            parent[root_x] = root_y
            # x / root_x = weight[x]
            # y / root_y = weight[y]
            # x / y = val
            # root_x / root_y = ?
            weight[root_x] = val * weight[y] / weight[x]

    # Build union find
    for (a, b), val in zip(equations, values):
        union(a, b, val)

    # Answer queries
    result = []
    for a, b in queries:
        if a not in parent or b not in parent:
            result.append(-1.0)
        elif find(a) != find(b):
            result.append(-1.0)
        else:
            result.append(weight[a] / weight[b])

    return result

# Example:
# equations = [["a","b"], ["b","c"]]
# values = [2.0, 3.0]
# queries = [["a","c"], ["b","a"]]
# Output: [6.0, 0.5]  (a/c = 2*3 = 6, b/a = 1/2)`}],j=[...k,...A],M=[{signature:`Why Matrix Operations?`,description:`2D arrays for grids, images, graphs. Common interview topic. Master traversal patterns.`,complexity:`Concept`,section:`Why & When`,example:`# MATRIX = 2D Array / Grid
# Rows x Columns

# USE CASES:
# - Game boards (chess, tic-tac-toe)
# - Image processing (pixels)
# - Graph adjacency matrix
# - Dynamic programming tables
# - Spreadsheets
# - Maps and grids

# BASIC ACCESS:
matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

rows = len(matrix)           # 3
cols = len(matrix[0])        # 3
element = matrix[1][2]       # 6 (row 1, col 2)

# COMMON PATTERNS:
# - Traversal (row by row, col by col, diagonal)
# - Rotation / Transpose
# - Spiral order
# - Search (binary, BFS/DFS)
# - Path finding
# - Island problems`},{signature:`Matrix Traversal Patterns`,description:`Row-major, column-major, diagonal, anti-diagonal traversals.`,complexity:`O(m*n)`,section:`Why & When`,example:`# ROW BY ROW (most common)
for i in range(rows):
    for j in range(cols):
        print(matrix[i][j])

# COLUMN BY COLUMN
for j in range(cols):
    for i in range(rows):
        print(matrix[i][j])

# MAIN DIAGONAL (top-left to bottom-right)
# Cells where i == j
for i in range(min(rows, cols)):
    print(matrix[i][i])

# ALL DIAGONALS (top-left to bottom-right)
# Each diagonal has constant i - j
for d in range(-cols + 1, rows):
    for i in range(rows):
        j = i - d
        if 0 <= j < cols:
            print(matrix[i][j])

# ANTI-DIAGONAL (top-right to bottom-left)
# Cells where i + j == constant
for i in range(min(rows, cols)):
    print(matrix[i][cols - 1 - i])

# ALL ANTI-DIAGONALS
for d in range(rows + cols - 1):
    for i in range(rows):
        j = d - i
        if 0 <= j < cols:
            print(matrix[i][j])`},{signature:`Create Matrix`,description:`Initialize matrix with default values. Avoid common pitfalls.`,complexity:`O(m*n)`,section:`Creation`,example:`# CORRECT: List comprehension (new list each row)
m, n = 3, 4
matrix = [[0] * n for _ in range(m)]

# WRONG: Shallow copy (all rows reference same list!)
matrix = [[0] * n] * m  # DON'T DO THIS!
matrix[0][0] = 1  # Changes ALL rows!

# With specific values
matrix = [[i * n + j for j in range(n)] for i in range(m)]
# [[0, 1, 2, 3],
#  [4, 5, 6, 7],
#  [8, 9, 10, 11]]

# Identity matrix
n = 3
identity = [[1 if i == j else 0 for j in range(n)] for i in range(n)]
# [[1, 0, 0],
#  [0, 1, 0],
#  [0, 0, 1]]

# From 1D array
arr = [1, 2, 3, 4, 5, 6]
rows, cols = 2, 3
matrix = [arr[i*cols:(i+1)*cols] for i in range(rows)]
# [[1, 2, 3],
#  [4, 5, 6]]

# Deep copy
import copy
matrix_copy = copy.deepcopy(matrix)
# Or: matrix_copy = [row[:] for row in matrix]`},{signature:`Transpose Matrix`,description:`Swap rows and columns. Element at [i][j] moves to [j][i].`,complexity:`O(m*n)`,section:`Transformation`,example:`def transpose(matrix):
    rows, cols = len(matrix), len(matrix[0])
    # Create new matrix with swapped dimensions
    return [[matrix[i][j] for i in range(rows)] for j in range(cols)]

# Using zip (elegant)
def transpose_zip(matrix):
    return [list(row) for row in zip(*matrix)]

# Example:
# [[1, 2, 3],     [[1, 4, 7],
#  [4, 5, 6],  ->  [2, 5, 8],
#  [7, 8, 9]]      [3, 6, 9]]

# In-place transpose (square matrix only)
def transpose_inplace(matrix):
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix`},{signature:`Rotate Matrix 90°`,description:`Rotate clockwise: transpose + reverse rows. Counter-clockwise: reverse rows + transpose.`,complexity:`O(n²)`,section:`Transformation`,example:`# CLOCKWISE 90°: Transpose then reverse each row
def rotate_clockwise(matrix):
    n = len(matrix)
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    # Reverse each row
    for row in matrix:
        row.reverse()
    return matrix

# Or: reverse columns then transpose
def rotate_clockwise_v2(matrix):
    return [list(row) for row in zip(*matrix[::-1])]

# COUNTER-CLOCKWISE 90°: Reverse each row then transpose
def rotate_counter_clockwise(matrix):
    n = len(matrix)
    # Reverse each row
    for row in matrix:
        row.reverse()
    # Transpose
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    return matrix

# Or: transpose then reverse columns
def rotate_counter_clockwise_v2(matrix):
    return [list(row)[::-1] for row in zip(*matrix)]

# Example clockwise:
# [[1, 2, 3],     [[7, 4, 1],
#  [4, 5, 6],  ->  [8, 5, 2],
#  [7, 8, 9]]      [9, 6, 3]]`},{signature:`Rotate 180°`,description:`Reverse row order then reverse each row. Or rotate 90° twice.`,complexity:`O(n²)`,section:`Transformation`,example:`def rotate_180(matrix):
    # Reverse row order, then reverse each row
    return [row[::-1] for row in matrix[::-1]]

# In-place
def rotate_180_inplace(matrix):
    n, m = len(matrix), len(matrix[0])
    for i in range(n // 2):
        matrix[i], matrix[n-1-i] = matrix[n-1-i], matrix[i]
    for row in matrix:
        row.reverse()
    if n % 2:  # Odd rows, reverse middle
        matrix[n//2].reverse()
    return matrix

# Example:
# [[1, 2, 3],     [[9, 8, 7],
#  [4, 5, 6],  ->  [6, 5, 4],
#  [7, 8, 9]]      [3, 2, 1]]`},{signature:`Flip Matrix`,description:`Flip horizontally (mirror) or vertically.`,complexity:`O(m*n)`,section:`Transformation`,example:`# HORIZONTAL FLIP (mirror left-right)
def flip_horizontal(matrix):
    return [row[::-1] for row in matrix]

# Example:
# [[1, 2, 3],     [[3, 2, 1],
#  [4, 5, 6],  ->  [6, 5, 4],
#  [7, 8, 9]]      [9, 8, 7]]

# VERTICAL FLIP (mirror top-bottom)
def flip_vertical(matrix):
    return matrix[::-1]

# Example:
# [[1, 2, 3],     [[7, 8, 9],
#  [4, 5, 6],  ->  [4, 5, 6],
#  [7, 8, 9]]      [1, 2, 3]]

# In-place horizontal flip
def flip_horizontal_inplace(matrix):
    for row in matrix:
        row.reverse()
    return matrix

# In-place vertical flip
def flip_vertical_inplace(matrix):
    n = len(matrix)
    for i in range(n // 2):
        matrix[i], matrix[n-1-i] = matrix[n-1-i], matrix[i]
    return matrix`}],N=[{signature:`Spiral Order Traversal`,description:`Traverse matrix in spiral order. Track boundaries.`,complexity:`O(m*n)`,section:`Spiral & Diagonal`,example:`def spiral_order(matrix):
    if not matrix:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for j in range(left, right + 1):
            result.append(matrix[top][j])
        top += 1

        # Down
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1

        # Left (check if rows remain)
        if top <= bottom:
            for j in range(right, left - 1, -1):
                result.append(matrix[bottom][j])
            bottom -= 1

        # Up (check if cols remain)
        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1

    return result

# Example:
# [[1, 2, 3],
#  [4, 5, 6],
#  [7, 8, 9]]
# Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]`},{signature:`Generate Spiral Matrix`,description:`Fill matrix with 1 to n² in spiral order.`,complexity:`O(n²)`,section:`Spiral & Diagonal`,example:`def generate_spiral(n):
    matrix = [[0] * n for _ in range(n)]
    num = 1
    top, bottom, left, right = 0, n - 1, 0, n - 1

    while top <= bottom and left <= right:
        # Right
        for j in range(left, right + 1):
            matrix[top][j] = num
            num += 1
        top += 1

        # Down
        for i in range(top, bottom + 1):
            matrix[i][right] = num
            num += 1
        right -= 1

        # Left
        if top <= bottom:
            for j in range(right, left - 1, -1):
                matrix[bottom][j] = num
                num += 1
            bottom -= 1

        # Up
        if left <= right:
            for i in range(bottom, top - 1, -1):
                matrix[i][left] = num
                num += 1
            left += 1

    return matrix

# Example: n = 3
# [[1, 2, 3],
#  [8, 9, 4],
#  [7, 6, 5]]`},{signature:`Diagonal Traversal`,description:`Traverse diagonals alternating direction.`,complexity:`O(m*n)`,section:`Spiral & Diagonal`,example:`def diagonal_traverse(matrix):
    if not matrix:
        return []

    m, n = len(matrix), len(matrix[0])
    result = []

    for d in range(m + n - 1):
        if d % 2 == 0:
            # Go up-right
            row = min(d, m - 1)
            col = d - row
            while row >= 0 and col < n:
                result.append(matrix[row][col])
                row -= 1
                col += 1
        else:
            # Go down-left
            col = min(d, n - 1)
            row = d - col
            while row < m and col >= 0:
                result.append(matrix[row][col])
                row += 1
                col -= 1

    return result

# Example:
# [[1, 2, 3],
#  [4, 5, 6],
#  [7, 8, 9]]
# Output: [1, 2, 4, 7, 5, 3, 6, 8, 9]

# Group by diagonals (same i-j)
def get_diagonals(matrix):
    from collections import defaultdict
    diagonals = defaultdict(list)
    for i in range(len(matrix)):
        for j in range(len(matrix[0])):
            diagonals[i - j].append(matrix[i][j])
    return diagonals`}],P=[{signature:`Search in Sorted Matrix`,description:`Search in row/col sorted matrix. Start from corner.`,complexity:`O(m + n)`,section:`Search`,example:`# Matrix where rows and cols are sorted
def search_matrix(matrix, target):
    if not matrix:
        return False

    m, n = len(matrix), len(matrix[0])
    # Start from top-right corner
    row, col = 0, n - 1

    while row < m and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Eliminate column
        else:
            row += 1  # Eliminate row

    return False

# Example:
# [[1,  4,  7, 11],
#  [2,  5,  8, 12],
#  [3,  6,  9, 16],
#  [10, 13, 14, 17]]
# target = 5 -> True
# Start at 11, too big -> go left to 7
# 7 > 5 -> go left to 4
# 4 < 5 -> go down to 5 -> found!

# Alternative: start from bottom-left
def search_matrix_bl(matrix, target):
    row, col = len(matrix) - 1, 0
    while row >= 0 and col < len(matrix[0]):
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            row -= 1
        else:
            col += 1
    return False`},{signature:`Binary Search in Matrix`,description:`Treat sorted matrix as 1D array for binary search.`,complexity:`O(log(m*n))`,section:`Search`,example:`# Matrix where each row is sorted AND
# first element of row > last element of previous row
def search_matrix_binary(matrix, target):
    if not matrix:
        return False

    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2
        # Convert 1D index to 2D
        row, col = mid // n, mid % n
        val = matrix[row][col]

        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False

# Example:
# [[1,  3,  5,  7],
#  [10, 11, 16, 20],
#  [23, 30, 34, 60]]
# target = 3 -> True
# Treat as [1,3,5,7,10,11,16,20,23,30,34,60]
# Binary search normally`}],F=[{signature:`Set Matrix Zeroes`,description:`If element is 0, set entire row and col to 0.`,complexity:`O(m*n) time, O(1) space`,section:`Set & Game of Life`,example:`def set_zeroes(matrix):
    m, n = len(matrix), len(matrix[0])

    # Use first row/col as markers
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Mark zeros in first row/col
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Set zeros based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row and col
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0

# Example:
# [[1, 1, 1],     [[1, 0, 1],
#  [1, 0, 1],  ->  [0, 0, 0],
#  [1, 1, 1]]      [1, 0, 1]]`},{signature:`Game of Life`,description:`Simulate Conway's Game of Life in-place using state encoding.`,complexity:`O(m*n)`,section:`Set & Game of Life`,example:`def game_of_life(board):
    # States: 0=dead, 1=live
    # Encode: 2=dead->live, 3=live->dead

    m, n = len(board), len(board[0])

    def count_neighbors(i, j):
        count = 0
        for di in [-1, 0, 1]:
            for dj in [-1, 0, 1]:
                if di == 0 and dj == 0:
                    continue
                ni, nj = i + di, j + dj
                if 0 <= ni < m and 0 <= nj < n:
                    # Count original live (1 or 3)
                    if board[ni][nj] in [1, 3]:
                        count += 1
        return count

    for i in range(m):
        for j in range(n):
            neighbors = count_neighbors(i, j)
            if board[i][j] == 1:
                # Live cell dies if < 2 or > 3 neighbors
                if neighbors < 2 or neighbors > 3:
                    board[i][j] = 3  # live -> dead
            else:
                # Dead cell lives if exactly 3 neighbors
                if neighbors == 3:
                    board[i][j] = 2  # dead -> live

    # Final update
    for i in range(m):
        for j in range(n):
            if board[i][j] == 2:
                board[i][j] = 1
            elif board[i][j] == 3:
                board[i][j] = 0

# Rules:
# Live + <2 neighbors -> dies (underpopulation)
# Live + 2-3 neighbors -> lives
# Live + >3 neighbors -> dies (overpopulation)
# Dead + 3 neighbors -> lives (reproduction)`}],I=[{signature:`Number of Islands`,description:`Count connected land regions using DFS/BFS.`,complexity:`O(m*n)`,section:`Islands`,example:`def num_islands(grid):
    if not grid:
        return 0

    m, n = len(grid), len(grid[0])
    count = 0

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n:
            return
        if grid[i][j] != '1':
            return

        grid[i][j] = '#'  # Mark visited
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1

    return count

# BFS version
from collections import deque

def num_islands_bfs(grid):
    m, n = len(grid), len(grid[0])
    count = 0

    for i in range(m):
        for j in range(n):
            if grid[i][j] == '1':
                count += 1
                queue = deque([(i, j)])
                grid[i][j] = '#'

                while queue:
                    x, y = queue.popleft()
                    for dx, dy in [(1,0), (-1,0), (0,1), (0,-1)]:
                        nx, ny = x + dx, y + dy
                        if 0 <= nx < m and 0 <= ny < n and grid[nx][ny] == '1':
                            grid[nx][ny] = '#'
                            queue.append((nx, ny))

    return count`},{signature:`Max Area of Island`,description:`Find largest island by area.`,complexity:`O(m*n)`,section:`Islands`,example:`def max_area_of_island(grid):
    m, n = len(grid), len(grid[0])

    def dfs(i, j):
        if i < 0 or i >= m or j < 0 or j >= n:
            return 0
        if grid[i][j] != 1:
            return 0

        grid[i][j] = 0  # Mark visited
        return 1 + dfs(i+1, j) + dfs(i-1, j) + dfs(i, j+1) + dfs(i, j-1)

    max_area = 0
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                max_area = max(max_area, dfs(i, j))

    return max_area

# Example:
# [[0,0,1,0,0],
#  [0,0,1,0,0],
#  [0,1,1,1,0],
#  [0,0,1,0,0]]
# Max area = 5`}],L=[...N,...P,...F,...I],R=[...M,...L],z=[{signature:`Why use Bit Manipulation?`,description:`Extremely fast operations. O(1) for many tasks. Use for: flags, permissions, subsets, optimization.`,complexity:`Concept`,section:`Why & When`,example:`# BITS = Binary digits (0 or 1)
# Each bit position represents a power of 2

# NUMBER TO BINARY:
# 13 = 1101 in binary
#    = 1*8 + 1*4 + 0*2 + 1*1
#    = 8 + 4 + 1 = 13

# WHY USE BITS?
# - Extremely fast (CPU native operations)
# - Memory efficient (pack multiple flags in one int)
# - Elegant solutions for subsets

# USE CASES:
# - Flags and permissions (read/write/execute)
# - Subset enumeration
# - Finding unique elements
# - Optimization problems
# - Cryptography
# - Network masks

# PYTHON BIT LITERALS:
a = 0b1101   # Binary: 13
b = 0o17    # Octal: 15
c = 0xF     # Hex: 15

# Convert to binary string
bin(13)     # '0b1101'
bin(13)[2:] # '1101'`},{signature:`Bit Operators`,description:`AND, OR, XOR, NOT, shifts. Know these by heart.`,complexity:`O(1)`,section:`Why & When`,example:`# AND (&): Both bits must be 1
#   1101
# & 1010
# ------
#   1000

# OR (|): Either bit can be 1
#   1101
# | 1010
# ------
#   1111

# XOR (^): Bits must be different
#   1101
# ^ 1010
# ------
#   0111

# NOT (~): Flip all bits
# ~1101 = ...11110010 (two's complement)

# LEFT SHIFT (<<): Multiply by 2
# 0011 << 1 = 0110 (3 << 1 = 6)
# 0011 << 2 = 1100 (3 << 2 = 12)

# RIGHT SHIFT (>>): Divide by 2
# 1100 >> 1 = 0110 (12 >> 1 = 6)
# 1100 >> 2 = 0011 (12 >> 2 = 3)

# XOR PROPERTIES:
# a ^ a = 0
# a ^ 0 = a
# a ^ b ^ a = b (used to find unique element)`},{signature:`Get/Set/Clear Bit`,description:`Manipulate individual bits at position k.`,complexity:`O(1)`,section:`Basic Operations`,example:`# GET bit at position k (0-indexed from right)
def get_bit(n, k):
    return (n >> k) & 1

# Example: get_bit(13, 2) = get_bit(1101, 2) = 1

# SET bit at position k (make it 1)
def set_bit(n, k):
    return n | (1 << k)

# Example: set_bit(9, 2) = set_bit(1001, 2) = 1101 = 13

# CLEAR bit at position k (make it 0)
def clear_bit(n, k):
    return n & ~(1 << k)

# Example: clear_bit(13, 2) = clear_bit(1101, 2) = 1001 = 9

# TOGGLE bit at position k
def toggle_bit(n, k):
    return n ^ (1 << k)

# Example: toggle_bit(13, 2) = toggle_bit(1101, 2) = 1001 = 9
# Example: toggle_bit(9, 2) = toggle_bit(1001, 2) = 1101 = 13

# UPDATE bit at position k to value v
def update_bit(n, k, v):
    return (n & ~(1 << k)) | (v << k)`},{signature:`Check Power of 2`,description:`Power of 2 has exactly one bit set. Use n & (n-1).`,complexity:`O(1)`,section:`Basic Operations`,example:`def is_power_of_two(n):
    # Power of 2 has exactly one 1 bit
    # n & (n-1) clears the rightmost 1 bit
    # If result is 0, only one bit was set
    return n > 0 and (n & (n - 1)) == 0

# Why n & (n-1)?
# n   = 1000 (8)
# n-1 = 0111 (7)
# AND = 0000 (0) -> power of 2!

# n   = 1010 (10)
# n-1 = 1001 (9)
# AND = 1000 (8) -> not power of 2

# Also works for:
# Check if n is power of 4
def is_power_of_four(n):
    return n > 0 and (n & (n - 1)) == 0 and (n & 0xAAAAAAAA) == 0
    # 0xAAAAAAAA = 1010...1010 (all even positions)`},{signature:`Count Set Bits`,description:`Count number of 1 bits (population count). Multiple approaches.`,complexity:`O(k) or O(1)`,section:`Basic Operations`,example:`# Brian Kernighan's Algorithm - O(k) where k = number of 1s
def count_bits_kernighan(n):
    count = 0
    while n:
        n &= (n - 1)  # Clear rightmost 1 bit
        count += 1
    return count

# Example: 13 (1101)
# 1101 & 1100 = 1100 (count=1)
# 1100 & 1011 = 1000 (count=2)
# 1000 & 0111 = 0000 (count=3)

# Using built-in
def count_bits_builtin(n):
    return bin(n).count('1')

# Python 3.10+
def count_bits_popcount(n):
    return n.bit_count()

# Count bits for all numbers 0 to n
def count_bits_range(n):
    # dp[i] = number of 1s in i
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

# Example: count_bits_range(5) = [0, 1, 1, 2, 1, 2]`},{signature:`Get/Clear Lowest Set Bit`,description:`Manipulate the rightmost 1 bit.`,complexity:`O(1)`,section:`Basic Operations`,example:`# Get lowest set bit (isolate rightmost 1)
def get_lowest_set_bit(n):
    return n & (-n)

# Why? Two's complement: -n = ~n + 1
# n  =  1010 (10)
# -n = 0110 (−10 in two's complement) = 0110
# Actually: -10 = ...11110110
# n & -n = ...00000010 = 2

# Clear lowest set bit
def clear_lowest_set_bit(n):
    return n & (n - 1)

# Example: clear_lowest_set_bit(12) = 12 & 11 = 1100 & 1011 = 1000 = 8

# Get all trailing zeros (position of lowest set bit)
def trailing_zeros(n):
    if n == 0:
        return -1
    count = 0
    while (n & 1) == 0:
        count += 1
        n >>= 1
    return count

# Or use: (n & -n).bit_length() - 1`}],B=[{signature:`Single Number (XOR)`,description:`Find unique element when others appear twice. XOR all elements.`,complexity:`O(n)`,section:`Finding Unique`,example:`# Every element appears twice except one
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# Why? XOR properties:
# a ^ a = 0
# a ^ 0 = a
# a ^ b ^ a = b

# Example: [4, 1, 2, 1, 2]
# 4 ^ 1 ^ 2 ^ 1 ^ 2
# = 4 ^ (1 ^ 1) ^ (2 ^ 2)
# = 4 ^ 0 ^ 0
# = 4

# Using reduce
from functools import reduce
def single_number_reduce(nums):
    return reduce(lambda x, y: x ^ y, nums)`},{signature:`Two Unique Numbers`,description:`Find two unique numbers when others appear twice.`,complexity:`O(n)`,section:`Finding Unique`,example:`def single_number_ii(nums):
    # XOR of all gives xor of the two unique numbers
    xor_all = 0
    for num in nums:
        xor_all ^= num

    # Find rightmost set bit (the two numbers differ here)
    diff_bit = xor_all & (-xor_all)

    # Partition into two groups based on this bit
    num1 = num2 = 0
    for num in nums:
        if num & diff_bit:
            num1 ^= num
        else:
            num2 ^= num

    return [num1, num2]

# Example: [1, 2, 1, 3, 2, 5]
# XOR all: 1^2^1^3^2^5 = 3^5 = 110^101 = 011 = 6
# Diff bit: 6 & -6 = 010 = 2
# Group with bit set: [2, 3, 2] -> XOR = 3
# Group without: [1, 1, 5] -> XOR = 5
# Result: [3, 5]`},{signature:`Number Appearing Once (Three Times)`,description:`Find number appearing once when others appear three times.`,complexity:`O(n)`,section:`Finding Unique`,example:`# Every element appears 3 times except one
def single_number_iii(nums):
    ones = twos = 0

    for num in nums:
        # ones holds bits that appeared 1 or 4 or 7... times
        # twos holds bits that appeared 2 or 5 or 8... times
        ones = (ones ^ num) & ~twos
        twos = (twos ^ num) & ~ones

    return ones

# Alternative: Count bits at each position
def single_number_iii_count(nums):
    result = 0
    for i in range(32):
        count = sum((num >> i) & 1 for num in nums)
        if count % 3:
            result |= (1 << i)

    # Handle negative numbers in Python
    if result >= 2**31:
        result -= 2**32

    return result

# Example: [2, 2, 3, 2]
# Bit 0: 0+0+1+0 = 1 (mod 3 = 1) -> set
# Bit 1: 1+1+1+1 = 4 (mod 3 = 1) -> set
# Result: 11 = 3`},{signature:`Subset Generation with Bits`,description:`Generate all subsets using bitmask. Each bit represents include/exclude.`,complexity:`O(2^n)`,section:`Subset Generation`,example:`def subsets_bitmask(nums):
    n = len(nums)
    result = []

    # Iterate through all 2^n masks
    for mask in range(1 << n):
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)

    return result

# Example: [1, 2, 3]
# mask=0 (000): []
# mask=1 (001): [1]
# mask=2 (010): [2]
# mask=3 (011): [1, 2]
# mask=4 (100): [3]
# mask=5 (101): [1, 3]
# mask=6 (110): [2, 3]
# mask=7 (111): [1, 2, 3]

# Iterate through all subsets of a given mask
def iterate_submasks(mask):
    submask = mask
    while submask:
        print(bin(submask))
        submask = (submask - 1) & mask
    print('0')  # Empty subset

# Example: iterate_submasks(0b101) prints: 101, 100, 001, 0`},{signature:`Bitmask DP`,description:`DP where state includes subset as bitmask. Common in TSP, assignment.`,complexity:`O(2^n * n)`,section:`Subset Generation`,example:`# Traveling Salesman Problem (TSP)
def tsp(dist):
    n = len(dist)
    # dp[mask][i] = min cost to visit cities in mask, ending at i
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]

    # Start at city 0
    dp[1][0] = 0

    for mask in range(1 << n):
        for last in range(n):
            if dp[mask][last] == INF:
                continue
            if not (mask & (1 << last)):
                continue

            # Try going to unvisited city
            for next_city in range(n):
                if mask & (1 << next_city):
                    continue
                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(
                    dp[new_mask][next_city],
                    dp[mask][last] + dist[last][next_city]
                )

    # Return to start
    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in range(n))

# Example: 4 cities with distances
# dist = [[0, 10, 15, 20],
#         [10, 0, 35, 25],
#         [15, 35, 0, 30],
#         [20, 25, 30, 0]]
# Output: 80 (0->1->3->2->0)`},{signature:`Swap Without Temp`,description:`Swap two numbers using XOR.`,complexity:`O(1)`,section:`Tricks`,example:`def swap(a, b):
    a = a ^ b
    b = a ^ b  # b = (a^b)^b = a
    a = a ^ b  # a = (a^b)^a = b
    return a, b

# Example: swap(5, 3)
# a = 5 ^ 3 = 6
# b = 6 ^ 3 = 5
# a = 6 ^ 5 = 3
# Result: (3, 5)

# In Python, this is cleaner:
a, b = b, a`},{signature:`Check if Two Numbers Have Opposite Signs`,description:`XOR of opposite signs is negative.`,complexity:`O(1)`,section:`Tricks`,example:`def opposite_signs(x, y):
    return (x ^ y) < 0

# Why? Sign bit:
# Positive: 0... (sign bit = 0)
# Negative: 1... (sign bit = 1)
# XOR of opposite signs: sign bit = 1 (negative)

# Example:
# 5 ^ -3 = negative -> opposite signs
# 5 ^ 3 = positive -> same sign
# -5 ^ -3 = positive -> same sign`},{signature:`Find Missing Number`,description:`Find missing number in array [0, n] using XOR.`,complexity:`O(n)`,section:`Tricks`,example:`def missing_number(nums):
    result = len(nums)  # Start with n
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result

# Why? XOR all indices [0, n-1] and all values
# Missing value won't get cancelled

# Example: [3, 0, 1]
# result = 3 (n)
# i=0: result ^= 0 ^ 3 = 0
# i=1: result ^= 1 ^ 0 = 1
# i=2: result ^= 2 ^ 1 = 2
# Answer: 2 (missing number)

# Alternative using sum
def missing_number_sum(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)`},{signature:`Reverse Bits`,description:`Reverse all bits in a 32-bit integer.`,complexity:`O(1)`,section:`Tricks`,example:`def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result

# Example: reverse_bits(0b00000010100101000001111010011100)
# Output:   0b00111001011110000010100101000000

# Optimized with byte lookup table
def reverse_bits_fast(n):
    # Swap adjacent bits
    n = ((n & 0x55555555) << 1) | ((n & 0xAAAAAAAA) >> 1)
    # Swap pairs
    n = ((n & 0x33333333) << 2) | ((n & 0xCCCCCCCC) >> 2)
    # Swap nibbles
    n = ((n & 0x0F0F0F0F) << 4) | ((n & 0xF0F0F0F0) >> 4)
    # Swap bytes
    n = ((n & 0x00FF00FF) << 8) | ((n & 0xFF00FF00) >> 8)
    # Swap halves
    n = ((n & 0x0000FFFF) << 16) | ((n & 0xFFFF0000) >> 16)
    return n`},{signature:`Add Without Plus`,description:`Add two numbers without using +. Use XOR and AND.`,complexity:`O(1)`,section:`Tricks`,example:`def add(a, b):
    # XOR = sum without carry
    # AND << 1 = carry
    while b:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a

# Example: add(5, 3)
# a=5 (101), b=3 (011)
# carry = (101 & 011) << 1 = 001 << 1 = 010
# a = 101 ^ 011 = 110, b = 010
# carry = (110 & 010) << 1 = 010 << 1 = 100
# a = 110 ^ 010 = 100, b = 100
# carry = (100 & 100) << 1 = 100 << 1 = 1000
# a = 100 ^ 100 = 000, b = 1000
# carry = (000 & 1000) << 1 = 0
# a = 000 ^ 1000 = 1000 = 8
# Result: 8

# Handle negative numbers (32-bit)
def add_with_negative(a, b):
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF

    while b:
        carry = ((a & b) << 1) & MASK
        a = (a ^ b) & MASK
        b = carry

    return a if a <= MAX else ~(a ^ MASK)`}],V=[...z,...B];var H=e();function U(e,i){return function(){let a=e.hasTabs&&e.basePath&&e.problemCategories?(0,H.jsx)(n,{basePath:e.basePath,problemCount:r(...e.problemCategories)}):void 0;return(0,H.jsx)(t,{type:e.type,badge:e.badge,color:e.color,description:e.description,intro:e.intro,methods:i,tabs:a})}}const W=U(i.arrays,p),G=U(i.linkedList,g),K=U(i.stackQueue,y),q=U(i.binaryTree,S),J=U(i.heap,T),Y=U(i.trie,O),X=U(i.unionFind,j),Z=U(i.matrix,R),Q=U(i.bitManipulation,V);export{W as ArraysPage,q as BinaryTreePage,Q as BitManipulationPage,J as HeapPage,G as LinkedListPage,Z as MatrixPage,K as StackQueuePage,Y as TriePage,X as UnionFindPage};
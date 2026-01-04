import type { Method } from '../../types'

// Why & When + Data Structure Operations
export const bigOBasicsMethods: Method[] = [
  // Why & When
  { signature: 'What is Big O?', description: 'Big O is a method to categorize algorithms based on their time complexity or memory performance as input grows.', complexity: 'Concept', section: 'Why & When', example: `# BIG O NOTATION
# A way to describe algorithm efficiency as input scales

# THREE KEY CONCEPTS:

# 1. GROWTH WITH RESPECT TO INPUT
#    How does performance change as n increases?
def linear(arr):      # O(n) - grows linearly
    for x in arr:
        print(x)

def quadratic(arr):   # O(n²) - grows quadratically
    for x in arr:
        for y in arr:
            print(x, y)

# 2. CONSTANTS ARE DROPPED
#    O(2n) → O(n)
#    O(n/2) → O(n)
#    O(500) → O(1)
#    We care about growth rate, not exact count

# 3. WORST-CASE SCENARIO
#    Big O typically describes the worst case
#    Linear search: O(n) even though item might be first

# HOW TO QUICKLY DETERMINE BIG O:
# Look for loops iterating over input!
# - 1 loop over n elements → O(n)
# - 2 nested loops → O(n²)
# - Loop halving input → O(log n)
# - No loops, just math → O(1)` },
  { signature: 'Why understand Big O?', description: 'Big O describes how runtime/space grows with input size. Essential for writing efficient code and acing technical interviews.', complexity: 'Concept', section: 'Why & When', example: `# Big O = How does performance scale?
# O(1)     - Constant: same time regardless of input
# O(log n) - Logarithmic: halving input each step
# O(n)     - Linear: visit each element once
# O(n log n) - Linearithmic: efficient sorting
# O(n²)    - Quadratic: nested loops
# O(2^n)   - Exponential: doubles each step
# O(n!)    - Factorial: all permutations

# WHY IT MATTERS:
# n = 1,000,000
# O(n)   = 1,000,000 operations     (~1ms)
# O(n²)  = 1,000,000,000,000 ops    (~11 days!)
# O(log n) = 20 operations          (instant)` },
  { signature: 'Time vs Space Complexity', description: 'Time = operations performed. Space = memory used. Often trade one for the other. Know both for each algorithm.', complexity: 'Concept', section: 'Why & When', example: `# TIME COMPLEXITY: How many operations?
def find_sum(arr):        # O(n) time
    total = 0             # O(1) per iteration
    for x in arr:         # n iterations
        total += x
    return total

# SPACE COMPLEXITY: How much memory?
def double_all(arr):      # O(n) space
    result = []           # New array created
    for x in arr:         # Storing n elements
        result.append(x * 2)
    return result

def double_in_place(arr): # O(1) space
    for i in range(len(arr)):
        arr[i] *= 2       # Modifies existing array
    return arr

# TRADE-OFF EXAMPLE: Memoization
# Without: O(2^n) time, O(n) space (call stack)
# With:    O(n) time, O(n) space (cache)` },
  { signature: 'Common Complexities Ranked', description: 'From best to worst: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n) < O(n!). Memorize these!', complexity: 'Reference', section: 'Why & When', example: `# COMPLEXITY RANKING (best to worst)
#
# O(1)       Constant     Hash lookup, array access
# O(log n)   Logarithmic  Binary search
# O(n)       Linear       Single loop, linear search
# O(n log n) Linearithmic Merge sort, heap sort
# O(n²)      Quadratic    Nested loops, bubble sort
# O(n³)      Cubic        Triple nested loops
# O(2^n)     Exponential  Recursive fibonacci, subsets
# O(n!)      Factorial    Permutations

# PRACTICAL LIMITS (1 second):
# O(n)       n ≤ 10^8
# O(n log n) n ≤ 10^6
# O(n²)      n ≤ 10^4
# O(n³)      n ≤ 500
# O(2^n)     n ≤ 20
# O(n!)      n ≤ 10` },

  // Data Structure Operations
  { signature: 'Array/List Operations', description: 'Access O(1), Search O(n), Insert/Delete at end O(1), Insert/Delete elsewhere O(n).', complexity: 'Reference', section: 'Data Structure Operations', example: `# PYTHON LIST (Dynamic Array)
#
# Access by index    O(1)    arr[i]
# Search             O(n)    x in arr
# Append (end)       O(1)*   arr.append(x)  *amortized
# Pop (end)          O(1)    arr.pop()
# Insert (middle)    O(n)    arr.insert(i, x)
# Delete (middle)    O(n)    arr.pop(i), del arr[i]
# Slice              O(k)    arr[i:j]

# WHEN TO USE:
# - Need index access: YES
# - Frequent insertions at start: NO (use deque)
# - Frequent lookups: NO (use set/dict)

# Example: Why insert at start is slow
arr = [1, 2, 3, 4, 5]
arr.insert(0, 0)  # Shifts ALL elements right - O(n)` },
  { signature: 'Hash Table Operations', description: 'Dict/Set: Average O(1) for get/set/delete/contains. Worst case O(n) with many collisions.', complexity: 'Reference', section: 'Data Structure Operations', example: `# PYTHON DICT / SET (Hash Table)
#
# Get/Set/Delete     O(1) avg    d[key], d[key]=val
# Contains (in)      O(1) avg    key in d
# Iteration          O(n)        for k in d
# Keys/Values/Items  O(1)        d.keys() - view object

# WHY O(1)? Hash function maps key to index
# WHEN O(n)? Many hash collisions (rare)

# DICT vs SET
d = {'a': 1, 'b': 2}    # Key-value pairs
s = {'a', 'b', 'c'}     # Just keys (unique values)

# WHEN TO USE:
# - Fast lookups by key: dict
# - Check membership: set
# - Count occurrences: Counter

from collections import Counter
counts = Counter([1, 2, 2, 3, 3, 3])
# Counter({3: 3, 2: 2, 1: 1}) - O(n) to build, O(1) to query` },
  { signature: 'Stack & Queue Operations', description: 'Stack (LIFO): push/pop O(1). Queue (FIFO): enqueue/dequeue O(1) with deque.', complexity: 'Reference', section: 'Data Structure Operations', example: `# STACK (Last In, First Out)
# Use Python list as stack
stack = []
stack.append(1)   # Push - O(1)
stack.append(2)
stack.pop()       # Pop - O(1) returns 2
stack[-1]         # Peek - O(1)

# QUEUE (First In, First Out)
# DON'T use list (pop(0) is O(n))
# USE collections.deque

from collections import deque
queue = deque()
queue.append(1)      # Enqueue right - O(1)
queue.append(2)
queue.popleft()      # Dequeue left - O(1) returns 1

# DEQUE OPERATIONS (all O(1))
# appendleft(), append()
# popleft(), pop()
# [0], [-1] for peek` },
  { signature: 'Heap Operations', description: 'Insert O(log n), Extract min/max O(log n), Peek O(1), Heapify O(n).', complexity: 'Reference', section: 'Data Structure Operations', example: `# PYTHON HEAP (heapq - min heap)
import heapq

# Build heap from list - O(n)
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)     # [1, 1, 4, 3, 5]

# Push - O(log n)
heapq.heappush(arr, 2)

# Pop min - O(log n)
smallest = heapq.heappop(arr)

# Peek min - O(1)
smallest = arr[0]

# Push and pop - O(log n)
heapq.heappushpop(arr, 6)

# MAX HEAP trick: negate values
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -3)
largest = -heapq.heappop(max_heap)  # 5

# nlargest/nsmallest - O(n log k)
heapq.nlargest(3, arr)
heapq.nsmallest(3, arr)` },
  { signature: 'Binary Search Tree Operations', description: 'Search/Insert/Delete: O(log n) average, O(n) worst (unbalanced). BST keeps elements sorted.', complexity: 'Reference', section: 'Data Structure Operations', example: `# BINARY SEARCH TREE
# Average case (balanced): O(log n)
# Worst case (skewed):     O(n)
#
# Search     O(log n) avg
# Insert     O(log n) avg
# Delete     O(log n) avg
# Min/Max    O(log n)
# In-order   O(n)

# Python doesn't have built-in BST
# Use: sortedcontainers.SortedList

# WHY BST?
# - Sorted iteration
# - Range queries
# - Floor/ceiling operations

# Self-balancing BSTs (always O(log n)):
# - Red-Black Tree
# - AVL Tree
# - B-Tree

# In competitive programming, often use:
from bisect import bisect_left, bisect_right, insort
arr = [1, 3, 5, 7]
insort(arr, 4)        # [1, 3, 4, 5, 7] - O(n) insert
bisect_left(arr, 4)   # 2 - O(log n) search` },
  { signature: 'Linked List Operations', description: 'Access O(n), Insert/Delete at known position O(1), Search O(n). Good for frequent insert/delete.', complexity: 'Reference', section: 'Data Structure Operations', example: `# LINKED LIST (singly linked)
#
# Access by index    O(n)    must traverse
# Search             O(n)    must traverse
# Insert at head     O(1)    change one pointer
# Insert at tail     O(1)*   *if we track tail
# Insert at middle   O(1)*   *if we have the node
# Delete             O(1)*   *if we have prev node

# Finding the node is O(n), but actual insert is O(1)

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Insert after node - O(1)
def insert_after(node, val):
    new_node = ListNode(val)
    new_node.next = node.next
    node.next = new_node

# WHEN TO USE:
# - Frequent insert/delete (not by index)
# - Don't need random access
# - Memory-efficient for sparse data

# collections.deque is doubly-linked in Python` },
]

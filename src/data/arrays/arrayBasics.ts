import type { Method } from '../../types'

export const arrayBasicsMethods: Method[] = [
  // Why & When
  {
    signature: 'Why use Arrays?',
    description: 'Contiguous memory = O(1) random access. Foundation of all data structures. Use when: need index access, iteration, or building other structures.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# ARRAY = Contiguous block of memory
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
# Search:     O(n) unsorted, O(log n) sorted`
  },
  {
    signature: 'Arrays vs Linked Lists',
    description: 'Arrays: O(1) access, O(n) insert. Linked Lists: O(n) access, O(1) insert at known position. Choose based on operation frequency.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# ARRAYS vs LINKED LISTS
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
# - Implementing stacks/queues`
  },
  {
    signature: 'When to sort arrays?',
    description: 'Sorting unlocks O(log n) search, two pointers, greedy algorithms. Spend O(n log n) to enable faster operations.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# SORTING TRANSFORMS PROBLEMS:

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
people.sort(key=lambda x: (-x[0], x[1]))  # Height desc, k asc`
  },
  // Overview - Key Insight
  {
    signature: 'Arrays vs Strings: Key Difference',
    description: 'Arrays are mutable (fast end ops). Strings are immutable (every change copies all characters). See Big O page for full comparison table.',
    complexity: 'Reference',
    section: 'Overview',
    example: `# ARRAYS: Mutable - O(1) for end operations
arr = [1, 2, 3]
arr.append(4)      # Just fills next slot = O(1)
arr.pop()          # Removes last = O(1)

# STRINGS: Immutable - O(n) for any change
s = "hello"
s += "!"           # Creates NEW string "hello!" = O(n)
# Must copy all n characters to new memory

# Rule of thumb:
# - Need to modify? Use list, then ''.join()
# - Read-only? String is fine`
  },
  // What is an Array
  {
    signature: 'What is an Array?',
    description: 'A collection of elements stored at contiguous memory locations. Each element accessed directly using an index, making arrays highly efficient for random access.',
    complexity: 'Concept',
    section: 'Fundamentals',
    example: `# Using Python lists (dynamic arrays)
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
# - O(1) Access Time: Direct access to any element by index`
  },
  {
    signature: 'Accessing Elements',
    description: 'Elements accessed using their index (position). Python uses zero-based indexing. Supports positive indices, negative indices, and slicing.',
    complexity: 'O(1)',
    section: 'Fundamentals',
    example: `arr = [10, 20, 30, 40, 50]

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
# Slicing: O(k) where k is slice size`
  },
  {
    signature: 'Capacity vs Length',
    description: 'Length = number of elements stored. Capacity = total space allocated. Python lists manage capacity automatically, growing when needed.',
    complexity: 'Concept',
    section: 'Fundamentals',
    example: `import sys

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
# Length: 2, Capacity: 5`
  },
]

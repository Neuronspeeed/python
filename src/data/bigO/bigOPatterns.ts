import type { Method } from '../../types'

// Sorting Algorithms, Graph Algorithms, Common Patterns
export const bigOPatternsMethods: Method[] = [
  // Sorting Algorithms
  { signature: 'Sorting Algorithm Comparison', description: 'Quick/Merge/Heap sort: O(n log n). Python sorted() uses Timsort - O(n log n) adaptive.', complexity: 'Reference', section: 'Sorting Algorithms', example: `# SORTING ALGORITHMS COMPARISON
#
# Algorithm      Time (avg)   Time (worst)  Space   Stable
# ─────────────────────────────────────────────────────────
# Bubble Sort    O(n²)        O(n²)         O(1)    Yes
# Selection Sort O(n²)        O(n²)         O(1)    No
# Insertion Sort O(n²)        O(n²)         O(1)    Yes
# Merge Sort     O(n log n)   O(n log n)    O(n)    Yes
# Quick Sort     O(n log n)   O(n²)         O(log n) No
# Heap Sort      O(n log n)   O(n log n)    O(1)    No
# Counting Sort  O(n + k)     O(n + k)      O(k)    Yes
# Radix Sort     O(nk)        O(nk)         O(n+k)  Yes
# Timsort        O(n log n)   O(n log n)    O(n)    Yes

# PYTHON'S sorted() uses TIMSORT
# - Hybrid of merge sort and insertion sort
# - O(n) for nearly sorted data
# - Always use built-in unless you need custom

arr = [3, 1, 4, 1, 5]
sorted(arr)           # Returns new list
arr.sort()            # Sorts in place` },
  { signature: 'When to Use Which Sort', description: 'Small n or nearly sorted: Insertion. General purpose: Timsort (built-in). Integer range: Counting/Radix.', complexity: 'Reference', section: 'Sorting Algorithms', example: `# CHOOSING A SORTING ALGORITHM
#
# USE BUILT-IN sorted() FOR:
# - General purpose sorting
# - Custom key functions
# - Stability requirements

# INSERTION SORT (O(n²)) WHEN:
# - Very small arrays (n < 20)
# - Nearly sorted data (O(n) best case)
# - Online sorting (streaming data)

# COUNTING SORT (O(n + k)) WHEN:
# - Integers in small range [0, k]
# - k is not much larger than n
def counting_sort(arr, k):
    count = [0] * (k + 1)
    for x in arr:
        count[x] += 1
    result = []
    for i, c in enumerate(count):
        result.extend([i] * c)
    return result

# BUCKET SORT WHEN:
# - Uniformly distributed data
# - Can use O(n) extra space

# HEAP SORT WHEN:
# - Need guaranteed O(n log n)
# - Limited extra space (O(1))
# - Don't need stability` },

  // Graph Algorithms
  { signature: 'Graph Algorithm Complexities', description: 'BFS/DFS: O(V+E). Dijkstra: O((V+E) log V). Floyd-Warshall: O(V³).', complexity: 'Reference', section: 'Graph Algorithms', example: `# GRAPH ALGORITHM COMPLEXITIES
# V = vertices, E = edges
#
# Algorithm           Time            Space
# ─────────────────────────────────────────────
# BFS                 O(V + E)        O(V)
# DFS                 O(V + E)        O(V)
# Dijkstra (heap)     O((V+E) log V)  O(V)
# Bellman-Ford        O(V * E)        O(V)
# Floyd-Warshall      O(V³)           O(V²)
# Topological Sort    O(V + E)        O(V)
# Kruskal (MST)       O(E log E)      O(V)
# Prim (MST)          O((V+E) log V)  O(V)
# Tarjan (SCC)        O(V + E)        O(V)

# WHEN TO USE:
# Shortest path (unweighted): BFS
# Shortest path (positive):   Dijkstra
# Shortest path (negative):   Bellman-Ford
# All pairs shortest:         Floyd-Warshall
# Minimum spanning tree:      Kruskal or Prim
# Cycle detection:            DFS
# Topological order:          Kahn's or DFS` },

  // Common Patterns
  { signature: 'Recognize O(1)', description: 'Hash lookups, array access by index, push/pop stack, arithmetic operations.', complexity: 'O(1)', section: 'Recognize Patterns', example: `# O(1) CONSTANT TIME OPERATIONS
# Same time regardless of input size

arr = [1, 2, 3, 4, 5]
d = {'a': 1, 'b': 2}
stack = [1, 2, 3]

# Array/list operations
arr[2]              # Index access
arr[-1]             # Last element
len(arr)            # Length (stored)

# Dict operations
d['a']              # Key lookup
d['c'] = 3          # Key insert
'a' in d            # Key check

# Stack operations
stack.append(4)     # Push
stack.pop()         # Pop

# Arithmetic
x = 5 + 3 * 2       # Math operations

# Comparison
x < y               # Compare` },
  { signature: 'Recognize O(log n)', description: 'Binary search, balanced tree operations, repeatedly halving input.', complexity: 'O(log n)', section: 'Recognize Patterns', example: `# O(log n) LOGARITHMIC TIME
# Halving the problem each step

# BINARY SEARCH
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:        # log n iterations
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# IDENTIFY O(log n):
# - Dividing by 2 each iteration
# - Binary search pattern
# - Balanced tree traversal
# - Exponentiation by squaring

# Examples:
# - bisect.bisect_left()
# - Finding power: x^n in O(log n)
# - Binary tree height in balanced tree` },
  { signature: 'Recognize O(n)', description: 'Single loop through input, linear search, building result array.', complexity: 'O(n)', section: 'Recognize Patterns', example: `# O(n) LINEAR TIME
# Visit each element once

# Single loop
def sum_array(arr):
    total = 0
    for x in arr:       # n iterations
        total += x
    return total

# Two pointers (still O(n))
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:  # At most n iterations total
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# IDENTIFY O(n):
# - Single for loop
# - While loop that visits each element once
# - Two pointers moving toward each other
# - Building a result of size n` },
  { signature: 'Recognize O(n²)', description: 'Nested loops over input, comparing all pairs, bubble/selection/insertion sort.', complexity: 'O(n²)', section: 'Recognize Patterns', example: `# O(n²) QUADRATIC TIME
# Nested loops, all pairs

# Nested loops
def has_duplicate(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):  # n*(n-1)/2
            if arr[i] == arr[j]:
                return True
    return False

# Better approach: O(n) with set
def has_duplicate_better(arr):
    return len(arr) != len(set(arr))

# IDENTIFY O(n²):
# - Nested for loops over same data
# - Bubble sort, selection sort, insertion sort
# - Comparing all pairs
# - Building n x n matrix

# WARNING: n = 10,000 -> 100,000,000 operations
# At n > 10,000, O(n²) becomes too slow` },
  { signature: 'Amortized Analysis', description: 'Average cost over sequence of operations. List append is O(1) amortized despite occasional O(n) resizes.', complexity: 'Concept', section: 'Recognize Patterns', example: `# AMORTIZED ANALYSIS
# Average cost per operation over many operations

# LIST APPEND - O(1) AMORTIZED
# Python list doubles capacity when full
# Occasional O(n) resize, but rare

arr = []
for i in range(1000):
    arr.append(i)  # Usually O(1), sometimes O(n)
# Total: O(n), so O(1) per append on average

# WHY IT WORKS:
# Append 1: O(1)
# Append 2: O(1)
# Append 3: O(2) resize to 4
# Append 4: O(1)
# Append 5: O(4) resize to 8
# ...
# Total work: n + n/2 + n/4 + ... ≈ 2n = O(n)
# Per operation: O(n) / n = O(1) amortized

# OTHER AMORTIZED O(1):
# - Dynamic array append
# - Hash table operations (resizing)
# - Union-Find with path compression` },
]

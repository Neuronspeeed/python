import type { Method } from '../../types'

// Sorting Algorithms, Graph Algorithms, Common Patterns
export const bigOPatternsMethods: Method[] = [
  // Why & When
  { signature: 'When Big O matters - real-world thresholds', description: 'n < 100: don\'t care. n < 10,000: O(n²) ok. n < 1M: need O(n log n). n > 1M: need O(n). Hidden constants matter more than you think.', complexity: 'Concept', section: 'Why & When', example: `# BIG O IN PRACTICE - Real performance impact
import time

# SMALL INPUT (n < 100) - Algorithm doesn't matter
arr = list(range(100))
# O(n²) bubble sort: 0.001 seconds
# O(n log n) merge sort: 0.0005 seconds
# Difference: negligible! Use simpler code.

# MEDIUM INPUT (n = 10,000) - O(n²) becomes painful
arr = list(range(10000))
# O(n²): 5 seconds (100M operations)
# O(n log n): 0.01 seconds (130K operations)
# 500x difference! Use efficient algorithm.

# LARGE INPUT (n = 1,000,000) - Need O(n) or O(n log n)
arr = list(range(1000000))
# O(n²): days (won't finish!)
# O(n log n): 1 second
# O(n): 0.1 second

# REAL-WORLD THRESHOLDS:
# n < 10: Any algorithm works
# n < 100: O(n²) acceptable (insertion sort often fastest!)
# n < 10,000: O(n²) tolerable (<1 sec)
# n < 1,000,000: Need O(n log n) minimum
# n > 1,000,000: Prefer O(n), avoid O(n log n) if possible
# n > 100,000,000: Must be O(n) or better

# HIDDEN CONSTANTS MATTER:
# Fast O(n²): 500 * n²
# Slow O(n log n): 10000 * n log n
# At n = 100:
# O(n²): 500 * 10,000 = 5M ops
# O(n log n): 10000 * 664 = 6.6M ops
# O(n²) wins! (Better constant)

# When Big O doesn't matter:
# - Prototype/POC code
# - Known small input
# - One-time scripts
# - Clarity > performance

# When Big O critical:
# - Production code
# - User-facing features
# - Growing datasets
# - Real-time systems

# Rule: Optimize when:
# 1. Performance is measured problem
# 2. Input size is known large
# 3. Code runs frequently
# Otherwise, write clear code first!`,
  },
  { signature: 'Choosing between complexities - decision framework', description: 'O(1) impossible? Try O(log n) with sorting/BST. O(n) too slow? Try O(n) with hash table. O(n²) unavoidable? Limit input size.', complexity: 'Concept', section: 'Why & When', example: `# ALGORITHM DECISION TREE

# GOAL: Find if pair sums to target
arr = [2, 7, 11, 15]
target = 9

# APPROACH 1: O(n²) - Brute force
def two_sum_n2(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
# When: n < 1000, simplest to understand

# APPROACH 2: O(n log n) - Sort + two pointers
def two_sum_nlogn(arr, target):
    sorted_arr = sorted(enumerate(arr), key=lambda x: x[1])
    left, right = 0, len(arr) - 1
    while left < right:
        s = sorted_arr[left][1] + sorted_arr[right][1]
        if s == target:
            return [sorted_arr[left][0], sorted_arr[right][0]]
        elif s < target:
            left += 1
        else:
            right -= 1
# When: Input already sorted, or sorting has other benefits

# APPROACH 3: O(n) - Hash table (BEST!)
def two_sum_n(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
# When: n > 1000, space available

# COMPLEXITY UPGRADE PATH:
# 1. Start with O(n²) brute force (working code!)
# 2. Profile - is it actually slow?
# 3. If yes, optimize to O(n log n) with sorting
# 4. Still slow? Try O(n) with hash table
# 5. Still slow? Problem may be O(n) optimal

# COMMON OPTIMIZATIONS:
# O(n²) → O(n log n): Sort first
# O(n²) → O(n): Use hash table
# O(n log n) → O(n): Use counting/bucket sort
# O(n) → O(1): Precompute or use math

# Decision factors:
# 1. Input size (n)
# 2. Memory available
# 3. Code complexity budget
# 4. Performance requirements
# 5. Maintainability

# Example: Checking duplicates
# Small n (<1000): any works, pick simplest
# Medium n (<100k): sorted() then scan O(n log n)
# Large n (>100k): set() O(n) - 10x faster!

# Golden rule:
# Make it work → Make it right → Make it fast`,
  },
  { signature: 'Space vs Time tradeoffs - when to sacrifice what', description: 'Trading space for time: hash tables, memoization. Trading time for space: streaming, in-place. Modern bias: space is cheap, time is not.', complexity: 'Concept', section: 'Why & When', example: `# SPACE VS TIME TRADEOFFS

# PROBLEM: Find all duplicates in array
arr = [1, 2, 3, 2, 4, 3, 5]

# APPROACH 1: O(n²) time, O(1) space - Time is expensive
def find_dups_slow(arr):
    dups = []
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] == arr[j] and arr[i] not in dups:
                dups.append(arr[i])
    return dups
# Use when: VERY limited memory, n is small

# APPROACH 2: O(n) time, O(n) space - Space for speed
def find_dups_fast(arr):
    seen = set()
    dups = set()
    for x in arr:
        if x in seen:
            dups.add(x)
        seen.add(x)
    return list(dups)
# Use when: Modern systems (space cheap!)

# REAL TRADEOFFS:

# 1. MEMOIZATION - Space for time
def fib_slow(n):  # O(2^n) time, O(n) space (call stack)
    if n <= 1: return n
    return fib_slow(n-1) + fib_slow(n-2)

def fib_fast(n, memo={}):  # O(n) time, O(n) space
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_fast(n-1, memo) + fib_fast(n-2, memo)
    return memo[n]
# Space cost: ~8 bytes × n
# Time saved: Exponential → Linear!

# 2. STREAMING - Time for space
def sum_file_memory(path):  # O(n) time, O(n) space
    return sum(int(line) for line in open(path).readlines())

def sum_file_stream(path):  # O(n) time, O(1) space
    total = 0
    with open(path) as f:
        for line in f:
            total += int(line)
    return total
# Use streaming when: File > RAM

# 3. IN-PLACE ALGORITHMS - Time for space
def reverse_copy(arr):  # O(n) time, O(n) space
    return arr[::-1]

def reverse_inplace(arr):  # O(n) time, O(1) space
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
# Use in-place when: Memory constrained

# DECISION MATRIX:
# Desktop/server: Use space! (cheap)
# Mobile/embedded: Minimize space
# Real-time: Minimize time
# Batch processing: Either works

# Modern bias: SPACE IS CHEAP
# - 16GB RAM is standard
# - Disk is huge
# - User time is expensive
# → Optimize for time!

# When to save space:
# - Embedded systems (limited RAM)
# - Mobile apps (battery)
# - Processing > RAM data
# - Memory is bottleneck

# When to save time:
# - User-facing features
# - Real-time systems
# - Server costs (CPU > RAM)
# - Development speed

# Golden rule:
# Space cheap, time expensive → use space!`,
  },
  { signature: 'Hidden constants - why O(n) can lose to O(n log n)', description: 'Big O ignores constants. Merge sort (10n log n) beats linear scan (1000n) at n < 1000. Real performance = constant × complexity.', complexity: 'Concept', section: 'Why & When', example: `import time

# HIDDEN CONSTANTS IN ACTION

# EXAMPLE 1: "Fast" O(n²) vs "Slow" O(n log n)
# Insertion sort: 0.5 * n²
# Timsort: 100 * n log n

n = 100
# Insertion: 0.5 * 10000 = 5000 ops
# Timsort: 100 * 664 = 66400 ops
# Winner: Insertion sort! (13x faster)

n = 10000
# Insertion: 0.5 * 100M = 50M ops
# Timsort: 100 * 132877 = 13M ops
# Winner: Timsort (4x faster)

# CROSSOVER POINT: ~1000 elements
# That's why Python's sorted() uses insertion sort for small arrays!

# EXAMPLE 2: List vs Set membership
arr = list(range(1000))
s = set(arr)

# List search: O(n) with constant ~1
1000 in arr  # 1000 comparisons

# Set search: O(1) with constant ~10
1000 in s    # ~10 hash operations

# At n = 10:
# List: 10 ops, Set: 10 ops → Tie!
# At n = 100:
# List: 100 ops, Set: 10 ops → Set wins
# At n = 1M:
# List: 1M ops, Set: 10 ops → Set wins massively

# REAL CONSTANT FACTORS:

# HASH TABLE OPERATIONS: ~5-10 ops
# - Hash computation: 2-3 ops
# - Collision handling: 1-5 ops
# - Memory access: 1-2 ops

# BINARY SEARCH: ~log n comparisons
# But each comparison might be:
# - String compare: 10-100 ops per char
# - Custom object: arbitrary cost!

# SORTING:
# Quick sort: 1.5 * n log n (good constants)
# Merge sort: 2 * n log n (worse constants)
# Heap sort: 3 * n log n (worst constants)
# All O(n log n), but quick sort wins!

# MEASURING CONSTANTS:
def measure_constant():
    import timeit

    # O(n) list scan
    setup = "arr = list(range(1000))"
    time_n = timeit.timeit("999 in arr", setup=setup, number=10000)
    # time_n ≈ constant * 1000

    # Estimate constant
    constant = time_n / (1000 * 10000)
    print(f"List search constant: {constant * 1e9:.2f} ns/op")

# When constants matter:
# 1. Small input (n < 1000)
# 2. Performance-critical code
# 3. Real-time systems
# 4. Choosing between same complexity

# When to ignore constants:
# 1. Large input (n > 10000)
# 2. Prototyping
# 3. Different complexity classes
# 4. Readability matters

# Rule of thumb:
# Same Big O? Measure with real data.
# Different Big O? Big O wins (usually).`,
  },
  { signature: 'Recognizing complexity patterns - cheat sheet', description: 'Halving → log n. One loop → n. Nested loops → n². Recursion → tree depth. Master pattern recognition for instant analysis.', complexity: 'Concept', section: 'Why & When', example: `# PATTERN RECOGNITION CHEAT SHEET

# PATTERN 1: HALVING → O(log n)
def pattern_logn(n):
    while n > 1:
        n = n // 2  # Halving!
    # Iterations: log₂ n

# Variants:
# - Binary search
# - Binary tree height
# - Divide and conquer (one half)

# PATTERN 2: ONE LOOP → O(n)
def pattern_n(arr):
    for x in arr:  # n iterations
        process(x)

# Variants:
# - Two pointers (still O(n)!)
# - Multiple passes (O(2n) = O(n))
# - While loop visiting each element once

# PATTERN 3: NESTED LOOPS → O(n²)
def pattern_n2(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):  # n × n
            process(arr[i], arr[j])

# Variants:
# - All pairs: i, j in range(n)
# - Triangle: j in range(i+1, n) → still O(n²)!
# - 3 nested loops → O(n³)

# PATTERN 4: DIVIDE + CONQUER → O(n log n)
def pattern_nlogn(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = pattern_nlogn(arr[:mid])   # log n levels
    right = pattern_nlogn(arr[mid:])
    return merge(left, right)         # O(n) work per level
# Total: O(n) × log n levels = O(n log n)

# Examples: merge sort, quick sort, heap construction

# PATTERN 5: RECURSION TREE
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
# Tree depth: n
# Branching factor: 2
# Complexity: O(2ⁿ)

# PATTERN 6: NESTED LOOPS (DIFFERENT SIZES)
def pattern_mn(arr1, arr2):
    for x in arr1:       # m iterations
        for y in arr2:   # n iterations
            process(x, y)
# Complexity: O(m × n)

# PATTERN 7: SORTING FIRST
def pattern_sort_scan(arr):
    arr.sort()           # O(n log n)
    for x in arr:        # O(n)
        process(x)
# Total: O(n log n) + O(n) = O(n log n)
# Dominant term wins!

# COMMON MISTAKES:

# MISTAKE 1: Counting loops wrong
def tricky(n):
    for i in range(n):
        for j in range(i):  # Not O(n²)? YES IT IS!
            pass
# j goes: 0, 0-1, 0-2, ..., 0-(n-1)
# Total: 0+1+2+...+(n-1) = n(n-1)/2 = O(n²)

# MISTAKE 2: Hidden recursion
result = sorted(arr)  # O(n log n) hidden!

# MISTAKE 3: String operations
s = ""
for i in range(n):
    s += str(i)  # O(n) per concatenation!
# Total: O(n²) (string copy each time)

# QUICK REFERENCE:
# Halving: O(log n)
# One pass: O(n)
# Nested (same): O(n²)
# Sort + scan: O(n log n)
# Recursion: O(branches^depth)
# Hash lookup: O(1)
# All pairs: O(n²)

# Practice: Look at code, identify pattern!`,
  },

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

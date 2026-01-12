import type { Method } from '../../../types'

export const cheatsheetMethods: Method[] = [
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
]

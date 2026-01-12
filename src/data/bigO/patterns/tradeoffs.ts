import type { Method } from '../../../types'

export const tradeoffsMethods: Method[] = [
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
]

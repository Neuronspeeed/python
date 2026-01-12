import type { Method } from '../../../types'

export const itertoolsWhyAndWhenMethods: Method[] = [
  { signature: 'Why itertools?', description: 'Memory-efficient iterator algebra. Use when: combinatorics, infinite sequences, lazy evaluation, iterator chaining.', complexity: 'Concept', section: 'Why & When', example: `# ITERTOOLS = Iterator building blocks
# Core tools: permutations, combinations, product, chain, groupby

# USE CASES:
# 1. COMBINATORICS - permutations, combinations, cartesian product
# 2. INFINITE ITERATORS - count, cycle, repeat
# 3. TERMINATING ITERATORS - accumulate, chain, compress, groupby
# 4. LAZY EVALUATION - process data without loading into memory

# WHY itertools BEATS MANUAL LOOPS:
# Manual nested loops (verbose, O(n!) space)
def get_permutations(items):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i, item in enumerate(remaining):
            backtrack(path + [item], remaining[:i] + remaining[i+1:])
    backtrack([], items)
    return result

# itertools (one line, O(1) space per iteration)
from itertools import permutations
result = list(permutations(items))

# INTERVIEW PATTERNS:
# - All permutations: permutations(arr)
# - All combinations: combinations(arr, k)
# - Cartesian product: product(arr1, arr2)
# - Running sum: accumulate(arr)
# - Group consecutive: groupby(arr)

# WHEN TO USE:
# - Need all permutations/combinations
# - Cartesian product of multiple lists
# - Infinite sequences (count for IDs)
# - Lazy processing of large datasets
# - Iterator chaining/flattening

# WHEN NOT TO USE:
# - Need specific permutation (use algorithm)
# - Result must be random (itertools is deterministic)
# - Need to modify elements during iteration` },

  { signature: 'itertools vs manual loops', description: 'Built-in combinatorics are faster and cleaner. Use itertools unless you need custom logic.', complexity: 'Concept', section: 'Why & When', example: `# COMPARISON: itertools vs manual

# 1. PERMUTATIONS
# Manual (recursive backtracking - 15+ lines):
def permute(nums):
    result = []
    def backtrack(path, remaining):
        if not remaining:
            result.append(path[:])
            return
        for i in range(len(remaining)):
            backtrack(
                path + [remaining[i]],
                remaining[:i] + remaining[i+1:]
            )
    backtrack([], nums)
    return result

# itertools (one line):
from itertools import permutations
result = [list(p) for p in permutations(nums)]

# 2. COMBINATIONS
# Manual (complex recursion):
def combine(n, k):
    result = []
    def backtrack(start, path):
        if len(path) == k:
            result.append(path[:])
            return
        for i in range(start, n + 1):
            backtrack(i + 1, path + [i])
    backtrack(1, [])
    return result

# itertools (one line):
from itertools import combinations
result = [list(c) for c in combinations(range(1, n+1), k)]

# 3. CARTESIAN PRODUCT
# Manual (nested loops):
result = []
for a in list1:
    for b in list2:
        for c in list3:
            result.append((a, b, c))

# itertools (one line):
from itertools import product
result = list(product(list1, list2, list3))

# PERFORMANCE:
# itertools is implemented in C - much faster!
# Memory: itertools yields one at a time (lazy)
# Manual: often builds full list in memory

# INTERVIEW TIP:
# Know when interviewer wants algorithm vs library
# "Implement permutations" → write backtracking
# "Generate all permutations" → use itertools` },
]

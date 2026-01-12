import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
  { signature: 'Segment Tree vs BIT - when to use which', description: 'Segment Tree: range queries + range updates, any operation. BIT: simpler, faster, but only prefix sums. Choose based on query type and implementation comfort.', complexity: 'Concept', section: 'Why & When', example: `# SEGMENT TREE
# Use when: Range query + range update
# - Range sum, min, max, GCD
# - Range updates (add value to range)
# - Complex operations (custom merge)
# Complexity: O(log n) query/update
# Space: O(4n) = O(n)
# Implementation: ~100 lines (complex!)

# BINARY INDEXED TREE (BIT/Fenwick)
# Use when: Prefix sums + point updates
# - Range sum queries
# - Point updates (arr[i] += delta)
# - Simpler than segment tree
# Complexity: O(log n) query/update
# Space: O(n)
# Implementation: ~20 lines (simple!)

# DECISION TREE:
# Need range min/max/GCD? → Segment Tree
# Need range updates? → Segment Tree (with lazy prop)
# Only range sum + point update? → BIT (simpler!)
# 2D range queries? → 2D BIT or 2D Segment Tree

# WHEN NEITHER:
# - Prefix sum array: O(1) query, no updates
# - Sparse table: O(1) query, no updates, idempotent ops
# - sqrt decomposition: Simpler than seg tree, O(sqrt n)

# Example: Range sum with updates
# BIT code (20 lines):
class BIT:
    def __init__(self, n):
        self.tree = [0] * (n + 1)
    def update(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & (-i)
    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s

# Segment tree: ~100 lines for same functionality!
# Use BIT when possible (simpler debugging)`,
  },
  { signature: 'When segment tree is overkill', description: 'Static array? Use prefix sum. Rare updates? Recompute. Small n (<1000)? Brute force faster. Reserve segment tree for: frequent updates + queries + large n.', complexity: 'Concept', section: 'Why & When', example: `# SEGMENT TREE OVERHEAD:
# - Implementation: ~100-200 lines
# - Debugging: Hard (tree structure)
# - Space: 4n (significant for large n)
# - Constants: Hidden overhead

# USE SIMPLER ALTERNATIVES:

# STATIC ARRAY (no updates) → Prefix sum
arr = [1, 2, 3, 4, 5]
prefix = [0]
for x in arr:
    prefix.append(prefix[-1] + x)
# Range sum [L, R]: O(1)
def range_sum(L, R):
    return prefix[R+1] - prefix[L]

# RARE UPDATES → Just recompute
# If updates << queries
total = sum(arr)
def update(i, new_val):
    global total
    total += new_val - arr[i]
    arr[i] = new_val
# O(1) update, O(1) query for sum!

# SMALL N (<1000) → Brute force
def range_min(arr, L, R):
    return min(arr[L:R+1])  # O(n) but fast for small n

# SQRT DECOMPOSITION → Simpler than seg tree
# Split array into sqrt(n) blocks
# Query: O(sqrt n), Update: O(1)
# Easier to code and debug

# USE SEGMENT TREE WHEN:
# - Frequent queries AND updates
# - Large n (>10,000)
# - Complex range operations (min, GCD, etc.)
# - Can't use simpler alternatives

# AVOID when:
# - Static data (use prefix sum)
# - Rare updates (recompute)
# - Small n (brute force)
# - Only need sums (use BIT instead)`,
  },
]

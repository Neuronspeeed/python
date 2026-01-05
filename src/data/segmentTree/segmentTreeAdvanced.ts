import type { Method } from '../../types'

// Lazy Propagation, BIT/Fenwick Tree, Problems
export const segmentTreeAdvancedMethods: Method[] = [
  // Why & When
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

  // Lazy Propagation
  { signature: 'Lazy Propagation Concept', description: 'Defer range updates until needed. Enables O(log n) range updates.', complexity: 'O(log n)', section: 'Lazy Propagation', example: `# LAZY PROPAGATION
#
# Problem: Range updates are O(n) with basic segment tree
# Solution: Store pending updates, apply when needed
#
# Key idea:
# - Mark node with pending update
# - Don't propagate to children immediately
# - Push update down when we visit children
#
# USE CASES:
# - Range add: add value to all elements in range
# - Range set: set all elements in range to value
# - Any range update + range query combination
#
# LAZY ARRAY:
# lazy[node] = pending update for this subtree
#
# TWO OPERATIONS:
# 1. Push down: propagate lazy value to children
# 2. Update: apply lazy value to current node
#
# Example: Add 5 to range [0, 3]
# Instead of updating 4 nodes, mark root with lazy[1] = 5
# When querying, push lazy value down as needed` },

  { signature: 'Lazy Propagation Implementation', description: 'Segment tree with lazy propagation for range updates.', complexity: 'O(log n) update/query', section: 'Lazy Propagation', example: `class LazySegmentTree:
    """
    Segment Tree with Lazy Propagation.
    Supports range add and range sum query.
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2 * node, start, mid)
            self._build(nums, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _push_down(self, node, start, end):
        """Push lazy value to children."""
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            left_len = mid - start + 1
            right_len = end - mid

            # Update children
            self.tree[2 * node] += self.lazy[node] * left_len
            self.tree[2 * node + 1] += self.lazy[node] * right_len

            # Pass lazy to children
            self.lazy[2 * node] += self.lazy[node]
            self.lazy[2 * node + 1] += self.lazy[node]

            # Clear current lazy
            self.lazy[node] = 0

    def range_add(self, left, right, val):
        """Add val to all elements in [left, right]."""
        self._range_add(1, 0, self.n - 1, left, right, val)

    def _range_add(self, node, start, end, left, right, val):
        if right < start or end < left:
            return

        if left <= start and end <= right:
            # Completely covered - apply lazy
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return

        # Partial overlap - push down and recurse
        self._push_down(node, start, end)
        mid = (start + end) // 2
        self._range_add(2 * node, start, mid, left, right, val)
        self._range_add(2 * node + 1, mid + 1, end, left, right, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, left, right):
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        if right < start or end < left:
            return 0

        if left <= start and end <= right:
            return self.tree[node]

        self._push_down(node, start, end)
        mid = (start + end) // 2
        return (self._query(2 * node, start, mid, left, right) +
                self._query(2 * node + 1, mid + 1, end, left, right))` },

  // Binary Indexed Tree
  { signature: 'Binary Indexed Tree Concept', description: 'Also called Fenwick Tree. Simpler than segment tree, uses bit manipulation.', complexity: 'O(log n)', section: 'Fenwick Tree', example: `# BINARY INDEXED TREE (BIT) / FENWICK TREE
#
# Simpler alternative to segment tree for:
# - Prefix sum queries
# - Point updates
#
# Uses binary representation of index
# bit[i] stores sum of specific range based on lowest set bit
#
# Index (1-indexed)  Binary   Stores sum of
# -------------------------------------------------
# 1                  0001     [1, 1]
# 2                  0010     [1, 2]
# 3                  0011     [3, 3]
# 4                  0100     [1, 4]
# 5                  0101     [5, 5]
# 6                  0110     [5, 6]
# 7                  0111     [7, 7]
# 8                  1000     [1, 8]
#
# OPERATIONS:
# - lowbit(x) = x & (-x)  # Lowest set bit
# - Update: add to i, i + lowbit(i), i + lowbit(i + lowbit(i)), ...
# - Query: sum of i, i - lowbit(i), i - lowbit(i - lowbit(i)), ...
#
# COMPARISON TO SEGMENT TREE:
# - Simpler code (shorter)
# - Less memory (exactly n+1 elements)
# - Only works for prefix/range sum (not min/max)
# - Segment tree is more versatile` },

  { signature: 'BIT Implementation', description: 'Binary Indexed Tree for prefix sums and point updates.', complexity: 'O(log n)', section: 'Fenwick Tree', example: `class BinaryIndexedTree:
    """
    Binary Indexed Tree (Fenwick Tree).
    1-indexed for cleaner bit operations.
    """
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        """Add delta to index i (1-indexed)."""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add lowest set bit

    def prefix_sum(self, i):
        """Sum of [1, i] (1-indexed)."""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # Remove lowest set bit
        return total

    def range_sum(self, left, right):
        """Sum of [left, right] (1-indexed)."""
        return self.prefix_sum(right) - self.prefix_sum(left - 1)

# Build from array
def build_BIT(nums):
    n = len(nums)
    bit = BinaryIndexedTree(n)
    for i, num in enumerate(nums, 1):  # 1-indexed
        bit.update(i, num)
    return bit

# Example:
nums = [1, 3, 5, 7, 9]
bit = build_BIT(nums)
print(bit.prefix_sum(3))  # 1+3+5 = 9
print(bit.range_sum(2, 4))  # 3+5+7 = 15

bit.update(2, 2)  # Add 2 to index 2
print(bit.prefix_sum(3))  # 1+5+5 = 11` },

  { signature: 'BIT for Range Update, Point Query', description: 'Use difference array with BIT for range updates.', complexity: 'O(log n)', section: 'Fenwick Tree', example: `class BITRangeUpdate:
    """
    BIT for range updates and point queries.
    Uses difference array technique.
    """
    def __init__(self, n):
        self.bit = BinaryIndexedTree(n)

    def range_add(self, left, right, val):
        """Add val to all elements in [left, right]."""
        self.bit.update(left, val)
        if right + 1 <= self.bit.n:
            self.bit.update(right + 1, -val)

    def point_query(self, i):
        """Get value at index i."""
        return self.bit.prefix_sum(i)

# How it works:
# Difference array: diff[i] = arr[i] - arr[i-1]
# To add val to [L, R]:
#   diff[L] += val
#   diff[R+1] -= val
# To get arr[i]: sum of diff[1..i] = prefix sum

# Example:
# arr = [0, 0, 0, 0, 0]
# range_add(2, 4, 5)
# diff becomes: [0, 0, 5, 0, 0, -5]
# point_query(3) = prefix_sum(3) = 0 + 0 + 5 = 5 (correct)

# For range update AND range query, need TWO BITs
class BITRangeUpdateRangeQuery:
    def __init__(self, n):
        self.n = n
        self.B1 = BinaryIndexedTree(n)
        self.B2 = BinaryIndexedTree(n)

    def range_add(self, left, right, val):
        self.B1.update(left, val)
        self.B1.update(right + 1, -val)
        self.B2.update(left, val * (left - 1))
        self.B2.update(right + 1, -val * right)

    def prefix_sum(self, i):
        return self.B1.prefix_sum(i) * i - self.B2.prefix_sum(i)

    def range_sum(self, left, right):
        return self.prefix_sum(right) - self.prefix_sum(left - 1)` },

  // Problems
  { signature: 'Count Smaller After Self', description: 'LeetCode 315. Count elements smaller than each element to its right.', complexity: 'O(n log n)', section: 'Problems', example: `def count_smaller(nums):
    """
    LeetCode 315: Count of Smaller Numbers After Self.
    Use BIT to count inversions.
    """
    # Coordinate compression
    sorted_nums = sorted(set(nums))
    rank = {v: i + 1 for i, v in enumerate(sorted_nums)}

    n = len(sorted_nums)
    bit = BinaryIndexedTree(n)
    result = []

    # Process from right to left
    for num in reversed(nums):
        r = rank[num]
        # Count numbers smaller than current (already processed)
        count = bit.prefix_sum(r - 1)
        result.append(count)
        # Add current number to BIT
        bit.update(r, 1)

    return result[::-1]

# Example: nums = [5, 2, 6, 1]
# Process from right:
# 1: count(< 1) = 0, add 1
# 6: count(< 6) = 1, add 6
# 2: count(< 2) = 1, add 2
# 5: count(< 5) = 2, add 5
# Result: [2, 1, 1, 0]

# Alternative: Merge Sort approach
def count_smaller_mergesort(nums):
    def merge_count(arr):
        if len(arr) <= 1:
            return arr

        mid = len(arr) // 2
        left = merge_count(arr[:mid])
        right = merge_count(arr[mid:])

        result = []
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i][0] <= right[j][0]:
                result.append(left[i])
                i += 1
            else:
                # Count: all remaining left elements are greater
                for k in range(i, len(left)):
                    counts[left[k][1]] += len(right) - j
                result.append(right[j])
                j += 1

        result.extend(left[i:])
        result.extend(right[j:])
        return result

    counts = [0] * len(nums)
    indexed = [(num, i) for i, num in enumerate(nums)]
    merge_count(indexed)
    return counts` },

  { signature: 'Range Sum Query 2D - Mutable', description: 'LeetCode 308. 2D segment tree or 2D BIT.', complexity: 'O(log^2 n)', section: 'Problems', example: `class BIT2D:
    """
    2D Binary Indexed Tree.
    For 2D range sum queries with point updates.
    """
    def __init__(self, m, n):
        self.m = m
        self.n = n
        self.tree = [[0] * (n + 1) for _ in range(m + 1)]

    def update(self, row, col, delta):
        """Add delta to position (row, col)."""
        i = row + 1  # 1-indexed
        while i <= self.m:
            j = col + 1
            while j <= self.n:
                self.tree[i][j] += delta
                j += j & (-j)
            i += i & (-i)

    def prefix_sum(self, row, col):
        """Sum of rectangle [0,0] to [row,col]."""
        total = 0
        i = row + 1
        while i > 0:
            j = col + 1
            while j > 0:
                total += self.tree[i][j]
                j -= j & (-j)
            i -= i & (-i)
        return total

    def range_sum(self, r1, c1, r2, c2):
        """Sum of rectangle [r1,c1] to [r2,c2]."""
        return (self.prefix_sum(r2, c2) -
                self.prefix_sum(r2, c1 - 1) -
                self.prefix_sum(r1 - 1, c2) +
                self.prefix_sum(r1 - 1, c1 - 1))

class NumMatrix:
    """LeetCode 308 solution."""
    def __init__(self, matrix):
        m, n = len(matrix), len(matrix[0])
        self.matrix = [[0] * n for _ in range(m)]
        self.bit = BIT2D(m, n)

        for i in range(m):
            for j in range(n):
                self.update(i, j, matrix[i][j])

    def update(self, row, col, val):
        delta = val - self.matrix[row][col]
        self.matrix[row][col] = val
        self.bit.update(row, col, delta)

    def sumRegion(self, r1, c1, r2, c2):
        return self.bit.range_sum(r1, c1, r2, c2)` },

  { signature: 'Count Range Sum', description: 'LeetCode 327. Count range sums in [lower, upper]. Use merge sort or BIT.', complexity: 'O(n log n)', section: 'Problems', example: `def count_range_sum(nums, lower, upper):
    """
    LeetCode 327: Count of Range Sum.
    Count pairs (i,j) where lower <= sum(nums[i:j+1]) <= upper.
    """
    # Key insight: range sum = prefix[j+1] - prefix[i]
    # We want: lower <= prefix[j+1] - prefix[i] <= upper
    # Rearranged: prefix[j+1] - upper <= prefix[i] <= prefix[j+1] - lower

    from sortedcontainers import SortedList

    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    count = 0
    sorted_prefix = SortedList([0])  # Seen prefixes

    for j in range(1, len(prefix)):
        # Count valid i values
        # We need: prefix[j] - upper <= prefix[i] <= prefix[j] - lower
        lo = prefix[j] - upper
        hi = prefix[j] - lower

        # Count prefixes in [lo, hi]
        left_idx = sorted_prefix.bisect_left(lo)
        right_idx = sorted_prefix.bisect_right(hi)
        count += right_idx - left_idx

        # Add current prefix
        sorted_prefix.add(prefix[j])

    return count

# Merge sort approach (no external library)
def count_range_sum_merge(nums, lower, upper):
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)

    def merge_count(lo, hi):
        if lo >= hi:
            return 0

        mid = (lo + hi) // 2
        count = merge_count(lo, mid) + merge_count(mid + 1, hi)

        # Count cross-partition pairs
        j = k = mid + 1
        for i in range(lo, mid + 1):
            while j <= hi and prefix[j] - prefix[i] < lower:
                j += 1
            while k <= hi and prefix[k] - prefix[i] <= upper:
                k += 1
            count += k - j

        # Merge
        prefix[lo:hi+1] = sorted(prefix[lo:hi+1])
        return count

    return merge_count(0, len(prefix) - 1)` },
]

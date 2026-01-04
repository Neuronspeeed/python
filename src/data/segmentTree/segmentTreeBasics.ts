import type { Method } from '../../types'

// Why & When, Range Sum, Range Min/Max, Point Update
export const segmentTreeBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why Segment Tree?', description: 'Efficient range queries + point updates. Both in O(log n). Use when you need both operations frequently.', complexity: 'Concept', section: 'Why & When', example: `# SEGMENT TREE USE CASES
#
# When to use:
# 1. Range queries (sum, min, max, GCD, etc.)
# 2. Point updates (change single element)
# 3. Both operations are frequent
#
# Comparison with alternatives:
#
# Operation          Array    Prefix Sum   Segment Tree
# ------------------------------------------------------
# Build              O(n)     O(n)         O(n)
# Point Update       O(1)     O(n)         O(log n)
# Range Query        O(n)     O(1)         O(log n)
#
# USE SEGMENT TREE when:
# - Mix of updates AND queries
# - Need range operations (sum, min, max)
#
# DON'T USE when:
# - Only queries, no updates -> Prefix Sum
# - Only updates, no queries -> Simple Array
# - Only point queries -> Simple Array
#
# ADVANCED VARIANTS:
# - Lazy Propagation: Range updates O(log n)
# - Persistent: Keep history of all versions
# - 2D Segment Tree: 2D range queries` },

  { signature: 'Segment Tree Structure', description: 'Binary tree where leaves are array elements, internal nodes store aggregates of children.', complexity: 'O(n) space', section: 'Why & When', example: `# SEGMENT TREE STRUCTURE
# Array: [1, 3, 5, 7, 9, 11]
#
# Tree (range sum):
#                    [36]          <- root: sum of [0,5]
#                  /      \\
#             [9]           [27]    <- sum of [0,2] and [3,5]
#            /   \\         /    \\
#         [4]    [5]    [16]   [11] <- sum of [0,1], [2,2], etc.
#        /  \\          /  \\
#      [1]  [3]      [7]  [9]       <- leaves = original array
#
# PROPERTIES:
# 1. Leaves = original array elements
# 2. Internal node = aggregate of children
# 3. Height = ceil(log2(n))
# 4. Array-based: node i has children at 2i+1, 2i+2
#
# MEMORY LAYOUT (1-indexed is cleaner):
# tree[1] = root
# tree[i] children: tree[2*i], tree[2*i+1]
# tree[i] parent: tree[i//2]
#
# Size: 2*n for perfect tree, 4*n for safety` },

  // Basic Implementation
  { signature: 'Segment Tree (Array)', description: 'Array-based segment tree. 1-indexed for cleaner parent/child math.', complexity: 'O(n) build', section: 'Basic Implementation', example: `class SegmentTree:
    """
    Segment Tree for range sum queries.
    Uses 1-indexed array for cleaner math.
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)  # Safe size
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        """Build tree recursively."""
        if start == end:
            # Leaf node
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            left_child = 2 * node
            right_child = 2 * node + 1

            self._build(nums, left_child, start, mid)
            self._build(nums, right_child, mid + 1, end)

            # Internal node = sum of children
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

# Build walkthrough for [1, 3, 5, 7]:
# _build(node=1, 0-3): split into [0-1] and [2-3]
#   _build(node=2, 0-1): split into [0-0] and [1-1]
#     _build(node=4, 0-0): leaf, tree[4] = 1
#     _build(node=5, 1-1): leaf, tree[5] = 3
#     tree[2] = 1 + 3 = 4
#   _build(node=3, 2-3): split into [2-2] and [3-3]
#     _build(node=6, 2-2): leaf, tree[6] = 5
#     _build(node=7, 3-3): leaf, tree[7] = 7
#     tree[3] = 5 + 7 = 12
#   tree[1] = 4 + 12 = 16` },

  { signature: 'Point Update', description: 'Update single element. Propagate change up to root.', complexity: 'O(log n)', section: 'Basic Implementation', example: `class SegmentTree:
    # ... (init and build from above)

    def update(self, idx, val):
        """Update nums[idx] to val."""
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            # Leaf node - update value
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            left_child = 2 * node
            right_child = 2 * node + 1

            if idx <= mid:
                self._update(left_child, start, mid, idx, val)
            else:
                self._update(right_child, mid + 1, end, idx, val)

            # Recalculate current node
            self.tree[node] = self.tree[left_child] + self.tree[right_child]

# Update walkthrough: update index 1 from 3 to 10
# [1, 3, 5, 7] -> [1, 10, 5, 7]
#
# _update(node=1, 0-3, idx=1, val=10)
#   mid=1, idx=1 <= 1, go left
#   _update(node=2, 0-1, idx=1, val=10)
#     mid=0, idx=1 > 0, go right
#     _update(node=5, 1-1, idx=1, val=10)
#       leaf! tree[5] = 10
#     tree[2] = tree[4] + tree[5] = 1 + 10 = 11
#   tree[1] = tree[2] + tree[3] = 11 + 12 = 23` },

  { signature: 'Range Query', description: 'Query aggregate over range [left, right]. Combine partial results from overlapping nodes.', complexity: 'O(log n)', section: 'Basic Implementation', example: `class SegmentTree:
    # ... (init, build, update from above)

    def query(self, left, right):
        """Return sum of nums[left:right+1]."""
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        # Case 1: No overlap
        if right < start or end < left:
            return 0  # Identity for sum

        # Case 2: Complete overlap
        if left <= start and end <= right:
            return self.tree[node]

        # Case 3: Partial overlap
        mid = (start + end) // 2
        left_sum = self._query(2 * node, start, mid, left, right)
        right_sum = self._query(2 * node + 1, mid + 1, end, left, right)

        return left_sum + right_sum

# Query walkthrough: query(1, 2) on [1, 3, 5, 7]
# _query(node=1, 0-3, left=1, right=2)
#   partial overlap, split
#   _query(node=2, 0-1, 1, 2)
#     partial overlap, split
#     _query(node=4, 0-0, 1, 2) -> no overlap, return 0
#     _query(node=5, 1-1, 1, 2) -> complete overlap, return 3
#     return 0 + 3 = 3
#   _query(node=3, 2-3, 1, 2)
#     partial overlap, split
#     _query(node=6, 2-2, 1, 2) -> complete overlap, return 5
#     _query(node=7, 3-3, 1, 2) -> no overlap, return 0
#     return 5 + 0 = 5
#   return 3 + 5 = 8 ✓` },

  // Range Min/Max
  { signature: 'Range Minimum Query', description: 'Segment tree for minimum instead of sum. Change aggregate function.', complexity: 'O(log n)', section: 'Range Min/Max', example: `class RangeMinTree:
    """Segment Tree for Range Minimum Query (RMQ)."""

    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [float('inf')] * (4 * self.n)
        self.nums = nums
        if self.n > 0:
            self._build(1, 0, self.n - 1)

    def _build(self, node, start, end):
        if start == end:
            self.tree[node] = self.nums[start]
        else:
            mid = (start + end) // 2
            self._build(2 * node, start, mid)
            self._build(2 * node + 1, mid + 1, end)
            # Min instead of sum
            self.tree[node] = min(
                self.tree[2 * node],
                self.tree[2 * node + 1]
            )

    def query(self, left, right):
        return self._query(1, 0, self.n - 1, left, right)

    def _query(self, node, start, end, left, right):
        if right < start or end < left:
            return float('inf')  # Identity for min
        if left <= start and end <= right:
            return self.tree[node]

        mid = (start + end) // 2
        left_min = self._query(2 * node, start, mid, left, right)
        right_min = self._query(2 * node + 1, mid + 1, end, left, right)
        return min(left_min, right_min)

    def update(self, idx, val):
        self._update(1, 0, self.n - 1, idx, val)

    def _update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2 * node, start, mid, idx, val)
            else:
                self._update(2 * node + 1, mid + 1, end, idx, val)
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])` },

  { signature: 'Generic Segment Tree', description: 'Template with configurable operation and identity. Reuse for sum, min, max, GCD.', complexity: 'O(log n)', section: 'Range Min/Max', example: `class SegmentTree:
    """
    Generic Segment Tree with configurable operation.
    """
    def __init__(self, nums, op, identity):
        """
        op: binary function (e.g., lambda a,b: a+b)
        identity: identity element (e.g., 0 for sum)
        """
        self.n = len(nums)
        self.op = op
        self.identity = identity
        self.tree = [identity] * (4 * self.n)
        if self.n > 0:
            self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2 * node, start, mid)
            self._build(nums, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.op(
                self.tree[2 * node],
                self.tree[2 * node + 1]
            )

    # ... query and update use self.op and self.identity

# Usage examples:
nums = [1, 3, 5, 7, 9]

# Sum tree
sum_tree = SegmentTree(nums, lambda a, b: a + b, 0)

# Min tree
min_tree = SegmentTree(nums, min, float('inf'))

# Max tree
max_tree = SegmentTree(nums, max, float('-inf'))

# GCD tree
from math import gcd
gcd_tree = SegmentTree(nums, gcd, 0)

# Product tree
prod_tree = SegmentTree(nums, lambda a, b: a * b, 1)` },

  // LeetCode Problems
  { signature: 'Range Sum Query - Mutable', description: 'LeetCode 307. Classic segment tree problem.', complexity: 'O(log n)', section: 'Problems', example: `class NumArray:
    """
    LeetCode 307: Range Sum Query - Mutable
    """
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)

        # Build tree (iterative, bottom-up)
        # Leaves at indices [n, 2n-1]
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]

        # Build internal nodes
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, index: int, val: int) -> None:
        # Update leaf
        pos = self.n + index
        self.tree[pos] = val

        # Update parents
        while pos > 1:
            pos //= 2
            self.tree[pos] = self.tree[2 * pos] + self.tree[2 * pos + 1]

    def sumRange(self, left: int, right: int) -> int:
        # Query [left, right] inclusive
        result = 0
        left += self.n
        right += self.n

        while left <= right:
            if left % 2 == 1:  # Left is right child
                result += self.tree[left]
                left += 1
            if right % 2 == 0:  # Right is left child
                result += self.tree[right]
                right -= 1
            left //= 2
            right //= 2

        return result

# Usage:
# numArray = NumArray([1, 3, 5])
# numArray.sumRange(0, 2)  # 9
# numArray.update(1, 2)
# numArray.sumRange(0, 2)  # 8` },
]

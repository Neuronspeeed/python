import type { Method } from '../../../types'

export const lazyPropagationMethods: Method[] = [
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
]

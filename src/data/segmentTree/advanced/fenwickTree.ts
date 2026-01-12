import type { Method } from '../../../types'

export const fenwickTreeMethods: Method[] = [
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
]

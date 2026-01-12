import type { Method } from '../../../types'

export const problemsMethods: Method[] = [
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

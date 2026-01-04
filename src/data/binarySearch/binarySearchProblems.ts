import type { Method } from '../../types'

// Greedy Binary Search, Special Problems, bisect module
export const binarySearchProblemsMethods: Method[] = [
  // Why & When
  { signature: 'Recognizing "search on the answer" problems', description: 'Not searching in array - searching for optimal value. Pattern: "minimum X where condition" or "maximum X where condition". Binary search on answer space.', complexity: 'Concept', section: 'Why & When', example: `# PATTERN: Can you binary search the ANSWER?

# Example: Koko eating bananas
# "Find MINIMUM speed to finish in h hours"
# → Binary search speeds [1...max(piles)]

# Recognition signals:
# 1. "Minimum X where..." → search for minimum
# 2. "Maximum X where..." → search for maximum
# 3. Can check if X works? → condition(X)
# 4. Monotonic: If X works, X+1 works (or vice versa)

# TEMPLATE 1: Find minimum where condition true
def min_where_true(lo, hi, condition):
    # Find min X where condition(X) = True
    # False False False True True True
    #                   ^answer
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid  # Try smaller
        else:
            lo = mid + 1
    return lo

# TEMPLATE 2: Find maximum where condition true
def max_where_true(lo, hi, condition):
    # Find max X where condition(X) = True
    # True True True False False False
    #             ^answer
    while lo < hi:
        mid = (lo + hi + 1) // 2  # CEILING!
        if condition(mid):
            lo = mid  # Try larger
        else:
            hi = mid - 1
    return lo

# Real examples:
# - Koko bananas: min speed → Template 1
# - Ship packages: min capacity → Template 1
# - Split array: min largest sum → Template 1
# - Magnetic force: max distance → Template 2

# Non-examples (regular binary search):
# - Find target in sorted array
# - Search rotated array
# These search IN array, not on answer space`,
  },
  { signature: 'Binary search pitfalls - off-by-one and infinite loops', description: 'Common bugs: wrong mid calculation, wrong bounds update, infinite loop. Memorize templates to avoid mistakes.', complexity: 'Concept', section: 'Why & When', example: `# PITFALL 1: Overflow in mid calculation
mid = (left + right) // 2  # Can overflow!
# Better:
mid = left + (right - left) // 2

# Python: No overflow, both work
# C/C++/Java: Use left + (right - left) // 2

# PITFALL 2: Infinite loop - wrong ceiling
def buggy_max_search(lo, hi):
    while lo < hi:
        mid = (lo + hi) // 2  # FLOOR! Wrong for max search
        if condition(mid):
            lo = mid  # Infinite loop when lo=mid
        else:
            hi = mid - 1
    return lo

# Fix: Use ceiling for max search
mid = (lo + hi + 1) // 2  # CEILING!

# PITFALL 3: Wrong boundary update
while left <= right:  # Inclusive
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid  # BUG! Should be mid + 1
    else:
        right = mid  # BUG! Should be mid - 1
# Creates infinite loop!

# PITFALL 4: Off-by-one in range
def find_insert_position(arr, target):
    left, right = 0, len(arr)  # Exclusive right
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left  # Correct!

# vs bisect_left pattern (same result):
left, right = 0, len(arr)  # NOT len(arr) - 1

# SAFEGUARDS:
# 1. Use proven templates (above)
# 2. Check loop invariant
# 3. Test with small examples
# 4. Verify lo < hi vs lo <= hi choice

# Debugging: Add assertion
assert left <= right, "Invalid state!"`,
  },
  { signature: 'bisect module - when to use vs custom binary search', description: 'Use bisect for simple find/insert. Write custom for complex conditions, non-comparable types, or "search on answer" problems.', complexity: 'Concept', section: 'Why & When', example: `from bisect import bisect_left, bisect_right, insort

# USE BISECT WHEN:
# 1. Simple find/insert in sorted list
arr = [1, 3, 5, 7, 9]
idx = bisect_left(arr, 6)  # 3
insort(arr, 6)  # [1, 3, 5, 6, 7, 9]

# 2. Count occurrences
count = bisect_right(arr, 5) - bisect_left(arr, 5)

# 3. Range queries
def count_in_range(arr, lo, hi):
    return bisect_right(arr, hi) - bisect_left(arr, lo)

# WRITE CUSTOM WHEN:
# 1. Search on answer (not in array)
def min_speed(piles, h):
    # Searching speed space, not piles!
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid, piles, h):
            hi = mid
        else:
            lo = mid + 1
    return lo

# 2. Complex condition
def search_rotated(nums, target):
    # Array not sorted, bisect won't work
    # Need custom logic for rotation

# 3. Non-comparable types
# bisect needs __lt__ defined
# Custom search can use custom comparison

# 4. Need both index AND value
# bisect only returns index

# bisect GOTCHA: O(n) insert!
for x in data:
    insort(arr, x)  # O(n²) total!
# Better: arr.extend(data); arr.sort()

# bisect LIMITATION: No key function before 3.10
# Python 3.10+:
bisect_left(arr, x, key=lambda v: v.lower())
# Before 3.10: transform array first

# PERFORMANCE:
# bisect: ~5-10 ns overhead (C implementation)
# Custom: ~50-100 ns overhead (Python)
# For 1M array: both ~20 comparisons
# Difference negligible!`,
  },

  // Greedy Binary Search
  { signature: 'Binary Search for Minimum', description: 'Find minimum value satisfying condition. Search on answer space.', complexity: 'O(log(range) * check)', section: 'Greedy Binary Search', example: `# TEMPLATE: Find MINIMUM x where condition(x) is True
# Condition transitions from False...False to True...True
def binary_search_min(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi) // 2
        if condition(mid):
            hi = mid  # Maybe we can do smaller
        else:
            lo = mid + 1  # Need larger
    return lo

# Example: Koko Eating Bananas
# Find minimum speed to finish in h hours
def min_eating_speed(piles, h):
    def can_finish(speed):
        hours = sum((p + speed - 1) // speed for p in piles)
        return hours <= h

    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo

# Capacity to Ship Within D Days
def ship_within_days(weights, days):
    def can_ship(capacity):
        d, curr = 1, 0
        for w in weights:
            if curr + w > capacity:
                d += 1
                curr = 0
            curr += w
        return d <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo` },
  { signature: 'Binary Search for Maximum', description: 'Find maximum value satisfying condition. Search on answer space.', complexity: 'O(log(range) * check)', section: 'Greedy Binary Search', example: `# TEMPLATE: Find MAXIMUM x where condition(x) is True
# Condition transitions from True...True to False...False
def binary_search_max(lo, hi, condition):
    while lo < hi:
        mid = (lo + hi + 1) // 2  # Ceiling division!
        if condition(mid):
            lo = mid  # Maybe we can do larger
        else:
            hi = mid - 1  # Need smaller
    return lo

# Example: Maximum length of subarray with sum <= target
def max_subarray_length(arr, target):
    def can_achieve(length):
        # Check if any subarray of this length has sum <= target
        window_sum = sum(arr[:length])
        if window_sum <= target:
            return True
        for i in range(length, len(arr)):
            window_sum += arr[i] - arr[i - length]
            if window_sum <= target:
                return True
        return False

    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if can_achieve(mid):
            lo = mid
        else:
            hi = mid - 1
    return lo` },

  // Special Problems
  { signature: 'Search in Rotated Sorted Array', description: 'One half is always sorted. Check which half, then decide direction.', complexity: 'O(log n)', section: 'Special Problems', example: `def search_rotated(nums, target):
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        # Left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1

# Example: [4,5,6,7,0,1,2], target=0 -> returns 4

# Find minimum in rotated array
def find_min_rotated(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]` },
  { signature: 'Find Peak Element', description: 'Element greater than neighbors. Binary search works because peak always exists.', complexity: 'O(log n)', section: 'Special Problems', example: `def find_peak_element(nums):
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2

        if nums[mid] < nums[mid + 1]:
            # Rising slope, peak is to the right
            left = mid + 1
        else:
            # Falling slope, peak is at mid or left
            right = mid

    return left

# Why this works:
# - If we're on rising slope -> peak must be to the right
# - If we're on falling slope -> peak must be at mid or left
# - Eventually converges to a peak

# Example: [1,2,3,1] -> returns 2 (index of 3)
# Example: [1,2,1,3,5,6,4] -> returns 1 or 5` },
  { signature: 'Search 2D Matrix', description: 'Treat 2D matrix as sorted 1D array. Or start from corner.', complexity: 'O(log(m*n))', section: 'Special Problems', example: `# Matrix where each row is sorted and
# first element of row > last element of previous row
def search_matrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1

    while left <= right:
        mid = (left + right) // 2
        # Convert 1D index to 2D
        row, col = mid // n, mid % n
        val = matrix[row][col]

        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1

    return False

# Matrix where rows and columns are sorted
# (but not flattened sorted)
def search_matrix_ii(matrix, target):
    if not matrix:
        return False

    # Start from top-right corner
    row, col = 0, len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] > target:
            col -= 1  # Eliminate column
        else:
            row += 1  # Eliminate row

    return False  # O(m + n)` },
  { signature: 'Square Root', description: 'Binary search on answer. Find largest x where x*x <= n.', complexity: 'O(log n)', section: 'Special Problems', example: `def sqrt(n):
    if n < 2:
        return n

    left, right = 1, n // 2

    while left <= right:
        mid = (left + right) // 2
        square = mid * mid

        if square == n:
            return mid
        elif square < n:
            left = mid + 1
        else:
            right = mid - 1

    return right  # Largest where mid*mid <= n

# With precision (for decimal)
def sqrt_decimal(n, precision=0.0001):
    left, right = 0.0, n

    while right - left > precision:
        mid = (left + right) / 2
        if mid * mid <= n:
            left = mid
        else:
            right = mid

    return left

# Newton's method (faster)
def sqrt_newton(n):
    x = n
    while x * x > n:
        x = (x + n // x) // 2
    return x` },
  { signature: 'Find First and Last Position', description: 'Use bisect_left and bisect_right, or two binary searches.', complexity: 'O(log n)', section: 'Special Problems', example: `def search_range(nums, target):
    def find_left():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left

    def find_right():
        left, right = 0, len(nums)
        while left < right:
            mid = (left + right) // 2
            if nums[mid] <= target:
                left = mid + 1
            else:
                right = mid
        return left

    left_idx = find_left()
    if left_idx == len(nums) or nums[left_idx] != target:
        return [-1, -1]

    return [left_idx, find_right() - 1]

# Using bisect
from bisect import bisect_left, bisect_right
def search_range_bisect(nums, target):
    left = bisect_left(nums, target)
    if left == len(nums) or nums[left] != target:
        return [-1, -1]
    right = bisect_right(nums, target) - 1
    return [left, right]` },

  // Python bisect module
  { signature: 'bisect Module Functions', description: 'Python built-in binary search. bisect_left, bisect_right, insort.', complexity: 'O(log n)', section: 'Python bisect', example: `from bisect import bisect_left, bisect_right, insort

arr = [1, 3, 3, 3, 5, 7]

# bisect_left: First position where x can be inserted
print(bisect_left(arr, 3))   # 1 (before first 3)
print(bisect_left(arr, 4))   # 4 (between 3s and 5)

# bisect_right: Last position where x can be inserted
print(bisect_right(arr, 3))  # 4 (after last 3)

# insort: Insert and maintain sorted order
insort(arr, 4)  # [1, 3, 3, 3, 4, 5, 7]

# Custom comparison (Python 3.10+)
# bisect_left(arr, x, key=lambda v: v.lower())

# For older Python, transform the array
keys = [v.lower() for v in strings]
i = bisect_left(keys, target.lower())

# Count elements in range [lo, hi]
def count_in_range(arr, lo, hi):
    return bisect_right(arr, hi) - bisect_left(arr, lo)` },
]

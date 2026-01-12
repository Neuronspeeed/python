import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
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
]

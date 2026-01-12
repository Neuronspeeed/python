import type { Method } from '../../../types'

export const pythonBisectMethods: Method[] = [
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

import type { Method } from '../../../types'

export const searchMethods: Method[] = [
  {
    signature: 'Linear Search',
    description: 'Check each element sequentially. Works on unsorted arrays.',
    complexity: 'O(n)',
    section: 'Search',
    example: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1

arr = [10, 20, 30, 40, 50]
linear_search(arr, 30)  # 2
linear_search(arr, 99)  # -1

# Built-in methods
arr = [10, 20, 30, 40, 50]

# Check existence
30 in arr      # True
99 in arr      # False

# Find index (raises ValueError if not found)
arr.index(30)  # 2

# Safe index search
def safe_index(arr, target):
    try:
        return arr.index(target)
    except ValueError:
        return -1`
  },
  {
    signature: 'Binary Search',
    description: 'Divide and conquer on SORTED array. O(log n) - much faster!',
    complexity: 'O(log n)',
    section: 'Search',
    example: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1

arr = [10, 20, 30, 40, 50]
binary_search(arr, 30)  # 2
binary_search(arr, 25)  # -1

# WALKTHROUGH: target = 40
# Step 1: left=0, right=4, mid=2
#         arr[2]=30 < 40 -> search right, left=3
# Step 2: left=3, right=4, mid=3
#         arr[3]=40 == 40 -> Found! Return 3`
  },
  {
    signature: 'bisect Module',
    description: 'Python built-in for binary search operations on sorted arrays.',
    complexity: 'O(log n)',
    section: 'Search',
    example: `import bisect

arr = [10, 20, 30, 40, 50]

# Find insertion point (leftmost)
bisect.bisect_left(arr, 30)   # 2
bisect.bisect_left(arr, 25)   # 2 (where 25 would go)

# Find insertion point (rightmost)
bisect.bisect_right(arr, 30)  # 3

# Check if value exists
def binary_search_bisect(arr, target):
    pos = bisect.bisect_left(arr, target)
    if pos < len(arr) and arr[pos] == target:
        return pos
    return -1

# Insert while maintaining sort
bisect.insort(arr, 25)
print(arr)  # [10, 20, 25, 30, 40, 50]`
  },
  {
    signature: 'Min, Max & Count',
    description: 'Find extremes and count occurrences. All O(n).',
    complexity: 'O(n)',
    section: 'Search',
    example: `arr = [30, 10, 50, 20, 40]

# Find min/max
min(arr)  # 10
max(arr)  # 50

# With index
arr.index(min(arr))  # 1
arr.index(max(arr))  # 2

# Count occurrences
arr = [1, 2, 2, 3, 2, 4]
arr.count(2)  # 3

# SUMMARY:
# Linear search    O(n)
# Binary search    O(log n) - sorted only!
# in operator      O(n)
# min() / max()    O(n)
# count()          O(n)`
  },
]

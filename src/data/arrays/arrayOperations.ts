import type { Method } from '../../types'

export const arrayOperationsMethods: Method[] = [
  // Insertions
  {
    signature: 'Insert at End — append()',
    description: 'Add element to end of array. Amortized O(1) due to dynamic resizing.',
    complexity: 'O(1)',
    section: 'Insertions',
    example: `arr = [1, 2, 3]
arr.append(4)
print(arr)  # [1, 2, 3, 4]

# Multiple appends in loop
arr = []
for i in range(5):
    arr.append(i)  # Each append is O(1)
print(arr)  # [0, 1, 2, 3, 4]
# NOTE: Each append is O(1), but n appends = O(n) total`
  },
  {
    signature: 'Insert at Beginning — insert(0, x)',
    description: 'Add element at start. O(n) because all elements must shift right.',
    complexity: 'O(n)',
    section: 'Insertions',
    example: `arr = [1, 2, 3]
arr.insert(0, 0)
print(arr)  # [0, 1, 2, 3]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3]
# Insert 0 at index 0:
#         [_, 1, 2, 3]  <- shift all right
#         [0, 1, 2, 3]  <- insert

# For frequent head insertions, use collections.deque
from collections import deque
d = deque([1, 2, 3])
d.appendleft(0)  # O(1)!`
  },
  {
    signature: 'Insert at Index — insert(i, x)',
    description: 'Insert element at specific position. O(n) worst case.',
    complexity: 'O(n)',
    section: 'Insertions',
    example: `arr = [1, 2, 4, 5]
arr.insert(2, 3)  # insert 3 at index 2
print(arr)  # [1, 2, 3, 4, 5]

# Insert multiple using slicing
arr = [1, 2, 5, 6]
arr[2:2] = [3, 4]  # insert at index 2
print(arr)  # [1, 2, 3, 4, 5, 6]

# extend() - add multiple at end only
arr = [1, 2]
arr.extend([3, 4, 5])
print(arr)  # [1, 2, 3, 4, 5]

# SUMMARY:
# End (append)    O(1)
# Beginning       O(n)
# Middle          O(n)`
  },

  // Deletions
  {
    signature: 'Delete from End — pop()',
    description: 'Remove and return last element. O(1) operation.',
    complexity: 'O(1)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4]
last = arr.pop()
print(last)  # 4
print(arr)   # [1, 2, 3]

# Pop in loop (safe - removing from end)
arr = [1, 2, 3, 4, 5]
while arr:
    print(arr.pop())  # Each pop is O(1)
# Output: 5, 4, 3, 2, 1
# NOTE: Each pop is O(1), but n pops = O(n) total`
  },
  {
    signature: 'Delete from Beginning — pop(0)',
    description: 'Remove first element. O(n) because all elements shift left.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4]
first = arr.pop(0)
print(first)  # 1
print(arr)    # [2, 3, 4]

# WHY O(n)? Every element shifts:
# Before: [1, 2, 3, 4]
# Remove index 0:
#         [2, 3, 4, _]  <- shift all left
#         [2, 3, 4]

# For O(1) head removal, use deque
from collections import deque
d = deque([1, 2, 3, 4])
d.popleft()  # O(1)!`
  },
  {
    signature: 'Delete by Value — remove(x)',
    description: 'Remove FIRST occurrence of value. O(n) to find and shift.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 2, 4]
arr.remove(2)  # removes FIRST 2 only
print(arr)  # [1, 3, 2, 4]

# Remove ALL occurrences
arr = [1, 2, 3, 2, 4, 2]

# Method 1: List comprehension (creates new list)
arr = [x for x in arr if x != 2]
print(arr)  # [1, 3, 4]

# Method 2: While loop (in-place but O(n²))
arr = [1, 2, 3, 2, 4, 2]
while 2 in arr:
    arr.remove(2)
print(arr)  # [1, 3, 4]`
  },
  {
    signature: 'Delete with del & clear()',
    description: 'del removes by index/slice. clear() empties the array.',
    complexity: 'O(n)',
    section: 'Deletions',
    example: `arr = [1, 2, 3, 4, 5]

# Delete single index
del arr[2]
print(arr)  # [1, 2, 4, 5]

# Delete slice
del arr[1:3]
print(arr)  # [1, 5]

# Clear entire array
arr = [1, 2, 3]
arr.clear()
print(arr)  # []

# SUMMARY:
# End (pop())       O(1)
# Beginning         O(n)
# By index          O(n)
# By value          O(n)`
  },

  // Search Operations
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

  // In-Place Operations
  {
    signature: 'Reverse In-Place',
    description: 'Reverse array without extra space using two pointers.',
    complexity: 'O(n)',
    section: 'In-Place Operations',
    example: `# Method 1: Built-in
arr = [1, 2, 3, 4, 5]
arr.reverse()
print(arr)  # [5, 4, 3, 2, 1]

# Method 2: Two pointers (manual)
def reverse_in_place(arr):
    left, right = 0, len(arr) - 1

    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1

arr = [1, 2, 3, 4, 5]
reverse_in_place(arr)
print(arr)  # [5, 4, 3, 2, 1]

# Note: arr[::-1] creates NEW array (not in-place)`
  },
  {
    signature: 'Remove Duplicates (LC #26)',
    description: 'Remove duplicates from sorted array in-place. Return new length.',
    complexity: 'O(n)',
    section: 'In-Place Operations',
    example: `def remove_duplicates(nums):
    if len(nums) == 0:
        return 0

    write = 1  # position for next unique

    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1

    return write

nums = [1, 1, 2, 2, 3, 4, 4]
length = remove_duplicates(nums)
print(nums[:length])  # [1, 2, 3, 4]

# PATTERN: Read-Write Pointers
# read scans every element
# write marks where to place next valid element`
  },
  {
    signature: 'Remove Element (LC #27)',
    description: 'Remove all occurrences of value in-place.',
    complexity: 'O(n)',
    section: 'In-Place Operations',
    example: `def remove_element(nums, val):
    write = 0

    for read in range(len(nums)):
        if nums[read] != val:
            nums[write] = nums[read]
            write += 1

    return write

nums = [3, 2, 2, 3]
length = remove_element(nums, 3)
print(nums[:length])  # [2, 2]

nums = [0, 1, 2, 2, 3, 0, 4, 2]
length = remove_element(nums, 2)
print(nums[:length])  # [0, 1, 3, 0, 4]`
  },
  {
    signature: 'Move Zeroes (LC #283)',
    description: 'Move all zeros to end while maintaining order of non-zeros.',
    complexity: 'O(n)',
    section: 'In-Place Operations',
    example: `def move_zeroes(nums):
    write = 0

    # Move all non-zeros to front
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1

    # Fill remaining with zeros
    while write < len(nums):
        nums[write] = 0
        write += 1

nums = [0, 1, 0, 3, 12]
move_zeroes(nums)
print(nums)  # [1, 3, 12, 0, 0]

# Alternative: Swap approach
def move_zeroes_swap(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1`
  },
  {
    signature: 'Rotate Array (LC #189)',
    description: 'Rotate array right by k steps using reverse trick.',
    complexity: 'O(n)',
    section: 'In-Place Operations',
    example: `def rotate(nums, k):
    n = len(nums)
    k = k % n  # handle k > n

    def reverse(left, right):
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1

    reverse(0, n - 1)    # Reverse all
    reverse(0, k - 1)    # Reverse first k
    reverse(k, n - 1)    # Reverse rest

nums = [1, 2, 3, 4, 5, 6, 7]
rotate(nums, 3)
print(nums)  # [5, 6, 7, 1, 2, 3, 4]

# HOW IT WORKS (k=3):
# Original:     [1, 2, 3, 4, 5, 6, 7]
# Reverse all:  [7, 6, 5, 4, 3, 2, 1]
# Reverse 0:2:  [5, 6, 7, 4, 3, 2, 1]
# Reverse 3:6:  [5, 6, 7, 1, 2, 3, 4]`
  },

  // Common Patterns
  {
    signature: 'Two Pointer Pattern',
    description: 'Use two pointers from opposite ends moving inward.',
    complexity: 'O(n)',
    section: 'Patterns',
    example: `# TEMPLATE:
left = 0
right = len(arr) - 1

while left < right:
    # Compare arr[left] and arr[right]
    # Move pointers based on condition
    pass

# USE FOR:
# - Reverse array
# - Two sum (sorted)
# - Palindrome check
# - Container with most water
# - Sorted squares

# Example: Check palindrome
def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True`
  },
  {
    signature: 'Read-Write Pointer Pattern',
    description: 'Read pointer scans, write pointer marks valid positions.',
    complexity: 'O(n)',
    section: 'Patterns',
    example: `# TEMPLATE:
write = 0

for read in range(len(arr)):
    if condition(arr[read]):
        arr[write] = arr[read]
        write += 1

# USE FOR:
# - Remove duplicates
# - Remove element
# - Move zeroes
# - Filter in-place

# Example: Keep only positive numbers
def keep_positive(arr):
    write = 0
    for read in range(len(arr)):
        if arr[read] > 0:
            arr[write] = arr[read]
            write += 1
    return arr[:write]

keep_positive([-1, 2, -3, 4, 5])  # [2, 4, 5]`
  },
  {
    signature: 'Sliding Window Pattern',
    description: 'Maintain a window that expands right and shrinks from left.',
    complexity: 'O(n)',
    section: 'Patterns',
    example: `# TEMPLATE:
left = 0
for right in range(len(arr)):
    # Expand window by including arr[right]

    while window_invalid:
        # Shrink window from left
        left += 1

# USE FOR:
# - Max consecutive ones
# - Subarray sum equals k
# - Longest substring without repeating
# - Minimum window substring

# Example: Max sum subarray of size k
def max_sum_k(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum

    for right in range(k, len(arr)):
        window_sum += arr[right] - arr[right - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

max_sum_k([1, 4, 2, 10, 2, 3, 1, 0, 20], 4)  # 24`
  },
]

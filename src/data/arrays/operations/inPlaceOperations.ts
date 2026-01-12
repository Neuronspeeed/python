import type { Method } from '../../../types'

export const inPlaceOperationMethods: Method[] = [
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
]

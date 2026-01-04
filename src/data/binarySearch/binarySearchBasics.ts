import type { Method } from '../../types'

// Why & When, Basic Binary Search, Left/Right Boundary
export const binarySearchBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Binary Search?', description: 'O(log n) search in sorted data. Halve search space each step. Use when data is sorted or answer has monotonic property.', complexity: 'Concept', section: 'Why & When', example: `# BINARY SEARCH = Divide and conquer
# O(log n) because we halve search space each step

# REQUIREMENTS:
# 1. Data must be SORTED (or have monotonic property)
# 2. Random access (arrays, not linked lists)

# PATTERN:
# left, right = 0, n-1
# while left <= right (or left < right):
#     mid = (left + right) // 2
#     if condition:
#         left = mid + 1
#     else:
#         right = mid - 1

# USE CASES:
# - Search in sorted array
# - Find insertion position
# - Search in rotated array
# - Find peak element
# - Minimize/maximize with constraint
# - Square root, nth root` },
  { signature: 'Binary Search Variants', description: 'Three variants: exact match, left boundary, right boundary. Know when to use each.', complexity: 'O(log n)', section: 'Why & When', example: `# VARIANT 1: Find exact match
# while left <= right
# Return mid when found

# VARIANT 2: Find leftmost (first occurrence)
# while left < right
# right = mid (not mid - 1)
# Returns first position where condition is true

# VARIANT 3: Find rightmost (last occurrence)
# while left < right
# left = mid (with ceiling division)
# Returns last position where condition is true

# BISECT MODULE (Python's binary search)
from bisect import bisect_left, bisect_right

arr = [1, 2, 2, 2, 3, 4]
# bisect_left: leftmost position to insert (first >= x)
# bisect_right: rightmost position to insert (first > x)
print(bisect_left(arr, 2))   # 1 (first 2)
print(bisect_right(arr, 2))  # 4 (after last 2)` },

  // Basic Binary Search
  { signature: 'Basic Binary Search', description: 'Find exact target. Return index or -1 if not found.', complexity: 'O(log n)', section: 'Basic Binary Search', example: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Not found

# Example
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1

# Using bisect
from bisect import bisect_left
def binary_search_bisect(arr, target):
    i = bisect_left(arr, target)
    if i < len(arr) and arr[i] == target:
        return i
    return -1` },

  // Left Boundary
  { signature: 'Left-most Insertion Point', description: 'Find first position >= target. Works with duplicates.', complexity: 'O(log n)', section: 'Boundary Finding', example: `def bisect_left(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid  # Don't skip potential answer

    return left

# Example with duplicates
arr = [1, 2, 2, 2, 3, 4]
print(bisect_left(arr, 2))  # 1 (first 2)
print(bisect_left(arr, 2.5))  # 4 (where 2.5 would go)

# Find first occurrence
def first_occurrence(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left if left < len(arr) and arr[left] == target else -1` },

  // Right Boundary
  { signature: 'Right-most Insertion Point', description: 'Find first position > target. Insert after last duplicate.', complexity: 'O(log n)', section: 'Boundary Finding', example: `def bisect_right(arr, target):
    left, right = 0, len(arr)

    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:  # Note: <= not <
            left = mid + 1
        else:
            right = mid

    return left

# Example with duplicates
arr = [1, 2, 2, 2, 3, 4]
print(bisect_right(arr, 2))  # 4 (after last 2)

# Find last occurrence
def last_occurrence(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left - 1 if left > 0 and arr[left - 1] == target else -1

# Count occurrences
def count_occurrences(arr, target):
    from bisect import bisect_left, bisect_right
    return bisect_right(arr, target) - bisect_left(arr, target)` },
]

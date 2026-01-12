import type { Method } from '../../../types'

export const patternMethods: Method[] = [
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

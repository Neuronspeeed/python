import type { Method } from '../../types'

// Why & When + Opposite Ends + Same Direction + Two Inputs
export const twoPointersBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Two Pointers?', description: 'Two pointers reduce O(n²) brute force to O(n) by avoiding redundant comparisons. Essential pattern for array/string problems.', complexity: 'Concept', section: 'Why & When', example: `# TWO POINTERS = O(n) instead of O(n²)
# Use when: searching pairs, comparing from both ends,
# merging sorted arrays, or checking palindromes

# BRUTE FORCE O(n²) - check all pairs
def two_sum_brute(arr, target):
    for i in range(len(arr)):
        for j in range(i+1, len(arr)):
            if arr[i] + arr[j] == target:
                return [i, j]
    return []

# TWO POINTERS O(n) - for SORTED array
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1    # Need larger sum
        else:
            right -= 1   # Need smaller sum
    return []` },
  { signature: 'Two Pointer Patterns', description: 'Three main patterns: opposite ends (sorted array), same direction (fast/slow), and two inputs (merge).', complexity: 'Concept', section: 'Why & When', example: `# PATTERN 1: Opposite Ends
# Start: left=0, right=n-1, move toward each other
# Use for: sorted array problems, palindrome check

# PATTERN 2: Same Direction (Fast/Slow)
# Start: both at 0, fast moves ahead
# Use for: remove duplicates, find cycle, partition

# PATTERN 3: Two Inputs
# Start: one pointer per array
# Use for: merge sorted arrays, compare sequences

# CHOOSING THE RIGHT PATTERN:
# - Sorted array + find pair? -> Opposite ends
# - Remove in-place? -> Same direction
# - Merge two arrays? -> Two inputs
# - Find cycle? -> Fast/slow (tortoise and hare)` },

  // Opposite Ends Pattern
  { signature: 'Two pointers: opposite ends', description: 'Pointers start at opposite ends, move toward center based on condition. Classic for sorted arrays.', complexity: 'O(n)', section: 'Opposite Ends', example: `def fn(arr):
    left = 0
    right = len(arr) - 1
    ans = 0

    while left < right:
        # Do some logic with arr[left] and arr[right]
        if CONDITION:
            left += 1
        else:
            right -= 1

    return ans

# EXAMPLE: Two Sum in Sorted Array
def two_sum(numbers, target):
    left, right = 0, len(numbers) - 1
    while left < right:
        s = numbers[left] + numbers[right]
        if s == target:
            return [left + 1, right + 1]  # 1-indexed
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# EXAMPLE: Container With Most Water
def max_area(height):
    left, right = 0, len(height) - 1
    max_water = 0
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return max_water` },
  { signature: 'Palindrome Check', description: 'Classic opposite-ends pattern. Compare characters from both ends moving inward.', complexity: 'O(n)', section: 'Opposite Ends', example: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

# With alphanumeric filter
def is_palindrome_alnum(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

# Valid Palindrome II (can delete one char)
def valid_palindrome_ii(s):
    def is_pali(l, r):
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            # Try skipping left or right
            return is_pali(left+1, right) or is_pali(left, right-1)
        left += 1
        right -= 1
    return True` },
  { signature: 'Three Sum', description: 'Fix one element, use two pointers on remainder. Sort first to enable the pattern.', complexity: 'O(n²)', section: 'Opposite Ends', example: `def three_sum(nums):
    nums.sort()  # Must sort first!
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i-1]:
            continue

        # Two pointers for remaining pair
        left, right = i + 1, len(nums) - 1
        target = -nums[i]

        while left < right:
            s = nums[left] + nums[right]
            if s == target:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < target:
                left += 1
            else:
                right -= 1

    return result` },

  // Same Direction Pattern
  { signature: 'Two pointers: same direction', description: 'Both pointers move in same direction. Fast pointer explores, slow tracks position to modify.', complexity: 'O(n)', section: 'Same Direction', example: `def fn(arr):
    slow = 0
    for fast in range(len(arr)):
        if CONDITION:
            # Do something with slow
            arr[slow] = arr[fast]  # Often used for in-place
            slow += 1
    return slow  # Often return slow as new length

# EXAMPLE: Remove Duplicates from Sorted Array
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1  # Length of unique elements

# EXAMPLE: Move Zeroes
def move_zeroes(nums):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1` },
  { signature: 'Remove Element In-Place', description: 'Slow pointer marks write position, fast pointer scans all elements.', complexity: 'O(n)', section: 'Same Direction', example: `def remove_element(nums, val):
    slow = 0
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    return slow

# Remove duplicates (allow at most k duplicates)
def remove_duplicates_k(nums, k=2):
    if len(nums) <= k:
        return len(nums)
    slow = k
    for fast in range(k, len(nums)):
        if nums[fast] != nums[slow - k]:
            nums[slow] = nums[fast]
            slow += 1
    return slow

# Partition array (Dutch National Flag)
def sort_colors(nums):
    # 0s go to left, 2s go to right, 1s stay middle
    left, mid, right = 0, 0, len(nums) - 1
    while mid <= right:
        if nums[mid] == 0:
            nums[left], nums[mid] = nums[mid], nums[left]
            left += 1
            mid += 1
        elif nums[mid] == 2:
            nums[mid], nums[right] = nums[right], nums[mid]
            right -= 1
        else:
            mid += 1` },

  // Two Inputs Pattern
  { signature: 'Two pointers: two inputs', description: 'One pointer per array, process both arrays in a single pass. Classic for merging.', complexity: 'O(n+m)', section: 'Fixed Window', example: `def fn(arr1, arr2):
    i = j = 0
    ans = []

    while i < len(arr1) and j < len(arr2):
        if CONDITION:
            # Process arr1[i]
            i += 1
        else:
            # Process arr2[j]
            j += 1

    # Don't forget remaining elements!
    while i < len(arr1):
        # Process remaining arr1
        i += 1
    while j < len(arr2):
        # Process remaining arr2
        j += 1

    return ans

# EXAMPLE: Merge Sorted Arrays
def merge(nums1, m, nums2, n):
    # Merge from the end to avoid overwriting
    i, j, k = m - 1, n - 1, m + n - 1
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    # Copy remaining nums2 elements
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1` },
  { signature: 'Is Subsequence', description: 'Check if s is subsequence of t. Two pointers, one per string.', complexity: 'O(n)', section: 'Fixed Window', example: `def is_subsequence(s, t):
    i = j = 0
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            i += 1
        j += 1
    return i == len(s)

# Example: is "ace" subsequence of "abcde"?
# s: a c e
# t: a b c d e
#    ^   ^   ^  -> Yes, found all of s in order

# Intersection of Two Arrays
def intersection(nums1, nums2):
    nums1.sort()
    nums2.sort()
    i = j = 0
    result = []

    while i < len(nums1) and j < len(nums2):
        if nums1[i] < nums2[j]:
            i += 1
        elif nums1[i] > nums2[j]:
            j += 1
        else:
            if not result or result[-1] != nums1[i]:
                result.append(nums1[i])
            i += 1
            j += 1

    return result` },
]

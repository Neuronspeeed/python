import type { Method } from '../../../types'

export const specialProblemsMethods: Method[] = [
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
]

import type { Method } from '../../types'

export const arrayProblemsMethods: Method[] = [
  // Problem: Max Consecutive Ones
  {
    signature: 'Max Consecutive Ones',
    description: 'Given a binary array, return the maximum number of consecutive 1s. Track current and max count, reset on 0.',
    complexity: 'O(n)',
    section: 'Problems',
    example: `# Problem: [1, 1, 0, 1, 1, 1] -> 3
#          [1, 0, 1, 1, 0, 1] -> 2

def find_max_consecutive_ones(nums):
    """
    Time: O(n), Space: O(1)
    """
    max_count = 0
    current_count = 0

    for num in nums:
        if num == 1:
            current_count += 1
            max_count = max(max_count, current_count)
        else:
            current_count = 0

    return max_count

# Test cases
find_max_consecutive_ones([1, 1, 0, 1, 1, 1])  # 3
find_max_consecutive_ones([1, 0, 1, 1, 0, 1])  # 2
find_max_consecutive_ones([0, 0, 0])           # 0
find_max_consecutive_ones([1, 1, 1, 1])        # 4

# ONE-LINER (clever but less efficient):
def max_ones_v2(nums):
    return max(len(g) for g in ''.join(map(str, nums)).split('0'))`
  },
  // Problem: Find Numbers with Even Number of Digits
  {
    signature: 'Even Number of Digits',
    description: 'Count how many integers in array have an even number of digits. Use string conversion or logarithm.',
    complexity: 'O(n)',
    section: 'Problems',
    example: `# Problem: [12, 345, 2, 6, 7896] -> 2
# (12 has 2 digits, 7896 has 4 digits)

def find_numbers_with_even_digits(nums):
    """
    Time: O(n * d) where d is average digit count
    Space: O(1)
    """
    count = 0

    for num in nums:
        digit_count = len(str(abs(num)))  # abs() handles negatives
        if digit_count % 2 == 0:
            count += 1

    return count

# Test cases
find_numbers_with_even_digits([12, 345, 2, 6, 7896])  # 2
find_numbers_with_even_digits([555, 901, 482, 1771]) # 1

# MATHEMATICAL APPROACH (without string conversion):
import math

def count_digits(num):
    if num == 0:
        return 1
    return math.floor(math.log10(abs(num))) + 1

def even_digits_v2(nums):
    return sum(1 for num in nums if count_digits(num) % 2 == 0)

# ONE-LINER:
def even_digits_v3(nums):
    return sum(len(str(abs(n))) % 2 == 0 for n in nums)`
  },
  // Problem: Squares of a Sorted Array
  {
    signature: 'Squares of Sorted Array',
    description: 'Given sorted array, return squares in sorted order. Two-pointer from ends beats naive sort O(n log n) -> O(n).',
    complexity: 'O(n)',
    section: 'Problems',
    example: `# Problem: [-4, -1, 0, 3, 10] -> [0, 1, 9, 16, 100]
#          [-7, -3, 2, 3, 11] -> [4, 9, 9, 49, 121]

# APPROACH 1: Square + Sort (O(n log n))
def sorted_squares_basic(nums):
    squared = [num ** 2 for num in nums]
    squared.sort()
    return squared

# APPROACH 2: Two Pointers (O(n)) - OPTIMAL
def sorted_squares_optimal(nums):
    """
    Key insight: largest squares at ends (most negative or positive)
    Fill result array from the end
    """
    n = len(nums)
    result = [0] * n  # Pre-allocate result array

    left = 0
    right = n - 1
    position = n - 1  # Fill from the end

    while left <= right:
        left_square = nums[left] ** 2
        right_square = nums[right] ** 2

        if left_square > right_square:
            result[position] = left_square
            left += 1
        else:
            result[position] = right_square
            right -= 1

        position -= 1

    return result

# VISUAL WALKTHROUGH:
# Input: [-4, -1, 0, 3, 10]
#
# left=0 (-4), right=4 (10): 16 vs 100 -> result[4]=100
# left=0 (-4), right=3 (3):  16 vs 9   -> result[3]=16
# left=1 (-1), right=3 (3):  1  vs 9   -> result[2]=9
# left=1 (-1), right=2 (0):  1  vs 0   -> result[1]=1
# left=2 (0),  right=2 (0):  0  vs 0   -> result[0]=0
#
# Result: [0, 1, 9, 16, 100]`
  },
]

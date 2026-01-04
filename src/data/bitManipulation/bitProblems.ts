import type { Method } from '../../types'

// Finding Unique Elements, Subset Generation, Tricks
export const bitProblemsMethods: Method[] = [
  // Finding Unique Elements
  { signature: 'Single Number (XOR)', description: 'Find unique element when others appear twice. XOR all elements.', complexity: 'O(n)', section: 'Finding Unique', example: `# Every element appears twice except one
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num
    return result

# Why? XOR properties:
# a ^ a = 0
# a ^ 0 = a
# a ^ b ^ a = b

# Example: [4, 1, 2, 1, 2]
# 4 ^ 1 ^ 2 ^ 1 ^ 2
# = 4 ^ (1 ^ 1) ^ (2 ^ 2)
# = 4 ^ 0 ^ 0
# = 4

# Using reduce
from functools import reduce
def single_number_reduce(nums):
    return reduce(lambda x, y: x ^ y, nums)` },
  { signature: 'Two Unique Numbers', description: 'Find two unique numbers when others appear twice.', complexity: 'O(n)', section: 'Finding Unique', example: `def single_number_ii(nums):
    # XOR of all gives xor of the two unique numbers
    xor_all = 0
    for num in nums:
        xor_all ^= num

    # Find rightmost set bit (the two numbers differ here)
    diff_bit = xor_all & (-xor_all)

    # Partition into two groups based on this bit
    num1 = num2 = 0
    for num in nums:
        if num & diff_bit:
            num1 ^= num
        else:
            num2 ^= num

    return [num1, num2]

# Example: [1, 2, 1, 3, 2, 5]
# XOR all: 1^2^1^3^2^5 = 3^5 = 110^101 = 011 = 6
# Diff bit: 6 & -6 = 010 = 2
# Group with bit set: [2, 3, 2] -> XOR = 3
# Group without: [1, 1, 5] -> XOR = 5
# Result: [3, 5]` },
  { signature: 'Number Appearing Once (Three Times)', description: 'Find number appearing once when others appear three times.', complexity: 'O(n)', section: 'Finding Unique', example: `# Every element appears 3 times except one
def single_number_iii(nums):
    ones = twos = 0

    for num in nums:
        # ones holds bits that appeared 1 or 4 or 7... times
        # twos holds bits that appeared 2 or 5 or 8... times
        ones = (ones ^ num) & ~twos
        twos = (twos ^ num) & ~ones

    return ones

# Alternative: Count bits at each position
def single_number_iii_count(nums):
    result = 0
    for i in range(32):
        count = sum((num >> i) & 1 for num in nums)
        if count % 3:
            result |= (1 << i)

    # Handle negative numbers in Python
    if result >= 2**31:
        result -= 2**32

    return result

# Example: [2, 2, 3, 2]
# Bit 0: 0+0+1+0 = 1 (mod 3 = 1) -> set
# Bit 1: 1+1+1+1 = 4 (mod 3 = 1) -> set
# Result: 11 = 3` },

  // Subset Generation
  { signature: 'Subset Generation with Bits', description: 'Generate all subsets using bitmask. Each bit represents include/exclude.', complexity: 'O(2^n)', section: 'Subset Generation', example: `def subsets_bitmask(nums):
    n = len(nums)
    result = []

    # Iterate through all 2^n masks
    for mask in range(1 << n):
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)

    return result

# Example: [1, 2, 3]
# mask=0 (000): []
# mask=1 (001): [1]
# mask=2 (010): [2]
# mask=3 (011): [1, 2]
# mask=4 (100): [3]
# mask=5 (101): [1, 3]
# mask=6 (110): [2, 3]
# mask=7 (111): [1, 2, 3]

# Iterate through all subsets of a given mask
def iterate_submasks(mask):
    submask = mask
    while submask:
        print(bin(submask))
        submask = (submask - 1) & mask
    print('0')  # Empty subset

# Example: iterate_submasks(0b101) prints: 101, 100, 001, 0` },
  { signature: 'Bitmask DP', description: 'DP where state includes subset as bitmask. Common in TSP, assignment.', complexity: 'O(2^n * n)', section: 'Subset Generation', example: `# Traveling Salesman Problem (TSP)
def tsp(dist):
    n = len(dist)
    # dp[mask][i] = min cost to visit cities in mask, ending at i
    INF = float('inf')
    dp = [[INF] * n for _ in range(1 << n)]

    # Start at city 0
    dp[1][0] = 0

    for mask in range(1 << n):
        for last in range(n):
            if dp[mask][last] == INF:
                continue
            if not (mask & (1 << last)):
                continue

            # Try going to unvisited city
            for next_city in range(n):
                if mask & (1 << next_city):
                    continue
                new_mask = mask | (1 << next_city)
                dp[new_mask][next_city] = min(
                    dp[new_mask][next_city],
                    dp[mask][last] + dist[last][next_city]
                )

    # Return to start
    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in range(n))

# Example: 4 cities with distances
# dist = [[0, 10, 15, 20],
#         [10, 0, 35, 25],
#         [15, 35, 0, 30],
#         [20, 25, 30, 0]]
# Output: 80 (0->1->3->2->0)` },

  // Tricks
  { signature: 'Swap Without Temp', description: 'Swap two numbers using XOR.', complexity: 'O(1)', section: 'Tricks', example: `def swap(a, b):
    a = a ^ b
    b = a ^ b  # b = (a^b)^b = a
    a = a ^ b  # a = (a^b)^a = b
    return a, b

# Example: swap(5, 3)
# a = 5 ^ 3 = 6
# b = 6 ^ 3 = 5
# a = 6 ^ 5 = 3
# Result: (3, 5)

# In Python, this is cleaner:
a, b = b, a` },
  { signature: 'Check if Two Numbers Have Opposite Signs', description: 'XOR of opposite signs is negative.', complexity: 'O(1)', section: 'Tricks', example: `def opposite_signs(x, y):
    return (x ^ y) < 0

# Why? Sign bit:
# Positive: 0... (sign bit = 0)
# Negative: 1... (sign bit = 1)
# XOR of opposite signs: sign bit = 1 (negative)

# Example:
# 5 ^ -3 = negative -> opposite signs
# 5 ^ 3 = positive -> same sign
# -5 ^ -3 = positive -> same sign` },
  { signature: 'Find Missing Number', description: 'Find missing number in array [0, n] using XOR.', complexity: 'O(n)', section: 'Tricks', example: `def missing_number(nums):
    result = len(nums)  # Start with n
    for i, num in enumerate(nums):
        result ^= i ^ num
    return result

# Why? XOR all indices [0, n-1] and all values
# Missing value won't get cancelled

# Example: [3, 0, 1]
# result = 3 (n)
# i=0: result ^= 0 ^ 3 = 0
# i=1: result ^= 1 ^ 0 = 1
# i=2: result ^= 2 ^ 1 = 2
# Answer: 2 (missing number)

# Alternative using sum
def missing_number_sum(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)` },
  { signature: 'Reverse Bits', description: 'Reverse all bits in a 32-bit integer.', complexity: 'O(1)', section: 'Tricks', example: `def reverse_bits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result

# Example: reverse_bits(0b00000010100101000001111010011100)
# Output:   0b00111001011110000010100101000000

# Optimized with byte lookup table
def reverse_bits_fast(n):
    # Swap adjacent bits
    n = ((n & 0x55555555) << 1) | ((n & 0xAAAAAAAA) >> 1)
    # Swap pairs
    n = ((n & 0x33333333) << 2) | ((n & 0xCCCCCCCC) >> 2)
    # Swap nibbles
    n = ((n & 0x0F0F0F0F) << 4) | ((n & 0xF0F0F0F0) >> 4)
    # Swap bytes
    n = ((n & 0x00FF00FF) << 8) | ((n & 0xFF00FF00) >> 8)
    # Swap halves
    n = ((n & 0x0000FFFF) << 16) | ((n & 0xFFFF0000) >> 16)
    return n` },
  { signature: 'Add Without Plus', description: 'Add two numbers without using +. Use XOR and AND.', complexity: 'O(1)', section: 'Tricks', example: `def add(a, b):
    # XOR = sum without carry
    # AND << 1 = carry
    while b:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a

# Example: add(5, 3)
# a=5 (101), b=3 (011)
# carry = (101 & 011) << 1 = 001 << 1 = 010
# a = 101 ^ 011 = 110, b = 010
# carry = (110 & 010) << 1 = 010 << 1 = 100
# a = 110 ^ 010 = 100, b = 100
# carry = (100 & 100) << 1 = 100 << 1 = 1000
# a = 100 ^ 100 = 000, b = 1000
# carry = (000 & 1000) << 1 = 0
# a = 000 ^ 1000 = 1000 = 8
# Result: 8

# Handle negative numbers (32-bit)
def add_with_negative(a, b):
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF

    while b:
        carry = ((a & b) << 1) & MASK
        a = (a ^ b) & MASK
        b = carry

    return a if a <= MAX else ~(a ^ MASK)` },
]

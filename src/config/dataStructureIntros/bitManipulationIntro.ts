export const bitManipulationIntro = `Use Bit Manipulation When...
You need O(1) operations on individual bits for subset generation, finding unique elements, or flag management. Computers natively work with bits—bit operations are extremely fast. Key operators: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift). Choose bit manipulation for space optimization (pack booleans) or elegant solutions to specific problems.

\`\`\`python
# BIT BASICS
# 13 = 1101 = 8 + 4 + 0 + 1
# Bit 0 (rightmost) has value 2^0 = 1
# Bit 1 has value 2^1 = 2
# Bit 2 has value 2^2 = 4
# Bit 3 has value 2^3 = 8

# Check if bit i is set
def is_bit_set(n, i):
    return (n & (1 << i)) != 0

# Set bit i
def set_bit(n, i):
    return n | (1 << i)

# Clear bit i
def clear_bit(n, i):
    return n & ~(1 << i)

# Toggle bit i
def toggle_bit(n, i):
    return n ^ (1 << i)

# EXAMPLE: n = 5 = 101
print(is_bit_set(5, 0))   # True  (rightmost bit is 1)
print(is_bit_set(5, 1))   # False (middle bit is 0)
print(set_bit(5, 1))      # 7 = 111
print(clear_bit(5, 2))    # 1 = 001
\`\`\`
---
XOR Magic and Subset Generation
XOR properties: a ^ a = 0 and a ^ 0 = a. XOR-ing duplicates cancels them, leaving unique element—O(n) time, O(1) space. For subsets, iterate mask from 0 to 2^n - 1. Each bit i in mask represents whether to include element i. This maps integers to subsets naturally.

\`\`\`python
# FIND SINGLE NON-DUPLICATE - XOR trick
def single_number(nums):
    result = 0
    for num in nums:
        result ^= num  # Duplicates cancel out
    return result

# [4, 1, 2, 1, 2] -> 4 ^ 1 ^ 2 ^ 1 ^ 2 = 4

# SUBSET GENERATION - Bit masks
def subsets(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):  # Check if bit i is set
                subset.append(nums[i])
        result.append(subset)
    return result

# nums = [1, 2, 3]
# mask = 0 (000) -> []
# mask = 1 (001) -> [1]
# mask = 2 (010) -> [2]
# mask = 3 (011) -> [1, 2]
# mask = 4 (100) -> [3]
# mask = 5 (101) -> [1, 3]
# mask = 6 (110) -> [2, 3]
# mask = 7 (111) -> [1, 2, 3]
\`\`\`
---
Power of Two and Bit Counting
Power of 2 has exactly one bit set: 8 = 1000. Trick: n & (n-1) == 0 for powers of 2. Why? n-1 flips all bits from rightmost 1 to right, so AND cancels. For counting set bits, n & (n-1) clears rightmost set bit—repeat until n becomes 0.

\`\`\`python
# POWER OF TWO CHECK
def is_power_of_two(n):
    return n > 0 and (n & (n-1)) == 0

# Examples:
# 8 = 1000, 7 = 0111, 8 & 7 = 0000 -> True
# 6 = 0110, 5 = 0101, 6 & 5 = 0100 -> False

# COUNT SET BITS - Brian Kernighan's algorithm
def count_bits(n):
    count = 0
    while n:
        n &= n - 1  # Clear rightmost set bit
        count += 1
    return count

# 13 = 1101
# 13 & 12 = 1101 & 1100 = 1100 (count=1)
# 12 & 11 = 1100 & 1011 = 1000 (count=2)
# 8 & 7   = 1000 & 0111 = 0000 (count=3)
# Result: 3 set bits

# Python shortcut
count = bin(13).count('1')  # 3

# FLAGS - Pack multiple booleans
READ = 1 << 0   # 001
WRITE = 1 << 1  # 010
EXEC = 1 << 2   # 100

permissions = READ | WRITE  # 011
has_read = (permissions & READ) != 0      # True
has_exec = (permissions & EXEC) != 0      # False
permissions |= EXEC  # Add execute: 111
permissions &= ~WRITE  # Remove write: 101
\`\`\``

import type { Method } from '../../types'

// Why & When + Basic Operations
export const bitBasicsMethods: Method[] = [
  // Why & When
  { signature: 'Why use Bit Manipulation?', description: 'Extremely fast operations. O(1) for many tasks. Use for: flags, permissions, subsets, optimization.', complexity: 'Concept', section: 'Why & When', example: `# BITS = Binary digits (0 or 1)
# Each bit position represents a power of 2

# NUMBER TO BINARY:
# 13 = 1101 in binary
#    = 1*8 + 1*4 + 0*2 + 1*1
#    = 8 + 4 + 1 = 13

# WHY USE BITS?
# - Extremely fast (CPU native operations)
# - Memory efficient (pack multiple flags in one int)
# - Elegant solutions for subsets

# USE CASES:
# - Flags and permissions (read/write/execute)
# - Subset enumeration
# - Finding unique elements
# - Optimization problems
# - Cryptography
# - Network masks

# PYTHON BIT LITERALS:
a = 0b1101   # Binary: 13
b = 0o17    # Octal: 15
c = 0xF     # Hex: 15

# Convert to binary string
bin(13)     # '0b1101'
bin(13)[2:] # '1101'` },
  { signature: 'Bit Operators', description: 'AND, OR, XOR, NOT, shifts. Know these by heart.', complexity: 'O(1)', section: 'Why & When', example: `# AND (&): Both bits must be 1
#   1101
# & 1010
# ------
#   1000

# OR (|): Either bit can be 1
#   1101
# | 1010
# ------
#   1111

# XOR (^): Bits must be different
#   1101
# ^ 1010
# ------
#   0111

# NOT (~): Flip all bits
# ~1101 = ...11110010 (two's complement)

# LEFT SHIFT (<<): Multiply by 2
# 0011 << 1 = 0110 (3 << 1 = 6)
# 0011 << 2 = 1100 (3 << 2 = 12)

# RIGHT SHIFT (>>): Divide by 2
# 1100 >> 1 = 0110 (12 >> 1 = 6)
# 1100 >> 2 = 0011 (12 >> 2 = 3)

# XOR PROPERTIES:
# a ^ a = 0
# a ^ 0 = a
# a ^ b ^ a = b (used to find unique element)` },

  // Basic Operations
  { signature: 'Get/Set/Clear Bit', description: 'Manipulate individual bits at position k.', complexity: 'O(1)', section: 'Basic Operations', example: `# GET bit at position k (0-indexed from right)
def get_bit(n, k):
    return (n >> k) & 1

# Example: get_bit(13, 2) = get_bit(1101, 2) = 1

# SET bit at position k (make it 1)
def set_bit(n, k):
    return n | (1 << k)

# Example: set_bit(9, 2) = set_bit(1001, 2) = 1101 = 13

# CLEAR bit at position k (make it 0)
def clear_bit(n, k):
    return n & ~(1 << k)

# Example: clear_bit(13, 2) = clear_bit(1101, 2) = 1001 = 9

# TOGGLE bit at position k
def toggle_bit(n, k):
    return n ^ (1 << k)

# Example: toggle_bit(13, 2) = toggle_bit(1101, 2) = 1001 = 9
# Example: toggle_bit(9, 2) = toggle_bit(1001, 2) = 1101 = 13

# UPDATE bit at position k to value v
def update_bit(n, k, v):
    return (n & ~(1 << k)) | (v << k)` },
  { signature: 'Check Power of 2', description: 'Power of 2 has exactly one bit set. Use n & (n-1).', complexity: 'O(1)', section: 'Basic Operations', example: `def is_power_of_two(n):
    # Power of 2 has exactly one 1 bit
    # n & (n-1) clears the rightmost 1 bit
    # If result is 0, only one bit was set
    return n > 0 and (n & (n - 1)) == 0

# Why n & (n-1)?
# n   = 1000 (8)
# n-1 = 0111 (7)
# AND = 0000 (0) -> power of 2!

# n   = 1010 (10)
# n-1 = 1001 (9)
# AND = 1000 (8) -> not power of 2

# Also works for:
# Check if n is power of 4
def is_power_of_four(n):
    return n > 0 and (n & (n - 1)) == 0 and (n & 0xAAAAAAAA) == 0
    # 0xAAAAAAAA = 1010...1010 (all even positions)` },
  { signature: 'Count Set Bits', description: 'Count number of 1 bits (population count). Multiple approaches.', complexity: 'O(k) or O(1)', section: 'Basic Operations', example: `# Brian Kernighan's Algorithm - O(k) where k = number of 1s
def count_bits_kernighan(n):
    count = 0
    while n:
        n &= (n - 1)  # Clear rightmost 1 bit
        count += 1
    return count

# Example: 13 (1101)
# 1101 & 1100 = 1100 (count=1)
# 1100 & 1011 = 1000 (count=2)
# 1000 & 0111 = 0000 (count=3)

# Using built-in
def count_bits_builtin(n):
    return bin(n).count('1')

# Python 3.10+
def count_bits_popcount(n):
    return n.bit_count()

# Count bits for all numbers 0 to n
def count_bits_range(n):
    # dp[i] = number of 1s in i
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp

# Example: count_bits_range(5) = [0, 1, 1, 2, 1, 2]` },
  { signature: 'Get/Clear Lowest Set Bit', description: 'Manipulate the rightmost 1 bit.', complexity: 'O(1)', section: 'Basic Operations', example: `# Get lowest set bit (isolate rightmost 1)
def get_lowest_set_bit(n):
    return n & (-n)

# Why? Two's complement: -n = ~n + 1
# n  =  1010 (10)
# -n = 0110 (−10 in two's complement) = 0110
# Actually: -10 = ...11110110
# n & -n = ...00000010 = 2

# Clear lowest set bit
def clear_lowest_set_bit(n):
    return n & (n - 1)

# Example: clear_lowest_set_bit(12) = 12 & 11 = 1100 & 1011 = 1000 = 8

# Get all trailing zeros (position of lowest set bit)
def trailing_zeros(n):
    if n == 0:
        return -1
    count = 0
    while (n & 1) == 0:
        count += 1
        n >>= 1
    return count

# Or use: (n & -n).bit_length() - 1` },
]

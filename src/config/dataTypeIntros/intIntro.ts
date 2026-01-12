export const intIntro = `No Integer Overflow
Python integers have UNLIMITED precision—unlike C/Java where integers wrap at 2³¹-1, Python integers grow as large as memory allows. You can compute factorial(1000) or 2**10000 without errors. This eliminates overflow bugs but means operations are O(n) in digit count for huge numbers. No need for overflow checks in interviews.

\`\`\`python
# NO OVERFLOW - Arbitrarily large integers
factorial_100 = 1
for i in range(1, 101):
    factorial_100 *= i
# Result: 93326215443944152681699238856266700490715968264381621468...
# 158 digits! Compare to C/Java max: 2,147,483,647

print(2**100)  # 1267650600228229401496703205376
print(2**1000) # Works! (302 digits)

# Operations are O(n) in digit count for huge numbers
\`\`\`python
---
Division Types and Modulo
Python has THREE division operators. / always returns float. // is floor division rounding toward -∞ (NOT toward zero like C/Java). % is modulo with result having same sign as divisor. CRITICAL: -7 // 2 = -4 and -7 % 2 = 1 in Python (different from C/Java).

\`\`\`python
# TRUE DIVISION / - Always float
5 / 2      # 2.5 (not 2!)
10 / 3     # 3.3333...

# FLOOR DIVISION // - Rounds toward -∞
5 // 2     # 2 (floor of 2.5)
-7 // 2    # -4 (floor of -3.5, NOT -3!)
# CRITICAL: Rounds DOWN, not toward zero

# MODULO % - Same sign as divisor
5 % 2      # 1
-7 % 2     # 1 (NOT -1 like C/Java!)
7 % -2     # -1 (same sign as divisor)

# INVARIANT: a == (a // b) * b + (a % b)
# -7 == (-4) * 2 + 1 = -8 + 1 = -7
# DIVMOD - Get both at once
divmod(10, 3)  # (3, 1) = (10 // 3, 10 % 3)
divmod(-7, 2)  # (-4, 1)

# CIRCULAR INDEXING - Python's modulo shines
arr = [1, 2, 3, 4, 5]
arr[-2 % len(arr)]  # arr[3] = 4 (always valid!)
# -2 % 5 = 3 (wraps around)
\`\`\`python
---
Common Integer Patterns
Digit extraction with % 10 and // 10. XOR for finding unique elements (a ^ a = 0). Bit manipulation for flags and masks. Count True values with sum(). Use float('inf') for min/max initialization.

\`\`\`python
# DIGIT EXTRACTION - Right to left
n = 12345
while n:
    digit = n % 10  # Extract last digit
    n //= 10        # Remove last digit
# Simpler: [int(d) for d in str(12345)]

# REVERSE INTEGER
def reverse_int(n):
    sign = -1 if n < 0 else 1
    result = 0
    n = abs(n)
    while n:
        result = result * 10 + n % 10
        n //= 10
    return sign * result

# XOR TRICK - Find single non-duplicate
def single_number(nums):
    result = 0
    for n in nums:
        result ^= n  # a ^ a = 0, a ^ 0 = a
    return result
# [4, 1, 2, 1, 2] -> 4

# COUNT TRUE VALUES
bools = [True, False, True, True]
sum(bools)  # 3 (True = 1, False = 0)
sum(n % 2 == 0 for n in [1,2,3,4,5,6])  # 3 evens

# INFINITY FOR INITIALIZATION
min_val = float('inf')
for num in nums:
    min_val = min(min_val, num)

# POWER OF TWO CHECK
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0
# 8 = 1000, 7 = 0111, 8 & 7 = 0000\`\`\``

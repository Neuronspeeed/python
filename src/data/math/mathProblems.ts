import type { Method } from '../../types'

// Combinations, Power, Random, Number Theory Problems
export const mathProblemsMethods: Method[] = [
  // Combinatorics
  { signature: 'Pascal Triangle nCr', description: 'Compute combinations using Pascal\'s triangle. Avoids factorial overflow.', complexity: 'O(n*r)', section: 'Combinatorics', example: `def ncr_pascal(n, r):
    """
    Compute C(n, r) using Pascal's triangle.
    Avoids large intermediate values.
    """
    if r > n - r:
        r = n - r  # Optimization: C(n,r) = C(n, n-r)

    # Build row of Pascal's triangle
    dp = [1] * (r + 1)

    for i in range(1, n - r + 1):
        for j in range(r, 0, -1):
            dp[j] += dp[j - 1]

    return dp[r]

print(ncr_pascal(10, 3))  # 120

# Alternative: Direct formula
def ncr_direct(n, r):
    """
    C(n,r) = n! / (r! * (n-r)!)
    Compute without full factorial.
    """
    if r > n - r:
        r = n - r

    result = 1
    for i in range(r):
        result = result * (n - i) // (i + 1)

    return result

# Generate full Pascal's triangle
def pascal_triangle(n):
    triangle = [[1]]
    for i in range(1, n):
        row = [1]
        for j in range(1, i):
            row.append(triangle[i-1][j-1] + triangle[i-1][j])
        row.append(1)
        triangle.append(row)
    return triangle` },

  { signature: 'Catalan Numbers', description: 'Count valid parentheses, BST structures, paths. C(n) = C(2n,n)/(n+1).', complexity: 'O(n)', section: 'Combinatorics', example: `def catalan(n):
    """
    nth Catalan number.
    Applications:
    - Valid parentheses combinations
    - Number of BST structures with n nodes
    - Paths in grid staying below diagonal
    """
    if n <= 1:
        return 1

    # Formula: C(n) = C(2n, n) / (n + 1)
    result = 1
    for i in range(n):
        result = result * (2 * n - i) // (i + 1)
    return result // (n + 1)

# DP approach
def catalan_dp(n):
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1

    for i in range(2, n + 1):
        for j in range(i):
            dp[i] += dp[j] * dp[i - 1 - j]

    return dp[n]

# First 10 Catalan numbers:
print([catalan(i) for i in range(10)])
# [1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862]

# INTERVIEW: Unique BSTs
def num_trees(n):
    """Number of structurally unique BSTs with n nodes."""
    return catalan(n)` },

  // Power Problems
  { signature: 'Power of Two/Three/Four', description: 'Check if number is power of base. Use bit manipulation or log.', complexity: 'O(1)', section: 'Powers', example: `import math

# Power of 2: only one bit set
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Power of 3: largest power of 3 divisible by n
def is_power_of_3(n):
    # 3^19 = 1162261467 is largest 32-bit power of 3
    return n > 0 and 1162261467 % n == 0

# Power of 4: power of 2 AND bits at even positions
def is_power_of_4(n):
    # 0x55555555 = 0101...0101 (bits at even positions)
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

# Generic power check
def is_power_of(n, base):
    if n <= 0:
        return False
    while n % base == 0:
        n //= base
    return n == 1

# Using logarithm
def is_power_of_log(n, base):
    if n <= 0:
        return False
    log_val = math.log(n) / math.log(base)
    return abs(log_val - round(log_val)) < 1e-10

print(is_power_of_2(16))  # True
print(is_power_of_3(27))  # True
print(is_power_of_4(64))  # True` },

  { signature: 'Sqrt & Power Functions', description: 'Compute square root and power without built-ins. Binary search or Newton\'s method.', complexity: 'O(log n)', section: 'Powers', example: `# Square root with binary search
def my_sqrt(x):
    """Integer square root (floor)."""
    if x < 2:
        return x

    left, right = 1, x // 2

    while left <= right:
        mid = (left + right) // 2
        if mid * mid == x:
            return mid
        elif mid * mid < x:
            left = mid + 1
        else:
            right = mid - 1

    return right

# Newton's method (faster convergence)
def sqrt_newton(x, precision=1e-10):
    if x < 0:
        raise ValueError("Negative input")
    if x == 0:
        return 0

    guess = x
    while abs(guess * guess - x) > precision:
        guess = (guess + x / guess) / 2

    return guess

# Power function (x^n)
def my_pow(x, n):
    """Compute x^n using binary exponentiation."""
    if n < 0:
        x = 1 / x
        n = -n

    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2

    return result

print(my_sqrt(8))       # 2
print(my_pow(2, 10))    # 1024
print(my_pow(2, -2))    # 0.25` },

  // Number Properties
  { signature: 'Happy Number', description: 'Sum of squares of digits eventually reaches 1. Use cycle detection.', complexity: 'O(log n)', section: 'Number Theory', example: `def is_happy(n):
    """
    A happy number reaches 1 when replacing with
    sum of squares of digits repeatedly.
    Use Floyd's cycle detection.
    """
    def get_next(num):
        total = 0
        while num > 0:
            digit = num % 10
            total += digit * digit
            num //= 10
        return total

    slow = n
    fast = get_next(n)

    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))

    return fast == 1

# Alternative: HashSet for cycle detection
def is_happy_set(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1

print(is_happy(19))  # True: 19->82->68->100->1
print(is_happy(2))   # False` },

  { signature: 'Ugly Number', description: 'Numbers whose prime factors are only 2, 3, 5. Use heap or DP.', complexity: 'O(n)', section: 'Number Theory', example: `# Check if ugly
def is_ugly(n):
    """Ugly number has only 2, 3, 5 as prime factors."""
    if n <= 0:
        return False
    for p in [2, 3, 5]:
        while n % p == 0:
            n //= p
    return n == 1

# Find nth ugly number (DP)
def nth_ugly(n):
    """Return the nth ugly number."""
    ugly = [0] * n
    ugly[0] = 1

    i2 = i3 = i5 = 0  # Pointers for each prime
    next2, next3, next5 = 2, 3, 5

    for i in range(1, n):
        next_ugly = min(next2, next3, next5)
        ugly[i] = next_ugly

        if next_ugly == next2:
            i2 += 1
            next2 = ugly[i2] * 2
        if next_ugly == next3:
            i3 += 1
            next3 = ugly[i3] * 3
        if next_ugly == next5:
            i5 += 1
            next5 = ugly[i5] * 5

    return ugly[n - 1]

print(nth_ugly(10))  # 12
# Sequence: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12...

# Super Ugly (generalized primes)
import heapq

def nth_super_ugly(n, primes):
    heap = [1]
    seen = {1}

    for _ in range(n):
        ugly = heapq.heappop(heap)
        for p in primes:
            next_ugly = ugly * p
            if next_ugly not in seen:
                seen.add(next_ugly)
                heapq.heappush(heap, next_ugly)

    return ugly` },

  { signature: 'Reverse Integer', description: 'Reverse digits handling overflow. Check bounds before multiplying.', complexity: 'O(log n)', section: 'Number Theory', example: `def reverse_integer(x):
    """
    Reverse digits of 32-bit signed integer.
    Return 0 if overflow.
    """
    INT_MIN, INT_MAX = -2**31, 2**31 - 1

    sign = 1 if x >= 0 else -1
    x = abs(x)

    result = 0
    while x:
        digit = x % 10
        x //= 10

        # Check for overflow before adding
        if result > (INT_MAX - digit) // 10:
            return 0

        result = result * 10 + digit

    return sign * result

print(reverse_integer(123))   # 321
print(reverse_integer(-123))  # -321
print(reverse_integer(1534236469))  # 0 (overflow)

# Palindrome number
def is_palindrome(x):
    """Check if integer is palindrome without converting to string."""
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reversed_half = 0
    while x > reversed_half:
        reversed_half = reversed_half * 10 + x % 10
        x //= 10

    return x == reversed_half or x == reversed_half // 10

print(is_palindrome(121))   # True
print(is_palindrome(1221))  # True` },

  { signature: 'Integer to Roman', description: 'Convert integer to Roman numeral. Greedy with value-symbol pairs.', complexity: 'O(1)', section: 'Number Theory', example: `def int_to_roman(num):
    """Convert integer to Roman numeral."""
    val_sym = [
        (1000, 'M'), (900, 'CM'), (500, 'D'), (400, 'CD'),
        (100, 'C'), (90, 'XC'), (50, 'L'), (40, 'XL'),
        (10, 'X'), (9, 'IX'), (5, 'V'), (4, 'IV'), (1, 'I')
    ]

    result = []
    for val, sym in val_sym:
        while num >= val:
            result.append(sym)
            num -= val

    return ''.join(result)

print(int_to_roman(1994))  # "MCMXCIV"

def roman_to_int(s):
    """Convert Roman numeral to integer."""
    values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    }

    result = 0
    prev = 0

    for char in reversed(s):
        curr = values[char]
        if curr < prev:
            result -= curr
        else:
            result += curr
        prev = curr

    return result

print(roman_to_int("MCMXCIV"))  # 1994` },

  { signature: 'Count Digits / Sum of Digits', description: 'Count or sum digits of a number. Use modulo and division.', complexity: 'O(log n)', section: 'Number Theory', example: `def count_digits(n):
    """Count number of digits."""
    if n == 0:
        return 1
    count = 0
    n = abs(n)
    while n:
        count += 1
        n //= 10
    return count

# Or using log
import math
def count_digits_log(n):
    if n == 0:
        return 1
    return int(math.log10(abs(n))) + 1

def sum_of_digits(n):
    """Sum of all digits."""
    total = 0
    n = abs(n)
    while n:
        total += n % 10
        n //= 10
    return total

# Digital root (repeated sum until single digit)
def digital_root(n):
    """
    Keep summing digits until single digit.
    Formula: 1 + (n-1) % 9 for n > 0
    """
    if n == 0:
        return 0
    return 1 + (n - 1) % 9

print(count_digits(12345))    # 5
print(sum_of_digits(12345))   # 15
print(digital_root(12345))    # 6 (1+2+3+4+5=15, 1+5=6)

# Add digits (LeetCode 258)
def add_digits(num):
    return digital_root(num)` },

  { signature: 'Self Dividing Numbers', description: 'Numbers divisible by all their digits. No zeros allowed.', complexity: 'O(log n)', section: 'Number Theory', example: `def is_self_dividing(n):
    """
    Number divisible by all its non-zero digits.
    Example: 128 -> 128%1=0, 128%2=0, 128%8=0 ✓
    """
    original = n
    while n:
        digit = n % 10
        if digit == 0 or original % digit != 0:
            return False
        n //= 10
    return True

def self_dividing_range(left, right):
    """Find all self-dividing numbers in range."""
    return [n for n in range(left, right + 1) if is_self_dividing(n)]

print(self_dividing_range(1, 22))
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]

# Armstrong/Narcissistic numbers
def is_armstrong(n):
    """
    Sum of digits^(num_digits) equals number.
    Example: 153 = 1^3 + 5^3 + 3^3
    """
    s = str(n)
    power = len(s)
    return n == sum(int(d) ** power for d in s)

print([n for n in range(1, 1000) if is_armstrong(n)])
# [1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407]` },
]

import type { Method } from '../../types'

// GCD/LCM, Prime Numbers, Modular Arithmetic
export const mathBasicsMethods: Method[] = [
  // Why & When
  { signature: 'GCD/LCM - when you need them', description: 'GCD: simplify fractions, find patterns, scheduling. LCM: synchronization, repeating events. Both O(log n). More common in interviews than you think!', complexity: 'Concept', section: 'Why & When', example: `# GCD (Greatest Common Divisor)
# USE CASES:
# 1. Simplify fractions: gcd(numerator, denominator)
# 2. Check if coprime: gcd(a, b) == 1
# 3. Reduce problem size: array pattern problems
# 4. Scheduling: "Every X and Y days" → gcd

# Example: Simplify 18/24
import math
g = math.gcd(18, 24)  # 6
print(f"{18//g}/{24//g}")  # 3/4

# Example: Rotating array problem
# "After how many rotations does array return to start?"
# Answer: len(arr) / gcd(len(arr), k)

# LCM (Least Common Multiple)
# USE CASES:
# 1. Find when events sync: buses every X and Y min
# 2. Fraction addition (common denominator)
# 3. Grid problems (when patterns align)

# Example: Two buses - every 6 and 8 minutes
# When do they meet again?
lcm = 6 * 8 // math.gcd(6, 8)  # 24 minutes

# INTERVIEW GOTCHA:
# "Reduce array by gcd" problems:
# [2, 4, 6, 8] → gcd = 2 → [1, 2, 3, 4]
# [12, 18, 24] → gcd = 6 → [2, 3, 4]

# PERFORMANCE:
# math.gcd() is FAST: O(log min(a,b))
# Even for large numbers: gcd(10^18, 10^18) < 100 steps`,
  },

  { signature: 'Prime numbers - when and how', description: 'Trial division for single check O(√n). Sieve for multiple primes O(n log log n). Choose based on problem: checking vs generating. Big performance difference!', complexity: 'Concept', section: 'Why & When', example: `# PROBLEM: Check if ONE number is prime
# → Use TRIAL DIVISION: O(√n)
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for i in range(3, int(n**0.5) + 1, 2):
        if n % i == 0: return False
    return True

# Fast enough for n up to 10^12 in interviews!

# PROBLEM: Find ALL primes up to N
# → Use SIEVE: O(n log log n)
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n+1) if is_prime[i]]

# PERFORMANCE COMPARISON:
# Find all primes up to 1,000,000:
# Trial division (check each): ~10 seconds
# Sieve: ~0.1 seconds (100x faster!)

# WHEN SIEVE MATTERS:
# ✓ Need primes up to N (N < 10^7)
# ✓ Factorization of many numbers
# ✓ Counting primes in range

# WHEN TRIAL DIVISION:
# ✓ Check single number
# ✓ N is very large (> 10^9)
# ✓ Need primality only, not all primes

# INTERVIEW PATTERN:
# "Count primes up to n" → Sieve (LeetCode 204)
# "Is n prime?" → Trial division
# "Prime factorization" → Trial division with √n limit`,
  },

  { signature: 'Modular arithmetic - why it matters', description: 'Prevents integer overflow. Required for large number problems. Competitive programming staple. Learn the rules: (a+b)%m, (a*b)%m work. Division needs modular inverse!', complexity: 'Concept', section: 'Why & When', example: `# WHY MODULO?
# Problem: Compute 2^1000
# Answer has 300+ digits! Python int can handle it, but...
# - Memory intensive
# - Comparison/arithmetic slow
# - Interview: "return answer mod 10^9+7"

MOD = 10**9 + 7  # Common in competitive programming

# MODULAR RULES (what works):
a, b = 12345, 67890

# Addition ✓
print((a + b) % MOD == ((a % MOD) + (b % MOD)) % MOD)

# Subtraction ✓ (watch negatives!)
print((a - b + MOD) % MOD)  # Add MOD to handle negative

# Multiplication ✓
print((a * b) % MOD == ((a % MOD) * (b % MOD)) % MOD)

# Exponentiation ✓
print(pow(2, 100, MOD))  # Built-in handles mod efficiently!

# Division ✗ (DOESN'T WORK DIRECTLY!)
# (a / b) % MOD is WRONG!
# Need modular inverse: (a * modinv(b)) % MOD

# WHEN YOU SEE MOD:
# "Return answer modulo 10^9+7" →
# 1. Apply mod to intermediate results
# 2. Use pow(base, exp, MOD) for powers
# 3. For division, use modular inverse (Fermat's)

# INTERVIEW EXAMPLE: Factorial mod
def factorial_mod(n):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % MOD
    return result

# Without mod: factorial(100) has 150+ digits
# With mod: always fits in int32

# COMMON INTERVIEW PATTERN:
# "Count ways to..." → answer is huge → return mod 10^9+7
# Examples: Climbing stairs, unique paths, combinations`,
  },

  // GCD/LCM
  { signature: 'GCD - Euclidean Algorithm', description: 'Greatest Common Divisor. Use modulo recursively until remainder is 0.', complexity: 'O(log min(a,b))', section: 'GCD/LCM', example: `import math

# Built-in (Python 3.5+)
print(math.gcd(12, 18))  # 6

# Manual implementation (Euclidean algorithm)
def gcd(a, b):
    """Greatest Common Divisor using Euclidean algorithm."""
    while b:
        a, b = b, a % b
    return a

# How it works:
# gcd(48, 18)
# = gcd(18, 48 % 18) = gcd(18, 12)
# = gcd(12, 18 % 12) = gcd(12, 6)
# = gcd(6, 12 % 6) = gcd(6, 0)
# = 6

# Recursive version
def gcd_recursive(a, b):
    return a if b == 0 else gcd_recursive(b, a % b)

# GCD of list (Python 3.9+)
from math import gcd
from functools import reduce

nums = [12, 18, 24]
result = reduce(gcd, nums)  # 6` },

  { signature: 'LCM - Least Common Multiple', description: 'LCM = (a * b) / GCD. Avoid overflow by dividing first.', complexity: 'O(log min(a,b))', section: 'GCD/LCM', example: `import math

# Built-in (Python 3.9+)
print(math.lcm(4, 6))  # 12

# Manual implementation using GCD
def lcm(a, b):
    """Least Common Multiple using GCD."""
    return a * b // math.gcd(a, b)

# Avoid overflow: divide before multiply
def lcm_safe(a, b):
    return a // math.gcd(a, b) * b

# LCM of list
from functools import reduce
nums = [4, 6, 8]
result = reduce(lcm, nums)  # 24

# INTERVIEW: Fraction addition
# To add fractions, find LCM of denominators
def add_fractions(frac1, frac2):
    """Add two fractions given as (numerator, denominator)."""
    n1, d1 = frac1
    n2, d2 = frac2
    common_denom = lcm(d1, d2)
    new_num = n1 * (common_denom // d1) + n2 * (common_denom // d2)
    common = math.gcd(new_num, common_denom)
    return (new_num // common, common_denom // common)

print(add_fractions((1, 4), (1, 6)))  # (5, 12)` },

  { signature: 'Extended Euclidean Algorithm', description: 'Find x, y such that ax + by = gcd(a, b). Used for modular inverse.', complexity: 'O(log min(a,b))', section: 'GCD/LCM', example: `def extended_gcd(a, b):
    """
    Returns (gcd, x, y) such that ax + by = gcd(a, b)
    """
    if b == 0:
        return a, 1, 0

    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1

    return gcd, x, y

# Example: 35x + 15y = gcd(35, 15) = 5
g, x, y = extended_gcd(35, 15)
print(f"{35}*{x} + {15}*{y} = {g}")
# 35 * 1 + 15 * (-2) = 5

# Application: Modular inverse
# Find x such that (a * x) % m = 1
def mod_inverse(a, m):
    """
    Modular multiplicative inverse.
    Returns x such that (a * x) % m = 1.
    Only exists if gcd(a, m) = 1.
    """
    g, x, _ = extended_gcd(a, m)
    if g != 1:
        return None  # Inverse doesn't exist
    return x % m

print(mod_inverse(3, 7))  # 5, because 3*5 = 15 = 1 (mod 7)` },

  // Prime Numbers
  { signature: 'Prime Check', description: 'Check if number is prime. Only check up to sqrt(n).', complexity: 'O(sqrt(n))', section: 'Primes', example: `def is_prime(n):
    """Check if n is prime."""
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Only check odd numbers up to sqrt(n)
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2

    return True

# More readable version
def is_prime_v2(n):
    if n < 2:
        return False
    if n == 2 or n == 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False

    # All primes > 3 are of form 6k +/- 1
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6

    return True

print([n for n in range(20) if is_prime(n)])
# [2, 3, 5, 7, 11, 13, 17, 19]` },

  { signature: 'Sieve of Eratosthenes', description: 'Find all primes up to n. Mark multiples of each prime as composite.', complexity: 'O(n log log n)', section: 'Primes', example: `def sieve_of_eratosthenes(n):
    """
    Return list of all primes up to n.
    Classic O(n log log n) algorithm.
    """
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    # Only need to check up to sqrt(n)
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples as not prime
            # Start at i*i (smaller multiples already marked)
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

print(sieve_of_eratosthenes(30))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

# Count primes (LeetCode 204)
def count_primes(n):
    if n <= 2:
        return 0
    sieve = [True] * n
    sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            for j in range(i*i, n, i):
                sieve[j] = False
    return sum(sieve)` },

  { signature: 'Prime Factorization', description: 'Find all prime factors with their powers. Divide by smallest factor repeatedly.', complexity: 'O(sqrt(n))', section: 'Primes', example: `def prime_factorization(n):
    """
    Return dict of {prime: power}.
    """
    factors = {}

    # Check for 2s
    while n % 2 == 0:
        factors[2] = factors.get(2, 0) + 1
        n //= 2

    # Check odd numbers up to sqrt(n)
    i = 3
    while i * i <= n:
        while n % i == 0:
            factors[i] = factors.get(i, 0) + 1
            n //= i
        i += 2

    # If n is still > 1, it's a prime factor
    if n > 1:
        factors[n] = 1

    return factors

print(prime_factorization(84))
# {2: 2, 3: 1, 7: 1}  ->  84 = 2^2 * 3 * 7

print(prime_factorization(100))
# {2: 2, 5: 2}  ->  100 = 2^2 * 5^2

# Get all factors (not just prime)
def all_factors(n):
    factors = []
    for i in range(1, int(n**0.5) + 1):
        if n % i == 0:
            factors.append(i)
            if i != n // i:
                factors.append(n // i)
    return sorted(factors)

print(all_factors(12))  # [1, 2, 3, 4, 6, 12]` },

  // Modular Arithmetic
  { signature: 'Modular Exponentiation', description: 'Compute (base^exp) % mod efficiently. Square-and-multiply algorithm.', complexity: 'O(log exp)', section: 'Modular', example: `# Built-in pow with mod (fastest)
result = pow(2, 100, 1000000007)

# Manual implementation
def mod_pow(base, exp, mod):
    """
    Compute (base^exp) % mod efficiently.
    Uses binary exponentiation.
    """
    result = 1
    base = base % mod

    while exp > 0:
        # If exp is odd, multiply result
        if exp % 2 == 1:
            result = (result * base) % mod

        # Square the base
        exp //= 2
        base = (base * base) % mod

    return result

print(mod_pow(2, 10, 1000))  # 24 (1024 % 1000)

# INTERVIEW: Large power computation
# 2^100 % (10^9 + 7)
MOD = 10**9 + 7
print(pow(2, 100, MOD))  # Fast!

# Recursive version
def mod_pow_recursive(base, exp, mod):
    if exp == 0:
        return 1
    if exp % 2 == 0:
        half = mod_pow_recursive(base, exp // 2, mod)
        return (half * half) % mod
    else:
        return (base * mod_pow_recursive(base, exp - 1, mod)) % mod` },

  { signature: 'Modular Inverse', description: 'Find x where (a * x) % m = 1. Use Fermat or extended GCD.', complexity: 'O(log m)', section: 'Modular', example: `# Method 1: Using pow (Python 3.8+)
# Works when m is prime
def mod_inverse_pow(a, m):
    """
    Modular inverse using Fermat's little theorem.
    Only works when m is PRIME.
    a^(-1) = a^(m-2) (mod m)
    """
    return pow(a, m - 2, m)

MOD = 10**9 + 7  # Prime!
inv = mod_inverse_pow(3, MOD)
print((3 * inv) % MOD)  # 1

# Method 2: Extended GCD (works for any coprime m)
def mod_inverse_ext_gcd(a, m):
    def extended_gcd(a, b):
        if b == 0:
            return a, 1, 0
        g, x, y = extended_gcd(b, a % b)
        return g, y, x - (a // b) * y

    g, x, _ = extended_gcd(a % m, m)
    if g != 1:
        return None
    return x % m

# INTERVIEW: Division under modulo
# a / b (mod m) = a * b^(-1) (mod m)
def mod_divide(a, b, m):
    return (a * mod_inverse_pow(b, m)) % m

# Example: 10 / 2 (mod 7) = 5 (since 5*2 = 10 = 3 (mod 7))
print(mod_divide(10, 2, 7))  # 5` },

  { signature: 'Modular Arithmetic Rules', description: 'Addition, subtraction, multiplication under modulo. Division needs modular inverse.', complexity: 'O(1)', section: 'Modular', example: `MOD = 10**9 + 7

# Addition
def mod_add(a, b, m=MOD):
    return (a % m + b % m) % m

# Subtraction (handle negative)
def mod_sub(a, b, m=MOD):
    return (a % m - b % m + m) % m

# Multiplication
def mod_mul(a, b, m=MOD):
    return (a % m * b % m) % m

# IMPORTANT: No direct division!
# a / b (mod m) = a * mod_inverse(b, m) (mod m)

# INTERVIEW: Compute factorial % MOD
def factorial_mod(n, mod=MOD):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % mod
    return result

# Compute nCr % MOD
def ncr_mod(n, r, mod=MOD):
    """Compute C(n, r) % mod using Fermat's little theorem."""
    if r > n or r < 0:
        return 0

    # Precompute factorials
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = (fact[i-1] * i) % mod

    # nCr = n! / (r! * (n-r)!)
    # Under mod: n! * inverse(r!) * inverse((n-r)!)
    numerator = fact[n]
    denominator = (fact[r] * fact[n - r]) % mod
    return (numerator * pow(denominator, mod - 2, mod)) % mod

print(ncr_mod(10, 3))  # 120` },
]

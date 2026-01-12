import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
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

  { signature: 'Prime numbers - when and how', description: 'Trial division for single check O(sqrt(n)). Sieve for multiple primes O(n log log n). Choose based on problem: checking vs generating. Big performance difference!', complexity: 'Concept', section: 'Why & When', example: `# PROBLEM: Check if ONE number is prime
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
# - Need primes up to N (N < 10^7)
# - Factorization of many numbers
# - Counting primes in range

# WHEN TRIAL DIVISION:
# - Check single number
# - N is very large (> 10^9)
# - Need primality only, not all primes

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

# Addition (correct)
print((a + b) % MOD == ((a % MOD) + (b % MOD)) % MOD)

# Subtraction - (watch negatives!)
print((a - b + MOD) % MOD)  # Add MOD to handle negative

# Multiplication (correct)
print((a * b) % MOD == ((a % MOD) * (b % MOD)) % MOD)

# Exponentiation (correct)
print(pow(2, 100, MOD))  # Built-in handles mod efficiently!

# Division - (DOESN'T WORK DIRECTLY!)
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
]

import type { Method } from '../../../types'

export const gcdLcmMethods: Method[] = [
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
]

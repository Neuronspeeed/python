import type { Method } from '../../../types'

export const modularMethods: Method[] = [
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

export const mathIntro = `Mathematical algorithms form the foundation for many coding problems. These aren't abstract formulas—they're practical tools that appear in interviews and real systems. The key insight: knowing when to use each technique (GCD vs LCM, sieve vs trial division, modular arithmetic) matters more than memorizing proofs.

WHY MATH IN INTERVIEWS: Math problems test pattern recognition and formula application, not theoretical proofs. When you see "count ways to arrange", think combinatorics. "Find cycle length", think GCD/LCM. "Result mod 10^9+7", think modular arithmetic. "Is prime", think trial division or sieve. The trick is recognizing which tool to use—once you know, the implementation is straightforward.

**The math interview paradox:**
- Interview = pattern recognition (which formula applies?)
- NOT = mathematical proofs or derivations
- Strategy: Learn when to use each technique, not why it works
- Common fear: "I'm bad at math" -> Actually, you just need to recognize patterns

GCD AND LCM: WHEN AND WHY

**GCD (Greatest Common Divisor)**: Largest number that divides both inputs evenly.

Use GCD when:
- Simplifying fractions: \`gcd(numerator, denominator)\`
- Checking if coprime (gcd = 1): for cryptography, hashing
- Finding repeating cycles/patterns: cycle length divides both periods
- Reducing problems to simplest form

**LCM (Least Common Multiple)**: Smallest number divisible by both inputs.

Use LCM when:
- Synchronization: "When do events align again?"
- Finding common denominators for fraction addition
- Merging cycles: lights blinking at different rates
- Tiling problems: when patterns repeat together

\`\`\`python
import math

# GCD - highly optimized, use it!
def gcd_example(a, b):
    return math.gcd(a, b)  # Euclidean algorithm O(log min(a,b))

# LCM = (a * b) / gcd(a, b)
def lcm(a, b):
    return a * b // math.gcd(a, b)

# Python 3.9+: math.lcm() built-in
# Python 3.9+: math.gcd() accepts multiple arguments
math.gcd(12, 18, 24)  # 6
math.lcm(4, 6, 8)     # 24

# GCD of array
from functools import reduce
def gcd_array(arr):
    return reduce(math.gcd, arr)

# LCM of array
def lcm_array(arr):
    return reduce(lcm, arr)
\`\`\`python

**Euclidean Algorithm (know the concept):**
\`\`\`python
def gcd_manual(a, b):
    """
    gcd(a, b) = gcd(b, a % b) until b = 0
    Then gcd = a
    """
    while b:
        a, b = b, a % b
    return a

# Why it works:
# gcd(48, 18) = gcd(18, 48 % 18) = gcd(18, 12)
# gcd(18, 12) = gcd(12, 18 % 12) = gcd(12, 6)
# gcd(12, 6) = gcd(6, 12 % 6) = gcd(6, 0)
# Result: 6
\`\`\`python

PRIMES: TRIAL DIVISION VS SIEVE

**Trial Division**: Check if single number is prime.

\`\`\`python
def is_prime(n):
    """
    O(sqrt(n)) - check divisors up to sqrt(n)
    Why sqrt? If n = a * b, at least one of a, b <= sqrt(n)
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(n**0.5) + 1, 2):  # Only odd divisors
        if n % i == 0:
            return False
    return True
\`\`\`python

**Sieve of Eratosthenes**: Find ALL primes up to n.

\`\`\`python
def sieve(n):
    """
    Find all primes up to n.
    O(n log log n) time, O(n) space
    """
    if n < 2:
        return []

    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # Mark all multiples as not prime
            for j in range(i*i, n + 1, i):  # Start at i*i (optimization)
                is_prime[j] = False

    return [i for i in range(n + 1) if is_prime[i]]

# When to use each:
# - Single number: trial division O(sqrt(n))
# - Many queries or all primes up to n: sieve O(n log log n)
\`\`\`python

MODULAR ARITHMETIC: THE BIG NUMBER TRICK

When problems say "return answer mod 10^9 + 7", they're avoiding integer overflow. The key: apply mod at each step, not just at the end.

**Modular properties:**
\`\`\`python
MOD = 10**9 + 7

# These are equivalent:
(a + b) % MOD == ((a % MOD) + (b % MOD)) % MOD
(a * b) % MOD == ((a % MOD) * (b % MOD)) % MOD
(a - b) % MOD == ((a % MOD) - (b % MOD) + MOD) % MOD  # +MOD prevents negative

# BUT NOT for division!
(a / b) % MOD != (a % MOD) / (b % MOD)  # WRONG!

# For division, use modular inverse:
# a / b mod p = a * b^(-1) mod p = a * pow(b, p-2, p) mod p (Fermat's little theorem)
def mod_divide(a, b, mod=MOD):
    return (a * pow(b, mod - 2, mod)) % mod
\`\`\`python

**Modular exponentiation:**
\`\`\`python
# Python built-in is fastest
pow(base, exp, mod)  # base^exp % mod in O(log exp)

# Example: 2^1000000 % (10^9 + 7)
result = pow(2, 1000000, 10**9 + 7)  # Instant!

# Without mod, 2^1000000 would have 301,030 digits
\`\`\`python

COMBINATORICS: COUNTING ARRANGEMENTS

**Factorial, Permutations, Combinations:**
\`\`\`python
import math

# Factorial
math.factorial(5)  # 120

# Permutations: P(n, r) = n! / (n-r)!
# Order matters: "how many ways to arrange r items from n"
math.perm(5, 2)  # 20 (Python 3.8+)

# Combinations: C(n, r) = n! / (r! * (n-r)!)
# Order doesn't matter: "how many ways to choose r items from n"
math.comb(5, 2)  # 10 (Python 3.8+)

# Manual with mod (common in interviews):
def factorial_mod(n, mod):
    result = 1
    for i in range(2, n + 1):
        result = (result * i) % mod
    return result

def comb_mod(n, r, mod):
    """C(n, r) mod p using modular inverse"""
    if r > n:
        return 0
    num = factorial_mod(n, mod)
    denom = (factorial_mod(r, mod) * factorial_mod(n - r, mod)) % mod
    return (num * pow(denom, mod - 2, mod)) % mod
\`\`\`python

**Pascal's Triangle** (for repeated combination queries):
\`\`\`python
def build_pascal(n):
    """
    Build Pascal's triangle up to row n.
    pascal[n][r] = C(n, r)
    """
    pascal = [[1] * (i + 1) for i in range(n + 1)]

    for i in range(2, n + 1):
        for j in range(1, i):
            pascal[i][j] = pascal[i-1][j-1] + pascal[i-1][j]

    return pascal

# C(5, 2) = pascal[5][2] = 10
\`\`\`python

COMMON INTERVIEW PATTERNS:

**1. "Return result mod 10^9+7"**
\`\`\`python
MOD = 10**9 + 7
# Apply mod after every operation
result = ((a % MOD) * (b % MOD)) % MOD
\`\`\`python

**2. "Count ways to..." -> Usually combinatorics**
\`\`\`python
# Paths in grid: C(m+n-2, m-1)
# Arrange with duplicates: n! / (a! * b! * c!)
# Choose r from n: C(n, r)
\`\`\`python

**3. "Simplify fraction" -> GCD**
\`\`\`python
def simplify(num, den):
    g = math.gcd(num, den)
    return num // g, den // g
\`\`\`python

**4. "When do cycles align?" -> LCM**
\`\`\`python
# Event A every 3 days, B every 4 days
# Align every lcm(3, 4) = 12 days
\`\`\`python

COMMON GOTCHAS:

**1. Integer overflow in intermediate calculations:**
\`\`\`python
# WRONG: Overflow before mod
result = (a * b * c) % MOD  # a*b might overflow first!

# GOOD: Mod at each step
result = ((a % MOD) * (b % MOD) % MOD * (c % MOD)) % MOD
\`\`\`python

**2. Negative modulo:**
\`\`\`python
# Python handles this correctly, but be aware:
(-7) % 3  # 2 in Python (mathematical definition)
# In C/Java: -1 (truncated toward zero)
\`\`\`python

**3. Division requires modular inverse, not regular mod:**
\`\`\`python
# WRONG
(a / b) % MOD

# GOOD
(a * pow(b, MOD - 2, MOD)) % MOD
\`\`\`python

**4. Sieve optimization:**
\`\`\`python
# BAD: Start marking at 2*i
for j in range(2*i, n+1, i):
    is_prime[j] = False

# GOOD: Start marking at i*i, not 2*i
for i in range(2, int(n**0.5) + 1):
    if is_prime[i]:
        for j in range(i*i, n+1, i):  # Start at i*i!
            is_prime[j] = False
\`\`\`python

**5. Edge cases:**
- GCD(0, n) = n, GCD(n, 0) = n
- 0 and 1 are not prime
- Combinatorics: C(n, 0) = C(n, n) = 1

BEST PRACTICES FOR MATH INTERVIEWS

1. **Recognize the pattern first**: Don't jump into code. Ask: "Is this GCD? Modular? Combinatorics?"

2. **Use Python built-ins**: \`math.gcd()\`, \`pow(base, exp, mod)\` are highly optimized

3. **Apply mod early and often**: Don't wait until the end

4. **Handle edge cases**: 0, 1, negative numbers, empty inputs

5. **Check for overflow** (even in Python for time limits)

6. **Test with small examples**: Verify formula with n=0,1,2 before implementing

7. **Know when to precompute**: Factorials, primes (sieve), Pascal's triangle

8. **Binary search on the answer**: For problems involving sqrt, powers, or "find largest X such that..."`

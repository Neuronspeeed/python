import type { Method } from '../../../types'

export const primesMethods: Method[] = [
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
]

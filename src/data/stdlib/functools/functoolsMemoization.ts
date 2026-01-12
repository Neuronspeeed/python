import type { Method } from '../../../types'

export const functoolsMemoizationMethods: Method[] = [
  { signature: '@lru_cache', description: 'Memoize function results. Essential for DP and recursive optimization. Caches based on arguments.', complexity: 'O(1) lookup', section: 'Memoization', example: `from functools import lru_cache

# Basic usage - memoize recursive function
@lru_cache(maxsize=None)  # None = unlimited cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Without cache: O(2^n)
# With cache: O(n)
print(fibonacci(100))  # Instant!

# With size limit
@lru_cache(maxsize=128)
def expensive_computation(x, y):
    return x ** y

# Cache info
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# Clear cache
fibonacci.cache_clear()

# IMPORTANT: Arguments must be hashable!
# Lists, dicts won't work - use tuples instead
@lru_cache
def process(items):  # items must be tuple, not list
    return sum(items)

process((1, 2, 3))  # OK
# process([1, 2, 3])  # Error! Lists aren't hashable` },

  { signature: '@cache', description: 'Python 3.9+ shorthand for @lru_cache(maxsize=None). Simpler syntax for unlimited cache.', complexity: 'O(1) lookup', section: 'Memoization', example: `from functools import cache  # Python 3.9+

# Equivalent to @lru_cache(maxsize=None)
@cache
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

# Perfect for interview DP problems!
@cache
def climb_stairs(n):
    """Number of ways to climb n stairs (1 or 2 steps)."""
    if n <= 2:
        return n
    return climb_stairs(n - 1) + climb_stairs(n - 2)

@cache
def coin_change(coins, amount):
    """Minimum coins needed. coins must be tuple!"""
    if amount == 0:
        return 0
    if amount < 0:
        return float('inf')

    min_coins = float('inf')
    for coin in coins:
        result = coin_change(coins, amount - coin)
        min_coins = min(min_coins, result + 1)

    return min_coins

# Usage: coin_change((1, 5, 10, 25), 63)` },

  { signature: '@lru_cache with typed_cache', description: 'Control whether different arg types share cache. typed=True separates int 3 from float 3.0.', complexity: 'O(1) lookup', section: 'Memoization', example: `from functools import lru_cache

# Default: 3 and 3.0 share same cache entry
@lru_cache(maxsize=32)
def compute(x):
    print(f"Computing for {x} (type: {type(x).__name__})")
    return x * 2

compute(3)    # Computing for 3 (type: int)
compute(3.0)  # Uses cached result from 3

# With typed=True: separate cache for different types
@lru_cache(maxsize=32, typed=True)
def compute_typed(x):
    print(f"Computing for {x} (type: {type(x).__name__})")
    return x * 2

compute_typed(3)    # Computing for 3 (type: int)
compute_typed(3.0)  # Computing for 3.0 (type: float)

# PRACTICAL USE: When int/float distinction matters
@lru_cache(maxsize=1000, typed=True)
def divide_safely(a, b):
    if b == 0:
        return None
    return a / b  # Different result for int vs float division` },
]

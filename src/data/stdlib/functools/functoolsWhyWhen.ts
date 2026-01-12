import type { Method } from '../../../types'

export const functoolsWhyWhenMethods: Method[] = [
  { signature: 'Why functools?', description: 'Higher-order functions for functional programming. Use when: memoization (DP), function transformation, custom sorting.', complexity: 'Concept', section: 'Why & When', example: `# FUNCTOOLS = Functional programming utilities
# Core tools: @lru_cache, reduce, partial, cmp_to_key

# USE CASES:
# 1. MEMOIZATION - #1 interview tool for DP
#    Convert O(2^n) to O(n) with one decorator
# 2. FUNCTION TRANSFORMATION - partial application, wrapping
# 3. CUSTOM SORTING - old-style cmp to key function
# 4. REDUCTION - reduce list to single value

# WHY @lru_cache IS INTERVIEW GOLD:
# Before: Manual DP with dictionary
memo = {}
def fib(n):
    if n in memo:
        return memo[n]
    if n < 2:
        return n
    memo[n] = fib(n-1) + fib(n-2)
    return memo[n]

# After: One decorator line
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n-1) + fib(n-2)

# WHEN TO USE:
# - DP problems (Fibonacci, climbing stairs, coin change)
# - Expensive function calls with repeated inputs
# - Recursive algorithms with overlapping subproblems
# - Performance optimization with minimal code

# WHEN NOT TO USE:
# - Arguments aren't hashable (lists, dicts)
# - Function has side effects (prints, modifies globals)
# - Cache would grow unbounded (use maxsize)
# - Need cache invalidation logic` },

  { signature: 'functools vs manual implementation', description: 'Decorator is cleaner and faster. Use functools unless you need custom cache logic.', complexity: 'Concept', section: 'Why & When', example: `# COMPARISON: Manual memoization vs @lru_cache

# Manual: More code, more bugs
class Solution:
    def __init__(self):
        self.memo = {}

    def helper(self, n):
        if n in self.memo:
            return self.memo[n]
        # ... compute result
        self.memo[n] = result
        return result

# functools: One line, battle-tested
from functools import lru_cache

class Solution:
    @lru_cache(maxsize=None)
    def helper(self, n):
        # ... compute result
        return result

# ADVANTAGES OF @lru_cache:
# 1. Less code → fewer bugs
# 2. Optimized C implementation → faster
# 3. cache_info() for debugging
# 4. Thread-safe by default
# 5. Handles edge cases (None, tuples, etc.)

# WHEN TO IMPLEMENT MANUALLY:
# - Need custom eviction policy
# - Cache key computation is complex
# - Need to inspect cache contents
# - Memory constraints require precise control
# - Educational purposes (interviews may ask)

# INTERVIEW TIP:
# Always start with @lru_cache for DP
# Only switch to manual if requirements demand it` },
]

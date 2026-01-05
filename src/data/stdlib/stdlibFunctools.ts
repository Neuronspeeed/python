import type { Method } from '../../types'

// lru_cache, reduce, partial, cmp_to_key, cache, total_ordering
export const stdlibFunctoolsMethods: Method[] = [
  // Why & When
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

  // Memoization
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

  // Reduction
  { signature: 'reduce()', description: 'Apply function cumulatively to sequence. Reduce list to single value.', complexity: 'O(n)', section: 'Reduction', example: `from functools import reduce

# Basic: reduce list to single value
nums = [1, 2, 3, 4, 5]

# Sum (but use sum() instead!)
total = reduce(lambda acc, x: acc + x, nums)
# 15

# Product
product = reduce(lambda acc, x: acc * x, nums)
# 120

# With initial value
product_with_init = reduce(lambda acc, x: acc * x, nums, 10)
# 10 * 1 * 2 * 3 * 4 * 5 = 1200

# Find max (but use max() instead!)
maximum = reduce(lambda a, b: a if a > b else b, nums)

# Practical uses
# 1. Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = reduce(lambda acc, lst: acc + lst, nested, [])
# [1, 2, 3, 4, 5]

# 2. Build dict from pairs
pairs = [('a', 1), ('b', 2), ('c', 3)]
d = reduce(lambda acc, p: {**acc, p[0]: p[1]}, pairs, {})
# {'a': 1, 'b': 2, 'c': 3}

# 3. GCD of list
from math import gcd
numbers = [12, 18, 24]
result = reduce(gcd, numbers)  # 6` },

  // Partial Application
  { signature: 'partial()', description: 'Create new function with some arguments pre-filled. Useful for callbacks and currying.', complexity: 'O(1)', section: 'Partial', example: `from functools import partial

# Basic partial application
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125

# Pre-fill first argument
def greet(greeting, name):
    return f"{greeting}, {name}!"

say_hello = partial(greet, "Hello")
say_goodbye = partial(greet, "Goodbye")

print(say_hello("Alice"))   # "Hello, Alice!"
print(say_goodbye("Bob"))   # "Goodbye, Bob!"

# Practical: Configure logging
import logging
def log_message(level, category, message):
    print(f"[{level}] {category}: {message}")

error_log = partial(log_message, "ERROR")
auth_error = partial(error_log, "AUTH")

auth_error("Invalid password")
# [ERROR] AUTH: Invalid password

# With sorted() key functions
data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
get_field = lambda field, d: d[field]
by_age = partial(get_field, 'age')
sorted_data = sorted(data, key=lambda d: get_field('age', d))` },

  // Custom Sorting
  { signature: 'cmp_to_key()', description: 'Convert old-style comparison function to key function. For complex custom sorting.', complexity: 'O(n log n)', section: 'Sorting', example: `from functools import cmp_to_key

# Old-style comparator: returns -1, 0, or 1
def compare(a, b):
    if a < b:
        return -1
    elif a > b:
        return 1
    return 0

# Convert to key function
nums = [3, 1, 4, 1, 5, 9]
sorted_nums = sorted(nums, key=cmp_to_key(compare))

# INTERVIEW CLASSIC: Largest Number
# Arrange numbers to form largest number
def largest_number(nums):
    def compare(x, y):
        # Compare concatenations: "9" + "34" vs "34" + "9"
        if x + y > y + x:
            return -1  # x should come first
        elif x + y < y + x:
            return 1   # y should come first
        return 0

    strs = [str(n) for n in nums]
    strs.sort(key=cmp_to_key(compare))

    # Handle edge case: all zeros
    if strs[0] == '0':
        return '0'
    return ''.join(strs)

print(largest_number([3, 30, 34, 5, 9]))  # "9534330"

# Custom object sorting
class Task:
    def __init__(self, priority, deadline):
        self.priority = priority
        self.deadline = deadline

def task_compare(t1, t2):
    # Higher priority first, then earlier deadline
    if t1.priority != t2.priority:
        return t2.priority - t1.priority
    return t1.deadline - t2.deadline

tasks = [Task(2, 10), Task(1, 5), Task(2, 8)]
tasks.sort(key=cmp_to_key(task_compare))` },

  { signature: '@total_ordering', description: 'Generate all comparison methods from __eq__ and one of __lt__, __le__, __gt__, __ge__.', complexity: 'O(1)', section: 'Sorting', example: `from functools import total_ordering

@total_ordering
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def __eq__(self, other):
        return self.grade == other.grade

    def __lt__(self, other):
        return self.grade < other.grade

    # @total_ordering provides: __le__, __gt__, __ge__

s1 = Student("Alice", 85)
s2 = Student("Bob", 90)

print(s1 < s2)   # True
print(s1 <= s2)  # True (auto-generated)
print(s1 > s2)   # False (auto-generated)
print(s1 >= s2)  # False (auto-generated)
print(s1 == s2)  # False

# Now works with sorted()!
students = [Student("A", 85), Student("B", 90), Student("C", 78)]
sorted_students = sorted(students)  # Sorted by grade

# Practical: Priority queue item
@total_ordering
class Task:
    def __init__(self, priority, name):
        self.priority = priority
        self.name = name

    def __eq__(self, other):
        return self.priority == other.priority

    def __lt__(self, other):
        return self.priority < other.priority  # Lower = higher priority

import heapq
tasks = [Task(3, "Low"), Task(1, "High"), Task(2, "Medium")]
heapq.heapify(tasks)
print(heapq.heappop(tasks).name)  # "High"` },

  // Wrapping
  { signature: '@wraps()', description: 'Preserve function metadata when wrapping with decorator. Essential for debugging.', complexity: 'O(1)', section: 'Wrapping', example: `from functools import wraps
import time

# WITHOUT @wraps - loses original function info
def timer_bad(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

# WITH @wraps - preserves function info
def timer_good(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Took {time.time() - start:.3f}s")
        return result
    return wrapper

@timer_good
def slow_function():
    """This is a slow function."""
    time.sleep(0.1)

print(slow_function.__name__)  # "slow_function" (not "wrapper")
print(slow_function.__doc__)   # "This is a slow function."

# Generic decorator template
def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Before
        result = func(*args, **kwargs)
        # After
        return result
    return wrapper` },

  { signature: 'singledispatch', description: 'Single-dispatch generic function. Method overloading based on first argument type.', complexity: 'O(1)', section: 'Wrapping', example: `from functools import singledispatch

@singledispatch
def process(data):
    """Default handler for unknown types."""
    raise NotImplementedError(f"Cannot process {type(data)}")

@process.register(int)
def _(data):
    return f"Integer: {data * 2}"

@process.register(str)
def _(data):
    return f"String: {data.upper()}"

@process.register(list)
def _(data):
    return f"List with {len(data)} items"

print(process(42))        # "Integer: 84"
print(process("hello"))   # "String: HELLO"
print(process([1, 2, 3])) # "List with 3 items"

# Type hints work too (Python 3.7+)
@process.register
def _(data: dict):
    return f"Dict with keys: {list(data.keys())}"

print(process({"a": 1}))  # "Dict with keys: ['a']"

# Check registered types
print(process.registry.keys())
# dict_keys([object, int, str, list, dict])` },
]

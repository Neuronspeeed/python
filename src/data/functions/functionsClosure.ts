import type { Method } from '../../types'

// Closures + Higher-Order + Introspection + Generators + Recursion + Typing
export const functionsClosureMethods: Method[] = [
  // Closures
  { section: 'Closures', signature: 'Closure', description: 'Function that captures variables from enclosing scope.', complexity: 'O(1)', example: `def make_multiplier(n):
    def multiplier(x):
        return x * n  # n is captured from outer scope
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

# Check closure variables
print(double.__closure__[0].cell_contents)  # 2` },
  { section: 'Closures', signature: 'nonlocal variable', description: 'Modify variable from enclosing (non-global) scope.', complexity: 'O(1)', example: `def make_counter():
    count = 0
    def counter():
        nonlocal count  # Required to modify outer variable
        count += 1
        return count
    return counter

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3

# Without nonlocal, would create new local variable` },
  { section: 'Closures', signature: 'global variable', description: 'Access or modify module-level variable inside function.', complexity: 'O(1)', example: `count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)  # 2

# Can read without global
x = 10
def read_x():
    print(x)  # Works: 10

# But cannot modify without global
def bad_modify():
    x = 20  # Creates new local x, doesn't modify global` },

  // Higher-Order Functions
  { section: 'Higher-Order Functions', signature: 'map(func, iterable)', description: 'Applies function to each element. Returns iterator.', complexity: 'O(n)', example: `nums = [1, 2, 3, 4, 5]

# Square each number
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25]

# Multiple iterables
a = [1, 2, 3]
b = [4, 5, 6]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [5, 7, 9]` },
  { section: 'Higher-Order Functions', signature: 'filter(func, iterable)', description: 'Yields elements where func returns True.', complexity: 'O(n)', example: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only evens
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6, 8, 10]

# None filters falsy values
mixed = [0, 1, '', 'hello', None, [], [1, 2]]
truthy = list(filter(None, mixed))
print(truthy)  # [1, 'hello', [1, 2]]` },
  { section: 'Higher-Order Functions', signature: 'functools.reduce(func, iterable)', description: 'Reduces iterable to single value by cumulative application.', complexity: 'O(n)', example: `from functools import reduce

nums = [1, 2, 3, 4, 5]

# Sum (1+2+3+4+5)
total = reduce(lambda x, y: x + y, nums)
print(total)  # 15

# Product (1*2*3*4*5)
product = reduce(lambda x, y: x * y, nums)
print(product)  # 120

# With initial value
result = reduce(lambda x, y: x + y, nums, 100)
print(result)  # 115` },

  // Function Introspection
  { section: 'Function Introspection', signature: 'func.__name__', description: 'Returns the name of the function.', complexity: 'O(1)', example: `def my_function():
    pass

print(my_function.__name__)  # my_function

# Useful in decorators and debugging
funcs = [min, max, sum]
for f in funcs:
    print(f.__name__)  # min, max, sum` },
  { section: 'Function Introspection', signature: 'func.__doc__', description: 'Returns the docstring of the function.', complexity: 'O(1)', example: `def greet(name):
    """Greets a person by name.

    Args:
        name: The person's name

    Returns:
        A greeting string
    """
    return f"Hello, {name}!"

print(greet.__doc__)
# Greet a person by name...` },
  { section: 'Function Introspection', signature: 'func.__annotations__', description: 'Returns type annotations dictionary.', complexity: 'O(1)', example: `def greet(name: str, age: int) -> str:
    return f"Hello, {name}! You are {age}."

print(greet.__annotations__)
# {'name': <class 'str'>, 'age': <class 'int'>, 'return': <class 'str'>}

# Type hints don't enforce types - just documentation
greet(123, "wrong")  # Still works!` },
  { section: 'Function Introspection', signature: 'func.__defaults__', description: 'Returns tuple of default argument values.', complexity: 'O(1)', example: `def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet.__defaults__)  # ('Hello', '!')

# Keyword-only defaults
def func(a, *, b=1, c=2):
    pass

print(func.__kwdefaults__)  # {'b': 1, 'c': 2}` },

  // Generators
  { section: 'Generators', signature: 'yield value', description: 'Pauses function and yields value. Resumes on next iteration.', complexity: 'O(1) per yield', example: `def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator is lazy - values generated on demand
gen = count_up_to(1000000)  # No memory used yet
print(next(gen))  # 1
print(next(gen))  # 2` },
  { section: 'Generators', signature: 'yield from iterable', description: 'Delegates to sub-generator or iterable.', complexity: 'O(n)', example: `def chain(*iterables):
    for it in iterables:
        yield from it

result = list(chain([1, 2], [3, 4], [5]))
print(result)  # [1, 2, 3, 4, 5]

# Recursive generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print(list(flatten([1, [2, [3, 4], 5]])))  # [1, 2, 3, 4, 5]` },
  { section: 'Generators', signature: 'Generator expression', description: 'Compact syntax for simple generators. Memory efficient.', complexity: 'O(1) creation', example: `# Generator expression
gen = (x**2 for x in range(5))
print(type(gen))  # <class 'generator'>
print(list(gen))  # [0, 1, 4, 9, 16]

# Memory efficient for large data
sum_squares = sum(x**2 for x in range(1000000))

# Can only iterate once!
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] (exhausted)` },

  // Recursion
  { section: 'Recursion', signature: 'Recursive function', description: 'Function that calls itself. Needs base case to stop.', complexity: 'O(varies)', example: `def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 55` },
  { section: 'Recursion', signature: '@functools.lru_cache', description: 'Memoization decorator. Caches function results.', complexity: 'O(1) for cached', example: `from functools import lru_cache

@lru_cache(maxsize=None)  # Unlimited cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Instant! (without cache would be slow)

# Check cache info
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# Clear cache
fibonacci.cache_clear()` },

  // Typing
  { section: 'Typing', signature: 'Type hints', description: 'Optional type annotations for documentation and tooling. Python 3.9+ supports built-in generics.', complexity: 'O(1)', example: `# Python 3.9+: Use built-in types directly (no imports needed)
def greet(name: str) -> str:
    return f"Hello, {name}"

def process_items(items: list[int]) -> dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

def maybe_upper(s: str | None = None) -> str:  # 3.10+ union syntax
    return s.upper() if s else ""

# Function type (still needs import)
from typing import Callable
def apply(func: Callable[[int], int], x: int) -> int:
    return func(x)

# Multiple return types
def get_pair() -> tuple[int, str]:
    return (1, "one")` },
]

import type { Method } from '../../types'

// Debugging with pdb, Assert, Traceback, Inspect, Profiling, Memory, Debug Decorators
export const loggingDebuggingMethods: Method[] = [
  // Debugging with pdb
  { signature: 'import pdb; pdb.set_trace()', description: 'Start interactive debugger at this point.', complexity: 'O(1)', section: 'Debugging with pdb', example: `def buggy_function(x, y):
    result = x + y
    import pdb; pdb.set_trace()  # Debugger starts here
    return result * 2

# In Python 3.7+, use builtin:
def buggy_function(x, y):
    result = x + y
    breakpoint()  # Same as pdb.set_trace()
    return result * 2

# Common pdb commands:
# n (next)     - Execute next line
# s (step)     - Step into function
# c (continue) - Continue until next breakpoint
# p expr       - Print expression
# l (list)     - Show source code
# q (quit)     - Quit debugger` },
  { signature: 'pdb commands', description: 'Common debugger commands in pdb.', complexity: 'O(1)', section: 'Debugging with pdb', example: `# Navigation
# n (next)     - Execute next line (skip functions)
# s (step)     - Step into function call
# r (return)   - Continue until function returns
# c (continue) - Continue execution
# q (quit)     - Quit debugger

# Inspection
# p expr       - Print expression value
# pp expr      - Pretty-print expression
# l (list)     - List source code
# ll           - List whole function
# w (where)    - Print stack trace
# a (args)     - Print function arguments

# Breakpoints
# b line       - Set breakpoint at line
# b func       - Set breakpoint at function
# cl           - Clear breakpoints
# disable/enable - Toggle breakpoints` },
  { signature: 'Post-mortem debugging', description: 'Debug after exception occurs.', complexity: 'O(1)', section: 'Debugging with pdb', example: `import pdb

def divide(a, b):
    return a / b

try:
    divide(1, 0)
except:
    pdb.post_mortem()  # Start debugger at exception point

# Or run script with debugging
# python -m pdb script.py

# Auto post-mortem on any exception
import sys
def debug_hook(type, value, tb):
    pdb.pm()
sys.excepthook = debug_hook` },
  { signature: 'breakpoint()', description: 'Python 3.7+ built-in debugger entry point.', complexity: 'O(1)', section: 'Debugging with pdb', example: `def calculate(x):
    result = x * 2
    breakpoint()  # Debugger starts here
    return result + 1

# Disable with environment variable
# PYTHONBREAKPOINT=0 python script.py

# Use different debugger
# PYTHONBREAKPOINT=ipdb.set_trace python script.py
# PYTHONBREAKPOINT=pudb.set_trace python script.py` },

  // Assert Statements
  { signature: 'assert condition', description: 'Raise AssertionError if condition is False.', complexity: 'O(1)', section: 'Assert Statements', example: `def divide(a, b):
    assert b != 0, "Divisor cannot be zero"
    return a / b

divide(10, 2)   # OK
# divide(10, 0) # AssertionError: Divisor cannot be zero

# Assert with expression
x = -5
assert x > 0, f"Expected positive, got {x}"

# WARNING: Assertions disabled with -O flag
# python -O script.py  # Assertions skipped!` },
  { signature: 'Assert best practices', description: 'Use asserts for internal invariants, not input validation.', complexity: 'O(1)', section: 'Assert Statements', example: `# GOOD: Internal invariant check
def binary_search(arr, target):
    assert arr == sorted(arr), "Array must be sorted"
    # ... implementation

# BAD: User input validation (use exceptions instead)
def process_age(age):
    # Don't do this - can be disabled with -O
    assert age > 0, "Age must be positive"

    # Do this instead
    if age <= 0:
        raise ValueError("Age must be positive")` },

  // Traceback Module
  { signature: 'traceback.format_exc()', description: 'Get current exception traceback as string.', complexity: 'O(1)', section: 'Traceback Module', example: `import traceback

try:
    x = 1 / 0
except:
    tb = traceback.format_exc()
    print(tb)
    # Traceback (most recent call last):
    #   File "<stdin>", line 2, in <module>
    # ZeroDivisionError: division by zero

# Or print directly
traceback.print_exc()` },
  { signature: 'traceback.extract_tb()', description: 'Extract traceback frames for analysis.', complexity: 'O(n)', section: 'Traceback Module', example: `import traceback
import sys

try:
    x = 1 / 0
except:
    _, _, tb = sys.exc_info()
    frames = traceback.extract_tb(tb)

    for frame in frames:
        print(f"File: {frame.filename}")
        print(f"Line: {frame.lineno}")
        print(f"Function: {frame.name}")
        print(f"Code: {frame.line}")` },
  { signature: 'traceback.format_stack()', description: 'Get current call stack as formatted string.', complexity: 'O(n)', section: 'Traceback Module', example: `import traceback

def inner():
    print("Current stack:")
    for line in traceback.format_stack():
        print(line.strip())

def outer():
    inner()

outer()
# File "script.py", line 10, in <module>
#   outer()
# File "script.py", line 8, in outer
#   inner()
# File "script.py", line 5, in inner
#   for line in traceback.format_stack():` },

  // Inspect Module
  { signature: 'inspect.currentframe()', description: 'Get current stack frame for inspection.', complexity: 'O(1)', section: 'Inspect Module', example: `import inspect

def debug_info():
    frame = inspect.currentframe()
    caller = frame.f_back

    print(f"Called from: {caller.f_code.co_name}")
    print(f"Line: {caller.f_lineno}")
    print(f"Locals: {caller.f_locals}")

def example():
    x = 42
    debug_info()

example()
# Called from: example
# Line: 12
# Locals: {'x': 42}` },
  { signature: 'inspect.signature()', description: 'Get function signature details.', complexity: 'O(1)', section: 'Inspect Module', example: `import inspect

def greet(name, greeting="Hello", *, formal=False):
    pass

sig = inspect.signature(greet)
print(sig)  # (name, greeting='Hello', *, formal=False)

for name, param in sig.parameters.items():
    print(f"{name}: {param.kind.name}, default={param.default}")
# name: POSITIONAL_OR_KEYWORD, default=<class 'inspect._empty'>
# greeting: POSITIONAL_OR_KEYWORD, default=Hello
# formal: KEYWORD_ONLY, default=False` },

  // Performance Profiling
  { signature: 'cProfile', description: 'Profile code to find performance bottlenecks.', complexity: 'O(1)', section: 'Performance Profiling', example: `import cProfile

def slow_function():
    total = 0
    for i in range(1000000):
        total += i
    return total

# Profile function
cProfile.run('slow_function()')

# Or from command line:
# python -m cProfile script.py
# python -m cProfile -s cumtime script.py  # Sort by cumulative time` },
  { signature: 'timeit', description: 'Time small code snippets accurately.', complexity: 'O(1)', section: 'Performance Profiling', example: `import timeit

# Time a statement
time = timeit.timeit('sum(range(100))', number=10000)
print(f"Time: {time:.4f}s")

# Time with setup
time = timeit.timeit(
    stmt='lst.append(1)',
    setup='lst = []',
    number=100000
)

# From command line:
# python -m timeit "sum(range(100))"` },
  { signature: 'timeit.repeat()', description: 'Run multiple trials and take minimum. More reliable than single run.', complexity: 'O(1)', section: 'Performance Profiling', example: `import timeit

# Run 5 trials, take minimum (most reliable)
times = timeit.repeat(
    stmt='[x**2 for x in range(100)]',
    number=10000,
    repeat=5
)
print(f"Min: {min(times):.4f}s")

# Compare alternatives
def compare():
    loop = min(timeit.repeat('[x**2 for x in range(100)]', repeat=5))
    comp = min(timeit.repeat('list(map(lambda x: x**2, range(100)))', repeat=5))
    print(f"Comprehension: {loop:.4f}s")
    print(f"Map+lambda: {comp:.4f}s")` },
  { signature: 'Performance patterns', description: 'Common speed comparisons. Comprehensions ~2x faster than loops at C speed.', complexity: 'Concept', section: 'Performance Profiling', example: `# Comprehensions faster than for loops
# (iterations run at C speed inside interpreter)
[x*2 for x in data]  # Fast
result = []
for x in data: result.append(x*2)  # Slower

# File iterators fastest for reading
for line in open('f.txt'): ...  # Fast (iterator)
for line in f.readlines(): ...  # Medium (builds list)
while line := f.readline(): ...  # Slowest

# sqrt alternatives (math.sqrt usually fastest)
import math
math.sqrt(144)  # Fast
144 ** 0.5      # Medium
pow(144, 0.5)   # Slower` },
  { signature: 'time.perf_counter()', description: 'High-resolution timer for benchmarking.', complexity: 'O(1)', section: 'Performance Profiling', example: `import time

start = time.perf_counter()

# Code to measure
total = sum(range(1000000))

end = time.perf_counter()
print(f"Elapsed: {end - start:.4f}s")

# Context manager pattern
from contextlib import contextmanager

@contextmanager
def timer(label):
    start = time.perf_counter()
    yield
    print(f"{label}: {time.perf_counter() - start:.4f}s")

with timer("Computation"):
    sum(range(1000000))` },

  // Memory Debugging
  { signature: 'sys.getsizeof()', description: 'Get memory size of object in bytes.', complexity: 'O(1)', section: 'Memory Debugging', example: `import sys

print(sys.getsizeof([]))         # 56 bytes (empty list)
print(sys.getsizeof([1,2,3]))    # 80 bytes
print(sys.getsizeof("hello"))    # 54 bytes
print(sys.getsizeof({}))         # 64 bytes (empty dict)

# Note: doesn't include referenced objects
lst = [[1,2,3], [4,5,6]]
print(sys.getsizeof(lst))        # Only counts list structure` },
  { signature: 'tracemalloc', description: 'Trace memory allocations.', complexity: 'O(n)', section: 'Memory Debugging', example: `import tracemalloc

tracemalloc.start()

# Code that uses memory
data = [x**2 for x in range(10000)]

snapshot = tracemalloc.take_snapshot()
top_stats = snapshot.statistics('lineno')

print("Top 5 memory consumers:")
for stat in top_stats[:5]:
    print(stat)

current, peak = tracemalloc.get_traced_memory()
print(f"Current: {current / 1024:.1f} KB")
print(f"Peak: {peak / 1024:.1f} KB")

tracemalloc.stop()` },

  // Debug Utilities
  { signature: 'Debug decorator', description: 'Log function calls automatically.', complexity: 'O(1)', section: 'Debug Utilities', example: `import functools
import logging

def debug(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        args_repr = [repr(a) for a in args]
        kwargs_repr = [f"{k}={v!r}" for k, v in kwargs.items()]
        signature = ", ".join(args_repr + kwargs_repr)
        logging.debug(f"Calling {func.__name__}({signature})")

        result = func(*args, **kwargs)

        logging.debug(f"{func.__name__!r} returned {result!r}")
        return result
    return wrapper

@debug
def add(a, b):
    return a + b

add(2, 3)  # Logs: Calling add(2, 3) / 'add' returned 5` },

  { signature: 'DEBUG environment', description: 'Control debug mode via environment variable.', complexity: 'O(1)', section: 'Debug Utilities', example: `import os

DEBUG = os.environ.get('DEBUG', '').lower() in ('1', 'true', 'yes')

if DEBUG:
    logging.basicConfig(level=logging.DEBUG)
    print("Debug mode enabled")
else:
    logging.basicConfig(level=logging.INFO)

# Run with:
# DEBUG=1 python script.py` },
]

import type { Method } from '../../types'

// Context Managers, Infinite Generators, Lazy Evaluation
export const generatorAdvancedMethods: Method[] = [
  // Context Managers
  { signature: 'Generator Context Manager', description: 'Use generator as context manager with contextlib. Elegant resource management.', complexity: 'O(1)', section: 'Context Managers', example: `from contextlib import contextmanager

@contextmanager
def open_file(path, mode='r'):
    """Context manager using generator."""
    print(f"Opening {path}")
    f = open(path, mode)
    try:
        yield f  # This is what 'with' returns
    finally:
        print(f"Closing {path}")
        f.close()

# Usage
with open_file("data.txt") as f:
    content = f.read()

# Timing context manager
import time

@contextmanager
def timer(label):
    start = time.time()
    try:
        yield
    finally:
        elapsed = time.time() - start
        print(f"{label}: {elapsed:.3f}s")

with timer("Processing"):
    time.sleep(0.5)
# Output: Processing: 0.500s

# Temporary change context
@contextmanager
def temp_attr(obj, attr, value):
    """Temporarily change an attribute."""
    old_value = getattr(obj, attr)
    setattr(obj, attr, value)
    try:
        yield
    finally:
        setattr(obj, attr, old_value)` },

  { signature: 'suppress() and ExitStack', description: 'Advanced context management. Suppress exceptions, manage multiple contexts.', complexity: 'O(1)', section: 'Context Managers', example: `from contextlib import suppress, ExitStack

# Suppress specific exceptions
with suppress(FileNotFoundError):
    with open("nonexistent.txt") as f:
        data = f.read()
# No exception raised, continues normally

# Multiple contexts dynamically
def process_files(filenames):
    with ExitStack() as stack:
        files = [stack.enter_context(open(f)) for f in filenames]
        for f in files:
            print(f.read())

# Conditional context manager
@contextmanager
def maybe_open(path):
    if path:
        with open(path) as f:
            yield f
    else:
        yield None

with maybe_open(None) as f:
    if f:
        print(f.read())

# Redirect stdout
from contextlib import redirect_stdout
import io

buffer = io.StringIO()
with redirect_stdout(buffer):
    print("Hello, World!")

captured = buffer.getvalue()  # "Hello, World!\\n"` },

  // Infinite Generators
  { signature: 'Infinite Generators', description: 'Generators that never end. Use with islice or takewhile to limit.', complexity: 'O(1) per item', section: 'Infinite', example: `from itertools import islice, takewhile

# Infinite counter
def count_forever(start=0, step=1):
    n = start
    while True:
        yield n
        n += step

# Take first 5
first_5 = list(islice(count_forever(), 5))
print(first_5)  # [0, 1, 2, 3, 4]

# Infinite Fibonacci
def fibonacci_infinite():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Fibonacci numbers under 100
fibs = list(takewhile(lambda x: x < 100, fibonacci_infinite()))
print(fibs)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]

# Infinite primes
def primes_infinite():
    """Generate prime numbers infinitely."""
    yield 2
    primes_found = [2]
    candidate = 3

    while True:
        is_prime = True
        for p in primes_found:
            if p * p > candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break

        if is_prime:
            primes_found.append(candidate)
            yield candidate

        candidate += 2

first_10_primes = list(islice(primes_infinite(), 10))
print(first_10_primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]` },

  { signature: 'Cycle and Repeat Patterns', description: 'Loop through sequences infinitely. Useful for round-robin and defaults.', complexity: 'O(1) per item', section: 'Infinite', example: `from itertools import cycle, repeat

# Cycle through items
colors = cycle(['red', 'green', 'blue'])
color_list = [next(colors) for _ in range(7)]
print(color_list)
# ['red', 'green', 'blue', 'red', 'green', 'blue', 'red']

# Round-robin assignment
def round_robin(items, workers):
    """Assign items to workers in round-robin fashion."""
    worker_cycle = cycle(workers)
    for item in items:
        yield (next(worker_cycle), item)

tasks = ['A', 'B', 'C', 'D', 'E']
workers = ['Alice', 'Bob']
assignments = list(round_robin(tasks, workers))
# [('Alice', 'A'), ('Bob', 'B'), ('Alice', 'C'), ...]

# Repeat value
ones = repeat(1, 5)  # 1, 1, 1, 1, 1

# Infinite repeat (no count)
zeros = repeat(0)  # Infinite zeros

# Practical: zip with padding
from itertools import zip_longest

def pad_to_length(iterable, length, pad_value=None):
    return islice(
        zip_longest(iterable, repeat(pad_value)),
        length
    )` },

  // Lazy Evaluation
  { signature: 'Lazy File Processing', description: 'Process huge files line by line. Constant memory usage.', complexity: 'O(1) memory', section: 'Lazy Evaluation', example: `# Process 100GB log file with constant memory
def grep(pattern, lines):
    """Filter lines matching pattern."""
    for line in lines:
        if pattern in line:
            yield line

def count_lines(lines):
    """Count lines (consuming generator)."""
    return sum(1 for _ in lines)

# Memory-efficient word count
def word_count(lines):
    """Count words in all lines."""
    return sum(len(line.split()) for line in lines)

# Chain operations
def process_log(filename, pattern):
    with open(filename) as f:
        matching = grep(pattern, f)
        count = count_lines(matching)
    return count

# Process CSV lazily
import csv

def process_csv_lazy(filename):
    with open(filename) as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row  # One row at a time

# Filter and transform
for row in process_csv_lazy("huge_data.csv"):
    if float(row['price']) > 100:
        print(row['name'])

# Parallel processing with generators
def parallel_map(func, iterable, workers=4):
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=workers) as executor:
        yield from executor.map(func, iterable)` },

  { signature: 'Generator Expressions vs Functions', description: 'When to use expression vs function. Trade-offs in readability and reuse.', complexity: 'O(n)', section: 'Lazy Evaluation', example: `# Generator Expression: Simple, one-liner
squares = (x**2 for x in range(10))

# Generator Function: Complex logic, reusable
def squares_with_logging(n):
    for x in range(n):
        result = x**2
        print(f"Computing {x}^2")
        yield result

# Expression: When logic is simple
evens = (x for x in range(100) if x % 2 == 0)

# Function: When you need state or complex logic
def running_average_gen(nums):
    total = 0
    count = 0
    for n in nums:
        total += n
        count += 1
        yield total / count

# Expression in function calls
max_square = max(x**2 for x in [-3, 1, 5, -2])  # 25

# Can't do this with generator functions inline!

# Reusable generator function
def filtered_squares(nums, threshold):
    for n in nums:
        sq = n ** 2
        if sq > threshold:
            yield sq

# Use multiple times
gen1 = filtered_squares(range(10), 20)
gen2 = filtered_squares(range(20), 50)

# RULE OF THUMB:
# - Simple transform/filter: generator expression
# - Need state, logging, complex logic: generator function
# - Need to pass parameters: generator function
# - One-time use inline: generator expression` },

  { signature: 'Generator Debugging Tips', description: 'Debug generators without consuming. Use tee and peekable patterns.', complexity: 'O(n)', section: 'Lazy Evaluation', example: `from itertools import tee

# Problem: Generators are consumed when you look at them
gen = (x**2 for x in range(5))
print(list(gen))  # [0, 1, 4, 9, 16]
print(list(gen))  # [] - already consumed!

# Solution 1: tee() - create independent copies
gen = (x**2 for x in range(5))
gen1, gen2 = tee(gen, 2)
print(list(gen1))  # [0, 1, 4, 9, 16]
print(list(gen2))  # [0, 1, 4, 9, 16]

# Solution 2: Peekable wrapper
class Peekable:
    def __init__(self, iterable):
        self._it = iter(iterable)
        self._peeked = []

    def peek(self, default=None):
        if not self._peeked:
            try:
                self._peeked.append(next(self._it))
            except StopIteration:
                return default
        return self._peeked[0]

    def __next__(self):
        if self._peeked:
            return self._peeked.pop(0)
        return next(self._it)

    def __iter__(self):
        return self

# Debug with logging wrapper
def debug_generator(gen, label=""):
    for i, item in enumerate(gen):
        print(f"[{label}] Item {i}: {item}")
        yield item

# Use in pipeline for debugging
pipeline = debug_generator(
    (x**2 for x in range(5)),
    label="squares"
)
result = list(pipeline)` },
]

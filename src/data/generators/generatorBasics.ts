import type { Method } from '../../types'

// Why Generators, yield, Generator Expressions
export const generatorBasicsMethods: Method[] = [
  // Why Generators
  { signature: 'Why Generators?', description: 'Memory-efficient iteration. Yield values one at a time instead of creating full list in memory.', complexity: 'O(1) memory', section: 'Why Generators', example: `# MEMORY COMPARISON
# List: stores ALL values in memory at once
# Generator: produces ONE value at a time

# Bad: Creates list of 1 billion numbers
huge_list = [x for x in range(1_000_000_000)]  # ~8GB memory!

# Good: Produces one number at a time
def huge_gen():
    for x in range(1_000_000_000):
        yield x  # Only one value in memory

# USE GENERATORS WHEN:
# 1. Working with large/infinite sequences
# 2. You only need to iterate once
# 3. Memory is constrained
# 4. Values are expensive to compute

# DON'T USE WHEN:
# 1. You need random access (list[5])
# 2. You need to iterate multiple times
# 3. You need len()
# 4. Sequence is small enough to fit in memory

# Real-world example: Processing large files
def read_large_file(path):
    with open(path) as f:
        for line in f:  # File is already a generator!
            yield line.strip()

# Process 100GB log file with constant memory
for line in read_large_file("huge.log"):
    if "ERROR" in line:
        print(line)` },

  { signature: 'Generator vs List Comprehension', description: 'Generator expressions use () instead of []. Same syntax, lazy evaluation.', complexity: 'O(1) space', section: 'Why Generators', example: `# List comprehension: [expr for x in iterable]
squares_list = [x**2 for x in range(10)]
# Creates list [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Generator expression: (expr for x in iterable)
squares_gen = (x**2 for x in range(10))
# Creates generator object

# Memory comparison
import sys

list_size = sys.getsizeof([x for x in range(1000)])
gen_size = sys.getsizeof(x for x in range(1000))

print(f"List: {list_size} bytes")   # ~8856 bytes
print(f"Generator: {gen_size} bytes")  # ~120 bytes

# Converting generator to list
squares_gen = (x**2 for x in range(5))
squares_list = list(squares_gen)  # [0, 1, 4, 9, 16]

# IMPORTANT: Generator is exhausted after one use!
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] (empty!)

# Passing to functions
sum_result = sum(x**2 for x in range(10))  # No extra []
# Equivalent to: sum([x**2 for x in range(10)])
# But more memory efficient` },

  // Yield Keyword
  { signature: 'yield Keyword', description: 'Pause function and return value. State is preserved between calls.', complexity: 'O(1) per yield', section: 'yield', example: `def simple_generator():
    """Generator function using yield."""
    print("Start")
    yield 1
    print("After first yield")
    yield 2
    print("After second yield")
    yield 3
    print("End")

# Create generator object (doesn't run yet!)
gen = simple_generator()

# Each next() runs until next yield
print(next(gen))  # "Start", returns 1
print(next(gen))  # "After first yield", returns 2
print(next(gen))  # "After second yield", returns 3
# next(gen)       # "End", raises StopIteration

# Using in for loop (handles StopIteration)
for value in simple_generator():
    print(value)
# Output: Start, 1, After first yield, 2, After second yield, 3, End

# Generator state is preserved
def counter():
    count = 0
    while True:
        yield count
        count += 1

c = counter()
print(next(c))  # 0
print(next(c))  # 1
print(next(c))  # 2` },

  { signature: 'yield from', description: 'Delegate to another generator. Flatten nested generators elegantly.', complexity: 'O(1) delegation', section: 'yield', example: `# Without yield from (verbose)
def flatten_manual(nested):
    for item in nested:
        if isinstance(item, list):
            for x in flatten_manual(item):
                yield x
        else:
            yield item

# With yield from (elegant)
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

nested = [1, [2, 3, [4, 5]], 6]
print(list(flatten(nested)))  # [1, 2, 3, 4, 5, 6]

# Delegate to another generator
def gen1():
    yield 1
    yield 2

def gen2():
    yield from gen1()  # Delegate to gen1
    yield 3
    yield 4

print(list(gen2()))  # [1, 2, 3, 4]

# Chain multiple generators
def chain_generators(*gens):
    for gen in gens:
        yield from gen

combined = chain_generators(
    range(3),
    "abc",
    [10, 20]
)
print(list(combined))  # [0, 1, 2, 'a', 'b', 'c', 10, 20]` },

  { signature: 'Generator State', description: 'Generators remember their state between yields. Use for stateful iteration.', complexity: 'O(1)', section: 'yield', example: `def running_average():
    """Generator that computes running average."""
    total = 0
    count = 0

    while True:
        value = yield total / count if count else 0
        if value is not None:
            total += value
            count += 1

# Usage (with send)
avg = running_average()
next(avg)  # Prime the generator
print(avg.send(10))  # 10.0
print(avg.send(20))  # 15.0
print(avg.send(30))  # 20.0

# Generator for unique IDs
def id_generator(prefix="ID"):
    """Generate unique IDs."""
    count = 0
    while True:
        yield f"{prefix}_{count:05d}"
        count += 1

ids = id_generator("USER")
print(next(ids))  # USER_00000
print(next(ids))  # USER_00001

# Generator remembers position
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Continue from where we left off!
next_5 = [next(fib) for _ in range(5)]
# [55, 89, 144, 233, 377]` },

  // next() and StopIteration
  { signature: 'next() and StopIteration', description: 'Manually advance generator. Handle end of iteration.', complexity: 'O(1)', section: 'next', example: `def simple_gen():
    yield 1
    yield 2
    yield 3

gen = simple_gen()

# next() advances generator
print(next(gen))  # 1
print(next(gen))  # 2
print(next(gen))  # 3
# print(next(gen))  # StopIteration exception!

# Default value to avoid exception
gen = simple_gen()
print(next(gen, "default"))  # 1
print(next(gen, "default"))  # 2
print(next(gen, "default"))  # 3
print(next(gen, "default"))  # "default"

# Check if generator has more values
def has_next(gen):
    """Check if generator has more values without consuming."""
    try:
        first = next(gen)
        # Put it back by chaining
        from itertools import chain
        return chain([first], gen)
    except StopIteration:
        return None

# Practical: Get first N items
def take(n, iterable):
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item

gen = (x**2 for x in range(100))
first_5 = list(take(5, gen))  # [0, 1, 4, 9, 16]` },

  // Custom Iterators
  { signature: '__iter__ and __next__', description: 'Make custom class iterable. Implement iterator protocol.', complexity: 'O(1) per iteration', section: 'Custom Iterators', example: `class Range:
    """Custom implementation of range()."""

    def __init__(self, start, stop=None, step=1):
        if stop is None:
            start, stop = 0, start
        self.start = start
        self.stop = stop
        self.step = step

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \\
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        result = self.current
        self.current += self.step
        return result

# Usage
for i in Range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in Range(2, 10, 2):
    print(i)  # 2, 4, 6, 8

# Separate Iterator class (better practice)
class LinkedList:
    def __init__(self, values):
        self.head = None
        for v in reversed(values):
            node = {"val": v, "next": self.head}
            self.head = node

    def __iter__(self):
        return LinkedListIterator(self.head)

class LinkedListIterator:
    def __init__(self, head):
        self.current = head

    def __next__(self):
        if self.current is None:
            raise StopIteration
        val = self.current["val"]
        self.current = self.current["next"]
        return val

ll = LinkedList([1, 2, 3])
print(list(ll))  # [1, 2, 3]` },

  { signature: 'Sentinel Pattern with iter()', description: 'iter() with callable and sentinel. Read until condition met.', complexity: 'O(n)', section: 'Custom Iterators', example: `# iter(callable, sentinel)
# Calls callable until it returns sentinel

import random

# Roll dice until we get 6
def roll():
    return random.randint(1, 6)

rolls = iter(roll, 6)
print(list(rolls))  # [3, 1, 4, 2, ...] (stops at first 6)

# Read file in chunks
def read_chunk():
    return file.read(1024)

# for chunk in iter(read_chunk, b''):
#     process(chunk)

# Read lines until empty
import sys
def get_line():
    return input("Enter (empty to stop): ")

# for line in iter(get_line, ''):
#     print(f"Got: {line}")

# Practical: Read until EOF
with open('data.txt', 'rb') as f:
    for block in iter(lambda: f.read(4096), b''):
        process_block(block)

# Infinite counter with sentinel
def make_counter():
    n = 0
    def count():
        nonlocal n
        n += 1
        return n
    return count

counter = make_counter()
# Get numbers until we reach 5
nums = list(iter(counter, 5))
print(nums)  # [1, 2, 3, 4]` },
]

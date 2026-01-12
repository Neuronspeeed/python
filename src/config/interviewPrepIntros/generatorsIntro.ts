export const generatorsIntro = `Generators enable lazy evaluation—producing values one at a time instead of building entire sequences in memory. The key insight: process infinite sequences, handle huge files, and build data pipelines with constant memory. The yield keyword transforms functions into generators, unlocking memory-efficient iteration patterns impossible with lists.

WHY GENERATORS MATTER IN INTERVIEWS: Generators solve the memory problem elegantly. When interviewers ask "how would you handle a 100GB file?" or "process an infinite stream?", generators are the answer. They're Python's secret weapon for scalable data processing—constant O(1) memory regardless of input size. Master generators and you can handle any data scale problem.

**The generator advantage:**
- Lists: O(n) memory, load everything upfront
- Generators: O(1) memory, produce values on-demand
- Use case: 1 billion integers = 8GB list vs 128 bytes generator
- Interview gold: "I'll use a generator to keep memory constant"

MEMORY EFFICIENCY: THE FUNDAMENTAL DIFFERENCE

Lists store all elements in memory simultaneously. Generators yield one element at a time, maintaining state between yields. For large datasets, this difference is dramatic.

\`\`\`python
# List approach - loads everything
def range_list(n):
    result = []
    for i in range(n):
        result.append(i)
    return result

huge_list = range_list(1_000_000_000)  # 8GB+ memory!
# Entire list built before you can use it

# Generator approach - yields one at a time
def range_gen(n):
    for i in range(n):
        yield i  # Pause here, return value

huge_gen = range_gen(1_000_000_000)  # ~128 bytes memory
for num in huge_gen:
    process(num)  # Only one number in memory at a time
\`\`\`python

**Real-world example: Reading huge log files**
\`\`\`python
# BAD: BAD - loads entire 100GB file into memory
def read_log_list(filename):
    with open(filename) as f:
        return f.readlines()  # Memory: 100GB!

lines = read_log_list('huge.log')  # CRASH!
for line in lines:
    process(line)

# GOOD: GOOD - processes one line at a time
def read_log_generator(filename):
    with open(filename) as f:
        for line in f:  # Files are generators!
            yield line.strip()

for line in read_log_generator('huge.log'):
    process(line)  # Memory: O(1) per line
\`\`\`python

YIELD KEYWORD: HOW GENERATORS WORK

When a function contains \`yield\`, calling it returns a generator object (doesn't execute the function). Each call to \`next()\` executes until the next \`yield\`, returns the yielded value, and pauses. State (local variables, execution position) is preserved between yields.

\`\`\`python
def countdown(n):
    print(f"Starting from {n}")
    while n > 0:
        yield n  # Pause and return n
        n -= 1
    print("Done!")

gen = countdown(3)  # Returns generator, prints nothing yet
print(next(gen))    # "Starting from 3", returns 3
print(next(gen))    # Returns 2
print(next(gen))    # Returns 1
print(next(gen))    # "Done!", raises StopIteration

# For loops handle StopIteration automatically
for num in countdown(3):
    print(num)  # 3, 2, 1, then loop ends
\`\`\`python

**Generator state preservation:**
\`\`\`python
def stateful_gen():
    count = 0
    while True:
        count += 1
        yield count  # Pause here, count preserved

gen = stateful_gen()
print(next(gen))  # 1
print(next(gen))  # 2 (count was preserved!)
print(next(gen))  # 3
# State maintained between calls
\`\`\`python

GENERATOR EXPRESSIONS: ONE-LINER GENERATORS

Like list comprehensions but with parentheses. Creates generator, not list. Memory-efficient for large sequences or when you don't need all values.

\`\`\`python
# List comprehension - creates entire list
squares_list = [x**2 for x in range(1000000)]  # O(n) memory

# Generator expression - creates generator
squares_gen = (x**2 for x in range(1000000))   # O(1) memory

# Use in functions that accept iterables
sum_squares = sum(x**2 for x in range(1000000))  # No extra memory
max_square = max(x**2 for x in range(1000000))

# Can only iterate once!
gen = (x for x in [1, 2, 3])
list(gen)  # [1, 2, 3]
list(gen)  # [] - exhausted!

# Tip: Use generator expressions in function calls
# Parentheses around argument = generator expression
sum(x**2 for x in range(10))  # Clean syntax
\`\`\`python

DATA PIPELINES: CHAINING GENERATORS

Generators compose beautifully. Each stage processes one item at a time, passing to next stage. Memory stays constant regardless of data size. This is how real data pipelines work.

\`\`\`python
def read_lines(filename):
    """Stage 1: Read lines"""
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_errors(lines):
    """Stage 2: Filter to errors only"""
    for line in lines:
        if 'ERROR' in line:
            yield line

def parse_timestamp(lines):
    """Stage 3: Extract timestamps"""
    for line in lines:
        yield line.split()[0]  # First word is timestamp

# Pipeline: Read -> Filter -> Parse
# Only ONE line in memory at a time!
pipeline = parse_timestamp(filter_errors(read_lines('huge.log')))

for timestamp in pipeline:
    print(timestamp)

# Equivalent to:
# for line in read_lines('huge.log'):
#     if 'ERROR' in line:
#         print(line.split()[0])
# But decomposed into reusable stages
\`\`\`python

SEND AND COROUTINES (ADVANCED)

Generators can receive values via \`send()\`. This transforms generators into coroutines—two-way communication channels. Useful for running averages, state machines, and cooperative multitasking.

\`\`\`python
def running_average():
    """Generator that maintains running average"""
    total = 0
    count = 0
    average = None
    while True:
        value = yield average  # Receive value, yield average
        total += value
        count += 1
        average = total / count

avg = running_average()
next(avg)  # Prime the generator (first yield)
print(avg.send(10))  # 10.0
print(avg.send(20))  # 15.0
print(avg.send(30))  # 20.0

# How it works:
# 1. yield average -> sends None (first time)
# 2. value = yield -> receives 10 from send(10)
# 3. Calculates, loops, yield average -> sends 10.0
# 4. value = yield -> receives 20 from send(20)
# ...
\`\`\`python

INFINITE SEQUENCES

Generators can represent infinite sequences—impossible with lists! Use \`itertools.islice\` to take finite portions.

\`\`\`python
def fibonacci():
    """Infinite Fibonacci sequence"""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take first 10 Fibonacci numbers
from itertools import islice
first_10 = list(islice(fibonacci(), 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Find first Fibonacci > 1000
for fib in fibonacci():
    if fib > 1000:
        print(fib)  # 1597
        break

# Infinite prime generator
def is_prime(n):
    if n < 2: return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0: return False
    return True

def primes():
    n = 2
    while True:
        if is_prime(n):
            yield n
        n += 1

# Get first 1000 primes without storing all primes
from itertools import islice
first_1000 = list(islice(primes(), 1000))
\`\`\`python

**Example 2: Process logs with filtering**
\`\`\`python
def error_logs(filename):
    with open(filename) as f:
        for line in f:
            if 'ERROR' in line:
                yield line.strip()

errors = list(error_logs('app.log'))
\`\`\`python

Generators are Python's answer to scalable iteration. They turn memory nightmares into elegant constant-space solutions. When you see "large data" or "infinite sequence" in an interview, think generators.`

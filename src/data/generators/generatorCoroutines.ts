import type { Method } from '../../types'

// Coroutines and Pipelines
export const generatorCoroutinesMethods: Method[] = [
  // Coroutines
  { signature: 'Generator send()', description: 'Send values INTO generator. Two-way communication with yield.', complexity: 'O(1)', section: 'Coroutines', example: `def coroutine():
    """Generator that receives values via send()."""
    print("Starting coroutine")
    while True:
        received = yield  # Pause and receive
        print(f"Received: {received}")

# Create and prime the coroutine
coro = coroutine()
next(coro)  # Advance to first yield (priming)
# Output: Starting coroutine

coro.send(10)   # Received: 10
coro.send(20)   # Received: 20

# Yield AND receive
def accumulator():
    """Accumulate values, yield running total."""
    total = 0
    while True:
        value = yield total  # Return total, receive value
        if value is not None:
            total += value

acc = accumulator()
next(acc)       # Prime, returns 0
print(acc.send(10))  # 10
print(acc.send(20))  # 30
print(acc.send(5))   # 35

# Decorator to auto-prime coroutines
def coroutine_decorator(func):
    def wrapper(*args, **kwargs):
        gen = func(*args, **kwargs)
        next(gen)  # Auto-prime
        return gen
    return wrapper

@coroutine_decorator
def printer():
    while True:
        value = yield
        print(f"> {value}")

p = printer()  # Already primed!
p.send("Hello")  # > Hello` },

  { signature: 'Generator throw() and close()', description: 'Inject exceptions or cleanly shutdown generators.', complexity: 'O(1)', section: 'Coroutines', example: `def generator_with_cleanup():
    """Generator with proper cleanup handling."""
    print("Starting")
    try:
        while True:
            value = yield
            print(f"Got: {value}")
    except GeneratorExit:
        print("Closing gracefully")
    finally:
        print("Cleanup done")

gen = generator_with_cleanup()
next(gen)
gen.send(1)  # Got: 1
gen.close()  # Closing gracefully, Cleanup done

# throw() - inject exception
def cancellable_task():
    try:
        while True:
            yield "working..."
    except Exception as e:
        yield f"Error: {e}"
        return

task = cancellable_task()
print(next(task))  # working...
print(task.throw(ValueError, "Cancelled!"))  # Error: Cancelled!

# Practical: Timeout handling
class TimeoutError(Exception):
    pass

def long_running():
    try:
        for i in range(100):
            yield i
    except TimeoutError:
        yield "Timed out!"

gen = long_running()
for i, val in enumerate(gen):
    if i > 5:
        print(gen.throw(TimeoutError))
        break
    print(val)` },

  // Generator Pipelines
  { signature: 'Generator Pipelines', description: 'Chain generators for data processing. Memory-efficient ETL pattern.', complexity: 'O(n) time, O(1) space', section: 'Pipelines', example: `# Pipeline: read -> filter -> transform -> output
# Each step is a generator, data flows through one item at a time

def read_data(filename):
    """Stage 1: Read lines."""
    with open(filename) as f:
        for line in f:
            yield line.strip()

def filter_empty(lines):
    """Stage 2: Filter empty lines."""
    for line in lines:
        if line:
            yield line

def parse_json(lines):
    """Stage 3: Parse as JSON."""
    import json
    for line in lines:
        try:
            yield json.loads(line)
        except json.JSONDecodeError:
            continue

def extract_field(records, field):
    """Stage 4: Extract specific field."""
    for record in records:
        if field in record:
            yield record[field]

# Build pipeline
pipeline = extract_field(
    parse_json(
        filter_empty(
            read_data("data.jsonl")
        )
    ),
    "name"
)

# Process with constant memory
for name in pipeline:
    print(name)

# Functional style
def pipeline(*stages):
    """Compose generators into pipeline."""
    def run(data):
        for stage in stages:
            data = stage(data)
        return data
    return run

process = pipeline(
    filter_empty,
    str.upper,  # Transform
    list  # Materialize
)` },

  { signature: 'Generator Map/Filter/Reduce', description: 'Lazy versions of functional operations. Build custom pipelines.', complexity: 'O(n)', section: 'Pipelines', example: `# Lazy map
def lazy_map(func, iterable):
    for item in iterable:
        yield func(item)

# Lazy filter
def lazy_filter(predicate, iterable):
    for item in iterable:
        if predicate(item):
            yield item

# Lazy reduce (returns generator of partial results)
def lazy_reduce(func, iterable, initial=None):
    it = iter(iterable)
    if initial is None:
        try:
            acc = next(it)
        except StopIteration:
            return
    else:
        acc = initial
    yield acc
    for item in it:
        acc = func(acc, item)
        yield acc

# Usage
nums = range(10)
pipeline = lazy_filter(
    lambda x: x % 2 == 0,
    lazy_map(lambda x: x ** 2, nums)
)
print(list(pipeline))  # [0, 4, 16, 36, 64]

# Running sum
sums = lazy_reduce(lambda a, b: a + b, [1, 2, 3, 4, 5])
print(list(sums))  # [1, 3, 6, 10, 15]

# Chunk generator
def chunked(iterable, size):
    """Yield chunks of given size."""
    chunk = []
    for item in iterable:
        chunk.append(item)
        if len(chunk) == size:
            yield chunk
            chunk = []
    if chunk:
        yield chunk

print(list(chunked(range(10), 3)))
# [[0,1,2], [3,4,5], [6,7,8], [9]]` },
]

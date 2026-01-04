import type { Method } from '../../types'

// Async/Await + Context + Iterators + aiohttp + Best Practices
export const concurrencyAsyncMethods: Method[] = [
  // Why & When
  { signature: 'Async/await vs Threads - when to choose async', description: 'Async wins: many (100+) I/O tasks, web servers, API clients. Threads win: few (<10) I/O tasks, legacy code, simpler mental model.', complexity: 'Concept', section: 'Why & When', example: `# ASYNC WINS - many concurrent I/O operations
import asyncio
import aiohttp

async def fetch_all(urls):
    # Can handle 1000s of concurrent requests
    # Single thread, event loop
    # Memory: ~50KB per task
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        return await asyncio.gather(*tasks)

# 1000 URLs: ~2-3 seconds, ~50MB memory

# THREADS WIN - few I/O tasks, simpler code
import threading
import requests

def fetch_all(urls):
    # Good for 10-100 concurrent requests
    # Multiple threads
    # Memory: ~8MB per thread
    with ThreadPoolExecutor(max_workers=10) as pool:
        return list(pool.map(requests.get, urls))

# 10 URLs: ~2 seconds, ~80MB memory

# Decision matrix:
# 1-10 I/O tasks → Threads (simpler)
# 10-100 I/O tasks → Either (preference)
# 100-1000s I/O tasks → Async (lower overhead)
# CPU-bound → Neither (use multiprocessing)
# Legacy libraries (no async support) → Threads
# Modern web frameworks → Async
# Mixed sync/async code → Threads (easier integration)

# Overhead comparison:
# Thread creation: ~0.1ms, ~8MB per thread
# Async task creation: ~0.001ms, ~50KB per task
# Context switch (threads): ~1-10μs
# Context switch (async): ~0.1μs (10-100x faster!)`,
  },
  { signature: 'Event loop - how async actually works', description: 'Single-threaded cooperative multitasking. Tasks voluntarily yield (await). Never blocks entire program. Understanding prevents bugs.', complexity: 'Concept', section: 'Why & When', example: `import asyncio

# UNDERSTANDING THE EVENT LOOP
async def task_a():
    print("A: start")
    await asyncio.sleep(1)  # Yields control here!
    print("A: done")

async def task_b():
    print("B: start")
    await asyncio.sleep(0.5)  # Yields control here!
    print("B: done")

async def main():
    await asyncio.gather(task_a(), task_b())

# Timeline (single thread!):
# 0.0s: A: start → sleep(1) → yield to event loop
# 0.0s: B: start → sleep(0.5) → yield to event loop
# 0.5s: B: done (sleep finished)
# 1.0s: A: done (sleep finished)
# Total: 1.0s (concurrent, not parallel!)

# BLOCKING = BAD (freezes event loop)
async def bad():
    import time
    time.sleep(1)  # BLOCKS entire event loop!
    # All other tasks frozen for 1 second

# GOOD - use async version or executor
async def good():
    await asyncio.sleep(1)  # Yields, other tasks run

# Or wrap blocking code:
async def wrap_blocking():
    loop = asyncio.get_running_loop()
    # Runs in thread pool, doesn't block loop
    await loop.run_in_executor(None, time.sleep, 1)

# Event loop is:
# - Single-threaded (no race conditions!)
# - Cooperative (tasks must yield)
# - Non-blocking (if you follow rules)
# - Efficient (1 million tasks possible)

# Key insight: await = "pause me, run others"`,
  },
  { signature: 'When async shines - the 1000 connection problem', description: 'Async excels at handling massive concurrency with minimal resources. Perfect for web servers, API gateways, websockets. Overkill for simple scripts.', complexity: 'Concept', section: 'Why & When', example: `# PROBLEM: Handle 10,000 concurrent HTTP requests
# Each request takes 100ms of I/O wait time

# THREADS - Resource exhaustion
import threading

def handle_request(req):
    time.sleep(0.1)  # I/O wait
    return "response"

# 10,000 threads × 8MB = 80GB memory!
# OS limit: ~1000-2000 threads max
# Context switching kills performance

# ASYNC - Lightweight tasks
import asyncio

async def handle_request(req):
    await asyncio.sleep(0.1)  # I/O wait
    return "response"

async def main():
    requests = [handle_request(i) for i in range(10000)]
    return await asyncio.gather(*requests)

# 10,000 tasks × 50KB = 500MB memory
# No thread limit
# Minimal context switching
# Total time: ~100ms (all concurrent!)

# Real-world async wins:
# - Web servers (FastAPI, aiohttp): 10k+ req/sec
# - WebSocket servers: 100k+ connections
# - Database connection pooling
# - API aggregation (fetch from 100s of APIs)
# - Chat servers (many idle connections)

# When NOT to use async:
# - Simple scripts (overkill)
# - CPU-bound work (use multiprocessing)
# - Legacy libraries (no async support)
# - Team unfamiliar with async (learning curve)
# - <10 concurrent tasks (threads simpler)

# Rule of thumb:
# Concurrency < 10 → don't bother with async
# Concurrency 10-100 → consider async
# Concurrency > 100 → definitely use async`,
  },
  { signature: 'Common async pitfalls - what breaks and why', description: 'Mixing sync/async, blocking calls, missing await, exception handling. These bugs are subtle and hard to debug. Learn patterns upfront.', complexity: 'Concept', section: 'Why & When', example: `import asyncio

# PITFALL 1: Forgetting await (silent failure!)
async def bad():
    asyncio.sleep(1)  # BUG: Returns coroutine, doesn't sleep!
    print("Instant!")

async def good():
    await asyncio.sleep(1)  # Correct
    print("After 1 second")

# PITFALL 2: Blocking the event loop
async def bad():
    import time
    time.sleep(5)  # BLOCKS everything for 5 seconds!

async def good():
    # Option 1: Use async version
    await asyncio.sleep(5)

    # Option 2: Run blocking code in executor
    loop = asyncio.get_running_loop()
    await loop.run_in_executor(None, time.sleep, 5)

# PITFALL 3: Not handling task exceptions
async def failing_task():
    raise ValueError("Oops")

async def bad():
    task = asyncio.create_task(failing_task())
    await asyncio.sleep(1)
    # Exception is lost!

async def good():
    task = asyncio.create_task(failing_task())
    try:
        await task
    except ValueError as e:
        print(f"Caught: {e}")

# PITFALL 4: Creating new event loop in running loop
async def bad():
    asyncio.run(some_async_func())  # ERROR! Can't nest

async def good():
    await some_async_func()  # Just await it

# PITFALL 5: Using sync library in async code
async def bad():
    import requests
    requests.get(url)  # Blocks event loop!

async def good():
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.text()

# PITFALL 6: Shared state without locks
counter = 0

async def bad():
    global counter
    # Not atomic in async! (though single-threaded)
    temp = counter
    await asyncio.sleep(0)  # Other tasks can run here!
    counter = temp + 1

async def good():
    global counter
    async with asyncio.Lock():
        counter += 1

# Debugging tips:
# - Enable debug mode: asyncio.run(main(), debug=True)
# - Check for "coroutine was never awaited" warnings
# - Use asyncio.create_task() to track tasks
# - Always await or gather tasks before exit`,
  },
  { signature: 'Async performance - when it matters and when it doesn\\'t', description: 'Async overhead: ~1μs per task creation, ~0.1μs context switch. Shines with I/O wait, worthless for CPU work. Measure, don\\'t guess.', complexity: 'Concept', section: 'Why & When', example: `import asyncio
import time

# PERFORMANCE BREAKDOWN

# Task creation overhead
async def measure_task_creation():
    start = time.perf_counter()
    tasks = [asyncio.create_task(asyncio.sleep(0)) for _ in range(10000)]
    await asyncio.gather(*tasks)
    elapsed = time.perf_counter() - start
    # ~10-20ms for 10k tasks = ~1-2μs per task

# Compare to threads:
# Thread creation: ~0.1ms per thread = 100x slower!

# WHEN ASYNC WINS
async def io_bound():
    # 1000 HTTP requests, each 100ms
    # Sequential: 100 seconds
    # Async: 100ms (all concurrent)
    # Speedup: 1000x!
    async with aiohttp.ClientSession() as session:
        tasks = [session.get(url) for url in urls]
        return await asyncio.gather(*tasks)

# WHEN ASYNC LOSES
async def cpu_bound():
    # Pure computation, no I/O
    # Sequential: 10 seconds
    # Async: 10 seconds (still single-threaded!)
    # Speedup: 1x (no benefit)
    return sum(i**2 for i in range(10_000_000))

# SCALABILITY LIMITS
# Async can handle:
# - 10,000 tasks: Easy (~500MB memory)
# - 100,000 tasks: Possible (~5GB memory)
# - 1,000,000 tasks: Hard (memory + CPU)

# Real-world benchmarks:
# FastAPI (async web server):
# - Simple endpoint: 20k req/sec (single process)
# - With DB queries: 5k req/sec
# - CPU-heavy endpoint: 500 req/sec (same as sync!)

# Flask (sync web server):
# - Simple endpoint: 2k req/sec (single process)
# - With DB queries: 500 req/sec
# - CPU-heavy endpoint: 500 req/sec

# Key insights:
# 1. Async wins only with I/O wait
# 2. No free lunch with CPU work
# 3. Overhead is tiny (~1μs), don't worry about it
# 4. Memory is the real limit (50KB per task)
# 5. Always profile before optimizing

# Profiling async code:
import cProfile
import pstats

async def main():
    # Your async code
    pass

cProfile.run('asyncio.run(main())', 'profile.stats')
stats = pstats.Stats('profile.stats')
stats.sort_stats('cumtime')
stats.print_stats(10)`,
  },

  // Async/Await (indices 15-23, which are 0-8 in this file)
  { signature: 'async def', description: 'Define coroutine function. Must be awaited.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def fetch_data(url):
    print(f"Fetching {url}")
    await asyncio.sleep(1)  # Simulated I/O
    return f"Data from {url}"

async def main():
    result = await fetch_data("example.com")
    print(result)

asyncio.run(main())` },
  { signature: 'await', description: 'Pause coroutine and wait for result. Allows other coroutines to run.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def task(name, seconds):
    print(f"{name} starting")
    await asyncio.sleep(seconds)
    print(f"{name} done after {seconds}s")
    return name

async def main():
    # Sequential - takes 3 seconds
    result1 = await task("A", 1)
    result2 = await task("B", 2)

asyncio.run(main())` },
  { signature: 'asyncio.gather()', description: 'Run multiple coroutines concurrently.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def task(name, seconds):
    await asyncio.sleep(seconds)
    return f"{name}: {seconds}s"

async def main():
    # Concurrent - takes only 2 seconds (max)
    results = await asyncio.gather(
        task("A", 1),
        task("B", 2),
        task("C", 1)
    )
    print(results)  # ['A: 1s', 'B: 2s', 'C: 1s']

asyncio.run(main())` },
  { signature: 'asyncio.create_task()', description: 'Schedule coroutine to run concurrently.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def background_task():
    while True:
        print("Background running...")
        await asyncio.sleep(1)

async def main():
    # Start background task
    task = asyncio.create_task(background_task())

    # Do other work
    await asyncio.sleep(3)

    # Cancel background task
    task.cancel()
    try:
        await task
    except asyncio.CancelledError:
        print("Task cancelled")

asyncio.run(main())` },
  { signature: 'asyncio.wait()', description: 'Wait for multiple tasks with timeout or first completion.', complexity: 'O(n)', section: 'Async/Await', example: `import asyncio

async def task(n):
    await asyncio.sleep(n)
    return n

async def main():
    tasks = [asyncio.create_task(task(i)) for i in [3, 1, 2]]

    # Wait for first to complete
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )
    print(f"First done: {done.pop().result()}")  # 1

    # Cancel pending
    for t in pending:
        t.cancel()

asyncio.run(main())` },
  { signature: 'asyncio.Queue', description: 'Async-safe queue for coroutine communication.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def producer(queue):
    for i in range(5):
        await queue.put(i)
        print(f"Produced {i}")
    await queue.put(None)

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print(f"Consumed {item}")
        await asyncio.sleep(0.5)

async def main():
    queue = asyncio.Queue()
    await asyncio.gather(
        producer(queue),
        consumer(queue)
    )

asyncio.run(main())` },
  { signature: 'asyncio.Semaphore', description: 'Limit concurrent async operations.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def fetch(url, semaphore):
    async with semaphore:
        print(f"Fetching {url}")
        await asyncio.sleep(1)
        return f"Data from {url}"

async def main():
    semaphore = asyncio.Semaphore(3)  # Max 3 concurrent
    urls = [f"url{i}" for i in range(10)]

    tasks = [fetch(url, semaphore) for url in urls]
    results = await asyncio.gather(*tasks)
    print(f"Got {len(results)} results")

asyncio.run(main())` },
  { signature: 'asyncio.Lock', description: 'Async mutual exclusion lock.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

counter = 0
lock = asyncio.Lock()

async def increment():
    global counter
    for _ in range(1000):
        async with lock:
            counter += 1

async def main():
    await asyncio.gather(*[increment() for _ in range(10)])
    print(counter)  # 10000

asyncio.run(main())` },
  { signature: 'asyncio.Event', description: 'Async event for signaling between coroutines.', complexity: 'O(1)', section: 'Async/Await', example: `import asyncio

async def waiter(event, name):
    print(f"{name} waiting...")
    await event.wait()
    print(f"{name} proceeding!")

async def setter(event):
    await asyncio.sleep(2)
    print("Setting event!")
    event.set()

async def main():
    event = asyncio.Event()
    await asyncio.gather(
        waiter(event, "A"),
        waiter(event, "B"),
        setter(event)
    )

asyncio.run(main())` },

  // Async Context & Iterators (indices 24-27, which are 9-12 in this file)
  { signature: 'async with', description: 'Async context manager for resources.', complexity: 'O(1)', section: 'Async Context & Iterators', example: `import asyncio

class AsyncTimer:
    async def __aenter__(self):
        self.start = asyncio.get_running_loop().time()  # 3.10+
        return self

    async def __aexit__(self, *args):
        elapsed = asyncio.get_running_loop().time() - self.start
        print(f"Elapsed: {elapsed:.2f}s")

async def main():
    async with AsyncTimer():
        await asyncio.sleep(1)

asyncio.run(main())` },
  { signature: '@asynccontextmanager', description: 'Create async context manager from generator.', complexity: 'O(1)', section: 'Async Context & Iterators', example: `from contextlib import asynccontextmanager

@asynccontextmanager
async def async_timer(label):
    import time
    start = time.time()
    try:
        yield
    finally:
        print(f"{label}: {time.time() - start:.2f}s")

async def main():
    async with async_timer("Task"):
        await asyncio.sleep(1)

asyncio.run(main())` },
  { signature: 'async for', description: 'Iterate over async iterator/generator.', complexity: 'O(n)', section: 'Async Context & Iterators', example: `import asyncio

async def async_range(n):
    for i in range(n):
        await asyncio.sleep(0.1)
        yield i

async def main():
    async for num in async_range(5):
        print(num)

asyncio.run(main())` },
  { signature: 'Async generator', description: 'Generator that yields asynchronously.', complexity: 'O(1)', section: 'Async Context & Iterators', example: `import asyncio

async def fetch_pages(urls):
    for url in urls:
        await asyncio.sleep(0.5)  # Simulate fetch
        yield f"Page content from {url}"

async def main():
    urls = ["page1", "page2", "page3"]
    async for content in fetch_pages(urls):
        print(content)

asyncio.run(main())` },

  // Async HTTP (index 28, which is 13 in this file)
  { signature: 'aiohttp (async HTTP)', description: 'Popular async HTTP client library.', complexity: 'O(1)', section: 'Async HTTP', example: `# pip install aiohttp
import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        "https://example.com",
        "https://httpbin.org/get"
    ]

    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        for url, data in zip(urls, results):
            print(f"{url}: {len(data)} bytes")

# asyncio.run(main())` },

  // Best Practices (indices 29-31, which are 14-16 in this file)
  { signature: 'Threading vs Multiprocessing vs Async', description: 'Choose the right tool for the job.', complexity: 'O(1)', section: 'Best Practices', example: `# THREADING - Good for:
# - I/O-bound tasks (network, file I/O)
# - Waiting on external resources
# - Limited by GIL for CPU-bound work
# Use: ThreadPoolExecutor

# MULTIPROCESSING - Good for:
# - CPU-bound tasks (calculations, data processing)
# - Bypasses GIL
# - Higher memory overhead (separate processes)
# Use: ProcessPoolExecutor

# ASYNCIO - Good for:
# - Many I/O-bound tasks
# - Single-threaded, cooperative multitasking
# - Web servers, API clients
# - Lower overhead than threading
# Use: async/await with asyncio` },
  { signature: 'Avoid common pitfalls', description: 'Common concurrency mistakes and solutions.', complexity: 'O(1)', section: 'Best Practices', example: `# 1. Race conditions - use locks
counter = 0
lock = threading.Lock()
with lock:
    counter += 1

# 2. Deadlocks - acquire locks in consistent order
# Bad: Thread1 locks A then B, Thread2 locks B then A
# Good: Always lock A before B

# 3. Resource exhaustion - use pools
with ThreadPoolExecutor(max_workers=10) as pool:
    pool.map(work, items)

# 4. GIL bottleneck - use multiprocessing for CPU work
with ProcessPoolExecutor() as pool:
    pool.map(cpu_heavy_work, items)

# 5. Blocking in async - use run_in_executor
loop = asyncio.get_running_loop()  # 3.10+ (use inside async)
await loop.run_in_executor(None, blocking_function)` },
  { signature: 'asyncio.run_in_executor()', description: 'Run blocking code in thread/process pool from async.', complexity: 'O(1)', section: 'Best Practices', example: `import asyncio
from concurrent.futures import ThreadPoolExecutor

def blocking_io():
    import time
    time.sleep(1)
    return "Done"

async def main():
    loop = asyncio.get_running_loop()  # 3.10+ preferred

    # Run in default executor (thread pool)
    result = await loop.run_in_executor(None, blocking_io)
    print(result)

    # Or with custom executor
    with ThreadPoolExecutor() as pool:
        result = await loop.run_in_executor(pool, blocking_io)

asyncio.run(main())` },
]

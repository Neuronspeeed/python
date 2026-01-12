import type { Method } from '../../../types'

export const asyncWhyWhenMethods: Method[] = [
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
  { signature: 'Async performance - when it matters and when it doesn\'t', description: 'Async overhead: ~1μs per task creation, ~0.1μs context switch. Shines with I/O wait, worthless for CPU work. Measure, don\'t guess.', complexity: 'Concept', section: 'Why & When', example: `import asyncio
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
]

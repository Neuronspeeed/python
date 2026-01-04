import type { Method } from '../../types'

// Async/Await + Context + Iterators + aiohttp + Best Practices
export const concurrencyAsyncMethods: Method[] = [
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

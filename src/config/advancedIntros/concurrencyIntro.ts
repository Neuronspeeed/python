export const concurrencyIntro = `Concurrency and parallelism allow programs to do multiple things at once—but in Python, the approach you choose matters enormously. The GIL (Global Interpreter Lock) in CPython is the critical constraint that determines which concurrency model to use. Understanding threading vs multiprocessing vs async/await—and when to use each—is essential for writing performant Python applications.

THE FUNDAMENTAL QUESTION: I/O-bound or CPU-bound?

This single question determines your entire concurrency strategy. Get this wrong and your "optimized" code might be SLOWER than single-threaded!

**I/O-bound tasks**: Waiting on external resources (network requests, file I/O, database queries). CPU sits idle waiting for data. Examples: web scraping, API calls, file uploads/downloads. Solution: Threading or Async/Await (both work well).

**CPU-bound tasks**: Performing computations (math, data processing, image manipulation). CPU is the bottleneck, not I/O. Examples: matrix multiplication, image processing, machine learning training. Solution: Multiprocessing (ONLY option that helps).

\`\`\`python
# I/O-bound example: Network requests
import requests
# Most time spent WAITING for server response
# CPU is idle during network I/O
# → Use threading or async/await

def fetch_url(url):
    response = requests.get(url)  # Waits for network I/O
    return response.text

# CPU-bound example: Computation
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)  # CPU works hard
# → Use multiprocessing
\`\`\`python

THE GLOBAL INTERPRETER LOCK (GIL): Why Python's threading is "weird."

CPython's GIL is a mutex that allows only ONE thread to execute Python bytecode at a time—even on multi-core CPUs! This means:

1. **Threading DOES NOT parallelize CPU-bound code**: Two threads doing math run sequentially, not in parallel. No speedup, often slower due to context switching overhead.

2. **Threading DOES help I/O-bound code**: When thread waits for I/O, GIL is released, allowing other threads to run. Speedup comes from overlapping wait times, not parallel execution.

3. **Multiprocessing bypasses GIL**: Each process has its own Python interpreter and GIL. True parallelism on multi-core CPUs. But: higher memory usage, slower inter-process communication.

\`\`\`python
# GIL demonstration: CPU-bound threading FAILS
import threading
import time

def cpu_task():
    # CPU-bound: compute sum
    total = sum(i*i for i in range(10_000_000))

# Sequential (baseline):
start = time.time()
cpu_task()
cpu_task()
print(f"Sequential: {time.time() - start:.2f}s")  # ~2.0s

# Threading (SAME or SLOWER!):
start = time.time()
t1 = threading.Thread(target=cpu_task)
t2 = threading.Thread(target=cpu_task)
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threading: {time.time() - start:.2f}s")  # ~2.0s (NO speedup!)

# Multiprocessing (FASTER!):
import multiprocessing
start = time.time()
p1 = multiprocessing.Process(target=cpu_task)
p2 = multiprocessing.Process(target=cpu_task)
p1.start(); p2.start()
p1.join(); p2.join()
print(f"Multiprocessing: {time.time() - start:.2f}s")  # ~1.0s (2x speedup!)
\`\`\`python

THREADING: Best for I/O-bound tasks with moderate concurrency.

Use threading when:
- Task is I/O-bound (network, file I/O, database)
- Need shared memory between tasks
- Number of concurrent tasks is manageable (<100 threads)
- Want simple implementation

\`\`\`python
import threading
import requests

urls = ["https://example.com/page1", "https://example.com/page2", ...]

def fetch(url):
    response = requests.get(url)
    print(f"Fetched {url}: {len(response.text)} bytes")

# Create and start threads
threads = [threading.Thread(target=fetch, args=(url,)) for url in urls]
for thread in threads:
    thread.start()

# Wait for all to complete
for thread in threads:
    thread.join()
\`\`\`python

ThreadPoolExecutor (Modern Approach): Simpler API, thread pooling, easier error handling.

\`\`\`python
from concurrent.futures import ThreadPoolExecutor
import requests

urls = ["https://example.com/page1", "https://example.com/page2", ...]

def fetch(url):
    response = requests.get(url)
    return url, len(response.text)

# ThreadPoolExecutor manages thread creation/cleanup
with ThreadPoolExecutor(max_workers=10) as executor:
    # Submit all tasks, get Future objects
    futures = [executor.submit(fetch, url) for url in urls]

    # Get results as they complete
    for future in concurrent.futures.as_completed(futures):
        url, size = future.result()
        print(f"Fetched {url}: {size} bytes")
\`\`\`python

Threading Gotchas:
- **Race conditions**: Multiple threads accessing shared state without locks can corrupt data
- **Deadlocks**: Two threads waiting for each other's locks
- **Thread overhead**: Each thread consumes ~8MB memory
- **GIL contention**: CPU-bound threads fight for GIL, slowing each other down

MULTIPROCESSING: Best for CPU-bound tasks and true parallelism.

Use multiprocessing when:
- Task is CPU-bound (computation, data processing)
- Need to utilize multiple CPU cores
- Tasks are independent (minimal communication)
- Memory overhead acceptable (each process ~50MB+)

\`\`\`python
import multiprocessing

def cpu_intensive_task(n):
    # Expensive computation
    return sum(i*i for i in range(n))

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

# Sequential (slow):
results = [cpu_intensive_task(n) for n in numbers]

# Parallel with Pool (fast!):
with multiprocessing.Pool(processes=4) as pool:
    results = pool.map(cpu_intensive_task, numbers)
    # Automatically distributes work across 4 processes
\`\`\`python

ProcessPoolExecutor (Modern Approach): Consistent API with ThreadPoolExecutor.

\`\`\`python
from concurrent.futures import ProcessPoolExecutor

def cpu_intensive_task(n):
    return sum(i*i for i in range(n))

numbers = [10_000_000, 10_000_000, 10_000_000, 10_000_000]

with ProcessPoolExecutor(max_workers=4) as executor:
    results = list(executor.map(cpu_intensive_task, numbers))
    # Results in same order as input
\`\`\`python

Multiprocessing Gotchas:
- **Startup overhead**: Creating processes is expensive (~100ms each)
- **Memory overhead**: Each process duplicates Python interpreter (~50MB+)
- **Communication cost**: Sharing data requires pickling (serialization), which is slow
- **Platform differences**: Windows requires \`if __name__ == "__main__":\` guard

ASYNC/AWAIT: Best for high-concurrency I/O-bound tasks.

Use async/await when:
- Task is I/O-bound (network, database, file I/O)
- Need MANY concurrent operations (1000+ connections)
- Single-threaded performance acceptable
- Using async-compatible libraries (aiohttp, asyncpg, etc.)

Async is **cooperative multitasking**: functions voluntarily yield control with \`await\`, allowing other tasks to run. All tasks run in a SINGLE thread—no GIL contention, no thread overhead.

\`\`\`python
import asyncio
import aiohttp  # Async HTTP library

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = ["https://example.com/1", "https://example.com/2", ...]

    async with aiohttp.ClientSession() as session:
        # Create tasks for all URLs
        tasks = [fetch(session, url) for url in urls]

        # Run concurrently (all in ONE thread!)
        results = await asyncio.gather(*tasks)

    print(f"Fetched {len(results)} URLs")

# Run the async main function
asyncio.run(main())
\`\`\`python

Async vs Threading for I/O:
- **Async**: Scales to 10,000+ concurrent connections with low memory overhead. But requires async libraries (can't use \`requests\`, must use \`aiohttp\`).
- **Threading**: Works with any library. But limited to ~100-1000 threads due to memory overhead and GIL contention.

Async Gotchas:
- **Blocking calls break everything**: \`time.sleep(1)\` blocks ALL tasks! Must use \`await asyncio.sleep(1)\`
- **Library compatibility**: Can't mix sync (\`requests\`) with async code without workarounds
- **Debugging complexity**: Stack traces can be confusing
- **Learning curve**: Requires understanding event loops, coroutines, \`await\`

DECISION MATRIX: Choosing the right concurrency model.

| Workload | Concurrency | Best Choice | Why |
|----------|-------------|-------------|-----|
| I/O-bound, <100 tasks | Low | **Threading** | Simple, works with any library |
| I/O-bound, 100-1000 tasks | Medium | **Threading** or **Async** | Threading simpler, async more scalable |
| I/O-bound, 1000+ tasks | High | **Async** | Threading can't scale, too much overhead |
| CPU-bound | Any | **Multiprocessing** | ONLY way to use multiple cores |
| Mixed I/O + CPU | Any | **Multiprocessing + Threading** | Process per core, threads for I/O in each |

\`\`\`python
# Example: Which to use?

# Scenario 1: Fetch 50 URLs → Threading
# Simple, works with requests library, <100 tasks

# Scenario 2: Web server handling 10,000 connections → Async
# High concurrency, I/O-bound, need scalability

# Scenario 3: Image processing on 100 images → Multiprocessing
# CPU-bound (resize, filters), parallel computation

# Scenario 4: Download + process images → Multiprocessing + Async
# Download (I/O) with async, process (CPU) with multiprocessing
\`\`\`python

COMMON PATTERNS:

1. **Map Pattern**: Apply function to each item in parallel.
\`\`\`python
from concurrent.futures import ProcessPoolExecutor

data = [1, 2, 3, 4, 5, 6, 7, 8]

with ProcessPoolExecutor() as executor:
    results = list(executor.map(expensive_function, data))
\`\`\`python

2. **As-Completed Pattern**: Process results as they finish (not in order).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor, as_completed

with ThreadPoolExecutor(max_workers=10) as executor:
    future_to_url = {executor.submit(fetch, url): url for url in urls}

    for future in as_completed(future_to_url):
        url = future_to_url[future]
        result = future.result()
        print(f"Completed: {url}")
\`\`\`python

3. **Rate Limiting**: Limit concurrent requests (e.g., API rate limits).
\`\`\`python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    # Only 5 requests at a time
    results = list(executor.map(api_call, items))
\`\`\`python

4. **Timeout Handling**: Cancel slow tasks.
\`\`\`python
with ThreadPoolExecutor() as executor:
    future = executor.submit(slow_function)
    try:
        result = future.result(timeout=5)  # Wait max 5 seconds
    except TimeoutError:
        print("Function took too long!")
\`\`\`python

WHEN NOT TO USE CONCURRENCY:

- **Simple scripts**: Overhead not worth it
- **Sequential dependencies**: Task B needs result from Task A
- **Shared state complexity**: If you need lots of locks, consider redesign
- **Debugging**: Makes debugging much harder
- **Premature optimization**: Profile first! Is this actually a bottleneck?

BEST PRACTICES SUMMARY:

- Identify workload first: I/O-bound → threading/async, CPU-bound → multiprocessing
- Use ProcessPoolExecutor/ThreadPoolExecutor over raw Process/Thread (simpler, safer)
- Always use context managers (\`with\`) for executors
- Set \`max_workers\` based on workload (CPU cores for CPU-bound, 10-100 for I/O-bound)
- Handle exceptions from worker tasks (\`future.result()\` can raise!)
- Use timeouts to prevent hanging
- Test with small worker counts first
- Profile to verify speedup—concurrency can make things SLOWER if used wrong!
- Avoid shared mutable state—use queues for communication
- For web servers, use async frameworks (FastAPI, aiohttp) not threading`

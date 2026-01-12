import type { Method } from '../../../types'

export const concurrencyWhyWhenMethods: Method[] = [
  {
    signature: 'Why understand concurrency?',
    description: 'Python concurrency for I/O-bound and CPU-bound tasks. Critical for Anthropic interviews - they explicitly test threading, multiprocessing, and async patterns.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# CONCURRENCY IN PYTHON - THREE APPROACHES

# 1. THREADING - For I/O-bound tasks (network, file I/O)
#    - Shares memory, limited by GIL for CPU work
#    - Best for: API calls, file operations, database queries

# 2. MULTIPROCESSING - For CPU-bound tasks
#    - Separate memory per process, bypasses GIL
#    - Best for: Data processing, image manipulation, ML inference

# 3. ASYNCIO - For high-concurrency I/O
#    - Single thread, cooperative multitasking
#    - Best for: Web servers, thousands of connections

# INTERVIEW DECISION TREE:
# Q: Is the task I/O-bound or CPU-bound?
#
# I/O-bound (waiting on network/disk):
#   - Few tasks (< 100) -> threading.Thread or ThreadPoolExecutor
#   - Many tasks (100+) -> asyncio
#
# CPU-bound (number crunching):
#   - Always use multiprocessing or ProcessPoolExecutor
#   - Threading WON'T help due to GIL

# ANTHROPIC FOCUS:
# - ThreadPoolExecutor for concurrent API calls
# - Multiprocessing for parallel data processing
# - Thread-safe queues for producer-consumer patterns`
  },

  {
    signature: 'Python GIL Explained',
    description: 'Global Interpreter Lock prevents true parallel Python execution. Understanding when GIL matters is critical for choosing the right concurrency approach.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# GLOBAL INTERPRETER LOCK (GIL)

# WHAT IT IS:
# - Mutex that protects Python object access
# - Only ONE thread can execute Python bytecode at a time
# - Built into CPython (the standard Python interpreter)

# WHEN GIL MATTERS:
import time
import threading

def cpu_bound(n):
    """CPU-bound: GIL blocks parallel execution"""
    count = 0
    for i in range(n):
        count += i
    return count

# SINGLE THREAD: ~2 seconds
start = time.time()
cpu_bound(10**7)
cpu_bound(10**7)
print(f"Sequential: {time.time() - start:.2f}s")

# TWO THREADS: STILL ~2 seconds (GIL!)
start = time.time()
t1 = threading.Thread(target=cpu_bound, args=(10**7,))
t2 = threading.Thread(target=cpu_bound, args=(10**7,))
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threaded: {time.time() - start:.2f}s")  # No speedup!

# WHEN GIL DOESN'T MATTER:
# - I/O operations release the GIL
# - C extensions can release the GIL (numpy, pandas)
# - Multiprocessing bypasses the GIL entirely

# INTERVIEW TIP:
# "Threading in Python is great for I/O-bound tasks because
#  the GIL is released during I/O waits. For CPU-bound work,
#  use multiprocessing to get true parallelism."`
  },

  {
    signature: 'Threading vs Multiprocessing vs Async',
    description: 'Decision guide for choosing the right concurrency model. Key interview topic - know when to use each approach.',
    complexity: 'Concept',
    section: 'Why & When',
    example: `# CHOOSING THE RIGHT CONCURRENCY MODEL

# THREADING (threading module)
# Use when:
# - I/O-bound tasks (network, file, database)
# - Shared memory needed between tasks
# - Moderate number of concurrent tasks (< 100)
# Avoid when:
# - CPU-bound computation (GIL blocks parallelism)

import concurrent.futures
import urllib.request

def fetch_url(url):
    with urllib.request.urlopen(url) as response:
        return len(response.read())

urls = ['https://python.org'] * 10
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    results = list(executor.map(fetch_url, urls))

# MULTIPROCESSING (multiprocessing module)
# Use when:
# - CPU-bound tasks (computation, data processing)
# - Need true parallelism (bypass GIL)
# - Tasks are independent (don't share state)
# Avoid when:
# - Tasks need frequent communication
# - Memory is constrained (each process copies data)

from multiprocessing import Pool

def cpu_task(n):
    return sum(i * i for i in range(n))

with Pool(4) as p:
    results = p.map(cpu_task, [10**6] * 4)

# ASYNCIO (asyncio module)
# Use when:
# - Many I/O-bound tasks (1000+ connections)
# - Building web servers or clients
# - Single-threaded event loop is acceptable
# Avoid when:
# - CPU-bound work (blocks the event loop)
# - Libraries don't support async

import asyncio
import aiohttp

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)

# QUICK REFERENCE:
# | Task Type | Approach | Why |
# |-----------|----------|-----|
# | Network I/O (few) | ThreadPool | Simple, shared memory |
# | Network I/O (many) | asyncio | Lower overhead |
# | File I/O | ThreadPool | GIL released during I/O |
# | CPU math | ProcessPool | Bypass GIL |
# | Mixed | Combine | ThreadPool + ProcessPool |`
  },
]

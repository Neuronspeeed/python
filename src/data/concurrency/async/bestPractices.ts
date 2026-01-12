import type { Method } from '../../../types'

export const asyncBestPracticesMethods: Method[] = [
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

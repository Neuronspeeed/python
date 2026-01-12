import type { Method } from '../../../types'

export const concurrencyAsyncioMethods: Method[] = [
  {
    signature: 'async/await basics',
    description: 'Coroutines for concurrent I/O operations. Single-threaded, cooperative multitasking for high-concurrency I/O.',
    complexity: 'O(1)',
    section: 'Asyncio',
    example: `import asyncio

# COROUTINE DEFINITION
async def fetch_data(name, delay):
    print(f"{name} starting")
    await asyncio.sleep(delay)  # Non-blocking sleep
    print(f"{name} done")
    return f"Result from {name}"

# RUNNING COROUTINES
async def main():
    # Method 1: await single coroutine
    result = await fetch_data("Task1", 1)
    print(result)

    # Method 2: Run multiple concurrently
    results = await asyncio.gather(
        fetch_data("A", 1),
        fetch_data("B", 2),
        fetch_data("C", 1),
    )
    print(results)  # All three results

# Run the event loop
asyncio.run(main())

# CREATING TASKS (schedule without waiting)
async def main_with_tasks():
    # Create tasks - they start running immediately
    task1 = asyncio.create_task(fetch_data("Task1", 2))
    task2 = asyncio.create_task(fetch_data("Task2", 1))

    # Do other work while tasks run
    print("Tasks are running...")

    # Wait for tasks when needed
    result1 = await task1
    result2 = await task2
    print(result1, result2)

# KEY CONCEPTS:
# - async def: Defines a coroutine
# - await: Pauses coroutine, allows others to run
# - asyncio.run(): Entry point, creates event loop
# - create_task(): Schedule coroutine to run soon

# COMMON MISTAKE:
# await blocks the current coroutine
async def bad():
    await fetch_data("A", 2)  # Waits 2 seconds
    await fetch_data("B", 2)  # Then waits 2 more
    # Total: 4 seconds

async def good():
    # Run concurrently - total: 2 seconds
    await asyncio.gather(
        fetch_data("A", 2),
        fetch_data("B", 2),
    )`
  },

  {
    signature: 'asyncio.gather and asyncio.wait',
    description: 'Run multiple coroutines concurrently. gather returns results in order, wait provides more control.',
    complexity: 'O(1)',
    section: 'Asyncio',
    example: `import asyncio

async def fetch(name, delay, should_fail=False):
    await asyncio.sleep(delay)
    if should_fail:
        raise ValueError(f"{name} failed!")
    return f"{name}: done"

# ASYNCIO.GATHER - Wait for all, get ordered results
async def main_gather():
    # Basic usage - results in same order as input
    results = await asyncio.gather(
        fetch("A", 1),
        fetch("B", 2),
        fetch("C", 0.5),
    )
    print(results)  # ['A: done', 'B: done', 'C: done']

    # With return_exceptions=True (don't stop on error)
    results = await asyncio.gather(
        fetch("A", 1),
        fetch("B", 1, should_fail=True),
        fetch("C", 1),
        return_exceptions=True
    )
    # ['A: done', ValueError('B failed!'), 'C: done']

# ASYNCIO.WAIT - More control over completion
async def main_wait():
    tasks = [
        asyncio.create_task(fetch("A", 2)),
        asyncio.create_task(fetch("B", 1)),
        asyncio.create_task(fetch("C", 3)),
    ]

    # Wait for first to complete
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )
    print(f"First done: {done.pop().result()}")

    # Cancel remaining
    for task in pending:
        task.cancel()

# ASYNCIO.AS_COMPLETED - Process as they finish
async def main_as_completed():
    tasks = [
        fetch("A", 2),
        fetch("B", 1),
        fetch("C", 3),
    ]

    for coro in asyncio.as_completed(tasks):
        result = await coro
        print(f"Completed: {result}")
    # Output order: B, A, C (by completion time)

# TIMEOUT HANDLING
async def main_timeout():
    try:
        result = await asyncio.wait_for(
            fetch("Slow", 10),
            timeout=2.0
        )
    except asyncio.TimeoutError:
        print("Task timed out!")

    # With gather - timeout for all
    try:
        results = await asyncio.wait_for(
            asyncio.gather(fetch("A", 1), fetch("B", 5)),
            timeout=2.0
        )
    except asyncio.TimeoutError:
        print("Some tasks timed out!")

asyncio.run(main_gather())`
  },

  {
    signature: 'aiohttp patterns',
    description: 'Async HTTP client/server library. Essential for high-performance web scraping and API calls.',
    complexity: 'O(1)',
    section: 'Asyncio',
    example: `import asyncio
import aiohttp

# BASIC HTTP REQUESTS
async def fetch_url(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    async with aiohttp.ClientSession() as session:
        html = await fetch_url(session, 'https://python.org')
        print(len(html))

asyncio.run(main())

# CONCURRENT REQUESTS (the power of asyncio)
async def fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results

urls = ['https://python.org'] * 10
results = asyncio.run(fetch_all(urls))
# All 10 requests run concurrently!

# WITH ERROR HANDLING AND TIMEOUT
async def fetch_safe(session, url, timeout=10):
    try:
        async with session.get(url, timeout=aiohttp.ClientTimeout(total=timeout)) as response:
            if response.status == 200:
                return await response.text()
            return None
    except (aiohttp.ClientError, asyncio.TimeoutError) as e:
        print(f"Error fetching {url}: {e}")
        return None

# RATE LIMITING WITH SEMAPHORE
async def fetch_with_limit(urls, max_concurrent=5):
    semaphore = asyncio.Semaphore(max_concurrent)

    async def limited_fetch(session, url):
        async with semaphore:
            return await fetch_safe(session, url)

    async with aiohttp.ClientSession() as session:
        tasks = [limited_fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# POST REQUEST WITH JSON
async def post_data(session, url, data):
    async with session.post(url, json=data) as response:
        return await response.json()

# INTERVIEW PATTERN: Parallel API calls with retry
async def fetch_with_retry(session, url, retries=3):
    for attempt in range(retries):
        try:
            async with session.get(url) as response:
                if response.status == 200:
                    return await response.json()
        except aiohttp.ClientError:
            if attempt == retries - 1:
                raise
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
    return None`
  },

  {
    signature: 'Mixing sync and async code',
    description: 'Techniques for calling async from sync code and vice versa. Common interview question.',
    complexity: 'Concept',
    section: 'Asyncio',
    example: `import asyncio
from concurrent.futures import ThreadPoolExecutor

# CALLING ASYNC FROM SYNC CODE
async def async_fetch(url):
    await asyncio.sleep(1)
    return f"Result from {url}"

# Method 1: asyncio.run() (creates new event loop)
def sync_function():
    result = asyncio.run(async_fetch("https://api.example.com"))
    return result

# Method 2: Get or create event loop (for nested calls)
def sync_in_existing_loop():
    loop = asyncio.get_event_loop()
    if loop.is_running():
        # Already in async context - can't use run()
        # Use threading or nest_asyncio
        pass
    else:
        result = loop.run_until_complete(async_fetch("url"))
        return result

# CALLING SYNC FROM ASYNC CODE
def blocking_io(path):
    """Simulate blocking I/O"""
    import time
    time.sleep(1)
    return f"Read {path}"

async def main():
    loop = asyncio.get_event_loop()

    # Method 1: run_in_executor (recommended)
    # Runs blocking code in thread pool
    result = await loop.run_in_executor(
        None,  # Default executor
        blocking_io,
        "/path/to/file"
    )
    print(result)

    # Method 2: Custom thread pool
    with ThreadPoolExecutor(max_workers=4) as pool:
        result = await loop.run_in_executor(
            pool,
            blocking_io,
            "/another/file"
        )

# PATTERN: Wrapper for sync libraries
def sync_database_query(query):
    """Pretend this is a sync database library"""
    import time
    time.sleep(0.5)
    return [{"id": 1}, {"id": 2}]

async def async_db_query(query):
    """Async wrapper"""
    loop = asyncio.get_event_loop()
    return await loop.run_in_executor(None, sync_database_query, query)

async def main():
    # Now can use in async context
    results = await async_db_query("SELECT * FROM users")
    print(results)

# INTERVIEW TIP:
# - asyncio.run(): New event loop (entry point)
# - run_in_executor(): Sync in async (thread pool)
# - Never use time.sleep() in async (use asyncio.sleep())
# - Blocking calls in async block ALL coroutines`
  },
]

import type { Method } from '../../../types'

export const asyncAwaitMethods: Method[] = [
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
]

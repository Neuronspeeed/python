import type { Method } from '../../../types'

export const asyncContextIteratorsMethods: Method[] = [
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
]

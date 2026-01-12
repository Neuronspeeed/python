import type { Method } from '../../../types'

export const asyncHttpMethods: Method[] = [
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
]

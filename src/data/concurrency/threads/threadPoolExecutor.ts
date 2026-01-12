import type { Method } from '../../../types'

export const threadPoolExecutorMethods: Method[] = [
  { signature: 'ThreadPoolExecutor', description: 'Pool of threads for concurrent execution.', complexity: 'O(1)', section: 'ThreadPoolExecutor', example: `from concurrent.futures import ThreadPoolExecutor
import time

def fetch_url(url):
    time.sleep(1)  # Simulate network request
    return f"Data from {url}"

urls = ["url1", "url2", "url3", "url4", "url5"]

with ThreadPoolExecutor(max_workers=3) as executor:
    results = executor.map(fetch_url, urls)
    for result in results:
        print(result)` },
  { signature: 'executor.submit()', description: 'Submit individual tasks and get Future objects.', complexity: 'O(1)', section: 'ThreadPoolExecutor', example: `from concurrent.futures import ThreadPoolExecutor, as_completed

def process(n):
    import time
    time.sleep(n)
    return n * 2

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(process, i): i for i in [3, 1, 2]}

    # Get results as they complete
    for future in as_completed(futures):
        n = futures[future]
        result = future.result()
        print(f"process({n}) = {result}")` },
]

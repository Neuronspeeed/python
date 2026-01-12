import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  { signature: 'Threads vs Processes vs Async - decision tree', description: 'I/O-bound → async (fastest) or threads. CPU-bound → multiprocessing. Simple I/O → threads. Complex async logic → async/await.', complexity: 'Concept', section: 'Why & When', example: `# I/O-BOUND (network, disk, database)
# Option 1: ASYNC (best for I/O)
import asyncio
async def fetch_urls(urls):
    # Single-threaded, event loop
    # Can handle 1000s of concurrent requests
    pass

# Option 2: THREADS (good for I/O)
import threading
def download_file(url):
    # Multiple OS threads
    # Can handle 10s-100s concurrent
    pass

# Option 3: PROCESSES (overkill for I/O)
import multiprocessing
# Don't use for I/O - too much overhead

# CPU-BOUND (computation, data processing)
# MUST use multiprocessing (GIL limits threads)
from multiprocessing import Pool
def process_data(chunk):
    # Parallel computation
    # Bypasses GIL
    pass

# Decision tree:
# I/O-bound + async-friendly → async/await
# I/O-bound + simple → threads
# I/O-bound + legacy code → threads
# CPU-bound → multiprocessing
# Mixed workload → processes + thread pools`,
  },
  { signature: 'GIL (Global Interpreter Lock) - when it matters', description: 'GIL prevents true parallelism in threads. Irrelevant for I/O (threads release GIL). Critical for CPU-bound (use multiprocessing instead).', complexity: 'Concept', section: 'Why & When', example: `import threading
import time

# I/O-BOUND - GIL doesn't matter
def io_task():
    time.sleep(1)  # Releases GIL during sleep
    # File I/O, network, DB also release GIL

threads = [threading.Thread(target=io_task) for _ in range(10)]
# All 10 run concurrently! (GIL released during I/O)

# CPU-BOUND - GIL kills performance
def cpu_task():
    sum(range(10_000_000))  # Pure Python, holds GIL

threads = [threading.Thread(target=cpu_task) for _ in range(10)]
# Runs SLOWER than sequential! (GIL contention)

# Solution for CPU-bound:
from multiprocessing import Pool
with Pool(10) as pool:
    pool.map(cpu_task, range(10))
# True parallelism, bypasses GIL

# GIL is released during:
# - time.sleep()
# - I/O operations (file, network, DB)
# - C extensions (NumPy, etc.)
#
# GIL is held during:
# - Pure Python computation
# - List comprehensions
# - For loops with Python objects`,
  },
  { signature: 'When to use locks (thread safety)', description: 'Need locks when: multiple threads modify shared data. Don\'t need locks when: read-only access, thread-local data, immutable objects.', complexity: 'Concept', section: 'Why & When', example: `import threading

# NEED LOCK - shared mutable data
counter = 0
lock = threading.Lock()

def increment():
    global counter
    with lock:  # REQUIRED
        counter += 1  # Read-modify-write

# NO LOCK NEEDED - read-only
config = {"timeout": 30}

def read_config():
    return config["timeout"]  # Read-only, safe

# NO LOCK NEEDED - thread-local storage
import threading
local = threading.local()

def worker():
    local.value = 42  # Each thread has its own
    print(local.value)

# NO LOCK NEEDED - immutable
data = (1, 2, 3)  # Tuple is immutable

def process():
    print(data[0])  # Safe without lock

# NO LOCK NEEDED - queue (built-in thread-safe)
from queue import Queue
q = Queue()  # Already thread-safe!

def producer():
    q.put(item)  # No lock needed

# Rule: Lock only for shared mutable state
# Cost: ~100ns per lock acquire (cheap!)`,
  },
  { signature: 'ThreadPoolExecutor vs manual threads', description: 'ThreadPoolExecutor: simple tasks, many jobs, auto cleanup. Manual threads: complex lifecycle, state management, long-running.', complexity: 'Concept', section: 'Why & When', example: `from concurrent.futures import ThreadPoolExecutor
import threading

# USE ThreadPoolExecutor - simple tasks
urls = ['url1', 'url2', ...]  # 100s of URLs

with ThreadPoolExecutor(max_workers=10) as executor:
    results = executor.map(download, urls)
# Auto cleanup, easy to use, perfect for batches

# USE manual threads - complex lifecycle
class DatabaseSyncer(threading.Thread):
    def __init__(self):
        super().__init__(daemon=True)
        self.running = True

    def run(self):
        while self.running:
            sync_database()
            time.sleep(60)

    def stop(self):
        self.running = False

syncer = DatabaseSyncer()
syncer.start()
# Need: custom lifecycle, state, graceful shutdown

# ThreadPoolExecutor when:
# - Batch processing (map 100s of tasks)
# - Simple function calls
# - Auto cleanup desired
# - Don't need thread control

# Manual threads when:
# - Long-running background workers
# - Complex state management
# - Custom start/stop logic
# - Need thread references`,
  },
  { signature: 'Multiprocessing - when to escalate', description: 'Use multiprocessing when: CPU-bound, need true parallelism, have multiple cores. Overhead: ~100ms startup per process. Worth it for >1 sec tasks.', complexity: 'Concept', section: 'Why & When', example: `from multiprocessing import Pool
import threading

# MULTIPROCESSING - CPU-bound tasks
def process_image(img):
    # Heavy computation: ~10 seconds
    # Uses PIL, OpenCV (releases GIL but still benefits)
    return transformed_img

# Worth the overhead for long tasks
with Pool(8) as pool:
    results = pool.map(process_image, images)

# THREADING - I/O-bound (don't use multiprocessing!)
def fetch_url(url):
    # Network I/O: ~1 second
    return requests.get(url).text

# Threads are 100x faster to create
with ThreadPoolExecutor(10) as executor:
    results = executor.map(fetch_url, urls)

# Overhead comparison:
# Thread startup: ~0.1ms
# Process startup: ~100ms (1000x slower!)

# Use multiprocessing when:
# - CPU-bound computation (>1 sec per task)
# - Need true parallelism
# - Have multiple CPU cores
# - Task overhead >> process startup

# Stick with threads when:
# - I/O-bound operations
# - Tasks < 100ms
# - Need shared memory
# - Simple concurrency`,
  },
]

import type { Method } from '../../types'

// Threading + ThreadPoolExecutor + Multiprocessing
export const concurrencyThreadsMethods: Method[] = [
  // Why & When
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

  // Threading Basics (indices 0-7)
  { signature: 'import threading', description: 'Thread-based parallelism. Good for I/O-bound tasks. Limited by GIL for CPU-bound.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading
import time

def worker(name):
    print(f"{name} starting")
    time.sleep(2)
    print(f"{name} finished")

# Create threads
t1 = threading.Thread(target=worker, args=("Thread-1",))
t2 = threading.Thread(target=worker, args=("Thread-2",))

# Start threads
t1.start()
t2.start()

# Wait for completion
t1.join()
t2.join()
print("All done")` },
  { signature: 'Thread with class', description: 'Subclass Thread for more complex workers.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading

class DownloadThread(threading.Thread):
    def __init__(self, url):
        super().__init__()
        self.url = url
        self.result = None

    def run(self):
        # Simulate download
        import time
        time.sleep(1)
        self.result = f"Data from {self.url}"

threads = [DownloadThread(f"url{i}") for i in range(3)]
for t in threads:
    t.start()
for t in threads:
    t.join()
    print(t.result)` },
  { signature: 'threading.Lock', description: 'Mutual exclusion lock. Prevents race conditions.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # Acquire/release automatically
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]
for t in threads:
    t.start()
for t in threads:
    t.join()

print(counter)  # Exactly 500000 (without lock, less due to race)` },
  { signature: 'threading.RLock', description: 'Reentrant lock. Can be acquired multiple times by same thread.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading

rlock = threading.RLock()

def outer():
    with rlock:
        print("Outer acquired")
        inner()

def inner():
    with rlock:  # Same thread can acquire again
        print("Inner acquired")

outer()

# With regular Lock, inner() would deadlock!` },
  { signature: 'threading.Semaphore', description: 'Limit concurrent access to a resource.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading
import time

# Allow max 3 concurrent workers
semaphore = threading.Semaphore(3)

def worker(id):
    with semaphore:
        print(f"Worker {id} acquired")
        time.sleep(2)
        print(f"Worker {id} released")

threads = [threading.Thread(target=worker, args=(i,)) for i in range(10)]
for t in threads:
    t.start()
# Only 3 workers run at a time` },
  { signature: 'threading.Event', description: 'Signal between threads. Set/wait/clear.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading
import time

event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()  # Block until event is set
    print("Event received!")

def setter():
    time.sleep(2)
    print("Setting event")
    event.set()

threading.Thread(target=waiter).start()
threading.Thread(target=setter).start()` },
  { signature: 'threading.Condition', description: 'Wait for condition with notification.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading

condition = threading.Condition()
items = []

def consumer():
    with condition:
        while not items:
            condition.wait()  # Release lock and wait
        item = items.pop(0)
        print(f"Consumed: {item}")

def producer():
    with condition:
        items.append("item")
        print("Produced item")
        condition.notify()  # Wake up one waiter

threading.Thread(target=consumer).start()
import time; time.sleep(0.1)
threading.Thread(target=producer).start()` },
  { signature: 'queue.Queue', description: 'Thread-safe queue for producer/consumer patterns.', complexity: 'O(1)', section: 'Threading Basics', example: `import threading
import queue

q = queue.Queue()

def producer():
    for i in range(5):
        q.put(i)
        print(f"Produced {i}")
    q.put(None)  # Sentinel

def consumer():
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Consumed {item}")
        q.task_done()

threading.Thread(target=producer).start()
threading.Thread(target=consumer).start()

q.join()  # Wait until all items processed` },

  // ThreadPoolExecutor (indices 8-9)
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

  // Multiprocessing (indices 10-14)
  { signature: 'import multiprocessing', description: 'Process-based parallelism. Bypasses GIL. Best for CPU-bound tasks.', complexity: 'O(1)', section: 'Multiprocessing', example: `import multiprocessing

def square(n):
    return n ** 2

if __name__ == '__main__':
    with multiprocessing.Pool(4) as pool:
        results = pool.map(square, range(10))
        print(results)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]` },
  { signature: 'Process class', description: 'Create individual processes.', complexity: 'O(1)', section: 'Multiprocessing', example: `import multiprocessing

def worker(num):
    print(f"Worker {num} running")
    return num * 2

if __name__ == '__main__':
    processes = []
    for i in range(4):
        p = multiprocessing.Process(target=worker, args=(i,))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()
    print("All processes complete")` },
  { signature: 'multiprocessing.Queue', description: 'Process-safe queue for inter-process communication.', complexity: 'O(1)', section: 'Multiprocessing', example: `import multiprocessing

def producer(q):
    for i in range(5):
        q.put(i)
    q.put(None)  # Sentinel

def consumer(q):
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Got: {item}")

if __name__ == '__main__':
    q = multiprocessing.Queue()
    p1 = multiprocessing.Process(target=producer, args=(q,))
    p2 = multiprocessing.Process(target=consumer, args=(q,))
    p1.start()
    p2.start()
    p1.join()
    p2.join()` },
  { signature: 'ProcessPoolExecutor', description: 'Pool of processes for parallel execution.', complexity: 'O(1)', section: 'Multiprocessing', example: `from concurrent.futures import ProcessPoolExecutor

def cpu_intensive(n):
    return sum(i*i for i in range(n))

if __name__ == '__main__':
    with ProcessPoolExecutor(max_workers=4) as executor:
        numbers = [10000, 20000, 30000, 40000]
        results = list(executor.map(cpu_intensive, numbers))
        print(results)` },
  { signature: 'Shared memory', description: 'Share data between processes efficiently.', complexity: 'O(1)', section: 'Multiprocessing', example: `import multiprocessing

def increment(shared_value, shared_array):
    shared_value.value += 1
    for i in range(len(shared_array)):
        shared_array[i] += 1

if __name__ == '__main__':
    # Shared Value
    counter = multiprocessing.Value('i', 0)  # 'i' = integer

    # Shared Array
    arr = multiprocessing.Array('d', [1.0, 2.0, 3.0])  # 'd' = double

    processes = [
        multiprocessing.Process(target=increment, args=(counter, arr))
        for _ in range(4)
    ]
    for p in processes:
        p.start()
    for p in processes:
        p.join()

    print(counter.value)  # 4
    print(list(arr))      # [5.0, 6.0, 7.0]` },
]

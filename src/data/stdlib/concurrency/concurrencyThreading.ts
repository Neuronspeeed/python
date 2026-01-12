import type { Method } from '../../../types'

export const concurrencyThreadingMethods: Method[] = [
  {
    signature: 'threading.Thread',
    description: 'Create and manage threads for concurrent I/O-bound operations. Threads share memory and are lighter than processes.',
    complexity: 'O(1) create',
    section: 'Threading',
    example: `import threading
import time

# BASIC THREAD CREATION
def worker(name, delay):
    print(f"{name} starting")
    time.sleep(delay)
    print(f"{name} finished")

# Method 1: Create and start thread
t = threading.Thread(target=worker, args=("Thread-1", 1))
t.start()
t.join()  # Wait for thread to complete

# Method 2: Multiple threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"Thread-{i}", 0.5))
    threads.append(t)
    t.start()

for t in threads:
    t.join()  # Wait for all to complete

# DAEMON THREADS
# Daemon threads are killed when main program exits
t = threading.Thread(target=worker, args=("Daemon", 10), daemon=True)
t.start()
# Program exits, daemon thread is killed

# THREAD WITH RETURN VALUE
# Threads don't return values directly - use a container
results = {}

def worker_with_result(name, results):
    results[name] = name.upper()

t = threading.Thread(target=worker_with_result, args=("hello", results))
t.start()
t.join()
print(results)  # {'hello': 'HELLO'}

# INTERVIEW PATTERN: Thread with exception handling
def safe_worker(func, args, results, index):
    try:
        results[index] = func(*args)
    except Exception as e:
        results[index] = e`
  },

  {
    signature: 'Lock, RLock, Semaphore',
    description: 'Synchronization primitives for thread-safe operations. Essential for protecting shared resources from race conditions.',
    complexity: 'O(1)',
    section: 'Threading',
    example: `import threading

# LOCK - Mutual exclusion (mutex)
# Only one thread can hold the lock at a time
lock = threading.Lock()
counter = 0

def increment():
    global counter
    with lock:  # Acquire and release automatically
        temp = counter
        temp += 1
        counter = temp

# BAD: Without lock, race condition occurs
# threads = [threading.Thread(target=increment) for _ in range(1000)]
# Result: counter < 1000 due to race conditions

# GOOD: With lock, thread-safe
threads = [threading.Thread(target=increment) for _ in range(1000)]
for t in threads: t.start()
for t in threads: t.join()
# counter == 1000 guaranteed

# RLOCK - Reentrant Lock
# Same thread can acquire multiple times
rlock = threading.RLock()

def outer():
    with rlock:
        inner()  # Same thread can acquire again

def inner():
    with rlock:  # Would deadlock with regular Lock!
        pass

# SEMAPHORE - Limit concurrent access
# Allow N threads to access resource simultaneously
semaphore = threading.Semaphore(3)  # Max 3 concurrent

def limited_resource(name):
    with semaphore:
        print(f"{name} acquired")
        time.sleep(1)
        print(f"{name} released")

# Only 3 threads run concurrently
threads = [threading.Thread(target=limited_resource, args=(i,)) for i in range(10)]
for t in threads: t.start()

# INTERVIEW PATTERN: Connection pool with semaphore
class ConnectionPool:
    def __init__(self, size):
        self.semaphore = threading.Semaphore(size)
        self.connections = [self._create_conn() for _ in range(size)]

    def get_connection(self):
        self.semaphore.acquire()
        return self.connections.pop()

    def release(self, conn):
        self.connections.append(conn)
        self.semaphore.release()`
  },

  {
    signature: 'ThreadPoolExecutor',
    description: 'High-level interface for thread pools. Preferred over manual thread management for most use cases.',
    complexity: 'O(1) submit',
    section: 'Threading',
    example: `from concurrent.futures import ThreadPoolExecutor, as_completed
import urllib.request

# BASIC USAGE
def fetch_url(url):
    with urllib.request.urlopen(url, timeout=5) as response:
        return url, len(response.read())

urls = [
    'https://python.org',
    'https://pypi.org',
    'https://docs.python.org',
]

# Method 1: executor.map() - ordered results
with ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(fetch_url, urls))
    # Results in same order as input

# Method 2: executor.submit() + as_completed - first finished first
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = {executor.submit(fetch_url, url): url for url in urls}

    for future in as_completed(futures):
        url = futures[future]
        try:
            result = future.result()
            print(f"{url}: {result[1]} bytes")
        except Exception as e:
            print(f"{url}: error {e}")

# INTERVIEW PATTERN: Batch processing with progress
def process_batch(items, func, max_workers=4):
    results = []
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(func, item): item for item in items}

        for i, future in enumerate(as_completed(futures)):
            item = futures[future]
            try:
                result = future.result()
                results.append((item, result))
            except Exception as e:
                results.append((item, e))

            # Progress update
            print(f"Progress: {i+1}/{len(items)}")

    return results

# TIMEOUT HANDLING
with ThreadPoolExecutor(max_workers=3) as executor:
    future = executor.submit(fetch_url, 'https://slow-site.com')
    try:
        result = future.result(timeout=5)  # Wait max 5 seconds
    except TimeoutError:
        print("Task timed out")

# MAX WORKERS GUIDELINE:
# - I/O-bound: 5-10x number of CPUs
# - Mixed: 2-4x number of CPUs
# - Default: min(32, os.cpu_count() + 4)`
  },

  {
    signature: 'queue.Queue (Thread-safe)',
    description: 'Thread-safe FIFO queue for producer-consumer patterns. Essential for communication between threads.',
    complexity: 'O(1)',
    section: 'Threading',
    example: `import queue
import threading
import time

# BASIC QUEUE OPERATIONS
q = queue.Queue()

q.put("item")          # Add item (blocks if full)
item = q.get()         # Get item (blocks if empty)
q.task_done()          # Mark task complete

q.put_nowait("item")   # Add without blocking (raises Full)
item = q.get_nowait()  # Get without blocking (raises Empty)

q.qsize()              # Approximate size
q.empty()              # True if empty
q.full()               # True if full (for bounded queues)

# BOUNDED QUEUE
bounded_q = queue.Queue(maxsize=10)  # Max 10 items

# PRODUCER-CONSUMER PATTERN
def producer(q, items):
    for item in items:
        q.put(item)
        print(f"Produced: {item}")
    q.put(None)  # Sentinel to signal done

def consumer(q):
    while True:
        item = q.get()
        if item is None:  # Sentinel received
            q.task_done()
            break
        print(f"Consumed: {item}")
        q.task_done()

q = queue.Queue()
items = list(range(10))

prod = threading.Thread(target=producer, args=(q, items))
cons = threading.Thread(target=consumer, args=(q,))

prod.start()
cons.start()

prod.join()
cons.join()

# MULTIPLE CONSUMERS
def multi_consumer(q, name):
    while True:
        item = q.get()
        if item is None:
            q.task_done()
            q.put(None)  # Pass sentinel to next consumer
            break
        print(f"{name} processing: {item}")
        time.sleep(0.1)
        q.task_done()

q = queue.Queue()
consumers = [threading.Thread(target=multi_consumer, args=(q, f"C{i}")) for i in range(3)]
for c in consumers: c.start()

for item in range(20):
    q.put(item)
q.put(None)  # Start shutdown cascade

q.join()  # Wait for all tasks to complete

# OTHER QUEUE TYPES
pq = queue.PriorityQueue()  # Lowest priority first
pq.put((1, "low"))
pq.put((0, "high"))  # (0, "high") comes out first

lifo = queue.LifoQueue()    # Stack (LIFO)
lifo.put(1); lifo.put(2)
lifo.get()  # 2 (last in, first out)`
  },
]

import type { Method } from '../../types'

// Threading + ThreadPoolExecutor + Multiprocessing
export const concurrencyThreadsMethods: Method[] = [
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

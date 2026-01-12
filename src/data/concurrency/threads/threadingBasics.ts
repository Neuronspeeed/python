import type { Method } from '../../../types'

export const threadingBasicsMethods: Method[] = [
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
]

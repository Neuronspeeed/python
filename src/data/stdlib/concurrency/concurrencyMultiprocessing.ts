import type { Method } from '../../../types'

export const concurrencyMultiprocessingMethods: Method[] = [
  {
    signature: 'multiprocessing.Process',
    description: 'Create separate processes for true parallel execution. Bypasses GIL for CPU-bound tasks.',
    complexity: 'O(1) create',
    section: 'Multiprocessing',
    example: `from multiprocessing import Process, Queue, Value, Array
import os

# BASIC PROCESS CREATION
def worker(name):
    print(f"Process {name}, PID: {os.getpid()}")
    # Heavy CPU work here
    return sum(i * i for i in range(10**6))

# Create and start process
p = Process(target=worker, args=("Worker-1",))
p.start()
p.join()  # Wait for completion

# MULTIPLE PROCESSES
processes = []
for i in range(4):
    p = Process(target=worker, args=(f"Worker-{i}",))
    processes.append(p)
    p.start()

for p in processes:
    p.join()

# GETTING RESULTS - Use Queue
def worker_with_result(q, n):
    result = sum(i * i for i in range(n))
    q.put(result)

q = Queue()
p = Process(target=worker_with_result, args=(q, 10**6))
p.start()
p.join()
result = q.get()
print(f"Result: {result}")

# SHARED MEMORY - Value and Array
# Use for simple shared state (avoid if possible)
counter = Value('i', 0)  # Shared integer
arr = Array('d', [0.0] * 10)  # Shared double array

def increment_shared(counter, arr):
    with counter.get_lock():
        counter.value += 1
    arr[0] = 3.14

p = Process(target=increment_shared, args=(counter, arr))
p.start()
p.join()
print(counter.value, arr[0])  # 1, 3.14

# INTERVIEW TIP:
# - Processes don't share memory by default (safer)
# - Use Queue for passing data between processes
# - Each process has its own Python interpreter
# - Startup cost is higher than threads`
  },

  {
    signature: 'ProcessPoolExecutor',
    description: 'High-level interface for process pools. Use for CPU-bound parallel processing.',
    complexity: 'O(1) submit',
    section: 'Multiprocessing',
    example: `from concurrent.futures import ProcessPoolExecutor, as_completed
import os

# CPU-BOUND TASK
def cpu_intensive(n):
    """Compute sum of squares"""
    return sum(i * i for i in range(n))

# BASIC USAGE - Similar API to ThreadPoolExecutor
if __name__ == '__main__':  # Required for multiprocessing on Windows
    with ProcessPoolExecutor(max_workers=4) as executor:
        # Method 1: map() for simple parallel iteration
        inputs = [10**6, 10**6, 10**6, 10**6]
        results = list(executor.map(cpu_intensive, inputs))
        print(f"Results: {results}")

        # Method 2: submit() for more control
        futures = [executor.submit(cpu_intensive, 10**6) for _ in range(4)]

        for future in as_completed(futures):
            result = future.result()
            print(f"Completed: {result}")

# CHUNKED PROCESSING FOR LARGE DATA
def process_chunk(chunk):
    return [x * 2 for x in chunk]

def parallel_process(data, chunk_size=1000, max_workers=4):
    chunks = [data[i:i+chunk_size] for i in range(0, len(data), chunk_size)]

    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        results = list(executor.map(process_chunk, chunks))

    # Flatten results
    return [item for chunk in results for item in chunk]

# INTERVIEW PATTERN: Parallel with progress
def parallel_with_progress(func, items, max_workers=4):
    results = []
    total = len(items)

    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(func, item): i for i, item in enumerate(items)}

        for completed, future in enumerate(as_completed(futures), 1):
            idx = futures[future]
            result = future.result()
            results.append((idx, result))
            print(f"Progress: {completed}/{total}")

    # Sort by original index
    results.sort(key=lambda x: x[0])
    return [r[1] for r in results]

# MAX WORKERS GUIDELINE:
# - Default: os.cpu_count() (number of CPU cores)
# - CPU-bound: os.cpu_count() is optimal
# - Memory-heavy: Reduce to avoid swapping`
  },

  {
    signature: 'Sharing data between processes',
    description: 'Techniques for inter-process communication: Queue, Pipe, Manager, shared memory.',
    complexity: 'Varies',
    section: 'Multiprocessing',
    example: `from multiprocessing import Process, Queue, Pipe, Manager, Value

# METHOD 1: Queue (recommended for most cases)
# Thread and process safe, FIFO ordering
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

q = Queue()
p1 = Process(target=producer, args=(q,))
p2 = Process(target=consumer, args=(q,))
p1.start(); p2.start()
p1.join(); p2.join()

# METHOD 2: Pipe (faster for 2 processes only)
# Two-way communication between exactly 2 processes
def sender(conn):
    conn.send("Hello from sender")
    conn.close()

def receiver(conn):
    msg = conn.recv()
    print(f"Received: {msg}")
    conn.close()

parent_conn, child_conn = Pipe()
p1 = Process(target=sender, args=(parent_conn,))
p2 = Process(target=receiver, args=(child_conn,))
p1.start(); p2.start()
p1.join(); p2.join()

# METHOD 3: Manager (shared complex objects)
# Slower but supports dicts, lists, etc.
def worker(shared_dict, shared_list, key, value):
    shared_dict[key] = value
    shared_list.append(value)

with Manager() as manager:
    d = manager.dict()
    l = manager.list()

    processes = [
        Process(target=worker, args=(d, l, f"key{i}", i))
        for i in range(5)
    ]
    for p in processes: p.start()
    for p in processes: p.join()

    print(dict(d))  # {'key0': 0, 'key1': 1, ...}
    print(list(l))  # [0, 1, 2, 3, 4]

# METHOD 4: Shared memory (fastest, limited types)
# Use Value and Array for simple shared state
counter = Value('i', 0)  # 'i' = integer

def increment(counter, n):
    for _ in range(n):
        with counter.get_lock():
            counter.value += 1

# INTERVIEW TIP:
# Queue: General purpose, safe, flexible
# Pipe: Fast 2-process communication
# Manager: Complex shared objects
# Value/Array: Fastest, primitive types only`
  },
]

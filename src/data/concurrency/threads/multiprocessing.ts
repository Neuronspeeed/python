import type { Method } from '../../../types'

export const multiprocessingMethods: Method[] = [
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

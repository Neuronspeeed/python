import type { Method } from '../../../types'

export const concurrencyPatternsMethods: Method[] = [
  {
    signature: 'Producer-Consumer Pattern',
    description: 'Classic concurrency pattern with thread-safe queue. Common Anthropic interview question.',
    complexity: 'O(1) per op',
    section: 'Interview Patterns',
    example: `import threading
import queue
import time
import random

# BASIC PRODUCER-CONSUMER
class ProducerConsumer:
    def __init__(self, num_producers=2, num_consumers=3, queue_size=10):
        self.queue = queue.Queue(maxsize=queue_size)
        self.producers = []
        self.consumers = []
        self.stop_event = threading.Event()
        self.num_producers = num_producers
        self.num_consumers = num_consumers

    def produce(self, producer_id):
        while not self.stop_event.is_set():
            item = random.randint(1, 100)
            try:
                self.queue.put(item, timeout=1)
                print(f"Producer {producer_id}: produced {item}")
            except queue.Full:
                continue
            time.sleep(random.uniform(0.1, 0.5))

    def consume(self, consumer_id):
        while not self.stop_event.is_set():
            try:
                item = self.queue.get(timeout=1)
                print(f"Consumer {consumer_id}: consumed {item}")
                self.queue.task_done()
            except queue.Empty:
                continue
            time.sleep(random.uniform(0.2, 0.6))

    def start(self):
        for i in range(self.num_producers):
            t = threading.Thread(target=self.produce, args=(i,))
            t.start()
            self.producers.append(t)

        for i in range(self.num_consumers):
            t = threading.Thread(target=self.consume, args=(i,))
            t.start()
            self.consumers.append(t)

    def stop(self):
        self.stop_event.set()
        for t in self.producers + self.consumers:
            t.join()

# Usage
pc = ProducerConsumer(num_producers=2, num_consumers=3)
pc.start()
time.sleep(5)
pc.stop()

# ASYNC VERSION
async def async_producer_consumer():
    q = asyncio.Queue(maxsize=10)

    async def producer(name):
        for i in range(5):
            await q.put(f"{name}-{i}")
            print(f"Produced: {name}-{i}")
            await asyncio.sleep(0.1)

    async def consumer(name):
        while True:
            try:
                item = await asyncio.wait_for(q.get(), timeout=1)
                print(f"{name} consumed: {item}")
                q.task_done()
            except asyncio.TimeoutError:
                break

    # Run producers and consumers
    await asyncio.gather(
        producer("P1"),
        producer("P2"),
        consumer("C1"),
        consumer("C2"),
    )`
  },

  {
    signature: 'Rate Limiter Implementation',
    description: 'Token bucket and sliding window rate limiters. Common system design and coding interview question.',
    complexity: 'O(1)',
    section: 'Interview Patterns',
    example: `import time
import threading
from collections import deque

# TOKEN BUCKET RATE LIMITER
class TokenBucket:
    """
    Allow burst up to bucket size, then rate-limit.
    Tokens regenerate at fixed rate.
    """
    def __init__(self, capacity, refill_rate):
        self.capacity = capacity      # Max tokens
        self.tokens = capacity        # Current tokens
        self.refill_rate = refill_rate  # Tokens per second
        self.last_refill = time.time()
        self.lock = threading.Lock()

    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        new_tokens = elapsed * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + new_tokens)
        self.last_refill = now

    def acquire(self, tokens=1):
        with self.lock:
            self._refill()
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

# Usage
limiter = TokenBucket(capacity=10, refill_rate=2)  # 10 burst, 2/sec
for i in range(15):
    if limiter.acquire():
        print(f"Request {i}: allowed")
    else:
        print(f"Request {i}: rate limited")
    time.sleep(0.1)

# SLIDING WINDOW RATE LIMITER
class SlidingWindowRateLimiter:
    """
    Allow N requests per window (e.g., 100 req/minute).
    More accurate than fixed window.
    """
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = deque()  # Timestamps of requests
        self.lock = threading.Lock()

    def _cleanup(self):
        now = time.time()
        cutoff = now - self.window_seconds
        while self.requests and self.requests[0] < cutoff:
            self.requests.popleft()

    def acquire(self):
        with self.lock:
            self._cleanup()
            if len(self.requests) < self.max_requests:
                self.requests.append(time.time())
                return True
            return False

# Usage: 5 requests per 10 seconds
limiter = SlidingWindowRateLimiter(max_requests=5, window_seconds=10)

# ASYNC RATE LIMITER (for aiohttp)
class AsyncRateLimiter:
    def __init__(self, rate, per_seconds):
        self.rate = rate
        self.per_seconds = per_seconds
        self.tokens = rate
        self.last_refill = time.time()
        self.lock = asyncio.Lock()

    async def acquire(self):
        async with self.lock:
            now = time.time()
            elapsed = now - self.last_refill
            self.tokens = min(self.rate, self.tokens + elapsed * (self.rate / self.per_seconds))
            self.last_refill = now

            if self.tokens >= 1:
                self.tokens -= 1
                return True
            return False

# INTERVIEW TIP:
# Token Bucket: Good for bursts, smooth rate limit
# Sliding Window: Strict limit, no bursts
# Fixed Window: Simplest, but has boundary issues`
  },
]

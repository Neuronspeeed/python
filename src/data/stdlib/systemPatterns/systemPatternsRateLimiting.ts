import type { Method } from '../../../types'

export const systemPatternsRateLimitingMethods: Method[] = [
  {
    signature: 'Token Bucket Rate Limiter',
    description: 'Allows burst traffic up to bucket capacity, then rate-limits. Common system design pattern.',
    complexity: 'O(1)',
    section: 'Rate Limiting',
    example: `import time
import threading

class TokenBucketRateLimiter:
    """
    Token bucket rate limiter.
    - Allows bursts up to capacity
    - Tokens refill at constant rate
    - Good for API rate limiting
    """

    def __init__(self, capacity: int, refill_rate: float):
        """
        Args:
            capacity: Maximum tokens (burst size)
            refill_rate: Tokens added per second
        """
        self.capacity = capacity
        self.tokens = capacity
        self.refill_rate = refill_rate
        self.last_refill = time.time()
        self.lock = threading.Lock()

    def _refill(self) -> None:
        """Add tokens based on elapsed time"""
        now = time.time()
        elapsed = now - self.last_refill
        new_tokens = elapsed * self.refill_rate
        self.tokens = min(self.capacity, self.tokens + new_tokens)
        self.last_refill = now

    def allow_request(self, tokens: int = 1) -> bool:
        """Check if request is allowed, consume tokens if yes"""
        with self.lock:
            self._refill()
            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False

    def wait_for_token(self, tokens: int = 1, timeout: float = None) -> bool:
        """Block until token available or timeout"""
        start = time.time()
        while True:
            if self.allow_request(tokens):
                return True
            if timeout and (time.time() - start) >= timeout:
                return False
            time.sleep(0.01)

# Usage
limiter = TokenBucketRateLimiter(capacity=10, refill_rate=2)

# Burst: first 10 requests pass immediately
for i in range(15):
    allowed = limiter.allow_request()
    print(f"Request {i}: {'Allowed' if allowed else 'Denied'}")
    # First 10 allowed, then rate limited

# With waiting
limiter = TokenBucketRateLimiter(capacity=5, refill_rate=1)
for i in range(10):
    limiter.wait_for_token(timeout=5)
    print(f"Request {i} processed at {time.time():.2f}")`
  },

  {
    signature: 'Sliding Window Rate Limiter',
    description: 'Fixed number of requests per time window. More predictable than token bucket.',
    complexity: 'O(1) amortized',
    section: 'Rate Limiting',
    example: `import time
import threading
from collections import deque

class SlidingWindowRateLimiter:
    """
    Sliding window rate limiter.
    - Strict limit: exactly N requests per window
    - No bursts allowed
    - Smoother than fixed window
    """

    def __init__(self, max_requests: int, window_seconds: float):
        """
        Args:
            max_requests: Max requests per window
            window_seconds: Window size in seconds
        """
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = deque()  # Timestamps
        self.lock = threading.Lock()

    def _cleanup(self) -> None:
        """Remove expired timestamps"""
        now = time.time()
        cutoff = now - self.window_seconds
        while self.requests and self.requests[0] < cutoff:
            self.requests.popleft()

    def allow_request(self) -> bool:
        """Check if request is allowed"""
        with self.lock:
            self._cleanup()
            if len(self.requests) < self.max_requests:
                self.requests.append(time.time())
                return True
            return False

    def remaining(self) -> int:
        """Requests remaining in current window"""
        with self.lock:
            self._cleanup()
            return max(0, self.max_requests - len(self.requests))

    def reset_time(self) -> float:
        """Seconds until oldest request expires"""
        with self.lock:
            self._cleanup()
            if not self.requests:
                return 0
            return max(0, self.requests[0] + self.window_seconds - time.time())

# Usage: 5 requests per 10 seconds
limiter = SlidingWindowRateLimiter(max_requests=5, window_seconds=10)

for i in range(10):
    if limiter.allow_request():
        print(f"Request {i}: Allowed ({limiter.remaining()} remaining)")
    else:
        wait = limiter.reset_time()
        print(f"Request {i}: Denied (retry in {wait:.1f}s)")
    time.sleep(0.5)

# FIXED WINDOW VARIANT (simpler but has edge issues)
class FixedWindowRateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.window_start = 0
        self.count = 0
        self.lock = threading.Lock()

    def allow_request(self) -> bool:
        with self.lock:
            now = time.time()
            window = int(now // self.window_seconds)

            if window > self.window_start:
                self.window_start = window
                self.count = 0

            if self.count < self.max_requests:
                self.count += 1
                return True
            return False`
  },
]

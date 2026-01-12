import type { Method } from '../../../types'

export const rateLimiterMethods: Method[] = [
  { signature: 'Token Bucket Rate Limiter', description: 'Allow burst traffic up to bucket size. Tokens regenerate over time.', complexity: 'O(1)', section: 'Rate Limiter', example: `import time

class TokenBucket:
    """
    Token Bucket rate limiter.
    Allows bursts up to bucket size.
    """
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity        # Max tokens
        self.tokens = capacity          # Current tokens
        self.refill_rate = refill_rate  # Tokens per second
        self.last_refill = time.time()

    def _refill(self):
        now = time.time()
        elapsed = now - self.last_refill
        self.tokens = min(
            self.capacity,
            self.tokens + elapsed * self.refill_rate
        )
        self.last_refill = now

    def consume(self, tokens: int = 1) -> bool:
        """Try to consume tokens. Returns True if allowed."""
        self._refill()
        if self.tokens >= tokens:
            self.tokens -= tokens
            return True
        return False

# Usage:
# limiter = TokenBucket(capacity=10, refill_rate=1)  # 1 token/sec
# limiter.consume()  # True (has 10 tokens)
# for _ in range(9): limiter.consume()  # True
# limiter.consume()  # False (no tokens left)
# time.sleep(5)
# limiter.consume()  # True (5 tokens refilled)` },

  { signature: 'Sliding Window Rate Limiter', description: 'Limit requests in sliding time window. More precise than fixed window.', complexity: 'O(1)', section: 'Rate Limiter', example: `import time
from collections import deque

class SlidingWindowRateLimiter:
    """
    Sliding window rate limiter.
    Limit to max_requests per window_seconds.
    """
    def __init__(self, max_requests: int, window_seconds: float):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = deque()  # Timestamps

    def is_allowed(self) -> bool:
        now = time.time()

        # Remove old requests outside window
        while self.requests and self.requests[0] < now - self.window:
            self.requests.popleft()

        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True
        return False

# Per-user rate limiting
class UserRateLimiter:
    def __init__(self, max_requests: int, window_seconds: float):
        self.max_requests = max_requests
        self.window = window_seconds
        self.user_requests = {}  # user_id -> deque of timestamps

    def is_allowed(self, user_id: str) -> bool:
        now = time.time()

        if user_id not in self.user_requests:
            self.user_requests[user_id] = deque()

        requests = self.user_requests[user_id]

        # Clean old requests
        while requests and requests[0] < now - self.window:
            requests.popleft()

        if len(requests) < self.max_requests:
            requests.append(now)
            return True
        return False` },
]

import type { Method } from '../../types'

// Iterator, Rate Limiter, Browser History, Random
export const designUtilitiesMethods: Method[] = [
  // Why & When
  { signature: 'Why design utilities?', description: 'Common design problems: iterators, rate limiters, random structures. Test understanding of protocols and system design.', complexity: 'Concept', section: 'Why & When', example: `# DESIGN UTILITIES = Practical system components
# Common: Iterator, Rate Limiter, Browser History, Random Insert/Delete

# ITERATOR PATTERN:
# Why: Python's iteration protocol (__iter__, __next__)
# When: Custom traversal logic needed
# Example: Flatten nested list lazily

# Why lazy iteration?
# Pre-flatten: all in memory at once (O(n) space)
# Lazy: one element at a time (O(1) space)

# RATE LIMITER PATTERN:
# Why: Prevent abuse, ensure fair usage
# When: APIs, login attempts, request throttling
# Approaches:
# - Sliding Window: track timestamps in deque
# - Token Bucket: refill tokens at rate
# - Fixed Window: reset count every interval

# BROWSER HISTORY PATTERN:
# Why: Undo/redo, forward/back navigation
# When: State management with history
# Implementation: Two stacks (back + forward)

# RANDOM INSERT/DELETE/GETRANDOM:
# Why: O(1) operations for all three
# When: Sampling, randomized algorithms
# Implementation: HashMap + Array
# - Array: O(1) random access by index
# - HashMap: O(1) lookup by value

# INTERVIEW PATTERNS:
# "Flatten nested iterator" → Stack-based lazy eval
# "Rate limiter" → Sliding window with deque
# "Browser history" → Two stacks
# "getRandom O(1)" → HashMap + Array combo` },

  { signature: 'Iterator protocol explained', description: 'Python iteration: __iter__ returns iterator, __next__ yields values, StopIteration signals end.', complexity: 'Concept', section: 'Why & When', example: `# PYTHON ITERATOR PROTOCOL

# Three components:
# 1. __iter__() → returns iterator object
# 2. __next__() → returns next value
# 3. StopIteration → signals exhaustion

# SIMPLE EXAMPLE:
class CountDown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # Iterator is itself

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

# Usage:
for num in CountDown(3):
    print(num)  # 3, 2, 1

# WHY __iter__ AND __next__ SEPARATE?
# - Separation of concerns
# - __iter__ can return different iterator types
# - Allows multiple simultaneous iterations

# BUILT-IN USES PROTOCOL:
# for loop calls: iter(obj) → obj.__iter__()
# Then repeatedly: next(iterator) → iterator.__next__()
# Until: StopIteration caught → loop ends

# INTERVIEW TIP:
# If asked "implement iterator":
# 1. __init__ stores state
# 2. __iter__ returns self
# 3. __next__ yields and updates state
# 4. Raise StopIteration when done

# LAZY VS EAGER:
# Lazy (generator/iterator): yield one at a time
# Eager (list): compute all upfront
# Choose lazy for large/infinite sequences` },

  // Iterator Pattern
  { signature: 'Flatten Nested List Iterator', description: 'Iterate over nested structure. Use stack for lazy traversal.', complexity: 'O(1) amortized next', section: 'Iterator', example: `class NestedIterator:
    """
    Flatten nested list: [[1,1],2,[1,1]] -> 1,1,2,1,1
    Stack-based lazy evaluation.
    """
    def __init__(self, nestedList):
        self.stack = list(reversed(nestedList))

    def next(self) -> int:
        self._flatten_top()
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        self._flatten_top()
        return len(self.stack) > 0

    def _flatten_top(self):
        # Keep flattening until top is integer
        while self.stack and not self.stack[-1].isInteger():
            nested = self.stack.pop().getList()
            self.stack.extend(reversed(nested))

# Alternative: Pre-flatten (simpler but O(n) space)
class NestedIteratorPreFlatten:
    def __init__(self, nestedList):
        self.flat = []
        self._flatten(nestedList)
        self.index = 0

    def _flatten(self, lst):
        for item in lst:
            if item.isInteger():
                self.flat.append(item.getInteger())
            else:
                self._flatten(item.getList())

    def next(self) -> int:
        result = self.flat[self.index]
        self.index += 1
        return result

    def hasNext(self) -> bool:
        return self.index < len(self.flat)` },

  { signature: 'Peeking Iterator', description: 'Iterator with peek() that shows next without consuming. Wrapper pattern.', complexity: 'O(1)', section: 'Iterator', example: `class PeekingIterator:
    """
    Wrapper that adds peek() to any iterator.
    Cache one element ahead.
    """
    def __init__(self, iterator):
        self.iterator = iterator
        self.peeked = None
        self.has_peeked = False

    def peek(self) -> int:
        if not self.has_peeked:
            self.peeked = next(self.iterator)
            self.has_peeked = True
        return self.peeked

    def next(self) -> int:
        if self.has_peeked:
            self.has_peeked = False
            return self.peeked
        return next(self.iterator)

    def hasNext(self) -> bool:
        if self.has_peeked:
            return True
        try:
            self.peeked = next(self.iterator)
            self.has_peeked = True
            return True
        except StopIteration:
            return False

# Zigzag Iterator
class ZigzagIterator:
    """
    Alternate between multiple lists.
    [1,2], [3,4,5,6] -> 1,3,2,4,5,6
    """
    def __init__(self, v1: list, v2: list):
        from collections import deque
        self.queue = deque()
        for v in [v1, v2]:
            if v:
                self.queue.append(iter(v))

    def next(self) -> int:
        it = self.queue.popleft()
        result = next(it)
        try:
            next(it)  # Check if more elements
            self.queue.append(it)
        except StopIteration:
            pass
        return result

    def hasNext(self) -> bool:
        return len(self.queue) > 0` },

  // Rate Limiter
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

  // Browser History
  { signature: 'Browser History', description: 'Support back, forward, visit. Use list with pointer or two stacks.', complexity: 'O(1)', section: 'Browser', example: `class BrowserHistory:
    """
    Browser history with back/forward navigation.
    List with current position pointer.
    """
    def __init__(self, homepage: str):
        self.history = [homepage]
        self.current = 0

    def visit(self, url: str) -> None:
        # Clear forward history
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps: int) -> str:
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps: int) -> str:
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]

# Two stacks version
class BrowserHistoryStacks:
    def __init__(self, homepage: str):
        self.back_stack = [homepage]
        self.forward_stack = []

    def visit(self, url: str) -> None:
        self.back_stack.append(url)
        self.forward_stack.clear()

    def back(self, steps: int) -> str:
        while steps > 0 and len(self.back_stack) > 1:
            self.forward_stack.append(self.back_stack.pop())
            steps -= 1
        return self.back_stack[-1]

    def forward(self, steps: int) -> str:
        while steps > 0 and self.forward_stack:
            self.back_stack.append(self.forward_stack.pop())
            steps -= 1
        return self.back_stack[-1]` },

  // Random Pick
  { signature: 'Random Pick with Weight', description: 'Pick random index with probability proportional to weight. Use prefix sums + binary search.', complexity: 'O(log n) pick', section: 'Random', example: `import random
import bisect

class Solution:
    """
    Pick random index where probability is
    proportional to weight.
    """
    def __init__(self, w: list):
        # Build prefix sum
        self.prefix = []
        total = 0
        for weight in w:
            total += weight
            self.prefix.append(total)
        self.total = total

    def pickIndex(self) -> int:
        # Random value in [1, total]
        target = random.randint(1, self.total)
        # Binary search for first prefix >= target
        return bisect.bisect_left(self.prefix, target)

# Example:
# w = [1, 3]
# prefix = [1, 4]
# total = 4
# Random 1: index 0 (1/4 probability)
# Random 2,3,4: index 1 (3/4 probability)

# Shuffle Array (Fisher-Yates)
class ShuffleArray:
    def __init__(self, nums: list):
        self.original = nums[:]
        self.array = nums

    def reset(self) -> list:
        self.array = self.original[:]
        return self.array

    def shuffle(self) -> list:
        for i in range(len(self.array) - 1, 0, -1):
            j = random.randint(0, i)
            self.array[i], self.array[j] = self.array[j], self.array[i]
        return self.array` },
]

import type { Method } from '../../../types'

export const collectionsDequeMethods: Method[] = [
  { signature: 'deque Operations', description: 'Double-ended queue with O(1) append/pop on both ends. Better than list for queues.', complexity: 'O(1) ends', section: 'deque', example: `from collections import deque

# Basic operations
dq = deque([1, 2, 3])

# O(1) operations on both ends
dq.append(4)       # [1, 2, 3, 4]
dq.appendleft(0)   # [0, 1, 2, 3, 4]
dq.pop()           # Returns 4, now [0, 1, 2, 3]
dq.popleft()       # Returns 0, now [1, 2, 3]

# extend on both ends
dq.extend([4, 5])        # [1, 2, 3, 4, 5]
dq.extendleft([0, -1])   # [-1, 0, 1, 2, 3, 4, 5] (reversed!)

# rotate
dq = deque([1, 2, 3, 4, 5])
dq.rotate(2)   # [4, 5, 1, 2, 3] (right rotation)
dq.rotate(-2)  # [1, 2, 3, 4, 5] (left rotation)

# maxlen: fixed-size buffer
recent = deque(maxlen=3)
for i in range(5):
    recent.append(i)
# deque([2, 3, 4], maxlen=3)

# INTERVIEW: Sliding window maximum
def max_sliding_window(nums, k):
    result = []
    dq = deque()  # Store indices
    for i, num in enumerate(nums):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result` },

  { signature: 'deque Additional Methods', description: 'Less common deque methods: clear, copy, count, index, remove. Know these exist but rarely needed.', complexity: 'O(n)', section: 'deque', example: `from collections import deque

dq = deque([1, 2, 3, 2, 4, 2])

# clear() - Remove all elements
dq_copy = deque(dq)
dq_copy.clear()
print(dq_copy)  # deque([])

# copy() - Shallow copy (Python 3.5+)
dq2 = dq.copy()
print(dq2)  # deque([1, 2, 3, 2, 4, 2])

# count(x) - Count occurrences of x
dq.count(2)  # 3

# index(x) - Find first occurrence (raises ValueError if not found)
dq.index(3)  # 2
# dq.index(99)  # ValueError

# index(x, start, stop) - Search in range
dq.index(2, 2)  # 3 (first 2 at or after index 2)

# remove(x) - Remove first occurrence (raises ValueError if not found)
dq.remove(2)
print(dq)  # deque([1, 3, 2, 4, 2])

# reverse() - Reverse in place
dq.reverse()
print(dq)  # deque([2, 4, 2, 3, 1])

# NOTE: insert(i, x) exists but is O(n) - avoid in performance code
# dq.insert(2, 99)  # Insert 99 at index 2` },

  { signature: 'deque maxlen (Circular Buffer)', description: 'Fixed-size deque that automatically discards old items. Perfect for "last N items" patterns.', complexity: 'O(1)', section: 'deque', example: `from collections import deque

# Create fixed-size deque
recent = deque(maxlen=3)

# Add items - oldest discarded when full
recent.append(1)
recent.append(2)
recent.append(3)
print(recent)  # deque([1, 2, 3], maxlen=3)

recent.append(4)  # 1 is discarded
print(recent)  # deque([2, 3, 4], maxlen=3)

recent.append(5)  # 2 is discarded
print(recent)  # deque([3, 4, 5], maxlen=3)

# appendleft discards from right
recent.appendleft(0)  # 5 is discarded
print(recent)  # deque([0, 3, 4], maxlen=3)

# USE CASE: Last N log entries
log = deque(maxlen=100)
for event in event_stream:
    log.append(event)
# log always contains at most 100 most recent events

# USE CASE: Moving average
def moving_average(values, n):
    window = deque(maxlen=n)
    for val in values:
        window.append(val)
        if len(window) == n:
            yield sum(window) / n

# USE CASE: Rate limiting (last N requests)
class RateLimiter:
    def __init__(self, max_requests, window_seconds):
        self.timestamps = deque(maxlen=max_requests)
        self.window = window_seconds

    def allow_request(self, now):
        # Remove old timestamps
        while self.timestamps and now - self.timestamps[0] > self.window:
            self.timestamps.popleft()
        if len(self.timestamps) < self.timestamps.maxlen:
            self.timestamps.append(now)
            return True
        return False` },

  { signature: 'deque Performance Gotchas', description: 'Know when deque is O(1) vs O(n). Random access is O(n), not O(1) like list!', complexity: 'Reference', section: 'deque', example: `from collections import deque

# DEQUE COMPLEXITY REFERENCE:
#
# Operation          Complexity   Notes
# append(x)          O(1)         Add to right
# appendleft(x)      O(1)         Add to left
# pop()              O(1)         Remove from right
# popleft()          O(1)         Remove from left
# extend(iter)       O(k)         k = len(iter)
# extendleft(iter)   O(k)         REVERSES order!
# rotate(n)          O(k)         k = min(n, len(dq))
# len(dq)            O(1)
# dq[0], dq[-1]      O(1)         Peek ends only
# dq[i]              O(n)         NOT O(1)!
# remove(x)          O(n)         Linear search
# count(x)           O(n)         Linear search
# insert(i, x)       O(n)         Avoid in loops
# clear()            O(n)
# copy()             O(n)
# in operator        O(n)         Linear search

# COMMON MISTAKE: Random access
dq = deque(range(1000000))
dq[500000]  # O(n) - walks from nearest end!

# If you need O(1) random access, use list instead
# deque is optimized for ENDS, not MIDDLE

# GOTCHA: extendleft reverses order
dq = deque([1, 2, 3])
dq.extendleft([4, 5, 6])
print(dq)  # deque([6, 5, 4, 1, 2, 3]) - reversed!

# If you want to preserve order, reverse first:
dq = deque([1, 2, 3])
dq.extendleft(reversed([4, 5, 6]))
print(dq)  # deque([4, 5, 6, 1, 2, 3])

# WHEN TO USE deque vs list:
# - Need O(1) append/pop at BOTH ends -> deque
# - Need O(1) random access -> list
# - BFS/queue operations -> deque
# - Stack operations -> list (or deque)` },
]

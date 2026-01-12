export const designPatternsIntro = `Design pattern problems test your ability to build custom data structures optimized for specific constraints. The key insight: combine basic structures (arrays, hash maps, stacks, heaps) to achieve required time complexities—O(1) operations require creative combinations. LRU cache, min stack, and rate limiters are interview favorites.

WHY DESIGN PATTERNS DOMINATE INTERVIEWS: These problems test multiple skills at once: data structure knowledge, time complexity analysis, and creative problem-solving. They're practical—real systems use LRU caches (browsers, databases), rate limiters (APIs, microservices), and custom iterators (data pipelines). Interviewers love them because they separate candidates who memorize algorithms from those who can design solutions.

**The design pattern mindset:**
- Start with requirements: What operations? What time complexity?
- Choose building blocks: Hash map for O(1) lookup, linked list for O(1) insert/delete
- Combine creatively: LRU = HashMap + Doubly Linked List
- Trade space for time: Extra memory often enables O(1) operations

LRU CACHE - THE CLASSIC INTERVIEW PROBLEM

**Problem**: Design a cache with:
- \`get(key)\`: Return value if exists, -1 otherwise—O(1)
- \`put(key, value)\`: Insert/update key—O(1)
- Capacity limit: When full, evict Least Recently Used item

**The challenge**: How to track access order AND maintain O(1) lookup?
- HashMap alone: O(1) lookup, but no ordering
- List alone: O(n) to find element
- **Solution**: Combine both!

**Approach 1: OrderedDict (Python-specific, ~20 lines)**

\`\`\`python
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)  # Mark as recently used - O(1)!
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)  # Update access order
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest (LRU) - O(1)

# Why OrderedDict works:
# - Maintains insertion order
# - move_to_end(key) moves to end (most recent) in O(1)
# - popitem(last=False) removes from front (least recent) in O(1)
# - All operations O(1) time complexity!
\`\`\`python

**Approach 2: HashMap + Doubly Linked List (Language-agnostic)**

\`\`\`python
class Node:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> Node
        # Dummy head/tail simplify edge cases
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        """Remove node from doubly linked list - O(1)"""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_to_end(self, node):
        """Add node to end (most recent) - O(1)"""
        node.prev = self.tail.prev
        node.next = self.tail
        self.tail.prev.next = node
        self.tail.prev = node

    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)  # Remove from current position
        self._add_to_end(node)  # Move to end (most recent)
        return node.val

    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self._add_to_end(node)
        self.cache[key] = node
        if len(self.cache) > self.capacity:
            lru = self.head.next  # Least recently used
            self._remove(lru)
            del self.cache[lru.key]

# Why this works:
# - HashMap: O(1) lookup by key
# - Doubly Linked List: O(1) insert/delete at known position
# - Combined: O(1) get, O(1) put with LRU tracking
\`\`\`python

LFU CACHE - FREQUENCY-BASED EVICTION

**Problem**: Like LRU, but evict Least FREQUENTLY Used. If tie, evict LRU among those with same frequency.

**Approach**: HashMap + Frequency Map + Linked Lists

\`\`\`python
from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}  # key -> (value, freq)
        self.freq_map = defaultdict(OrderedDict)  # freq -> OrderedDict of keys
        self.min_freq = 0

    def _update_freq(self, key):
        """Increment frequency and move to new freq bucket"""
        val, freq = self.cache[key]
        del self.freq_map[freq][key]
        if not self.freq_map[freq] and freq == self.min_freq:
            self.min_freq += 1
        self.cache[key] = (val, freq + 1)
        self.freq_map[freq + 1][key] = None

    def get(self, key):
        if key not in self.cache:
            return -1
        self._update_freq(key)
        return self.cache[key][0]

    def put(self, key, value):
        if self.capacity <= 0:
            return
        if key in self.cache:
            self.cache[key] = (value, self.cache[key][1])
            self._update_freq(key)
            return
        if len(self.cache) >= self.capacity:
            # Evict LFU (and LRU among ties)
            evict_key = next(iter(self.freq_map[self.min_freq]))
            del self.freq_map[self.min_freq][evict_key]
            del self.cache[evict_key]
        self.cache[key] = (value, 1)
        self.freq_map[1][key] = None
        self.min_freq = 1
\`\`\`python

MIN STACK - O(1) MIN TRACKING

**Problem**: Stack with O(1) push, pop, top, AND getMin.

**Key Insight**: Track min alongside each element.

\`\`\`python
class MinStack:
    def __init__(self):
        self.stack = []  # (value, min_so_far)

    def push(self, val):
        current_min = min(val, self.stack[-1][1]) if self.stack else val
        self.stack.append((val, current_min))

    def pop(self):
        self.stack.pop()

    def top(self):
        return self.stack[-1][0]

    def getMin(self):
        return self.stack[-1][1]

# Why it works:
# - Each element remembers the min when it was pushed
# - Pop removes both value and its min context
# - O(1) for all operations, O(n) space
\`\`\`python

IMPLEMENT QUEUE WITH STACKS

**Problem**: Queue (FIFO) using only two stacks (LIFO).

\`\`\`python
class QueueWithStacks:
    def __init__(self):
        self.in_stack = []   # For enqueue
        self.out_stack = []  # For dequeue

    def enqueue(self, x):
        self.in_stack.append(x)

    def dequeue(self):
        if not self.out_stack:
            # Transfer all from in_stack to out_stack (reverses order)
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack.pop() if self.out_stack else None

    def peek(self):
        if not self.out_stack:
            while self.in_stack:
                self.out_stack.append(self.in_stack.pop())
        return self.out_stack[-1] if self.out_stack else None

# Amortized O(1): Each element moves at most twice
# 1. Push to in_stack
# 2. Pop from in_stack, push to out_stack
# 3. Pop from out_stack
\`\`\`python

INSERT DELETE GETRANDOM O(1)

**Problem**: Data structure with O(1) insert, O(1) delete, O(1) getRandom.

**Key Insight**: Array for random access + HashMap for O(1) lookup.

\`\`\`python
import random

class RandomizedSet:
    def __init__(self):
        self.arr = []      # For O(1) random access
        self.idx = {}      # value -> index in arr

    def insert(self, val):
        if val in self.idx:
            return False
        self.idx[val] = len(self.arr)
        self.arr.append(val)
        return True

    def remove(self, val):
        if val not in self.idx:
            return False
        # Swap with last element, then pop (O(1))
        idx = self.idx[val]
        last = self.arr[-1]
        self.arr[idx] = last
        self.idx[last] = idx
        self.arr.pop()
        del self.idx[val]
        return True

    def getRandom(self):
        return random.choice(self.arr)

# Why swap-with-last works:
# - Array pop from end is O(1)
# - Swap maintains all invariants
# - HashMap gives O(1) lookup for swap
\`\`\`python

RATE LIMITER

**Problem**: Allow at most N requests per time window.

\`\`\`python
from collections import deque
import time

class RateLimiter:
    def __init__(self, max_requests, window_seconds):
        self.max_requests = max_requests
        self.window = window_seconds
        self.timestamps = deque()

    def allow_request(self):
        now = time.time()
        # Remove timestamps outside window
        while self.timestamps and now - self.timestamps[0] > self.window:
            self.timestamps.popleft()  # O(1)

        if len(self.timestamps) < self.max_requests:
            self.timestamps.append(now)
            return True
        return False

# Sliding window with deque:
# - Maintains only relevant timestamps
# - O(1) amortized per request
# - Accurate sliding window (not bucketed)
\`\`\`python

DESIGN PATTERNS CHEAT SHEET

| Pattern | Data Structures | Use Case | Time |
|---------|----------------|----------|------|
| LRU Cache | HashMap + Doubly Linked List | General caching | O(1) |
| LFU Cache | HashMap + Freq Map + Lists | Frequency-based caching | O(1) |
| Min/Max Stack | Stack + Tuples | Track extreme with stack | O(1) |
| Queue with Stacks | Two Stacks | FIFO with LIFO primitives | O(1) amortized |
| Insert/Delete/Random | HashMap + Array | Random access + fast ops | O(1) |
| Rate Limiter | Deque (timestamps) | API rate limiting | O(1) amortized |
| Median Finder | Two Heaps | Stream median | O(log n) add, O(1) find |
| Custom Iterator | State + __next__ | Flatten, peek, filter | O(1) per item |

WHEN TO USE EACH PATTERN

- **Need O(1) lookup + ordering?** HashMap + Linked List (LRU)
- **Need to track extremes (min/max)?** Tuples or separate stack
- **Need FIFO with LIFO primitives?** Two stacks (queue)
- **Need random access + fast insert/delete?** HashMap + Array
- **Need to limit rate?** Sliding window with deque
- **Need median from stream?** Two heaps (max + min)
- **Need custom iteration logic?** Iterator protocol

BEST PRACTICES FOR DESIGN INTERVIEWS

1. **Clarify requirements**: What operations? Time complexity? Space constraints?
2. **Start simple**: Naive solution first, then optimize
3. **Draw diagrams**: Visual representation helps with linked lists, heaps
4. **Explain trade-offs**: "HashMap gives O(1) lookup, but I need ordering too, so..."
5. **Code incrementally**: Implement one method at a time, test each
6. **Handle edge cases**: Empty structures, capacity limits, invalid inputs
7. **Analyze complexity**: State time/space for each operation
8. **Consider alternatives**: "Could use OrderedDict instead of manual doubly linked list"`

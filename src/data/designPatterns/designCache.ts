import type { Method } from '../../types'

// LRU Cache, LFU Cache, Time-based Expiry
export const designCacheMethods: Method[] = [
  // LRU Cache
  { signature: 'LRU Cache (OrderedDict)', description: 'Least Recently Used cache. OrderedDict implementation is cleanest Python approach.', complexity: 'O(1) get/put', section: 'LRU Cache', example: `from collections import OrderedDict

class LRUCache:
    """
    Least Recently Used cache using OrderedDict.
    Most Pythonic implementation.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            # Remove oldest (first item)
            self.cache.popitem(last=False)

# Usage:
# cache = LRUCache(2)
# cache.put(1, 1)    # cache: {1=1}
# cache.put(2, 2)    # cache: {1=1, 2=2}
# cache.get(1)       # returns 1, cache: {2=2, 1=1}
# cache.put(3, 3)    # evicts 2, cache: {1=1, 3=3}
# cache.get(2)       # returns -1 (not found)` },

  { signature: 'LRU Cache (Doubly Linked List)', description: 'Classic implementation with HashMap + Doubly Linked List. Shows understanding of data structure design.', complexity: 'O(1) get/put', section: 'LRU Cache', example: `class DLLNode:
    def __init__(self, key=0, val=0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCacheDLL:
    """
    HashMap + Doubly Linked List implementation.
    Shows deeper understanding for interviews.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail
        self.head = DLLNode()
        self.tail = DLLNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _add_to_head(self, node):
        """Add node right after head (most recent)."""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node):
        """Remove node from list."""
        node.prev.next = node.next
        node.next.prev = node.prev

    def _move_to_head(self, node):
        """Move existing node to head."""
        self._remove_node(node)
        self._add_to_head(node)

    def _pop_tail(self):
        """Remove and return the least recent node."""
        node = self.tail.prev
        self._remove_node(node)
        return node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._move_to_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.val = value
            self._move_to_head(node)
        else:
            node = DLLNode(key, value)
            self.cache[key] = node
            self._add_to_head(node)
            if len(self.cache) > self.capacity:
                tail = self._pop_tail()
                del self.cache[tail.key]` },

  // LFU Cache
  { signature: 'LFU Cache', description: 'Least Frequently Used cache. Track frequency counts with nested structure.', complexity: 'O(1) get/put', section: 'LFU Cache', example: `from collections import defaultdict, OrderedDict

class LFUCache:
    """
    Least Frequently Used cache.
    Evicts least frequent; ties broken by LRU.
    """
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.min_freq = 0
        self.key_to_val = {}           # key -> value
        self.key_to_freq = {}          # key -> frequency
        self.freq_to_keys = defaultdict(OrderedDict)  # freq -> OrderedDict of keys

    def _update_freq(self, key):
        """Increment frequency of key."""
        freq = self.key_to_freq[key]
        self.key_to_freq[key] = freq + 1

        # Remove from current frequency bucket
        del self.freq_to_keys[freq][key]
        if not self.freq_to_keys[freq]:
            del self.freq_to_keys[freq]
            if self.min_freq == freq:
                self.min_freq += 1

        # Add to new frequency bucket
        self.freq_to_keys[freq + 1][key] = None

    def get(self, key: int) -> int:
        if key not in self.key_to_val:
            return -1
        self._update_freq(key)
        return self.key_to_val[key]

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return

        if key in self.key_to_val:
            self.key_to_val[key] = value
            self._update_freq(key)
            return

        if len(self.key_to_val) >= self.capacity:
            # Evict LFU (and LRU among ties)
            evict_key, _ = self.freq_to_keys[self.min_freq].popitem(last=False)
            del self.key_to_val[evict_key]
            del self.key_to_freq[evict_key]

        # Add new key
        self.key_to_val[key] = value
        self.key_to_freq[key] = 1
        self.freq_to_keys[1][key] = None
        self.min_freq = 1` },

  // TTL Cache
  { signature: 'TTL Cache', description: 'Cache with time-based expiration. Items expire after TTL seconds.', complexity: 'O(1) average', section: 'TTL Cache', example: `import time
from collections import OrderedDict

class TTLCache:
    """
    Cache with Time-To-Live expiration.
    Items expire after ttl seconds.
    """
    def __init__(self, capacity: int, ttl: float):
        self.capacity = capacity
        self.ttl = ttl
        self.cache = OrderedDict()  # key -> (value, expiry_time)

    def _is_expired(self, key):
        if key not in self.cache:
            return True
        _, expiry = self.cache[key]
        return time.time() > expiry

    def _cleanup_expired(self):
        """Remove all expired entries."""
        now = time.time()
        expired = [k for k, (v, exp) in self.cache.items() if now > exp]
        for k in expired:
            del self.cache[k]

    def get(self, key: int):
        if key not in self.cache or self._is_expired(key):
            if key in self.cache:
                del self.cache[key]
            return None
        value, expiry = self.cache[key]
        # Refresh position (optional: refresh TTL)
        self.cache.move_to_end(key)
        return value

    def put(self, key: int, value) -> None:
        self._cleanup_expired()

        if key in self.cache:
            self.cache.move_to_end(key)

        expiry = time.time() + self.ttl
        self.cache[key] = (value, expiry)

        while len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

# Usage:
# cache = TTLCache(capacity=100, ttl=60)  # 60 second TTL
# cache.put("session_123", user_data)
# data = cache.get("session_123")  # None if expired` },

  { signature: 'Lazy TTL Cache', description: 'Only check expiration on access. More efficient for infrequent cleanup.', complexity: 'O(1) access', section: 'TTL Cache', example: `import time
from functools import lru_cache

class LazyTTLCache:
    """
    Lazy expiration - only check on access.
    More efficient when cleanup isn't critical.
    """
    def __init__(self, ttl: float = 300):
        self.ttl = ttl
        self.cache = {}  # key -> (value, timestamp)

    def get(self, key):
        if key not in self.cache:
            return None
        value, timestamp = self.cache[key]
        if time.time() - timestamp > self.ttl:
            del self.cache[key]
            return None
        return value

    def set(self, key, value):
        self.cache[key] = (value, time.time())

    def delete(self, key):
        self.cache.pop(key, None)

# Decorator version with TTL
def ttl_cache(ttl_seconds=300):
    """Decorator that adds TTL to lru_cache."""
    def decorator(func):
        @lru_cache(maxsize=128)
        def cached_with_ttl(*args, _ttl_hash=None):
            return func(*args)

        def wrapper(*args):
            # TTL hash changes every ttl_seconds
            ttl_hash = int(time.time() / ttl_seconds)
            return cached_with_ttl(*args, _ttl_hash=ttl_hash)

        wrapper.cache_clear = cached_with_ttl.cache_clear
        return wrapper
    return decorator

@ttl_cache(ttl_seconds=60)
def expensive_api_call(user_id):
    # Result cached for 60 seconds
    return fetch_user_data(user_id)` },

  // Write-Through & Write-Back
  { signature: 'Write-Through Cache', description: 'Writes go to cache AND backing store immediately. Simple but slower writes.', complexity: 'O(1) + backend', section: 'Cache Patterns', example: `class WriteThroughCache:
    """
    Write-Through: writes update cache AND backend.
    Pros: Simple, consistent
    Cons: Slower writes
    """
    def __init__(self, backend, capacity=100):
        self.cache = {}
        self.backend = backend  # Database/API
        self.capacity = capacity

    def get(self, key):
        # Try cache first
        if key in self.cache:
            return self.cache[key]

        # Cache miss: fetch from backend
        value = self.backend.get(key)
        if value is not None:
            self._add_to_cache(key, value)
        return value

    def put(self, key, value):
        # Write to backend FIRST (synchronous)
        self.backend.put(key, value)
        # Then update cache
        self._add_to_cache(key, value)

    def _add_to_cache(self, key, value):
        if len(self.cache) >= self.capacity:
            # Simple eviction: remove arbitrary key
            self.cache.pop(next(iter(self.cache)))
        self.cache[key] = value

# Usage:
# cache = WriteThroughCache(database)
# cache.put("user:123", user_data)  # Writes to DB immediately
# data = cache.get("user:123")      # Fast from cache` },

  { signature: 'Write-Back Cache', description: 'Writes only to cache, async flush to backend. Fast writes but risk of data loss.', complexity: 'O(1) write', section: 'Cache Patterns', example: `import threading
import time

class WriteBackCache:
    """
    Write-Back (Write-Behind): writes to cache only.
    Background thread flushes to backend.
    Pros: Fast writes
    Cons: Risk of data loss, complexity
    """
    def __init__(self, backend, flush_interval=5):
        self.cache = {}
        self.dirty = set()  # Keys with pending writes
        self.backend = backend
        self.lock = threading.Lock()

        # Start background flush thread
        self.running = True
        self.flush_thread = threading.Thread(target=self._flush_loop,
                                             args=(flush_interval,))
        self.flush_thread.daemon = True
        self.flush_thread.start()

    def get(self, key):
        with self.lock:
            if key in self.cache:
                return self.cache[key]
        return self.backend.get(key)

    def put(self, key, value):
        with self.lock:
            self.cache[key] = value
            self.dirty.add(key)  # Mark for later flush

    def _flush_loop(self, interval):
        while self.running:
            time.sleep(interval)
            self._flush()

    def _flush(self):
        with self.lock:
            for key in list(self.dirty):
                if key in self.cache:
                    self.backend.put(key, self.cache[key])
            self.dirty.clear()

    def close(self):
        self.running = False
        self._flush()  # Final flush

# Usage:
# cache = WriteBackCache(database, flush_interval=10)
# cache.put("key", "value")  # Fast, async write to DB` },
]

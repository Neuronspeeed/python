import type { Method } from '../../../types'

export const ttlCacheMethods: Method[] = [
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
]

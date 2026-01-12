import type { Method } from '../../../types'

export const cachePatternsMethods: Method[] = [
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

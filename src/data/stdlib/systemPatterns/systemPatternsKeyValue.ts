import type { Method } from '../../../types'

export const systemPatternsKeyValueMethods: Method[] = [
  {
    signature: 'Basic Key-Value Store',
    description: 'Simple in-memory key-value store with SET, GET, DELETE operations. Foundation for Anthropic Level 1.',
    complexity: 'O(1)',
    section: 'Key-Value Store',
    example: `class KeyValueStore:
    """
    Basic in-memory key-value store.
    Operations: SET, GET, DELETE, EXISTS
    """

    def __init__(self):
        self._store = {}

    def set(self, key: str, value: str) -> None:
        """Set key to value"""
        self._store[key] = value

    def get(self, key: str) -> str | None:
        """Get value for key, None if not exists"""
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        """Delete key, return True if existed"""
        if key in self._store:
            del self._store[key]
            return True
        return False

    def exists(self, key: str) -> bool:
        """Check if key exists"""
        return key in self._store

    def size(self) -> int:
        """Return number of keys"""
        return len(self._store)

# Usage
store = KeyValueStore()
store.set("name", "Alice")
store.set("age", "30")
print(store.get("name"))    # "Alice"
print(store.get("missing")) # None
store.delete("age")
print(store.exists("age"))  # False

# INTERVIEW TIP:
# - Return types matter (None vs empty string)
# - Consider case sensitivity
# - Think about what happens with overwrite`
  },

  {
    signature: 'Key-Value with TTL',
    description: 'Key-value store where entries expire after a time-to-live. Anthropic Level 3 pattern.',
    complexity: 'O(1)',
    section: 'Key-Value Store',
    example: `import time
from typing import Optional

class TTLKeyValueStore:
    """
    Key-value store with time-to-live (TTL).
    Entries auto-expire after TTL seconds.
    """

    def __init__(self):
        self._store = {}  # key -> value
        self._expiry = {}  # key -> expiry_timestamp

    def set(self, key: str, value: str, ttl: Optional[int] = None) -> None:
        """Set key with optional TTL in seconds"""
        self._store[key] = value
        if ttl is not None:
            self._expiry[key] = time.time() + ttl
        elif key in self._expiry:
            del self._expiry[key]  # Remove old expiry if no TTL

    def get(self, key: str) -> str | None:
        """Get value if exists and not expired"""
        if key not in self._store:
            return None

        # Check expiry
        if key in self._expiry and time.time() > self._expiry[key]:
            self._delete_expired(key)
            return None

        return self._store[key]

    def _delete_expired(self, key: str) -> None:
        """Clean up expired key"""
        if key in self._store:
            del self._store[key]
        if key in self._expiry:
            del self._expiry[key]

    def delete(self, key: str) -> bool:
        """Delete key, return True if existed"""
        existed = key in self._store
        self._delete_expired(key)
        return existed

    def cleanup_expired(self) -> int:
        """Remove all expired keys, return count"""
        now = time.time()
        expired = [k for k, exp in self._expiry.items() if now > exp]
        for key in expired:
            self._delete_expired(key)
        return len(expired)

# Usage
store = TTLKeyValueStore()
store.set("session", "abc123", ttl=5)  # Expires in 5 seconds
print(store.get("session"))  # "abc123"
time.sleep(6)
print(store.get("session"))  # None (expired)

# ANTHROPIC VARIANT: Timestamp-based (SET_AT, GET_AT)
class TimestampStore:
    def __init__(self):
        self._store = {}  # key -> (value, expiry_time or None)

    def set_at(self, key: str, value: str, timestamp: int, ttl: int = None):
        """Set at specific timestamp with optional TTL"""
        expiry = timestamp + ttl if ttl else None
        self._store[key] = (value, expiry)

    def get_at(self, key: str, timestamp: int) -> str | None:
        """Get value at specific timestamp"""
        if key not in self._store:
            return None
        value, expiry = self._store[key]
        if expiry and timestamp >= expiry:
            return None
        return value`
  },

  {
    signature: 'Key-Value with Prefix Scan',
    description: 'SCAN and SCAN_BY_PREFIX operations for key-value store. Anthropic Level 2 pattern.',
    complexity: 'O(n)',
    section: 'Key-Value Store',
    example: `class ScanKeyValueStore:
    """
    Key-value store with scan operations.
    SCAN returns all keys (sorted), SCAN_BY_PREFIX filters by prefix.
    """

    def __init__(self):
        self._store = {}

    def set(self, key: str, value: str) -> None:
        self._store[key] = value

    def get(self, key: str) -> str | None:
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        if key in self._store:
            del self._store[key]
            return True
        return False

    def scan(self) -> list[str]:
        """Return all keys sorted alphabetically"""
        return sorted(self._store.keys())

    def scan_by_prefix(self, prefix: str) -> list[str]:
        """Return keys starting with prefix, sorted"""
        return sorted(k for k in self._store.keys() if k.startswith(prefix))

    def count(self) -> int:
        """Return number of keys"""
        return len(self._store)

    def count_by_prefix(self, prefix: str) -> int:
        """Count keys with prefix"""
        return sum(1 for k in self._store if k.startswith(prefix))

# Usage
store = ScanKeyValueStore()
store.set("user:1", "Alice")
store.set("user:2", "Bob")
store.set("user:10", "Charlie")
store.set("session:abc", "data")

print(store.scan())
# ['session:abc', 'user:1', 'user:10', 'user:2']

print(store.scan_by_prefix("user:"))
# ['user:1', 'user:10', 'user:2']

# OPTIMIZED VERSION with sorted container
# For O(log n) prefix scan, use sortedcontainers
from sortedcontainers import SortedDict

class OptimizedScanStore:
    def __init__(self):
        self._store = SortedDict()

    def scan_by_prefix(self, prefix: str) -> list[str]:
        # O(log n + k) where k is result count
        result = []
        for key in self._store.irange(prefix):
            if not key.startswith(prefix):
                break
            result.append(key)
        return result`
  },
]

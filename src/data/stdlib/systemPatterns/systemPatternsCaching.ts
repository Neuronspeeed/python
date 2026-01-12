import type { Method } from '../../../types'

export const systemPatternsCachingMethods: Method[] = [
  {
    signature: 'LRU Cache from scratch',
    description: 'Least Recently Used cache with O(1) get and put. Classic interview problem (LeetCode 146).',
    complexity: 'O(1)',
    section: 'Caching',
    example: `class Node:
    """Doubly linked list node"""
    def __init__(self, key: int = 0, val: int = 0):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None

class LRUCache:
    """
    LRU Cache with O(1) get and put.
    Uses HashMap + Doubly Linked List.
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}  # key -> Node

        # Dummy head and tail
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node: Node) -> None:
        """Remove node from linked list"""
        prev, next = node.prev, node.next
        prev.next = next
        next.prev = prev

    def _add_to_front(self, node: Node) -> None:
        """Add node right after head (most recent)"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        """Get value and mark as recently used"""
        if key not in self.cache:
            return -1

        node = self.cache[key]
        self._remove(node)
        self._add_to_front(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        """Insert or update key"""
        if key in self.cache:
            # Update existing
            node = self.cache[key]
            node.val = value
            self._remove(node)
            self._add_to_front(node)
        else:
            # Add new
            if len(self.cache) >= self.capacity:
                # Evict LRU (node before tail)
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]

            node = Node(key, value)
            self.cache[key] = node
            self._add_to_front(node)

# Usage
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))   # 1 (marks 1 as recent)
cache.put(3, 3)       # Evicts key 2
print(cache.get(2))   # -1 (not found)
cache.put(4, 4)       # Evicts key 1
print(cache.get(1))   # -1
print(cache.get(3))   # 3
print(cache.get(4))   # 4`
  },

  {
    signature: 'LRU Cache with OrderedDict',
    description: 'Simplified LRU Cache using collections.OrderedDict. Practical Python solution.',
    complexity: 'O(1)',
    section: 'Caching',
    example: `from collections import OrderedDict

class LRUCache:
    """
    LRU Cache using OrderedDict.
    OrderedDict maintains insertion order and supports move_to_end.
    """

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        # Move to end (most recent)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Update and move to end
            self.cache.move_to_end(key)
        self.cache[key] = value

        if len(self.cache) > self.capacity:
            # Remove first (least recent)
            self.cache.popitem(last=False)

# Usage
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
print(cache.get(1))   # 1
cache.put(3, 3)       # Evicts 2
print(cache.get(2))   # -1

# LFU CACHE VARIANT (Least Frequently Used)
from collections import defaultdict

class LFUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}          # key -> value
        self.freq = {}           # key -> frequency
        self.freq_keys = defaultdict(OrderedDict)  # freq -> {keys}
        self.min_freq = 0

    def _update_freq(self, key: int) -> None:
        f = self.freq[key]
        self.freq[key] = f + 1
        del self.freq_keys[f][key]

        if not self.freq_keys[f]:
            del self.freq_keys[f]
            if self.min_freq == f:
                self.min_freq += 1

        self.freq_keys[f + 1][key] = None

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self._update_freq(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if self.capacity <= 0:
            return

        if key in self.cache:
            self.cache[key] = value
            self._update_freq(key)
            return

        if len(self.cache) >= self.capacity:
            # Evict LFU (least frequency, then LRU)
            evict_key = next(iter(self.freq_keys[self.min_freq]))
            del self.freq_keys[self.min_freq][evict_key]
            del self.cache[evict_key]
            del self.freq[evict_key]

        self.cache[key] = value
        self.freq[key] = 1
        self.freq_keys[1][key] = None
        self.min_freq = 1`
  },
]

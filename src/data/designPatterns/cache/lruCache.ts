import type { Method } from '../../../types'

export const lruCacheMethods: Method[] = [
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
]

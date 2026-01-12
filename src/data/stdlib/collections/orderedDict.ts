import type { Method } from '../../../types'

export const collectionsOrderedDictMethods: Method[] = [
  { signature: 'OrderedDict', description: 'Dict that remembers insertion order. Essential for LRU cache implementation.', complexity: 'O(1)', section: 'OrderedDict', example: `from collections import OrderedDict

# Maintains insertion order (dict does too in 3.7+)
od = OrderedDict()
od['a'] = 1
od['b'] = 2
od['c'] = 3

# move_to_end: reorder element
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'c', 'a']

od.move_to_end('c', last=False)  # Move 'c' to beginning
print(list(od.keys()))  # ['c', 'b', 'a']

# popitem: remove from end or beginning
od.popitem()           # Removes 'a' (last)
od.popitem(last=False) # Removes 'c' (first)

# INTERVIEW: LRU Cache with OrderedDict
class LRUCache:
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
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)  # Remove oldest` },
]

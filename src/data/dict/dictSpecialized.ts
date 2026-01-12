import type { Method } from '../../types'

export const dictSpecializedMethods: Method[] = [
  { section: 'Specialized Dicts', signature: 'defaultdict(default_factory)', description: 'Dict subclass that provides default values for missing keys.', complexity: 'O(1)', example: `from collections import defaultdict

# Default to 0
counts = defaultdict(int)
for char in "hello":
    counts[char] += 1
print(dict(counts))  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Default to empty list
groups = defaultdict(list)
groups['a'].append(1)  # No KeyError!
print(dict(groups))  # {'a': [1]}` },
  { section: 'Specialized Dicts', signature: 'Counter(iterable)', description: 'Dict subclass for counting hashable objects.', complexity: 'O(n)', example: `from collections import Counter

c = Counter("abracadabra")
print(c)  # Counter({'a': 5, 'b': 2, 'r': 2, 'c': 1, 'd': 1})
print(c['a'])           # 5
print(c['z'])           # 0 (not KeyError!)
print(c.most_common(2)) # [('a', 5), ('b', 2)]` },
  { section: 'Specialized Dicts', signature: 'OrderedDict()', description: 'Dict that remembers insertion order. (Regular dicts preserve order since 3.7)', complexity: 'O(1)', example: `from collections import OrderedDict

od = OrderedDict()
od['a'] = 1
od['b'] = 2
od.move_to_end('a')  # Move 'a' to end
print(list(od.keys()))  # ['b', 'a']

# popitem(last=False) pops first item
print(od.popitem(last=False))  # ('b', 2)` },
]

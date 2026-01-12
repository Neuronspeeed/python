import type { Method } from '../../types'

export const dictRemovalMethods: Method[] = [
  { section: 'Removal', signature: 'dict.pop(key[, default])', description: 'Removes key and returns its value. Returns default if not found (or raises KeyError).', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(d.pop('b'))      # 2
print(d)               # {'a': 1, 'c': 3}
print(d.pop('z', 99))  # 99 (default)
# d.pop('z')  # KeyError` },
  { section: 'Removal', signature: 'dict.popitem()', description: 'Removes and returns an arbitrary (last inserted in 3.7+) key-value pair. Raises KeyError if empty.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(d.popitem())  # ('c', 3) in Python 3.7+
print(d)            # {'a': 1, 'b': 2}` },
  { section: 'Removal', signature: 'del dict[key]', description: 'Deletes key-value pair. Raises KeyError if key not found.', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2}
del d['a']
print(d)  # {'b': 2}
# del d['z']  # KeyError` },
  { section: 'Removal', signature: 'dict.clear()', description: 'Removes all items from the dictionary.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d.clear()
print(d)  # {}` },
]

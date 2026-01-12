import type { Method } from '../../types'

export const dictViewsMethods: Method[] = [
  { section: 'Views', signature: 'dict.keys()', description: 'Returns a view of the dictionary\'s keys.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
keys = d.keys()
print(keys)        # dict_keys(['a', 'b', 'c'])
print(list(keys))  # ['a', 'b', 'c']
print('a' in keys) # True (O(1) membership)

# View is dynamic
d['d'] = 4
print(keys)  # dict_keys(['a', 'b', 'c', 'd'])` },
  { section: 'Views', signature: 'dict.values()', description: 'Returns a view of the dictionary\'s values.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
values = d.values()
print(values)        # dict_values([1, 2, 3])
print(list(values))  # [1, 2, 3]` },
  { section: 'Views', signature: 'dict.items()', description: 'Returns a view of key-value pairs as tuples.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2}
items = d.items()
print(items)       # dict_items([('a', 1), ('b', 2)])
print(list(items)) # [('a', 1), ('b', 2)]

# Iteration
for key, value in d.items():
    print(f"{key}: {value}")` },
]

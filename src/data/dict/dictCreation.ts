import type { Method } from '../../types'

export const dictCreationMethods: Method[] = [
  { section: 'Creation', signature: 'dict()', description: 'Creates an empty dictionary or converts mappings/iterables to dict.', complexity: 'O(n)', example: `print(dict())                    # {}
print(dict(a=1, b=2))            # {'a': 1, 'b': 2}
print(dict([('a', 1), ('b', 2)])) # {'a': 1, 'b': 2}
print(dict(zip(['a','b'], [1,2]))) # {'a': 1, 'b': 2}` },
  { section: 'Creation', signature: '{key: value}', description: 'Dictionary literal syntax. Keys must be hashable.', complexity: 'O(n)', example: `d = {'name': 'Alice', 'age': 30}
d = {1: 'one', 2: 'two'}
d = {}  # Empty dict` },
  { section: 'Creation', signature: '{k: v for ...}', description: 'Dictionary comprehension. Creates dict from expression.', complexity: 'O(n)', example: `squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# With condition
even_sq = {x: x**2 for x in range(10) if x % 2 == 0}
print(even_sq)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}` },
  { section: 'Creation', signature: 'dict.fromkeys(keys[, value])', description: 'Creates dict with keys from iterable, all set to value (default None).', complexity: 'O(n)', example: `keys = ['a', 'b', 'c']
d = dict.fromkeys(keys)
print(d)  # {'a': None, 'b': None, 'c': None}

d = dict.fromkeys(keys, 0)
print(d)  # {'a': 0, 'b': 0, 'c': 0}

# Warning: mutable default is shared!
d = dict.fromkeys(keys, [])
d['a'].append(1)
print(d)  # {'a': [1], 'b': [1], 'c': [1]} (all same list!)` },
]

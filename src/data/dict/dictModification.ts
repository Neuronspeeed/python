import type { Method } from '../../types'

export const dictModificationMethods: Method[] = [
  { section: 'Modification', signature: 'dict[key] = value', description: 'Sets value for key. Adds key if not present.', complexity: 'O(1) avg', example: `d = {'a': 1}
d['a'] = 99    # Update existing
d['b'] = 2     # Add new
print(d)  # {'a': 99, 'b': 2}` },
  { section: 'Modification', signature: 'dict.update([other])', description: 'Updates dict with key-value pairs from other dict or iterable.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d.update({'b': 99, 'c': 3})
print(d)  # {'a': 1, 'b': 99, 'c': 3}

d.update(d=4, e=5)  # Keyword args
print(d)  # {'a': 1, 'b': 99, 'c': 3, 'd': 4, 'e': 5}

d.update([('f', 6)])  # From iterable of pairs
print(d)` },
  { section: 'Modification', signature: 'dict | other (Python 3.9+)', description: 'Merge operator. Returns new dict with combined items.', complexity: 'O(n+m)', example: `d1 = {'a': 1, 'b': 2}
d2 = {'b': 99, 'c': 3}
merged = d1 | d2
print(merged)  # {'a': 1, 'b': 99, 'c': 3}
print(d1)      # {'a': 1, 'b': 2} (unchanged)` },
  { section: 'Modification', signature: 'dict |= other (Python 3.9+)', description: 'Update operator. Updates dict in place.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
d |= {'b': 99, 'c': 3}
print(d)  # {'a': 1, 'b': 99, 'c': 3}` },
]

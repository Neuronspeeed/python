import type { Method } from '../../types'

export const dictPatternsMethods: Method[] = [
  { section: 'Common Patterns', signature: 'Invert dictionary', description: 'Swap keys and values. Values must be hashable.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in d.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}` },
  { section: 'Common Patterns', signature: 'Merge with defaults', description: 'Use ChainMap or unpacking to provide default values.', complexity: 'O(n)', example: `defaults = {'color': 'red', 'size': 'medium'}
user_prefs = {'color': 'blue'}

# Method 1: Unpacking (Python 3.5+)
config = {**defaults, **user_prefs}
print(config)  # {'color': 'blue', 'size': 'medium'}

# Method 2: ChainMap (looks up in order)
from collections import ChainMap
config = ChainMap(user_prefs, defaults)
print(config['color'])  # 'blue'
print(config['size'])   # 'medium'` },
  { section: 'Common Patterns', signature: 'Group by key', description: 'Group items by a computed key.', complexity: 'O(n)', example: `from collections import defaultdict

words = ['apple', 'banana', 'apricot', 'blueberry']
by_first_letter = defaultdict(list)
for word in words:
    by_first_letter[word[0]].append(word)
print(dict(by_first_letter))
# {'a': ['apple', 'apricot'], 'b': ['banana', 'blueberry']}` },
]

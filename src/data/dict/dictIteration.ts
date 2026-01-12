import type { Method } from '../../types'

export const dictIterationMethods: Method[] = [
  { section: 'Iteration', signature: 'for key in dict', description: 'Iterates over keys (default iteration).', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
for key in d:
    print(key, d[key])  # a 1, b 2` },
  { section: 'Iteration', signature: 'for k, v in dict.items()', description: 'Iterates over key-value pairs. Most common pattern.', complexity: 'O(n)', example: `d = {'a': 1, 'b': 2}
for key, value in d.items():
    print(f"{key} = {value}")` },
]

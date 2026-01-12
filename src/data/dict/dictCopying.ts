import type { Method } from '../../types'

export const dictCopyingMethods: Method[] = [
  { section: 'Copying', signature: 'dict.copy()', description: 'Returns a shallow copy of the dictionary.', complexity: 'O(n)', example: `d = {'a': 1, 'b': [2, 3]}
copy = d.copy()
copy['a'] = 99
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged)

copy['b'].append(4)  # Nested object shared!
print(d)     # {'a': 1, 'b': [2, 3, 4]}` },
  { section: 'Copying', signature: 'copy.deepcopy(dict)', description: 'Creates a deep copy. Nested objects are also copied.', complexity: 'O(n)', example: `import copy
d = {'a': 1, 'b': [2, 3]}
deep = copy.deepcopy(d)
deep['b'].append(4)
print(d)     # {'a': 1, 'b': [2, 3]} (unchanged!)
print(deep)  # {'a': 1, 'b': [2, 3, 4]}` },
]

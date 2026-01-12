import type { Method } from '../../types'

export const dictMembershipMethods: Method[] = [
  { section: 'Membership & Length', signature: 'key in dict', description: 'Returns True if key is in the dictionary.', complexity: 'O(1) avg', example: `d = {'a': 1, 'b': 2}
print('a' in d)      # True
print('z' in d)      # False
print('z' not in d)  # True` },
  { section: 'Membership & Length', signature: 'len(dict)', description: 'Returns the number of key-value pairs.', complexity: 'O(1)', example: `d = {'a': 1, 'b': 2, 'c': 3}
print(len(d))  # 3` },
]

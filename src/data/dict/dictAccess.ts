import type { Method } from '../../types'

export const dictAccessMethods: Method[] = [
  { section: 'Access', signature: 'dict[key]', description: 'Returns value for key. Raises KeyError if key not found.', complexity: 'O(1) avg', example: `d = {'name': 'Alice', 'age': 30}
print(d['name'])  # 'Alice'
# print(d['job'])  # KeyError: 'job'` },
  { section: 'Access', signature: 'dict.get(key[, default])', description: 'Returns value for key, or default (None) if not found. Never raises KeyError.', complexity: 'O(1) avg', example: `d = {'name': 'Alice', 'age': 30}
print(d.get('name'))       # 'Alice'
print(d.get('job'))        # None
print(d.get('job', 'N/A')) # 'N/A'` },
  { section: 'Access', signature: 'dict.setdefault(key[, default])', description: 'Returns value if key exists; otherwise inserts key with default and returns it.', complexity: 'O(1) avg', example: `d = {'a': 1}
print(d.setdefault('a', 99))  # 1 (existing)
print(d.setdefault('b', 2))   # 2 (inserted)
print(d)  # {'a': 1, 'b': 2}

# Useful for grouping
groups = {}
for item in ['apple', 'banana', 'apricot']:
    groups.setdefault(item[0], []).append(item)
print(groups)  # {'a': ['apple', 'apricot'], 'b': ['banana']}` },
]

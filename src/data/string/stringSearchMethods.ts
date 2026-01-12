import type { Method } from '../../types'

export const stringSearchMethods: Method[] = [
  { section: 'Search Methods', signature: 'str.find(sub[, start[, end]])', description: 'Returns lowest index of substring. Returns -1 if not found.', complexity: 'O(n*m)', example: `s = "hello world"\nprint(s.find("world"))  # 6\nprint(s.find("xyz"))  # -1` },
  { section: 'Search Methods', signature: 'str.rfind(sub[, start[, end]])', description: 'Returns highest index of substring. Returns -1 if not found.', complexity: 'O(n*m)', example: `s = "hello world"\nprint(s.rfind("o"))  # 7` },
  { section: 'Search Methods', signature: 'str.index(sub[, start[, end]])', description: 'Like find() but raises ValueError if not found.', complexity: 'O(n*m)', example: `s = "hello"\nprint(s.index("l"))  # 2` },
  { section: 'Search Methods', signature: 'str.rindex(sub[, start[, end]])', description: 'Like rfind() but raises ValueError if not found.', complexity: 'O(n*m)', example: `s = "hello"
print(s.rindex("l"))  # 3 (last 'l')
# s.rindex("z")       # ValueError` },
  { section: 'Search Methods', signature: 'str.count(sub[, start[, end]])', description: 'Returns number of non-overlapping occurrences of substring.', complexity: 'O(n*m)', example: `s = "hello"\nprint(s.count("l"))  # 2` },
  { section: 'Search Methods', signature: 'str.startswith(prefix[, start[, end]])', description: 'Returns True if string starts with prefix.', complexity: 'O(k)', example: `s = "hello"\nprint(s.startswith("he"))  # True` },
  { section: 'Search Methods', signature: 'str.endswith(suffix[, start[, end]])', description: 'Returns True if string ends with suffix.', complexity: 'O(k)', example: `s = "hello.py"\nprint(s.endswith(".py"))  # True` },
]

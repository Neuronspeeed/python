import type { Method } from '../../../types'

export const itertoolsGroupingMethods: Method[] = [
  { signature: 'groupby()', description: 'Group consecutive elements by key. Data MUST be sorted by the same key first!', complexity: 'O(n)', section: 'Grouping', example: `from itertools import groupby

# Group consecutive identical elements
data = [1, 1, 2, 2, 2, 3, 1, 1]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1]
# 2 [2, 2, 2]
# 3 [3]
# 1 [1, 1]  # Note: not merged with first 1s!

# MUST SORT FIRST for logical grouping
data = [1, 1, 2, 2, 2, 3, 1, 1]
data.sort()  # [1, 1, 1, 1, 2, 2, 2, 3]
for key, group in groupby(data):
    print(key, list(group))
# 1 [1, 1, 1, 1]
# 2 [2, 2, 2]
# 3 [3]

# Group by key function
words = ['apple', 'ant', 'banana', 'bee', 'cherry']
words.sort(key=lambda x: x[0])  # Sort by first letter first!
for letter, group in groupby(words, key=lambda x: x[0]):
    print(letter, list(group))
# a ['apple', 'ant']
# b ['banana', 'bee']
# c ['cherry']

# INTERVIEW: Compress string
def compress(s):
    """Compress "aaabbc" -> "a3b2c1" """
    return ''.join(f"{c}{len(list(g))}" for c, g in groupby(s))

print(compress("aaabbcc"))  # "a3b2c2"` },
]

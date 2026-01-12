import type { Method } from '../../../types'

export const itertoolsChainingMethods: Method[] = [
  { signature: 'chain()', description: 'Flatten one level of nesting. Iterate over multiple iterables as one.', complexity: 'O(n)', section: 'Chaining', example: `from itertools import chain

# Chain multiple iterables
a = [1, 2, 3]
b = [4, 5]
c = [6, 7, 8, 9]

combined = list(chain(a, b, c))
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# More efficient than a + b + c (no intermediate lists)

# Chain string iterables
words = chain("hello", "world")
print(list(words))  # ['h','e','l','l','o','w','o','r','l','d']

# Flatten list of lists
nested = [[1, 2], [3, 4, 5], [6]]
flat = list(chain.from_iterable(nested))
# [1, 2, 3, 4, 5, 6]

# INTERVIEW: Flatten nested lists
def flatten(nested):
    return list(chain.from_iterable(nested))

# Practical: Merge sorted iterators
import heapq
def merge_sorted(*iterables):
    return heapq.merge(*iterables)
    # Or: sorted(chain(*iterables))

# Combine generators
def gen1():
    yield 1
    yield 2

def gen2():
    yield 3
    yield 4

for x in chain(gen1(), gen2()):
    print(x)  # 1, 2, 3, 4` },
]

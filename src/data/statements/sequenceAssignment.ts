import type { Method } from '../../types'

export const sequenceAssignment: Method[] = [
  {
    section: 'Sequence Assignment',
    signature: 'a, b = iterable',
    description: 'Tuple unpacking assigns elements by position. Left side can be tuple or list of targets.',
    complexity: 'Concept',
    example: `# Basic unpacking
a, b = 1, 2         # a=1, b=2
x, y = [10, 20]     # works with lists too
first, second = "AB"  # works with strings

# Nested unpacking
(a, b), c = [1, 2], 3  # a=1, b=2, c=3`,
  },
  {
    section: 'Sequence Assignment',
    signature: 'a, b = b, a',
    description: 'Swap values without a temporary variable. Right side evaluated before assignment.',
    complexity: 'Concept',
    example: `a, b = 1, 2
a, b = b, a     # swap: a=2, b=1

# Works with any number of values
x, y, z = z, x, y  # rotate values

# Common in algorithms
arr[i], arr[j] = arr[j], arr[i]  # swap elements`,
  },
  {
    section: 'Sequence Assignment',
    signature: '*name (Extended Unpacking)',
    description: 'Starred target collects remaining items into a list. Only one starred name allowed per assignment.',
    complexity: 'Concept',
    example: `# Collect remaining items
first, *rest = [1, 2, 3, 4]
# first=1, rest=[2, 3, 4]

*head, last = [1, 2, 3, 4]
# head=[1, 2, 3], last=4

first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

# Starred always produces list (even if empty)
a, *b = [1]  # a=1, b=[]`,
  },
]

import type { Method } from '../../types'

export const dirFunctionMethods: Method[] = [
  {
    section: 'dir Function',
    signature: 'dir(object)',
    description: 'Lists all attribute names of an object. A "memory jogger" showing available methods without descriptions.',
    complexity: 'O(n)',
    example: `# List string methods
dir(str)
# ['__add__', ..., 'capitalize', 'center', ...]

# List methods on instance
dir("hello")
dir([1, 2, 3])

# List module attributes
import math
dir(math)  # ['cos', 'sin', 'sqrt', ...]`,
  },
  {
    section: 'dir Function',
    signature: 'Filter dir() output',
    description: 'Use list comprehension to filter out dunder methods (__x__) and show only public attributes.',
    complexity: 'O(n)',
    example: `# Show only public methods (no dunders)
[m for m in dir(str) if not m.startswith('_')]
# ['capitalize', 'casefold', 'center', ...]

# Show only methods (callable)
[m for m in dir(str)
 if not m.startswith('_') and callable(getattr(str, m))]

# Find methods containing 'split'
[m for m in dir(str) if 'split' in m]
# ['rsplit', 'split', 'splitlines']`,
  },
]

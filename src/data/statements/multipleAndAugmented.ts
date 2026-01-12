import type { Method } from '../../types'

export const multipleAndAugmented: Method[] = [
  {
    section: 'Multiple & Augmented',
    signature: 'a = b = c = value',
    description: 'Multiple-target assignment. All names reference the same object. Safe for immutables, risky for mutables.',
    complexity: 'Concept',
    example: `# Safe with immutables
a = b = c = 0
a = 1         # only 'a' changes
print(b, c)   # 0 0

# Risky with mutables!
a = b = []    # same list object
a.append(1)
print(b)      # [1] — b changed too!

# Use separate assignments for mutables
a, b = [], []  # different list objects`,
  },
  {
    section: 'Multiple & Augmented',
    signature: 'x += y (Augmented)',
    description: 'Augmented assignment combines operation with assignment. More efficient—evaluates left side once, may update in-place.',
    complexity: 'Concept',
    example: `# Numeric augmented ops
x = 10
x += 5    # x = x + 5 → 15
x -= 3    # x = x - 3 → 12
x *= 2    # x = x * 2 → 24
x //= 5   # x = x // 5 → 4
x **= 2   # x = x ** 2 → 16

# All augmented operators:
# += -= *= /= //= %= **= &= |= ^= >>= <<=`,
  },
  {
    section: 'Multiple & Augmented',
    signature: 'list += vs list = list +',
    description: 'For mutables, += modifies in-place (extends). Regular + creates new object. Important distinction!',
    complexity: 'Concept',
    example: `# += extends in-place
L = [1, 2]
M = L          # same object
L += [3, 4]    # extends L in-place
print(M)       # [1, 2, 3, 4] — M changed!

# + creates new object
L = [1, 2]
M = L
L = L + [3, 4]  # creates new list
print(M)        # [1, 2] — M unchanged`,
  },
]

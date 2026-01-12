import type { Method } from '../../types'

export const mutabilityMethods: Method[] = [
  {
    section: 'Mutability',
    signature: 'Immutable Objects',
    description: 'Cannot be changed after creation. Includes: int, float, str, tuple, frozenset, bytes. Safe as dict keys.',
    complexity: 'Concept',
    example: `s = "hello"
s[0] = "H"    # TypeError: strings are immutable
s = "Hello"   # OK: creates NEW string, rebinds s

t = (1, 2, 3)
t[0] = 99     # TypeError: tuples are immutable

# Immutable = hashable = can be dict key
d = {(1, 2): "point"}  # OK`,
  },
  {
    section: 'Mutability',
    signature: 'Mutable Objects',
    description: 'Can be modified in place. Includes: list, dict, set, bytearray. Changes affect all references.',
    complexity: 'Concept',
    example: `a = [1, 2, 3]
b = a           # b references same object
a.append(4)
print(b)        # [1, 2, 3, 4] — b changed too!

# Mutable = not hashable = can't be dict key
d = {[1, 2]: "x"}  # TypeError: unhashable type`,
  },
]

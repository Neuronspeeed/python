import type { Method } from '../../types'

export const typeCategoriesMethods: Method[] = [
  {
    section: 'Type Categories',
    signature: 'Numbers',
    description: 'int (unlimited precision), float (64-bit), complex, Decimal (exact), Fraction. Support +, -, *, /, //, %, **.',
    complexity: 'Concept',
    example: `42                    # int
3.14                  # float
2 + 3j                # complex
10 ** 100             # big int (no overflow!)
from decimal import Decimal
Decimal('0.1') + Decimal('0.2')  # 0.3 (exact)`,
  },
  {
    section: 'Type Categories',
    signature: 'Sequences',
    description: 'Ordered collections with positional access. str, list, tuple support indexing [i], slicing [i:j], len(), iteration.',
    complexity: 'Concept',
    example: `# All sequences support:
s = "hello"
s[0]       # 'h' (indexing)
s[1:4]     # 'ell' (slicing)
len(s)     # 5
's' in s   # False (membership)
for c in s: print(c)  # iteration`,
  },
  {
    section: 'Type Categories',
    signature: 'Mappings',
    description: 'Key-value stores with O(1) lookup. dict is the only built-in mapping. Keys must be hashable (immutable).',
    complexity: 'Concept',
    example: `d = {"name": "Alice", "age": 30}
d["name"]          # "Alice" (O(1) lookup)
d["city"] = "NYC"  # add/update
"age" in d         # True (O(1) membership)
d.keys()           # dict_keys(['name', 'age', 'city'])`,
  },
  {
    section: 'Type Categories',
    signature: 'Sets',
    description: 'Unordered collections of unique hashable items. O(1) membership test. Support union |, intersection &, difference -.',
    complexity: 'Concept',
    example: `s = {1, 2, 3, 2, 1}  # {1, 2, 3} (deduped)
3 in s               # True (O(1))
{1, 2} | {2, 3}      # {1, 2, 3} (union)
{1, 2} & {2, 3}      # {2} (intersection)
{1, 2} - {2, 3}      # {1} (difference)`,
  },
]

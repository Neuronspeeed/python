import type { Method } from '../../types'

export const whyWhenMethods: Method[] = [
  {
    section: 'Why & When',
    signature: 'Choosing Numeric Types',
    description: 'int for exact counting, float for measurements, Decimal for money/precision, Fraction for exact ratios.',
    complexity: 'Concept',
    example: `# INT - counting, indexing, exact arithmetic
count = 42
index = arr[5]
factorial = 120  # no overflow, unlimited precision

# FLOAT - measurements, scientific, performance
pi = 3.14159
temperature = 98.6
large_dataset = [x * 1.5 for x in range(1000000)]  # fast

# DECIMAL - money, legal precision
from decimal import Decimal
price = Decimal('19.99')
tax = Decimal('0.08')
total = price * (1 + tax)  # exact: 21.5892

# FRACTION - exact ratios, math proofs
from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)

# RULE: int/float by default, Decimal/Fraction when precision matters`,
  },
  {
    section: 'Why & When',
    signature: 'Choosing Sequence Types',
    description: 'list: mutable collection. tuple: immutable collection or dict key. str: text only.',
    complexity: 'Concept',
    example: `# LIST - mutable, dynamic collection
tasks = ["email", "code", "review"]
tasks.append("deploy")  # can modify
tasks.sort()            # in-place operations

# TUPLE - immutable, dict keys, function returns
point = (10, 20)        # can't change
d = {point: "start"}    # hashable = dict key
x, y = point            # unpacking

# Why tuple over list?
# 1. Communicate intent (shouldn't change)
# 2. Use as dict key
# 3. Slightly faster, less memory
# 4. Protection from bugs

# STRING - text only
name = "Alice"          # immutable like tuple
# Use str.split()/join() to convert to/from list`,
  },
  {
    section: 'Why & When',
    signature: 'dict vs set vs list',
    description: 'dict: key-value mapping (O(1) lookup). set: unique items (O(1) membership). list: ordered sequence.',
    complexity: 'Concept',
    example: `# DICT - mapping, caching, counting
user = {"name": "Alice", "age": 30}  # key-value
cache = {"/home": "<html>"}          # O(1) lookup
counts = {}                          # frequency map

# SET - uniqueness, membership testing
seen = set()              # track unique items
if x not in seen:         # O(1) check (not O(n)!)
    seen.add(x)

allowed = {1, 2, 3}       # whitelist
if user_id in allowed:    # O(1) (not list scan!)

# LIST - ordering matters, duplicates OK
tasks = ["a", "b", "a"]   # order + dupes
scores = [95, 87, 95]     # keep all values

# RULE: dict for mapping, set for membership, list for ordering`,
  },
  {
    section: 'Why & When',
    signature: 'When Mutability Matters',
    description: 'Use immutable for dict keys, function defaults, shared state. Mutable for in-place modification.',
    complexity: 'Concept',
    example: `# NEED IMMUTABLE (dict key)
point = (10, 20)
cache = {point: "value"}  # OK

point = [10, 20]
cache = {point: "value"}  # TypeError!

# NEED IMMUTABLE (function default)
def process(data=None):   # OK: None is immutable
    data = data or []

def process(data=[]):     # BUG: default is shared!
    data.append(1)        # all calls share same list!

# NEED MUTABLE (in-place modification)
scores = [95, 87, 92]
scores.sort()             # in-place (list only)
scores.append(88)         # modify (list only)

# IMMUTABLE FOR SAFETY
config = ("localhost", 8080)  # can't accidentally change
`,
  },
  {
    section: 'Why & When',
    signature: 'Shared References',
    description: 'Multiple variables can reference same object. Mutable changes affect all refs. Copy to avoid.',
    complexity: 'Concept',
    example: `# IMMUTABLE - safe sharing
x = 42
y = x        # both point to same 42
x += 1       # creates NEW 43, rebinds x
print(y)     # 42 (unchanged)

# MUTABLE - shared changes!
a = [1, 2, 3]
b = a        # both point to SAME list
a.append(4)
print(b)     # [1, 2, 3, 4] — b changed too!

# COPY to avoid shared changes
a = [1, 2, 3]
b = a[:]           # shallow copy
b = a.copy()       # same as [:]
b = list(a)        # same as [:]

import copy
b = copy.deepcopy(a)  # deep copy (nested)

# WHEN TO WORRY: passing lists/dicts to functions
def modify(lst):
    lst.append(99)  # modifies caller's list!

# SOLUTION: copy inside function if needed
def modify(lst):
    lst = lst[:]    # work on copy
    lst.append(99)`,
  },
]

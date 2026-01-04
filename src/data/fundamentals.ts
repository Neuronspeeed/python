import type { Method } from '../types'

export const fundamentalsMethods: Method[] = [
  // Core Concepts
  {
    section: 'Core Concepts',
    signature: 'Dynamic Typing',
    description: 'Python tracks object types at runtime—no manual type declarations needed. Variables are just names bound to objects.',
    complexity: 'Concept',
    example: `x = 42        # x refers to an int
x = "hello"   # now x refers to a str
x = [1, 2, 3] # now x refers to a list
# The variable x has no fixed type`,
  },
  {
    section: 'Core Concepts',
    signature: 'Strong Typing',
    description: 'Operations only work on compatible types. Python won\'t silently convert types—you\'ll get a TypeError instead.',
    complexity: 'Concept',
    example: `"hello" + 5      # TypeError: can't concat str and int
"hello" + str(5) # OK: "hello5"
[1, 2] + (3, 4)  # TypeError: can only concat list to list
[1, 2] + [3, 4]  # OK: [1, 2, 3, 4]`,
  },
  {
    section: 'Core Concepts',
    signature: 'Polymorphism',
    description: 'Same operator, different behavior based on type. The + operator adds numbers but concatenates sequences.',
    complexity: 'Concept',
    example: `3 + 4           # 7 (addition)
"ab" + "cd"     # "abcd" (concatenation)
[1, 2] + [3]    # [1, 2, 3] (concatenation)

len("hello")    # 5 (string length)
len([1, 2, 3])  # 3 (list length)`,
  },

  // Why & When
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

  // Object Hierarchy
  {
    section: 'Object Hierarchy',
    signature: 'Programs → Modules',
    description: 'Programs are composed of modules (.py files). Each module is a namespace containing definitions.',
    complexity: 'Concept',
    example: `# my_module.py
def greet(name):
    return f"Hello, {name}"

# main.py
import my_module
print(my_module.greet("World"))`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Modules → Statements',
    description: 'Modules contain statements: assignments, function defs, class defs, control flow, imports.',
    complexity: 'Concept',
    example: `import math          # import statement
x = 10               # assignment statement
def square(n):       # function definition
    return n ** 2
if x > 5:            # control flow statement
    print("big")`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Statements → Expressions',
    description: 'Statements contain expressions. Expressions produce values and can be nested.',
    complexity: 'Concept',
    example: `# Expression examples
3 + 4 * 2            # arithmetic: 11
len("hello") > 3     # comparison: True
[x**2 for x in range(5)]  # list comp: [0,1,4,9,16]
lambda x: x + 1      # function object`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Expressions → Objects',
    description: 'Expressions create and process objects. Everything in Python is an object with identity, type, and value.',
    complexity: 'Concept',
    example: `x = [1, 2, 3]
id(x)      # identity: memory address
type(x)    # type: <class 'list'>
x          # value: [1, 2, 3]

# Even functions are objects
def foo(): pass
type(foo)  # <class 'function'>`,
  },

  // Mutability
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

  // Type Categories
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

  // Numeric Literals
  {
    section: 'Numeric Literals',
    signature: 'Alternative Bases',
    description: 'Integers can be written in hex (0x), octal (0o), and binary (0b). Underscores improve readability.',
    complexity: 'Concept',
    example: `0xFF        # 255 (hexadecimal)
0o77        # 63 (octal)
0b1010      # 10 (binary)
1_000_000   # 1000000 (underscores ignored)

bin(10)     # '0b1010'
hex(255)    # '0xff'
oct(64)     # '0o100'`,
  },
  {
    section: 'Numeric Literals',
    signature: 'Complex Numbers',
    description: 'Written as real+imagj. Used in engineering and science. Access parts with .real and .imag.',
    complexity: 'Concept',
    example: `z = 3 + 4j
z.real      # 3.0
z.imag      # 4.0
abs(z)      # 5.0 (magnitude)
z * (1 - 2j)  # (11-2j)`,
  },
  {
    section: 'Numeric Literals',
    signature: 'Decimal & Fraction',
    description: 'Decimal avoids float inaccuracy. Fraction represents exact ratios. Import from decimal/fractions modules.',
    complexity: 'Concept',
    example: `from decimal import Decimal
Decimal('0.1') + Decimal('0.2')  # Decimal('0.3')
0.1 + 0.2  # 0.30000000000000004 (float!)

from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)`,
  },

  // Operators & Expressions
  {
    section: 'Operators & Expressions',
    signature: 'Operator Precedence',
    description: '** binds tightest, then */%, then +-. Use parentheses to override. Associativity: ** is right-to-left.',
    complexity: 'Concept',
    example: `2 + 3 * 4     # 14 (not 20)
(2 + 3) * 4   # 20
2 ** 3 ** 2   # 512 (= 2^9, right-to-left)
(2 ** 3) ** 2 # 64

-3 ** 2       # -9 (** binds tighter than -)
(-3) ** 2     # 9`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Mixed-Type Conversion',
    description: 'Python converts "up" to the most complex type. int → float → complex. No implicit str conversion.',
    complexity: 'Concept',
    example: `3 + 4.0       # 7.0 (int → float)
2 + 3j        # (2+3j) (int → complex)
True + 1      # 2 (bool is int subclass)

"x" + 3       # TypeError (no implicit conversion)
"x" + str(3)  # "x3" (explicit conversion)`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Division Types',
    description: 'True division (/) always returns float. Floor division (//) truncates toward negative infinity.',
    complexity: 'Concept',
    example: `7 / 2         # 3.5 (true division)
7 // 2        # 3 (floor division)
-7 // 2       # -4 (floors toward -∞)

divmod(7, 2)  # (3, 1) — quotient and remainder
7 % 2         # 1 (modulo)`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Chained Comparisons',
    description: 'Python allows chaining: a < b < c means (a < b) and (b < c). More readable than manual AND.',
    complexity: 'Concept',
    example: `x = 5
1 < x < 10    # True (x is between 1 and 10)
1 < x > 3     # True (x > 1 and x > 3)

# Equivalent to:
1 < x and x < 10  # True`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Float Equality',
    description: 'Never use == for floats due to hardware limitations. Use math.isclose() or compare with tolerance.',
    complexity: 'Concept',
    example: `0.1 + 0.2 == 0.3        # False!
0.1 + 0.2               # 0.30000000000000004

import math
math.isclose(0.1 + 0.2, 0.3)  # True

# Or manual tolerance:
abs((0.1 + 0.2) - 0.3) < 1e-9  # True`,
  },
  {
    section: 'Operators & Expressions',
    signature: 'Bitwise Operations',
    description: 'Work on integer bits: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).',
    complexity: 'Concept',
    example: `5 & 3         # 1  (0101 & 0011 = 0001)
5 | 3         # 7  (0101 | 0011 = 0111)
5 ^ 3         # 6  (0101 ^ 0011 = 0110)
~5            # -6 (inverts all bits)
1 << 3        # 8  (shift left = multiply by 2^n)
8 >> 2        # 2  (shift right = divide by 2^n)`,
  },

  // Numeric Modules
  {
    section: 'Numeric Modules',
    signature: 'math Module',
    description: 'Standard math functions: sqrt, ceil, floor, log, sin, cos, pi, e, factorial, gcd.',
    complexity: 'Concept',
    example: `import math
math.sqrt(16)     # 4.0
math.ceil(3.2)    # 4
math.floor(3.8)   # 3
math.pi           # 3.141592653589793
math.factorial(5) # 120
math.gcd(12, 8)   # 4`,
  },
  {
    section: 'Numeric Modules',
    signature: 'random Module',
    description: 'Random numbers and selections: random(), randint(), choice(), shuffle(), sample().',
    complexity: 'Concept',
    example: `import random
random.random()        # 0.0 to 1.0
random.randint(1, 10)  # 1 to 10 inclusive
random.choice([1,2,3]) # pick one
random.shuffle(lst)    # shuffle in place
random.sample(lst, 2)  # pick 2 without replacement`,
  },
  {
    section: 'Numeric Modules',
    signature: 'statistics Module',
    description: 'Statistical functions: mean, median, mode, stdev, variance. For basic stats without NumPy.',
    complexity: 'Concept',
    example: `import statistics as stats
data = [1, 2, 2, 3, 4, 5]
stats.mean(data)    # 2.833...
stats.median(data)  # 2.5
stats.mode(data)    # 2
stats.stdev(data)   # 1.472...`,
  },

  // Philosophy & Tool Selection
  {
    section: 'Philosophy & Tools',
    signature: 'The Zen of Python',
    description: 'Python\'s design principles. "Beautiful is better than ugly. Simple is better than complex."',
    complexity: 'Concept',
    example: `import this  # Print the Zen of Python

# Key principles:
# "Explicit is better than implicit"
# "Simple is better than complex"
# "Readability counts"
# "There should be one obvious way to do it"
# "Errors should never pass silently"
# "In the face of ambiguity, refuse to temptation to guess"

# Check: is my code readable? explicit? simple?`,
  },
  {
    section: 'Philosophy & Tools',
    signature: 'Tool Redundancy',
    description: 'Python offers overlapping tools. Know the options, but prefer the simplest that works.',
    complexity: 'Concept',
    example: `# STRING FORMATTING (4 ways)
name = "Alice"
"Hello, %s" % name           # % (legacy)
"Hello, {}".format(name)     # .format()
f"Hello, {name}"             # f-string (preferred!)

# ATTRIBUTE MANAGEMENT (4 ways)
# @property       → Simple computed attributes
# Descriptors     → Reusable attribute logic
# __getattr__     → Undefined attribute fallback
# __getattribute__→ ALL attribute access (rare)

# CLASS AUGMENTATION (3 ways)
# Manual rebind   → C = decorator(C)
# @decorator      → Syntactic sugar (preferred!)
# metaclass=      → Framework-level (rare)`,
  },
  {
    section: 'Philosophy & Tools',
    signature: 'Recommended Choices',
    description: 'When in doubt, prefer the simpler, more readable option. Advanced features are for frameworks.',
    complexity: 'Concept',
    example: `# PREFER:
f"Hello, {name}"     # Over % or .format()
with open(f) as f:   # Over try/finally
@property            # Over descriptors
@decorator           # Over metaclasses
list comprehension   # Over map/filter

# USE ADVANCED WHEN NEEDED:
# Descriptors      → Reusable validation
# __getattr__      → Delegation/proxies
# Metaclasses      → Framework APIs
# Generators       → Large/infinite data

# "If you wonder whether you need metaclasses,
#  you probably don't."`,
  },
]

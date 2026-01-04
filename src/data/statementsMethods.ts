import type { Method } from '../types'

export const statementsMethods: Method[] = [
  // Assignment Fundamentals
  {
    section: 'Assignment Fundamentals',
    signature: 'target = object',
    description: 'Basic assignment creates a reference to an object. Variables are names bound to objects, not containers holding values.',
    complexity: 'Concept',
    example: `x = 42          # x refers to int object 42
y = x           # y refers to same object as x
x = "hello"     # x now refers to a new str object
print(y)        # 42 (y still refers to original int)`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Name Creation',
    description: 'Variable names are created when first assigned. No declaration needed—Python creates the name on first use.',
    complexity: 'Concept',
    example: `# No declaration needed
count = 0       # creates 'count' on first assignment
total = 100     # creates 'total'

# Using before assignment raises error
print(undefined_var)  # NameError: name not defined`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Required Initialization',
    description: 'A name must be assigned before use. Referencing an unassigned name raises NameError.',
    complexity: 'Concept',
    example: `# This fails
if False:
    x = 1
print(x)  # NameError: 'x' is not defined

# Must initialize before use
x = None  # or some default
if condition:
    x = computed_value`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Implicit Assignment',
    description: 'Assignment occurs in many contexts: imports, function/class defs, for loops, with statements, function arguments.',
    complexity: 'Concept',
    example: `import math           # assigns 'math' to module
def greet(): pass     # assigns 'greet' to function
class Dog: pass       # assigns 'Dog' to class
for i in range(3):    # assigns 'i' each iteration
    print(i)
with open("f") as f:  # assigns 'f' to file handle
    pass`,
  },

  // Sequence Assignment
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

  // Multiple & Augmented Assignment
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

  // Walrus Operator
  {
    section: 'Walrus Operator',
    signature: 'name := expression',
    description: 'Named expression (Python 3.8+). Assigns and returns value in one expression. Useful in conditions.',
    complexity: 'Concept',
    example: `# In while loops - read, assign, test
while (line := input()) != "quit":
    print(f"You typed: {line}")

# In if statements
if (n := len(data)) > 10:
    print(f"Too long: {n} items")

# In comprehensions
results = [y for x in data if (y := process(x))]`,
  },
  {
    section: 'Walrus Operator',
    signature: ':= in Comprehensions',
    description: 'Avoid duplicate computation by assigning intermediate results within comprehensions.',
    complexity: 'Concept',
    example: `# Without walrus - calls func twice
[func(x) for x in data if func(x) > 0]

# With walrus - calls func once
[y for x in data if (y := func(x)) > 0]

# Filter and transform in one pass
[clean for s in strings if (clean := s.strip())]`,
  },

  // Variable Naming
  {
    section: 'Variable Naming',
    signature: 'Naming Rules',
    description: 'Names must start with letter or underscore, followed by letters, digits, or underscores. Case-sensitive.',
    complexity: 'Concept',
    example: `# Valid names
count = 1
_private = 2
myVar2 = 3
CamelCase = 4

# Invalid names
2var = 1      # SyntaxError: can't start with digit
my-var = 1    # SyntaxError: hyphen not allowed
my var = 1    # SyntaxError: spaces not allowed`,
  },
  {
    section: 'Variable Naming',
    signature: 'Reserved Words',
    description: 'Cannot use Python keywords as variable names. 35 reserved words in Python 3.',
    complexity: 'Concept',
    example: `# Reserved words (cannot use as names)
# False, None, True, and, as, assert, async,
# await, break, class, continue, def, del,
# elif, else, except, finally, for, from,
# global, if, import, in, is, lambda,
# nonlocal, not, or, pass, raise, return,
# try, while, with, yield

import keyword
print(keyword.kwlist)  # list all keywords`,
  },
  {
    section: 'Variable Naming',
    signature: 'Naming Conventions',
    description: 'Underscore conventions signal intent: _private, __mangled, __dunder__. Not enforced but widely followed.',
    complexity: 'Concept',
    example: `_internal = 1      # "private" by convention
__mangled = 2      # name mangling in classes
__init__ = 3       # system-defined "dunder"

# In classes
class MyClass:
    def __init__(self):
        self._protected = 1   # internal use
        self.__private = 2    # becomes _MyClass__private

# Single underscore for unused
for _ in range(3):  # don't need loop variable
    print("hi")`,
  },

  // Expression Statements
  {
    section: 'Expression Statements',
    signature: 'Expression as Statement',
    description: 'Any expression can be a statement. Common for function calls with side effects.',
    complexity: 'Concept',
    example: `# Function calls as statements
print("Hello")    # side effect: output
my_list.append(1) # side effect: modifies list
my_list.sort()    # side effect: sorts in place

# Standalone expressions (result discarded)
3 + 4             # computed but not stored
len("hello")      # result ignored`,
  },
  {
    section: 'Expression Statements',
    signature: 'In-Place Method Gotcha',
    description: 'In-place methods return None. Assigning their result loses the object reference.',
    complexity: 'Concept',
    example: `# WRONG - loses list reference
L = [3, 1, 2]
L = L.sort()    # L is now None!
L = L.append(4) # L is now None!

# CORRECT - call method, don't assign
L = [3, 1, 2]
L.sort()        # modifies L in place
L.append(4)     # modifies L in place
print(L)        # [1, 2, 3, 4]

# Same issue: reverse(), clear(), extend()`,
  },

  // Print Operations
  {
    section: 'Print Operations',
    signature: 'print(*objects, sep, end, file)',
    description: 'Prints objects to stream. sep separates items (default space), end terminates (default newline).',
    complexity: 'Concept',
    example: `print("a", "b", "c")          # a b c
print("a", "b", sep="-")      # a-b
print("a", end="")            # no newline
print("b")                    # ab on same line

# Multiple values
x, y = 1, 2
print(x, y)                   # 1 2
print(f"{x=}, {y=}")          # x=1, y=2`,
  },
  {
    section: 'Print Operations',
    signature: 'print(..., file=f)',
    description: 'Redirect output to file object. Writes to any file-like object with write() method.',
    complexity: 'Concept',
    example: `# Write to file
with open("log.txt", "w") as f:
    print("Log entry", file=f)

# Write to stderr
import sys
print("Error!", file=sys.stderr)

# Capture to string
from io import StringIO
buffer = StringIO()
print("captured", file=buffer)
output = buffer.getvalue()  # "captured\\n"`,
  },
  {
    section: 'Print Operations',
    signature: 'sys.stdout Redirection',
    description: 'Reassigning sys.stdout redirects all print calls. Restore original when done.',
    complexity: 'Concept',
    example: `import sys

# Save and redirect
original = sys.stdout
sys.stdout = open("output.txt", "w")

print("This goes to file")  # redirected
print("So does this")       # redirected

# Restore
sys.stdout.close()
sys.stdout = original
print("Back to console")    # normal`,
  },
]

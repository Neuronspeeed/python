import type { Method } from '../types'

export const boolMethods: Method[] = [
  // Creation & Conversion
  { signature: 'bool(x)', description: 'Converts x to a Boolean. Returns False for falsy values, True otherwise.', complexity: 'O(1)', example: `print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False
print(bool("hello")) # True
print(bool([]))      # False
print(bool([1, 2]))  # True` },

  // Falsy Values
  { signature: 'False values', description: 'Values that evaluate to False: None, False, 0, 0.0, 0j, "", [], (), {}, set(), range(0).', complexity: 'O(1)', example: `# All of these are falsy
print(bool(None))     # False
print(bool(0))        # False
print(bool(0.0))      # False
print(bool(""))       # False
print(bool([]))       # False
print(bool({}))       # False
print(bool(set()))    # False` },

  // Truthy Values
  { signature: 'True values', description: 'Any value not explicitly falsy is truthy. Non-zero numbers, non-empty sequences.', complexity: 'O(1)', example: `# All of these are truthy
print(bool(1))        # True
print(bool(-1))       # True
print(bool(0.1))      # True
print(bool("0"))      # True (non-empty string!)
print(bool([0]))      # True (non-empty list!)
print(bool({0}))      # True` },

  // Logical Operators
  { signature: 'x and y', description: 'Logical AND. Returns x if x is falsy, otherwise returns y. Short-circuits.', complexity: 'O(1)', example: `print(True and True)    # True
print(True and False)   # False
print(False and True)   # False (short-circuits)
print(5 and 3)          # 3 (returns last evaluated)
print(0 and 3)          # 0 (returns first falsy)` },
  { signature: 'x or y', description: 'Logical OR. Returns x if x is truthy, otherwise returns y. Short-circuits.', complexity: 'O(1)', example: `print(True or False)    # True (short-circuits)
print(False or True)    # True
print(False or False)   # False
print(5 or 3)           # 5 (returns first truthy)
print(0 or 3)           # 3` },
  { signature: 'not x', description: 'Logical NOT. Returns True if x is falsy, False otherwise.', complexity: 'O(1)', example: `print(not True)    # False
print(not False)   # True
print(not 0)       # True
print(not 1)       # False
print(not "")      # True` },

  // Comparison Operators
  { signature: 'x == y', description: 'Equality comparison. Returns True if x equals y.', complexity: 'O(1)', example: `print(True == True)   # True
print(True == 1)      # True (bool is subclass of int)
print(False == 0)     # True
print(True == 2)      # False` },
  { signature: 'x != y', description: 'Inequality comparison. Returns True if x does not equal y.', complexity: 'O(1)', example: `print(True != False)  # True
print(True != 1)      # False` },
  { signature: 'x is y', description: 'Identity comparison. Returns True if x and y are the same object.', complexity: 'O(1)', example: `print(True is True)    # True
print(False is False)  # True
# Use == for value comparison, is for identity` },

  // Bool as Int
  { signature: 'True as 1, False as 0', description: 'Boolean is a subclass of int. True equals 1, False equals 0.', complexity: 'O(1)', example: `print(True + True)    # 2
print(True * 10)      # 10
print(False + 5)      # 5
print(sum([True, True, False, True]))  # 3 (count of True)` },

  // Chained Comparisons
  { signature: 'Chained comparisons', description: 'Python allows chained comparisons like a < b < c, equivalent to (a < b) and (b < c).', complexity: 'O(1)', example: `x = 5
print(1 < x < 10)     # True
print(1 < x < 3)      # False
print(1 < x <= 5)     # True

# Equivalent to:
print(1 < x and x < 10)  # True` },

  // Short-circuit Evaluation
  { signature: 'Short-circuit evaluation', description: 'and/or stop evaluating as soon as result is determined. Useful for guarding.', complexity: 'O(1)', example: `# Safe dictionary access
d = {}
print(d and d["key"])  # {} (doesn't access d["key"])

# Default values
name = "" or "Anonymous"
print(name)  # "Anonymous"

# Guard conditions
lst = []
print(lst and lst[0])  # [] (doesn't cause IndexError)` },

  // all() and any()
  { signature: 'all(iterable)', description: 'Returns True if all elements are truthy (or iterable is empty).', complexity: 'O(n)', example: `print(all([True, True, True]))   # True
print(all([True, False, True]))  # False
print(all([]))                   # True (vacuous truth)
print(all([1, 2, 3]))            # True
print(all([1, 0, 3]))            # False` },
  { signature: 'any(iterable)', description: 'Returns True if any element is truthy. Returns False for empty iterable.', complexity: 'O(n)', example: `print(any([False, False, True]))  # True
print(any([False, False]))        # False
print(any([]))                    # False
print(any([0, 0, 1]))             # True` },

  // Common Patterns
  { signature: 'Conditional expression', description: 'x if condition else y - ternary operator for inline conditionals.', complexity: 'O(1)', example: `age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # "adult"

# Can be chained (but avoid deep nesting)
x = 5
result = "small" if x < 3 else "medium" if x < 7 else "large"
print(result)  # "medium"` },

  // Truthiness in Control Flow
  { signature: 'if/while truthiness', description: 'Control statements use truthiness, not strict boolean comparison.', complexity: 'O(1)', example: `# Pythonic way
lst = [1, 2, 3]
if lst:  # not if len(lst) > 0
    print("list has items")

text = ""
if not text:  # not if text == ""
    print("empty string")

# While loop
items = [1, 2, 3]
while items:  # until list is empty
    print(items.pop())` },

  // __bool__ and __len__
  { signature: '__bool__(self)', description: 'Define custom truthiness. Called by bool(). Falls back to __len__() if not defined.', complexity: 'O(1)', example: `class MyClass:
    def __init__(self, value):
        self.value = value
    def __bool__(self):
        return self.value > 0

obj = MyClass(5)
print(bool(obj))  # True
obj = MyClass(-1)
print(bool(obj))  # False` },

  // Boolean Operations on Collections
  { signature: 'Filter by truthiness', description: 'filter() with None removes falsy values.', complexity: 'O(n)', example: `values = [0, 1, "", "hello", None, [], [1]]
truthy = list(filter(None, values))
print(truthy)  # [1, 'hello', [1]]

# Equivalent comprehension
truthy = [v for v in values if v]
print(truthy)  # [1, 'hello', [1]]` },
]

import type { Method } from '../types'

export const boolMethods: Method[] = [
  // Fundamentals
  { section: 'Fundamentals', signature: 'Boolean Basics', description: 'Bool type has only TWO values: True and False (capitalized!). Result of all comparisons and logical operations. Foundation of conditional logic.', complexity: 'Concept', example: `# Boolean type has only 2 values
print(type(True))   # <class 'bool'>
print(type(False))  # <class 'bool'>

# MUST capitalize: True and False (not true/false!)
# true   # NameError!
# false  # NameError!

# Comparisons return booleans
result = 1 == 1     # True
result = 3 > 5      # False
result = "a" < "b"  # True (lexicographic order)

# Use in conditions
if result:
    print("This runs if True")` },
  { section: 'Fundamentals', signature: 'bool(x)', description: 'Converts x to a Boolean. Returns False for falsy values, True otherwise.', complexity: 'O(1)', example: `print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False
print(bool("hello")) # True
print(bool([]))      # False
print(bool([1, 2]))  # True` },
  { section: 'Fundamentals', signature: 'Falsy Values', description: 'Values that evaluate to False: None, False, 0, 0.0, 0j, "", [], (), {}, set(), range(0). Everything else is truthy.', complexity: 'Concept', example: `# All of these are FALSY
print(bool(None))     # False - null value
print(bool(False))    # False - boolean
print(bool(0))        # False - zero integer
print(bool(0.0))      # False - zero float
print(bool(0j))       # False - zero complex
print(bool(""))       # False - empty string
print(bool([]))       # False - empty list
print(bool(()))       # False - empty tuple
print(bool({}))       # False - empty dict
print(bool(set()))    # False - empty set
print(bool(range(0))) # False - empty range

# BEWARE: These are TRUTHY!
print(bool("0"))      # True - non-empty string!
print(bool([0]))      # True - non-empty list!
print(bool({0: 0}))   # True - non-empty dict!` },
  { section: 'Fundamentals', signature: 'Truthy Values', description: 'Any value not explicitly falsy is truthy. Non-zero numbers, non-empty sequences, all objects by default.', complexity: 'Concept', example: `# All of these are TRUTHY
print(bool(1))        # True - non-zero
print(bool(-1))       # True - any non-zero
print(bool(0.1))      # True
print(bool("0"))      # True - non-empty string!
print(bool([0]))      # True - non-empty list!
print(bool({0}))      # True - non-empty set!
print(bool(" "))      # True - whitespace is non-empty!

# Custom objects are truthy by default
class MyClass:
    pass
print(bool(MyClass()))  # True` },

  // Why & When
  { section: 'Why & When', signature: 'Why use Booleans?', description: 'Booleans control program flow. Use for conditions, flags, validation, filtering. Leverage truthiness for cleaner code.', complexity: 'Concept', example: `# Control flow - if/while/for conditions
is_valid = True
if is_valid:  # Direct boolean check
    print("Proceed")

# Flags - track state
is_done = False
has_error = False
is_authenticated = True

# Validation - check conditions
age = 20
can_vote = age >= 18  # Boolean result

# Filtering - select items
numbers = [1, 2, 3, 4, 5]
evens = [n for n in numbers if n % 2 == 0]

# Truthiness - cleaner code
items = []
if items:  # Pythonic - uses truthiness
    print("has items")
# NOT: if len(items) > 0  # Less pythonic` },
  { section: 'Why & When', signature: 'Boolean vs other types', description: 'Boolean is a subclass of int. True=1, False=0. Use truthiness in conditions. Avoid explicit bool() calls.', complexity: 'Concept', example: `# Boolean IS-A int subclass
print(isinstance(True, int))   # True
print(True + True)             # 2
print(False + 5)               # 5
print(sum([True, True, False]))  # 2 (count Trues!)

# Truthiness vs explicit bool()
lst = [1, 2, 3]
if lst:  # GOOD - uses truthiness
    print("has items")

if bool(lst):  # REDUNDANT - unnecessary bool()
    print("has items")

if len(lst) > 0:  # VERBOSE - not pythonic
    print("has items")

# Boolean in math - count True values
answers = [True, False, True, True, False]
score = sum(answers)  # 3 correct
percentage = sum(answers) / len(answers)  # 0.6` },
  { section: 'Why & When', signature: 'Performance & Best Practices', description: 'Use truthiness for cleaner code. Short-circuit evaluation saves computation. all()/any() are optimized. Avoid unnecessary bool() conversions.', complexity: 'O(varies)', example: `# Short-circuit evaluation - stops early
# "and" stops at first False
result = expensive_check() and another_check()  # Skips 2nd if 1st is False

# "or" stops at first True
result = cheap_check() or expensive_check()  # Skips 2nd if 1st is True

# all() - stops at first False (O(n) worst, O(1) best)
all([True, True, False, True])  # Stops at 3rd element

# any() - stops at first True (O(n) worst, O(1) best)
any([False, False, True, False])  # Stops at 3rd element

# FAST - direct comparison
if x:  # O(1) - checks truthiness
    pass

# SLOW - unnecessary conversion
if bool(x):  # O(1) but adds function call overhead
    pass

# Performance tip: put cheap checks first
if cheap_condition and expensive_condition:
    pass  # Evaluate cheap first to short-circuit` },

  // Comparison Operators
  { section: 'Comparison Operators', signature: '== != < > <= >=', description: 'Compare values: == (equal), != (not equal), < > <= >= (ordering). Returns True or False. Common mistake: = vs ==', complexity: 'O(1)', example: `# Equality
print(1 == 1)       # True
print(1 != 2)       # True
print("a" == "a")   # True
print("a" == "A")   # False (case-sensitive!)

# Ordering (works with numbers and strings)
print(3 > 5)        # False
print(3 <= 3)       # True
print("apple" < "banana")  # True (lexicographic)

# COMMON MISTAKE: = vs ==
x = 5        # Assignment (sets value)
x == 5       # Comparison (returns True/False)
# if x = 5:  # SyntaxError! Use == not =` },
  { section: 'Comparison Operators', signature: 'Chained comparisons', description: 'Python allows chained comparisons like a < b < c, equivalent to (a < b) and (b < c). More readable and efficient.', complexity: 'O(1)', example: `x = 5
print(1 < x < 10)     # True - cleaner than (1 < x) and (x < 10)
print(1 < x < 3)      # False
print(1 < x <= 5)     # True

# Multiple chains
a, b, c = 1, 2, 3
print(a < b < c)      # True
print(a < b == 2 < c)  # True

# More readable than:
print((1 < x) and (x < 10))  # Same but verbose` },

  // Logical Operators
  { section: 'Logical Operators', signature: 'and', description: 'Logical AND. Returns x if x is falsy, otherwise returns y. Short-circuits (stops if x is False).', complexity: 'O(1)', example: `# Boolean results
print(True and True)    # True
print(True and False)   # False
print(False and True)   # False (short-circuits, doesn't evaluate right)

# Returns actual values (not always bool!)
print(5 and 3)          # 3 (both truthy, returns last)
print(0 and 3)          # 0 (first falsy, returns it)
print([] and [1])       # [] (first falsy)
print([1] and [2])      # [2] (both truthy, returns last)

# Combine comparisons
x = 5
print(x > 0 and x < 10)  # True` },
  { section: 'Logical Operators', signature: 'or', description: 'Logical OR. Returns x if x is truthy, otherwise returns y. Short-circuits (stops if x is True).', complexity: 'O(1)', example: `# Boolean results
print(True or False)    # True (short-circuits)
print(False or True)    # True
print(False or False)   # False

# Returns actual values (not always bool!)
print(5 or 3)           # 5 (first truthy, returns it)
print(0 or 3)           # 3 (first falsy, tries second)
print([] or [1])        # [1] (first falsy, returns second)
print("" or "default")  # "default" (common default pattern)

# Default values pattern
name = user_input or "Anonymous"  # Use input or default` },
  { section: 'Logical Operators', signature: 'not', description: 'Logical NOT. Returns True if x is falsy, False if truthy. Always returns a boolean.', complexity: 'O(1)', example: `# Always returns True or False (not original value)
print(not True)    # False
print(not False)   # True
print(not 0)       # True
print(not 1)       # False
print(not "")      # True
print(not "hello") # False
print(not [])      # True
print(not [1])     # False

# Double negative returns bool (not original)
print(not not 5)   # True (not False)
print(not not [])  # False (not True)` },

  // Identity & Equality
  { section: 'Identity & Equality', signature: 'x == y', description: 'Equality comparison. Returns True if x equals y. Compares VALUES.', complexity: 'O(1)', example: `print(True == True)   # True
print(True == 1)      # True (bool is subclass of int)
print(False == 0)     # True
print(True == 2)      # False

# Value equality, not identity
a = [1, 2]
b = [1, 2]
print(a == b)  # True (same values)
print(a is b)  # False (different objects)` },
  { section: 'Identity & Equality', signature: 'x != y', description: 'Inequality comparison. Returns True if x does not equal y.', complexity: 'O(1)', example: `print(True != False)  # True
print(True != 1)      # False
print(5 != "5")       # True (different types)` },
  { section: 'Identity & Equality', signature: 'x is y', description: 'Identity comparison. Returns True if x and y are the SAME object in memory. Use for None, True, False.', complexity: 'O(1)', example: `# Use "is" for singletons (None, True, False)
print(True is True)    # True
print(False is False)  # True
x = None
print(x is None)       # True - CORRECT way

# DON'T use "is" for values
a = 1000
b = 1000
print(a is b)   # False (different objects)
print(a == b)   # True (same value) - CORRECT

# Use "==" for value comparison, "is" for identity
print(x == None)  # Works but not idiomatic
print(x is None)  # Pythonic way` },

  // Boolean Arithmetic
  { section: 'Boolean Arithmetic', signature: 'Boolean as Integer', description: 'Boolean is a subclass of int. True=1, False=0. Use sum() to count True values.', complexity: 'O(1)', example: `# Arithmetic operations
print(True + True)    # 2
print(True * 10)      # 10
print(False + 5)      # 5
print(True - 1)       # 0

# Count True values
answers = [True, False, True, True, False]
print(sum(answers))  # 3 (count of True)

# Calculate percentage
total = len(answers)
correct = sum(answers)
percentage = (correct / total) * 100  # 60.0%

# Works in indexes (but not recommended)
options = ["No", "Yes"]
choice = True
print(options[choice])  # "Yes" (index 1)` },

  // Short-circuit Evaluation
  { section: 'Short-circuit Patterns', signature: 'Short-circuit evaluation', description: 'and/or stop evaluating as soon as result is determined. Prevents errors and improves performance.', complexity: 'O(1)', example: `# Safe dictionary access (prevents KeyError)
d = {}
result = d and d["key"]  # {} (doesn't access d["key"])

# Safe list access (prevents IndexError)
lst = []
result = lst and lst[0]  # [] (doesn't access lst[0])

# Default values
name = user_input or "Anonymous"  # Use input or default
count = user_count or 0

# Guard conditions - expensive_check only if first passes
if cheap_check() and expensive_check():
    pass

# Lazy evaluation - second function not called if first succeeds
result = try_fast() or try_slow() or default_value` },

  // Aggregate Functions
  { section: 'Aggregate Functions', signature: 'all(iterable)', description: 'Returns True if ALL elements are truthy (or iterable is empty). Short-circuits at first False.', complexity: 'O(n)', example: `# Basic usage
print(all([True, True, True]))   # True
print(all([True, False, True]))  # False (stops at False)
print(all([]))                   # True (empty = vacuous truth)

# Validation - check all conditions
ages = [18, 21, 25, 30]
print(all(age >= 18 for age in ages))  # True

# All non-zero
numbers = [1, 2, 3, 4]
print(all(numbers))  # True
numbers = [1, 0, 3]
print(all(numbers))  # False

# Check all strings non-empty
names = ["Alice", "Bob", ""]
print(all(names))  # False` },
  { section: 'Aggregate Functions', signature: 'any(iterable)', description: 'Returns True if ANY element is truthy. Short-circuits at first True. Returns False for empty.', complexity: 'O(n)', example: `# Basic usage
print(any([False, False, True]))  # True (stops at first True)
print(any([False, False]))        # False
print(any([]))                    # False (empty)

# Check if any condition met
ages = [15, 16, 21, 17]
print(any(age >= 18 for age in ages))  # True

# Any errors?
errors = [None, None, "Error!", None]
print(any(errors))  # True

# At least one match
numbers = [2, 4, 6, 7, 8]
print(any(n % 2 == 1 for n in numbers))  # True (7 is odd)` },

  // Control Flow
  { section: 'Control Flow', signature: 'if/while truthiness', description: 'Control statements use truthiness. Pythonic code checks truthiness directly, not explicit comparisons.', complexity: 'O(1)', example: `# PYTHONIC - check truthiness directly
lst = [1, 2, 3]
if lst:  # GOOD
    print("list has items")

# VERBOSE - explicit comparison
if len(lst) > 0:  # WORKS but not idiomatic
    print("list has items")

# Check empty string
text = ""
if not text:  # GOOD
    print("empty")

# NOT: if text == ""  # VERBOSE

# While loop with truthiness
items = [1, 2, 3]
while items:  # loop until empty
    print(items.pop())

# Nested checks
data = {"key": [1, 2, 3]}
if data and "key" in data and data["key"]:
    print("Has key with non-empty value")` },
  { section: 'Control Flow', signature: 'Ternary operator', description: 'x if condition else y - inline conditional expression. More concise than if/else block.', complexity: 'O(1)', example: `# Basic ternary
age = 20
status = "adult" if age >= 18 else "minor"
print(status)  # "adult"

# Use in expressions
max_val = a if a > b else b  # Max of two values

# Can chain (but avoid deep nesting!)
x = 5
result = "small" if x < 3 else "medium" if x < 7 else "large"
print(result)  # "medium"

# Better: use if/elif for readability if chaining
if x < 3:
    result = "small"
elif x < 7:
    result = "medium"
else:
    result = "large"` },

  // Advanced Patterns
  { section: 'Advanced Patterns', signature: '__bool__(self)', description: 'Define custom truthiness for classes. Called by bool() and if statements. Falls back to __len__() if not defined.', complexity: 'O(1)', example: `# Custom __bool__ method
class Account:
    def __init__(self, balance):
        self.balance = balance
    def __bool__(self):
        return self.balance > 0

account = Account(100)
if account:  # Calls __bool__
    print("Account has funds")  # This runs

broke = Account(0)
if not broke:  # False because balance <= 0
    print("Account is empty")  # This runs

# Falls back to __len__ if __bool__ not defined
class MyList:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)

ml = MyList([1, 2, 3])
print(bool(ml))  # True (len > 0)` },
  { section: 'Advanced Patterns', signature: 'Filter by truthiness', description: 'Use filter(None, ...) or comprehension to remove falsy values from collections.', complexity: 'O(n)', example: `# Remove falsy values
values = [0, 1, "", "hello", None, [], [1], False, True]

# Method 1: filter with None
truthy = list(filter(None, values))
print(truthy)  # [1, 'hello', [1], True]

# Method 2: comprehension (more explicit)
truthy = [v for v in values if v]
print(truthy)  # [1, 'hello', [1], True]

# Remove empty strings
words = ["hello", "", "world", "", "!"]
non_empty = [w for w in words if w]
print(non_empty)  # ['hello', 'world', '!']

# Remove None values
data = [1, None, 2, None, 3]
clean = [x for x in data if x is not None]  # Keep 0!
print(clean)  # [1, 2, 3]` },
]

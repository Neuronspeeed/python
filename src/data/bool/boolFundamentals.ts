import type { Method } from '../../types'

export const boolFundamentals: Method[] = [
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
]

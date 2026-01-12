import type { Method } from '../../../types'

export const builtinsIdentityMethods: Method[] = [
  {
    signature: 'id(obj)',
    description: 'Return unique identity (memory address) of object. Two objects with same id() are the same object.',
    complexity: 'O(1)',
    section: 'Identity',
    example: `# Get unique object identity
a = [1, 2, 3]
b = a           # b references same object
c = [1, 2, 3]   # c is different object with same value

id(a)  # e.g., 140234567890
id(b)  # Same as id(a) - same object!
id(c)  # Different number - different object

# id() is equivalent to 'is' operator
a is b  # True  (same as: id(a) == id(b))
a is c  # False (same as: id(a) == id(c))
a == c  # True  (same VALUE, different object)

# USE CASE: Debug aliasing issues
def append_to_list(lst, item):
    print(f"Before: id={id(lst)}")
    lst.append(item)
    print(f"After: id={id(lst)}")  # Same id - modified in place

def reassign_list(lst, item):
    print(f"Before: id={id(lst)}")
    lst = lst + [item]  # Creates NEW list
    print(f"After: id={id(lst)}")  # Different id!
    return lst

# USE CASE: Track object references
def count_unique_objects(items):
    return len(set(id(item) for item in items))

lst = [1, 2, 3]
a = lst
b = lst
items = [lst, a, b, [1, 2, 3]]
count_unique_objects(items)  # 2 (lst/a/b are same, last is new)

# SMALL INTEGER CACHING (-5 to 256):
x = 100
y = 100
x is y  # True! Python caches small integers

x = 1000
y = 1000
x is y  # False (not cached, different objects)`
  },

  {
    signature: 'is vs ==',
    description: 'is checks identity (same object), == checks equality (same value). Use is only for None, True, False.',
    complexity: 'O(1) / O(n)',
    section: 'Identity',
    example: `# IDENTITY (is) vs EQUALITY (==)
a = [1, 2, 3]
b = [1, 2, 3]
c = a

a == b   # True - same value
a is b   # False - different objects
a is c   # True - same object

# RULE: Use 'is' ONLY for singletons
# Correct:
if x is None:
    pass
if x is True:
    pass
if x is False:
    pass

# WRONG (use ==):
if x is 0:       # Bad! Use x == 0
    pass
if x is "hello": # Bad! Use x == "hello"
    pass
if x is []:      # Bad! Use x == [] or not x
    pass

# WHY THIS MATTERS:
# String interning (implementation detail):
a = "hello"
b = "hello"
a is b  # True (Python interns short strings)

a = "hello world!"
b = "hello world!"
a is b  # Might be False! (longer strings may not be interned)

# ALWAYS USE == for value comparison:
a == b  # True (reliable)

# 'is' COMPLEXITY: O(1) - just compares memory addresses
# '==' COMPLEXITY: O(n) - may need to compare all elements

# INTERVIEW PATTERN: Check for None specifically
def process(data=None):
    if data is None:  # Correct! Checks for None specifically
        data = []
    # if data == None:  # Works but not Pythonic
    # if not data:       # Wrong! Empty list is also falsy`
  },
]

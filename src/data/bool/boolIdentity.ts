import type { Method } from '../../types'

export const boolIdentity: Method[] = [
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
]

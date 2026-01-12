import type { Method } from '../../types'

export const boolLogical: Method[] = [
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
]

import type { Method } from '../../types'

export const boolControlFlow: Method[] = [
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
]

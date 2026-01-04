import type { Method } from '../types'

export const conditionalPatternsMethods: Method[] = [
  // Performance & Patterns
  {
    section: 'Performance & Patterns',
    signature: 'if-elif vs dict dispatch',
    description: 'Dict dispatch is O(1) for value lookup. if-elif is O(n) worst case. Use dict for many branches with simple mapping.',
    complexity: 'Concept',
    example: `# IF-ELIF CHAIN - O(n) worst case
day_num = 4
if day_num == 0:
    day = 'Monday'
elif day_num == 1:
    day = 'Tuesday'
elif day_num == 2:
    day = 'Wednesday'
elif day_num == 3:
    day = 'Thursday'
elif day_num == 4:
    day = 'Friday'  # Checked 5 conditions!
# Worst case: checks ALL branches

# DICT DISPATCH - O(1) always
days = {
    0: 'Monday', 1: 'Tuesday', 2: 'Wednesday',
    3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
}
day = days[4]  # O(1) lookup, instant!

# PERFORMANCE:
# - Dict: constant time, great for 5+ branches
# - if-elif: linear time, but more flexible (complex conditions)

# USE DICT WHEN:
# - Simple equality checks (x == 1, x == 2...)
# - 5+ branches
# - Mapping values or functions

# USE IF-ELIF WHEN:
# - Complex conditions (x > 10 and y < 5)
# - Conditions involve different variables
# - Need short-circuit evaluation
# - Fewer than 5 branches`,
  },
  {
    section: 'Performance & Patterns',
    signature: 'if-elif vs match (3.10+)',
    description: 'match for pattern matching and destructuring. if-elif for boolean logic and different variables.',
    complexity: 'Concept',
    example: `# IF-ELIF - different conditions, boolean logic
x, y = 10, 20
if x > 100:
    result = "big x"
elif y > 100:
    result = "big y"  # Different variable!
elif x + y > 100:
    result = "big sum"  # Complex expression
# Better for: mixed conditions, different variables

# MATCH - same value, pattern matching (Python 3.10+)
point = (0, 5)
match point:
    case (0, 0):
        result = "origin"
    case (0, y):
        result = f"y-axis at {y}"  # Destructuring!
    case (x, 0):
        result = f"x-axis at {x}"
    case (x, y):
        result = f"point at ({x}, {y})"
# Better for: patterns, destructuring, type matching

# WHEN TO USE MATCH:
# - Destructuring sequences/dicts
# - Type-based dispatch
# - Complex patterns with guards
# - Same value, multiple patterns

# WHEN TO USE IF-ELIF:
# - Boolean combinations (and/or/not)
# - Different variables in each condition
# - Older Python (< 3.10)
# - Simple comparisons`,
  },
  {
    section: 'Performance & Patterns',
    signature: 'Short-circuit evaluation',
    description: 'and/or stop evaluation as soon as result is determined. Use for efficiency and null safety.',
    complexity: 'O(1) best case',
    example: `# AND short-circuit - stops at first False
x = 0
result = x != 0 and 10 / x  # Never divides! x != 0 is False
# Avoids ZeroDivisionError

# OR short-circuit - stops at first True
name = user_input or "Guest"  # Use input if truthy, else "Guest"
# Avoids checking "Guest" if user_input is truthy

# PERFORMANCE BENEFIT:
def expensive():
    # Complex computation
    return True

# Only calls expensive() if needed
if cheap_test() and expensive():
    do_something()

# COMMON PATTERN: null safety
if user and user.is_admin():  # Checks user exists first
    grant_access()

# ANTI-PATTERN (without short-circuit):
if user.is_admin():  # Crashes if user is None!
    grant_access()

# RULE: Put cheap/likely-false conditions first in AND chains
# Put cheap/likely-true conditions first in OR chains`,
  },
  {
    section: 'Performance & Patterns',
    signature: 'Ternary vs if-else',
    description: 'Ternary for simple value assignment. if-else for complex logic or multiple statements.',
    complexity: 'Concept',
    example: `# TERNARY - single value assignment
status = "pass" if score >= 60 else "fail"

# More readable than:
if score >= 60:
    status = "pass"
else:
    status = "fail"

# GOOD ternary uses:
# - Simple value assignment
# - Function arguments
# - List/dict values
result = max(a, b) if a and b else None
data = {'status': 'active' if logged_in else 'inactive'}

# BAD ternary uses (use if-else):
# - Complex conditions
# - Multiple statements
# - Deep nesting (hard to read)

# THIS IS AWFUL:
result = "A" if x >= 90 else "B" if x >= 80 else "C" if x >= 70 else "F"

# USE IF-ELIF INSTEAD:
if x >= 90:
    result = "A"
elif x >= 80:
    result = "B"
elif x >= 70:
    result = "C"
else:
    result = "F"

# RULE: If it doesn't fit on one readable line, use if-else`,
  },
]

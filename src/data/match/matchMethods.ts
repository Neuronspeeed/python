import type { Method } from '../../types'

export const matchMethods: Method[] = [
  // match Statement (Python 3.10+)
  {
    section: 'Fundamentals',
    signature: 'match subject: case pattern:',
    description: 'Pattern matching (Python 3.10+). Compares subject against patterns, executes first match. Structural pattern matching.',
    complexity: 'Concept',
    example: `command = "quit"
match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case "quit":
        print("Goodbye!")  # This runs
    case _:
        print("Unknown command")

# Python 3.10+ ONLY
# Will not work in Python 3.9 or earlier`,
  },
  {
    section: 'Fundamentals',
    signature: 'case _: (wildcard)',
    description: 'Underscore matches anything. Acts as default/fallback when no other case matches. Like else in if-elif-else.',
    complexity: 'Concept',
    example: `status = 404
match status:
    case 200:
        msg = "OK"
    case 404:
        msg = "Not Found"  # matches
    case 500:
        msg = "Server Error"
    case _:
        msg = "Unknown"  # default fallback
print(msg)  # Not Found

# Always put _ case last (like else)`,
  },

  // Why & When
  {
    section: 'Why & When',
    signature: 'When to use match vs if',
    description: 'Use match for structural patterns, multiple conditions with same variable. Use if for different conditions or simple checks.',
    complexity: 'Concept',
    example: `# GOOD for match - checking same value many times
match http_status:
    case 200: return "OK"
    case 404: return "Not Found"
    case 500: return "Server Error"
    case _: return "Unknown"

# BAD for match - different conditions
# if temperature > 30: return "hot"
# elif humidity > 80: return "humid"  # Different variables!

# GOOD for if - different conditions
if temperature > 30:
    return "hot"
elif humidity > 80:
    return "humid"

# match shines with destructuring
match point:
    case (0, 0): return "origin"
    case (0, y): return f"y-axis at {y}"
    case (x, 0): return f"x-axis at {x}"
    case (x, y): return f"point ({x}, {y})"`,
  },
  {
    section: 'Why & When',
    signature: 'match vs dict vs if-elif',
    description: 'match: patterns and destructuring. dict: O(1) value lookup. if-elif: different conditions. Choose based on use case.',
    complexity: 'Concept',
    example: `# IF-ELIF - different conditions (O(n) worst case)
if temp > 30: msg = "hot"
elif humid > 80: msg = "humid"
elif wind > 20: msg = "windy"

# DICT - simple value mapping (O(1) lookup)
day_name = {0: "Mon", 1: "Tue", 2: "Wed"}[day]

# MATCH - patterns, destructuring (Python 3.10+)
match point:
    case (0, 0): msg = "origin"
    case (x, 0): msg = f"x-axis: {x}"  # Captures x!
    case (0, y): msg = f"y-axis: {y}"  # Captures y!

# Performance:
# if-elif: O(n) - checks each condition
# dict: O(1) - direct lookup
# match: O(1) to O(n) - depends on patterns`,
  },

  // Pattern Types
  {
    section: 'Pattern Types',
    signature: 'Literal patterns',
    description: 'Match exact values: numbers, strings, booleans, None.',
    complexity: 'Concept',
    example: `value = 42
match value:
    case 0:
        print("Zero")
    case 42:
        print("Answer!")  # matches
    case 100:
        print("Century")

# Multiple literals with |
char = 'a'
match char:
    case 'a' | 'e' | 'i' | 'o' | 'u':
        print("vowel")  # matches
    case _:
        print("consonant")

# With None
match result:
    case None:
        print("No result")
    case value:
        print(f"Got {value}")`,
  },
  {
    section: 'Pattern Types',
    signature: 'case pattern1 | pattern2:',
    description: 'Or-pattern matches any of the listed alternatives. Like "or" in boolean logic.',
    complexity: 'Concept',
    example: `char = 'a'
match char:
    case 'a' | 'e' | 'i' | 'o' | 'u':
        print("vowel")  # matches
    case _:
        print("consonant")

# With numbers
code = 401
match code:
    case 401 | 403 | 404:
        print("Client error")  # matches
    case 500 | 502 | 503:
        print("Server error")

# Can combine with capture
match value:
    case 0 | 1 | 2 as small:
        print(f"Small: {small}")`,
  },
  {
    section: 'Pattern Types',
    signature: 'Sequence patterns [x, y, ...]',
    description: 'Match and unpack sequences (lists, tuples). Can capture elements into variables. Use * for rest.',
    complexity: 'Concept',
    example: `point = (0, 5)
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"On Y-axis at {y}")  # matches, y=5
    case (x, 0):
        print(f"On X-axis at {x}")
    case (x, y):
        print(f"Point at ({x}, {y})")

# With lists - capture rest with *
match [1, 2, 3, 4]:
    case [first, *rest]:
        print(first, rest)  # 1 [2, 3, 4]

# Fixed length
match [1, 2]:
    case [a, b]:
        print(a + b)  # 3

# Nested patterns
match [(1, 2), (3, 4)]:
    case [(a, b), (c, d)]:
        print(a, b, c, d)  # 1 2 3 4`,
  },
  {
    section: 'Pattern Types',
    signature: 'Mapping patterns {"key": value}',
    description: 'Match dictionaries. Extracts values for specified keys. Extra keys ignored.',
    complexity: 'Concept',
    example: `action = {"type": "click", "x": 100, "y": 200}
match action:
    case {"type": "click", "x": x, "y": y}:
        print(f"Click at ({x}, {y})")  # matches
    case {"type": "scroll", "direction": d}:
        print(f"Scroll {d}")
    case _:
        print("Unknown action")

# Extra keys are IGNORED (not an error)
match {"a": 1, "b": 2, "c": 3}:
    case {"a": x}:
        print(x)  # 1 (b, c ignored)

# Required key check
match {"name": "Alice"}:
    case {"name": n, "age": a}:
        print("Has age")  # NO MATCH (age missing)
    case {"name": n}:
        print(f"Name: {n}")  # matches`,
  },
  {
    section: 'Pattern Types',
    signature: 'Capture patterns (as name)',
    description: 'Capture matched value into variable. Use "as" keyword.',
    complexity: 'Concept',
    example: `# Capture with as
match point:
    case (0, y) as p:
        print(f"Y-axis point {p} at y={y}")

# Capture in or-pattern
match value:
    case 0 | 1 | 2 as small:
        print(f"Small number: {small}")

# Capture in sequence
match [1, 2, 3]:
    case [first, *rest] as full:
        print(f"Full: {full}, First: {first}, Rest: {rest}")
        # Full: [1, 2, 3], First: 1, Rest: [2, 3]`,
  },

  // Guards
  {
    section: 'Guards',
    signature: 'case pattern if guard:',
    description: 'Guard adds extra condition. Pattern must match AND guard must be true. Allows complex filtering.',
    complexity: 'Concept',
    example: `point = (3, 4)
match point:
    case (x, y) if x == y:
        print("On diagonal")
    case (x, y) if x > y:
        print("Above diagonal")
    case (x, y):
        print("Below diagonal")  # matches (3 < 4)

# With value check
match value:
    case x if x < 0:
        print("Negative")
    case x if x > 100:
        print("Large")
    case x:
        print(f"Normal: {x}")

# Complex guard
match user:
    case {"role": "admin", "active": True} if check_permissions():
        grant_access()`,
  },
  {
    section: 'Guards',
    signature: 'Guard evaluation',
    description: 'Guards evaluated AFTER pattern matches. Can reference captured variables.',
    complexity: 'Concept',
    example: `# Guard uses captured variables
match point:
    case (x, y) if x**2 + y**2 <= 100:
        print("Inside circle")  # guard uses x, y
    case (x, y):
        print("Outside circle")

# Multiple conditions in guard
match data:
    case {"score": s} if s >= 90 and s <= 100:
        grade = "A"
    case {"score": s} if s >= 80:
        grade = "B"

# Function calls in guard
match item:
    case value if is_valid(value):
        process(value)`,
  },

  // Advanced Patterns
  {
    section: 'Advanced Patterns',
    signature: 'Wildcard in sequences',
    description: 'Use _ to ignore specific positions in sequence patterns.',
    complexity: 'Concept',
    example: `# Ignore middle elements
match [1, 2, 3, 4, 5]:
    case [first, _, _, _, last]:
        print(first, last)  # 1 5

# Ignore with *
match [1, 2, 3, 4]:
    case [first, *_, last]:
        print(first, last)  # 1 4

# Ignore in tuple unpacking
match point:
    case (x, _):  # ignore y coordinate
        print(f"x = {x}")`,
  },
  {
    section: 'Advanced Patterns',
    signature: 'Class patterns',
    description: 'Match class instances and extract attributes. Uses positional or keyword patterns.',
    complexity: 'Concept',
    example: `from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p = Point(0, 5)
match p:
    case Point(0, 0):
        print("Origin")
    case Point(0, y):
        print(f"Y-axis at {y}")  # matches
    case Point(x, y):
        print(f"Point ({x}, {y})")

# With keyword patterns
match Point(x=10, y=20):
    case Point(x=0, y=y):
        print(f"Y-axis: {y}")
    case Point(x=x, y=0):
        print(f"X-axis: {x}")
    case Point(x=x, y=y):
        print(f"({x}, {y})")  # matches`,
  },
]

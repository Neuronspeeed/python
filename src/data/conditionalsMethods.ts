import type { Method } from '../types'

export const conditionalsMethods: Method[] = [
  // if Statement
  {
    section: 'if Statement',
    signature: 'if test: ... elif: ... else:',
    description: 'Primary selection tool. Evaluates tests top-to-bottom, executes first true block, then exits.',
    complexity: 'Concept',
    example: `x = 85
if x >= 90:
    grade = 'A'
elif x >= 80:
    grade = 'B'
elif x >= 70:
    grade = 'C'
else:
    grade = 'F'
print(grade)  # B`,
  },
  {
    section: 'if Statement',
    signature: 'if test:',
    description: 'Simple if without elif or else. Block executes only when test is true.',
    complexity: 'Concept',
    example: `x = 10
if x > 0:
    print("positive")  # prints

if x < 0:
    print("negative")  # skipped

# Multiple independent ifs (all checked)
if x > 5: print("big")      # prints
if x % 2 == 0: print("even") # prints`,
  },
  {
    section: 'if Statement',
    signature: 'Nested if',
    description: 'if statements can be nested for multi-layered logic. Indentation defines scope.',
    complexity: 'Concept',
    example: `age = 25
has_license = True

if age >= 18:
    if has_license:
        print("Can drive")
    else:
        print("Need license")
else:
    print("Too young")
# Output: Can drive`,
  },

  // Ternary Expression
  {
    section: 'Ternary Expression',
    signature: 'Y if X else Z',
    description: 'One-line conditional expression. Returns Y if X is true, else Z. Not a statement.',
    complexity: 'Concept',
    example: `x = 10
result = "even" if x % 2 == 0 else "odd"
print(result)  # even

# In function call
print("yes" if True else "no")  # yes

# Assignment
score = 85
grade = 'pass' if score >= 60 else 'fail'`,
  },
  {
    section: 'Ternary Expression',
    signature: 'Nested Ternary',
    description: 'Can be chained but avoid deep nesting for readability.',
    complexity: 'Concept',
    example: `x = 5
size = "small" if x < 3 else "medium" if x < 7 else "large"
print(size)  # medium

# Equivalent if/elif/else
if x < 3:
    size = "small"
elif x < 7:
    size = "medium"
else:
    size = "large"`,
  },

  // Dictionary Branching
  {
    section: 'Dictionary Branching',
    signature: 'dict[key] for branching',
    description: 'Use dict to map choices to values or functions. More flexible than long if/elif chains.',
    complexity: 'O(1)',
    example: `# Value mapping
day_names = {
    0: 'Monday', 1: 'Tuesday', 2: 'Wednesday',
    3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
}
print(day_names[2])  # Wednesday

# With default via .get()
print(day_names.get(7, 'Invalid'))  # Invalid`,
  },
  {
    section: 'Dictionary Branching',
    signature: 'dict[key]() for dispatch',
    description: 'Map keys to functions for dynamic dispatch. Cleaner than if/elif with many branches.',
    complexity: 'O(1)',
    example: `def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b

ops = {'+': add, '-': sub, '*': mul}

op = '+'
result = ops[op](10, 5)  # 15

# With lambda
ops = {
    '+': lambda a, b: a + b,
    '-': lambda a, b: a - b,
}
print(ops['+'](3, 4))  # 7`,
  },

  // match Statement
  {
    section: 'match Statement',
    signature: 'match subject: case pattern:',
    description: 'Pattern matching (Python 3.10+). Compares subject against patterns, executes first match.',
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
        print("Unknown command")`,
  },
  {
    section: 'match Statement',
    signature: 'case _: (wildcard)',
    description: 'Underscore matches anything. Acts as default/fallback when no other case matches.',
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
print(msg)  # Not Found`,
  },
  {
    section: 'match Statement',
    signature: 'case pattern1 | pattern2:',
    description: 'Or-pattern matches any of the listed alternatives.',
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
        print("Client error")
    case 500 | 502 | 503:
        print("Server error")`,
  },
  {
    section: 'match Statement',
    signature: 'Sequence patterns [...]',
    description: 'Match and unpack sequences. Can capture elements into variables.',
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

# With lists
match [1, 2, 3]:
    case [first, *rest]:
        print(first, rest)  # 1 [2, 3]`,
  },
  {
    section: 'match Statement',
    signature: 'Mapping patterns {...}',
    description: 'Match dictionaries. Extracts values for specified keys.',
    complexity: 'Concept',
    example: `action = {"type": "click", "x": 100, "y": 200}
match action:
    case {"type": "click", "x": x, "y": y}:
        print(f"Click at ({x}, {y})")  # matches
    case {"type": "scroll", "direction": d}:
        print(f"Scroll {d}")
    case _:
        print("Unknown action")

# Extra keys are ignored
match {"a": 1, "b": 2, "c": 3}:
    case {"a": x}:
        print(x)  # 1 (b, c ignored)`,
  },
  {
    section: 'match Statement',
    signature: 'case pattern if guard:',
    description: 'Guard adds extra condition. Pattern must match AND guard must be true.',
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
        print(f"Normal: {x}")`,
  },

  // Truth Values
  {
    section: 'Truth Values',
    signature: 'Falsy Values',
    description: 'Values that evaluate to False: None, False, 0, 0.0, "", [], {}, set(), range(0).',
    complexity: 'Concept',
    example: `# All falsy
bool(None)    # False
bool(False)   # False
bool(0)       # False
bool(0.0)     # False
bool("")      # False
bool([])      # False
bool({})      # False
bool(set())   # False`,
  },
  {
    section: 'Truth Values',
    signature: 'Truthy Values',
    description: 'Everything not falsy is truthy. Non-zero numbers, non-empty collections.',
    complexity: 'Concept',
    example: `# All truthy
bool(1)       # True
bool(-1)      # True
bool(0.1)     # True
bool("0")     # True (non-empty string!)
bool([0])     # True (non-empty list!)
bool({0: 0})  # True (non-empty dict!)
bool(" ")     # True (space is a character)`,
  },
  {
    section: 'Truth Values',
    signature: 'Pythonic Conditionals',
    description: 'Use truthiness directly. Avoid explicit comparisons like == True or len() > 0.',
    complexity: 'Concept',
    example: `# Pythonic
if my_list:           # not: if len(my_list) > 0
    process(my_list)

if not my_string:     # not: if my_string == ""
    my_string = "default"

if value:             # not: if value != None
    use(value)

# Exception: when None vs 0 matters
if value is not None:  # explicit None check
    process(value)`,
  },

  // Boolean Operators
  {
    section: 'Boolean Operators',
    signature: 'x and y',
    description: 'Returns x if x is falsy, otherwise y. Short-circuits: stops if first is false.',
    complexity: 'O(1)',
    example: `# Short-circuit evaluation
True and True    # True
True and False   # False
False and True   # False (never evaluates True)

# Returns actual values, not just True/False
5 and 3          # 3 (both truthy, returns last)
0 and 3          # 0 (first is falsy, returns it)
"" and "hi"      # "" (first is falsy)`,
  },
  {
    section: 'Boolean Operators',
    signature: 'x or y',
    description: 'Returns x if x is truthy, otherwise y. Short-circuits: stops if first is true.',
    complexity: 'O(1)',
    example: `# Short-circuit evaluation
True or False    # True (never evaluates False)
False or True    # True
False or False   # False

# Returns actual values
5 or 3           # 5 (first is truthy)
0 or 3           # 3 (first is falsy)
"" or "default"  # "default" (common pattern!)

# Default value pattern
name = user_input or "Anonymous"`,
  },
  {
    section: 'Boolean Operators',
    signature: 'not x',
    description: 'Returns True if x is falsy, False if x is truthy.',
    complexity: 'O(1)',
    example: `not True     # False
not False    # True
not 0        # True
not 1        # False
not ""       # True
not "hello"  # False
not []       # True
not [1, 2]   # False`,
  },
  {
    section: 'Boolean Operators',
    signature: 'Short-Circuit Patterns',
    description: 'Use short-circuit for safe access and defaults. Left side guards right side.',
    complexity: 'O(1)',
    example: `# Safe dictionary access
d = {}
value = d and d.get("key")  # {} (doesn't access key)

# Safe list access
lst = []
first = lst and lst[0]  # [] (no IndexError)

# Default values
name = user_name or "Guest"
port = config.get("port") or 8080

# Guard condition
if lst and lst[0] > 10:  # safe: checks lst first
    process(lst)`,
  },

  // Syntax Rules
  {
    section: 'Syntax Rules',
    signature: 'Indentation-Based Blocks',
    description: 'Python uses indentation (not braces) to define blocks. Consistent spaces required.',
    complexity: 'Concept',
    example: `# Correct indentation
if True:
    print("a")
    print("b")    # same block
    if True:
        print("c")  # nested block
    print("d")    # back to outer block

# IndentationError examples
if True:
print("wrong")    # not indented
  print("also wrong")  # inconsistent`,
  },
  {
    section: 'Syntax Rules',
    signature: 'Open-Pairs Rule',
    description: 'Code in (), [], {} can span multiple lines. Preferred way to handle long statements.',
    complexity: 'Concept',
    example: `# Long list
items = [
    "apple",
    "banana",
    "cherry",
]

# Long function call
result = some_function(
    arg1,
    arg2,
    kwarg=value,
)

# Long condition
if (condition1 and
    condition2 and
    condition3):
    do_something()`,
  },
  {
    section: 'Syntax Rules',
    signature: 'Docstrings',
    description: 'String at top of module/function/class stored in __doc__. Use triple quotes.',
    complexity: 'Concept',
    example: `def greet(name):
    """Return a greeting message.

    Args:
        name: The name to greet.

    Returns:
        A greeting string.
    """
    return f"Hello, {name}!"

print(greet.__doc__)  # prints docstring
help(greet)           # shows docstring`,
  },
]

import type { Method } from '../../types'

export const whyAndWhen: Method[] = [
  {
    section: 'Why & When',
    signature: 'Basic vs Sequence Assignment',
    description: 'Use sequence assignment for unpacking, swapping, or multiple return values. Use basic for single values.',
    complexity: 'Concept',
    example: `# BASIC ASSIGNMENT - single values
x = 42
name = "Alice"
is_valid = True

# SEQUENCE ASSIGNMENT - unpacking multiple values
x, y = 10, 20                    # coordinates
first, last = name.split()       # split strings
key, value = item.split("=")     # parse key-value

# SWAP without temp variable
a, b = b, a

# FUNCTION RETURNS multiple values
def get_stats(data):
    return min(data), max(data), sum(data)

min_val, max_val, total = get_stats([1, 2, 3])

# RULE: Use unpacking when you need multiple values at once`,
  },
  {
    section: 'Why & When',
    signature: 'When to Use * Unpacking',
    description: 'Use * to collect variable-length sequences. Common in function args, list slicing, ignoring values.',
    complexity: 'Concept',
    example: `# COLLECT remaining items
first, *rest = [1, 2, 3, 4, 5]
# first=1, rest=[2,3,4,5]

# IGNORE middle items
first, *_, last = [1, 2, 3, 4, 5]
# first=1, last=5 (ignore middle)

# FUNCTION with variable args
def process_batch(required, *optional):
    print(f"Required: {required}")
    print(f"Optional: {optional}")

process_batch(1, 2, 3, 4)  # optional=(2,3,4)

# SPLIT at position
head, *tail = path.split("/")  # head="usr", tail=["local","bin"]

# WARNING: * always creates list (even if empty!)
a, *b = [1]  # b=[] not b=None`,
  },
  {
    section: 'Why & When',
    signature: 'When Augmented Assignment Matters',
    description: 'Use += for efficiency and in-place modification. CRITICAL: += behaves differently for mutables vs immutables.',
    complexity: 'Concept',
    example: `# IMMUTABLE (int, str) - creates new object
x = 1
x += 1     # new int created, x rebound

s = "hello"
s += " world"  # new str created, s rebound

# MUTABLE (list, dict) - modifies in-place!
L = [1, 2]
M = L          # same object
L += [3]       # extends L in-place
print(M)       # [1, 2, 3] — M changed!

# PERFORMANCE: += avoids intermediate object
# Slower:
s = ""
for c in chars:
    s = s + c  # creates new string each iteration!

# Faster:
s = "".join(chars)  # one allocation

# WHEN TO USE +=:
# 1. Cleaner syntax (x += 1 vs x = x + 1)
# 2. Efficiency (evaluates left side once)
# 3. In-place modification (for lists)`,
  },
  {
    section: 'Why & When',
    signature: 'When to Use Walrus :=',
    description: 'Use := to avoid duplicate computation or to assign within expression. Python 3.8+ only.',
    complexity: 'Concept',
    example: `# WHILE LOOPS - assign and test
# Without walrus:
line = input()
while line != "quit":
    process(line)
    line = input()  # duplicate input() call

# With walrus:
while (line := input()) != "quit":
    process(line)  # cleaner, no duplication

# IF STATEMENTS - use value after test
# Without walrus:
result = expensive_function()
if result > threshold:
    print(f"Result: {result}")

# With walrus:
if (result := expensive_function()) > threshold:
    print(f"Result: {result}")

# COMPREHENSIONS - avoid duplicate calls
# Without walrus (calls func twice):
[func(x) for x in data if func(x) > 0]

# With walrus (calls func once):
[y for x in data if (y := func(x)) > 0]

# WHEN NOT TO USE:
# - Simple assignments (x = 5 not x := 5)
# - When it hurts readability
# - Python < 3.8`,
  },
  {
    section: 'Why & When',
    signature: 'Multiple Assignment Gotcha',
    description: 'a = b = [] creates shared reference. Safe for immutables, dangerous for mutables. Use separate assignments.',
    complexity: 'Concept',
    example: `# SAFE with immutables
a = b = c = 0
a += 1         # creates new int, only 'a' changes
print(b, c)    # 0 0

a = b = "x"
a += "y"       # creates new str, only 'a' changes
print(b)       # "x"

# DANGEROUS with mutables!
a = b = []     # SAME list object
a.append(1)
print(b)       # [1] — b changed too!

# SOLUTION: separate assignments
a, b = [], []  # different objects
a.append(1)
print(b)       # [] — b unchanged

# ALSO DANGEROUS:
def process(data=[]):  # shared default!
    data.append(1)
    return data

# CORRECT:
def process(data=None):
    data = data if data is not None else []
    data.append(1)
    return data

# RULE: Never use mutable defaults or multiple assignment for mutables`,
  },
]

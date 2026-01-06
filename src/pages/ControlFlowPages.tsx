import { TypePage } from '../components/TypePage'
import { fundamentalsMethods } from '../data/fundamentals'
import { statementsMethods } from '../data/statementsMethods'
import { conditionalsMethods } from '../data/conditionalsMethods'
import { conditionalPatternsMethods } from '../data/conditionalPatterns'
import { matchMethods } from '../data/match'
import { loopsMethods } from '../data/loopsMethods'
import { comprehensionsMethods } from '../data/comprehensions'
import { functionsMethods } from '../data/functions'
import { oopMethods } from '../data/oop'

const fundamentalsIntro = `Python's Object Model Foundation
Python's object model is the foundation for understanding EVERYTHING in the language. All data in Python is represented as objects—from simple integers to complex classes. The key insight: understanding Python's dynamic typing model, reference semantics, and garbage collection is critical for avoiding 90% of bugs and writing efficient code.

\`\`\`python
# DYNAMIC: No type declarations
x = 1        # x is int
x = "hello"  # x is now str — perfectly legal!

# STRONG: No silent type coercion
x = "1"
y = 1
z = x + y    # TypeError! No automatic conversion

# vs JavaScript (weak typing):
# "1" + 1 = "11" (silent coercion to string)
\`\`\`
---
Dynamic Typing with Strong Type Checking
Python tracks types at RUNTIME (dynamic)—no declarations needed. But operations ONLY work on compatible types (strong)—no silent coercion like JavaScript. \`"1" + 1\` raises TypeError, not \`"11"\`. This combination gives flexibility (any variable can hold any type) with safety (type errors caught immediately).

\`\`\`python
# THREE COMPONENTS OF PYTHON'S MODEL:

# 1. VARIABLES = Names in namespace (no type stored)
x = 42        # Variable 'x' created, references int(42)
x = "hello"   # 'x' now references str, perfectly legal

# 2. OBJECTS = Allocated memory with identity, type, value
# - Type NEVER changes after creation
# - Immutable: int, str, tuple, frozenset
# - Mutable: list, dict, set

# 3. REFERENCES = Automatic pointers
a = [1, 2, 3]
b = a         # b references SAME list (not a copy!)
b.append(4)
print(a)      # [1, 2, 3, 4] — same object!

# CHECK TYPE AT RUNTIME
type(42)        # <class 'int'>
isinstance(42, int)  # True
\`\`\`
---
Reference Semantics and Common Pitfalls
Assignment creates references, NOT copies. Multiple names can reference same object. Use \`is\` for identity (same object), \`==\` for equality (same value). Mutable default arguments are shared across calls—use None instead.

\`\`\`python
# IS vs == - Identity vs Equality
a = [1, 2, 3]
b = [1, 2, 3]
a == b        # True (same value)
a is b        # False (different objects)

c = a
c is a        # True (same object)

# MUTABLE DEFAULT ARGUMENT GOTCHA
def bad(L=[]):      # BUG! [] created ONCE
    L.append(1)
    return L

bad()  # [1]
bad()  # [1, 1] — Same list!

def good(L=None):   # CORRECT
    if L is None:
        L = []
    L.append(1)
    return L

good()  # [1]
good()  # [1] — New list each time

# SHALLOW VS DEEP COPY
import copy
original = [[1, 2], [3, 4]]
shallow = original.copy()     # Copies outer list only
deep = copy.deepcopy(original)  # Copies everything

shallow[0].append(99)
print(original)  # [[1, 2, 99], [3, 4]] — nested lists shared!

deep[0].append(99)
print(original)  # [[1, 2], [3, 4]] — independent
\`\`\`
`
export function FundamentalsPage() {
  return (
    <TypePage
      type="Python Fundamentals" badge="py" color="var(--accent-functions)"
      description="Core concepts: dynamic typing, strong typing, polymorphism. Understanding Python's object model and type categories."
      intro={fundamentalsIntro}
      methods={fundamentalsMethods}
    />
  )
}

const statementsIntro = `Statements bind names to objects and control program flow. The key insight: assignment in Python creates references, not copies. Understanding this reference semantics is foundational—it explains 90% of Python gotchas and bugs.

ASSIGNMENT CREATES REFERENCES, NOT COPIES. When you write \`a = b\`, you're creating a new reference to the same object, not copying the object. For immutable objects (int, str, tuple), this distinction doesn't matter because you can't modify them. For mutable objects (list, dict, set), this is CRITICAL—changes through one reference affect ALL references.

\`\`\`python
# Reference semantics visualization
a = [1, 2, 3]        # a → [1, 2, 3]
b = a                # b → [1, 2, 3] (SAME object!)
b.append(4)          # Modifies the shared object
print(a)             # [1, 2, 3, 4] — a sees the change!

# vs creating a copy
a = [1, 2, 3]
b = a[:]             # b → [1, 2, 3] (NEW object, copy)
b.append(4)
print(a)             # [1, 2, 3] — a unchanged
\`\`\`python

ASSIGNMENT SEMANTICS DEEP DIVE: Python's assignment statement \`=\` binds a name to an object. The right side is evaluated first, then the result is bound to names on the left. This evaluation order matters for swap operations and multiple assignments.

Multiple Assignment Shared Reference: \`a = b = c = []\` creates ONE list object with THREE names pointing to it. Any modification through a, b, or c affects the shared object. This is dangerous for mutable defaults and shared state. Safe for immutables: \`x = y = z = 0\` is fine because integers can't be modified.

\`\`\`python
# DANGEROUS: Multiple assignment with mutable
a = b = c = []       # ONE list, THREE names
a.append(1)          # Modifies shared list
print(b, c)          # [1] [1] — all three see changes!

# SAFE: Multiple assignment with immutable
x = y = z = 0        # THREE integer objects (small int caching)
x += 1               # Creates NEW integer object
print(y, z)          # 0 0 — y and z unchanged
\`\`\`python

Augmented Assignment Behavior: Augmented operators (\`+=\`, \`*=\`, etc.) behave differently for mutables vs immutables. For immutables, \`x += 1\` creates a new object. For mutables, \`L += [3]\` modifies in-place—this matters when you have shared references!

\`\`\`python
# Immutable: += creates NEW object
x = 1
y = x
x += 1               # x now points to NEW integer object 2
print(x, y)          # 2 1 — y still points to old object

# Mutable: += modifies IN-PLACE
L = [1, 2]
M = L                # M and L point to SAME list
L += [3]             # Extends L in-place
print(M)             # [1, 2, 3] — M sees the change!

# vs creating new list
L = [1, 2]
M = L
L = L + [3]          # Creates NEW list, rebinds L
print(M)             # [1, 2] — M still points to old list
\`\`\`python

String Concatenation Performance Trap: Building strings with \`+=\` in a loop is O(n²) because strings are immutable—each \`+=\` creates a new string and copies all characters. Use \`"".join()\` for O(n) performance.

\`\`\`python
# O(n²) — SLOW for large N (creates n new strings!)
s = ""
for char in "abcdefg" * 1000:
    s += char        # Each iteration: copy all previous chars + new char

# O(n) — FAST (one allocation, one copy)
chars = []
for char in "abcdefg" * 1000:
    chars.append(char)
s = "".join(chars)   # Single allocation and copy

# Even better: join directly
s = "".join("abcdefg" * 1000)
\`\`\`python

WALRUS OPERATOR MASTERY (:= Assignment Expression): Python 3.8+ adds the walrus operator \`:=\` which assigns AND returns a value in a single expression. This eliminates duplicate function calls and makes code more concise—but use sparingly for readability.

Walrus in While Loops: Avoid duplicate \`input()\` calls by combining assignment and test.

\`\`\`python
# Before: duplicate input() calls
line = input()
while line != "quit":
    process(line)
    line = input()   # Duplicate!

# With walrus: single input() call
while (line := input()) != "quit":
    process(line)
\`\`\`python

Walrus in If Statements: Avoid duplicate expensive function calls.

\`\`\`python
# Before: duplicate expensive_func() call
if expensive_func(data) > threshold:
    result = expensive_func(data)  # Called AGAIN!
    print(f"Result: {result}")

# With walrus: single call
if (result := expensive_func(data)) > threshold:
    print(f"Result: {result}")
\`\`\`python

Walrus in Comprehensions: Call function once instead of twice when filtering.

\`\`\`python
# Before: calls func(x) TWICE per item
[func(x) for x in data if func(x) > 0]

# With walrus: calls func(x) ONCE per item
[y for x in data if (y := func(x)) > 0]
\`\`\`python

When NOT to Use Walrus: Don't sacrifice readability for brevity. Walrus is powerful but can make code harder to understand. Use for clear wins (eliminating duplicates), avoid for marginal gains. Also, Python < 3.8 doesn't support it.

SEQUENCE UNPACKING PATTERNS: Python's tuple unpacking is powerful and goes far beyond simple \`a, b = 1, 2\`. Extended unpacking with \`*\` collects remaining items into a list.

Extended Unpacking with \`*\`: The \`*\` operator collects "rest" items into a list. It ALWAYS creates a list, even if there are zero items left!

\`\`\`python
# Basic extended unpacking
first, *rest = [1, 2, 3, 4, 5]
# first = 1, rest = [2, 3, 4, 5]

# * at different positions
*head, last = [1, 2, 3, 4, 5]
# head = [1, 2, 3, 4], last = 5

first, *middle, last = [1, 2, 3, 4, 5]
# first = 1, middle = [2, 3, 4], last = 5

# * ALWAYS creates list (even empty!)
a, *b = [1]
# a = 1, b = [] (empty list!)

*x, y = [1]
# x = [], y = 1
\`\`\`python

Nested Unpacking: You can unpack nested structures in one statement.

\`\`\`python
# Nested tuple unpacking
(a, b), (c, d) = [(1, 2), (3, 4)]
# a=1, b=2, c=3, d=4

# Practical: destructuring function returns
def get_stats(data):
    return min(data), max(data), sum(data)

mn, mx, total = get_stats([1, 2, 3, 4, 5])
\`\`\`python

Ignoring Values with \`_\`: Use underscore to indicate "I don't care about this value."

\`\`\`python
# Ignore specific values
first, _, third = (1, 2, 3)

# Ignore multiple with *_
first, *_, last = [1, 2, 3, 4, 5, 6, 7]
# first = 1, last = 7 (middle values discarded)
\`\`\`python

EXPRESSION STATEMENTS: Any expression can be a statement—the result is simply discarded. This is common for function/method calls with side effects.

In-Place Method Gotcha: Many list methods modify in-place and return \`None\`. Assigning the result loses your list!

\`\`\`python
# WRONG — L becomes None!
L = [3, 1, 2]
L = L.sort()         # sort() returns None!
print(L)             # None — list is lost!

# CORRECT — sort modifies in-place
L = [3, 1, 2]
L.sort()             # Modifies L in-place
print(L)             # [1, 2, 3]
\`\`\`python

Methods that Return \`None\` vs New Objects: Know which methods modify in-place (return None) vs return new objects.

\`\`\`python
# In-place (return None):
L.sort()             # Sorts L in-place
L.reverse()          # Reverses L in-place
L.append(4)          # Adds to L
L.extend([5, 6])     # Adds to L
L.remove(3)          # Removes from L
L.clear()            # Empties L

# Return new object:
sorted(L)            # Returns NEW sorted list
reversed(L)          # Returns NEW reversed iterator
L + [4]              # Returns NEW concatenated list
L * 2                # Returns NEW repeated list
\`\`\`python

PRINT FUNCTION ADVANCED: \`print(*objects, sep=' ', end='\\n', file=sys.stdout, flush=False)\` is more powerful than it looks.

Parameters: Control output formatting with \`sep\`, \`end\`, and \`file\`.

\`\`\`python
# Custom separator
print("a", "b", "c", sep="-")     # a-b-c

# Suppress newline
print("loading", end="")          # No newline after
print("...", end="")              # Prints on same line
print("done")                     # loading...done

# Print to file
with open("log.txt", "w") as f:
    print("logged message", file=f)

# Print to stderr
import sys
print("error!", file=sys.stderr)
\`\`\`python

f-string Debug Mode (3.8+): Use \`=\` specifier to print variable name and value.

\`\`\`python
x = 10
y = 20
print(f"{x=}, {y=}")             # x=10, y=20

# Combines with format specs
print(f"{x=:.2f}")               # x=10.00
\`\`\`python

VARIABLE NAMING CONVENTIONS: Python has naming conventions that signal intent.

Underscore Conventions:

\`\`\`python
# Single leading _: "internal use" (not enforced, just convention)
_internal_helper = 42

# Double leading __: name mangling in classes
class Foo:
    def __init__(self):
        self.__private = 1   # Mangled to _Foo__private

# Double leading and trailing __: system-defined (dunder methods)
__init__, __str__, __add__       # Reserved for Python

# Single _: throwaway variable
for _ in range(3):               # Loop doesn't use counter
    print("hello")

first, _, third = (1, 2, 3)      # Don't care about middle value
\`\`\`python

COMMON GOTCHAS AND INTERVIEW TRAPS: These patterns cause bugs and appear in interviews.

Mutable Default Arguments: The default value is created ONCE when the function is defined, not each time it's called. Mutable defaults are SHARED across all calls!

\`\`\`python
# WRONG — default list SHARED across calls!
def append_to(element, lst=[]):
    lst.append(element)
    return lst

print(append_to(1))              # [1]
print(append_to(2))              # [1, 2] — SURPRISE!
print(append_to(3))              # [1, 2, 3] — same list!

# CORRECT — use None sentinel
def append_to(element, lst=None):
    if lst is None:
        lst = []                 # New list each call
    lst.append(element)
    return lst

# Or with walrus (3.8+)
def append_to(element, lst=None):
    lst = lst or []              # Convert None to []
    lst.append(element)
    return lst
\`\`\`python

Chained Assignment Creates Shared References: This is the multiple assignment gotcha—all names point to ONE object.

\`\`\`python
# DANGEROUS with mutables
a = b = c = []
a.append(1)
print(b, c)                      # [1] [1] — shared!

# SAFE: create separate lists
a, b, c = [], [], []
a.append(1)
print(b, c)                      # [] [] — separate objects
\`\`\`python

Augmented Assignment on Shared References: \`+=\` modifies in-place for mutables, affecting all references.

\`\`\`python
L = [1, 2]
M = L                            # Shared reference
L += [3]                         # Modifies in-place
print(M)                         # [1, 2, 3] — M sees change!

# To avoid: create new list
L = [1, 2]
M = L
L = L + [3]                      # Creates new list
print(M)                         # [1, 2] — M unchanged
\`\`\``

export function StatementsPage() {
  return (
    <TypePage
      type="Statements" badge="=" color="var(--accent-none)"
      description="Assignment forms, variable naming, expression statements, and print operations. The building blocks of Python programs."
      intro={statementsIntro}
      methods={statementsMethods}
    />
  )
}

const conditionalsIntro = `Conditionals control program flow through decision-making. Python's if/elif/else, truthiness, short-circuit evaluation, and ternary expressions form the foundation of all branching logic. The key insight: master guard clauses and early returns to reduce nesting, understand truthiness to write Pythonic code, and leverage short-circuit evaluation for both safety and performance.

EARLY RETURNS AND GUARD CLAUSES. The most common conditional anti-pattern is deep nesting. Instead of nesting if statements inside if statements, use guard clauses—validate inputs at the top, return early on failure, and let the happy path flow without indentation. This pattern improves readability, reduces cognitive load, and makes bugs more obvious.

\`\`\`python
# ANTI-PATTERN: Deep nesting
def process(data):
    if data:
        if data.is_valid():
            if data.has_permission():
                return data.process()
            else:
                raise PermissionError()
        else:
            raise ValueError()
    else:
        raise TypeError()

# BETTER: Guard clauses with early returns
def process(data):
    if not data:
        raise TypeError("Data required")
    if not data.is_valid():
        raise ValueError("Invalid data")
    if not data.has_permission():
        raise PermissionError("Permission denied")

    return data.process()  # Happy path at lowest indent level
\`\`\`python

TRUTHINESS DEEP DIVE: Python's truthiness system enables elegant, idiomatic code—but also introduces subtle bugs. Understanding what's truthy vs falsy is CRITICAL for interviews and production code.

Falsy Values (8 total):
- \`False\` — boolean false
- \`None\` — null/nothing
- \`0\` — integer zero
- \`0.0\` — float zero
- \`""\` — empty string
- \`[]\` — empty list
- \`{}\` — empty dict
- \`()\` — empty tuple
- \`set()\` — empty set

EVERYTHING ELSE IS TRUTHY: Non-empty collections, non-zero numbers, all objects (by default).

\`\`\`python
# GOTCHA: 0 and "" are falsy but might be VALID data!
user_input = input("Enter age: ")  # User enters "0"
age = int(user_input)  # age = 0

# WRONG: Treats 0 as missing data
if age:
    print(f"Age: {age}")
else:
    print("No age provided")  # BUG: This runs for age=0!

# RIGHT: Explicit None check
if age is not None:
    print(f"Age: {age}")  # Correctly handles 0
else:
    print("No age provided")

# GOTCHA: Empty string is falsy
search = ""  # Valid: search for empty string
if search:  # WRONG: treats "" as missing
    results = find(search)
# RIGHT: Use is not None or explicitly check != ""
\`\`\`python

Custom Truthiness with \`__bool__\` or \`__len__\`:

\`\`\`python
class ShoppingCart:
    def __init__(self):
        self.items = []

    def __bool__(self):
        # Cart is truthy if it has items
        return len(self.items) > 0

cart = ShoppingCart()
if cart:  # False, uses __bool__
    checkout(cart)

cart.items.append("item")
if cart:  # True now
    checkout(cart)
\`\`\`python

SHORT-CIRCUIT EVALUATION MASTERY: Understanding short-circuit logic is essential for writing safe, performant Python code. \`and\` and \`or\` don't just return True/False—they return the actual values that determined the result.

How \`and\` Works:
1. Evaluate left operand
2. If falsy → return it (don't evaluate right)
3. If truthy → return right operand

How \`or\` Works:
1. Evaluate left operand
2. If truthy → return it (don't evaluate right)
3. If falsy → return right operand

\`\`\`python
# and returns first falsy or last value
result = 1 and 2 and 3  # → 3 (all truthy, returns last)
result = 1 and 0 and 3  # → 0 (first falsy)
result = [] and "hello"  # → [] (first falsy)

# or returns first truthy or last value
result = 0 or 1 or 2  # → 1 (first truthy)
result = 0 or "" or []  # → [] (all falsy, returns last)
result = False or 0 or "x"  # → "x" (first truthy)

# PRACTICAL: Default values
name = user_input or "Guest"  # If user_input is "", use "Guest"
count = config.get("count") or 10  # If missing/None, use 10

# GOTCHA: Watch for 0 being falsy!
timeout = config.get("timeout") or 30  # BUG if timeout=0 is valid!
# FIX: Use explicit None check
timeout = 30 if config.get("timeout") is None else config.get("timeout")
# OR: Use dict.get() default parameter
timeout = config.get("timeout", 30)  # Better!
\`\`\`python

Short-Circuit for Safety and Performance:

\`\`\`python
# NULL SAFETY: Check before access
if user and user.is_admin():  # If user is None, short-circuits!
    grant_access()

# AVOID ERRORS: Check before division
if denominator != 0 and numerator / denominator > 1:
    do_something()

# PERFORMANCE: Put cheap checks first
if is_cached(key) and expensive_validation(key):
    # expensive_validation() only runs if is_cached() is True
    use_cached(key)

# AVOID EXPENSIVE CALLS: Check likely-false first
if user.age < 13 and slow_database_check(user):
    # Most users age >= 13, avoid DB call
    restrict_content()
\`\`\`python

TERNARY EXPRESSION: Python's compact conditional assignment. Use for simple value selection—NEVER nest ternary expressions!

Syntax: \`value_if_true if condition else value_if_false\`

\`\`\`python
# GOOD: Simple value assignment
status = "active" if user.logged_in else "inactive"
max_val = a if a > b else b
message = "Even" if n % 2 == 0 else "Odd"

# ACCEPTABLE: With simple logic
price = base_price * 0.9 if is_member else base_price
result = value if value is not None else default

# BAD: Nested ternary (unreadable!)
x = a if cond1 else b if cond2 else c if cond3 else d  # NO!

# BETTER: Use if/elif for multiple conditions
if cond1:
    x = a
elif cond2:
    x = b
elif cond3:
    x = c
else:
    x = d
\`\`\`python

When to Use Ternary:
- - Simple value assignment based on one condition
- - Default value selection
- - Fits on one readable line
- - NEVER nest ternary expressions
- - Complex logic (use if/else instead)
- - Side effects (use if/else for clarity)

DICTIONARY DISPATCH: Replace long if/elif chains with O(1) dictionary lookups when you have simple value-to-value or value-to-function mappings.

\`\`\`python
# SLOW: O(n) if/elif chain
def get_day_name(day_num):
    if day_num == 0:
        return "Monday"
    elif day_num == 1:
        return "Tuesday"
    elif day_num == 2:
        return "Wednesday"
    # ... 4 more elif clauses

# FAST: O(1) dictionary lookup
DAYS = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}

def get_day_name(day_num):
    return DAYS.get(day_num, "Invalid")  # O(1) with default

# Function dispatch pattern
def add(x, y): return x + y
def sub(x, y): return x - y
def mul(x, y): return x * y
def div(x, y): return x / y if y != 0 else None

OPERATIONS = {"+": add, "-": sub, "*": mul, "/": div}

def calculate(x, op, y):
    func = OPERATIONS.get(op)
    if func:
        return func(x, y)
    else:
        raise ValueError(f"Unknown operation: {op}")

# Usage
result = calculate(10, "+", 5)  # → 15
\`\`\`python

When to Use Dict Dispatch:
- - 5+ simple equality branches
- - Value-to-value mapping
- - Function/method dispatch
- - Static mappings (days, months, status codes)
- - Complex conditions (different variables)
- - Range checks (use if/elif)
- - Pattern matching (use match in 3.10+)

GUARD CLAUSES AND EARLY RETURNS: The most important conditional pattern for writing readable, maintainable code. Validate inputs early, fail fast, keep happy path at lowest indentation.

\`\`\`python
# ANTI-PATTERN: Arrow code (deep nesting)
def withdraw(account, amount):
    if account:
        if account.is_active:
            if account.balance >= amount:
                if amount > 0:
                    account.balance -= amount
                    return True
                else:
                    return False
            else:
                return False
        else:
            return False
    else:
        return False

# BETTER: Guard clauses
def withdraw(account, amount):
    # Validate inputs (fail fast)
    if not account:
        return False
    if not account.is_active:
        return False
    if amount <= 0:
        return False
    if account.balance < amount:
        return False

    # Happy path at lowest indent
    account.balance -= amount
    return True
\`\`\`python

Guard Clause Benefits:
- Reduces cognitive load (no deep nesting)
- Makes validation explicit and obvious
- Happy path flows naturally
- Easier to add new validations
- Bugs stand out (missing validations obvious)

COMMON PATTERNS FOR INTERVIEWS:

Chained Comparisons:
\`\`\`python
# Instead of: x > 1 and x < 10
if 1 < x < 10:  # Pythonic!
    process(x)

# Works with any operators
if a == b == c:  # All equal
if x <= y < z:  # Mixed operators
\`\`\`python

all() and any() for Collections:
\`\`\`python
# all(): True if ALL elements truthy (short-circuits on first False)
if all(x > 0 for x in numbers):
    print("All positive")

# any(): True if ANY element truthy (short-circuits on first True)
if any(x < 0 for x in numbers):
    print("Has negative")

# Empty iterables
all([])  # → True (vacuous truth)
any([])  # → False
\`\`\`python

Membership Testing with \`in\`:
\`\`\`python
# String contains
if "error" in log_message:
    handle_error()

# Collection membership
if user_id in admin_ids:  # O(1) for sets, O(n) for lists!
    grant_admin()

# Dict keys
if "name" in user_dict:
    print(user_dict["name"])
\`\`\`python

WHEN TO USE WHAT: Decision matrix for choosing the right conditional construct.

Use **if/elif/else** when:
- Different variables in conditions
- Complex boolean logic (and/or/not)
- Range checks or comparisons
- Conditions involve different values
- Most flexible, always works

Use **ternary** when:
- Simple value assignment
- One condition, fits on one line
- Readability maintained
- NEVER nest ternary expressions!

Use **dict dispatch** when:
- 5+ simple equality branches
- Value-to-value or value-to-function mapping
- O(1) lookup performance matters
- Static/known mapping

Use **match** (3.10+) when:
- Same value with structural patterns
- Destructuring sequences/dicts/classes
- Pattern matching with guards
- Type-based dispatch

Use **all()/any()** when:
- Checking collection properties
- "All elements satisfy X"
- "At least one element satisfies X"

COMMON GOTCHAS AND MISTAKES:

1. Zero and empty string are falsy but might be valid data
2. Short-circuit can skip needed side effects
3. Nested ternary expressions are unreadable
4. \`or\` for defaults fails when 0/False are valid values
5. Dict dispatch can't handle complex conditions
6. Deep nesting (arrow code) is hard to maintain
7. Forgetting that \`and\`/\`or\` return values, not just True/False`

export function ConditionalsPage() {
  return (
    <TypePage
      type="Conditionals" badge="if" color="var(--accent-none)"
      description="Selection and branching with if, ternary expressions, and boolean logic. Dictionary dispatch for cleaner multi-way branching."
      intro={conditionalsIntro}
      methods={conditionalsMethods}
    />
  )
}

const conditionalPatternsIntro = `Performance and design patterns for Python conditional logic. Understanding when to use if-elif vs dict dispatch vs match, how to apply short-circuit evaluation, and advanced patterns like Strategy and State Machines can dramatically improve code quality, performance, and maintainability. The key insight: choose the right tool based on complexity and performance needs—O(1) dict dispatch beats O(n) if-elif for value mapping, Strategy pattern beats if-elif explosion for behavior selection.

COMPLEXITY DRIVES CHOICE. Simple condition? if/elif. 5+ value mappings? Dict dispatch. Patterns + destructuring? match (3.10+). Multiple behaviors? Strategy pattern. State transitions? State machine. The decision isn't about syntax preference—it's about algorithmic complexity and maintainability.

DICTIONARY DISPATCH DEEP DIVE: Replace O(n) if-elif chains with O(1) hash table lookups when you have simple value-to-value or value-to-function mappings.

\`\`\`python
# ANTI-PATTERN: O(n) if-elif chain for value mapping
def get_http_message(status_code):
    if status_code == 200:
        return "OK"
    elif status_code == 201:
        return "Created"
    elif status_code == 400:
        return "Bad Request"
    elif status_code == 401:
        return "Unauthorized"
    elif status_code == 403:
        return "Forbidden"
    elif status_code == 404:
        return "Not Found"
    elif status_code == 500:
        return "Internal Server Error"
    else:
        return "Unknown"
    # Worst case: 8 comparisons for status 500

# BETTER: O(1) dict dispatch
HTTP_MESSAGES = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
}

def get_http_message(status_code):
    return HTTP_MESSAGES.get(status_code, "Unknown")  # Always 1 lookup!
\`\`\`python

Function Dispatch Pattern: Map values to functions for behavior selection.

\`\`\`python
# Calculator with function dispatch
def add(x, y): return x + y
def subtract(x, y): return x - y
def multiply(x, y): return x * y
def divide(x, y): return x / y if y != 0 else float('inf')

OPERATIONS = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
}

def calculate(x, operator, y):
    operation = OPERATIONS.get(operator)
    if operation is None:
        raise ValueError(f"Unknown operator: {operator}")
    return operation(x, y)

# Usage: O(1) dispatch
result = calculate(10, '+', 5)  # → 15
result = calculate(10, '/', 2)  # → 5.0
\`\`\`python

Lazy Evaluation with Lambdas:

\`\`\`python
# Problem: All functions executed upfront
def process(action):
    handlers = {
        'save': expensive_save(),      # WRONG: Called immediately!
        'load': expensive_load(),      # WRONG: Called immediately!
        'delete': expensive_delete(),  # WRONG: Called immediately!
    }
    return handlers.get(action, lambda: None)

# Solution: Lambdas defer execution
def process(action):
    handlers = {
        'save': lambda: expensive_save(),      # Lazy: called only if selected
        'load': lambda: expensive_load(),      # Lazy: called only if selected
        'delete': lambda: expensive_delete(),  # Lazy: called only if selected
    }
    handler = handlers.get(action, lambda: None)
    return handler()  # Execute the selected function
\`\`\`python

When to Use Dict Dispatch:
- - 5+ simple equality branches (value == constant)
- - Value-to-value or value-to-function mapping
- - Static/known mapping (HTTP codes, months, operations)
- - O(1) performance critical
- - Complex conditions (ranges, boolean logic)
- - Different variables in conditions
- - Pattern matching (use match instead)

SHORT-CIRCUIT EVALUATION PATTERNS: Put cheap/likely-false conditions first to maximize short-circuit benefits. This is both a performance optimization AND a safety pattern.

\`\`\`python
# PERFORMANCE: Cheap check first
# 99% of users are NOT admins, check age first
if user.age >= 18 and expensive_admin_check(user):
    grant_access()

# WRONG: Expensive check first
if expensive_admin_check(user) and user.age >= 18:
    grant_access()  # Wastes time checking admin status for minors

# SAFETY: Null check first
if user and user.is_authenticated():  # Safe: short-circuits if user is None
    show_dashboard()

# NULL POINTER PREVENTION
if collection and len(collection) > 0:
    process(collection[0])

# DIVISION BY ZERO PREVENTION
if denominator != 0 and numerator / denominator > threshold:
    proceed()
\`\`\`python

Ordering Strategy for AND chains:
1. Null/existence checks first
2. Cheap attribute/field checks
3. Expensive function calls last
4. Put likely-to-fail conditions first

\`\`\`python
# OPTIMIZED ORDER
if (cache_available and           # 1. Cheap field check
    key in cache and              # 2. O(1) membership
    validate_cache_entry(key) and # 3. Expensive validation
    decrypt_entry(key)):          # 4. Most expensive
    use_cached(key)
\`\`\`python

STRATEGY PATTERN: Eliminate if-elif explosion by mapping conditions to behavior objects. Use when you have multiple algorithms/behaviors that vary by some condition.

\`\`\`python
# ANTI-PATTERN: if-elif explosion for behaviors
class PaymentProcessor:
    def process(self, payment_type, amount):
        if payment_type == "credit_card":
            # 20 lines of credit card logic
            validate_card()
            charge_card()
            send_receipt()
        elif payment_type == "paypal":
            # 20 lines of PayPal logic
            validate_paypal()
            charge_paypal()
            send_receipt()
        elif payment_type == "bitcoin":
            # 20 lines of Bitcoin logic
            validate_bitcoin()
            charge_bitcoin()
            send_receipt()
        # Adding new payment type = modify this function!

# BETTER: Strategy Pattern with dict dispatch
class CreditCardStrategy:
    def process(self, amount):
        validate_card()
        charge_card()
        send_receipt()

class PayPalStrategy:
    def process(self, amount):
        validate_paypal()
        charge_paypal()
        send_receipt()

class BitcoinStrategy:
    def process(self, amount):
        validate_bitcoin()
        charge_bitcoin()
        send_receipt()

PAYMENT_STRATEGIES = {
    "credit_card": CreditCardStrategy(),
    "paypal": PayPalStrategy(),
    "bitcoin": BitcoinStrategy(),
}

class PaymentProcessor:
    def process(self, payment_type, amount):
        strategy = PAYMENT_STRATEGIES.get(payment_type)
        if strategy is None:
            raise ValueError(f"Unknown payment type: {payment_type}")
        return strategy.process(amount)
        # Adding new payment type = add new strategy class + dict entry!
\`\`\`python

Strategy Pattern Benefits:
- Each strategy is isolated (easier to test)
- Adding new strategy doesn't modify existing code (Open/Closed Principle)
- O(1) dispatch instead of O(n) if-elif
- Clear separation of concerns
- Easy to add new behaviors

STATE MACHINE PATTERN: Use nested dictionaries to represent state transitions cleanly. Better than if-elif spaghetti for complex state management.

\`\`\`python
# ANTI-PATTERN: if-elif spaghetti for state management
class TrafficLight:
    def __init__(self):
        self.state = "RED"

    def change(self):
        if self.state == "RED":
            self.state = "GREEN"
        elif self.state == "GREEN":
            self.state = "YELLOW"
        elif self.state == "YELLOW":
            self.state = "RED"

# BETTER: State machine with transition table
class TrafficLight:
    TRANSITIONS = {
        "RED": "GREEN",
        "GREEN": "YELLOW",
        "YELLOW": "RED",
    }

    def __init__(self):
        self.state = "RED"

    def change(self):
        self.state = self.TRANSITIONS[self.state]

# ADVANCED: Event-driven state machine
class Document:
    TRANSITIONS = {
        "draft": {
            "submit": "pending_review",
            "delete": "deleted",
        },
        "pending_review": {
            "approve": "published",
            "reject": "draft",
            "delete": "deleted",
        },
        "published": {
            "unpublish": "draft",
            "archive": "archived",
        },
        "archived": {
            "restore": "published",
        },
        "deleted": {},  # Terminal state
    }

    def __init__(self):
        self.state = "draft"

    def transition(self, event):
        if event not in self.TRANSITIONS[self.state]:
            raise ValueError(f"Invalid transition: {event} from {self.state}")
        self.state = self.TRANSITIONS[self.state][event]
        return self.state

# Usage
doc = Document()
doc.transition("submit")      # draft → pending_review
doc.transition("approve")     # pending_review → published
doc.transition("archive")     # published → archived
# doc.transition("delete")    # ValueError! Can't delete from archived
\`\`\`python

State Machine Benefits:
- All transitions visible in one place
- Impossible transitions explicitly prevented
- Easy to visualize state diagram
- Adding states/transitions is straightforward
- No nested if statements

PERFORMANCE BENCHMARKS: Real numbers show when each pattern wins.

If-elif Performance (worst case):
- 2 branches: ~10ns per call
- 5 branches: ~25ns per call
- 10 branches: ~50ns per call
- 20 branches: ~100ns per call
- O(n) linear: doubles with branches

Dict Dispatch Performance:
- Any number of branches: ~20ns per call
- O(1) constant: doesn't scale with branches
- 10x faster than 20-branch if-elif

Match Performance (3.10+):
- Literal patterns: ~15ns (O(1) jump table)
- Sequence patterns: ~30-50ns (O(n) in pattern size)
- With guards: Sequential O(n) pattern evaluation

Practical Threshold:
- < 3 branches: if-elif is fine (clearest)
- 3-4 branches: if-elif still okay
- 5+ branches: dict dispatch wins
- Patterns + destructuring: match (3.10+)
- Complex behaviors: Strategy pattern

LOOKUP TABLE PATTERN: Precompute complex calculations and store in dict/list for O(1) retrieval.

\`\`\`python
# SLOW: Calculate every time
def is_prime_slow(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# FAST: Precompute lookup table
PRIMES_UNDER_1000 = {2, 3, 5, 7, 11, 13, ...}  # Precomputed set

def is_prime_fast(n):
    if n >= 1000:
        return is_prime_slow(n)
    return n in PRIMES_UNDER_1000  # O(1) lookup!

# Month names lookup
MONTHS = {
    1: "January", 2: "February", 3: "March",
    4: "April", 5: "May", 6: "June",
    7: "July", 8: "August", 9: "September",
    10: "October", 11: "November", 12: "December"
}

def month_name(month_num):
    return MONTHS.get(month_num, "Invalid")  # O(1) vs if-elif O(n)
\`\`\`python

DECISION MATRIX FOR INTERVIEWS: When the interviewer asks "how would you implement X?" choose the right pattern.

| Scenario | Best Pattern | Why |
|----------|--------------|-----|
| HTTP status → message | Dict dispatch | Value mapping, O(1) |
| Calculator (+, -, *, /) | Dict of functions | Behavior mapping |
| Traffic light states | State machine | Clear transitions |
| Multiple payment types | Strategy pattern | Isolate behaviors |
| 2-3 simple conditions | if-elif | Simplest, clearest |
| Data validation | Guard clauses | Fail fast, flat code |
| Command parser | match (3.10+) | Pattern + destructure |
| Null safety checks | Short-circuit | Prevent errors |

BEST PRACTICES SUMMARY:

1. Use dict dispatch for 5+ simple value mappings (O(1) vs O(n))
2. Use Strategy pattern when if-elif exceeds ~50 lines
3. Use State machines for complex state transitions
4. Use match for structural patterns (3.10+ only)
5. Use guard clauses to reduce nesting
6. Put cheap/likely-false conditions first in AND chains
7. Precompute lookup tables for repeated calculations
8. Choose simplest pattern that solves the problem—don't over-engineer!`

export function ConditionalPatternsPage() {
  return (
    <TypePage
      type="Selection Patterns" badge="O(1)" color="var(--accent-none)"
      description="Performance comparisons and best practices: if-elif vs dict vs match, short-circuit evaluation, when to use ternary."
      intro={conditionalPatternsIntro}
      methods={conditionalPatternsMethods}
    />
  )
}

const matchIntro = `Pattern Matching (Python 3.10+) brings structural pattern matching to Python—more powerful than switch statements. Match combines destructuring, type dispatch, and guards in one elegant syntax. The key insight: use match when you're checking ONE value against multiple structural patterns, use if/elif when you're checking DIFFERENT conditions.

MATCH FOR PATTERNS, IF FOR CONDITIONS. Match excels at destructuring and structural matching (sequences, dicts, classes). If/elif excels at boolean logic with different variables. The decision: same value + patterns → match, different conditions → if/elif.

\`\`\`python
# MATCH: same value, structural patterns
match response:
    case {"status": "ok", "data": d}:
        return d
    case {"status": "error", "message": msg}:
        raise Exception(msg)

# IF/ELIF: different conditions, boolean logic
if user.is_admin() and user.is_active():
    grant_access()
elif user.is_guest():
    limited_access()
\`\`\`python

PYTHON 3.10+ ONLY REQUIREMENT: Match statements are a Python 3.10+ feature. Code using match will raise SyntaxError on Python 3.9 or earlier. Check version with \`python --version\` or use if/elif fallback for backwards compatibility.

\`\`\`python
import sys
if sys.version_info < (3, 10):
    # Fallback to if/elif for older Python
    if status == 200:
        handle_ok()
    elif status == 404:
        handle_not_found()
else:
    # Use match on 3.10+
    match status:
        case 200: handle_ok()
        case 404: handle_not_found()
\`\`\`python

PATTERN TYPES COMPREHENSIVE: Match supports multiple pattern types, each with different semantics and performance characteristics.

Literal Patterns: Match exact values (numbers, strings, booleans, None). Optimized to O(1) hash lookup for simple literals.

\`\`\`python
match status:
    case 200:
        return "OK"
    case 404:
        return "Not Found"
    case 500:
        return "Internal Error"
    case _:                # Wildcard (default)
        return "Unknown"
\`\`\`python

Sequence Patterns: Match sequences (lists, tuples) and destructure elements. Length must match exactly unless using \`*rest\`.

\`\`\`python
match point:
    case (0, 0):
        print("Origin")
    case (0, y):
        print(f"Y-axis at {y}")
    case (x, 0):
        print(f"X-axis at {x}")
    case (x, y):
        print(f"Point at ({x}, {y})")

# With rest pattern
match items:
    case []:
        print("Empty")
    case [first]:
        print(f"One item: {first}")
    case [first, *rest]:
        print(f"First: {first}, Rest: {rest}")
\`\`\`python

Mapping Patterns: Match dictionaries with PARTIAL matching—extra keys are ignored! Only specified keys need to match.

\`\`\`python
match user:
    case {"name": n, "age": a}:
        print(f"{n} is {a} years old")
        # Works even if user has extra keys like "email"

    case {"type": "admin", **rest}:
        print(f"Admin with extra data: {rest}")
\`\`\`python

Class Patterns: Match objects by type and attributes. Requires \`__match_args__\` for positional matching.

\`\`\`python
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

match shape:
    case Point(0, 0):
        print("Origin point")
    case Point(x, y) if x == y:
        print(f"Diagonal point ({x}, {y})")
    case Point(x, y):
        print(f"Point ({x}, {y})")
\`\`\`python

ADVANCED FEATURES: Guards, OR patterns, AS patterns give match even more power.

Guards (if clauses): Add conditions to patterns. Pattern must match FIRST, THEN guard is evaluated. Guard failures move to next case.

\`\`\`python
match point:
    case (x, y) if x == y:
        print("Diagonal")
    case (x, y) if x > y:
        print("Above diagonal")
    case (x, y):
        print("Below diagonal")

# Guard evaluation order matters!
match value:
    case x if x > 100:       # Pattern matches any value, then checks guard
        print("Large")
\`\`\`python

OR Patterns (|): Match any of several alternatives—like multiple conditions in one case.

\`\`\`python
match status_code:
    case 200 | 201 | 204:
        print("Success")
    case 400 | 404 | 403:
        print("Client error")
    case 500 | 502 | 503:
        print("Server error")

# Works with any pattern type
match shape:
    case ("circle", r) | ("sphere", r):
        return 3.14159 * r * r
\`\`\`python

AS Patterns: Capture matched value while also matching pattern—useful for nested structures.

\`\`\`python
match event:
    case ("click", (x, y) as point):
        print(f"Clicked at point: {point}")
        print(f"Coordinates: x={x}, y={y}")

# Capture while matching complex pattern
match data:
    case {"items": [first, *rest] as all_items}:
        print(f"First: {first}, All: {all_items}")
\`\`\`python

WHEN TO USE MATCH VS ALTERNATIVES: Choose the right tool based on your pattern complexity and performance needs.

Match vs If/Elif Decision:
- Use MATCH when: Same value checked against multiple patterns, destructuring needed, structural matching required
- Use IF/ELIF when: Different variables in conditions, complex boolean logic (and/or/not), conditions involve different values

\`\`\`python
# MATCH: same value, structural patterns
match command.split():
    case ["load", filename]:
        load_file(filename)
    case ["save", filename]:
        save_file(filename)
    case ["quit"]:
        return

# IF/ELIF: different conditions
if not user.is_authenticated():
    redirect_to_login()
elif user.has_permission("admin"):
    show_admin_panel()
elif time_is_weekend():
    show_weekend_mode()
\`\`\`python

Match vs Dict Dispatch Decision:
- Use DICT when: Simple value→value mapping, O(1) lookup critical, no destructuring needed
- Use MATCH when: Need destructuring, guards, type matching, or pattern complexity

\`\`\`python
# DICT: simple mapping
ops = {"+": add, "-": sub, "*": mul, "/": div}
result = ops[operator](x, y)

# MATCH: complex patterns
match expression:
    case ("add", x, y):
        return x + y
    case ("mul", x, y) if y != 0:
        return x * y
    case ("div", x, 0):
        raise ValueError("Division by zero")
\`\`\`python

PERFORMANCE CHARACTERISTICS: Match performance varies by pattern complexity.

Literal Patterns O(1): Simple literals (numbers, strings) are optimized with jump tables—constant time like dict lookup.

Sequence Patterns O(n): Must check length and match each element—linear in sequence length.

Guards O(n): Evaluated sequentially—worst case checks all cases if guards keep failing.

Optimization Strategy: Put most common cases first. Compiler can't reorder cases, so order matters for performance.

\`\`\`python
# GOOD: common case first
match status:
    case 200:              # Most common → check first
        handle_ok()
    case 404:              # Less common
        handle_not_found()
    case _:                # Rare → check last
        handle_other()
\`\`\`python

COMMON INTERVIEW PATTERNS: These patterns appear frequently in coding problems.

Command Pattern: Parse and dispatch commands with match.

\`\`\`python
def handle_command(cmd):
    match cmd.split():
        case ["quit"] | ["exit"]:
            return "Goodbye"
        case ["load", filename]:
            return load_file(filename)
        case ["save", filename]:
            return save_file(filename)
        case ["delete", *files]:
            return delete_files(files)
        case _:
            return "Unknown command"
\`\`\`python

Parser Pattern: Validate and extract structured data.

\`\`\`python
def parse_expression(expr):
    match expr:
        case ("num", n):
            return n
        case ("add", left, right):
            return parse_expression(left) + parse_expression(right)
        case ("mul", left, right):
            return parse_expression(left) * parse_expression(right)
        case _:
            raise ValueError(f"Invalid expression: {expr}")
\`\`\`python

Validation Pattern: Check data structure with guards.

\`\`\`python
def validate_user(data):
    match data:
        case {"username": str(u), "age": int(a)} if 0 <= a <= 120:
            return User(username=u, age=a)
        case {"username": str(u)}:
            return User(username=u, age=None)
        case _:
            raise ValueError("Invalid user data")
\`\`\`python

HTTP Status Handler: Real-world API response handling.

\`\`\`python
match response.status_code:
    case 200 | 201 | 204:
        return response.json()
    case 404:
        raise NotFoundError()
    case 400 | 422:
        raise ValidationError(response.json())
    case 500 | 502 | 503:
        raise ServerError("Service unavailable")
    case _:
        raise UnknownError(f"Status {response.status_code}")
\`\`\`python

COMMON GOTCHAS AND PITFALLS: These mistakes trip up beginners and appear in interviews.

Wildcard \`_\` Doesn't Bind: The underscore pattern matches everything but DOESN'T create a variable. Use a named pattern to capture.

\`\`\`python
match value:
    case _:
        print(_)         # NameError! _ doesn't bind

match value:
    case x:              # x captures the value
        print(x)         # Works!
\`\`\`python

Dict Patterns Are Partial: Extra keys don't prevent matching—only specified keys must be present.

\`\`\`python
user = {"name": "Alice", "age": 30, "email": "alice@example.com"}

match user:
    case {"name": n, "age": a}:
        print(f"{n}, {a}")   # MATCHES even with extra "email" key!
\`\`\`python

Guard Evaluation Order: Pattern must match BEFORE guard runs. Guard failure tries next case.

\`\`\`python
match x:
    case int(n) if n > 0:    # Matches int, THEN checks guard
        print("Positive")
    case int(n):             # Catches non-positive ints
        print("Non-positive")
\`\`\`python

OR Patterns Can't Mix Capture Names: All alternatives in an OR must capture the same variables.

\`\`\`python
# WRONG: different captures
match shape:
    case ("circle", r) | ("square", s):  # Error! r vs s
        pass

# CORRECT: same captures
match shape:
    case ("circle", r) | ("sphere", r):  # Both capture 'r'
        return 3.14 * r * r
\`\`\``

export function MatchPage() {
  return (
    <TypePage
      type="Match Statement" badge="match" color="var(--accent-none)"
      description="Structural pattern matching (Python 3.10+). Destructure sequences, match types, bind variables, use guards. More powerful than switch."
      intro={matchIntro}
      methods={matchMethods}
    />
  )
}

const loopsIntro = `Loops are Python's fundamental iteration construct. The for loop is preferred over while—it's simpler, safer (no infinite loops!), and more Pythonic. Python's iteration protocol makes for loops work with any iterable: lists, strings, dicts, files, generators. The key insight: NEVER use range(len()) pattern—use enumerate() instead for cleaner, more Pythonic code.

FOR > WHILE IN PYTHON. Unlike C/Java where while and for are equally common, Python strongly favors for loops. For loops are safer (can't go infinite), simpler (no manual counter updates), and more expressive (work with any iterable). Use while ONLY when iterations are unknown—user input loops, two-pointer algorithms, binary search convergence. Otherwise, default to for.

\`\`\`python
# ANTI-PATTERN: C-style iteration (NEVER do this!)
i = 0
while i < len(arr):
    process(arr[i])
    i += 1

# BETTER: Pythonic for loop
for item in arr:
    process(item)

# NEED INDEX? Use enumerate(), NOT range(len())
# WRONG: range(len()) pattern
for i in range(len(arr)):
    print(f"Index {i}: {arr[i]}")

# RIGHT: enumerate()
for i, item in enumerate(arr):
    print(f"Index {i}: {item}")
\`\`\`python

FOR LOOP MASTERY: Python's for loop iterates over ANY iterable—not just lists!

\`\`\`python
# LISTS
for item in [1, 2, 3]:
    print(item)

# STRINGS (iterate characters)
for char in "hello":
    print(char)  # h, e, l, l, o

# DICTS (iterate keys by default)
for key in {"a": 1, "b": 2}:
    print(key)  # a, b

# Dict items (key-value pairs)
for key, value in {"a": 1, "b": 2}.items():
    print(f"{key} = {value}")

# FILES (iterate lines)
for line in open("file.txt"):
    print(line)

# GENERATORS
for x in (i**2 for i in range(5)):
    print(x)  # 0, 1, 4, 9, 16
\`\`\`python

The iteration protocol: Any object with \`__iter__\` method is iterable.

WHILE LOOP PATTERNS: Use while ONLY when iteration count is unknown.

\`\`\`python
# VALID USE: User input (unknown iterations)
while True:
    user_input = input("Enter command (or 'quit'): ")
    if user_input == "quit":
        break
    process_command(user_input)

# VALID USE: Walrus operator for input (3.8+)
while (line := input("Enter text: ")) != "quit":
    process(line)

# VALID USE: Two-pointer algorithm
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] + arr[right] == target:
        return (left, right)
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1

# VALID USE: Binary search convergence
while left <= right:
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        left = mid + 1
    else:
        right = mid - 1
\`\`\`python

ITERATION TOOLS: Python provides powerful built-in tools for common iteration patterns.

\`\`\`python
# RANGE: Generate integer sequence (lazy iterator!)
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 7):     # 2, 3, 4, 5, 6 (start, stop)
    print(i)

for i in range(0, 10, 2): # 0, 2, 4, 6, 8 (start, stop, step)
    print(i)

# GOTCHA: range is lazy, NOT a list!
r = range(5)
print(r)  # range(0, 5), not [0, 1, 2, 3, 4]
list(r)   # [0, 1, 2, 3, 4] (convert to list)

# ENUMERATE: Get index + value (NEVER use range(len())!)
names = ["Alice", "Bob", "Charlie"]
for i, name in enumerate(names):
    print(f"{i}: {name}")
# 0: Alice
# 1: Bob
# 2: Charlie

# Start index from custom value
for i, name in enumerate(names, start=1):
    print(f"{i}: {name}")
# 1: Alice
# 2: Bob
# 3: Charlie

# ZIP: Iterate multiple sequences in parallel
names = ["Alice", "Bob"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
# Alice is 25
# Bob is 30

# CRITICAL: zip stops at shortest sequence!
a = [1, 2, 3]
b = [10, 20]
list(zip(a, b))  # [(1, 10), (2, 20)] — 3 is dropped!

# Use zip_longest for all elements
from itertools import zip_longest
list(zip_longest(a, b, fillvalue=0))
# [(1, 10), (2, 20), (3, 0)]

# REVERSED: Iterate backward (lazy, no copy!)
for i in reversed([1, 2, 3]):
    print(i)  # 3, 2, 1

# vs slicing (creates copy!)
for i in [1, 2, 3][::-1]:
    print(i)  # Same output but wastes memory

# SORTED: Iterate sorted sequence (doesn't modify original)
nums = [3, 1, 2]
for x in sorted(nums):
    print(x)  # 1, 2, 3
print(nums)  # [3, 1, 2] — original unchanged!

# With key function
words = ["apple", "pie", "zoo"]
for w in sorted(words, key=len):
    print(w)  # pie, zoo, apple (sorted by length)
\`\`\`python

LOOP ELSE CLAUSE: Runs if loop completes WITHOUT hitting break. Perfect for search patterns!

\`\`\`python
# PATTERN: Search with "not found" handling
def find_item(items, target):
    for item in items:
        if item == target:
            print(f"Found: {item}")
            break
    else:
        # Runs ONLY if break never executed
        print("Not found")

# PATTERN: Prime number check
def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            break  # Found divisor, not prime
    else:
        # Loop completed without break—no divisors found
        return True
    return False

# WITHOUT else (needs flag variable—uglier!)
def find_item_ugly(items, target):
    found = False
    for item in items:
        if item == target:
            print(f"Found: {item}")
            found = True
            break
    if not found:
        print("Not found")
\`\`\`python

Loop else benefits:
- No flag variable needed
- Clearer intent: "if search succeeded" vs "if search failed"
- Common in Python idioms

BREAK, CONTINUE, PASS:

\`\`\`python
# BREAK: Exit loop immediately
for i in range(10):
    if i == 5:
        break  # Stop at 5
    print(i)  # Prints 0, 1, 2, 3, 4

# CONTINUE: Skip to next iteration
for i in range(5):
    if i == 2:
        continue  # Skip 2
    print(i)  # Prints 0, 1, 3, 4

# PASS: No-op placeholder
for i in range(5):
    if i % 2 == 0:
        pass  # TODO: implement even handling
    else:
        print(f"Odd: {i}")
\`\`\`python

PERFORMANCE PATTERNS AND OPTIMIZATION:

1. Avoid Repeated Attribute Lookups:
\`\`\`python
# SLOW: Repeated attribute lookup
for item in data:
    results.append(item)  # Looks up .append every iteration

# FAST: Cache attribute reference
append = results.append
for item in data:
    append(item)  # Direct call, no lookup

# Benchmark: 10-15% faster for tight loops!
\`\`\`python

2. Membership Testing: Use Sets, Not Lists
\`\`\`python
# SLOW: O(n) membership in list
valid = [1, 2, 3, 4, 5]  # List
for item in data:
    if item in valid:  # O(n) for each check!
        process(item)

# FAST: O(1) membership in set
valid = {1, 2, 3, 4, 5}  # Set
for item in data:
    if item in valid:  # O(1) for each check!
        process(item)

# For 10K items: 1000x faster with set!
\`\`\`python

3. List Comprehensions vs Append Loops:
\`\`\`python
# APPEND LOOP: ~65ms for 1M items
result = []
for x in range(1000000):
    result.append(x**2)

# LIST COMP: ~50ms for 1M items (20-30% faster!)
result = [x**2 for x in range(1000000)]

# Use comprehensions for simple transforms!
\`\`\`python

4. Generator Expressions for One-Time Use:
\`\`\`python
# BAD: Build list just for sum (wastes memory)
total = sum([x**2 for x in range(1000000)])  # ~8MB!

# GOOD: Generator for one-time sum (O(1) memory)
total = sum(x**2 for x in range(1000000))  # ~100 bytes!
\`\`\`python

TWO-POINTER PATTERNS IN LOOPS: Common interview pattern using while loops.

\`\`\`python
# PATTERN: Two Sum (sorted array)
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current = nums[left] + nums[right]
        if current == target:
            return (left, right)
        elif current < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    return None

# PATTERN: Remove duplicates in-place
def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1  # Write position
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write

# PATTERN: Reverse array in-place
def reverse(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
\`\`\`python

COMMON GOTCHAS AND MISTAKES:

1. Modifying List While Iterating:
\`\`\`python
# WRONG: Modifying list during iteration
nums = [1, 2, 3, 4, 5]
for x in nums:
    if x % 2 == 0:
        nums.remove(x)  # BUG! Skips elements!

# RIGHT: Create new list
nums = [1, 2, 3, 4, 5]
nums = [x for x in nums if x % 2 != 0]

# OR: Iterate over copy
for x in nums[:]:  # [:] creates copy
    if x % 2 == 0:
        nums.remove(x)
\`\`\`python

2. Iterator Exhaustion:
\`\`\`python
# GOTCHA: Generators are one-time use!
gen = (x for x in range(5))
list(gen)  # [0, 1, 2, 3, 4]
list(gen)  # [] — Exhausted!

# FIX: Convert to list once
data = list(x for x in range(5))
\`\`\`python

3. Range Oddities:
\`\`\`python
# GOTCHA: range(10, 0) is EMPTY!
list(range(10, 0))  # [] — needs step=-1!
list(range(10, 0, -1))  # [10, 9, 8, ..., 1]

# GOTCHA: range is lazy
r = range(1000000)  # Instant, O(1) memory
l = list(range(1000000))  # Slow, O(n) memory
\`\`\`python

4. Variable Scope in Loops:
\`\`\`python
# Loop variable persists after loop!
for i in range(5):
    pass
print(i)  # 4 (last value!)

# In list comp: variable is local (Python 3+)
[x for x in range(5)]
# print(x)  # NameError! (x not defined)
\`\`\`python

ADVANCED ITERTOOLS PATTERNS:

\`\`\`python
from itertools import islice, cycle, chain, combinations

# ISLICE: Slice iterator without loading all
for x in islice(range(1000000), 5):  # First 5 items
    print(x)  # 0, 1, 2, 3, 4

# CYCLE: Infinite repetition
counter = cycle([1, 2, 3])
for _ in range(7):
    print(next(counter))  # 1, 2, 3, 1, 2, 3, 1

# CHAIN: Concatenate iterables
for x in chain([1, 2], [3, 4]):
    print(x)  # 1, 2, 3, 4

# COMBINATIONS: All k-element combinations
for combo in combinations([1, 2, 3], 2):
    print(combo)  # (1, 2), (1, 3), (2, 3)
\`\`\`python

BEST PRACTICES SUMMARY:

- Prefer for over while (safer, simpler, more Pythonic)
- Use enumerate() instead of range(len())
- Use zip() for parallel iteration
- Use reversed() instead of [::-1] for large sequences
- Use loop else for search "not found" patterns
- Cache attribute lookups in tight loops (10-15% faster)
- Use sets for membership testing (1000x faster than lists)
- Use comprehensions for simple transforms (20-30% faster)
- Use generators for one-time iteration (80,000x less memory)
- NEVER modify list while iterating over it
- NEVER use range(len()) — use enumerate() instead!
- NEVER use while for known iterations — use for instead!`

export function LoopsPage() {
  return (
    <TypePage
      type="Loops" badge="for" color="var(--accent-none)"
      description="Python loops: for iterates over sequences, while repeats until condition is false. Includes iteration tools and loop control."
      intro={loopsIntro}
      methods={loopsMethods}
    />
  )
}

const comprehensionsIntro = `Comprehensions provide Python's concise, declarative syntax for creating collections in a single expression. They combine mapping and filtering from functional programming with Python's readable syntax. The key insight: comprehensions are faster and more Pythonic for simple transformations, but regular loops are clearer for complex logic—readability always wins.

LIST vs GENERATOR MEMORY TRADE-OFF. List comprehensions \`[x for x in data]\` build the ENTIRE result in memory immediately—great for small data (<100K items) or multiple iterations. Generator expressions \`(x for x in data)\` yield items ONE AT A TIME—O(1) memory, perfect for 100K+ items or one-time iteration. CRITICAL GOTCHA: Generators exhaust after one pass—\`list(gen)\` works ONCE, then \`gen\` is empty forever!

\`\`\`python
# LIST: Builds all items immediately
squares_list = [x**2 for x in range(1000000)]  # ~8MB memory
len(squares_list)  # Works
len(squares_list)  # Works again (list persists)

# GENERATOR: Yields items lazily
squares_gen = (x**2 for x in range(1000000))  # ~100 bytes memory!
sum(squares_gen)   # Works: consumes generator
sum(squares_gen)   # → 0 GOTCHA! Generator exhausted!

# FIX: Convert to list for multiple iterations
squares_gen = (x**2 for x in range(1000000))
squares_list = list(squares_gen)  # One-time conversion
sum(squares_list)  # Works
sum(squares_list)  # Still works!
\`\`\`python

ALL COMPREHENSION TYPES: Python has four comprehension types—all share the same syntax structure but produce different collections.

\`\`\`python
# STRUCTURE: [EXPR for VAR in ITERABLE if CONDITION]
# All types follow this pattern!

# LIST COMPREHENSION: [] builds list
squares = [x**2 for x in range(10)]
# → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# SET COMPREHENSION: {} builds set (unique, unordered)
unique_squares = {x**2 for x in [-2, -1, 0, 1, 2]}
# → {0, 1, 4}  (duplicates removed, order not guaranteed)

# DICT COMPREHENSION: {key: value} builds dictionary
square_map = {x: x**2 for x in range(5)}
# → {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# GENERATOR EXPRESSION: () yields items lazily
squares_lazy = (x**2 for x in range(10))
# → <generator object> (not computed yet!)
\`\`\`python

Note: Tuple comprehension DOESN'T exist! \`()\` creates a generator, not a tuple.

\`\`\`python
# NOT a tuple comprehension!
gen = (x for x in range(5))  # Generator!

# To make tuple: convert generator
tup = tuple(x for x in range(5))  # → (0, 1, 2, 3, 4)
# OR use tuple() on list comprehension
tup = tuple([x for x in range(5)])
\`\`\`python

LIST VS GENERATOR: MEMORY AND PERFORMANCE TRADE-OFFS.

Memory Usage (1 million items):
- List comprehension: ~8MB (stores all items)
- Generator expression: ~100 bytes (stores only current item)
- Memory ratio: 80,000x more efficient for generators!

\`\`\`python
import sys

# List: Stores all 1M items
list_comp = [x**2 for x in range(1000000)]
sys.getsizeof(list_comp)  # ~8,000,000 bytes (8MB)

# Generator: Stores only state
gen_expr = (x**2 for x in range(1000000))
sys.getsizeof(gen_expr)  # ~100 bytes (constant!)
\`\`\`python

When to Use List vs Generator:

Use LIST \`[]\` when:
- - Small data (<100K items)
- - Need multiple iterations
- - Need len(), indexing, slicing
- - Need to check membership multiple times
- - Debugging (can inspect contents)

Use GENERATOR \`()\` when:
- - Large data (100K+ items)
- - One-time iteration
- - Pipeline chaining: \`sum(x**2 for x in filter(pred, data))\`
- - Memory constrained
- - Infinite sequences: \`(x for x in itertools.count())\`

\`\`\`python
# GOOD: Generator for large one-time sum
total = sum(x**2 for x in range(10000000))  # O(1) memory!

# GOOD: List for multiple operations
squares = [x**2 for x in range(100)]  # Small, need multiple uses
print(len(squares))
print(max(squares))
print(squares[50])

# BAD: List for huge one-time use
total = sum([x**2 for x in range(10000000)])  # Wastes ~80MB!

# BAD: Generator for multiple iterations
gen = (x**2 for x in range(100))
print(list(gen))  # Works
print(list(gen))  # [] Empty! Generator exhausted
\`\`\`python

NESTED COMPREHENSIONS: Comprehensions can be nested, but readability degrades quickly. Use regular loops beyond 2 levels of nesting.

\`\`\`python
# FLAT: Cartesian product (reads left-to-right!)
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# → [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]
# EQUIVALENT LOOP:
# for x in [1, 2, 3]:
#     for y in ['a', 'b']:
#         pairs.append((x, y))

# NESTED: Matrix (list of lists)
matrix = [[x*y for y in range(3)] for x in range(4)]
# → [[0, 0, 0], [0, 1, 2], [0, 2, 4], [0, 3, 6]]
# Outer comp creates rows, inner comp creates columns

# FLATTEN: Extract all items from nested lists
nested = [[1, 2], [3, 4], [5]]
flat = [item for sublist in nested for item in sublist]
# → [1, 2, 3, 4, 5]
# EQUIVALENT LOOP:
# for sublist in nested:      # Outer loop reads left
#     for item in sublist:    # Inner loop reads right
#         flat.append(item)

# TRANSPOSE: Swap rows and columns
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = [[row[i] for row in matrix] for i in range(3)]
# → [[1, 4], [2, 5], [3, 6]]
# OR use zip:
transposed = list(zip(*matrix))  # Clearer for transpose!
\`\`\`python

CRITICAL: Nested comp order reads LEFT-TO-RIGHT!

\`\`\`python
# This reads: for x in A, for y in B
result = [x*y for x in A for y in B]

# SAME AS:
for x in A:          # Left part = outer loop
    for y in B:      # Right part = inner loop
        result.append(x*y)
\`\`\`python

FILTERING AND MAPPING: Combine transformation (mapping) and filtering in one expression.

\`\`\`python
# FILTER: if clause at end
evens = [x for x in range(10) if x % 2 == 0]
# → [0, 2, 4, 6, 8]

# MAP + FILTER: transform AND filter
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# → [0, 4, 16, 36, 64]

# MULTIPLE IFS: Multiple ifs = AND logic
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# → [0, 6, 12, 18]  (divisible by 2 AND 3)
# SAME AS: if x % 2 == 0 and x % 3 == 0

# WALRUS := in filter (3.8+)
# Compute expensive function ONCE per item
filtered = [y for x in data if (y := expensive(x)) > 0]
# Calls expensive() once, uses result y in output AND condition

# WRONG: Calling expensive twice
filtered = [expensive(x) for x in data if expensive(x) > 0]
# Calls expensive() TWICE per passing item! (once in if, once in expr)
\`\`\`python

COMPREHENSIONS VS MAP/FILTER: Comprehensions are more Pythonic and flexible.

\`\`\`python
# map() equivalent
squares_map = list(map(lambda x: x**2, range(10)))
squares_comp = [x**2 for x in range(10)]  # Clearer!

# filter() equivalent
evens_filter = list(filter(lambda x: x % 2 == 0, range(10)))
evens_comp = [x for x in range(10) if x % 2 == 0]  # Clearer!

# map() + filter() combined
result = list(map(lambda x: x**2, filter(lambda x: x % 2 == 0, range(10))))
result = [x**2 for x in range(10) if x % 2 == 0]  # Much clearer!
\`\`\`python

Use map/filter ONLY when:
- You already have a named function: \`list(map(str.upper, words))\`
- Chaining many operations (functional style)

WHEN NOT TO USE COMPREHENSIONS: Comprehensions are powerful but not always the right choice. Use regular loops when comprehensions hurt readability.

DON'T use comprehensions for:

1. Complex logic (if/elif/else, try/except):
\`\`\`python
# BAD: Complex ternary
result = [x if x > 0 else -x if x < 0 else 0 for x in data]  # Unreadable!

# GOOD: Regular loop
result = []
for x in data:
    if x > 0:
        result.append(x)
    elif x < 0:
        result.append(-x)
    else:
        result.append(0)
\`\`\`python

2. Side effects (print, logging, mutation):
\`\`\`python
# BAD: Side effects in comprehension
[print(x) for x in data]  # Creates useless list of None!

# GOOD: Regular loop
for x in data:
    print(x)
\`\`\`python

3. Triple nesting or more:
\`\`\`python
# BAD: Deeply nested (unreadable!)
result = [[[x*y*z for z in C] for y in B] for x in A]

# GOOD: Regular loops
result = []
for x in A:
    row = []
    for y in B:
        col = []
        for z in C:
            col.append(x*y*z)
        row.append(col)
    result.append(row)
\`\`\`python

4. Exception handling:
\`\`\`python
# BAD: Can't use try/except in comprehension
# result = [int(x) for x in data]  # Crashes on non-numeric!

# GOOD: Regular loop with try/except
result = []
for x in data:
    try:
        result.append(int(x))
    except ValueError:
        pass  # Skip invalid items
\`\`\`python

Rule of Thumb: If your comprehension has >3 clauses or doesn't fit cleanly on one readable line, use a loop!

COMMON PATTERNS FOR INTERVIEWS:

Unique Ordered Elements (remove duplicates, preserve order):
\`\`\`python
items = [1, 2, 1, 3, 2, 4]
unique = list(dict.fromkeys(items))  # → [1, 2, 3, 4]
# dict.fromkeys() maintains insertion order (3.7+)
\`\`\`python

Flatten Nested Lists:
\`\`\`python
nested = [[1, 2], [3, 4], [5]]
flat = [item for sublist in nested for item in sublist]
# → [1, 2, 3, 4, 5]
\`\`\`python

Transpose Matrix:
\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = list(zip(*matrix))  # → [(1, 4), (2, 5), (3, 6)]
# OR: [[row[i] for row in matrix] for i in range(len(matrix[0]))]
\`\`\`python

Conditional Expression in Output:
\`\`\`python
# Simple ternary OK
result = ["even" if x % 2 == 0 else "odd" for x in range(5)]
# → ["even", "odd", "even", "odd", "even"]
\`\`\`python

Dict from Two Lists:
\`\`\`python
keys = ['a', 'b', 'c']
values = [1, 2, 3]
mapping = {k: v for k, v in zip(keys, values)}
# → {'a': 1, 'b': 2, 'c': 3}
\`\`\`python

PERFORMANCE COMPARISON: Real benchmarks for 1M items.

List Comprehension vs Loop:
\`\`\`python
# List comp: ~50ms for 1M items
squares = [x**2 for x in range(1000000)]

# Append loop: ~65ms for 1M items (30% slower)
squares = []
for x in range(1000000):
    squares.append(x**2)

# Comprehensions are 20-30% faster for simple operations!
\`\`\`python

List Comprehension vs map():
\`\`\`python
# List comp: ~50ms
squares = [x**2 for x in range(1000000)]

# map with lambda: ~60ms (slower due to lambda overhead)
squares = list(map(lambda x: x**2, range(1000000)))

# map with function: ~45ms (slightly faster if function is pre-defined)
def square(x): return x**2
squares = list(map(square, range(1000000)))
\`\`\`python

Generator vs List for sum():
\`\`\`python
# Generator: ~70ms, O(1) memory
total = sum(x**2 for x in range(1000000))

# List: ~50ms, O(n) memory (~8MB)
total = sum([x**2 for x in range(1000000)])

# Generator slower but 80,000x less memory!
\`\`\`python

COMMON GOTCHAS:

1. Generator Exhaustion (CRITICAL!):
\`\`\`python
gen = (x for x in range(5))
list(gen)  # → [0, 1, 2, 3, 4]
list(gen)  # → [] GOTCHA! Empty!

# FIX: Convert once
data = list(x for x in range(5))
\`\`\`python

2. Variable Leakage (Python 2 only, fixed in Python 3):
\`\`\`python
# Python 3: Comprehension variables are local
[x for x in range(5)]
# x is NOT defined outside! (NameError)
\`\`\`python

3. Nested Loop Order:
\`\`\`python
# WRONG mental model
[(x, y) for x in A for y in B]  # NOT "for y, for x"!

# CORRECT: Reads left-to-right
for x in A:     # Left part
    for y in B: # Right part
\`\`\`python

4. Set/Dict Need {}, Not ():
\`\`\`python
# WRONG: () is generator, not set!
gen = (x for x in range(5))  # Generator!

# RIGHT: {} for set
my_set = {x for x in range(5)}  # Set!
\`\`\`python

BEST PRACTICES SUMMARY:

- Use comprehensions for simple map/filter operations
- Use generators for 100K+ items or one-time iteration
- Use lists for <100K items or multiple iterations
- Keep comprehensions to 1-2 levels of nesting max
- Put complex logic in regular loops
- Convert generators to lists if you need multiple passes
- Prefer comprehensions over map/filter for readability
- NEVER use comprehensions for side effects
- NEVER nest 3+ levels
- NEVER use if/elif/else or try/except in comprehensions`

export function ComprehensionsPage() {
  return (
    <TypePage
      type="Comprehensions" badge="[]" color="var(--accent-none)"
      description="Concise syntax for creating collections: list, dict, set, generator. Transform and filter iterables in one readable expression."
      intro={comprehensionsIntro}
      methods={comprehensionsMethods}
    />
  )
}

const functionsIntro = `Functions as First-Class Objects
Functions package reusable code logic. Use \`def\` for named functions, \`lambda\` for single-expression anonymous functions. Python functions are first-class objects—assign to variables, pass as arguments, store in data structures. Parentheses trigger calls: \`func()\` calls, \`func\` references. Functions return \`None\` by default without explicit \`return\`.

\`\`\`python
# FUNCTION BASICS
def greet(name):
    return f"Hello, {name}!"

# First-class: assign to variable
say_hi = greet
say_hi("Alice")  # "Hello, Alice!"

# Lambda for simple expressions
square = lambda x: x ** 2
square(5)  # 25

# Multiple arguments and defaults
def power(base, exponent=2):
    return base ** exponent

power(3)     # 9 (default exponent=2)
power(3, 3)  # 27 (override default)

# ARGUMENT PASSING MODES
def func(pos_only, /, standard, *, kw_only):
    # pos_only: positional only (before /)
    # standard: positional or keyword
    # kw_only: keyword only (after *)
    pass

func(1, 2, kw_only=3)        # Valid
func(1, standard=2, kw_only=3)  # Valid
# func(pos_only=1)  # ERROR! Must use position

# STAR SYNTAX - Collect and unpack
def variadic(*args, **kwargs):
    print(f"Positional: {args}")
    print(f"Keyword: {kwargs}")

variadic(1, 2, x=3, y=4)
# Positional: (1, 2)
# Keyword: {'x': 3, 'y': 4}

# Unpacking in calls
nums = [1, 2, 3]
print(*nums)  # Unpacks to: print(1, 2, 3)
\`\`\`python
---
Scopes and the LEGB Rule
Python searches scopes in order: Local → Enclosing → Global → Built-in. Assignment creates local variables unless declared \`global\` or \`nonlocal\`. Reading outer scopes works automatically. Modifying requires declaration. Each module is a separate namespace—same variable names in different modules don't collide.

\`\`\`python
# LEGB SCOPE SEARCH
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"  # Creates new local x
        print(x)     # "local" (L)

    inner()
    print(x)  # "enclosing" (E)

outer()
print(x)  # "global" (G)
print(len)  # <built-in function len> (B)

# MODIFYING OUTER SCOPES
count = 0

def increment_global():
    global count  # Declare to modify global
    count += 1

increment_global()
print(count)  # 1

# ENCLOSING SCOPE MODIFICATION
def make_counter():
    count = 0

    def increment():
        nonlocal count  # Declare to modify enclosing
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2

# SHADOWING BUILT-INS (avoid!)
len = 99  # Shadows built-in len
# len([1, 2])  # ERROR! len is now int, not function
del len  # Restore built-in
len([1, 2])  # 2 (works again)
\`\`\`python
---
Decorators and Advanced Patterns
Decorators wrap functions to add behavior—logging, timing, validation. Syntax \`@decorator\` before \`def\` equals \`func = decorator(func)\`. Decorators run at definition time. Stack decorators bottom-to-top: \`@A @B def f\` = \`A(B(f))\`. Decorators with arguments need extra nesting: \`decorator(args)\` returns the actual decorator. Use \`@functools.wraps\` to preserve metadata. Recursion needs base case and can use \`@lru_cache\` for memoization.

\`\`\`python
# BASIC DECORATOR
import functools

def log_calls(func):
    @functools.wraps(func)  # Preserve __name__, __doc__
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(x, y):
    return x + y

add(3, 5)
# Calling add
# add returned 8

# DECORATOR WITH ARGUMENTS
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")
# Hello, Alice!
# Hello, Alice!
# Hello, Alice!

# RECURSION WITH MEMOIZATION
@functools.lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:  # Base case
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Fast! Results cached

# CLASS AS DECORATOR (stateful)
class CallCounter:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call #{self.count}")
        return self.func(*args, **kwargs)

@CallCounter
def say_hi():
    print("Hi!")

say_hi()  # Call #1 \n Hi!
say_hi()  # Call #2 \n Hi!
\`\`\`python
`

export function FunctionsPage() {
  return (
    <TypePage
      type="Functions" badge="def" color="var(--accent-functions)"
      description="Functions are first-class objects in Python. Use def for named functions, lambda for anonymous functions."
      intro={functionsIntro}
      methods={functionsMethods}
    />
  )
}

const oopIntro = `Classes and Objects Fundamentals
Classes are blueprints for creating objects that bundle data and behavior. Use def to create methods—they automatically receive the instance as first argument (self). The __init__ constructor runs when creating instances. Classes beat dictionaries for structured data because they provide consistent interfaces, type checking, and can add behavior.

\`\`\`python
# BASIC CLASS SYNTAX
class Dog:
    species = "Canis familiaris"  # Class attribute (shared)

    def __init__(self, name, age):  # Constructor
        self.name = name        # Instance attribute
        self.age = age

    def bark(self):             # Instance method
        return f"{self.name} says woof!"

# CREATE INSTANCES
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)
print(dog1.bark())  # "Buddy says woof!"
print(Dog.species)  # "Canis familiaris" (shared)

# WHEN TO USE CLASSES VS DICTS
# Dict - flexible, no behavior
person = {"name": "Alice", "age": 30}

# Class - consistent interface, can add methods
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):  # Behavior bundled with data
        return f"Hi, I'm {self.name}"
\`\`\`python
---
Inheritance and Composition Patterns
Inheritance (is-a) creates specialized classes from general ones. Composition (has-a) embeds objects inside others—often clearer than inheritance. Delegation forwards attribute access to wrapped objects using __getattr__. MRO (Method Resolution Order) determines lookup path in multiple inheritance using C3 linearization.

\`\`\`python
# INHERITANCE - "is-a" relationship
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Dog(Animal):  # Dog IS-AN Animal
    def speak(self):
        return f"{self.name} barks"

class Cat(Animal):
    def speak(self):
        return f"{self.name} meows"

# COMPOSITION - "has-a" relationship
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS-AN Engine

    def start(self):
        return self.engine.start()

# DELEGATION - Forward to wrapped object
class LoggedList:
    def __init__(self):
        self._list = []

    def __getattr__(self, name):  # Delegate unknown attrs
        return getattr(self._list, name)

    def append(self, item):  # Override to add logging
        print(f"Adding {item}")
        self._list.append(item)

logged = LoggedList()
logged.append(1)  # Logs then delegates
logged.pop()      # Delegates directly to list.pop()
\`\`\`python
---
Advanced OOP: Properties, Descriptors, and Metaclasses
Use @property for computed attributes and validation—runs code on access. @dataclass auto-generates __init__, __repr__, __eq__. __slots__ restricts attributes and reduces memory 50%+. ABC defines interfaces that subclasses must implement. Metaclasses customize class creation—rarely needed but powerful.

\`\`\`python
# @PROPERTY - Computed attributes with validation
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):  # Getter
        return self._radius

    @radius.setter
    def radius(self, value):  # Setter with validation
        if value < 0:
            raise ValueError("Radius must be positive")
        self._radius = value

    @property
    def area(self):  # Computed attribute
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)     # 78.54 (computed on access)
c.radius = -1     # ValueError!

# @DATACLASS - Auto-generate boilerplate
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
    # Auto-generates __init__, __repr__, __eq__

p = Point(1, 2)
print(p)  # Point(x=1, y=2)

# __SLOTS__ - Restrict attributes, save memory
class SlottedClass:
    __slots__ = ['x', 'y']  # Only these attributes allowed

    def __init__(self, x, y):
        self.x = x
        self.y = y
        # self.z = 3  # AttributeError!

# ABC - Define interfaces
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):  # Must implement
        return self.w * self.h

# METACLASS - Customize class creation (advanced)
class Meta(type):
    def __new__(cls, name, bases, dct):
        dct['added'] = 42  # Add attribute to all classes
        return super().__new__(cls, name, bases, dct)

class MyClass(metaclass=Meta):
    pass

print(MyClass.added)  # 42
\`\`\`python
`

export function OOPPage() {
  return (
    <TypePage
      type="OOP" badge="class" color="var(--accent-oop)"
      description="Object-Oriented Programming in Python. Classes bundle data + behavior. Use when you have state + multiple operations on that state."
      intro={oopIntro}
      methods={oopMethods}
    />
  )
}

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

const statementsIntro = `Assignment Creates References, Not Copies
When you write \`a = b\`, Python creates a new reference to the same object, not a copy. For immutable objects (int, str, tuple), this doesn't matter—you can't modify them. For mutable objects (list, dict, set), this is CRITICAL—changes through one reference affect ALL references. The key insight: Python passes references everywhere, making it fast but requiring careful handling of mutable objects.

\`\`\`python
# REFERENCE SEMANTICS
a = [1, 2, 3]        # a references a list
b = a                # b references SAME list
b.append(4)
print(a)             # [1, 2, 3, 4] — a sees the change!

# CREATE A COPY
a = [1, 2, 3]
b = a[:]             # b is a NEW list (copy)
b.append(4)
print(a)             # [1, 2, 3] — unchanged

# IMMUTABLE OBJECTS - References don't matter
x = 5
y = x                # y references same int
y += 1               # Creates NEW int, rebinds y
print(x)             # 5 — unchanged (ints are immutable)

# MULTIPLE REFERENCES TO MUTABLE
def bad_default(L=[]):
    L.append(1)
    return L

bad_default()  # [1]
bad_default()  # [1, 1] — Same list!

def good_default(L=None):
    if L is None:
        L = []       # New list each call
    L.append(1)
    return L
\`\`\`
---
Assignment Forms and Evaluation Order
Python's assignment evaluates the right side first, then binds names on the left. Multiple assignment \`a = b = c = []\` creates ONE object with three references. Sequence unpacking \`x, y = 1, 2\` evaluates right, then unpacks to left. Augmented assignment \`x += 1\` modifies in-place for mutables, creates new for immutables. Walrus operator \`:=\` assigns within expressions.

\`\`\`python
# BASIC ASSIGNMENT - Right side first
x = y = z = []       # ONE list, THREE names
x.append(1)
print(z)             # [1] — all names reference same list

# SEQUENCE UNPACKING
x, y = 1, 2          # Unpack tuple
a, b = [10, 20]      # Unpack list
first, *rest = [1, 2, 3, 4]  # first=1, rest=[2,3,4]

# SWAP - Classic Python idiom
a, b = b, a          # Right side evaluates first: (b, a) tuple
                     # Then unpacks to a, b

# AUGMENTED ASSIGNMENT
nums = [1, 2]
nums += [3, 4]       # Modifies in-place (mutables)
print(nums)          # [1, 2, 3, 4]

x = 5
x += 1               # Creates NEW int (immutables)

# WALRUS OPERATOR := (Python 3.8+)
if (n := len(data)) > 10:  # Assign AND use in one expression
    print(f"Large dataset: {n} items")

# Useful in while loops
while (line := file.readline()):
    process(line)
\`\`\`
---
Expression Statements and Print
Expression statements evaluate expressions but discard results—useful for function calls with side effects. Print sends output to stdout with automatic newline. Use \`sep\` to change separator, \`end\` to change line ending, \`file\` to redirect output. Print is a function in Python 3, not a statement like Python 2.

\`\`\`python
# EXPRESSION STATEMENTS - Call functions for side effects
mylist.append(1)     # Returns None, but modifies list
mydict.update(x=1)   # Returns None, but modifies dict
print("Hello")       # Returns None, but prints

# PRINT FUNCTION
print("Hello", "World")  # Hello World (space separator)
print("A", "B", sep="-") # A-B (custom separator)
print("Hello", end="")   # No newline
print("World")           # HelloWorld (on same line)

# PRINT TO FILE
with open("log.txt", "w") as f:
    print("Log entry", file=f)  # Redirect to file

# FORMATTED PRINTING
name, age = "Alice", 30
print(f"{name} is {age} years old")  # F-strings (Python 3.6+)
print("{} is {} years old".format(name, age))  # .format()
print("%s is %d years old" % (name, age))  # Old %-formatting

# DEBUGGING TRICK - Print with value labels
x = 42
print(f"{x=}")       # x=42 (Python 3.8+)
\`\`\`
`

export function StatementsPage() {
  return (
    <TypePage
      type="Statements" badge="=" color="var(--accent-statements)"
      description="Assignment forms, variable naming, expression statements, and print operations. The building blocks of Python programs."
      intro={statementsIntro}
      methods={statementsMethods}
    />
  )
}

const conditionalsIntro = `Guard Clauses and Early Returns
Avoid deep nesting with guard clauses—validate inputs at the top, return early on failure, let the happy path flow without indentation. This pattern improves readability, reduces cognitive load, and makes bugs obvious. The key insight: flatten nested if statements by inverting conditions and returning/raising early.

\`\`\`python
# ANTI-PATTERN: Deep nesting (arrow code)
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
    
    return data.process()  # Happy path at lowest indent

# PATTERN: Validate early, fail fast
def calculate_discount(price, user):
    if price <= 0:
        return 0  # Early return for invalid input
    if not user or not user.is_member:
        return price  # Early return for non-members
    
    # Main logic flows naturally
    discount = price * 0.1
    return price - discount
\`\`\`
---
Truthiness and Short-Circuit Evaluation
Python has 9 falsy values: False, None, 0, 0.0, "", [], {}, (), set(). Everything else is truthy. Short-circuit evaluation: \`and\` returns first falsy or last value, \`or\` returns first truthy or last value. Use this for null safety, default values, and performance optimization. Gotcha: 0 and "" are falsy but might be valid data—use explicit None checks.

\`\`\`python
# TRUTHINESS GOTCHAS
age = 0  # Valid data but falsy!
if age:  # WRONG: treats 0 as missing
    print(f"Age: {age}")

if age is not None:  # RIGHT: explicit None check
    print(f"Age: {age}")

# SHORT-CIRCUIT BEHAVIOR
result = 1 and 2 and 3  # → 3 (all truthy, returns last)
result = 1 and 0 and 3  # → 0 (returns first falsy)
result = 0 or 1 or 2    # → 1 (returns first truthy)
result = 0 or "" or []  # → [] (all falsy, returns last)

# PRACTICAL USES
# Default values
name = user_input or "Guest"  # If user_input is "", use "Guest"

# Null safety (avoid AttributeError)
if user and user.is_admin():  # If user is None, short-circuits
    grant_access()

# Avoid division by zero
if denominator != 0 and numerator / denominator > 1:
    do_something()

# Performance: cheap checks first
if is_cached(key) and expensive_validation(key):
    use_cached(key)  # expensive_validation() only runs if cached

# CUSTOM TRUTHINESS
class ShoppingCart:
    def __init__(self):
        self.items = []
    
    def __bool__(self):
        return len(self.items) > 0

cart = ShoppingCart()
if cart:  # False - empty cart
    checkout(cart)
\`\`\`
---
Ternary Expressions and Dictionary Dispatch
Ternary syntax: \`value_if_true if condition else value_if_false\`. Use for simple value selection—never nest. Dictionary dispatch replaces long if/elif chains with O(1) lookups when mapping values to values or functions. Choose if/elif for complex conditions, dict dispatch for simple mappings.

\`\`\`python
# TERNARY EXPRESSIONS
status = "active" if user.logged_in else "inactive"
max_val = a if a > b else b
message = "Even" if n % 2 == 0 else "Odd"

# GOOD: With simple logic
price = base_price * 0.9 if is_member else base_price

# BAD: Nested ternary (unreadable!)
x = a if cond1 else b if cond2 else c  # NO!

# BETTER: Use if/elif
if cond1:
    x = a
elif cond2:
    x = b
else:
    x = c

# DICTIONARY DISPATCH - O(1) lookups
# Instead of O(n) if/elif chain:
def get_day(day_num):
    if day_num == 0:
        return "Monday"
    elif day_num == 1:
        return "Tuesday"
    # ... 5 more elif

# Use O(1) dict lookup:
DAYS = {
    0: "Monday", 1: "Tuesday", 2: "Wednesday",
    3: "Thursday", 4: "Friday", 5: "Saturday", 6: "Sunday"
}
day = DAYS.get(day_num, "Invalid")  # O(1)

# DISPATCH TO FUNCTIONS
def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b

operations = {"+": add, "-": sub, "*": mul}
result = operations[operator](x, y)  # Dispatch

# WHEN TO USE:
# ✓ Simple value mappings (like day_num → "Monday")
# ✓ Function dispatch based on key
# ✗ Complex conditions (use if/elif)
# ✗ Ranges or comparisons (dict keys must be exact)
\`\`\`
`


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

const conditionalPatternsIntro = `Dictionary Dispatch for O(1) Lookups
Replace O(n) if-elif chains with O(1) dictionary lookups when mapping values to values or functions. Dict dispatch is faster for 5+ branches and cleaner than long if-elif chains. Use \`.get()\` for safe lookups with defaults. The key insight: algorithmic complexity matters—O(1) hash lookup beats O(n) linear search.

\`\`\`python
# ANTI-PATTERN: O(n) if-elif chain
def get_status(code):
    if code == 200:
        return "OK"
    elif code == 201:
        return "Created"
    elif code == 400:
        return "Bad Request"
    elif code == 404:
        return "Not Found"
    elif code == 500:
        return "Server Error"
    else:
        return "Unknown"
    # Worst case: 6 comparisons

# BETTER: O(1) dict dispatch
STATUS_MESSAGES = {
    200: "OK",
    201: "Created",
    400: "Bad Request",
    404: "Not Found",
    500: "Server Error",
}
def get_status(code):
    return STATUS_MESSAGES.get(code, "Unknown")  # Always 1 lookup!

# FUNCTION DISPATCH - Map to behaviors
def add(x, y): return x + y
def sub(x, y): return x - y
def mul(x, y): return x * y

OPERATIONS = {'+': add, '-': sub, '*': mul}

def calculate(x, op, y):
    operation = OPERATIONS.get(op)
    if not operation:
        raise ValueError(f"Unknown: {op}")
    return operation(x, y)

calculate(10, '+', 5)  # 15 (O(1) dispatch)
\`\`\`
---
Strategy Pattern for Behavior Selection
Strategy pattern replaces if-elif explosion with polymorphism—define multiple algorithms as classes, select at runtime. Better than long if-elif for complex behaviors with shared interface. Each strategy is a separate class implementing the same method. Use when behaviors are complex and might grow.

\`\`\`python
# ANTI-PATTERN: if-elif explosion
def process_payment(method, amount):
    if method == "credit_card":
        # 20 lines of credit card logic
        validate_card()
        charge_card(amount)
        send_receipt()
    elif method == "paypal":
        # 20 lines of PayPal logic
        validate_paypal()
        charge_paypal(amount)
        send_receipt()
    elif method == "bitcoin":
        # 20 lines of Bitcoin logic
        validate_wallet()
        charge_bitcoin(amount)
        send_receipt()
    # Function grows with each payment method!

# BETTER: Strategy pattern
class PaymentStrategy:
    def pay(self, amount):
        raise NotImplementedError

class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        validate_card()
        charge_card(amount)
        send_receipt()

class PayPalPayment(PaymentStrategy):
    def pay(self, amount):
        validate_paypal()
        charge_paypal(amount)
        send_receipt()

class BitcoinPayment(PaymentStrategy):
    def pay(self, amount):
        validate_wallet()
        charge_bitcoin(amount)
        send_receipt()

# Dispatch with dict
PAYMENT_STRATEGIES = {
    "credit_card": CreditCardPayment(),
    "paypal": PayPalPayment(),
    "bitcoin": BitcoinPayment(),
}

def process_payment(method, amount):
    strategy = PAYMENT_STRATEGIES.get(method)
    if not strategy:
        raise ValueError(f"Unknown payment: {method}")
    strategy.pay(amount)

# Easy to extend: just add new strategy class + dict entry
\`\`\`
---
When to Use Each Pattern
Choose based on complexity and performance needs. Simple conditions (1-4 branches) use if-elif. Value mappings (5+ branches) use dict dispatch for O(1) speed. Complex behaviors use Strategy pattern for maintainability. State transitions use State Machine. Match (3.10+) for structural patterns with destructuring.

\`\`\`python
# SIMPLE CONDITIONS: if-elif (1-4 branches)
if age < 13:
    return "child"
elif age < 20:
    return "teen"
else:
    return "adult"

# VALUE MAPPING: Dict dispatch (5+ branches, O(1))
DAYS = {0: "Mon", 1: "Tue", 2: "Wed", 3: "Thu", 
        4: "Fri", 5: "Sat", 6: "Sun"}
day_name = DAYS.get(day_num, "Invalid")

# COMPLEX BEHAVIORS: Strategy pattern
# Use when each branch has 10+ lines of distinct logic

# STATE TRANSITIONS: State machine
class TrafficLight:
    def __init__(self):
        self.state = "red"
    
    def change(self):
        transitions = {
            "red": "green",
            "green": "yellow",
            "yellow": "red"
        }
        self.state = transitions[self.state]

# STRUCTURAL PATTERNS: match (Python 3.10+)
match point:
    case (0, 0):
        return "origin"
    case (x, 0):
        return f"x-axis at {x}"
    case (0, y):
        return f"y-axis at {y}"
    case (x, y):
        return f"point at ({x}, {y})"

# DECISION MATRIX:
# Branches 1-4 + simple → if-elif
# Branches 5+ + value mapping → dict dispatch
# Complex behaviors + growth → Strategy pattern
# State transitions → State machine
# Pattern matching → match (3.10+)
\`\`\`
`

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

const matchIntro = `Pattern Matching for Structural Destructuring
Match (Python 3.10+) brings structural pattern matching—more powerful than switch. Use match when checking ONE value against multiple structural patterns. Use if/elif for DIFFERENT conditions with boolean logic. Match excels at destructuring sequences, dicts, and objects. Requires Python 3.10+, raises SyntaxError on 3.9 or earlier.

\`\`\`python
# MATCH: One value, multiple structural patterns
match response:
    case {"status": "ok", "data": d}:
        return d
    case {"status": "error", "message": msg}:
        raise Exception(msg)
    case _:  # Wildcard (default)
        return None

# IF/ELIF: Different conditions, boolean logic
if user.is_admin() and user.is_active():
    grant_access()
elif user.is_guest():
    limited_access()

# LITERAL PATTERNS
match status_code:
    case 200:
        return "OK"
    case 404:
        return "Not Found"
    case 500:
        return "Server Error"
    case _:
        return "Unknown"

# SEQUENCE PATTERNS - Destructure tuples/lists
match point:
    case (0, 0):
        return "origin"
    case (x, 0):
        return f"x-axis at {x}"
    case (0, y):
        return f"y-axis at {y}"
    case (x, y):
        return f"point ({x}, {y})"

# REST PATTERN
match items:
    case []:
        print("Empty")
    case [first]:
        print(f"One: {first}")
    case [first, *rest]:
        print(f"First: {first}, Rest: {rest}")
\`\`\`
---
Pattern Types: Mapping, Class, and OR Patterns
Mapping patterns match dicts with PARTIAL matching—extra keys ignored. Class patterns destructure objects by attributes. OR patterns (|) match multiple alternatives. Guards add conditional filters with if clauses. Use capture patterns (_) to bind values or ignore them.

\`\`\`python
# MAPPING PATTERNS - Partial dict matching
match user:
    case {"name": n, "role": "admin"}:
        print(f"Admin: {n}")
    case {"name": n}:  # Extra keys OK!
        print(f"User: {n}")

# Real dict can have extra keys:
user = {"name": "Alice", "role": "admin", "email": "alice@example.com"}
# Still matches first case!

# CLASS PATTERNS - Destructure objects
from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

match point:
    case Point(x=0, y=0):
        print("Origin")
    case Point(x=0, y=y):
        print(f"Y-axis: {y}")
    case Point(x=x, y=0):
        print(f"X-axis: {x}")

# OR PATTERNS - Multiple alternatives
match status:
    case 200 | 201 | 204:  # Match any
        return "success"
    case 400 | 401 | 403:
        return "client_error"
    case 500 | 502 | 503:
        return "server_error"

# GUARDS - Add conditionals
match point:
    case (x, y) if x == y:
        print("Diagonal")
    case (x, y) if x > y:
        print("Above diagonal")
    case (x, y):
        print("Below diagonal")

# CAPTURE vs WILDCARD
match data:
    case ["error", msg]:  # msg captures the value
        print(f"Error: {msg}")
    case ["ok", _]:  # _ ignores the value
        print("Success")
\`\`\`
---
Match vs If-Elif vs Dict Dispatch
Choose based on problem structure. Match for structural patterns with destructuring (3.10+ only). If-elif for complex boolean conditions with different variables. Dict dispatch for simple value mappings (O(1), works on all Python versions). Match is most readable for pattern matching but requires Python 3.10+.

\`\`\`python
# WHEN TO USE MATCH
# ✓ Destructuring sequences/dicts
# ✓ Type-based dispatch with patterns
# ✓ Multiple alternatives (OR patterns)
# ✓ Guards with conditionals
# ✗ Requires Python 3.10+

match command:
    case ["quit"] | ["exit"]:
        sys.exit()
    case ["load", filename]:
        load_file(filename)
    case ["save", filename, *options]:
        save_file(filename, options)
    case _:
        print("Unknown command")

# WHEN TO USE IF-ELIF
# ✓ Complex boolean conditions
# ✓ Different variables per condition
# ✓ Works on all Python versions
# ✗ Can't destructure patterns

if user.is_admin() and user.has_permission("write"):
    allow_write()
elif user.is_guest() and not user.is_banned():
    allow_read()
else:
    deny_access()

# WHEN TO USE DICT DISPATCH
# ✓ Simple value → value/function mapping
# ✓ O(1) performance
# ✓ Works on all Python versions
# ✗ Can't handle complex patterns

STATUS_HANDLERS = {
    200: handle_ok,
    404: handle_not_found,
    500: handle_server_error,
}
handler = STATUS_HANDLERS.get(status, handle_unknown)
handler()

# VERSION CHECK for backwards compatibility
import sys
if sys.version_info >= (3, 10):
    # Use match
    match value:
        case pattern: ...
else:
    # Fallback to if-elif
    if value == pattern: ...
\`\`\`
`

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

const loopsIntro = `For Loops: Python's Preferred Iteration
For loops are Python's primary iteration construct—safer, simpler, and more Pythonic than while. For works with ANY iterable: lists, strings, dicts, files, generators. The key insight: NEVER use \`range(len())\` pattern—use \`enumerate()\` for index+value. Use for by default, while only when iterations unknown (user input, two-pointer algorithms, convergence).

\`\`\`python
# ANTI-PATTERN: C-style iteration (NEVER!)
i = 0
while i < len(arr):
    process(arr[i])
    i += 1

# PYTHONIC: For loop
for item in arr:
    process(item)

# NEED INDEX? Use enumerate(), NOT range(len())
# WRONG:
for i in range(len(arr)):
    print(f"{i}: {arr[i]}")

# RIGHT:
for i, item in enumerate(arr):
    print(f"{i}: {item}")

# ITERATE DICT
for key in mydict:  # Keys by default
    print(key)

for key, value in mydict.items():  # Key-value pairs
    print(f"{key}: {value}")

# ITERATE MULTIPLE SEQUENCES
names = ["Alice", "Bob"]
ages = [25, 30]

for name, age in zip(names, ages):
    print(f"{name} is {age}")

# REVERSE ITERATION
for item in reversed(mylist):
    print(item)

# SORTED ITERATION (doesn't modify original)
for item in sorted(mylist):
    print(item)
\`\`\`
---
While Loops and Loop Control
While loops iterate until condition becomes false—use when iteration count unknown. Break exits loop immediately. Continue skips to next iteration. Else clause runs if loop completes without break (rare but useful for search patterns). Avoid infinite loops—ensure condition eventually becomes false.

\`\`\`python
# WHILE for unknown iterations
while True:
    user_input = input("Enter command (quit to exit): ")
    if user_input == "quit":
        break
    process(user_input)

# TWO-POINTER algorithm (while is appropriate)
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] + arr[right] == target:
        return [left, right]
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1

# BREAK - Exit loop early
for item in items:
    if item.is_target():
        found = item
        break  # Stop searching
else:
    # Runs only if loop completes WITHOUT break
    found = None

# CONTINUE - Skip to next iteration
for item in items:
    if not item.is_valid():
        continue  # Skip invalid items
    process(item)

# LOOP-ELSE pattern for search
for user in users:
    if user.name == search_name:
        print(f"Found: {user}")
        break
else:
    print(f"{search_name} not found")

# CONVERGENCE with while
x = initial_value
while abs(x - prev_x) > tolerance:
    prev_x = x
    x = improve(x)  # Binary search, Newton's method, etc.
\`\`\`
---
Iterator Protocol and Lazy Evaluation
Python's iteration protocol: objects with \`__iter__\` (returns iterator) and \`__next__\` (returns next item or raises StopIteration). Generators are lazy iterators—compute values on demand, not all at once. Use generators for large datasets or infinite sequences. Range is lazy in Python 3, lists are eager. Lazy = memory efficient.

\`\`\`python
# ITERATOR PROTOCOL
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # Self is iterator

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(5):
    print(n)  # 5, 4, 3, 2, 1

# GENERATOR - Lazy evaluation with yield
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a  # Pause and return value
        a, b = b, a + b

# Only computes when requested
for num in fibonacci(10):
    print(num)  # 0, 1, 1, 2, 3, 5, 8...

# EAGER (all at once) - Uses memory for all items
eager_list = [x**2 for x in range(1000000)]  # 1M items in memory

# LAZY (on demand) - One item at a time
lazy_gen = (x**2 for x in range(1000000))  # Generator expression
for item in lazy_gen:
    if item > 100:
        break  # Only computed ~10 items, not 1M!

# RANGE is LAZY in Python 3
for i in range(10**9):  # Doesn't create billion ints!
    if i > 10:
        break

# INFINITE ITERATORS
def infinite_counter():
    n = 0
    while True:
        yield n
        n += 1

counter = infinite_counter()
print(next(counter))  # 0
print(next(counter))  # 1
# Can run forever if you keep calling next()

# FILE ITERATION - Memory efficient
with open("huge_file.txt") as f:
    for line in f:  # Reads one line at a time
        process(line)  # Not loading entire file into memory!
\`\`\`
`

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

const comprehensionsIntro = `List vs Generator: The Memory Trade-Off
List comprehensions \`[x for x in data]\` build ENTIRE result in memory—fast for small data (<100K) or multiple iterations. Generator expressions \`(x for x in data)\` yield ONE item at a time—O(1) memory, perfect for 100K+ items or one-time use. CRITICAL: Generators exhaust after one pass—\`list(gen)\` works ONCE, then empty forever.

\`\`\`python
# LIST: Eager evaluation
squares_list = [x**2 for x in range(1000000)]  # ~8MB memory
len(squares_list)  # Works
len(squares_list)  # Works again (persists)

# GENERATOR: Lazy evaluation
squares_gen = (x**2 for x in range(1000000))  # ~100 bytes memory!
sum(squares_gen)   # Works: consumes generator
sum(squares_gen)   # → 0 GOTCHA! Exhausted!

# FIX: Convert to list for multiple passes
squares_gen = (x**2 for x in range(1000000))
squares_list = list(squares_gen)
sum(squares_list)  # Works multiple times

# WHEN TO USE LIST []
# ✓ Small data (<100K items)
# ✓ Need multiple iterations
# ✓ Need len(), indexing, slicing
# ✓ Debugging (can inspect)

# WHEN TO USE GENERATOR ()
# ✓ Large data (100K+ items)
# ✓ One-time iteration
# ✓ Memory constrained
# ✓ Pipeline chaining: sum(x**2 for x in filter(pred, data))

# GOOD: Generator for large one-time sum
total = sum(x**2 for x in range(10000000))  # O(1) memory

# BAD: List for huge one-time use
total = sum([x**2 for x in range(10000000)])  # Wastes ~80MB
\`\`\`
---
Comprehension Syntax and Common Patterns
Python has 4 comprehension types: list \`[]\`, set \`{}\`, dict \`{k:v}\`, generator \`()\`. Structure: \`[EXPR for VAR in ITERABLE if CONDITION]\`. Filter with \`if\`, nest for Cartesian products, use walrus \`:=\` to cache expensive calls. Comprehensions are 20-30% faster than loops for simple transforms.

\`\`\`python
# FOUR TYPES
squares = [x**2 for x in range(10)]  # List
unique = {x**2 for x in [-2, -1, 0, 1, 2]}  # Set (no duplicates)
mapping = {x: x**2 for x in range(5)}  # Dict
lazy = (x**2 for x in range(10))  # Generator

# NO TUPLE COMPREHENSION! Use tuple()
tup = tuple(x for x in range(5))  # → (0, 1, 2, 3, 4)

# FILTERING: if clause
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# MULTIPLE IFS (AND logic)
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# → [0, 6, 12, 18]  (divisible by 2 AND 3)

# WALRUS := to cache expensive calls (3.8+)
filtered = [y for x in data if (y := expensive(x)) > 0]
# Calls expensive() ONCE per item, uses result y

# NESTED: Cartesian product (reads left-to-right)
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# → [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]
# EQUIVALENT LOOP:
# for x in [1, 2, 3]:  # Left = outer
#     for y in ['a', 'b']:  # Right = inner

# FLATTEN nested lists
nested = [[1, 2], [3, 4], [5]]
flat = [item for sublist in nested for item in sublist]
# → [1, 2, 3, 4, 5]

# TERNARY in output (simple only!)
result = ["even" if x % 2 == 0 else "odd" for x in range(5)]

# DICT FROM TWO LISTS
keys = ['a', 'b', 'c']
values = [1, 2, 3]
mapping = {k: v for k, v in zip(keys, values)}

# TRANSPOSE matrix
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = list(zip(*matrix))  # → [(1, 4), (2, 5), (3, 6)]
\`\`\`
---
When NOT to Use Comprehensions
Use regular loops for: complex logic (if/elif/else, try/except), side effects (print, logging), triple+ nesting, exception handling. Rule: if >3 clauses or doesn't fit one readable line, use a loop. Comprehensions for simple map/filter only—readability always wins.

\`\`\`python
# DON'T: Complex ternary (unreadable!)
result = [x if x > 0 else -x if x < 0 else 0 for x in data]

# DO: Regular loop
result = []
for x in data:
    if x > 0:
        result.append(x)
    elif x < 0:
        result.append(-x)
    else:
        result.append(0)

# DON'T: Side effects
[print(x) for x in data]  # Creates useless list of None!

# DO: Regular loop
for x in data:
    print(x)

# DON'T: Exception handling
# result = [int(x) for x in data]  # Crashes on non-numeric!

# DO: Regular loop with try/except
result = []
for x in data:
    try:
        result.append(int(x))
    except ValueError:
        pass  # Skip invalid

# DON'T: Triple nesting
result = [[[x*y*z for z in C] for y in B] for x in A]  # Unreadable!

# DO: Regular loops (clearer)
result = []
for x in A:
    row = []
    for y in B:
        col = [x*y*z for z in C]
        row.append(col)
    result.append(row)

# GOTCHA: Generator exhaustion
gen = (x for x in range(5))
list(gen)  # [0, 1, 2, 3, 4]
list(gen)  # [] EMPTY! Generator exhausted!

# GOTCHA: Nested loop order (left-to-right!)
[(x, y) for x in A for y in B]
# SAME AS:
# for x in A:     # Left part = outer
#     for y in B: # Right part = inner

# BEST PRACTICES
# ✓ Use for simple map/filter operations
# ✓ Use generators for 100K+ items
# ✓ Keep to 1-2 nesting levels max
# ✓ Prefer comprehensions over map/filter
# ✗ NEVER use for side effects
# ✗ NEVER nest 3+ levels
# ✗ NEVER use if/elif/else or try/except
\`\`\`
`

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

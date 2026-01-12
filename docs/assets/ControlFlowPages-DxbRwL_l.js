import{c as e,r as t}from"./index-CXFf_70w.js";const n={fundamentals:{type:`Python Fundamentals`,badge:`py`,color:`var(--accent-functions)`,description:`Core concepts: dynamic typing, strong typing, polymorphism. Understanding Python's object model and type categories.`,intro:`Python's Object Model Foundation
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
\`\`\``},statements:{type:`Statements`,badge:`=`,color:`var(--accent-statements)`,description:`Assignment forms, variable naming, expression statements, and print operations. The building blocks of Python programs.`,intro:`Assignment Creates References, Not Copies
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
\`\`\``},conditionals:{type:`Conditionals`,badge:`if`,color:`var(--accent-none)`,description:`Selection and branching with if, ternary expressions, and boolean logic. Dictionary dispatch for cleaner multi-way branching.`,intro:`Guard Clauses and Early Returns
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
result = 1 and 2 and 3  # -> 3 (all truthy, returns last)
result = 1 and 0 and 3  # -> 0 (returns first falsy)
result = 0 or 1 or 2    # -> 1 (returns first truthy)
result = 0 or "" or []  # -> [] (all falsy, returns last)

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
# - Simple value mappings (like day_num -> "Monday")
# - Function dispatch based on key
# - Complex conditions (use if/elif)
# - Ranges or comparisons (dict keys must be exact)
\`\`\``},conditionalPatterns:{type:`Selection Patterns`,badge:`O(1)`,color:`var(--accent-none)`,description:`Performance comparisons and best practices: if-elif vs dict vs match, short-circuit evaluation, when to use ternary.`,intro:`Dictionary Dispatch for O(1) Lookups
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
# Branches 1-4 + simple -> if-elif
# Branches 5+ + value mapping -> dict dispatch
# Complex behaviors + growth -> Strategy pattern
# State transitions -> State machine
# Pattern matching -> match (3.10+)
\`\`\``},match:{type:`Match Statement`,badge:`match`,color:`var(--accent-none)`,description:`Structural pattern matching (Python 3.10+). Destructure sequences, match types, bind variables, use guards. More powerful than switch.`,intro:`Pattern Matching for Structural Destructuring
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
# - Destructuring sequences/dicts
# - Type-based dispatch with patterns
# - Multiple alternatives (OR patterns)
# - Guards with conditionals
# - Requires Python 3.10+

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
# - Complex boolean conditions
# - Different variables per condition
# - Works on all Python versions
# - Can't destructure patterns

if user.is_admin() and user.has_permission("write"):
    allow_write()
elif user.is_guest() and not user.is_banned():
    allow_read()
else:
    deny_access()

# WHEN TO USE DICT DISPATCH
# - Simple value -> value/function mapping
# - O(1) performance
# - Works on all Python versions
# - Can't handle complex patterns

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
\`\`\``},loops:{type:`Loops`,badge:`for`,color:`var(--accent-none)`,description:`Python loops: for iterates over sequences, while repeats until condition is false. Includes iteration tools and loop control.`,intro:`For Loops: Python's Preferred Iteration
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
\`\`\``},comprehensions:{type:`Comprehensions`,badge:`[]`,color:`var(--accent-none)`,description:`Concise syntax for creating collections: list, dict, set, generator. Transform and filter iterables in one readable expression.`,intro:`List vs Generator: The Memory Trade-Off
List comprehensions \`[x for x in data]\` build ENTIRE result in memory—fast for small data (<100K) or multiple iterations. Generator expressions \`(x for x in data)\` yield ONE item at a time—O(1) memory, perfect for 100K+ items or one-time use. CRITICAL: Generators exhaust after one pass—\`list(gen)\` works ONCE, then empty forever.

\`\`\`python
# LIST: Eager evaluation
squares_list = [x**2 for x in range(1000000)]  # ~8MB memory
len(squares_list)  # Works
len(squares_list)  # Works again (persists)

# GENERATOR: Lazy evaluation
squares_gen = (x**2 for x in range(1000000))  # ~100 bytes memory!
sum(squares_gen)   # Works: consumes generator
sum(squares_gen)   # -> 0 GOTCHA! Exhausted!

# FIX: Convert to list for multiple passes
squares_gen = (x**2 for x in range(1000000))
squares_list = list(squares_gen)
sum(squares_list)  # Works multiple times

# WHEN TO USE LIST []
# - Small data (<100K items)
# - Need multiple iterations
# - Need len(), indexing, slicing
# - Debugging (can inspect)

# WHEN TO USE GENERATOR ()
# - Large data (100K+ items)
# - One-time iteration
# - Memory constrained
# - Pipeline chaining: sum(x**2 for x in filter(pred, data))

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
tup = tuple(x for x in range(5))  # -> (0, 1, 2, 3, 4)

# FILTERING: if clause
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# MULTIPLE IFS (AND logic)
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# -> [0, 6, 12, 18]  (divisible by 2 AND 3)

# WALRUS := to cache expensive calls (3.8+)
filtered = [y for x in data if (y := expensive(x)) > 0]
# Calls expensive() ONCE per item, uses result y

# NESTED: Cartesian product (reads left-to-right)
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# -> [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]
# EQUIVALENT LOOP:
# for x in [1, 2, 3]:  # Left = outer
#     for y in ['a', 'b']:  # Right = inner

# FLATTEN nested lists
nested = [[1, 2], [3, 4], [5]]
flat = [item for sublist in nested for item in sublist]
# -> [1, 2, 3, 4, 5]

# TERNARY in output (simple only!)
result = ["even" if x % 2 == 0 else "odd" for x in range(5)]

# DICT FROM TWO LISTS
keys = ['a', 'b', 'c']
values = [1, 2, 3]
mapping = {k: v for k, v in zip(keys, values)}

# TRANSPOSE matrix
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = list(zip(*matrix))  # -> [(1, 4), (2, 5), (3, 6)]
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
# - Use for simple map/filter operations
# - Use generators for 100K+ items
# - Keep to 1-2 nesting levels max
# - Prefer comprehensions over map/filter
# - NEVER use for side effects
# - NEVER nest 3+ levels
# - NEVER use if/elif/else or try/except
\`\`\``},functions:{type:`Functions`,badge:`def`,color:`var(--accent-functions)`,description:`Functions are first-class objects in Python. Use def for named functions, lambda for anonymous functions.`,intro:`Functions as First-Class Objects
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
\`\`\`
---
Scopes and the LEGB Rule
Python searches scopes in order: Local -> Enclosing -> Global -> Built-in. Assignment creates local variables unless declared \`global\` or \`nonlocal\`. Reading outer scopes works automatically. Modifying requires declaration. Each module is a separate namespace—same variable names in different modules don't collide.

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
\`\`\`
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

say_hi()  # Call #1 \\n Hi!
say_hi()  # Call #2 \\n Hi!
\`\`\``},oop:{type:`OOP`,badge:`class`,color:`var(--accent-oop)`,description:`Object-Oriented Programming in Python. Classes bundle data + behavior. Use when you have state + multiple operations on that state.`,intro:`Classes and Objects Fundamentals
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
\`\`\`
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
\`\`\`
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
\`\`\``}},ee=[{section:`Core Concepts`,signature:`Dynamic Typing`,description:`Python tracks object types at runtime—no manual type declarations needed. Variables are just names bound to objects.`,complexity:`Concept`,example:`x = 42        # x refers to an int
x = "hello"   # now x refers to a str
x = [1, 2, 3] # now x refers to a list
# The variable x has no fixed type`},{section:`Core Concepts`,signature:`Strong Typing`,description:`Operations only work on compatible types. Python won't silently convert types—you'll get a TypeError instead.`,complexity:`Concept`,example:`"hello" + 5      # TypeError: can't concat str and int
"hello" + str(5) # OK: "hello5"
[1, 2] + (3, 4)  # TypeError: can only concat list to list
[1, 2] + [3, 4]  # OK: [1, 2, 3, 4]`},{section:`Core Concepts`,signature:`Polymorphism`,description:`Same operator, different behavior based on type. The + operator adds numbers but concatenates sequences.`,complexity:`Concept`,example:`3 + 4           # 7 (addition)
"ab" + "cd"     # "abcd" (concatenation)
[1, 2] + [3]    # [1, 2, 3] (concatenation)

len("hello")    # 5 (string length)
len([1, 2, 3])  # 3 (list length)`}],te=[{section:`Why & When`,signature:`Choosing Numeric Types`,description:`int for exact counting, float for measurements, Decimal for money/precision, Fraction for exact ratios.`,complexity:`Concept`,example:`# INT - counting, indexing, exact arithmetic
count = 42
index = arr[5]
factorial = 120  # no overflow, unlimited precision

# FLOAT - measurements, scientific, performance
pi = 3.14159
temperature = 98.6
large_dataset = [x * 1.5 for x in range(1000000)]  # fast

# DECIMAL - money, legal precision
from decimal import Decimal
price = Decimal('19.99')
tax = Decimal('0.08')
total = price * (1 + tax)  # exact: 21.5892

# FRACTION - exact ratios, math proofs
from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)

# RULE: int/float by default, Decimal/Fraction when precision matters`},{section:`Why & When`,signature:`Choosing Sequence Types`,description:`list: mutable collection. tuple: immutable collection or dict key. str: text only.`,complexity:`Concept`,example:`# LIST - mutable, dynamic collection
tasks = ["email", "code", "review"]
tasks.append("deploy")  # can modify
tasks.sort()            # in-place operations

# TUPLE - immutable, dict keys, function returns
point = (10, 20)        # can't change
d = {point: "start"}    # hashable = dict key
x, y = point            # unpacking

# Why tuple over list?
# 1. Communicate intent (shouldn't change)
# 2. Use as dict key
# 3. Slightly faster, less memory
# 4. Protection from bugs

# STRING - text only
name = "Alice"          # immutable like tuple
# Use str.split()/join() to convert to/from list`},{section:`Why & When`,signature:`dict vs set vs list`,description:`dict: key-value mapping (O(1) lookup). set: unique items (O(1) membership). list: ordered sequence.`,complexity:`Concept`,example:`# DICT - mapping, caching, counting
user = {"name": "Alice", "age": 30}  # key-value
cache = {"/home": "<html>"}          # O(1) lookup
counts = {}                          # frequency map

# SET - uniqueness, membership testing
seen = set()              # track unique items
if x not in seen:         # O(1) check (not O(n)!)
    seen.add(x)

allowed = {1, 2, 3}       # whitelist
if user_id in allowed:    # O(1) (not list scan!)

# LIST - ordering matters, duplicates OK
tasks = ["a", "b", "a"]   # order + dupes
scores = [95, 87, 95]     # keep all values

# RULE: dict for mapping, set for membership, list for ordering`},{section:`Why & When`,signature:`When Mutability Matters`,description:`Use immutable for dict keys, function defaults, shared state. Mutable for in-place modification.`,complexity:`Concept`,example:`# NEED IMMUTABLE (dict key)
point = (10, 20)
cache = {point: "value"}  # OK

point = [10, 20]
cache = {point: "value"}  # TypeError!

# NEED IMMUTABLE (function default)
def process(data=None):   # OK: None is immutable
    data = data or []

def process(data=[]):     # BUG: default is shared!
    data.append(1)        # all calls share same list!

# NEED MUTABLE (in-place modification)
scores = [95, 87, 92]
scores.sort()             # in-place (list only)
scores.append(88)         # modify (list only)

# IMMUTABLE FOR SAFETY
config = ("localhost", 8080)  # can't accidentally change
`},{section:`Why & When`,signature:`Shared References`,description:`Multiple variables can reference same object. Mutable changes affect all refs. Copy to avoid.`,complexity:`Concept`,example:`# IMMUTABLE - safe sharing
x = 42
y = x        # both point to same 42
x += 1       # creates NEW 43, rebinds x
print(y)     # 42 (unchanged)

# MUTABLE - shared changes!
a = [1, 2, 3]
b = a        # both point to SAME list
a.append(4)
print(b)     # [1, 2, 3, 4] — b changed too!

# COPY to avoid shared changes
a = [1, 2, 3]
b = a[:]           # shallow copy
b = a.copy()       # same as [:]
b = list(a)        # same as [:]

import copy
b = copy.deepcopy(a)  # deep copy (nested)

# WHEN TO WORRY: passing lists/dicts to functions
def modify(lst):
    lst.append(99)  # modifies caller's list!

# SOLUTION: copy inside function if needed
def modify(lst):
    lst = lst[:]    # work on copy
    lst.append(99)`}],r=[{section:`Object Hierarchy`,signature:`Programs → Modules`,description:`Programs are composed of modules (.py files). Each module is a namespace containing definitions.`,complexity:`Concept`,example:`# my_module.py
def greet(name):
    return f"Hello, {name}"

# main.py
import my_module
print(my_module.greet("World"))`},{section:`Object Hierarchy`,signature:`Modules → Statements`,description:`Modules contain statements: assignments, function defs, class defs, control flow, imports.`,complexity:`Concept`,example:`import math          # import statement
x = 10               # assignment statement
def square(n):       # function definition
    return n ** 2
if x > 5:            # control flow statement
    print("big")`},{section:`Object Hierarchy`,signature:`Statements → Expressions`,description:`Statements contain expressions. Expressions produce values and can be nested.`,complexity:`Concept`,example:`# Expression examples
3 + 4 * 2            # arithmetic: 11
len("hello") > 3     # comparison: True
[x**2 for x in range(5)]  # list comp: [0,1,4,9,16]
lambda x: x + 1      # function object`},{section:`Object Hierarchy`,signature:`Expressions → Objects`,description:`Expressions create and process objects. Everything in Python is an object with identity, type, and value.`,complexity:`Concept`,example:`x = [1, 2, 3]
id(x)      # identity: memory address
type(x)    # type: <class 'list'>
x          # value: [1, 2, 3]

# Even functions are objects
def foo(): pass
type(foo)  # <class 'function'>`}],i=[{section:`Mutability`,signature:`Immutable Objects`,description:`Cannot be changed after creation. Includes: int, float, str, tuple, frozenset, bytes. Safe as dict keys.`,complexity:`Concept`,example:`s = "hello"
s[0] = "H"    # TypeError: strings are immutable
s = "Hello"   # OK: creates NEW string, rebinds s

t = (1, 2, 3)
t[0] = 99     # TypeError: tuples are immutable

# Immutable = hashable = can be dict key
d = {(1, 2): "point"}  # OK`},{section:`Mutability`,signature:`Mutable Objects`,description:`Can be modified in place. Includes: list, dict, set, bytearray. Changes affect all references.`,complexity:`Concept`,example:`a = [1, 2, 3]
b = a           # b references same object
a.append(4)
print(b)        # [1, 2, 3, 4] — b changed too!

# Mutable = not hashable = can't be dict key
d = {[1, 2]: "x"}  # TypeError: unhashable type`}],a=[{section:`Type Categories`,signature:`Numbers`,description:`int (unlimited precision), float (64-bit), complex, Decimal (exact), Fraction. Support +, -, *, /, //, %, **.`,complexity:`Concept`,example:`42                    # int
3.14                  # float
2 + 3j                # complex
10 ** 100             # big int (no overflow!)
from decimal import Decimal
Decimal('0.1') + Decimal('0.2')  # 0.3 (exact)`},{section:`Type Categories`,signature:`Sequences`,description:`Ordered collections with positional access. str, list, tuple support indexing [i], slicing [i:j], len(), iteration.`,complexity:`Concept`,example:`# All sequences support:
s = "hello"
s[0]       # 'h' (indexing)
s[1:4]     # 'ell' (slicing)
len(s)     # 5
's' in s   # False (membership)
for c in s: print(c)  # iteration`},{section:`Type Categories`,signature:`Mappings`,description:`Key-value stores with O(1) lookup. dict is the only built-in mapping. Keys must be hashable (immutable).`,complexity:`Concept`,example:`d = {"name": "Alice", "age": 30}
d["name"]          # "Alice" (O(1) lookup)
d["city"] = "NYC"  # add/update
"age" in d         # True (O(1) membership)
d.keys()           # dict_keys(['name', 'age', 'city'])`},{section:`Type Categories`,signature:`Sets`,description:`Unordered collections of unique hashable items. O(1) membership test. Support union |, intersection &, difference -.`,complexity:`Concept`,example:`s = {1, 2, 3, 2, 1}  # {1, 2, 3} (deduped)
3 in s               # True (O(1))
{1, 2} | {2, 3}      # {1, 2, 3} (union)
{1, 2} & {2, 3}      # {2} (intersection)
{1, 2} - {2, 3}      # {1} (difference)`}],o=[{section:`Numeric Literals`,signature:`Alternative Bases`,description:`Integers can be written in hex (0x), octal (0o), and binary (0b). Underscores improve readability.`,complexity:`Concept`,example:`0xFF        # 255 (hexadecimal)
0o77        # 63 (octal)
0b1010      # 10 (binary)
1_000_000   # 1000000 (underscores ignored)

bin(10)     # '0b1010'
hex(255)    # '0xff'
oct(64)     # '0o100'`},{section:`Numeric Literals`,signature:`Complex Numbers`,description:`Written as real+imagj. Used in engineering and science. Access parts with .real and .imag.`,complexity:`Concept`,example:`z = 3 + 4j
z.real      # 3.0
z.imag      # 4.0
abs(z)      # 5.0 (magnitude)
z * (1 - 2j)  # (11-2j)`},{section:`Numeric Literals`,signature:`Decimal & Fraction`,description:`Decimal avoids float inaccuracy. Fraction represents exact ratios. Import from decimal/fractions modules.`,complexity:`Concept`,example:`from decimal import Decimal
Decimal('0.1') + Decimal('0.2')  # Decimal('0.3')
0.1 + 0.2  # 0.30000000000000004 (float!)

from fractions import Fraction
Fraction(1, 3) + Fraction(1, 6)  # Fraction(1, 2)`}],s=[{section:`Operators & Expressions`,signature:`Operator Precedence`,description:`** binds tightest, then */%, then +-. Use parentheses to override. Associativity: ** is right-to-left.`,complexity:`Concept`,example:`2 + 3 * 4     # 14 (not 20)
(2 + 3) * 4   # 20
2 ** 3 ** 2   # 512 (= 2^9, right-to-left)
(2 ** 3) ** 2 # 64

-3 ** 2       # -9 (** binds tighter than -)
(-3) ** 2     # 9`},{section:`Operators & Expressions`,signature:`Mixed-Type Conversion`,description:`Python converts "up" to the most complex type. int → float → complex. No implicit str conversion.`,complexity:`Concept`,example:`3 + 4.0       # 7.0 (int → float)
2 + 3j        # (2+3j) (int → complex)
True + 1      # 2 (bool is int subclass)

"x" + 3       # TypeError (no implicit conversion)
"x" + str(3)  # "x3" (explicit conversion)`},{section:`Operators & Expressions`,signature:`Division Types`,description:`True division (/) always returns float. Floor division (//) truncates toward negative infinity.`,complexity:`Concept`,example:`7 / 2         # 3.5 (true division)
7 // 2        # 3 (floor division)
-7 // 2       # -4 (floors toward -∞)

divmod(7, 2)  # (3, 1) — quotient and remainder
7 % 2         # 1 (modulo)`},{section:`Operators & Expressions`,signature:`Chained Comparisons`,description:`Python allows chaining: a < b < c means (a < b) and (b < c). More readable than manual AND.`,complexity:`Concept`,example:`x = 5
1 < x < 10    # True (x is between 1 and 10)
1 < x > 3     # True (x > 1 and x > 3)

# Equivalent to:
1 < x and x < 10  # True`},{section:`Operators & Expressions`,signature:`Float Equality`,description:`Never use == for floats due to hardware limitations. Use math.isclose() or compare with tolerance.`,complexity:`Concept`,example:`0.1 + 0.2 == 0.3        # False!
0.1 + 0.2               # 0.30000000000000004

import math
math.isclose(0.1 + 0.2, 0.3)  # True

# Or manual tolerance:
abs((0.1 + 0.2) - 0.3) < 1e-9  # True`},{section:`Operators & Expressions`,signature:`Bitwise Operations`,description:`Work on integer bits: & (AND), | (OR), ^ (XOR), ~ (NOT), << (left shift), >> (right shift).`,complexity:`Concept`,example:`5 & 3         # 1  (0101 & 0011 = 0001)
5 | 3         # 7  (0101 | 0011 = 0111)
5 ^ 3         # 6  (0101 ^ 0011 = 0110)
~5            # -6 (inverts all bits)
1 << 3        # 8  (shift left = multiply by 2^n)
8 >> 2        # 2  (shift right = divide by 2^n)`}],c=[{section:`Numeric Modules`,signature:`math Module`,description:`Standard math functions: sqrt, ceil, floor, log, sin, cos, pi, e, factorial, gcd.`,complexity:`Concept`,example:`import math
math.sqrt(16)     # 4.0
math.ceil(3.2)    # 4
math.floor(3.8)   # 3
math.pi           # 3.141592653589793
math.factorial(5) # 120
math.gcd(12, 8)   # 4`},{section:`Numeric Modules`,signature:`random Module`,description:`Random numbers and selections: random(), randint(), choice(), shuffle(), sample().`,complexity:`Concept`,example:`import random
random.random()        # 0.0 to 1.0
random.randint(1, 10)  # 1 to 10 inclusive
random.choice([1,2,3]) # pick one
random.shuffle(lst)    # shuffle in place
random.sample(lst, 2)  # pick 2 without replacement`},{section:`Numeric Modules`,signature:`statistics Module`,description:`Statistical functions: mean, median, mode, stdev, variance. For basic stats without NumPy.`,complexity:`Concept`,example:`import statistics as stats
data = [1, 2, 2, 3, 4, 5]
stats.mean(data)    # 2.833...
stats.median(data)  # 2.5
stats.mode(data)    # 2
stats.stdev(data)   # 1.472...`}],l=[{section:`Philosophy & Tools`,signature:`The Zen of Python`,description:`Python's design principles. "Beautiful is better than ugly. Simple is better than complex."`,complexity:`Concept`,example:`import this  # Print the Zen of Python

# Key principles:
# "Explicit is better than implicit"
# "Simple is better than complex"
# "Readability counts"
# "There should be one obvious way to do it"
# "Errors should never pass silently"
# "In the face of ambiguity, refuse to temptation to guess"

# Check: is my code readable? explicit? simple?`},{section:`Philosophy & Tools`,signature:`Tool Redundancy`,description:`Python offers overlapping tools. Know the options, but prefer the simplest that works.`,complexity:`Concept`,example:`# STRING FORMATTING (4 ways)
name = "Alice"
"Hello, %s" % name           # % (legacy)
"Hello, {}".format(name)     # .format()
f"Hello, {name}"             # f-string (preferred!)

# ATTRIBUTE MANAGEMENT (4 ways)
# @property       → Simple computed attributes
# Descriptors     → Reusable attribute logic
# __getattr__     → Undefined attribute fallback
# __getattribute__→ ALL attribute access (rare)

# CLASS AUGMENTATION (3 ways)
# Manual rebind   → C = decorator(C)
# @decorator      → Syntactic sugar (preferred!)
# metaclass=      → Framework-level (rare)`},{section:`Philosophy & Tools`,signature:`Recommended Choices`,description:`When in doubt, prefer the simpler, more readable option. Advanced features are for frameworks.`,complexity:`Concept`,example:`# PREFER:
f"Hello, {name}"     # Over % or .format()
with open(f) as f:   # Over try/finally
@property            # Over descriptors
@decorator           # Over metaclasses
list comprehension   # Over map/filter

# USE ADVANCED WHEN NEEDED:
# Descriptors      → Reusable validation
# __getattr__      → Delegation/proxies
# Metaclasses      → Framework APIs
# Generators       → Large/infinite data

# "If you wonder whether you need metaclasses,
#  you probably don't."`}],u=[...ee,...te,...r,...i,...a,...o,...s,...c,...l],d=[{section:`Assignment Fundamentals`,signature:`target = object`,description:`Basic assignment creates a reference to an object. Variables are names bound to objects, not containers holding values.`,complexity:`Concept`,example:`x = 42          # x refers to int object 42
y = x           # y refers to same object as x
x = "hello"     # x now refers to a new str object
print(y)        # 42 (y still refers to original int)`},{section:`Assignment Fundamentals`,signature:`Name Creation`,description:`Variable names are created when first assigned. No declaration needed—Python creates the name on first use.`,complexity:`Concept`,example:`# No declaration needed
count = 0       # creates 'count' on first assignment
total = 100     # creates 'total'

# Using before assignment raises error
print(undefined_var)  # NameError: name not defined`},{section:`Assignment Fundamentals`,signature:`Required Initialization`,description:`A name must be assigned before use. Referencing an unassigned name raises NameError.`,complexity:`Concept`,example:`# This fails
if False:
    x = 1
print(x)  # NameError: 'x' is not defined

# Must initialize before use
x = None  # or some default
if condition:
    x = computed_value`},{section:`Assignment Fundamentals`,signature:`Implicit Assignment`,description:`Assignment occurs in many contexts: imports, function/class defs, for loops, with statements, function arguments.`,complexity:`Concept`,example:`import math           # assigns 'math' to module
def greet(): pass     # assigns 'greet' to function
class Dog: pass       # assigns 'Dog' to class
for i in range(3):    # assigns 'i' each iteration
    print(i)
with open("f") as f:  # assigns 'f' to file handle
    pass`}],f=[{section:`Why & When`,signature:`Basic vs Sequence Assignment`,description:`Use sequence assignment for unpacking, swapping, or multiple return values. Use basic for single values.`,complexity:`Concept`,example:`# BASIC ASSIGNMENT - single values
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

# RULE: Use unpacking when you need multiple values at once`},{section:`Why & When`,signature:`When to Use * Unpacking`,description:`Use * to collect variable-length sequences. Common in function args, list slicing, ignoring values.`,complexity:`Concept`,example:`# COLLECT remaining items
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
a, *b = [1]  # b=[] not b=None`},{section:`Why & When`,signature:`When Augmented Assignment Matters`,description:`Use += for efficiency and in-place modification. CRITICAL: += behaves differently for mutables vs immutables.`,complexity:`Concept`,example:`# IMMUTABLE (int, str) - creates new object
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
# 3. In-place modification (for lists)`},{section:`Why & When`,signature:`When to Use Walrus :=`,description:`Use := to avoid duplicate computation or to assign within expression. Python 3.8+ only.`,complexity:`Concept`,example:`# WHILE LOOPS - assign and test
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
# - Python < 3.8`},{section:`Why & When`,signature:`Multiple Assignment Gotcha`,description:`a = b = [] creates shared reference. Safe for immutables, dangerous for mutables. Use separate assignments.`,complexity:`Concept`,example:`# SAFE with immutables
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

# RULE: Never use mutable defaults or multiple assignment for mutables`}],p=[{section:`Sequence Assignment`,signature:`a, b = iterable`,description:`Tuple unpacking assigns elements by position. Left side can be tuple or list of targets.`,complexity:`Concept`,example:`# Basic unpacking
a, b = 1, 2         # a=1, b=2
x, y = [10, 20]     # works with lists too
first, second = "AB"  # works with strings

# Nested unpacking
(a, b), c = [1, 2], 3  # a=1, b=2, c=3`},{section:`Sequence Assignment`,signature:`a, b = b, a`,description:`Swap values without a temporary variable. Right side evaluated before assignment.`,complexity:`Concept`,example:`a, b = 1, 2
a, b = b, a     # swap: a=2, b=1

# Works with any number of values
x, y, z = z, x, y  # rotate values

# Common in algorithms
arr[i], arr[j] = arr[j], arr[i]  # swap elements`},{section:`Sequence Assignment`,signature:`*name (Extended Unpacking)`,description:`Starred target collects remaining items into a list. Only one starred name allowed per assignment.`,complexity:`Concept`,example:`# Collect remaining items
first, *rest = [1, 2, 3, 4]
# first=1, rest=[2, 3, 4]

*head, last = [1, 2, 3, 4]
# head=[1, 2, 3], last=4

first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

# Starred always produces list (even if empty)
a, *b = [1]  # a=1, b=[]`}],m=[{section:`Multiple & Augmented`,signature:`a = b = c = value`,description:`Multiple-target assignment. All names reference the same object. Safe for immutables, risky for mutables.`,complexity:`Concept`,example:`# Safe with immutables
a = b = c = 0
a = 1         # only 'a' changes
print(b, c)   # 0 0

# Risky with mutables!
a = b = []    # same list object
a.append(1)
print(b)      # [1] — b changed too!

# Use separate assignments for mutables
a, b = [], []  # different list objects`},{section:`Multiple & Augmented`,signature:`x += y (Augmented)`,description:`Augmented assignment combines operation with assignment. More efficient—evaluates left side once, may update in-place.`,complexity:`Concept`,example:`# Numeric augmented ops
x = 10
x += 5    # x = x + 5 → 15
x -= 3    # x = x - 3 → 12
x *= 2    # x = x * 2 → 24
x //= 5   # x = x // 5 → 4
x **= 2   # x = x ** 2 → 16

# All augmented operators:
# += -= *= /= //= %= **= &= |= ^= >>= <<=`},{section:`Multiple & Augmented`,signature:`list += vs list = list +`,description:`For mutables, += modifies in-place (extends). Regular + creates new object. Important distinction!`,complexity:`Concept`,example:`# += extends in-place
L = [1, 2]
M = L          # same object
L += [3, 4]    # extends L in-place
print(M)       # [1, 2, 3, 4] — M changed!

# + creates new object
L = [1, 2]
M = L
L = L + [3, 4]  # creates new list
print(M)        # [1, 2] — M unchanged`}],h=[{section:`Walrus Operator`,signature:`name := expression`,description:`Named expression (Python 3.8+). Assigns and returns value in one expression. Useful in conditions.`,complexity:`Concept`,example:`# In while loops - read, assign, test
while (line := input()) != "quit":
    print(f"You typed: {line}")

# In if statements
if (n := len(data)) > 10:
    print(f"Too long: {n} items")

# In comprehensions
results = [y for x in data if (y := process(x))]`},{section:`Walrus Operator`,signature:`:= in Comprehensions`,description:`Avoid duplicate computation by assigning intermediate results within comprehensions.`,complexity:`Concept`,example:`# Without walrus - calls func twice
[func(x) for x in data if func(x) > 0]

# With walrus - calls func once
[y for x in data if (y := func(x)) > 0]

# Filter and transform in one pass
[clean for s in strings if (clean := s.strip())]`}],g=[{section:`Variable Naming`,signature:`Naming Rules`,description:`Names must start with letter or underscore, followed by letters, digits, or underscores. Case-sensitive.`,complexity:`Concept`,example:`# Valid names
count = 1
_private = 2
myVar2 = 3
CamelCase = 4

# Invalid names
2var = 1      # SyntaxError: can't start with digit
my-var = 1    # SyntaxError: hyphen not allowed
my var = 1    # SyntaxError: spaces not allowed`},{section:`Variable Naming`,signature:`Reserved Words`,description:`Cannot use Python keywords as variable names. 35 reserved words in Python 3.`,complexity:`Concept`,example:`# Reserved words (cannot use as names)
# False, None, True, and, as, assert, async,
# await, break, class, continue, def, del,
# elif, else, except, finally, for, from,
# global, if, import, in, is, lambda,
# nonlocal, not, or, pass, raise, return,
# try, while, with, yield

import keyword
print(keyword.kwlist)  # list all keywords`},{section:`Variable Naming`,signature:`Naming Conventions`,description:`Underscore conventions signal intent: _private, __mangled, __dunder__. Not enforced but widely followed.`,complexity:`Concept`,example:`_internal = 1      # "private" by convention
__mangled = 2      # name mangling in classes
__init__ = 3       # system-defined "dunder"

# In classes
class MyClass:
    def __init__(self):
        self._protected = 1   # internal use
        self.__private = 2    # becomes _MyClass__private

# Single underscore for unused
for _ in range(3):  # don't need loop variable
    print("hi")`}],_=[{section:`Expression Statements`,signature:`Expression as Statement`,description:`Any expression can be a statement. Common for function calls with side effects.`,complexity:`Concept`,example:`# Function calls as statements
print("Hello")    # side effect: output
my_list.append(1) # side effect: modifies list
my_list.sort()    # side effect: sorts in place

# Standalone expressions (result discarded)
3 + 4             # computed but not stored
len("hello")      # result ignored`},{section:`Expression Statements`,signature:`In-Place Method Gotcha`,description:`In-place methods return None. Assigning their result loses the object reference.`,complexity:`Concept`,example:`# WRONG - loses list reference
L = [3, 1, 2]
L = L.sort()    # L is now None!
L = L.append(4) # L is now None!

# CORRECT - call method, don't assign
L = [3, 1, 2]
L.sort()        # modifies L in place
L.append(4)     # modifies L in place
print(L)        # [1, 2, 3, 4]

# Same issue: reverse(), clear(), extend()`}],v=[{section:`Print Operations`,signature:`print(*objects, sep, end, file)`,description:`Prints objects to stream. sep separates items (default space), end terminates (default newline).`,complexity:`Concept`,example:`print("a", "b", "c")          # a b c
print("a", "b", sep="-")      # a-b
print("a", end="")            # no newline
print("b")                    # ab on same line

# Multiple values
x, y = 1, 2
print(x, y)                   # 1 2
print(f"{x=}, {y=}")          # x=1, y=2`},{section:`Print Operations`,signature:`print(..., file=f)`,description:`Redirect output to file object. Writes to any file-like object with write() method.`,complexity:`Concept`,example:`# Write to file
with open("log.txt", "w") as f:
    print("Log entry", file=f)

# Write to stderr
import sys
print("Error!", file=sys.stderr)

# Capture to string
from io import StringIO
buffer = StringIO()
print("captured", file=buffer)
output = buffer.getvalue()  # "captured\\n"`},{section:`Print Operations`,signature:`sys.stdout Redirection`,description:`Reassigning sys.stdout redirects all print calls. Restore original when done.`,complexity:`Concept`,example:`import sys

# Save and redirect
original = sys.stdout
sys.stdout = open("output.txt", "w")

print("This goes to file")  # redirected
print("So does this")       # redirected

# Restore
sys.stdout.close()
sys.stdout = original
print("Back to console")    # normal`}],y=[...d,...f,...p,...m,...h,...g,..._,...v],b=[{section:`Fundamentals`,signature:`if statement basics`,description:`Execute code ONLY if condition is True. Must end with colon. Indented block runs when True, skipped when False.`,complexity:`Concept`,example:`# Basic if - runs ONLY when True
if 2 + 2 == 4:
    print("Math works!")  # This runs

if 2 + 2 == 5:
    print("Broken math")  # This is SKIPPED

# Real example with variable
grade = 95
if grade >= 70:
    print("You passed!")  # Runs

# IMPORTANT: Don't forget the colon!
# if grade >= 70   # SyntaxError: missing colon
# Must be: if grade >= 70:`},{section:`Fundamentals`,signature:`if-else statement`,description:`if for True case, else for False case (otherwise). else has NO condition - runs when if is False.`,complexity:`Concept`,example:`# if-else: handle both cases
grade = 40
if grade >= 70:
    print("You passed!")
else:
    print("You did not pass :(")  # This runs

# In English: "If grade >= 70, print passed.
# OTHERWISE, print did not pass."

# else needs colon too!
# else   # SyntaxError!
# else:  # Correct

# Code after if-else runs regardless
print("Thank you for attending.")  # Always runs`},{section:`Fundamentals`,signature:`if-elif-else statement`,description:`Multiple conditions. Tests run top-to-bottom. First True condition runs, rest SKIPPED. elif = "else if".`,complexity:`Concept`,example:`# Multiple conditions with elif
grade = 85
if grade >= 90:
    print("A")
elif grade >= 80:      # This runs! (first True)
    print("B")
elif grade >= 70:      # SKIPPED (already found True)
    print("C")
else:                  # SKIPPED
    print("F")

# Only ONE block executes!
# Checks stop after first True

# elif also needs colon
# elif grade >= 80   # SyntaxError!
# elif grade >= 80:  # Correct`}],x=[{section:`if Statement`,signature:`if test: ... elif: ... else:`,description:`Primary selection tool. Evaluates tests top-to-bottom, executes first true block, then exits.`,complexity:`Concept`,example:`x = 85
if x >= 90:
    grade = 'A'
elif x >= 80:
    grade = 'B'
elif x >= 70:
    grade = 'C'
else:
    grade = 'F'
print(grade)  # B`},{section:`if Statement`,signature:`if test:`,description:`Simple if without elif or else. Block executes only when test is true.`,complexity:`Concept`,example:`x = 10
if x > 0:
    print("positive")  # prints

if x < 0:
    print("negative")  # skipped

# Multiple independent ifs (all checked)
if x > 5: print("big")      # prints
if x % 2 == 0: print("even") # prints`},{section:`if Statement`,signature:`Nested if`,description:`if statements can be nested for multi-layered logic. Indentation defines scope.`,complexity:`Concept`,example:`age = 25
has_license = True

if age >= 18:
    if has_license:
        print("Can drive")
    else:
        print("Need license")
else:
    print("Too young")
# Output: Can drive`}],S=[{section:`Ternary Expression`,signature:`Y if X else Z`,description:`One-line conditional expression. Returns Y if X is true, else Z. Not a statement.`,complexity:`Concept`,example:`x = 10
result = "even" if x % 2 == 0 else "odd"
print(result)  # even

# In function call
print("yes" if True else "no")  # yes

# Assignment
score = 85
grade = 'pass' if score >= 60 else 'fail'`},{section:`Ternary Expression`,signature:`Nested Ternary`,description:`Can be chained but avoid deep nesting for readability.`,complexity:`Concept`,example:`x = 5
size = "small" if x < 3 else "medium" if x < 7 else "large"
print(size)  # medium

# Equivalent if/elif/else
if x < 3:
    size = "small"
elif x < 7:
    size = "medium"
else:
    size = "large"`}],C=[{section:`Dictionary Branching`,signature:`dict[key] for branching`,description:`Use dict to map choices to values or functions. More flexible than long if/elif chains.`,complexity:`O(1)`,example:`# Value mapping
day_names = {
    0: 'Monday', 1: 'Tuesday', 2: 'Wednesday',
    3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
}
print(day_names[2])  # Wednesday

# With default via .get()
print(day_names.get(7, 'Invalid'))  # Invalid`},{section:`Dictionary Branching`,signature:`dict[key]() for dispatch`,description:`Map keys to functions for dynamic dispatch. Cleaner than if/elif with many branches.`,complexity:`O(1)`,example:`def add(a, b): return a + b
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
print(ops['+'](3, 4))  # 7`}],w=[{section:`Truth Values`,signature:`Falsy Values`,description:`Values that evaluate to False: None, False, 0, 0.0, "", [], {}, set(), range(0).`,complexity:`Concept`,example:`# All falsy
bool(None)    # False
bool(False)   # False
bool(0)       # False
bool(0.0)     # False
bool("")      # False
bool([])      # False
bool({})      # False
bool(set())   # False`},{section:`Truth Values`,signature:`Truthy Values`,description:`Everything not falsy is truthy. Non-zero numbers, non-empty collections.`,complexity:`Concept`,example:`# All truthy
bool(1)       # True
bool(-1)      # True
bool(0.1)     # True
bool("0")     # True (non-empty string!)
bool([0])     # True (non-empty list!)
bool({0: 0})  # True (non-empty dict!)
bool(" ")     # True (space is a character)`},{section:`Truth Values`,signature:`Pythonic Conditionals`,description:`Use truthiness directly. Avoid explicit comparisons like == True or len() > 0.`,complexity:`Concept`,example:`# Pythonic
if my_list:           # not: if len(my_list) > 0
    process(my_list)

if not my_string:     # not: if my_string == ""
    my_string = "default"

if value:             # not: if value != None
    use(value)

# Exception: when None vs 0 matters
if value is not None:  # explicit None check
    process(value)`}],T=[{section:`Boolean Operators`,signature:`x and y`,description:`Returns x if x is falsy, otherwise y. Short-circuits: stops if first is false.`,complexity:`O(1)`,example:`# Short-circuit evaluation
True and True    # True
True and False   # False
False and True   # False (never evaluates True)

# Returns actual values, not just True/False
5 and 3          # 3 (both truthy, returns last)
0 and 3          # 0 (first is falsy, returns it)
"" and "hi"      # "" (first is falsy)`},{section:`Boolean Operators`,signature:`x or y`,description:`Returns x if x is truthy, otherwise y. Short-circuits: stops if first is true.`,complexity:`O(1)`,example:`# Short-circuit evaluation
True or False    # True (never evaluates False)
False or True    # True
False or False   # False

# Returns actual values
5 or 3           # 5 (first is truthy)
0 or 3           # 3 (first is falsy)
"" or "default"  # "default" (common pattern!)

# Default value pattern
name = user_input or "Anonymous"`},{section:`Boolean Operators`,signature:`not x`,description:`Returns True if x is falsy, False if x is truthy.`,complexity:`O(1)`,example:`not True     # False
not False    # True
not 0        # True
not 1        # False
not ""       # True
not "hello"  # False
not []       # True
not [1, 2]   # False`},{section:`Boolean Operators`,signature:`Short-Circuit Patterns`,description:`Use short-circuit for safe access and defaults. Left side guards right side.`,complexity:`O(1)`,example:`# Safe dictionary access
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
    process(lst)`}],E=[{section:`Syntax Rules`,signature:`Indentation-Based Blocks`,description:`Python uses indentation (not braces) to define blocks. Consistent spaces required.`,complexity:`Concept`,example:`# Correct indentation
if True:
    print("a")
    print("b")    # same block
    if True:
        print("c")  # nested block
    print("d")    # back to outer block

# IndentationError examples
if True:
print("wrong")    # not indented
  print("also wrong")  # inconsistent`},{section:`Syntax Rules`,signature:`Open-Pairs Rule`,description:`Code in (), [], {} can span multiple lines. Preferred way to handle long statements.`,complexity:`Concept`,example:`# Long list
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
    do_something()`},{section:`Syntax Rules`,signature:`Docstrings`,description:`String at top of module/function/class stored in __doc__. Use triple quotes.`,complexity:`Concept`,example:`def greet(name):
    """Return a greeting message.

    Args:
        name: The name to greet.

    Returns:
        A greeting string.
    """
    return f"Hello, {name}!"

print(greet.__doc__)  # prints docstring
help(greet)           # shows docstring`}],D=[...b,...x,...S,...C,...w,...T,...E],O=[{section:`Performance & Patterns`,signature:`if-elif vs dict dispatch`,description:`Dict dispatch is O(1) for value lookup. if-elif is O(n) worst case. Use dict for many branches with simple mapping.`,complexity:`Concept`,example:`# IF-ELIF CHAIN - O(n) worst case
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
# - Fewer than 5 branches`},{section:`Performance & Patterns`,signature:`if-elif vs match (3.10+)`,description:`match for pattern matching and destructuring. if-elif for boolean logic and different variables.`,complexity:`Concept`,example:`# IF-ELIF - different conditions, boolean logic
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
# - Simple comparisons`},{section:`Performance & Patterns`,signature:`Short-circuit evaluation`,description:`and/or stop evaluation as soon as result is determined. Use for efficiency and null safety.`,complexity:`O(1) best case`,example:`# AND short-circuit - stops at first False
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
# Put cheap/likely-true conditions first in OR chains`},{section:`Performance & Patterns`,signature:`Ternary vs if-else`,description:`Ternary for simple value assignment. if-else for complex logic or multiple statements.`,complexity:`Concept`,example:`# TERNARY - single value assignment
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

# RULE: If it doesn't fit on one readable line, use if-else`}],k=[{section:`Fundamentals`,signature:`match subject: case pattern:`,description:`Pattern matching (Python 3.10+). Compares subject against patterns, executes first match. Structural pattern matching.`,complexity:`Concept`,example:`command = "quit"
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
# Will not work in Python 3.9 or earlier`},{section:`Fundamentals`,signature:`case _: (wildcard)`,description:`Underscore matches anything. Acts as default/fallback when no other case matches. Like else in if-elif-else.`,complexity:`Concept`,example:`status = 404
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

# Always put _ case last (like else)`},{section:`Why & When`,signature:`When to use match vs if`,description:`Use match for structural patterns, multiple conditions with same variable. Use if for different conditions or simple checks.`,complexity:`Concept`,example:`# GOOD for match - checking same value many times
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
    case (x, y): return f"point ({x}, {y})"`},{section:`Why & When`,signature:`match vs dict vs if-elif`,description:`match: patterns and destructuring. dict: O(1) value lookup. if-elif: different conditions. Choose based on use case.`,complexity:`Concept`,example:`# IF-ELIF - different conditions (O(n) worst case)
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
# match: O(1) to O(n) - depends on patterns`},{section:`Pattern Types`,signature:`Literal patterns`,description:`Match exact values: numbers, strings, booleans, None.`,complexity:`Concept`,example:`value = 42
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
        print(f"Got {value}")`},{section:`Pattern Types`,signature:`case pattern1 | pattern2:`,description:`Or-pattern matches any of the listed alternatives. Like "or" in boolean logic.`,complexity:`Concept`,example:`char = 'a'
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
        print(f"Small: {small}")`},{section:`Pattern Types`,signature:`Sequence patterns [x, y, ...]`,description:`Match and unpack sequences (lists, tuples). Can capture elements into variables. Use * for rest.`,complexity:`Concept`,example:`point = (0, 5)
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
        print(a, b, c, d)  # 1 2 3 4`},{section:`Pattern Types`,signature:`Mapping patterns {"key": value}`,description:`Match dictionaries. Extracts values for specified keys. Extra keys ignored.`,complexity:`Concept`,example:`action = {"type": "click", "x": 100, "y": 200}
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
        print(f"Name: {n}")  # matches`},{section:`Pattern Types`,signature:`Capture patterns (as name)`,description:`Capture matched value into variable. Use "as" keyword.`,complexity:`Concept`,example:`# Capture with as
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
        # Full: [1, 2, 3], First: 1, Rest: [2, 3]`},{section:`Guards`,signature:`case pattern if guard:`,description:`Guard adds extra condition. Pattern must match AND guard must be true. Allows complex filtering.`,complexity:`Concept`,example:`point = (3, 4)
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
        grant_access()`},{section:`Guards`,signature:`Guard evaluation`,description:`Guards evaluated AFTER pattern matches. Can reference captured variables.`,complexity:`Concept`,example:`# Guard uses captured variables
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
        process(value)`},{section:`Advanced Patterns`,signature:`Wildcard in sequences`,description:`Use _ to ignore specific positions in sequence patterns.`,complexity:`Concept`,example:`# Ignore middle elements
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
        print(f"x = {x}")`},{section:`Advanced Patterns`,signature:`Class patterns`,description:`Match class instances and extract attributes. Uses positional or keyword patterns.`,complexity:`Concept`,example:`from dataclasses import dataclass

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
        print(f"({x}, {y})")  # matches`}],A=[{section:`Fundamentals`,signature:`Why use loops?`,description:`Loops repeat code multiple times. Use while for condition-based repetition, for for iterating over collections.`,complexity:`Concept`,example:`# Loops repeat code - computers never get tired!
# Two types: while and for

# WHILE - repeat WHILE condition is True
count = 0
while count < 3:
    print(count)  # 0, 1, 2
    count += 1

# FOR - repeat for EACH item in collection
for letter in "Python":
    print(letter)  # P, y, t, h, o, n

# Why loops?
# - Process collections
# - Repeat until condition met
# - Avoid copy-paste code`},{section:`Fundamentals`,signature:`while loop basics`,description:`Repeats WHILE condition is True. Test happens BEFORE each iteration. Must update condition or infinite loop!`,complexity:`O(varies)`,example:`# while loop structure:
# 1. while keyword
# 2. test condition
# 3. colon
# 4. indented body

n = 1
while n < 5:        # Test condition
    print(n)        # Body (indented!)
    n = n + 1       # MUST change n or infinite!
# Prints: 1, 2, 3, 4

# Process stops when condition becomes False
# After n=4, loop runs, n becomes 5
# Then n < 5 is False, loop exits

# DANGER: Infinite loop if condition always True
# while n < 5:      # n never changes
#     print(n)      # Prints forever!`},{section:`Fundamentals`,signature:`for loop basics`,description:`Executes once for EACH item in collection. Number of iterations = number of items. Safer than while (no infinite loops).`,complexity:`O(n)`,example:`# for loop structure:
# 1. for keyword
# 2. variable name
# 3. in keyword
# 4. iterable (string, list, tuple, etc.)
# 5. colon
# 6. indented body

# Loop over string
for letter in "Python":
    print(letter)
# P, y, t, h, o, n (6 iterations)

# Loop over list
for color in ["red", "green", "blue"]:
    print(color)

# Variable gets each value automatically
# No need to manually update like while
# Can't have infinite loop!`},{section:`For Loop`,signature:`for x in iterable:`,description:`Iterates over each element in an iterable (list, tuple, string, etc.).`,complexity:`O(n)`,example:`for i in [1, 2, 3]:
    print(i)  # 1, 2, 3

for char in "hello":
    print(char)  # h, e, l, l, o

for key in {'a': 1, 'b': 2}:
    print(key)  # a, b`},{section:`For Loop`,signature:`for i in range(n):`,description:`Iterates n times with i from 0 to n-1.`,complexity:`O(n)`,example:`for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(2, 5):
    print(i)  # 2, 3, 4

for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1`},{section:`For Loop`,signature:`for i, val in enumerate(iterable):`,description:`Iterates with both index and value.`,complexity:`O(n)`,example:`fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

for i, fruit in enumerate(fruits, 1):  # Start at 1
    print(f"{i}: {fruit}")`},{section:`For Loop`,signature:`for a, b in zip(iter1, iter2):`,description:`Iterates over multiple iterables in parallel.`,complexity:`O(n)`,example:`names = ['Alice', 'Bob']
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
# Alice is 25
# Bob is 30

# Three iterables
for a, b, c in zip([1,2], [3,4], [5,6]):
    print(a, b, c)  # 1 3 5, then 2 4 6`},{section:`For Loop`,signature:`for (a, b) in iterable:`,description:`Tuple unpacking in loop target. Automatically unpacks each item.`,complexity:`O(n)`,example:`pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for num, letter in pairs:
    print(num, letter)
# 1 a, 2 b, 3 c

# Dict items
for key, value in {'x': 1, 'y': 2}.items():
    print(key, value)  # x 1, y 2`},{section:`For Loop`,signature:`for first, *rest in iterable:`,description:`Extended unpacking with starred target. Collects remaining items into list.`,complexity:`O(n)`,example:`data = [(1, 2, 3, 4), (5, 6, 7, 8)]
for first, *rest in data:
    print(first, rest)
# 1 [2, 3, 4]
# 5 [6, 7, 8]

for *head, last in [(1,2,3), (4,5,6)]:
    print(head, last)  # [1,2] 3, [4,5] 6`},{section:`For Loop`,signature:`Nested for loops`,description:`For loops can nest to process multi-dimensional data or find combinations.`,complexity:`O(n*m)`,example:`# Matrix traversal
matrix = [[1, 2], [3, 4], [5, 6]]
for row in matrix:
    for val in row:
        print(val, end=' ')  # 1 2 3 4 5 6

# Find common items
list1, list2 = [1, 2, 3], [2, 3, 4]
common = []
for x in list1:
    for y in list2:
        if x == y:
            common.append(x)  # [2, 3]`},{section:`While Loop`,signature:`while condition:`,description:`Repeats while condition is True. Check happens before each iteration.`,complexity:`O(varies)`,example:`count = 0
while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4

# Infinite loop (use with break)
while True:
    user_input = input("Enter 'q' to quit: ")
    if user_input == 'q':
        break`},{section:`While Loop`,signature:`while condition: ... else:`,description:`else block runs if loop completes without break.`,complexity:`O(n)`,example:`count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Done!")  # Prints "Done!"

# With break - else doesn't run
count = 0
while count < 10:
    if count == 5:
        break
    count += 1
else:
    print("Never printed")`},{section:`While Loop`,signature:`while True: (do-until)`,description:`Simulate "do until" by placing break at end of loop body. Guarantees at least one execution.`,complexity:`O(n)`,example:`# "Do until" pattern: always runs at least once
while True:
    num = int(input("Enter positive: "))
    if num > 0:  # exit condition at END
        break
    print("Try again")  # only if condition fails`},{section:`Loop Control`,signature:`break`,description:`Immediately exits the innermost loop.`,complexity:`O(1)`,example:`for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# Nested loops - only breaks inner
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(i, j)  # (0,0), (1,0), (2,0)`},{section:`Loop Control`,signature:`continue`,description:`Skips rest of current iteration and continues with next.`,complexity:`O(1)`,example:`for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4 (skips 2)

# Skip even numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9`},{section:`Loop Control`,signature:`for ... else:`,description:`else block runs if loop completes without break. Useful for search patterns.`,complexity:`O(n)`,example:`# Search pattern
numbers = [1, 3, 5, 7, 9]
target = 4
for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found")  # Prints "Not found"

# Prime check
def is_prime(n):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    else:
        return n > 1`},{section:`Loop Control`,signature:`pass`,description:`Does nothing. Placeholder for empty blocks.`,complexity:`O(1)`,example:`for i in range(5):
    pass  # TODO: implement later

while True:
    pass  # Infinite loop that does nothing

# Empty function body
def not_implemented():
    pass`},{section:`Iteration Tools`,signature:`reversed(sequence)`,description:`Returns reverse iterator. Sequence must support len and indexing.`,complexity:`O(1)`,example:`for i in reversed([1, 2, 3]):
    print(i)  # 3, 2, 1

for char in reversed("hello"):
    print(char)  # o, l, l, e, h

# Convert to list
print(list(reversed([1, 2, 3])))  # [3, 2, 1]`},{section:`Iteration Tools`,signature:`sorted(iterable)`,description:`Returns new sorted list from iterable.`,complexity:`O(n log n)`,example:`for x in sorted([3, 1, 4, 1, 5]):
    print(x)  # 1, 1, 3, 4, 5

# Reverse order
for x in sorted([3, 1, 4], reverse=True):
    print(x)  # 4, 3, 1

# Custom key
words = ['banana', 'pie', 'Washington']
for w in sorted(words, key=len):
    print(w)  # pie, banana, Washington`},{section:`Iteration Tools`,signature:`map(func, iterable)`,description:`Applies function to each element. Returns iterator.`,complexity:`O(1)`,example:`for x in map(str.upper, ['a', 'b', 'c']):
    print(x)  # A, B, C

# Multiple iterables
for x in map(lambda a, b: a + b, [1, 2], [3, 4]):
    print(x)  # 4, 6`},{section:`Iteration Tools`,signature:`filter(func, iterable)`,description:`Yields elements where func returns True.`,complexity:`O(1)`,example:`for x in filter(lambda x: x > 0, [-2, -1, 0, 1, 2]):
    print(x)  # 1, 2

# None removes falsy values
for x in filter(None, [0, 1, '', 'hi', [], [1]]):
    print(x)  # 1, 'hi', [1]`},{section:`itertools`,signature:`itertools.chain(*iterables)`,description:`Chains multiple iterables into one.`,complexity:`O(1)`,example:`from itertools import chain

for x in chain([1, 2], [3, 4], [5]):
    print(x)  # 1, 2, 3, 4, 5

# Flatten
nested = [[1, 2], [3, 4]]
flat = list(chain.from_iterable(nested))
print(flat)  # [1, 2, 3, 4]`},{section:`itertools`,signature:`itertools.product(*iterables)`,description:`Cartesian product of iterables.`,complexity:`O(n*m)`,example:`from itertools import product

for x, y in product([1, 2], ['a', 'b']):
    print(x, y)
# 1 a, 1 b, 2 a, 2 b

# Repeat parameter
for x, y in product([0, 1], repeat=2):
    print(x, y)  # 0 0, 0 1, 1 0, 1 1`},{section:`itertools`,signature:`itertools.combinations(iter, r)`,description:`All r-length combinations without repetition.`,complexity:`O(n^r)`,example:`from itertools import combinations

for combo in combinations([1, 2, 3], 2):
    print(combo)
# (1, 2), (1, 3), (2, 3)

# Choose 3 from 4
for combo in combinations('ABCD', 3):
    print(combo)
# ('A','B','C'), ('A','B','D'), ('A','C','D'), ('B','C','D')`},{section:`itertools`,signature:`itertools.permutations(iter, r)`,description:`All r-length permutations (order matters).`,complexity:`O(n!)`,example:`from itertools import permutations

for perm in permutations([1, 2, 3], 2):
    print(perm)
# (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)

# All permutations
for perm in permutations('ABC'):
    print(''.join(perm))
# ABC, ACB, BAC, BCA, CAB, CBA`},{section:`itertools`,signature:`itertools.groupby(iter, key)`,description:`Groups consecutive elements by key function.`,complexity:`O(n)`,example:`from itertools import groupby

data = [('a', 1), ('a', 2), ('b', 3), ('b', 4)]
for key, group in groupby(data, lambda x: x[0]):
    print(key, list(group))
# a [('a', 1), ('a', 2)]
# b [('b', 3), ('b', 4)]

# Must be sorted first for non-consecutive groups!
data = sorted(data, key=lambda x: x[0])`},{section:`Common Patterns`,signature:`Loop with index`,description:`Different ways to access index while iterating.`,complexity:`O(n)`,example:`# Best: enumerate
for i, val in enumerate(['a', 'b', 'c']):
    print(i, val)

# Avoid: range(len())
lst = ['a', 'b', 'c']
for i in range(len(lst)):  # Not Pythonic
    print(i, lst[i])`},{section:`Common Patterns`,signature:`Early termination`,description:`Use any/all with generator for efficient short-circuit evaluation.`,complexity:`O(n) worst`,example:`# Stop at first match
numbers = range(1000000)
has_negative = any(x < 0 for x in numbers)  # False, checks all

# Check all meet condition
all_positive = all(x > 0 for x in [1, 2, 3])  # True
all_positive = all(x > 0 for x in [1, -2, 3]) # False (stops at -2)`},{section:`Common Patterns`,signature:`Walrus operator (:=)`,description:`Assignment expression. Assigns and returns value. (Python 3.8+)`,complexity:`O(1)`,example:`# Read until empty line
while (line := input()) != "":
    print(f"You said: {line}")

# Filter and use value
if (n := len(data)) > 10:
    print(f"List has {n} items")

# In comprehension
results = [y for x in data if (y := process(x)) is not None]`}],j=[{section:`Fundamentals`,signature:`Comprehension Syntax`,description:`Comprehensions provide concise syntax for creating collections. Four types: list [], dict {k:v}, set {}, generator (). All share the same structure.`,complexity:`Concept`,example:`# List comprehension - builds entire list in memory
squares_list = [x**2 for x in range(5)]
print(squares_list)  # [0, 1, 4, 9, 16]

# Set comprehension - unique values only
squares_set = {x**2 for x in range(-3, 4)}
print(squares_set)  # {0, 1, 4, 9} (no duplicates)

# Dict comprehension - key:value pairs
squares_dict = {x: x**2 for x in range(5)}
print(squares_dict)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# Generator expression - lazy evaluation (memory efficient)
squares_gen = (x**2 for x in range(5))
print(list(squares_gen))  # [0, 1, 4, 9, 16]

# All use same structure: [EXPR for VAR in ITERABLE if CONDITION]`},{section:`Why & When`,signature:`When to use Comprehensions`,description:`Use comprehensions for simple transformations/filtering. Use regular loops for complex logic, multiple statements, or when readability suffers.`,complexity:`Concept`,example:`# GOOD - simple transformation
squares = [x**2 for x in range(10)]

# GOOD - filter and transform
evens = [x for x in range(20) if x % 2 == 0]

# BAD - too complex (use regular loop instead!)
# result = [x.upper() if x.startswith('a') else x.lower()
#           if len(x) > 3 else x for x in words if x]

# BETTER - regular loop for complex logic
result = []
for x in words:
    if not x:
        continue
    if x.startswith('a'):
        result.append(x.upper())
    elif len(x) > 3:
        result.append(x.lower())
    else:
        result.append(x)

# RULE: If you can't read it easily, use a loop`},{section:`Why & When`,signature:`Comprehension vs Loop vs map/filter`,description:`Comprehensions: readable, Pythonic. Loops: flexible, debuggable. map/filter: functional style, less readable. Choose based on complexity.`,complexity:`Concept`,example:`# LIST COMPREHENSION - most Pythonic
squares = [x**2 for x in range(10)]

# REGULAR LOOP - more lines but debuggable
squares = []
for x in range(10):
    squares.append(x**2)  # Can add breakpoint here

# MAP - functional style (less Pythonic in Python)
squares = list(map(lambda x: x**2, range(10)))

# Performance: comprehensions ≈ loops > map/filter
# Readability: comprehensions > loops > map/filter

# WHEN TO USE EACH:
# Comprehension: simple transform/filter (1-2 operations)
# Loop: complex logic, multiple statements, debugging
# map/filter: when already have function, functional codebase`},{section:`Why & When`,signature:`List vs Generator Expression`,description:`List []: builds all items immediately. Generator (): yields items lazily. Use generator for large data, one-time iteration, or infinite sequences.`,complexity:`Concept`,example:`# LIST - all items in memory (fast iteration, high memory)
squares_list = [x**2 for x in range(1000000)]
print(sum(squares_list))  # Uses ~8MB memory!

# GENERATOR - one item at a time (slower iteration, low memory)
squares_gen = (x**2 for x in range(1000000))
print(sum(squares_gen))  # Uses ~100 bytes! (constant memory)

# When to use LIST []:
# - Need to iterate multiple times
# - Small dataset (< 10K items)
# - Need len(), indexing, slicing

# When to use GENERATOR ():
# - Large dataset (> 100K items)
# - Only iterate once
# - Pipeline of transformations
# - Infinite sequences

# WARNING: Generators exhaust after one iteration!
gen = (x for x in range(3))
print(list(gen))  # [0, 1, 2]
print(list(gen))  # [] (EMPTY - already consumed!)`},{section:`List Comprehension`,signature:`[expr for x in iterable]`,description:`Creates a list by applying expression to each item. Most common comprehension form.`,complexity:`O(n)`,example:`squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

doubled = [x * 2 for x in [1, 2, 3]]
print(doubled)  # [2, 4, 6]

upper = [s.upper() for s in ['a', 'b', 'c']]
print(upper)  # ['A', 'B', 'C']

# Convert types
strings = [str(x) for x in [1, 2, 3]]
print(strings)  # ['1', '2', '3']`},{section:`List Comprehension`,signature:`[expr for x in iterable if condition]`,description:`List comprehension with filter condition. Condition filters which items are processed.`,complexity:`O(n)`,example:`evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Only positive
positives = [x for x in [-2, -1, 0, 1, 2] if x > 0]
print(positives)  # [1, 2]

# Filter and transform
words = ['hello', '', 'world', '']
non_empty = [w.upper() for w in words if w]
print(non_empty)  # ['HELLO', 'WORLD']

# Multiple conditions
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
print(result)  # [0, 6, 12, 18] (divisible by 2 AND 3)`},{section:`List Comprehension`,signature:`[expr if cond else other for x in iter]`,description:`Conditional expression (ternary) in comprehension. Transforms items based on condition.`,complexity:`O(n)`,example:`# Replace negatives with 0
nums = [-2, -1, 0, 1, 2]
result = [x if x > 0 else 0 for x in nums]
print(result)  # [0, 0, 0, 1, 2]

# Label values
labels = ['even' if x % 2 == 0 else 'odd' for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']

# Clamp values
clamped = [min(x, 100) for x in [50, 150, 200]]
print(clamped)  # [50, 100, 100]`},{section:`List Comprehension`,signature:`Nested comprehension`,description:`Multiple for clauses in a single comprehension. Flattens nested structures or creates combinations.`,complexity:`O(n*m)`,example:`# Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]
print(flat)  # [1, 2, 3, 4, 5]

# All combinations (cartesian product)
pairs = [(x, y) for x in [1, 2] for y in ['a', 'b']]
print(pairs)  # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# Matrix creation
matrix = [[i*3+j for j in range(3)] for i in range(3)]
print(matrix)  # [[0,1,2], [3,4,5], [6,7,8]]

# WARNING: Readability limit!
# Too many nested fors = use regular loops instead`},{section:`Dict Comprehension`,signature:`{k: v for ...}`,description:`Creates a dictionary from key-value expression. Keys must be hashable and unique.`,complexity:`O(n)`,example:`squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From two lists (zip)
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# With condition (filter)
d = {x: x**2 for x in range(10) if x % 2 == 0}
print(d)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}

# From items
d = {k.upper(): v*2 for k, v in [('a', 1), ('b', 2)]}
print(d)  # {'A': 2, 'B': 4}`},{section:`Dict Comprehension`,signature:`Invert dict`,description:`Swap keys and values using comprehension. WARNING: Values must be unique and hashable.`,complexity:`O(n)`,example:`original = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}

# WARNING: Duplicate values = last one wins!
dup = {'a': 1, 'b': 1, 'c': 2}
inv = {v: k for k, v in dup.items()}
print(inv)  # {1: 'b', 2: 'c'} ('a' lost!)

# Group by value (use defaultdict instead)
from collections import defaultdict
grouped = defaultdict(list)
for k, v in dup.items():
    grouped[v].append(k)
print(dict(grouped))  # {1: ['a', 'b'], 2: ['c']}`},{section:`Set Comprehension`,signature:`{expr for x in iterable}`,description:`Creates a set from expression. Duplicates automatically removed. Use for unique values.`,complexity:`O(n)`,example:`squares = {x**2 for x in range(-3, 4)}
print(squares)  # {0, 1, 4, 9} (duplicates removed)

# Unique first letters
words = ['apple', 'banana', 'apricot', 'blueberry']
first_letters = {w[0] for w in words}
print(first_letters)  # {'a', 'b'}

# Remove duplicates from list
nums = [1, 2, 2, 3, 3, 3]
unique = {x for x in nums}
print(unique)  # {1, 2, 3}

# With filter
unique_evens = {x for x in range(20) if x % 2 == 0}
print(unique_evens)  # {0, 2, 4, ..., 18}`},{section:`Generator Expression`,signature:`(expr for x in iterable)`,description:`Creates a generator. Memory efficient - yields items one at a time. Use for large data or one-time iteration.`,complexity:`O(1) creation`,example:`gen = (x**2 for x in range(5))
print(gen)       # <generator object ...>
print(list(gen)) # [0, 1, 4, 9, 16]

# Memory efficient for large data
sum_squares = sum(x**2 for x in range(1000000))
# Uses constant memory (not 1M-item list!)

# Can only iterate once! (exhausts)
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] (EMPTY - already consumed!)

# Pipeline of generators (memory efficient)
nums = range(1000000)
evens = (x for x in nums if x % 2 == 0)
squares = (x**2 for x in evens)
result = sum(squares)  # Only uses ~100 bytes!`},{section:`Advanced Patterns`,signature:`Walrus in comprehension`,description:`Assignment expression := can capture intermediate values. Python 3.8+ only.`,complexity:`O(n)`,example:`# Capture intermediate result
data = [1, 2, 3, 4, 5]
results = [y for x in data if (y := x**2) > 10]
print(results)  # [16, 25] (squares > 10)

# Avoid repeated calculation
import math
nums = [10, 20, 30, 40]
sqrt_vals = [s for n in nums if (s := math.sqrt(n)) > 4]
print(sqrt_vals)  # [4.47..., 5.47..., 6.32...]

# WARNING: Variable leaks into outer scope (3.8-3.11)
# In Python 3.12+ this is fixed`},{section:`Advanced Patterns`,signature:`Flatten nested structures`,description:`Use nested for loops to flatten multi-level nesting. Order: outer for first, inner for second.`,complexity:`O(n*m)`,example:`# Flatten 2D list
matrix = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat = [item for row in matrix for item in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Flatten 3D list
cube = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
flat = [x for layer in cube for row in layer for x in row]
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8]

# Alternative: itertools.chain.from_iterable
from itertools import chain
flat = list(chain.from_iterable(matrix))
print(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`},{section:`Advanced Patterns`,signature:`Comprehension with enumerate`,description:`Combine comprehension with enumerate for index-aware transformations.`,complexity:`O(n)`,example:`# Add index to values
words = ['apple', 'banana', 'cherry']
indexed = [f"{i}: {w}" for i, w in enumerate(words)]
print(indexed)  # ['0: apple', '1: banana', '2: cherry']

# Filter by index
evens_only = [w for i, w in enumerate(words) if i % 2 == 0]
print(evens_only)  # ['apple', 'cherry']

# Create dict with index as key
d = {i: w for i, w in enumerate(words)}
print(d)  # {0: 'apple', 1: 'banana', 2: 'cherry'}`}],M=[{section:`Fundamentals`,signature:`What is a function?`,description:`Functions are VALUES, like numbers and strings. They break code into reusable chunks. Call with () to execute.`,complexity:`Concept`,example:`# Functions are values!
print(type(len))  # <class 'builtin_function_or_method'>

# Assign to variable
my_len = len
print(my_len([1, 2, 3]))  # 3 - still works!

# Functions have names separate from the function itself
# The name 'len' refers to the function value

# Call with () to execute
len([1, 2, 3])   # Calls function, returns 3
len              # Just the function object, doesn't run`},{section:`Fundamentals`,signature:`How functions execute`,description:`3 steps: 1) Call with arguments, 2) Execute body, 3) Return value and replace call. Function call is REPLACED by return value.`,complexity:`Concept`,example:`# Execution process:
# 1. Call with argument(s)
# 2. Function executes
# 3. Returns value, call is replaced

num_letters = len("four")

# Step by step:
# 1. len() called with "four"
# 2. Length calculated (4)
# 3. len("four") REPLACED by 4
# Now: num_letters = 4

# Same as writing:
num_letters = 4`},{section:`Fundamentals`,signature:`Side effects`,description:`Functions can do more than return values. Side effect = changing something external. print() returns None but displays text.`,complexity:`Concept`,example:`# print() has side effect (displays text)
# But returns None!
return_value = print("Hello")
print(return_value)  # None

print(type(return_value))  # <class 'NoneType'>

# Side effect: text displayed
# Return value: None

# Functions can:
# - Return values (main purpose)
# - Have side effects (modify external state)
# - Both!`}],N=[{section:`Why & When`,signature:`When to use functions`,description:`Use functions for code reuse, abstraction, and organization. Rule of thumb: if you copy-paste code, make it a function.`,complexity:`Concept`,example:`# WITHOUT FUNCTIONS - repetitive
print(f"Welcome, {user1}!")
print(f"Your score: {score1}")
print("=" * 30)

print(f"Welcome, {user2}!")
print(f"Your score: {score2}")
print("=" * 30)  # Repeated 3 times!

# WITH FUNCTION - reusable
def display_user(name, score):
    print(f"Welcome, {name}!")
    print(f"Your score: {score}")
    print("=" * 30)

display_user(user1, score1)
display_user(user2, score2)  # DRY - Don't Repeat Yourself

# WHEN TO USE FUNCTIONS:
# - Code used 2+ times
# - Clear, testable unit of work
# - Complex logic needing a name
# - Breaking down large blocks (<20 lines per function)`},{section:`Why & When`,signature:`Functions vs classes`,description:`Functions for stateless operations. Classes for objects with state + multiple methods. Start simple with functions.`,complexity:`Concept`,example:`# USE FUNCTION when stateless
def calculate_area(radius):
    return 3.14159 * radius ** 2

area = calculate_area(5)  # Simple, no state needed

# USE CLASS when you need state
class Circle:
    def __init__(self, radius):
        self.radius = radius  # State!

    def area(self):
        return 3.14159 * self.radius ** 2

    def circumference(self):
        return 2 * 3.14159 * self.radius

c = Circle(5)
print(c.area())          # Uses self.radius (state)
print(c.circumference()) # Multiple related methods

# GUIDELINES:
# Functions: stateless transform, single operation
# Classes: maintain state, multiple related operations
# Start with functions, refactor to class if needed`},{section:`Why & When`,signature:`def vs lambda`,description:`def for multi-line logic and readability. lambda for simple inline expressions (sort keys, callbacks).`,complexity:`Concept`,example:`# LAMBDA - simple inline expression
square = lambda x: x ** 2
nums = [1, 2, 3]
squared = list(map(lambda x: x ** 2, nums))

# USE LAMBDA when:
# - Single expression
# - Used once inline (sort key, filter)
# - Callback for higher-order function

students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
by_grade = sorted(students, key=lambda s: s[1])

# USE DEF when:
# - Multiple statements
# - Needs name/documentation
# - Used multiple times
# - Complex logic

def validate_and_process(data):
    """Process data with validation"""  # Docstring!
    if not data:  # Multiple statements
        return None
    return data.strip().upper()

# READABILITY: def is clearer for anything complex
# BAD: lambda x: x.strip().upper() if x else None
# GOOD: def clean(x): ...`},{section:`Why & When`,signature:`Recursion vs iteration`,description:`Recursion for tree/graph structures. Iteration for simple loops. Python has recursion limit (~1000).`,complexity:`Concept`,example:`# ITERATION - simple, efficient
def factorial_iter(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# RECURSION - elegant for trees/graphs
def factorial_rec(n):
    if n <= 1:
        return 1
    return n * factorial_rec(n - 1)

# RECURSION LIMIT
import sys
print(sys.getrecursionlimit())  # ~1000

# WHEN TO USE RECURSION:
# - Tree/graph traversal (natural fit)
# - Divide and conquer (merge sort, quicksort)
# - Backtracking problems
# - With @lru_cache for memoization

# WHEN TO USE ITERATION:
# - Simple loops (counters, lists)
# - Deep nesting (> 1000 levels)
# - Performance critical (recursion has call overhead)
# - Tail recursion (Python doesn't optimize it!)

# BEST: Use iteration by default, recursion when it makes code clearer`},{section:`Why & When`,signature:`Function call overhead`,description:`Functions have call overhead (~100ns). Negligible for most code. Only inline for tight inner loops.`,complexity:`Concept`,example:`# FUNCTION CALL OVERHEAD
def add(a, b):
    return a + b

# Each call costs ~100 nanoseconds (overhead)
# For 1 million calls: ~0.1 seconds total

# WHEN IT MATTERS:
# Tight inner loop called millions of times
total = 0
for i in range(10_000_000):
    total += add(i, 1)  # 10M calls - overhead noticeable

# WHEN TO INLINE (rare!):
total = 0
for i in range(10_000_000):
    total += i + 1  # No function call

# WHEN IT DOESN'T MATTER (99% of code):
# - I/O operations (network, disk)
# - Complex logic (business rules)
# - User interactions
# - Most application code

# RULE: Write readable functions first
# Profile before optimizing
# Only inline if profiling shows bottleneck`}],P=[{section:`Function Definition`,signature:`def func_name(params):`,description:`Defines a function with optional parameters. Functions are first-class objects.`,complexity:`O(1)`,example:`def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Function with multiple statements
def calculate(x, y):
    result = x + y
    return result`},{section:`Function Definition`,signature:`func() vs func`,description:`Parentheses required to call. Without (), you reference the function object itself.`,complexity:`O(1)`,example:`def greet():
    return "Hello!"

greet()   # "Hello!" - calls the function
greet     # <function greet> - the function object

# Common mistake
print(greet)   # <function greet...> (not called!)
print(greet()) # "Hello!" (called)

# Passing function as argument
funcs = [len, sum, max]
for f in funcs:
    print(f([1, 2, 3]))  # 3, 6, 3`},{section:`Function Definition`,signature:`return value`,description:`Returns a value from function. Without return, function returns None.`,complexity:`O(1)`,example:`def add(a, b):
    return a + b

def no_return():
    print("No return statement")

print(add(2, 3))      # 5
print(no_return())    # None`},{section:`Function Definition`,signature:`return x, y, z`,description:`Returns multiple values as a tuple. Can be unpacked on assignment.`,complexity:`O(1)`,example:`def get_stats(nums):
    return min(nums), max(nums), sum(nums)

low, high, total = get_stats([1, 2, 3, 4, 5])
print(low, high, total)  # 1 5 15

# Or receive as tuple
result = get_stats([1, 2, 3])
print(result)  # (1, 3, 6)`}],F=[{section:`Parameters`,signature:`def func(a, b, c):`,description:`Positional parameters. Must be provided in order when calling.`,complexity:`O(1)`,example:`def greet(first, last, greeting):
    return f"{greeting}, {first} {last}!"

print(greet("John", "Doe", "Hello"))
# Hello, John Doe!`},{section:`Parameters`,signature:`def func(a=default):`,description:`Default parameter values. Used if argument not provided.`,complexity:`O(1)`,example:`def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))           # Hello, Alice!
print(greet("Bob", "Hi"))       # Hi, Bob!

# WARNING: Mutable defaults are shared!
def bad(lst=[]):
    lst.append(1)
    return lst
print(bad())  # [1]
print(bad())  # [1, 1] - same list!

# Fix: use None as default
def good(lst=None):
    if lst is None:
        lst = []
    lst.append(1)
    return lst`},{section:`Parameters`,signature:`def func(*, kw_only):`,description:`Keyword-only parameters. Must be passed by name after *.`,complexity:`O(1)`,example:`def func(a, b, *, c, d):
    return a + b + c + d

# func(1, 2, 3, 4)  # TypeError
print(func(1, 2, c=3, d=4))  # 10

# All keyword-only
def config(*, host, port, debug=False):
    return f"{host}:{port}"

print(config(host="localhost", port=8080))`},{section:`Parameters`,signature:`def func(pos_only, /):`,description:`Positional-only parameters (Python 3.8+). Cannot be passed by name.`,complexity:`O(1)`,example:`def func(a, b, /, c, d):
    return a + b + c + d

# func(a=1, b=2, c=3, d=4)  # TypeError
print(func(1, 2, c=3, d=4))  # 10
print(func(1, 2, 3, 4))      # 10

# Combined: positional-only, regular, keyword-only
def f(a, /, b, *, c):
    return a + b + c`}],I=[{section:`*args and **kwargs`,signature:`*args`,description:`Captures variable positional arguments as a tuple.`,complexity:`O(n)`,example:`def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))     # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Hello", "Alice", "Bob", "Charlie")`},{section:`*args and **kwargs`,signature:`**kwargs`,description:`Captures variable keyword arguments as a dictionary.`,complexity:`O(n)`,example:`def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

def create_user(name, **attrs):
    return {"name": name, **attrs}

user = create_user("Bob", age=25, role="admin")
print(user)  # {'name': 'Bob', 'age': 25, 'role': 'admin'}`},{section:`*args and **kwargs`,signature:`*args, **kwargs`,description:`Accept any combination of arguments. Common for wrappers/decorators.`,complexity:`O(n)`,example:`def universal(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

universal(1, 2, 3, a=4, b=5)
# Args: (1, 2, 3)
# Kwargs: {'a': 4, 'b': 5}

# Pass through to another function
def wrapper(func, *args, **kwargs):
    print("Before call")
    result = func(*args, **kwargs)
    print("After call")
    return result`}],L=[{section:`Argument Unpacking`,signature:`func(*iterable)`,description:`Unpacks iterable as positional arguments when calling.`,complexity:`O(n)`,example:`def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))  # 6

# Works with any iterable
print(add(*range(1, 4)))  # 6
print(add(*(1, 2, 3)))    # 6`},{section:`Argument Unpacking`,signature:`func(**dict)`,description:`Unpacks dictionary as keyword arguments when calling.`,complexity:`O(n)`,example:`def greet(name, greeting, punctuation):
    return f"{greeting}, {name}{punctuation}"

params = {"name": "Alice", "greeting": "Hello", "punctuation": "!"}
print(greet(**params))  # Hello, Alice!

# Combine both
args = [1, 2]
kwargs = {"c": 3, "d": 4}
def func(a, b, c, d):
    return a + b + c + d
print(func(*args, **kwargs))  # 10`}],R=[{section:`Lambda Functions`,signature:`lambda args: expr`,description:`Anonymous function for simple expressions. Returns result of expression.`,complexity:`O(1)`,example:`square = lambda x: x ** 2
print(square(5))  # 25

add = lambda x, y: x + y
print(add(3, 4))  # 7

# With defaults
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))  # Hello, Alice!`},{section:`Lambda Functions`,signature:`Lambda with sort/filter`,description:`Common use cases for lambda with built-in functions.`,complexity:`O(n log n)`,example:`# Sort by custom key
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
print(sorted_pairs)  # [(1, 'one'), (3, 'three'), (2, 'two')]

# Filter
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6]

# Map
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25, 36]`}],z=[{section:`Scopes & LEGB`,signature:`LEGB Rule`,description:`Name lookup order: Local → Enclosing → Global → Built-in. First match wins.`,complexity:`Concept`,example:`x = "global"          # Global scope

def outer():
    x = "enclosing"    # Enclosing scope
    def inner():
        x = "local"    # Local scope
        print(x)       # "local"
    inner()

outer()
print(x)  # "global" (outer scopes unchanged)

# Built-in example
print(len([1,2,3]))  # 3 (len from built-in scope)`},{section:`Scopes & LEGB`,signature:`Shadowing built-ins`,description:`Built-in names can be reassigned (not reserved). Avoid—causes confusion.`,complexity:`Concept`,example:`# DON'T DO THIS (but it works)
len = 99
# print(len([1,2,3]))  # TypeError: int not callable

# Restore by deleting local binding
del len
print(len([1,2,3]))  # 3 (built-in works again)

# Common accidental shadows
# list = [1, 2, 3]     # shadows list()
# str = "hello"        # shadows str()
# id = 123             # shadows id()`},{section:`Scopes & LEGB`,signature:`Local scope lifetime`,description:`Local names exist only while function executes. Created on call, destroyed on return.`,complexity:`Concept`,example:`def func():
    x = 10  # created when func() called
    return x
# x destroyed when func returns

# Each call gets fresh locals
def counter():
    count = 0      # reset each call
    count += 1
    return count

print(counter())  # 1
print(counter())  # 1 (not 2—count reset)

# Use closure or global to persist state`}],B=[{section:`First-Class & Polymorphism`,signature:`First-class functions`,description:`Functions are objects—assign to variables, store in collections, pass as arguments.`,complexity:`Concept`,example:`# Assign to variable
greet = lambda x: f"Hi, {x}"
say_hello = greet
print(say_hello("Bob"))  # Hi, Bob

# Store in dict (dispatch pattern)
ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b}
print(ops['+'](5, 3))  # 8

# Pass as argument
def apply(func, value):
    return func(value)
print(apply(len, "hello"))  # 5`},{section:`First-Class & Polymorphism`,signature:`Polymorphism`,description:`Same function works on different types if they support required operations.`,complexity:`Concept`,example:`def double(x):
    return x * 2

print(double(5))       # 10 (int)
print(double("hi"))    # "hihi" (str)
print(double([1, 2]))  # [1, 2, 1, 2] (list)

def total(container):
    return sum(container)

print(total([1, 2, 3]))    # 6 (list)
print(total((1, 2, 3)))    # 6 (tuple)
print(total({1, 2, 3}))    # 6 (set)`}],V=[{section:`Recursion Patterns`,signature:`Cycle detection`,description:`Track visited items to avoid infinite loops in cyclic/graph structures.`,complexity:`O(n)`,example:`def traverse(node, visited=None):
    if visited is None:
        visited = set()
    if id(node) in visited:  # already seen
        return
    visited.add(id(node))
    process(node)
    for child in node.children:
        traverse(child, visited)

# For graph traversal
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)`}],H=[...M,...N,...P,...F,...I,...L,...R,...z,...B,...V],U=[{section:`Decorators`,signature:`@decorator`,description:`Wraps function to modify its behavior. Applied from bottom to top.`,complexity:`O(1)`,example:`def uppercase(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase
def greet(name):
    return f"hello, {name}"

print(greet("world"))  # HELLO, WORLD

# Equivalent to:
# greet = uppercase(greet)`},{section:`Decorators`,signature:`@functools.wraps`,description:`Preserves original function metadata in decorators.`,complexity:`O(1)`,example:`from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        """Wrapper docstring"""
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def greet(name):
    """Greet someone."""
    return f"Hello, {name}"

print(greet.__name__)  # greet (not 'wrapper')
print(greet.__doc__)   # Greet someone.`},{section:`Decorators`,signature:`Decorator with arguments`,description:`Decorator that accepts parameters requires an extra wrapper level.`,complexity:`O(1)`,example:`def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    print("Hello!")

say_hello()  # Prints "Hello!" 3 times`},{section:`Decorators`,signature:`Class decorator`,description:`Use class as decorator with __call__ method.`,complexity:`O(1)`,example:`class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"Call {self.count}")
        return self.func(*args, **kwargs)

@CountCalls
def greet():
    print("Hello!")

greet()  # Call 1, Hello!
greet()  # Call 2, Hello!
print(greet.count)  # 2`},{section:`Decorators`,signature:`Stacking decorators`,description:`Multiple decorators applied bottom to top. Each wraps the result of the previous.`,complexity:`O(1)`,example:`def bold(func):
    def wrapper(*args):
        return f"<b>{func(*args)}</b>"
    return wrapper

def italic(func):
    def wrapper(*args):
        return f"<i>{func(*args)}</i>"
    return wrapper

@bold
@italic
def greet(name):
    return f"Hello, {name}"

# Equivalent to: greet = bold(italic(greet))
print(greet("World"))  # <b><i>Hello, World</i></b>

# Applied bottom-up: italic first, then bold`},{section:`Decorators`,signature:`Class decorator (augment)`,description:`Decorator that modifies or wraps a class. Add methods, implement singleton, or return wrapper.`,complexity:`O(1)`,example:`# Singleton pattern - ensure only one instance
def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Connecting...")

db1 = Database()  # Connecting...
db2 = Database()  # (no output - reuses instance)
print(db1 is db2)  # True`},{section:`Decorators`,signature:`State via function attributes`,description:`Store state directly on wrapper function object instead of closure.`,complexity:`O(1)`,example:`def count_calls(func):
    def wrapper(*args, **kwargs):
        wrapper.calls += 1
        return func(*args, **kwargs)
    wrapper.calls = 0  # Attribute on function object
    return wrapper

@count_calls
def say_hello():
    print("Hello!")

say_hello()
say_hello()
print(say_hello.calls)  # 2

# Advantage: state visible without closure inspection
# Disadvantage: not truly private`},{section:`Decorators`,signature:`Validation decorator`,description:`Check argument types or validate return values at call time.`,complexity:`O(1)`,example:`def validate_args(*types):
    def decorator(func):
        def wrapper(*args):
            for arg, expected in zip(args, types):
                if not isinstance(arg, expected):
                    raise TypeError(f"Expected {expected}, got {type(arg)}")
            return func(*args)
        return wrapper
    return decorator

@validate_args(int, int)
def add(a, b):
    return a + b

print(add(2, 3))     # 5
# add("2", 3)        # TypeError: Expected int, got str`},{section:`Decorators`,signature:`Registration decorator`,description:`Register functions at definition time. Build plugin systems or command handlers.`,complexity:`O(1)`,example:`COMMANDS = {}

def command(name):
    def decorator(func):
        COMMANDS[name] = func
        return func  # Return original unchanged
    return decorator

@command("greet")
def say_hello(name):
    return f"Hello, {name}!"

@command("bye")
def say_goodbye(name):
    return f"Goodbye, {name}!"

# Dispatch by name
print(COMMANDS["greet"]("World"))  # Hello, World!
print(list(COMMANDS.keys()))       # ['greet', 'bye']`},{section:`Built-in Decorators`,signature:`@property`,description:`Defines a method as a property getter. Access without parentheses.`,complexity:`O(1)`,example:`class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.radius)  # 5 (no parentheses)
print(c.area)    # 78.53975
c.radius = 10    # Uses setter`},{section:`Built-in Decorators`,signature:`@staticmethod`,description:`Method that does not receive self. Utility function in class namespace.`,complexity:`O(1)`,example:`class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(Math.add(2, 3))      # 5
print(Math.is_even(4))     # True

m = Math()
print(m.add(1, 2))         # Also works on instance`},{section:`Built-in Decorators`,signature:`@classmethod`,description:`Method that receives class as first argument. Alternative constructors.`,complexity:`O(1)`,example:`class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        import datetime
        t = datetime.date.today()
        return cls(t.year, t.month, t.day)

d = Date.from_string("2024-01-15")
print(d.year, d.month, d.day)  # 2024 1 15`}],W=[{section:`Closures`,signature:`Closure`,description:`Function that captures variables from enclosing scope.`,complexity:`O(1)`,example:`def make_multiplier(n):
    def multiplier(x):
        return x * n  # n is captured from outer scope
    return multiplier

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15

# Check closure variables
print(double.__closure__[0].cell_contents)  # 2`},{section:`Closures`,signature:`nonlocal variable`,description:`Modify variable from enclosing (non-global) scope.`,complexity:`O(1)`,example:`def make_counter():
    count = 0
    def counter():
        nonlocal count  # Required to modify outer variable
        count += 1
        return count
    return counter

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3

# Without nonlocal, would create new local variable`},{section:`Closures`,signature:`global variable`,description:`Access or modify module-level variable inside function.`,complexity:`O(1)`,example:`count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)  # 2

# Can read without global
x = 10
def read_x():
    print(x)  # Works: 10

# But cannot modify without global
def bad_modify():
    x = 20  # Creates new local x, doesn't modify global`},{section:`Closures`,signature:`Late Binding Gotcha`,description:`Closures capture variables by reference, not value. Loop variables evaluated at call time, not definition time.`,complexity:`Gotcha`,example:`# THE GOTCHA - All lambdas share same 'i' reference
funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])  # [2, 2, 2] NOT [0, 1, 2]!

# WHY: Python looks up 'i' when lambda is CALLED
# By then, loop finished and i=2

# FIX 1: Default argument captures current value
funcs = [lambda i=i: i for i in range(3)]
print([f() for f in funcs])  # [0, 1, 2]

# FIX 2: Factory function
def make_func(val):
    return lambda: val
funcs = [make_func(i) for i in range(3)]

# FIX 3: functools.partial
from functools import partial
funcs = [partial(lambda x: x, i) for i in range(3)]

# INTERVIEW TIP: This is a TOP interview question
# Know the gotcha AND all three fixes`},{section:`Higher-Order Functions`,signature:`map(func, iterable)`,description:`Applies function to each element. Returns iterator.`,complexity:`O(n)`,example:`nums = [1, 2, 3, 4, 5]

# Square each number
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25]

# Multiple iterables
a = [1, 2, 3]
b = [4, 5, 6]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)  # [5, 7, 9]`},{section:`Higher-Order Functions`,signature:`filter(func, iterable)`,description:`Yields elements where func returns True.`,complexity:`O(n)`,example:`nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only evens
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6, 8, 10]

# None filters falsy values
mixed = [0, 1, '', 'hello', None, [], [1, 2]]
truthy = list(filter(None, mixed))
print(truthy)  # [1, 'hello', [1, 2]]`},{section:`Higher-Order Functions`,signature:`functools.reduce(func, iterable)`,description:`Reduces iterable to single value by cumulative application.`,complexity:`O(n)`,example:`from functools import reduce

nums = [1, 2, 3, 4, 5]

# Sum (1+2+3+4+5)
total = reduce(lambda x, y: x + y, nums)
print(total)  # 15

# Product (1*2*3*4*5)
product = reduce(lambda x, y: x * y, nums)
print(product)  # 120

# With initial value
result = reduce(lambda x, y: x + y, nums, 100)
print(result)  # 115`},{section:`Function Introspection`,signature:`func.__name__`,description:`Returns the name of the function.`,complexity:`O(1)`,example:`def my_function():
    pass

print(my_function.__name__)  # my_function

# Useful in decorators and debugging
funcs = [min, max, sum]
for f in funcs:
    print(f.__name__)  # min, max, sum`},{section:`Function Introspection`,signature:`func.__doc__`,description:`Returns the docstring of the function.`,complexity:`O(1)`,example:`def greet(name):
    """Greets a person by name.

    Args:
        name: The person's name

    Returns:
        A greeting string
    """
    return f"Hello, {name}!"

print(greet.__doc__)
# Greet a person by name...`},{section:`Function Introspection`,signature:`func.__annotations__`,description:`Returns type annotations dictionary.`,complexity:`O(1)`,example:`def greet(name: str, age: int) -> str:
    return f"Hello, {name}! You are {age}."

print(greet.__annotations__)
# {'name': <class 'str'>, 'age': <class 'int'>, 'return': <class 'str'>}

# Type hints don't enforce types - just documentation
greet(123, "wrong")  # Still works!`},{section:`Function Introspection`,signature:`func.__defaults__`,description:`Returns tuple of default argument values.`,complexity:`O(1)`,example:`def greet(name, greeting="Hello", punctuation="!"):
    return f"{greeting}, {name}{punctuation}"

print(greet.__defaults__)  # ('Hello', '!')

# Keyword-only defaults
def func(a, *, b=1, c=2):
    pass

print(func.__kwdefaults__)  # {'b': 1, 'c': 2}`},{section:`Generators`,signature:`yield value`,description:`Pauses function and yields value. Resumes on next iteration.`,complexity:`O(1) per yield`,example:`def count_up_to(n):
    i = 1
    while i <= n:
        yield i
        i += 1

for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# Generator is lazy - values generated on demand
gen = count_up_to(1000000)  # No memory used yet
print(next(gen))  # 1
print(next(gen))  # 2`},{section:`Generators`,signature:`yield from iterable`,description:`Delegates to sub-generator or iterable.`,complexity:`O(n)`,example:`def chain(*iterables):
    for it in iterables:
        yield from it

result = list(chain([1, 2], [3, 4], [5]))
print(result)  # [1, 2, 3, 4, 5]

# Recursive generator
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print(list(flatten([1, [2, [3, 4], 5]])))  # [1, 2, 3, 4, 5]`},{section:`Generators`,signature:`Generator expression`,description:`Compact syntax for simple generators. Memory efficient.`,complexity:`O(1) creation`,example:`# Generator expression
gen = (x**2 for x in range(5))
print(type(gen))  # <class 'generator'>
print(list(gen))  # [0, 1, 4, 9, 16]

# Memory efficient for large data
sum_squares = sum(x**2 for x in range(1000000))

# Can only iterate once!
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] (exhausted)`},{section:`Recursion`,signature:`Recursive function`,description:`Function that calls itself. Needs base case to stop.`,complexity:`O(varies)`,example:`def factorial(n):
    if n <= 1:  # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))  # 55`},{section:`Recursion`,signature:`@functools.lru_cache`,description:`Memoization decorator. Caches function results.`,complexity:`O(1) for cached`,example:`from functools import lru_cache

@lru_cache(maxsize=None)  # Unlimited cache
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Instant! (without cache would be slow)

# Check cache info
print(fibonacci.cache_info())
# CacheInfo(hits=98, misses=101, maxsize=None, currsize=101)

# Clear cache
fibonacci.cache_clear()`},{section:`Typing`,signature:`Type hints`,description:`Optional type annotations for documentation and tooling. Python 3.9+ supports built-in generics.`,complexity:`O(1)`,example:`# Python 3.9+: Use built-in types directly (no imports needed)
def greet(name: str) -> str:
    return f"Hello, {name}"

def process_items(items: list[int]) -> dict[str, int]:
    return {"sum": sum(items), "count": len(items)}

def maybe_upper(s: str | None = None) -> str:  # 3.10+ union syntax
    return s.upper() if s else ""

# Function type (still needs import)
from typing import Callable
def apply(func: Callable[[int], int], x: int) -> int:
    return func(x)

# Multiple return types
def get_pair() -> tuple[int, str]:
    return (1, "one")`}],G=[...H,...U,...W],K=[{signature:`Why use OOP?`,description:`OOP organizes code into reusable, modular units. Classes bundle data + behavior together, making code easier to understand, maintain, and extend.`,complexity:`Concept`,section:`Why & When`,example:`# Without OOP - scattered functions and data
name = "Alice"
balance = 100

def deposit(amount):
    global balance
    balance += amount

# With OOP - organized, encapsulated
class BankAccount:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

# Benefits:
# 1. Encapsulation - data + methods together
# 2. Reusability - create multiple accounts
# 3. Maintainability - changes isolated to class`},{signature:`When to use OOP vs Functions`,description:`Use OOP when you have data + behavior that belong together, need multiple instances, or want inheritance. Use functions for stateless operations.`,complexity:`Concept`,section:`Why & When`,example:`# USE FUNCTIONS when:
# - Stateless transformations
# - Simple utilities
# - One-off operations

def calculate_tax(amount, rate):
    return amount * rate

# USE CLASSES when:
# - Data + behavior belong together
# - Need multiple instances with state
# - Want inheritance/polymorphism

class TaxCalculator:
    def __init__(self, country, year):
        self.country = country
        self.year = year

    def calculate(self, income):
        return self._apply_brackets(income)

# Rule of thumb: If you pass same data
# to multiple functions, use a class`},{signature:`Classes vs Dictionaries`,description:`Dicts store labeled data. Classes package data + logic together, ensuring consistent interface and operations.`,complexity:`Concept`,section:`Why & When`,example:`# Dictionary: just data, logic scattered elsewhere
emp = {"name": "Bob", "salary": 50000}
def give_raise(emp, pct):
    emp["salary"] *= (1 + pct)

# Class: data + logic packaged together
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, pct):
        self.salary *= (1 + pct)

# Benefits of class:
# - All employees have same interface
# - Logic lives with the data
# - Can inherit (Manager from Employee)`},{signature:`Classes vs Modules`,description:`Modules are files with one copy of data. Classes are statements that create multiple instances with independent state.`,complexity:`Concept`,section:`Why & When`,example:`# MODULE: one copy of data
# config.py
DEBUG = True
def log(msg): print(msg)

# CLASS: multiple instances, each with own data
class Logger:
    def __init__(self, name):
        self.name = name
        self.messages = []

    def log(self, msg):
        self.messages.append(msg)

# Create independent loggers
app_log = Logger("app")
db_log = Logger("database")
# Each has its own messages list`},{signature:`Empty class (record)`,description:`Empty class with pass can have attributes added dynamically. Mimics structs/records, cleaner than dicts.`,complexity:`O(1)`,section:`Why & When`,example:`# Empty class as flexible record
class Record:
    pass

# Add attributes dynamically
rec = Record()
rec.name = "Bob"
rec.age = 40
rec.job = "Developer"

print(rec.name)  # Bob

# Cleaner than dict: rec.name vs rec["name"]
# Can add methods later if needed
# Multiple records are independent`},{signature:`Encapsulation`,description:`Bundle logic with data as methods, not external functions. Changes to logic update in one place.`,complexity:`Concept`,section:`Why & When`,example:`# BAD: External function - logic scattered
def give_raise(person, pct):
    person["salary"] *= (1 + pct)

# GOOD: Method - logic lives with data
class Person:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, pct):
        self.salary *= (1 + pct)

# Benefits:
# - Logic changes in one place
# - Object knows how to process itself
# - Clearer API: person.give_raise(0.1)`},{signature:`Incremental design`,description:`Start simple, refactor as needed. Python OOP supports evolving from records → methods → inheritance.`,complexity:`Concept`,section:`Why & When`,example:`# Step 1: Simple record
class Person:
    def __init__(self, name):
        self.name = name

# Step 2: Add behavior as needed
class Person:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return f"Hi, I'm {self.name}"

# Step 3: Specialize via inheritance
class Employee(Person):
    def __init__(self, name, role):
        super().__init__(name)
        self.role = role

# No need to design everything upfront!`},{signature:`class ClassName:`,description:`Defines a new class. By convention, use CamelCase for class names. Classes are blueprints for creating objects.`,complexity:`O(1)`,section:`Class Basics`,example:`class Dog:
    species = "Canis familiaris"  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Buddy", 3)
print(dog.name)   # Buddy
print(dog.bark()) # Buddy says woof!`},{signature:`__init__(self, ...)`,description:`Constructor method. Called when creating new instance. Initialize attributes here. NOT for returning values.`,complexity:`O(1)`,section:`Class Basics`,example:`class Person:
    def __init__(self, name, age=0):
        self.name = name
        self.age = age
        self._id = id(self)  # Private by convention

p1 = Person("Alice", 30)
p2 = Person("Bob")  # age defaults to 0

print(p1.name, p1.age)  # Alice 30
print(p2.name, p2.age)  # Bob 0`},{signature:`self`,description:`Reference to current instance. Must be first parameter of instance methods. Python passes it automatically.`,complexity:`O(1)`,section:`Class Basics`,example:`class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
        return self  # Return self for chaining

    def decrement(self):
        self.count -= 1
        return self

c = Counter()
c.increment().increment().increment()
print(c.count)  # 3`},{signature:`Class attribute`,description:`Shared by ALL instances. Defined directly in class body. Use for constants or shared state. Beware of mutable class attributes!`,complexity:`O(1)`,section:`Class vs Instance`,example:`class Dog:
    species = "Canis familiaris"  # Class attribute
    count = 0

    def __init__(self, name):
        self.name = name  # Instance attribute
        Dog.count += 1

d1 = Dog("Buddy")
d2 = Dog("Max")

print(Dog.count)      # 2
print(d1.species)     # Canis familiaris
print(d2.species)     # Canis familiaris

# Modifying class attribute affects all
Dog.species = "Wolf"
print(d1.species)     # Wolf

# WARNING: Mutable class attributes are shared!
class Bad:
    items = []  # DANGER! Shared by all instances`},{signature:`Instance attribute`,description:`Unique to each instance. Set via self in __init__ or later. Each object has its own copy.`,complexity:`O(1)`,section:`Class vs Instance`,example:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(3, 4)

p1.x = 10  # Only affects p1
print(p1.x, p2.x)  # 10 3

# Can add attributes dynamically
p1.z = 5
print(p1.z)  # 5
# print(p2.z)  # AttributeError`}],q=[{signature:`Inheritance vs Composition`,description:`Inheritance: "is-a" relationships, share behavior (Dog is-a Animal). Composition: "has-a" relationships, assemble behavior (Car has-a Engine). Prefer composition for flexibility.`,complexity:`Concept`,section:`Why & When`,example:`# INHERITANCE - when subclass IS-A parent type
class Animal:
    def breathe(self):
        return "breathing"

class Dog(Animal):
    def bark(self):
        return "woof"
# Dog IS-A Animal - (shares behavior)

# COMPOSITION - when object HAS-A component
class Engine:
    def start(self):
        return "engine running"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A relationship

    def start(self):
        return self.engine.start()
# Car HAS-AN Engine - (assembles behavior)

# Use inheritance when:
# - True "is-a" relationship (Dog is-a Animal)
# - Subclass adds specialization (Manager is-a Employee)
# - Want polymorphism (treat Dog, Cat as Animal)

# Use composition when:
# - "has-a" relationship (Car has-a Engine)
# - Need to swap components (different engines)
# - Avoid deep hierarchies (prefer flat)
# - Multiple sources of behavior (logger + cache + validator)`},{signature:`@property vs direct attributes`,description:`@property when: need validation, computed values, lazy loading, API compatibility. Direct attributes when: simple data storage.`,complexity:`Concept`,section:`Why & When`,example:`# DIRECT ATTRIBUTE - simple storage
class Point:
    def __init__(self, x, y):
        self.x = x  # Just store it
        self.y = y

# PROPERTY - validation needed
class BankAccount:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Cannot be negative")
        self._balance = value

# PROPERTY - computed value
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height  # Computed on access

# PROPERTY - lazy loading
class DataLoader:
    @property
    def data(self):
        if not hasattr(self, '_data'):
            self._data = expensive_load()  # Load once
        return self._data

# Rule: Start with direct attributes
#       Add @property when you need control`},{signature:`@classmethod vs @staticmethod vs methods`,description:`@classmethod: needs class (alternative constructors). @staticmethod: utility, no self/cls needed. Regular method: needs instance state.`,complexity:`Concept`,section:`Why & When`,example:`class User:
    users_count = 0

    def __init__(self, name, email):
        self.name = name   # Instance state
        self.email = email
        User.users_count += 1

    # REGULAR METHOD - needs instance
    def get_info(self):
        return f"{self.name} <{self.email}>"

    # CLASSMETHOD - needs class (alternative constructor)
    @classmethod
    def from_dict(cls, data):
        return cls(data['name'], data['email'])

    @classmethod
    def get_count(cls):
        return cls.users_count  # Access class variable

    # STATICMETHOD - utility, no self/cls needed
    @staticmethod
    def validate_email(email):
        return '@' in email  # Pure logic, no state

# Regular method: needs instance data
u = User("Alice", "a@ex.com")
print(u.get_info())  # Needs self.name, self.email

# Classmethod: alternative constructor
u2 = User.from_dict({'name': 'Bob', 'email': 'b@ex.com'})

# Staticmethod: pure utility
User.validate_email("test@ex.com")  # No state needed`},{signature:`super() vs Parent.method()`,description:`super(): follows MRO, works with multiple inheritance. Parent.method(self): direct call, skips MRO. Always prefer super().`,complexity:`Concept`,section:`Why & When`,example:`# PREFER super() - follows MRO
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Follows MRO (correct)
        self.breed = breed

# AVOID Parent.method(self) - breaks multiple inheritance
class BadDog(Animal):
    def __init__(self, name, breed):
        Animal.__init__(self, name)  # Hard-coded parent (incorrect)
        self.breed = breed

# Why super() matters: multiple inheritance
class A:
    def method(self):
        print("A")

class B(A):
    def method(self):
        super().method()  # Follows MRO to next class
        print("B")

class C(A):
    def method(self):
        super().method()  # Follows MRO to next class
        print("C")

class D(B, C):
    def method(self):
        super().method()  # Calls all in MRO order
        print("D")

D().method()
# Output: A, C, B, D (MRO: D→B→C→A)
# If B used A.method(self), C would be skipped!`},{signature:`Multiple inheritance - rarely use it`,description:`Use multiple inheritance for: mix-ins (small, orthogonal features). Avoid for: complex hierarchies, diamond problem, unclear MRO. Prefer composition.`,complexity:`Concept`,section:`Why & When`,example:`# GOOD - mix-ins for orthogonal features
class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{self.__class__.__name__}] {msg}")

class User(JsonMixin, LogMixin):
    def __init__(self, name):
        self.name = name

u = User("Alice")
u.log("Created")        # From LogMixin
print(u.to_json())      # From JsonMixin

# BAD - complex hierarchies (use composition!)
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass  # Diamond problem
# Hard to reason about MRO

# BETTER - composition
class User:
    def __init__(self, name):
        self.name = name
        self.logger = Logger()     # Compose
        self.serializer = JsonSerializer()

    def log(self, msg):
        self.logger.log(msg)

# Rule: Mix-ins OK, inheritance trees → composition`}],J=[{signature:`Attribute search tree`,description:`When accessing obj.attr, Python searches: instance → class → superclasses (left-to-right, bottom-to-top). First match wins.`,complexity:`Concept`,section:`Inheritance`,example:`class A:
    x = "from A"

class B(A):
    pass  # No x defined

class C(A):
    x = "from C"

class D(B, C):
    pass

# Search order: D → B → C → A → object
print(D().x)    # "from C" (found in C before A)
print(D.__mro__)  # Shows exact search order

# Instance attr shadows class attr
d = D()
d.x = "instance"
print(d.x)  # "instance" (found on instance first)`},{signature:`class Child(Parent):`,description:`Inherits all attributes and methods from Parent class. Child can override or extend parent behavior.`,complexity:`O(1)`,section:`Inheritance`,example:`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):  # Override parent method
        return f"{self.name} says woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.speak())  # Buddy says woof!
print(cat.speak())  # Whiskers says meow!`},{signature:`super()`,description:`Returns proxy object to call parent class methods. Essential for extending (not just overriding) parent behavior.`,complexity:`O(1)`,section:`Inheritance`,example:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent __init__
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)   # Buddy
print(dog.breed)  # Golden Retriever

# super() in method override
class Bird(Animal):
    def speak(self):
        parent_sound = super().speak()
        return f"{parent_sound} (chirp chirp)"`},{signature:`Multiple inheritance`,description:`Inherit from multiple classes. Method Resolution Order (MRO) determines which method is called. Use sparingly!`,complexity:`O(1)`,section:`Inheritance`,example:`class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):  # B comes before C
    pass

d = D()
print(d.method())  # B (follows MRO)
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

# Prefer composition over multiple inheritance!`},{signature:`Composition over Inheritance`,description:`Favor "has-a" relationships over "is-a". More flexible and avoids inheritance complexity.`,complexity:`O(1)`,section:`Inheritance`,example:`# INHERITANCE: Dog IS-A Animal (tight coupling)
class Animal:
    def move(self): pass

class Dog(Animal):
    pass

# COMPOSITION: Car HAS-A Engine (loose coupling)
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A relationship

    def start(self):
        return self.engine.start()

# Composition benefits:
# - Easy to swap components
# - No deep inheritance hierarchies
# - Clear dependencies
# - Better testability (can mock components)`},{signature:`isinstance(obj, class)`,description:`Check if object is instance of class (including inheritance). Prefer duck typing in Python!`,complexity:`O(n)`,section:`Inheritance`,example:`class Animal: pass
class Dog(Animal): pass

dog = Dog()
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True (inheritance)
print(isinstance(dog, object))  # True (everything inherits from object)

# Check multiple types
print(isinstance(5, (int, float)))  # True

# But prefer duck typing!
# Instead of: if isinstance(obj, list):
# Do: if hasattr(obj, '__iter__'):`}],Y=[{signature:`@property`,description:`Define getter method accessed like an attribute. Encapsulates internal state. Computed properties without method call syntax.`,complexity:`O(1)`,section:`Properties`,example:`class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

    @property
    def diameter(self):
        return self._radius * 2

c = Circle(5)
print(c.radius)    # 5 (no parentheses!)
print(c.area)      # 78.53975
print(c.diameter)  # 10`},{signature:`@name.setter`,description:`Define setter for property. Enables validation on assignment. Control how attributes are modified.`,complexity:`O(1)`,section:`Properties`,example:`class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature()
t.celsius = 25
print(t.fahrenheit)  # 77.0
t.fahrenheit = 100
print(t.celsius)     # 37.77...`}],X=[{signature:`@classmethod`,description:`Method that receives class (cls) instead of instance. Use for alternative constructors or operations on class state.`,complexity:`O(1)`,section:`Class & Static Methods`,example:`class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        """Alternative constructor from string"""
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """Alternative constructor for today"""
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-06-20")
d3 = Date.today()`},{signature:`@staticmethod`,description:`Method without self or cls. Just a regular function in class namespace. Use for utility functions related to the class.`,complexity:`O(1)`,section:`Class & Static Methods`,example:`class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @staticmethod
    def factorial(n):
        if n <= 1:
            return 1
        return n * Math.factorial(n - 1)

# Call on class
print(Math.add(2, 3))      # 5
print(Math.is_even(4))     # True

# Also works on instance
m = Math()
print(m.factorial(5))      # 120

# When to use:
# @staticmethod - utility function, no class/instance needed
# @classmethod - need class for alternative constructors`}],Z=[{signature:`__dict__, __class__, __bases__`,description:`Namespaces are dicts. Instances link to class via __class__, classes link to parents via __bases__.`,complexity:`O(1)`,section:`Namespace Internals`,example:`class Parent:
    x = 1

class Child(Parent):
    y = 2

obj = Child()
obj.z = 3

# Namespace dictionaries
print(obj.__dict__)     # {'z': 3} - instance attrs only
print(Child.__dict__)   # {'y': 2, ...} - class attrs
print(Parent.__dict__)  # {'x': 1, ...}

# Inheritance links
print(obj.__class__)    # <class 'Child'>
print(Child.__bases__)  # (<class 'Parent'>,)

# obj.x searches: obj.__dict__ → Child.__dict__ → Parent.__dict__`},{signature:`LEGB vs Object rule`,description:`Two lookup mechanisms: simple names (x) use LEGB scopes; qualified names (obj.x) search inheritance tree.`,complexity:`Concept`,section:`Namespace Internals`,example:`x = "global"  # Simple name → LEGB rule

class MyClass:
    x = "class"  # Class attribute

    def method(self):
        x = "local"       # Local scope
        print(x)          # "local" (LEGB: Local first)
        print(self.x)     # "class" (Object rule: instance → class)

obj = MyClass()
obj.x = "instance"
obj.method()
# x → "local" (LEGB search)
# self.x → "instance" (Object search)

# Key distinction:
# x = 1        → creates/finds in current LEGB scope
# self.x = 1   → always creates in instance namespace`},{signature:`Method call translation`,description:`instance.method(args) translates to Class.method(instance, args). Explicit class call useful for extending.`,complexity:`O(1)`,section:`Namespace Internals`,example:`class Person:
    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person()
p.name = "Alice"

# These are equivalent:
print(p.greet())              # Hi, I'm Alice
print(Person.greet(p))        # Hi, I'm Alice

# Useful for calling parent method explicitly
class Employee(Person):
    def greet(self):
        base = Person.greet(self)  # or super().greet()
        return f"{base}, an employee"`}],Q=[{signature:`4 ways to specialize`,description:`Inherit (use as-is), Override (replace), Extend (call super + add), Provide (subclass implements).`,complexity:`Concept`,section:`Specialization Patterns`,example:`class Base:
    def inherit_me(self):
        return "base"

    def override_me(self):
        return "base"

    def extend_me(self):
        return "base"

    def action(self):  # Expects subclass to provide
        raise NotImplementedError

class Child(Base):
    # 1. INHERIT: inherit_me() used as-is

    # 2. OVERRIDE: completely replace
    def override_me(self):
        return "child"

    # 3. EXTEND: call parent + add logic
    def extend_me(self):
        return super().extend_me() + " + child"

    # 4. PROVIDE: implement required method
    def action(self):
        return "child action"`}],ne=[...q,...J,...Y,...X,...Z,...Q],re=[{signature:`S - Single Responsibility`,description:`A class should have only ONE reason to change. Each class handles one job. Split large classes into focused ones.`,complexity:`Principle`,section:`SOLID Principles`,example:`# BAD: One class doing everything
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save_to_db(self):  # Database logic
        pass

    def send_email(self):  # Email logic
        pass

    def generate_report(self):  # Report logic
        pass

# GOOD: Separate responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user): pass
    def find(self, user_id): pass

class EmailService:
    def send(self, user, message): pass

class UserReportGenerator:
    def generate(self, user): pass`},{signature:`O - Open/Closed Principle`,description:`Open for extension, closed for modification. Add new behavior without changing existing code. Use inheritance/composition.`,complexity:`Principle`,section:`SOLID Principles`,example:`# BAD: Must modify class for new shapes
class AreaCalculator:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        # Must add more elif for new shapes!

# GOOD: Extend without modification
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

# Add new shapes without modifying existing code!
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height`},{signature:`L - Liskov Substitution`,description:`Subtypes must be substitutable for their base types. Child classes must honor parent class contracts.`,complexity:`Principle`,section:`SOLID Principles`,example:`# BAD: Square breaks Rectangle contract
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, w):
        self.width = w

    def set_height(self, h):
        self.height = h

    def area(self):
        return self.width * self.height

class Square(Rectangle):  # VIOLATES LSP
    def set_width(self, w):
        self.width = self.height = w  # Breaks expectation!

    def set_height(self, h):
        self.width = self.height = h

# GOOD: Separate abstractions
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

class Square(Shape):  # Not a Rectangle subclass
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2`},{signature:`I - Interface Segregation`,description:`Clients should not depend on interfaces they do not use. Prefer many specific interfaces over one general-purpose interface.`,complexity:`Principle`,section:`SOLID Principles`,example:`# BAD: Fat interface forces unused implementations
from abc import ABC, abstractmethod

class Worker(ABC):
    @abstractmethod
    def work(self): pass
    @abstractmethod
    def eat(self): pass
    @abstractmethod
    def sleep(self): pass

class Robot(Worker):
    def work(self):
        return "Working..."
    def eat(self):
        pass  # Robots don't eat! Forced to implement
    def sleep(self):
        pass  # Robots don't sleep!

# GOOD: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Human(Workable, Eatable):
    def work(self):
        return "Working..."
    def eat(self):
        return "Eating..."

class Robot(Workable):  # Only implements what it needs
    def work(self):
        return "Working..."`},{signature:`D - Dependency Inversion`,description:`High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).`,complexity:`Principle`,section:`SOLID Principles`,example:`# BAD: High-level depends on low-level
class MySQLDatabase:
    def save(self, data):
        print(f"Saving {data} to MySQL")

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Tight coupling!

    def save_user(self, user):
        self.db.save(user)

# GOOD: Depend on abstractions
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def save(self, data): pass

class MySQLDatabase(Database):
    def save(self, data):
        print(f"Saving {data} to MySQL")

class PostgresDatabase(Database):
    def save(self, data):
        print(f"Saving {data} to Postgres")

class UserService:
    def __init__(self, db: Database):  # Inject dependency
        self.db = db

    def save_user(self, user):
        self.db.save(user)

# Easy to swap implementations!
service = UserService(PostgresDatabase())`}],ie=[{signature:`When to implement __str__ vs __repr__`,description:`__repr__: always implement for debugging (eval-able). __str__: only if you need user-friendly output. Rule: __repr__ is for devs, __str__ is for users.`,complexity:`Concept`,section:`Why & When`,example:`# ALWAYS implement __repr__
class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"User(id={self.id}, name={self.name!r})"
# In debugger: User(id=1, name='Alice')

# Add __str__ ONLY if end-users see it
class User:
    def __repr__(self):
        return f"User(id={self.id}, name={self.name!r})"

    def __str__(self):
        return f"{self.name} (#{self.id})"
# print(user) → "Alice (#1)"
# [user] → "User(id=1, name='Alice')"

# If no __str__, Python uses __repr__ for both
# Priority: Always __repr__, optionally __str__`},{signature:`When objects need __eq__ and __hash__`,description:`Implement __eq__ for value objects. Add __hash__ if using in sets/dicts. Objects with __eq__ lose default hash—must implement __hash__ or set to None.`,complexity:`Concept`,section:`Why & When`,example:`# VALUE OBJECT - needs __eq__
class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return (self.amount == other.amount and
                self.currency == other.currency)

# Problem: Can't use in set now!
# m = Money(10, 'USD')
# {m}  # TypeError: unhashable

# IMMUTABLE value - add __hash__
class Money:
    def __init__(self, amount, currency):
        self.amount = amount
        self.currency = currency

    def __eq__(self, other):
        return (self.amount, self.currency) == \\
               (other.amount, other.currency)

    def __hash__(self):
        return hash((self.amount, self.currency))

# MUTABLE object - explicitly disable hash
class Account:
    __hash__ = None  # Unhashable, even if __eq__ defined

    def __eq__(self, other):
        return self.id == other.id

# Rule: immutable + __eq__ → add __hash__
#       mutable → __hash__ = None`},{signature:`Making classes Pythonic with dunder methods`,description:`Implement dunder methods to make classes feel native. Use __len__, __getitem__ for sequences. Use __enter__/__exit__ for resources. Use __call__ for function-like objects.`,complexity:`Concept`,section:`Why & When`,example:`# WITHOUT dunder - feels foreign
class Batch:
    def get_size(self):
        return len(self.items)

    def get_item(self, idx):
        return self.items[idx]

b = Batch()
print(b.get_size())    # Verbose, not Pythonic

# WITH dunder - feels native
class Batch:
    def __len__(self):
        return len(self.items)

    def __getitem__(self, idx):
        return self.items[idx]

b = Batch()
print(len(b))          # Pythonic!
print(b[0])            # Like a list
for item in b:         # Works with for loop

# Implement when your class IS a:
# - Container → __len__, __getitem__, __contains__
# - Number → __add__, __mul__, __eq__
# - Resource → __enter__, __exit__
# - Callable → __call__`},{signature:`Performance with dunder methods`,description:`__getattr__ and __getattribute__ have overhead. __hash__ should be O(1). Comparison operators may be called frequently in sorting.`,complexity:`Concept`,section:`Why & When`,example:`# EXPENSIVE __hash__ - BAD
class BigObject:
    def __init__(self, data):
        self.data = data  # Large list

    def __hash__(self):
        return hash(tuple(self.data))  # O(n) - slow!

# GOOD - cache hash value
class BigObject:
    def __init__(self, data):
        self.data = tuple(data)  # Immutable
        self._hash = None

    def __hash__(self):
        if self._hash is None:
            self._hash = hash(self.data)
        return self._hash  # O(1) after first call

# COMPARISON called often in sorting
items = [obj1, obj2, obj3]
sorted(items)  # Calls __lt__ N*log(N) times

# Make comparison cheap
class Item:
    def __lt__(self, other):
        return self.key < other.key  # O(1)

# Avoid expensive comparisons in __lt__
# Pre-compute sort key if possible`},{signature:`When to use __call__ vs regular methods`,description:`__call__ when object IS the operation (single main action). Regular method when object HAS operations (multiple actions).`,complexity:`Concept`,section:`Why & When`,example:`# USE __call__ - object IS a function
class Validator:
    def __init__(self, min_val, max_val):
        self.min_val = min_val
        self.max_val = max_val

    def __call__(self, value):
        return self.min_val <= value <= self.max_val

is_valid_age = Validator(0, 120)
print(is_valid_age(25))   # True - used like function

# USE METHOD - object HAS operations
class BankAccount:
    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        self.balance -= amount

account = BankAccount()
account.deposit(100)      # Clear action name

# __call__ benefits:
# - Can pass to map(), filter()
# - Looks like a function
# - Good for single-purpose objects
# Use when: "this object is callable"
# Avoid when: "this object does many things"`},{signature:`__new__ vs __init__`,description:`__new__ CREATES instance (returns object). __init__ INITIALIZES instance (modifies self). __new__ called first, then __init__. Override __new__ for immutables, singletons, metaclasses.`,complexity:`Concept`,section:`Why & When`,example:`# NORMAL: Just use __init__
class User:
    def __init__(self, name):
        self.name = name

# USE __new__ for immutables (str, int, tuple subclasses)
class UpperStr(str):
    def __new__(cls, value):
        return super().__new__(cls, value.upper())

print(UpperStr("hello"))  # HELLO

# USE __new__ for singleton pattern
class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

# USE __new__ for instance caching
class CachedInt:
    _cache = {}

    def __new__(cls, value):
        if value not in cls._cache:
            cls._cache[value] = super().__new__(cls)
        return cls._cache[value]

# WHEN TO USE:
# __init__ (99% of cases): Normal class setup
# __new__: Immutables, singletons, metaclasses, caching`}],ae=[{signature:`__str__(self)`,description:`Human-readable string representation. Used by print() and str(). User-friendly output.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name}, {self.age} years old"

p = Person("Alice", 30)
print(p)        # Alice, 30 years old
print(str(p))   # Alice, 30 years old`},{signature:`__repr__(self)`,description:`Unambiguous representation for developers. Used by repr() and in debugger. Should ideally be valid Python code.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(3, 4)
print(repr(p))  # Point(3, 4)
print(str(p))   # (3, 4)
print([p])      # [Point(3, 4)] - uses __repr__

# If only __repr__ defined, it's used for str() too`},{signature:`__eq__(self, other)`,description:`Equality comparison. Used by == operator. Implement for value comparison.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

p1 = Point(1, 2)
p2 = Point(1, 2)
p3 = Point(3, 4)

print(p1 == p2)  # True
print(p1 == p3)  # False`},{signature:`__hash__(self)`,description:`Return hash value. Required for use in sets/dict keys. Objects equal by __eq__ must have same hash.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

p1 = Point(1, 2)
p2 = Point(1, 2)

# Can use as dict key
d = {p1: "point one"}
print(d[p2])  # "point one" (same hash, equal)

# Can use in set
s = {p1, p2}
print(len(s))  # 1 (duplicates removed)`},{signature:`__lt__, __le__, __gt__, __ge__`,description:`Comparison operators: <, <=, >, >=. Use @total_ordering to auto-generate from __eq__ and __lt__.`,complexity:`O(1)`,section:`Dunder Methods`,example:`from functools import total_ordering

@total_ordering  # Generates missing comparisons
class Version:
    def __init__(self, major, minor):
        self.major = major
        self.minor = minor

    def __eq__(self, other):
        return (self.major, self.minor) == (other.major, other.minor)

    def __lt__(self, other):
        return (self.major, self.minor) < (other.major, other.minor)

v1 = Version(1, 0)
v2 = Version(2, 0)
v3 = Version(1, 5)

print(v1 < v2)   # True
print(v1 <= v3)  # True (generated)
print(v2 > v3)   # True (generated)`},{signature:`__len__(self)`,description:`Return length. Used by len() built-in. Makes class work with len().`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

playlist = Playlist()
playlist.add("Song A")
playlist.add("Song B")
print(len(playlist))  # 2`},{signature:`__getitem__, __setitem__, __delitem__`,description:`Item access with brackets: obj[key]. Makes class subscriptable like list/dict.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class CustomList:
    def __init__(self):
        self._data = {}

    def __getitem__(self, key):
        return self._data[key]

    def __setitem__(self, key, value):
        self._data[key] = value

    def __delitem__(self, key):
        del self._data[key]

    def __contains__(self, key):
        return key in self._data

cl = CustomList()
cl[0] = "first"
cl["key"] = "value"
print(cl[0])        # first
print("key" in cl)  # True
del cl[0]`},{signature:`__iter__, __next__`,description:`Make object iterable. Used by for loops. Return iterator from __iter__, next value from __next__.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class CountDown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for num in CountDown(5):
    print(num)  # 5, 4, 3, 2, 1`},{signature:`__call__(self, ...)`,description:`Make instance callable like a function. Useful for stateful functions or configurable behavior.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Check if callable
print(callable(double))  # True`},{signature:`__add__, __sub__, __mul__`,description:`Arithmetic operators: +, -, *. Makes objects work with math operators.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)    # Vector(4, 6)
print(v2 - v1)    # Vector(2, 2)
print(v1 * 3)     # Vector(3, 6)`},{signature:`__enter__, __exit__`,description:`Context manager protocol. Used with "with" statement. Ensures cleanup happens even on errors.`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end = time.time()
        print(f"Elapsed: {self.end - self.start:.2f}s")
        return False  # Don't suppress exceptions

with Timer():
    sum(range(1000000))
# Prints: Elapsed: 0.03s`},{signature:`__doc__ (docstrings)`,description:`First string literal in class/method becomes documentation. Accessible via __doc__ or help().`,complexity:`O(1)`,section:`Dunder Methods`,example:`class Calculator:
    """A simple calculator class.

    Supports basic arithmetic operations.
    """

    def add(self, a, b):
        """Return sum of a and b."""
        return a + b

print(Calculator.__doc__)
# A simple calculator class...

print(Calculator.add.__doc__)
# Return sum of a and b.

help(Calculator)  # Shows formatted docs`}],oe=[...ie,...ae],se=[{signature:`ABC and @abstractmethod`,description:`Define abstract classes that cannot be instantiated. Force subclasses to implement specific methods.`,complexity:`O(1)`,section:`Abstract Classes`,example:`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError: Can't instantiate
rect = Rectangle(5, 3)
print(rect.area())       # 15
print(rect.perimeter())  # 16`},{signature:`typing.Protocol`,description:`Structural subtyping (duck typing + type hints). Class matches if it has required methods - no inheritance needed.`,complexity:`O(1)`,section:`Protocol`,example:`from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

# No inheritance! Just needs draw() method
class Circle:
    def draw(self) -> None:
        print("O")

class Square:
    def draw(self) -> None:
        print("[]")

def render(shape: Drawable) -> None:
    shape.draw()

render(Circle())  # Works - has draw()
render(Square())  # Works - has draw()

# ABC vs Protocol:
# - ABC: Nominal typing - must inherit explicitly
# - Protocol: Structural typing - just match the shape
# Use Protocol for duck typing with type safety`},{signature:`@dataclass`,description:`Auto-generate __init__, __repr__, __eq__ and more. Reduces boilerplate for data-holding classes.`,complexity:`O(1)`,section:`Dataclasses`,example:`from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float
    label: str = "origin"

p1 = Point(1.0, 2.0)
p2 = Point(1.0, 2.0)
p3 = Point(3.0, 4.0, "custom")

print(p1)           # Point(x=1.0, y=2.0, label='origin')
print(p1 == p2)     # True
print(p1.x)         # 1.0`},{signature:`@dataclass options`,description:`Customize dataclass with frozen (immutable), order (comparisons), slots (memory efficient).`,complexity:`O(1)`,section:`Dataclasses`,example:`from dataclasses import dataclass, field

@dataclass(frozen=True)  # Immutable
class ImmutablePoint:
    x: float
    y: float

@dataclass(order=True)  # Add comparison methods
class Version:
    major: int
    minor: int
    patch: int = 0

@dataclass
class Person:
    name: str
    friends: list = field(default_factory=list)  # Mutable default

p = ImmutablePoint(1, 2)
# p.x = 5  # FrozenInstanceError

v1 = Version(1, 0)
v2 = Version(2, 0)
print(v1 < v2)  # True`},{signature:`__slots__`,description:`Restrict attributes and reduce memory. No __dict__ per instance. Faster attribute access. Use for many instances.`,complexity:`O(1)`,section:`Slots`,example:`class Regular:
    def __init__(self, x, y):
        self.x = x
        self.y = y

class Slotted:
    __slots__ = ['x', 'y']

    def __init__(self, x, y):
        self.x = x
        self.y = y

r = Regular(1, 2)
s = Slotted(1, 2)

r.z = 3  # OK - can add attributes
# s.z = 3  # AttributeError - restricted

import sys
print(sys.getsizeof(r.__dict__))  # ~104 bytes
# Slotted objects don't have __dict__ - less memory

# Use __slots__ when:
# - Creating many instances (1000s+)
# - Memory is a concern
# - Want to prevent dynamic attributes`},{signature:`_single_underscore`,description:`Convention for "protected" - internal use hint. Still accessible but signals "don't touch from outside".`,complexity:`O(1)`,section:`Private & Protected`,example:`class Account:
    def __init__(self, balance):
        self._balance = balance  # Protected by convention

    def deposit(self, amount):
        self._balance += amount

    def _validate(self, amount):  # Internal method
        return amount > 0

a = Account(100)
print(a._balance)  # 100 (still accessible, but "private")`},{signature:`__double_underscore`,description:`Name mangling - becomes _ClassName__name. Prevents accidental override in subclasses. Not true privacy!`,complexity:`O(1)`,section:`Private & Protected`,example:`class Secret:
    def __init__(self):
        self.__hidden = 42

    def reveal(self):
        return self.__hidden

s = Secret()
# print(s.__hidden)  # AttributeError
print(s.reveal())              # 42
print(s._Secret__hidden)       # 42 (name mangled)

# Use for:
# - Avoiding name clashes in inheritance
# - NOT for security (can still access)`},{signature:`shelve (object database)`,description:`Dict-like persistent storage for objects. Simple object database by key. Only use with trusted data.`,complexity:`O(1)`,section:`Persistence`,example:`import shelve

class Person:
    def __init__(self, name):
        self.name = name

# Store objects by key
with shelve.open("people_db") as db:
    db["alice"] = Person("Alice")
    db["bob"] = Person("Bob")

# Later, retrieve objects
with shelve.open("people_db") as db:
    alice = db["alice"]
    print(alice.name)  # Alice

# SECURITY: Only load shelve files you created
# Never load untrusted data - can run arbitrary code
# For untrusted data, use JSON instead`},{signature:`Self-test pattern`,description:`Include test code in if __name__ == "__main__". File runs tests as script, imports cleanly as module.`,complexity:`Concept`,section:`Best Practices`,example:`# person.py
class Person:
    def __init__(self, name):
        self.name = name

    def greet(self):
        return f"Hello, {self.name}"

# Self-test code - only runs when executed directly
if __name__ == "__main__":
    p = Person("Test")
    assert p.greet() == "Hello, Test"
    print("All tests passed!")

# When imported: tests don't run
# When run directly: python person.py → runs tests`}],ce=[{signature:`Singleton Pattern`,description:`Ensure only one instance exists. Use __new__ or module-level instance. Consider: do you really need this?`,complexity:`O(1)`,section:`Design Patterns`,example:`class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.value = None

s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True - same instance

s1.value = 42
print(s2.value)  # 42

# Alternative: Just use a module!
# config.py becomes a singleton naturally`},{signature:`Factory Pattern`,description:`Create objects without specifying exact class. Delegate instantiation to factory method or class.`,complexity:`O(1)`,section:`Design Patterns`,example:`from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self): pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create(animal_type: str) -> Animal:
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown: {animal_type}")

# Client code doesn't need to know concrete classes
animal = AnimalFactory.create("dog")
print(animal.speak())  # Woof!`},{signature:`Delegation (__getattr__)`,description:`Wrapper intercepts attribute access and forwards to embedded object. Adds logic layer (tracing, validation).`,complexity:`O(1)`,section:`Design Patterns`,example:`class Wrapper:
    def __init__(self, obj):
        self._wrapped = obj

    def __getattr__(self, name):
        print(f"Accessing: {name}")
        return getattr(self._wrapped, name)

# Wrap any object
wrapped_list = Wrapper([1, 2, 3])
wrapped_list.append(4)  # "Accessing: append"
print(wrapped_list._wrapped)  # [1, 2, 3, 4]

# Use cases: logging, lazy loading, proxies
# Wrapper looks like wrapped object to callers`},{signature:`Mix-in classes`,description:`Small classes providing specific capability. Inherit to add orthogonal features without deep hierarchies.`,complexity:`Concept`,section:`Design Patterns`,example:`class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{self.__class__.__name__}] {msg}")

# Mix-in adds capability orthogonally
class User(JsonMixin, LogMixin):
    def __init__(self, name):
        self.name = name

u = User("Alice")
print(u.to_json())  # '{"name": "Alice"}'
u.log("Created")    # [User] Created

# Mix-ins: small, focused, reusable`},{signature:`Bound vs unbound methods`,description:`instance.method is bound (has self). Class.method is function—must pass instance manually.`,complexity:`Concept`,section:`Design Patterns`,example:`class Demo:
    def greet(self):
        return f"Hi from {self}"

d = Demo()

# Bound method - self is packaged in
bound = d.greet
print(type(bound))  # <class 'method'>
print(bound())      # Works - self auto-passed

# Unbound (just a function in Python 3)
unbound = Demo.greet
print(type(unbound))  # <class 'function'>
# unbound()  # TypeError: missing self
print(unbound(d))  # Must pass instance

# Bound methods can be stored, passed around
callbacks = [d.greet]`},{signature:`Descriptors (__get__, __set__)`,description:`Low-level mechanism behind properties. Class with __get__/__set__ assigned to class attribute intercepts access.`,complexity:`O(1)`,section:`Managed Attributes`,example:`class Validator:
    """Descriptor that validates on assignment"""
    def __init__(self, min_val=0):
        self.min_val = min_val
        self.name = None

    def __set_name__(self, owner, name):
        self.name = name  # Called when assigned to class

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name, 0)

    def __set__(self, obj, value):
        if value < self.min_val:
            raise ValueError(f"{self.name} must be >= {self.min_val}")
        obj.__dict__[self.name] = value

class Account:
    balance = Validator(min_val=0)  # Descriptor instance

a = Account()
a.balance = 100   # Calls Validator.__set__
print(a.balance)  # Calls Validator.__get__
# a.balance = -50  # ValueError!`},{signature:`__getattribute__(self, name)`,description:`Runs for ALL attribute fetches. Avoid recursion—use object.__getattribute__(self, name).`,complexity:`O(1)`,section:`Managed Attributes`,example:`class LoggedAccess:
    def __init__(self, value):
        self._value = value

    def __getattribute__(self, name):
        print(f"Accessing: {name}")
        # Must use object method to avoid recursion!
        return object.__getattribute__(self, name)

obj = LoggedAccess(42)
print(obj._value)
# Accessing: _value
# 42

# Common mistake - infinite recursion:
# def __getattribute__(self, name):
#     return self.__dict__[name]  # Calls __getattribute__ again!`},{signature:`__setattr__(self, name, value)`,description:`Runs for ALL attribute assignments. Avoid recursion—assign to self.__dict__ directly.`,complexity:`O(1)`,section:`Managed Attributes`,example:`class ValidatedAttrs:
    def __setattr__(self, name, value):
        print(f"Setting {name} = {value}")
        # Must use __dict__ to avoid recursion!
        self.__dict__[name] = value

obj = ValidatedAttrs()
obj.x = 10  # Setting x = 10

# Validation example
class PositiveOnly:
    def __setattr__(self, name, value):
        if isinstance(value, (int, float)) and value < 0:
            raise ValueError(f"{name} must be positive")
        self.__dict__[name] = value

p = PositiveOnly()
p.count = 5   # OK
# p.count = -1  # ValueError!`},{signature:`Built-in interception limitation`,description:`Built-ins bypass __getattr__/__getattribute__—look up dunder methods in class directly.`,complexity:`Concept`,section:`Managed Attributes`,example:`class Wrapper:
    def __init__(self, obj):
        self._obj = obj

    def __getattr__(self, name):
        return getattr(self._obj, name)

w = Wrapper([1, 2, 3])
w.append(4)     # Works - __getattr__ called
print(w._obj)   # [1, 2, 3, 4]

# But built-ins bypass __getattr__!
# len(w)        # TypeError: no __len__
# str(w)        # Returns default, not list's __str__

# Fix: define the specific methods
class BetterWrapper:
    def __init__(self, obj):
        self._obj = obj
    def __len__(self):
        return len(self._obj)
    def __str__(self):
        return str(self._obj)`},{signature:`Metaclass basics`,description:`Classes are objects created by metaclasses. type is default. Override __new__ to intercept class creation.`,complexity:`O(1)`,section:`Metaclasses`,example:`# type is the default metaclass
print(type(int))         # <class 'type'>
print(type(list))        # <class 'type'>

class MyClass:
    pass

print(type(MyClass))     # <class 'type'>
print(isinstance(MyClass, type))  # True

# Chain: instance → class → metaclass
obj = MyClass()
print(type(obj))         # <class 'MyClass'>
print(type(MyClass))     # <class 'type'>`},{signature:`Custom metaclass`,description:`Subclass type, override __new__ to modify class dict before creation. Use metaclass= in class header.`,complexity:`O(1)`,section:`Metaclasses`,example:`class AutoRepr(type):
    """Metaclass that auto-adds __repr__"""
    def __new__(meta, name, bases, dct):
        # Add __repr__ if not defined
        if '__repr__' not in dct:
            def auto_repr(self):
                attrs = ', '.join(f'{k}={v!r}'
                    for k, v in self.__dict__.items())
                return f'{name}({attrs})'
            dct['__repr__'] = auto_repr
        return type.__new__(meta, name, bases, dct)

class Person(metaclass=AutoRepr):
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)
print(p)  # Person(name='Alice', age=30)`},{signature:`Metaclass registry`,description:`Track all subclasses automatically. Useful for plugin systems.`,complexity:`O(1)`,section:`Metaclasses`,example:`class PluginMeta(type):
    registry = []

    def __new__(meta, name, bases, dct):
        cls = type.__new__(meta, name, bases, dct)
        if name != 'Plugin':  # Don't register base class
            meta.registry.append(cls)
        return cls

class Plugin(metaclass=PluginMeta):
    pass

class AudioPlugin(Plugin):
    pass

class VideoPlugin(Plugin):
    pass

print(PluginMeta.registry)
# [<class 'AudioPlugin'>, <class 'VideoPlugin'>]

# All subclasses auto-registered!`},{signature:`Metaclass vs decorator`,description:`Decorators: after creation, not inherited. Metaclasses: during creation, inherited to subclasses.`,complexity:`Concept`,section:`Metaclasses`,example:`# DECORATOR - not inherited
def add_method(cls):
    cls.greet = lambda self: "Hello!"
    return cls

@add_method
class Base: pass

class Child(Base): pass  # Inherits greet (as method)

# METACLASS - inherited to all subclasses
class MethodMeta(type):
    def __new__(meta, name, bases, dct):
        dct['greet'] = lambda self: f"Hello from {name}!"
        return type.__new__(meta, name, bases, dct)

class Base2(metaclass=MethodMeta): pass
class Child2(Base2): pass  # Also gets own greet!

print(Child2().greet())  # Hello from Child2!

# Use metaclass for framework-level control`}],le=[{section:`Enum Basics`,signature:`Enum`,description:`Type-safe enumerations. Members are unique, comparable only to same enum type.`,complexity:`O(1)`,example:`from enum import Enum, auto

class Status(Enum):
    PENDING = auto()    # 1
    ACTIVE = auto()     # 2
    COMPLETED = auto()  # 3

# Type-safe comparisons
print(Status.PENDING == 1)  # False (not equal to int!)
print(Status.PENDING == Status.PENDING)  # True
print(Status.PENDING.value)  # 1
print(Status.PENDING.name)   # 'PENDING'

# Iteration over all members
for status in Status:
    print(f"{status.name}: {status.value}")

# Access by name or value
print(Status['ACTIVE'])  # Status.ACTIVE
print(Status(2))         # Status.ACTIVE`},{section:`Enum Basics`,signature:`IntEnum`,description:`Enum that also behaves as int. Use when int compatibility needed.`,complexity:`O(1)`,example:`from enum import IntEnum

class Priority(IntEnum):
    LOW = 1
    MEDIUM = 2
    HIGH = 3

# Can compare with integers
print(Priority.LOW < 2)  # True
print(Priority.HIGH == 3)  # True

# Can use in math
print(Priority.LOW + Priority.MEDIUM)  # 3

# CAUTION: Loses type safety
# Regular Enum is usually better`},{section:`Enum Variants`,signature:`Flag`,description:`Enum for bitwise operations. Combine multiple values with | operator.`,complexity:`O(1)`,example:`from enum import Flag, auto

class Permission(Flag):
    READ = auto()     # 1
    WRITE = auto()    # 2
    EXECUTE = auto()  # 4

# Combine permissions
user_perms = Permission.READ | Permission.WRITE
print(user_perms)  # Permission.READ|WRITE

# Check permissions
print(Permission.READ in user_perms)  # True
print(Permission.EXECUTE in user_perms)  # False

# All or none
all_perms = Permission.READ | Permission.WRITE | Permission.EXECUTE
no_perms = Permission(0)`},{section:`When to Use`,signature:`Enum vs Constants`,description:`Use Enum for fixed set of related values. Better than module constants for type safety and grouping.`,complexity:`Concept`,example:`# BAD: Module constants
STATUS_PENDING = 1
STATUS_ACTIVE = 2
STATUS_DONE = 3

def process(status: int):  # No type safety
    if status == 1: ...     # Magic number

# GOOD: Enum
class Status(Enum):
    PENDING = auto()
    ACTIVE = auto()
    DONE = auto()

def process(status: Status):  # Type checked
    if status == Status.PENDING: ...  # Self-documenting

# WHEN TO USE ENUM:
# - Fixed set of related choices
# - Need type safety
# - Want IDE autocomplete
# - Config/state machines`}],ue=[...K,...ne,...re,...oe,...se,...ce,...le];var de=e();function $(e,n){return function(){return(0,de.jsx)(t,{type:e.type,badge:e.badge,color:e.color,description:e.description,intro:e.intro,tip:e.tip,methods:n})}}const fe=$(n.fundamentals,u),pe=$(n.statements,y),me=$(n.conditionals,D),he=$(n.conditionalPatterns,O),ge=$(n.match,k),_e=$(n.loops,A),ve=$(n.comprehensions,j),ye=$(n.functions,G),be=$(n.oop,ue);export{ve as ComprehensionsPage,he as ConditionalPatternsPage,me as ConditionalsPage,ye as FunctionsPage,fe as FundamentalsPage,_e as LoopsPage,ge as MatchPage,be as OOPPage,pe as StatementsPage};
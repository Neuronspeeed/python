export const conditionalsIntro = `Guard Clauses and Early Returns
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
\`\`\``

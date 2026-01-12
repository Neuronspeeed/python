export const matchIntro = `Pattern Matching for Structural Destructuring
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
\`\`\``

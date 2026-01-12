import type { Method } from '../../../types'

export const parametersMethods: Method[] = [
  { section: 'Parameters', signature: 'def func(a, b, c):', description: 'Positional parameters. Must be provided in order when calling.', complexity: 'O(1)', example: `def greet(first, last, greeting):
    return f"{greeting}, {first} {last}!"

print(greet("John", "Doe", "Hello"))
# Hello, John Doe!` },
  { section: 'Parameters', signature: 'def func(a=default):', description: 'Default parameter values. Used if argument not provided.', complexity: 'O(1)', example: `def greet(name, greeting="Hello"):
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
    return lst` },
  { section: 'Parameters', signature: 'def func(*, kw_only):', description: 'Keyword-only parameters. Must be passed by name after *.', complexity: 'O(1)', example: `def func(a, b, *, c, d):
    return a + b + c + d

# func(1, 2, 3, 4)  # TypeError
print(func(1, 2, c=3, d=4))  # 10

# All keyword-only
def config(*, host, port, debug=False):
    return f"{host}:{port}"

print(config(host="localhost", port=8080))` },
  { section: 'Parameters', signature: 'def func(pos_only, /):', description: 'Positional-only parameters (Python 3.8+). Cannot be passed by name.', complexity: 'O(1)', example: `def func(a, b, /, c, d):
    return a + b + c + d

# func(a=1, b=2, c=3, d=4)  # TypeError
print(func(1, 2, c=3, d=4))  # 10
print(func(1, 2, 3, 4))      # 10

# Combined: positional-only, regular, keyword-only
def f(a, /, b, *, c):
    return a + b + c` },
]

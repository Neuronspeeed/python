import type { Method } from '../../types'

// Function Definition + Parameters + *args/**kwargs + Argument Unpacking + Lambda
export const functionsBasicsMethods: Method[] = [
  // Function Definition (indices 0-2)
  { section: 'Function Definition', signature: 'def func_name(params):', description: 'Defines a function with optional parameters. Functions are first-class objects.', complexity: 'O(1)', example: `def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Function with multiple statements
def calculate(x, y):
    result = x + y
    return result` },
  { section: 'Function Definition', signature: 'func() vs func', description: 'Parentheses required to call. Without (), you reference the function object itself.', complexity: 'O(1)', example: `def greet():
    return "Hello!"

greet()   # "Hello!" - calls the function
greet     # <function greet> - the function object

# Common mistake
print(greet)   # <function greet...> (not called!)
print(greet()) # "Hello!" (called)

# Passing function as argument
funcs = [len, sum, max]
for f in funcs:
    print(f([1, 2, 3]))  # 3, 6, 3` },
  { section: 'Function Definition', signature: 'return value', description: 'Returns a value from function. Without return, function returns None.', complexity: 'O(1)', example: `def add(a, b):
    return a + b

def no_return():
    print("No return statement")

print(add(2, 3))      # 5
print(no_return())    # None` },
  { section: 'Function Definition', signature: 'return x, y, z', description: 'Returns multiple values as a tuple. Can be unpacked on assignment.', complexity: 'O(1)', example: `def get_stats(nums):
    return min(nums), max(nums), sum(nums)

low, high, total = get_stats([1, 2, 3, 4, 5])
print(low, high, total)  # 1 5 15

# Or receive as tuple
result = get_stats([1, 2, 3])
print(result)  # (1, 3, 6)` },

  // Parameters (indices 3-6)
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

  // *args and **kwargs (indices 7-9)
  { section: '*args and **kwargs', signature: '*args', description: 'Captures variable positional arguments as a tuple.', complexity: 'O(n)', example: `def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))     # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Hello", "Alice", "Bob", "Charlie")` },
  { section: '*args and **kwargs', signature: '**kwargs', description: 'Captures variable keyword arguments as a dictionary.', complexity: 'O(n)', example: `def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

def create_user(name, **attrs):
    return {"name": name, **attrs}

user = create_user("Bob", age=25, role="admin")
print(user)  # {'name': 'Bob', 'age': 25, 'role': 'admin'}` },
  { section: '*args and **kwargs', signature: '*args, **kwargs', description: 'Accept any combination of arguments. Common for wrappers/decorators.', complexity: 'O(n)', example: `def universal(*args, **kwargs):
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
    return result` },

  // Argument Unpacking (indices 10-11)
  { section: 'Argument Unpacking', signature: 'func(*iterable)', description: 'Unpacks iterable as positional arguments when calling.', complexity: 'O(n)', example: `def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))  # 6

# Works with any iterable
print(add(*range(1, 4)))  # 6
print(add(*(1, 2, 3)))    # 6` },
  { section: 'Argument Unpacking', signature: 'func(**dict)', description: 'Unpacks dictionary as keyword arguments when calling.', complexity: 'O(n)', example: `def greet(name, greeting, punctuation):
    return f"{greeting}, {name}{punctuation}"

params = {"name": "Alice", "greeting": "Hello", "punctuation": "!"}
print(greet(**params))  # Hello, Alice!

# Combine both
args = [1, 2]
kwargs = {"c": 3, "d": 4}
def func(a, b, c, d):
    return a + b + c + d
print(func(*args, **kwargs))  # 10` },

  // Lambda Functions (indices 12-13)
  { section: 'Lambda Functions', signature: 'lambda args: expr', description: 'Anonymous function for simple expressions. Returns result of expression.', complexity: 'O(1)', example: `square = lambda x: x ** 2
print(square(5))  # 25

add = lambda x, y: x + y
print(add(3, 4))  # 7

# With defaults
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))  # Hello, Alice!` },
  { section: 'Lambda Functions', signature: 'Lambda with sort/filter', description: 'Common use cases for lambda with built-in functions.', complexity: 'O(n log n)', example: `# Sort by custom key
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
print(sorted_pairs)  # [(1, 'one'), (3, 'three'), (2, 'two')]

# Filter
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6]

# Map
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25, 36]` },

  // Scopes & LEGB
  { section: 'Scopes & LEGB', signature: 'LEGB Rule', description: 'Name lookup order: Local → Enclosing → Global → Built-in. First match wins.', complexity: 'Concept', example: `x = "global"          # Global scope

def outer():
    x = "enclosing"    # Enclosing scope
    def inner():
        x = "local"    # Local scope
        print(x)       # "local"
    inner()

outer()
print(x)  # "global" (outer scopes unchanged)

# Built-in example
print(len([1,2,3]))  # 3 (len from built-in scope)` },
  { section: 'Scopes & LEGB', signature: 'Shadowing built-ins', description: 'Built-in names can be reassigned (not reserved). Avoid—causes confusion.', complexity: 'Concept', example: `# DON'T DO THIS (but it works)
len = 99
# print(len([1,2,3]))  # TypeError: int not callable

# Restore by deleting local binding
del len
print(len([1,2,3]))  # 3 (built-in works again)

# Common accidental shadows
# list = [1, 2, 3]     # shadows list()
# str = "hello"        # shadows str()
# id = 123             # shadows id()` },
  { section: 'Scopes & LEGB', signature: 'Local scope lifetime', description: 'Local names exist only while function executes. Created on call, destroyed on return.', complexity: 'Concept', example: `def func():
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

# Use closure or global to persist state` },

  // First-Class & Polymorphism
  { section: 'First-Class & Polymorphism', signature: 'First-class functions', description: 'Functions are objects—assign to variables, store in collections, pass as arguments.', complexity: 'Concept', example: `# Assign to variable
greet = lambda x: f"Hi, {x}"
say_hello = greet
print(say_hello("Bob"))  # Hi, Bob

# Store in dict (dispatch pattern)
ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b}
print(ops['+'](5, 3))  # 8

# Pass as argument
def apply(func, value):
    return func(value)
print(apply(len, "hello"))  # 5` },
  { section: 'First-Class & Polymorphism', signature: 'Polymorphism', description: 'Same function works on different types if they support required operations.', complexity: 'Concept', example: `def double(x):
    return x * 2

print(double(5))       # 10 (int)
print(double("hi"))    # "hihi" (str)
print(double([1, 2]))  # [1, 2, 1, 2] (list)

def total(container):
    return sum(container)

print(total([1, 2, 3]))    # 6 (list)
print(total((1, 2, 3)))    # 6 (tuple)
print(total({1, 2, 3}))    # 6 (set)` },

  // Recursion Patterns
  { section: 'Recursion Patterns', signature: 'Cycle detection', description: 'Track visited items to avoid infinite loops in cyclic/graph structures.', complexity: 'O(n)', example: `def traverse(node, visited=None):
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
            dfs(graph, neighbor, visited)` },
]

import type { Method } from '../../types'

// Function Definition + Parameters + *args/**kwargs + Argument Unpacking + Lambda
export const functionsBasicsMethods: Method[] = [
  // Fundamentals
  { section: 'Fundamentals', signature: 'What is a function?', description: 'Functions are VALUES, like numbers and strings. They break code into reusable chunks. Call with () to execute.', complexity: 'Concept', example: `# Functions are values!
print(type(len))  # <class 'builtin_function_or_method'>

# Assign to variable
my_len = len
print(my_len([1, 2, 3]))  # 3 - still works!

# Functions have names separate from the function itself
# The name 'len' refers to the function value

# Call with () to execute
len([1, 2, 3])   # Calls function, returns 3
len              # Just the function object, doesn't run` },
  { section: 'Fundamentals', signature: 'How functions execute', description: '3 steps: 1) Call with arguments, 2) Execute body, 3) Return value and replace call. Function call is REPLACED by return value.', complexity: 'Concept', example: `# Execution process:
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
num_letters = 4` },
  { section: 'Fundamentals', signature: 'Side effects', description: 'Functions can do more than return values. Side effect = changing something external. print() returns None but displays text.', complexity: 'Concept', example: `# print() has side effect (displays text)
# But returns None!
return_value = print("Hello")
print(return_value)  # None

print(type(return_value))  # <class 'NoneType'>

# Side effect: text displayed
# Return value: None

# Functions can:
# - Return values (main purpose)
# - Have side effects (modify external state)
# - Both!` },

  // Why & When
  { section: 'Why & When', signature: 'When to use functions', description: 'Use functions for code reuse, abstraction, and organization. Rule of thumb: if you copy-paste code, make it a function.', complexity: 'Concept', example: `# WITHOUT FUNCTIONS - repetitive
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
# - Breaking down large blocks (<20 lines per function)` },
  { section: 'Why & When', signature: 'Functions vs classes', description: 'Functions for stateless operations. Classes for objects with state + multiple methods. Start simple with functions.', complexity: 'Concept', example: `# USE FUNCTION when stateless
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
# Start with functions, refactor to class if needed` },
  { section: 'Why & When', signature: 'def vs lambda', description: 'def for multi-line logic and readability. lambda for simple inline expressions (sort keys, callbacks).', complexity: 'Concept', example: `# LAMBDA - simple inline expression
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
# GOOD: def clean(x): ...` },
  { section: 'Why & When', signature: 'Recursion vs iteration', description: 'Recursion for tree/graph structures. Iteration for simple loops. Python has recursion limit (~1000).', complexity: 'Concept', example: `# ITERATION - simple, efficient
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

# BEST: Use iteration by default, recursion when it makes code clearer` },
  { section: 'Why & When', signature: 'Function call overhead', description: 'Functions have call overhead (~100ns). Negligible for most code. Only inline for tight inner loops.', complexity: 'Concept', example: `# FUNCTION CALL OVERHEAD
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
# Only inline if profiling shows bottleneck` },

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

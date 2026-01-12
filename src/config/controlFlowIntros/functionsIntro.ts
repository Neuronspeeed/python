export const functionsIntro = `Functions as First-Class Objects
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
\`\`\``

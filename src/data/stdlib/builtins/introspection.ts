import type { Method } from '../../../types'

export const builtinsIntrospectionMethods: Method[] = [
  {
    signature: 'dir(obj)',
    description: 'List valid attributes and methods of object. Essential for exploring APIs in REPL/interview.',
    complexity: 'O(n)',
    section: 'Introspection',
    example: `# List all attributes of an object
dir([])  # All list methods

# Sample output for list:
# ['append', 'clear', 'copy', 'count', 'extend',
#  'index', 'insert', 'pop', 'remove', 'reverse', 'sort', ...]

# Filter to user-friendly methods (no dunders)
[m for m in dir([]) if not m.startswith('_')]
# ['append', 'clear', 'copy', 'count', 'extend',
#  'index', 'insert', 'pop', 'remove', 'reverse', 'sort']

# dir() on different types
dir(str)   # String methods
dir(dict)  # Dict methods
dir(42)    # Integer methods/attributes

# USE CASE: Explore unknown objects
def explore(obj):
    print(f"Type: {type(obj).__name__}")
    methods = [m for m in dir(obj) if not m.startswith('_')]
    print(f"Methods: {methods[:10]}...")  # First 10

# USE CASE: Check if method exists
if 'append' in dir(my_list):
    my_list.append(item)

# BETTER: Use hasattr() for checking
if hasattr(my_list, 'append'):
    my_list.append(item)

# dir() with no argument - current scope
x = 1
y = 2
def foo(): pass
dir()  # ['foo', 'x', 'y', ...]

# INTERVIEW TIP: When stuck on available methods:
# >>> dir(some_object)
# Then use help() on specific method`
  },

  {
    signature: 'help(obj)',
    description: 'Display documentation for object, module, function, or method. Interactive in REPL, returns None.',
    complexity: 'O(1)',
    section: 'Introspection',
    example: `# Get help on any object
help(list.append)
# Shows: append(object) -> None -- append object to end

help(str.split)
# Shows: split(sep=None, maxsplit=-1) -> list of strings

# help() on a type
help(dict)  # Shows all dict methods with docs

# help() on a module
import math
help(math)  # Shows all functions in math module

# INTERACTIVE MODE (in REPL):
# >>> help()
# Starts interactive help browser
# Type 'quit' to exit

# USE IN INTERVIEW:
# When you forget exact syntax:
# >>> help(sorted)
# sorted(iterable, /, *, key=None, reverse=False)

# GET JUST THE SIGNATURE:
import inspect
inspect.signature(sorted)  # (iterable, /, *, key=None, reverse=False)

# DOCSTRINGS:
def my_function(x, y):
    """Add two numbers and return result.

    Args:
        x: First number
        y: Second number

    Returns:
        Sum of x and y
    """
    return x + y

help(my_function)  # Shows your docstring!

# NOTE: help() prints to stdout, returns None
result = help(print)  # Prints docs, result is None`
  },

  {
    signature: 'hasattr/getattr/setattr',
    description: 'Check, get, and set object attributes dynamically. Essential for duck typing and metaprogramming.',
    complexity: 'O(1)',
    section: 'Introspection',
    example: `# hasattr(obj, name) - Check if attribute exists
hasattr([], 'append')    # True
hasattr([], 'foo')       # False
hasattr("hi", 'upper')   # True

# getattr(obj, name, default) - Get attribute value
getattr([], '__len__')()    # 0 (gets the method, then calls it)
getattr("hi", 'upper')()    # "HI"
getattr({}, 'foo', None)    # None (default if not found)
getattr({}, 'foo')          # AttributeError if no default!

# setattr(obj, name, value) - Set attribute value
class Person:
    pass

p = Person()
setattr(p, 'name', 'Alice')
p.name  # 'Alice'

# DUCK TYPING PATTERN:
def process(data):
    if hasattr(data, '__iter__'):
        for item in data:
            print(item)
    elif hasattr(data, 'read'):
        print(data.read())
    else:
        print(data)

# DYNAMIC ATTRIBUTE ACCESS:
def get_nested(obj, path):
    """Get nested attribute: get_nested(obj, 'a.b.c')"""
    for attr in path.split('.'):
        obj = getattr(obj, attr)
    return obj

# INTERVIEW PATTERN: Config from dict
def configure(obj, config):
    for key, value in config.items():
        if hasattr(obj, key):
            setattr(obj, key, value)

# delattr(obj, name) - Delete attribute
delattr(p, 'name')
# hasattr(p, 'name')  # False now`
  },

  {
    signature: 'callable(obj)',
    description: 'Check if object can be called like a function. True for functions, methods, classes, and objects with __call__.',
    complexity: 'O(1)',
    section: 'Introspection',
    example: `# Check if object is callable
callable(print)        # True - function
callable(len)          # True - built-in function
callable(str.upper)    # True - method
callable(int)          # True - class (constructor)
callable(42)           # False - integer
callable("hello")      # False - string
callable([1, 2])       # False - list

# Objects with __call__ are callable
class Adder:
    def __init__(self, n):
        self.n = n

    def __call__(self, x):
        return self.n + x

add5 = Adder(5)
callable(add5)    # True
add5(10)          # 15

# USE CASE: Validate callbacks
def register_callback(callback):
    if not callable(callback):
        raise TypeError("callback must be callable")
    # ...

# USE CASE: Handle mixed values
def apply_or_return(func_or_value, *args):
    if callable(func_or_value):
        return func_or_value(*args)
    return func_or_value

apply_or_return(lambda x: x * 2, 5)  # 10
apply_or_return(42)                   # 42

# LAMBDA vs FUNCTION
f = lambda x: x * 2
def g(x): return x * 2

callable(f)  # True
callable(g)  # True`
  },
]

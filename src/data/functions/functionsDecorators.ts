import type { Method } from '../../types'

// Decorators + Built-in Decorators
export const functionsDecoratorsMethods: Method[] = [
  // Decorators
  { section: 'Decorators', signature: '@decorator', description: 'Wraps function to modify its behavior. Applied from bottom to top.', complexity: 'O(1)', example: `def uppercase(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase
def greet(name):
    return f"hello, {name}"

print(greet("world"))  # HELLO, WORLD

# Equivalent to:
# greet = uppercase(greet)` },
  { section: 'Decorators', signature: '@functools.wraps', description: 'Preserves original function metadata in decorators.', complexity: 'O(1)', example: `from functools import wraps

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
print(greet.__doc__)   # Greet someone.` },
  { section: 'Decorators', signature: 'Decorator with arguments', description: 'Decorator that accepts parameters requires an extra wrapper level.', complexity: 'O(1)', example: `def repeat(times):
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

say_hello()  # Prints "Hello!" 3 times` },
  { section: 'Decorators', signature: 'Class decorator', description: 'Use class as decorator with __call__ method.', complexity: 'O(1)', example: `class CountCalls:
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
print(greet.count)  # 2` },
  { section: 'Decorators', signature: 'Stacking decorators', description: 'Multiple decorators applied bottom to top. Each wraps the result of the previous.', complexity: 'O(1)', example: `def bold(func):
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

# Applied bottom-up: italic first, then bold` },
  { section: 'Decorators', signature: 'Class decorator (augment)', description: 'Decorator that modifies or wraps a class. Add methods, implement singleton, or return wrapper.', complexity: 'O(1)', example: `# Singleton pattern - ensure only one instance
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
print(db1 is db2)  # True` },
  { section: 'Decorators', signature: 'State via function attributes', description: 'Store state directly on wrapper function object instead of closure.', complexity: 'O(1)', example: `def count_calls(func):
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
# Disadvantage: not truly private` },
  { section: 'Decorators', signature: 'Validation decorator', description: 'Check argument types or validate return values at call time.', complexity: 'O(1)', example: `def validate_args(*types):
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
# add("2", 3)        # TypeError: Expected int, got str` },
  { section: 'Decorators', signature: 'Registration decorator', description: 'Register functions at definition time. Build plugin systems or command handlers.', complexity: 'O(1)', example: `COMMANDS = {}

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
print(list(COMMANDS.keys()))       # ['greet', 'bye']` },

  // Built-in Decorators
  { section: 'Built-in Decorators', signature: '@property', description: 'Defines a method as a property getter. Access without parentheses.', complexity: 'O(1)', example: `class Circle:
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
c.radius = 10    # Uses setter` },
  { section: 'Built-in Decorators', signature: '@staticmethod', description: 'Method that does not receive self. Utility function in class namespace.', complexity: 'O(1)', example: `class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(Math.add(2, 3))      # 5
print(Math.is_even(4))     # True

m = Math()
print(m.add(1, 2))         # Also works on instance` },
  { section: 'Built-in Decorators', signature: '@classmethod', description: 'Method that receives class as first argument. Alternative constructors.', complexity: 'O(1)', example: `class Date:
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
print(d.year, d.month, d.day)  # 2024 1 15` },
]

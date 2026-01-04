import type { Method } from '../../types'

// Dunder Methods (Magic Methods)
export const oopDunderMethods: Method[] = [
  { signature: '__str__(self)', description: 'Human-readable string representation. Used by print() and str(). User-friendly output.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __str__(self):
        return f"{self.name}, {self.age} years old"

p = Person("Alice", 30)
print(p)        # Alice, 30 years old
print(str(p))   # Alice, 30 years old` },
  { signature: '__repr__(self)', description: 'Unambiguous representation for developers. Used by repr() and in debugger. Should ideally be valid Python code.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Point:
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

# If only __repr__ defined, it's used for str() too` },
  { signature: '__eq__(self, other)', description: 'Equality comparison. Used by == operator. Implement for value comparison.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Point:
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
print(p1 == p3)  # False` },
  { signature: '__hash__(self)', description: 'Return hash value. Required for use in sets/dict keys. Objects equal by __eq__ must have same hash.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Point:
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
print(len(s))  # 1 (duplicates removed)` },
  { signature: '__lt__, __le__, __gt__, __ge__', description: 'Comparison operators: <, <=, >, >=. Use @total_ordering to auto-generate from __eq__ and __lt__.', complexity: 'O(1)', section: 'Dunder Methods', example: `from functools import total_ordering

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
print(v2 > v3)   # True (generated)` },
  { signature: '__len__(self)', description: 'Return length. Used by len() built-in. Makes class work with len().', complexity: 'O(1)', section: 'Dunder Methods', example: `class Playlist:
    def __init__(self):
        self.songs = []

    def add(self, song):
        self.songs.append(song)

    def __len__(self):
        return len(self.songs)

playlist = Playlist()
playlist.add("Song A")
playlist.add("Song B")
print(len(playlist))  # 2` },
  { signature: '__getitem__, __setitem__, __delitem__', description: 'Item access with brackets: obj[key]. Makes class subscriptable like list/dict.', complexity: 'O(1)', section: 'Dunder Methods', example: `class CustomList:
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
del cl[0]` },
  { signature: '__iter__, __next__', description: 'Make object iterable. Used by for loops. Return iterator from __iter__, next value from __next__.', complexity: 'O(1)', section: 'Dunder Methods', example: `class CountDown:
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
    print(num)  # 5, 4, 3, 2, 1` },
  { signature: '__call__(self, ...)', description: 'Make instance callable like a function. Useful for stateful functions or configurable behavior.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))   # 10
print(triple(5))   # 15

# Check if callable
print(callable(double))  # True` },
  { signature: '__add__, __sub__, __mul__', description: 'Arithmetic operators: +, -, *. Makes objects work with math operators.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Vector:
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
print(v1 * 3)     # Vector(3, 6)` },
  { signature: '__enter__, __exit__', description: 'Context manager protocol. Used with "with" statement. Ensures cleanup happens even on errors.', complexity: 'O(1)', section: 'Dunder Methods', example: `class Timer:
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
# Prints: Elapsed: 0.03s` },
  { signature: '__doc__ (docstrings)', description: 'First string literal in class/method becomes documentation. Accessible via __doc__ or help().', complexity: 'O(1)', section: 'Dunder Methods', example: `class Calculator:
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

help(Calculator)  # Shows formatted docs` },
]

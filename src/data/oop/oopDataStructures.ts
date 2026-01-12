import type { Method } from '../../types'

// Abstract Classes + Dataclasses + Slots + Private + Persistence + Best Practices
export const oopDataStructuresMethods: Method[] = [
  // Abstract Base Classes
  { signature: 'ABC and @abstractmethod', description: 'Define abstract classes that cannot be instantiated. Force subclasses to implement specific methods.', complexity: 'O(1)', section: 'Abstract Classes', example: `from abc import ABC, abstractmethod

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
print(rect.perimeter())  # 16` },

  // Protocol (Structural Subtyping)
  { signature: 'typing.Protocol', description: 'Structural subtyping (duck typing + type hints). Class matches if it has required methods - no inheritance needed.', complexity: 'O(1)', section: 'Protocol', example: `from typing import Protocol

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
# Use Protocol for duck typing with type safety` },

  // Dataclasses
  { signature: '@dataclass', description: 'Auto-generate __init__, __repr__, __eq__ and more. Reduces boilerplate for data-holding classes.', complexity: 'O(1)', section: 'Dataclasses', example: `from dataclasses import dataclass, field

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
print(p1.x)         # 1.0` },
  { signature: '@dataclass options', description: 'Customize dataclass with frozen (immutable), order (comparisons), slots (memory efficient).', complexity: 'O(1)', section: 'Dataclasses', example: `from dataclasses import dataclass, field

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
print(v1 < v2)  # True` },

  // Slots
  { signature: '__slots__', description: 'Restrict attributes and reduce memory. No __dict__ per instance. Faster attribute access. Use for many instances.', complexity: 'O(1)', section: 'Slots', example: `class Regular:
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
# - Want to prevent dynamic attributes` },

  // Private and Protected
  { signature: '_single_underscore', description: 'Convention for "protected" - internal use hint. Still accessible but signals "don\'t touch from outside".', complexity: 'O(1)', section: 'Private & Protected', example: `class Account:
    def __init__(self, balance):
        self._balance = balance  # Protected by convention

    def deposit(self, amount):
        self._balance += amount

    def _validate(self, amount):  # Internal method
        return amount > 0

a = Account(100)
print(a._balance)  # 100 (still accessible, but "private")` },
  { signature: '__double_underscore', description: 'Name mangling - becomes _ClassName__name. Prevents accidental override in subclasses. Not true privacy!', complexity: 'O(1)', section: 'Private & Protected', example: `class Secret:
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
# - NOT for security (can still access)` },

  // Persistence
  { signature: 'shelve (object database)', description: 'Dict-like persistent storage for objects. Simple object database by key. Only use with trusted data.', complexity: 'O(1)', section: 'Persistence', example: `import shelve

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
# For untrusted data, use JSON instead` },

  // Best Practices
  { signature: 'Self-test pattern', description: 'Include test code in if __name__ == "__main__". File runs tests as script, imports cleanly as module.', complexity: 'Concept', section: 'Best Practices', example: `# person.py
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
# When run directly: python person.py → runs tests` },
]

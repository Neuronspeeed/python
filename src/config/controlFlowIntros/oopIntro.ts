export const oopIntro = `Classes and Objects Fundamentals
Classes are blueprints for creating objects that bundle data and behavior. Use def to create methods—they automatically receive the instance as first argument (self). The __init__ constructor runs when creating instances. Classes beat dictionaries for structured data because they provide consistent interfaces, type checking, and can add behavior.

\`\`\`python
# BASIC CLASS SYNTAX
class Dog:
    species = "Canis familiaris"  # Class attribute (shared)

    def __init__(self, name, age):  # Constructor
        self.name = name        # Instance attribute
        self.age = age

    def bark(self):             # Instance method
        return f"{self.name} says woof!"

# CREATE INSTANCES
dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)
print(dog1.bark())  # "Buddy says woof!"
print(Dog.species)  # "Canis familiaris" (shared)

# WHEN TO USE CLASSES VS DICTS
# Dict - flexible, no behavior
person = {"name": "Alice", "age": 30}

# Class - consistent interface, can add methods
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):  # Behavior bundled with data
        return f"Hi, I'm {self.name}"
\`\`\`
---
Inheritance and Composition Patterns
Inheritance (is-a) creates specialized classes from general ones. Composition (has-a) embeds objects inside others—often clearer than inheritance. Delegation forwards attribute access to wrapped objects using __getattr__. MRO (Method Resolution Order) determines lookup path in multiple inheritance using C3 linearization.

\`\`\`python
# INHERITANCE - "is-a" relationship
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError

class Dog(Animal):  # Dog IS-AN Animal
    def speak(self):
        return f"{self.name} barks"

class Cat(Animal):
    def speak(self):
        return f"{self.name} meows"

# COMPOSITION - "has-a" relationship
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS-AN Engine

    def start(self):
        return self.engine.start()

# DELEGATION - Forward to wrapped object
class LoggedList:
    def __init__(self):
        self._list = []

    def __getattr__(self, name):  # Delegate unknown attrs
        return getattr(self._list, name)

    def append(self, item):  # Override to add logging
        print(f"Adding {item}")
        self._list.append(item)

logged = LoggedList()
logged.append(1)  # Logs then delegates
logged.pop()      # Delegates directly to list.pop()
\`\`\`
---
Advanced OOP: Properties, Descriptors, and Metaclasses
Use @property for computed attributes and validation—runs code on access. @dataclass auto-generates __init__, __repr__, __eq__. __slots__ restricts attributes and reduces memory 50%+. ABC defines interfaces that subclasses must implement. Metaclasses customize class creation—rarely needed but powerful.

\`\`\`python
# @PROPERTY - Computed attributes with validation
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):  # Getter
        return self._radius

    @radius.setter
    def radius(self, value):  # Setter with validation
        if value < 0:
            raise ValueError("Radius must be positive")
        self._radius = value

    @property
    def area(self):  # Computed attribute
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)     # 78.54 (computed on access)
c.radius = -1     # ValueError!

# @DATACLASS - Auto-generate boilerplate
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float
    # Auto-generates __init__, __repr__, __eq__

p = Point(1, 2)
print(p)  # Point(x=1, y=2)

# __SLOTS__ - Restrict attributes, save memory
class SlottedClass:
    __slots__ = ['x', 'y']  # Only these attributes allowed

    def __init__(self, x, y):
        self.x = x
        self.y = y
        # self.z = 3  # AttributeError!

# ABC - Define interfaces
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, w, h):
        self.w = w
        self.h = h

    def area(self):  # Must implement
        return self.w * self.h

# METACLASS - Customize class creation (advanced)
class Meta(type):
    def __new__(cls, name, bases, dct):
        dct['added'] = 42  # Add attribute to all classes
        return super().__new__(cls, name, bases, dct)

class MyClass(metaclass=Meta):
    pass

print(MyClass.added)  # 42
\`\`\``

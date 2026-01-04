import type { Method } from '../../types'

// Inheritance + Properties + Class/Static Methods
export const oopInheritanceMethods: Method[] = [
  // Inheritance
  { signature: 'Attribute search tree', description: 'When accessing obj.attr, Python searches: instance → class → superclasses (left-to-right, bottom-to-top). First match wins.', complexity: 'Concept', section: 'Inheritance', example: `class A:
    x = "from A"

class B(A):
    pass  # No x defined

class C(A):
    x = "from C"

class D(B, C):
    pass

# Search order: D → B → C → A → object
print(D().x)    # "from C" (found in C before A)
print(D.__mro__)  # Shows exact search order

# Instance attr shadows class attr
d = D()
d.x = "instance"
print(d.x)  # "instance" (found on instance first)` },
  { signature: 'class Child(Parent):', description: 'Inherits all attributes and methods from Parent class. Child can override or extend parent behavior.', complexity: 'O(1)', section: 'Inheritance', example: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):  # Override parent method
        return f"{self.name} says woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.speak())  # Buddy says woof!
print(cat.speak())  # Whiskers says meow!` },
  { signature: 'super()', description: 'Returns proxy object to call parent class methods. Essential for extending (not just overriding) parent behavior.', complexity: 'O(1)', section: 'Inheritance', example: `class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent __init__
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)   # Buddy
print(dog.breed)  # Golden Retriever

# super() in method override
class Bird(Animal):
    def speak(self):
        parent_sound = super().speak()
        return f"{parent_sound} (chirp chirp)"` },
  { signature: 'Multiple inheritance', description: 'Inherit from multiple classes. Method Resolution Order (MRO) determines which method is called. Use sparingly!', complexity: 'O(1)', section: 'Inheritance', example: `class A:
    def method(self):
        return "A"

class B(A):
    def method(self):
        return "B"

class C(A):
    def method(self):
        return "C"

class D(B, C):  # B comes before C
    pass

d = D()
print(d.method())  # B (follows MRO)
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)

# Prefer composition over multiple inheritance!` },
  { signature: 'Composition over Inheritance', description: 'Favor "has-a" relationships over "is-a". More flexible and avoids inheritance complexity.', complexity: 'O(1)', section: 'Inheritance', example: `# INHERITANCE: Dog IS-A Animal (tight coupling)
class Animal:
    def move(self): pass

class Dog(Animal):
    pass

# COMPOSITION: Car HAS-A Engine (loose coupling)
class Engine:
    def start(self):
        return "Engine started"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A relationship

    def start(self):
        return self.engine.start()

# Composition benefits:
# - Easy to swap components
# - No deep inheritance hierarchies
# - Clear dependencies
# - Better testability (can mock components)` },
  { signature: 'isinstance(obj, class)', description: 'Check if object is instance of class (including inheritance). Prefer duck typing in Python!', complexity: 'O(n)', section: 'Inheritance', example: `class Animal: pass
class Dog(Animal): pass

dog = Dog()
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True (inheritance)
print(isinstance(dog, object))  # True (everything inherits from object)

# Check multiple types
print(isinstance(5, (int, float)))  # True

# But prefer duck typing!
# Instead of: if isinstance(obj, list):
# Do: if hasattr(obj, '__iter__'):` },

  // Properties
  { signature: '@property', description: 'Define getter method accessed like an attribute. Encapsulates internal state. Computed properties without method call syntax.', complexity: 'O(1)', section: 'Properties', example: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

    @property
    def diameter(self):
        return self._radius * 2

c = Circle(5)
print(c.radius)    # 5 (no parentheses!)
print(c.area)      # 78.53975
print(c.diameter)  # 10` },
  { signature: '@name.setter', description: 'Define setter for property. Enables validation on assignment. Control how attributes are modified.', complexity: 'O(1)', section: 'Properties', example: `class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self.celsius = (value - 32) * 5/9

t = Temperature()
t.celsius = 25
print(t.fahrenheit)  # 77.0
t.fahrenheit = 100
print(t.celsius)     # 37.77...` },

  // Class and Static Methods
  { signature: '@classmethod', description: 'Method that receives class (cls) instead of instance. Use for alternative constructors or operations on class state.', complexity: 'O(1)', section: 'Class & Static Methods', example: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):
        """Alternative constructor from string"""
        year, month, day = map(int, date_str.split('-'))
        return cls(year, month, day)

    @classmethod
    def today(cls):
        """Alternative constructor for today"""
        import datetime
        d = datetime.date.today()
        return cls(d.year, d.month, d.day)

d1 = Date(2024, 1, 15)
d2 = Date.from_string("2024-06-20")
d3 = Date.today()` },
  { signature: '@staticmethod', description: 'Method without self or cls. Just a regular function in class namespace. Use for utility functions related to the class.', complexity: 'O(1)', section: 'Class & Static Methods', example: `class Math:
    @staticmethod
    def add(a, b):
        return a + b

    @staticmethod
    def is_even(n):
        return n % 2 == 0

    @staticmethod
    def factorial(n):
        if n <= 1:
            return 1
        return n * Math.factorial(n - 1)

# Call on class
print(Math.add(2, 3))      # 5
print(Math.is_even(4))     # True

# Also works on instance
m = Math()
print(m.factorial(5))      # 120

# When to use:
# @staticmethod - utility function, no class/instance needed
# @classmethod - need class for alternative constructors` },

  // Namespace Internals
  { signature: '__dict__, __class__, __bases__', description: 'Namespaces are dicts. Instances link to class via __class__, classes link to parents via __bases__.', complexity: 'O(1)', section: 'Namespace Internals', example: `class Parent:
    x = 1

class Child(Parent):
    y = 2

obj = Child()
obj.z = 3

# Namespace dictionaries
print(obj.__dict__)     # {'z': 3} - instance attrs only
print(Child.__dict__)   # {'y': 2, ...} - class attrs
print(Parent.__dict__)  # {'x': 1, ...}

# Inheritance links
print(obj.__class__)    # <class 'Child'>
print(Child.__bases__)  # (<class 'Parent'>,)

# obj.x searches: obj.__dict__ → Child.__dict__ → Parent.__dict__` },
  { signature: 'LEGB vs Object rule', description: 'Two lookup mechanisms: simple names (x) use LEGB scopes; qualified names (obj.x) search inheritance tree.', complexity: 'Concept', section: 'Namespace Internals', example: `x = "global"  # Simple name → LEGB rule

class MyClass:
    x = "class"  # Class attribute

    def method(self):
        x = "local"       # Local scope
        print(x)          # "local" (LEGB: Local first)
        print(self.x)     # "class" (Object rule: instance → class)

obj = MyClass()
obj.x = "instance"
obj.method()
# x → "local" (LEGB search)
# self.x → "instance" (Object search)

# Key distinction:
# x = 1        → creates/finds in current LEGB scope
# self.x = 1   → always creates in instance namespace` },
  { signature: 'Method call translation', description: 'instance.method(args) translates to Class.method(instance, args). Explicit class call useful for extending.', complexity: 'O(1)', section: 'Namespace Internals', example: `class Person:
    def greet(self):
        return f"Hi, I'm {self.name}"

p = Person()
p.name = "Alice"

# These are equivalent:
print(p.greet())              # Hi, I'm Alice
print(Person.greet(p))        # Hi, I'm Alice

# Useful for calling parent method explicitly
class Employee(Person):
    def greet(self):
        base = Person.greet(self)  # or super().greet()
        return f"{base}, an employee"` },

  // Specialization Patterns
  { signature: '4 ways to specialize', description: 'Inherit (use as-is), Override (replace), Extend (call super + add), Provide (subclass implements).', complexity: 'Concept', section: 'Specialization Patterns', example: `class Base:
    def inherit_me(self):
        return "base"

    def override_me(self):
        return "base"

    def extend_me(self):
        return "base"

    def action(self):  # Expects subclass to provide
        raise NotImplementedError

class Child(Base):
    # 1. INHERIT: inherit_me() used as-is

    # 2. OVERRIDE: completely replace
    def override_me(self):
        return "child"

    # 3. EXTEND: call parent + add logic
    def extend_me(self):
        return super().extend_me() + " + child"

    # 4. PROVIDE: implement required method
    def action(self):
        return "child action"` },
]

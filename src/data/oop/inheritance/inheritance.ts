import type { Method } from '../../../types'

export const inheritanceMethods: Method[] = [
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
]

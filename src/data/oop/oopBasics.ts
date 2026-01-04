import type { Method } from '../../types'

// Why OOP + Class Basics + Class vs Instance Attributes
export const oopBasicsMethods: Method[] = [
  // Why OOP
  { signature: 'Why use OOP?', description: 'OOP organizes code into reusable, modular units. Classes bundle data + behavior together, making code easier to understand, maintain, and extend.', complexity: 'Concept', section: 'Why & When', example: `# Without OOP - scattered functions and data
name = "Alice"
balance = 100

def deposit(amount):
    global balance
    balance += amount

# With OOP - organized, encapsulated
class BankAccount:
    def __init__(self, name, balance=0):
        self.name = name
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount
        return self.balance

# Benefits:
# 1. Encapsulation - data + methods together
# 2. Reusability - create multiple accounts
# 3. Maintainability - changes isolated to class` },
  { signature: 'When to use OOP vs Functions', description: 'Use OOP when you have data + behavior that belong together, need multiple instances, or want inheritance. Use functions for stateless operations.', complexity: 'Concept', section: 'Why & When', example: `# USE FUNCTIONS when:
# - Stateless transformations
# - Simple utilities
# - One-off operations

def calculate_tax(amount, rate):
    return amount * rate

# USE CLASSES when:
# - Data + behavior belong together
# - Need multiple instances with state
# - Want inheritance/polymorphism

class TaxCalculator:
    def __init__(self, country, year):
        self.country = country
        self.year = year

    def calculate(self, income):
        return self._apply_brackets(income)

# Rule of thumb: If you pass same data
# to multiple functions, use a class` },
  { signature: 'Classes vs Dictionaries', description: 'Dicts store labeled data. Classes package data + logic together, ensuring consistent interface and operations.', complexity: 'Concept', section: 'Why & When', example: `# Dictionary: just data, logic scattered elsewhere
emp = {"name": "Bob", "salary": 50000}
def give_raise(emp, pct):
    emp["salary"] *= (1 + pct)

# Class: data + logic packaged together
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, pct):
        self.salary *= (1 + pct)

# Benefits of class:
# - All employees have same interface
# - Logic lives with the data
# - Can inherit (Manager from Employee)` },
  { signature: 'Classes vs Modules', description: 'Modules are files with one copy of data. Classes are statements that create multiple instances with independent state.', complexity: 'Concept', section: 'Why & When', example: `# MODULE: one copy of data
# config.py
DEBUG = True
def log(msg): print(msg)

# CLASS: multiple instances, each with own data
class Logger:
    def __init__(self, name):
        self.name = name
        self.messages = []

    def log(self, msg):
        self.messages.append(msg)

# Create independent loggers
app_log = Logger("app")
db_log = Logger("database")
# Each has its own messages list` },
  { signature: 'Empty class (record)', description: 'Empty class with pass can have attributes added dynamically. Mimics structs/records, cleaner than dicts.', complexity: 'O(1)', section: 'Why & When', example: `# Empty class as flexible record
class Record:
    pass

# Add attributes dynamically
rec = Record()
rec.name = "Bob"
rec.age = 40
rec.job = "Developer"

print(rec.name)  # Bob

# Cleaner than dict: rec.name vs rec["name"]
# Can add methods later if needed
# Multiple records are independent` },
  { signature: 'Encapsulation', description: 'Bundle logic with data as methods, not external functions. Changes to logic update in one place.', complexity: 'Concept', section: 'Why & When', example: `# BAD: External function - logic scattered
def give_raise(person, pct):
    person["salary"] *= (1 + pct)

# GOOD: Method - logic lives with data
class Person:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def give_raise(self, pct):
        self.salary *= (1 + pct)

# Benefits:
# - Logic changes in one place
# - Object knows how to process itself
# - Clearer API: person.give_raise(0.1)` },
  { signature: 'Incremental design', description: 'Start simple, refactor as needed. Python OOP supports evolving from records → methods → inheritance.', complexity: 'Concept', section: 'Why & When', example: `# Step 1: Simple record
class Person:
    def __init__(self, name):
        self.name = name

# Step 2: Add behavior as needed
class Person:
    def __init__(self, name):
        self.name = name
    def greet(self):
        return f"Hi, I'm {self.name}"

# Step 3: Specialize via inheritance
class Employee(Person):
    def __init__(self, name, role):
        super().__init__(name)
        self.role = role

# No need to design everything upfront!` },

  // Class Basics
  { signature: 'class ClassName:', description: 'Defines a new class. By convention, use CamelCase for class names. Classes are blueprints for creating objects.', complexity: 'O(1)', section: 'Class Basics', example: `class Dog:
    species = "Canis familiaris"  # Class attribute

    def __init__(self, name, age):
        self.name = name  # Instance attribute
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Buddy", 3)
print(dog.name)   # Buddy
print(dog.bark()) # Buddy says woof!` },
  { signature: '__init__(self, ...)', description: 'Constructor method. Called when creating new instance. Initialize attributes here. NOT for returning values.', complexity: 'O(1)', section: 'Class Basics', example: `class Person:
    def __init__(self, name, age=0):
        self.name = name
        self.age = age
        self._id = id(self)  # Private by convention

p1 = Person("Alice", 30)
p2 = Person("Bob")  # age defaults to 0

print(p1.name, p1.age)  # Alice 30
print(p2.name, p2.age)  # Bob 0` },
  { signature: 'self', description: 'Reference to current instance. Must be first parameter of instance methods. Python passes it automatically.', complexity: 'O(1)', section: 'Class Basics', example: `class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
        return self  # Return self for chaining

    def decrement(self):
        self.count -= 1
        return self

c = Counter()
c.increment().increment().increment()
print(c.count)  # 3` },

  // Class vs Instance Attributes
  { signature: 'Class attribute', description: 'Shared by ALL instances. Defined directly in class body. Use for constants or shared state. Beware of mutable class attributes!', complexity: 'O(1)', section: 'Class vs Instance', example: `class Dog:
    species = "Canis familiaris"  # Class attribute
    count = 0

    def __init__(self, name):
        self.name = name  # Instance attribute
        Dog.count += 1

d1 = Dog("Buddy")
d2 = Dog("Max")

print(Dog.count)      # 2
print(d1.species)     # Canis familiaris
print(d2.species)     # Canis familiaris

# Modifying class attribute affects all
Dog.species = "Wolf"
print(d1.species)     # Wolf

# WARNING: Mutable class attributes are shared!
class Bad:
    items = []  # DANGER! Shared by all instances` },
  { signature: 'Instance attribute', description: 'Unique to each instance. Set via self in __init__ or later. Each object has its own copy.', complexity: 'O(1)', section: 'Class vs Instance', example: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

p1 = Point(1, 2)
p2 = Point(3, 4)

p1.x = 10  # Only affects p1
print(p1.x, p2.x)  # 10 3

# Can add attributes dynamically
p1.z = 5
print(p1.z)  # 5
# print(p2.z)  # AttributeError` },
]

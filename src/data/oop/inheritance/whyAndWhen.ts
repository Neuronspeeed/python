import type { Method } from '../../../types'

export const whyAndWhenMethods: Method[] = [
  { signature: 'Inheritance vs Composition', description: 'Inheritance: "is-a" relationships, share behavior (Dog is-a Animal). Composition: "has-a" relationships, assemble behavior (Car has-a Engine). Prefer composition for flexibility.', complexity: 'Concept', section: 'Why & When', example: `# INHERITANCE - when subclass IS-A parent type
class Animal:
    def breathe(self):
        return "breathing"

class Dog(Animal):
    def bark(self):
        return "woof"
# Dog IS-A Animal - (shares behavior)

# COMPOSITION - when object HAS-A component
class Engine:
    def start(self):
        return "engine running"

class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A relationship

    def start(self):
        return self.engine.start()
# Car HAS-AN Engine - (assembles behavior)

# Use inheritance when:
# - True "is-a" relationship (Dog is-a Animal)
# - Subclass adds specialization (Manager is-a Employee)
# - Want polymorphism (treat Dog, Cat as Animal)

# Use composition when:
# - "has-a" relationship (Car has-a Engine)
# - Need to swap components (different engines)
# - Avoid deep hierarchies (prefer flat)
# - Multiple sources of behavior (logger + cache + validator)`, },
  { signature: '@property vs direct attributes', description: '@property when: need validation, computed values, lazy loading, API compatibility. Direct attributes when: simple data storage.', complexity: 'Concept', section: 'Why & When', example: `# DIRECT ATTRIBUTE - simple storage
class Point:
    def __init__(self, x, y):
        self.x = x  # Just store it
        self.y = y

# PROPERTY - validation needed
class BankAccount:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Cannot be negative")
        self._balance = value

# PROPERTY - computed value
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height  # Computed on access

# PROPERTY - lazy loading
class DataLoader:
    @property
    def data(self):
        if not hasattr(self, '_data'):
            self._data = expensive_load()  # Load once
        return self._data

# Rule: Start with direct attributes
#       Add @property when you need control`, },
  { signature: '@classmethod vs @staticmethod vs methods', description: '@classmethod: needs class (alternative constructors). @staticmethod: utility, no self/cls needed. Regular method: needs instance state.', complexity: 'Concept', section: 'Why & When', example: `class User:
    users_count = 0

    def __init__(self, name, email):
        self.name = name   # Instance state
        self.email = email
        User.users_count += 1

    # REGULAR METHOD - needs instance
    def get_info(self):
        return f"{self.name} <{self.email}>"

    # CLASSMETHOD - needs class (alternative constructor)
    @classmethod
    def from_dict(cls, data):
        return cls(data['name'], data['email'])

    @classmethod
    def get_count(cls):
        return cls.users_count  # Access class variable

    # STATICMETHOD - utility, no self/cls needed
    @staticmethod
    def validate_email(email):
        return '@' in email  # Pure logic, no state

# Regular method: needs instance data
u = User("Alice", "a@ex.com")
print(u.get_info())  # Needs self.name, self.email

# Classmethod: alternative constructor
u2 = User.from_dict({'name': 'Bob', 'email': 'b@ex.com'})

# Staticmethod: pure utility
User.validate_email("test@ex.com")  # No state needed`, },
  { signature: 'super() vs Parent.method()', description: 'super(): follows MRO, works with multiple inheritance. Parent.method(self): direct call, skips MRO. Always prefer super().', complexity: 'Concept', section: 'Why & When', example: `# PREFER super() - follows MRO
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Follows MRO (correct)
        self.breed = breed

# AVOID Parent.method(self) - breaks multiple inheritance
class BadDog(Animal):
    def __init__(self, name, breed):
        Animal.__init__(self, name)  # Hard-coded parent (incorrect)
        self.breed = breed

# Why super() matters: multiple inheritance
class A:
    def method(self):
        print("A")

class B(A):
    def method(self):
        super().method()  # Follows MRO to next class
        print("B")

class C(A):
    def method(self):
        super().method()  # Follows MRO to next class
        print("C")

class D(B, C):
    def method(self):
        super().method()  # Calls all in MRO order
        print("D")

D().method()
# Output: A, C, B, D (MRO: D→B→C→A)
# If B used A.method(self), C would be skipped!`, },
  { signature: 'Multiple inheritance - rarely use it', description: 'Use multiple inheritance for: mix-ins (small, orthogonal features). Avoid for: complex hierarchies, diamond problem, unclear MRO. Prefer composition.', complexity: 'Concept', section: 'Why & When', example: `# GOOD - mix-ins for orthogonal features
class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{self.__class__.__name__}] {msg}")

class User(JsonMixin, LogMixin):
    def __init__(self, name):
        self.name = name

u = User("Alice")
u.log("Created")        # From LogMixin
print(u.to_json())      # From JsonMixin

# BAD - complex hierarchies (use composition!)
class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass  # Diamond problem
# Hard to reason about MRO

# BETTER - composition
class User:
    def __init__(self, name):
        self.name = name
        self.logger = Logger()     # Compose
        self.serializer = JsonSerializer()

    def log(self, msg):
        self.logger.log(msg)

# Rule: Mix-ins OK, inheritance trees → composition`, },
]

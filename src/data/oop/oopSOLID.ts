import type { Method } from '../../types'

// SOLID Principles
export const oopSOLIDMethods: Method[] = [
  { signature: 'S - Single Responsibility', description: 'A class should have only ONE reason to change. Each class handles one job. Split large classes into focused ones.', complexity: 'Principle', section: 'SOLID Principles', example: `# BAD: One class doing everything
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def save_to_db(self):  # Database logic
        pass

    def send_email(self):  # Email logic
        pass

    def generate_report(self):  # Report logic
        pass

# GOOD: Separate responsibilities
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class UserRepository:
    def save(self, user): pass
    def find(self, user_id): pass

class EmailService:
    def send(self, user, message): pass

class UserReportGenerator:
    def generate(self, user): pass` },
  { signature: 'O - Open/Closed Principle', description: 'Open for extension, closed for modification. Add new behavior without changing existing code. Use inheritance/composition.', complexity: 'Principle', section: 'SOLID Principles', example: `# BAD: Must modify class for new shapes
class AreaCalculator:
    def calculate(self, shape):
        if shape.type == "circle":
            return 3.14 * shape.radius ** 2
        elif shape.type == "rectangle":
            return shape.width * shape.height
        # Must add more elif for new shapes!

# GOOD: Extend without modification
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

# Add new shapes without modifying existing code!
class Triangle(Shape):
    def __init__(self, base, height):
        self.base = base
        self.height = height
    def area(self):
        return 0.5 * self.base * self.height` },
  { signature: 'L - Liskov Substitution', description: 'Subtypes must be substitutable for their base types. Child classes must honor parent class contracts.', complexity: 'Principle', section: 'SOLID Principles', example: `# BAD: Square breaks Rectangle contract
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def set_width(self, w):
        self.width = w

    def set_height(self, h):
        self.height = h

    def area(self):
        return self.width * self.height

class Square(Rectangle):  # VIOLATES LSP
    def set_width(self, w):
        self.width = self.height = w  # Breaks expectation!

    def set_height(self, h):
        self.width = self.height = h

# GOOD: Separate abstractions
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height

class Square(Shape):  # Not a Rectangle subclass
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2` },
  { signature: 'I - Interface Segregation', description: 'Clients should not depend on interfaces they do not use. Prefer many specific interfaces over one general-purpose interface.', complexity: 'Principle', section: 'SOLID Principles', example: `# BAD: Fat interface forces unused implementations
from abc import ABC, abstractmethod

class Worker(ABC):
    @abstractmethod
    def work(self): pass
    @abstractmethod
    def eat(self): pass
    @abstractmethod
    def sleep(self): pass

class Robot(Worker):
    def work(self):
        return "Working..."
    def eat(self):
        pass  # Robots don't eat! Forced to implement
    def sleep(self):
        pass  # Robots don't sleep!

# GOOD: Segregated interfaces
class Workable(ABC):
    @abstractmethod
    def work(self): pass

class Eatable(ABC):
    @abstractmethod
    def eat(self): pass

class Human(Workable, Eatable):
    def work(self):
        return "Working..."
    def eat(self):
        return "Eating..."

class Robot(Workable):  # Only implements what it needs
    def work(self):
        return "Working..."` },
  { signature: 'D - Dependency Inversion', description: 'High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces).', complexity: 'Principle', section: 'SOLID Principles', example: `# BAD: High-level depends on low-level
class MySQLDatabase:
    def save(self, data):
        print(f"Saving {data} to MySQL")

class UserService:
    def __init__(self):
        self.db = MySQLDatabase()  # Tight coupling!

    def save_user(self, user):
        self.db.save(user)

# GOOD: Depend on abstractions
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def save(self, data): pass

class MySQLDatabase(Database):
    def save(self, data):
        print(f"Saving {data} to MySQL")

class PostgresDatabase(Database):
    def save(self, data):
        print(f"Saving {data} to Postgres")

class UserService:
    def __init__(self, db: Database):  # Inject dependency
        self.db = db

    def save_user(self, user):
        self.db.save(user)

# Easy to swap implementations!
service = UserService(PostgresDatabase())` },
]

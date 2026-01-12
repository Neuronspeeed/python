import type { Method } from '../../../types'

export const namespaceInternalsMethods: Method[] = [
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
]

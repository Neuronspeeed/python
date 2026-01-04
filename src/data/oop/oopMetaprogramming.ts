import type { Method } from '../../types'

// Design Patterns + Managed Attributes + Metaclasses
export const oopMetaprogrammingMethods: Method[] = [
  // Design Patterns
  { signature: 'Singleton Pattern', description: 'Ensure only one instance exists. Use __new__ or module-level instance. Consider: do you really need this?', complexity: 'O(1)', section: 'Design Patterns', example: `class Singleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        self.value = None

s1 = Singleton()
s2 = Singleton()
print(s1 is s2)  # True - same instance

s1.value = 42
print(s2.value)  # 42

# Alternative: Just use a module!
# config.py becomes a singleton naturally` },
  { signature: 'Factory Pattern', description: 'Create objects without specifying exact class. Delegate instantiation to factory method or class.', complexity: 'O(1)', section: 'Design Patterns', example: `from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def speak(self): pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create(animal_type: str) -> Animal:
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        raise ValueError(f"Unknown: {animal_type}")

# Client code doesn't need to know concrete classes
animal = AnimalFactory.create("dog")
print(animal.speak())  # Woof!` },
  { signature: 'Delegation (__getattr__)', description: 'Wrapper intercepts attribute access and forwards to embedded object. Adds logic layer (tracing, validation).', complexity: 'O(1)', section: 'Design Patterns', example: `class Wrapper:
    def __init__(self, obj):
        self._wrapped = obj

    def __getattr__(self, name):
        print(f"Accessing: {name}")
        return getattr(self._wrapped, name)

# Wrap any object
wrapped_list = Wrapper([1, 2, 3])
wrapped_list.append(4)  # "Accessing: append"
print(wrapped_list._wrapped)  # [1, 2, 3, 4]

# Use cases: logging, lazy loading, proxies
# Wrapper looks like wrapped object to callers` },
  { signature: 'Mix-in classes', description: 'Small classes providing specific capability. Inherit to add orthogonal features without deep hierarchies.', complexity: 'Concept', section: 'Design Patterns', example: `class JsonMixin:
    def to_json(self):
        import json
        return json.dumps(self.__dict__)

class LogMixin:
    def log(self, msg):
        print(f"[{self.__class__.__name__}] {msg}")

# Mix-in adds capability orthogonally
class User(JsonMixin, LogMixin):
    def __init__(self, name):
        self.name = name

u = User("Alice")
print(u.to_json())  # '{"name": "Alice"}'
u.log("Created")    # [User] Created

# Mix-ins: small, focused, reusable` },
  { signature: 'Bound vs unbound methods', description: 'instance.method is bound (has self). Class.method is function—must pass instance manually.', complexity: 'Concept', section: 'Design Patterns', example: `class Demo:
    def greet(self):
        return f"Hi from {self}"

d = Demo()

# Bound method - self is packaged in
bound = d.greet
print(type(bound))  # <class 'method'>
print(bound())      # Works - self auto-passed

# Unbound (just a function in Python 3)
unbound = Demo.greet
print(type(unbound))  # <class 'function'>
# unbound()  # TypeError: missing self
print(unbound(d))  # Must pass instance

# Bound methods can be stored, passed around
callbacks = [d.greet]` },

  // Managed Attributes
  { signature: 'Descriptors (__get__, __set__)', description: 'Low-level mechanism behind properties. Class with __get__/__set__ assigned to class attribute intercepts access.', complexity: 'O(1)', section: 'Managed Attributes', example: `class Validator:
    """Descriptor that validates on assignment"""
    def __init__(self, min_val=0):
        self.min_val = min_val
        self.name = None

    def __set_name__(self, owner, name):
        self.name = name  # Called when assigned to class

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name, 0)

    def __set__(self, obj, value):
        if value < self.min_val:
            raise ValueError(f"{self.name} must be >= {self.min_val}")
        obj.__dict__[self.name] = value

class Account:
    balance = Validator(min_val=0)  # Descriptor instance

a = Account()
a.balance = 100   # Calls Validator.__set__
print(a.balance)  # Calls Validator.__get__
# a.balance = -50  # ValueError!` },
  { signature: '__getattribute__(self, name)', description: 'Runs for ALL attribute fetches. Avoid recursion—use object.__getattribute__(self, name).', complexity: 'O(1)', section: 'Managed Attributes', example: `class LoggedAccess:
    def __init__(self, value):
        self._value = value

    def __getattribute__(self, name):
        print(f"Accessing: {name}")
        # Must use object method to avoid recursion!
        return object.__getattribute__(self, name)

obj = LoggedAccess(42)
print(obj._value)
# Accessing: _value
# 42

# Common mistake - infinite recursion:
# def __getattribute__(self, name):
#     return self.__dict__[name]  # Calls __getattribute__ again!` },
  { signature: '__setattr__(self, name, value)', description: 'Runs for ALL attribute assignments. Avoid recursion—assign to self.__dict__ directly.', complexity: 'O(1)', section: 'Managed Attributes', example: `class ValidatedAttrs:
    def __setattr__(self, name, value):
        print(f"Setting {name} = {value}")
        # Must use __dict__ to avoid recursion!
        self.__dict__[name] = value

obj = ValidatedAttrs()
obj.x = 10  # Setting x = 10

# Validation example
class PositiveOnly:
    def __setattr__(self, name, value):
        if isinstance(value, (int, float)) and value < 0:
            raise ValueError(f"{name} must be positive")
        self.__dict__[name] = value

p = PositiveOnly()
p.count = 5   # OK
# p.count = -1  # ValueError!` },
  { signature: 'Built-in interception limitation', description: 'Built-ins bypass __getattr__/__getattribute__—look up dunder methods in class directly.', complexity: 'Concept', section: 'Managed Attributes', example: `class Wrapper:
    def __init__(self, obj):
        self._obj = obj

    def __getattr__(self, name):
        return getattr(self._obj, name)

w = Wrapper([1, 2, 3])
w.append(4)     # Works - __getattr__ called
print(w._obj)   # [1, 2, 3, 4]

# But built-ins bypass __getattr__!
# len(w)        # TypeError: no __len__
# str(w)        # Returns default, not list's __str__

# Fix: define the specific methods
class BetterWrapper:
    def __init__(self, obj):
        self._obj = obj
    def __len__(self):
        return len(self._obj)
    def __str__(self):
        return str(self._obj)` },

  // Metaclasses
  { signature: 'Metaclass basics', description: 'Classes are objects created by metaclasses. type is default. Override __new__ to intercept class creation.', complexity: 'O(1)', section: 'Metaclasses', example: `# type is the default metaclass
print(type(int))         # <class 'type'>
print(type(list))        # <class 'type'>

class MyClass:
    pass

print(type(MyClass))     # <class 'type'>
print(isinstance(MyClass, type))  # True

# Chain: instance → class → metaclass
obj = MyClass()
print(type(obj))         # <class 'MyClass'>
print(type(MyClass))     # <class 'type'>` },
  { signature: 'Custom metaclass', description: 'Subclass type, override __new__ to modify class dict before creation. Use metaclass= in class header.', complexity: 'O(1)', section: 'Metaclasses', example: `class AutoRepr(type):
    """Metaclass that auto-adds __repr__"""
    def __new__(meta, name, bases, dct):
        # Add __repr__ if not defined
        if '__repr__' not in dct:
            def auto_repr(self):
                attrs = ', '.join(f'{k}={v!r}'
                    for k, v in self.__dict__.items())
                return f'{name}({attrs})'
            dct['__repr__'] = auto_repr
        return type.__new__(meta, name, bases, dct)

class Person(metaclass=AutoRepr):
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)
print(p)  # Person(name='Alice', age=30)` },
  { signature: 'Metaclass registry', description: 'Track all subclasses automatically. Useful for plugin systems.', complexity: 'O(1)', section: 'Metaclasses', example: `class PluginMeta(type):
    registry = []

    def __new__(meta, name, bases, dct):
        cls = type.__new__(meta, name, bases, dct)
        if name != 'Plugin':  # Don't register base class
            meta.registry.append(cls)
        return cls

class Plugin(metaclass=PluginMeta):
    pass

class AudioPlugin(Plugin):
    pass

class VideoPlugin(Plugin):
    pass

print(PluginMeta.registry)
# [<class 'AudioPlugin'>, <class 'VideoPlugin'>]

# All subclasses auto-registered!` },
  { signature: 'Metaclass vs decorator', description: 'Decorators: after creation, not inherited. Metaclasses: during creation, inherited to subclasses.', complexity: 'Concept', section: 'Metaclasses', example: `# DECORATOR - not inherited
def add_method(cls):
    cls.greet = lambda self: "Hello!"
    return cls

@add_method
class Base: pass

class Child(Base): pass  # Inherits greet (as method)

# METACLASS - inherited to all subclasses
class MethodMeta(type):
    def __new__(meta, name, bases, dct):
        dct['greet'] = lambda self: f"Hello from {name}!"
        return type.__new__(meta, name, bases, dct)

class Base2(metaclass=MethodMeta): pass
class Child2(Base2): pass  # Also gets own greet!

print(Child2().greet())  # Hello from Child2!

# Use metaclass for framework-level control` },
]

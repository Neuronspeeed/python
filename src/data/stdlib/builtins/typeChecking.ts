import type { Method } from '../../../types'

export const builtinsTypeCheckingMethods: Method[] = [
  {
    signature: 'type(obj)',
    description: 'Return the exact type of an object. Use for debugging; prefer isinstance() for type checking in production code.',
    complexity: 'O(1)',
    section: 'Type Checking',
    example: `# Get exact type of object
type(42)           # <class 'int'>
type(3.14)         # <class 'float'>
type("hello")      # <class 'str'>
type([1, 2])       # <class 'list'>
type({1, 2})       # <class 'set'>
type({'a': 1})     # <class 'dict'>
type(None)         # <class 'NoneType'>
type(lambda x: x)  # <class 'function'>

# Compare types
type(42) == int           # True
type([1, 2]) == list      # True
type(True) == bool        # True
type(True) == int         # False (even though bool subclasses int)

# WHY isinstance() IS USUALLY BETTER:
class MyList(list):
    pass

ml = MyList([1, 2, 3])
type(ml) == list        # False! (it's MyList, not list)
isinstance(ml, list)    # True (MyList IS a list)

# WHEN TO USE type():
# - Debugging: "What exactly is this object?"
# - Exact type match required (rare)
# - Creating same type dynamically:
def double_container(container):
    return type(container)(x * 2 for x in container)

double_container([1, 2, 3])   # [2, 4, 6] - returns list
double_container((1, 2, 3))   # (2, 4, 6) - returns tuple`
  },

  {
    signature: 'isinstance(obj, classinfo)',
    description: 'Check if object is instance of class(es). Preferred over type() for type checking - respects inheritance.',
    complexity: 'O(1)',
    section: 'Type Checking',
    example: `# Basic type checking
isinstance(42, int)          # True
isinstance(3.14, float)      # True
isinstance("hi", str)        # True
isinstance([1, 2], list)     # True

# Check multiple types (tuple of types)
isinstance(42, (int, float))      # True
isinstance("hi", (int, str))      # True
isinstance([1], (list, tuple))    # True

# RESPECTS INHERITANCE (unlike type())
isinstance(True, int)        # True (bool subclasses int)
isinstance(True, bool)       # True

class Animal: pass
class Dog(Animal): pass

dog = Dog()
isinstance(dog, Dog)         # True
isinstance(dog, Animal)      # True (Dog IS an Animal)
type(dog) == Animal          # False (exact type is Dog)

# INTERVIEW PATTERN: Input validation
def sum_numbers(nums):
    if not isinstance(nums, (list, tuple)):
        raise TypeError("Expected list or tuple")
    if not all(isinstance(n, (int, float)) for n in nums):
        raise TypeError("All elements must be numbers")
    return sum(nums)

# PATTERN: Duck typing alternative
# Instead of checking type, check capability:
def process(data):
    if hasattr(data, '__iter__'):
        for item in data:
            # ...
            pass`
  },

  {
    signature: 'issubclass(cls, classinfo)',
    description: 'Check if class is subclass of another class(es). Works on classes, not instances.',
    complexity: 'O(1)',
    section: 'Type Checking',
    example: `# Check class inheritance
issubclass(bool, int)       # True (bool extends int)
issubclass(int, object)     # True (everything extends object)
issubclass(list, object)    # True

# Check against multiple classes
issubclass(bool, (int, str))    # True
issubclass(dict, (list, set))   # False

# A class is subclass of itself
issubclass(int, int)        # True
issubclass(list, list)      # True

# DIFFERENCE from isinstance():
# isinstance(obj, cls) - checks if OBJECT is instance of class
# issubclass(cls1, cls2) - checks if CLASS inherits from class

class Animal: pass
class Dog(Animal): pass

dog = Dog()
isinstance(dog, Animal)     # True - dog is Animal instance
issubclass(Dog, Animal)     # True - Dog class inherits Animal

# Common mistake:
# issubclass(dog, Animal)   # TypeError! dog is instance, not class

# USE CASE: Factory pattern
def create_animal(animal_class):
    if not issubclass(animal_class, Animal):
        raise TypeError("Must be an Animal subclass")
    return animal_class()`
  },
]

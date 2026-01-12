import type { Method } from '../../../types'

export const argsKwargsMethods: Method[] = [
  { section: '*args and **kwargs', signature: '*args', description: 'Captures variable positional arguments as a tuple.', complexity: 'O(n)', example: `def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3))     # 6
print(sum_all(1, 2, 3, 4, 5))  # 15

def greet(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet("Hello", "Alice", "Bob", "Charlie")` },
  { section: '*args and **kwargs', signature: '**kwargs', description: 'Captures variable keyword arguments as a dictionary.', complexity: 'O(n)', example: `def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="NYC")
# name: Alice
# age: 30
# city: NYC

def create_user(name, **attrs):
    return {"name": name, **attrs}

user = create_user("Bob", age=25, role="admin")
print(user)  # {'name': 'Bob', 'age': 25, 'role': 'admin'}` },
  { section: '*args and **kwargs', signature: '*args, **kwargs', description: 'Accept any combination of arguments. Common for wrappers/decorators.', complexity: 'O(n)', example: `def universal(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Kwargs: {kwargs}")

universal(1, 2, 3, a=4, b=5)
# Args: (1, 2, 3)
# Kwargs: {'a': 4, 'b': 5}

# Pass through to another function
def wrapper(func, *args, **kwargs):
    print("Before call")
    result = func(*args, **kwargs)
    print("After call")
    return result` },
]

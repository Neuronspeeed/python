import type { Method } from '../../../types'

export const functionDefinitionMethods: Method[] = [
  { section: 'Function Definition', signature: 'def func_name(params):', description: 'Defines a function with optional parameters. Functions are first-class objects.', complexity: 'O(1)', example: `def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # Hello, Alice!

# Function with multiple statements
def calculate(x, y):
    result = x + y
    return result` },
  { section: 'Function Definition', signature: 'func() vs func', description: 'Parentheses required to call. Without (), you reference the function object itself.', complexity: 'O(1)', example: `def greet():
    return "Hello!"

greet()   # "Hello!" - calls the function
greet     # <function greet> - the function object

# Common mistake
print(greet)   # <function greet...> (not called!)
print(greet()) # "Hello!" (called)

# Passing function as argument
funcs = [len, sum, max]
for f in funcs:
    print(f([1, 2, 3]))  # 3, 6, 3` },
  { section: 'Function Definition', signature: 'return value', description: 'Returns a value from function. Without return, function returns None.', complexity: 'O(1)', example: `def add(a, b):
    return a + b

def no_return():
    print("No return statement")

print(add(2, 3))      # 5
print(no_return())    # None` },
  { section: 'Function Definition', signature: 'return x, y, z', description: 'Returns multiple values as a tuple. Can be unpacked on assignment.', complexity: 'O(1)', example: `def get_stats(nums):
    return min(nums), max(nums), sum(nums)

low, high, total = get_stats([1, 2, 3, 4, 5])
print(low, high, total)  # 1 5 15

# Or receive as tuple
result = get_stats([1, 2, 3])
print(result)  # (1, 3, 6)` },
]

import type { Method } from '../../../types'

export const argumentUnpackingMethods: Method[] = [
  { section: 'Argument Unpacking', signature: 'func(*iterable)', description: 'Unpacks iterable as positional arguments when calling.', complexity: 'O(n)', example: `def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))  # 6

# Works with any iterable
print(add(*range(1, 4)))  # 6
print(add(*(1, 2, 3)))    # 6` },
  { section: 'Argument Unpacking', signature: 'func(**dict)', description: 'Unpacks dictionary as keyword arguments when calling.', complexity: 'O(n)', example: `def greet(name, greeting, punctuation):
    return f"{greeting}, {name}{punctuation}"

params = {"name": "Alice", "greeting": "Hello", "punctuation": "!"}
print(greet(**params))  # Hello, Alice!

# Combine both
args = [1, 2]
kwargs = {"c": 3, "d": 4}
def func(a, b, c, d):
    return a + b + c + d
print(func(*args, **kwargs))  # 10` },
]

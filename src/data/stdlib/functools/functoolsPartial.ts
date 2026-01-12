import type { Method } from '../../../types'

export const functoolsPartialMethods: Method[] = [
  { signature: 'partial()', description: 'Create new function with some arguments pre-filled. Useful for callbacks and currying.', complexity: 'O(1)', section: 'Partial', example: `from functools import partial

# Basic partial application
def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(5))    # 125

# Pre-fill first argument
def greet(greeting, name):
    return f"{greeting}, {name}!"

say_hello = partial(greet, "Hello")
say_goodbye = partial(greet, "Goodbye")

print(say_hello("Alice"))   # "Hello, Alice!"
print(say_goodbye("Bob"))   # "Goodbye, Bob!"

# Practical: Configure logging
import logging
def log_message(level, category, message):
    print(f"[{level}] {category}: {message}")

error_log = partial(log_message, "ERROR")
auth_error = partial(error_log, "AUTH")

auth_error("Invalid password")
# [ERROR] AUTH: Invalid password

# With sorted() key functions
data = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 25}]
get_field = lambda field, d: d[field]
by_age = partial(get_field, 'age')
sorted_data = sorted(data, key=lambda d: get_field('age', d))` },
]

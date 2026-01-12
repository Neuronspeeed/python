import type { Method } from '../../../types'

export const lambdaFunctionsMethods: Method[] = [
  { section: 'Lambda Functions', signature: 'lambda args: expr', description: 'Anonymous function for simple expressions. Returns result of expression.', complexity: 'O(1)', example: `square = lambda x: x ** 2
print(square(5))  # 25

add = lambda x, y: x + y
print(add(3, 4))  # 7

# With defaults
greet = lambda name, greeting="Hello": f"{greeting}, {name}!"
print(greet("Alice"))  # Hello, Alice!` },
  { section: 'Lambda Functions', signature: 'Lambda with sort/filter', description: 'Common use cases for lambda with built-in functions.', complexity: 'O(n log n)', example: `# Sort by custom key
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
sorted_pairs = sorted(pairs, key=lambda x: x[1])
print(sorted_pairs)  # [(1, 'one'), (3, 'three'), (2, 'two')]

# Filter
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)  # [2, 4, 6]

# Map
squares = list(map(lambda x: x**2, nums))
print(squares)  # [1, 4, 9, 16, 25, 36]` },
]

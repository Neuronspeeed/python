import type { Method } from '../../types'

export const conditionalsDictBranching: Method[] = [
  {
    section: 'Dictionary Branching',
    signature: 'dict[key] for branching',
    description: 'Use dict to map choices to values or functions. More flexible than long if/elif chains.',
    complexity: 'O(1)',
    example: `# Value mapping
day_names = {
    0: 'Monday', 1: 'Tuesday', 2: 'Wednesday',
    3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'
}
print(day_names[2])  # Wednesday

# With default via .get()
print(day_names.get(7, 'Invalid'))  # Invalid`,
  },
  {
    section: 'Dictionary Branching',
    signature: 'dict[key]() for dispatch',
    description: 'Map keys to functions for dynamic dispatch. Cleaner than if/elif with many branches.',
    complexity: 'O(1)',
    example: `def add(a, b): return a + b
def sub(a, b): return a - b
def mul(a, b): return a * b

ops = {'+': add, '-': sub, '*': mul}

op = '+'
result = ops[op](10, 5)  # 15

# With lambda
ops = {
    '+': lambda a, b: a + b,
    '-': lambda a, b: a - b,
}
print(ops['+'](3, 4))  # 7`,
  },
]

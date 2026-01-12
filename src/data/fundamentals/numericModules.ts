import type { Method } from '../../types'

export const numericModulesMethods: Method[] = [
  {
    section: 'Numeric Modules',
    signature: 'math Module',
    description: 'Standard math functions: sqrt, ceil, floor, log, sin, cos, pi, e, factorial, gcd.',
    complexity: 'Concept',
    example: `import math
math.sqrt(16)     # 4.0
math.ceil(3.2)    # 4
math.floor(3.8)   # 3
math.pi           # 3.141592653589793
math.factorial(5) # 120
math.gcd(12, 8)   # 4`,
  },
  {
    section: 'Numeric Modules',
    signature: 'random Module',
    description: 'Random numbers and selections: random(), randint(), choice(), shuffle(), sample().',
    complexity: 'Concept',
    example: `import random
random.random()        # 0.0 to 1.0
random.randint(1, 10)  # 1 to 10 inclusive
random.choice([1,2,3]) # pick one
random.shuffle(lst)    # shuffle in place
random.sample(lst, 2)  # pick 2 without replacement`,
  },
  {
    section: 'Numeric Modules',
    signature: 'statistics Module',
    description: 'Statistical functions: mean, median, mode, stdev, variance. For basic stats without NumPy.',
    complexity: 'Concept',
    example: `import statistics as stats
data = [1, 2, 2, 3, 4, 5]
stats.mean(data)    # 2.833...
stats.median(data)  # 2.5
stats.mode(data)    # 2
stats.stdev(data)   # 1.472...`,
  },
]

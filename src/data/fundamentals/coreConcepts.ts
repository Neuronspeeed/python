import type { Method } from '../../types'

export const coreConceptsMethods: Method[] = [
  {
    section: 'Core Concepts',
    signature: 'Dynamic Typing',
    description: 'Python tracks object types at runtime—no manual type declarations needed. Variables are just names bound to objects.',
    complexity: 'Concept',
    example: `x = 42        # x refers to an int
x = "hello"   # now x refers to a str
x = [1, 2, 3] # now x refers to a list
# The variable x has no fixed type`,
  },
  {
    section: 'Core Concepts',
    signature: 'Strong Typing',
    description: 'Operations only work on compatible types. Python won\'t silently convert types—you\'ll get a TypeError instead.',
    complexity: 'Concept',
    example: `"hello" + 5      # TypeError: can't concat str and int
"hello" + str(5) # OK: "hello5"
[1, 2] + (3, 4)  # TypeError: can only concat list to list
[1, 2] + [3, 4]  # OK: [1, 2, 3, 4]`,
  },
  {
    section: 'Core Concepts',
    signature: 'Polymorphism',
    description: 'Same operator, different behavior based on type. The + operator adds numbers but concatenates sequences.',
    complexity: 'Concept',
    example: `3 + 4           # 7 (addition)
"ab" + "cd"     # "abcd" (concatenation)
[1, 2] + [3]    # [1, 2, 3] (concatenation)

len("hello")    # 5 (string length)
len([1, 2, 3])  # 3 (list length)`,
  },
]

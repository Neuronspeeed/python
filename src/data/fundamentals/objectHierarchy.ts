import type { Method } from '../../types'

export const objectHierarchyMethods: Method[] = [
  {
    section: 'Object Hierarchy',
    signature: 'Programs → Modules',
    description: 'Programs are composed of modules (.py files). Each module is a namespace containing definitions.',
    complexity: 'Concept',
    example: `# my_module.py
def greet(name):
    return f"Hello, {name}"

# main.py
import my_module
print(my_module.greet("World"))`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Modules → Statements',
    description: 'Modules contain statements: assignments, function defs, class defs, control flow, imports.',
    complexity: 'Concept',
    example: `import math          # import statement
x = 10               # assignment statement
def square(n):       # function definition
    return n ** 2
if x > 5:            # control flow statement
    print("big")`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Statements → Expressions',
    description: 'Statements contain expressions. Expressions produce values and can be nested.',
    complexity: 'Concept',
    example: `# Expression examples
3 + 4 * 2            # arithmetic: 11
len("hello") > 3     # comparison: True
[x**2 for x in range(5)]  # list comp: [0,1,4,9,16]
lambda x: x + 1      # function object`,
  },
  {
    section: 'Object Hierarchy',
    signature: 'Expressions → Objects',
    description: 'Expressions create and process objects. Everything in Python is an object with identity, type, and value.',
    complexity: 'Concept',
    example: `x = [1, 2, 3]
id(x)      # identity: memory address
type(x)    # type: <class 'list'>
x          # value: [1, 2, 3]

# Even functions are objects
def foo(): pass
type(foo)  # <class 'function'>`,
  },
]

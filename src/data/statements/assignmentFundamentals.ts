import type { Method } from '../../types'

export const assignmentFundamentals: Method[] = [
  {
    section: 'Assignment Fundamentals',
    signature: 'target = object',
    description: 'Basic assignment creates a reference to an object. Variables are names bound to objects, not containers holding values.',
    complexity: 'Concept',
    example: `x = 42          # x refers to int object 42
y = x           # y refers to same object as x
x = "hello"     # x now refers to a new str object
print(y)        # 42 (y still refers to original int)`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Name Creation',
    description: 'Variable names are created when first assigned. No declaration needed—Python creates the name on first use.',
    complexity: 'Concept',
    example: `# No declaration needed
count = 0       # creates 'count' on first assignment
total = 100     # creates 'total'

# Using before assignment raises error
print(undefined_var)  # NameError: name not defined`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Required Initialization',
    description: 'A name must be assigned before use. Referencing an unassigned name raises NameError.',
    complexity: 'Concept',
    example: `# This fails
if False:
    x = 1
print(x)  # NameError: 'x' is not defined

# Must initialize before use
x = None  # or some default
if condition:
    x = computed_value`,
  },
  {
    section: 'Assignment Fundamentals',
    signature: 'Implicit Assignment',
    description: 'Assignment occurs in many contexts: imports, function/class defs, for loops, with statements, function arguments.',
    complexity: 'Concept',
    example: `import math           # assigns 'math' to module
def greet(): pass     # assigns 'greet' to function
class Dog: pass       # assigns 'Dog' to class
for i in range(3):    # assigns 'i' each iteration
    print(i)
with open("f") as f:  # assigns 'f' to file handle
    pass`,
  },
]

import type { Method } from '../../types'

export const conditionalsIfStatement: Method[] = [
  {
    section: 'if Statement',
    signature: 'if test: ... elif: ... else:',
    description: 'Primary selection tool. Evaluates tests top-to-bottom, executes first true block, then exits.',
    complexity: 'Concept',
    example: `x = 85
if x >= 90:
    grade = 'A'
elif x >= 80:
    grade = 'B'
elif x >= 70:
    grade = 'C'
else:
    grade = 'F'
print(grade)  # B`,
  },
  {
    section: 'if Statement',
    signature: 'if test:',
    description: 'Simple if without elif or else. Block executes only when test is true.',
    complexity: 'Concept',
    example: `x = 10
if x > 0:
    print("positive")  # prints

if x < 0:
    print("negative")  # skipped

# Multiple independent ifs (all checked)
if x > 5: print("big")      # prints
if x % 2 == 0: print("even") # prints`,
  },
  {
    section: 'if Statement',
    signature: 'Nested if',
    description: 'if statements can be nested for multi-layered logic. Indentation defines scope.',
    complexity: 'Concept',
    example: `age = 25
has_license = True

if age >= 18:
    if has_license:
        print("Can drive")
    else:
        print("Need license")
else:
    print("Too young")
# Output: Can drive`,
  },
]

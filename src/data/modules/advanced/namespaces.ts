import type { Method } from '../../../types'

export const namespacesMethods: Method[] = [
  {
    section: 'Namespaces',
    signature: 'Module as namespace',
    description: 'A module is a package of variable names. Top-level assignments become module attributes.',
    complexity: 'Concept',
    example: `# mymodule.py
x = 10              # becomes mymodule.x
def func(): pass    # becomes mymodule.func
class MyClass: pass # becomes mymodule.MyClass

# Only top-level names become attributes
# Names inside def/class are local to those

# other.py
import mymodule
print(mymodule.x)       # 10
mymodule.func()         # works
obj = mymodule.MyClass()`,
  },
  {
    section: 'Namespaces',
    signature: 'Encapsulation',
    description: 'Each module is a separate namespace. Same variable names in different modules don\'t conflict.',
    complexity: 'Concept',
    example: `# mod1.py
x = 10
def process(): return x * 2

# mod2.py
x = 99  # No conflict with mod1.x!
def process(): return x + 1

# main.py
import mod1
import mod2

print(mod1.x)  # 10
print(mod2.x)  # 99
# Qualification keeps them separate`,
  },
]

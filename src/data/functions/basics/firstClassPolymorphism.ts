import type { Method } from '../../../types'

export const firstClassPolymorphismMethods: Method[] = [
  { section: 'First-Class & Polymorphism', signature: 'First-class functions', description: 'Functions are objects—assign to variables, store in collections, pass as arguments.', complexity: 'Concept', example: `# Assign to variable
greet = lambda x: f"Hi, {x}"
say_hello = greet
print(say_hello("Bob"))  # Hi, Bob

# Store in dict (dispatch pattern)
ops = {'+': lambda a,b: a+b, '-': lambda a,b: a-b}
print(ops['+'](5, 3))  # 8

# Pass as argument
def apply(func, value):
    return func(value)
print(apply(len, "hello"))  # 5` },
  { section: 'First-Class & Polymorphism', signature: 'Polymorphism', description: 'Same function works on different types if they support required operations.', complexity: 'Concept', example: `def double(x):
    return x * 2

print(double(5))       # 10 (int)
print(double("hi"))    # "hihi" (str)
print(double([1, 2]))  # [1, 2, 1, 2] (list)

def total(container):
    return sum(container)

print(total([1, 2, 3]))    # 6 (list)
print(total((1, 2, 3)))    # 6 (tuple)
print(total({1, 2, 3}))    # 6 (set)` },
]

import type { Method } from '../types'

export const loopsMethods: Method[] = [
  // For Loop
  { section: 'For Loop', signature: 'for x in iterable:', description: 'Iterates over each element in an iterable (list, tuple, string, etc.).', complexity: 'O(n)', example: `for i in [1, 2, 3]:
    print(i)  # 1, 2, 3

for char in "hello":
    print(char)  # h, e, l, l, o

for key in {'a': 1, 'b': 2}:
    print(key)  # a, b` },
  { section: 'For Loop', signature: 'for i in range(n):', description: 'Iterates n times with i from 0 to n-1.', complexity: 'O(n)', example: `for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(2, 5):
    print(i)  # 2, 3, 4

for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1` },
  { section: 'For Loop', signature: 'for i, val in enumerate(iterable):', description: 'Iterates with both index and value.', complexity: 'O(n)', example: `fruits = ['apple', 'banana', 'cherry']
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: cherry

for i, fruit in enumerate(fruits, 1):  # Start at 1
    print(f"{i}: {fruit}")` },
  { section: 'For Loop', signature: 'for a, b in zip(iter1, iter2):', description: 'Iterates over multiple iterables in parallel.', complexity: 'O(n)', example: `names = ['Alice', 'Bob']
ages = [25, 30]
for name, age in zip(names, ages):
    print(f"{name} is {age}")
# Alice is 25
# Bob is 30

# Three iterables
for a, b, c in zip([1,2], [3,4], [5,6]):
    print(a, b, c)  # 1 3 5, then 2 4 6` },
  { section: 'For Loop', signature: 'for (a, b) in iterable:', description: 'Tuple unpacking in loop target. Automatically unpacks each item.', complexity: 'O(n)', example: `pairs = [(1, 'a'), (2, 'b'), (3, 'c')]
for num, letter in pairs:
    print(num, letter)
# 1 a, 2 b, 3 c

# Dict items
for key, value in {'x': 1, 'y': 2}.items():
    print(key, value)  # x 1, y 2` },
  { section: 'For Loop', signature: 'for first, *rest in iterable:', description: 'Extended unpacking with starred target. Collects remaining items into list.', complexity: 'O(n)', example: `data = [(1, 2, 3, 4), (5, 6, 7, 8)]
for first, *rest in data:
    print(first, rest)
# 1 [2, 3, 4]
# 5 [6, 7, 8]

for *head, last in [(1,2,3), (4,5,6)]:
    print(head, last)  # [1,2] 3, [4,5] 6` },
  { section: 'For Loop', signature: 'Nested for loops', description: 'For loops can nest to process multi-dimensional data or find combinations.', complexity: 'O(n*m)', example: `# Matrix traversal
matrix = [[1, 2], [3, 4], [5, 6]]
for row in matrix:
    for val in row:
        print(val, end=' ')  # 1 2 3 4 5 6

# Find common items
list1, list2 = [1, 2, 3], [2, 3, 4]
common = []
for x in list1:
    for y in list2:
        if x == y:
            common.append(x)  # [2, 3]` },

  // While Loop
  { section: 'While Loop', signature: 'while condition:', description: 'Repeats while condition is True. Check happens before each iteration.', complexity: 'O(varies)', example: `count = 0
while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4

# Infinite loop (use with break)
while True:
    user_input = input("Enter 'q' to quit: ")
    if user_input == 'q':
        break` },
  { section: 'While Loop', signature: 'while condition: ... else:', description: 'else block runs if loop completes without break.', complexity: 'O(n)', example: `count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Done!")  # Prints "Done!"

# With break - else doesn't run
count = 0
while count < 10:
    if count == 5:
        break
    count += 1
else:
    print("Never printed")` },
  { section: 'While Loop', signature: 'while True: (do-until)', description: 'Simulate "do until" by placing break at end of loop body. Guarantees at least one execution.', complexity: 'O(n)', example: `# "Do until" pattern: always runs at least once
while True:
    num = int(input("Enter positive: "))
    if num > 0:  # exit condition at END
        break
    print("Try again")  # only if condition fails` },

  // Loop Control
  { section: 'Loop Control', signature: 'break', description: 'Immediately exits the innermost loop.', complexity: 'O(1)', example: `for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# Nested loops - only breaks inner
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(i, j)  # (0,0), (1,0), (2,0)` },
  { section: 'Loop Control', signature: 'continue', description: 'Skips rest of current iteration and continues with next.', complexity: 'O(1)', example: `for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4 (skips 2)

# Skip even numbers
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 1, 3, 5, 7, 9` },
  { section: 'Loop Control', signature: 'for ... else:', description: 'else block runs if loop completes without break. Useful for search patterns.', complexity: 'O(n)', example: `# Search pattern
numbers = [1, 3, 5, 7, 9]
target = 4
for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found")  # Prints "Not found"

# Prime check
def is_prime(n):
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    else:
        return n > 1` },
  { section: 'Loop Control', signature: 'pass', description: 'Does nothing. Placeholder for empty blocks.', complexity: 'O(1)', example: `for i in range(5):
    pass  # TODO: implement later

while True:
    pass  # Infinite loop that does nothing

# Empty function body
def not_implemented():
    pass` },

  // List Comprehension
  { section: 'List Comprehension', signature: '[expr for x in iterable]', description: 'Creates a list by applying expression to each item.', complexity: 'O(n)', example: `squares = [x**2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

doubled = [x * 2 for x in [1, 2, 3]]
print(doubled)  # [2, 4, 6]

upper = [s.upper() for s in ['a', 'b', 'c']]
print(upper)  # ['A', 'B', 'C']` },
  { section: 'List Comprehension', signature: '[expr for x in iterable if condition]', description: 'List comprehension with filter condition.', complexity: 'O(n)', example: `evens = [x for x in range(10) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8]

# Only positive
positives = [x for x in [-2, -1, 0, 1, 2] if x > 0]
print(positives)  # [1, 2]

# Filter and transform
words = ['hello', '', 'world', '']
non_empty = [w.upper() for w in words if w]
print(non_empty)  # ['HELLO', 'WORLD']` },
  { section: 'List Comprehension', signature: '[expr if cond else other for x in iter]', description: 'Conditional expression (ternary) in comprehension.', complexity: 'O(n)', example: `# Replace negatives with 0
nums = [-2, -1, 0, 1, 2]
result = [x if x > 0 else 0 for x in nums]
print(result)  # [0, 0, 0, 1, 2]

# Label values
labels = ['even' if x % 2 == 0 else 'odd' for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']` },
  { section: 'List Comprehension', signature: 'Nested comprehension', description: 'Multiple for clauses in a single comprehension.', complexity: 'O(n*m)', example: `# Flatten nested list
nested = [[1, 2], [3, 4], [5]]
flat = [x for sublist in nested for x in sublist]
print(flat)  # [1, 2, 3, 4, 5]

# All combinations
pairs = [(x, y) for x in [1, 2] for y in ['a', 'b']]
print(pairs)  # [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]

# Matrix creation
matrix = [[i*3+j for j in range(3)] for i in range(3)]
print(matrix)  # [[0,1,2], [3,4,5], [6,7,8]]` },

  // Dict Comprehension
  { section: 'Dict & Set Comprehension', signature: '{k: v for ...}', description: 'Creates a dictionary from key-value expression.', complexity: 'O(n)', example: `squares = {x: x**2 for x in range(5)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# From two lists
keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = {k: v for k, v in zip(keys, values)}
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# With condition
d = {x: x**2 for x in range(10) if x % 2 == 0}
print(d)  # {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}` },
  { section: 'Dict & Set Comprehension', signature: 'Invert dict', description: 'Swap keys and values using comprehension.', complexity: 'O(n)', example: `original = {'a': 1, 'b': 2, 'c': 3}
inverted = {v: k for k, v in original.items()}
print(inverted)  # {1: 'a', 2: 'b', 3: 'c'}` },

  // Set Comprehension
  { section: 'Dict & Set Comprehension', signature: '{expr for x in iterable}', description: 'Creates a set from expression. Duplicates automatically removed.', complexity: 'O(n)', example: `squares = {x**2 for x in range(-3, 4)}
print(squares)  # {0, 1, 4, 9}

# Unique first letters
words = ['apple', 'banana', 'apricot', 'blueberry']
first_letters = {w[0] for w in words}
print(first_letters)  # {'a', 'b'}` },

  // Generator Expression
  { section: 'Generator Expression', signature: '(expr for x in iterable)', description: 'Creates a generator. Memory efficient - yields items one at a time.', complexity: 'O(1) creation', example: `gen = (x**2 for x in range(5))
print(gen)       # <generator object ...>
print(list(gen)) # [0, 1, 4, 9, 16]

# Memory efficient for large data
sum_squares = sum(x**2 for x in range(1000000))

# Can only iterate once!
gen = (x for x in [1, 2, 3])
print(list(gen))  # [1, 2, 3]
print(list(gen))  # [] (exhausted)` },

  // Iteration Tools
  { section: 'Iteration Tools', signature: 'reversed(sequence)', description: 'Returns reverse iterator. Sequence must support len and indexing.', complexity: 'O(1)', example: `for i in reversed([1, 2, 3]):
    print(i)  # 3, 2, 1

for char in reversed("hello"):
    print(char)  # o, l, l, e, h

# Convert to list
print(list(reversed([1, 2, 3])))  # [3, 2, 1]` },
  { section: 'Iteration Tools', signature: 'sorted(iterable)', description: 'Returns new sorted list from iterable.', complexity: 'O(n log n)', example: `for x in sorted([3, 1, 4, 1, 5]):
    print(x)  # 1, 1, 3, 4, 5

# Reverse order
for x in sorted([3, 1, 4], reverse=True):
    print(x)  # 4, 3, 1

# Custom key
words = ['banana', 'pie', 'Washington']
for w in sorted(words, key=len):
    print(w)  # pie, banana, Washington` },
  { section: 'Iteration Tools', signature: 'map(func, iterable)', description: 'Applies function to each element. Returns iterator.', complexity: 'O(1)', example: `for x in map(str.upper, ['a', 'b', 'c']):
    print(x)  # A, B, C

# Multiple iterables
for x in map(lambda a, b: a + b, [1, 2], [3, 4]):
    print(x)  # 4, 6` },
  { section: 'Iteration Tools', signature: 'filter(func, iterable)', description: 'Yields elements where func returns True.', complexity: 'O(1)', example: `for x in filter(lambda x: x > 0, [-2, -1, 0, 1, 2]):
    print(x)  # 1, 2

# None removes falsy values
for x in filter(None, [0, 1, '', 'hi', [], [1]]):
    print(x)  # 1, 'hi', [1]` },

  // itertools (commonly used)
  { section: 'itertools', signature: 'itertools.chain(*iterables)', description: 'Chains multiple iterables into one.', complexity: 'O(1)', example: `from itertools import chain

for x in chain([1, 2], [3, 4], [5]):
    print(x)  # 1, 2, 3, 4, 5

# Flatten
nested = [[1, 2], [3, 4]]
flat = list(chain.from_iterable(nested))
print(flat)  # [1, 2, 3, 4]` },
  { section: 'itertools', signature: 'itertools.product(*iterables)', description: 'Cartesian product of iterables.', complexity: 'O(n*m)', example: `from itertools import product

for x, y in product([1, 2], ['a', 'b']):
    print(x, y)
# 1 a, 1 b, 2 a, 2 b

# Repeat parameter
for x, y in product([0, 1], repeat=2):
    print(x, y)  # 0 0, 0 1, 1 0, 1 1` },
  { section: 'itertools', signature: 'itertools.combinations(iter, r)', description: 'All r-length combinations without repetition.', complexity: 'O(n^r)', example: `from itertools import combinations

for combo in combinations([1, 2, 3], 2):
    print(combo)
# (1, 2), (1, 3), (2, 3)

# Choose 3 from 4
for combo in combinations('ABCD', 3):
    print(combo)
# ('A','B','C'), ('A','B','D'), ('A','C','D'), ('B','C','D')` },
  { section: 'itertools', signature: 'itertools.permutations(iter, r)', description: 'All r-length permutations (order matters).', complexity: 'O(n!)', example: `from itertools import permutations

for perm in permutations([1, 2, 3], 2):
    print(perm)
# (1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)

# All permutations
for perm in permutations('ABC'):
    print(''.join(perm))
# ABC, ACB, BAC, BCA, CAB, CBA` },
  { section: 'itertools', signature: 'itertools.groupby(iter, key)', description: 'Groups consecutive elements by key function.', complexity: 'O(n)', example: `from itertools import groupby

data = [('a', 1), ('a', 2), ('b', 3), ('b', 4)]
for key, group in groupby(data, lambda x: x[0]):
    print(key, list(group))
# a [('a', 1), ('a', 2)]
# b [('b', 3), ('b', 4)]

# Must be sorted first for non-consecutive groups!
data = sorted(data, key=lambda x: x[0])` },

  // Common Patterns
  { section: 'Common Patterns', signature: 'Loop with index', description: 'Different ways to access index while iterating.', complexity: 'O(n)', example: `# Best: enumerate
for i, val in enumerate(['a', 'b', 'c']):
    print(i, val)

# Avoid: range(len())
lst = ['a', 'b', 'c']
for i in range(len(lst)):  # Not Pythonic
    print(i, lst[i])` },
  { section: 'Common Patterns', signature: 'Early termination', description: 'Use any/all with generator for efficient short-circuit evaluation.', complexity: 'O(n) worst', example: `# Stop at first match
numbers = range(1000000)
has_negative = any(x < 0 for x in numbers)  # False, checks all

# Check all meet condition
all_positive = all(x > 0 for x in [1, 2, 3])  # True
all_positive = all(x > 0 for x in [1, -2, 3]) # False (stops at -2)` },
  { section: 'Common Patterns', signature: 'Walrus operator (:=)', description: 'Assignment expression. Assigns and returns value. (Python 3.8+)', complexity: 'O(1)', example: `# Read until empty line
while (line := input()) != "":
    print(f"You said: {line}")

# Filter and use value
if (n := len(data)) > 10:
    print(f"List has {n} items")

# In comprehension
results = [y for x in data if (y := process(x)) is not None]` },
]

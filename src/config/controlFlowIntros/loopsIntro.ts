export const loopsIntro = `For Loops: Python's Preferred Iteration
For loops are Python's primary iteration construct—safer, simpler, and more Pythonic than while. For works with ANY iterable: lists, strings, dicts, files, generators. The key insight: NEVER use \`range(len())\` pattern—use \`enumerate()\` for index+value. Use for by default, while only when iterations unknown (user input, two-pointer algorithms, convergence).

\`\`\`python
# ANTI-PATTERN: C-style iteration (NEVER!)
i = 0
while i < len(arr):
    process(arr[i])
    i += 1

# PYTHONIC: For loop
for item in arr:
    process(item)

# NEED INDEX? Use enumerate(), NOT range(len())
# WRONG:
for i in range(len(arr)):
    print(f"{i}: {arr[i]}")

# RIGHT:
for i, item in enumerate(arr):
    print(f"{i}: {item}")

# ITERATE DICT
for key in mydict:  # Keys by default
    print(key)

for key, value in mydict.items():  # Key-value pairs
    print(f"{key}: {value}")

# ITERATE MULTIPLE SEQUENCES
names = ["Alice", "Bob"]
ages = [25, 30]

for name, age in zip(names, ages):
    print(f"{name} is {age}")

# REVERSE ITERATION
for item in reversed(mylist):
    print(item)

# SORTED ITERATION (doesn't modify original)
for item in sorted(mylist):
    print(item)
\`\`\`
---
While Loops and Loop Control
While loops iterate until condition becomes false—use when iteration count unknown. Break exits loop immediately. Continue skips to next iteration. Else clause runs if loop completes without break (rare but useful for search patterns). Avoid infinite loops—ensure condition eventually becomes false.

\`\`\`python
# WHILE for unknown iterations
while True:
    user_input = input("Enter command (quit to exit): ")
    if user_input == "quit":
        break
    process(user_input)

# TWO-POINTER algorithm (while is appropriate)
left, right = 0, len(arr) - 1
while left < right:
    if arr[left] + arr[right] == target:
        return [left, right]
    elif arr[left] + arr[right] < target:
        left += 1
    else:
        right -= 1

# BREAK - Exit loop early
for item in items:
    if item.is_target():
        found = item
        break  # Stop searching
else:
    # Runs only if loop completes WITHOUT break
    found = None

# CONTINUE - Skip to next iteration
for item in items:
    if not item.is_valid():
        continue  # Skip invalid items
    process(item)

# LOOP-ELSE pattern for search
for user in users:
    if user.name == search_name:
        print(f"Found: {user}")
        break
else:
    print(f"{search_name} not found")

# CONVERGENCE with while
x = initial_value
while abs(x - prev_x) > tolerance:
    prev_x = x
    x = improve(x)  # Binary search, Newton's method, etc.
\`\`\`
---
Iterator Protocol and Lazy Evaluation
Python's iteration protocol: objects with \`__iter__\` (returns iterator) and \`__next__\` (returns next item or raises StopIteration). Generators are lazy iterators—compute values on demand, not all at once. Use generators for large datasets or infinite sequences. Range is lazy in Python 3, lists are eager. Lazy = memory efficient.

\`\`\`python
# ITERATOR PROTOCOL
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # Self is iterator

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

for n in Countdown(5):
    print(n)  # 5, 4, 3, 2, 1

# GENERATOR - Lazy evaluation with yield
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a  # Pause and return value
        a, b = b, a + b

# Only computes when requested
for num in fibonacci(10):
    print(num)  # 0, 1, 1, 2, 3, 5, 8...

# EAGER (all at once) - Uses memory for all items
eager_list = [x**2 for x in range(1000000)]  # 1M items in memory

# LAZY (on demand) - One item at a time
lazy_gen = (x**2 for x in range(1000000))  # Generator expression
for item in lazy_gen:
    if item > 100:
        break  # Only computed ~10 items, not 1M!

# RANGE is LAZY in Python 3
for i in range(10**9):  # Doesn't create billion ints!
    if i > 10:
        break

# INFINITE ITERATORS
def infinite_counter():
    n = 0
    while True:
        yield n
        n += 1

counter = infinite_counter()
print(next(counter))  # 0
print(next(counter))  # 1
# Can run forever if you keep calling next()

# FILE ITERATION - Memory efficient
with open("huge_file.txt") as f:
    for line in f:  # Reads one line at a time
        process(line)  # Not loading entire file into memory!
\`\`\``

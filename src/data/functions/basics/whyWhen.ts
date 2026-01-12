import type { Method } from '../../../types'

export const whyWhenMethods: Method[] = [
  { section: 'Why & When', signature: 'When to use functions', description: 'Use functions for code reuse, abstraction, and organization. Rule of thumb: if you copy-paste code, make it a function.', complexity: 'Concept', example: `# WITHOUT FUNCTIONS - repetitive
print(f"Welcome, {user1}!")
print(f"Your score: {score1}")
print("=" * 30)

print(f"Welcome, {user2}!")
print(f"Your score: {score2}")
print("=" * 30)  # Repeated 3 times!

# WITH FUNCTION - reusable
def display_user(name, score):
    print(f"Welcome, {name}!")
    print(f"Your score: {score}")
    print("=" * 30)

display_user(user1, score1)
display_user(user2, score2)  # DRY - Don't Repeat Yourself

# WHEN TO USE FUNCTIONS:
# - Code used 2+ times
# - Clear, testable unit of work
# - Complex logic needing a name
# - Breaking down large blocks (<20 lines per function)` },
  { section: 'Why & When', signature: 'Functions vs classes', description: 'Functions for stateless operations. Classes for objects with state + multiple methods. Start simple with functions.', complexity: 'Concept', example: `# USE FUNCTION when stateless
def calculate_area(radius):
    return 3.14159 * radius ** 2

area = calculate_area(5)  # Simple, no state needed

# USE CLASS when you need state
class Circle:
    def __init__(self, radius):
        self.radius = radius  # State!

    def area(self):
        return 3.14159 * self.radius ** 2

    def circumference(self):
        return 2 * 3.14159 * self.radius

c = Circle(5)
print(c.area())          # Uses self.radius (state)
print(c.circumference()) # Multiple related methods

# GUIDELINES:
# Functions: stateless transform, single operation
# Classes: maintain state, multiple related operations
# Start with functions, refactor to class if needed` },
  { section: 'Why & When', signature: 'def vs lambda', description: 'def for multi-line logic and readability. lambda for simple inline expressions (sort keys, callbacks).', complexity: 'Concept', example: `# LAMBDA - simple inline expression
square = lambda x: x ** 2
nums = [1, 2, 3]
squared = list(map(lambda x: x ** 2, nums))

# USE LAMBDA when:
# - Single expression
# - Used once inline (sort key, filter)
# - Callback for higher-order function

students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
by_grade = sorted(students, key=lambda s: s[1])

# USE DEF when:
# - Multiple statements
# - Needs name/documentation
# - Used multiple times
# - Complex logic

def validate_and_process(data):
    """Process data with validation"""  # Docstring!
    if not data:  # Multiple statements
        return None
    return data.strip().upper()

# READABILITY: def is clearer for anything complex
# BAD: lambda x: x.strip().upper() if x else None
# GOOD: def clean(x): ...` },
  { section: 'Why & When', signature: 'Recursion vs iteration', description: 'Recursion for tree/graph structures. Iteration for simple loops. Python has recursion limit (~1000).', complexity: 'Concept', example: `# ITERATION - simple, efficient
def factorial_iter(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# RECURSION - elegant for trees/graphs
def factorial_rec(n):
    if n <= 1:
        return 1
    return n * factorial_rec(n - 1)

# RECURSION LIMIT
import sys
print(sys.getrecursionlimit())  # ~1000

# WHEN TO USE RECURSION:
# - Tree/graph traversal (natural fit)
# - Divide and conquer (merge sort, quicksort)
# - Backtracking problems
# - With @lru_cache for memoization

# WHEN TO USE ITERATION:
# - Simple loops (counters, lists)
# - Deep nesting (> 1000 levels)
# - Performance critical (recursion has call overhead)
# - Tail recursion (Python doesn't optimize it!)

# BEST: Use iteration by default, recursion when it makes code clearer` },
  { section: 'Why & When', signature: 'Function call overhead', description: 'Functions have call overhead (~100ns). Negligible for most code. Only inline for tight inner loops.', complexity: 'Concept', example: `# FUNCTION CALL OVERHEAD
def add(a, b):
    return a + b

# Each call costs ~100 nanoseconds (overhead)
# For 1 million calls: ~0.1 seconds total

# WHEN IT MATTERS:
# Tight inner loop called millions of times
total = 0
for i in range(10_000_000):
    total += add(i, 1)  # 10M calls - overhead noticeable

# WHEN TO INLINE (rare!):
total = 0
for i in range(10_000_000):
    total += i + 1  # No function call

# WHEN IT DOESN'T MATTER (99% of code):
# - I/O operations (network, disk)
# - Complex logic (business rules)
# - User interactions
# - Most application code

# RULE: Write readable functions first
# Profile before optimizing
# Only inline if profiling shows bottleneck` },
]

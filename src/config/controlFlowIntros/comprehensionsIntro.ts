export const comprehensionsIntro = `List vs Generator: The Memory Trade-Off
List comprehensions \`[x for x in data]\` build ENTIRE result in memory—fast for small data (<100K) or multiple iterations. Generator expressions \`(x for x in data)\` yield ONE item at a time—O(1) memory, perfect for 100K+ items or one-time use. CRITICAL: Generators exhaust after one pass—\`list(gen)\` works ONCE, then empty forever.

\`\`\`python
# LIST: Eager evaluation
squares_list = [x**2 for x in range(1000000)]  # ~8MB memory
len(squares_list)  # Works
len(squares_list)  # Works again (persists)

# GENERATOR: Lazy evaluation
squares_gen = (x**2 for x in range(1000000))  # ~100 bytes memory!
sum(squares_gen)   # Works: consumes generator
sum(squares_gen)   # -> 0 GOTCHA! Exhausted!

# FIX: Convert to list for multiple passes
squares_gen = (x**2 for x in range(1000000))
squares_list = list(squares_gen)
sum(squares_list)  # Works multiple times

# WHEN TO USE LIST []
# - Small data (<100K items)
# - Need multiple iterations
# - Need len(), indexing, slicing
# - Debugging (can inspect)

# WHEN TO USE GENERATOR ()
# - Large data (100K+ items)
# - One-time iteration
# - Memory constrained
# - Pipeline chaining: sum(x**2 for x in filter(pred, data))

# GOOD: Generator for large one-time sum
total = sum(x**2 for x in range(10000000))  # O(1) memory

# BAD: List for huge one-time use
total = sum([x**2 for x in range(10000000)])  # Wastes ~80MB
\`\`\`
---
Comprehension Syntax and Common Patterns
Python has 4 comprehension types: list \`[]\`, set \`{}\`, dict \`{k:v}\`, generator \`()\`. Structure: \`[EXPR for VAR in ITERABLE if CONDITION]\`. Filter with \`if\`, nest for Cartesian products, use walrus \`:=\` to cache expensive calls. Comprehensions are 20-30% faster than loops for simple transforms.

\`\`\`python
# FOUR TYPES
squares = [x**2 for x in range(10)]  # List
unique = {x**2 for x in [-2, -1, 0, 1, 2]}  # Set (no duplicates)
mapping = {x: x**2 for x in range(5)}  # Dict
lazy = (x**2 for x in range(10))  # Generator

# NO TUPLE COMPREHENSION! Use tuple()
tup = tuple(x for x in range(5))  # -> (0, 1, 2, 3, 4)

# FILTERING: if clause
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# MULTIPLE IFS (AND logic)
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# -> [0, 6, 12, 18]  (divisible by 2 AND 3)

# WALRUS := to cache expensive calls (3.8+)
filtered = [y for x in data if (y := expensive(x)) > 0]
# Calls expensive() ONCE per item, uses result y

# NESTED: Cartesian product (reads left-to-right)
pairs = [(x, y) for x in [1, 2, 3] for y in ['a', 'b']]
# -> [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b'), (3, 'a'), (3, 'b')]
# EQUIVALENT LOOP:
# for x in [1, 2, 3]:  # Left = outer
#     for y in ['a', 'b']:  # Right = inner

# FLATTEN nested lists
nested = [[1, 2], [3, 4], [5]]
flat = [item for sublist in nested for item in sublist]
# -> [1, 2, 3, 4, 5]

# TERNARY in output (simple only!)
result = ["even" if x % 2 == 0 else "odd" for x in range(5)]

# DICT FROM TWO LISTS
keys = ['a', 'b', 'c']
values = [1, 2, 3]
mapping = {k: v for k, v in zip(keys, values)}

# TRANSPOSE matrix
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = list(zip(*matrix))  # -> [(1, 4), (2, 5), (3, 6)]
\`\`\`
---
When NOT to Use Comprehensions
Use regular loops for: complex logic (if/elif/else, try/except), side effects (print, logging), triple+ nesting, exception handling. Rule: if >3 clauses or doesn't fit one readable line, use a loop. Comprehensions for simple map/filter only—readability always wins.

\`\`\`python
# DON'T: Complex ternary (unreadable!)
result = [x if x > 0 else -x if x < 0 else 0 for x in data]

# DO: Regular loop
result = []
for x in data:
    if x > 0:
        result.append(x)
    elif x < 0:
        result.append(-x)
    else:
        result.append(0)

# DON'T: Side effects
[print(x) for x in data]  # Creates useless list of None!

# DO: Regular loop
for x in data:
    print(x)

# DON'T: Exception handling
# result = [int(x) for x in data]  # Crashes on non-numeric!

# DO: Regular loop with try/except
result = []
for x in data:
    try:
        result.append(int(x))
    except ValueError:
        pass  # Skip invalid

# DON'T: Triple nesting
result = [[[x*y*z for z in C] for y in B] for x in A]  # Unreadable!

# DO: Regular loops (clearer)
result = []
for x in A:
    row = []
    for y in B:
        col = [x*y*z for z in C]
        row.append(col)
    result.append(row)

# GOTCHA: Generator exhaustion
gen = (x for x in range(5))
list(gen)  # [0, 1, 2, 3, 4]
list(gen)  # [] EMPTY! Generator exhausted!

# GOTCHA: Nested loop order (left-to-right!)
[(x, y) for x in A for y in B]
# SAME AS:
# for x in A:     # Left part = outer
#     for y in B: # Right part = inner

# BEST PRACTICES
# - Use for simple map/filter operations
# - Use generators for 100K+ items
# - Keep to 1-2 nesting levels max
# - Prefer comprehensions over map/filter
# - NEVER use for side effects
# - NEVER nest 3+ levels
# - NEVER use if/elif/else or try/except
\`\`\``

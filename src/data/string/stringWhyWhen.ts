import type { Method } from '../../types'

export const stringWhyWhen: Method[] = [
  { section: 'Why & When', signature: 'Why use Strings?', description: 'Strings store text data. They are IMMUTABLE - every operation creates a new string. Use for text processing, user input, file paths, API responses.', complexity: 'Concept', example: `# Strings are IMMUTABLE sequences of characters
name = "Alice"
name[0] = "B"  # ERROR! Can't modify

# Every method returns a NEW string
upper = name.upper()  # Creates new string
print(name)   # Still "Alice"
print(upper)  # "ALICE"

# Use strings for:
# - Text data (names, messages, content)
# - File paths and URLs
# - Configuration values
# - API request/response data` },
  { section: 'Why & When', signature: 'String vs other types', description: 'String vs bytes: text vs binary. String vs list: immutable vs mutable. Use f-strings for formatting, join() for building.', complexity: 'Concept', example: `# STRING vs BYTES
text = "hello"      # str - Unicode text
data = b"hello"     # bytes - raw binary

# STRING vs LIST of chars
s = "hello"         # Immutable, less memory
lst = list("hello") # Mutable, can modify

# BUILDING STRINGS
# BAD - O(n²) due to immutability
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time!

# GOOD - O(n) using join
parts = [str(i) for i in range(1000)]
result = "".join(parts)

# FORMATTING - use f-strings (Python 3.6+)
name, age = "Alice", 30
print(f"{name} is {age}")  # Best way!` },
  { section: 'Why & When', signature: 'Performance tips', description: 'join() is O(n), += in loop is O(n²). Use in operator for substring check. f-strings are fastest for formatting.', complexity: 'O(varies)', example: `# FAST operations
s[0]           # O(1) - index access
len(s)         # O(1) - length stored
"x" in s       # O(n) - but optimized

# SLOW operations
s1 + s2        # O(n) - creates new string
s += "x"       # O(n) each time!

# String building comparison:
# "+=" in loop:  O(n²) - DON'T DO THIS
# "".join(lst):  O(n)  - USE THIS

# Formatting speed (fastest to slowest):
f"{x}"         # f-string (fastest)
"%s" % x       # %-formatting
"{}".format(x) # .format()` },
]

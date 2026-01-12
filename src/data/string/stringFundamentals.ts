import type { Method } from '../../types'

export const stringFundamentals: Method[] = [
  { section: 'Fundamentals', signature: 'String Literals', description: 'Strings are sequences of characters. Create with single or double quotes. Use triple quotes for multiline strings.', complexity: 'Concept', example: `# Single or double quotes
string1 = 'Hello, world'
string2 = "1234"

# Mix quotes to include quotes
string3 = "We're #1!"
string4 = 'I said, "Put it over by the llama."'

# Triple quotes for multiline (preserves whitespace)
paragraph = """This is
a multiline
string."""

# Backslash for long lines (no whitespace preserved)
long = "This is a very long \\
string on multiple lines"` },
  { section: 'Fundamentals', signature: 'len(string)', description: 'Returns the number of characters in a string, including spaces.', complexity: 'O(1)', example: `# Length of strings
print(len("abc"))          # 3
print(len("Don't Panic"))  # 11
print(len(""))             # 0

# Use with variables
letters = "abc"
num_letters = len(letters)
print(num_letters)         # 3` },
  { section: 'Fundamentals', signature: 'String Indexing', description: 'Access individual characters by position. Indices start at 0. Negative indices count from the end (-1 is last).', complexity: 'O(1)', example: `flavor = "apple pie"

# Positive indices (0-based)
print(flavor[0])   # 'a' - first character
print(flavor[1])   # 'p'
print(flavor[6])   # 'p'

# Negative indices (from end)
print(flavor[-1])  # 'e' - last character
print(flavor[-2])  # 'i'
print(flavor[-9])  # 'a' - first character

# IndexError if out of bounds
# flavor[9]   # IndexError!
# flavor[-10] # IndexError!` },
  { section: 'Fundamentals', signature: 'String Slicing [start:end:step]', description: 'Extract substring using [start:end]. Start is inclusive, end is exclusive. Omit values to slice from start/to end.', complexity: 'O(k)', example: `s = "apple pie"

# Basic slicing [start:end]
print(s[0:3])    # "app" - chars 0,1,2
print(s[6:9])    # "pie"

# Omit start (defaults to 0)
print(s[:5])     # "apple" - first 5 chars
print(s[:3])     # "app"

# Omit end (defaults to len)
print(s[6:])     # "pie" - from 6 to end
print(s[0:])     # "apple pie" - entire string

# Negative indices
print(s[-3:])    # "pie" - last 3 chars
print(s[:-4])    # "apple" - all but last 4

# Out of bounds = no error
print(s[:100])   # "apple pie" - goes to end
print(s[50:60])  # "" - empty string

# Step (every nth character)
print(s[::2])    # "apeepi" - every 2nd char
print(s[::-1])   # "eip elppa" - reverse!` },
  { section: 'Fundamentals', signature: 'String Concatenation (+)', description: 'Combine strings using + operator. Strings are immutable - creates new string each time.', complexity: 'O(n+m)', example: `# Basic concatenation
string1 = "abra"
string2 = "cadabra"
magic = string1 + string2
print(magic)  # "abracadabra"

# Add space between
first = "Arthur"
last = "Dent"
full = first + " " + last
print(full)  # "Arthur Dent"

# Multiple concatenations
greeting = "Hello" + " " + "world" + "!"

# Concatenation in loop (SLOW - O(n²))
# DON'T DO THIS:
result = ""
for i in range(1000):
    result += str(i)  # Creates new string each time!

# USE join() instead (O(n))
result = "".join(str(i) for i in range(1000))` },
  { section: 'Fundamentals', signature: 'String Immutability', description: 'Strings cannot be modified after creation. Must create new string to make changes.', complexity: 'Concept', example: `# Cannot modify individual characters
word = "goal"
# word[0] = "f"  # TypeError!

# Create new string instead
word = "f" + word[1:]  # "foal"

# Methods return NEW strings
name = "Picard"
upper = name.upper()   # Creates "PICARD"
print(name)            # Still "Picard"
print(upper)           # "PICARD"

# Reassign to change
name = name.upper()    # Now name is "PICARD"` },
]

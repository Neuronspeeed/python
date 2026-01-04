import type { Method } from '../types'

export const stringMethods: Method[] = [
  // Fundamentals
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
  // Why & When
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
  // Case Methods
  { section: 'Case Methods', signature: 'str.upper()', description: 'Returns a copy with all characters converted to uppercase.', complexity: 'O(n)', example: `s = "hello"\nprint(s.upper())  # "HELLO"` },
  { section: 'Case Methods', signature: 'str.lower()', description: 'Returns a copy with all characters converted to lowercase.', complexity: 'O(n)', example: `s = "HELLO"\nprint(s.lower())  # "hello"` },
  { section: 'Case Methods', signature: 'str.capitalize()', description: 'Returns a copy with first character capitalized, rest lowercased.', complexity: 'O(n)', example: `s = "hello WORLD"\nprint(s.capitalize())  # "Hello world"` },
  { section: 'Case Methods', signature: 'str.title()', description: 'Returns titlecased version where words start with uppercase.', complexity: 'O(n)', example: `s = "hello world"\nprint(s.title())  # "Hello World"` },
  { section: 'Case Methods', signature: 'str.swapcase()', description: 'Returns copy with uppercase converted to lowercase and vice versa.', complexity: 'O(n)', example: `s = "Hello World"\nprint(s.swapcase())  # "hELLO wORLD"` },
  { section: 'Case Methods', signature: 'str.casefold()', description: 'Returns casefolded copy for caseless matching. More aggressive than lower().', complexity: 'O(n)', example: `print("ß".casefold())  # "ss"` },
  // Checking Methods
  { section: 'Checking Methods', signature: 'str.islower()', description: 'Returns True if all cased characters are lowercase.', complexity: 'O(n)', example: `print("hello".islower())  # True
print("Hello".islower())  # False
print("123".islower())    # False (no cased chars)` },
  { section: 'Checking Methods', signature: 'str.isupper()', description: 'Returns True if all cased characters are uppercase.', complexity: 'O(n)', example: `print("HELLO".isupper())  # True
print("Hello".isupper())  # False` },
  { section: 'Checking Methods', signature: 'str.istitle()', description: 'Returns True if string is titlecased (words start with uppercase).', complexity: 'O(n)', example: `print("Hello World".istitle())  # True
print("Hello world".istitle())  # False` },
  { section: 'Checking Methods', signature: 'str.isascii()', description: 'Returns True if all characters are ASCII (0-127). Empty string returns True.', complexity: 'O(n)', example: `print("hello".isascii())  # True
print("héllo".isascii())  # False
print("".isascii())       # True` },
  { section: 'Checking Methods', signature: 'str.isdecimal()', description: 'Returns True if all characters are decimal digits (0-9 only).', complexity: 'O(n)', example: `print("123".isdecimal())   # True
print("①②③".isdecimal())  # False (unicode digits)
print("1.5".isdecimal())   # False` },
  { section: 'Checking Methods', signature: 'str.isnumeric()', description: 'Returns True if all characters are numeric (includes fractions, subscripts).', complexity: 'O(n)', example: `print("123".isnumeric())   # True
print("½".isnumeric())     # True (fraction)
print("²".isnumeric())     # True (superscript)` },
  { section: 'Checking Methods', signature: 'str.isidentifier()', description: 'Returns True if string is a valid Python identifier.', complexity: 'O(n)', example: `print("my_var".isidentifier())  # True
print("2fast".isidentifier())   # False (starts with digit)
print("class".isidentifier())   # True (but is keyword!)
import keyword
keyword.iskeyword("class")      # True` },
  { section: 'Checking Methods', signature: 'str.isprintable()', description: 'Returns True if all characters are printable or string is empty.', complexity: 'O(n)', example: `print("hello".isprintable())  # True
print("hello\\n".isprintable()) # False (newline)
print("".isprintable())        # True` },
  { section: 'Checking Methods', signature: 'str.isalpha()', description: 'Returns True if all characters are alphabetic.', complexity: 'O(n)', example: `print("hello".isalpha())  # True\nprint("hello1".isalpha())  # False` },
  { section: 'Checking Methods', signature: 'str.isdigit()', description: 'Returns True if all characters are digits.', complexity: 'O(n)', example: `print("123".isdigit())  # True` },
  { section: 'Checking Methods', signature: 'str.isalnum()', description: 'Returns True if all characters are alphanumeric.', complexity: 'O(n)', example: `print("hello123".isalnum())  # True` },
  { section: 'Checking Methods', signature: 'str.isspace()', description: 'Returns True if all characters are whitespace.', complexity: 'O(n)', example: `print("   ".isspace())  # True` },
  // Search Methods
  { section: 'Search Methods', signature: 'str.find(sub[, start[, end]])', description: 'Returns lowest index of substring. Returns -1 if not found.', complexity: 'O(n*m)', example: `s = "hello world"\nprint(s.find("world"))  # 6\nprint(s.find("xyz"))  # -1` },
  { section: 'Search Methods', signature: 'str.rfind(sub[, start[, end]])', description: 'Returns highest index of substring. Returns -1 if not found.', complexity: 'O(n*m)', example: `s = "hello world"\nprint(s.rfind("o"))  # 7` },
  { section: 'Search Methods', signature: 'str.index(sub[, start[, end]])', description: 'Like find() but raises ValueError if not found.', complexity: 'O(n*m)', example: `s = "hello"\nprint(s.index("l"))  # 2` },
  { section: 'Search Methods', signature: 'str.rindex(sub[, start[, end]])', description: 'Like rfind() but raises ValueError if not found.', complexity: 'O(n*m)', example: `s = "hello"
print(s.rindex("l"))  # 3 (last 'l')
# s.rindex("z")       # ValueError` },
  { section: 'Search Methods', signature: 'str.count(sub[, start[, end]])', description: 'Returns number of non-overlapping occurrences of substring.', complexity: 'O(n*m)', example: `s = "hello"\nprint(s.count("l"))  # 2` },
  { section: 'Search Methods', signature: 'str.startswith(prefix[, start[, end]])', description: 'Returns True if string starts with prefix.', complexity: 'O(k)', example: `s = "hello"\nprint(s.startswith("he"))  # True` },
  { section: 'Search Methods', signature: 'str.endswith(suffix[, start[, end]])', description: 'Returns True if string ends with suffix.', complexity: 'O(k)', example: `s = "hello.py"\nprint(s.endswith(".py"))  # True` },
  // Strip Methods
  { section: 'Strip Methods', signature: 'str.strip([chars])', description: 'Returns copy with leading/trailing characters removed.', complexity: 'O(n)', example: `s = "  hello  "\nprint(s.strip())  # "hello"` },
  { section: 'Strip Methods', signature: 'str.lstrip([chars])', description: 'Returns copy with leading characters removed.', complexity: 'O(n)', example: `s = "  hello"\nprint(s.lstrip())  # "hello"` },
  { section: 'Strip Methods', signature: 'str.rstrip([chars])', description: 'Returns copy with trailing characters removed.', complexity: 'O(n)', example: `s = "hello  "\nprint(s.rstrip())  # "hello"` },
  // Split & Join Methods
  { section: 'Split & Join', signature: 'str.split(sep=None, maxsplit=-1)', description: 'Returns list of words using sep as delimiter.', complexity: 'O(n)', example: `s = "a,b,c"\nprint(s.split(","))  # ['a', 'b', 'c']` },
  { section: 'Split & Join', signature: 'str.rsplit(sep=None, maxsplit=-1)', description: 'Like split() but splits from the right.', complexity: 'O(n)', example: `s = "a/b/c"\nprint(s.rsplit("/", 1))  # ['a/b', 'c']` },
  { section: 'Split & Join', signature: 'str.splitlines([keepends])', description: 'Returns list of lines. Splits on various line boundaries.', complexity: 'O(n)', example: `s = "line1\\nline2\\nline3"
print(s.splitlines())       # ['line1', 'line2', 'line3']
print(s.splitlines(True))   # ['line1\\n', 'line2\\n', 'line3']

# Handles different line endings
"a\\rb\\nc\\r\\nd".splitlines()  # ['a', 'b', 'c', 'd']` },
  { section: 'Split & Join', signature: 'str.partition(sep)', description: 'Splits at first occurrence of sep. Returns 3-tuple: (before, sep, after).', complexity: 'O(n)', example: `s = "hello=world=!"
print(s.partition("="))  # ('hello', '=', 'world=!')

# If sep not found, returns (str, '', '')
print("hello".partition("="))  # ('hello', '', '')` },
  { section: 'Split & Join', signature: 'str.rpartition(sep)', description: 'Like partition() but searches from the right.', complexity: 'O(n)', example: `s = "hello=world=!"
print(s.rpartition("="))  # ('hello=world', '=', '!')

# Useful for file extensions
path = "archive.tar.gz"
print(path.rpartition("."))  # ('archive.tar', '.', 'gz')` },
  { section: 'Split & Join', signature: 'str.join(iterable)', description: 'Concatenates strings with str as separator.', complexity: 'O(n)', example: `print(",".join(["a", "b", "c"]))  # "a,b,c"` },
  // Replace & Transform Methods
  { section: 'Replace & Transform', signature: 'str.replace(old, new[, count])', description: 'Returns copy with occurrences of old replaced by new.', complexity: 'O(n)', example: `s = "hello"\nprint(s.replace("l", "L"))  # "heLLo"` },
  { section: 'Replace & Transform', signature: 'str.removeprefix(prefix) [3.9+]', description: 'Returns string with prefix removed if present. (Python 3.9+)', complexity: 'O(n)', example: `s = "test_function"
print(s.removeprefix("test_"))  # "function"
print(s.removeprefix("foo_"))   # "test_function" (unchanged)

# Before 3.9, you'd do:
# s[len(prefix):] if s.startswith(prefix) else s` },
  { section: 'Replace & Transform', signature: 'str.removesuffix(suffix) [3.9+]', description: 'Returns string with suffix removed if present. (Python 3.9+)', complexity: 'O(n)', example: `s = "file.txt"
print(s.removesuffix(".txt"))  # "file"
print(s.removesuffix(".py"))   # "file.txt" (unchanged)

# Before 3.9, you'd do:
# s[:-len(suffix)] if s.endswith(suffix) else s` },
  { section: 'Replace & Transform', signature: 'str.expandtabs(tabsize=8)', description: 'Returns copy with tabs replaced by spaces.', complexity: 'O(n)', example: `s = "a\\tb\\tc"
print(s.expandtabs())    # "a       b       c" (8 spaces)
print(s.expandtabs(4))   # "a   b   c" (4 spaces)` },
  { section: 'Replace & Transform', signature: 'str.maketrans(x[, y[, z]])', description: 'Returns translation table for use with translate().', complexity: 'O(n)', example: `# Single dict argument
table = str.maketrans({"a": "1", "b": "2"})

# Two strings (map chars from x to y)
table = str.maketrans("abc", "123")
print("abcdef".translate(table))  # "123def"

# Three args: x->y mapping, z chars deleted
table = str.maketrans("ae", "12", "lo")
print("hello".translate(table))  # "h12"` },
  { section: 'Replace & Transform', signature: 'str.translate(table)', description: 'Returns copy with characters mapped through translation table.', complexity: 'O(n)', example: `# Remove vowels
vowels = str.maketrans("", "", "aeiou")
print("hello world".translate(vowels))  # "hll wrld"

# ROT13 cipher
import codecs
codecs.encode("hello", "rot13")  # "uryyb"` },
  // Padding & Alignment
  { section: 'Padding & Alignment', signature: 'str.center(width[, fillchar])', description: 'Returns centered string of given width.', complexity: 'O(n)', example: `print("hi".center(10, "-"))  # "----hi----"` },
  { section: 'Padding & Alignment', signature: 'str.ljust(width[, fillchar])', description: 'Returns left-justified string of given width.', complexity: 'O(n)', example: `print("hi".ljust(5))  # "hi   "` },
  { section: 'Padding & Alignment', signature: 'str.rjust(width[, fillchar])', description: 'Returns right-justified string of given width.', complexity: 'O(n)', example: `print("42".rjust(5, "0"))  # "00042"` },
  { section: 'Padding & Alignment', signature: 'str.zfill(width)', description: 'Returns string padded with zeros on the left.', complexity: 'O(n)', example: `print("42".zfill(5))  # "00042"` },
  // User Input
  { section: 'User Input', signature: 'input([prompt])', description: 'Reads a line from user input and returns it as a string. Optional prompt is displayed to user.', complexity: 'O(n)', example: `# Basic input
user_input = input()      # Waits for user to type

# With prompt
name = input("Enter your name: ")
print("Hello,", name)

# Process input
response = input("What should I shout? ")
shouted = response.upper()
print("Well, if you insist...", shouted)

# Input is always a string!
num = input("Enter a number: ")  # Returns string!
# num + 5  # TypeError - can't add str and int
num_int = int(num)  # Convert to int first
print(num_int + 5)  # OK now` },
  // Number Formatting
  { section: 'Number Formatting', signature: 'f-string number format', description: 'Format numbers in f-strings using {value:format}. Use .Nf for decimals, , for thousands, % for percentages.', complexity: 'O(n)', example: `# Fixed-point notation (N decimal places)
n = 7.125
result = f"$\\{n:.2f}"          # "7.12" (2 decimals, rounds ties to even)
result = f"$\\{n:.3f}"          # "7.125"
result = f"$\\{1:.2f}"          # "1.00" (always shows N decimals)

# Thousands separator
x = 1234567890
result = f"$\\{x:,}"            # "1,234,567,890"
result = f"$\\{x:,.2f}"         # "1,234,567,890.00"

# Currency formatting
balance = 2000.0
spent = 256.35
remaining = balance - spent
message = f"Remaining: $$\\{remaining:,.2f}"  # "$1,743.65"

# Percentages (multiplies by 100, adds %)
ratio = 0.9
result = f"$\\{ratio:.1%}"      # "90.0%"
result = f"$\\{ratio:.2%}"      # "90.00%"
result = f"$\\{0.12345:.0%}"    # "12%"` },
  // Encoding & Formatting
  { section: 'Encoding & Formatting', signature: 'str.encode(encoding="utf-8")', description: 'Encodes string using specified encoding. Returns bytes.', complexity: 'O(n)', example: `print("hello".encode())  # b'hello'` },
  { section: 'Encoding & Formatting', signature: 'str.format(*args, **kwargs)', description: 'Performs string formatting with replacement fields.', complexity: 'O(n)', example: `print("{} {}".format("hello", "world"))` },
  { section: 'Encoding & Formatting', signature: 'str.format_map(mapping)', description: 'Like format() but takes a single mapping directly.', complexity: 'O(n)', example: `data = {"name": "Alice", "age": 30}
print("{name} is {age}".format_map(data))  # "Alice is 30"

# Useful with defaultdict for missing keys
from collections import defaultdict
d = defaultdict(lambda: "N/A", {"name": "Bob"})
print("{name}: {age}".format_map(d))  # "Bob: N/A"` },
  // Unicode & Bytes
  { section: 'Unicode & Bytes', signature: 'bytes / bytearray', description: 'bytes: immutable raw binary. bytearray: mutable. Cannot mix with str—convert with encode/decode.', complexity: 'O(1)', example: `# bytes - immutable binary
b = b"hello"           # bytes literal
b = bytes([104, 101])  # from int sequence

# bytearray - mutable binary
ba = bytearray(b"hello")
ba[0] = 72             # modify in place
print(ba)              # bytearray(b'Hello')

# Cannot mix str and bytes
# "hi" + b"there"  # TypeError!
"hi".encode() + b"there"  # OK: b'hithere'` },
  { section: 'Unicode & Bytes', signature: 'str.encode() / bytes.decode()', description: 'Convert between str and bytes. Specify encoding for non-ASCII.', complexity: 'O(n)', example: `# String to bytes
text = "café"
b = text.encode("utf-8")      # b'caf\\xc3\\xa9'
b = text.encode("latin-1")    # b'caf\\xe9'

# Bytes to string
b = b'caf\\xc3\\xa9'
s = b.decode("utf-8")         # "café"

# Error handling
b"\\xff".decode("utf-8", errors="replace")  # "�"
b"\\xff".decode("utf-8", errors="ignore")   # ""` },
  { section: 'Unicode & Bytes', signature: 'File I/O modes', description: "Text mode auto-decodes; binary mode reads raw bytes. Use encoding= for text files.", complexity: 'O(n)', example: `# Text mode - auto decode/encode
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()  # returns str

# Binary mode - raw bytes, no translation
with open("image.png", "rb") as f:
    data = f.read()  # returns bytes

# Write binary
with open("out.bin", "wb") as f:
    f.write(b"\\x00\\x01\\x02")` },
  { section: 'Unicode & Bytes', signature: 'BOM handling (utf-8-sig)', description: "Byte Order Mark identifies encoding. Use 'utf-8-sig' to handle automatically.", complexity: 'O(n)', example: `# Read file with BOM
with open("file.txt", encoding="utf-8-sig") as f:
    text = f.read()  # BOM stripped automatically

# Write file with BOM
with open("file.txt", "w", encoding="utf-8-sig") as f:
    f.write("hello")  # BOM added at start

# Manual BOM check
data = open("file.txt", "rb").read()
if data.startswith(b'\\xef\\xbb\\xbf'):  # UTF-8 BOM
    text = data[3:].decode("utf-8")` },
  { section: 'Unicode & Bytes', signature: 'unicodedata.normalize()', description: "Normalize Unicode for consistent comparisons. NFC (composed) or NFD (decomposed).", complexity: 'O(n)', example: `import unicodedata

# Same visual character, different representations
s1 = "café"           # 'é' as single char (U+00E9)
s2 = "cafe\\u0301"     # 'e' + combining accent

print(s1 == s2)       # False - different bytes!

# Normalize to compare
n1 = unicodedata.normalize("NFC", s1)
n2 = unicodedata.normalize("NFC", s2)
print(n1 == n2)       # True

# NFC: composed (Linux/Web)
# NFD: decomposed (macOS filenames)` },
]

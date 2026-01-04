import type { Method } from '../../types'

export const fileioBasicsMethods: Method[] = [
  // File Basics
  {
    section: 'File Basics',
    signature: 'What is a file?',
    description: 'A file is a sequence of bytes (integers 0-255). Must be decoded/encoded to interpret contents. Python handles encoding/decoding for you.',
    complexity: 'Concept',
    example: `# Files are sequences of bytes
# Bytes must be decoded into meaningful data

# Text files: bytes → characters (with encoding)
# Binary files: raw bytes (images, audio, etc.)

# Python handles decoding for text files
# You just specify the encoding (utf-8, ascii, etc.)`,
  },
  {
    section: 'File Basics',
    signature: 'Character encoding',
    description: 'Determines how bytes map to characters. UTF-8 is most common. ASCII limited to English. Encoding/decoding must match!',
    complexity: 'Concept',
    example: `# Common encodings:
# - ASCII: English only, can't encode ñ or ü
# - UTF-8: Universal, backwards compatible with ASCII
# - UTF-16: Used by Windows for .txt files
# - UTF-32: 4 bytes per character

# CRITICAL: Use same encoding to decode as was used to encode!
# UTF-8 text decoded as UTF-16 = gibberish

# Default: UTF-8 on Mac/Linux, UTF-16 on Windows`,
  },
  {
    section: 'File Basics',
    signature: 'Line endings',
    description: 'Lines end with \\n (Unix/Mac) or \\r\\n (Windows). Python handles conversion automatically in text mode.',
    complexity: 'Concept',
    example: `# Line ending characters:
# \\n = line feed (Unix/Mac)
# \\r = carriage return
# \\r\\n = both (Windows)

# Windows file opened on Unix might show extra blank lines
# Python handles this automatically in text mode

# Rarely a problem in practice!`,
  },

  // Opening Files
  {
    section: 'Opening Files',
    signature: 'open(path, mode, encoding)',
    description: 'Opens file and returns file object. Specify mode ("r", "w", "a") and encoding. Always close with .close() or use with statement.',
    complexity: 'O(1)',
    example: `# Basic file opening
file = open("data.txt", mode="r", encoding="utf-8")
# ... do something with file ...
file.close()  # MUST close!

# Better: use with statement (auto-closes)
with open("data.txt", mode="r", encoding="utf-8") as file:
    content = file.read()
# file auto-closed here`,
  },
  {
    section: 'Opening Files',
    signature: 'File modes',
    description: 'Mode determines operation: "r" (read), "w" (write/overwrite), "a" (append). Add "b" for binary.',
    complexity: 'Concept',
    example: `# Text modes:
# "r"  - read (error if file doesn't exist)
# "w"  - write (OVERWRITES existing file!)
# "a"  - append (adds to end of file)

# Binary modes:
# "rb" - read binary
# "wb" - write binary
# "ab" - append binary

# Write mode DANGER!
with open("data.txt", "w") as f:
    f.write("new")  # Old content GONE!`,
  },
  {
    section: 'Opening Files',
    signature: 'with statement',
    description: 'Opens file in context manager. Auto-closes even if exception raised. Pythonic way to work with files.',
    complexity: 'O(1)',
    example: `# ALWAYS use with statement for files!
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    # Process content...
# File automatically closed here

# Even if exception occurs:
try:
    with open("data.txt", "r") as file:
        risky_operation(file)
except Exception:
    pass
# File still closed properly!

# Don't do this:
file = open("data.txt")  # Easy to forget .close()
content = file.read()
file.close()  # What if exception before this?`,
  },

  // Reading Files
  {
    section: 'Reading Files',
    signature: 'file.read()',
    description: 'Reads entire file as single string. Lines separated by \\n. Good for small files.',
    complexity: 'O(n)',
    example: `# Read entire file into string
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    print(content)

# Example file content:
# Line 1
# Line 2
# Line 3

# Result: "Line 1\\nLine 2\\nLine 3"

# WARNING: .read() loads entire file into memory!
# Don't use for huge files`,
  },
  {
    section: 'Reading Files',
    signature: 'file.readlines()',
    description: 'Returns list of lines. Each line includes \\n at end. Use for line-by-line processing.',
    complexity: 'O(n)',
    example: `# Read file as list of lines
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()
    for line in lines:
        print(line.strip())  # strip() removes \\n

# Better: iterate directly (more memory efficient)
with open("data.txt", "r") as file:
    for line in file:  # file object is iterable!
        print(line.strip())

# Process lines one at a time (doesn't load whole file)`,
  },
  {
    section: 'Reading Files',
    signature: 'FileNotFoundError',
    description: 'Raised when opening file that doesn\'t exist in read mode. Catch with try/except.',
    complexity: 'O(1)',
    example: `# File doesn't exist → exception
try:
    with open("missing.txt", "r") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")

# Check if file exists first
from pathlib import Path
path = Path("data.txt")
if path.exists():
    with open(path, "r") as file:
        content = file.read()`,
  },

  // Writing Files
  {
    section: 'Writing Files',
    signature: 'file.write(text)',
    description: 'Writes string to file. Must open in "w" (overwrite) or "a" (append) mode. Returns number of characters written.',
    complexity: 'O(n)',
    example: `# Write mode OVERWRITES file!
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello World!\\n")
    file.write("Line 2\\n")

# Append mode ADDS to end
with open("output.txt", "a", encoding="utf-8") as file:
    file.write("Line 3\\n")

# Write doesn't add \\n automatically!
file.write("No newline")
file.write("Same line!")
# Result: "No newlineSame line!"`,
  },
  {
    section: 'Writing Files',
    signature: 'file.writelines(lines)',
    description: 'Writes list of strings to file. Doesn\'t add newlines! Must include \\n in each string.',
    complexity: 'O(n)',
    example: `lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]

# Write list of lines
with open("output.txt", "w") as file:
    file.writelines(lines)

# WARNING: doesn't add \\n automatically!
bad_lines = ["Line 1", "Line 2", "Line 3"]
file.writelines(bad_lines)
# Result: "Line 1Line 2Line 3" (all on one line!)

# Use loop instead if needed:
for line in bad_lines:
    file.write(line + "\\n")`,
  },

  // pathlib
  {
    section: 'pathlib',
    signature: 'Path(string)',
    description: 'Creates Path object from string. Cross-platform file path handling. Use / operator to join paths.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Create Path from string
path = Path("/Users/david/data.txt")

# Windows paths: use forward slash or raw string
path = Path("C:/Users/david/data.txt")
path = Path(r"C:\\Users\\david\\data.txt")

# Join paths with / operator
base = Path("/Users/david")
file_path = base / "documents" / "data.txt"
# Result: /Users/david/documents/data.txt`,
  },
  {
    section: 'pathlib',
    signature: 'Path.home(), Path.cwd()',
    description: 'Get home directory or current working directory. Cross-platform.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Home directory (cross-platform!)
home = Path.home()
# Mac/Linux: /Users/username
# Windows: C:\\Users\\username

# Current working directory
cwd = Path.cwd()
print(cwd)

# Build path from home
config_path = Path.home() / ".config" / "app.conf"`,
  },
  {
    section: 'pathlib',
    signature: 'path.open(mode, encoding)',
    description: 'Opens file from Path object. Same as open() but uses existing Path.',
    complexity: 'O(1)',
    example: `from pathlib import Path

path = Path.home() / "data.txt"

# Open using Path.open()
with path.open(mode="r", encoding="utf-8") as file:
    content = file.read()

# Equivalent to:
with open(path, mode="r", encoding="utf-8") as file:
    content = file.read()

# Useful when you already have Path object`,
  },
  {
    section: 'pathlib',
    signature: 'path.exists(), path.is_file(), path.is_dir()',
    description: 'Check if path exists and what type it is.',
    complexity: 'O(1)',
    example: `from pathlib import Path

path = Path("data.txt")

# Check existence
if path.exists():
    print("Path exists!")

# Check if file
if path.is_file():
    print("It's a file!")

# Check if directory
if path.is_dir():
    print("It's a directory!")

# Safe file reading
if path.exists() and path.is_file():
    with open(path) as file:
        content = file.read()`,
  },
  {
    section: 'pathlib',
    signature: 'path.touch(), path.mkdir()',
    description: 'Create empty file or directory.',
    complexity: 'O(1)',
    example: `from pathlib import Path

# Create empty file (like Unix touch)
path = Path("newfile.txt")
path.touch()

# Create directory
dir_path = Path("new_folder")
dir_path.mkdir()

# Create parent directories too
deep_path = Path("a/b/c")
deep_path.mkdir(parents=True)

# Don't error if already exists
dir_path.mkdir(exist_ok=True)`,
  },
]

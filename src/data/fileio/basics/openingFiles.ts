import type { Method } from '../../../types'

export const openingFilesMethods: Method[] = [
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
]

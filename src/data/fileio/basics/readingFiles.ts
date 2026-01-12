import type { Method } from '../../../types'

export const readingFilesMethods: Method[] = [
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
]

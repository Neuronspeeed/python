import type { Method } from '../../types'

export const printOperations: Method[] = [
  {
    section: 'Print Operations',
    signature: 'print(*objects, sep, end, file)',
    description: 'Prints objects to stream. sep separates items (default space), end terminates (default newline).',
    complexity: 'Concept',
    example: `print("a", "b", "c")          # a b c
print("a", "b", sep="-")      # a-b
print("a", end="")            # no newline
print("b")                    # ab on same line

# Multiple values
x, y = 1, 2
print(x, y)                   # 1 2
print(f"{x=}, {y=}")          # x=1, y=2`,
  },
  {
    section: 'Print Operations',
    signature: 'print(..., file=f)',
    description: 'Redirect output to file object. Writes to any file-like object with write() method.',
    complexity: 'Concept',
    example: `# Write to file
with open("log.txt", "w") as f:
    print("Log entry", file=f)

# Write to stderr
import sys
print("Error!", file=sys.stderr)

# Capture to string
from io import StringIO
buffer = StringIO()
print("captured", file=buffer)
output = buffer.getvalue()  # "captured\\n"`,
  },
  {
    section: 'Print Operations',
    signature: 'sys.stdout Redirection',
    description: 'Reassigning sys.stdout redirects all print calls. Restore original when done.',
    complexity: 'Concept',
    example: `import sys

# Save and redirect
original = sys.stdout
sys.stdout = open("output.txt", "w")

print("This goes to file")  # redirected
print("So does this")       # redirected

# Restore
sys.stdout.close()
sys.stdout = original
print("Back to console")    # normal`,
  },
]

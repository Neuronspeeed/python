import type { Method } from '../../../types'

export const writingFilesMethods: Method[] = [
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
]

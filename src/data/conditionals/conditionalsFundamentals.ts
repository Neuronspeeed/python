import type { Method } from '../../types'

export const conditionalsFundamentals: Method[] = [
  {
    section: 'Fundamentals',
    signature: 'if statement basics',
    description: 'Execute code ONLY if condition is True. Must end with colon. Indented block runs when True, skipped when False.',
    complexity: 'Concept',
    example: `# Basic if - runs ONLY when True
if 2 + 2 == 4:
    print("Math works!")  # This runs

if 2 + 2 == 5:
    print("Broken math")  # This is SKIPPED

# Real example with variable
grade = 95
if grade >= 70:
    print("You passed!")  # Runs

# IMPORTANT: Don't forget the colon!
# if grade >= 70   # SyntaxError: missing colon
# Must be: if grade >= 70:`,
  },
  {
    section: 'Fundamentals',
    signature: 'if-else statement',
    description: 'if for True case, else for False case (otherwise). else has NO condition - runs when if is False.',
    complexity: 'Concept',
    example: `# if-else: handle both cases
grade = 40
if grade >= 70:
    print("You passed!")
else:
    print("You did not pass :(")  # This runs

# In English: "If grade >= 70, print passed.
# OTHERWISE, print did not pass."

# else needs colon too!
# else   # SyntaxError!
# else:  # Correct

# Code after if-else runs regardless
print("Thank you for attending.")  # Always runs`,
  },
  {
    section: 'Fundamentals',
    signature: 'if-elif-else statement',
    description: 'Multiple conditions. Tests run top-to-bottom. First True condition runs, rest SKIPPED. elif = "else if".',
    complexity: 'Concept',
    example: `# Multiple conditions with elif
grade = 85
if grade >= 90:
    print("A")
elif grade >= 80:      # This runs! (first True)
    print("B")
elif grade >= 70:      # SKIPPED (already found True)
    print("C")
else:                  # SKIPPED
    print("F")

# Only ONE block executes!
# Checks stop after first True

# elif also needs colon
# elif grade >= 80   # SyntaxError!
# elif grade >= 80:  # Correct`,
  },
]

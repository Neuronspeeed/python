import type { Method } from '../../types'

export const boolArithmetic: Method[] = [
  { section: 'Boolean Arithmetic', signature: 'Boolean as Integer', description: 'Boolean is a subclass of int. True=1, False=0. Use sum() to count True values.', complexity: 'O(1)', example: `# Arithmetic operations
print(True + True)    # 2
print(True * 10)      # 10
print(False + 5)      # 5
print(True - 1)       # 0

# Count True values
answers = [True, False, True, True, False]
print(sum(answers))  # 3 (count of True)

# Calculate percentage
total = len(answers)
correct = sum(answers)
percentage = (correct / total) * 100  # 60.0%

# Works in indexes (but not recommended)
options = ["No", "Yes"]
choice = True
print(options[choice])  # "Yes" (index 1)` },
]

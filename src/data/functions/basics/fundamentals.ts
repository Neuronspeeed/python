import type { Method } from '../../../types'

export const fundamentalsMethods: Method[] = [
  { section: 'Fundamentals', signature: 'What is a function?', description: 'Functions are VALUES, like numbers and strings. They break code into reusable chunks. Call with () to execute.', complexity: 'Concept', example: `# Functions are values!
print(type(len))  # <class 'builtin_function_or_method'>

# Assign to variable
my_len = len
print(my_len([1, 2, 3]))  # 3 - still works!

# Functions have names separate from the function itself
# The name 'len' refers to the function value

# Call with () to execute
len([1, 2, 3])   # Calls function, returns 3
len              # Just the function object, doesn't run` },
  { section: 'Fundamentals', signature: 'How functions execute', description: '3 steps: 1) Call with arguments, 2) Execute body, 3) Return value and replace call. Function call is REPLACED by return value.', complexity: 'Concept', example: `# Execution process:
# 1. Call with argument(s)
# 2. Function executes
# 3. Returns value, call is replaced

num_letters = len("four")

# Step by step:
# 1. len() called with "four"
# 2. Length calculated (4)
# 3. len("four") REPLACED by 4
# Now: num_letters = 4

# Same as writing:
num_letters = 4` },
  { section: 'Fundamentals', signature: 'Side effects', description: 'Functions can do more than return values. Side effect = changing something external. print() returns None but displays text.', complexity: 'Concept', example: `# print() has side effect (displays text)
# But returns None!
return_value = print("Hello")
print(return_value)  # None

print(type(return_value))  # <class 'NoneType'>

# Side effect: text displayed
# Return value: None

# Functions can:
# - Return values (main purpose)
# - Have side effects (modify external state)
# - Both!` },
]

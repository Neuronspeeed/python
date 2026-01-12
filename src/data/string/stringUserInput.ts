import type { Method } from '../../types'

export const stringUserInput: Method[] = [
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
]

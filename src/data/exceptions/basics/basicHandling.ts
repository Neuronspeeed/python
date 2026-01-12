import type { Method } from '../../../types'

export const basicHandlingMethods: Method[] = [
  { signature: 'try: ... except:', description: 'Basic exception handling. Catches all exceptions if no type specified.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    x = 1 / 0
except:
    print("An error occurred")

# Better: specify exception type
try:
    x = 1 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")` },
  { signature: 'try: ... except ExceptionType:', description: 'Catch specific exception type. Multiple except blocks possible.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    num = int(input("Enter number: "))
    result = 10 / num
except ValueError:
    print("Invalid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")

# Catch multiple types
try:
    # risky code
    pass
except (TypeError, ValueError):
    print("Type or Value error")` },
  { signature: 'except ExceptionType as e:', description: 'Capture exception object for details.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    x = 1 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")           # division by zero
    print(f"Type: {type(e)}")      # <class 'ZeroDivisionError'>
    print(f"Args: {e.args}")       # ('division by zero',)

try:
    open("missing.txt")
except FileNotFoundError as e:
    print(f"File: {e.filename}")   # missing.txt
    print(f"Error: {e.strerror}")  # No such file or directory` },
  { signature: 'try: ... else:', description: 'else block runs if no exception occurred.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    num = int("42")
except ValueError:
    print("Invalid!")
else:
    print(f"Success: {num}")  # Success: 42

# Useful pattern
def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return None
    else:
        print("Division successful")
        return result` },
  { signature: 'try: ... finally:', description: 'finally block always executes, even if exception raised.', complexity: 'O(1)', section: 'Basic Handling', example: `try:
    f = open("file.txt", "w")
    f.write("Hello")
except IOError:
    print("Error writing file")
finally:
    f.close()  # Always runs
    print("File closed")

# Even with return
def test():
    try:
        return 1
    finally:
        print("Finally runs!")  # Still prints!

test()  # Prints "Finally runs!" then returns 1` },
]

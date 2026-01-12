import type { Method } from '../../../types'

export const raisingExceptionsMethods: Method[] = [
  { signature: 'raise ExceptionType', description: 'Raise an exception to signal an error.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(e)  # Age cannot be negative` },
  { signature: 'raise ExceptionType(message)', description: 'Raise with custom error message.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def withdraw(balance, amount):
    if amount > balance:
        raise ValueError(f"Insufficient funds: need {amount}, have {balance}")
    return balance - amount

try:
    withdraw(100, 150)
except ValueError as e:
    print(e)  # Insufficient funds: need 150, have 100` },
  { signature: 'raise', description: 'Re-raise current exception. Preserves original traceback.', complexity: 'O(1)', section: 'Raising Exceptions', example: `try:
    try:
        x = 1 / 0
    except ZeroDivisionError:
        print("Logging error...")
        raise  # Re-raise the same exception
except ZeroDivisionError:
    print("Caught re-raised exception")` },
  { signature: 'raise ... from ...', description: 'Chain exceptions. Shows cause in traceback.', complexity: 'O(1)', section: 'Raising Exceptions', example: `def load_config(filename):
    try:
        with open(filename) as f:
            return f.read()
    except FileNotFoundError as e:
        raise RuntimeError(f"Config failed: {filename}") from e

try:
    load_config("missing.yaml")
except RuntimeError as e:
    print(e)                 # Config failed: missing.yaml
    print(e.__cause__)       # Original FileNotFoundError` },
]

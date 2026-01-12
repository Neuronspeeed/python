import type { Method } from '../../../types'

export const warningsAndInfoMethods: Method[] = [
  { signature: 'warnings.warn()', description: 'Issue a warning without stopping execution.', complexity: 'O(1)', section: 'Warnings & Info', example: `import warnings

def deprecated_function():
    warnings.warn(
        "deprecated_function is deprecated, use new_function",
        DeprecationWarning,
        stacklevel=2
    )
    return "old behavior"

# Control warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("error", category=UserWarning)  # Treat as error` },
  { signature: 'sys.exc_info()', description: 'Get current exception info tuple (type, value, traceback).', complexity: 'O(1)', section: 'Warnings & Info', example: `import sys

try:
    x = 1 / 0
except:
    exc_type, exc_value, exc_tb = sys.exc_info()
    print(f"Type: {exc_type}")     # <class 'ZeroDivisionError'>
    print(f"Value: {exc_value}")   # division by zero
    print(f"Line: {exc_tb.tb_lineno}")` },
]

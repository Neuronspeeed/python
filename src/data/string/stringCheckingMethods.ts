import type { Method } from '../../types'

export const stringCheckingMethods: Method[] = [
  { section: 'Checking Methods', signature: 'str.islower()', description: 'Returns True if all cased characters are lowercase.', complexity: 'O(n)', example: `print("hello".islower())  # True
print("Hello".islower())  # False
print("123".islower())    # False (no cased chars)` },
  { section: 'Checking Methods', signature: 'str.isupper()', description: 'Returns True if all cased characters are uppercase.', complexity: 'O(n)', example: `print("HELLO".isupper())  # True
print("Hello".isupper())  # False` },
  { section: 'Checking Methods', signature: 'str.istitle()', description: 'Returns True if string is titlecased (words start with uppercase).', complexity: 'O(n)', example: `print("Hello World".istitle())  # True
print("Hello world".istitle())  # False` },
  { section: 'Checking Methods', signature: 'str.isascii()', description: 'Returns True if all characters are ASCII (0-127). Empty string returns True.', complexity: 'O(n)', example: `print("hello".isascii())  # True
print("héllo".isascii())  # False
print("".isascii())       # True` },
  { section: 'Checking Methods', signature: 'str.isdecimal()', description: 'Returns True if all characters are decimal digits (0-9 only).', complexity: 'O(n)', example: `print("123".isdecimal())   # True
print("①②③".isdecimal())  # False (unicode digits)
print("1.5".isdecimal())   # False` },
  { section: 'Checking Methods', signature: 'str.isnumeric()', description: 'Returns True if all characters are numeric (includes fractions, subscripts).', complexity: 'O(n)', example: `print("123".isnumeric())   # True
print("½".isnumeric())     # True (fraction)
print("²".isnumeric())     # True (superscript)` },
  { section: 'Checking Methods', signature: 'str.isidentifier()', description: 'Returns True if string is a valid Python identifier.', complexity: 'O(n)', example: `print("my_var".isidentifier())  # True
print("2fast".isidentifier())   # False (starts with digit)
print("class".isidentifier())   # True (but is keyword!)
import keyword
keyword.iskeyword("class")      # True` },
  { section: 'Checking Methods', signature: 'str.isprintable()', description: 'Returns True if all characters are printable or string is empty.', complexity: 'O(n)', example: `print("hello".isprintable())  # True
print("hello\\n".isprintable()) # False (newline)
print("".isprintable())        # True` },
  { section: 'Checking Methods', signature: 'str.isalpha()', description: 'Returns True if all characters are alphabetic.', complexity: 'O(n)', example: `print("hello".isalpha())  # True\nprint("hello1".isalpha())  # False` },
  { section: 'Checking Methods', signature: 'str.isdigit()', description: 'Returns True if all characters are digits.', complexity: 'O(n)', example: `print("123".isdigit())  # True` },
  { section: 'Checking Methods', signature: 'str.isalnum()', description: 'Returns True if all characters are alphanumeric.', complexity: 'O(n)', example: `print("hello123".isalnum())  # True` },
  { section: 'Checking Methods', signature: 'str.isspace()', description: 'Returns True if all characters are whitespace.', complexity: 'O(n)', example: `print("   ".isspace())  # True` },
]

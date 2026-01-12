import type { Method } from '../../types'

export const stringCaseMethods: Method[] = [
  { section: 'Case Methods', signature: 'str.upper()', description: 'Returns a copy with all characters converted to uppercase.', complexity: 'O(n)', example: `s = "hello"\nprint(s.upper())  # "HELLO"` },
  { section: 'Case Methods', signature: 'str.lower()', description: 'Returns a copy with all characters converted to lowercase.', complexity: 'O(n)', example: `s = "HELLO"\nprint(s.lower())  # "hello"` },
  { section: 'Case Methods', signature: 'str.capitalize()', description: 'Returns a copy with first character capitalized, rest lowercased.', complexity: 'O(n)', example: `s = "hello WORLD"\nprint(s.capitalize())  # "Hello world"` },
  { section: 'Case Methods', signature: 'str.title()', description: 'Returns titlecased version where words start with uppercase.', complexity: 'O(n)', example: `s = "hello world"\nprint(s.title())  # "Hello World"` },
  { section: 'Case Methods', signature: 'str.swapcase()', description: 'Returns copy with uppercase converted to lowercase and vice versa.', complexity: 'O(n)', example: `s = "Hello World"\nprint(s.swapcase())  # "hELLO wORLD"` },
  { section: 'Case Methods', signature: 'str.casefold()', description: 'Returns casefolded copy for caseless matching. More aggressive than lower().', complexity: 'O(n)', example: `print("ß".casefold())  # "ss"` },
]

import type { Method } from '../../types'

export const stringStripMethods: Method[] = [
  { section: 'Strip Methods', signature: 'str.strip([chars])', description: 'Returns copy with leading/trailing characters removed.', complexity: 'O(n)', example: `s = "  hello  "\nprint(s.strip())  # "hello"` },
  { section: 'Strip Methods', signature: 'str.lstrip([chars])', description: 'Returns copy with leading characters removed.', complexity: 'O(n)', example: `s = "  hello"\nprint(s.lstrip())  # "hello"` },
  { section: 'Strip Methods', signature: 'str.rstrip([chars])', description: 'Returns copy with trailing characters removed.', complexity: 'O(n)', example: `s = "hello  "\nprint(s.rstrip())  # "hello"` },
]

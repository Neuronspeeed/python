import type { Method } from '../../types'

export const conditionalsBooleanOps: Method[] = [
  {
    section: 'Boolean Operators',
    signature: 'x and y',
    description: 'Returns x if x is falsy, otherwise y. Short-circuits: stops if first is false.',
    complexity: 'O(1)',
    example: `# Short-circuit evaluation
True and True    # True
True and False   # False
False and True   # False (never evaluates True)

# Returns actual values, not just True/False
5 and 3          # 3 (both truthy, returns last)
0 and 3          # 0 (first is falsy, returns it)
"" and "hi"      # "" (first is falsy)`,
  },
  {
    section: 'Boolean Operators',
    signature: 'x or y',
    description: 'Returns x if x is truthy, otherwise y. Short-circuits: stops if first is true.',
    complexity: 'O(1)',
    example: `# Short-circuit evaluation
True or False    # True (never evaluates False)
False or True    # True
False or False   # False

# Returns actual values
5 or 3           # 5 (first is truthy)
0 or 3           # 3 (first is falsy)
"" or "default"  # "default" (common pattern!)

# Default value pattern
name = user_input or "Anonymous"`,
  },
  {
    section: 'Boolean Operators',
    signature: 'not x',
    description: 'Returns True if x is falsy, False if x is truthy.',
    complexity: 'O(1)',
    example: `not True     # False
not False    # True
not 0        # True
not 1        # False
not ""       # True
not "hello"  # False
not []       # True
not [1, 2]   # False`,
  },
  {
    section: 'Boolean Operators',
    signature: 'Short-Circuit Patterns',
    description: 'Use short-circuit for safe access and defaults. Left side guards right side.',
    complexity: 'O(1)',
    example: `# Safe dictionary access
d = {}
value = d and d.get("key")  # {} (doesn't access key)

# Safe list access
lst = []
first = lst and lst[0]  # [] (no IndexError)

# Default values
name = user_name or "Guest"
port = config.get("port") or 8080

# Guard condition
if lst and lst[0] > 10:  # safe: checks lst first
    process(lst)`,
  },
]

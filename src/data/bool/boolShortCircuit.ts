import type { Method } from '../../types'

export const boolShortCircuit: Method[] = [
  { section: 'Short-circuit Patterns', signature: 'Short-circuit evaluation', description: 'and/or stop evaluating as soon as result is determined. Prevents errors and improves performance.', complexity: 'O(1)', example: `# Safe dictionary access (prevents KeyError)
d = {}
result = d and d["key"]  # {} (doesn't access d["key"])

# Safe list access (prevents IndexError)
lst = []
result = lst and lst[0]  # [] (doesn't access lst[0])

# Default values
name = user_input or "Anonymous"  # Use input or default
count = user_count or 0

# Guard conditions - expensive_check only if first passes
if cheap_check() and expensive_check():
    pass

# Lazy evaluation - second function not called if first succeeds
result = try_fast() or try_slow() or default_value` },
]

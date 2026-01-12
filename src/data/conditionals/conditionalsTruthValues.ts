import type { Method } from '../../types'

export const conditionalsTruthValues: Method[] = [
  {
    section: 'Truth Values',
    signature: 'Falsy Values',
    description: 'Values that evaluate to False: None, False, 0, 0.0, "", [], {}, set(), range(0).',
    complexity: 'Concept',
    example: `# All falsy
bool(None)    # False
bool(False)   # False
bool(0)       # False
bool(0.0)     # False
bool("")      # False
bool([])      # False
bool({})      # False
bool(set())   # False`,
  },
  {
    section: 'Truth Values',
    signature: 'Truthy Values',
    description: 'Everything not falsy is truthy. Non-zero numbers, non-empty collections.',
    complexity: 'Concept',
    example: `# All truthy
bool(1)       # True
bool(-1)      # True
bool(0.1)     # True
bool("0")     # True (non-empty string!)
bool([0])     # True (non-empty list!)
bool({0: 0})  # True (non-empty dict!)
bool(" ")     # True (space is a character)`,
  },
  {
    section: 'Truth Values',
    signature: 'Pythonic Conditionals',
    description: 'Use truthiness directly. Avoid explicit comparisons like == True or len() > 0.',
    complexity: 'Concept',
    example: `# Pythonic
if my_list:           # not: if len(my_list) > 0
    process(my_list)

if not my_string:     # not: if my_string == ""
    my_string = "default"

if value:             # not: if value != None
    use(value)

# Exception: when None vs 0 matters
if value is not None:  # explicit None check
    process(value)`,
  },
]

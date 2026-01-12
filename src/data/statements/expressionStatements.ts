import type { Method } from '../../types'

export const expressionStatements: Method[] = [
  {
    section: 'Expression Statements',
    signature: 'Expression as Statement',
    description: 'Any expression can be a statement. Common for function calls with side effects.',
    complexity: 'Concept',
    example: `# Function calls as statements
print("Hello")    # side effect: output
my_list.append(1) # side effect: modifies list
my_list.sort()    # side effect: sorts in place

# Standalone expressions (result discarded)
3 + 4             # computed but not stored
len("hello")      # result ignored`,
  },
  {
    section: 'Expression Statements',
    signature: 'In-Place Method Gotcha',
    description: 'In-place methods return None. Assigning their result loses the object reference.',
    complexity: 'Concept',
    example: `# WRONG - loses list reference
L = [3, 1, 2]
L = L.sort()    # L is now None!
L = L.append(4) # L is now None!

# CORRECT - call method, don't assign
L = [3, 1, 2]
L.sort()        # modifies L in place
L.append(4)     # modifies L in place
print(L)        # [1, 2, 3, 4]

# Same issue: reverse(), clear(), extend()`,
  },
]

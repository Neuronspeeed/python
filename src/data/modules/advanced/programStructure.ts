import type { Method } from '../../../types'

export const programStructureMethods: Method[] = [
  {
    section: 'Program Structure',
    signature: 'Main script + modules',
    description: 'Programs have one main script (entry point) and library modules providing tools.',
    complexity: 'Concept',
    example: `# project/
#   main.py          ← entry point
#   utils/
#     __init__.py
#     helpers.py
#     database.py
#   config.py

# main.py
from utils.helpers import process
from utils.database import connect
import config

def main():
    db = connect(config.DB_URL)
    process(db)

if __name__ == "__main__":
    main()`,
  },
  {
    section: 'Program Structure',
    signature: 'Naming constraints',
    description: 'Module/package names must follow variable rules because they become variable names in code.',
    complexity: 'Concept',
    example: `# VALID: mymodule.py, my_module.py, module2.py

# INVALID (can't import):
# my-module.py  → import my-module = my MINUS module!
# 2module.py    → starts with digit
# for.py        → reserved word

# Package folders follow same rules
# my-package/ will cause SyntaxError on import`,
  },
]

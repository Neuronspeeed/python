import type { Method } from '../../types'

export const helpPydocMethods: Method[] = [
  {
    section: 'help & pydoc',
    signature: 'help(object)',
    description: 'Interactive documentation viewer. Shows docstrings, method signatures, and type info.',
    complexity: 'Concept',
    example: `# Get help on a function
help(len)

# Get help on a type
help(str)
help(list)

# Get help on a method
help(str.split)

# Get help on a module
import json
help(json)`,
  },
  {
    section: 'help & pydoc',
    signature: 'help() interactive mode',
    description: 'Call help() with no args for interactive mode. Type topics, modules, or "quit" to exit.',
    complexity: 'Concept',
    example: `>>> help()
help> str
# ... shows str documentation
help> modules
# ... lists all available modules
help> keywords
# ... lists Python keywords
help> quit
>>>`,
  },
  {
    section: 'help & pydoc',
    signature: 'pydoc command line',
    description: 'Run pydoc from terminal. Can generate HTML docs or start local doc server.',
    complexity: 'Concept',
    example: `# View docs in terminal
$ python -m pydoc str
$ python -m pydoc json

# Generate HTML file
$ python -m pydoc -w mymodule

# Start local doc server (port 8080)
$ python -m pydoc -p 8080
# Then open http://localhost:8080`,
  },
]

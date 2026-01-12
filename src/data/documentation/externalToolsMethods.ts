import type { Method } from '../../types'

export const externalToolsMethods: Method[] = [
  {
    section: 'External Tools',
    signature: 'Sphinx',
    description: 'Third-party tool for rich documentation. Generates HTML/PDF from reStructuredText or Markdown.',
    complexity: 'Concept',
    example: `# Install Sphinx
$ pip install sphinx

# Create docs project
$ sphinx-quickstart docs

# Build HTML docs
$ cd docs && make html

# Common in open source projects
# Supports cross-references, API docs,
# themes, and hosting on ReadTheDocs`,
  },
  {
    section: 'External Tools',
    signature: 'Type Hints as Docs',
    description: 'Type annotations serve as inline documentation. Tools like mypy validate them.',
    complexity: 'Concept',
    example: `def process(
    data: list[dict[str, int]],
    limit: int = 100
) -> list[str]:
    """Process data records.

    Types provide documentation:
    - data: list of dicts with str keys, int values
    - limit: max records to process
    - returns: list of processed strings
    """
    pass`,
  },
]

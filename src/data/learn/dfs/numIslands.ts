import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const numIslands: AlgorithmDefinition = {
  id: 'number-of-islands',
  name: 'Number of Islands',
  category: 'dfs',
  difficulty: 'Medium',
  leetcodeId: 200,
  description: 'Count the number of islands (connected 1s) in a 2D grid.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(m × n)',
  visualizationType: 'matrix',

  examples: [
    {
      input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
      output: '2',
      explanation: 'Top-left 2×2 forms one island. Bottom-right 1×1 is another.'
    },
    {
      input: 'grid = [["1","0","1"],["0","1","0"],["1","0","1"]]',
      output: '5',
      explanation: 'No adjacent 1s (4-directional), so each 1 is its own island.'
    },
  ],

  education: {
    tldr: 'Scan grid; when you find "1", count it and DFS-sink the entire island.',
    steps: [
      { title: 'Scan grid', description: 'Find any unvisited "1"', code: 'for r, c in grid: if grid[r][c] == "1"' },
      { title: 'Count island', description: 'Found new island, increment count', code: 'islands += 1' },
      { title: 'Sink island', description: 'DFS to mark all connected cells', code: 'dfs(r, c)  # marks "1" → "0"' },
      { title: 'Continue scan', description: 'Already-visited cells appear as "0"', code: 'proceed to next cell' },
    ],
    remember: [
      'DFS "sinks" the island (marks visited)',
      '4-directional: up, down, left, right',
      'Modify grid in-place OR use visited set',
      'Each DFS explores ONE complete island',
    ],
    understanding: `Think of "flooding" each island. When you find a "1", you've discovered a new island. Use DFS to explore and mark ALL connected land cells—this prevents counting the same island twice.

**Key Insight**: By marking visited cells (changing "1" to "0"), we ensure each cell is processed exactly once across all DFS calls.

**Why DFS?** We need to explore all connected components. DFS naturally explores one island completely before moving on.`,

    whyPatternWorks: `The two-phase approach:
1. **Scan phase**: Linear scan finds unvisited land
2. **Explore phase**: DFS marks entire connected component

After DFS, that island is "invisible" (all "0"s). So when we find the next "1", we know it's a NEW island.

This is **flood fill**—a fundamental graph traversal pattern.`,

    keyInsights: [
      'Flood fill pattern: explore + mark connected region',
      'In-place modification avoids extra visited set',
      'Works with BFS too (same time complexity)',
      'Similar: max area of island, surrounded regions, pacific atlantic',
    ]
  },

  code: `def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    rows, cols = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if (r < 0 or r >= rows or
            c < 0 or c >= cols or
            grid[r][c] != '1'):
            return

        grid[r][c] = '0'  # Mark visited
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)

    return islands`,

  inputs: [
    {
      name: 'grid',
      type: 'string',
      default: '11110,11010,11000,00000',
      label: 'Grid (rows separated by commas)',
      placeholder: '11110,11010,11000,00000',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const gridStr = input.grid as string
    const grid = gridStr.split(',').map(row => row.split('').map(c => parseInt(c)))
    const steps: AlgorithmStep[] = []
    const rows = grid.length
    const cols = grid[0]?.length || 0
    let islands = 0

    // Flatten grid for visualization
    const flattenGrid = () => {
      const flat: number[] = []
      for (const row of grid) {
        flat.push(...row)
      }
      return flat
    }

    steps.push({
      lineNumber: 5,
      description: `Grid: ${rows}×${cols}, scanning for islands...`,
      elements: [
        { type: 'array', id: 'grid', values: flattenGrid() },
      ],
      variables: { rows, cols, islands: 0 },
    })

    const dfs = (r: number, c: number) => {
      if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== 1) {
        return
      }

      grid[r][c] = 2 // Mark visited

      steps.push({
        lineNumber: 14,
        description: `DFS: Mark (${r}, ${c}) as visited`,
        elements: [
          { type: 'array', id: 'grid', values: flattenGrid(), highlights: [{ index: r * cols + c, style: 'found' }] },
        ],
        variables: { r, c, island: islands },
      })

      if (steps.length > 35) return

      dfs(r + 1, c)
      dfs(r - 1, c)
      dfs(r, c + 1)
      dfs(r, c - 1)
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 1) {
          islands++

          steps.push({
            lineNumber: 22,
            description: `Found new island at (${r}, ${c})! Island count = ${islands}`,
            elements: [
              { type: 'array', id: 'grid', values: flattenGrid(), highlights: [{ index: r * cols + c, style: 'active' }] },
            ],
            variables: { r, c, islands },
          })

          dfs(r, c)
        }
        if (steps.length > 35) break
      }
      if (steps.length > 35) break
    }

    steps.push({
      lineNumber: 25,
      description: `Complete! Total islands = ${islands}`,
      elements: [
        { type: 'array', id: 'grid', values: flattenGrid() },
      ],
      variables: { islands },
      isComplete: true,
    })

    return steps
  },
}

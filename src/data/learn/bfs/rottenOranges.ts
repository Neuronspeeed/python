import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const rottenOranges: AlgorithmDefinition = {
  id: 'rotten-oranges',
  name: 'Rotting Oranges',
  category: 'bfs',
  difficulty: 'Medium',
  leetcodeId: 994,
  description: 'Find minimum minutes for all oranges to rot (multi-source BFS).',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(m × n)',
  visualizationType: 'matrix',

  examples: [
    {
      input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]',
      output: '4',
      explanation: 'Rot spreads from top-left corner, takes 4 minutes to reach bottom-right.'
    },
    {
      input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]',
      output: '-1',
      explanation: 'Bottom-left orange is isolated—impossible to rot all.'
    },
  ],

  education: {
    tldr: 'Multi-source BFS: start with ALL rotten oranges in queue simultaneously.',
    steps: [
      { title: 'Find all sources', description: 'Add ALL rotten oranges to queue', code: 'if grid[r][c] == 2: queue.append((r,c,0))' },
      { title: 'Count fresh', description: 'Track how many need to rot', code: 'if grid[r][c] == 1: fresh += 1' },
      { title: 'BFS with time', description: 'Each level = 1 minute', code: 'queue.append((nr, nc, time + 1))' },
      { title: 'Check completion', description: 'Return -1 if any fresh remain', code: 'return -1 if fresh > 0 else minutes' },
    ],
    remember: [
      'Multi-source BFS: start with ALL sources in queue',
      'Track time in the queue tuple (r, c, time)',
      'Mark visited BY changing 1→2 (in-place)',
      'Return -1 if fresh > 0 after BFS',
    ],
    understanding: `This is **multi-source BFS**—imagine dropping multiple pebbles in water simultaneously. The rot spreads from ALL rotten oranges at once, not one at a time.

**Key Insight**: By adding ALL rotten oranges to the queue at time=0, they all start spreading simultaneously. The BFS naturally tracks when each fresh orange gets reached.

**Why not single-source?** Starting from one orange and repeating would count time incorrectly. Multi-source BFS correctly simulates parallel spreading.`,

    whyPatternWorks: `BFS explores level by level, where each level represents one time unit. By starting with all rotten oranges:
1. Time 0: All initially rotten
2. Time 1: All adjacent to initially rotten
3. Time N: All N steps away from nearest rotten

The final time is when the last fresh orange rots (furthest from any source).`,

    keyInsights: [
      'Multi-source BFS = add ALL sources initially',
      'Time tracking: store in tuple or track by level',
      'Check for unreachable cells (fresh > 0)',
      'Similar patterns: walls and gates, shortest bridge',
    ]
  },

  code: `def orangesRotting(grid: list[list[int]]) -> int:
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0

    # Find all rotten oranges and count fresh
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1

    if fresh == 0:
        return 0

    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    minutes = 0

    while queue:
        r, c, time = queue.popleft()
        minutes = max(minutes, time)

        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, time + 1))

    return minutes if fresh == 0 else -1`,

  inputs: [
    {
      name: 'grid',
      type: 'string',
      default: '2,1,1;1,1,0;0,1,1',
      label: 'Grid (0=empty, 1=fresh, 2=rotten)',
      placeholder: '2,1,1;1,1,0;0,1,1',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const gridStr = input.grid as string
    const grid = gridStr.split(';').map(row => row.split(',').map(c => parseInt(c)))
    const steps: AlgorithmStep[] = []
    const rows = grid.length
    const cols = grid[0]?.length || 0

    const flattenGrid = () => {
      const flat: number[] = []
      for (const row of grid) flat.push(...row)
      return flat
    }

    const queue: { r: number; c: number; time: number }[] = []
    let fresh = 0

    // Find initial state
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === 2) {
          queue.push({ r, c, time: 0 })
        } else if (grid[r][c] === 1) {
          fresh++
        }
      }
    }

    steps.push({
      lineNumber: 7,
      description: `Found ${queue.length} rotten oranges, ${fresh} fresh oranges`,
      elements: [
        { type: 'array', id: 'grid', values: flattenGrid() },
      ],
      variables: { rotten: queue.length, fresh },
    })

    if (fresh === 0) {
      steps.push({
        lineNumber: 14,
        description: 'No fresh oranges, return 0',
        elements: [
          { type: 'array', id: 'grid', values: flattenGrid() },
        ],
        variables: { result: 0 },
        isComplete: true,
      })
      return steps
    }

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    let minutes = 0

    while (queue.length > 0 && steps.length < 35) {
      const { r, c, time } = queue.shift()!
      minutes = Math.max(minutes, time)

      for (const [dr, dc] of directions) {
        const nr = r + dr
        const nc = c + dc

        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2
          fresh--
          queue.push({ r: nr, c: nc, time: time + 1 })

          steps.push({
            lineNumber: 27,
            description: `Minute ${time + 1}: Orange at (${nr}, ${nc}) rots. ${fresh} fresh remaining`,
            elements: [
              { type: 'array', id: 'grid', values: flattenGrid(), highlights: [
                { index: nr * cols + nc, style: 'found' },
                { index: r * cols + c, style: 'comparing' },
              ]},
            ],
            variables: { minute: time + 1, fresh, position: `(${nr},${nc})` },
          })
        }
      }
    }

    const result = fresh === 0 ? minutes : -1
    steps.push({
      lineNumber: 31,
      description: fresh === 0 ? `All oranges rotten in ${minutes} minutes!` : `Impossible! ${fresh} oranges unreachable`,
      elements: [
        { type: 'array', id: 'grid', values: flattenGrid() },
      ],
      variables: { result, fresh },
      isComplete: true,
    })

    return steps
  },
}

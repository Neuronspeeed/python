import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const nQueens: AlgorithmDefinition = {
  id: 'n-queens',
  name: 'N-Queens',
  category: 'backtracking',
  difficulty: 'Hard',
  leetcodeId: 51,
  description: 'Place N queens on NxN board so no two attack each other.',
  timeComplexity: 'O(n!)',
  spaceComplexity: 'O(n)',
  visualizationType: 'matrix',

  examples: [
    {
      input: 'n = 4',
      output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
      explanation: 'Two ways to place 4 queens on 4×4 board.'
    },
    {
      input: 'n = 1',
      output: '[["Q"]]',
      explanation: 'Single queen on 1×1 board.'
    },
  ],

  education: {
    tldr: 'Place row by row. Track cols, diag1 (r-c), diag2 (r+c) in sets for O(1) conflict check.',
    steps: [
      { title: 'Process row by row', description: 'One queen per row guaranteed', code: 'def backtrack(row)' },
      { title: 'Check conflicts', description: 'Column or diagonal already used?', code: 'if col in cols or (r-c) in diag1 or (r+c) in diag2' },
      { title: 'Place queen', description: 'Add to sets and recurse', code: 'cols.add(col); queens.append(col)' },
      { title: 'Backtrack', description: 'Remove from sets and continue', code: 'cols.remove(col); queens.pop()' },
    ],
    remember: [
      'Row-by-row guarantees one queen per row',
      'Diagonal formula: same diag1 = same r-c, same diag2 = same r+c',
      'Use sets for O(1) conflict detection',
      '4-Queens has 2 solutions, 8-Queens has 92',
    ],
    understanding: `**N-Queens** is classic constraint satisfaction via backtracking.

**Key Insight**: Process row by row—this guarantees one queen per row. Only check column and diagonal conflicts.

**Diagonal Trick**: On diagonal going ↘, r-c is constant. On diagonal going ↙, r+c is constant. Use sets to track used diagonals.`,

    whyPatternWorks: `By processing row by row:
1. One queen per row is automatic
2. For each column, check if column/diagonals are safe
3. Place queen, update tracking sets, recurse to next row
4. Backtrack by removing from sets

The sets provide O(1) conflict checking, making the algorithm efficient despite exploring many possibilities.`,

    keyInsights: [
      'Row-by-row processing = one queen per row automatically',
      'Diagonal formulas: r-c and r+c',
      'Sets for O(1) conflict check',
      'N-Queens II: just count solutions (simpler)',
    ]
  },

  code: `def solveNQueens(n: int) -> list[list[str]]:
    result = []
    cols = set()
    diag1 = set()  # row - col
    diag2 = set()  # row + col

    def backtrack(row, queens):
        if row == n:
            result.append(queens[:])
            return

        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue

            cols.add(col)
            diag1.add(row - col)
            diag2.add(row + col)
            queens.append(col)

            backtrack(row + 1, queens)

            queens.pop()
            cols.remove(col)
            diag1.remove(row - col)
            diag2.remove(row + col)

    backtrack(0, [])
    return result`,

  inputs: [
    {
      name: 'n',
      type: 'number',
      default: 4,
      label: 'Board Size (N)',
      placeholder: '4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const n = Math.min(input.n as number, 6) // Cap at 6 for visualization
    const steps: AlgorithmStep[] = []
    const result: number[][] = []

    const cols = new Set<number>()
    const diag1 = new Set<number>()
    const diag2 = new Set<number>()

    // Create board visualization as matrix
    const createBoard = (queens: number[]) => {
      const board: number[] = []
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (queens[r] === c) {
            board.push(1) // Queen
          } else {
            board.push(0) // Empty
          }
        }
      }
      return board
    }

    // Create highlights for queens with 'found' style
    const createHighlights = (queens: number[], style: 'active' | 'found' = 'active') => {
      return queens.map((col, row) => ({ row, col, style }))
    }

    steps.push({
      lineNumber: 2,
      description: `Place ${n} queens on ${n}×${n} board`,
      elements: [
        { type: 'matrix', id: 'board', rows: n, cols: n, values: createBoard([]) },
      ],
      variables: { n, solutions: 0 },
    })

    const backtrack = (row: number, queens: number[]) => {
      if (row === n) {
        result.push([...queens])
        steps.push({
          lineNumber: 8,
          description: `Found solution #${result.length}!`,
          elements: [
            { type: 'matrix', id: 'board', rows: n, cols: n, values: createBoard(queens), highlights: createHighlights(queens, 'found') },
          ],
          variables: { solution: [...queens], solutionCount: result.length },
        })
        return
      }

      if (steps.length >= 20) return

      for (let col = 0; col < n && steps.length < 20; col++) {
        if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
          continue
        }

        cols.add(col)
        diag1.add(row - col)
        diag2.add(row + col)
        queens.push(col)

        steps.push({
          lineNumber: 15,
          description: `Place queen at row ${row}, col ${col}`,
          elements: [
            { type: 'matrix', id: 'board', rows: n, cols: n, values: createBoard(queens), highlights: createHighlights(queens) },
          ],
          variables: { row, col, queensPlaced: queens.length },
        })

        backtrack(row + 1, queens)

        queens.pop()
        cols.delete(col)
        diag1.delete(row - col)
        diag2.delete(row + col)
      }
    }

    backtrack(0, [])

    steps.push({
      lineNumber: 27,
      description: `Complete! Found ${result.length} solutions`,
      elements: [],
      variables: { totalSolutions: result.length },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const setZeroes: AlgorithmDefinition = {
  id: 'set-matrix-zeroes',
  name: 'Set Matrix Zeroes',
  category: 'matrices',
  difficulty: 'Medium',
  leetcodeId: 73,
  description: 'Set entire row/column to 0 if element is 0.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'matrix',

  code: `def setZeroes(matrix: list[list[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))

    # Mark zeros in first row/col
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0

    # Set zeros based on marks
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0

    # Handle first row/col
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0`,

  inputs: [
    {
      name: 'matrix',
      type: 'string',
      default: '1,1,1|1,0,1|1,1,1',
      label: 'Matrix',
      placeholder: '1,1,1|1,0,1|1,1,1',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const matrixStr = input.matrix as string
    const matrix = matrixStr.split('|').map(row =>
      row.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    )
    const steps: AlgorithmStep[] = []
    const m = matrix.length
    const n = matrix[0]?.length || 0

    steps.push({
      lineNumber: 2,
      description: 'Original matrix',
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat() },
      ],
      variables: { m, n },
    })

    // Find zeros
    const zeroPositions: Array<[number, number]> = []
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 0) {
          zeroPositions.push([i, j])
        }
      }
    }

    if (zeroPositions.length > 0) {
      steps.push({
        lineNumber: 9,
        description: `Found zeros at: ${zeroPositions.map(([i, j]) => `(${i},${j})`).join(', ')}`,
        elements: [
          { type: 'array', id: 'matrix', values: matrix.flat(), styles: matrix.flat().map(v => v === 0 ? 'comparing' as const : 'default' as const) },
        ],
        variables: { zeroCount: zeroPositions.length },
      })
    }

    // Set zeros
    const rowsToZero = new Set(zeroPositions.map(([i]) => i))
    const colsToZero = new Set(zeroPositions.map(([, j]) => j))

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (rowsToZero.has(i) || colsToZero.has(j)) {
          matrix[i][j] = 0
        }
      }
    }

    steps.push({
      lineNumber: 16,
      description: `Set rows {${[...rowsToZero].join(',')}} and cols {${[...colsToZero].join(',')}} to zero`,
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat(), styles: matrix.flat().map(v => v === 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { rowsZeroed: [...rowsToZero], colsZeroed: [...colsToZero] },
    })

    steps.push({
      lineNumber: 24,
      description: 'Complete! Matrix zeros set.',
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat(), styles: matrix.flat().map(v => v === 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { result: matrix },
      isComplete: true,
    })

    return steps
  },
}

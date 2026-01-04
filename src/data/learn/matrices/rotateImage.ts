import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const rotateImage: AlgorithmDefinition = {
  id: 'rotate-image',
  name: 'Rotate Image',
  category: 'matrices',
  difficulty: 'Medium',
  leetcodeId: 48,
  description: 'Rotate n×n matrix 90 degrees clockwise in-place.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  visualizationType: 'matrix',

  code: `def rotate(matrix: list[list[int]]) -> None:
    n = len(matrix)

    # Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Reverse each row
    for row in matrix:
        row.reverse()`,

  inputs: [
    {
      name: 'matrix',
      type: 'string',
      default: '1,2,3|4,5,6|7,8,9',
      label: 'Matrix (rows separated by |)',
      placeholder: '1,2,3|4,5,6|7,8,9',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const matrixStr = input.matrix as string
    const matrix = matrixStr.split('|').map(row =>
      row.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    )
    const steps: AlgorithmStep[] = []
    const n = matrix.length

    steps.push({
      lineNumber: 2,
      description: `Original ${n}×${n} matrix`,
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat() },
      ],
      variables: { n, phase: 'original' },
    })

    // Transpose
    for (let i = 0; i < n && steps.length < 15; i++) {
      for (let j = i + 1; j < n && steps.length < 15; j++) {
        [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]]

        steps.push({
          lineNumber: 7,
          description: `Transpose: swap (${i},${j}) ↔ (${j},${i})`,
          elements: [
            { type: 'array', id: 'matrix', values: matrix.flat() },
          ],
          variables: { i, j, swapped: `(${i},${j}) ↔ (${j},${i})` },
        })
      }
    }

    steps.push({
      lineNumber: 7,
      description: 'After transpose',
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat(), styles: matrix.flat().map(() => 'found' as const) },
      ],
      variables: { phase: 'transposed' },
    })

    // Reverse each row
    for (let i = 0; i < n && steps.length < 20; i++) {
      matrix[i].reverse()
    }

    steps.push({
      lineNumber: 11,
      description: 'After reversing each row (90° rotation complete)',
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat(), styles: matrix.flat().map(() => 'found' as const) },
      ],
      variables: { phase: 'rotated' },
      isComplete: true,
    })

    return steps
  },
}

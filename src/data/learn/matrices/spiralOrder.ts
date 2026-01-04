import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const spiralOrder: AlgorithmDefinition = {
  id: 'spiral-matrix',
  name: 'Spiral Matrix',
  category: 'matrices',
  difficulty: 'Medium',
  leetcodeId: 54,
  description: 'Return all elements in spiral order.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'matrix',

  code: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1

        # Down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1

        if top <= bottom:
            # Left
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1

        if left <= right:
            # Up
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1

    return result`,

  inputs: [
    {
      name: 'matrix',
      type: 'string',
      default: '1,2,3|4,5,6|7,8,9',
      label: 'Matrix',
      placeholder: '1,2,3|4,5,6|7,8,9',
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

    const result: number[] = []
    let top = 0, bottom = m - 1, left = 0, right = n - 1

    steps.push({
      lineNumber: 3,
      description: `Initialize boundaries: top=${top}, bottom=${bottom}, left=${left}, right=${right}`,
      elements: [
        { type: 'array', id: 'matrix', values: matrix.flat() },
      ],
      variables: { top, bottom, left, right },
    })

    while (top <= bottom && left <= right && steps.length < 20) {
      // Right
      for (let col = left; col <= right; col++) {
        result.push(matrix[top][col])
      }
      steps.push({
        lineNumber: 9,
        description: `Go right: row ${top}, cols ${left}-${right}`,
        elements: [
          { type: 'array', id: 'result', values: [...result], styles: result.map(() => 'found' as const) },
        ],
        variables: { direction: 'right', added: result.slice(-1 * (right - left + 1)) },
      })
      top++

      // Down
      for (let row = top; row <= bottom; row++) {
        result.push(matrix[row][right])
      }
      if (top <= bottom + 1) {
        steps.push({
          lineNumber: 14,
          description: `Go down: col ${right}, rows ${top}-${bottom}`,
          elements: [
            { type: 'array', id: 'result', values: [...result], styles: result.map(() => 'found' as const) },
          ],
          variables: { direction: 'down' },
        })
      }
      right--

      if (top <= bottom) {
        // Left
        for (let col = right; col >= left; col--) {
          result.push(matrix[bottom][col])
        }
        steps.push({
          lineNumber: 20,
          description: `Go left: row ${bottom}, cols ${right}-${left}`,
          elements: [
            { type: 'array', id: 'result', values: [...result], styles: result.map(() => 'found' as const) },
          ],
          variables: { direction: 'left' },
        })
        bottom--
      }

      if (left <= right) {
        // Up
        for (let row = bottom; row >= top; row--) {
          result.push(matrix[row][left])
        }
        steps.push({
          lineNumber: 26,
          description: `Go up: col ${left}, rows ${bottom}-${top}`,
          elements: [
            { type: 'array', id: 'result', values: [...result], styles: result.map(() => 'found' as const) },
          ],
          variables: { direction: 'up' },
        })
        left++
      }
    }

    steps.push({
      lineNumber: 29,
      description: `Complete! Spiral order: [${result.join(',')}]`,
      elements: [
        { type: 'array', id: 'result', values: result, styles: result.map(() => 'found' as const) },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}

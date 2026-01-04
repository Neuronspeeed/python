import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const climbingStairs: AlgorithmDefinition = {
  id: 'climbing-stairs',
  name: 'Climbing Stairs',
  category: 'dynamicProgramming',
  difficulty: 'Easy',
  leetcodeId: 70,
  description: 'Count distinct ways to climb n stairs, taking 1 or 2 steps at a time.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  code: `def climbStairs(n: int) -> int:
    if n <= 2:
        return n

    prev2, prev1 = 1, 2

    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr

    return prev1`,

  inputs: [
    {
      name: 'n',
      type: 'number',
      default: 5,
      label: 'Number of stairs',
      placeholder: '5',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const n = input.n as number
    const steps: AlgorithmStep[] = []

    if (n <= 2) {
      steps.push({
        lineNumber: 3,
        description: `n = ${n} <= 2, return ${n}`,
        elements: [],
        variables: { result: n },
        isComplete: true,
      })
      return steps
    }

    let prev2 = 1
    let prev1 = 2
    const dpVals: number[] = [1, 2]

    steps.push({
      lineNumber: 5,
      description: 'Initialize: ways(1) = 1, ways(2) = 2',
      elements: [
        { type: 'array', id: 'dp', values: dpVals },
      ],
      variables: { prev2: 1, prev1: 2 },
    })

    for (let i = 3; i <= n; i++) {
      const curr = prev1 + prev2
      dpVals.push(curr)

      steps.push({
        lineNumber: 8,
        description: `ways(${i}) = ways(${i - 1}) + ways(${i - 2}) = ${prev1} + ${prev2} = ${curr}`,
        elements: [
          { type: 'array', id: 'dp', values: [...dpVals], highlights: [
            { index: dpVals.length - 1, style: 'active' },
            { index: dpVals.length - 2, style: 'found' },
            { index: dpVals.length - 3, style: 'found' },
          ]},
        ],
        variables: { i, prev1, prev2, curr },
      })

      prev2 = prev1
      prev1 = curr

      if (steps.length > 25) break
    }

    steps.push({
      lineNumber: 12,
      description: `Complete! Ways to climb ${n} stairs = ${prev1}`,
      elements: [
        { type: 'array', id: 'dp', values: dpVals },
      ],
      variables: { result: prev1 },
      isComplete: true,
    })

    return steps
  },
}

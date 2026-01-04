import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const jumpGame: AlgorithmDefinition = {
  id: 'jump-game',
  name: 'Jump Game',
  category: 'greedy',
  difficulty: 'Medium',
  leetcodeId: 55,
  description: 'Determine if you can reach the last index.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  code: `def canJump(nums: list[int]) -> bool:
    maxReach = 0

    for i, jump in enumerate(nums):
        if i > maxReach:
            return False
        maxReach = max(maxReach, i + jump)

    return True`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '2,3,1,1,4',
      label: 'Jump lengths',
      placeholder: '2,3,1,1,4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    let maxReach = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize maxReach = 0',
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { maxReach, target: nums.length - 1 },
    })

    for (let i = 0; i < nums.length && steps.length < 20; i++) {
      if (i > maxReach) {
        steps.push({
          lineNumber: 5,
          description: `Position ${i} > maxReach ${maxReach}: cannot proceed!`,
          elements: [
            { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#EF4444' }], styles: nums.map((_, j) => j <= maxReach ? 'found' as const : 'comparing' as const) },
          ],
          variables: { i, maxReach, canReach: false },
          isComplete: true,
        })
        return steps
      }

      const prevMaxReach = maxReach
      maxReach = Math.max(maxReach, i + nums[i])

      steps.push({
        lineNumber: 7,
        description: `At ${i}, jump=${nums[i]}, maxReach = max(${prevMaxReach}, ${i}+${nums[i]}) = ${maxReach}`,
        elements: [
          { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }], styles: nums.map((_, j) => j <= maxReach ? 'found' as const : 'default' as const) },
        ],
        variables: { i, jump: nums[i], maxReach },
      })

      if (maxReach >= nums.length - 1) {
        steps.push({
          lineNumber: 9,
          description: `maxReach ${maxReach} >= target ${nums.length - 1}: can reach end!`,
          elements: [
            { type: 'array', id: 'nums', values: nums, styles: nums.map(() => 'found' as const) },
          ],
          variables: { maxReach, target: nums.length - 1, canReach: true },
          isComplete: true,
        })
        return steps
      }
    }

    steps.push({
      lineNumber: 9,
      description: `Complete! Can reach end: ${maxReach >= nums.length - 1}`,
      elements: [
        { type: 'array', id: 'nums', values: nums, styles: nums.map(() => 'found' as const) },
      ],
      variables: { result: maxReach >= nums.length - 1 },
      isComplete: true,
    })

    return steps
  },
}

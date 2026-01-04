import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const rangeSum: AlgorithmDefinition = {
  id: 'range-sum-query',
  name: 'Range Sum Query',
  category: 'prefixSum',
  difficulty: 'Easy',
  leetcodeId: 303,
  description: 'Calculate sum of elements between indices using prefix sum.',
  timeComplexity: 'O(1) query',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  code: `class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0]
        for num in nums:
            self.prefix.append(self.prefix[-1] + num)

    def sumRange(self, left: int, right: int) -> int:
        return self.prefix[right + 1] - self.prefix[left]`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '-2,0,3,-5,2,-1',
      label: 'Array',
      placeholder: '-2,0,3,-5,2,-1',
    },
    {
      name: 'left',
      type: 'number',
      default: 0,
      label: 'Left index',
      placeholder: '0',
    },
    {
      name: 'right',
      type: 'number',
      default: 2,
      label: 'Right index',
      placeholder: '2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const left = input.left as number
    const right = input.right as number
    const steps: AlgorithmStep[] = []

    // Build prefix sum
    const prefix = [0]
    for (const num of nums) {
      prefix.push(prefix[prefix.length - 1] + num)
    }

    steps.push({
      lineNumber: 3,
      description: 'Build prefix sum array',
      elements: [
        { type: 'array', id: 'nums', values: nums },
        { type: 'array', id: 'prefix', values: prefix, highlights: prefix.map((_, i) => ({ index: i, style: 'found' as const })) },
      ],
      variables: { prefix },
    })

    for (let i = 0; i < nums.length && steps.length < 10; i++) {
      steps.push({
        lineNumber: 5,
        description: `prefix[${i + 1}] = prefix[${i}] + nums[${i}] = ${prefix[i]} + ${nums[i]} = ${prefix[i + 1]}`,
        elements: [
          { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
          { type: 'array', id: 'prefix', values: prefix.slice(0, i + 2) },
        ],
        variables: { i, sum: prefix[i + 1] },
      })
    }

    // Query
    const result = prefix[right + 1] - prefix[left]

    steps.push({
      lineNumber: 8,
      description: `Query sum[${left}:${right}] = prefix[${right + 1}] - prefix[${left}] = ${prefix[right + 1]} - ${prefix[left]} = ${result}`,
      elements: [
        { type: 'array', id: 'nums', values: nums, highlights: nums.map((_, i) => i >= left && i <= right ? { index: i, style: 'found' as const } : null).filter((h): h is { index: number; style: 'found' } => h !== null) },
        { type: 'array', id: 'prefix', values: prefix, pointers: [
          { index: left, label: 'L', color: '#3B82F6' },
          { index: right + 1, label: 'R+1', color: '#EF4444' },
        ] },
      ],
      variables: { left, right, result },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const maxSumSubarray: AlgorithmDefinition = {
  id: 'max-sum-subarray',
  name: 'Maximum Sum Subarray of Size K',
  category: 'slidingWindow',
  difficulty: 'Easy',
  description: 'Find the maximum sum of any contiguous subarray of size k.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [2, 1, 5, 1, 3, 2], k = 3',
      output: '9',
      explanation: 'Maximum sum subarray is [5, 1, 3] with sum 9.'
    },
    {
      input: 'nums = [2, 3, 4, 1, 5], k = 2',
      output: '7',
      explanation: 'Maximum sum subarray is [3, 4] with sum 7.'
    },
  ],

  education: {
    tldr: 'Slide window: add new element, remove old. No need to recompute entire sum.',
    steps: [
      { title: 'Initial window', description: 'Sum first k elements', code: 'sum = sum(nums[:k])' },
      { title: 'Slide right', description: 'Add incoming element', code: 'sum += nums[i]' },
      { title: 'Slide left', description: 'Remove outgoing element', code: 'sum -= nums[i-k]' },
      { title: 'Track max', description: 'Update best sum seen', code: 'max_sum = max(max_sum, sum)' },
    ],
    remember: [
      'Fixed size = slide, don\'t resize',
      'Add new - remove old = O(1) update',
      'Window moves one step at a time',
    ],
    understanding: `This is the simplest sliding window: **fixed size**. We maintain a window of exactly k elements and slide it through the array.

**The trick:** Instead of recalculating the sum for each window position (O(k) per position = O(nk) total), we do an O(1) update:
- Add the new element entering the window
- Subtract the element leaving the window

**Visual:** Think of a window frame sliding along the array. At each position, one element enters on the right and one exits on the left.`,

    whyPatternWorks: `Fixed-size sliding window works when:

1. **Contiguous elements:** We care about consecutive items
2. **Fixed window size:** k is constant
3. **Aggregate can be updated incrementally:** Sum, product, count all work

The pattern converts O(nk) brute force into O(n) by maintaining state across positions instead of recalculating from scratch.`,

    keyInsights: [
      'Classic fixed-size sliding window',
      'O(1) window update instead of O(k) recalculation',
      'Sum is additive: add incoming, subtract outgoing',
      'Window "slides" one element at a time',
      'Works for any incrementally-updatable aggregate'
    ]
  },

  code: `def maxSumSubarray(nums: list[int], k: int) -> int:
    window_sum = sum(nums[:k])
    max_sum = window_sum

    for i in range(k, len(nums)):
        # Slide: add new element, remove old
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [2, 1, 5, 1, 3, 2],
      label: 'Numbers',
      placeholder: '2, 1, 5, 1, 3, 2',
    },
    {
      name: 'k',
      type: 'number',
      default: 3,
      label: 'Window Size (k)',
      placeholder: '3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = input.nums as number[]
    const k = input.k as number
    const steps: AlgorithmStep[] = []

    let windowSum = nums.slice(0, k).reduce((a, b) => a + b, 0)
    let maxSum = windowSum

    steps.push({
      lineNumber: 2,
      description: `Initial window [0..${k - 1}]: sum = ${windowSum}`,
      elements: [
        { type: 'array', id: 'nums', values: nums, highlights:
          Array.from({ length: k }, (_, i) => ({ index: i, style: 'active' as const }))
        },
        { type: 'bracket', id: 'window', left: 0, right: k - 1, value: `sum = ${windowSum}` },
      ],
      variables: { window_sum: windowSum, max_sum: maxSum },
    })

    for (let i = k; i < nums.length; i++) {
      const add = nums[i]
      const remove = nums[i - k]
      windowSum += add - remove

      steps.push({
        lineNumber: 7,
        description: `Slide: add ${add}, remove ${remove}. New sum = ${windowSum}`,
        elements: [
          { type: 'array', id: 'nums', values: nums, highlights: [
            { index: i - k, style: 'comparing' },
            { index: i, style: 'active' },
            ...Array.from({ length: k - 1 }, (_, j) => ({ index: i - k + 1 + j, style: 'found' as const })),
          ]},
          { type: 'bracket', id: 'window', left: i - k + 1, right: i, value: `sum = ${windowSum}` },
        ],
        variables: { window_sum: windowSum, add, remove },
      })

      const prevMaxSum = maxSum
      maxSum = Math.max(maxSum, windowSum)

      steps.push({
        lineNumber: 8,
        description: `max_sum = max(${prevMaxSum}, ${windowSum}) = ${maxSum}`,
        elements: [
          { type: 'array', id: 'nums', values: nums, highlights:
            Array.from({ length: k }, (_, j) => ({ index: i - k + 1 + j, style: 'active' as const }))
          },
        ],
        variables: { window_sum: windowSum, max_sum: maxSum },
      })

      if (steps.length > 30) break
    }

    steps.push({
      lineNumber: 10,
      description: `Complete! Maximum sum = ${maxSum}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { max_sum: maxSum },
      isComplete: true,
    })

    return steps
  },
}

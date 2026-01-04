import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const splitArrayLargestSum: AlgorithmDefinition = {
  id: 'split-array-largest-sum',
  name: 'Split Array Largest Sum',
  category: 'binarySearch',
  difficulty: 'Hard',
  leetcodeId: 410,
  description: 'Split array into k subarrays to minimize the largest subarray sum.',
  timeComplexity: 'O(n log s)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [7,2,5,10,8], k = 2',
      output: '18',
      explanation: 'Split as [7,2,5] and [10,8]. Sums: 14 and 18. Largest = 18.'
    },
    {
      input: 'nums = [1,2,3,4,5], k = 2',
      output: '9',
      explanation: 'Split as [1,2,3,4] and [5]. Sums: 10 and 5. Wait—[1,2,3] and [4,5] = 6 and 9. Largest = 9.'
    },
    {
      input: 'nums = [1,4,4], k = 3',
      output: '4',
      explanation: 'Each element in its own subarray. Largest = 4.'
    },
  ],

  education: {
    tldr: 'Binary search on maximum sum. Check if can split into ≤k parts with that limit.',
    steps: [
      { title: 'Define search range', description: 'Min = max(nums), Max = sum(nums)', code: 'left, right = max(nums), sum(nums)' },
      { title: 'Try mid as limit', description: 'Can we split with max sum ≤ mid?', code: 'if canSplit(mid, k): right = mid' },
      { title: 'Check function', description: 'Greedily pack subarrays under limit', code: 'count splits needed' },
      { title: 'Return left', description: 'Minimum valid maximum sum', code: 'return left' },
    ],
    remember: [
      'Binary search on the answer (max sum)',
      'Min bound = max element (can\'t split smaller)',
      'Max bound = total sum (one subarray)',
    ],
    understanding: `This is another "binary search on the answer" problem. We're searching for the minimum possible "largest subarray sum".

**Key insight:** If we can split the array such that no subarray exceeds X, we can definitely do it for any value > X. Monotonic!

**Search bounds:**
- Lower: max(nums) — even with k=n, each element is its own subarray
- Upper: sum(nums) — one big subarray

**Feasibility check:** Given a limit, greedily fill subarrays until adding next element exceeds limit. Count subarrays needed.`,

    whyPatternWorks: `The problem has monotonic structure:

If max_sum = 18 works with 2 splits:
- 19, 20, 21... all work (looser constraint)
- 17, 16, 15... might need more splits

**Greedy check works because:**
1. Pack current subarray as full as possible
2. When limit exceeded, start new subarray
3. If total subarrays ≤ k, this limit works

**Why greedy is optimal for checking:** Making subarrays as large as possible (under limit) minimizes the number of subarrays needed.`,

    keyInsights: [
      'Binary search on the answer pattern',
      'Search for minimum valid maximum sum',
      'Lower bound: max(nums)',
      'Upper bound: sum(nums)',
      'Greedy check: pack under limit, count splits',
      'O(n log s) where s = sum - max'
    ]
  },

  code: `def splitArray(nums: list[int], k: int) -> int:
    def canSplit(max_sum: int) -> bool:
        subarrays = 1
        curr_sum = 0
        for num in nums:
            if curr_sum + num > max_sum:
                subarrays += 1
                curr_sum = num
            else:
                curr_sum += num
        return subarrays <= k

    left, right = max(nums), sum(nums)

    while left < right:
        mid = (left + right) // 2
        if canSplit(mid):
            right = mid
        else:
            left = mid + 1

    return left`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [7, 2, 5, 10, 8],
      label: 'Array',
      placeholder: '7, 2, 5, 10, 8',
    },
    {
      name: 'k',
      type: 'number',
      default: 2,
      label: 'Number of subarrays (k)',
      placeholder: '2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = input.nums as number[]
    const k = input.k as number
    const steps: AlgorithmStep[] = []

    const canSplit = (maxSum: number): { can: boolean; subarrays: number } => {
      let subarrays = 1
      let currSum = 0
      for (const num of nums) {
        if (currSum + num > maxSum) {
          subarrays++
          currSum = num
        } else {
          currSum += num
        }
      }
      return { can: subarrays <= k, subarrays }
    }

    let left = Math.max(...nums)
    let right = nums.reduce((a, b) => a + b, 0)

    steps.push({
      lineNumber: 10,
      description: `Search range: max_sum ∈ [${left}, ${right}], split into ${k} subarrays`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { left, right, k },
    })

    while (left < right && steps.length < 25) {
      const mid = Math.floor((left + right) / 2)
      const { can, subarrays } = canSplit(mid)

      steps.push({
        lineNumber: 13,
        description: `Try max_sum = ${mid}: need ${subarrays} subarrays`,
        elements: [
          { type: 'array', id: 'nums', values: nums },
        ],
        variables: { mid, subarraysNeeded: subarrays, k, canSplit: can },
      })

      if (can) {
        steps.push({
          lineNumber: 15,
          description: `${subarrays} ≤ ${k}: Can do it! Try smaller max_sum, right = ${mid}`,
          elements: [
            { type: 'array', id: 'nums', values: nums, highlights: nums.map((_, i) => ({ index: i, style: 'found' as const })) },
          ],
          variables: { action: 'right = mid', newRight: mid },
        })
        right = mid
      } else {
        steps.push({
          lineNumber: 17,
          description: `${subarrays} > ${k}: Need more splits! Increase max_sum, left = ${mid + 1}`,
          elements: [
            { type: 'array', id: 'nums', values: nums, highlights: nums.map((_, i) => ({ index: i, style: 'comparing' as const })) },
          ],
          variables: { action: 'left = mid + 1', newLeft: mid + 1 },
        })
        left = mid + 1
      }
    }

    steps.push({
      lineNumber: 19,
      description: `Complete! Minimum largest sum = ${left}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { result: left },
      isComplete: true,
    })

    return steps
  },
}

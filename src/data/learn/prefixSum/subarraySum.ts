import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const subarraySum: AlgorithmDefinition = {
  id: 'subarray-sum-equals-k',
  name: 'Subarray Sum Equals K',
  category: 'prefixSum',
  difficulty: 'Medium',
  leetcodeId: 560,
  description: 'Count subarrays with sum equal to k using prefix sum + hashmap.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  code: `def subarraySum(nums: list[int], k: int) -> int:
    count = 0
    prefix_sum = 0
    seen = {0: 1}

    for num in nums:
        prefix_sum += num
        if prefix_sum - k in seen:
            count += seen[prefix_sum - k]
        seen[prefix_sum] = seen.get(prefix_sum, 0) + 1

    return count`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '1,1,1',
      label: 'Array',
      placeholder: '1,1,1',
    },
    {
      name: 'k',
      type: 'number',
      default: 2,
      label: 'Target Sum K',
      placeholder: '2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const k = input.k as number
    const steps: AlgorithmStep[] = []

    let count = 0
    let prefixSum = 0
    const seen = new Map<number, number>([[0, 1]])

    steps.push({
      lineNumber: 4,
      description: `Initialize: count=0, prefix=0, seen={0:1}, k=${k}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { k, count, prefixSum, seen: Object.fromEntries(seen) },
    })

    for (let i = 0; i < nums.length && steps.length < 20; i++) {
      prefixSum += nums[i]

      const target = prefixSum - k
      if (seen.has(target)) {
        count += seen.get(target)!
        steps.push({
          lineNumber: 9,
          description: `prefix=${prefixSum}, need ${target} (found ${seen.get(target)}x), count+=${seen.get(target)}`,
          elements: [
            { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }], styles: nums.map((_, j) => j <= i ? 'found' as const : 'default' as const) },
          ],
          variables: { prefixSum, target, found: seen.get(target), count },
        })
      } else {
        steps.push({
          lineNumber: 8,
          description: `prefix=${prefixSum}, need ${target} (not in seen)`,
          elements: [
            { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
          ],
          variables: { prefixSum, target, found: 0 },
        })
      }

      seen.set(prefixSum, (seen.get(prefixSum) || 0) + 1)
    }

    steps.push({
      lineNumber: 12,
      description: `Complete! Found ${count} subarrays with sum ${k}`,
      elements: [
        { type: 'array', id: 'nums', values: nums, styles: nums.map(() => 'found' as const) },
      ],
      variables: { result: count },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const maxSumDistinctSubarrays: AlgorithmDefinition = {
  id: 'max-sum-distinct-subarrays-k',
  name: 'Max Sum of Distinct Subarrays of Size K',
  category: 'slidingWindow',
  difficulty: 'Medium',
  leetcodeId: 2461,
  description: 'Find maximum sum of a subarray of size k with all distinct elements.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(k)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [1, 5, 4, 2, 9, 9, 9], k = 3',
      output: '15',
      explanation: '[1, 5, 4] or [5, 4, 2] or [4, 2, 9] all have distinct elements. [5, 4, 2] and [4, 2, 9] have sum 11 and 15.'
    },
    {
      input: 'nums = [4, 4, 4], k = 3',
      output: '0',
      explanation: 'No subarray of size 3 has all distinct elements.'
    },
  ],

  education: {
    tldr: 'Fixed window + set for uniqueness. Only count sum when window has k distinct elements.',
    steps: [
      { title: 'Fixed window size', description: 'Maintain exactly k elements', code: 'window_size = k' },
      { title: 'Track elements', description: 'Use set (or map with counts)', code: 'element_set or element_count' },
      { title: 'Check distinct', description: 'Only valid if set size == k', code: 'if len(set) == k: update max' },
      { title: 'Handle duplicates', description: 'When adding duplicate, don\'t increment distinct', code: 'count[num]++ tracks frequency' },
    ],
    remember: [
      'Fixed window of size k',
      'Need ALL k elements distinct',
      'Use count map for sliding (add/remove)',
    ],
    understanding: `This combines fixed-size sliding window with a uniqueness constraint.

**Two conditions for valid window:**
1. Size exactly k
2. All k elements are distinct

**Why a map instead of set?** When sliding, we need to know if an element appears multiple times. A set can't tell us if the outgoing element was a duplicate or unique.

**Using counts:** count[x] = frequency of x in window. When count goes to 0, element leaves; when it goes from 0→1, element enters.`,

    whyPatternWorks: `Fixed-size window with validity constraint:

1. Slide window of size k
2. Maintain element frequency map
3. Track count of distinct elements
4. When distinct == k, window is valid—update max sum`,

    keyInsights: [
      'Fixed window + distinctness constraint',
      'Frequency map tracks duplicates',
      'distinct_count == k means valid window',
      'Update distinct count on add/remove',
      'O(n) time, O(k) space for the map'
    ]
  },

  code: `def maximumSubarraySum(nums: list[int], k: int) -> int:
    from collections import defaultdict

    count = defaultdict(int)
    window_sum = 0
    max_sum = 0

    for i in range(len(nums)):
        # Add right element
        count[nums[i]] += 1
        window_sum += nums[i]

        # Remove left element if window > k
        if i >= k:
            left_num = nums[i - k]
            count[left_num] -= 1
            if count[left_num] == 0:
                del count[left_num]
            window_sum -= left_num

        # Check if valid (size k and all distinct)
        if i >= k - 1 and len(count) == k:
            max_sum = max(max_sum, window_sum)

    return max_sum`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [1, 5, 4, 2, 9, 9, 9],
      label: 'Numbers',
      placeholder: '1, 5, 4, 2, 9, 9, 9',
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

    const count: Record<number, number> = {}
    let windowSum = 0
    let maxSum = 0

    steps.push({
      lineNumber: 4,
      description: `Find max sum of subarrays with k=${k} distinct elements`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { k, max_sum: 0 },
    })

    for (let i = 0; i < nums.length; i++) {
      // Add right element
      count[nums[i]] = (count[nums[i]] || 0) + 1
      windowSum += nums[i]

      // Remove left element if window > k
      if (i >= k) {
        const leftNum = nums[i - k]
        count[leftNum]--
        if (count[leftNum] === 0) {
          delete count[leftNum]
        }
        windowSum -= leftNum
      }

      const distinctCount = Object.keys(count).length
      const isValid = i >= k - 1 && distinctCount === k

      steps.push({
        lineNumber: 9,
        description: `Window [${Math.max(0, i - k + 1)}..${i}]: sum=${windowSum}, distinct=${distinctCount}${isValid ? ' (valid)' : ''}`,
        elements: [
          { type: 'array', id: 'nums', values: nums, highlights:
            i >= k - 1
              ? Array.from({ length: k }, (_, j) => ({ index: i - k + 1 + j, style: isValid ? 'found' as const : 'active' as const }))
              : Array.from({ length: i + 1 }, (_, j) => ({ index: j, style: 'active' as const }))
          },
          ...(i >= k - 1 ? [{ type: 'bracket' as const, id: 'window', left: i - k + 1, right: i, value: `sum=${windowSum}` }] : []),
        ],
        variables: { window_sum: windowSum, distinct: distinctCount, valid: isValid },
      })

      if (isValid && windowSum > maxSum) {
        maxSum = windowSum
        steps.push({
          lineNumber: 22,
          description: `New max! ${maxSum}`,
          elements: [
            { type: 'array', id: 'nums', values: nums, highlights:
              Array.from({ length: k }, (_, j) => ({ index: i - k + 1 + j, style: 'found' as const }))
            },
          ],
          variables: { max_sum: maxSum },
        })
      }

      if (steps.length > 25) break
    }

    steps.push({
      lineNumber: 24,
      description: `Complete! Max sum with ${k} distinct = ${maxSum}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { max_sum: maxSum },
      isComplete: true,
    })

    return steps
  },
}

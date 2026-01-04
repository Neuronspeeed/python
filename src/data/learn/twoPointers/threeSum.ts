import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const threeSum: AlgorithmDefinition = {
  id: 'three-sum',
  name: '3Sum',
  category: 'twoPointers',
  difficulty: 'Medium',
  leetcodeId: 15,
  description: 'Find all unique triplets in the array that sum to zero.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [-1, 0, 1, 2, -1, -4]',
      output: '[[-1, -1, 2], [-1, 0, 1]]',
      explanation: 'After sorting: [-4, -1, -1, 0, 1, 2]. Two unique triplets sum to zero.'
    },
    {
      input: 'nums = [0, 1, 1]',
      output: '[]',
      explanation: 'No three numbers sum to zero.'
    },
    {
      input: 'nums = [0, 0, 0]',
      output: '[[0, 0, 0]]',
      explanation: 'Three zeros sum to zero.'
    },
  ],

  education: {
    tldr: 'Sort, fix one number, use two pointers to find pairs that sum to its negative.',
    steps: [
      { title: 'Sort array', description: 'Enables two-pointer technique', code: 'nums.sort()' },
      { title: 'Fix first number', description: 'Loop through as anchor point', code: 'for i in range(n-2)' },
      { title: 'Two-pointer search', description: 'Find pairs summing to -nums[i]', code: 'left=i+1, right=n-1' },
      { title: 'Skip duplicates', description: 'Avoid duplicate triplets', code: 'if nums[i] == nums[i-1]: continue' },
    ],
    remember: [
      'Sort first, fix one, two-pointer the rest',
      'Skip duplicates at ALL levels (i, left, right)',
      'Target for inner search = -nums[i]',
    ],
    understanding: `3Sum reduces to multiple 2Sum problems. For each number nums[i], we need to find two other numbers that sum to -nums[i].

**Why sort?** Sorting enables:
1. Two-pointer technique for the inner search (O(n) instead of O(n²))
2. Easy duplicate detection (duplicates are adjacent)

**Why skip duplicates?** The problem asks for unique triplets. After sorting, if nums[i] == nums[i-1], we'd find the same triplets again.

**Early termination:** If nums[i] > 0, we can stop—three positive numbers can't sum to zero.`,

    whyPatternWorks: `3Sum demonstrates how to decompose a harder problem into a known pattern:

1. **Reduce complexity:** O(n³) brute force → O(n²) with sorting + two pointers
2. **Anchor + Search:** Fix one variable, solve a simpler subproblem
3. **Duplicate handling:** Sorting clusters duplicates together

This "fix one, search for complement" pattern appears in many sum problems (4Sum, kSum, etc.).`,

    keyInsights: [
      '3Sum = loop + 2Sum for each element',
      'Sorting is O(n log n), dominated by O(n²) search',
      'Must skip duplicates at outer loop AND inner pointers',
      'Early exit when nums[i] > 0 (no positive-only triplet sums to 0)',
      'Space is O(1) excluding output array'
    ]
  },

  code: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        # Skip duplicates for first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, len(nums) - 1

        while left < right:
            total = nums[i] + nums[left] + nums[right]

            if total < 0:
                left += 1
            elif total > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1

    return result`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [-1, 0, 1, 2, -1, -4],
      label: 'Numbers',
      placeholder: '-1, 0, 1, 2, -1, -4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = [...(input.nums as number[])].sort((a, b) => a - b)
    const steps: AlgorithmStep[] = []
    const result: number[][] = []

    steps.push({
      lineNumber: 2,
      description: `Sort array: [${nums.join(', ')}]`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { sorted: nums, result: [] },
    })

    for (let i = 0; i < nums.length - 2; i++) {
      if (i > 0 && nums[i] === nums[i - 1]) {
        steps.push({
          lineNumber: 7,
          description: `Skip duplicate: nums[${i}] = ${nums[i]} equals previous`,
          elements: [
            { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: i, style: 'comparing' },
              { index: i - 1, style: 'comparing' },
            ]},
          ],
          variables: { i, skipped: true },
        })
        continue
      }

      let left = i + 1
      let right = nums.length - 1

      steps.push({
        lineNumber: 10,
        description: `Fix nums[${i}] = ${nums[i]}, set left = ${left}, right = ${right}`,
        elements: [
          { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'nums', values: nums, highlights: [
            { index: i, style: 'active' },
          ]},
        ],
        variables: { i, left, right, target: -nums[i] },
      })

      while (left < right) {
        const total = nums[i] + nums[left] + nums[right]

        steps.push({
          lineNumber: 13,
          description: `Sum: ${nums[i]} + ${nums[left]} + ${nums[right]} = ${total}`,
          elements: [
            { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: i, style: 'active' },
              { index: left, style: 'active' },
              { index: right, style: 'active' },
            ]},
          ],
          variables: { i, left, right, total, resultCount: result.length },
        })

        if (total < 0) {
          steps.push({
            lineNumber: 16,
            description: `Sum ${total} < 0, move left pointer right`,
            elements: [
              { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: left, style: 'comparing' },
              ]},
            ],
            variables: { total, action: 'left++' },
          })
          left++
        } else if (total > 0) {
          steps.push({
            lineNumber: 18,
            description: `Sum ${total} > 0, move right pointer left`,
            elements: [
              { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: right, style: 'comparing' },
              ]},
            ],
            variables: { total, action: 'right--' },
          })
          right--
        } else {
          result.push([nums[i], nums[left], nums[right]])
          steps.push({
            lineNumber: 20,
            description: `Found triplet! [${nums[i]}, ${nums[left]}, ${nums[right]}]`,
            elements: [
              { type: 'pointer', id: 'i', index: i, label: 'i', color: '#EF4444' },
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: i, style: 'found' },
                { index: left, style: 'found' },
                { index: right, style: 'found' },
              ]},
            ],
            variables: { triplet: `[${nums[i]}, ${nums[left]}, ${nums[right]}]`, resultCount: result.length },
          })

          while (left < right && nums[left] === nums[left + 1]) left++
          while (left < right && nums[right] === nums[right - 1]) right--
          left++
          right--
        }

        if (steps.length > 50) break
      }
      if (steps.length > 50) break
    }

    steps.push({
      lineNumber: 28,
      description: `Complete! Found ${result.length} triplets`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { resultCount: result.length },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const validTriangleNumber: AlgorithmDefinition = {
  id: 'valid-triangle-number',
  name: 'Valid Triangle Number',
  category: 'twoPointers',
  difficulty: 'Medium',
  leetcodeId: 611,
  description: 'Given an array of integers, count how many triplets can form valid triangles.',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [2, 2, 3, 4]',
      output: '3',
      explanation: 'Valid triangles: (2,3,4), (2,2,3), (2,2,4). Each satisfies a + b > c.'
    },
    {
      input: 'nums = [4, 2, 3, 4]',
      output: '4',
      explanation: 'After sorting [2,3,4,4]: four valid triplet combinations.'
    },
  ],

  education: {
    tldr: 'Sort, fix largest side, use two pointers to count pairs where a + b > c.',
    steps: [
      { title: 'Sort array', description: 'Enables triangle inequality shortcut', code: 'nums.sort()' },
      { title: 'Fix largest (c)', description: 'Iterate from end backward', code: 'for k in range(n-1, 1, -1)' },
      { title: 'Two-pointer pairs', description: 'Find all (a,b) where a + b > c', code: 'left=0, right=k-1' },
      { title: 'Count valid pairs', description: 'If valid, all pairs in range work', code: 'count += right - left' },
    ],
    remember: [
      'Triangle inequality: a + b > c (when sorted)',
      'Fix the LARGEST side, search for smaller pairs',
      'When valid: ALL pairs between pointers work',
    ],
    understanding: `A valid triangle requires: sum of any two sides > third side. But if we sort so a ≤ b ≤ c, we only need to check **a + b > c**. The other inequalities (a + c > b, b + c > a) are automatically true.

**Why fix the largest side?** When we fix c as the largest, we search for pairs (a, b) where a + b > c. If nums[left] + nums[right] > c, then ALL pairs from left to right-1 also satisfy this (since they have even larger left values).

**The counting trick:** When a + b > c, we don't check each pair individually. We know there are (right - left) valid pairs. Then we move right down to find more.`,

    whyPatternWorks: `This combines two powerful techniques:

1. **Triangle inequality simplification:** Sorting reduces 3 conditions to 1
2. **Batch counting:** When the inequality holds, we count multiple pairs at once

The key insight: if nums[left] + nums[right] > nums[k], then for any i in [left, right-1], nums[i] + nums[right] > nums[k] too (since nums[i] >= nums[left]).`,

    keyInsights: [
      'Sort to simplify: only check a + b > c',
      'Fix largest side, search for valid smaller pairs',
      'When inequality holds, count ALL pairs in range',
      'Move right down after counting (to find more pairs)',
      'Move left up when inequality fails (need larger sum)'
    ]
  },

  code: `def triangleNumber(nums: list[int]) -> int:
    nums.sort()
    count = 0
    n = len(nums)

    # Fix the largest side (c)
    for k in range(n - 1, 1, -1):
        left, right = 0, k - 1

        while left < right:
            if nums[left] + nums[right] > nums[k]:
                # All pairs from left to right-1 are valid
                count += right - left
                right -= 1
            else:
                left += 1

    return count`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [2, 2, 3, 4],
      label: 'Side Lengths',
      placeholder: '2, 2, 3, 4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = [...(input.nums as number[])].sort((a, b) => a - b)
    const steps: AlgorithmStep[] = []
    let count = 0
    const n = nums.length

    steps.push({
      lineNumber: 2,
      description: `Sort array: [${nums.join(', ')}]`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { sorted: nums, count: 0 },
    })

    for (let k = n - 1; k > 1; k--) {
      let left = 0
      let right = k - 1

      steps.push({
        lineNumber: 7,
        description: `Fix largest side: nums[${k}] = ${nums[k]}. Two pointers: left = 0, right = ${right}`,
        elements: [
          { type: 'pointer', id: 'k', index: k, label: 'c', color: '#EF4444' },
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'nums', values: nums, highlights: [
            { index: k, style: 'active' },
          ]},
        ],
        variables: { k, left, right, count },
      })

      while (left < right) {
        const sum = nums[left] + nums[right]
        const isValid = sum > nums[k]

        steps.push({
          lineNumber: 10,
          description: `Check: ${nums[left]} + ${nums[right]} = ${sum} ${isValid ? '>' : '≤'} ${nums[k]}`,
          elements: [
            { type: 'pointer', id: 'k', index: k, label: 'c', color: '#EF4444' },
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: left, style: isValid ? 'found' : 'comparing' },
              { index: right, style: isValid ? 'found' : 'comparing' },
              { index: k, style: 'active' },
            ]},
          ],
          variables: { sum, isValid, count },
        })

        if (isValid) {
          const added = right - left
          count += added

          steps.push({
            lineNumber: 12,
            description: `Valid! Add ${added} triangles (all pairs from L to R-1). Total: ${count}`,
            elements: [
              { type: 'pointer', id: 'k', index: k, label: 'c', color: '#EF4444' },
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums },
            ],
            variables: { added, count },
          })
          right--
        } else {
          left++
        }

        if (steps.length > 35) break
      }
      if (steps.length > 35) break
    }

    steps.push({
      lineNumber: 17,
      description: `Complete! Total valid triangles: ${count}`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { count },
      isComplete: true,
    })

    return steps
  },
}

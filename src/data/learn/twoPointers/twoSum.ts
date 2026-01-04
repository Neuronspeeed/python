import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const twoSumSorted: AlgorithmDefinition = {
  id: 'two-sum-sorted',
  name: 'Two Sum II (Sorted Array)',
  category: 'twoPointers',
  difficulty: 'Medium',
  leetcodeId: 167,
  description: 'Find two numbers in a sorted array that add up to a target sum.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'numbers = [2, 7, 11, 15], target = 9',
      output: '[1, 2]',
      explanation: 'numbers[0] + numbers[1] = 2 + 7 = 9. Return indices [1, 2] (1-indexed).'
    },
    {
      input: 'numbers = [2, 3, 4], target = 6',
      output: '[1, 3]',
      explanation: 'numbers[0] + numbers[2] = 2 + 4 = 6.'
    },
  ],

  education: {
    tldr: 'Use sorted order: sum too small? move left. Sum too big? move right.',
    steps: [
      { title: 'Start at ends', description: 'Pointers at first and last element', code: 'left=0, right=len-1' },
      { title: 'Check sum', description: 'Add the two pointer values', code: 'sum = nums[L] + nums[R]' },
      { title: 'Adjust pointers', description: 'Too small → move left up. Too big → move right down', code: 'if sum < target: L++ else: R--' },
      { title: 'Found it!', description: 'When sum equals target, return indices', code: 'if sum == target: return [L, R]' },
    ],
    remember: [
      'Array MUST be sorted',
      'Too small → move left up (get bigger number)',
      'Too big → move right down (get smaller number)',
    ],
    understanding: `This is the classic introduction to two pointers. Given a **sorted** array, find two numbers that add up to a target.

**Why sorted matters:** In a sorted array, we know that moving left→right increases values, and moving right→left decreases them. This gives us a decision rule: if our current sum is too small, we need a bigger number (move left pointer right). If it's too big, we need a smaller number (move right pointer left).

**Why start at the ends?** Starting at opposite ends gives us the maximum range to work with. We can systematically eliminate possibilities by narrowing inward.`,

    whyPatternWorks: `The sorted property is what makes this O(n) instead of O(n²). Without sorting, we'd have to check every pair.

With sorting, each pointer movement eliminates an entire row or column of possibilities:
- Moving left pointer right eliminates all pairs involving the current left position
- Moving right pointer left eliminates all pairs involving the current right position

We never backtrack, so we visit at most n positions total.`,

    keyInsights: [
      'Sorting enables intelligent elimination of possibilities',
      'Each step eliminates many pairs at once',
      'Two pointers from opposite ends converge toward the answer',
      'The decision (left++ or right--) is deterministic based on comparison',
      'Never need to backtrack—each move is provably correct'
    ]
  },

  code: `def twoSum(numbers: list[int], target: int) -> list[int]:
    left, right = 0, len(numbers) - 1

    while left < right:
        current_sum = numbers[left] + numbers[right]

        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1

    return []`,

  inputs: [
    {
      name: 'numbers',
      type: 'array',
      default: [2, 7, 11, 15],
      label: 'Sorted Array',
      placeholder: '2, 7, 11, 15',
    },
    {
      name: 'target',
      type: 'number',
      default: 9,
      label: 'Target',
      placeholder: '9',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numbers = input.numbers as number[]
    const target = input.target as number
    const steps: AlgorithmStep[] = []
    let left = 0
    let right = numbers.length - 1

    steps.push({
      lineNumber: 2,
      description: `Initialize pointers: left = 0, right = ${right}. Target = ${target}`,
      elements: [
        { type: 'pointer', id: 'left', index: 0, label: 'L', color: '#16A34A' },
        { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
        { type: 'array', id: 'nums', values: numbers },
      ],
      variables: { left: 0, right, target },
    })

    while (left < right) {
      const currentSum = numbers[left] + numbers[right]

      steps.push({
        lineNumber: 5,
        description: `Calculate sum: ${numbers[left]} + ${numbers[right]} = ${currentSum}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'nums', values: numbers, highlights: [
            { index: left, style: 'active' },
            { index: right, style: 'active' },
          ]},
          { type: 'bracket', id: 'sum', left, right, value: `sum = ${currentSum}` },
        ],
        variables: { left, right, current_sum: currentSum, target },
      })

      if (currentSum === target) {
        steps.push({
          lineNumber: 8,
          description: `Found! ${numbers[left]} + ${numbers[right]} = ${target}. Return [${left + 1}, ${right + 1}]`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: numbers, highlights: [
              { index: left, style: 'found' },
              { index: right, style: 'found' },
            ]},
          ],
          variables: { result: [left + 1, right + 1] },
          isComplete: true,
        })
        return steps
      } else if (currentSum < target) {
        steps.push({
          lineNumber: 10,
          description: `Sum ${currentSum} < target ${target}, need larger sum. Move left pointer right.`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: numbers, highlights: [
              { index: left, style: 'comparing' },
            ]},
          ],
          variables: { left, right, current_sum: currentSum },
        })
        left++
      } else {
        steps.push({
          lineNumber: 12,
          description: `Sum ${currentSum} > target ${target}, need smaller sum. Move right pointer left.`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: numbers, highlights: [
              { index: right, style: 'comparing' },
            ]},
          ],
          variables: { left, right, current_sum: currentSum },
        })
        right--
      }
    }

    steps.push({
      lineNumber: 14,
      description: 'No pair found that sums to target.',
      elements: [
        { type: 'array', id: 'nums', values: numbers },
      ],
      variables: { result: [] },
      isComplete: true,
    })

    return steps
  },
}

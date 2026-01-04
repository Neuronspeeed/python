import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const trappingRainWater: AlgorithmDefinition = {
  id: 'trapping-rain-water',
  name: 'Trapping Rain Water',
  category: 'twoPointers',
  difficulty: 'Hard',
  leetcodeId: 42,
  description: 'Calculate how much water can be trapped between bars after raining.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]',
      output: '6',
      explanation: 'Water fills the valleys between bars. Total trapped = 6 units.'
    },
    {
      input: 'height = [4, 2, 0, 3, 2, 5]',
      output: '9',
      explanation: 'Deep valley between heights 4 and 5 traps significant water.'
    },
  ],

  education: {
    tldr: 'Water at any position = min(max_left, max_right) - height. Use two pointers to track maxes.',
    steps: [
      { title: 'Start at ends', description: 'Pointers at first and last position', code: 'left=0, right=n-1' },
      { title: 'Track maxes', description: 'Keep running max from each side', code: 'left_max, right_max' },
      { title: 'Process shorter side', description: 'Water level bounded by shorter max', code: 'if left_max < right_max: process left' },
      { title: 'Add water', description: 'Water at position = max - height', code: 'water += max - height[i]' },
    ],
    remember: [
      'Water level = min(left_max, right_max)',
      'Process the side with smaller max',
      'Water at position = level - bar height',
    ],
    understanding: `At each bar, water can rise to the level of the shorter of the two tallest bars on either side. Any higher and it would overflow.

**The insight:** If left_max < right_max, we know water at left position is bounded by left_max (regardless of what's between current positions). We can safely calculate water there and move on.

**Why process the shorter side?** Whichever side has the smaller max determines the water level at that position. The other side's max doesn't matter—water would overflow at the smaller level.

**Why O(1) space?** We only need to track left_max and right_max, not store all maxes.`,

    whyPatternWorks: `This is a beautiful example of using two pointers to replace preprocessing:

**Naive approach:** Precompute left_max[] and right_max[] arrays (O(n) space)
**Two-pointer approach:** Compute maxes on-the-fly using convergent pointers

The key insight: when left_max < right_max, we don't need to know the exact right_max—we just need to know it's larger. This lets us process left position immediately.`,

    keyInsights: [
      'Water at any bar = min(tallest_left, tallest_right) - bar_height',
      'Process whichever side has smaller max (that max determines water level)',
      'Running maxes replace O(n) preprocessing',
      'Converging pointers eliminate need to look ahead',
      'Classic optimization from O(n) space to O(1)'
    ]
  },

  code: `def trap(height: list[int]) -> int:
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0

    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]

    return water`,

  inputs: [
    {
      name: 'height',
      type: 'array',
      default: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      label: 'Heights',
      placeholder: '0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const height = input.height as number[]
    const steps: AlgorithmStep[] = []

    if (!height.length) {
      steps.push({
        lineNumber: 3,
        description: 'Empty array, return 0',
        elements: [],
        variables: { water: 0 },
        isComplete: true,
      })
      return steps
    }

    let left = 0
    let right = height.length - 1
    let leftMax = height[left]
    let rightMax = height[right]
    let water = 0

    steps.push({
      lineNumber: 6,
      description: `Initialize: left = 0, right = ${right}, left_max = ${leftMax}, right_max = ${rightMax}`,
      elements: [
        { type: 'pointer', id: 'left', index: 0, label: 'L', color: '#16A34A' },
        { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
        { type: 'array', id: 'heights', values: height },
      ],
      variables: { left: 0, right, left_max: leftMax, right_max: rightMax, water: 0 },
    })

    while (left < right) {
      if (leftMax < rightMax) {
        left++
        leftMax = Math.max(leftMax, height[left])
        const trapped = leftMax - height[left]
        water += trapped

        steps.push({
          lineNumber: 12,
          description: `left_max (${leftMax}) < right_max (${rightMax}): move left. Water at [${left}] = ${leftMax} - ${height[left]} = ${trapped}`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'heights', values: height, highlights: [
              { index: left, style: trapped > 0 ? 'found' : 'active' },
            ]},
          ],
          variables: { left, right, left_max: leftMax, right_max: rightMax, water, trapped },
        })
      } else {
        right--
        rightMax = Math.max(rightMax, height[right])
        const trapped = rightMax - height[right]
        water += trapped

        steps.push({
          lineNumber: 16,
          description: `left_max (${leftMax}) >= right_max (${rightMax}): move right. Water at [${right}] = ${rightMax} - ${height[right]} = ${trapped}`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'heights', values: height, highlights: [
              { index: right, style: trapped > 0 ? 'found' : 'active' },
            ]},
          ],
          variables: { left, right, left_max: leftMax, right_max: rightMax, water, trapped },
        })
      }

      if (steps.length > 40) break
    }

    steps.push({
      lineNumber: 19,
      description: `Complete! Total water trapped: ${water} units`,
      elements: [
        { type: 'array', id: 'heights', values: height },
      ],
      variables: { water },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const containerWithMostWater: AlgorithmDefinition = {
  id: 'container-with-most-water',
  name: 'Container With Most Water',
  category: 'twoPointers',
  difficulty: 'Medium',
  leetcodeId: 11,
  description: 'Each number in `heights` is a vertical bar. Choose two bars as the walls of a water tank. Find the pair that holds the most water.\n\n**Capacity** = distance between walls × height of the shorter wall (water spills over the lower edge).',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'heights = [3, 4, 1, 2, 2, 4, 1, 3, 2]',
      output: '21',
      explanation: 'Walls at indices 0 and 7 (both height 3): width=7, height=3, area=21'
    },
    {
      input: 'heights = [1, 2, 1]',
      output: '2',
      explanation: 'Walls at indices 0 and 2: width=2, height=min(1,1)=1, area=2'
    },
  ],

  education: {
    // ADHD-friendly fields
    tldr: 'Widest first, then shrink by moving the shorter side.',
    steps: [
      { title: 'Initialize', description: 'Place pointers at opposite ends', code: 'left=0, right=len-1' },
      { title: 'Compute', description: 'Area = distance × smaller height', code: 'area = (R-L) × min(h[L], h[R])' },
      { title: 'Decide', description: 'Shorter wall blocks us—move that one', code: 'if h[L] < h[R]: L++ else R--' },
      { title: 'Record', description: 'Update best if current beats it', code: 'best = max(best, area)' },
    ],
    remember: [
      'Shorter wall = bottleneck',
      'area = gap × min(walls)',
      'Linear time, constant space'
    ],

    // Detailed explanations
    understanding: `Think of each array value as a vertical bar. Pick any two bars as walls of a tank. The goal: find which pair holds the most water.

**How do we measure capacity?**
- **Gap**: Distance between the walls (\`right - left\`)
- **Limit**: The shorter wall determines max water level

**Why does the short wall matter?** Water rises until it spills over the lower edge. A 10-unit wall paired with a 3-unit wall? You only get 3 units of height—the rest overflows.

**Formula**: \`capacity = gap × min(wall_left, wall_right)\``,

    whyPatternWorks: `Two-pointer usually implies sorted data, but that's not the real requirement. The technique works when we can **rule out options** based on pointer positions.

Here, sorting doesn't help—but starting at maximum width does. From the edges, we ask: "Can narrowing improve things?"

**The key observation**: If the left wall is shorter, every narrower container using that same left wall will be worse (less width, same height cap). So we abandon that wall and try the next one.

This lets us skip checking \`O(n²)\` pairs by eliminating groups at once.`,

    explanation: `Each iteration either finds a better container or proves a batch of containers can't win.

**The decision rule**: Look at your current pair. The shorter wall caps your height. Moving the taller wall inward means less width but identical height limit—guaranteed loss or tie. Moving the shorter wall might find something taller to compensate for lost width.

**Why it's correct**: When we move past the shorter wall, we're discarding all pairs that included it. None of those could beat our current best because they'd have the same height constraint but less width.

One pass through the array. Every pair that matters gets considered. Every pair that doesn't gets skipped with proof.`,

    keyInsights: [
      'Begin at maximum width (both ends)',
      'Capacity = gap × shorter wall',
      'The short wall is always the limiting factor',
      'Moving the tall wall cannot help (same limit, less space)',
      'Each step eliminates multiple inferior pairs',
      'Works on unsorted data—logic is about elimination, not order'
    ]
  },

  code: `def maxArea(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        area = width * h
        max_water = max(max_water, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water`,

  inputs: [
    {
      name: 'height',
      type: 'array',
      default: [3, 4, 1, 2, 2, 4, 1, 3, 2],
      label: 'Heights',
      placeholder: '3, 4, 1, 2, 2, 4, 1, 3, 2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const height = input.height as number[]
    const steps: AlgorithmStep[] = []
    let left = 0
    let right = height.length - 1
    let maxWater = 0

    // Initial state
    steps.push({
      lineNumber: 2,
      description: `Initialize pointers: left = 0, right = ${right}`,
      elements: [
        { type: 'pointer', id: 'left', index: 0, label: 'L', color: '#16A34A' },
        { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
        { type: 'array', id: 'heights', values: height, showBars: true },
      ],
      variables: { left: 0, right, max_water: 0 },
    })

    while (left < right) {
      const width = right - left
      const h = Math.min(height[left], height[right])
      const area = width * h

      steps.push({
        lineNumber: 6,
        description: `Calculate: width = ${width}, height = min(${height[left]}, ${height[right]}) = ${h}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'heights', values: height, showBars: true, highlights: [
            { index: left, style: 'active' },
            { index: right, style: 'active' },
          ]},
          { type: 'bracket', id: 'area', left, right, value: `area = ${area}` },
        ],
        variables: { left, right, width, h, area, max_water: maxWater },
      })

      const prevMaxWater = maxWater
      maxWater = Math.max(maxWater, area)

      steps.push({
        lineNumber: 9,
        description: `Update max_water = max(${prevMaxWater}, ${area}) = ${maxWater}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'heights', values: height, showBars: true, highlights: [
            { index: left, style: 'active' },
            { index: right, style: 'active' },
          ]},
        ],
        variables: { left, right, max_water: maxWater },
      })

      if (height[left] < height[right]) {
        steps.push({
          lineNumber: 11,
          description: `height[${left}] = ${height[left]} < height[${right}] = ${height[right]}, move left pointer`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'heights', values: height, showBars: true, highlights: [
              { index: left, style: 'comparing' },
            ]},
          ],
          variables: { left, right, max_water: maxWater },
        })
        left++
      } else {
        steps.push({
          lineNumber: 13,
          description: `height[${left}] = ${height[left]} >= height[${right}] = ${height[right]}, move right pointer`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'heights', values: height, showBars: true, highlights: [
              { index: right, style: 'comparing' },
            ]},
          ],
          variables: { left, right, max_water: maxWater },
        })
        right--
      }
    }

    steps.push({
      lineNumber: 15,
      description: `Pointers crossed! Maximum water found: ${maxWater}`,
      elements: [
        { type: 'array', id: 'heights', values: height, showBars: true },
      ],
      variables: { max_water: maxWater },
      isComplete: true,
    })

    return steps
  },
}

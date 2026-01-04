import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const largestRectangle: AlgorithmDefinition = {
  id: 'largest-rectangle-histogram',
  name: 'Largest Rectangle in Histogram',
  category: 'stack',
  difficulty: 'Hard',
  leetcodeId: 84,
  description: 'Find the largest rectangular area in a histogram.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 'heights = [2, 1, 5, 6, 2, 3]',
      output: '10',
      explanation: 'The largest rectangle is between bars of height 5 and 6, area = 5 × 2 = 10.'
    },
    {
      input: 'heights = [2, 4]',
      output: '4',
      explanation: 'Either take bar of height 4 (area=4) or both bars at height 2 (area=4).'
    },
  ],

  education: {
    tldr: 'Monotonic increasing stack. When bar is shorter, pop and calculate area.',
    steps: [
      { title: 'Process each bar', description: 'Compare to stack top', code: 'for i, h in enumerate(heights)' },
      { title: 'While current is shorter', description: 'Pop and calculate area', code: 'while stack and stack[-1][1] > h' },
      { title: 'Calculate area', description: 'Height × width (current_i - start_i)', code: 'area = height * (i - idx)' },
      { title: 'Push with extended start', description: 'Bar can extend left to popped positions', code: 'stack.append((start, h))' },
    ],
    remember: [
      'Stack stores (index, height)',
      'Pop when shorter bar found',
      'Extend start position leftward after popping',
    ],
    understanding: `For each bar, we want to find the MAXIMUM width it can extend to while maintaining its height.

**Key insight:** A bar can extend left until it hits a shorter bar. It can extend right until it hits a shorter bar.

**Why monotonic increasing stack?** We maintain bars in increasing height order. When we see a shorter bar, all taller bars in the stack can't extend further right—we pop and calculate their areas.

**The "start" trick:** When we pop bars, the current bar can extend left to those positions. We update its start index accordingly.`,

    whyPatternWorks: `The stack helps us find the "span" of each bar:

1. When a bar is popped, its RIGHT boundary is the current bar
2. Its LEFT boundary is where it was pushed (or extended to)
3. Width = right - left, Area = height × width

**Final cleanup:** Bars remaining in the stack can extend all the way to the right end—process them after the loop.`,

    keyInsights: [
      'Monotonic increasing stack pattern',
      'Pop determines right boundary',
      'Push position determines left boundary',
      'Start position extends leftward after pops',
      'Process remaining stack at end (right boundary = length)',
      'O(n) time: each bar pushed and popped once'
    ]
  },

  code: `def largestRectangleArea(heights: list[int]) -> int:
    stack = []  # (index, height)
    max_area = 0

    for i, h in enumerate(heights):
        start = i
        while stack and stack[-1][1] > h:
            idx, height = stack.pop()
            area = height * (i - idx)
            max_area = max(max_area, area)
            start = idx
        stack.append((start, h))

    # Process remaining bars
    for idx, h in stack:
        area = h * (len(heights) - idx)
        max_area = max(max_area, area)

    return max_area`,

  inputs: [
    {
      name: 'heights',
      type: 'array',
      default: [2, 1, 5, 6, 2, 3],
      label: 'Bar Heights',
      placeholder: '2, 1, 5, 6, 2, 3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const heights = input.heights as number[]
    const steps: AlgorithmStep[] = []
    const stack: { idx: number; h: number }[] = []
    let maxArea = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize empty stack and max_area = 0',
      elements: [
        { type: 'array', id: 'heights', values: heights },
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { max_area: 0 },
    })

    for (let i = 0; i < heights.length; i++) {
      const h = heights[i]
      let start = i

      steps.push({
        lineNumber: 5,
        description: `Bar ${i}: height = ${h}`,
        elements: [
          { type: 'array', id: 'heights', values: heights, highlights: [{ index: i, style: 'active' }] },
          { type: 'stack', id: 'stack', items: stack.map(s => `(${s.idx},${s.h})`) },
        ],
        variables: { i, h, stackTop: stack.length > 0 ? stack[stack.length - 1].h : 'empty' },
      })

      while (stack.length > 0 && stack[stack.length - 1].h > h) {
        const { idx, h: height } = stack.pop()!
        const area = height * (i - idx)
        maxArea = Math.max(maxArea, area)
        start = idx

        steps.push({
          lineNumber: 9,
          description: `Pop (${idx},${height}): area = ${height} × ${i - idx} = ${area}${area > maxArea - area ? ' (new max!)' : ''}`,
          elements: [
            { type: 'array', id: 'heights', values: heights, highlights: [
              { index: i, style: 'active' },
              ...Array.from({ length: i - idx }, (_, j) => ({ index: idx + j, style: 'found' as const })),
            ]},
            { type: 'stack', id: 'stack', items: stack.map(s => `(${s.idx},${s.h})`) },
          ],
          variables: { area, max_area: maxArea, width: i - idx },
        })
      }

      stack.push({ idx: start, h })

      steps.push({
        lineNumber: 12,
        description: `Push (${start}, ${h}) to stack`,
        elements: [
          { type: 'array', id: 'heights', values: heights, highlights: [{ index: i, style: 'active' }] },
          { type: 'stack', id: 'stack', items: stack.map(s => `(${s.idx},${s.h})`), highlights: [{ index: 0, style: 'active' }] },
        ],
        variables: { pushed: `(${start}, ${h})` },
      })

      if (steps.length > 35) break
    }

    steps.push({
      lineNumber: 15,
      description: 'Process remaining bars in stack',
      elements: [
        { type: 'array', id: 'heights', values: heights },
        { type: 'stack', id: 'stack', items: stack.map(s => `(${s.idx},${s.h})`) },
      ],
      variables: { remaining: stack.length },
    })

    for (const { idx, h } of stack) {
      const area = h * (heights.length - idx)
      maxArea = Math.max(maxArea, area)

      steps.push({
        lineNumber: 16,
        description: `Remaining (${idx},${h}): area = ${h} × ${heights.length - idx} = ${area}`,
        elements: [
          { type: 'array', id: 'heights', values: heights, highlights:
            Array.from({ length: heights.length - idx }, (_, j) => ({ index: idx + j, style: 'found' as const }))
          },
        ],
        variables: { area, max_area: maxArea },
      })

      if (steps.length > 45) break
    }

    steps.push({
      lineNumber: 19,
      description: `Complete! Largest rectangle area: ${maxArea}`,
      elements: [
        { type: 'array', id: 'heights', values: heights },
      ],
      variables: { max_area: maxArea },
      isComplete: true,
    })

    return steps
  },
}

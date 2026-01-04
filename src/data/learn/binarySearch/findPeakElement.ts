import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const findPeakElement: AlgorithmDefinition = {
  id: 'find-peak-element',
  name: 'Find Peak Element',
  category: 'binarySearch',
  difficulty: 'Medium',
  leetcodeId: 162,
  description: 'Find a peak element where nums[i] > nums[i-1] and nums[i] > nums[i+1].',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [1,2,3,1]',
      output: '2',
      explanation: 'Peak is at index 2 (value 3).'
    },
    {
      input: 'nums = [1,2,1,3,5,6,4]',
      output: '1 or 5',
      explanation: 'Two peaks: index 1 (value 2) or index 5 (value 6). Return any.'
    },
  ],

  education: {
    tldr: 'Binary search: if mid < mid+1, peak is on right. Else peak is at mid or left.',
    steps: [
      { title: 'Find mid', description: 'Standard binary search', code: 'mid = (left + right) // 2' },
      { title: 'Compare neighbors', description: 'Check if going up or down', code: 'if nums[mid] > nums[mid+1]' },
      { title: 'Peak on right', description: 'If mid < mid+1, go right', code: 'left = mid + 1' },
      { title: 'Peak at mid or left', description: 'If mid > mid+1, go left', code: 'right = mid' },
    ],
    remember: [
      'Compare mid with mid+1 only',
      'Ascending = peak on right',
      'Descending = peak at mid or left',
    ],
    understanding: `A peak MUST exist because nums[-1] = nums[n] = -∞ (conceptually).

**Key insight:** If nums[mid] < nums[mid+1], we're going UP. A peak must be on the right (or we'd go up forever, but we can't—edge is -∞).

**If nums[mid] > nums[mid+1]:** We're going DOWN. Either mid is a peak, or there's a peak to the left.

**Binary search works** because we always move toward a guaranteed peak.`,

    whyPatternWorks: `Think of it as climbing a hill:

\`\`\`
     [6]
    /   \\
  [5]   [4]
  /
[3]
\`\`\`

At mid, if going up (mid < mid+1), summit is ahead.
If going down (mid > mid+1), summit is at mid or behind.

**Guaranteed:** At least one direction leads to a peak. Binary search finds it in O(log n).`,

    keyInsights: [
      'Peak guaranteed to exist (edges are -∞)',
      'Binary search on slope direction',
      'Go toward ascending slope',
      'Any peak is valid (return any)',
      'O(log n) vs O(n) linear scan'
    ]
  },

  code: `def findPeakElement(nums: list[int]) -> int:
    left, right = 0, len(nums) - 1

    while left < right:
        mid = (left + right) // 2

        if nums[mid] > nums[mid + 1]:
            # Peak is at mid or to the left
            right = mid
        else:
            # Peak is to the right
            left = mid + 1

    return left`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [1, 2, 1, 3, 5, 6, 4],
      label: 'Numbers',
      placeholder: '1, 2, 1, 3, 5, 6, 4',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = input.nums as number[]
    const steps: AlgorithmStep[] = []
    let left = 0
    let right = nums.length - 1

    steps.push({
      lineNumber: 2,
      description: `Initialize: left = 0, right = ${right}`,
      elements: [
        { type: 'pointer', id: 'left', index: 0, label: 'L', color: '#16A34A' },
        { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { left: 0, right },
    })

    while (left < right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        lineNumber: 5,
        description: `mid = ${mid}, compare nums[${mid}] = ${nums[mid]} vs nums[${mid + 1}] = ${nums[mid + 1]}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#EF4444' },
          { type: 'array', id: 'nums', values: nums, highlights: [
            { index: mid, style: 'active' },
            { index: mid + 1, style: 'comparing' },
          ]},
        ],
        variables: { left, right, mid },
      })

      if (nums[mid] > nums[mid + 1]) {
        steps.push({
          lineNumber: 8,
          description: `${nums[mid]} > ${nums[mid + 1]}: Peak at mid or left, right = ${mid}`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: mid, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: mid, style: 'found' },
            ]},
          ],
          variables: { action: 'right = mid' },
        })
        right = mid
      } else {
        steps.push({
          lineNumber: 11,
          description: `${nums[mid]} < ${nums[mid + 1]}: Peak to the right, left = ${mid + 1}`,
          elements: [
            { type: 'pointer', id: 'left', index: mid + 1, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: mid + 1, style: 'active' },
            ]},
          ],
          variables: { action: 'left = mid + 1' },
        })
        left = mid + 1
      }

      if (steps.length > 25) break
    }

    steps.push({
      lineNumber: 13,
      description: `Peak found at index ${left} with value ${nums[left]}`,
      elements: [
        { type: 'pointer', id: 'peak', index: left, label: 'Peak', color: '#16A34A' },
        { type: 'array', id: 'nums', values: nums, highlights: [{ index: left, style: 'found' }] },
      ],
      variables: { peakIndex: left, peakValue: nums[left] },
      isComplete: true,
    })

    return steps
  },
}

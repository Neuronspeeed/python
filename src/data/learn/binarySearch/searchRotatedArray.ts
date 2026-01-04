import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const searchRotatedArray: AlgorithmDefinition = {
  id: 'search-rotated-array',
  name: 'Search in Rotated Sorted Array',
  category: 'binarySearch',
  difficulty: 'Medium',
  leetcodeId: 33,
  description: 'Search for a target value in a rotated sorted array. Return the index if found, otherwise -1.',
  timeComplexity: 'O(log n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [4,5,6,7,0,1,2], target = 0',
      output: '4',
      explanation: 'Array rotated at index 4. Target 0 is at index 4.'
    },
    {
      input: 'nums = [4,5,6,7,0,1,2], target = 3',
      output: '-1',
      explanation: '3 is not in the array.'
    },
    {
      input: 'nums = [1], target = 0',
      output: '-1',
      explanation: 'Single element, not the target.'
    },
  ],

  education: {
    tldr: 'One half is always sorted. Check if target is in sorted half, else search other half.',
    steps: [
      { title: 'Find mid', description: 'Standard binary search start', code: 'mid = (left + right) // 2' },
      { title: 'Which half sorted?', description: 'Compare nums[left] to nums[mid]', code: 'if nums[left] <= nums[mid]: left sorted' },
      { title: 'Target in sorted half?', description: 'Easy range check', code: 'if nums[left] <= target < nums[mid]' },
      { title: 'Decide direction', description: 'Narrow search accordingly', code: 'adjust left or right' },
    ],
    remember: [
      'One half is ALWAYS sorted',
      'Check sorted half first',
      'Use sorted half for range check',
    ],
    understanding: `In a rotated sorted array, ONE HALF is always sorted.

**Key insight:** At any mid point, either [left..mid] or [mid..right] is sorted. We can easily check if target is in the sorted half using a simple range comparison.

**The algorithm:**
1. Find which half is sorted (compare nums[left] vs nums[mid])
2. Check if target is in sorted half (simple range check)
3. If yes, search sorted half. If no, search other half.

**Why it works:** The sorted half gives us a reliable range check. The unsorted half contains the rotation point.`,

    whyPatternWorks: `The rotation creates two sorted segments:

\`\`\`
[4, 5, 6, 7, 0, 1, 2]
 ↑        ↑
sorted   sorted (but lower values)
\`\`\`

At mid=7:
- Left half [4,5,6,7] is sorted (nums[left] <= nums[mid])
- We can check: is target in [4,7]?
- If yes, search left. If no, search right.

At mid=0:
- Right half [0,1,2] is sorted (nums[left] > nums[mid])
- We can check: is target in (0,2]?
- If yes, search right. If no, search left.`,

    keyInsights: [
      'One half always sorted after rotation',
      'Identify sorted half: nums[left] <= nums[mid]',
      'Range check works only on sorted half',
      'O(log n) maintained despite rotation',
      'Handle edge case: left == mid (single element half)'
    ]
  },

  code: `def search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1

    while left <= right:
        mid = (left + right) // 2

        if nums[mid] == target:
            return mid

        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1

    return -1`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [4, 5, 6, 7, 0, 1, 2],
      label: 'Rotated Array',
      placeholder: '4, 5, 6, 7, 0, 1, 2',
    },
    {
      name: 'target',
      type: 'number',
      default: 0,
      label: 'Target',
      placeholder: '0',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = input.nums as number[]
    const target = input.target as number
    const steps: AlgorithmStep[] = []
    let left = 0
    let right = nums.length - 1

    steps.push({
      lineNumber: 2,
      description: `Initialize: left = 0, right = ${right}. Searching for target = ${target}`,
      elements: [
        { type: 'pointer', id: 'left', index: 0, label: 'L', color: '#16A34A' },
        { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { left: 0, right, target },
    })

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)

      steps.push({
        lineNumber: 5,
        description: `Calculate mid = (${left} + ${right}) // 2 = ${mid}. nums[mid] = ${nums[mid]}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'nums', values: nums, highlights: [
            { index: mid, style: 'active' },
          ]},
        ],
        variables: { left, mid, right, 'nums[mid]': nums[mid] },
      })

      if (nums[mid] === target) {
        steps.push({
          lineNumber: 8,
          description: `Found! nums[${mid}] = ${nums[mid]} equals target ${target}. Return ${mid}`,
          elements: [
            { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
            { type: 'array', id: 'nums', values: nums, highlights: [
              { index: mid, style: 'found' },
            ]},
          ],
          variables: { result: mid },
          isComplete: true,
        })
        return steps
      }

      if (nums[left] <= nums[mid]) {
        // Left half is sorted
        steps.push({
          lineNumber: 10,
          description: `nums[${left}] = ${nums[left]} <= nums[${mid}] = ${nums[mid]}. Left half [${left}..${mid}] is sorted.`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights:
              Array.from({ length: mid - left + 1 }, (_, i) => ({ index: left + i, style: 'visited' as const }))
            },
          ],
          variables: { left, mid, right },
        })

        if (nums[left] <= target && target < nums[mid]) {
          steps.push({
            lineNumber: 12,
            description: `Target ${target} is in sorted left half [${nums[left]}..${nums[mid]}). Move right = mid - 1`,
            elements: [
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: mid, style: 'comparing' },
              ]},
            ],
            variables: { left, right: mid - 1 },
          })
          right = mid - 1
        } else {
          steps.push({
            lineNumber: 14,
            description: `Target ${target} is NOT in left half. Search right: left = mid + 1`,
            elements: [
              { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: mid, style: 'comparing' },
              ]},
            ],
            variables: { left: mid + 1, right },
          })
          left = mid + 1
        }
      } else {
        // Right half is sorted
        steps.push({
          lineNumber: 15,
          description: `nums[${left}] = ${nums[left]} > nums[${mid}] = ${nums[mid]}. Right half [${mid}..${right}] is sorted.`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: nums, highlights:
              Array.from({ length: right - mid + 1 }, (_, i) => ({ index: mid + i, style: 'visited' as const }))
            },
          ],
          variables: { left, mid, right },
        })

        if (nums[mid] < target && target <= nums[right]) {
          steps.push({
            lineNumber: 17,
            description: `Target ${target} is in sorted right half (${nums[mid]}..${nums[right]}]. Move left = mid + 1`,
            elements: [
              { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: mid, style: 'comparing' },
              ]},
            ],
            variables: { left: mid + 1, right },
          })
          left = mid + 1
        } else {
          steps.push({
            lineNumber: 19,
            description: `Target ${target} is NOT in right half. Search left: right = mid - 1`,
            elements: [
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'mid', index: mid, label: 'M', color: '#D97757' },
              { type: 'array', id: 'nums', values: nums, highlights: [
                { index: mid, style: 'comparing' },
              ]},
            ],
            variables: { left, right: mid - 1 },
          })
          right = mid - 1
        }
      }
    }

    steps.push({
      lineNumber: 21,
      description: `Search complete. Target ${target} not found. Return -1`,
      elements: [
        { type: 'array', id: 'nums', values: nums },
      ],
      variables: { result: -1 },
      isComplete: true,
    })

    return steps
  },
}

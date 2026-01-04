import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const sortColors: AlgorithmDefinition = {
  id: 'sort-colors',
  name: 'Sort Colors (Dutch Flag)',
  category: 'twoPointers',
  difficulty: 'Medium',
  leetcodeId: 75,
  description: 'Sort an array with values 0, 1, and 2 in-place using three pointers.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [2, 0, 2, 1, 1, 0]',
      output: '[0, 0, 1, 1, 2, 2]',
      explanation: 'Dutch National Flag: partition into three regions [0s | 1s | 2s].'
    },
    {
      input: 'nums = [2, 0, 1]',
      output: '[0, 1, 2]',
      explanation: 'Each color appears once, sorted in one pass.'
    },
  ],

  education: {
    tldr: 'Three pointers partition into three zones: 0s on left, 2s on right, 1s in middle.',
    steps: [
      { title: 'Set boundaries', description: 'low=0 (0s boundary), mid=0 (scanner), high=n-1 (2s boundary)', code: 'low=mid=0, high=n-1' },
      { title: 'See 0?', description: 'Swap to low region, advance both', code: 'swap(mid,low), low++, mid++' },
      { title: 'See 1?', description: 'Already in place, just advance mid', code: 'mid++' },
      { title: 'See 2?', description: 'Swap to high region, shrink high only', code: 'swap(mid,high), high--' },
    ],
    remember: [
      '0 goes LEFT (swap with low)',
      '1 stays MIDDLE (just advance)',
      '2 goes RIGHT (swap with high, don\'t advance mid!)',
    ],
    understanding: `This is the Dutch National Flag problem, designed by Dijkstra. We partition into three regions:

**Region structure:**
- [0, low): all 0s (sorted)
- [low, mid): all 1s (sorted)
- [mid, high]: unknown (being processed)
- (high, n): all 2s (sorted)

**Why not advance mid when swapping with high?** When we swap with high, we bring an unknown value to mid position. We need to check it before moving on. When we swap with low, we bring a 1 (already processed) to mid, so we can safely advance.

**Why three pointers?** Two pointers can only partition into two regions. Three pointers enable three-way partitioning in a single pass.`,

    whyPatternWorks: `The Dutch National Flag is a special case of three-way partitioning:

1. **Single pass:** We process each element exactly once
2. **In-place:** O(1) extra space
3. **Stable for 0s and 2s:** They end up in correct relative order

This pattern applies whenever you need to partition into exactly three groups by a single criterion.`,

    keyInsights: [
      'Three pointers for three-way partition',
      'mid scans, low/high are region boundaries',
      'Don\'t advance mid after swap with high (check swapped value)',
      'Loop ends when mid > high (unknown region empty)',
      'Dutch National Flag = Dijkstra\'s algorithm'
    ]
  },

  code: `def sortColors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1

    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

    # Array is now sorted: [0,0,0,1,1,1,2,2,2]`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [2, 0, 2, 1, 1, 0],
      label: 'Colors (0, 1, 2)',
      placeholder: '2, 0, 2, 1, 1, 0',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = [...(input.nums as number[])]
    const steps: AlgorithmStep[] = []
    let low = 0
    let mid = 0
    let high = nums.length - 1

    steps.push({
      lineNumber: 2,
      description: `Initialize: low = 0, mid = 0, high = ${high}`,
      elements: [
        { type: 'pointer', id: 'low', index: 0, label: 'low', color: '#EF4444' },
        { type: 'pointer', id: 'mid', index: 0, label: 'mid', color: '#FBBF24' },
        { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
        { type: 'array', id: 'nums', values: [...nums] },
      ],
      variables: { low: 0, mid: 0, high },
    })

    while (mid <= high) {
      if (nums[mid] === 0) {
        steps.push({
          lineNumber: 5,
          description: `nums[mid] = 0 (red), swap with low position`,
          elements: [
            { type: 'pointer', id: 'low', index: low, label: 'low', color: '#EF4444' },
            { type: 'pointer', id: 'mid', index: mid, label: 'mid', color: '#FBBF24' },
            { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums], highlights: [
              { index: low, style: 'comparing' },
              { index: mid, style: 'comparing' },
            ]},
          ],
          variables: { low, mid, high, action: 'swap with low' },
        })

        ;[nums[low], nums[mid]] = [nums[mid], nums[low]]
        low++
        mid++

        steps.push({
          lineNumber: 8,
          description: `After swap: low = ${low}, mid = ${mid}`,
          elements: [
            { type: 'pointer', id: 'low', index: low, label: 'low', color: '#EF4444' },
            { type: 'pointer', id: 'mid', index: mid, label: 'mid', color: '#FBBF24' },
            { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums], highlights: [
              { index: low - 1, style: 'found' },
            ]},
          ],
          variables: { low, mid, high },
        })
      } else if (nums[mid] === 1) {
        steps.push({
          lineNumber: 9,
          description: `nums[mid] = 1 (white), already in place, move mid`,
          elements: [
            { type: 'pointer', id: 'low', index: low, label: 'low', color: '#EF4444' },
            { type: 'pointer', id: 'mid', index: mid, label: 'mid', color: '#FBBF24' },
            { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums], highlights: [
              { index: mid, style: 'active' },
            ]},
          ],
          variables: { low, mid, high, action: 'mid++' },
        })
        mid++
      } else {
        steps.push({
          lineNumber: 11,
          description: `nums[mid] = 2 (blue), swap with high position`,
          elements: [
            { type: 'pointer', id: 'low', index: low, label: 'low', color: '#EF4444' },
            { type: 'pointer', id: 'mid', index: mid, label: 'mid', color: '#FBBF24' },
            { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums], highlights: [
              { index: mid, style: 'comparing' },
              { index: high, style: 'comparing' },
            ]},
          ],
          variables: { low, mid, high, action: 'swap with high' },
        })

        ;[nums[mid], nums[high]] = [nums[high], nums[mid]]
        high--

        steps.push({
          lineNumber: 13,
          description: `After swap: high = ${high} (don't move mid, check swapped value)`,
          elements: [
            { type: 'pointer', id: 'low', index: low, label: 'low', color: '#EF4444' },
            { type: 'pointer', id: 'mid', index: mid, label: 'mid', color: '#FBBF24' },
            { type: 'pointer', id: 'high', index: high, label: 'high', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums], highlights: [
              { index: high + 1, style: 'found' },
            ]},
          ],
          variables: { low, mid, high },
        })
      }

      if (steps.length > 40) break
    }

    steps.push({
      lineNumber: 15,
      description: `Complete! Array sorted: [${nums.join(', ')}]`,
      elements: [
        { type: 'array', id: 'nums', values: nums, highlights: nums.map((_, i) => ({ index: i, style: 'found' as const })) },
      ],
      variables: { result: nums },
      isComplete: true,
    })

    return steps
  },
}

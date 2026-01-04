import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const moveZeroes: AlgorithmDefinition = {
  id: 'move-zeroes',
  name: 'Move Zeroes',
  category: 'twoPointers',
  difficulty: 'Easy',
  leetcodeId: 283,
  description: 'Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [0, 1, 0, 3, 12]',
      output: '[1, 3, 12, 0, 0]',
      explanation: 'Non-zero elements (1, 3, 12) shift left, zeros migrate right, preserving original order.'
    },
    {
      input: 'nums = [0]',
      output: '[0]',
      explanation: 'Single zero stays in place.'
    },
  ],

  education: {
    tldr: 'Write pointer marks where next non-zero goes. Swap non-zeros forward, zeros bubble to end.',
    steps: [
      { title: 'Set write pointer', description: 'Tracks position for next non-zero', code: 'write = 0' },
      { title: 'Scan with read', description: 'Check each element left to right', code: 'for read in range(n)' },
      { title: 'Non-zero? Swap!', description: 'Swap to write position, advance write', code: 'if nums[read] != 0: swap, write++' },
      { title: 'Zero? Skip', description: 'Zeros get pushed right automatically', code: 'zeros bubble to end' },
    ],
    remember: [
      'Write pointer = next non-zero destination',
      'Only swap when you find non-zero',
      'Zeros naturally end up at the end',
    ],
    understanding: `This is the "reader-writer" or "slow-fast" two-pointer pattern. We have two pointers moving in the same direction:

**Read pointer:** Scans through every element looking for non-zeros
**Write pointer:** Marks where the next non-zero should go

When we find a non-zero, we swap it to the write position. This pushes any zero that was at the write position forward. After processing all elements, all zeros have bubbled to the end.

**Why does order get preserved?** We process elements left-to-right and place non-zeros in the order we find them. We never skip or reorder non-zero elements.`,

    whyPatternWorks: `The reader-writer pattern is perfect for in-place filtering or partitioning:

1. **Reader finds candidates** (non-zeros in this case)
2. **Writer places them in correct position**
3. **Unwanted elements (zeros) naturally fill remaining space**

The invariant: everything before write pointer is correctly placed (non-zero), everything after is pending processing.`,

    keyInsights: [
      'Same-direction two pointers for in-place partitioning',
      'Write pointer always <= read pointer',
      'Swap operation is O(1) and maintains order',
      'Works because we never need to look backwards',
      'Pattern generalizes to any "move X to end" problem'
    ]
  },

  code: `def moveZeroes(nums: list[int]) -> None:
    write_idx = 0

    for read_idx in range(len(nums)):
        if nums[read_idx] != 0:
            nums[write_idx], nums[read_idx] = nums[read_idx], nums[write_idx]
            write_idx += 1`,

  inputs: [
    {
      name: 'nums',
      type: 'array',
      default: [0, 1, 0, 3, 12],
      label: 'Array',
      placeholder: '0, 1, 0, 3, 12',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const nums = [...(input.nums as number[])]
    const steps: AlgorithmStep[] = []
    let writeIdx = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize write_idx = 0. This marks where the next non-zero should go.',
      elements: [
        { type: 'pointer', id: 'write', index: 0, label: 'W', color: '#16A34A' },
        { type: 'array', id: 'nums', values: [...nums] },
      ],
      variables: { write_idx: 0 },
    })

    for (let readIdx = 0; readIdx < nums.length; readIdx++) {
      steps.push({
        lineNumber: 4,
        description: `Check nums[${readIdx}] = ${nums[readIdx]}${nums[readIdx] !== 0 ? ' (non-zero!)' : ' (zero, skip)'}`,
        elements: [
          { type: 'pointer', id: 'write', index: writeIdx, label: 'W', color: '#16A34A' },
          { type: 'pointer', id: 'read', index: readIdx, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'nums', values: [...nums], highlights: [
            { index: readIdx, style: nums[readIdx] !== 0 ? 'active' : 'inactive' },
          ]},
        ],
        variables: { write_idx: writeIdx, read_idx: readIdx },
      })

      if (nums[readIdx] !== 0) {
        if (writeIdx !== readIdx) {
          steps.push({
            lineNumber: 6,
            description: `Swap nums[${writeIdx}] and nums[${readIdx}]: ${nums[writeIdx]} <-> ${nums[readIdx]}`,
            elements: [
              { type: 'pointer', id: 'write', index: writeIdx, label: 'W', color: '#16A34A' },
              { type: 'pointer', id: 'read', index: readIdx, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: [...nums], highlights: [
                { index: writeIdx, style: 'swapped' },
                { index: readIdx, style: 'swapped' },
              ]},
            ],
            variables: { write_idx: writeIdx, read_idx: readIdx },
          })

          // Perform swap
          ;[nums[writeIdx], nums[readIdx]] = [nums[readIdx], nums[writeIdx]]

          steps.push({
            lineNumber: 6,
            description: `After swap: array = [${nums.join(', ')}]`,
            elements: [
              { type: 'pointer', id: 'write', index: writeIdx, label: 'W', color: '#16A34A' },
              { type: 'pointer', id: 'read', index: readIdx, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: [...nums], highlights: [
                { index: writeIdx, style: 'found' },
              ]},
            ],
            variables: { write_idx: writeIdx, read_idx: readIdx },
          })
        } else {
          // writeIdx === readIdx: element already in correct position
          steps.push({
            lineNumber: 6,
            description: `write_idx == read_idx (${writeIdx}), element ${nums[readIdx]} already in place - no swap needed`,
            elements: [
              { type: 'pointer', id: 'write', index: writeIdx, label: 'W', color: '#16A34A' },
              { type: 'pointer', id: 'read', index: readIdx, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'nums', values: [...nums], highlights: [
                { index: readIdx, style: 'found' },
              ]},
            ],
            variables: { write_idx: writeIdx, read_idx: readIdx },
          })
        }

        writeIdx++

        steps.push({
          lineNumber: 7,
          description: `Increment write_idx to ${writeIdx}`,
          elements: [
            ...(writeIdx < nums.length ? [{ type: 'pointer' as const, id: 'write', index: writeIdx, label: 'W', color: '#16A34A' }] : []),
            { type: 'pointer', id: 'read', index: readIdx, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'nums', values: [...nums] },
          ],
          variables: { write_idx: writeIdx, read_idx: readIdx },
        })
      }
    }

    steps.push({
      lineNumber: 7,
      description: `Done! All zeroes moved to end: [${nums.join(', ')}]`,
      elements: [
        { type: 'array', id: 'nums', values: [...nums], highlights: nums.map((v, i) => ({
          index: i,
          style: v === 0 ? 'inactive' : 'found' as const,
        }))},
      ],
      variables: { result: nums },
      isComplete: true,
    })

    return steps
  },
}

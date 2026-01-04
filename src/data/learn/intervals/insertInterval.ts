import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const insertInterval: AlgorithmDefinition = {
  id: 'insert-interval',
  name: 'Insert Interval',
  category: 'intervals',
  difficulty: 'Medium',
  leetcodeId: 57,
  description: 'Insert a new interval into sorted non-overlapping intervals.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]',
      output: '[[1,5],[6,9]]',
      explanation: '[2,5] overlaps with [1,3], merge to [1,5].'
    },
    {
      input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]',
      output: '[[1,2],[3,10],[12,16]]',
      explanation: '[4,8] overlaps with [3,5], [6,7], [8,10], all merge to [3,10].'
    },
  ],

  education: {
    tldr: 'Three phases: add intervals before, merge overlapping, add intervals after.',
    steps: [
      { title: 'Add before', description: 'Intervals ending before new starts', code: 'while intervals[i][1] < new[0]' },
      { title: 'Merge overlapping', description: 'Expand new interval with overlaps', code: 'while intervals[i][0] <= new[1]' },
      { title: 'Add new interval', description: 'The merged result', code: 'result.append(newInterval)' },
      { title: 'Add after', description: 'Remaining intervals', code: 'result.extend(remaining)' },
    ],
    remember: [
      'Three phases: before, merge, after',
      'Before: ends before new starts',
      'Overlap: starts before new ends',
    ],
    understanding: `Since intervals are already sorted and non-overlapping, we process in three phases:

**Phase 1 (Before):** Add all intervals that end before the new interval starts. No overlap possible.

**Phase 2 (Merge):** Any interval that starts before the new interval ends might overlap. Merge all of them into the new interval.

**Phase 3 (After):** Add remaining intervals as-is.`,

    whyPatternWorks: `The sorted, non-overlapping input makes this linear:

- We know exactly where to "insert" based on start/end comparisons
- Overlapping intervals are contiguous (thanks to sorted order)
- Single pass through the array

No need to sort again—the problem gives us sorted input.`,

    keyInsights: [
      'Input is already sorted and non-overlapping',
      'Three distinct phases: before, merge, after',
      'Overlap check: does interval start before new ends?',
      'O(n) time—no sorting needed'
    ]
  },

  code: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    result = []
    i = 0

    # Add intervals before newInterval
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1

    # Merge overlapping intervals
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1

    result.append(newInterval)

    # Add remaining intervals
    while i < len(intervals):
        result.append(intervals[i])
        i += 1

    return result`,

  inputs: [
    {
      name: 'intervals',
      type: 'string',
      default: '1,2|3,5|6,7|8,10|12,16',
      label: 'Intervals',
      placeholder: '1,2|3,5|6,7|8,10|12,16',
    },
    {
      name: 'newInterval',
      type: 'string',
      default: '4,8',
      label: 'New Interval',
      placeholder: '4,8',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const intervalsStr = input.intervals as string
    const intervals = intervalsStr.split('|').map(s => {
      const parts = s.split(',').map(v => parseInt(v.trim()))
      return [parts[0], parts[1]]
    }).filter(i => !isNaN(i[0]) && !isNaN(i[1]))

    const newIntStr = input.newInterval as string
    const newParts = newIntStr.split(',').map(v => parseInt(v.trim()))
    let newInterval = [newParts[0], newParts[1]]

    const steps: AlgorithmStep[] = []
    const result: number[][] = []
    let i = 0

    steps.push({
      lineNumber: 2,
      description: `Insert [${newInterval[0]},${newInterval[1]}] into intervals`,
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([s]) => s) },
      ],
      variables: { newInterval: `[${newInterval[0]},${newInterval[1]}]` },
    })

    // Before newInterval
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
      result.push(intervals[i])
      i++
    }

    if (result.length > 0) {
      steps.push({
        lineNumber: 7,
        description: `Add ${result.length} intervals before new interval`,
        elements: [
          { type: 'array', id: 'result', values: result.map(([s]) => s), styles: result.map(() => 'found' as const) },
        ],
        variables: { beforeCount: result.length },
      })
    }

    // Merge overlapping
    const mergeStart = i
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
      newInterval = [
        Math.min(newInterval[0], intervals[i][0]),
        Math.max(newInterval[1], intervals[i][1])
      ]
      i++
    }

    if (i > mergeStart) {
      steps.push({
        lineNumber: 12,
        description: `Merged ${i - mergeStart} overlapping intervals → [${newInterval[0]},${newInterval[1]}]`,
        elements: [
          { type: 'array', id: 'intervals', values: intervals.map(([s]) => s) },
        ],
        variables: { mergedCount: i - mergeStart, merged: `[${newInterval[0]},${newInterval[1]}]` },
      })
    }

    result.push(newInterval)

    steps.push({
      lineNumber: 16,
      description: `Add merged interval [${newInterval[0]},${newInterval[1]}]`,
      elements: [
        { type: 'array', id: 'result', values: result.map(([s]) => s), styles: result.map(() => 'found' as const) },
      ],
      variables: { addedMerged: `[${newInterval[0]},${newInterval[1]}]` },
    })

    // Add remaining
    while (i < intervals.length) {
      result.push(intervals[i])
      i++
    }

    steps.push({
      lineNumber: 22,
      description: `Complete! Result has ${result.length} intervals`,
      elements: [
        { type: 'array', id: 'result', values: result.map(([s]) => s), styles: result.map(() => 'found' as const) },
      ],
      variables: { result: result.map(([s, e]) => `[${s},${e}]`) },
      isComplete: true,
    })

    return steps
  },
}

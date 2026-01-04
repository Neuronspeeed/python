import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const nonOverlappingIntervals: AlgorithmDefinition = {
  id: 'non-overlapping-intervals',
  name: 'Non-overlapping Intervals',
  category: 'intervals',
  difficulty: 'Medium',
  leetcodeId: 435,
  description: 'Find minimum number of intervals to remove to make rest non-overlapping.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
      output: '1',
      explanation: 'Remove [1,3] and the rest are non-overlapping: [1,2], [2,3], [3,4].'
    },
    {
      input: 'intervals = [[1,2],[1,2],[1,2]]',
      output: '2',
      explanation: 'Need to remove 2 of the 3 identical intervals to have no overlap.'
    },
    {
      input: 'intervals = [[1,2],[2,3]]',
      output: '0',
      explanation: 'Already non-overlapping (touching at 2 is OK).'
    },
  ],

  education: {
    tldr: 'Sort by end time, greedily keep intervals that end earliest.',
    steps: [
      { title: 'Sort by end', description: 'Sort intervals by end time ascending', code: 'intervals.sort(key=lambda x: x[1])' },
      { title: 'Track last end', description: 'Keep track of last non-overlapping end', code: 'last_end = intervals[0][1]' },
      { title: 'Check overlap', description: 'If start < last_end, must remove', code: 'if start < last_end: removals++' },
      { title: 'No overlap', description: 'Otherwise update last_end', code: 'else: last_end = end' },
    ],
    remember: [
      'Sort by END time, not start',
      'Greedy: keep earliest-ending intervals',
      'Overlap: start < last_end (not <=)',
    ],
    understanding: `This is an interval scheduling problem. The key insight: **sort by end time**.

**Why end time?** Intervals that end earlier leave more room for subsequent intervals. By always keeping the earliest-ending interval, we maximize how many can fit.

**Greedy choice:** When two intervals overlap, remove the one that ends later. The one ending earlier leaves more room for future intervals.`,

    whyPatternWorks: `Sorting by end time converts this to a greedy selection problem:

1. After sorting, we process intervals left-to-right by end time
2. Each decision is locally optimal: keep earliest-ending, remove later-ending
3. This greedy choice is globally optimal (can be proven by exchange argument)

**Alternative view:** This is equivalent to finding the maximum number of non-overlapping intervals (activity selection problem), then subtracting from total.`,

    keyInsights: [
      'Sort by END time, not start time',
      'Greedy: earliest-ending interval wins',
      'Overlap check: start < last_end',
      'Equivalent to: n - max_non_overlapping',
      'Classic activity selection problem'
    ]
  },

  code: `def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    intervals.sort(key=lambda x: x[1])  # Sort by end time

    removals = 0
    last_end = intervals[0][1]

    for start, end in intervals[1:]:
        if start < last_end:
            removals += 1  # Overlap - remove this one
        else:
            last_end = end  # No overlap - update end

    return removals`,

  inputs: [
    {
      name: 'intervals',
      type: 'string',
      default: '1,2|2,3|3,4|1,3',
      label: 'Intervals (start,end|...)',
      placeholder: '1,2|2,3|3,4|1,3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const intervalsStr = input.intervals as string
    const intervals = intervalsStr.split('|').map(s => {
      const parts = s.split(',').map(v => parseInt(v.trim()))
      return [parts[0], parts[1]]
    }).filter(i => !isNaN(i[0]) && !isNaN(i[1]))
    const steps: AlgorithmStep[] = []

    // Sort by end time
    intervals.sort((a, b) => a[1] - b[1])

    steps.push({
      lineNumber: 2,
      description: 'Sort intervals by end time',
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([, e]) => e) },
      ],
      variables: { sorted: intervals.map(([s, e]) => `[${s},${e}]`) },
    })

    let removals = 0
    let lastEnd = intervals[0][1]

    steps.push({
      lineNumber: 5,
      description: `Initialize: last_end = ${lastEnd}`,
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([, e]) => e), pointers: [{ index: 0, label: 'kept', color: '#10B981' }] },
      ],
      variables: { last_end: lastEnd, removals: 0 },
    })

    for (let i = 1; i < intervals.length && steps.length < 20; i++) {
      const [start, end] = intervals[i]

      if (start < lastEnd) {
        removals++
        steps.push({
          lineNumber: 8,
          description: `[${start},${end}]: start ${start} < last_end ${lastEnd} → REMOVE (count: ${removals})`,
          elements: [
            { type: 'array', id: 'intervals', values: intervals.map(([, e]) => e), pointers: [{ index: i, label: 'remove', color: '#EF4444' }] },
          ],
          variables: { start, end, last_end: lastEnd, removals, overlap: true },
        })
      } else {
        lastEnd = end
        steps.push({
          lineNumber: 10,
          description: `[${start},${end}]: start ${start} >= last_end → KEEP, update last_end = ${end}`,
          elements: [
            { type: 'array', id: 'intervals', values: intervals.map(([, e]) => e), pointers: [{ index: i, label: 'keep', color: '#10B981' }] },
          ],
          variables: { start, end, last_end: lastEnd, removals, overlap: false },
        })
      }
    }

    steps.push({
      lineNumber: 12,
      description: `Complete! Need to remove ${removals} intervals`,
      elements: [],
      variables: { result: removals },
      isComplete: true,
    })

    return steps
  },
}

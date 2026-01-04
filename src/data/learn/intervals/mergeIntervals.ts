import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const mergeIntervals: AlgorithmDefinition = {
  id: 'merge-intervals',
  name: 'Merge Intervals',
  category: 'intervals',
  difficulty: 'Medium',
  leetcodeId: 56,
  description: 'Merge all overlapping intervals.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
      output: '[[1,6],[8,10],[15,18]]',
      explanation: '[1,3] and [2,6] overlap, merge to [1,6]. Others stay separate.'
    },
    {
      input: 'intervals = [[1,4],[4,5]]',
      output: '[[1,5]]',
      explanation: 'Intervals touching at endpoints are considered overlapping.'
    },
  ],

  education: {
    tldr: 'Sort by start, then greedily merge if current start ≤ previous end.',
    steps: [
      { title: 'Sort intervals', description: 'By start time ascending', code: 'intervals.sort(key=lambda x: x[0])' },
      { title: 'Start with first', description: 'Add first interval to result', code: 'merged = [intervals[0]]' },
      { title: 'Check overlap', description: 'If start ≤ last end, extend last', code: 'if start <= merged[-1][1]: extend' },
      { title: 'No overlap', description: 'Otherwise add as new interval', code: 'else: merged.append(interval)' },
    ],
    remember: [
      'Sort first, always',
      'Overlap: current_start ≤ previous_end',
      'Extend by taking max of ends',
    ],
    understanding: `Merging intervals is the foundational interval problem. The key insight: after sorting by start time, overlapping intervals are adjacent.

**When do intervals overlap?** After sorting, [a,b] and [c,d] overlap if c ≤ b (the next interval starts before the current one ends).

**How to merge?** Take the minimum start (already sorted) and maximum end.`,

    whyPatternWorks: `Sorting transforms a 2D problem (comparing any two intervals) into a 1D problem (only compare adjacent intervals).

After sorting by start:
- If intervals overlap, they must be consecutive
- We can greedily merge as we go
- No need to look back—each interval either extends the last or starts fresh`,

    keyInsights: [
      'Sort by start time first',
      'Overlapping intervals become adjacent after sorting',
      'Greedy: extend current or start new',
      'O(n log n) for sort, O(n) for merge pass'
    ]
  },

  code: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged`,

  inputs: [
    {
      name: 'intervals',
      type: 'string',
      default: '1,3|2,6|8,10|15,18',
      label: 'Intervals (start,end|...)',
      placeholder: '1,3|2,6|8,10|15,18',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const intervalsStr = input.intervals as string
    const intervals = intervalsStr.split('|').map(s => {
      const parts = s.split(',').map(v => parseInt(v.trim()))
      return [parts[0], parts[1]]
    }).filter(i => !isNaN(i[0]) && !isNaN(i[1]))
    const steps: AlgorithmStep[] = []

    // Sort intervals
    intervals.sort((a, b) => a[0] - b[0])

    steps.push({
      lineNumber: 2,
      description: 'Sort intervals by start time',
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([s]) => s) },
      ],
      variables: { sorted: intervals.map(([s, e]) => `[${s},${e}]`) },
    })

    const merged: number[][] = [intervals[0]]

    steps.push({
      lineNumber: 3,
      description: `Initialize merged with first interval [${intervals[0][0]},${intervals[0][1]}]`,
      elements: [
        { type: 'array', id: 'merged', values: merged.map(([s]) => s), styles: merged.map(() => 'found' as const) },
      ],
      variables: { merged: merged.map(([s, e]) => `[${s},${e}]`) },
    })

    for (let i = 1; i < intervals.length && steps.length < 20; i++) {
      const [start, end] = intervals[i]
      const lastEnd = merged[merged.length - 1][1]

      if (start <= lastEnd) {
        merged[merged.length - 1][1] = Math.max(lastEnd, end)
        steps.push({
          lineNumber: 7,
          description: `[${start},${end}] overlaps with last, merge → [${merged[merged.length - 1][0]},${merged[merged.length - 1][1]}]`,
          elements: [
            { type: 'array', id: 'intervals', values: intervals.map(([s]) => s), pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
            { type: 'array', id: 'merged', values: merged.map(([s]) => s), styles: merged.map(() => 'found' as const) },
          ],
          variables: { overlap: true, current: `[${start},${end}]`, mergedTo: `[${merged[merged.length - 1][0]},${merged[merged.length - 1][1]}]` },
        })
      } else {
        merged.push([start, end])
        steps.push({
          lineNumber: 9,
          description: `[${start},${end}] doesn't overlap, add as new interval`,
          elements: [
            { type: 'array', id: 'intervals', values: intervals.map(([s]) => s), pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
            { type: 'array', id: 'merged', values: merged.map(([s]) => s), styles: merged.map(() => 'found' as const) },
          ],
          variables: { overlap: false, current: `[${start},${end}]` },
        })
      }
    }

    steps.push({
      lineNumber: 11,
      description: `Complete! Merged into ${merged.length} intervals`,
      elements: [
        { type: 'array', id: 'merged', values: merged.map(([s]) => s), styles: merged.map(() => 'found' as const) },
      ],
      variables: { result: merged.map(([s, e]) => `[${s},${e}]`) },
      isComplete: true,
    })

    return steps
  },
}

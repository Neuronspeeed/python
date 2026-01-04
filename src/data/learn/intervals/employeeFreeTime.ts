import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const employeeFreeTime: AlgorithmDefinition = {
  id: 'employee-free-time',
  name: 'Employee Free Time',
  category: 'intervals',
  difficulty: 'Hard',
  leetcodeId: 759,
  description: 'Find common free time intervals across all employees.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]',
      output: '[[3,4]]',
      explanation: 'All employees are busy during [1,3] and [4,10]. Free time is [3,4].'
    },
    {
      input: 'schedule = [[[1,3],[6,7]],[[2,4]],[[2,5],[9,12]]]',
      output: '[[5,6],[7,9]]',
      explanation: 'Merged busy: [1,5], [6,7], [9,12]. Gaps: [5,6] and [7,9].'
    },
  ],

  education: {
    tldr: 'Flatten all intervals, merge them, then find gaps between merged intervals.',
    steps: [
      { title: 'Flatten', description: 'Collect all intervals from all employees', code: 'all_intervals = [i for emp in schedule for i in emp]' },
      { title: 'Sort & merge', description: 'Sort by start, merge overlapping', code: 'merged = merge_intervals(all_intervals)' },
      { title: 'Find gaps', description: 'Gap between consecutive merged intervals', code: 'if merged[i-1][1] < merged[i][0]: gap' },
    ],
    remember: [
      'Flatten all schedules first',
      'This is merge intervals + find gaps',
      'Gap = end of one < start of next',
    ],
    understanding: `This problem combines two simpler operations:

**Step 1: Merge all busy times.** Treat all employee schedules as one big list of intervals and merge them.

**Step 2: Find gaps.** Free time = gaps between merged busy intervals. If one merged interval ends at 5 and next starts at 7, free time is [5,7].

**Key insight:** We don't care which employee has which interval—we just need to know when ANYONE is busy.`,

    whyPatternWorks: `By flattening and merging:

1. We get a minimal representation of "busy time"
2. Any gap in this merged list means NO ONE is busy
3. Gaps are easy to find: compare adjacent intervals

**Alternative:** Use a min-heap to process intervals by start time (useful if schedules are already sorted per employee).`,

    keyInsights: [
      'Flatten all employees into one list',
      'Apply merge intervals algorithm',
      'Free time = gaps between merged intervals',
      'Heap approach if per-employee lists are sorted',
      'O(n log n) dominated by sorting'
    ]
  },

  code: `def employeeFreeTime(schedule: list[list[list[int]]]) -> list[list[int]]:
    # Flatten all intervals
    intervals = [i for emp in schedule for i in emp]
    intervals.sort(key=lambda x: x[0])

    # Merge overlapping intervals
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    # Find gaps (free time)
    free = []
    for i in range(1, len(merged)):
        if merged[i-1][1] < merged[i][0]:
            free.append([merged[i-1][1], merged[i][0]])

    return free`,

  inputs: [
    {
      name: 'schedule',
      type: 'string',
      default: '1,2;5,6|1,3|4,10',
      label: 'Schedule (intervals;...|employee|...)',
      placeholder: '1,2;5,6|1,3|4,10',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const scheduleStr = input.schedule as string
    // Parse: "1,2;5,6|1,3|4,10" -> [[[1,2],[5,6]], [[1,3]], [[4,10]]]
    const schedule = scheduleStr.split('|').map(emp =>
      emp.split(';').map(interval => {
        const parts = interval.split(',').map(v => parseInt(v.trim()))
        return [parts[0], parts[1]]
      }).filter(i => !isNaN(i[0]) && !isNaN(i[1]))
    )
    const steps: AlgorithmStep[] = []

    // Flatten
    const intervals: number[][] = []
    for (const emp of schedule) {
      for (const interval of emp) {
        intervals.push(interval)
      }
    }

    steps.push({
      lineNumber: 3,
      description: `Flatten: ${intervals.length} total intervals from ${schedule.length} employees`,
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([s]) => s) },
      ],
      variables: { employees: schedule.length, totalIntervals: intervals.length },
    })

    // Sort by start
    intervals.sort((a, b) => a[0] - b[0])

    steps.push({
      lineNumber: 4,
      description: 'Sort all intervals by start time',
      elements: [
        { type: 'array', id: 'intervals', values: intervals.map(([s]) => s) },
      ],
      variables: { sorted: intervals.map(([s, e]) => `[${s},${e}]`) },
    })

    // Merge
    const merged: number[][] = [intervals[0]]
    for (let i = 1; i < intervals.length; i++) {
      const [start, end] = intervals[i]
      if (start <= merged[merged.length - 1][1]) {
        merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end)
      } else {
        merged.push([start, end])
      }
    }

    steps.push({
      lineNumber: 11,
      description: `Merged into ${merged.length} busy intervals`,
      elements: [
        { type: 'array', id: 'merged', values: merged.map(([s]) => s), styles: merged.map(() => 'found' as const) },
      ],
      variables: { merged: merged.map(([s, e]) => `[${s},${e}]`) },
    })

    // Find gaps
    const free: number[][] = []
    for (let i = 1; i < merged.length; i++) {
      if (merged[i - 1][1] < merged[i][0]) {
        free.push([merged[i - 1][1], merged[i][0]])
        steps.push({
          lineNumber: 16,
          description: `Gap found: [${merged[i - 1][1]}, ${merged[i][0]}]`,
          elements: [
            { type: 'array', id: 'merged', values: merged.map(([s]) => s), pointers: [
              { index: i - 1, label: 'end', color: '#3B82F6' },
              { index: i, label: 'start', color: '#10B981' }
            ]},
          ],
          variables: { gapStart: merged[i - 1][1], gapEnd: merged[i][0] },
        })
      }
    }

    steps.push({
      lineNumber: 18,
      description: `Complete! Found ${free.length} free time intervals`,
      elements: [],
      variables: { result: free.map(([s, e]) => `[${s},${e}]`), count: free.length },
      isComplete: true,
    })

    return steps
  },
}

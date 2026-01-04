import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const meetingRooms: AlgorithmDefinition = {
  id: 'meeting-rooms-ii',
  name: 'Meeting Rooms II',
  category: 'intervals',
  difficulty: 'Medium',
  leetcodeId: 253,
  description: 'Find minimum number of meeting rooms required.',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'intervals = [[0,30],[5,10],[15,20]]',
      output: '2',
      explanation: '[0,30] overlaps with both others, but [5,10] and [15,20] don\'t overlap each other.'
    },
    {
      input: 'intervals = [[7,10],[2,4]]',
      output: '1',
      explanation: 'No overlap—one room suffices.'
    },
  ],

  education: {
    tldr: 'Separate starts and ends, sort both. If a meeting starts before the earliest end, need new room.',
    steps: [
      { title: 'Separate & sort', description: 'Extract all starts and ends, sort independently', code: 'starts = sorted(starts), ends = sorted(ends)' },
      { title: 'Walk through starts', description: 'For each start time', code: 'for start in starts' },
      { title: 'Compare to earliest end', description: 'If start < earliest unmatched end, need new room', code: 'if start < ends[end_ptr]: rooms++' },
      { title: 'Room freed', description: 'Else reuse a room, move end pointer', code: 'else: end_ptr++' },
    ],
    remember: [
      'Separate starts and ends',
      'Sort both independently',
      'New room when start < earliest end',
    ],
    understanding: `This is the "sweep line" pattern. Think of it as sweeping through time:

**At each start:** A meeting begins. If no meeting has ended yet (start < earliest end), we need a new room.

**Why sort separately?** We don't care which meeting ends—only that SOME meeting ends. Sorting separately lets us track the earliest available end time.

**Why two pointers?** The end pointer tracks "how many rooms have been freed". If we've used 3 rooms but end_ptr is at 1, we have 3-1=2 rooms in use.`,

    whyPatternWorks: `The key insight: we only care about COUNTS, not which specific meeting uses which room.

By sorting starts and ends separately:
- We know when meetings start (in order)
- We know when rooms become available (in order)
- Comparing them tells us if we need more rooms

Alternative: use a min-heap of end times (more intuitive but same complexity).`,

    keyInsights: [
      'Sweep line: process events in time order',
      'Sort starts and ends separately',
      'rooms = max concurrent meetings',
      'Alternative: min-heap of end times',
      'Also called "Meeting Rooms II"'
    ]
  },

  code: `def minMeetingRooms(intervals: list[list[int]]) -> int:
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])

    rooms = 0
    end_ptr = 0

    for start in starts:
        if start < ends[end_ptr]:
            rooms += 1
        else:
            end_ptr += 1

    return rooms`,

  inputs: [
    {
      name: 'intervals',
      type: 'string',
      default: '0,30|5,10|15,20',
      label: 'Meetings (start,end|...)',
      placeholder: '0,30|5,10|15,20',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const intervalsStr = input.intervals as string
    const intervals = intervalsStr.split('|').map(s => {
      const parts = s.split(',').map(v => parseInt(v.trim()))
      return [parts[0], parts[1]]
    }).filter(i => !isNaN(i[0]) && !isNaN(i[1]))
    const steps: AlgorithmStep[] = []

    const starts = intervals.map(i => i[0]).sort((a, b) => a - b)
    const ends = intervals.map(i => i[1]).sort((a, b) => a - b)

    steps.push({
      lineNumber: 2,
      description: 'Sort start and end times separately',
      elements: [
        { type: 'array', id: 'starts', values: starts },
        { type: 'array', id: 'ends', values: ends },
      ],
      variables: { starts, ends },
    })

    let rooms = 0
    let endPtr = 0

    for (let i = 0; i < starts.length && steps.length < 20; i++) {
      const start = starts[i]

      if (start < ends[endPtr]) {
        rooms++
        steps.push({
          lineNumber: 10,
          description: `Start ${start} < End ${ends[endPtr]}: need new room. Rooms = ${rooms}`,
          elements: [
            { type: 'array', id: 'starts', values: starts, pointers: [{ index: i, label: 'start', color: '#3B82F6' }] },
            { type: 'array', id: 'ends', values: ends, pointers: [{ index: endPtr, label: 'end', color: '#EF4444' }] },
          ],
          variables: { start, endTime: ends[endPtr], rooms, needNewRoom: true },
        })
      } else {
        endPtr++
        steps.push({
          lineNumber: 12,
          description: `Start ${start} >= End ${ends[endPtr - 1]}: reuse room. Move end pointer.`,
          elements: [
            { type: 'array', id: 'starts', values: starts, pointers: [{ index: i, label: 'start', color: '#3B82F6' }] },
            { type: 'array', id: 'ends', values: ends, pointers: [{ index: endPtr, label: 'end', color: '#EF4444' }] },
          ],
          variables: { start, endTime: ends[endPtr - 1], rooms, reuseRoom: true },
        })
      }
    }

    steps.push({
      lineNumber: 14,
      description: `Complete! Minimum rooms needed: ${rooms}`,
      elements: [],
      variables: { result: rooms },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const hasCycle: AlgorithmDefinition = {
  id: 'linked-list-cycle',
  name: 'Linked List Cycle',
  category: 'linkedList',
  difficulty: 'Easy',
  leetcodeId: 141,
  description: 'Detect if a linked list has a cycle using Floyd\'s algorithm.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'linkedList',

  examples: [
    {
      input: 'head = [3,2,0,-4], pos = 1',
      output: 'true',
      explanation: 'Tail connects to node at index 1, creating a cycle.'
    },
    {
      input: 'head = [1,2], pos = 0',
      output: 'true',
      explanation: 'Tail connects to head, creating a cycle.'
    },
    {
      input: 'head = [1], pos = -1',
      output: 'false',
      explanation: 'No cycle—single node points to null.'
    },
  ],

  education: {
    tldr: 'Two pointers: slow moves 1, fast moves 2. If they meet, there\'s a cycle.',
    steps: [
      { title: 'Initialize both at head', description: 'slow and fast start together', code: 'slow = fast = head' },
      { title: 'Move at different speeds', description: 'slow moves 1, fast moves 2', code: 'slow = slow.next; fast = fast.next.next' },
      { title: 'Check for meeting', description: 'If they meet, cycle exists', code: 'if slow == fast: return True' },
      { title: 'Fast reaches end', description: 'No cycle if fast hits null', code: 'while fast and fast.next' },
    ],
    remember: [
      'Slow: 1 step, Fast: 2 steps',
      'Meet = cycle, End = no cycle',
      'O(1) space (no hash set needed)',
    ],
    understanding: `This is Floyd's Tortoise and Hare algorithm. Think of it like two runners on a track.

**Why do they meet?** If there's a cycle, the fast pointer will "lap" the slow pointer. They must eventually be at the same node.

**Why O(1) space?** We only use two pointers instead of a hash set to track visited nodes.

**Intuition:** In a cycle, the fast pointer gains 1 step per iteration. If the cycle has length k, they'll meet within k iterations after slow enters the cycle.`,

    whyPatternWorks: `The math is elegant:

1. When slow enters the cycle, fast is somewhere ahead in the cycle
2. Each step, the gap between them decreases by 1
3. Eventually the gap becomes 0 = they meet

**If no cycle:** Fast hits null (end of list). Loop terminates naturally.`,

    keyInsights: [
      'Floyd\'s algorithm: tortoise and hare',
      'Fast gains 1 step per iteration in a cycle',
      'O(1) space vs O(n) for hash set approach',
      'Also used to find cycle START (different problem)',
      'Works because relative speed = 1 step/iteration'
    ]
  },

  code: `def hasCycle(head: ListNode) -> bool:
    slow = fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

        if slow == fast:
            return True

    return False`,

  inputs: [
    {
      name: 'values',
      type: 'string',
      default: '3,2,0,-4',
      label: 'List Values',
      placeholder: '3,2,0,-4',
    },
    {
      name: 'cyclePos',
      type: 'number',
      default: 1,
      label: 'Cycle Position (-1 for no cycle)',
      placeholder: '1',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const valuesStr = input.values as string
    const values = valuesStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const cyclePos = input.cyclePos as number
    const steps: AlgorithmStep[] = []
    
    if (values.length === 0) {
      steps.push({
        lineNumber: 1,
        description: 'Empty list - no cycle possible',
        elements: [],
        variables: { hasCycle: false },
        isComplete: true,
      })
      return steps
    }

    const hasCycleFlag = cyclePos >= 0 && cyclePos < values.length

    // Helper to advance pointer with proper cycle wrapping
    const advancePointer = (pos: number, stepCount: number): number | null => {
      let newPos = pos
      for (let i = 0; i < stepCount; i++) {
        const nextPos = newPos + 1
        if (nextPos >= values.length) {
          // Reached end of list
          if (hasCycleFlag) {
            // Wrap to cycle position
            newPos = cyclePos
          } else {
            // No cycle - reached end
            return null
          }
        } else {
          newPos = nextPos
        }
      }
      return newPos
    }

    steps.push({
      lineNumber: 2,
      description: 'Initialize slow and fast pointers at head',
      elements: [
        { type: 'array', id: 'list', values: [...values], pointers: [
          { index: 0, label: 'slow', color: '#3B82F6' },
          { index: 0, label: 'fast', color: '#EF4444' },
        ] },
      ],
      variables: { slow: 0, fast: 0, cycleAt: hasCycleFlag ? cyclePos : 'none' },
    })

    let slow = 0
    let fast = 0

    // Simulate Floyd's algorithm
    for (let iter = 0; iter < 25 && steps.length < 20; iter++) {
      // Move slow by 1, fast by 2
      const newSlow = advancePointer(slow, 1)
      const newFast = advancePointer(fast, 2)

      // Check if fast reached end (no cycle)
      if (newFast === null) {
        steps.push({
          lineNumber: 4,
          description: 'Fast pointer reached end of list - no cycle',
          elements: [
            { type: 'array', id: 'list', values: [...values], pointers: [
              { index: slow, label: 'slow', color: '#3B82F6' },
            ] },
          ],
          variables: { hasCycle: false },
          isComplete: true,
        })
        return steps
      }

      slow = newSlow!
      fast = newFast

      steps.push({
        lineNumber: 5,
        description: `Move slow to ${slow}, fast to ${fast}`,
        elements: [
          { type: 'array', id: 'list', values: [...values], pointers: [
            { index: slow, label: 'slow', color: '#3B82F6' },
            { index: fast, label: 'fast', color: '#EF4444' },
          ] },
        ],
        variables: { slow, fast, slow_val: values[slow], fast_val: values[fast] },
      })

      // Check if they meet
      if (slow === fast) {
        steps.push({
          lineNumber: 8,
          description: `Cycle detected! slow == fast at index ${slow}`,
          elements: [
            { type: 'array', id: 'list', values: [...values], pointers: [
              { index: slow, label: 'meet', color: '#16A34A' },
            ], highlights: values.map((_, i) => ({ index: i, style: 'found' as const })) },
          ],
          variables: { hasCycle: true, meetAt: slow },
          isComplete: true,
        })
        return steps
      }
    }

    // Fallback - shouldn't reach here with valid inputs
    steps.push({
      lineNumber: 10,
      description: 'Algorithm terminated',
      elements: [{ type: 'array', id: 'list', values: [...values] }],
      variables: { hasCycle: hasCycleFlag },
      isComplete: true,
    })

    return steps
  },
}

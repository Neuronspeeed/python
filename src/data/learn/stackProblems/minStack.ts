import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const minStack: AlgorithmDefinition = {
  id: 'min-stack',
  name: 'Min Stack',
  category: 'stack',
  difficulty: 'Medium',
  leetcodeId: 155,
  description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 'push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()',
      output: 'null, null, null, -3, null, 0, -2',
      explanation: 'After pushing -2,0,-3: min is -3. Pop -3, top is 0, min is now -2.'
    },
  ],

  education: {
    tldr: 'Store (value, current_min) pairs. Each element knows the min at that point in time.',
    steps: [
      { title: 'Push', description: 'Store value AND current minimum together', code: 'stack.push((val, min(val, stack[-1].min)))' },
      { title: 'Pop', description: 'Just pop—previous min is already stored', code: 'stack.pop()' },
      { title: 'Top', description: 'Return the value part', code: 'return stack[-1][0]' },
      { title: 'GetMin', description: 'Return the min part', code: 'return stack[-1][1]' },
    ],
    remember: [
      'Each entry stores (value, min_so_far)',
      'Min is computed at push time',
      'All operations are O(1)',
    ],
    understanding: `The trick is storing extra information with each element.

**Key insight:** When we push, we know the minimum SO FAR. Store it! When we pop, the previous element still has its correct min stored.

**Why it works:** Each element "remembers" what the minimum was when it was pushed. Popping doesn't break this—the previous element's min is still valid.

**Trade-off:** We use O(n) extra space to store mins, but get O(1) getMin().`,

    whyPatternWorks: `By storing (value, min) pairs:

\`\`\`
push(-2): stack = [(-2, -2)]  # min is -2
push(0):  stack = [(-2, -2), (0, -2)]  # min still -2
push(-3): stack = [(-2, -2), (0, -2), (-3, -3)]  # new min -3

pop():    stack = [(-2, -2), (0, -2)]  # min reverts to -2
\`\`\`

Each element carries its context. No need to recalculate!`,

    keyInsights: [
      'Store extra state (min) with each element',
      'Compute min at push time, not query time',
      'Space-time trade-off: O(n) space for O(1) query',
      'Alternative: use two stacks (main + mins)',
      'Pattern: augment data structure with precomputed info'
    ]
  },

  code: `class MinStack:
    def __init__(self):
        self.stack = []      # (value, current_min)

    def push(self, val: int) -> None:
        if not self.stack:
            self.stack.append((val, val))
        else:
            current_min = min(val, self.stack[-1][1])
            self.stack.append((val, current_min))

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        return self.stack[-1][1]`,

  inputs: [
    {
      name: 'operations',
      type: 'string',
      default: 'push 5, push 2, push 7, getMin, pop, getMin, push 1, getMin',
      label: 'Operations',
      placeholder: 'push 5, push 2, getMin, pop',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const opsStr = input.operations as string
    const operations = opsStr.split(',').map(s => s.trim())
    const steps: AlgorithmStep[] = []
    const stack: { val: number; min: number }[] = []

    steps.push({
      lineNumber: 3,
      description: 'Initialize MinStack with empty stack storing (value, min) pairs',
      elements: [
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { stack: '[]' },
    })

    for (const op of operations) {
      const parts = op.split(' ')
      const action = parts[0].toLowerCase()

      if (action === 'push') {
        const val = parseInt(parts[1])
        const currentMin = stack.length === 0 ? val : Math.min(val, stack[stack.length - 1].min)
        stack.push({ val, min: currentMin })

        steps.push({
          lineNumber: 8,
          description: `push(${val}): min = min(${val}, ${stack.length > 1 ? stack[stack.length - 2].min : val}) = ${currentMin}`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(s => `${s.val} (min:${s.min})`), highlights: [{ index: 0, style: 'active' }] },
          ],
          variables: { pushed: val, currentMin },
        })
      } else if (action === 'pop') {
        const popped = stack.pop()
        steps.push({
          lineNumber: 12,
          description: `pop(): removed ${popped?.val}`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(s => `${s.val} (min:${s.min})`) },
          ],
          variables: { popped: popped?.val ?? 'empty' },
        })
      } else if (action === 'top') {
        const topVal = stack.length > 0 ? stack[stack.length - 1].val : null
        steps.push({
          lineNumber: 15,
          description: `top(): returns ${topVal}`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(s => `${s.val} (min:${s.min})`), highlights: stack.length > 0 ? [{ index: 0, style: 'active' }] : [] },
          ],
          variables: { top: topVal ?? 'empty' },
        })
      } else if (action === 'getmin') {
        const minVal = stack.length > 0 ? stack[stack.length - 1].min : null
        steps.push({
          lineNumber: 18,
          description: `getMin(): returns ${minVal} in O(1)`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(s => `${s.val} (min:${s.min})`), highlights: stack.length > 0 ? [{ index: 0, style: 'found' }] : [] },
          ],
          variables: { min: minVal ?? 'empty' },
        })
      }

      if (steps.length > 30) break
    }

    steps.push({
      lineNumber: 18,
      description: 'All operations complete!',
      elements: [
        { type: 'stack', id: 'stack', items: stack.map(s => `${s.val} (min:${s.min})`) },
      ],
      variables: { finalSize: stack.length },
      isComplete: true,
    })

    return steps
  },
}

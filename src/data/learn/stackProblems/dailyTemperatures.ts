import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const dailyTemperatures: AlgorithmDefinition = {
  id: 'daily-temperatures',
  name: 'Daily Temperatures',
  category: 'stack',
  difficulty: 'Medium',
  leetcodeId: 739,
  description: 'Given daily temperatures, find how many days until a warmer temperature for each day.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 'temperatures = [73, 74, 75, 71, 69, 72, 76, 73]',
      output: '[1, 1, 4, 2, 1, 1, 0, 0]',
      explanation: 'Day 0 (73°) waits 1 day for 74°. Day 2 (75°) waits 4 days for 76°.'
    },
    {
      input: 'temperatures = [30, 40, 50, 60]',
      output: '[1, 1, 1, 0]',
      explanation: 'Each day has a warmer day right after (except the last).'
    },
    {
      input: 'temperatures = [30, 60, 90]',
      output: '[1, 1, 0]',
      explanation: 'Strictly increasing—each waits just 1 day.'
    },
  ],

  education: {
    tldr: 'Monotonic decreasing stack. When we find warmer, pop and calculate wait time.',
    steps: [
      { title: 'Process each day', description: 'Compare current temp to stack top', code: 'for i, temp in enumerate(temperatures)' },
      { title: 'While warmer than stack top', description: 'Pop and calculate days waited', code: 'while stack and temps[stack[-1]] < temp' },
      { title: 'Record wait time', description: 'Days = current index - popped index', code: 'result[prev_i] = i - prev_i' },
      { title: 'Push current', description: 'Add current day to stack', code: 'stack.append(i)' },
    ],
    remember: [
      'Stack stores INDICES, not temperatures',
      'Pop when we find a warmer day',
      'Leftover stack entries = no warmer day (0)',
    ],
    understanding: `This is the "Next Greater Element" pattern using a monotonic stack.

**Key insight:** We're looking for the NEXT warmer day for each day. A stack helps us "remember" days still waiting for their answer.

**Why monotonic decreasing?** Days in the stack are waiting for a warmer day. When we find a warmer day, we can answer ALL the cooler days in the stack.

**Stack stores indices** because we need to calculate the distance (days waited).`,

    whyPatternWorks: `The monotonic stack pattern works because:

1. Days stay on stack until we find their answer
2. When we find a warmer day, we resolve all cooler days
3. Each element is pushed once and popped once → O(n)

**Invariant:** Stack always contains days in decreasing temperature order (from bottom to top), all waiting for a warmer day.`,

    keyInsights: [
      'Monotonic stack = "Next Greater Element" pattern',
      'Store indices, not values',
      'Pop resolves the waiting element',
      'O(n) despite nested loops (each element pushed/popped once)',
      'Leftover stack = no answer found (stays 0)'
    ]
  },

  code: `def dailyTemperatures(temperatures: list[int]) -> list[int]:
    n = len(temperatures)
    result = [0] * n
    stack = []  # Store indices

    for i, temp in enumerate(temperatures):
        # Pop all colder temperatures
        while stack and temperatures[stack[-1]] < temp:
            prev_i = stack.pop()
            result[prev_i] = i - prev_i

        stack.append(i)

    return result`,

  inputs: [
    {
      name: 'temperatures',
      type: 'array',
      default: [73, 74, 75, 71, 69, 72, 76, 73],
      label: 'Temperatures',
      placeholder: '73, 74, 75, 71, 69, 72, 76, 73',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const temps = input.temperatures as number[]
    const steps: AlgorithmStep[] = []
    const n = temps.length
    const result = new Array(n).fill(0)
    const stack: number[] = []

    steps.push({
      lineNumber: 3,
      description: `Initialize result array [${result.join(', ')}] and empty stack`,
      elements: [
        { type: 'array', id: 'temps', values: temps },
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { result: `[${result.join(', ')}]` },
    })

    for (let i = 0; i < n; i++) {
      const temp = temps[i]

      steps.push({
        lineNumber: 6,
        description: `Day ${i}: temperature = ${temp}°`,
        elements: [
          { type: 'array', id: 'temps', values: temps, highlights: [{ index: i, style: 'active' }] },
          { type: 'stack', id: 'stack', items: stack.map(idx => `${idx}:${temps[idx]}°`) },
        ],
        variables: { i, temp, stackTop: stack.length > 0 ? temps[stack[stack.length - 1]] : 'empty' },
      })

      while (stack.length > 0 && temps[stack[stack.length - 1]] < temp) {
        const prevI = stack.pop()!
        result[prevI] = i - prevI

        steps.push({
          lineNumber: 9,
          description: `${temp}° > ${temps[prevI]}°: Pop day ${prevI}, wait time = ${i} - ${prevI} = ${result[prevI]} days`,
          elements: [
            { type: 'array', id: 'temps', values: temps, highlights: [
              { index: i, style: 'active' },
              { index: prevI, style: 'found' },
            ]},
            { type: 'stack', id: 'stack', items: stack.map(idx => `${idx}:${temps[idx]}°`) },
          ],
          variables: { i, prevI, waitDays: result[prevI], result: `[${result.join(', ')}]` },
        })
      }

      stack.push(i)

      steps.push({
        lineNumber: 12,
        description: `Push day ${i} (${temp}°) to stack`,
        elements: [
          { type: 'array', id: 'temps', values: temps, highlights: [{ index: i, style: 'active' }] },
          { type: 'stack', id: 'stack', items: stack.map(idx => `${idx}:${temps[idx]}°`), highlights: [{ index: 0, style: 'active' }] },
        ],
        variables: { stackSize: stack.length },
      })

      if (steps.length > 40) break
    }

    steps.push({
      lineNumber: 14,
      description: `Complete! Result: [${result.join(', ')}]`,
      elements: [
        { type: 'array', id: 'result', values: result },
      ],
      variables: { result: `[${result.join(', ')}]` },
      isComplete: true,
    })

    return steps
  },
}

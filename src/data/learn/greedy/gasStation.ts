import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const gasStation: AlgorithmDefinition = {
  id: 'gas-station',
  name: 'Gas Station',
  category: 'greedy',
  difficulty: 'Medium',
  leetcodeId: 134,
  description: 'Find starting station to complete circular tour.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  code: `def canCompleteCircuit(gas: list[int], cost: list[int]) -> int:
    total = 0
    tank = 0
    start = 0

    for i in range(len(gas)):
        total += gas[i] - cost[i]
        tank += gas[i] - cost[i]

        if tank < 0:
            start = i + 1
            tank = 0

    return start if total >= 0 else -1`,

  inputs: [
    {
      name: 'gas',
      type: 'string',
      default: '1,2,3,4,5',
      label: 'Gas at stations',
      placeholder: '1,2,3,4,5',
    },
    {
      name: 'cost',
      type: 'string',
      default: '3,4,5,1,2',
      label: 'Cost to next station',
      placeholder: '3,4,5,1,2',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const gasStr = input.gas as string
    const costStr = input.cost as string
    const gas = gasStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const cost = costStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []

    let total = 0, tank = 0, start = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize: total=0, tank=0, start=0',
      elements: [
        { type: 'array', id: 'gas', values: gas },
        { type: 'array', id: 'cost', values: cost },
      ],
      variables: { total, tank, start },
    })

    for (let i = 0; i < gas.length && steps.length < 20; i++) {
      const net = gas[i] - cost[i]
      total += net
      tank += net

      steps.push({
        lineNumber: 7,
        description: `Station ${i}: gas=${gas[i]}, cost=${cost[i]}, net=${net}, tank=${tank}`,
        elements: [
          { type: 'array', id: 'gas', values: gas, pointers: [{ index: i, label: 'i', color: '#3B82F6' }, { index: start, label: 'start', color: '#16A34A' }] },
          { type: 'array', id: 'cost', values: cost },
        ],
        variables: { i, net, tank, total, start },
      })

      if (tank < 0) {
        start = i + 1
        tank = 0
        steps.push({
          lineNumber: 11,
          description: `Tank < 0! Reset start to ${start}, tank to 0`,
          elements: [
            { type: 'array', id: 'gas', values: gas, pointers: start < gas.length ? [{ index: start, label: 'start', color: '#16A34A' }] : [] },
            { type: 'array', id: 'cost', values: cost },
          ],
          variables: { newStart: start, tank: 0 },
        })
      }
    }

    const result = total >= 0 ? start : -1

    steps.push({
      lineNumber: 14,
      description: `Complete! ${total >= 0 ? `Start at station ${start}` : 'No solution'}`,
      elements: [
        { type: 'array', id: 'gas', values: gas, styles: gas.map((_, i) => i === start && total >= 0 ? 'found' as const : 'default' as const) },
      ],
      variables: { total, result },
      isComplete: true,
    })

    return steps
  },
}

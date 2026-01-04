import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const permutations: AlgorithmDefinition = {
  id: 'permutations',
  name: 'Permutations',
  category: 'backtracking',
  difficulty: 'Medium',
  leetcodeId: 46,
  description: 'Generate all permutations of an array.',
  timeComplexity: 'O(n × n!)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [1,2,3]',
      output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
      explanation: '3! = 6 permutations.'
    },
    {
      input: 'nums = [0,1]',
      output: '[[0,1],[1,0]]',
      explanation: '2! = 2 permutations.'
    },
  ],

  education: {
    tldr: 'No start index—can pick any remaining element at each position.',
    steps: [
      { title: 'Base case', description: 'No remaining elements = complete permutation', code: 'if not remaining: result.append(current[:])' },
      { title: 'Try each remaining', description: 'Every remaining element can go next', code: 'for i in range(len(remaining))' },
      { title: 'Choose element', description: 'Add to current, remove from remaining', code: 'current.append(remaining[i])' },
      { title: 'Recurse & backtrack', description: 'Pass modified remaining list', code: 'backtrack(current, remaining[:i] + remaining[i+1:])' },
    ],
    remember: [
      'No start index (unlike subsets/combinations)',
      'Track "remaining" elements, not visited set',
      'n! permutations for n distinct elements',
      'Permutations II (duplicates): sort + skip same values',
    ],
    understanding: `**Permutations** means ORDER matters. [1,2,3] ≠ [3,2,1].

**Key Difference from Subsets**: No start index because we can pick ANY remaining element at each position. We track what's left, not where we started.

**Why remaining list?** Each element must appear exactly once. The remaining list shrinks as we build the permutation.`,

    whyPatternWorks: `At each position, we have choices:
- Position 0: n choices
- Position 1: n-1 choices
- ...
- Position n-1: 1 choice

Total: n × (n-1) × ... × 1 = n! permutations

The "remaining" list enforces each element used exactly once.`,

    keyInsights: [
      'Key difference: permutations have no start index',
      'Remaining list vs visited set (both work)',
      'Swap-based approach avoids creating new arrays',
      'Permutations II: skip duplicates with sorting',
    ]
  },

  code: `def permute(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])
            return

        for i in range(len(remaining)):
            current.append(remaining[i])
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()

    backtrack([], nums)
    return result`,

  inputs: [
    {
      name: 'nums',
      type: 'string',
      default: '1,2,3',
      label: 'Array',
      placeholder: '1,2,3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const numsStr = input.nums as string
    const nums = numsStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const steps: AlgorithmStep[] = []
    const result: number[][] = []

    steps.push({
      lineNumber: 2,
      description: 'Start permutation backtracking',
      elements: [
        { type: 'array', id: 'nums', values: nums },
        { type: 'array', id: 'current', values: [] },
      ],
      variables: { remaining: nums, resultCount: 0 },
    })

    const backtrack = (current: number[], remaining: number[]) => {
      if (remaining.length === 0) {
        result.push([...current])
        steps.push({
          lineNumber: 6,
          description: `Found permutation: [${current.join(',')}]`,
          elements: [
            { type: 'array', id: 'current', values: [...current], highlights: current.map((_, i) => ({ index: i, style: 'found' as const })) },
          ],
          variables: { permutation: [...current], resultCount: result.length },
        })
        return
      }

      if (steps.length >= 40) return

      for (let i = 0; i < remaining.length && steps.length < 35; i++) {
        current.push(remaining[i])
        const newRemaining = [...remaining.slice(0, i), ...remaining.slice(i + 1)]

        steps.push({
          lineNumber: 10,
          description: `Choose ${remaining[i]}, remaining: [${newRemaining.join(',')}]`,
          elements: [
            { type: 'array', id: 'current', values: [...current], highlights: current.map((_, j) => ({ index: j, style: 'found' as const })) },
            { type: 'array', id: 'remaining', values: newRemaining },
          ],
          variables: { chosen: remaining[i] },
        })

        backtrack(current, newRemaining)

        const popped = current.pop()
        if (steps.length < 40) {
          steps.push({
            lineNumber: 12,
            description: `Backtrack: remove ${popped}`,
            elements: [
              { type: 'array', id: 'current', values: [...current], highlights: current.length > 0 ? current.map((_, j) => ({ index: j, style: 'active' as const })) : [] },
              { type: 'array', id: 'remaining', values: remaining },
            ],
            variables: { popped, remaining: remaining.join(',') },
          })
        }
      }
    }

    backtrack([], nums)

    steps.push({
      lineNumber: 14,
      description: `Complete! Generated ${result.length} permutations`,
      elements: [],
      variables: { totalPermutations: result.length },
      isComplete: true,
    })

    return steps
  },
}

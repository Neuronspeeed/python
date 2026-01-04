import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const combinationSum: AlgorithmDefinition = {
  id: 'combination-sum',
  name: 'Combination Sum',
  category: 'backtracking',
  difficulty: 'Medium',
  leetcodeId: 39,
  description: 'Find combinations that sum to target (can reuse elements).',
  timeComplexity: 'O(n^(T/M))',
  spaceComplexity: 'O(T/M)',
  visualizationType: 'array',

  examples: [
    {
      input: 'candidates = [2,3,6,7], target = 7',
      output: '[[2,2,3], [7]]',
      explanation: '2+2+3=7 and 7=7. Can reuse 2.'
    },
    {
      input: 'candidates = [2,3,5], target = 8',
      output: '[[2,2,2,2], [2,3,3], [3,5]]',
      explanation: 'Multiple ways to reach 8.'
    },
  ],

  education: {
    tldr: 'Backtrack with "remaining" sum. Pass start index to allow reuse without duplicates.',
    steps: [
      { title: 'Base: remaining=0', description: 'Found valid combination', code: 'if remaining == 0: result.append(current[:])' },
      { title: 'Base: remaining<0', description: 'Overshot, backtrack', code: 'if remaining < 0: return' },
      { title: 'Try each candidate', description: 'From start index (allows reuse)', code: 'for i in range(start, len(candidates))' },
      { title: 'Recurse with i', description: 'Pass i, not i+1 (reuse allowed)', code: 'backtrack(i, current, remaining - candidates[i])' },
    ],
    remember: [
      'Pass start index to avoid duplicate combinations',
      'Recurse with i (not i+1) to allow reuse',
      'Combination Sum II: no reuse → use i+1',
      'Early termination: sort and break when candidate > remaining',
    ],
    understanding: `**Combination Sum**: Find ways to reach a target sum, reusing elements allowed.

**Key Insight**: Use start index to prevent counting the same combination multiple times (e.g., [2,3] and [3,2]).

**Why pass i instead of i+1?** We can reuse the same element. Passing i means "I can pick candidates[i] again."`,

    whyPatternWorks: `The backtracking tree explores all possibilities:
- At each node, try candidates from start onwards
- Subtract from remaining and recurse
- If remaining hits 0, we found a valid path
- If negative, prune this branch

The start index ensures we only go "forward" in candidates, avoiding duplicates.`,

    keyInsights: [
      'start index prevents duplicate combos',
      'Reuse = pass i; no reuse = pass i+1',
      'Sort + prune: if candidate > remaining, break',
      'Current list is modified in-place (append/pop)',
    ]
  },

  code: `def combinationSum(candidates: list[int], target: int) -> list[list[int]]:
    result = []

    def backtrack(start, current, remaining):
        if remaining == 0:
            result.append(current[:])
            return
        if remaining < 0:
            return

        for i in range(start, len(candidates)):
            current.append(candidates[i])
            backtrack(i, current, remaining - candidates[i])
            current.pop()

    backtrack(0, [], target)
    return result`,

  inputs: [
    {
      name: 'candidates',
      type: 'string',
      default: '2,3,6,7',
      label: 'Candidates',
      placeholder: '2,3,6,7',
    },
    {
      name: 'target',
      type: 'number',
      default: 7,
      label: 'Target',
      placeholder: '7',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const candStr = input.candidates as string
    const candidates = candStr.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    const target = input.target as number
    const steps: AlgorithmStep[] = []
    const result: number[][] = []

    steps.push({
      lineNumber: 2,
      description: `Find combinations summing to ${target}`,
      elements: [
        { type: 'array', id: 'candidates', values: candidates },
        { type: 'array', id: 'current', values: [] },
      ],
      variables: { target, remaining: target },
    })

    const backtrack = (start: number, current: number[], remaining: number) => {
      if (remaining === 0) {
        result.push([...current])
        steps.push({
          lineNumber: 5,
          description: `Found combination: [${current.join('+')}] = ${target}`,
          elements: [
            { type: 'array', id: 'current', values: [...current], highlights: current.map((_, i) => ({ index: i, style: 'found' as const })) },
          ],
          variables: { combination: [...current], sum: target },
        })
        return
      }
      if (remaining < 0 || steps.length >= 40) return

      for (let i = start; i < candidates.length && steps.length < 35; i++) {
        current.push(candidates[i])
        const newRemaining = remaining - candidates[i]

        steps.push({
          lineNumber: 11,
          description: `Try ${candidates[i]}, sum=${target - newRemaining}, remaining=${newRemaining}`,
          elements: [
            { type: 'array', id: 'candidates', values: candidates, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
            { type: 'array', id: 'current', values: [...current] },
          ],
          variables: { trying: candidates[i], remaining: newRemaining },
        })

        backtrack(i, current, newRemaining)

        const popped = current.pop()
        if (steps.length < 40) {
          steps.push({
            lineNumber: 13,
            description: `Backtrack: remove ${popped}, try next candidate`,
            elements: [
              { type: 'array', id: 'candidates', values: candidates, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
              { type: 'array', id: 'current', values: [...current], highlights: current.length > 0 ? current.map((_, j) => ({ index: j, style: 'active' as const })) : [] },
            ],
            variables: { popped, remaining },
          })
        }
      }
    }

    backtrack(0, [], target)

    steps.push({
      lineNumber: 15,
      description: `Complete! Found ${result.length} combinations`,
      elements: [],
      variables: { totalCombinations: result.length },
      isComplete: true,
    })

    return steps
  },
}

import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const subsets: AlgorithmDefinition = {
  id: 'subsets',
  name: 'Subsets',
  category: 'backtracking',
  difficulty: 'Medium',
  leetcodeId: 78,
  description: 'Generate all possible subsets of an array.',
  timeComplexity: 'O(n × 2^n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 'nums = [1,2,3]',
      output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      explanation: '2^3 = 8 subsets including empty set.'
    },
    {
      input: 'nums = [0]',
      output: '[[],[0]]',
      explanation: '2^1 = 2 subsets.'
    },
  ],

  education: {
    tldr: 'Include current at every node (not just leaves). For each element: include or exclude.',
    steps: [
      { title: 'Add current to result', description: 'Every state is a valid subset', code: 'result.append(current[:])' },
      { title: 'Iterate from start', description: 'Try including each remaining element', code: 'for i in range(start, len(nums))' },
      { title: 'Include element', description: 'Add to current subset', code: 'current.append(nums[i])' },
      { title: 'Recurse & backtrack', description: 'Explore, then remove', code: 'backtrack(i+1, current); current.pop()' },
    ],
    remember: [
      'Add to result FIRST (not at base case)',
      'Start index prevents duplicates',
      'i+1 in recursion (each element used once)',
      '2^n subsets for n elements',
    ],
    understanding: `**Subsets** is the purest backtracking problem. Every node in the recursion tree is a valid subset.

**Key Insight**: Unlike combinations/permutations, we add to result IMMEDIATELY, not just at leaves. The empty set, partial sets, and full set are all valid.

**Why start index?** Ensures each subset is generated exactly once by only considering elements "after" current position.`,

    whyPatternWorks: `Each element has two choices: include or exclude.
- The recursion tree has 2^n leaves
- But we add at every node, not just leaves
- Start index ensures [1,2] ≠ [2,1]—we only go forward

The pattern: add current, then for each remaining element, include it and recurse.`,

    keyInsights: [
      'Every recursion state = valid subset',
      'Subsets II (with duplicates): sort + skip adjacent dupes',
      'Bit manipulation alternative: iterate 0 to 2^n-1',
      'Foundation for combinations and permutations',
    ]
  },

  code: `def subsets(nums: list[int]) -> list[list[int]]:
    result = []

    def backtrack(start, current):
        result.append(current[:])

        for i in range(start, len(nums)):
            current.append(nums[i])
            backtrack(i + 1, current)
            current.pop()

    backtrack(0, [])
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
      description: 'Start backtracking from index 0',
      elements: [
        { type: 'array', id: 'nums', values: nums },
        { type: 'array', id: 'current', values: [] },
      ],
      variables: { start: 0, resultCount: 0 },
    })

    const backtrack = (start: number, current: number[]) => {
      result.push([...current])

      steps.push({
        lineNumber: 5,
        description: `Add [${current.join(',')}] to result`,
        elements: [
          { type: 'array', id: 'nums', values: nums, pointers: start < nums.length ? [{ index: start, label: 'start', color: '#3B82F6' }] : [] },
          { type: 'array', id: 'current', values: [...current], styles: current.map(() => 'found' as const) },
        ],
        variables: { subset: [...current], resultCount: result.length },
      })

      if (steps.length >= 40) return

      for (let i = start; i < nums.length && steps.length < 40; i++) {
        current.push(nums[i])

        steps.push({
          lineNumber: 8,
          description: `Add ${nums[i]} to current`,
          elements: [
            { type: 'array', id: 'nums', values: nums, pointers: [{ index: i, label: 'i', color: '#3B82F6' }] },
            { type: 'array', id: 'current', values: [...current], styles: current.map(() => 'found' as const) },
          ],
          variables: { i, added: nums[i] },
        })

        backtrack(i + 1, current)

        current.pop()

        if (steps.length < 40) {
          steps.push({
            lineNumber: 10,
            description: `Backtrack: remove ${nums[i]}`,
            elements: [
              { type: 'array', id: 'nums', values: nums },
              { type: 'array', id: 'current', values: [...current] },
            ],
            variables: { removed: nums[i] },
          })
        }
      }
    }

    backtrack(0, [])

    steps.push({
      lineNumber: 12,
      description: `Complete! Generated ${result.length} subsets`,
      elements: [
        { type: 'array', id: 'result', values: result.map(s => `[${s.join(',')}]`) as unknown as number[] },
      ],
      variables: { totalSubsets: result.length },
      isComplete: true,
    })

    return steps
  },
}

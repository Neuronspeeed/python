import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const maxPointsFromCards: AlgorithmDefinition = {
  id: 'max-points-from-cards',
  name: 'Maximum Points from Cards',
  category: 'slidingWindow',
  difficulty: 'Medium',
  leetcodeId: 1423,
  description: 'Pick exactly k cards from either end of the row to maximize your score.',
  timeComplexity: 'O(k)',
  spaceComplexity: 'O(1)',
  visualizationType: 'array',

  examples: [
    {
      input: 'cardPoints = [1, 2, 3, 4, 5, 6, 1], k = 3',
      output: '12',
      explanation: 'Take 1 from left, 6 and 1 from right. Total = 1 + 6 + 1 = 12 (or 5 + 6 + 1 = 12).'
    },
    {
      input: 'cardPoints = [9, 7, 7, 9, 7, 7, 9], k = 7',
      output: '55',
      explanation: 'Take all cards.'
    },
  ],

  education: {
    tldr: 'Taking k from ends = leaving n-k in middle. Find minimum sum window of size n-k.',
    steps: [
      { title: 'Invert the problem', description: 'Max from ends = Total - min from middle', code: 'window_size = n - k' },
      { title: 'Find middle window', description: 'Slide window of size n-k', code: 'min_sum = sliding window minimum' },
      { title: 'Subtract from total', description: 'Answer = total - min_sum', code: 'return sum(cards) - min_sum' },
    ],
    remember: [
      'Invert: ends problem → middle problem',
      'Fixed window of size n-k',
      'Minimize middle = maximize ends',
    ],
    understanding: `This is a clever inversion. Taking k cards from the ends means leaving (n-k) cards in the middle.

**The insight:** If we minimize the sum of the middle (n-k) cards, we maximize what's left (the k end cards).

**Why sliding window?** The middle cards form a contiguous subarray. We slide a window of fixed size (n-k) to find the minimum sum.

**Edge case:** If k == n, take all cards (no middle window).`,

    whyPatternWorks: `This demonstrates problem transformation:

1. **Original:** Pick k from ends (complex—many combinations)
2. **Transformed:** Find min sum window of fixed size (simple sliding window)

By inverting the problem, we convert a tricky "ends" problem into a standard fixed-size sliding window.`,

    keyInsights: [
      'Invert: maximize ends → minimize middle',
      'Fixed window of size n-k',
      'answer = total - min_window_sum',
      'O(n) time with O(1) extra space',
      'If k == n, answer is just sum of all cards'
    ]
  },

  code: `def maxScore(cardPoints: list[int], k: int) -> int:
    n = len(cardPoints)

    # If taking all cards
    if k == n:
        return sum(cardPoints)

    # Find minimum sum window of size (n - k)
    window_size = n - k
    window_sum = sum(cardPoints[:window_size])
    min_sum = window_sum

    for i in range(window_size, n):
        window_sum += cardPoints[i] - cardPoints[i - window_size]
        min_sum = min(min_sum, window_sum)

    return sum(cardPoints) - min_sum`,

  inputs: [
    {
      name: 'cardPoints',
      type: 'array',
      default: [1, 2, 3, 4, 5, 6, 1],
      label: 'Card Points',
      placeholder: '1, 2, 3, 4, 5, 6, 1',
    },
    {
      name: 'k',
      type: 'number',
      default: 3,
      label: 'Cards to Pick (k)',
      placeholder: '3',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const cards = input.cardPoints as number[]
    const k = input.k as number
    const n = cards.length
    const steps: AlgorithmStep[] = []

    const total = cards.reduce((a, b) => a + b, 0)

    if (k >= n) {
      steps.push({
        lineNumber: 5,
        description: `k >= n, take all cards. Sum = ${total}`,
        elements: [
          { type: 'array', id: 'cards', values: cards, highlights: cards.map((_, i) => ({ index: i, style: 'found' as const })) },
        ],
        variables: { result: total },
        isComplete: true,
      })
      return steps
    }

    const windowSize = n - k

    steps.push({
      lineNumber: 8,
      description: `Invert: find min sum of middle ${windowSize} cards. Total = ${total}`,
      elements: [
        { type: 'array', id: 'cards', values: cards },
      ],
      variables: { total, window_size: windowSize, k },
    })

    let windowSum = cards.slice(0, windowSize).reduce((a, b) => a + b, 0)
    let minSum = windowSum

    steps.push({
      lineNumber: 10,
      description: `Initial window [0..${windowSize - 1}]: sum = ${windowSum}`,
      elements: [
        { type: 'array', id: 'cards', values: cards, highlights:
          Array.from({ length: windowSize }, (_, i) => ({ index: i, style: 'active' as const }))
        },
        { type: 'bracket', id: 'window', left: 0, right: windowSize - 1, value: `sum = ${windowSum}` },
      ],
      variables: { window_sum: windowSum, min_sum: minSum },
    })

    for (let i = windowSize; i < n; i++) {
      const add = cards[i]
      const remove = cards[i - windowSize]
      windowSum += add - remove

      steps.push({
        lineNumber: 14,
        description: `Slide: add ${add}, remove ${remove}. Window sum = ${windowSum}`,
        elements: [
          { type: 'array', id: 'cards', values: cards, highlights: [
            { index: i - windowSize, style: 'comparing' },
            { index: i, style: 'active' },
            ...Array.from({ length: windowSize - 1 }, (_, j) => ({ index: i - windowSize + 1 + j, style: 'found' as const })),
          ]},
          { type: 'bracket', id: 'window', left: i - windowSize + 1, right: i, value: `sum = ${windowSum}` },
        ],
        variables: { window_sum: windowSum, add, remove },
      })

      if (windowSum < minSum) {
        minSum = windowSum
        steps.push({
          lineNumber: 15,
          description: `New minimum! min_sum = ${minSum}`,
          elements: [
            { type: 'array', id: 'cards', values: cards, highlights:
              Array.from({ length: windowSize }, (_, j) => ({ index: i - windowSize + 1 + j, style: 'found' as const }))
            },
          ],
          variables: { min_sum: minSum },
        })
      }

      if (steps.length > 25) break
    }

    const result = total - minSum
    steps.push({
      lineNumber: 17,
      description: `Max points = ${total} - ${minSum} = ${result}`,
      elements: [
        { type: 'array', id: 'cards', values: cards },
      ],
      variables: { total, min_sum: minSum, result },
      isComplete: true,
    })

    return steps
  },
}

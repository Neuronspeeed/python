import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const coinChange: AlgorithmDefinition = {
  id: 'coin-change',
  name: 'Coin Change',
  category: 'dynamicProgramming',
  difficulty: 'Medium',
  leetcodeId: 322,
  description: 'Find minimum number of coins needed to make up an amount.',
  timeComplexity: 'O(n × amount)',
  spaceComplexity: 'O(amount)',
  visualizationType: 'array',

  code: `def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1`,

  inputs: [
    {
      name: 'coins',
      type: 'array',
      default: [1, 2, 5],
      label: 'Coin denominations',
      placeholder: '1, 2, 5',
    },
    {
      name: 'amount',
      type: 'number',
      default: 11,
      label: 'Target amount',
      placeholder: '11',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const coins = input.coins as number[]
    const amount = input.amount as number
    const steps: AlgorithmStep[] = []

    const INF = amount + 1
    const dp = new Array(amount + 1).fill(INF)
    dp[0] = 0

    steps.push({
      lineNumber: 2,
      description: `Initialize dp[0..${amount}] with infinity, dp[0] = 0`,
      elements: [
        { type: 'array', id: 'dp', values: dp.slice(0, Math.min(dp.length, 15)).map(v => v === INF ? -1 : v) },
      ],
      variables: { coins: coins.join(', '), amount },
    })

    for (const coin of coins) {
      steps.push({
        lineNumber: 5,
        description: `Process coin = ${coin}`,
        elements: [
          { type: 'array', id: 'dp', values: dp.slice(0, Math.min(dp.length, 15)).map(v => v === INF ? -1 : v) },
        ],
        variables: { coin },
      })

      for (let x = coin; x <= amount; x++) {
        if (dp[x - coin] + 1 < dp[x]) {
          dp[x] = dp[x - coin] + 1

          const displayLen = Math.min(dp.length, 15)
          const highlights: { index: number; style: 'active' | 'found' }[] = []
          if (x < displayLen) highlights.push({ index: x, style: 'active' })
          if (x - coin >= 0 && x - coin < displayLen) highlights.push({ index: x - coin, style: 'found' })

          steps.push({
            lineNumber: 7,
            description: `dp[${x}] = min(dp[${x}], dp[${x - coin}] + 1) = ${dp[x]}`,
            elements: [
              { type: 'array', id: 'dp', values: dp.slice(0, displayLen).map(v => v === INF ? -1 : v), highlights },
            ],
            variables: { x, coin, dpX: dp[x], dpXMinusCoin: dp[x - coin] },
          })
        }

        if (steps.length > 50) break
      }
      if (steps.length > 50) break
    }

    const result = dp[amount] === INF ? -1 : dp[amount]
    steps.push({
      lineNumber: 9,
      description: result === -1 ? `Impossible to make ${amount}` : `Minimum coins for ${amount} = ${result}`,
      elements: [
        { type: 'array', id: 'dp', values: dp.slice(0, Math.min(dp.length, 15)).map(v => v === INF ? -1 : v) },
      ],
      variables: { result },
      isComplete: true,
    })

    return steps
  },
}

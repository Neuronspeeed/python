import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const longestCommonSubsequence: AlgorithmDefinition = {
  id: 'longest-common-subsequence',
  name: 'Longest Common Subsequence',
  category: 'dynamicProgramming',
  difficulty: 'Medium',
  leetcodeId: 1143,
  description: 'Find the length of the longest subsequence common to both strings.',
  timeComplexity: 'O(m × n)',
  spaceComplexity: 'O(m × n)',
  visualizationType: 'matrix',

  code: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])

    return dp[m][n]`,

  inputs: [
    {
      name: 'text1',
      type: 'string',
      default: 'abcde',
      label: 'Text 1',
      placeholder: 'abcde',
    },
    {
      name: 'text2',
      type: 'string',
      default: 'ace',
      label: 'Text 2',
      placeholder: 'ace',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const text1 = input.text1 as string
    const text2 = input.text2 as string
    const steps: AlgorithmStep[] = []
    const m = text1.length
    const n = text2.length

    // Create flattened DP table for visualization
    const dp: number[][] = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0))
    const flattenDp = () => {
      const flat: number[] = []
      for (let i = 0; i <= Math.min(m, 5); i++) {
        for (let j = 0; j <= Math.min(n, 5); j++) {
          flat.push(dp[i][j])
        }
      }
      return flat
    }

    steps.push({
      lineNumber: 3,
      description: `Initialize ${m + 1}×${n + 1} DP table with zeros`,
      elements: [
        { type: 'array', id: 'dp', values: flattenDp() },
      ],
      variables: { m, n, text1, text2 },
    })

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (text1[i - 1] === text2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1] + 1

          steps.push({
            lineNumber: 7,
            description: `text1[${i - 1}]='${text1[i - 1]}' == text2[${j - 1}]='${text2[j - 1]}': dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}`,
            elements: [
              { type: 'array', id: 'dp', values: flattenDp() },
            ],
            variables: { i, j, match: true, lcs: dp[i][j] },
          })
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])

          steps.push({
            lineNumber: 9,
            description: `'${text1[i - 1]}' != '${text2[j - 1]}': dp[${i}][${j}] = max(${dp[i - 1][j]}, ${dp[i][j - 1]}) = ${dp[i][j]}`,
            elements: [
              { type: 'array', id: 'dp', values: flattenDp() },
            ],
            variables: { i, j, match: false, lcs: dp[i][j] },
          })
        }

        if (steps.length > 25) break
      }
      if (steps.length > 25) break
    }

    steps.push({
      lineNumber: 11,
      description: `Complete! LCS length = ${dp[m][n]}`,
      elements: [
        { type: 'array', id: 'dp', values: flattenDp() },
      ],
      variables: { result: dp[m][n] },
      isComplete: true,
    })

    return steps
  },
}

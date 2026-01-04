import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const minWindowSubstring: AlgorithmDefinition = {
  id: 'minimum-window-substring',
  name: 'Minimum Window Substring',
  category: 'slidingWindow',
  difficulty: 'Hard',
  leetcodeId: 76,
  description: 'Find the minimum window in s that contains all characters of t.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'array',

  examples: [
    {
      input: 's = "ADOBECODEBANC", t = "ABC"',
      output: '"BANC"',
      explanation: 'BANC is the smallest window containing A, B, and C.'
    },
    {
      input: 's = "a", t = "a"',
      output: '"a"',
      explanation: 'Entire string is the minimum window.'
    },
    {
      input: 's = "a", t = "aa"',
      output: '""',
      explanation: 'Need 2 As but string only has 1.'
    },
  ],

  education: {
    tldr: 'Expand until valid (has all chars). Shrink to find minimum. Track best window.',
    steps: [
      { title: 'Count target', description: 'Build frequency map of t', code: 'need = Counter(t)' },
      { title: 'Expand right', description: 'Add chars until window is valid', code: 'have[char]++, check if formed' },
      { title: 'Shrink left', description: 'While valid, try to minimize', code: 'while valid: shrink, update best' },
      { title: 'Track minimum', description: 'Save smallest valid window', code: 'if len < best: best = (left, right)' },
    ],
    remember: [
      'formed tracks unique chars fully matched',
      'Shrink only while window is valid',
      'Update minimum INSIDE the shrink loop',
    ],
    understanding: `This combines variable-size sliding window with frequency counting. We need ALL characters of t (including duplicates).

**Two frequency maps:**
- \`need\`: what we need (from t)
- \`have\`: what we currently have in window

**formed counter:** Tracks how many unique chars have sufficient count. When formed == required, window is valid.

**The shrink loop:** Once valid, we shrink from left, updating minimum at each step. We stop when the window becomes invalid.`,

    whyPatternWorks: `This is the template for "minimum window containing X" problems:

1. **Expand** until constraint is satisfied
2. **Record** current window (it's valid)
3. **Shrink** to find a smaller valid window
4. **Repeat** until right reaches end

The key insight: we only shrink when valid, so we never miss a potential minimum.`,

    keyInsights: [
      'Use frequency maps to track char requirements',
      'formed counter avoids comparing entire maps',
      'Shrink loop finds minimum while valid',
      'Update minimum inside shrink, not outside',
      'O(n) because each char added/removed at most once'
    ]
  },

  code: `def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""

    need = Counter(t)
    have = {}
    required = len(need)
    formed = 0
    left = 0
    result = (float('inf'), 0, 0)  # (length, left, right)

    for right, char in enumerate(s):
        have[char] = have.get(char, 0) + 1

        if char in need and have[char] == need[char]:
            formed += 1

        while formed == required:
            if right - left + 1 < result[0]:
                result = (right - left + 1, left, right)

            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                formed -= 1
            left += 1

    return "" if result[0] == float('inf') else s[result[1]:result[2]+1]`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: 'ADOBECODEBANC',
      label: 'String S',
      placeholder: 'ADOBECODEBANC',
    },
    {
      name: 't',
      type: 'string',
      default: 'ABC',
      label: 'Target T',
      placeholder: 'ABC',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const t = input.t as string
    const steps: AlgorithmStep[] = []
    const chars = s.split('').map(c => c.charCodeAt(0))

    const need: Record<string, number> = {}
    for (const c of t) need[c] = (need[c] || 0) + 1
    const have: Record<string, number> = {}
    const required = Object.keys(need).length
    let formed = 0
    let left = 0
    let result = { len: Infinity, left: 0, right: 0 }

    steps.push({
      lineNumber: 6,
      description: `Need: ${JSON.stringify(need)}, required = ${required} unique chars`,
      elements: [
        { type: 'array', id: 'chars', values: chars },
      ],
      variables: { need: JSON.stringify(need), required },
    })

    for (let right = 0; right < s.length; right++) {
      const char = s[right]
      have[char] = (have[char] || 0) + 1

      if (need[char] && have[char] === need[char]) {
        formed++
      }

      steps.push({
        lineNumber: 13,
        description: `Add '${char}': have[${char}]=${have[char]}, formed=${formed}/${required}`,
        elements: [
          { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
          { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
          { type: 'array', id: 'chars', values: chars, highlights: [{ index: right, style: 'active' }] },
        ],
        variables: { formed, required, char },
      })

      while (formed === required) {
        const windowLen = right - left + 1
        if (windowLen < result.len) {
          result = { len: windowLen, left, right }
          steps.push({
            lineNumber: 19,
            description: `Valid window! Length ${windowLen} is new minimum`,
            elements: [
              { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
              { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
              { type: 'array', id: 'chars', values: chars, highlights:
                Array.from({ length: right - left + 1 }, (_, i) => ({ index: left + i, style: 'found' as const }))
              },
            ],
            variables: { window_len: windowLen, result: s.slice(left, right + 1) },
          })
        }

        const leftChar = s[left]
        have[leftChar]--
        if (need[leftChar] && have[leftChar] < need[leftChar]) {
          formed--
        }

        steps.push({
          lineNumber: 23,
          description: `Shrink: remove '${leftChar}', left = ${left + 1}`,
          elements: [
            { type: 'pointer', id: 'left', index: left, label: 'L', color: '#16A34A' },
            { type: 'pointer', id: 'right', index: right, label: 'R', color: '#3B82F6' },
            { type: 'array', id: 'chars', values: chars, highlights: [{ index: left, style: 'comparing' }] },
          ],
          variables: { formed, removed: leftChar },
        })

        left++
        if (steps.length > 40) break
      }

      if (steps.length > 40) break
    }

    const answer = result.len === Infinity ? '' : s.slice(result.left, result.right + 1)
    steps.push({
      lineNumber: 27,
      description: `Complete! Minimum window: "${answer}"`,
      elements: [
        { type: 'array', id: 'chars', values: chars, highlights:
          result.len !== Infinity
            ? Array.from({ length: result.len }, (_, i) => ({ index: result.left + i, style: 'found' as const }))
            : []
        },
      ],
      variables: { result: answer, length: result.len === Infinity ? 0 : result.len },
      isComplete: true,
    })

    return steps
  },
}

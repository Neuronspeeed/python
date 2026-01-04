import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const validParentheses: AlgorithmDefinition = {
  id: 'valid-parentheses',
  name: 'Valid Parentheses',
  category: 'stack',
  difficulty: 'Easy',
  leetcodeId: 20,
  description: 'Determine if the input string has valid parentheses. Every open bracket must be closed by the same type in correct order.',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 's = "()"',
      output: 'true',
      explanation: 'Simple valid pair.'
    },
    {
      input: 's = "()[]{}"',
      output: 'true',
      explanation: 'Multiple valid pairs, each closed before next opens.'
    },
    {
      input: 's = "(]"',
      output: 'false',
      explanation: 'Mismatched types: ( opened but ] tried to close it.'
    },
    {
      input: 's = "([)]"',
      output: 'false',
      explanation: 'Wrong order: [ should close before ), but ) comes first.'
    },
  ],

  education: {
    tldr: 'Push open brackets, pop on close. Match types. Empty stack = valid.',
    steps: [
      { title: 'See opening bracket', description: 'Push it onto the stack', code: 'stack.append(char)' },
      { title: 'See closing bracket', description: 'Check if stack top matches', code: 'if stack[-1] == pairs[char]' },
      { title: 'Match found', description: 'Pop from stack', code: 'stack.pop()' },
      { title: 'End of string', description: 'Valid if stack is empty', code: 'return len(stack) == 0' },
    ],
    remember: [
      'Opening → push',
      'Closing → pop and match',
      'Empty stack at end → valid',
    ],
    understanding: `This is the classic intro-to-stacks problem. The stack enforces LIFO (Last In, First Out) order.

**Why a stack?** Opening brackets need to match closing brackets in REVERSE order. The last bracket opened must be the first one closed. That's exactly what a stack does.

**The trick:** When you see a closing bracket, the MOST RECENT opening bracket (stack top) must be its match.`,

    whyPatternWorks: `Stacks naturally handle nested structures:

\`\`\`
( [ { } ] )
Push ( → [ ( ]
Push [ → [ (, [ ]
Push { → [ (, [, { ]
Pop { (matches })
Pop [ (matches ])
Pop ( (matches ))
Empty! Valid!
\`\`\`

If at any point the top doesn't match, or stack is empty when closing, we know it's invalid.`,

    keyInsights: [
      'Stack = LIFO = handles nesting',
      'Map closing → opening for easy lookup',
      'Three fail cases: empty stack, mismatch, leftover opens',
      'Foundation for parsing, compilers, calculators'
    ]
  },

  code: `def isValid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}

    for char in s:
        if char in pairs:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()
        else:
            stack.append(char)

    return len(stack) == 0`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: '([{}])',
      label: 'String',
      placeholder: '([{}])',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const steps: AlgorithmStep[] = []
    const stack: string[] = []
    const pairs: Record<string, string> = { ')': '(', '}': '{', ']': '[' }

    steps.push({
      lineNumber: 2,
      description: 'Initialize empty stack and bracket pairs mapping.',
      elements: [
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { stack: '[]' },
    })

    for (let i = 0; i < s.length; i++) {
      const char = s[i]

      steps.push({
        lineNumber: 5,
        description: `Processing character '${char}' at index ${i}`,
        elements: [
          { type: 'stack', id: 'stack', items: [...stack] },
        ],
        variables: { char, index: i, stack: `[${stack.map(c => `'${c}'`).join(', ')}]` },
      })

      if (char in pairs) {
        // Closing bracket
        steps.push({
          lineNumber: 6,
          description: `'${char}' is a closing bracket. Check if stack top matches '${pairs[char]}'`,
          elements: [
            { type: 'stack', id: 'stack', items: [...stack], highlights: stack.length > 0 ? [{ index: 0, style: 'comparing' }] : [] },
          ],
          variables: { char, expected: pairs[char], stack_top: stack.length > 0 ? stack[stack.length - 1] : 'empty' },
        })

        if (!stack.length || stack[stack.length - 1] !== pairs[char]) {
          steps.push({
            lineNumber: 8,
            description: stack.length === 0
              ? `Stack is empty! No matching opening bracket for '${char}'. Invalid!`
              : `Stack top '${stack[stack.length - 1]}' doesn't match expected '${pairs[char]}'. Invalid!`,
            elements: [
              { type: 'stack', id: 'stack', items: [...stack], highlights: stack.length > 0 ? [{ index: 0, style: 'comparing' }] : [] },
            ],
            variables: { result: false },
            isComplete: true,
          })
          return steps
        }

        stack.pop()
        steps.push({
          lineNumber: 9,
          description: `Match found! Pop '${pairs[char]}' from stack.`,
          elements: [
            { type: 'stack', id: 'stack', items: [...stack], highlights: stack.length > 0 ? [{ index: 0, style: 'found' }] : [] },
          ],
          variables: { stack: `[${stack.map(c => `'${c}'`).join(', ')}]` },
        })
      } else {
        // Opening bracket
        stack.push(char)
        steps.push({
          lineNumber: 11,
          description: `'${char}' is an opening bracket. Push to stack.`,
          elements: [
            { type: 'stack', id: 'stack', items: [...stack], highlights: [{ index: 0, style: 'active' }] },
          ],
          variables: { stack: `[${stack.map(c => `'${c}'`).join(', ')}]` },
        })
      }
    }

    const isValid = stack.length === 0
    steps.push({
      lineNumber: 13,
      description: isValid
        ? 'All characters processed. Stack is empty - all brackets matched! Valid!'
        : `All characters processed. Stack not empty: [${stack.join(', ')}]. Unmatched brackets! Invalid!`,
      elements: [
        { type: 'stack', id: 'stack', items: [...stack], highlights: stack.map((_, i) => ({ index: i, style: isValid ? 'found' : 'comparing' as const })) },
      ],
      variables: { result: isValid },
      isComplete: true,
    })

    return steps
  },
}

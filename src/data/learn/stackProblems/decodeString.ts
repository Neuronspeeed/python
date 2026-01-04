import type { AlgorithmDefinition, AlgorithmStep } from '../types'

export const decodeString: AlgorithmDefinition = {
  id: 'decode-string',
  name: 'Decode String',
  category: 'stack',
  difficulty: 'Medium',
  leetcodeId: 394,
  description: 'Decode an encoded string like "3[a2[c]]" to "accaccacc".',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  visualizationType: 'stack',

  examples: [
    {
      input: 's = "3[a]2[bc]"',
      output: '"aaabcbc"',
      explanation: 'a repeated 3 times, then bc repeated 2 times.'
    },
    {
      input: 's = "3[a2[c]]"',
      output: '"accaccacc"',
      explanation: 'Inner first: 2[c] = cc. Then a + cc = acc. Then 3[acc] = accaccacc.'
    },
    {
      input: 's = "2[abc]3[cd]ef"',
      output: '"abcabccdcdcdef"',
      explanation: 'abc twice, cd three times, then ef.'
    },
  ],

  education: {
    tldr: 'Stack stores (prev_string, repeat_count). On ], pop and repeat current string.',
    steps: [
      { title: 'Digit', description: 'Build number (could be multi-digit)', code: 'curr_num = curr_num * 10 + int(char)' },
      { title: '[', description: 'Push state, reset for inner content', code: 'stack.push((curr_str, curr_num)); reset' },
      { title: ']', description: 'Pop, repeat current, prepend previous', code: 'prev, n = pop(); curr = prev + curr * n' },
      { title: 'Letter', description: 'Append to current string', code: 'curr_str += char' },
    ],
    remember: [
      '[ = save state and reset',
      '] = pop, repeat, combine',
      'Handle multi-digit numbers!',
    ],
    understanding: `This is a nested structure problem—perfect for a stack.

**What to stack?** When we see [, we need to remember:
1. The string built so far (before this bracket)
2. How many times to repeat (the number before [)

**On ]:** Pop the saved state, repeat the current string that many times, and prepend what came before.

**Example:** \`3[a2[c]]\`
- See 3, then [: push ("", 3), reset
- See a: curr_str = "a"
- See 2, then [: push ("a", 2), reset
- See c: curr_str = "c"
- See ]: pop ("a", 2), curr = "a" + "c"×2 = "acc"
- See ]: pop ("", 3), curr = "" + "acc"×3 = "accaccacc"`,

    whyPatternWorks: `The stack handles nesting by saving context at each level:

Level 0: start with ""
Level 1 (3[): save "", will repeat 3×
Level 2 (2[): save "a", will repeat 2×

As we close brackets, we unwind in reverse order—exactly what the stack gives us.`,

    keyInsights: [
      'Stack entry = (previous_string, repeat_count)',
      '[ = push context and reset',
      '] = pop context and combine',
      'Handle multi-digit: num = num * 10 + digit',
      'Inner brackets resolve first (LIFO)'
    ]
  },

  code: `def decodeString(s: str) -> str:
    stack = []
    curr_str = ""
    curr_num = 0

    for char in s:
        if char.isdigit():
            curr_num = curr_num * 10 + int(char)
        elif char == '[':
            stack.append((curr_str, curr_num))
            curr_str = ""
            curr_num = 0
        elif char == ']':
            prev_str, num = stack.pop()
            curr_str = prev_str + curr_str * num
        else:
            curr_str += char

    return curr_str`,

  inputs: [
    {
      name: 's',
      type: 'string',
      default: '3[a2[c]]',
      label: 'Encoded String',
      placeholder: '3[a2[c]]',
    },
  ],

  generateSteps: (input: Record<string, unknown>): AlgorithmStep[] => {
    const s = input.s as string
    const steps: AlgorithmStep[] = []
    const stack: { str: string; num: number }[] = []
    let currStr = ''
    let currNum = 0

    steps.push({
      lineNumber: 2,
      description: 'Initialize empty stack, curr_str = "", curr_num = 0',
      elements: [
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { curr_str: '""', curr_num: 0 },
    })

    for (let i = 0; i < s.length; i++) {
      const char = s[i]

      if (/\d/.test(char)) {
        currNum = currNum * 10 + parseInt(char)
        steps.push({
          lineNumber: 8,
          description: `'${char}' is digit: curr_num = ${currNum}`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(x => `("${x.str}", ${x.num})`) },
          ],
          variables: { char, curr_num: currNum, curr_str: `"${currStr}"` },
        })
      } else if (char === '[') {
        stack.push({ str: currStr, num: currNum })
        steps.push({
          lineNumber: 10,
          description: `'[': Push ("${currStr}", ${currNum}) to stack, reset`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(x => `("${x.str}", ${x.num})`), highlights: [{ index: 0, style: 'active' }] },
          ],
          variables: { pushed: `("${currStr}", ${currNum})` },
        })
        currStr = ''
        currNum = 0
      } else if (char === ']') {
        const { str: prevStr, num } = stack.pop()!
        const repeated = currStr.repeat(num)
        currStr = prevStr + repeated

        steps.push({
          lineNumber: 14,
          description: `']': Pop, repeat "${currStr.slice(prevStr.length, prevStr.length + currStr.length / num)}" × ${num}, prepend "${prevStr}"`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(x => `("${x.str}", ${x.num})`) },
          ],
          variables: { curr_str: `"${currStr}"`, repeated: `"${repeated}"` },
        })
      } else {
        currStr += char
        steps.push({
          lineNumber: 16,
          description: `'${char}': Append to curr_str`,
          elements: [
            { type: 'stack', id: 'stack', items: stack.map(x => `("${x.str}", ${x.num})`) },
          ],
          variables: { curr_str: `"${currStr}"` },
        })
      }

      if (steps.length > 35) break
    }

    steps.push({
      lineNumber: 18,
      description: `Complete! Decoded string: "${currStr}"`,
      elements: [
        { type: 'stack', id: 'stack', items: [] },
      ],
      variables: { result: `"${currStr}"` },
      isComplete: true,
    })

    return steps
  },
}

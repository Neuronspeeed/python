// Tokenizer for Python syntax highlighting

type TokenType = 'keyword' | 'builtin' | 'string' | 'number' | 'boolean' | 'comment' | 'text'

export interface Token {
  type: TokenType
  value: string
}

const KEYWORDS = ['def', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'import', 'from', 'class', 'try', 'except', 'with', 'as', 'lambda', 'yield', 'raise', 'pass', 'break', 'continue', 'and', 'or', 'not', 'is', 'finally', 'async', 'await', 'global', 'nonlocal', 'assert', 'del']

const BUILTINS = ['print', 'range', 'len', 'str', 'int', 'float', 'bool', 'list', 'tuple', 'dict', 'set', 'type', 'isinstance', 'issubclass', 'enumerate', 'zip', 'map', 'filter', 'sum', 'min', 'max', 'sorted', 'reversed', 'abs', 'round', 'ord', 'chr', 'repr', 'format', 'input', 'open', 'all', 'any', 'hash', 'bin', 'oct', 'hex', 'pow', 'divmod', 'super', 'property', 'staticmethod', 'classmethod', 'hasattr', 'getattr', 'setattr', 'callable', 'id', 'next', 'iter', 'object', 'Exception', 'ValueError', 'TypeError', 'KeyError', 'IndexError', 'AttributeError', 'RuntimeError', 'StopIteration', 'breakpoint']

const BOOLEANS = ['True', 'False', 'None']

export function tokenizePython(code: string): Token[] {
  const tokens: Token[] = []
  let i = 0

  while (i < code.length) {
    // Comments
    if (code[i] === '#') {
      let comment = ''
      while (i < code.length && code[i] !== '\n') {
        comment += code[i]
        i++
      }
      tokens.push({ type: 'comment', value: comment })
      continue
    }

    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i]
      let str = quote
      i++
      // Triple-quoted strings
      if (i + 1 < code.length && code[i] === quote && code[i + 1] === quote) {
        str += quote + quote
        i += 2
        while (i + 2 < code.length && !(code[i] === quote && code[i + 1] === quote && code[i + 2] === quote)) {
          str += code[i]
          i++
        }
        if (i + 2 < code.length) {
          str += quote + quote + quote
          i += 3
        }
      } else {
        // Single-quoted strings
        while (i < code.length && code[i] !== quote && code[i] !== '\n') {
          if (code[i] === '\\' && i + 1 < code.length) {
            str += code[i] + code[i + 1]
            i += 2
          } else {
            str += code[i]
            i++
          }
        }
        if (code[i] === quote) {
          str += quote
          i++
        }
      }
      tokens.push({ type: 'string', value: str })
      continue
    }

    // Numbers
    if (/[0-9]/.test(code[i])) {
      let num = ''
      while (i < code.length && /[0-9._eExXoObB+-]/.test(code[i])) {
        num += code[i]
        i++
      }
      tokens.push({ type: 'number', value: num })
      continue
    }

    // Identifiers (keywords, builtins, booleans)
    if (/[a-zA-Z_]/.test(code[i])) {
      let ident = ''
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        ident += code[i]
        i++
      }
      if (BOOLEANS.includes(ident)) {
        tokens.push({ type: 'boolean', value: ident })
      } else if (KEYWORDS.includes(ident)) {
        tokens.push({ type: 'keyword', value: ident })
      } else if (BUILTINS.includes(ident) && code[i] === '(') {
        tokens.push({ type: 'builtin', value: ident })
      } else {
        tokens.push({ type: 'text', value: ident })
      }
      continue
    }

    // Other characters
    tokens.push({ type: 'text', value: code[i] })
    i++
  }

  return tokens
}

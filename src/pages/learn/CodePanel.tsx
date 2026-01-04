import { useEffect, useRef } from 'react'

interface CodePanelProps {
  code: string
  activeLine: number
  executedLines?: number[]
}

interface Token {
  type: 'keyword' | 'builtin' | 'string' | 'number' | 'comment' | 'boolean' | 'operator' | 'function' | 'default'
  value: string
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  let remaining = line

  const patterns: { type: Token['type']; regex: RegExp }[] = [
    { type: 'comment', regex: /^(#.*)/ },
    { type: 'string', regex: /^("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/ },
    { type: 'keyword', regex: /^(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|yield|lambda|pass|break|continue|and|or|not|in|is|None|raise|assert|global|nonlocal)\b/ },
    { type: 'builtin', regex: /^(len|range|print|int|str|list|dict|set|tuple|bool|float|enumerate|zip|map|filter|sorted|reversed|min|max|sum|abs|round|type|isinstance|hasattr|getattr|setattr|open|input)\b/ },
    { type: 'boolean', regex: /^(True|False)\b/ },
    { type: 'number', regex: /^(\d+\.?\d*|\.\d+)/ },
    { type: 'operator', regex: /^([+\-*/%=<>!&|^~]+|:=)/ },
    { type: 'function', regex: /^([a-zA-Z_]\w*)(?=\s*\()/ },
  ]

  while (remaining.length > 0) {
    // Handle whitespace
    const wsMatch = remaining.match(/^(\s+)/)
    if (wsMatch) {
      tokens.push({ type: 'default', value: wsMatch[1] })
      remaining = remaining.slice(wsMatch[1].length)
      continue
    }

    let matched = false
    for (const { type, regex } of patterns) {
      const match = remaining.match(regex)
      if (match) {
        tokens.push({ type, value: match[1] })
        remaining = remaining.slice(match[1].length)
        matched = true
        break
      }
    }

    if (!matched) {
      // Handle identifiers and other characters
      const idMatch = remaining.match(/^([a-zA-Z_]\w*)/)
      if (idMatch) {
        tokens.push({ type: 'default', value: idMatch[1] })
        remaining = remaining.slice(idMatch[1].length)
      } else {
        tokens.push({ type: 'default', value: remaining[0] })
        remaining = remaining.slice(1)
      }
    }
  }

  return tokens
}

function TokenSpan({ token }: { token: Token }) {
  return <span className={`learn-token learn-token-${token.type}`}>{token.value}</span>
}

export function CodePanel({ code, activeLine, executedLines = [] }: CodePanelProps) {
  const activeLineRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const lines = code.split('\n')

  // Scroll active line into view
  useEffect(() => {
    if (activeLineRef.current && containerRef.current) {
      const container = containerRef.current
      const line = activeLineRef.current
      const containerRect = container.getBoundingClientRect()
      const lineRect = line.getBoundingClientRect()

      if (lineRect.top < containerRect.top || lineRect.bottom > containerRect.bottom) {
        line.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeLine])

  return (
    <div className="learn-code-panel" ref={containerRef}>
      <div className="learn-code-container">
        <div className="learn-line-numbers">
          {lines.map((_, i) => (
            <div key={i} className="learn-line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="learn-code-lines">
          {lines.map((line, i) => {
            const lineNum = i + 1
            const isActive = lineNum === activeLine
            const isExecuted = executedLines.includes(lineNum)
            const tokens = tokenizeLine(line)

            return (
              <div
                key={i}
                ref={isActive ? activeLineRef : null}
                className={`learn-code-line ${isActive ? 'active' : ''} ${isExecuted && !isActive ? 'executed' : ''}`}
              >
                {tokens.length > 0 ? (
                  tokens.map((token, j) => <TokenSpan key={j} token={token} />)
                ) : (
                  <span>&nbsp;</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useMemo, useState } from 'react'
import type { Method } from '../types'
import { tokenizePython } from '../utils/tokenizePython'

/** Keep HighlightedCode for backward compatibility */
export function HighlightedCode({ code }: { code: string }) {
  const tokens = useMemo(() => tokenizePython(code), [code])
  return <code>{tokens.map((t, i) => <span key={i} className={t.type !== 'text' ? t.type : undefined}>{t.value}</span>)}</code>
}

/** CodeBlock with copy functionality */
export function CodeBlock({ code, label = 'Example' }: { code: string; label?: string }) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyState('copied')
      setTimeout(() => setCopyState('idle'), 2000)
    } catch {
      setCopyState('error')
      setTimeout(() => setCopyState('idle'), 2000)
    }
  }

  return (
    <div className="code-block">
      <div className="code-header">
        <span className="code-label">{label}</span>
        <button
          className={`copy-btn ${copyState === 'error' ? 'copy-error' : ''}`}
          onClick={handleCopy}
          title={copyState === 'error' ? 'Failed to copy' : 'Copy code'}
        >
          {copyState === 'copied' ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : copyState === 'error' ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="4.66667" y="4.66667" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9.33333 4.66667V3.5C9.33333 2.94772 8.88562 2.5 8.33333 2.5H3.5C2.94772 2.5 2.5 2.94772 2.5 3.5V8.33333C2.5 8.88562 2.94772 9.33333 3.5 9.33333H4.66667" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          )}
        </button>
      </div>
      <pre className="language-python">
        <HighlightedCode code={code} />
      </pre>
    </div>
  )
}

/** Map complexity level to CSS class for method cards */
function getMethodComplexityClass(complexity: string): string {
  const c = complexity.toLowerCase()
  if (c === 'concept' || c === 'reference') return 'complexity-info'
  if (c === 'o(1)') return 'complexity-fast'
  if (c === 'o(log n)') return 'complexity-fast'
  if (c === 'o(n)' || c === 'o(n) avg' || c === 'o(n) time') return 'complexity-medium'
  if (c === 'o(n log n)') return 'complexity-medium'
  if (c.includes('o(n²)') || c.includes('o(n^2)') || c.includes('o(n³)')) return 'complexity-slow'
  if (c.includes('o(2^n)') || c.includes('o(n!)')) return 'complexity-slow'
  return 'complexity-medium'
}

/** Complexity indicator icon */
const COMPLEXITY_ICON = '●'

export function MethodCard({ method, id }: { method: Method; id?: string }) {
  const complexityClass = getMethodComplexityClass(method.complexity)

  return (
    <div className={`method-card ${complexityClass}`} id={id}>
      <div className="method-header">
        <code className="method-signature">{method.signature}</code>
        <span className={`method-complexity ${complexityClass}`}>
          <span className="complexity-icon">{COMPLEXITY_ICON}</span>
          {method.complexity}
        </span>
      </div>
      <p className="method-description">{method.description}</p>
      <CodeBlock code={method.example} />
    </div>
  )
}

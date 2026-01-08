import { useMemo } from 'react'
import type { Method } from '../types'
import { tokenizePython } from '../utils/tokenizePython'
import { ExecutableCodeBlock } from './ExecutableCodeBlock'

/** Keep HighlightedCode for backward compatibility */
export function HighlightedCode({ code }: { code: string }) {
  const tokens = useMemo(() => tokenizePython(code), [code])
  return <code>{tokens.map((t, i) => <span key={i} className={t.type !== 'text' ? t.type : undefined}>{t.value}</span>)}</code>
}

/** CodeBlock now uses ExecutableCodeBlock for interactive Python execution */
export function CodeBlock({ code, label = 'Example' }: { code: string; label?: string }) {
  return <ExecutableCodeBlock code={code} label={label} />
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

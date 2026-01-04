import type { AlgorithmEducation, AlgorithmExample } from '../../data/learn/types'

// Markdown-like text parser for inline code and bold
function ParsedText({ text }: { text: string }) {
  // Split on code blocks first
  const parts = text.split(/(`[^`]+`)/)

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={i} className="edu-inline-code">{part.slice(1, -1)}</code>
        }
        // Then handle bold
        const boldParts = part.split(/(\*\*[^*]+\*\*)/)
        return boldParts.map((bp, j) => {
          if (bp.startsWith('**') && bp.endsWith('**')) {
            return <strong key={`${i}-${j}`} className="edu-bold">{bp.slice(2, -2)}</strong>
          }
          return <span key={`${i}-${j}`}>{bp}</span>
        })
      })}
    </>
  )
}

// Parse paragraph with list detection
function ParsedParagraph({ text, idx }: { text: string; idx: number }) {
  // Bullet list
  if (text.startsWith('- ') || text.startsWith('* ')) {
    const items = text.split('\n').filter(line => line.trim())
    return (
      <ul key={idx} className="edu-list">
        {items.map((item, i) => (
          <li key={i}><ParsedText text={item.replace(/^[-*]\s*/, '')} /></li>
        ))}
      </ul>
    )
  }
  // Numbered list
  if (/^\d+\.\s/.test(text)) {
    const items = text.split('\n').filter(line => line.trim())
    return (
      <ol key={idx} className="edu-list edu-list-numbered">
        {items.map((item, i) => (
          <li key={i}><ParsedText text={item.replace(/^\d+\.\s*/, '')} /></li>
        ))}
      </ol>
    )
  }
  // Regular paragraph
  return (
    <p key={idx} className="edu-paragraph">
      <ParsedText text={text} />
    </p>
  )
}

interface DescriptionCardProps {
  description: string
}

export function DescriptionCard({ description }: DescriptionCardProps) {
  return (
    <section className="edu-section edu-description">
      <div className="edu-section-header">
        <span className="edu-section-badge">Problem</span>
      </div>
      <div className="edu-description-content">
        {description.split('\n\n').map((para, idx) => (
          <ParsedParagraph key={idx} text={para} idx={idx} />
        ))}
      </div>
    </section>
  )
}

interface ExamplesSectionProps {
  examples: AlgorithmExample[]
}

export function ExamplesSection({ examples }: ExamplesSectionProps) {
  if (!examples || examples.length === 0) return null

  return (
    <section className="edu-section edu-examples">
      <h3 className="edu-section-title">Examples</h3>
      <div className="edu-examples-grid">
        {examples.map((example, idx) => (
          <div key={idx} className="edu-example-card">
            <div className="edu-example-number">{idx + 1}</div>
            <div className="edu-example-body">
              <div className="edu-example-io">
                <div className="edu-io-row">
                  <span className="edu-io-label">Input</span>
                  <code className="edu-io-value">{example.input}</code>
                </div>
                <div className="edu-io-row">
                  <span className="edu-io-label">Output</span>
                  <code className="edu-io-value edu-io-output">{example.output}</code>
                </div>
              </div>
              {example.explanation && (
                <p className="edu-example-explanation">{example.explanation}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

interface UnderstandingSectionProps {
  content: string
}

export function UnderstandingSection({ content }: UnderstandingSectionProps) {
  if (!content) return null

  return (
    <section className="edu-section edu-understanding">
      <h3 className="edu-section-title">
        <span className="edu-title-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </span>
        Understanding the Problem
      </h3>
      <div className="edu-content-body">
        {content.split('\n\n').map((para, idx) => (
          <ParsedParagraph key={idx} text={para} idx={idx} />
        ))}
      </div>
    </section>
  )
}

interface WhyPatternSectionProps {
  content: string
  patternName: string
}

export function WhyPatternSection({ content, patternName }: WhyPatternSectionProps) {
  if (!content) return null

  return (
    <section className="edu-section edu-pattern">
      <h3 className="edu-section-title">
        <span className="edu-title-icon edu-icon-pattern">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
        </span>
        Why {patternName} Works Here
      </h3>
      <div className="edu-content-body">
        {content.split('\n\n').map((para, idx) => (
          <ParsedParagraph key={idx} text={para} idx={idx} />
        ))}
      </div>
    </section>
  )
}

interface ExplanationSectionProps {
  content: string
  keyInsights?: string[]
}

export function ExplanationSection({ content, keyInsights }: ExplanationSectionProps) {
  if (!content && (!keyInsights || keyInsights.length === 0)) return null

  return (
    <section className="edu-section edu-explanation">
      <h3 className="edu-section-title">
        <span className="edu-title-icon edu-icon-explanation">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
        </span>
        Explanation
      </h3>

      {content && (
        <div className="edu-content-body">
          {content.split('\n\n').map((para, idx) => (
            <ParsedParagraph key={idx} text={para} idx={idx} />
          ))}
        </div>
      )}

      {keyInsights && keyInsights.length > 0 && (
        <div className="edu-insights">
          <h4 className="edu-insights-title">Key Takeaways</h4>
          <ul className="edu-insights-list">
            {keyInsights.map((insight, idx) => (
              <li key={idx} className="edu-insight-item">
                <span className="edu-insight-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
                <span><ParsedText text={insight} /></span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

interface EducationSectionsProps {
  education?: AlgorithmEducation
  examples?: AlgorithmExample[]
  description: string
  leetcodeId?: number
  categoryName: string
}

export function EducationSections({
  education,
  examples,
  description,
  categoryName
}: EducationSectionsProps) {
  return (
    <div className="edu-container">
      <DescriptionCard description={description} />

      {examples && examples.length > 0 && (
        <ExamplesSection examples={examples} />
      )}

      {education?.understanding && (
        <UnderstandingSection content={education.understanding} />
      )}

      {education?.whyPatternWorks && (
        <WhyPatternSection content={education.whyPatternWorks} patternName={categoryName} />
      )}
    </div>
  )
}

export function PostVisualizationContent({ education }: { education?: AlgorithmEducation }) {
  if (!education?.explanation && (!education?.keyInsights || education.keyInsights.length === 0)) {
    return null
  }

  return (
    <div className="edu-container edu-post-viz">
      <ExplanationSection
        content={education?.explanation || ''}
        keyInsights={education?.keyInsights}
      />
    </div>
  )
}

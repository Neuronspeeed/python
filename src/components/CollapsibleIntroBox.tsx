import { useState, useRef, useEffect } from 'react'

// Parse Q&A format or intro content
function parseIntroContent(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i} className="intro-code">{part.slice(1, -1)}</code>
    }
    return part
  })
}

// Parse a section that may contain bullet points
function parseSectionContent(content: string): { sentences: string[]; bullets: string[] } {
  const lines = content.split('\n')
  const bullets: string[] = []
  const mainLines: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith('•')) {
      bullets.push(trimmed.slice(1).trim())
    } else if (trimmed) {
      mainLines.push(trimmed)
    }
  }

  // Join into full text, then split by sentences for better rhythm
  const fullText = mainLines.join(' ')

  // Split by sentence endings (., !, ?) but keep the punctuation
  const sentences = fullText
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim())
    .map(s => s.trim())

  return { sentences, bullets }
}

interface CollapsibleCardProps {
  header: string
  sentences: string[]
  bullets: string[]
  isOpen: boolean
  onToggle: () => void
}

function CollapsibleCard({ header, sentences, bullets, isOpen, onToggle }: CollapsibleCardProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div className={`collapsible-card ${isOpen ? 'is-open' : ''}`}>
      <button
        className="collapsible-card-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="collapsible-card-label">{header}</span>
        <svg
          className="collapsible-card-icon"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          aria-hidden="true"
        >
          <path
            d="M6 3L6 9M3 6L9 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>

      <div
        className="collapsible-card-content"
        style={{ height }}
      >
        <div ref={contentRef} className="collapsible-card-inner">
          {sentences.length > 0 && (
            <div className="intro-card-sentences">
              {sentences.map((sentence, j) => (
                <span key={j} className="intro-sentence">
                  {parseIntroContent(sentence)}
                </span>
              ))}
            </div>
          )}
          {bullets.length > 0 && (
            <ul className="intro-card-list">
              {bullets.map((bullet, j) => (
                <li key={j}>{parseIntroContent(bullet)}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

interface CollapsibleIntroBoxProps {
  intro: string
}

export function CollapsibleIntroBox({ intro }: CollapsibleIntroBoxProps) {
  const rawSections = intro.split('\n\n').filter(p => p.trim())

  // Separate lead paragraph from topic sections
  const firstSection = rawSections[0]
  const hasLeadParagraph = !firstSection.includes(':') || firstSection.indexOf(':') > 40

  const leadParagraph = hasLeadParagraph ? firstSection : null
  const topicSections = hasLeadParagraph ? rawSections.slice(1) : rawSections

  const sections = topicSections.map(p => {
    const colonIndex = p.indexOf(':')
    if (colonIndex > 0 && colonIndex < 100) {
      const header = p.slice(0, colonIndex)
      const content = p.slice(colonIndex + 1).trim()
      const { sentences, bullets } = parseSectionContent(content)
      return { header, sentences, bullets }
    }
    return { header: null, sentences: [], bullets: [] }
  }).filter(s => s.header) // Only keep sections with headers

  // State: track which cards are open (default: all closed)
  const [openCards, setOpenCards] = useState<Set<number>>(new Set())

  const toggleCard = (index: number) => {
    setOpenCards(prev => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const expandAll = () => {
    setOpenCards(new Set(sections.map((_, i) => i)))
  }

  const collapseAll = () => {
    setOpenCards(new Set())
  }

  return (
    <div className="collapsible-intro-box">
      {leadParagraph && (
        <p className="intro-lead">{parseIntroContent(leadParagraph)}</p>
      )}

      {sections.length > 0 && (
        <>
          <div className="collapsible-controls">
            <button
              className="collapsible-control-btn"
              onClick={expandAll}
              aria-label="Expand all sections"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Expand All
            </button>
            <button
              className="collapsible-control-btn"
              onClick={collapseAll}
              aria-label="Collapse all sections"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M17 14L12 9L7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Collapse All
            </button>
          </div>

          <div className="collapsible-grid">
            {sections.map((section, i) => (
              <CollapsibleCard
                key={i}
                header={section.header!}
                sentences={section.sentences}
                bullets={section.bullets}
                isOpen={openCards.has(i)}
                onToggle={() => toggleCard(i)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

import { useMemo } from 'react'
import type { Method, Section } from '../types'
import { computeSections } from '../types'
import { useSectionScroll } from '../hooks/useSectionScroll'
import { SectionNav } from './SectionNav'
import { MethodCard } from './CodeDisplay'
import { Footer } from './Footer'
import { PageHeader } from './PageHeader'
import { CollapsibleIntroBox } from './CollapsibleIntroBox'

// Parse Q&A format: "Question? Answer" per line
function parseQA(tip: string): { question: string; answer: string }[] {
  return tip.split('\n').filter(line => line.trim()).map(line => {
    const qIndex = line.indexOf('?')
    if (qIndex === -1) {
      return { question: '', answer: line.trim() }
    }
    return {
      question: line.slice(0, qIndex + 1).trim(),
      answer: line.slice(qIndex + 1).trim()
    }
  })
}

// Parse intro text: highlight `code` segments
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
function parseSectionContent(content: string): { mainText: string; bullets: string[] } {
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

  return { mainText: mainLines.join(' '), bullets }
}

function IntroBox({ intro }: { intro: string }) {
  const rawSections = intro.split('\n\n').filter(p => p.trim())

  // Separate lead paragraph from topic sections
  const firstSection = rawSections[0]
  const hasLeadParagraph = !firstSection.includes(':') || firstSection.indexOf(':') > 40

  const leadParagraph = hasLeadParagraph ? firstSection : null
  const topicSections = hasLeadParagraph ? rawSections.slice(1) : rawSections

  const sections = topicSections.map(p => {
    const colonIndex = p.indexOf(':')
    if (colonIndex > 0 && colonIndex < 40) {
      const header = p.slice(0, colonIndex)
      const content = p.slice(colonIndex + 1).trim()
      const { mainText, bullets } = parseSectionContent(content)
      return { header, mainText, bullets }
    }
    return { header: null, mainText: p, bullets: [] }
  }).filter(s => s.header) // Only keep sections with headers

  return (
    <div className="intro-box">
      {leadParagraph && (
        <p className="intro-lead">{parseIntroContent(leadParagraph)}</p>
      )}

      {sections.length > 0 && (
        <div className="intro-grid">
          {sections.map((section, i) => (
            <div key={i} className="intro-card">
              <h4 className="intro-card-header">{section.header}</h4>
              {section.mainText && (
                <p className="intro-card-text">{parseIntroContent(section.mainText)}</p>
              )}
              {section.bullets.length > 0 && (
                <ul className="intro-card-list">
                  {section.bullets.map((bullet, j) => (
                    <li key={j}>{parseIntroContent(bullet)}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TipBox({ tip }: { tip: string }) {
  const items = useMemo(() => parseQA(tip), [tip])

  return (
    <div className="tip-box">
      <div className="tip-box-header">
        <svg className="tip-box-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 16v.01M12 8a2 2 0 012 2c0 1.1-1 1.5-1.5 2-.5.5-.5 1-.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="tip-box-title">Key Insight</span>
      </div>
      <ul className="tip-box-list">
        {items.map((item, i) => (
          <li key={i} className="tip-item">
            {item.question && <><span className="tip-question">{item.question}</span>{' '}</>}
            <span className="tip-answer">{item.answer}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface SectionListProps {
  methods: Method[]
  sections: Section[]
  registerSection: (idx: number) => (el: HTMLElement | null) => void
}

function SectionList({ methods, sections, registerSection }: SectionListProps) {
  return (
    <>
      {sections.map((section, idx) => (
        <section
          className="section"
          key={section.title}
          id={`section-${idx}`}
          ref={registerSection(idx)}
        >
          <h2 className="section-title">{section.title}</h2>
          {methods.slice(section.start, section.end).map(m => (
            <MethodCard key={m.signature} method={m} />
          ))}
        </section>
      ))}
    </>
  )
}

// Export IntroBox for custom pages
export { IntroBox }

// Standalone content component for custom pages like BigO
export function TypePageContent({ methods, sections }: { methods: Method[]; sections: Section[] }) {
  const sectionTitles = sections.map(s => s.title)
  const { activeSection, sectionNavItems, registerSection } = useSectionScroll(sectionTitles)

  return (
    <>
      <SectionNav sections={sectionNavItems} activeSection={activeSection} />
      <SectionList methods={methods} sections={sections} registerSection={registerSection} />
    </>
  )
}

export interface TypePageProps {
  type: string
  badge: string
  color: string
  description: string
  intro?: string
  tip?: string
  methods: Method[]
  tabs?: React.ReactNode
  collapsible?: boolean
}

export function TypePage({ type, badge, color, description, intro, tip, methods, tabs, collapsible = false }: TypePageProps) {
  const sections = useMemo(() => computeSections(methods), [methods])
  const sectionTitles = sections.map(s => s.title)
  const { activeSection, sectionNavItems, registerSection } = useSectionScroll(sectionTitles)

  return (
    <>
      <PageHeader badge={badge} badgeColor={color} title={type} description={description} />

      {intro && (
        collapsible ? (
          <CollapsibleIntroBox intro={intro} />
        ) : (
          <IntroBox intro={intro} />
        )
      )}

      {tip && <TipBox tip={tip} />}

      {tabs}

      <SectionNav sections={sectionNavItems} activeSection={activeSection} />
      <SectionList methods={methods} sections={sections} registerSection={registerSection} />

      <Footer />
    </>
  )
}

import { useMemo } from 'react'
import type { Method, Section } from '../types'
import { computeSections } from '../types'
import { useSectionScroll } from '../hooks/useSectionScroll'
import { SectionNav } from './SectionNav'
import { MethodCard, HighlightedCode } from './CodeDisplay'
import { Footer } from './Footer'
import { PageHeader } from './PageHeader'

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

// Parse content with code blocks and inline code
function parseBoxContent(content: string): React.ReactNode[] {
  const parts: React.ReactNode[] = []
  const codeBlockPattern = /```(\w+)?\n([\s\S]*?)```/g
  let lastIndex = 0

  // Find all code blocks using regex match iteration
  const matches = Array.from(content.matchAll(codeBlockPattern))

  matches.forEach((match, idx) => {
    // Add text before code block
    if (match.index !== undefined && match.index > lastIndex) {
      const textBefore = content.slice(lastIndex, match.index)
      parts.push(...parseIntroContent(textBefore))
    }

    // Add code block with syntax highlighting
    const language = match[1] || 'python'  // Default to python if no language specified
    const code = match[2]
    parts.push(
      <pre key={`code-${idx}`} className={`language-${language}`}>
        {language === 'python' ? <HighlightedCode code={code} /> : <code>{code}</code>}
      </pre>
    )

    lastIndex = (match.index || 0) + match[0].length
  })

  // Add remaining text after last code block
  if (lastIndex < content.length) {
    const textAfter = content.slice(lastIndex)
    parts.push(...parseIntroContent(textAfter))
  }

  return parts.length > 0 ? parts : parseIntroContent(content)
}

function IntroBox({ intro }: { intro: string }) {
  // Parse sections separated by '---' for single-column decision boxes
  const boxes = intro.split('\n---\n').filter(box => box.trim())

  return (
    <div className="intro-boxes">
      {boxes.map((box, i) => {
        const lines = box.trim().split('\n')
        const title = lines[0].trim()
        const content = lines.slice(1).join('\n').trim()

        return (
          <div key={i} className="decision-box">
            <div className="decision-box-header">
              <h3>{title}</h3>
              <span className="badge">Concept</span>
            </div>
            <div className="decision-box-content">
              {parseBoxContent(content)}
            </div>
          </div>
        )
      })}
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
}

export function TypePage({ type, badge, color, description, intro, tip, methods, tabs }: TypePageProps) {
  const sections = useMemo(() => computeSections(methods), [methods])
  const sectionTitles = sections.map(s => s.title)
  const { activeSection, sectionNavItems, registerSection } = useSectionScroll(sectionTitles)

  return (
    <>
      <PageHeader badge={badge} badgeColor={color} title={type} description={description} />

      {intro && <IntroBox intro={intro} />}

      {tip && <TipBox tip={tip} />}

      {tabs}

      <SectionNav sections={sectionNavItems} activeSection={activeSection} />
      <SectionList methods={methods} sections={sections} registerSection={registerSection} />

      <Footer />
    </>
  )
}

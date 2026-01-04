import { useState, useEffect } from 'react'

interface Section {
  id: string
  title: string
  isSubsection?: boolean
}

interface OnThisPageProps {
  sections: Section[]
}

export function OnThisPage({ sections }: OnThisPageProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate reading progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollProgress)

      // Find active section
      const sectionElements = sections.map(s => document.getElementById(s.id)).filter(Boolean)
      let current = ''

      for (const element of sectionElements) {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            current = element.id
          }
        }
      }

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (sections.length === 0) return null

  return (
    <aside className="learn-on-this-page">
      <div className="learn-reading-progress">
        <span className="learn-reading-label">Reading Progress</span>
        <div className="learn-reading-bar">
          <div
            className="learn-reading-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <nav className="learn-toc">
        <h4 className="learn-toc-title">On This Page</h4>
        <ul className="learn-toc-list">
          {sections.map(section => (
            <li key={section.id}>
              <button
                className={`learn-toc-link ${section.isSubsection ? 'subsection' : ''} ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => scrollToSection(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default OnThisPage

import { useRef, useEffect } from 'react'

interface Section {
  title: string
  id: string
}

export function SectionNav({ sections, activeSection }: { sections: Section[]; activeSection: string }) {
  const navRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef<HTMLButtonElement>(null)

  // Scroll active section into view when it changes
  useEffect(() => {
    if (activeRef.current && navRef.current) {
      const nav = navRef.current
      const active = activeRef.current
      const navRect = nav.getBoundingClientRect()
      const activeRect = active.getBoundingClientRect()

      // Center the active item if it's not fully visible
      if (activeRect.left < navRect.left || activeRect.right > navRect.right) {
        active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }
  }, [activeSection])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav className="section-nav" aria-label="Page sections">
      <div className="section-nav-track" ref={navRef}>
        {sections.map((section, index) => (
          <button
            key={section.id}
            ref={section.id === activeSection ? activeRef : null}
            className={`section-nav-item ${section.id === activeSection ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
            style={{ '--delay': `${index * 30}ms` } as React.CSSProperties}
          >
            <span className="section-nav-text">{section.title}</span>
          </button>
        ))}
      </div>
      <div className="section-nav-fade section-nav-fade-left" />
      <div className="section-nav-fade section-nav-fade-right" />
    </nav>
  )
}

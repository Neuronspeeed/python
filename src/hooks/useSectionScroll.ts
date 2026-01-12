import { useState, useEffect, useRef, useCallback } from 'react'

/** Offset for scroll position detection to account for sticky header */
const HEADER_SCROLL_OFFSET = 150

/** Throttle scroll events to ~60fps for performance */
const SCROLL_THROTTLE_MS = 16

interface SectionNavItem {
  title: string
  id: string
}

interface UseSectionScrollResult {
  activeSection: string
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>
  sectionNavItems: SectionNavItem[]
  registerSection: (idx: number) => (el: HTMLElement | null) => void
}

/**
 * Custom hook for tracking active section based on scroll position.
 * Eliminates duplicated scroll logic across TypePage and TypePageContent.
 */
export function useSectionScroll(sectionTitles: string[]): UseSectionScrollResult {
  const [activeSection, setActiveSection] = useState('')
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const sectionNavItems = sectionTitles.map((title, i) => ({
    title,
    id: `section-${i}`
  }))

  const sectionCount = sectionTitles.length

  useEffect(() => {
    let lastScrollTime = 0
    let rafId: number | null = null

    const handleScroll = () => {
      const now = Date.now()
      if (now - lastScrollTime < SCROLL_THROTTLE_MS) {
        // Throttle: schedule update for next frame if not already scheduled
        if (rafId === null) {
          rafId = requestAnimationFrame(() => {
            rafId = null
            updateActiveSection()
          })
        }
        return
      }
      lastScrollTime = now
      updateActiveSection()
    }

    const updateActiveSection = () => {
      const scrollPos = window.scrollY + HEADER_SCROLL_OFFSET
      for (let i = sectionCount - 1; i >= 0; i--) {
        const el = sectionRefs.current[`section-${i}`]
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`section-${i}`)
          return
        }
      }
      setActiveSection('section-0')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActiveSection()
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [sectionCount])

  const registerSection = useCallback((idx: number) => {
    return (el: HTMLElement | null) => {
      sectionRefs.current[`section-${idx}`] = el
    }
  }, [])

  return { activeSection, sectionRefs, sectionNavItems, registerSection }
}

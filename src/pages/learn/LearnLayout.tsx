import { useState, type ReactNode } from 'react'
import type { LearnCategorySlug } from '../../data/learn/types'
import { LearnSidebar } from './LearnSidebar'

interface LearnLayoutProps {
  children: ReactNode
  activeCategory?: LearnCategorySlug
  activeAlgorithm?: string
}

export function LearnLayout({ children, activeCategory, activeAlgorithm }: LearnLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="learn-layout">
      {/* Mobile Menu Toggle */}
      <button
        className="learn-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="learn-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <LearnSidebar
        activeCategory={activeCategory}
        activeAlgorithm={activeAlgorithm}
        isOpen={sidebarOpen}
      />
      <main className="learn-main">
        {children}
      </main>
    </div>
  )
}

export default LearnLayout

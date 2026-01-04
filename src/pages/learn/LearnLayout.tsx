import type { ReactNode } from 'react'
import type { LearnCategorySlug } from '../../data/learn/types'
import { LearnSidebar } from './LearnSidebar'

interface LearnLayoutProps {
  children: ReactNode
  activeCategory?: LearnCategorySlug
  activeAlgorithm?: string
}

export function LearnLayout({ children, activeCategory, activeAlgorithm }: LearnLayoutProps) {
  return (
    <div className="learn-layout">
      <LearnSidebar
        activeCategory={activeCategory}
        activeAlgorithm={activeAlgorithm}
      />
      <main className="learn-main">
        {children}
      </main>
    </div>
  )
}

export default LearnLayout

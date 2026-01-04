import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { categories } from '../../data/learn'
import { buildLearnUrl } from '../../config/routes'
import { categoryIcons, algorithmLabIcon } from '../../data/learn/categoryIcons'
import type { LearnCategorySlug } from '../../data/learn/types'

// Map legacy category IDs to URL slugs
const categoryIdToSlug: Record<string, LearnCategorySlug> = {
  twoPointers: 'two-pointers',
  slidingWindow: 'sliding-window',
  intervals: 'intervals',
  stack: 'stack',
  linkedList: 'linked-list',
  binarySearch: 'binary-search',
  heap: 'heap',
  dfs: 'dfs',
  bfs: 'bfs',
  backtracking: 'backtracking',
  graphs: 'graphs',
  dynamicProgramming: 'dynamic-programming',
  greedy: 'greedy',
  trie: 'trie',
  prefixSum: 'prefix-sum',
  matrices: 'matrices',
}

interface LearnSidebarProps {
  activeCategory?: LearnCategorySlug
  activeAlgorithm?: string
}

export function LearnSidebar({ activeCategory, activeAlgorithm }: LearnSidebarProps) {
  const location = useLocation()

  // Expand the active category by default
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (activeCategory) {
      // Find the legacy ID from slug
      const entry = Object.entries(categoryIdToSlug).find(([, slug]) => slug === activeCategory)
      if (entry) initial.add(entry[0])
    }
    return initial
  })

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }

  // Calculate total algorithm count
  const totalAlgorithms = useMemo(() =>
    categories.reduce((sum, cat) => sum + cat.algorithms.length, 0),
    []
  )

  return (
    <aside className="learn-sidebar">
      <div className="learn-sidebar-header">
        <Link to="/learn" className="learn-sidebar-brand">
          <div className="learn-sidebar-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={algorithmLabIcon} />
            </svg>
          </div>
          <div className="learn-sidebar-brand-text">
            <span className="learn-sidebar-title">Algorithm Lab</span>
            <span className="learn-sidebar-subtitle">{totalAlgorithms} visualizations</span>
          </div>
        </Link>
      </div>

      <nav className="learn-nav">
        {categories.map((category, index) => {
          const slug = categoryIdToSlug[category.id] || category.id
          const isExpanded = expandedCategories.has(category.id)
          const isCategoryActive = activeCategory === slug
          const iconPath = categoryIcons[category.id] || categoryIcons.twoPointers

          return (
            <div
              key={category.id}
              className={`learn-nav-section ${isCategoryActive ? 'active' : ''}`}
              style={{ '--section-index': index } as React.CSSProperties}
            >
              <button
                className="learn-nav-header"
                onClick={() => toggleCategory(category.id)}
                aria-expanded={isExpanded}
              >
                <div className="learn-nav-header-left">
                  <span
                    className="learn-nav-icon"
                    style={{ '--category-color': category.color } as React.CSSProperties}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={iconPath} />
                    </svg>
                  </span>
                  <span className="learn-nav-name">{category.name}</span>
                </div>
                <div className="learn-nav-header-right">
                  <span className="learn-nav-count">{category.algorithms.length}</span>
                  <span className={`learn-nav-chevron ${isExpanded ? 'expanded' : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </div>
              </button>

              <div className={`learn-nav-items ${isExpanded ? 'expanded' : ''}`}>
                {/* Overview link */}
                <Link
                  to={buildLearnUrl(slug)}
                  className={`learn-nav-item overview ${location.pathname === `/learn/${slug}` && !activeAlgorithm ? 'active' : ''}`}
                >
                  <span className="learn-nav-item-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </span>
                  Overview
                </Link>

                {/* Algorithm links */}
                {category.algorithms.map(algo => (
                  <Link
                    key={algo.id}
                    to={buildLearnUrl(slug, algo.id)}
                    className={`learn-nav-item ${activeAlgorithm === algo.id ? 'active' : ''}`}
                  >
                    <span className={`learn-nav-difficulty ${algo.difficulty.toLowerCase()}`}>
                      {algo.difficulty === 'Easy' && ''}
                      {algo.difficulty === 'Medium' && ''}
                      {algo.difficulty === 'Hard' && ''}
                    </span>
                    <span className="learn-nav-item-name">{algo.name}</span>
                    {algo.leetcodeId && (
                      <span className="learn-nav-leetcode">#{algo.leetcodeId}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      <div className="learn-sidebar-footer">
        <Link to="/" className="learn-sidebar-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Pythoneala
        </Link>
      </div>
    </aside>
  )
}

export default LearnSidebar

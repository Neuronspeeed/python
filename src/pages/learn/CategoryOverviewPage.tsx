import { useParams, Navigate, Link } from 'react-router-dom'
import { categories } from '../../data/learn'
import { buildLearnUrl } from '../../config/routes'
import { categoryIcons } from '../../data/learn/categoryIcons'
import type { LearnCategorySlug } from '../../data/learn/types'
import { LearnLayout } from './LearnLayout'
import { slugToCategoryId, categoryOverviews } from './categoryData'

export function CategoryOverviewPage() {
  const { category } = useParams<{ category: string }>()

  // Find category by slug
  const legacyId = slugToCategoryId[category || '']
  const categoryData = categories.find(c => c.id === legacyId)

  if (!categoryData || !category) {
    return <Navigate to="/learn" replace />
  }

  const overview = categoryOverviews[categoryData.id] || {
    description: `Learn ${categoryData.name} patterns and techniques through interactive visualizations.`,
    whenToUse: ['Various algorithmic problems'],
    keyPatterns: [],
    commonMistakes: [],
  }

  return (
    <LearnLayout activeCategory={category as LearnCategorySlug}>
      <div className="learn-overview">
        <header className="learn-overview-header">
          <div className="learn-overview-badge-row">
            <span
              className="learn-overview-icon"
              style={{ backgroundColor: categoryData.color }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={categoryIcons[categoryData.id] || categoryIcons.twoPointers} />
              </svg>
            </span>
          </div>

          <h1 className="learn-overview-title">{categoryData.name}</h1>
          <p className="learn-overview-desc">{overview.description}</p>

          <div className="learn-overview-stats">
            <span className="learn-overview-stat">
              <strong>{categoryData.algorithms.length}</strong> Problems
            </span>
            <span className="learn-overview-stat">
              <strong>{overview.keyPatterns.length}</strong> Patterns
            </span>
          </div>
        </header>

        {overview.whyUseIt && (
          <section className="learn-overview-section learn-why-section">
            <h2 className="learn-overview-section-title">
              <span className="learn-overview-section-icon why">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </span>
              {overview.whyUseIt.title}
            </h2>
            <div className="learn-why-content">
              <p className="learn-why-explanation">{overview.whyUseIt.explanation}</p>
              <div className="learn-why-keypoint">
                <span className="learn-why-keypoint-label">Key Insight</span>
                <p>{overview.whyUseIt.keyPoint}</p>
              </div>
            </div>
          </section>
        )}

        {overview.whenToUse.length > 0 && (
          <section className="learn-overview-section">
            <h2 className="learn-overview-section-title">
              <span className="learn-overview-section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              When to Use
            </h2>
            <ul className="learn-overview-list">
              {overview.whenToUse.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {overview.keyPatterns.length > 0 && (
          <section className="learn-overview-section">
            <h2 className="learn-overview-section-title">
              <span className="learn-overview-section-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                  <path d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                </svg>
              </span>
              Key Patterns
            </h2>
            <div className="learn-patterns-grid">
              {overview.keyPatterns.map((pattern, i) => (
                <div key={i} className="learn-pattern-card">
                  <h3 className="learn-pattern-name">{pattern.name}</h3>
                  <p className="learn-pattern-desc">{pattern.description}</p>
                  <span className="learn-pattern-complexity">{pattern.complexity}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {overview.commonMistakes.length > 0 && (
          <section className="learn-overview-section">
            <h2 className="learn-overview-section-title">
              <span className="learn-overview-section-icon warning">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </span>
              Common Mistakes
            </h2>
            <ul className="learn-overview-list mistakes">
              {overview.commonMistakes.map((mistake, i) => (
                <li key={i}>{mistake}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="learn-overview-section">
          <h2 className="learn-overview-section-title">
            <span className="learn-overview-section-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </span>
            Problems ({categoryData.algorithms.length})
          </h2>
          <div className="learn-problems-grid">
            {categoryData.algorithms.map((algo, i) => (
              <Link
                key={algo.id}
                to={buildLearnUrl(category, algo.id)}
                className="learn-problem-card"
                style={{ '--card-index': i } as React.CSSProperties}
              >
                <div className="learn-problem-header">
                  <span className={`learn-problem-difficulty ${algo.difficulty.toLowerCase()}`}>
                    {algo.difficulty}
                  </span>
                  {algo.leetcodeId && (
                    <span className="learn-problem-leetcode">#{algo.leetcodeId}</span>
                  )}
                </div>
                <h3 className="learn-problem-name">{algo.name}</h3>
                <div className="learn-problem-meta">
                  <span className="learn-problem-complexity">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {algo.timeComplexity}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </LearnLayout>
  )
}

export default CategoryOverviewPage

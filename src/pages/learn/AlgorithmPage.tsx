import { useParams, Navigate, Link } from 'react-router-dom'
import { categories } from '../../data/learn'
import { buildLearnUrl } from '../../config/routes'
import type { LearnCategorySlug } from '../../data/learn/types'
import { LearnLayout } from './LearnLayout'
import { AlgorithmVisualizer } from './AlgorithmVisualizer'
import {
  TLDRCard,
  QuickExample,
  KeyInsight,
  HowItWorks,
  DeepDive,
  QuickReference
} from './ADHDEducation'

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

// Reverse mapping: slug to legacy ID
const slugToCategoryId: Record<string, string> = Object.fromEntries(
  Object.entries(categoryIdToSlug).map(([id, slug]) => [slug, id])
)

// Difficulty colors
const difficultyColors: Record<string, string> = {
  Easy: '#22c55e',
  Medium: '#f59e0b',
  Hard: '#ef4444',
}

// Safe text renderer - converts markdown-like text to React elements
function ProseContent({ text }: { text: string }) {
  const paragraphs = text.split('\n\n')
  return (
    <div className="adhd-prose">
      {paragraphs.map((para, idx) => {
        // Handle bold text with **text**
        const parts = para.split(/\*\*(.*?)\*\*/g)
        return (
          <p key={idx}>
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </p>
        )
      })}
    </div>
  )
}

export function AlgorithmPage() {
  const { category, algorithm } = useParams<{ category: string; algorithm: string }>()

  // Find category by slug
  const legacyId = slugToCategoryId[category || '']
  const categoryData = categories.find(c => c.id === legacyId)

  if (!categoryData || !category) {
    return <Navigate to="/learn" replace />
  }

  // Find algorithm
  const algorithmData = categoryData.algorithms.find(a => a.id === algorithm)

  if (!algorithmData) {
    return <Navigate to={buildLearnUrl(category)} replace />
  }

  // Get adjacent algorithms for navigation
  const currentIndex = categoryData.algorithms.findIndex(a => a.id === algorithm)
  const prevAlgorithm = currentIndex > 0 ? categoryData.algorithms[currentIndex - 1] : null
  const nextAlgorithm = currentIndex < categoryData.algorithms.length - 1
    ? categoryData.algorithms[currentIndex + 1]
    : null

  // Extract ADHD-friendly data
  const education = algorithmData.education
  const tldrInsight = education?.tldr || education?.keyInsights?.[0] || algorithmData.description
  const steps = education?.steps || []
  const remember = education?.remember || []

  return (
    <LearnLayout
      activeCategory={category as LearnCategorySlug}
      activeAlgorithm={algorithm}
    >
      <div className="learn-algorithm-page adhd-layout">
        <div className="learn-algorithm-main">
          {/* Breadcrumb */}
          <nav className="learn-breadcrumb">
            <Link to="/learn" className="learn-breadcrumb-link">Algorithm Lab</Link>
            <span className="learn-breadcrumb-sep">/</span>
            <Link to={buildLearnUrl(category)} className="learn-breadcrumb-link">
              {categoryData.name}
            </Link>
            <span className="learn-breadcrumb-sep">/</span>
            <span className="learn-breadcrumb-current">{algorithmData.name}</span>
          </nav>

          {/* Header with title and difficulty */}
          <header className="learn-algorithm-header">
            <div className="learn-algorithm-category">{categoryData.name}</div>
            <h1 className="learn-algorithm-title">{algorithmData.name}</h1>
            <span
              className="learn-difficulty-badge-lg"
              style={{ '--difficulty-color': difficultyColors[algorithmData.difficulty] } as React.CSSProperties}
            >
              {algorithmData.difficulty}
            </span>
          </header>

          {/* ADHD-Friendly Content Flow */}
          <div className="adhd-content">
            {/* 1. TL;DR First - Always visible, key insight upfront */}
            <TLDRCard
              pattern={categoryData.name}
              insight={tldrInsight}
              timeComplexity={algorithmData.timeComplexity}
            />

            {/* 2. Quick Example - Visual, scannable */}
            {algorithmData.examples && algorithmData.examples[0] && (
              <QuickExample
                input={algorithmData.examples[0].input}
                output={algorithmData.examples[0].output}
              />
            )}

            {/* 3. Key Insight Callout */}
            {education?.keyInsights && education.keyInsights.length > 1 && (
              <KeyInsight text={education.keyInsights[1]} />
            )}

            {/* 4. How It Works - Visual numbered steps */}
            {steps.length > 0 && (
              <HowItWorks steps={steps} />
            )}

            {/* 5. Solution - Interactive Visualizer */}
            <section id="solution" className="learn-solution-section">
              <h3 className="learn-section-title">
                <span className="adhd-section-icon">&gt;</span>
                Try It
              </h3>
              <AlgorithmVisualizer algorithm={algorithmData} />
            </section>

            {/* 6. Deep Dives - Collapsed by default */}
            {education?.understanding && (
              <DeepDive title="Understanding the Problem">
                <ProseContent text={education.understanding} />
              </DeepDive>
            )}

            {education?.whyPatternWorks && (
              <DeepDive title={`Why ${categoryData.name} Works Here`}>
                <ProseContent text={education.whyPatternWorks} />
              </DeepDive>
            )}

            {algorithmData.examples && algorithmData.examples.length > 1 && (
              <DeepDive title="More Examples">
                {algorithmData.examples.slice(1).map((ex, idx) => (
                  <div key={idx} className="adhd-extra-example">
                    <QuickExample input={ex.input} output={ex.output} />
                    {ex.explanation && (
                      <p className="adhd-example-explanation">{ex.explanation}</p>
                    )}
                  </div>
                ))}
              </DeepDive>
            )}

            {education?.keyInsights && education.keyInsights.length > 2 && (
              <DeepDive title="Key Insights">
                <ul className="adhd-insights-list">
                  {education.keyInsights.map((insight, idx) => (
                    <li key={idx}>{insight}</li>
                  ))}
                </ul>
              </DeepDive>
            )}
          </div>

          {/* Navigation */}
          <nav className="learn-algorithm-nav">
            {prevAlgorithm ? (
              <Link
                to={buildLearnUrl(category, prevAlgorithm.id)}
                className="learn-algorithm-nav-btn prev"
              >
                <span className="learn-algorithm-nav-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </span>
                <span className="learn-algorithm-nav-text">
                  <span className="learn-algorithm-nav-label">Previous</span>
                  <span className="learn-algorithm-nav-name">{prevAlgorithm.name}</span>
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextAlgorithm ? (
              <Link
                to={buildLearnUrl(category, nextAlgorithm.id)}
                className="learn-algorithm-nav-btn next"
              >
                <span className="learn-algorithm-nav-text">
                  <span className="learn-algorithm-nav-label">Next</span>
                  <span className="learn-algorithm-nav-name">{nextAlgorithm.name}</span>
                </span>
                <span className="learn-algorithm-nav-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </div>

        {/* Right sidebar - Quick Reference (sticky) */}
        <QuickReference
          formula="area = width × min(heights)"
          pattern={categoryData.name}
          remember={remember}
        />
      </div>
    </LearnLayout>
  )
}

export default AlgorithmPage

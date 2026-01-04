import { Link } from 'react-router-dom'
import { categories } from '../../data/learn'
import { buildLearnUrl } from '../../config/routes'
import { categoryIcons, algorithmLabIcon } from '../../data/learn/categoryIcons'
import type { LearnCategorySlug } from '../../data/learn/types'
import { LearnLayout } from './LearnLayout'

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

// Category descriptions for the landing page
const categoryDescriptions: Record<string, string> = {
  twoPointers: 'Use two pointers to traverse arrays efficiently, reducing O(n²) to O(n).',
  binarySearch: 'Divide and conquer to find elements in O(log n) time.',
  stack: 'LIFO data structure for parsing, backtracking, and expression evaluation.',
  slidingWindow: 'Maintain a window over sequential data for subarray problems.',
  linkedList: 'Pointer manipulation techniques for linked data structures.',
  dfs: 'Explore paths deeply before backtracking. Essential for trees and graphs.',
  bfs: 'Explore level by level. Perfect for shortest path problems.',
  heap: 'Priority queue operations for top-K and streaming problems.',
  backtracking: 'Systematic exploration of all possible solutions.',
  graphs: 'Topological sort, cycle detection, and connected components.',
  dynamicProgramming: 'Optimal substructure and overlapping subproblems.',
  greedy: 'Make locally optimal choices for global optimum.',
  trie: 'Prefix tree for efficient string operations.',
  prefixSum: 'Precompute cumulative sums for range queries.',
  matrices: '2D array traversal and manipulation patterns.',
  intervals: 'Merging, scheduling, and interval overlap problems.',
}

export function LearnIndexPage() {
  const totalAlgorithms = categories.reduce((sum, cat) => sum + cat.algorithms.length, 0)

  return (
    <LearnLayout>
      <div className="learn-index">
        <header className="learn-index-header">
          <div className="learn-index-badge">
            <span className="learn-index-badge-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={algorithmLabIcon} />
              </svg>
            </span>
            Algorithm Lab
          </div>
          <h1 className="learn-index-title">
            Master Data Structures & Algorithms
          </h1>
          <p className="learn-index-desc">
            Interactive step-through visualizations for {totalAlgorithms} algorithms
            across {categories.length} essential patterns. Watch code execute line by line
            with animated data structures.
          </p>
        </header>

        <section className="learn-index-grid">
          {categories.map((category, index) => {
            const slug = categoryIdToSlug[category.id] || category.id
            const description = categoryDescriptions[category.id] || ''

            const iconPath = categoryIcons[category.id] || categoryIcons.twoPointers

            return (
              <Link
                key={category.id}
                to={buildLearnUrl(slug)}
                className="learn-category-card"
                style={{
                  '--card-index': index,
                  '--category-color': category.color,
                } as React.CSSProperties}
              >
                <div className="learn-category-card-header">
                  <span
                    className="learn-category-icon"
                    style={{ background: category.color }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={iconPath} />
                    </svg>
                  </span>
                </div>

                <h3 className="learn-category-name">{category.name}</h3>
                <p className="learn-category-desc">{description}</p>

                <div className="learn-category-meta">
                  <span className="learn-category-count">
                    {category.algorithms.length} problems
                  </span>
                  <span className="learn-category-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </section>

        <section className="learn-index-features">
          <h2 className="learn-index-features-title">How It Works</h2>
          <div className="learn-index-features-grid">
            <div className="learn-feature-card">
              <span className="learn-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <h3>Step-Through Execution</h3>
              <p>Watch algorithms execute line by line with highlighted code and animated visualizations.</p>
            </div>

            <div className="learn-feature-card">
              <span className="learn-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
                  <path d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
                  <path d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </span>
              <h3>Visual Data Structures</h3>
              <p>Arrays, linked lists, trees, and graphs rendered with pointers and highlights.</p>
            </div>

            <div className="learn-feature-card">
              <span className="learn-feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </span>
              <h3>Custom Inputs</h3>
              <p>Modify input values to see how algorithms behave with different data.</p>
            </div>
          </div>
        </section>
      </div>
    </LearnLayout>
  )
}

export default LearnIndexPage

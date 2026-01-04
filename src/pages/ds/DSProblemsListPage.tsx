import { Link } from 'react-router-dom'
import type { AlgorithmDefinition } from '../../data/learn/types'
import { DSCategoryTabs, PageHeader } from '../../components'

interface DSProblemsListPageProps {
  dsName: string
  basePath: string
  problems: AlgorithmDefinition[]
  color: string
}

export function DSProblemsListPage({ dsName, basePath, problems, color }: DSProblemsListPageProps) {
  return (
    <div className="type-page">
      <PageHeader
        badge={`${problems.length} problems`}
        badgeColor={color}
        title={dsName}
        description={`Interactive algorithm visualizations for ${dsName} problems. Practice with step-by-step animations.`}
      />

      <DSCategoryTabs basePath={basePath} problemCount={problems.length} />

      <div className="ds-problems-grid">
        {problems.map(problem => (
          <Link
            key={problem.id}
            to={`${basePath}/problems/${problem.id}`}
            className="ds-problem-card"
          >
            <div className="ds-problem-header">
              <span className={`ds-problem-difficulty ${problem.difficulty.toLowerCase()}`}>
                {problem.difficulty}
              </span>
              {problem.leetcodeId && (
                <span className="ds-problem-leetcode">#{problem.leetcodeId}</span>
              )}
            </div>
            <h3 className="ds-problem-name">{problem.name}</h3>
            <p className="ds-problem-description">{problem.description}</p>
            <div className="ds-problem-complexity">
              <span>Time: {problem.timeComplexity}</span>
              <span>Space: {problem.spaceComplexity}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

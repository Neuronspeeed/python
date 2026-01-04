import { Link, useParams, Navigate } from 'react-router-dom'
import type { AlgorithmDefinition } from '../../data/learn/types'
import { AlgorithmVisualizer } from '../learn/AlgorithmVisualizer'
import { DSCategoryTabs } from '../../components/DSCategoryTabs'
import {
  EducationSections,
  PostVisualizationContent
} from '../learn/EducationSections'

interface DSProblemPageProps {
  dsName: string
  basePath: string
  problems: AlgorithmDefinition[]
}

function ComingSoonOverlay() {
  return (
    <div className="coming-soon-overlay">
      <div className="coming-soon-content">
        <img src="/python/cc_worker.png" alt="Claude working" className="coming-soon-image" />
        <h2 className="coming-soon-title">Claude will build soon</h2>
        <p className="coming-soon-text">This visualization feature is under development</p>
      </div>
    </div>
  )
}

// Problems with working visualizations (no overlay)
const READY_PROBLEMS = ['container-with-most-water']

export function DSProblemPage({ dsName, basePath, problems }: DSProblemPageProps) {
  const { problemId } = useParams<{ problemId: string }>()

  const problem = problems.find(p => p.id === problemId)

  if (!problem) {
    return <Navigate to={`${basePath}/problems`} replace />
  }

  const showOverlay = !READY_PROBLEMS.includes(problem.id)

  return (
    <div className="type-page ds-problem-page">
      {showOverlay && <ComingSoonOverlay />}
      <header className="type-header">
        <div className="ds-problem-breadcrumb">
          <Link to={basePath}>{dsName}</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={`${basePath}/problems`}>Problems</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{problem.name}</span>
        </div>
        <div className="type-title-row">
          <h1 className="type-name">{problem.name}</h1>
          <span className={`ds-problem-difficulty ${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
      </header>

      <DSCategoryTabs basePath={basePath} problemCount={problems.length} />

      {/* Education content before visualization */}
      <EducationSections
        education={problem.education}
        examples={problem.examples}
        description={problem.description}
        leetcodeId={problem.leetcodeId}
        categoryName={dsName}
      />

      {/* Solution / Visualization */}
      <section className="learn-solution-section">
        <h3 className="learn-section-title">Solution</h3>
        <AlgorithmVisualizer algorithm={problem} />
      </section>

      {/* Explanation after visualization */}
      <PostVisualizationContent education={problem.education} />
    </div>
  )
}

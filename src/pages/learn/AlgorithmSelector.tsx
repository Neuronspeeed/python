import type { AlgorithmDefinition } from '../../data/learn/types'

interface AlgorithmSelectorProps {
  algorithms: AlgorithmDefinition[]
  activeAlgorithm: string
  onAlgorithmChange: (algorithmId: string) => void
}

const DIFFICULTY_COLORS = {
  Easy: '#16A34A',
  Medium: '#CA8A04',
  Hard: '#DC2626',
}

export function AlgorithmSelector({
  algorithms,
  activeAlgorithm,
  onAlgorithmChange,
}: AlgorithmSelectorProps) {
  return (
    <div className="learn-algorithm-selector">
      <div className="learn-algorithm-list">
        {algorithms.map(algo => (
          <button
            key={algo.id}
            className={`learn-algorithm-item ${activeAlgorithm === algo.id ? 'active' : ''}`}
            onClick={() => onAlgorithmChange(algo.id)}
          >
            <div className="learn-algorithm-info">
              <span className="learn-algorithm-name">{algo.name}</span>
              {algo.leetcodeId && (
                <span className="learn-algorithm-leetcode">#{algo.leetcodeId}</span>
              )}
            </div>
            <div className="learn-algorithm-meta">
              <span
                className="learn-algorithm-difficulty"
                style={{ color: DIFFICULTY_COLORS[algo.difficulty] }}
              >
                {algo.difficulty}
              </span>
              <span className="learn-algorithm-complexity">{algo.timeComplexity}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

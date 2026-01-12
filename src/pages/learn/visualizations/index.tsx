import type { AlgorithmStep, ArrayElement, PointerElement, BracketElement, StackElement, LinkedListElement, MatrixElement, TreeElement } from '../../../data/learn/types'
import { ArrayVisualization } from './ArrayVisualization'
import { StackVisualization } from './StackVisualization'
import { LinkedListVisualization } from './LinkedListVisualization'
import { MatrixVisualization } from './MatrixVisualization'
import { TreeVisualization } from './TreeVisualization'

interface VisualizationPanelProps {
  step: AlgorithmStep | null
}

export function VisualizationPanel({ step }: VisualizationPanelProps) {
  if (!step) {
    return (
      <div className="learn-viz-panel">
        <div className="learn-viz-empty">
          Press Enter to start visualization
        </div>
      </div>
    )
  }

  const arrayEls = step.elements.filter((e): e is ArrayElement => e.type === 'array')
  const pointers = step.elements.filter((e): e is PointerElement => e.type === 'pointer')
  const brackets = step.elements.filter((e): e is BracketElement => e.type === 'bracket')
  const stackEl = step.elements.find((e): e is StackElement => e.type === 'stack')
  const linkedListEl = step.elements.find((e): e is LinkedListElement => e.type === 'linkedList')
  const matrixEl = step.elements.find((e): e is MatrixElement => e.type === 'matrix')
  const treeEl = step.elements.find((e): e is TreeElement => e.type === 'tree')

  return (
    <div className="learn-viz-panel">
      <div className="learn-viz-content">
        {arrayEls.map((arrayEl, idx) => {
          const arrayPointers = arrayEl.pointers || (idx === 0 ? pointers.map(p => ({ index: p.index, label: p.label, color: p.color })) : [])
          return (
            <ArrayVisualization
              key={arrayEl.id || idx}
              array={arrayEl}
              pointers={arrayPointers}
              brackets={idx === 0 ? brackets : []}
            />
          )
        })}
        {stackEl && <StackVisualization stack={stackEl} />}
        {linkedListEl && <LinkedListVisualization list={linkedListEl} />}
        {matrixEl && <MatrixVisualization matrix={matrixEl} />}
        {treeEl && <TreeVisualization tree={treeEl} />}
      </div>

      {step.description && (
        <div className="learn-step-description">
          <span className="learn-step-icon">
            {step.isComplete ? '[x]' : '>'}
          </span>
          {step.description}
        </div>
      )}

      {step.variables && Object.keys(step.variables).length > 0 && (
        <div className="learn-variables">
          {Object.entries(step.variables).map(([key, value]) => (
            <span key={key} className="learn-variable">
              <span className="learn-variable-name">{key}</span>
              <span className="learn-variable-eq">=</span>
              <span className="learn-variable-value">
                {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
              </span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

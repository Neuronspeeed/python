import type { StackElement } from '../../../data/learn/types'
import { STYLE_COLORS } from './ArrayVisualization'

interface StackVisualizationProps {
  stack: StackElement
}

export function StackVisualization({ stack }: StackVisualizationProps) {
  return (
    <div className="learn-stack-container">
      <div className="learn-stack-label">TOP</div>
      <div className="learn-stack-items">
        {stack.items.map((item, i) => {
          const highlight = stack.highlights?.find(h => h.index === i)
          const style = highlight?.style || 'default'
          const color = STYLE_COLORS[style]

          return (
            <div
              key={i}
              className="learn-stack-cell"
              style={{ backgroundColor: color }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

import type { LinkedListElement } from '../../../data/learn/types'
import { STYLE_COLORS } from './ArrayVisualization'

interface LinkedListVisualizationProps {
  list: LinkedListElement
}

export function LinkedListVisualization({ list }: LinkedListVisualizationProps) {
  return (
    <div className="learn-linkedlist-container">
      {/* Pointers */}
      <div className="learn-linkedlist-pointers">
        {list.nodes.map((_, i) => {
          const pointer = list.pointers?.find(p => p.index === i)
          return (
            <div key={i} className="learn-linkedlist-pointer-slot">
              {pointer && (
                <>
                  <span style={{ color: pointer.color }}>{pointer.label}</span>
                  <span style={{ color: pointer.color }}>↓</span>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Nodes */}
      <div className="learn-linkedlist-nodes">
        {list.nodes.map((node, i) => {
          const color = STYLE_COLORS[node.style || 'default']
          return (
            <div key={i} className="learn-linkedlist-node-wrapper">
              <div
                className="learn-linkedlist-node"
                style={{ backgroundColor: color }}
              >
                {node.value}
              </div>
              {i < list.nodes.length - 1 && (
                <div className="learn-linkedlist-arrow">→</div>
              )}
            </div>
          )
        })}
        <div className="learn-linkedlist-null">NULL</div>
      </div>
    </div>
  )
}

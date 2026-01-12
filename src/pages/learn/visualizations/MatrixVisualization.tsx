import type { MatrixElement } from '../../../data/learn/types'
import { STYLE_COLORS } from './ArrayVisualization'

interface MatrixVisualizationProps {
  matrix: MatrixElement
}

export function MatrixVisualization({ matrix }: MatrixVisualizationProps) {
  const { rows, cols, values, highlights } = matrix

  const getHighlight = (row: number, col: number) => {
    return highlights?.find(h => h.row === row && h.col === col)
  }

  return (
    <div className="learn-matrix-container">
      <div
        className="learn-matrix-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 50px)`,
          gap: '2px',
        }}
      >
        {Array.from({ length: rows }, (_, row) =>
          Array.from({ length: cols }, (_, col) => {
            const index = row * cols + col
            const value = values[index]
            const highlight = getHighlight(row, col)
            const style = highlight?.style || 'default'
            const color = STYLE_COLORS[style]
            const isQueen = value === 1 || value === 'Q'

            return (
              <div
                key={`${row}-${col}`}
                className="learn-matrix-cell"
                style={{
                  backgroundColor: color,
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isQueen ? '24px' : '16px',
                  fontWeight: 'bold',
                  color: '#fff',
                  borderRadius: '4px',
                }}
              >
                {isQueen ? '♛' : '·'}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

import type { ArrayElement, BracketElement, ElementStyle } from '../../../data/learn/types'

export const STYLE_COLORS: Record<ElementStyle, string> = {
  default: '#78716C',
  active: '#D97757',
  comparing: '#CA8A04',
  found: '#16A34A',
  visited: '#8B5CF6',
  swapped: '#3B82F6',
  inactive: '#9CA3AF',
}

export type SimplePointer = { index: number; label: string; color: string }

interface ArrayVisualizationProps {
  array: ArrayElement
  pointers: SimplePointer[]
  brackets: BracketElement[]
}

export function ArrayVisualization({
  array,
  pointers,
  brackets,
}: ArrayVisualizationProps) {
  const values = array.values

  // Get unique pointer labels to create separate rows
  const uniqueLabels = [...new Set(pointers.map(p => p.label))]

  // Check if we should show bars (for container/height problems)
  const showBars = array.showBars ?? false
  const maxVal = showBars ? Math.max(...values.map(v => typeof v === 'number' ? v : 0)) : 0
  const barMaxHeight = 140 // Maximum bar height in pixels
  const barMinHeight = 15 // Minimum bar height for visibility

  return (
    <div className="learn-array-container">
      {/* Bars row (for container/height problems) */}
      {showBars && (
        <div className="learn-bars-row">
          {values.map((val, i) => {
            const numVal = typeof val === 'number' ? val : 0
            const height = maxVal > 0 ? Math.max(barMinHeight, (numVal / maxVal) * barMaxHeight) : barMinHeight
            const highlight = array.highlights?.find(h => h.index === i)
            const style = highlight?.style || 'default'
            const isActive = style === 'active' || style === 'comparing'

            return (
              <div key={i} className="learn-bar-slot">
                <div
                  className={`learn-bar ${isActive ? 'learn-bar-active' : ''}`}
                  style={{ height: `${height}px` }}
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Separate row per pointer type */}
      <div className="learn-pointers-container">
        {uniqueLabels.map(label => (
          <div key={label} className="learn-pointers-row">
            {values.map((_, i) => {
              const pointer = pointers.find(p => p.index === i && p.label === label)
              return (
                <div key={i} className="learn-pointer-slot">
                  {pointer && (
                    <>
                      <span className="learn-pointer-label" style={{ color: pointer.color }}>
                        {pointer.label}
                      </span>
                      <span className="learn-pointer-arrow" style={{ color: pointer.color }}>
                        ↓
                      </span>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Array row */}
      <div className="learn-array-row">
        {values.map((val, i) => {
          const highlight = array.highlights?.find(h => h.index === i)
          const style = highlight?.style || 'default'
          const color = STYLE_COLORS[style]
          const isFirst = i === 0
          const isLast = i === values.length - 1

          return (
            <div
              key={i}
              className={`learn-array-cell ${style !== 'default' ? `learn-cell-${style}` : ''}`}
              style={{
                backgroundColor: color,
                borderRadius: isFirst ? '6px 0 0 6px' : isLast ? '0 6px 6px 0' : '0',
              }}
            >
              {val}
            </div>
          )
        })}
      </div>

      {/* Index row */}
      <div className="learn-index-row">
        {values.map((_, i) => (
          <div key={i} className="learn-index-cell">{i}</div>
        ))}
      </div>

      {/* Brackets row */}
      {brackets.length > 0 && (
        <div className="learn-brackets-row">
          {brackets.map((bracket, i) => (
            <div
              key={i}
              className="learn-bracket"
              style={{
                left: `${bracket.left * 50}px`,
                width: `${(bracket.right - bracket.left + 1) * 50 - 4}px`,
              }}
            >
              <div className="learn-bracket-line" />
              {bracket.value !== undefined && (
                <span className="learn-bracket-value">{bracket.value}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import type { AlgorithmStep, ElementStyle, ArrayElement, PointerElement, BracketElement, StackElement, LinkedListElement, MatrixElement, TreeElement } from '../../data/learn/types'

interface VisualizationPanelProps {
  step: AlgorithmStep | null
}

const STYLE_COLORS: Record<ElementStyle, string> = {
  default: '#78716C',
  active: '#D97757',
  comparing: '#CA8A04',
  found: '#16A34A',
  visited: '#8B5CF6',
  swapped: '#3B82F6',
  inactive: '#9CA3AF',
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
            {step.isComplete ? '✓' : '→'}
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

type SimplePointer = { index: number; label: string; color: string }

function ArrayVisualization({
  array,
  pointers,
  brackets,
}: {
  array: ArrayElement
  pointers: SimplePointer[]
  brackets: BracketElement[]
}) {
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

function StackVisualization({ stack }: { stack: StackElement }) {
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

function LinkedListVisualization({ list }: { list: LinkedListElement }) {
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

function MatrixVisualization({ matrix }: { matrix: MatrixElement }) {
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

function TreeVisualization({ tree }: { tree: TreeElement }) {
  const { nodes, highlights } = tree

  // Configuration
  const NODE_SIZE = 44
  const LEVEL_HEIGHT = 70
  const MIN_NODE_SPACING = 20

  // Get highlight style for a node
  const getStyle = (index: number) => {
    const highlight = highlights?.find(h => h.index === index)
    if (highlight) return highlight.style
    const node = nodes[index]
    if (node && typeof node === 'object' && 'style' in node) return node.style
    return 'default'
  }

  // Get node value
  const getValue = (index: number) => {
    const node = nodes[index]
    if (node === null || node === undefined) return null
    if (typeof node === 'object' && 'value' in node) return node.value
    return node
  }

  // Calculate node positions using a recursive approach for proper spacing
  const calculatePositions = (): Map<number, { x: number; y: number }> => {
    const positions = new Map<number, { x: number; y: number }>()

    // Calculate width needed for each subtree
    const getSubtreeWidth = (index: number): number => {
      if (index >= nodes.length || getValue(index) === null) return 0
      const leftWidth = getSubtreeWidth(2 * index + 1)
      const rightWidth = getSubtreeWidth(2 * index + 2)
      return Math.max(NODE_SIZE + MIN_NODE_SPACING, leftWidth + rightWidth + MIN_NODE_SPACING)
    }

    // Position nodes recursively
    const positionNode = (index: number, x: number, y: number) => {
      if (index >= nodes.length || getValue(index) === null) return

      positions.set(index, { x, y })

      const leftChild = 2 * index + 1
      const rightChild = 2 * index + 2
      const leftWidth = getSubtreeWidth(leftChild)
      const rightWidth = getSubtreeWidth(rightChild)
      const totalChildWidth = leftWidth + rightWidth

      if (totalChildWidth > 0) {
        const childY = y + LEVEL_HEIGHT
        const leftX = x - (rightWidth > 0 ? totalChildWidth / 2 - leftWidth / 2 : 0)
        const rightX = x + (leftWidth > 0 ? totalChildWidth / 2 - rightWidth / 2 : 0)

        if (leftWidth > 0) positionNode(leftChild, leftX, childY)
        if (rightWidth > 0) positionNode(rightChild, rightX, childY)
      }
    }

    const totalWidth = getSubtreeWidth(0)
    positionNode(0, totalWidth / 2, NODE_SIZE / 2 + 10)

    return positions
  }

  const positions = calculatePositions()

  // Calculate SVG dimensions
  let minX = Infinity, maxX = -Infinity, maxY = 0
  positions.forEach(({ x, y }) => {
    minX = Math.min(minX, x - NODE_SIZE / 2)
    maxX = Math.max(maxX, x + NODE_SIZE / 2)
    maxY = Math.max(maxY, y + NODE_SIZE / 2)
  })

  const padding = 20
  const svgWidth = Math.max(200, maxX - minX + padding * 2)
  const svgHeight = maxY + padding
  const offsetX = -minX + padding

  // Generate curved path between parent and child
  const getEdgePath = (parentPos: { x: number; y: number }, childPos: { x: number; y: number }): string => {
    const startX = parentPos.x + offsetX
    const startY = parentPos.y + NODE_SIZE / 2 - 4
    const endX = childPos.x + offsetX
    const endY = childPos.y - NODE_SIZE / 2 + 4
    const midY = (startY + endY) / 2

    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
  }

  // Collect edges
  const edges: { parent: number; child: number; path: string }[] = []
  positions.forEach((parentPos, parentIndex) => {
    const leftChild = 2 * parentIndex + 1
    const rightChild = 2 * parentIndex + 2

    if (positions.has(leftChild)) {
      edges.push({
        parent: parentIndex,
        child: leftChild,
        path: getEdgePath(parentPos, positions.get(leftChild)!)
      })
    }
    if (positions.has(rightChild)) {
      edges.push({
        parent: parentIndex,
        child: rightChild,
        path: getEdgePath(parentPos, positions.get(rightChild)!)
      })
    }
  })

  return (
    <div className="learn-tree-container" style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '10px 0',
    }}>
      <svg
        width={svgWidth}
        height={svgHeight}
        style={{ overflow: 'visible' }}
      >
        {/* Subtle grid pattern background */}
        <defs>
          <pattern id="tree-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5"/>
          </pattern>
          {/* Glow filter for active nodes */}
          <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <rect width={svgWidth} height={svgHeight} fill="url(#tree-grid)" />

        {/* Edges with gradient */}
        {edges.map(({ parent, child, path }) => (
          <g key={`edge-${parent}-${child}`}>
            {/* Shadow line */}
            <path
              d={path}
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="3"
              strokeLinecap="round"
              transform="translate(1, 1)"
            />
            {/* Main line */}
            <path
              d={path}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ transition: 'stroke 0.3s ease' }}
            />
          </g>
        ))}

        {/* Nodes */}
        {Array.from(positions.entries()).map(([index, pos]) => {
          const value = getValue(index)
          const style = getStyle(index)
          const color = STYLE_COLORS[style || 'default']
          const isHighlighted = style === 'active' || style === 'found'

          return (
            <g
              key={`node-${index}`}
              transform={`translate(${pos.x + offsetX}, ${pos.y})`}
              style={{ transition: 'transform 0.3s ease' }}
            >
              {/* Node shadow */}
              <circle
                r={NODE_SIZE / 2}
                fill="rgba(0,0,0,0.15)"
                transform="translate(2, 2)"
              />
              {/* Node circle */}
              <circle
                r={NODE_SIZE / 2}
                fill={color}
                filter={isHighlighted ? 'url(#node-glow)' : undefined}
                style={{
                  transition: 'fill 0.3s ease',
                }}
              />
              {/* Inner highlight ring */}
              <circle
                r={NODE_SIZE / 2 - 3}
                fill="none"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1"
              />
              {/* Node value */}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fill="#fff"
                fontSize="15"
                fontWeight="600"
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                  userSelect: 'none',
                }}
              >
                {value}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

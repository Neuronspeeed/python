import type { TreeElement } from '../../../data/learn/types'
import { STYLE_COLORS } from './ArrayVisualization'

interface TreeVisualizationProps {
  tree: TreeElement
}

export function TreeVisualization({ tree }: TreeVisualizationProps) {
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

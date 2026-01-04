import { useState, useRef, useEffect, useCallback } from 'react'
import { complexities, formatOps } from './bigOData'

interface TooltipState {
  visible: boolean
  x: number
  y: number
  content: { notation: string; color: string; value: string }[]
  n: number
}

export function InteractiveChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const crosshairRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const [inputN, setInputN] = useState(25)
  const [visible, setVisible] = useState<Set<string>>(new Set(complexities.map(c => c.notation)))
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, content: [], n: 0 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [crosshairX, setCrosshairX] = useState<number | null>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const w = rect.width
    const h = rect.height
    const pad = { top: 30, right: 70, bottom: 40, left: 55 }
    const cw = w - pad.left - pad.right
    const ch = h - pad.top - pad.bottom

    // Background
    ctx.fillStyle = 'var(--bg-card)'
    ctx.fillRect(0, 0, w, h)

    // Get computed background color
    const computedStyle = getComputedStyle(document.documentElement)
    const bgCard = computedStyle.getPropertyValue('--bg-card').trim() || '#EFEBE4'
    const borderColor = computedStyle.getPropertyValue('--border-color').trim() || 'rgba(0,0,0,0.08)'
    const textMuted = computedStyle.getPropertyValue('--text-muted').trim() || '#7a7a7a'

    ctx.fillStyle = bgCard
    ctx.fillRect(0, 0, w, h)

    // Calculate max Y
    let maxY = 0
    const visComps = complexities.filter(c => visible.has(c.notation))
    visComps.forEach(c => {
      for (let i = 1; i <= inputN; i++) {
        const val = c.calc(i)
        if (val > maxY && val < Infinity) maxY = val
      }
    })
    maxY = Math.min(maxY * 1.15, 1e10)

    // Grid lines
    ctx.strokeStyle = borderColor
    ctx.lineWidth = 1
    for (let i = 0; i <= 5; i++) {
      const y = pad.top + (ch / 5) * i
      ctx.beginPath()
      ctx.moveTo(pad.left, y)
      ctx.lineTo(w - pad.right, y)
      ctx.stroke()
      ctx.fillStyle = textMuted
      ctx.font = '11px JetBrains Mono, monospace'
      ctx.textAlign = 'right'
      ctx.fillText(formatOps(maxY * (1 - i / 5)), pad.left - 8, y + 4)
    }

    // X axis labels
    const xSteps = Math.min(inputN, 10)
    for (let i = 0; i <= xSteps; i++) {
      const x = pad.left + (cw / xSteps) * i
      ctx.beginPath()
      ctx.moveTo(x, pad.top)
      ctx.lineTo(x, h - pad.bottom)
      ctx.stroke()
      ctx.textAlign = 'center'
      ctx.fillText(Math.round((inputN / xSteps) * i).toString(), x, h - pad.bottom + 18)
    }

    // Axis labels
    ctx.fillStyle = textMuted
    ctx.font = '12px Inter, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('Input Size (n)', w / 2, h - 8)
    ctx.save()
    ctx.translate(14, h / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('Operations', 0, 0)
    ctx.restore()

    // Draw curves
    visComps.forEach(comp => {
      const isActive = activeCard === null || activeCard === comp.notation
      ctx.beginPath()
      ctx.strokeStyle = comp.color
      ctx.lineWidth = isActive ? 2.5 : 1.5
      ctx.globalAlpha = isActive ? 1 : 0.25

      for (let i = 1; i <= inputN; i++) {
        const x = pad.left + (i / inputN) * cw
        const val = Math.min(comp.calc(i), maxY)
        const y = pad.top + ch - (val / maxY) * ch
        if (i === 1) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Label at end of curve
      if (isActive) {
        const finalVal = Math.min(comp.calc(inputN), maxY)
        const finalY = pad.top + ch - (finalVal / maxY) * ch
        ctx.fillStyle = comp.color
        ctx.font = '600 11px JetBrains Mono, monospace'
        ctx.textAlign = 'left'
        ctx.fillText(comp.notation, w - pad.right + 6, finalY + 4)
      }
      ctx.globalAlpha = 1
    })
  }, [inputN, visible, activeCard])

  useEffect(() => {
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [draw])

  // Animation effect - uses ref to track animation value, only updates state in callback
  useEffect(() => {
    if (!isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      return
    }

    // Use a ref-based counter to avoid synchronous setState
    let currentVal = 0
    const animate = () => {
      currentVal = currentVal >= 50 ? 0 : currentVal + 0.5
      setInputN(Math.round(currentVal))
      timeoutRef.current = window.setTimeout(animate, 50)
    }
    // Start animation after a tick to avoid synchronous setState
    timeoutRef.current = window.setTimeout(animate, 0)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isPlaying])

  const togglePlay = () => setIsPlaying(prev => !prev)

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const pad = { left: 55, right: 70 }
    const cw = rect.width - pad.left - pad.right

    if (x >= pad.left && x <= rect.width - pad.right) {
      setCrosshairX(x)
      const n = Math.round(((x - pad.left) / cw) * inputN)
      if (n >= 1) {
        const content = complexities
          .filter(c => visible.has(c.notation))
          .map(c => ({
            notation: c.notation,
            color: c.color,
            value: formatOps(c.calc(n))
          }))
        setTooltip({
          visible: true,
          x: e.clientX + 12,
          y: e.clientY - 8,
          content,
          n
        })
      }
    } else {
      setCrosshairX(null)
      setTooltip(prev => ({ ...prev, visible: false }))
    }
  }

  const handleMouseLeave = () => {
    setCrosshairX(null)
    setTooltip(prev => ({ ...prev, visible: false }))
  }

  const toggleVisibility = (notation: string) => {
    setVisible(prev => {
      const next = new Set(prev)
      if (next.has(notation)) next.delete(notation)
      else next.add(notation)
      return next
    })
  }

  return (
    <div className="interactive-chart-section">
      <div className="chart-layout">
        <div className="chart-card-container">
          <div className="chart-card-header">
            <span className="chart-card-title">Growth Rate Comparison</span>
            <div className="chart-controls">
              <div className="chart-slider-group">
                <label>n =</label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={inputN}
                  onChange={e => setInputN(parseInt(e.target.value))}
                  className="chart-slider"
                />
                <span className="chart-slider-value">{inputN}</span>
              </div>
              <button
                className={`chart-play-btn ${isPlaying ? 'playing' : ''}`}
                onClick={togglePlay}
              >
                {isPlaying ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
                <span>{isPlaying ? 'Pause' : 'Animate'}</span>
              </button>
            </div>
          </div>
          <div className="chart-body">
            <div className="chart-wrapper" ref={containerRef}>
              <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              />
              {crosshairX !== null && (
                <div
                  ref={crosshairRef}
                  className="chart-crosshair"
                  style={{ left: crosshairX }}
                />
              )}
            </div>
          </div>
          <div className="chart-legend">
            {complexities.map(comp => (
              <button
                key={comp.notation}
                className={`chart-legend-item ${!visible.has(comp.notation) ? 'hidden' : ''}`}
                onClick={() => toggleVisibility(comp.notation)}
              >
                <span className="chart-legend-dot" style={{ background: comp.color }} />
                {comp.notation}
              </button>
            ))}
          </div>
        </div>
        <div className="complexity-cards-sidebar">
          {complexities.map((comp, idx) => (
            <button
              key={comp.notation}
              className={`sidebar-complexity-card ${activeCard === comp.notation ? 'active' : ''}`}
              style={{ '--card-color': comp.color, '--delay': `${idx * 0.05}s` } as React.CSSProperties}
              onClick={() => setActiveCard(activeCard === comp.notation ? null : comp.notation)}
            >
              <div className="sidebar-card-row">
                <span className="sidebar-card-notation">{comp.notation}</span>
                <span className={`sidebar-card-badge sidebar-badge-${comp.rating.toLowerCase()}`}>
                  {comp.rating}
                </span>
              </div>
              <div className="sidebar-card-name">{comp.name}</div>
              <div className="sidebar-card-stats">
                <span>n = {inputN}</span>
                <span className="sidebar-card-ops">{formatOps(comp.calc(inputN))} ops</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {tooltip.visible && (
        <div
          className="chart-tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <strong>n = {tooltip.n}</strong>
          {tooltip.content.map(item => (
            <div key={item.notation} style={{ color: item.color }}>
              {item.notation}: {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

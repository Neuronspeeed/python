import { useState } from 'react'
import type { AlgorithmEducation, AlgorithmExample } from '../../data/learn/types'

// TL;DR Card - The ONE thing to remember
interface TLDRCardProps {
  pattern: string
  insight: string
  timeComplexity: string
}

export function TLDRCard({ pattern, insight, timeComplexity }: TLDRCardProps) {
  return (
    <div className="adhd-tldr">
      <div className="adhd-tldr-header">
        <span className="adhd-tldr-badge">TL;DR</span>
        <span className="adhd-tldr-complexity">{timeComplexity}</span>
      </div>
      <p className="adhd-tldr-text">{insight}</p>
      <div className="adhd-tldr-pattern">
        <span className="adhd-tldr-label">Pattern:</span>
        <span className="adhd-tldr-value">{pattern}</span>
      </div>
    </div>
  )
}

// Visual Steps - Numbered, bite-sized
interface StepProps {
  number: number
  title: string
  description: string
  code?: string
}

function Step({ number, title, description, code }: StepProps) {
  return (
    <div className="adhd-step">
      <div className="adhd-step-number">{number}</div>
      <div className="adhd-step-content">
        <div className="adhd-step-title">{title}</div>
        <div className="adhd-step-desc">{description}</div>
        {code && <code className="adhd-step-code">{code}</code>}
      </div>
    </div>
  )
}

interface HowItWorksProps {
  steps: Array<{ title: string; description: string; code?: string }>
}

export function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <div className="adhd-how-it-works">
      <h3 className="adhd-section-title">
        <span className="adhd-icon">🔄</span>
        How It Works
      </h3>
      <div className="adhd-steps">
        {steps.map((step, idx) => (
          <Step
            key={idx}
            number={idx + 1}
            title={step.title}
            description={step.description}
            code={step.code}
          />
        ))}
      </div>
    </div>
  )
}

// Collapsible Deep Dive
interface DeepDiveProps {
  title: string
  children: React.ReactNode
}

export function DeepDive({ title, children }: DeepDiveProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`adhd-deep-dive ${isOpen ? 'open' : ''}`}>
      <button
        className="adhd-deep-dive-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="adhd-deep-dive-icon">{isOpen ? '−' : '+'}</span>
        <span className="adhd-deep-dive-title">{title}</span>
        <span className="adhd-deep-dive-hint">
          {isOpen ? 'collapse' : 'expand for details'}
        </span>
      </button>
      {isOpen && (
        <div className="adhd-deep-dive-content">
          {children}
        </div>
      )}
    </div>
  )
}

// Quick Example - Visual, minimal
interface QuickExampleProps {
  input: string
  output: string
  visual?: React.ReactNode
}

export function QuickExample({ input, output, visual }: QuickExampleProps) {
  return (
    <div className="adhd-example">
      <div className="adhd-example-io">
        <div className="adhd-example-input">
          <span className="adhd-example-label">IN</span>
          <code>{input}</code>
        </div>
        <span className="adhd-example-arrow">→</span>
        <div className="adhd-example-output">
          <span className="adhd-example-label">OUT</span>
          <code>{output}</code>
        </div>
      </div>
      {visual && <div className="adhd-example-visual">{visual}</div>}
    </div>
  )
}

// Key Insight Box - Single most important thing
interface KeyInsightProps {
  icon?: string
  text: string
}

export function KeyInsight({ icon = '●', text }: KeyInsightProps) {
  return (
    <div className="adhd-key-insight">
      <span className="adhd-key-insight-icon">{icon}</span>
      <span className="adhd-key-insight-text">{text}</span>
    </div>
  )
}

// Quick Reference Sidebar
interface QuickRefProps {
  formula?: string
  pattern?: string
  remember?: string[]
}

export function QuickReference({ formula, pattern, remember }: QuickRefProps) {
  return (
    <aside className="adhd-quick-ref">
      <div className="adhd-quick-ref-header">Quick Reference</div>

      {formula && (
        <div className="adhd-quick-ref-section">
          <span className="adhd-quick-ref-label">Formula</span>
          <code className="adhd-quick-ref-code">{formula}</code>
        </div>
      )}

      {pattern && (
        <div className="adhd-quick-ref-section">
          <span className="adhd-quick-ref-label">Pattern</span>
          <div className="adhd-quick-ref-pattern">{pattern}</div>
        </div>
      )}

      {remember && remember.length > 0 && (
        <div className="adhd-quick-ref-section">
          <span className="adhd-quick-ref-label">Remember</span>
          <ul className="adhd-quick-ref-list">
            {remember.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  )
}

// Main ADHD-friendly education component
interface ADHDEducationProps {
  algorithm: {
    name: string
    description: string
    timeComplexity: string
    spaceComplexity: string
    examples?: AlgorithmExample[]
    education?: AlgorithmEducation
  }
  categoryName: string
}

export function ADHDEducation({ algorithm, categoryName }: ADHDEducationProps) {
  // Extract a TL;DR from the education content
  const tldrInsight = algorithm.education?.keyInsights?.[0] || algorithm.description

  // Convert education content to steps if available
  const steps = [
    { title: 'Start wide', description: 'Put pointers at both ends of array', code: 'left=0, right=len-1' },
    { title: 'Calculate area', description: 'Width × shorter height', code: 'area = (right-left) × min(h[left], h[right])' },
    { title: 'Move shorter pointer', description: 'The shorter wall limits us, so move it inward', code: 'if h[left] < h[right]: left++ else right--' },
    { title: 'Track maximum', description: 'Update max if current area is bigger' },
  ]

  return (
    <div className="adhd-education">
      {/* TL;DR first - always visible */}
      <TLDRCard
        pattern={categoryName}
        insight={tldrInsight}
        timeComplexity={algorithm.timeComplexity}
      />

      {/* Quick visual example */}
      {algorithm.examples && algorithm.examples[0] && (
        <QuickExample
          input={algorithm.examples[0].input}
          output={algorithm.examples[0].output}
        />
      )}

      {/* Key insight callout */}
      {algorithm.education?.keyInsights && algorithm.education.keyInsights[2] && (
        <KeyInsight text={algorithm.education.keyInsights[2]} />
      )}

      {/* How it works - visual steps */}
      <HowItWorks steps={steps} />

      {/* Deep dive sections - collapsed by default */}
      {algorithm.education?.understanding && (
        <DeepDive title="Why this works (deep dive)">
          <p>{algorithm.education.whyPatternWorks}</p>
        </DeepDive>
      )}

      {algorithm.examples && algorithm.examples.length > 1 && (
        <DeepDive title="More examples">
          {algorithm.examples.slice(1).map((ex, idx) => (
            <QuickExample key={idx} input={ex.input} output={ex.output} />
          ))}
        </DeepDive>
      )}
    </div>
  )
}

export default ADHDEducation

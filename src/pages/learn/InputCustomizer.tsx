import { useState } from 'react'
import type { AlgorithmInput } from '../../data/learn/types'

interface InputCustomizerProps {
  inputs: AlgorithmInput[]
  values: Record<string, unknown>
  onValuesChange: (values: Record<string, unknown>) => void
  onRun: () => void
}

export function InputCustomizer({ inputs, values, onValuesChange, onRun }: InputCustomizerProps) {
  const [localValues, setLocalValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {}
    inputs.forEach(input => {
      const val = values[input.name]
      initial[input.name] = Array.isArray(val) ? val.join(', ') : String(val ?? input.default)
    })
    return initial
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setLocalValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleRun = () => {
    const newValues: Record<string, unknown> = {}
    const newErrors: Record<string, string> = {}
    let hasError = false

    inputs.forEach(input => {
      const rawValue = localValues[input.name]

      try {
        if (input.type === 'array') {
          const arr = rawValue.split(',').map(s => {
            const num = parseInt(s.trim(), 10)
            if (isNaN(num)) throw new Error('Invalid number')
            return num
          })
          if (arr.length === 0) throw new Error('Array cannot be empty')
          newValues[input.name] = arr
        } else if (input.type === 'number') {
          const num = parseInt(rawValue, 10)
          if (isNaN(num)) throw new Error('Invalid number')
          newValues[input.name] = num
        } else {
          newValues[input.name] = rawValue
        }
      } catch {
        newErrors[input.name] = input.type === 'array'
          ? 'Enter comma-separated numbers'
          : 'Enter a valid number'
        hasError = true
      }
    })

    setErrors(newErrors)

    if (!hasError) {
      onValuesChange(newValues)
      onRun()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleRun()
    }
  }

  return (
    <div className="learn-input-section">
      {inputs.map(input => (
        <div key={input.name} className="learn-input-group">
          <label className="learn-input-label" htmlFor={`input-${input.name}`}>
            {input.label}
          </label>
          <input
            id={`input-${input.name}`}
            type="text"
            className={`learn-input-field ${errors[input.name] ? 'error' : ''}`}
            value={localValues[input.name]}
            onChange={e => handleChange(input.name, e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={input.placeholder}
          />
          {errors[input.name] && (
            <span className="learn-input-error">{errors[input.name]}</span>
          )}
        </div>
      ))}
    </div>
  )
}

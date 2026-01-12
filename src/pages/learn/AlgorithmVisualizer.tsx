import { useState, useMemo, useCallback, useEffect } from 'react'
import type { AlgorithmDefinition, AlgorithmStep } from '../../data/learn/types'
import { usePlayback } from './usePlayback'
import { CodePanel } from './CodePanel'
import { VisualizationPanel } from './visualizations'
import { PlaybackControls } from './PlaybackControls'
import { InputCustomizer } from './InputCustomizer'

interface AlgorithmVisualizerProps {
  algorithm: AlgorithmDefinition
}

export function AlgorithmVisualizer({ algorithm }: AlgorithmVisualizerProps) {
  // Initialize values from algorithm defaults
  const initialValues = useMemo(() => {
    const values: Record<string, unknown> = {}
    algorithm.inputs.forEach(input => {
      values[input.name] = input.default
    })
    return values
  }, [algorithm])

  const [inputValues, setInputValues] = useState<Record<string, unknown>>(initialValues)

  // Generate steps from current input values
  const steps = useMemo<AlgorithmStep[]>(() => {
    try {
      return algorithm.generateSteps(inputValues)
    } catch {
      return []
    }
  }, [algorithm, inputValues])

  const {
    currentStep,
    isPlaying,
    speed,
    totalSteps,
    stepForward,
    stepBack,
    reset,
    goToStep,
    setSpeed,
    play,
    pause,
  } = usePlayback({ steps })

  const currentStepData = steps[currentStep] || null

  // Track executed lines
  const executedLines = useMemo(() => {
    const lines: number[] = []
    for (let i = 0; i < currentStep; i++) {
      if (steps[i]?.lineNumber && !lines.includes(steps[i].lineNumber)) {
        lines.push(steps[i].lineNumber)
      }
    }
    return lines
  }, [steps, currentStep])

  const handleRun = useCallback(() => {
    reset()
  }, [reset])

  // Reset inputs when algorithm changes - intentional sync to props
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const newValues: Record<string, unknown> = {}
    algorithm.inputs.forEach(input => {
      newValues[input.name] = input.default
    })
    setInputValues(newValues)
  }, [algorithm.id, algorithm.inputs])
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div className="learn-visualizer">
      {/* Complexity badges */}
      <div className="learn-visualizer-meta">
        <span className="learn-complexity-badge">
          Time: {algorithm.timeComplexity}
        </span>
        <span className="learn-complexity-badge">
          Space: {algorithm.spaceComplexity}
        </span>
        {algorithm.leetcodeId && (
          <a
            href={`https://leetcode.com/problems/${algorithm.id}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-leetcode-link"
          >
            LeetCode #{algorithm.leetcodeId}
          </a>
        )}
      </div>

      <InputCustomizer
        inputs={algorithm.inputs}
        values={inputValues}
        onValuesChange={setInputValues}
        onRun={handleRun}
      />

      {/* Visualizer container matching reference design */}
      <div className="learn-visualizer-box">
        <div className="learn-visualizer-box-header">
          <span className="learn-visualizer-box-title">VISUALIZATION</span>
          <span className="learn-visualizer-lang">Python</span>
        </div>

        <div className="learn-split-pane">
        <CodePanel
          code={algorithm.code}
          activeLine={currentStepData?.lineNumber || 0}
          executedLines={executedLines}
        />
        <VisualizationPanel step={currentStepData} />
      </div>

        <PlaybackControls
          currentStep={currentStep}
          totalSteps={totalSteps}
          isPlaying={isPlaying}
          speed={speed}
          progress={totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0}
          onPlay={play}
          onPause={pause}
          onStepForward={stepForward}
          onStepBack={stepBack}
          onReset={reset}
          onGoToStep={goToStep}
          onSpeedChange={setSpeed}
        />
      </div>
    </div>
  )
}

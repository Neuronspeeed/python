import { useState, useEffect, useCallback, useRef } from 'react'
import type { AlgorithmStep } from '../../data/learn/types'

interface UsePlaybackOptions {
  steps: AlgorithmStep[]
  initialSpeed?: number
}

interface UsePlaybackReturn {
  currentStep: number
  isPlaying: boolean
  speed: number
  progress: number
  totalSteps: number
  play: () => void
  pause: () => void
  togglePlay: () => void
  stepForward: () => void
  stepBack: () => void
  reset: () => void
  goToStep: (step: number) => void
  setSpeed: (speed: number) => void
}

const SPEED_INTERVALS: Record<number, number> = {
  0.5: 2000,
  1: 1000,
  2: 500,
  4: 250,
}

export function usePlayback({ steps, initialSpeed = 1 }: UsePlaybackOptions): UsePlaybackReturn {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(initialSpeed)
  const intervalRef = useRef<number | null>(null)

  const totalSteps = steps.length
  const progress = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0

  const clearPlayInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const stepForward = useCallback(() => {
    setCurrentStep(prev => {
      if (prev >= totalSteps - 1) {
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, [totalSteps])

  const stepBack = useCallback(() => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }, [])

  const reset = useCallback(() => {
    clearPlayInterval()
    setIsPlaying(false)
    setCurrentStep(0)
  }, [clearPlayInterval])

  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.max(0, Math.min(totalSteps - 1, step)))
  }, [totalSteps])

  const play = useCallback(() => {
    if (currentStep >= totalSteps - 1) {
      setCurrentStep(0)
    }
    setIsPlaying(true)
  }, [currentStep, totalSteps])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause()
    } else {
      play()
    }
  }, [isPlaying, pause, play])

  // Handle playback interval
  useEffect(() => {
    clearPlayInterval()

    if (isPlaying) {
      const interval = SPEED_INTERVALS[speed] || 1000
      intervalRef.current = window.setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, interval)
    }

    return clearPlayInterval
  }, [isPlaying, speed, totalSteps, clearPlayInterval])

  // Reset when steps array reference changes - intentional sync to props
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    reset()
  }, [steps, reset])
  /* eslint-enable react-hooks/set-state-in-effect */

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          e.preventDefault()
          stepForward()
          break
        case 'ArrowLeft':
          e.preventDefault()
          stepBack()
          break
        case 'r':
        case 'R':
          e.preventDefault()
          reset()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, stepForward, stepBack, reset])

  return {
    currentStep,
    isPlaying,
    speed,
    progress,
    totalSteps,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBack,
    reset,
    goToStep,
    setSpeed,
  }
}

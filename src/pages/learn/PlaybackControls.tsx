interface PlaybackControlsProps {
  currentStep: number
  totalSteps: number
  isPlaying: boolean
  speed: number
  progress: number
  onPlay: () => void
  onPause: () => void
  onStepForward: () => void
  onStepBack: () => void
  onReset: () => void
  onGoToStep: (step: number) => void
  onSpeedChange: (speed: number) => void
}

const SPEEDS = [0.5, 1, 2, 4]

export function PlaybackControls({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlay,
  onPause,
  onStepForward,
  onStepBack,
  onReset,
  onGoToStep,
  onSpeedChange,
}: PlaybackControlsProps) {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onGoToStep(parseInt(e.target.value, 10))
  }

  const cycleSpeed = () => {
    const currentIndex = SPEEDS.indexOf(speed)
    const nextIndex = (currentIndex + 1) % SPEEDS.length
    onSpeedChange(SPEEDS[nextIndex])
  }

  return (
    <div className="learn-playback">
      <button
        className="learn-playback-btn"
        onClick={onReset}
        title="Reset (R)"
        aria-label="Reset"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>

      <button
        className="learn-playback-btn"
        onClick={onStepBack}
        disabled={currentStep === 0}
        title="Previous step (←)"
        aria-label="Previous step"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="learn-playback-btn"
        onClick={onStepForward}
        disabled={currentStep >= totalSteps - 1}
        title="Next step (→)"
        aria-label="Next step"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <button
        className="learn-playback-btn primary"
        onClick={isPlaying ? onPause : onPlay}
        title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </button>

      <div className="learn-progress-container">
        <input
          type="range"
          className="learn-progress-slider"
          min={0}
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={handleProgressChange}
          aria-label="Step progress"
        />
        <span className="learn-step-counter">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      <div className="learn-speed-control">
        <button
          className="learn-speed-btn"
          onClick={cycleSpeed}
          title="Change speed"
          aria-label={`Speed: ${speed}x`}
        >
          {speed}x
        </button>
      </div>
    </div>
  )
}

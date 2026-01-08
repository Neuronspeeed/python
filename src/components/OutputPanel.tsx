/**
 * OutputPanel Component
 * Displays Python execution results with error formatting
 */

import { useState } from 'react';
import type { ExecutionResult } from '../contexts/PyodideContext';

interface OutputPanelProps {
  result: ExecutionResult | null;
  isExecuting: boolean;
}

export function OutputPanel({ result, isExecuting }: OutputPanelProps) {
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);

  // Auto-expand when result exists (derived from prop)
  const shouldBeExpanded = isManuallyExpanded || !!result;

  if (!result && !isExecuting) {
    return null;
  }

  const hasOutput = result?.output && result.output.trim().length > 0;
  const hasError = result?.error && result.error.trim().length > 0;

  return (
    <div className={`output-panel ${shouldBeExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Header */}
      <div className="output-header" onClick={() => setIsManuallyExpanded(!shouldBeExpanded)}>
        <div className="output-header-left">
          <svg
            className={`chevron-icon ${shouldBeExpanded ? 'rotated' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 4.5L6 7.5L9 4.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="output-label">
            {isExecuting ? 'Executing...' : hasError ? 'Error' : 'Output'}
          </span>
        </div>

        {result && result.executionTime !== undefined && (
          <span className="execution-time">
            {result.executionTime.toFixed(0)}ms
          </span>
        )}
      </div>

      {/* Content */}
      {shouldBeExpanded && (
        <div className="output-content">
          {isExecuting && (
            <div className="output-loading">
              <div className="loading-spinner" />
              <span>Running Python code...</span>
            </div>
          )}

          {!isExecuting && result && (
            <>
              {/* Standard output */}
              {hasOutput && (
                <div className="output-stdout">
                  {result.output.split('\n').map((line, i) => (
                    <div key={i} className="output-line">
                      <span className="output-prefix">→</span>
                      <span>{line || '\u00A0'}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Error output */}
              {hasError && (
                <div className="output-stderr">
                  <div className="error-icon-wrapper">
                    <svg
                      className="error-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M8 4V8.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="8" cy="11" r="0.75" fill="currentColor" />
                    </svg>
                  </div>
                  <pre className="error-text">{result.error}</pre>
                </div>
              )}

              {/* Success indicator */}
              {!hasError && hasOutput && (
                <div className="output-success">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Executed successfully</span>
                </div>
              )}

              {/* Empty output message */}
              {!hasOutput && !hasError && (
                <div className="output-empty">
                  <span>No output</span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

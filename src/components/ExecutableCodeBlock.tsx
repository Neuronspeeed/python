/**
 * ExecutableCodeBlock Component
 * Interactive code block with Python execution
 */

import { useState, useCallback } from 'react';
import { CodeEditor } from './CodeEditor';
import { OutputPanel } from './OutputPanel';
import { usePyodide } from '../hooks/usePyodide';
import type { ExecutionResult } from '../contexts/PyodideContext';

interface ExecutableCodeBlockProps {
  code: string;
  label?: string;
}

export function ExecutableCodeBlock({ code: initialCode, label = 'EXAMPLE' }: ExecutableCodeBlockProps) {
  const [currentCode, setCurrentCode] = useState(initialCode);
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { execute, isInitializing, supportsWasm } = usePyodide();

  /**
   * Handle Run button click
   */
  const handleRun = useCallback(async () => {
    setIsExecuting(true);
    setResult(null);

    try {
      const executionResult = await execute(currentCode);
      setResult(executionResult);
    } catch (error) {
      setResult({
        output: '',
        error: error instanceof Error ? error.message : 'Unknown error',
        executionTime: 0,
      });
    } finally {
      setIsExecuting(false);
    }
  }, [currentCode, execute]);

  /**
   * Handle Reset button click
   */
  const handleReset = useCallback(() => {
    setCurrentCode(initialCode);
    setResult(null);
  }, [initialCode]);

  /**
   * Handle Copy button click
   */
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  }, [currentCode]);

  /**
   * Check if code has changed from original
   */
  const hasChanged = currentCode !== initialCode;

  if (!supportsWasm) {
    // Fallback to static code block
    return (
      <div className="code-block">
        <div className="code-header">
          <span className="code-label">{label}</span>
          <button className="copy-btn" onClick={handleCopy} title="Copy code">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect
                  x="4.66667"
                  y="4.66667"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M2.33333 9.33333V3.5C2.33333 2.94772 2.78105 2.5 3.33333 2.5H9.16667"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="code-content">
          <pre><code>{initialCode}</code></pre>
        </div>
        <div className="wasm-warning">
          Interactive mode unavailable - WebAssembly not supported
        </div>
      </div>
    );
  }

  return (
    <div className="executable-code-block">
      {/* Header */}
      <div className="code-header">
        <span className="code-label">{label}</span>
        <div className="code-actions">
          {hasChanged && (
            <button
              className="action-btn reset-btn"
              onClick={handleReset}
              title="Reset to original"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1.75 7C1.75 4.1005 4.1005 1.75 7 1.75C9.8995 1.75 12.25 4.1005 12.25 7C12.25 9.8995 9.8995 12.25 7 12.25C5.32893 12.25 3.84164 11.4476 2.91667 10.2083"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
                <path
                  d="M1.75 10.2083V7H5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reset
            </button>
          )}
          <button
            className="action-btn copy-btn"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M11.6667 3.5L5.25 9.91667L2.33333 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect
                    x="4.66667"
                    y="4.66667"
                    width="7"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M2.33333 9.33333V3.5C2.33333 2.94772 2.78105 2.5 3.33333 2.5H9.16667"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Editor */}
      <CodeEditor
        value={currentCode}
        onChange={setCurrentCode}
        readOnly={isExecuting}
      />

      {/* Control Bar */}
      <div className="control-bar">
        <button
          className="run-btn"
          onClick={handleRun}
          disabled={isExecuting || isInitializing}
        >
          {isInitializing ? (
            <>
              <div className="btn-spinner" />
              Loading Python...
            </>
          ) : isExecuting ? (
            <>
              <div className="btn-spinner" />
              Running...
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.5 2.33333L10.5 7L3.5 11.6667V2.33333Z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Run
            </>
          )}
        </button>

        {result && !isExecuting && (
          <button
            className="clear-btn"
            onClick={() => setResult(null)}
            title="Clear output"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Output Panel */}
      <OutputPanel result={result} isExecuting={isExecuting} />
    </div>
  );
}

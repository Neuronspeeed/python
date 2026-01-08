/**
 * Pyodide Web Worker
 * Runs Python code in a separate thread with timeout support
 */

// Worker context type
declare const self: DedicatedWorkerGlobalScope;

// Pyodide type (simplified)
interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  setInterruptBuffer: (buffer: Uint8Array) => void;
}

let pyodide: PyodideInterface | null = null;
let interruptBuffer: Uint8Array | null = null;

interface ExecutionMessage {
  id: number;
  type: 'execute' | 'init';
  code?: string;
  interruptBuffer?: SharedArrayBuffer;
}

interface ExecutionResult {
  id: number;
  output?: string;
  error?: string;
  executionTime?: number;
}

/**
 * Initialize Pyodide in the worker
 */
async function initializePyodide(buffer?: SharedArrayBuffer): Promise<void> {
  if (pyodide) return; // Already initialized

  try {
    // Import Pyodide
    importScripts('https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js');

    // Load Pyodide
    const loadPyodide = (self as typeof self & { loadPyodide: (config: { indexURL: string }) => Promise<PyodideInterface> }).loadPyodide;
    pyodide = await loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/',
    });

    // Set up interrupt buffer if provided
    if (buffer) {
      interruptBuffer = new Uint8Array(buffer);
      pyodide.setInterruptBuffer(interruptBuffer);
    }

    // Set up stdout/stderr capture
    pyodide.runPython(`
import sys
from io import StringIO

class OutputCapture:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()

    def get_output(self):
        return self.stdout.getvalue(), self.stderr.getvalue()

    def clear(self):
        self.stdout = StringIO()
        self.stderr = StringIO()

_output_capture = OutputCapture()
sys.stdout = _output_capture.stdout
sys.stderr = _output_capture.stderr
`);
  } catch (error) {
    throw new Error(`Pyodide initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Execute Python code with output capture
 */
async function executePythonCode(code: string): Promise<{ output: string; error: string | null; executionTime: number }> {
  if (!pyodide) {
    throw new Error('Pyodide not initialized');
  }

  const startTime = performance.now();

  try {
    // Clear previous output
    await pyodide.runPythonAsync('_output_capture.clear()');

    // Execute user code
    await pyodide.runPythonAsync(code);

    // Get captured output
    const [stdout, stderr] = (await pyodide.runPythonAsync('_output_capture.get_output()')) as [string, string];

    const executionTime = performance.now() - startTime;

    return {
      output: stdout || '',
      error: stderr || null,
      executionTime,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;

    // Check if it was a keyboard interrupt (timeout)
    if (error instanceof Error && error.message.includes('KeyboardInterrupt')) {
      return {
        output: '',
        error: 'Execution timed out (5 seconds)',
        executionTime,
      };
    }

    // Return Python error
    return {
      output: '',
      error: error instanceof Error ? error.message : String(error),
      executionTime,
    };
  }
}

/**
 * Handle messages from main thread
 */
self.addEventListener('message', async (event: MessageEvent<ExecutionMessage>) => {
  const { id, type, code, interruptBuffer: buffer } = event.data;

  try {
    if (type === 'init') {
      // Initialize Pyodide
      await initializePyodide(buffer);

      self.postMessage({
        id,
        type: 'init-complete',
      } as ExecutionResult);
    } else if (type === 'execute' && code) {
      // Execute Python code
      const startTime = performance.now();
      const { output, error } = await executePythonCode(code);
      const executionTime = performance.now() - startTime;

      self.postMessage({
        id,
        output,
        error,
        executionTime,
      } as ExecutionResult);
    }
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : 'Unknown error',
    } as ExecutionResult);
  }
});

// Export empty object to make this a module
export {};

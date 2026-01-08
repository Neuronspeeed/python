/**
 * Pyodide Context
 * Manages Pyodide Web Worker lifecycle and provides execution API
 */

/* eslint-disable react-refresh/only-export-components */

import { createContext, useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supportsWebAssembly, supportsSharedArrayBuffer } from '../utils/pyodideLoader';

export interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
}

interface PyodideContextValue {
  isInitialized: boolean;
  isInitializing: boolean;
  error: string | null;
  execute: (code: string, timeout?: number) => Promise<ExecutionResult>;
  supportsWasm: boolean;
}

export const PyodideContext = createContext<PyodideContextValue | null>(null);

interface PyodideProviderProps {
  children: ReactNode;
}

export function PyodideProvider({ children }: PyodideProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use refs to avoid closure capture issues
  const workerRef = useRef<Worker | null>(null);
  const messageIdRef = useRef(0);
  const pendingRequestsRef = useRef<Map<number, {
    resolve: (result: ExecutionResult) => void;
    reject: (error: Error) => void;
    timeoutId?: ReturnType<typeof setTimeout>;
  }>>(new Map());
  const interruptBufferRef = useRef<Uint8Array | null>(null);

  // Check WASM support
  const supportsWasm = supportsWebAssembly();

  /**
   * Initialize Pyodide worker
   */
  const initializeWorker = useCallback(async () => {
    if (workerRef.current || isInitializing || isInitialized) return;
    if (!supportsWasm) {
      setError('WebAssembly is not supported in this browser');
      return;
    }

    setIsInitializing(true);
    setError(null);

    try {
      // Create worker
      const worker = new Worker(
        new URL('../workers/pyodide.worker.ts', import.meta.url),
        { type: 'module' }
      );

      workerRef.current = worker;

      // Set up interrupt buffer if supported
      let interruptBuffer: Uint8Array | null = null;
      if (supportsSharedArrayBuffer()) {
        const sharedBuffer = new SharedArrayBuffer(1);
        interruptBuffer = new Uint8Array(sharedBuffer);
        interruptBufferRef.current = interruptBuffer;
      }

      // Set up message handler
      worker.addEventListener('message', (event) => {
        const { id, output, error: execError, executionTime, type } = event.data;

        if (type === 'init-complete') {
          setIsInitialized(true);
          setIsInitializing(false);
          return;
        }

        const pending = pendingRequestsRef.current.get(id);
        if (pending) {
          // Clear timeout
          if (pending.timeoutId) {
            clearTimeout(pending.timeoutId);
          }

          // Resolve or reject
          if (execError) {
            pending.resolve({
              output: output || '',
              error: execError,
              executionTime: executionTime || 0,
            });
          } else {
            pending.resolve({
              output: output || '',
              error: null,
              executionTime: executionTime || 0,
            });
          }

          pendingRequestsRef.current.delete(id);
        }
      });

      // Set up error handler
      worker.addEventListener('error', (event) => {
        console.error('Worker error:', event);
        setError(`Worker error: ${event.message}`);
        setIsInitializing(false);
      });

      // Initialize Pyodide in worker
      const initId = messageIdRef.current++;
      worker.postMessage({
        id: initId,
        type: 'init',
        interruptBuffer: interruptBuffer?.buffer,
      });

    } catch (err) {
      console.error('Failed to initialize Pyodide:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize Pyodide');
      setIsInitializing(false);
    }
  }, [isInitializing, isInitialized, supportsWasm]);

  /**
   * Execute Python code
   */
  const execute = useCallback(async (code: string, timeout: number = 5000): Promise<ExecutionResult> => {
    // Initialize on first execution
    if (!isInitialized && !isInitializing) {
      await initializeWorker();
    }

    // Wait for initialization to complete
    while (isInitializing) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    if (!workerRef.current) {
      throw new Error('Worker not initialized');
    }

    return new Promise((resolve, reject) => {
      const id = messageIdRef.current++;
      const worker = workerRef.current!;

      // Set up timeout
      const timeoutId = setTimeout(() => {
        // Signal interrupt if supported
        if (interruptBufferRef.current) {
          Atomics.store(interruptBufferRef.current, 0, 2);
        }

        // Fallback: reject after additional grace period
        setTimeout(() => {
          const pending = pendingRequestsRef.current.get(id);
          if (pending) {
            pending.resolve({
              output: '',
              error: 'Execution timed out',
              executionTime: timeout,
            });
            pendingRequestsRef.current.delete(id);
          }
        }, 500);
      }, timeout);

      // Store pending request
      pendingRequestsRef.current.set(id, {
        resolve,
        reject,
        timeoutId,
      });

      // Send execution request to worker
      worker.postMessage({
        id,
        type: 'execute',
        code,
      });
    });
  }, [isInitialized, isInitializing, initializeWorker]);

  // Cleanup on unmount
  useEffect(() => {
    const pendingRequests = pendingRequestsRef.current;

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }

      // Clear all pending requests
      pendingRequests.forEach(({ timeoutId, reject }) => {
        if (timeoutId) clearTimeout(timeoutId);
        reject(new Error('Worker terminated'));
      });
      pendingRequests.clear();
    };
  }, []);

  const value: PyodideContextValue = {
    isInitialized,
    isInitializing,
    error,
    execute,
    supportsWasm,
  };

  return (
    <PyodideContext.Provider value={value}>
      {children}
    </PyodideContext.Provider>
  );
}

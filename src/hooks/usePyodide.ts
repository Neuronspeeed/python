/**
 * usePyodide Hook
 * Provides access to Pyodide context
 */

import { useContext } from 'react';
import { PyodideContext } from '../contexts/PyodideContext';

export function usePyodide() {
  const context = useContext(PyodideContext);

  if (!context) {
    throw new Error('usePyodide must be used within a PyodideProvider');
  }

  return context;
}

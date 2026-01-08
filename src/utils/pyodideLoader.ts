/**
 * Pyodide Loader Utilities
 * Detects browser capabilities for Pyodide execution
 */

/**
 * Check if the browser supports WebAssembly
 */
export function supportsWebAssembly(): boolean {
  try {
    if (typeof WebAssembly === 'object' && typeof WebAssembly.instantiate === 'function') {
      // Test with a minimal valid WASM module
      const module = new WebAssembly.Module(
        Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00)
      );
      if (module instanceof WebAssembly.Module) {
        return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      }
    }
  } catch {
    // Browser doesn't support WebAssembly
  }
  return false;
}

/**
 * Check if the browser supports SharedArrayBuffer
 * Required for interrupt support in Pyodide
 */
export function supportsSharedArrayBuffer(): boolean {
  try {
    return typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined';
  } catch {
    return false;
  }
}

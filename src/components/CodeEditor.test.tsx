/**
 * Temporary test file to debug CodeEditor
 */

interface CodeEditorTestProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
}

// Simple test component without react-simple-code-editor
export function CodeEditorTest({ value, onChange, readOnly = false, minHeight = '120px' }: CodeEditorTestProps) {
  return (
    <div className="code-editor-container" style={{ border: '1px solid red', padding: '10px', minHeight }}>
      <div>Test: CodeEditor Loading</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        readOnly={readOnly}
        style={{ width: '100%', height: '100px', fontFamily: 'monospace' }}
      />
      <div>Current value length: {value.length}</div>
    </div>
  );
}

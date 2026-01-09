/**
 * CodeEditor Component
 * Enhanced code editor with line numbers and syntax highlighting
 */

import { useCallback, useMemo } from 'react';
import * as SimpleCodeEditor from 'react-simple-code-editor';
import { tokenizePython } from '../utils/tokenizePython';

// Handle CJS default export in ESM context
const Editor = (SimpleCodeEditor as any).default || SimpleCodeEditor;

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
}

export function CodeEditor({ value, onChange, readOnly = false, minHeight = '120px' }: CodeEditorProps) {
  /**
   * Highlight code using custom Python tokenizer
   */
  const highlight = useCallback((code: string) => {
    const tokens = tokenizePython(code);
    return tokens
      .map(token => `<span class="${token.type}">${escapeHtml(token.value)}</span>`)
      .join('');
  }, []);

  /**
   * Add line numbers to code
   */
  const lineNumbers = useMemo(() => {
    const lines = value.split('\n');
    return lines.map((_, i) => i + 1).join('\n');
  }, [value]);

  /**
   * Handle keyboard shortcuts
   */
  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>) => {
    // Tab key: insert 4 spaces
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.currentTarget as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = value.substring(0, start) + '    ' + value.substring(end);
      onChange(newValue);

      // Set cursor position after inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  }, [value, onChange]);

  return (
    <div className="code-editor-container">
      {/* Line numbers */}
      <div className="line-numbers" aria-hidden="true">
        {lineNumbers}
      </div>

      {/* Code editor */}
      <div className="code-editor-wrapper">
        <Editor
          value={value}
          onValueChange={onChange}
          highlight={highlight}
          padding={0}
          disabled={readOnly}
          textareaClassName="code-editor-textarea"
          preClassName="code-editor-pre"
          onKeyDown={handleKeyDown}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            lineHeight: '1.6',
            minHeight,
          }}
        />
      </div>
    </div>
  );
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

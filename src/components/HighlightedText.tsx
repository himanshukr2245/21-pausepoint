import type { ReactNode } from 'react';
import type { Highlight } from '../engine';

interface HighlightedTextProps {
  text: string;
  highlights: Highlight[];
  onSelectTactic?: (tacticId: string) => void;
}

export const HighlightedText = ({
  text,
  highlights,
  onSelectTactic,
}: HighlightedTextProps) => {
  if (!text) return null;

  if (highlights.length === 0) {
    return (
      <div
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '1rem',
          lineHeight: 1.7,
          color: 'var(--color-fg)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        {text}
      </div>
    );
  }

  const nodes: ReactNode[] = [];
  let currentIndex = 0;

  for (let i = 0; i < highlights.length; i++) {
    const h = highlights[i];

    // Text prior to highlight
    if (h.start > currentIndex) {
      nodes.push(
        <span key={`text-${currentIndex}`}>
          {text.slice(currentIndex, h.start)}
        </span>
      );
    }

    // Highlighted phrase
    nodes.push(
      <mark
        key={`h-${h.start}-${h.end}`}
        className={`tactic-highlight t-${h.tactic}`}
        title={`${h.label}: Click to inspect tactic`}
        onClick={() => onSelectTactic?.(h.tactic)}
        style={{ cursor: 'pointer' }}
      >
        {text.slice(h.start, h.end)}
      </mark>
    );

    currentIndex = h.end;
  }

  // Trailing text
  if (currentIndex < text.length) {
    nodes.push(
      <span key={`text-end`}>
        {text.slice(currentIndex)}
      </span>
    );
  }

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: '1.02rem',
        lineHeight: 1.8,
        color: 'var(--color-fg)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border)',
      }}
    >
      {nodes}
    </div>
  );
};

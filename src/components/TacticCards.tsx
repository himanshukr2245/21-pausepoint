import { Brain, Sparkles } from 'lucide-react';
import type { Verdict } from '../engine';
import { type Language, TRANSLATIONS, HINDI_TACTIC_LABELS } from '../lib/i18n';

interface TacticCardsProps {
  tactics: Verdict['tactics'];
  selectedTactic?: string;
  onSelectTactic?: (tacticId: string) => void;
  lang?: Language;
}

export const TacticCards = ({
  tactics,
  selectedTactic,
  onSelectTactic,
  lang = 'en',
}: TacticCardsProps) => {
  if (tactics.length === 0) return null;
  const tDict = TRANSLATIONS[lang];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={18} style={{ color: 'var(--color-brand)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {tDict.psychologicalLevers} ({tactics.length})
          </h3>
        </div>
        {tactics.length >= 3 && (
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--color-danger-bg)',
              color: 'var(--color-danger-fg)',
              border: '1px solid var(--color-danger-border)',
            }}
          >
            {lang === 'hi' ? 'गंभीर मानसिक दबाव पहचाना गया (+10 पेनल्टी)' : 'Stacked Pressure Detected (+10 Penalty)'}
          </span>
        )}
      </div>

      <div
        className="tactic-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
          gap: '0.75rem',
        }}
      >
        {tactics.map((t) => {
          const isSelected = selectedTactic === t.id;
          const hiInfo = lang === 'hi' ? HINDI_TACTIC_LABELS[t.id] : null;
          const displayLabel = hiInfo ? hiInfo.label : t.label;
          const displayLever = hiInfo ? hiInfo.lever : t.lever;

          return (
            <div
              key={t.id}
              onClick={() => onSelectTactic?.(t.id)}
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: isSelected ? '2px solid var(--color-brand)' : '1px solid var(--color-border)',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className={`tactic-highlight t-${t.id}`} style={{ fontSize: '0.82rem', padding: '0.15rem 0.5rem' }}>
                  {displayLabel}
                </span>
                <Sparkles size={14} style={{ opacity: 0.5 }} />
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-fg)', fontWeight: 500 }}>
                {displayLever}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)', fontWeight: 600 }}>
                  {tDict.triggersLabel}
                </span>
                {t.examples.map((ex, idx) => (
                  <code
                    key={idx}
                    style={{
                      fontSize: '0.76rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--color-surface-2)',
                      padding: '0.1rem 0.4rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-fg)',
                    }}
                  >
                    "{ex}"
                  </code>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

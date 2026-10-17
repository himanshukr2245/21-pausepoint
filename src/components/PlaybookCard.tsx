import { Target, Zap, ShieldAlert } from 'lucide-react';
import type { Verdict } from '../engine';
import { type Language, TRANSLATIONS, HINDI_PLAYBOOK_TRUTHS } from '../lib/i18n';

interface PlaybookCardProps {
  playbooks: Verdict['playbooks'];
  lang?: Language;
}

export const PlaybookCard = ({ playbooks, lang = 'en' }: PlaybookCardProps) => {
  if (playbooks.length === 0) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Target size={18} style={{ color: 'var(--color-brand)' }} />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {t.matchedPlaybooks} ({playbooks.length})
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {playbooks.map((pb) => {
          const hiData = lang === 'hi' ? HINDI_PLAYBOOK_TRUTHS[pb.id] : null;
          const displayName = hiData ? hiData.name : pb.name;
          const displayTruth = hiData ? hiData.truth : pb.truth;

          return (
            <div
              key={pb.id}
              style={{
                padding: '1.25rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <ShieldAlert size={20} style={{ color: 'var(--color-danger)' }} />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-fg)' }}>
                    {displayName}
                  </h4>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-pill)',
                    background: 'var(--color-danger-bg)',
                    color: 'var(--color-danger-fg)',
                    border: '1px solid var(--color-danger-border)',
                  }}
                >
                  {lang === 'hi' ? 'पहचाना गया फ्रॉड' : 'Known Fraud Signature'}
                </span>
              </div>

              {/* The One Truth That Breaks It */}
              <div
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(2, 132, 199, 0.08)',
                  borderLeft: '4px solid var(--color-brand)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                }}
              >
                <Zap size={18} style={{ color: 'var(--color-brand)', flexShrink: 0, marginTop: 2 }} />
                <div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--color-brand)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: 2,
                    }}
                  >
                    {t.singleTruthTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 700,
                      color: 'var(--color-fg)',
                      lineHeight: 1.45,
                    }}
                  >
                    {displayTruth}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

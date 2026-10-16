import { Target, Zap, ShieldAlert } from 'lucide-react';
import type { Verdict } from '../engine';

interface PlaybookCardProps {
  playbooks: Verdict['playbooks'];
}

export const PlaybookCard = ({ playbooks }: PlaybookCardProps) => {
  if (playbooks.length === 0) return null;

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
          Matched Known Indian Scam Playbook ({playbooks.length})
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {playbooks.map((pb) => (
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <ShieldAlert size={20} style={{ color: 'var(--color-danger)' }} />
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-fg)' }}>
                  {pb.name}
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
                Known Fraud Signature
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
                  The Single Fact That Breaks This Scam:
                </div>
                <div
                  style={{
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    color: 'var(--color-fg)',
                    lineHeight: 1.45,
                  }}
                >
                  {pb.truth}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

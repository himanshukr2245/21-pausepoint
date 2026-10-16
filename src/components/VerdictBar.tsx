import { AlertOctagon, AlertTriangle, ShieldCheck, Info } from 'lucide-react';
import type { Verdict } from '../engine';

interface VerdictBarProps {
  verdict: Verdict;
}

export const VerdictBar = ({ verdict }: VerdictBarProps) => {
  const { score, level, headline } = verdict;

  const levelConfig = {
    danger: {
      badge: 'CRITICAL RISK',
      title: 'STOP — HIGH THREAT DETECTED',
      icon: AlertOctagon,
      barColor: 'var(--color-danger)',
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger-border)',
      fg: 'var(--color-danger-fg)',
      description: 'Multiple active social engineering and financial manipulation triggers identified.',
    },
    suspicious: {
      badge: 'CAUTION',
      title: 'PAUSE — VERIFY BEFORE ACTING',
      icon: AlertTriangle,
      barColor: 'var(--color-warning)',
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)',
      fg: 'var(--color-warning-fg)',
      description: 'Suspicious psychological triggers or unverified channels detected.',
    },
    low: {
      badge: 'MINIMAL RISK',
      title: 'NO STRONG RED FLAGS DETECTED',
      icon: ShieldCheck,
      barColor: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
      fg: 'var(--color-success-fg)',
      description: 'Standard informational communication pattern without pressure triggers.',
    },
  }[level];

  const Icon = levelConfig.icon;

  return (
    <div
      style={{
        background: levelConfig.bg,
        borderColor: levelConfig.border,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)',
              color: levelConfig.barColor,
            }}
          >
            <Icon size={26} strokeWidth={2.3} />
          </div>
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: levelConfig.fg,
                textTransform: 'uppercase',
              }}
            >
              {levelConfig.badge}
            </div>
            <h2
              style={{
                fontSize: '1.15rem',
                fontWeight: 700,
                color: 'var(--color-fg)',
                lineHeight: 1.25,
              }}
            >
              {headline}
            </h2>
          </div>
        </div>

        {/* Threat Score Gauge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'var(--color-surface)',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border)',
          }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--color-fg-muted)', fontWeight: 600 }}>
            THREAT SCORE
          </span>
          <span
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
              color: levelConfig.barColor,
              lineHeight: 1,
            }}
          >
            {score}
            <span style={{ fontSize: '0.85rem', color: 'var(--color-fg-muted)', fontWeight: 500 }}>
              /100
            </span>
          </span>
        </div>
      </div>

      {/* Score Progress Bar */}
      <div>
        <div
          style={{
            height: 8,
            width: '100%',
            background: 'rgba(0,0,0,0.08)',
            borderRadius: 'var(--radius-pill)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${score}%`,
              background: levelConfig.barColor,
              borderRadius: 'var(--radius-pill)',
              transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Honesty Disclosure Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.8rem',
          color: 'var(--color-fg-muted)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          paddingTop: '0.5rem',
        }}
      >
        <Info size={14} style={{ flexShrink: 0 }} />
        <span>
          <strong>Honesty Rule:</strong> PausePoint never labels anything "safe". Even clean messages must be verified if they request credentials or financial transfers.
        </span>
      </div>
    </div>
  );
};

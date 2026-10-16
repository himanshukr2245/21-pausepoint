import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { playTick } from '../lib/audio';

interface PauseGateProps {
  isDanger: boolean;
}

export const PauseGate = ({ isDanger }: PauseGateProps) => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);

  useEffect(() => {
    if (!isDanger) return;
    setSecondsLeft(10);
    setIsUnlocked(false);
    setAcknowledged(false);

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsUnlocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDanger]);

  if (!isDanger) return null;

  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div
            className={!isUnlocked ? 'animate-breathe' : ''}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: isUnlocked ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
              color: isUnlocked ? 'var(--color-success-fg)' : 'var(--color-danger)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isUnlocked ? <Unlock size={18} /> : <Lock size={18} />}
          </div>
          <div>
            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-fg)' }}>
              The 10-Second Cognitive Firewall Gate
            </h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-fg-muted)' }}>
              {isUnlocked
                ? 'Countdown complete. You may now evaluate rationally.'
                : `Forced pause in progress — button locked for ${secondsLeft}s`}
            </p>
          </div>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.2rem',
            fontWeight: 800,
            padding: '0.2rem 0.8rem',
            borderRadius: 'var(--radius-pill)',
            background: isUnlocked ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
            color: isUnlocked ? 'var(--color-success-fg)' : 'var(--color-danger)',
            border: `1px solid ${isUnlocked ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
          }}
        >
          {isUnlocked ? 'UNLOCKED' : `00:${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`}
        </div>
      </div>

      <div
        style={{
          fontSize: '0.84rem',
          color: 'var(--color-fg-muted)',
          lineHeight: 1.5,
          background: 'var(--color-surface-2)',
          padding: '0.75rem 1rem',
          borderRadius: 'var(--radius-sm)',
        }}
      >
        <strong>Why this lock exists:</strong> Attackers use acute urgency and fear to trigger your brain's amygdala and suppress logical reasoning. This 10-second forced pause breaks the emotional hijack so your rational judgment takes over.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
        <button
          disabled={!isUnlocked}
          onClick={() => {
            playTick();
            setAcknowledged(true);
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            border: 'none',
            background: isUnlocked ? 'var(--color-surface-3)' : 'var(--color-surface-2)',
            color: isUnlocked ? 'var(--color-fg)' : 'var(--color-fg-muted)',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: isUnlocked ? 'pointer' : 'not-allowed',
            opacity: isUnlocked ? 1 : 0.6,
            transition: 'all 0.15s ease',
          }}
        >
          {acknowledged ? 'Risk Acknowledged' : 'I Understand The Risk (Continue Anyway)'}
        </button>
      </div>
    </div>
  );
};

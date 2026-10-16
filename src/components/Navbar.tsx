import { Moon, Sun, Volume2, VolumeX, BookOpen, WifiOff } from 'lucide-react';
import { playTick } from '../lib/audio';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
  onOpenJudgeGuide: () => void;
}

export const Navbar = ({
  theme,
  onToggleTheme,
  audioMuted,
  onToggleAudio,
  onOpenJudgeGuide,
}: NavbarProps) => {
  return (
    <header
      style={{
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        {/* Brand & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              fontWeight: 800,
              boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)',
            }}
          >
            ⏸
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h1 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-fg)' }}>
                PausePoint
              </h1>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '0.15rem 0.45rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: 'var(--color-brand)',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                }}
              >
                THE MANIPULATION DECODER
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--color-fg-muted)', fontWeight: 500 }}>
              Pause. Verify. Then act. — <span style={{ opacity: 0.85 }}>Human Firewall Hackathon</span>
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Offline & Privacy Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-fg)',
            }}
            title="Runs 100% locally in your browser. OTPs and messages never touch a network server."
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
              }}
            />
            <WifiOff size={13} style={{ color: 'var(--color-fg-muted)' }} />
            <span>100% Offline & Private</span>
          </div>

          {/* Judge Demo Guide Popover Trigger */}
          <button
            onClick={() => {
              playTick();
              onOpenJudgeGuide();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(2, 132, 199, 0.08)',
              color: 'var(--color-brand)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              cursor: 'pointer',
            }}
          >
            <BookOpen size={14} />
            Judge Demo Kit
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              playTick();
              onToggleAudio();
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-fg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={audioMuted ? 'Unmute procedural haptic audio' : 'Mute procedural audio'}
          >
            {audioMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              playTick();
              onToggleTheme();
            }}
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-fg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to OLED Dark Theme'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
};

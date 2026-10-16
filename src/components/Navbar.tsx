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
        className="navbar-container"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {/* Brand & Tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              fontWeight: 800,
              boxShadow: '0 2px 10px rgba(2, 132, 199, 0.3)',
              flexShrink: 0,
            }}
          >
            ⏸
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-fg)' }}>
                PausePoint
              </h1>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '0.12rem 0.4rem',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(2, 132, 199, 0.1)',
                  color: 'var(--color-brand)',
                  border: '1px solid rgba(2, 132, 199, 0.25)',
                }}
              >
                DECODER
              </span>
            </div>
            <p className="navbar-tagline" style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', fontWeight: 500 }}>
              Pause. Verify. Then act. — <span style={{ opacity: 0.85 }}>Human Firewall Hackathon</span>
            </p>
          </div>
        </div>

        {/* Right Action Tools */}
        <div className="navbar-tools" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* Offline & Privacy Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '0.35rem 0.65rem',
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
                flexShrink: 0,
              }}
            />
            <WifiOff size={13} style={{ color: 'var(--color-fg-muted)', flexShrink: 0 }} />
            <span className="navbar-privacy-label">Offline & Private</span>
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

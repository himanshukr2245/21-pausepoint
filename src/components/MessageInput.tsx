import { Clipboard, Trash2, Sparkles } from 'lucide-react';
import { SAMPLE_MESSAGES, type SampleMessage } from '../samples';
import { playTick } from '../lib/audio';

interface MessageInputProps {
  text: string;
  onChange: (val: string) => void;
  onDecode: () => void;
  onSelectSample: (sample: SampleMessage) => void;
}

export const MessageInput = ({
  text,
  onChange,
  onDecode,
  onSelectSample,
}: MessageInputProps) => {
  const handlePaste = async () => {
    playTick();
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) onChange(clip);
    } catch {
      // Ignore clipboard permission refusal
    }
  };

  const handleClear = () => {
    playTick();
    onChange('');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* Sample message chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-fg-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            One-Tap Real Indian Scam Samples
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)' }}>
            Select to test live decoder
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.4rem',
            scrollbarWidth: 'none',
          }}
        >
          {SAMPLE_MESSAGES.map((sample) => {
            const isDanger = sample.expectedLevel === 'danger';
            const isSuspicious = sample.expectedLevel === 'suspicious';

            return (
              <button
                key={sample.id}
                onClick={() => {
                  playTick();
                  onSelectSample(sample);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.45rem 0.8rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-fg)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                }}
                title={sample.subtitle}
              >
                <span>{sample.title}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.1rem 0.4rem',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    background: isDanger
                      ? 'var(--color-danger-bg)'
                      : isSuspicious
                      ? 'var(--color-warning-bg)'
                      : 'var(--color-success-bg)',
                    color: isDanger
                      ? 'var(--color-danger-fg)'
                      : isSuspicious
                      ? 'var(--color-warning-fg)'
                      : 'var(--color-success-fg)',
                  }}
                >
                  {sample.expectedScore}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Input Textarea Container */}
      <div
        style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
          transition: 'border-color 0.15s ease',
        }}
      >
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste any SMS, WhatsApp message, Telegram job, bank alert or suspicious URL here..."
          rows={6}
          style={{
            width: '100%',
            padding: '1.25rem',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '0.98rem',
            fontFamily: 'var(--font-sans)',
            color: 'var(--color-fg)',
            lineHeight: 1.6,
            resize: 'vertical',
            minHeight: 140,
          }}
        />

        {/* Textarea Bottom Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1.25rem',
            background: 'var(--color-surface-2)',
            borderTop: '1px solid var(--color-border-subtle)',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', fontFamily: 'var(--font-mono)' }}>
              {text.length} chars
            </span>

            {text && (
              <button
                onClick={handleClear}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.75rem',
                  color: 'var(--color-fg-muted)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Trash2 size={13} />
                Clear
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <button
              onClick={handlePaste}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-fg)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <Clipboard size={14} />
              Paste
            </button>

            <button
              onClick={() => {
                playTick();
                onDecode();
              }}
              disabled={!text.trim()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: text.trim() ? 'var(--color-brand)' : 'var(--color-surface-3)',
                color: text.trim() ? 'var(--color-brand-fg)' : 'var(--color-fg-muted)',
                fontSize: '0.85rem',
                fontWeight: 700,
                border: 'none',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                boxShadow: text.trim() ? '0 2px 10px var(--color-cyan-glow)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Sparkles size={15} />
              Decode Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

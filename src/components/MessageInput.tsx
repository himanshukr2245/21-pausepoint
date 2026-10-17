import { useState } from 'react';
import { Clipboard, Trash2, Sparkles, MessageSquare, Image as ImageIcon, Mic, Globe2, ArrowRight } from 'lucide-react';
import { SAMPLE_MESSAGES, type SampleMessage } from '../samples';
import { playTick } from '../lib/audio';
import { type Language, TRANSLATIONS } from '../lib/i18n';
import { ImageOcrUploader } from './ImageOcrUploader';
import { VoiceTranscriber } from './VoiceTranscriber';

interface MessageInputProps {
  text: string;
  onChange: (val: string) => void;
  onDecode: (overrideText?: string) => void;
  onSelectSample: (sample: SampleMessage) => void;
  lang?: Language;
}

type InputTab = 'text' | 'image' | 'voice' | 'link';

export const MessageInput = ({
  text,
  onChange,
  onDecode,
  onSelectSample,
  lang = 'en',
}: MessageInputProps) => {
  const [activeTab, setActiveTab] = useState<InputTab>('text');
  const [linkInput, setLinkInput] = useState('');
  const t = TRANSLATIONS[lang];

  const handlePaste = async () => {
    playTick();
    try {
      const clip = await navigator.clipboard.readText();
      if (clip) {
        onChange(clip);
        onDecode(clip);
      }
    } catch {
      // Ignore clipboard permission refusal
    }
  };

  const handleClear = () => {
    playTick();
    onChange('');
    setLinkInput('');
  };

  const handleLinkInspect = (targetUrl: string) => {
    const formatted = `Please inspect this link: ${targetUrl.trim()}`;
    onChange(formatted);
    setActiveTab('text');
    onDecode(formatted);
  };

  const handleOcrExtracted = (extracted: string) => {
    onChange(extracted);
    setActiveTab('text');
    onDecode(extracted);
  };

  const handleVoiceTranscribed = (transcript: string) => {
    onChange(transcript);
    setActiveTab('text');
    onDecode(transcript);
  };

  const QUICK_SCAM_LINKS = [
    { label: 'fraud.com', url: 'https://fraud.com' },
    { label: 'SBI KYC Update', url: 'http://sbi-kyc-verify.online/login' },
    { label: 'TRAI SIM Suspend', url: 'https://trai-sim-verify.in/suspend' },
    { label: 'FedEx Customs Fine', url: 'http://fedex-customs-clearance.cc/pay' },
    { label: 'RTO Challan APK', url: 'https://echallan-parivahan.apk-download.ru' },
  ];

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
            {t.samplesHeading}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)' }}>
            {t.samplesSub}
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
                  setActiveTab('text');
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

      {/* Multi-Modal Input Mode Selector Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          background: 'var(--color-surface-2)',
          padding: '0.3rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          overflowX: 'auto',
        }}
      >
        <button
          onClick={() => {
            playTick();
            setActiveTab('text');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeTab === 'text' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'text' ? 'var(--color-fg)' : 'var(--color-fg-muted)',
            fontWeight: activeTab === 'text' ? 700 : 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'text' ? 'var(--shadow-sm)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <MessageSquare size={14} color={activeTab === 'text' ? 'var(--color-brand)' : 'inherit'} />
          <span>{t.tabs.text}</span>
        </button>

        <button
          onClick={() => {
            playTick();
            setActiveTab('image');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeTab === 'image' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'image' ? 'var(--color-fg)' : 'var(--color-fg-muted)',
            fontWeight: activeTab === 'image' ? 700 : 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'image' ? 'var(--shadow-sm)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <ImageIcon size={14} color={activeTab === 'image' ? 'var(--color-brand)' : 'inherit'} />
          <span>{t.tabs.image}</span>
        </button>

        <button
          onClick={() => {
            playTick();
            setActiveTab('voice');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeTab === 'voice' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'voice' ? 'var(--color-fg)' : 'var(--color-fg-muted)',
            fontWeight: activeTab === 'voice' ? 700 : 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'voice' ? 'var(--shadow-sm)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <Mic size={14} color={activeTab === 'voice' ? 'var(--color-brand)' : 'inherit'} />
          <span>{t.tabs.voice}</span>
        </button>

        <button
          onClick={() => {
            playTick();
            setActiveTab('link');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            background: activeTab === 'link' ? 'var(--color-surface)' : 'transparent',
            color: activeTab === 'link' ? 'var(--color-fg)' : 'var(--color-fg-muted)',
            fontWeight: activeTab === 'link' ? 700 : 500,
            fontSize: '0.8rem',
            cursor: 'pointer',
            boxShadow: activeTab === 'link' ? 'var(--shadow-sm)' : 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <Globe2 size={14} color={activeTab === 'link' ? 'var(--color-brand)' : 'inherit'} />
          <span>{t.tabs.link}</span>
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === 'image' && (
        <ImageOcrUploader onTextExtracted={handleOcrExtracted} lang={lang} />
      )}

      {activeTab === 'voice' && (
        <VoiceTranscriber onTranscript={handleVoiceTranscribed} lang={lang} />
      )}

      {activeTab === 'link' && (
        <div
          style={{
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-fg)', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Globe2 size={16} color="var(--color-brand)" />
              {lang === 'hi' ? 'संदिग्ध लिंक या डोमेन की जांच करें' : 'Inspect Suspicious Link or URL'}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
              {lang === 'hi'
                ? 'डोमेन की वैधता, धोखेबाज कीवर्ड, रैंडम एंट्रॉपी और आधिकारिक सर्वर की पहचान करें।'
                : 'Deep forensic inspection: checks keyword traps, domain entropy, official verified servers, and unverified TLDs.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              type="url"
              placeholder="https://fraud.com or https://sbi-kyc.online"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && linkInput.trim()) {
                  handleLinkInspect(linkInput);
                }
              }}
              style={{
                flex: 1,
                minWidth: 240,
                padding: '0.65rem 0.95rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-2)',
                color: 'var(--color-fg)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.88rem',
                outline: 'none',
              }}
            />
            <button
              onClick={() => linkInput.trim() && handleLinkInspect(linkInput)}
              disabled={!linkInput.trim()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                borderRadius: 'var(--radius-md)',
                background: linkInput.trim() ? 'var(--color-brand)' : 'var(--color-surface-3)',
                color: linkInput.trim() ? 'var(--color-brand-fg)' : 'var(--color-fg-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                border: 'none',
                cursor: linkInput.trim() ? 'pointer' : 'not-allowed',
              }}
            >
              <span>{lang === 'hi' ? 'जांचें' : 'Inspect Link'}</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Quick preset links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)', fontWeight: 600 }}>
              {lang === 'hi' ? 'त्वरित परीक्षण लिंक:' : 'Quick test threat domains:'}
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {QUICK_SCAM_LINKS.map((item) => (
                <button
                  key={item.url}
                  onClick={() => {
                    playTick();
                    setLinkInput(item.url);
                    handleLinkInspect(item.url);
                  }}
                  style={{
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.6rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-fg)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Standard Text Area (Always available or in text tab) */}
      {activeTab === 'text' && (
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
            placeholder={t.textareaPlaceholder}
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
            className="message-action-bar"
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
                {text.length} {t.charsLabel}
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
                  {t.clearBtn}
                </button>
              )}
            </div>

            <div className="message-action-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={handlePaste}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 0.85rem',
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
                {t.pasteBtn}
              </button>

              <button
                className="message-decode-btn"
                onClick={() => {
                  playTick();
                  onDecode();
                }}
                disabled={!text.trim()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.25rem',
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
                {t.decodeBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useState, useEffect } from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck, Info, Volume2, Square } from 'lucide-react';
import type { Verdict } from '../engine';
import { type Language, TRANSLATIONS } from '../lib/i18n';
import { speakVerdict, stopSpeaking } from '../lib/speech';
import { playTick } from '../lib/audio';

interface VerdictBarProps {
  verdict: Verdict;
  lang?: Language;
}

export const VerdictBar = ({ verdict, lang = 'en' }: VerdictBarProps) => {
  const { score, level, headline } = verdict;
  const [speaking, setSpeaking] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // If verdict changes, stop previous speech
    stopSpeaking();
    setSpeaking(false);
  }, [verdict]);

  const handleToggleSpeak = () => {
    playTick();
    if (speaking) {
      stopSpeaking();
      setSpeaking(false);
    } else {
      speakVerdict(verdict, lang, () => setSpeaking(false));
      setSpeaking(true);
    }
  };

  const levelConfig = {
    danger: {
      badge: lang === 'hi' ? 'अत्यंत खतरनाक' : 'CRITICAL RISK',
      title: lang === 'hi' ? 'रुकें — बड़ा खतरा पाया गया' : 'STOP — HIGH THREAT DETECTED',
      icon: AlertOctagon,
      barColor: 'var(--color-danger)',
      bg: 'var(--color-danger-bg)',
      border: 'var(--color-danger-border)',
      fg: 'var(--color-danger-fg)',
      description: lang === 'hi'
        ? 'कई सक्रिय मनोवैज्ञानिक दबाव और वित्तीय धोखे के संकेत पहचाने गए।'
        : 'Multiple active social engineering and financial manipulation triggers identified.',
    },
    suspicious: {
      badge: lang === 'hi' ? 'सतर्क रहें' : 'CAUTION',
      title: lang === 'hi' ? 'ठहरें — कदम उठाने से पहले जांचें' : 'PAUSE — VERIFY BEFORE ACTING',
      icon: AlertTriangle,
      barColor: 'var(--color-warning)',
      bg: 'var(--color-warning-bg)',
      border: 'var(--color-warning-border)',
      fg: 'var(--color-warning-fg)',
      description: lang === 'hi'
        ? 'संदिग्ध मनोवैज्ञानिक दबाव या अपुष्ट चैनल के संकेत।'
        : 'Suspicious psychological triggers or unverified channels detected.',
    },
    low: {
      badge: lang === 'hi' ? 'न्यूनतम जोखिम' : 'MINIMAL RISK',
      title: lang === 'hi' ? 'कोई बड़ा संदिग्ध संकेत नहीं मिला' : 'NO STRONG RED FLAGS DETECTED',
      icon: ShieldCheck,
      barColor: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      border: 'var(--color-success-border)',
      fg: 'var(--color-success-fg)',
      description: lang === 'hi'
        ? 'सामान्य सूचनात्मक संदेश का प्रारूप।'
        : 'Standard informational communication pattern without pressure triggers.',
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
        position: 'relative',
      }}
    >
      <div
        className="verdict-header"
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
              flexShrink: 0,
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

        {/* Action Controls & Threat Score Gauge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          {/* Audio Readout Assistant for Senior Citizens */}
          <button
            onClick={handleToggleSpeak}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-pill)',
              border: `1px solid ${speaking ? 'var(--color-brand)' : 'var(--color-border)'}`,
              background: speaking ? 'var(--color-brand)' : 'var(--color-surface)',
              color: speaking ? 'var(--color-brand-fg)' : 'var(--color-fg)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.15s ease',
            }}
            title={speaking ? t.stopSpeakingBtn : t.speakBtn}
          >
            {speaking ? (
              <>
                <Square size={14} fill="currentColor" />
                <span>{t.stopSpeakingBtn}</span>
              </>
            ) : (
              <>
                <Volume2 size={15} />
                <span>{t.speakBtn}</span>
              </>
            )}
          </button>

          <div
            className="verdict-score-badge"
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
              {t.threatScore}
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
        <span>{t.honestyRule}</span>
      </div>
    </div>
  );
};

import { useState, useEffect } from 'react';
import { decode, type Verdict } from './engine';
import { SAMPLE_MESSAGES, type SampleMessage } from './samples';
import { playTick, playDangerAlert, playCleanChime, isMuted, setMuted } from './lib/audio';
import { type Language, TRANSLATIONS } from './lib/i18n';

import { Navbar } from './components/Navbar';
import { MessageInput } from './components/MessageInput';
import { VerdictBar } from './components/VerdictBar';
import { HighlightedText } from './components/HighlightedText';
import { PlaybookCard } from './components/PlaybookCard';
import { TacticCards } from './components/TacticCards';
import { LinkXray } from './components/LinkXray';
import { VerifyLadder } from './components/VerifyLadder';
import { PauseGate } from './components/PauseGate';
import { JudgeCheatSheetModal } from './components/JudgeCheatSheetModal';
import { CognitiveImmunityDrillModal } from './components/CognitiveImmunityDrillModal';
import { Sparkles, History } from 'lucide-react';

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [audioMuted, setAudioMuted] = useState<boolean>(false);
  const [lang, setLang] = useState<Language>('en');
  const [inputText, setInputText] = useState<string>(SAMPLE_MESSAGES[0].text);
  const [verdict, setVerdict] = useState<Verdict>(() => decode(SAMPLE_MESSAGES[0].text));
  const [selectedTactic, setSelectedTactic] = useState<string | undefined>();
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState<boolean>(false);
  const [isDrillModalOpen, setIsDrillModalOpen] = useState<boolean>(false);
  const [history, setHistory] = useState<{ text: string; score: number; level: string; time: string }[]>([]);

  const t = TRANSLATIONS[lang];

  // Initialize theme and audio
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    setAudioMuted(isMuted());
  }, []);

  // Web Share Target & Deep Link Support
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const shared = params.get('text') || params.get('url') || params.get('title');
      if (shared && shared.trim()) {
        setInputText(shared);
        runDecode(shared);
      }
    }
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      return next;
    });
  };

  const handleToggleAudio = () => {
    const next = !audioMuted;
    setAudioMuted(next);
    setMuted(next);
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleTextChange = (newText: string) => {
    setInputText(newText);
    const res = decode(newText);
    setVerdict(res);
    setSelectedTactic(undefined);
  };

  const runDecode = (textToDecode: string) => {
    if (!textToDecode.trim()) return;
    const res = decode(textToDecode);
    setVerdict(res);
    setSelectedTactic(undefined);

    // Audio feedback
    if (res.level === 'danger') {
      playDangerAlert();
    } else if (res.level === 'low') {
      playCleanChime();
    } else {
      playTick();
    }

    // Add to lightweight session history
    setHistory((prev) => [
      {
        text: textToDecode.slice(0, 40) + (textToDecode.length > 40 ? '...' : ''),
        score: res.score,
        level: res.level,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
      ...prev.slice(0, 4),
    ]);
  };

  const handleSelectSample = (sample: SampleMessage) => {
    setInputText(sample.text);
    runDecode(sample.text);
  };

  const handleDecodeClick = (overrideText?: string) => {
    const target = typeof overrideText === 'string' ? overrideText : inputText;
    setInputText(target);
    runDecode(target);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
      }}
    >
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenJudgeGuide={() => setIsJudgeModalOpen(true)}
        onOpenDrill={() => setIsDrillModalOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      <main
        className="main-container"
        style={{
          flex: 1,
          maxWidth: 1320,
          width: '100%',
          margin: '0 auto',
          padding: '1.5rem 1.25rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {/* Top Hero Headline Banner */}
        <div
          className="hero-banner"
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 4 }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-brand)' }}>
                {lang === 'hi' ? 'सत्र 1: कॉग्निटिव फायरवॉल' : 'Session 1: Human Firewall'}
              </span>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)' }}>
                NEP Saarthi Initiative
              </span>
            </div>
            <h2 className="hero-headline" style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-fg)' }}>
              {lang === 'hi' 
                ? 'अनफ़िशेबल: हैकर्स के वार करने से पहले उनकी चाल को बेनकाब करें।' 
                : 'Unphishable: Exposing your exposure, before hackers do.'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-fg-muted)', marginTop: 2 }}>
              {lang === 'hi'
                ? 'कोई भी एसएमएस, व्हाट्सएप संदेश या लिंक डालें। 1 सेकंड में मनोवैज्ञानिक दबाव, धोखाधड़ी के पैटर्न और फर्जी लिंक की पहचान करें।'
                : 'Paste any SMS, WhatsApp alert, or link. In under a second, discover the exact psychological levers, known Indian scams, and broken links.'}
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '0.68rem', color: 'var(--color-fg-muted)', fontWeight: 600 }}>CYBERCRIME STAT</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-danger)' }}>85% Involve Human Error</strong>
            </div>

            <div
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ fontSize: '0.68rem', color: 'var(--color-fg-muted)', fontWeight: 600 }}>RESPONSE TIME</span>
              <strong style={{ fontSize: '0.85rem', color: 'var(--color-success)', fontFamily: 'var(--font-mono)' }}>&lt; 50ms Offline</strong>
            </div>
          </div>
        </div>

        {/* Main Two-Column Workbench */}
        <div
          className="responsive-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '1.5rem',
            alignItems: 'start',
          }}
        >
          {/* Left Column: Input & Samples */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <MessageInput
              text={inputText}
              onChange={handleTextChange}
              onDecode={handleDecodeClick}
              onSelectSample={handleSelectSample}
              lang={lang}
            />

            {/* Session History Quick Drawer */}
            {history.length > 0 && (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-fg-muted)' }}>
                  <History size={14} />
                  <span>{t.recentRunsTitle}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {history.map((h, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.8rem',
                        padding: '0.35rem 0.5rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-surface-2)',
                      }}
                    >
                      <span style={{ color: 'var(--color-fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65%' }}>
                        {h.text}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: h.score >= 60 ? 'var(--color-danger)' : h.score >= 30 ? 'var(--color-warning)' : 'var(--color-success)' }}>
                          {h.score}/100
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-fg-muted)' }}>{h.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Education Callout */}
            <div
              style={{
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border-subtle)',
                fontSize: '0.82rem',
                color: 'var(--color-fg-muted)',
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: 'var(--color-fg)' }}>{t.howItWorksTitle} </strong>
              {t.howItWorksBody}
            </div>
          </div>

          {/* Right Column: Manipulation X-Ray Result */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* 1. Verdict Banner */}
            <VerdictBar verdict={verdict} lang={lang} />

            {/* 2. Highlighted Message X-Ray */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-brand)' }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {t.manipulationXray}
                  </h3>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)' }}>
                  {verdict.highlights.length} {t.triggersDetected}
                </span>
              </div>

              <HighlightedText
                text={inputText}
                highlights={verdict.highlights}
                onSelectTactic={setSelectedTactic}
              />
            </div>

            {/* 3. 10-Second Cognitive Pause Gate (shown on danger verdicts) */}
            <PauseGate isDanger={verdict.level === 'danger'} lang={lang} />

            {/* 4. Matched Playbooks */}
            <PlaybookCard playbooks={verdict.playbooks} lang={lang} />

            {/* 5. Link X-Ray Analysis */}
            <LinkXray links={verdict.links} lang={lang} />

            {/* 6. Psychological Tactic Levers */}
            <TacticCards
              tactics={verdict.tactics}
              selectedTactic={selectedTactic}
              onSelectTactic={setSelectedTactic}
              lang={lang}
            />

            {/* 7. Verify Ladder Protocol */}
            <VerifyLadder verdict={verdict} rawText={inputText} lang={lang} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          padding: '1.25rem',
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--color-fg-muted)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <strong>PausePoint</strong> — The Manipulation Decoder · Human Firewall · Jain (Deemed-to-be University)
          </div>
          <div>
            Emergency Cyber Helpline: <strong style={{ color: 'var(--color-danger)' }}>1930</strong> · National Cyber Crime Portal: <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand)', textDecoration: 'none' }}>cybercrime.gov.in</a>
          </div>
        </div>
      </footer>

      {/* Judge Cheat Sheet / Demo Pitch Arsenal Modal */}
      <JudgeCheatSheetModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
      />

      {/* 60-Second Cognitive Immunity Speed Drill Modal */}
      <CognitiveImmunityDrillModal
        isOpen={isDrillModalOpen}
        onClose={() => setIsDrillModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}

export default App;

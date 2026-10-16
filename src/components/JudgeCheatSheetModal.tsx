import { X, Trophy, Clock, HelpCircle } from 'lucide-react';
import { playTick } from '../lib/audio';

interface JudgeCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgeCheatSheetModal = ({ isOpen, onClose }: JudgeCheatSheetModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 780,
          maxHeight: '90vh',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Trophy size={20} style={{ color: 'var(--color-brand)' }} />
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-fg)' }}>
              Judge Demo Kit & Ready Pitch Arsenal
            </h2>
          </div>
          <button
            onClick={() => {
              playTick();
              onClose();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-fg-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          style={{
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            fontSize: '0.9rem',
            lineHeight: 1.6,
          }}
        >
          {/* Winning Moment Callout */}
          <div
            style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(2, 132, 199, 0.1)',
              borderLeft: '4px solid var(--color-brand)',
              color: 'var(--color-fg)',
            }}
          >
            <strong style={{ color: 'var(--color-brand)' }}>The Winning Moment: </strong>
            Hand the phone to the judge and say: <em>"Sir/Ma'am, please paste any real SMS or WhatsApp message from your own phone."</em> Watch it decode in under 200 milliseconds, completely offline.
          </div>

          {/* 2-Minute Demo Script */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} style={{ color: 'var(--color-brand)' }} />
              The 2-Minute Presentation Script
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { time: '0:00 - 0:15', label: 'Hook & Problem', text: '85% of cyberattacks succeed because of human manipulation, not software bugs. In Phase 3 (Gaining Access), attackers bypass technical firewalls using psychological levers.' },
                { time: '0:15 - 0:40', label: 'Sample 1: Digital Arrest', text: 'Paste Digital Arrest. Highlight the colors: Fake Authority + Fear + Secrecy + Urgency. Point to the single breaking truth: "No Indian police or ED officer arrests anyone on a video call."' },
                { time: '0:40 - 1:00', label: 'Sample 2: Fake SBI KYC', text: 'Paste SBI KYC. Show the Link X-Ray: it says SBI, but the real registrable domain is sbi-kyc-update.xyz. Caught by our 10-point offline heuristics.' },
                { time: '1:00 - 1:15', label: 'Sample 3: UPI PIN Scam', text: 'Paste PhonePe Cashback. Read the golden truth: "You NEVER need your UPI PIN or QR scan to RECEIVE money."' },
                { time: '1:15 - 1:40', label: 'Interactive Judge Test', text: 'Hand the phone/laptop to the judge. Let them test their own inbox. Turn Wi-Fi OFF to prove 100% private zero-leak processing.' },
                { time: '1:40 - 2:00', label: 'Close & Human Firewall', text: 'Show the 10-Second Pause Gate and Verify Ladder with 1930 / Chakshu. Close with: "Pause. Verify. Then act. PausePoint turns every citizen into a human firewall."' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ color: 'var(--color-brand)', fontSize: '0.82rem' }}>{item.time}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-fg-muted)' }}>{item.label}</span>
                  </div>
                  <div style={{ color: 'var(--color-fg)' }}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Judge Q&A Prep */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={16} style={{ color: 'var(--color-brand)' }} />
              Tough Questions from Judges — Bulletproof Answers
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                {
                  q: 'Why not just use ChatGPT or an LLM API?',
                  a: 'Two critical reasons: 1) Privacy: Users must never upload personal OTPs, names, and bank alerts to a third-party cloud. 2) Speed & Offline: PausePoint works with zero internet, delivers instant deterministic results, and trains the human by showing the exact words that triggered the score.',
                },
                {
                  q: 'Where is the intelligence if it is rule-based heuristics?',
                  a: 'It is a multi-layered explainable expert classifier: 11 psychological levers, stacked pressure penalties, 9 Indian scam playbook pattern matchers, and a 10-point link decomposition engine with Levenshtein typo-distance and TLD risk weighting. Every flag is fully auditable in security forensics.',
                },
                {
                  q: 'How do you handle new scam types?',
                  a: 'Playbooks and tactics are declarative data structures. Adding a brand new scam pattern takes 2 minutes by appending a regex, without costly retraining cycles or dataset drift.',
                },
                {
                  q: 'What about false positives?',
                  a: 'A normal college notice scores 0. Legitimate bank OTPs (which explicitly say "do not share this OTP") score low (20). Crucially, PausePoint never claims a message is "safe" — it always reminds users to verify financial transactions.',
                },
              ].map((qa, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-surface-2)',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--color-fg)', marginBottom: '0.35rem' }}>
                    Q: {qa.q}
                  </div>
                  <div style={{ color: 'var(--color-fg-muted)', fontSize: '0.86rem' }}>
                    <strong>A: </strong>{qa.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

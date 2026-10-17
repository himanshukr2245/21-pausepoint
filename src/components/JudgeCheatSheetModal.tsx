import { X, Trophy, Clock, HelpCircle, Sparkles, Mic, Image as ImageIcon, Scale } from 'lucide-react';
import { playTick } from '../lib/audio';

interface JudgeCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgeCheatSheetModal = ({ isOpen, onClose }: JudgeCheatSheetModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal-container"
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
        className="modal-card"
        style={{
          width: '100%',
          maxWidth: 820,
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
              PausePoint 2.0 — Judge Demo Kit & Pitch Arsenal
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
            <strong style={{ color: 'var(--color-brand)' }}>The Winning Demo Moment: </strong>
            Hand the phone to the judge and say: <em>"Sir/Ma'am, please paste any real SMS, screenshot from WhatsApp, or recite a scam call from your own phone."</em> Watch it decode in under 50ms, completely offline, with zero network transmission.
          </div>

          {/* New 2.0 Superpowers Badges */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-brand)', fontWeight: 700, fontSize: '0.82rem' }}>
                <ImageIcon size={14} />
                Client-Side Screenshot OCR
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', marginTop: '0.2rem' }}>
                Drop or paste (Ctrl+V) WhatsApp/SMS screenshots; browser Web Worker extracts text instantly.
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-danger)', fontWeight: 700, fontSize: '0.82rem' }}>
                <Mic size={14} />
                Live Vishing Transcriber
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', marginTop: '0.2rem' }}>
                Listens to suspicious caller dialogue in English/Hindi and breaks down verbal pressure tactics.
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-success)', fontWeight: 700, fontSize: '0.82rem' }}>
                <Scale size={14} />
                Section 65B Legal Dossier
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', marginTop: '0.2rem' }}>
                Generates SHA-256 hashed electronic evidence docket for Cyber Police FIR & cybercrime.gov.in.
              </p>
            </div>

            <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-brand)', fontWeight: 700, fontSize: '0.82rem' }}>
                <Sparkles size={14} />
                Bilingual & Audio Readout
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-fg-muted)', marginTop: '0.2rem' }}>
                Full English ⇄ हिन्दी engine with zero-network speech assistant for senior citizens.
              </p>
            </div>
          </div>

          {/* 2-Minute Demo Script */}
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={16} style={{ color: 'var(--color-brand)' }} />
              The 2-Minute Pitch Script
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { time: '0:00 - 0:20', label: 'Hook & Problem', text: '85% of cyberattacks succeed because of human manipulation, not software bugs. In Phase 3 (Gaining Access), attackers bypass technical firewalls by hijacking human psychology.' },
                { time: '0:20 - 0:45', label: 'Multi-Modal Demo', text: 'Show OCR on a WhatsApp screenshot or test "fraud.com". Notice how PausePoint catches dangerous keywords, entropy, and unverified roots, scoring 78/100 (STOP).' },
                { time: '0:45 - 1:05', label: '15 Indian Scams & Truths', text: 'Show Digital Arrest, FedEx Drugs, TRAI SIM Block, and Sextortion. Each playbook has "The Single Fact That Breaks This Scam" — instantly disarming the attacker.' },
                { time: '1:05 - 1:25', label: 'Audio & Hindi for Senior Citizens', text: 'Switch to Hindi and click "🔊 Listen (सलाह सुनें)". The app speaks the advisory aloud without calling any external API.' },
                { time: '1:25 - 1:45', label: 'Section 65B Evidence Dossier', text: 'Click "Download Evidence Docket". Show the SHA-256 certificate and legal citations ready for FIR filing on cybercrime.gov.in.' },
                { time: '1:45 - 2:00', label: 'Close & Human Firewall', text: 'Turn Wi-Fi OFF to prove 100% private zero-leak processing. "Pause. Verify. Then act. PausePoint turns every Indian citizen into an impenetrable human firewall."' },
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
                  q: 'Why not just use ChatGPT or Gemini API?',
                  a: 'Two critical reasons: 1) Privacy: Users must never upload personal OTPs, names, and bank alerts to a third-party cloud. 2) Speed & Offline: PausePoint works with zero internet, delivers instant deterministic results (<50ms), and trains the human by explaining the exact cognitive levers.',
                },
                {
                  q: 'Where is the intelligence if it is rule-based heuristics?',
                  a: 'It is a multi-layered explainable expert classifier: 12 psychological levers, stacked pressure penalties, Shannon entropy calculation for DGA scam domains, 15 Indian scam playbook pattern matchers, and a deep registrable root decomposition engine.',
                },
                {
                  q: 'How do you handle new scam types?',
                  a: 'Playbooks and tactics are declarative data structures. Adding a brand new scam pattern takes 2 minutes by appending a regex, without costly retraining cycles or dataset drift.',
                },
                {
                  q: 'What makes this Section 65B evidence valid?',
                  a: 'Under Section 65B of the Indian Evidence Act / Section 63 BSA, electronic records require integrity hashing and contemporaneous timestamp verification. PausePoint computes client-side SHA-256 hashes of the exact payload without mutation.',
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

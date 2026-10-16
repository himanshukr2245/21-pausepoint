import { useState } from 'react';
import { ListChecks, Copy, Check, PhoneCall, ExternalLink, ShieldAlert } from 'lucide-react';
import { playTick } from '../lib/audio';
import type { Verdict } from '../engine';

interface VerifyLadderProps {
  verdict: Verdict;
  rawText: string;
}

export const VerifyLadder = ({ verdict, rawText }: VerifyLadderProps) => {
  const [copied, setCopied] = useState(false);

  const copyReport = () => {
    playTick();
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const reportText = `[INCIDENT SUSPICION REPORT - PAUSEPOINT DECODER]
Time of Analysis: ${timestamp}
Verdict: ${verdict.headline} (Threat Score: ${verdict.score}/100)

--- SUSPICIOUS MESSAGE CONTENT ---
${rawText}

--- DETECTED MANIPULATION LEVERS ---
${verdict.tactics.map((t) => `• ${t.label}: ${t.lever} (Triggers: ${t.examples.join(', ')})`).join('\n') || 'None'}

--- MATCHED SCAM PATTERN ---
${verdict.playbooks.map((p) => `• ${p.name}: ${p.truth}`).join('\n') || 'None'}

--- ANALYZED LINKS ---
${verdict.links.map((l) => `• ${l.url} -> Real Domain: ${l.domain} (Official: ${l.official ? 'YES' : 'NO'}, Risk: ${l.risk})`).join('\n') || 'None'}

--- RECOMMENDED ACTION ---
Reported to Cybercrime Portal (cybercrime.gov.in) and Sanchar Saathi Chakshu.
Emergency Helpline: 1930.`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ListChecks size={18} style={{ color: 'var(--color-brand)' }} />
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Action Protocol: What To Do Now
          </h3>
        </div>

        <button
          onClick={copyReport}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.85rem',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-brand)',
            background: copied ? 'var(--color-success-bg)' : 'transparent',
            color: copied ? 'var(--color-success-fg)' : 'var(--color-brand)',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Report Copied to Clipboard!' : 'Copy Cybercrime Report Kit'}
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
        }}
      >
        {verdict.verifySteps.map((step, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              fontSize: '0.92rem',
              color: 'var(--color-fg)',
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--color-surface-2)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-brand)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              {idx + 1}
            </div>
            <div>{step}</div>
          </div>
        ))}

        {/* Quick Indian Reporting Portals Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            flexWrap: 'wrap',
            paddingTop: '0.85rem',
            marginTop: '0.5rem',
            borderTop: '1px solid var(--color-border-subtle)',
          }}
        >
          <a
            href="tel:1930"
            onClick={playTick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-danger)',
              color: '#ffffff',
              fontSize: '0.84rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <PhoneCall size={15} />
            Dial 1930 (Cyber Helpline)
          </a>

          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playTick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-fg)',
              fontSize: '0.84rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ExternalLink size={14} />
            cybercrime.gov.in
          </a>

          <a
            href="https://sancharsaathi.gov.in/sfc/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playTick}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--color-surface-2)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-fg)',
              fontSize: '0.84rem',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <ShieldAlert size={14} />
            Sanchar Saathi (Chakshu)
          </a>
        </div>
      </div>
    </div>
  );
};

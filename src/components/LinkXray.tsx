import { CheckCircle, AlertTriangle, ShieldX, Link2 } from 'lucide-react';
import type { LinkReport } from '../engine';
import { type Language, TRANSLATIONS } from '../lib/i18n';

interface LinkXrayProps {
  links: LinkReport[];
  lang?: Language;
}

export const LinkXray = ({ links, lang = 'en' }: LinkXrayProps) => {
  if (links.length === 0) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Link2 size={18} style={{ color: 'var(--color-brand)' }} />
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {t.linkXrayTitle} ({links.length})
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {links.map((link, idx) => {
          const isDanger = link.risk >= 40;
          const isWarning = link.risk > 0 && link.risk < 40;

          return (
            <div
              key={idx}
              style={{
                padding: '1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-surface)',
                border: isDanger
                  ? '1px solid var(--color-danger-border)'
                  : isWarning
                  ? '1px solid var(--color-warning-border)'
                  : '1px solid var(--color-success-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <code
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--color-fg)',
                      wordBreak: 'break-all',
                    }}
                  >
                    {link.url}
                  </code>
                </div>

                {link.official ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--color-success-bg)',
                      color: 'var(--color-success-fg)',
                      border: '1px solid var(--color-success-border)',
                    }}
                  >
                    <CheckCircle size={13} />
                    {t.officialDomainVerified}
                  </span>
                ) : isDanger ? (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--color-danger-bg)',
                      color: 'var(--color-danger-fg)',
                      border: '1px solid var(--color-danger-border)',
                    }}
                  >
                    <ShieldX size={13} />
                    {t.deceptiveHighRisk} ({t.threatScore} {link.risk})
                  </span>
                ) : (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      background: 'var(--color-warning-bg)',
                      color: 'var(--color-warning-fg)',
                      border: '1px solid var(--color-warning-border)',
                    }}
                  >
                    <AlertTriangle size={13} />
                    {t.unverifiedLink} ({t.threatScore} {link.risk})
                  </span>
                )}
              </div>

              {/* Real Registrable Destination Callout */}
              <div
                style={{
                  fontSize: '0.84rem',
                  color: 'var(--color-fg-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>{t.realServerDest}</span>
                <strong
                  style={{
                    color: link.official ? 'var(--color-success-fg)' : 'var(--color-danger)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                  }}
                >
                  {link.domain || link.host}
                </strong>
              </div>

              {/* Specific Trigger Flags */}
              {link.flags.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.25rem' }}>
                  {link.flags.map((fl, fIdx) => (
                    <div
                      key={fIdx}
                      style={{
                        fontSize: '0.82rem',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem',
                        padding: '0.45rem 0.65rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-surface-2)',
                        borderLeft: '3px solid var(--color-danger)',
                      }}
                    >
                      <AlertTriangle size={14} style={{ color: 'var(--color-danger)', flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: 'var(--color-fg)' }}>{fl.why}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

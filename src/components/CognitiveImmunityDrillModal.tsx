import { useState } from 'react';
import { X, Zap, CheckCircle2, XCircle, ShieldCheck, Award, RotateCcw, ArrowRight } from 'lucide-react';
import { playDangerAlert, playCleanChime, playTick } from '../lib/audio';
import type { Language } from '../lib/i18n';

interface DrillQuestion {
  id: number;
  sender: string;
  message: string;
  isScam: boolean;
  trapExplanation: string;
  singleTruth: string;
}

const DRILL_QUESTIONS: DrillQuestion[] = [
  {
    id: 1,
    sender: 'TRAI-ALERT',
    message: 'Urgent notice from TRAI: Your mobile number will be deactivated in 2 hours due to pending KYC. Call our officer on 9876543210 immediately.',
    isScam: true,
    trapExplanation: 'Uses acute fear and urgency to trigger panic.',
    singleTruth: 'TRAI and telecom operators NEVER disconnect your SIM in 2 hours via SMS or phone calls.',
  },
  {
    id: 2,
    sender: 'HDFC Bank',
    message: '849201 is your OTP for purchase of Rs 2,499 at Amazon on card ending 4412. Valid for 10 mins. Do NOT share this OTP with anyone, including bank staff.',
    isScam: false,
    trapExplanation: 'Standard transactional banking SMS with genuine security warning.',
    singleTruth: 'Legitimate banks always explicitly instruct you NOT to share the OTP.',
  },
  {
    id: 3,
    sender: 'Unknown (+91 99887 76655)',
    message: 'This is Inspector Deshmukh from Cyber Branch. A parcel with illegal drugs was caught under your Aadhaar. Join Skype video call immediately for clearance.',
    isScam: true,
    trapExplanation: 'Digital Arrest extortion using fake authority and secrecy.',
    singleTruth: 'No Indian law enforcement agency ever arrests or clears suspects over a video call.',
  },
  {
    id: 4,
    sender: 'Swiggy',
    message: 'Your order from Biryani Blues is arriving in 15 mins! Track delivery partner live: https://www.swiggy.com/track/order-9941',
    isScam: false,
    trapExplanation: 'Official operational delivery update with verified official domain.',
    singleTruth: 'The link resolves to verified official swiggy.com without asking for credentials or transfers.',
  },
  {
    id: 5,
    sender: 'Telegram VIP Group',
    message: 'Exclusive Mahadev Book color prediction code! Deposit ₹500, get guaranteed ₹5,000 withdrawal within 10 minutes. Click https://mahadev-vip.top/app',
    isScam: true,
    trapExplanation: 'Greed lure leading to illegal online betting and deposit freeze.',
    singleTruth: 'Guaranteed 10x returns are mathematically impossible; the withdrawal button is intentionally rigged.',
  },
];

interface CognitiveImmunityDrillModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Language;
}

export const CognitiveImmunityDrillModal = ({
  isOpen,
  onClose,
  lang = 'en',
}: CognitiveImmunityDrillModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!isOpen) return null;

  const currentQ = DRILL_QUESTIONS[currentIndex];

  const handleAnswer = (userChoseScam: boolean) => {
    if (answered) return;
    setSelectedAnswer(userChoseScam);
    setAnswered(true);

    const isCorrect = userChoseScam === currentQ.isScam;
    if (isCorrect) {
      setScore((s) => s + 1);
      playCleanChime();
    } else {
      playDangerAlert();
    }
  };

  const handleNext = () => {
    playTick();
    if (currentIndex + 1 < DRILL_QUESTIONS.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    playTick();
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setAnswered(false);
    setFinished(false);
  };

  const immunityPercent = Math.round((score / DRILL_QUESTIONS.length) * 100);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.8)',
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
          maxWidth: 640,
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
            padding: '1.15rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Zap size={20} color="var(--color-brand)" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-fg)' }}>
              {lang === 'hi' ? '60-सेकंड कॉग्निटिव इम्यूनिटी टेस्ट' : '60-Second Cognitive Immunity Drill'}
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

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!finished ? (
            <>
              {/* Progress Bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-brand)', textTransform: 'uppercase' }}>
                  Scenario {currentIndex + 1} of {DRILL_QUESTIONS.length}
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-fg-muted)' }}>
                  Score: {score}/{currentIndex + (answered ? 1 : 0)}
                </span>
              </div>

              {/* Message Simulator Bubble */}
              <div
                style={{
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-brand)', fontFamily: 'var(--font-mono)' }}>
                  FROM: {currentQ.sender}
                </div>
                <div style={{ fontSize: '0.98rem', color: 'var(--color-fg)', lineHeight: 1.5, fontWeight: 500 }}>
                  "{currentQ.message}"
                </div>
              </div>

              {/* Action Buttons */}
              {!answered ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleAnswer(true)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-danger-bg)',
                      border: '1px solid var(--color-danger-border)',
                      color: 'var(--color-danger-fg)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <XCircle size={18} />
                    <span>🚨 It's a SCAM</span>
                  </button>

                  <button
                    onClick={() => handleAnswer(false)}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-success-bg)',
                      border: '1px solid var(--color-success-border)',
                      color: 'var(--color-success-fg)',
                      fontWeight: 700,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>✅ It's LEGITIMATE</span>
                  </button>
                </div>
              ) : (
                /* Feedback Section */
                <div
                  style={{
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedAnswer === currentQ.isScam ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                    border: `1px solid ${selectedAnswer === currentQ.isScam ? 'var(--color-success-border)' : 'var(--color-danger-border)'}`,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <strong style={{ color: selectedAnswer === currentQ.isScam ? 'var(--color-success-fg)' : 'var(--color-danger-fg)', fontSize: '0.95rem' }}>
                      {selectedAnswer === currentQ.isScam ? '✓ CORRECT! Rational Judgment Victorious' : '✗ TRAPPED! Cognitive Vulnerability Exploited'}
                    </strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-fg)' }}>
                      Actual: {currentQ.isScam ? '🚨 SCAM' : '✅ GENUINE'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--color-fg)', lineHeight: 1.45 }}>
                    <strong>Why:</strong> {currentQ.trapExplanation}
                  </p>
                  <p style={{ fontSize: '0.84rem', color: 'var(--color-fg)', lineHeight: 1.45 }}>
                    <strong>Breaking Truth:</strong> {currentQ.singleTruth}
                  </p>

                  <button
                    onClick={handleNext}
                    style={{
                      alignSelf: 'flex-end',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--color-brand)',
                      color: 'var(--color-brand-fg)',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      border: 'none',
                      cursor: 'pointer',
                      marginTop: '0.35rem',
                    }}
                  >
                    <span>{currentIndex + 1 === DRILL_QUESTIONS.length ? 'View Final Results' : 'Next Scenario'}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: immunityPercent >= 80 ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                  color: immunityPercent >= 80 ? 'var(--color-success-fg)' : 'var(--color-danger)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {immunityPercent >= 80 ? <ShieldCheck size={38} /> : <Award size={38} />}
              </div>

              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-fg)' }}>
                  {immunityPercent >= 80 ? 'Certified Human Firewall 🛡️' : 'Cognitive Vulnerability Detected ⚠️'}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-fg-muted)', marginTop: '0.25rem' }}>
                  Your Cognitive Immunity Score: <strong style={{ color: 'var(--color-brand)', fontSize: '1.1rem' }}>{immunityPercent}%</strong> ({score}/{DRILL_QUESTIONS.length} correct)
                </p>
              </div>

              <div
                style={{
                  background: 'var(--color-surface-2)',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  maxWidth: 480,
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  color: 'var(--color-fg)',
                  textAlign: 'left',
                }}
              >
                {immunityPercent === 100
                  ? 'Flawless instinct! You paused before acting, identified fake authority, and resisted fear-driven pressure tactics.'
                  : 'Attackers target fast emotional reactions. PausePoint enforces the 10-second cognitive pause so your logical cortex stays in charge.'}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  onClick={handleReset}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1.15rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface-2)',
                    color: 'var(--color-fg)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Try Again</span>
                </button>

                <button
                  onClick={onClose}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    background: 'var(--color-brand)',
                    color: 'var(--color-brand-fg)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  <span>Return to Decoder</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

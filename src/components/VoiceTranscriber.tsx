import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { playTick } from '../lib/audio';
import type { Language } from '../lib/i18n';

interface VoiceTranscriberProps {
  onTranscript: (text: string) => void;
  lang: Language;
}

export const VoiceTranscriber = ({ onTranscript, lang }: VoiceTranscriberProps) => {
  const [isListening, setIsListening] = useState(false);
  const [supported, setSupported] = useState(true);
  const [livePreview, setLivePreview] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognitionClass =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

    recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += text + ' ';
        } else {
          interim += text;
        }
      }

      setLivePreview(interim);
      if (final) {
        onTranscript(final);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [lang, onTranscript]);

  const toggleListening = () => {
    playTick();
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        setLivePreview('');
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  if (!supported) {
    return (
      <div
        style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          fontSize: '0.82rem',
          color: 'var(--color-fg-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <AlertCircle size={16} />
        <span>Speech recognition is supported in Chrome, Edge, Brave, and Android browsers.</span>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--color-fg)' }}>
            {lang === 'hi' ? 'वॉयस कॉल / ऑडियो विश्लेषक' : 'Voice Call & Audio Transcriber'}
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-fg-muted)' }}>
            {lang === 'hi'
              ? 'संदिग्ध फोन कॉल या वॉयस मैसेज की लाइव आवाज को डिकोड करें'
              : 'Listen to a suspicious phone call, WhatsApp audio, or recite the caller’s words live'}
          </p>
        </div>

        <button
          onClick={toggleListening}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.25rem',
            borderRadius: 'var(--radius-pill)',
            border: 'none',
            background: isListening ? 'var(--color-danger)' : 'var(--color-brand)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: isListening ? '0 0 16px rgba(239, 68, 68, 0.6)' : 'var(--shadow-sm)',
            transition: 'all 0.2s ease',
          }}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          {isListening
            ? lang === 'hi'
              ? 'रिकॉर्डिंग रोकें'
              : 'Stop Listening'
            : lang === 'hi'
            ? 'कॉल सुनना शुरू करें'
            : 'Start Live Transcriber'}
        </button>
      </div>

      {isListening && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger-border)',
          }}
        >
          <span className="pulse-green" style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-danger)' }} />
          <span style={{ fontSize: '0.85rem', color: 'var(--color-danger-fg)', fontWeight: 600 }}>
            {lang === 'hi' ? 'सुन रहा है... बोलिए या कॉल का स्पीकर ऑन रखें' : 'Listening live... Speak clearly or hold phone speaker near microphone'}
          </span>
          {livePreview && (
            <span style={{ fontSize: '0.82rem', color: 'var(--color-fg-muted)', fontStyle: 'italic' }}>
              "{livePreview}"
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// src/lib/speech.ts — Offline Speech Synthesis Assistant for Senior Citizens & Accessibility
// 0 network bytes, uses built-in browser speech synthesis in English or Hindi.

import type { Verdict } from '../engine';
import type { Language } from './i18n';
import { HINDI_PLAYBOOK_TRUTHS } from './i18n';

let isCurrentlySpeaking = false;

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    isCurrentlySpeaking = false;
  }
}

export function isSpeaking(): boolean {
  return isCurrentlySpeaking;
}

export function speakVerdict(
  verdict: Verdict,
  lang: Language = 'en',
  onEnd?: () => void
): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  stopSpeaking();

  let textToSpeak = '';

  if (lang === 'hi') {
    const dangerPrefix =
      verdict.level === 'danger'
        ? 'सावधान! यह संदेश अत्यंत खतरनाक है। तुरंत रुकें और पैसे न भेजें। '
        : verdict.level === 'suspicious'
        ? 'चेतावनी! इस संदेश में धोखे के लक्षण हैं। सोच-समझकर कदम उठाएं। '
        : 'इस संदेश में कोई गंभीर खतरा नहीं पाया गया। फिर भी सतर्क रहें। ';

    let playbookText = '';
    if (verdict.playbooks.length > 0) {
      const firstPb = verdict.playbooks[0];
      const hiPb = HINDI_PLAYBOOK_TRUTHS[firstPb.id];
      if (hiPb) {
        playbookText = `ध्यान दें: ${hiPb.truth} `;
      }
    }

    textToSpeak = `${dangerPrefix} आपका खतरा स्कोर है ${verdict.score} में से 100। ${playbookText}`;
  } else {
    const dangerPrefix =
      verdict.level === 'danger'
        ? 'Critical Warning! Stop. This message shows strong signs of a scam. Do not transfer any money. '
        : verdict.level === 'suspicious'
        ? 'Caution! Please pause and verify before taking any action. '
        : 'Minimal risk detected. Still verify any request involving money. ';

    let playbookText = '';
    if (verdict.playbooks.length > 0) {
      const firstPb = verdict.playbooks[0];
      playbookText = `Important truth: ${firstPb.truth} `;
    }

    textToSpeak = `${dangerPrefix} Threat score is ${verdict.score} out of 100. ${playbookText}`;
  }

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.rate = 0.95; // slightly slower for elderly clarity
  utterance.pitch = 1.0;

  // Attempt to select language voice
  const voices = window.speechSynthesis.getVoices();
  if (lang === 'hi') {
    const hiVoice = voices.find((v) => v.lang.startsWith('hi') || v.name.toLowerCase().includes('hindi'));
    if (hiVoice) utterance.voice = hiVoice;
  } else {
    const inEnVoice = voices.find((v) => v.lang === 'en-IN');
    if (inEnVoice) utterance.voice = inEnVoice;
  }

  utterance.onstart = () => {
    isCurrentlySpeaking = true;
  };

  utterance.onend = () => {
    isCurrentlySpeaking = false;
    onEnd?.();
  };

  utterance.onerror = () => {
    isCurrentlySpeaking = false;
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

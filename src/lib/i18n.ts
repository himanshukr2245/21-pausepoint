// src/lib/i18n.ts — Bilingual (English ⇄ हिन्दी) Localization Engine for PausePoint 2.0
// Designed specifically for Indian scam victims, parents, and senior citizens.

export type Language = 'en' | 'hi';

export interface TranslationDict {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  threatScore: string;
  offlineBadge: string;
  judgeKitBtn: string;
  samplesHeading: string;
  samplesSub: string;
  textareaPlaceholder: string;
  charsLabel: string;
  clearBtn: string;
  pasteBtn: string;
  decodeBtn: string;
  honestyRule: string;
  manipulationXray: string;
  triggersDetected: string;
  pauseGateTitle: string;
  pauseGateSub: string;
  pauseGateReason: string;
  pauseGateUnlocked: string;
  pauseGateLocked: string;
  riskAcknowledged: string;
  understandRisk: string;
  matchedPlaybooks: string;
  singleTruthTitle: string;
  linkXrayTitle: string;
  realServerDest: string;
  officialDomainVerified: string;
  deceptiveHighRisk: string;
  unverifiedLink: string;
  psychologicalLevers: string;
  triggersLabel: string;
  actionProtocolTitle: string;
  copyReportBtn: string;
  reportCopied: string;
  dialHelpline: string;
  recentRunsTitle: string;
  howItWorksTitle: string;
  howItWorksBody: string;
  speakBtn: string;
  stopSpeakingBtn: string;
  tabs: {
    text: string;
    image: string;
    voice: string;
    link: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationDict> = {
  en: {
    appTitle: 'PausePoint',
    appSubtitle: 'THE MANIPULATION DECODER',
    tagline: 'Pause. Verify. Then act.',
    threatScore: 'THREAT SCORE',
    offlineBadge: '100% Offline & Private',
    judgeKitBtn: 'Judge Demo Kit',
    samplesHeading: 'One-Tap Real Indian Scam Samples',
    samplesSub: 'Select to test live decoder',
    textareaPlaceholder: 'Paste any SMS, WhatsApp alert, Telegram job, bank alert or suspicious URL here...',
    charsLabel: 'chars',
    clearBtn: 'Clear',
    pasteBtn: 'Paste',
    decodeBtn: 'Decode Message',
    honestyRule: 'Honesty Rule: PausePoint never labels anything "safe". Even clean messages must be verified if they request credentials or financial transfers.',
    manipulationXray: 'Manipulation X-Ray (Highlighted Triggers)',
    triggersDetected: 'trigger phrases detected',
    pauseGateTitle: 'The 10-Second Cognitive Firewall Gate',
    pauseGateSub: 'Countdown in progress — emotional hijack prevention',
    pauseGateReason: 'Why this lock exists: Attackers use acute urgency and fear to trigger your amygdala and suppress logical reasoning. This 10-second forced pause breaks the emotional hijack so your rational judgment takes over.',
    pauseGateUnlocked: 'UNLOCKED',
    pauseGateLocked: 'LOCKED',
    riskAcknowledged: 'Risk Acknowledged',
    understandRisk: 'I Understand The Risk (Continue Anyway)',
    matchedPlaybooks: 'Matched Known Indian Scam Playbook',
    singleTruthTitle: 'The Single Fact That Breaks This Scam:',
    linkXrayTitle: 'Link Deep X-Ray Analysis',
    realServerDest: 'Real destination server:',
    officialDomainVerified: 'Verified Official Domain',
    deceptiveHighRisk: 'Deceptive / High Risk',
    unverifiedLink: 'Unverified Link',
    psychologicalLevers: 'Psychological Manipulation Levers',
    triggersLabel: 'TRIGGERS:',
    actionProtocolTitle: 'Action Protocol: What To Do Now',
    copyReportBtn: 'Copy Cybercrime Report Kit',
    reportCopied: 'Report Copied to Clipboard!',
    dialHelpline: 'Dial 1930 (Cyber Helpline)',
    recentRunsTitle: 'RECENT DECODE RUNS IN THIS SESSION',
    howItWorksTitle: 'How PausePoint Works:',
    howItWorksBody: 'Analyzes incoming messages across 12 psychological levers, matches against 15 known Indian scam playbooks, decomposes URLs down to registrable roots, and provides actionable verification steps. Zero AI hallucination, 100% deterministic, explainable forensics.',
    speakBtn: 'Listen (Audio Readout)',
    stopSpeakingBtn: 'Stop Audio',
    tabs: {
      text: 'Text Message',
      image: 'Screenshot (OCR)',
      voice: 'Voice Call',
      link: 'Inspect Link',
    },
  },
  hi: {
    appTitle: 'पॉजपॉइंट',
    appSubtitle: 'साइबर फ्रॉड डिकोडर',
    tagline: 'रुकें। जांचें। फिर कदम उठाएं।',
    threatScore: 'खतरा स्कोर',
    offlineBadge: '100% ऑफलाइन एवं सुरक्षित',
    judgeKitBtn: 'जज डेमो किट',
    samplesHeading: 'वास्तविक भारतीय साइबर फ्रॉड के उदाहरण',
    samplesSub: 'लाइव जांचने के लिए किसी भी उदाहरण पर क्लिक करें',
    textareaPlaceholder: 'कोई भी संदिग्ध एसएमएस, व्हाट्सएप संदेश, बैंक सूचना या लिंक यहां पेस्ट करें...',
    charsLabel: 'अक्षर',
    clearBtn: 'हटाएं',
    pasteBtn: 'पेस्ट करें',
    decodeBtn: 'संदेश की जांच करें',
    honestyRule: 'ईमानदारी का नियम: पॉजपॉइंट कभी भी किसी संदेश को "पूरी तरह सुरक्षित" नहीं कहता। पैसे या ओटीपी से जुड़े हर संदेश की स्वयं जांच आवश्यक है।',
    manipulationXray: 'मैनिप्युलेशन एक्स-रे (धोखे के चिन्ह)',
    triggersDetected: 'संदिग्ध संकेत पहचाने गए',
    pauseGateTitle: '10-सेकंड का मानसिक सुरक्षा कवच',
    pauseGateSub: 'उलझन और घबराहट रोकने के लिए टाइमर सक्रिय है',
    pauseGateReason: 'यह सुरक्षा लॉक क्यों है: साइबर ठग आपको डराकर या जल्दबाजी दिखाकर सोचने का मौका नहीं देते। यह 10 सेकंड का ठहराव आपके दिमाग को शांत कर सही निर्णय लेने में मदद करता है।',
    pauseGateUnlocked: 'अनलॉक हुआ',
    pauseGateLocked: 'सुरक्षित लॉक',
    riskAcknowledged: 'जोखिम स्वीकार किया',
    understandRisk: 'मैं जोखिम समझता हूं (आगे बढ़ें)',
    matchedPlaybooks: 'पहचाना गया भारतीय फ्रॉड पैटर्न',
    singleTruthTitle: 'वह एक सच्चाई जो इस फ्रॉड को तुरंत तोड़ देती है:',
    linkXrayTitle: 'वेब लिंक की गहन एक्स-रे जांच',
    realServerDest: 'असली वेबसाइट का पता:',
    officialDomainVerified: 'प्रमाणित आधिकारिक वेबसाइट',
    deceptiveHighRisk: 'फर्जी / अत्यंत खतरनाक लिंक',
    unverifiedLink: 'अपुष्ट / गैर-आधिकारिक लिंक',
    psychologicalLevers: 'मानसिक दबाव बनाने के हथकंडे',
    triggersLabel: 'संदिग्ध शब्द:',
    actionProtocolTitle: 'सुरक्षा नियम: अब आपको क्या करना चाहिए',
    copyReportBtn: 'साइबर रिपोर्ट तैयार कर कॉपी करें',
    reportCopied: 'रिपोर्ट क्लिपबोर्ड में कॉपी हो गई!',
    dialHelpline: '1930 पर कॉल करें (साइबर हेल्पलाइन)',
    recentRunsTitle: 'इस सत्र में की गई हालिया जांचें',
    howItWorksTitle: 'पॉजपॉइंट कैसे काम करता है:',
    howItWorksBody: 'यह 12 मनोवैज्ञानिक हथकंडों का विश्लेषण करता है, 15 भारतीय साइबर फ्रॉड पैटर्न से मिलान करता है और नकली वेबसाइटों की पोल खोलता है। यह पूरी तरह ऑफलाइन और आपके फोन पर सुरक्षित रहता है।',
    speakBtn: 'आवाज में सुनें (वरिष्ठ नागरिकों हेतु)',
    stopSpeakingBtn: 'आवाज रोकें',
    tabs: {
      text: 'संदेश टेक्स्ट',
      image: 'स्क्रीनशॉट (OCR)',
      voice: 'वॉयस कॉल',
      link: 'लिंक जांच',
    },
  },
};

export const HINDI_TACTIC_LABELS: Record<string, { label: string; lever: string }> = {
  urgency: {
    label: 'जल्दबाजी (Urgency)',
    lever: 'आपको तुरंत उकसाता है ताकि आप बिना सोचे-समझे कदम उठा लें',
  },
  fear: {
    label: 'डर / धमकी (Fear)',
    lever: 'गिरफ्तारी, खाता बंद होने या जुर्माने का डर दिखाकर बात मनवाता है',
  },
  authority: {
    label: 'फर्जी अधिकारी (Fake Authority)',
    lever: 'सीबीआई, पुलिस, बैंक या सरकारी संस्था का झूठा रौब दिखाता है',
  },
  reward: {
    label: 'लालच / इनाम (Reward)',
    lever: 'लॉटरी, कैशबैक या अचानक मिलने वाले पैसों का लालच देता है',
  },
  secrecy: {
    label: 'गोपनीयता / अलगाव (Secrecy)',
    lever: 'परिवार या दोस्तों को बताने से रोकता है ताकि कोई आपको आगाह न कर सके',
  },
  credentials: {
    label: 'पासवर्ड / पिन की मांग (Credentials)',
    lever: 'आपके बैंक खाते, ओटीपी या यूपीआई पिन पर कब्जा करना चाहता है',
  },
  remote: {
    label: 'रिमोट ऐप / खतरनाक एपीके (Remote Control)',
    lever: 'आपके फोन पर कब्जा करने के लिए एनीडेस्क या एपीके ऐप डाउनलोड करवाता है',
  },
  payment: {
    label: 'पैसे की मांग (Payment)',
    lever: 'असली मकसद: आपसे सीधे पैसे ट्रांसफर करवाना या क्यूआर कोड स्कैन करवाना',
  },
  familiarity: {
    label: 'झूठा अपनापन (Fake Familiarity)',
    lever: 'परिवार के सदस्य या पुराने मित्र का रूप धरकर विश्वास जीतता है',
  },
  curiosity: {
    label: 'ब्लैकमेल / निजी वीडियो (Curiosity/Extortion)',
    lever: 'निजी वीडियो या फोटो लीक करने का डर दिखाकर ब्लैकमेल करता है',
  },
  scarcity: {
    label: 'सीमित ऑफर (Scarcity)',
    lever: 'सीमित सीटें या केवल आज का मौका बताकर जल्दबाजी करवाता है',
  },
  link_bait: {
    label: 'लिंक पर क्लिक का दबाव (Link Bait)',
    lever: 'किसी अज्ञात वेबसाइट या पोर्टल पर जाने के लिए मजबूर करता है',
  },
};

export const HINDI_PLAYBOOK_TRUTHS: Record<string, { name: string; truth: string }> = {
  'digital-arrest': {
    name: '"डिजिटल अरेस्ट" फ्रॉड',
    truth: 'कोई भी भारतीय पुलिस, सीबीआई, ईडी या कस्टम अधिकारी कभी भी वीडियो कॉल पर किसी को गिरफ्तार नहीं करता और न ही मामला रफा-दफा करने के लिए पैसे मांगता है।',
  },
  kyc: {
    name: 'केवाईसी / खाता ब्लॉक फ्रॉड',
    truth: 'बैंक कभी भी एसएमएस लिंक के जरिए खाता बंद नहीं करते। केवाईसी केवल बैंक की आधिकारिक ऐप में या शाखा जाकर ही अपडेट करें।',
  },
  'upi-receive': {
    name: '"पैसे पाने के लिए पिन दर्ज करें" का जाल',
    truth: 'पैसे प्राप्त करने के लिए कभी भी UPI PIN दर्ज करने या QR कोड स्कैन करने की आवश्यकता नहीं होती। पिन केवल पैसे भेजने के लिए होता है।',
  },
  otp: {
    name: 'ओटीपी मांगने का फ्रॉड',
    truth: 'कोई भी बैंक, कूरियर कंपनी या सरकारी कार्यालय आपसे कभी भी फोन या मैसेज पर ओटीपी नहीं मांगता।',
  },
  electricity: {
    name: 'बिजली कनेक्शन काटने की धमकी',
    truth: 'बिजली विभाग कभी भी व्यक्तिगत मोबाइल नंबर से रात में बिजली काटने की धमकी वाले एसएमएस नहीं भेजता। अपने बिल की जांच सरकारी बिजली ऐप पर करें।',
  },
  'task-job': {
    name: 'यूट्यूब लाइक / पार्ट-टाइम जॉब फ्रॉड',
    truth: 'कोई भी असली कंपनी यूट्यूब वीडियो लाइक करने के हजारों रुपये नहीं देती, और न ही कमाई निकालने के लिए पहले पैसे जमा करने को कहती है।',
  },
  parcel: {
    name: 'कूरियर / कस्टम्स पार्सल फ्रॉड',
    truth: 'कूरियर कंपनियां कभी भी पार्सल में गैर-कानूनी सामान बताकर फोन पर जुर्माना या जमानत राशि नहीं मांगतीं।',
  },
  'new-number': {
    name: '"नया नंबर" पारिवारिक फ्रॉड',
    truth: 'नए नंबर से पैसे मांगे जाने पर, पहले व्यक्ति के पुराने नंबर पर फोन करें या ऐसा कोई सवाल पूछें जिसका जवाब सिर्फ वे जानते हों।',
  },
  apk: {
    name: 'खतरनाक एपीके (.apk) ऐप',
    truth: 'ऐप केवल गूगल प्ले स्टोर से ही डाउनलोड करें। चैट पर भेजी गई .apk फाइल आपके फोन के सारे मैसेज और ओटीपी चुरा सकती है।',
  },
  'trai-sim': {
    name: 'ट्राई / सिम बंद होने की धमकी',
    truth: 'ट्राई या टेलीकॉम ऑपरेटर कभी भी 2 घंटे में सिम बंद करने की धमकी नहीं देते। सिम केवाईसी केवल आधिकारिक टेलीकॉम स्टोर पर ही होती है।',
  },
  sextortion: {
    name: 'वीडियो कॉल ब्लैकमेल / सेक्सटॉर्शन',
    truth: 'ब्लैकमेलर स्क्रीन रिकॉर्डिंग का इस्तेमाल करते हैं। कभी भी डरकर पैसे न भेजें—पैसे देने से मांग और बढ़ती है। तुरंत नंबर ब्लॉक करें और 1930 पर शिकायत करें।',
  },
  'pan-aadhaar': {
    name: 'पैन-आधार लिंक जुर्माना फ्रॉड',
    truth: 'पैन-आधार लिंकिंग केवल incometax.gov.in पर ही देखी जा सकती है। किसी भी एसएमएस लिंक पर पेनल्टी के नाम पर पैसे न दें।',
  },
  'cc-points': {
    name: 'क्रेडिट कार्ड रिवॉर्ड पॉइंट्स फ्रॉड',
    truth: 'बैंक कभी भी रिवॉर्ड पॉइंट्स भुनाने के लिए किसी लिंक पर कार्ड का सीवीवी (CVV) या नेटबैंकिंग पासवर्ड नहीं मांगते।',
  },
  'stock-tips': {
    name: 'व्हाट्सएप वीआईपी स्टॉक / आईपीओ घोटाला',
    truth: 'सेबी-पंजीकृत ब्रोकर कभी भी व्हाट्सएप या टेलीग्राम के वीआईपी ग्रुप में 500% मुनाफे या गुप्त आईपीओ आवंटन की पेशकश नहीं करते।',
  },
};

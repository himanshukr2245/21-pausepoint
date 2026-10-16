// src/engine.ts — PausePoint decoder: finds the psychology + the scam playbook + the dangerous links in any message.
// Pure TypeScript, no network, no API key → instant, private, works offline. Every flag says WHY.

export type TacticId = 'urgency' | 'fear' | 'authority' | 'reward' | 'secrecy' | 'credentials' | 'remote' | 'payment' | 'familiarity' | 'curiosity' | 'scarcity';
export interface Tactic { id: TacticId; label: string; lever: string; weight: number; re: RegExp }

// English + common Hinglish. Order doesn't matter; overlaps are resolved by weight.
export const TACTICS: Tactic[] = [
  { id: 'urgency', label: 'Urgency', lever: 'Rushes you so you skip thinking', weight: 12,
    re: /\b(urgent(?:ly)?|immediately|right now|act now|asap|within \d+\s*(?:hours?|hrs?|minutes?|mins?)|today only|last (?:chance|warning|reminder|date)|expires? (?:today|tonight|soon)|tonight|turant|abhi|jaldi)\b/gi },
  { id: 'fear', label: 'Fear / threat', lever: 'Scares you into obeying', weight: 15,
    re: /\b(blocked|suspended|deactivated|disconnected|disconnection|legal action|arrest(?:ed)?|warrant|penalty|fine of|FIR|seized|frozen|money laundering|drugs?|illegal|band ho jayega|kat jayegi)\b/gi },
  { id: 'authority', label: 'Fake authority', lever: 'Borrows the power of an official body', weight: 12,
    re: /\b(RBI|SEBI|CBI|ED officer|customs|income ?tax|TRAI|police|cyber ?cell|crime branch|narcotics|NCB|court|judge|UIDAI|government|bank manager|officer|electricity (?:board|department))\b/gi },
  { id: 'reward', label: 'Greed / reward', lever: 'Dangles money you didn\'t expect', weight: 12,
    re: /\b(won|winner|lottery|prize|cashback|reward|gift|lucky draw|KBC|refund|bonus|earn (?:rs\.?|₹)?\s?\d[\d,]*|part[- ]time job|work from home|double your|free)\b/gi },
  { id: 'secrecy', label: 'Secrecy / isolation', lever: 'Cuts you off from people who would warn you', weight: 15,
    re: /\b(don'?t tell (?:anyone|anybody|your family)|do not (?:tell|inform|share with) (?:anyone|anybody|your family)|keep (?:this )?(?:confidential|secret)|stay on (?:the )?(?:call|video)|don'?t disconnect|kisi ko mat batana)\b/gi },
  { id: 'credentials', label: 'Asks for secrets', lever: 'Wants the keys to your account', weight: 20,
    re: /\b(OTP|UPI PIN|PIN|CVV|password|passcode|login details|card number|netbanking (?:id|password)|verification code)\b/gi },
  { id: 'remote', label: 'Remote control / app install', lever: 'Wants control of your phone', weight: 20,
    re: /\b(AnyDesk|TeamViewer|QuickSupport|RustDesk|screen ?share|install (?:this|the) app|download (?:this|the) app|\S+\.apk)\b/gi },
  { id: 'payment', label: 'Money request', lever: 'The actual goal: your money', weight: 10,
    re: /\b(pay(?:ment)?|transfer|send (?:money|rs|₹)|scan (?:the |this )?QR|processing fee|registration fee|security deposit|clearance fee|UPI)\b/gi },
  { id: 'familiarity', label: 'Fake familiarity', lever: 'Pretends to be someone you trust', weight: 12,
    re: /\b(hi (?:mom|mum|maa|dad|papa)|this is my new number|my (?:old )?phone (?:is )?(?:lost|broken)|it'?s me|beta)\b/gi },
  { id: 'curiosity', label: 'Curiosity bait', lever: 'Makes you click to find out', weight: 8,
    re: /\b(you won'?t believe|see who|your (?:photo|video) (?:is )?(?:viral|leaked)|private video|check this out|is this you)\b/gi },
  { id: 'scarcity', label: 'Scarcity / social proof', lever: 'Makes you fear missing out', weight: 6,
    re: /\b(only \d+ (?:left|seats|slots)|limited (?:offer|slots|time)|thousands (?:have|already)|everyone is joining)\b/gi },
];

export interface Playbook { id: string; name: string; truth: string; test: (t: string, found: Set<TacticId>) => boolean; weight: number }
export const PLAYBOOKS: Playbook[] = [
  { id: 'digital-arrest', name: '"Digital arrest" scam', weight: 35,
    truth: 'No Indian police, CBI, ED or customs officer arrests anyone over a video call or asks for money to "clear" a case.',
    test: (t, f) => f.has('authority') && /\b(video call|skype|whatsapp call|parcel|money laundering|drugs|arrest|warrant)\b/i.test(t) },
  { id: 'kyc', name: 'KYC / account-block scam', weight: 25,
    truth: 'Banks do not block accounts through SMS links. Update KYC only in the bank\'s own app or at the branch.',
    test: (t) => /\b(kyc|pan|aadhaar)\b/i.test(t) && /\b(update|expired?|blocked|suspended|link)\b/i.test(t) },
  { id: 'upi-receive', name: '"Enter PIN to receive money" trap', weight: 35,
    truth: 'You NEVER need your UPI PIN or a QR scan to RECEIVE money. A PIN only ever sends money out.',
    test: (t) => /\b(receive|get|refund|cashback|credited|prize)\b/i.test(t) && /\b(UPI PIN|enter (?:your )?pin|scan (?:the |this )?QR|approve (?:the )?request)\b/i.test(t) },
  { id: 'otp', name: 'OTP request', weight: 30,
    truth: 'No bank, delivery company or government office will ever ask you to share an OTP.',
    // a REQUEST to share — genuine bank SMS say "do NOT share this OTP", which must not trigger this
    test: (t) => [...t.matchAll(/\b(share|send|tell|forward|give)\b[^.]{0,40}\b(OTP|code)\b/gi)]
      .some((m) => !/\b(not|never|don'?t)\s+$/i.test(t.slice(Math.max(0, m.index! - 12), m.index!))) },
  { id: 'electricity', name: 'Electricity-disconnection scam', weight: 25,
    truth: 'Power companies don\'t text personal mobile numbers threatening disconnection "tonight". Check your bill in the official app.',
    test: (t) => /\b(electricity|bijli|power)\b/i.test(t) && /\b(disconnect\w*|cut|kat)\b/i.test(t) },
  { id: 'task-job', name: 'Task / part-time job scam', weight: 25,
    truth: 'Real jobs don\'t pay you to like videos or write reviews, and never ask for a "deposit" to unlock earnings.',
    test: (t) => /\b(part[- ]time|work from home|daily income|task)\b/i.test(t) && /\b(earn|income|salary|like|review|telegram|prepaid)\b/i.test(t) },
  { id: 'parcel', name: 'Courier / parcel scam', weight: 20,
    truth: 'Couriers don\'t hold parcels for "illegal items" over SMS, and don\'t ask for fees through random links.',
    test: (t) => /\b(parcel|courier|fedex|dhl|india post|shipment|delivery)\b/i.test(t) && /\b(held|failed|illegal|customs|drugs|address (?:update|incomplete)|redeliver)\b/i.test(t) },
  { id: 'new-number', name: '"New number" family impersonation', weight: 25,
    truth: 'Before sending money to a "new number", call the person on their OLD number or ask a question only they would know.',
    test: (_t, f) => f.has('familiarity') && (f.has('payment') || f.has('urgency')) },
  { id: 'apk', name: 'Malicious app link', weight: 30,
    truth: 'Apps should come only from the Play Store / App Store. An .apk sent over chat can take over your phone and read your OTPs.',
    test: (t, f) => /\.apk\b/i.test(t) || f.has('remote') },
];

// ── Links ────────────────────────────────────────────────────────────────────
const OFFICIAL = ['sbi.co.in', 'onlinesbi.sbi', 'hdfcbank.com', 'icicibank.com', 'axisbank.com', 'kotak.com', 'pnbindia.in', 'bankofbaroda.in',
  'paytm.com', 'phonepe.com', 'npci.org.in', 'amazon.in', 'flipkart.com', 'google.com', 'uidai.gov.in', 'incometax.gov.in',
  'india.gov.in', 'cybercrime.gov.in', 'sancharsaathi.gov.in', 'indiapost.gov.in', 'irctc.co.in', 'jainuniversity.ac.in', 'whatsapp.com', 'instagram.com'];
const BRANDS = ['sbi', 'hdfc', 'icici', 'axis', 'kotak', 'paytm', 'phonepe', 'gpay', 'amazon', 'flipkart', 'uidai', 'aadhaar', 'incometax', 'irctc', 'indiapost', 'npci', 'whatsapp', 'instagram'];
const SHORTENERS = ['bit.ly', 'tinyurl.com', 't.co', 'is.gd', 'cutt.ly', 'rb.gy', 'shorturl.at', 'tiny.cc', 'ow.ly', 'rebrand.ly', 'surl.li'];
const RISKY_TLDS = ['xyz', 'top', 'click', 'live', 'buzz', 'icu', 'rest', 'sbs', 'cfd', 'monster', 'shop', 'online', 'site', 'info', 'tk', 'ml', 'ga', 'cf', 'gq', 'zip', 'mov'];
const TWO_LEVEL = ['co.in', 'gov.in', 'org.in', 'ac.in', 'net.in', 'nic.in', 'res.in', 'edu.in', 'co.uk', 'com.au'];

export function registrable(host: string): string {
  const parts = host.toLowerCase().replace(/\.$/, '').split('.');
  const last2 = parts.slice(-2).join('.');
  return TWO_LEVEL.includes(last2) ? parts.slice(-3).join('.') : last2;
}
function lev(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}

export interface LinkFlag { flag: string; why: string; weight: number }
export interface LinkReport { url: string; host: string; domain: string; official: boolean; flags: LinkFlag[]; risk: number }

export function analyzeLink(raw: string): LinkReport {
  const withScheme = /^[a-z]+:\/\//i.test(raw) ? raw : `http://${raw}`;
  let u: URL;
  try { u = new URL(withScheme); } catch { return { url: raw, host: '', domain: '', official: false, flags: [{ flag: 'unparseable', why: 'Not a valid web address', weight: 20 }], risk: 20 }; }
  const host = u.hostname.toLowerCase(), domain = registrable(host);
  const official = OFFICIAL.includes(domain);
  const flags: LinkFlag[] = [];
  const f = (flag: string, why: string, weight: number) => flags.push({ flag, why, weight });
  if (u.username || /@/.test(raw.split('/')[2] ?? '')) f('at-sign', 'Contains "@" — the real destination is what comes AFTER it', 30);
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) f('ip-address', 'Uses a raw IP address instead of a name', 30);
  if (host.split('.').some((l) => l.startsWith('xn--'))) f('punycode', 'Uses look-alike international letters (punycode)', 35);
  if (SHORTENERS.includes(domain)) f('shortener', 'Shortened link hides the real destination — expand it before trusting', 15);
  const tld = host.split('.').pop() ?? '';
  if (!official && RISKY_TLDS.includes(tld)) f('risky-tld', `Ends in ".${tld}", cheap and common in scam sites`, 15);
  if (u.protocol === 'http:' && /^https?:\/\//i.test(raw)) f('no-https', 'Not encrypted (http, not https)', 10);
  if (!official) {
    const brand = BRANDS.find((b) => host.includes(b));
    if (brand) f('brand-in-name', `Mentions "${brand}" but the real domain is "${domain}" — not the official site`, 35);
    const label = domain.split('.')[0];
    const near = OFFICIAL.find((o) => { const ol = o.split('.')[0]; return label !== ol && ol.length >= 4 && lev(label, ol) <= 2; });
    if (near) f('lookalike', `"${domain}" looks like "${near}" with a letter or two changed`, 35);
  }
  if (host.split('.').length - domain.split('.').length >= 3) f('deep-subdomains', 'Unusually long chain of subdomains', 10);
  if (/\.apk(\?|$)/i.test(u.pathname)) f('apk', 'Downloads an Android app file (.apk) — can take over your phone', 40);
  if (!official && /(login|verify|kyc|update|secure|account|otp|reward|claim)/i.test(u.pathname + u.search)) f('bait-path', 'Path asks you to log in / verify / claim', 10);
  return { url: raw, host, domain, official, flags, risk: Math.min(100, flags.reduce((s, x) => s + x.weight, 0)) };
}

export function extractLinks(text: string): string[] {
  const re = /\b(?:https?:\/\/[^\s<>"')]+|www\.[^\s<>"')]+|(?:[a-z0-9-]+\.)+(?:com|in|net|org|xyz|top|click|live|info|ly|co|me|io|app|site|online|shop|apk|sbi|gl|gd|at)(?:\/[^\s<>"')]*)?)/gi;
  return [...new Set((text.match(re) ?? []).map((s) => s.replace(/[.,!?;:]+$/, '')))].filter((s) => !/@/.test(s.split('/')[0]) || /^https?:/i.test(s));
}

// ── The verdict ──────────────────────────────────────────────────────────────
export interface Highlight { start: number; end: number; text: string; tactic: TacticId; label: string }
export interface Verdict {
  score: number; level: 'danger' | 'suspicious' | 'low';
  headline: string; tactics: { id: TacticId; label: string; lever: string; examples: string[] }[];
  playbooks: { id: string; name: string; truth: string }[]; links: LinkReport[]; highlights: Highlight[];
  verifySteps: string[];
}

export function decode(text: string): Verdict {
  const hits: Highlight[] = [];
  for (const t of TACTICS) for (const m of text.matchAll(t.re)) hits.push({ start: m.index!, end: m.index! + m[0].length, text: m[0], tactic: t.id, label: t.label });
  hits.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
  const highlights: Highlight[] = [];
  for (const h of hits) if (!highlights.some((k) => h.start < k.end && k.start < h.end)) highlights.push(h);
  const found = new Set(hits.map((h) => h.tactic));
  const tactics = TACTICS.filter((t) => found.has(t.id)).map((t) => ({ id: t.id, label: t.label, lever: t.lever,
    examples: [...new Set(hits.filter((h) => h.tactic === t.id).map((h) => h.text))].slice(0, 3) }));
  const playbooks = PLAYBOOKS.filter((p) => p.test(text, found));
  const links = extractLinks(text).map(analyzeLink);

  let score = tactics.reduce((s, t) => s + (TACTICS.find((x) => x.id === t.id)!.weight), 0);
  score += playbooks.reduce((s, p) => s + p.weight, 0);
  score += Math.max(0, ...links.map((l) => l.risk));
  if (found.size >= 3) score += 10;                              // stacked pressure is the signature of manipulation
  score = Math.min(100, score);
  const level = score >= 60 ? 'danger' : score >= 30 ? 'suspicious' : 'low';
  const headline = level === 'danger' ? 'STOP. This message shows strong signs of a scam.'
    : level === 'suspicious' ? 'PAUSE. Verify before you act.' : 'No strong red flags found — still verify anything involving money or codes.';

  const verifySteps = [
    'Don\'t click links or call numbers given in the message — open the official app or website yourself.',
    ...(playbooks.some((p) => p.id === 'new-number') ? ['Call the person on the number you already had saved, or ask something only they would know.'] : []),
    ...(found.has('credentials') || playbooks.some((p) => p.id === 'otp' || p.id === 'upi-receive') ? ['Never share OTP, UPI PIN, CVV or passwords — with anyone, for any reason.'] : []),
    ...(found.has('secrecy') ? ['Tell a family member or friend now. Scammers need you alone.'] : []),
    'Lost money? Call 1930 immediately and report at cybercrime.gov.in.',
    'Report the number/message at sancharsaathi.gov.in (Chakshu).',
  ];
  return { score, level, headline, tactics, playbooks: playbooks.map(({ id, name, truth }) => ({ id, name, truth })), links, highlights, verifySteps };
}

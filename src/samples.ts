export interface SampleMessage {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  text: string;
  expectedScore: number;
  expectedLevel: 'danger' | 'suspicious' | 'low';
}

export const SAMPLE_MESSAGES: SampleMessage[] = [
  {
    id: 'digital-arrest',
    category: 'Digital Arrest',
    title: 'CBI / Crime Branch Video Call',
    subtitle: 'Police warrant + secrecy intimidation',
    expectedScore: 100,
    expectedLevel: 'danger',
    text: 'This is Inspector Sharma from Mumbai Crime Branch. A parcel in your name containing narcotics has been intercepted by Customs. An arrest warrant has been issued against you under PMLA. Stay on this video call, do not disconnect, and do not inform anyone or family members. Transfer Rs 98,500 immediately to the RBI verified clearance account for verification.',
  },
  {
    id: 'kyc-block',
    category: 'Banking / KYC',
    title: 'Fake SBI KYC Update',
    subtitle: 'Deactivation threat + phishing link',
    expectedScore: 100,
    expectedLevel: 'danger',
    text: 'Dear SBI Customer, your bank account and debit card have been SUSPENDED due to incomplete PAN KYC. To prevent permanent block, update KYC details immediately at: http://sbi-kyc-update.xyz/login within 2 hours.',
  },
  {
    id: 'apk-challan',
    category: 'Malicious APK',
    title: 'RTO Traffic Challan APK',
    subtitle: 'Spyware / Remote control trojan',
    expectedScore: 100,
    expectedLevel: 'danger',
    text: 'Notice from Traffic Police: You have an unpaid vehicle e-challan of Rs 1,500 with pending court summons. Download and install the official mParivahan verification app to review and pay: https://rto-challan.top/mParivahan.apk immediately.',
  },
  {
    id: 'upi-pin-trap',
    category: 'UPI Trap',
    title: 'Enter PIN to Receive Money',
    subtitle: 'Reversed payment illusion',
    expectedScore: 87,
    expectedLevel: 'danger',
    text: 'Congratulations! You have won Rs 5,000 festive cashback from PhonePe Rewards. Click here and enter your UPI PIN to receive the money directly into your bank account now.',
  },
  {
    id: 'electricity-cut',
    category: 'Utility Threat',
    title: 'Electricity Disconnection Tonight',
    subtitle: 'Panic power cut deadline',
    expectedScore: 74,
    expectedLevel: 'danger',
    text: 'Dear Consumer, Your electricity bill was not updated. Your power will be disconnected tonight at 9:30 PM by the electricity board. Contact our electricity officer at 9876543210 immediately to pay pending bill.',
  },
  {
    id: 'family-impersonation',
    category: 'Impersonation',
    title: 'Hi Mom, New Number',
    subtitle: 'Emotional family distress',
    expectedScore: 69,
    expectedLevel: 'danger',
    text: 'Hi mom, this is my new number. My old phone was stolen in college and I am stuck in an emergency. Please transfer Rs 4,000 urgently to this UPI for my cab and fees, I will explain everything tonight.',
  },
  {
    id: 'task-job',
    category: 'Job Scam',
    title: 'Part-Time YouTube Task Job',
    subtitle: 'Work-from-home deposit trap',
    expectedScore: 37,
    expectedLevel: 'suspicious',
    text: 'Part-time job offer! Earn Rs 3,000 to Rs 8,000 daily from home just by liking YouTube videos and leaving Google reviews. Join our official Telegram task group now to claim your first bonus.',
  },
  {
    id: 'benign-class',
    category: 'Normal Notice',
    title: 'College Lab Timetable',
    subtitle: 'Genuine student announcement',
    expectedScore: 0,
    expectedLevel: 'low',
    text: 'Dear Students, the DBMS lab scheduled for today at 2 PM is shifted to Room 304 in the CS block tomorrow. Please bring your completed observation notebooks.',
  },
  {
    id: 'benign-bank-otp',
    category: 'Official Bank OTP',
    title: 'Legitimate HDFC Bank OTP',
    subtitle: 'Official safety warning included',
    expectedScore: 20,
    expectedLevel: 'low',
    text: '849201 is your OTP for transaction of Rs 1,499.00 at AMAZON INDIA using HDFC Bank Card ending 7821. Valid for 10 mins. Do not share this OTP with anyone, including bank staff. -HDFC Bank',
  },
  {
    id: 'benign-delivery',
    category: 'Delivery Update',
    title: 'Amazon Delivery Tracking',
    subtitle: 'Legitimate tracking link',
    expectedScore: 0,
    expectedLevel: 'low',
    text: 'Your Amazon package with order #402-9812482 is out for delivery today by 8 PM. Track your courier: https://www.amazon.in/progress-tracker. Keep exact cash ready if COD.',
  },
];

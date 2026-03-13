

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type Sentiment = "positive" | "neutral" | "negative";

export interface TranscriptLine {
  id: number;
  at: string;        // "0:08"
  speaker: "agent" | "customer";
  text: string;
  sentiment: Sentiment;
  flagged?: boolean;
}

export interface Transcript {
  id: string;
  callId: string;
  agent: string;
  agentAvatar: string;
  date: string;
  time: string;
  duration: string;
  queue: string;
  sentiment: Sentiment;
  score: number;
  wordCount: number;
  flags: number;
  topics: string[];
  preview: string;
  lines: TranscriptLine[];
  status: "resolved" | "escalated" | "follow-up";
}

export const transcriptdata: Transcript[] = [
  {
    id: "TRX-001",
    callId: "CAL-20240318-0042",
    agent: "Marcus Rivera",
    agentAvatar: "MR",
    date: "Mar 18, 2024",
    time: "10:14 AM",
    duration: "8m 43s",
    queue: "Billing Support",
    sentiment: "neutral",
    score: 84,
    wordCount: 612,
    flags: 3,
    topics: ["billing dispute", "payment plan", "account suspension"],
    preview: "Customer disputed a $240 charge citing incorrect international call billing. Agent offered dispute escalation and payment arrangement...",
    status: "resolved",
    lines: [
      { id: 1,  at: "0:00", speaker: "agent",    sentiment: "positive", text: "Thank you for calling Apex Support, this is Marcus. How can I help you today?" },
      { id: 2,  at: "0:08", speaker: "customer", sentiment: "negative", text: "Yeah, I got a bill for $240 this month and I have no idea why it's that high. My plan is supposed to be $89." },
      { id: 3,  at: "0:18", speaker: "agent",    sentiment: "neutral",  text: "I completely understand your concern. Let me pull up your account right now. Can I get your account number or the phone number on file?" },
      { id: 4,  at: "0:29", speaker: "customer", sentiment: "neutral",  text: "It's 555-0182." },
      { id: 5,  at: "0:46", speaker: "agent",    sentiment: "neutral",  text: "I can see your account here. There were two international calls placed on March 4th and 11th." },
      { id: 6,  at: "1:02", speaker: "customer", sentiment: "negative", text: "International? I didn't make any international calls. Something is wrong with your system.", flagged: true },
      { id: 7,  at: "1:28", speaker: "agent",    sentiment: "positive", text: "You're right to be frustrated. What I can do right now is flag both charges for dispute and escalate to our billing review team." },
      { id: 8,  at: "2:08", speaker: "customer", sentiment: "neutral",  text: "Okay but I also got a notice saying my account might be suspended." },
      { id: 9,  at: "2:20", speaker: "agent",    sentiment: "positive", text: "I can put a temporary hold on any suspension for up to 21 days while the dispute is reviewed." },
      { id: 10, at: "3:23", speaker: "customer", sentiment: "negative", text: "If this isn't fixed I'm going to cancel. I've been a customer for six years.", flagged: true },
      { id: 11, at: "3:35", speaker: "agent",    sentiment: "positive", text: "I hear that, and six years is significant. I've added a retention note and flagged this for priority review." },
      { id: 12, at: "4:45", speaker: "agent",    sentiment: "neutral",  text: "Your dispute reference is DIS-2024-8821. You'll receive a confirmation email shortly." },
    ],
  },
  {
    id: "TRX-002",
    callId: "CAL-20240318-0051",
    agent: "Sarah Chen",
    agentAvatar: "SC",
    date: "Mar 18, 2024",
    time: "11:32 AM",
    duration: "4m 12s",
    queue: "Technical Support",
    sentiment: "positive",
    score: 96,
    wordCount: 389,
    flags: 0,
    topics: ["internet outage", "router reset", "resolved"],
    preview: "Customer reported intermittent internet drops. Agent guided through router reset and modem diagnostics, issue resolved within the call...",
    status: "resolved",
    lines: [
      { id: 1,  at: "0:00", speaker: "agent",    sentiment: "positive", text: "Hi, thank you for calling tech support, this is Sarah. What can I help you with today?" },
      { id: 2,  at: "0:07", speaker: "customer", sentiment: "neutral",  text: "My internet keeps dropping every hour or so. It's been happening since yesterday." },
      { id: 3,  at: "0:15", speaker: "agent",    sentiment: "positive", text: "I'm sorry to hear that. Let's get that sorted out. Can you check if the lights on your router are all solid?" },
      { id: 4,  at: "0:28", speaker: "customer", sentiment: "neutral",  text: "There's a blinking orange light on the WAN port." },
      { id: 5,  at: "0:34", speaker: "agent",    sentiment: "neutral",  text: "That's the issue. Let's do a full power cycle — unplug the router and modem, wait 30 seconds, then plug the modem back in first." },
      { id: 6,  at: "2:10", speaker: "customer", sentiment: "positive", text: "Okay all lights are green now. Internet seems to be working!" },
      { id: 7,  at: "2:18", speaker: "agent",    sentiment: "positive", text: "Excellent! I've also pushed a firmware update to your device to prevent this from recurring." },
    ],
  },
  {
    id: "TRX-003",
    callId: "CAL-20240318-0063",
    agent: "James Okafor",
    agentAvatar: "JO",
    date: "Mar 18, 2024",
    time: "1:05 PM",
    duration: "12m 58s",
    queue: "Cancellations",
    sentiment: "negative",
    score: 61,
    wordCount: 934,
    flags: 5,
    topics: ["cancellation request", "retention offer", "competitor mention", "escalation"],
    preview: "Customer requested account cancellation citing poor service and competitor pricing. Multiple retention offers declined. Escalated to senior retention team...",
    status: "escalated",
    lines: [
      { id: 1,  at: "0:00", speaker: "agent",    sentiment: "neutral",  text: "Thank you for calling, this is James. How can I help you today?" },
      { id: 2,  at: "0:06", speaker: "customer", sentiment: "negative", text: "I want to cancel my account. I'm done with this service.", flagged: true },
      { id: 3,  at: "0:12", speaker: "agent",    sentiment: "neutral",  text: "I'm sorry to hear that. Can I ask what's been the main issue for you?" },
      { id: 4,  at: "0:20", speaker: "customer", sentiment: "negative", text: "The speeds are terrible and I found a competitor offering the same plan for $30 less.", flagged: true },
      { id: 5,  at: "0:35", speaker: "agent",    sentiment: "positive", text: "I understand. I'd like to try to keep your business. I can offer you a 20% discount for the next 6 months." },
      { id: 6,  at: "0:48", speaker: "customer", sentiment: "negative", text: "I've heard that before. Last time it went back up after 3 months and you guys never fixed the speed issue." },
      { id: 7,  at: "3:22", speaker: "agent",    sentiment: "neutral",  text: "Let me transfer you to our senior retention team who can offer more options." },
      { id: 8,  at: "3:30", speaker: "customer", sentiment: "negative", text: "Fine. But if this is another runaround I'm just going to hang up and cancel online.", flagged: true },
    ],
  },
  {
    id: "TRX-004",
    callId: "CAL-20240317-0098",
    agent: "Priya Nair",
    agentAvatar: "PN",
    date: "Mar 17, 2024",
    time: "9:48 AM",
    duration: "6m 20s",
    queue: "Account Services",
    sentiment: "positive",
    score: 91,
    wordCount: 501,
    flags: 0,
    topics: ["plan upgrade", "feature inquiry", "upsell success"],
    preview: "Customer called to inquire about premium plan features. Agent provided clear comparison and successfully completed upgrade during the call...",
    status: "resolved",
    lines: [
      { id: 1, at: "0:00", speaker: "agent",    sentiment: "positive", text: "Good morning, Account Services, this is Priya. How can I help?" },
      { id: 2, at: "0:07", speaker: "customer", sentiment: "positive", text: "Hi, I'm thinking about upgrading my plan. Can you tell me what the premium tier includes?" },
      { id: 3, at: "0:15", speaker: "agent",    sentiment: "positive", text: "Absolutely! The Premium plan adds unlimited cloud storage, priority support, and advanced analytics. It's $45 more per month." },
      { id: 4, at: "1:30", speaker: "customer", sentiment: "positive", text: "That sounds good. The analytics feature is exactly what I need for my team." },
      { id: 5, at: "1:40", speaker: "agent",    sentiment: "positive", text: "Wonderful! I can process the upgrade right now if you'd like, and you'll have access within minutes." },
      { id: 6, at: "5:10", speaker: "customer", sentiment: "positive", text: "Perfect. Thank you for explaining everything so clearly." },
    ],
  },
  {
    id: "TRX-005",
    callId: "CAL-20240317-0112",
    agent: "Marcus Rivera",
    agentAvatar: "MR",
    date: "Mar 17, 2024",
    time: "2:30 PM",
    duration: "9m 07s",
    queue: "Billing Support",
    sentiment: "neutral",
    score: 78,
    wordCount: 680,
    flags: 2,
    topics: ["late payment", "fee waiver", "payment arrangement"],
    preview: "Customer called regarding a late payment fee after missing payment due to banking issue. Agent waived first-time fee and set up autopay...",
    status: "resolved",
    lines: [
      { id: 1, at: "0:00", speaker: "agent",    sentiment: "neutral",  text: "Billing Support, this is Marcus. How can I assist you?" },
      { id: 2, at: "0:07", speaker: "customer", sentiment: "neutral",  text: "I got charged a $25 late fee but my bank had an issue that week. I've never missed a payment before." },
      { id: 3, at: "0:18", speaker: "agent",    sentiment: "positive", text: "I can see your account has a perfect payment history. As a one-time courtesy, I can waive that fee for you." },
      { id: 4, at: "0:30", speaker: "customer", sentiment: "positive", text: "Oh that's great, thank you. I was worried about that." },
      { id: 5, at: "1:45", speaker: "agent",    sentiment: "neutral",  text: "I'd also recommend setting up autopay to protect against this in the future. Would you like me to set that up now?" },
    ],
  },
  {
    id: "TRX-006",
    callId: "CAL-20240316-0077",
    agent: "Sarah Chen",
    agentAvatar: "SC",
    date: "Mar 16, 2024",
    time: "3:15 PM",
    duration: "15m 22s",
    queue: "Technical Support",
    sentiment: "neutral",
    score: 72,
    wordCount: 1102,
    flags: 4,
    topics: ["email configuration", "password reset", "security concern", "follow-up required"],
    preview: "Customer experiencing email login issues across multiple devices. Agent resolved primary issue but customer flagged secondary security concern requiring follow-up...",
    status: "follow-up",
    lines: [
      { id: 1, at: "0:00", speaker: "agent",    sentiment: "positive", text: "Tech support, Sarah speaking. What's the issue today?" },
      { id: 2, at: "0:06", speaker: "customer", sentiment: "neutral",  text: "I can't log in to my email on my phone or laptop. Password isn't working." },
      { id: 3, at: "0:14", speaker: "agent",    sentiment: "neutral",  text: "Let's start with a password reset. I'll send a verification code to your backup email." },
      { id: 4, at: "5:20", speaker: "customer", sentiment: "neutral",  text: "Okay I'm in now on my laptop. But my phone still isn't connecting." },
      { id: 5, at: "8:45", speaker: "customer", sentiment: "negative", text: "Wait — there are emails here I didn't send. Someone might have been in my account.", flagged: true },
      { id: 6, at: "8:55", speaker: "agent",    sentiment: "neutral",  text: "That's a serious concern. I'm escalating a security review on your account immediately and enabling two-factor authentication." },
    ],
  },
];

export interface SentimentProps { 
    label: string; 
    color: string;  
    bg: string;   
    dot: string;
    Icon: React.ElementType; 
}

export interface StatusConfigItem { 
    label: string; 
    color: string;  
    bg: string; 
}
export type StatusType = "resolved" | "escalated" | "follow-up";

export interface SpeakerConfig { 
    label: string; 
    color: string;  
    bg: string; 
}
export type SpeakerType = "agent" | "customer";

export const SENTIMENT_CONFIG: Record<Sentiment, SentimentProps> = {
    positive: { label: "Positive", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", Icon: TrendingUp },
    neutral:  { label: "Neutral",  color: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20",   dot: "bg-slate-400",   Icon: Minus },
    negative: { label: "Negative", color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400",    Icon: TrendingDown },
};
  
export const STATUS_CONFIG: Record<StatusType, StatusConfigItem>  = {
    resolved:  { label: "Resolved",  color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    escalated: { label: "Escalated", color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20" },
    "follow-up": { label: "Follow-up", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
};
  
export const SPEAKER_CONFIG: Record<SpeakerType, SpeakerConfig> = {
    agent:    { label: "Agent",    color: "text-cyan-400",  bg: "bg-cyan-500/10" },
    customer: { label: "Customer", color: "text-violet-400", bg: "bg-violet-500/10" },
};
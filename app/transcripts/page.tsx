"use client";

import { useState, useMemo } from "react";
import {
  Search, Filter, Download, ChevronRight,
  MessageSquare, Clock, TrendingUp, TrendingDown,
  Minus, Flag, ChevronDown, X, Mic, AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Sentiment = "positive" | "neutral" | "negative";

interface TranscriptLine {
  id: number;
  at: string;        // "0:08"
  speaker: "agent" | "customer";
  text: string;
  sentiment: Sentiment;
  flagged?: boolean;
}

interface Transcript {
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

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRANSCRIPTS: Transcript[] = [
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SENTIMENT_CONFIG = {
  positive: { label: "Positive", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", Icon: TrendingUp },
  neutral:  { label: "Neutral",  color: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20",   dot: "bg-slate-400",   Icon: Minus },
  negative: { label: "Negative", color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400",    Icon: TrendingDown },
};

const STATUS_CONFIG = {
  resolved:  { label: "Resolved",  color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
  escalated: { label: "Escalated", color: "text-rose-400",    bg: "bg-rose-500/10 border-rose-500/20" },
  "follow-up": { label: "Follow-up", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
};

const SPEAKER_CONFIG = {
  agent:    { label: "Agent",    color: "text-cyan-400",  bg: "bg-cyan-500/10" },
  customer: { label: "Customer", color: "text-violet-400", bg: "bg-violet-500/10" },
};

function ScoreBar({ score }: { score: number }) {
  const color = score >= 85 ? "from-emerald-500 to-emerald-400"
              : score >= 70 ? "from-amber-500 to-amber-400"
              : "from-rose-500 to-rose-400";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-slate-700/50 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${color} rounded-full`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono text-slate-300 w-6 text-right">{score}</span>
    </div>
  );
}

// ─── Transcript Drawer ────────────────────────────────────────────────────────

function TranscriptDrawer({ transcript, onClose }: { transcript: Transcript; onClose: () => void }) {
  const [search, setSearch] = useState("");

  const lines = useMemo(() => {
    if (!search.trim()) return transcript.lines;
    return transcript.lines.filter(l => l.text.toLowerCase().includes(search.toLowerCase()));
  }, [transcript.lines, search]);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="flex-1 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="w-full max-w-2xl bg-slate-900 border-l border-slate-700/50 flex flex-col h-full overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/60 flex items-start justify-between gap-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-slate-500">{transcript.callId}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${STATUS_CONFIG[transcript.status].bg} ${STATUS_CONFIG[transcript.status].color}`}>
                {STATUS_CONFIG[transcript.status].label}
              </span>
            </div>
            <h2 className="text-white font-semibold text-lg">{transcript.queue}</h2>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-mono">
              <span>{transcript.agent}</span>
              <span>·</span>
              <span>{transcript.date}</span>
              <span>·</span>
              <span>{transcript.duration}</span>
              <span>·</span>
              <span>{transcript.wordCount} words</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors flex-shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Stats row */}
        <div className="px-6 py-3 border-b border-slate-700/30 bg-slate-800/30 flex gap-6 flex-shrink-0">
          <div>
            <div className="text-xs text-slate-500 font-mono mb-0.5">QA SCORE</div>
            <ScoreBar score={transcript.score} />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-mono mb-1">SENTIMENT</div>
            <div className={`text-xs font-mono flex items-center gap-1.5 ${SENTIMENT_CONFIG[transcript.sentiment].color}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${SENTIMENT_CONFIG[transcript.sentiment].dot}`} />
              {SENTIMENT_CONFIG[transcript.sentiment].label}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-mono mb-1">FLAGS</div>
            <div className={`text-xs font-mono flex items-center gap-1.5 ${transcript.flags > 0 ? "text-amber-400" : "text-slate-400"}`}>
              <Flag size={11} />
              {transcript.flags} moment{transcript.flags !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 font-mono mb-1">TOPICS</div>
            <div className="flex flex-wrap gap-1">
              {transcript.topics.slice(0, 3).map(t => (
                <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400 font-mono">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-slate-700/30 flex-shrink-0">
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search transcript..."
              className="w-full bg-slate-800 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                <X size={12} />
              </button>
            )}
          </div>
          {search && (
            <div className="text-xs text-slate-500 font-mono mt-1.5">
              {lines.length} of {transcript.lines.length} lines match
            </div>
          )}
        </div>

        {/* Lines */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          {lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-600">
              <Search size={28} />
              <p className="text-sm font-mono">No lines match "{search}"</p>
            </div>
          ) : lines.map(line => (
            <div
              key={line.id}
              className={`flex gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                line.flagged ? "bg-amber-500/5 border border-amber-500/15" : "hover:bg-slate-800/50"
              }`}
            >
              {/* Timestamp */}
              <span className="text-xs font-mono text-slate-600 w-10 flex-shrink-0 pt-0.5">{line.at}</span>

              {/* Speaker */}
              <div className="w-20 flex-shrink-0">
                <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${SPEAKER_CONFIG[line.speaker].bg} ${SPEAKER_CONFIG[line.speaker].color}`}>
                  {SPEAKER_CONFIG[line.speaker].label}
                </span>
              </div>

              {/* Text */}
              <p className={`flex-1 text-sm leading-relaxed ${line.flagged ? "text-slate-200" : "text-slate-300"}`}>
                {search ? highlightText(line.text, search) : line.text}
              </p>

              {/* Right — flag + sentiment */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                {line.flagged && <Flag size={11} className="text-amber-400" />}
                <span className={`w-1.5 h-1.5 rounded-full mt-1 ${SENTIMENT_CONFIG[line.sentiment].dot}`} title={line.sentiment} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-700/30 bg-slate-800/30 flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-mono text-slate-600">{transcript.id} · {transcript.lines.length} lines</span>
          <button className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-700/50">
            <Download size={12} />
            Export .txt
          </button>
        </div>
      </div>
    </div>
  );
}

function highlightText(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-cyan-500/25 text-cyan-300 rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TranscriptsPage() {
  const [search, setSearch]           = useState("");
  const [sentimentFilter, setSentiment] = useState<Sentiment | "all">("all");
  const [statusFilter, setStatus]     = useState<string>("all");
  const [agentFilter, setAgent]       = useState<string>("all");
  const [open, setOpen]               = useState<Transcript | null>(null);
  const [sortBy, setSortBy]           = useState<"date" | "score" | "duration" | "flags">("date");

  const agents = useMemo(() => [...new Set(TRANSCRIPTS.map(t => t.agent))], []);

  const filtered = useMemo(() => {
    let list = [...TRANSCRIPTS];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.agent.toLowerCase().includes(q) ||
        t.queue.toLowerCase().includes(q) ||
        t.preview.toLowerCase().includes(q) ||
        t.topics.some(tp => tp.includes(q)) ||
        t.id.toLowerCase().includes(q)
      );
    }
    if (sentimentFilter !== "all") list = list.filter(t => t.sentiment === sentimentFilter);
    if (statusFilter !== "all")    list = list.filter(t => t.status === statusFilter);
    if (agentFilter !== "all")     list = list.filter(t => t.agent === agentFilter);
    list.sort((a, b) => {
      if (sortBy === "score")    return b.score - a.score;
      if (sortBy === "flags")    return b.flags - a.flags;
      if (sortBy === "duration") return b.wordCount - a.wordCount;
      return 0; // date — already ordered
    });
    return list;
  }, [search, sentimentFilter, statusFilter, agentFilter, sortBy]);

  // Summary stats
  const stats = useMemo(() => ({
    total:    TRANSCRIPTS.length,
    flagged:  TRANSCRIPTS.filter(t => t.flags > 0).length,
    avgScore: Math.round(TRANSCRIPTS.reduce((s, t) => s + t.score, 0) / TRANSCRIPTS.length),
    positive: TRANSCRIPTS.filter(t => t.sentiment === "positive").length,
  }), []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
                <MessageSquare size={18} className="text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Transcripts</h1>
            </div>
            <p className="text-slate-400 text-sm ml-11">
              Full call transcripts with speaker labels, sentiment, and flagged moments.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-700/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-mono">
            <Download size={14} />
            Export All
          </button>
        </div>

        {/* ── Summary cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Transcripts", value: stats.total,    icon: MessageSquare, color: "from-cyan-500 to-blue-500",    sub: "this period" },
            { label: "Flagged Calls",     value: stats.flagged,  icon: Flag,          color: "from-amber-500 to-orange-500", sub: "need review" },
            { label: "Avg QA Score",      value: stats.avgScore, icon: TrendingUp,    color: "from-emerald-500 to-teal-500", sub: "out of 100" },
            { label: "Positive Calls",    value: stats.positive, icon: TrendingUp,    color: "from-violet-500 to-purple-500",sub: "good sentiment" },
          ].map(card => (
            <div key={card.label} className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">{card.label}</span>
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${card.color} opacity-80`}>
                  <card.icon size={12} className="text-white" />
                </div>
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                {card.value}
              </div>
              <div className="text-xs text-slate-600 font-mono mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-48">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search transcripts, agents, topics..."
                className="w-full bg-slate-800 border border-slate-700/50 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-600 font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20"
              />
            </div>

            {/* Sentiment */}
            <div className="relative">
              <select
                value={sentimentFilter}
                onChange={e => setSentiment(e.target.value as any)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={e => setStatus(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="resolved">Resolved</option>
                <option value="escalated">Escalated</option>
                <option value="follow-up">Follow-up</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Agent */}
            <div className="relative">
              <select
                value={agentFilter}
                onChange={e => setAgent(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="all">All Agents</option>
                {agents.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="appearance-none bg-slate-800 border border-slate-700/50 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-300 font-mono focus:outline-none focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="date">Sort: Date</option>
                <option value="score">Sort: Score</option>
                <option value="flags">Sort: Flags</option>
                <option value="duration">Sort: Length</option>
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* Result count */}
            <div className="flex items-center px-3 text-xs text-slate-500 font-mono">
              {filtered.length} of {TRANSCRIPTS.length} results
            </div>
          </div>
        </div>

        {/* ── Transcript list ── */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-slate-900/40 border border-slate-700/30 rounded-xl">
              <AlertCircle size={32} className="text-slate-600" />
              <div className="text-center">
                <p className="text-slate-400 font-medium">No transcripts found</p>
                <p className="text-slate-600 text-sm font-mono mt-1">Try adjusting your search or filters</p>
              </div>
            </div>
          ) : filtered.map(t => {
            const SC = SENTIMENT_CONFIG[t.sentiment];
            const ST = STATUS_CONFIG[t.status];
            return (
              <div
                key={t.id}
                onClick={() => setOpen(t)}
                className="group bg-slate-900/60 border border-slate-700/30 rounded-xl p-5 cursor-pointer hover:border-cyan-500/30 hover:bg-slate-900/80 transition-all backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {t.agentAvatar}
                  </div>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Top row */}
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-white text-sm">{t.agent}</span>
                      <span className="text-slate-600 text-xs">·</span>
                      <span className="text-slate-400 text-xs font-mono">{t.queue}</span>
                      <span className="text-slate-600 text-xs">·</span>
                      <span className="text-slate-500 text-xs font-mono">{t.date} {t.time}</span>

                      {/* Badges */}
                      <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-mono ${ST.bg} ${ST.color}`}>
                        {ST.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${SC.bg} ${SC.color}`}>
                        {SC.label}
                      </span>
                    </div>

                    {/* Preview */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">{t.preview}</p>

                    {/* Topics */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {t.topics.map(topic => (
                        <span key={topic} className="text-xs px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700/40 text-slate-500 font-mono">
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* Bottom stats row */}
                    <div className="flex items-center gap-5 text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {t.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Mic size={11} />
                        {t.wordCount} words
                      </span>
                      {t.flags > 0 && (
                        <span className="flex items-center gap-1.5 text-amber-500">
                          <Flag size={11} />
                          {t.flags} flag{t.flags !== 1 ? "s" : ""}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5 ml-auto">
                        <span className="text-slate-600">QA</span>
                        <span className={
                          t.score >= 85 ? "text-emerald-400" :
                          t.score >= 70 ? "text-amber-400" : "text-rose-400"
                        }>{t.score}</span>
                      </span>
                      {/* Score mini bar */}
                      <div className="w-20 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            t.score >= 85 ? "bg-emerald-500" :
                            t.score >= 70 ? "bg-amber-500" : "bg-rose-500"
                          }`}
                          style={{ width: `${t.score}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Chevron */}
                  <ChevronRight
                    size={16}
                    className="text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Transcript Drawer ── */}
      {open && <TranscriptDrawer transcript={open} onClose={() => setOpen(null)} />}
    </div>
  );
}
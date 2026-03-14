

export type Range = "7d" | "30d" | "90d";


export const VOLUME: Record<Range, { label: string; calls: number; resolved: number }[]> = {
    "7d": [
      { label: "Mon", calls: 42, resolved: 34 },
      { label: "Tue", calls: 58, resolved: 48 },
      { label: "Wed", calls: 71, resolved: 60 },
      { label: "Thu", calls: 65, resolved: 54 },
      { label: "Fri", calls: 80, resolved: 68 },
      { label: "Sat", calls: 33, resolved: 30 },
      { label: "Sun", calls: 24, resolved: 22 },
    ],
    "30d": [
      { label: "W1",  calls: 248, resolved: 201 },
      { label: "W2",  calls: 312, resolved: 260 },
      { label: "W3",  calls: 289, resolved: 242 },
      { label: "W4",  calls: 334, resolved: 284 },
    ],
    "90d": [
      { label: "Jan", calls: 980,  resolved: 810 },
      { label: "Feb", calls: 1120, resolved: 940 },
      { label: "Mar", calls: 1244, resolved: 1068 },
    ],
  };

export const SENTIMENT_TREND: Record<Range, { label: string; pos: number; neu: number; neg: number }[]> = {
    "7d": [
      { label: "Mon", pos: 31, neu: 44, neg: 25 },
      { label: "Tue", pos: 38, neu: 42, neg: 20 },
      { label: "Wed", pos: 42, neu: 41, neg: 17 },
      { label: "Thu", pos: 45, neu: 38, neg: 17 },
      { label: "Fri", pos: 48, neu: 36, neg: 16 },
      { label: "Sat", pos: 52, neu: 34, neg: 14 },
      { label: "Sun", pos: 50, neu: 35, neg: 15 },
    ],
    "30d": [
      { label: "W1",  pos: 34, neu: 44, neg: 22 },
      { label: "W2",  pos: 38, neu: 42, neg: 20 },
      { label: "W3",  pos: 44, neu: 39, neg: 17 },
      { label: "W4",  pos: 48, neu: 36, neg: 16 },
    ],
    "90d": [
      { label: "Jan", pos: 30, neu: 46, neg: 24 },
      { label: "Feb", pos: 38, neu: 43, neg: 19 },
      { label: "Mar", pos: 46, neu: 38, neg: 16 },
    ],
};

export const QA_TREND: Record<Range, { label: string; score: number; team: number }[]> = {
  "7d": [
    { label: "Mon", score: 74, team: 72 },
    { label: "Tue", score: 76, team: 74 },
    { label: "Wed", score: 78, team: 75 },
    { label: "Thu", score: 80, team: 77 },
    { label: "Fri", score: 82, team: 79 },
    { label: "Sat", score: 80, team: 78 },
    { label: "Sun", score: 81, team: 79 },
  ],
  "30d": [
    { label: "W1", score: 72, team: 70 },
    { label: "W2", score: 75, team: 72 },
    { label: "W3", score: 78, team: 75 },
    { label: "W4", score: 80, team: 77 },
  ],
  "90d": [
    { label: "Jan", score: 68, team: 67 },
    { label: "Feb", score: 74, team: 72 },
    { label: "Mar", score: 80, team: 77 },
  ],
};

export const AGENTS = [
    { name: "Sarah Chen",    avatar: "SC", calls: 148, score: 96, fcr: 88, sentiment: 82, duration: "4m 12s", trend: "up"   as const },
    { name: "Priya Nair",    avatar: "PN", calls: 122, score: 91, fcr: 84, sentiment: 79, duration: "5m 44s", trend: "up"   as const },
    { name: "Marcus Rivera", avatar: "MR", calls: 201, score: 81, fcr: 76, sentiment: 71, duration: "8m 12s", trend: "flat" as const },
    { name: "James Okafor",  avatar: "JO", calls: 166, score: 64, fcr: 61, sentiment: 58, duration: "9m 08s", trend: "down" as const },
];

export const QUEUES = [
    { name: "Billing Support",   calls: 214, pct: 33, avgScore: 76, fcr: 71, color: "from-rose-500 to-rose-400",    dot: "bg-rose-400" },
    { name: "Technical Support", calls: 178, pct: 27, avgScore: 82, fcr: 79, color: "from-amber-500 to-amber-400",  dot: "bg-amber-400" },
    { name: "Account Services",  calls: 142, pct: 22, avgScore: 91, fcr: 88, color: "from-cyan-500 to-blue-400",    dot: "bg-cyan-400" },
    { name: "Cancellations",     calls: 88,  pct: 13, avgScore: 62, fcr: 54, color: "from-violet-500 to-purple-400",dot: "bg-violet-400" },
    { name: "General Inquiries", calls: 36,  pct: 5,  avgScore: 88, fcr: 90, color: "from-emerald-500 to-teal-400", dot: "bg-emerald-400" },
];

export const TALK_RATIO = [
    { queue: "Billing",    agent: 52, customer: 48 },
    { queue: "Technical",  agent: 61, customer: 39 },
    { queue: "Account",    agent: 48, customer: 52 },
    { queue: "Cancel",     agent: 44, customer: 56 },
    { queue: "General",    agent: 55, customer: 45 },
];

export const FUNNEL = [
    { label: "Total calls",          value: 658, pct: 100, color: "from-cyan-500 to-blue-500" },
    { label: "Issue identified",     value: 631, pct: 96,  color: "from-blue-500 to-indigo-500" },
    { label: "Resolution attempted", value: 578, pct: 88,  color: "from-indigo-500 to-violet-500" },
    { label: "Resolved first call",  value: 513, pct: 78,  color: "from-violet-500 to-purple-500" },
    { label: "Customer satisfied",   value: 471, pct: 72,  color: "from-purple-500 to-pink-500" },
];
  
export const DURATION_DIST = [
    { label: "< 2m",   pct: 12, color: "bg-emerald-500" },
    { label: "2–5m",   pct: 28, color: "bg-cyan-500" },
    { label: "5–10m",  pct: 38, color: "bg-blue-500" },
    { label: "10–15m", pct: 14, color: "bg-violet-500" },
    { label: "> 15m",  pct: 8,  color: "bg-rose-500" },
];
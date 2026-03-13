

import { TrendingUp, AlertTriangle, MessageSquare, Zap, BookOpen } from "lucide-react";
export type Trend = "up" | "down" | "flat";
export type Severity = "critical" | "warning" | "info" | "success";

export interface InsightCard {
  id: string;
  type: "trend" | "alert" | "coaching" | "keyword" | "pattern";
  severity: Severity;
  title: string;
  body: string;
  metric?: string;
  metricDelta?: string;
  trend?: Trend;
  agent?: string;
  tags: string[];
  timestamp: string;
}

export interface CoachingTip {
  agentId: string;
  agent: string;
  avatar: string;
  score: number;
  scoreDelta: number;
  strengths: string[];
  improvements: string[];
  topIssue: string;
  callsReviewed: number;
}

export interface KeywordStat {
  word: string;
  count: number;
  delta: number;
  sentiment: "positive" | "negative" | "neutral";
  category: string;
}

export interface PatternItem {
  label: string;
  value: number;
  max: number;
  color: string;
}

export const INSIGHTS: InsightCard[] = [
  { id: "i1", type: "alert",    severity: "critical", title: "Cancellation intent up 34% this week",           body: "Keyword 'cancel' detected in 18 calls vs 13 last week. Majority concentrated in Billing Support queue on weekday afternoons. Recommend immediate queue review and retention script update.", metric: "18 calls",   metricDelta: "+34%",  trend: "up",   tags: ["billing","retention","urgent"],         timestamp: "2 hours ago" },
  { id: "i2", type: "trend",    severity: "success",  title: "Average QA score improved 6 points",             body: "Team average moved from 74 to 80 over the last 14 days. Agents who participated in the March coaching session show the strongest improvement. Sarah Chen leads with a 96 average.",    metric: "80 avg",     metricDelta: "+6 pts", trend: "up",   tags: ["performance","QA","coaching"],          timestamp: "1 day ago" },
  { id: "i3", type: "alert",    severity: "warning",  title: "Dead air spikes on Technical Support queue",     body: "Average silence duration in Tech Support increased from 3.1s to 5.8s. Likely caused by agents awaiting system lookups. Consider optimizing the diagnostic tool or adding hold-time scripts.", metric: "5.8s avg",  metricDelta: "+87%",  trend: "up",   tags: ["technical","dead-air","UX"],           timestamp: "3 hours ago" },
  { id: "i4", type: "coaching", severity: "info",     title: "James Okafor — Empathy language declining",      body: "Use of empathy phrases dropped from 8.2 per call to 4.1 over the past week. Recommend revisiting the empathy module from onboarding.", metric: "4.1 / call", metricDelta: "−50%",  trend: "down", agent: "James Okafor", tags: ["coaching","empathy","language"],       timestamp: "5 hours ago" },
  { id: "i5", type: "keyword",  severity: "warning",  title: "Competitor mentions rising — 'BrightLink' x9",  body: "Competitor brand 'BrightLink' appeared in 9 calls this week, up from 2. Customers citing pricing as primary comparison point. Sales and retention teams should be briefed.", metric: "9 mentions", metricDelta: "+350%", trend: "up",   tags: ["competitor","retention","pricing"],     timestamp: "6 hours ago" },
  { id: "i6", type: "pattern",  severity: "success",  title: "First-call resolution rate at 3-month high",    body: "FCR reached 78% this week — the highest since January. Correlates with the new troubleshooting guide rolled out March 12. Technical Support saw the largest gain (+14%).", metric: "78% FCR",    metricDelta: "+11%",  trend: "up",   tags: ["FCR","performance","technical"],        timestamp: "1 day ago" },
  { id: "i7", type: "alert",    severity: "warning",  title: "Interruption rate above threshold — 2 agents",  body: "Marcus Rivera and James Okafor both exceed the 2.0 interruptions/call benchmark at 3.1 and 4.2 respectively. This negatively impacts sentiment scores.", metric: "4.2 / call", metricDelta: "+110%", trend: "up",   agent: "James Okafor", tags: ["interruptions","coaching","CX"],      timestamp: "4 hours ago" },
  { id: "i8", type: "trend",    severity: "info",     title: "Monday mornings show highest negative sentiment",body: "Calls between 8–10 AM Monday consistently score 12% lower on sentiment. Customers report holdover frustration from weekend outages. Consider proactive outreach.", metric: "−12% sentiment", metricDelta: "Mon 8–10 AM", trend: "down", tags: ["sentiment","scheduling","pattern"], timestamp: "2 days ago" },
];

export const COACHING: CoachingTip[] = [
  { agentId: "SC", agent: "Sarah Chen",    avatar: "SC", score: 96, scoreDelta: +4, strengths: ["Empathy language","First-call resolution","Clear instructions"],                improvements: ["Reduce dead air during lookups"],                                topIssue: "Minor silence gaps during system checks",          callsReviewed: 24 },
  { agentId: "PN", agent: "Priya Nair",    avatar: "PN", score: 91, scoreDelta: +7, strengths: ["Upsell conversion","Product knowledge","Professional tone"],                    improvements: ["Call close could be warmer","More proactive follow-up offers"],   topIssue: "Closing phrases feel scripted",                    callsReviewed: 18 },
  { agentId: "MR", agent: "Marcus Rivera", avatar: "MR", score: 81, scoreDelta: +2, strengths: ["Retention language","Problem ownership","Billing expertise"],                   improvements: ["Reduce interruptions","Slower pacing on complex issues"],         topIssue: "Interruption rate 3.1/call — above 2.0 threshold", callsReviewed: 31 },
  { agentId: "JO", agent: "James Okafor",  avatar: "JO", score: 64, scoreDelta: -8, strengths: ["Queue procedure adherence","Escalation timing"],                               improvements: ["Empathy language","Reduce interruptions","Retention offers"],     topIssue: "Empathy phrases dropped 50% — critical coaching needed", callsReviewed: 22 },
];

export const KEYWORDS: KeywordStat[] = [
  { word: "cancel",     count: 18, delta: +34,  sentiment: "negative", category: "Retention Risk" },
  { word: "refund",     count: 14, delta: +12,  sentiment: "negative", category: "Billing" },
  { word: "BrightLink", count: 9,  delta: +350, sentiment: "negative", category: "Competitor" },
  { word: "manager",    count: 12, delta: +8,   sentiment: "negative", category: "Escalation" },
  { word: "thank you",  count: 89, delta: +5,   sentiment: "positive", category: "Positive" },
  { word: "resolved",   count: 62, delta: +18,  sentiment: "positive", category: "Resolution" },
  { word: "upgrade",    count: 21, delta: +44,  sentiment: "positive", category: "Upsell" },
  { word: "autopay",    count: 15, delta: +60,  sentiment: "neutral",  category: "Feature" },
  { word: "outage",     count: 11, delta: -22,  sentiment: "negative", category: "Technical" },
  { word: "discount",   count: 17, delta: +6,   sentiment: "positive", category: "Retention" },
];

export const HOUR_HEATMAP: number[] = [2,5,8,12,18,24,28,31,42,58,71,68,62,55,60,64,59,52,44,35,22,14,8,4];
export const PATTERNS: PatternItem[] = [
  { label: "Billing disputes",       value: 34, max: 100, color: "from-rose-500 to-rose-400" },
  { label: "Technical issues",       value: 28, max: 100, color: "from-amber-500 to-amber-400" },
  { label: "Plan changes / upsell",  value: 18, max: 100, color: "from-cyan-500 to-blue-400" },
  { label: "Account access",         value: 11, max: 100, color: "from-violet-500 to-purple-400" },
  { label: "Cancellation requests",  value: 9,  max: 100, color: "from-pink-500 to-rose-400" },
];

export const SEVERITY_CONFIG: Record<Severity, { border: string; bg: string; icon: string; badge: string; label: string }> = {
  critical: { border: "border-rose-500/40",    bg: "bg-rose-500/5",    icon: "text-rose-400",    badge: "bg-rose-500/15 text-rose-400 border-rose-500/25",       label: "Critical" },
  warning:  { border: "border-amber-500/40",   bg: "bg-amber-500/5",   icon: "text-amber-400",   badge: "bg-amber-500/15 text-amber-400 border-amber-500/25",    label: "Warning"  },
  info:     { border: "border-cyan-500/30",    bg: "bg-cyan-500/5",    icon: "text-cyan-400",    badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/25",       label: "Info"     },
  success:  { border: "border-emerald-500/30", bg: "bg-emerald-500/5", icon: "text-emerald-400", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25", label: "Good"  },
};

export const TYPE_ICON: Record<InsightCard["type"], React.ElementType> = {
  trend: TrendingUp, alert: AlertTriangle, coaching: BookOpen, keyword: MessageSquare, pattern: Zap,
};
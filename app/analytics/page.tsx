"use client";

import { useState, useMemo } from "react";
import {
  BarChart2, TrendingUp, TrendingDown, Phone, Clock,
  Users, Star, Activity, ChevronDown, Download,
  ArrowUpRight, ArrowDownRight, Minus, Calendar,
  Mic, Target, Zap, RefreshCw,
} from "lucide-react";
import ControlsCard from "@/analytics/common/ControlsCard"
import KpiCard from "@/analytics/common/KpiCard"
import { Range, VOLUME, SENTIMENT_TREND, QA_TREND, AGENTS, QUEUES, TALK_RATIO, FUNNEL, DURATION_DIST } from '@/lib/analytics';


// ─── Mini chart helpers ───────────────────────────────────────────────────────

function BarGroup({ data, height = 120 }: { data: { label: string; calls: number; resolved: number }[]; height?: number }) {
  const max = Math.max(...data.map(d => d.calls));
  return (
    <div className="flex items-end gap-2 w-full" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex gap-0.5 items-end" style={{ height: height - 20 }}>
            {/* Total bar */}
            <div className="flex-1 rounded-t-sm bg-cyan-500/25 hover:bg-cyan-500/40 transition-colors relative group"
              style={{ height: `${(d.calls / max) * 100}%` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{d.calls}</div>
            </div>
            {/* Resolved bar */}
            <div className="flex-1 rounded-t-sm bg-emerald-500/50 hover:bg-emerald-500/70 transition-colors relative group"
              style={{ height: `${(d.resolved / max) * 100}%` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-mono text-emerald-400 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">{d.resolved}</div>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-600">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data, height = 100 }: {
  data: { label: string; score: number; team: number }[];
  height?: number;
}) {
  const allVals = data.flatMap(d => [d.score, d.team]);
  const min = Math.min(...allVals) - 4;
  const max = Math.max(...allVals) + 4;
  const range = max - min;
  const w = 100 / (data.length - 1);

  const pts = (key: "score" | "team") =>
    data.map((d, i) => `${i * w},${100 - ((d[key] - min) / range) * 100}`).join(" ");

  return (
    <div style={{ height }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        ))}
        {/* Team line */}
        <polyline points={pts("team")} fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1.2" strokeDasharray="2 2" />
        {/* Score line */}
        <polyline points={pts("score")} fill="none" stroke="#06b6d4" strokeWidth="1.8" />
        {/* Score area fill */}
        <polyline
          points={`0,100 ${pts("score")} 100,100`}
          fill="url(#scoreGrad)" opacity="0.15"
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Dots on score line */}
        {data.map((d, i) => (
          <circle key={i} cx={i * w} cy={100 - ((d.score - min) / range) * 100}
            r="1.8" fill="#06b6d4" stroke="#0f172a" strokeWidth="0.8" />
        ))}
      </svg>
      {/* X labels */}
      <div className="flex justify-between mt-1">
        {data.map((d, i) => (
          <span key={i} className="text-xs font-mono text-slate-600">{d.label}</span>
        ))}
      </div>
    </div>
  );
}

function SentimentStack({ data }: { data: { label: string; pos: number; neu: number; neg: number }[] }) {
  return (
    <div className="flex items-end gap-1.5 w-full h-28">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col gap-px">
          <div className="flex flex-col rounded-sm overflow-hidden" style={{ height: 96 }}>
            <div className="bg-rose-500/65 transition-all" style={{ height: `${d.neg}%` }} title={`Neg ${d.neg}%`} />
            <div className="bg-slate-600/50 transition-all" style={{ height: `${d.neu}%` }} title={`Neu ${d.neu}%`} />
            <div className="bg-emerald-500/70 transition-all flex-1" title={`Pos ${d.pos}%`} />
          </div>
          <span className="text-xs font-mono text-slate-600 text-center mt-1">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [range, setRange] = useState<Range>("7d");
  const [activeAgentTab, setActiveAgentTab] = useState<"score" | "fcr" | "sentiment">("score");
  const [refreshing, setRefreshing] = useState(false);

  const volumeData   = VOLUME[range];
  const sentimentData = SENTIMENT_TREND[range];
  const qaData       = QA_TREND[range];

  const totalCalls    = volumeData.reduce((s, d) => s + d.calls, 0);
  const totalResolved = volumeData.reduce((s, d) => s + d.resolved, 0);
  const fcrRate       = Math.round((totalResolved / totalCalls) * 100);

  const sortedAgents = useMemo(() =>
    [...AGENTS].sort((a, b) => b[activeAgentTab] - a[activeAgentTab]),
    [activeAgentTab]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20">
                <BarChart2 size={18} className="text-cyan-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">Analytics</h1>
            </div>
            <p className="text-slate-400 text-sm ml-11">
              Call volume, quality scores, sentiment trends, and agent performance over time.
            </p>
          </div>

          {/* Controls */}
          <ControlsCard range={range} setRange={setRange} refreshing={refreshing} setRefreshing={setRefreshing} />
        </div>

        {/* ── KPI strip ── */}
        <KpiCard totalCalls={totalCalls} fcrRate={fcrRate} />

        {/* ── Row 1: Volume + Sentiment ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Call Volume */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Call Volume</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Total vs Resolved</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/40" /> Total</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/50" /> Resolved</span>
              </div>
            </div>
            <BarGroup data={volumeData} height={140} />
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs font-mono">
              <span className="text-slate-500">Total: <span className="text-white">{totalCalls}</span></span>
              <span className="text-slate-500">Resolved: <span className="text-emerald-400">{totalResolved}</span></span>
              <span className="text-slate-500">FCR: <span className="text-cyan-400">{fcrRate}%</span></span>
            </div>
          </div>

          {/* Sentiment trend */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Sentiment Trend</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Positive / Neutral / Negative</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/70" /> Pos</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-slate-600/50" /> Neu</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500/65" /> Neg</span>
              </div>
            </div>
            <SentimentStack data={sentimentData} />
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60 text-xs font-mono">
              {["pos","neu","neg"].map((k, i) => {
                const last = sentimentData[sentimentData.length - 1];
                const val = last[k as "pos"|"neu"|"neg"];
                const first = sentimentData[0];
                const prev = first[k as "pos"|"neu"|"neg"];
                const delta = val - prev;
                const colors = ["text-emerald-400","text-slate-400","text-rose-400"];
                const labels = ["Positive","Neutral","Negative"];
                return (
                  <span key={k} className={`${colors[i]}`}>
                    {labels[i]}: {val}%
                    <span className={`ml-1 text-slate-600`}>
                      ({delta >= 0 ? "+" : ""}{delta})
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 2: QA Trend + Resolution Funnel ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* QA Score trend */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">QA Score Trend</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Team avg vs benchmark</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-0.5 bg-cyan-500 rounded" /> Score
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-4 h-px bg-violet-400/60 border-t border-dashed border-violet-400/60" /> Team
                </span>
              </div>
            </div>
            <LineChart data={qaData} height={120} />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/60 text-xs font-mono">
              <span className="text-slate-500">Start: <span className="text-white">{qaData[0].score}</span></span>
              <span className="text-slate-500">Current: <span className="text-cyan-400">{qaData[qaData.length-1].score}</span></span>
              <span className="text-emerald-400 flex items-center gap-1">
                <TrendingUp size={11}/> +{qaData[qaData.length-1].score - qaData[0].score} pts
              </span>
            </div>
          </div>

          {/* Resolution funnel */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Resolution Funnel</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Call journey breakdown</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {FUNNEL.map((stage, i) => (
                <div key={stage.label}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-600 w-4">{i+1}</span>
                      <span className="text-sm text-slate-300">{stage.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">{stage.value.toLocaleString()}</span>
                      <span className={`text-xs font-mono font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                        {stage.pct}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
                      style={{ width: `${stage.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Agent leaderboard + Queue breakdown ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Agent leaderboard */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/30 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white">Agent Leaderboard</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">{range} performance</p>
              </div>
              {/* Sort tabs */}
              <div className="flex gap-1 bg-slate-800/60 rounded-lg p-0.5">
                {(["score","fcr","sentiment"] as const).map(t => (
                  <button key={t} onClick={() => setActiveAgentTab(t)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono capitalize transition-all ${activeAgentTab === t
                      ? "bg-cyan-600 text-white"
                      : "text-slate-400 hover:text-white"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="divide-y divide-slate-800/40">
              {sortedAgents.map((agent, rank) => {
                const val = agent[activeAgentTab];
                const barColor = val >= 85 ? "bg-emerald-500" : val >= 70 ? "bg-amber-500" : "bg-rose-500";
                const TrendIcon = agent.trend === "up" ? TrendingUp : agent.trend === "down" ? TrendingDown : Minus;
                const trendColor = agent.trend === "up" ? "text-emerald-400" : agent.trend === "down" ? "text-rose-400" : "text-slate-400";
                return (
                  <div key={agent.name} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                    <span className={`text-sm font-mono font-bold w-5 ${rank === 0 ? "text-amber-400" : "text-slate-600"}`}>
                      {rank + 1}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {agent.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-white font-medium truncate">{agent.name}</span>
                        <TrendIcon size={12} className={trendColor} />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${val}%` }} />
                        </div>
                        <span className={`text-xs font-mono font-bold ${barColor.replace("bg-","text-")}`}>{val}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs font-mono text-slate-400">{agent.calls} calls</div>
                      <div className="text-xs font-mono text-slate-600">{agent.duration} avg</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Queue breakdown */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-700/30">
              <h3 className="text-sm font-semibold text-white">Queue Breakdown</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">Volume and quality by queue</p>
            </div>
            <div className="divide-y divide-slate-800/40">
              {QUEUES.map(q => (
                <div key={q.name} className="px-5 py-3.5 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${q.dot}`} />
                      <span className="text-sm text-white">{q.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span>QA <span className={q.avgScore >= 80 ? "text-emerald-400" : q.avgScore >= 70 ? "text-amber-400" : "text-rose-400"}>{q.avgScore}</span></span>
                      <span>FCR <span className="text-cyan-400">{q.fcr}%</span></span>
                      <span className="text-white font-bold">{q.calls}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${q.color} rounded-full`} style={{ width: `${q.pct}%` }} />
                  </div>
                  <div className="text-xs font-mono text-slate-600 mt-1">{q.pct}% of total volume</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 4: Talk ratio + Duration distribution ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Talk ratio */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Talk Ratio</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Agent vs Customer by queue</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-cyan-500/60" /> Agent</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-violet-500/50" /> Customer</span>
              </div>
            </div>
            <div className="space-y-3">
              {TALK_RATIO.map(row => (
                <div key={row.queue}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-mono text-slate-400 w-20">{row.queue}</span>
                    <div className="flex-1 flex gap-0.5 rounded-md overflow-hidden mx-3 h-5">
                      <div className="bg-cyan-500/60 flex items-center justify-center transition-all"
                        style={{ width: `${row.agent}%` }}>
                        <span className="text-xs font-mono text-white/80">{row.agent}%</span>
                      </div>
                      <div className="bg-violet-500/50 flex items-center justify-center transition-all"
                        style={{ width: `${row.customer}%` }}>
                        <span className="text-xs font-mono text-white/70">{row.customer}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 py-2 rounded-lg bg-cyan-500/5 border border-cyan-500/10">
              <p className="text-xs text-slate-400">
                <span className="text-cyan-400 font-mono">Insight: </span>
                Cancellations queue shows highest customer talk ratio (56%) — customers need more space to express concerns before resolution attempts.
              </p>
            </div>
          </div>

          {/* Duration distribution */}
          <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-semibold text-white">Duration Distribution</h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">% of calls by length</p>
              </div>
            </div>
            {/* Donut-style stacked bar */}
            <div className="flex gap-1.5 h-8 rounded-lg overflow-hidden mb-5">
              {DURATION_DIST.map(d => (
                <div key={d.label} className={`${d.color} flex items-center justify-center transition-all hover:opacity-80`}
                  style={{ width: `${d.pct}%` }} title={`${d.label}: ${d.pct}%`}>
                  {d.pct >= 14 && <span className="text-xs font-mono text-white/80 whitespace-nowrap">{d.pct}%</span>}
                </div>
              ))}
            </div>
            <div className="space-y-2.5">
              {DURATION_DIST.map(d => (
                <div key={d.label} className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-sm ${d.color} flex-shrink-0`} />
                  <span className="text-sm text-slate-300 w-16">{d.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-xs font-mono text-slate-400 w-8 text-right">{d.pct}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/60 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <p className="text-xs text-slate-400">
                <span className="text-amber-400 font-mono">Note: </span>
                38% of calls fall in the 5–10m range. Calls over 10m have a 14% lower resolution rate on average.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
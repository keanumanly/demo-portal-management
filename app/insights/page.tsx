"use client";

import { useState, useMemo } from "react";
import {
  Brain, TrendingUp, TrendingDown, Minus, AlertTriangle,
  Lightbulb, Target, Users, MessageSquare, Zap,
  ChevronRight, RefreshCw, Sparkles, BookOpen,
  ArrowUpRight, ArrowDownRight, Flame, Shield,
} from "lucide-react";
import BannerCard from "@/insights/common/BannerCard"
import { INSIGHTS, COACHING, KEYWORDS, HOUR_HEATMAP, PATTERNS, SEVERITY_CONFIG, TYPE_ICON } from '@/lib/insights';

function ScoreRing({ score, delta }: { score: number; delta: number }) {
  const color = score >= 85 ? "#10b981" : score >= 70 ? "#f59e0b" : "#f43f5e";
  const r = 28, circ = 2 * Math.PI * r;
  return (
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 5px ${color}80)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold text-white leading-none">{score}</span>
        <span className={`text-xs font-mono leading-none mt-0.5 ${delta >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
          {delta >= 0 ? "+" : ""}{delta}
        </span>
      </div>
    </div>
  );
}

export default function InsightsPage() {
  const [activeFilter, setActiveFilter]     = useState("all");
  const [activeSeverity, setActiveSeverity] = useState("all");
  const [refreshing, setRefreshing]         = useState(false);
  const [expanded, setExpanded]             = useState<string | null>(null);
  const [tab, setTab]                       = useState<"insights"|"coaching"|"keywords"|"patterns">("insights");

  const filtered = useMemo(() => {
    let list = [...INSIGHTS];
    if (activeFilter !== "all")   list = list.filter(i => i.type === activeFilter);
    if (activeSeverity !== "all") list = list.filter(i => i.severity === activeSeverity);
    return list;
  }, [activeFilter, activeSeverity]);

  const criticalCount = INSIGHTS.filter(i => i.severity === "critical").length;
  const warningCount  = INSIGHTS.filter(i => i.severity === "warning").length;
  const maxHeat = Math.max(...HOUR_HEATMAP);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20">
                <Brain size={18} className="text-violet-400" />
              </div>
              <h1 className="text-2xl font-bold text-white">AI Insights</h1>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                <Sparkles size={11} className="text-violet-400" />
                <span className="text-xs font-mono text-violet-400">GPT-powered</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm ml-11">AI-generated patterns, coaching tips, and risk signals from your call data.</p>
          </div>
          <button onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1200); }}
            className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-slate-800 border border-slate-700/50 text-sm text-slate-300 hover:text-white hover:border-slate-600 transition-colors font-mono">
            <RefreshCw size={13} className={refreshing ? "animate-spin text-violet-400" : ""} />
            {refreshing ? "Analyzing..." : "Refresh"}
          </button>
        </div>

        {/* Critical banner */}
        {criticalCount > 0 && (
            <BannerCard criticalCount={criticalCount} warningCount={warningCount} setActiveSeverity={setActiveSeverity} setTab={setTab} />
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Active Signals",  value: INSIGHTS.length, icon: Zap,          color: "from-violet-500 to-purple-500", sub: "AI-detected" },
            { label: "Critical Alerts", value: criticalCount,   icon: AlertTriangle, color: "from-rose-500 to-pink-500",    sub: "need action" },
            { label: "Coaching Flags",  value: 2,               icon: Target,        color: "from-amber-500 to-orange-500", sub: "agents flagged" },
            { label: "Positive Trends", value: INSIGHTS.filter(i => i.severity === "success").length, icon: TrendingUp, color: "from-emerald-500 to-teal-500", sub: "improving" },
          ].map(card => (
            <div key={card.label} className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">{card.label}</span>
                <div className={`p-1.5 rounded-lg bg-gradient-to-br ${card.color} opacity-80`}><card.icon size={12} className="text-white" /></div>
              </div>
              <div className={`text-2xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>{card.value}</div>
              <div className="text-xs text-slate-600 font-mono mt-0.5">{card.sub}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900/60 border border-slate-700/30 rounded-xl p-1.5 w-fit">
          {(["insights","coaching","keywords","patterns"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg text-sm font-mono capitalize transition-all ${tab === t
                ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-800/60"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* ── INSIGHTS TAB ── */}
        {tab === "insights" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-1.5">
                {["all","alert","trend","coaching","keyword","pattern"].map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${activeFilter === f
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"}`}>
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5 ml-auto">
                {["all","critical","warning","info","success"].map(s => (
                  <button key={s} onClick={() => setActiveSeverity(s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${activeSeverity === s
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-slate-800/60 border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {filtered.map(insight => {
                const sc = SEVERITY_CONFIG[insight.severity];
                const Icon = TYPE_ICON[insight.type];
                const isExpanded = expanded === insight.id;
                return (
                  <div key={insight.id}
                    className={`border rounded-xl transition-all cursor-pointer hover:brightness-110 ${sc.border} ${sc.bg}`}
                    onClick={() => setExpanded(isExpanded ? null : insight.id)}>
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-slate-800/60 mt-0.5 flex-shrink-0 ${sc.icon}`}><Icon size={14} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-mono ${sc.badge}`}>{sc.label}</span>
                            <span className="text-xs text-slate-500 font-mono capitalize">{insight.type}</span>
                            {insight.agent && <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono">{insight.agent}</span>}
                            <span className="text-xs text-slate-600 font-mono ml-auto">{insight.timestamp}</span>
                          </div>
                          <h3 className="font-semibold text-white text-sm mb-1">{insight.title}</h3>
                          {insight.metric && (
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg font-bold text-white font-mono">{insight.metric}</span>
                              <span className={`flex items-center gap-0.5 text-xs font-mono font-semibold ${
                                insight.trend === "up" && insight.severity !== "success" ? "text-rose-400" :
                                insight.trend === "up" ? "text-emerald-400" :
                                insight.trend === "down" && insight.severity === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                                {insight.trend === "up" ? <ArrowUpRight size={13}/> : insight.trend === "down" ? <ArrowDownRight size={13}/> : <Minus size={13}/>}
                                {insight.metricDelta}
                              </span>
                            </div>
                          )}
                          {isExpanded && <p className="text-sm text-slate-300 leading-relaxed mb-3">{insight.body}</p>}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {insight.tags.map(t => (
                              <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/30 text-slate-500 font-mono">#{t}</span>
                            ))}
                          </div>
                        </div>
                        <ChevronRight size={15} className={`text-slate-600 flex-shrink-0 mt-1 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── COACHING TAB ── */}
        {tab === "coaching" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/5 border border-cyan-500/15">
              <Lightbulb size={14} className="text-cyan-400 flex-shrink-0" />
              <p className="text-sm text-slate-300">AI coaching tips are generated by analyzing speech patterns, empathy language, resolution rates, and QA scores across each agent's recent calls.</p>
            </div>
            <div className="grid gap-4">
              {COACHING.map(agent => (
                <div key={agent.agentId} className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold">{agent.avatar}</div>
                      <ScoreRing score={agent.score} delta={agent.scoreDelta} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-semibold text-white">{agent.agent}</h3>
                        <span className="text-xs font-mono text-slate-500">{agent.callsReviewed} calls reviewed</span>
                        {agent.scoreDelta < 0 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono flex items-center gap-1"><AlertTriangle size={10}/> Needs attention</span>
                        )}
                        {agent.scoreDelta > 5 && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono flex items-center gap-1"><Flame size={10}/> Top performer</span>
                        )}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs font-mono text-emerald-400 mb-2 flex items-center gap-1.5"><Shield size={11}/> Strengths</div>
                          <ul className="space-y-1">{agent.strengths.map(s => <li key={s} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-emerald-500 mt-0.5 text-xs">✓</span>{s}</li>)}</ul>
                        </div>
                        <div>
                          <div className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1.5"><Target size={11}/> Focus Areas</div>
                          <ul className="space-y-1">{agent.improvements.map(s => <li key={s} className="flex items-start gap-2 text-sm text-slate-300"><span className="text-amber-500 mt-0.5 text-xs">→</span>{s}</li>)}</ul>
                        </div>
                      </div>
                      <div className="mt-3 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/30">
                        <span className="text-xs font-mono text-violet-400">AI Note: </span>
                        <span className="text-xs text-slate-400">{agent.topIssue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KEYWORDS TAB ── */}
        {tab === "keywords" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-700/30 flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Keyword Frequency</span>
                <span className="text-xs font-mono text-slate-500">Last 7 days</span>
              </div>
              <div className="divide-y divide-slate-800/60">
                {KEYWORDS.map(kw => (
                  <div key={kw.word} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-800/30 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${kw.sentiment === "positive" ? "bg-emerald-400" : kw.sentiment === "negative" ? "bg-rose-400" : "bg-slate-400"}`} />
                    <span className="font-mono text-sm text-white flex-1">"{kw.word}"</span>
                    <span className="text-xs font-mono text-slate-500 w-24 text-center">{kw.category}</span>
                    <span className="text-sm font-bold text-white w-8 text-right">{kw.count}</span>
                    <span className={`text-xs font-mono w-14 text-right flex items-center justify-end gap-0.5 ${kw.delta > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                      {kw.delta > 0 ? <ArrowUpRight size={11}/> : <ArrowDownRight size={11}/>}{Math.abs(kw.delta)}%
                    </span>
                    <div className="w-16 h-1 bg-slate-700/50 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${kw.sentiment === "positive" ? "bg-emerald-500" : kw.sentiment === "negative" ? "bg-rose-500" : "bg-slate-500"}`} style={{ width: `${Math.min((kw.count/89)*100,100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">Call Volume by Hour</span>
                <span className="text-xs font-mono text-slate-500">Avg weekly pattern</span>
              </div>
              <div className="grid grid-cols-8 gap-1.5 mb-3">
                {HOUR_HEATMAP.map((v, i) => {
                  const intensity = v / maxHeat;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-full rounded-md transition-all" style={{ height: `${Math.max(8, intensity*56)}px`, background: `rgba(6,182,212,${0.1+intensity*0.85})`, boxShadow: intensity > 0.6 ? `0 0 8px rgba(6,182,212,${intensity*0.4})` : "none" }} title={`${i}:00 — ${v} calls`} />
                      <span className="text-xs font-mono text-slate-600">{i}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 px-3 py-2.5 rounded-lg bg-amber-500/8 border border-amber-500/15">
                <div className="flex items-center gap-2 mb-1"><AlertTriangle size={11} className="text-amber-400" /><span className="text-xs font-mono text-amber-400">Pattern detected</span></div>
                <p className="text-xs text-slate-400">Monday 8–10 AM shows 12% lower sentiment than weekly average. Consider staffing additional senior agents during this window.</p>
              </div>
            </div>
          </div>
        )}

        {/* ── PATTERNS TAB ── */}
        {tab === "patterns" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-white">Call Reason Breakdown</span>
                <span className="text-xs font-mono text-slate-500">AI-classified</span>
              </div>
              <div className="space-y-4">
                {PATTERNS.map(p => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-300">{p.label}</span>
                      <span className="text-sm font-mono font-bold text-white">{p.value}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${p.color} rounded-full`} style={{ width: `${p.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <span className="text-sm font-semibold text-white">Sentiment Drift (7 days)</span>
                <span className="text-xs font-mono text-slate-500">Daily avg</span>
              </div>
              <div className="space-y-3">
                {[
                  { day: "Mon", pos: 31, neu: 44, neg: 25 },
                  { day: "Tue", pos: 38, neu: 42, neg: 20 },
                  { day: "Wed", pos: 42, neu: 41, neg: 17 },
                  { day: "Thu", pos: 45, neu: 38, neg: 17 },
                  { day: "Fri", pos: 48, neu: 36, neg: 16 },
                  { day: "Sat", pos: 52, neu: 34, neg: 14 },
                  { day: "Sun", pos: 50, neu: 35, neg: 15 },
                ].map(day => (
                  <div key={day.day} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-7">{day.day}</span>
                    <div className="flex-1 flex gap-0.5 h-5 rounded-md overflow-hidden">
                      <div className="bg-emerald-500/70 flex items-center justify-center" style={{ width: `${day.pos}%` }}><span className="text-xs font-mono text-white/80">{day.pos}%</span></div>
                      <div className="bg-slate-600/50 flex items-center justify-center" style={{ width: `${day.neu}%` }}><span className="text-xs font-mono text-slate-400">{day.neu}%</span></div>
                      <div className="bg-rose-500/60 flex items-center justify-center" style={{ width: `${day.neg}%` }}><span className="text-xs font-mono text-white/70">{day.neg}%</span></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800">
                {[{ label:"Positive",color:"bg-emerald-500/70"},{ label:"Neutral",color:"bg-slate-600/50"},{ label:"Negative",color:"bg-rose-500/60"}].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5"><div className={`w-2.5 h-2.5 rounded-sm ${l.color}`}/><span className="text-xs font-mono text-slate-500">{l.label}</span></div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-slate-900/60 border border-slate-700/30 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4"><Sparkles size={14} className="text-violet-400" /><span className="text-sm font-semibold text-white">AI Recommendations</span></div>
              <div className="grid md:grid-cols-3 gap-3">
                {[
                  { icon: Users,         color: "from-rose-500 to-pink-500",   title: "Retention intervention",   body: "Assign James Okafor to a 1-on-1 coaching session focused on empathy language and interruption control before next week's shifts." },
                  { icon: MessageSquare, color: "from-amber-500 to-orange-500", title: "Update retention script",  body: "The 34% spike in 'cancel' keyword and competitor mentions suggests the current retention offer script is underperforming. Refresh with competitive pricing data." },
                  { icon: Zap,           color: "from-cyan-500 to-blue-500",    title: "Optimize lookup speed",   body: "Dead air spikes in Tech Support correlate with CRM lookup latency. Reducing lookup time by 2s could improve QA scores by an estimated 4–6 points." },
                ].map(rec => (
                  <div key={rec.title} className="flex gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/30">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${rec.color} opacity-80 flex-shrink-0 h-fit`}><rec.icon size={13} className="text-white" /></div>
                    <div><h4 className="text-sm font-semibold text-white mb-1">{rec.title}</h4><p className="text-xs text-slate-400 leading-relaxed">{rec.body}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
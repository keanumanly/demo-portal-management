"use client";

import { useState, useMemo } from "react";
import {
  Brain, AlertTriangle, Users, MessageSquare, Zap,
  RefreshCw, Sparkles, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import BannerCard from "@/insights/common/BannerCard"
import SummaryCard from "@/insights/common/SummaryCard"
import InsightsCard from "@/insights/common/InsightsCard"
import CoachingCard from "@/insights/common/CoachingCard"
import { INSIGHTS, COACHING, KEYWORDS, HOUR_HEATMAP, PATTERNS, SEVERITY_CONFIG, TYPE_ICON } from '@/lib/insights';

export default function InsightsPage() {
  const [activeFilter, setActiveFilter]     = useState("all");
  const [activeSeverity, setActiveSeverity] = useState("all");
  const [refreshing, setRefreshing]         = useState(false);
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
        <SummaryCard  criticalCount={criticalCount}/>

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
            <InsightsCard activeFilter={activeFilter} setActiveFilter={setActiveFilter} 
            activeSeverity={activeSeverity} setActiveSeverity={setActiveSeverity} filtered={filtered} />
        )}

        {/* ── COACHING TAB ── */}
        {tab === "coaching" && (
            <CoachingCard COACHING={COACHING} />
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
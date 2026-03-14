"use client";

import { useState, useMemo } from "react";
import { Brain, RefreshCw, Sparkles } from "lucide-react";
import BannerCard from "@/insights/common/BannerCard"
import SummaryCard from "@/insights/common/SummaryCard"
import InsightsCard from "@/insights/common/InsightsCard"
import CoachingCard from "@/insights/common/CoachingCard"
import KeywordsCard from "@/insights/common/KeywordsCard"
import PatternsCard from "@/insights/common/PatternsCard"
import { INSIGHTS, COACHING, KEYWORDS, HOUR_HEATMAP, PATTERNS } from '@/lib/insights';

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
            <KeywordsCard KEYWORDS={KEYWORDS} HOUR_HEATMAP={HOUR_HEATMAP} maxHeat={maxHeat} />
        )}

        {/* ── PATTERNS TAB ── */}
        {tab === "patterns" && (
            <PatternsCard PATTERNS={PATTERNS} />
        )}

      </div>
    </div>
  );
}
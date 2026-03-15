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
import CallVolumeCard from "@/analytics/common/CallVolumeCard"
import SentimentTrendCard from "@/analytics/common/SentimentTrendCard"
import QAScoreTrendCard from "@/analytics/common/QAScoreTrendCard"
import ResolutionFunnelCard from "@/analytics/common/ResolutionFunnelCard"
import AgentLeaderboardCard from "@/analytics/common/AgentLeaderboardCard"
import QueueCard from "@/analytics/common/QueueCard"
import TalkRatioCard from "@/analytics/common/TalkRatioCard"
import { Range, VOLUME, SENTIMENT_TREND, QA_TREND, AGENTS, QUEUES, TALK_RATIO, FUNNEL, DURATION_DIST } from '@/lib/analytics';

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
          <CallVolumeCard volumeData={volumeData} totalCalls={totalCalls} totalResolved={totalResolved} fcrRate={fcrRate} />

          {/* Sentiment trend */}
          <SentimentTrendCard sentimentData={sentimentData} />
        </div>

        {/* ── Row 2: QA Trend + Resolution Funnel ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* QA Score trend */}
          <QAScoreTrendCard qaData={qaData} />

          {/* Resolution funnel */}
          <ResolutionFunnelCard FUNNEL={FUNNEL}/>
        </div>

        {/* ── Row 3: Agent leaderboard + Queue breakdown ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Agent leaderboard */}
          <AgentLeaderboardCard range={range} activeAgentTab={activeAgentTab} setActiveAgentTab={setActiveAgentTab} sortedAgents={sortedAgents}/>

          {/* Queue breakdown */}
          <QueueCard QUEUES={QUEUES}/>
        </div>

        {/* ── Row 4: Talk ratio + Duration distribution ── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Talk ratio */}
          <TalkRatioCard TALK_RATIO={TALK_RATIO}/>

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
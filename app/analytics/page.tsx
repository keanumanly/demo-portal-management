"use client";

import { useState, useMemo } from "react";
import { BarChart2 } from "lucide-react";
import ControlsCard from "@/analytics/common/ControlsCard"
import KpiCard from "@/analytics/common/KpiCard"
import CallVolumeCard from "@/analytics/common/CallVolumeCard"
import SentimentTrendCard from "@/analytics/common/SentimentTrendCard"
import QAScoreTrendCard from "@/analytics/common/QAScoreTrendCard"
import ResolutionFunnelCard from "@/analytics/common/ResolutionFunnelCard"
import AgentLeaderboardCard from "@/analytics/common/AgentLeaderboardCard"
import QueueCard from "@/analytics/common/QueueCard"
import TalkRatioCard from "@/analytics/common/TalkRatioCard"
import DurationDistributionCard from "@/analytics/common/DurationDistributionCard"
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
          <DurationDistributionCard DURATION_DIST={DURATION_DIST} />
        </div>

      </div>
    </div>
  );
}
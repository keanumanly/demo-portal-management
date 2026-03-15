'use client';

import React, { useState, ElementType } from 'react';
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AgentsProps { 
    name: string; 
    avatar: string;
    calls: number;
    score: number;
    fcr: number; 
    sentiment: number;
    duration: string; 
    trend: string; 
}

interface Props {
    range: string;
    activeAgentTab: "score" | "fcr" | "sentiment";
    setActiveAgentTab: React.Dispatch<React.SetStateAction<"score" | "fcr" | "sentiment">>;
    sortedAgents: AgentsProps[];
}

export default function AgentLeaderboardCard({ range, activeAgentTab, setActiveAgentTab, sortedAgents }: Props) {

    return (
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
    );
}
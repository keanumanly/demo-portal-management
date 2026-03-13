'use client';

import React, { useState } from 'react';
import { 
    MessageSquare,
    Flag,
    TrendingUp
} from 'lucide-react';

interface Stats {
    total: number;
    flagged: number;
    avgScore: number;
    positive: number;
  }

interface Props {
    stats: Stats;
}


export default function SummaryCard({ stats }: Props) {
    return (
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
    );
}
'use client';

import React, { useState } from 'react';
import { AlertTriangle, Zap, Target, TrendingUp } from 'lucide-react';
import { INSIGHTS } from '@/lib/insights';

interface Props {
    criticalCount: number;
}

export default function SummaryCard({ criticalCount }: Props) {
    return (
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
    );
}